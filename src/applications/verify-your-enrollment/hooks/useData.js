import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { translateDateIntoMonthDayYearFormat } from '../helpers';
import { getData } from '../actions';

export const useData = () => {
  // This custom hook is for fetching and preparing user data from the Redux state.
  const dispatch = useDispatch();
  const { data, loading } = useSelector(state => state.getDataReducer);

  useEffect(
    () => {
      dispatch(getData());
    },
    [dispatch],
  );
  const userInfo = data && data['vye::UserInfo'];
  const date = translateDateIntoMonthDayYearFormat(userInfo?.delDate);
  return {
    loading,
    date,
    enrollmentData: userInfo,
    ...userInfo,
  };
};
