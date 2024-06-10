import ThisIsTmp from 'components/ThisIsTmp';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  GithubProfile,
  UserProps,
  getUserData,
  getUserDataWithThunk,
} from 'services/getData';
import { AppDispatch, RootState } from 'store';

export default function TmpPage() {
  return <ThisIsTmp />;
}
