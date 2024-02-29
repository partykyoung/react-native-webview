import { useSpring, animated } from 'react-spring';
import { clsx } from 'clsx';

import type { HTMLAttributes, PropsWithChildren } from 'react';

import styles from './modal.module.css';

type ModalProps = HTMLAttributes<HTMLDivElement> & PropsWithChildren;

function ModalContent({ className, ...props }: ModalProps) {
  const animation = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });

  return (
    <animated.div
      style={animation}
      className={clsx(styles['modal-content'], className)}
      {...props}
    />
  );
}

export default ModalContent;
