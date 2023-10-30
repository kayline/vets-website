import React from 'react';
import { expect } from 'chai';
import { waitFor } from '@testing-library/react';
import { mockConstants, renderWithStoreAndRouter } from '../helpers';

import ProfilePageHeader from '../../containers/ProfilePageHeader';

const TEST_INSTITUTION = {
  name: "AUSTIN'S BEAUTY COLLEGE INC",
  facilityCode: '25008642',
  type: 'FOR PROFIT',
  city: 'CLARKSVILLE',
  state: 'TN',
  zip: '37040',
  country: 'USA',
  bah: 1707,
  cross: '219851',
  flight: false,
  correspondence: false,
  ope: '04142000',
  ope6: '41420',
  schoolSystemName: null,
  schoolSystemCode: -2,
  alias: "Austin's Beauty College",
  highestDegree: 'Certificate',
  localeType: 'city',
  address1: 'PO BOX 1121',
  address2: null,
  address3: null,
  studentCount: 28,
  undergradEnrollment: 120,
  yr: false,
  studentVeteran: null,
  studentVeteranLink: null,
  poe: true,
  eightKeys: null,
  stemOffered: false,
  dodmou: null,
  sec702: null,
  vetSuccessName: null,
  vetSuccessEmail: null,
  creditForMilTraining: false,
  vetPoc: true,
  studentVetGrpIpeds: false,
  socMember: true,
  retentionRateVeteranBa: null,
  retentionAllStudentsBa: null,
  retentionRateVeteranOtb: null,
  retentionAllStudentsOtb: 1,
  persistanceRateVeteranBa: null,
  persistanceRateVeteranOtb: null,
  graduationRateVeteran: 0,
  graduationRateAllStudents: 0.9286,
  transferOutRateVeteran: null,
  transferOutRateAllStudents: null,
  salaryAllStudents: null,
  repaymentRateAllStudents: null,
  avgStuLoanDebt: 7917,
  calendar: 'nontraditional',
  tuitionInState: 14425,
  tuitionOutOfState: 14425,
  books: 1570,
  onlineAll: true,
  p911TuitionFees: 159814.5,
  p911Recipients: 12,
  p911YellowRibbon: 0,
  p911YrRecipients: 0,
  accredited: true,
  accreditationType: 'hybrid',
  accreditationStatus: null,
  cautionFlag: null,
  cautionFlagReason: null,
  cautionFlags: [],
  complaints: {
    facilityCode: 4,
    financialByFacCode: 0,
    qualityByFacCode: 3,
    refundByFacCode: 0,
    marketingByFacCode: 1,
    accreditationByFacCode: 0,
    degreeRequirementsByFacCode: 0,
    studentLoansByFacCode: 0,
    gradesByFacCode: 0,
    creditTransferByFacCode: 0,
    creditJobByFacCode: null,
    jobByFacCode: 0,
    transcriptByFacCode: 0,
    otherByFacCode: 0,
    mainCampusRollUp: 4,
    financialByOpeIdDoNotSum: 0,
    qualityByOpeIdDoNotSum: 3,
    refundByOpeIdDoNotSum: 0,
    marketingByOpeIdDoNotSum: 1,
    accreditationByOpeIdDoNotSum: 0,
    degreeRequirementsByOpeIdDoNotSum: 0,
    studentLoansByOpeIdDoNotSum: 0,
    gradesByOpeIdDoNotSum: 0,
    creditTransferByOpeIdDoNotSum: 0,
    jobsByOpeIdDoNotSum: 0,
    transcriptByOpeIdDoNotSum: 0,
    otherByOpeIdDoNotSum: 0,
  },
  schoolClosing: false,
  schoolClosingOn: null,
  schoolClosingMessage: null,
  yellowRibbonPrograms: [],
  independentStudy: false,
  priorityEnrollment: false,
  createdAt: '2023-10-24T11:54:37.000Z',
  updatedAt: '2023-10-24T11:54:37.000Z',
  physicalAddress1: '585A S RIVERSIDE DR',
  physicalAddress2: null,
  physicalAddress3: null,
  physicalCity: 'CLARKSVILLE',
  physicalState: 'TN',
  physicalCountry: 'USA',
  onlineOnly: false,
  distanceLearning: false,
  dodBah: 1596,
  physicalZip: '37040',
  parentFacilityCodeId: null,
  campusType: 'Y',
  vetTecProvider: false,
  preferredProvider: false,
  stemIndicator: false,
  facilityMap: {
    main: {
      institution: {
        id: 30071883,
        version: {
          number: 422,
          createdAt: '2023-10-24T11:54:22.986Z',
          preview: false,
        },
        institutionTypeName: 'FOR PROFIT',
        facilityCode: '25008642',
        institution: "AUSTIN'S BEAUTY COLLEGE INC",
        city: 'CLARKSVILLE',
        state: 'TN',
        zip: '37040',
        country: 'USA',
        flight: false,
        correspondence: false,
        bah: 1707,
        cross: '219851',
        ope: '04142000',
        ope6: '41420',
        insturl: 'www.austinbeautycollege.com/',
        vetTuitionPolicyUrl: 'www.austinbeautycollege.com/',
        predDegreeAwarded: 1,
        locale: 12,
        gibill: 28,
        undergradEnrollment: 120,
        yr: false,
        studentVeteran: null,
        studentVeteranLink: null,
        poe: true,
        eightKeys: null,
        dodmou: null,
        sec702: null,
        vetsuccessName: null,
        vetsuccessEmail: null,
        creditForMilTraining: false,
        vetPoc: true,
        studentVetGrpIpeds: false,
        socMember: true,
        vaHighestDegreeOffered: 'NCD',
        retentionRateVeteranBa: null,
        retentionAllStudentsBa: null,
        retentionRateVeteranOtb: null,
        retentionAllStudentsOtb: 1,
        persistanceRateVeteranBa: null,
        persistanceRateVeteranOtb: null,
        graduationRateVeteran: 0,
        graduationRateAllStudents: 0.9286,
        transferOutRateVeteran: null,
        transferOutRateAllStudents: null,
        salaryAllStudents: null,
        repaymentRateAllStudents: null,
        avgStuLoanDebt: 7917,
        calendar: 'nontraditional',
        tuitionInState: 14425,
        tuitionOutOfState: 14425,
        books: 1570,
        onlineAll: true,
        p911TuitionFees: 159814.5,
        p911Recipients: 12,
        p911YellowRibbon: 0,
        p911YrRecipients: 0,
        accredited: true,
        accreditationType: 'hybrid',
        accreditationStatus: null,
        cautionFlag: null,
        cautionFlagReason: null,
        complaintsFacilityCode: 4,
        complaintsFinancialByFacCode: 0,
        complaintsQualityByFacCode: 3,
        complaintsRefundByFacCode: 0,
        complaintsMarketingByFacCode: 1,
        complaintsAccreditationByFacCode: 0,
        complaintsDegreeRequirementsByFacCode: 0,
        complaintsStudentLoansByFacCode: 0,
        complaintsGradesByFacCode: 0,
        complaintsCreditTransferByFacCode: 0,
        complaintsCreditJobByFacCode: null,
        complaintsJobByFacCode: 0,
        complaintsTranscriptByFacCode: 0,
        complaintsOtherByFacCode: 0,
        complaintsMainCampusRollUp: 4,
        complaintsFinancialByOpeIdDoNotSum: 0,
        complaintsQualityByOpeIdDoNotSum: 3,
        complaintsRefundByOpeIdDoNotSum: 0,
        complaintsMarketingByOpeIdDoNotSum: 1,
        complaintsAccreditationByOpeIdDoNotSum: 0,
        complaintsDegreeRequirementsByOpeIdDoNotSum: 0,
        complaintsStudentLoansByOpeIdDoNotSum: 0,
        complaintsGradesByOpeIdDoNotSum: 0,
        complaintsCreditTransferByOpeIdDoNotSum: 0,
        complaintsJobsByOpeIdDoNotSum: 0,
        complaintsTranscriptByOpeIdDoNotSum: 0,
        complaintsOtherByOpeIdDoNotSum: 0,
        createdAt: '2023-10-24T11:54:37.000Z',
        updatedAt: '2023-10-24T11:54:37.000Z',
        f1sysnam: null,
        f1syscod: -2,
        ialias: "Austin's Beauty College",
        approvalStatus: null,
        schoolClosing: false,
        schoolClosingOn: null,
        schoolClosingMessage: null,
        stemOffered: false,
        priorityEnrollment: false,
        onlineOnly: false,
        independentStudy: false,
        distanceLearning: false,
        address1: 'PO BOX 1121',
        address2: null,
        address3: null,
        physicalAddress1: '585A S RIVERSIDE DR',
        physicalAddress2: null,
        physicalAddress3: null,
        physicalCity: 'CLARKSVILLE',
        physicalState: 'TN',
        physicalZip: '37040',
        physicalCountry: 'USA',
        dodBah: 1596,
        approved: true,
        vetTecProvider: false,
        closure109: null,
        preferredProvider: false,
        stemIndicator: false,
        campusType: 'Y',
        parentFacilityCodeId: null,
        versionId: 520,
        compliesWithSec103: null,
        solelyRequiresCoe: null,
        requiresCoeAndCriteria: null,
        countOfCautionFlags: 0,
        section103Message: 'No',
        pooStatus: 'APRVD',
        hbcu: 0,
        hcm2: 0,
        menonly: 0,
        pctfloan: 0.7015,
        relaffil: null,
        womenonly: 0,
        institutionSearch: "AUSTIN'S BEAUTY",
        ratingCount: 0,
        ratingAverage: null,
        latitude: 36.5277607,
        longitude: -87.3588703,
        employerProvider: false,
        schoolProvider: true,
        vrrap: null,
        inStateTuitionInformation: null,
        badAddress: false,
        highSchool: null,
        chiefOfficer: null,
        ownershipName: null,
        hsi: 0,
        nanti: 0,
        annhi: 0,
        aanapii: 0,
        pbi: 0,
        tribal: 0,
        ungeocodable: false,
        distance: null,
      },
      branches: [],
      extensions: [],
    },
  },
  programs: [],
  versionedSchoolCertifyingOfficials: [
    {
      id: 18318530,
      facilityCode: '25008642',
      institutionName: "AUSTIN'S BEAUTY COLLEGE INC",
      priority: 'Primary',
      firstName: 'LORIE',
      lastName: 'GIBBS',
      title: 'DIRECTOR OF OPERATIONS',
      phoneAreaCode: '931',
      phoneNumber: '542-4464',
      phoneExtension: null,
      email: 'LGIBBS@AUSTINBEAUTYCOLLEGE.COM',
      version: null,
      institutionId: 30071883,
    },
  ],
  countOfCautionFlags: 0,
  section103Message: 'No',
  hbcu: 0,
  hcm2: 0,
  menonly: 0,
  pctfloan: 0.7015,
  relaffil: null,
  womenonly: 0,
  hsi: 0,
  nanti: 0,
  annhi: 0,
  aanapii: 0,
  pbi: 0,
  tribal: 0,
  institutionRating: null,
  ratingAverage: null,
  ratingCount: 0,
  inStateTuitionInformation: null,
  vrrap: null,
  ownershipName: null,
  website: 'http://www.austinbeautycollege.com/',
  scorecard:
    'https://collegescorecard.ed.gov/school/?219851-austin-s-beauty-college-inc',
  vetWebsiteLink: 'http://www.austinbeautycollege.com/',
  self: 'https://staging-platform-api.va.gov/gids/v0/institutions/25008642',
};

describe('<ProfilePageHeader>', () => {
  it('should render', async () => {
    const screen = renderWithStoreAndRouter(
      <ProfilePageHeader institution={TEST_INSTITUTION} />,
      {
        initialState: {
          constants: mockConstants(),
        },
      },
    );

    await waitFor(() => {
      expect(screen).to.not.be.null;
    });
  });
});
