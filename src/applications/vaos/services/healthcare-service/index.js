/**
 * @module services/HealthcareService
 */
import { getAvailableClinics } from '../var';
import { transformAvailableClinics } from './transformers';
import { mapToFHIRErrors } from '../utils';
import { getSupportedLocationsByTypeOfCare } from '../location';

/**
 * Method to get available HealthcareService objects.
 *
 * @param {Object} params
 * @param {string} params.facilityId The VistA facility id
 * @param {string} params.typeOfCareId An id for the type of care to check for the chosen organization
 * @param {string} params.systemId The VistA 3 digit site id
 *
 * @returns {Array<HealthCareService>} An a collection of HealthcareService objects.
 */
export async function getAvailableHealthcareServices({
  facilityId,
  typeOfCareId,
  systemId,
}) {
  try {
    const clinics = await getAvailableClinics(
      facilityId,
      typeOfCareId,
      systemId,
    );

    return transformAvailableClinics(facilityId, typeOfCareId, clinics).sort(
      (a, b) =>
        a.serviceName.toUpperCase() < b.serviceName.toUpperCase() ? -1 : 1,
    );
  } catch (e) {
    if (e.errors) {
      throw mapToFHIRErrors(e.errors);
    }

    throw e;
  }
}

/**
 * Fetch facility information for the facilities in the given site, based on type of care
 *
 * @export
 * @async
 * @param {Object} locationParams Parameters needed for fetching locations
 * @param {string} locationParams.siteId The VistA site id of the services being pulled
 * @param {string} locationParams.parentId An id for the parent organization of the facilities being pulled
 * @param {string} locationParams.typeOfCareId An id for the type of care to check for the chosen organization
 * @returns {Array<Location>} An array of Location resources
 */
export async function getSupportedHealthcareServicesAndLocations({
  siteId,
  parentId,
  typeOfCareId,
}) {
  const results = await getSupportedLocationsByTypeOfCare({
    siteId,
    parentId,
    typeOfCareId,
  });

  return results.filter(item => item.resourceType === 'Location');
}

/**
 * Method to get the clinic id.
 *
 * @param {HealthCareService} clinic
 * @returns {string} The clinic id or empty string.
 */
export function getClinicId(clinic) {
  return clinic.id.split('_')[1];
}

/**
 * Method to get the site code.
 *
 * @param {Object} clinic
 * @returns {String} The clinic site code or empty string.
 */
export function getSiteCode(clinic) {
  return clinic.id.split('_')[0];
}
