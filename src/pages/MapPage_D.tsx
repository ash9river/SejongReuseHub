import MapContainer from 'components/map/MapContainer';
import { useState, useEffect, useRef } from 'react';
import getGeolocation from 'utils/getGeolocation';

const { kakao } = window;

export default function MapPage() {
  return <MapContainer />;
}
