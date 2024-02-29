import {useCallback} from 'react';
import {Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const androidPermissions = {
  camera: PERMISSIONS.ANDROID.CAMERA,
  photo: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};

const iosPermissions = {
  camera: PERMISSIONS.IOS.CAMERA,
  photo: PERMISSIONS.IOS.PHOTO_LIBRARY,
};

function useCheckPermission() {
  const permissions =
    Platform.OS === 'android' ? androidPermissions : iosPermissions;

  const onCheckPermission = useCallback(
    async ({
      type,
      onSuccess,
      onFail,
    }: {
      type: 'camera' | 'photo';
      onSuccess: () => void;
      onFail: (message?: string) => void;
    }) => {
      try {
        const permissionMessage = `앱 설정에서 ${
          type === 'camera' ? '카메라' : '사진 라이브러리'
        } 권한을 허용해주세요`;
        const checkedPermission = await check(permissions[type]);

        if (checkedPermission === RESULTS.UNAVAILABLE) {
          return onFail();
        }

        if (
          checkedPermission === RESULTS.LIMITED ||
          checkedPermission === RESULTS.BLOCKED
        ) {
          return onFail(permissionMessage);
        }

        if (checkedPermission === RESULTS.GRANTED) {
          return onSuccess();
        }

        const requestedPermission = await request(permissions[type]);

        if (requestedPermission === RESULTS.GRANTED) {
          return onSuccess();
        }

        return onFail(permissionMessage);
      } catch {
        return onFail();
      }
    },
    [permissions],
  );

  return {
    onCheckPermission,
  };
}

export default useCheckPermission;
