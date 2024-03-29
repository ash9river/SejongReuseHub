import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SETLOCATION, coordinate } from 'store/map/locationReducer';
import { AppDispatch, RootState } from 'store';

type coordinates = {
  coordinate: coordinate;
  latitudeDelata?: number;
  longitudeDelta?: number;
};

type locationError = {
  status?: number;
  name: string;
  message: string;
} & Error;

type locationType = {
  loaded: boolean;
  coordinate: coordinates;
  error: locationError;
};

function getGeolocation() {
  const { longitude, latitude } = useSelector(
    (state: RootState) => state.locationReducer.coordinate,
  );

  const dispatch: AppDispatch = useDispatch();

  // 성공에 대한 로직
  const onSuccess = (location: {
    coords: { latitude: number; longitude: number };
  }) => {
    dispatch({
      type: SETLOCATION,
      payload: {
        longitude,
        latitude,
      },
    });
  };

  // 에러에 대한 로직a
  const onError = (error: { code: number; message: string }) => {
    throw error;
  };

  useEffect(() => {
    // navigator 객체 안에 geolocation이 없다면
    // 위치 정보가 없는 것.
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation not supported',
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return {
    longitude,
    latitude,
  };
}

export default getGeolocation;
