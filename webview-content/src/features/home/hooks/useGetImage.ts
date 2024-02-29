import { useCallback, useEffect, useState } from 'react';

type ImageEventData = {
  type: string;
  payload?: {
    base64: string;
  };
};

function useGetImage() {
  const [selectedImage, setSelectedImage] = useState('');

  const onCallbackMessage = useCallback((event: MessageEvent) => {
    if (!event?.data) return;

    const parsed: ImageEventData = JSON.parse(event.data);

    if (parsed.type === 'image') {
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
