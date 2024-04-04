import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';

export default function UseKakaoLoader() {
  useKakaoLoaderOrigin({
    appkey: 'a19f0b0e3e3772c7abfdee46090b1727',
    libraries: ['clusterer', 'drawing', 'services'],
  });
}
