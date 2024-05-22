import { ReactNode, forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';
// import { useEffect } from 'react';

type ModalProps = {
  children: ReactNode;
};

type ModalHandle = {
  open: () => void;
};

const Modal = forwardRef<ModalHandle, ModalProps>(function Modal(
  { children },
  ref,
) {
  const dialog = useRef<HTMLDialogElement>(null);
  const element = document.getElementById('modal');

  useImperativeHandle(ref, () => {
    return {
      open() {
        if (dialog.current) {
          dialog.current.showModal();
        }
      },
      close() {
        if (dialog.current) {
          dialog.current.close();
        }
      },
    };
  });

  if (element) {
    return createPortal(
      <dialog ref={dialog} className={styles.modal}>
        {children}
      </dialog>,
      element,
    );
  }
  return null;
});

export default Modal;
