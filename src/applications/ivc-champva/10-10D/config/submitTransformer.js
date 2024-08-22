import { transformForSubmit as formsSystemTransformForSubmit } from 'platform/forms-system/src/js/helpers';
import { REQUIRED_FILES, OPTIONAL_FILES } from './constants';
import {
  adjustYearString,
  concatStreets,
  getAgeInYears,
} from '../../shared/utilities';

// Rearranges date string from YYYY-MM-DD to MM-DD-YYYY
function fmtDate(date) {
  return date?.length && date.length === 10
    ? `${date.slice(5)}-${date.slice(0, 4)}`
    : date;
}

// Simplify a relationship object from (potentially) multiple nested objects to a single string
function transformRelationship(obj) {
  if (typeof obj === 'string') return obj;
  let rel = obj?.relationshipToVeteran;
  // Check if relationshipToVeteran is an object
  if (typeof obj?.relationshipToVeteran === 'object') {
    // Iterate over keys in relationshipToVeteran object
    Object.keys(obj?.relationshipToVeteran).forEach(key => {
      // edge case for certifier relationship (generated by a checkboxgroup):
      if (obj?.relationshipToVeteran[key] === true) {
        rel = key; // e.g., `'spouse': true` yields `'spouse'`
      }
    });
  }
  // Check if otherRelationshipToVeteran is a string
  if (typeof obj?.otherRelationshipToVeteran === 'string') {
    rel = obj?.otherRelationshipToVeteran;
  }

  return rel;
}

// For each applicant, adjust organization of the object, add supporting documents array
function transformApplicants(applicants) {
  const applicantsPostTransform = [];
  applicants.forEach(app => {
    let transformedApp = {
      ...app,
      ssnOrTin: app.applicantSSN?.ssn ?? '',
      vetRelationship: transformRelationship(
        app.applicantRelationshipToSponsor || 'NA',
      ),
      // Grab any file upload properties from this applicant and combine into a
      // supporting documents array:
      applicantSupportingDocuments: Object.keys({
        ...REQUIRED_FILES,
        ...OPTIONAL_FILES,
      })
        .filter(k => k.includes('applicant')) // Ignore sponsor files
        .map(f => app?.[f]) // Grab the upload obj from top-level in applicant
        .filter(el => el), // Drop any undefineds/nulls
    };
    transformedApp = adjustYearString(transformedApp);
    transformedApp.applicantAddress.streetCombined = concatStreets(
      transformedApp.applicantAddress,
    );
    applicantsPostTransform.push(transformedApp);
  });
  return applicantsPostTransform;
}

// Since the certifier data may be the sponsor's or a third party, this maps
// the sponsor's info into the certifier property names for simplicity on BE
function parseCertifier(transformedData) {
  return {
    date: new Date().toJSON().slice(0, 10),
    firstName: transformedData.veteransFullName.first || '',
    lastName: transformedData.veteransFullName.last || '',
    middleInitial: transformedData?.veteransFullName?.middle || '',
    phoneNumber: transformedData?.sponsorPhone || '',
    relationship: 'sponsor',
    streetAddress: transformedData?.sponsorAddress?.streetCombined || '',
    city: transformedData?.sponsorAddress?.city || '',
    state: transformedData?.sponsorAddress?.state || '',
    postalCode: transformedData?.sponsorAddress?.postalCode || '',
  };
}

// Set up the `primaryContactInfo` for the backend notification API service.
function getPrimaryContact(data) {
  // If a certification name is present, third party signer is the certifier
  const useCert =
    data?.certification?.firstName && data?.certification?.firstName !== '';

  // Either the first applicant with an email address, or the first applicant
  const primaryApp =
    data?.applicants?.filter(
      app => app.applicantEmailAddress && app.applicantEmailAddress.length > 0,
    )[0] ?? data?.applicants?.[0];

  return {
    name: {
      first:
        (useCert
          ? data?.certification?.firstName
          : primaryApp?.applicantName?.first) ?? false,
      last:
        (useCert
          ? data?.certification?.lastName
          : primaryApp?.applicantName?.last) ?? false,
    },
    email:
      (useCert
        ? data?.certification?.email
        : primaryApp?.applicantEmailAddress) ?? false,
    phone:
      (useCert
        ? data?.certification?.phoneNumber
        : primaryApp?.applicantPhone) ?? false,
  };
}

