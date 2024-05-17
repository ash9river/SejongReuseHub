import React from 'react';
import style from './MapModal.module.scss';

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  closeModal: () => void;
  lat: number;
  lon: number;
}

function MapModal({ isOpen, children, closeModal, lat, lon }: ModalProps) {
  return (
    <div className={style.wrap} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className={style.modalWrap}>
        <div className={style.mapWrap}>{children}</div>
        <div className={style.bottomWrap}>
          <div className={style.innerWrap}>
            <div className={style.contentWrap}>
              <p>위도 : {lat}</p>
              <p>경도 : {lon}</p>
            </div>
            <button className={style.btn} type="button" onClick={closeModal}>
              위치 설정하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapModal;
