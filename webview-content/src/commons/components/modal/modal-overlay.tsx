import { clsx } from 'clsx';

import { useSpring, animated } from 'react-spring';

import type { HTMLAttributes } from 'react';

import styles from './modal.module.css';

type ModalOverlayProps = {
  onClose?: () => void;
} & HTMLAttributes<HTMLDivElement>;

function ModalOverlay({ className, onClose, ...props }: ModalOverlayProps) {
  const animation = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });

  return (
    <animated.div
      aria-hidden="true"
      className={clsx(styles['modal-overlay'], className)}
      style={animation}
      onClick={onClose}
      {...props}
    />
  );
}

export default ModalOverlay;
