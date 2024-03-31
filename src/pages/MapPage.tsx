import React, { useEffect } from 'react';
import useGeolocation from 'utils/useGeolocation';
import KaKaoMap from 'map/map';

export default function MapPage() {
  return (
    <div>
      <h1>Map</h1>
      <KaKaoMap />
    </div>
  );
}
