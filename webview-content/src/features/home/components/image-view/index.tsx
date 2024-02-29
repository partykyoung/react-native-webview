import { clsx } from 'clsx';

import type { HTMLAttributes } from 'react';

import ImageContent from './image-content';

import styles from './image-view.module.css';

function ImageView({ className, ...props }: HTMLAttributes<HTMLImageElement>) {
  return <div className={clsx(styles['image-view'], className)} {...props} />;
}

const ImageViewComposition = Object.assign(ImageView, {
  Content: ImageContent,
});

export default ImageViewComposition;
