import ThisIsTmp from 'components/ThisIsTmp';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getData } from 'services/api-requester';
import {
  GithubProfile,
  UserProps,
  getUserData,
  getUserDataWithThunk,
} from 'services/getData';
import { AppDispatch, RootState } from 'store';

export default function TmpPage() {
  return <ThisIsTmp />;
  /*   const userData = useSelector(
    (state: RootState) => state.exampleReducer.exampleItems,
  );

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserDataWithThunk());
  }, [dispatch]);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  if (!userData) {
    return <h1>No data found!</h1>;
  }

  return (
    <h5>
      {userData &&
        userData.map((profile) =>
          Object.entries(profile).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          )),
        )}
    </h5>
  ); */
}
