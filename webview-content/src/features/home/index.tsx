import Button from '../../commons/components/button';
import CommonLayout from '../../commons/layouts/common-layout';
import ImageSelectModal from './components/image-select-modal';

import useGetImage from './hooks/useGetImage';
import ImageView from './components/image-view';

import styles from './home.module.css';
import { useEffect, useState } from 'react';

function Home() {
  const { selectedImage } = useGetImage();
  const [isOpenModal, setIsOpenModal] = useState(false);

  function onOpenModal() {
    setIsOpenModal(true);
  }

  function onCloseModal() {
    setIsOpenModal(false);
  }

  useEffect(() => {
    if (selectedImage) onCloseModal();
  }, [selectedImage, onCloseModal]);

  return (
    <>
      <CommonLayout>
        <div className={styles['wrapper']}>
          <ImageView className={styles['select-image-view']}>
            {selectedImage ? (
              <ImageView.Content url={selectedImage} />
            ) : (
              <span>이미지를 선택해주세요</span>
            )}
          </ImageView>
          <Button
            variant="primary"
            className={styles['image-button']}
            onClick={onOpenModal}
          >
            이미지 선택
          </Button>
        </div>
      </CommonLayout>
      <ImageSelectModal isOpen={isOpenModal} onClose={onCloseModal} />
    </>
  );
}

export default Home;