export default function transformForSubmit(formConfig, form) {
  const transformedData = JSON.parse(
    formsSystemTransformForSubmit(formConfig, form),
  );

  if (transformedData.sponsorAddress)
    transformedData.sponsorAddress.streetCombined = concatStreets(
      transformedData.sponsorAddress,
    );

  if (transformedData.certifierAddress)
    transformedData.certifierAddress.streetCombined = concatStreets(
      transformedData.certifierAddress,
    );

  const dataPostTransform = {
    veteran: {
      fullName: transformedData?.veteransFullName || {},
      ssnOrTin: transformedData?.ssn?.ssn || '',
      vaClaimNumber: transformedData?.ssn?.vaFileNumber || '',
      dateOfBirth: fmtDate(transformedData?.sponsorDob) || '',
      phoneNumber: transformedData?.sponsorPhone || '',
      address: transformedData?.sponsorAddress || {},
      sponsorIsDeceased: transformedData?.sponsorIsDeceased,
      dateOfDeath: fmtDate(transformedData?.sponsorDOD) || '',
      // Find the first applicant with a date of marriage to sponsor
      dateOfMarriage:
        fmtDate(
          transformedData?.applicants?.find(
            a =>
              a?.applicantRelationshipToSponsor?.relationshipToVeteran ===
                'spouse' && a?.dateOfMarriageToSponsor !== undefined,
          )?.dateOfMarriageToSponsor,
        ) || '',
      isActiveServiceDeath: transformedData?.sponsorDeathConditions,
    },
    applicants: transformApplicants(transformedData.applicants ?? []),
    certification: {
      date: fmtDate(new Date().toISOString().replace(/T.*/, '')) || '',
      lastName: transformedData?.certifierName?.last || '',
      middleInitial: transformedData?.certifierName?.middle || '',
      firstName: transformedData?.certifierName?.first || '',
      phoneNumber: transformedData?.certifierPhone || '',
      relationship: transformRelationship(
        transformedData?.certifierRelationship,
      ),
      streetAddress: transformedData?.certifierAddress?.streetCombined || '',
      city: transformedData?.certifierAddress?.city || '',
      state: transformedData?.certifierAddress?.state || '',
      postalCode: transformedData?.certifierAddress?.postalCode || '',
    },
    supportingDocs: [],
    // Include everything we originally received
    rawData: transformedData,
  };

  // Fill in certification data with sponsor info as needed
  if (form.data.certifierRole === 'sponsor')
    dataPostTransform.certification = { ...parseCertifier(transformedData) };

  // Flatten supporting docs for all applicants to a single array
  const supDocs = [];
  dataPostTransform.applicants.forEach(app => {
    if (app.applicantSupportingDocuments.length > 0) {
      app.applicantSupportingDocuments.forEach(doc => {
        if (doc !== undefined && doc !== null) {
          // doc is an array of files for a given input (e.g., insurance cards).
          // For clarity's sake, add applicant's name onto each file object:
          const files = doc.map(file => ({
            ...file,
            applicantName: app.applicantName,
          }));
          supDocs.push(...files);
        }
      });
    }
  });

  // Set a top-level boolean indicating if any applicants are over 65
  dataPostTransform.hasApplicantOver65 = dataPostTransform.applicants.some(
    app => getAgeInYears(app.applicantDob) >= 65,
  );

  dataPostTransform.supportingDocs = dataPostTransform.supportingDocs
    .flat()
    .concat(supDocs);
  dataPostTransform.certifierRole = transformedData.certifierRole;
  dataPostTransform.statementOfTruthSignature =
    transformedData.statementOfTruthSignature;
  // `primaryContactInfo` is who BE callback API emails if there's a notification event
  dataPostTransform.primaryContactInfo = getPrimaryContact(dataPostTransform);
  return JSON.stringify({
    ...dataPostTransform,
    formNumber: formConfig.formId,
  });
}
