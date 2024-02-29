import {renderHook, act, waitFor} from '@testing-library/react-native';
import useCheckPermission from '../useCheckPermission'; // Adjust the import path as necessary
import {RESULTS} from 'react-native-permissions';

jest.mock('react-native-permissions', () => ({
  check: jest.fn(),
  request: jest.fn(),
  PERMISSIONS: {
    ANDROID: {
      CAMERA: 'android.permission.CAMERA',
      READ_MEDIA_IMAGES: 'android.permission.READ_MEDIA_IMAGES',
    },
    IOS: {
      CAMERA: 'ios.permission.CAMERA',
      PHOTO_LIBRARY: 'ios.permission.PHOTO_LIBRARY',
    },
  },
  RESULTS: {
    GRANTED: 'granted',
    DENIED: 'denied',
    BLOCKED: 'blocked',
    UNAVAILABLE: 'unavailable',
    LIMITED: 'limited',
  },
}));

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'android',
  select: jest.fn(),
}));

describe('useCheckPermission', () => {
  it('permission이 granted일 때 onSuccess가 정상적으로 실행된다', async () => {
    const {result} = renderHook(() => useCheckPermission());
    const onSuccess = jest.fn();
    const onFail = jest.fn();

    // Mocking the check function to return 'granted'
    require('react-native-permissions').check.mockImplementation(() =>
      Promise.resolve(RESULTS.GRANTED),
    );

    act(() => {
      result.current.onCheckPermission({
        type: 'camera',
        onSuccess,
        onFail,
      });
    });

    await waitFor(() => expect(onSuccess).toHaveBeenCalled());
    await waitFor(() => expect(onFail).not.toHaveBeenCalled());
  });

  it('permission이 blocked일 때 onFail이 정상적으로 실행된다', async () => {
    const {result} = renderHook(() => useCheckPermission());
    const onSuccess = jest.fn();
    const onFail = jest.fn();

    require('react-native-permissions').check.mockImplementation(() =>
      Promise.resolve(RESULTS.BLOCKED),
    );

    act(() => {
      result.current.onCheckPermission({
        type: 'photo',
        onSuccess,
        onFail,
      });
    });

    await waitFor(() => expect(onSuccess).not.toHaveBeenCalled());
    await waitFor(() => expect(onFail).toHaveBeenCalled());
  });

  it('permission이 denied일 때 request가 정상적으로 실행된다', async () => {
    const {result} = renderHook(() => useCheckPermission());
    const onSuccess = jest.fn();
    const onFail = jest.fn();

    require('react-native-permissions').check.mockImplementation(() =>
      Promise.resolve(RESULTS.DENIED),
    );

    act(() => {
      result.current.onCheckPermission({
        type: 'camera',
        onSuccess,
        onFail,
      });
    });

    await waitFor(() =>
      expect(require('react-native-permissions').request).toHaveBeenCalled(),
    );
  });
});
