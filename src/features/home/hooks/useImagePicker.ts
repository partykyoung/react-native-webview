import {useCallback} from 'react';
import {
  type ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

function useImagePicker() {
  const onGetImage = useCallback((result: ImagePickerResponse) => {
    const localUri = result.assets?.[0].base64 ?? '';

    return localUri ? `data:image/jpeg;base64,${localUri}` : '';
  }, []);

  const onGetImageWithCamera = useCallback(async () => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        cameraType: 'back',
        includeBase64: true,
      });

      if (result.didCancel) {
        return null;
      }

      return onGetImage(result);
    } catch (error) {
      return null;
    }
  }, [onGetImage]);

  const onGetImageWithPhotoAlbum = useCallback(async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: true,
      });

      if (result.didCancel) {
        return null;
      }
      return onGetImage(result);
    } catch (error) {
      return null;
    }
  }, [onGetImage]);

  return {
    onGetImageWithCamera,
    onGetImageWithPhotoAlbum,
  };
}

export default useImagePicker;
