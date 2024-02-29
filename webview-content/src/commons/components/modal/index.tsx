import { createPortal } from 'react-dom';
import { useSpring, animated } from 'react-spring';

import { clsx } from 'clsx';

import type { HTMLAttributes, ReactNode } from 'react';

import ModalContent from './modal-content';
import ModalOverlay from './modal-overlay';

import styles from './modal.module.css';

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
} & HTMLAttributes<HTMLDivElement>;

function Modal({ className, isOpen, ...props }: ModalProps) {
  const animation = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });

  if (!isOpen) return null;

  return (
    <>
      {createPortal(
        <animated.div
          style={animation}
          role="none presentation"
          tabIndex={-1}
          className={clsx(styles['modal-root'], className)}
          {...props}
        />,
        document.body,
      )}
    </>
  );
}

const ModalComposition = Object.assign(Modal, {
  Content: ModalContent,
  Overlay: ModalOverlay,
});

export default ModalComposition;
