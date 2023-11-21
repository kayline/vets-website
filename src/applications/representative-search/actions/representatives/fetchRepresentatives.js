import * as Sentry from '@sentry/browser';
import {
  FETCH_REPRESENTATIVES,
  SEARCH_FAILED,
  SEARCH_COMPLETE,
} from '../../utils/actionTypes';

import RepresentativeFinderApi from '../../api/RepresentativeFinderApi';
/**
 * Handles the API call to get the type of locations closest to `address`
 * and/or within the given `bounds`.
 *
 * @param {string=} address Address of the center-point of the search area
 * @param {number[]} bounds Geo-coords of the bounding box of the search area
 * @param {string} representativeType (see config.js for valid types)
 * @param {number} page What page of results to request
 * @param {Function} dispatch Redux's dispatch method
 * @param {number} api version number
 */
export const fetchRepresentatives = async (
  address,
  lat,
  long,
  name,
  page,
  /* eslint-disable camelcase */
  per_page,
  sort,
  type,
  dispatch,
) => {
  let data = {};

  try {
    const dataList = await RepresentativeFinderApi.searchByCoordinates(
      address,
      lat,
      long,
      name,
      page,
      per_page,
      sort,
      type,
    );
    data = { ...dataList };
    if (dataList.data) {
      dispatch({ type: SEARCH_COMPLETE, payload: data });
      return dataList.data;
    }

    if (data.errors) {
      dispatch({ type: SEARCH_FAILED, error: data.errors });
    } else {
      dispatch({ type: FETCH_REPRESENTATIVES, payload: data });
    }
  } catch (error) {
    Sentry.withScope(scope => {
      scope.setExtra('error', error);
      Sentry.captureMessage('Error fetching accredited representatives');
    });

    dispatch({ type: SEARCH_FAILED, error: error.message });
  }

  return null;
};
