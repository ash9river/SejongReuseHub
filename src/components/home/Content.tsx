import styles from './Content.module.scss';
import DetailMore from './DetailMore';

function Content() {
  return (
    <div className={styles['content-wrap']}>
      재활용을 위한 사이트 여러가지 폐품이나 재활용품 등 교환해보세요
      <DetailMore />
    </div>
  );
}
export default Content;
