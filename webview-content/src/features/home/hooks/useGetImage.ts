import { useCallback, useEffect, useState } from 'react';

import { IMAGE } from '../../../../../src/commons/constants/event';

type ImageEventData = {
  type: string;
  payload?: {
    base64: string;
  };
};

function useGetImage() {
  const [selectedImage, setSelectedImage] = useState('');

  const onCallbackMessage = useCallback((event: MessageEvent) => {
    if (!event || !event.data) return;

    const parsed: ImageEventData = JSON.parse(event.data);

    if (parsed.type === IMAGE) {
      setSelectedImage(parsed.payload?.base64 ?? '');
    }
  }, []);

  useEffect(() => {
    window.addEventListener('message', onCallbackMessage);

    return () => {
      window.removeEventListener('message', onCallbackMessage);
    };
  }, [onCallbackMessage]);

  return { selectedImage };
}

export default useGetImage;
