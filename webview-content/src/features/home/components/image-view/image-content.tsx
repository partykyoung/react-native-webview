import type { HTMLAttributes } from 'react';

import styles from './image-view.module.css';
import { clsx } from 'clsx';

type ImageViewProps = {
  url: string;
} & HTMLAttributes<HTMLImageElement>;

function ImageContent({ url, className, ...props }: ImageViewProps) {
  return (
    <img
      src={url}
      alt="선택된 이미지"
      className={clsx(styles['image-content'], className)}
      {...props}
    />
  );
}

export default ImageContent;
