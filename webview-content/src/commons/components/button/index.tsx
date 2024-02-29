import { clsx } from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

import styles from './button.module.css';

type ButtonProps = {
  variant?: 'unstyled' | 'primary' | 'secondary';
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ className, variant = 'unstyled', ...props }: ButtonProps) {
  return (
    <button
      className={clsx(styles.button, styles[variant], className)}
      {...props}
    />
  );
}

export default Button;
