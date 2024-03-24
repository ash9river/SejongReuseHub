import React, { useEffect } from 'react';
import useGeolocation from 'utils/useGeolocation';

const { kakao } = window;

export default function MapPage() {
  const location = useGeolocation();
  console.log(location);
  useEffect(() => {
    console.log(location);
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(
        location.coordinates?.lat,
        location.coordinates?.lng,
      ),
      level: 2,
    };

    const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
  }, [location]); //api 불러오는 시간이 필요함
  return (
    <section>
      <h1>Map</h1>
      <div id="map" style={{ width: 500, height: 500 }} />
    </section>
  );
}
