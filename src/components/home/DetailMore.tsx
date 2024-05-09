import { useState, useEffect } from 'react';
import { useAnimate, stagger, motion } from 'framer-motion';
import styles from './DetailMore.module.scss';

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

function useMenuAnimation(isOpen: boolean) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate('.arrow', { rotate: isOpen ? 180 : 0 }, { duration: 0.2 });

    animate(
      'ul',
      {
        clipPath: isOpen
          ? 'inset(0% 0% 0% 0% round 10px)'
          : 'inset(10% 50% 90% 50% round 10px)',
      },
      {
        type: 'spring',
        bounce: 0,
        duration: 0.5,
      },
    );

    animate(
      'li',
      isOpen
        ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
        : { opacity: 0, scale: 0.3, filter: 'blur(20px)' },
      {
        duration: 0.2,
        delay: isOpen ? staggerMenuItems : 0,
      },
    );
  }, [isOpen]);

  return scope;
}

function DetailMore() {
  const [visible, setVisible] = useState<boolean>(false);
  const scope = useMenuAnimation(visible);
  return (
    <nav className="menu" ref={scope}>
      {/* <div
        style={{
          position: 'fixed',
          bottom: -210,
          left: 200,
          width: 100,
          height: 100,
          background: 'white',
        }}
      /> */}
      <motion.button
        className={styles['button-style']}
        whileTap={{ scale: 0.97 }}
        onClick={() => setVisible(!visible)}
      >
        구성원 보기
        <div className="arrow" style={{ transformOrigin: '50% 55%' }}>
          <svg width="15" height="15" viewBox="0 0 20 20">
            <path d="M0 7 L 20 7 L 10 16" />
          </svg>
        </div>
      </motion.button>
      <ul
        style={{
          pointerEvents: visible ? 'auto' : 'none',
          clipPath: 'inset(10% 50% 90% 50% round 10px)',
        }}
      >
        <li>신혁수 </li>
        <li>안리안 </li>
        <li>강재구 </li>
        <li>안희찬 </li>
        <li>윤덕건 </li>
      </ul>
    </nav>
  );
}

export default DetailMore;
