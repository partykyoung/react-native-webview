import Button from '../../../../commons/components/button';
import Modal from '../../../../commons/components/modal';

import styles from './image-select-modal.module.css';

import {
  IMAGE_WITH_ALBUM,
  IMAGE_WITH_CAMERA,
} from '../../../../../../src/commons/constants/event';

type ImageSelectModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function ImageSelectModal({ isOpen, onClose }: ImageSelectModalProps) {
  const handleClickCamera = () => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({ type: IMAGE_WITH_CAMERA }),
    );
  };

  const handleClickAlbum = () => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({ type: IMAGE_WITH_ALBUM }),
    );
  };

  return (
    <Modal isOpen={isOpen}>
      <Modal.Overlay onClick={onClose} />
      <Modal.Content className={styles['image-select-modal-content']}>
        <Button
          type="button"
          variant="secondary"
          className={styles['image-select-modal-button']}
          onClick={handleClickCamera}
        >
          카메라로 찍기
        </Button>
        <Button
          type="button"
          variant="primary"
          className={styles['image-select-modal-button']}
          onClick={handleClickAlbum}
        >
          앨범에서 선택
        </Button>
      </Modal.Content>
    </Modal>
  );
}

export default ImageSelectModal;
