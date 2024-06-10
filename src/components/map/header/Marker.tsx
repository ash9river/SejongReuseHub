import { MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getData } from 'services/getData';
import { useRecoilState } from 'recoil';
import { OpenMarkerState } from 'store/atom/OpenMarkerAtom';
import styles from './Marker.module.scss';

// Position 타입 지정
export interface Position {
  lat: number;
  lng: number;
}

// 포지션 배열과 origin을 추가한 타입 지정
export interface MarkerProps {
  id: number;
  name: string;
  position: Position;
}

const imageSize = { width: 22, height: 30 };

// 컴포넌트를 담은 함수
// 컴포넌트는 항상 JSX를 return하기 때문에 JSX.Element로 타입을 지정하면 된다.
function Marker({ id, name, position }: MarkerProps): JSX.Element {
  const { data: board, isSuccess } = useQuery({
    queryKey: ['postList', id],
    queryFn: ({ signal }) => getData<any>(`api/boards/${id}`, signal),
  });
  const [openMarkerId, setOpenMarkerId] = useRecoilState(OpenMarkerState);
  const navigate = useNavigate();

  const handleMarkerClick = () => {
    setOpenMarkerId(id === openMarkerId ? null : id); // Toggle marker open state
  };

  return (
    <>
      <MapMarker
        key={`${position.lat},${position.lng}`}
        position={position}
        image={{
          src: `/img/${name}pin.png`,
          size: imageSize,
        }}
        onClick={handleMarkerClick}
      />
      {openMarkerId === id && board && (
        <CustomOverlayMap position={position}>
          <div className={styles.wrap}>
            <div className={styles.info}>
              <div className={styles.title}>
                {board.title}
                <button
                  type="button"
                  className={styles.close}
                  onClick={() => setOpenMarkerId(null)}
                >
                  x
                </button>
              </div>
              <div className={styles.body}>
                {board.image && (
                  <div className={styles.img}>
                    <img
                      src={board.image}
                      width="100"
                      height="100"
                      alt="게시물"
                    />
                  </div>
                )}
                <div className={styles.desc}>
                  <div className={styles.content}>{board.content}</div>
                  <div>
                    <button
                      type="button"
                      className={styles.navigateButton}
                      onClick={() => navigate(`../postView/${id}`)}
                    >
                      게시물 이동
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CustomOverlayMap>
      )}
    </>
  );
}

export default Marker;
