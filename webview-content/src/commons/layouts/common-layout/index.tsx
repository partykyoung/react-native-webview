import type { HTMLAttributes, PropsWithChildren } from 'react';

import { clsx } from 'clsx';

import styles from './common-layout.module.css';

type CommonLayoutProps = HTMLAttributes<HTMLDivElement> & PropsWithChildren;

function CommonLayout({ className, ...props }: CommonLayoutProps) {
  return <div className={clsx(styles.container, className)} {...props} />;
}

export default CommonLayout;
