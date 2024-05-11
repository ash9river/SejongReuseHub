import { useState, useEffect } from 'react';

type coordinates = {
  coordinate: coordinateType;
  latitudeDelata?: number;
  longitudeDelta?: number;
};
type coordinateType = {
  longitude: number;
  latitude: number;
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
  const [position, setPosition] = useState<coordinateType>({
    latitude: 0,
    longitude: 0,
  });
  // 성공에 대한 로직
  const onSuccess = (location: {
    coords: { latitude: number; longitude: number };
  }) => {
    const item: coordinateType = {
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    };
    setPosition(item);
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
    longitude: position.longitude,
    latitude: position.latitude,
  };
}

export default getGeolocation;
