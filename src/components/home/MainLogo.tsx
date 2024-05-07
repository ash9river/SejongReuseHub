import { motion } from 'framer-motion';
import styles from './MainLogo.module.scss';

function MainLogo() {
  return (
    <motion.div whileHover={{ scale: 1.1 }}>
      <div className={styles['logo-style']}>Sejong Reuse Hub</div>
    </motion.div>
  );
}

export default MainLogo;
