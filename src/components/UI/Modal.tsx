import { ReactNode, forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

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
    };
  });

  if (element) {
    return createPortal(<dialog ref={dialog}>{children}</dialog>, element);
  }
  return null;
});
