import {renderHook, act, waitFor} from '@testing-library/react-native';
import useImagePicker from '../useImagePicker';

jest.mock('react-native-image-picker', () => ({
  launchCamera: jest.fn(),
  launchImageLibrary: jest.fn(),
}));

describe('useImagePicker', () => {
  it('카메라 선택으로 이미지를 가지고 올 수 있다', async () => {
    const {result} = renderHook(() => useImagePicker());
    const mockCameraResponse = {
      assets: [
        {
          base64: 'imageBase64String',
        },
      ],
    };

    require('react-native-image-picker').launchCamera.mockImplementation(() =>
      Promise.resolve(mockCameraResponse),
    );

    let image: any;

    act(() => {
      result.current.onGetImageWithCamera().then(res => {
        image = res;
      });
    });

    await waitFor(() =>
      expect(image).toBe(`data:image/jpeg;base64,imageBase64String`),
    );
  });

  it('사진 라이브러리 선택으로 이미지를 정상적으로 가지고 올 수 있다', async () => {
    const {result} = renderHook(() => useImagePicker());
    const mockLibraryResponse = {
      assets: [
        {
          base64: 'albumImageBase64String',
        },
      ],
    };

    require('react-native-image-picker').launchImageLibrary.mockImplementation(
      () => Promise.resolve(mockLibraryResponse),
    );

    let image: any;
    act(() => {
      result.current.onGetImageWithPhotoAlbum().then(res => {
        image = res;
      });
    });

    await waitFor(() =>
      expect(image).toBe(`data:image/jpeg;base64,albumImageBase64String`),
    );
  });
});
