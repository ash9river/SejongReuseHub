import { Dispatch } from 'react';
// 커스텀 컨트롤러 만들다가 말음
type MapType = 'roadmap' | 'skyview';
function KaKaoMapControl(mapType: MapType, setMapType: Dispatch<MapType>) {
  return (
    <div className="custom_typecontrol">
      <button
        type="button"
        id="btnRoadmap"
        className={mapType === 'roadmap' ? 'selected_btn' : 'btn'}
        onClick={() => setMapType('roadmap')}
      >
        지도
      </button>
      <button
        type="button"
        id="btnSkyview"
        className={mapType === 'skyview' ? 'selected_btn' : 'btn'}
        onClick={() => setMapType('skyview')}
      >
        스카이뷰
      </button>
    </div>
  );
}

export default KaKaoMapControl;
