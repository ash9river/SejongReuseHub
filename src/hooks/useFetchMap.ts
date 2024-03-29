import { useEffect, useRef } from 'react';
import { coordinate } from 'store/map/locationReducer';

const { kakao } = window;

const useFetchMap = (coordinate: coordinate) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { longitude, latitude } = coordinate;

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY as string}&autoload=false`;
    document.head.appendChild(script);
    script.onload = () => {
      kakao.maps.load(() => {
        const center = new kakao.maps.LatLng(latitude, longitude);
        const options = {
          center,
          level: 3,
        };
        kakao.maps.load(() => {
          const map = new kakao.maps.Map(containerRef.current!, options);
        });
        /*       const markerPosition  = new kakao.maps.LatLng(latitude, longitude); 
      
            const marker = new kakao.maps.Marker({
                position: markerPosition
            });
      
            marker.setMap(map); */
      });
    };

    return () => {
      script.remove();
    };
  }, []);
  return { containerRef };
};

export default useFetchMap;
