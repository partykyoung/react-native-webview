import React, {useCallback, useRef} from 'react';
import {Alert, Platform, SafeAreaView, StyleSheet} from 'react-native';

import {WebView, type WebViewMessageEvent} from 'react-native-webview';

import useCheckPermission from './hooks/useCheckPermission';
import useImagePicker from './hooks/useImagePicker';

import {
  IMAGE_WITH_ALBUM,
  IMAGE_WITH_CAMERA,
  IMAGE,
} from '../../commons/constants/event';

function Home(): React.JSX.Element {
  const {onCheckPermission} = useCheckPermission();
  const {onGetImageWithCamera, onGetImageWithPhotoAlbum} = useImagePicker();
  const webviewRef = useRef<WebView<{}>>(null);

  const sourceUrl =
    Platform.OS === 'android'
      ? 'file:///android_asset/index.html'
      : 'assets/index.html';

  const sendMessageInWebview = useCallback((file: string | null) => {
    if (!file) {
      return;
    }

    webviewRef.current?.postMessage(
      JSON.stringify({
        type: IMAGE,
        payload: {
          base64: file,
        },
      }),
    );
  }, []);

  const onMessage = useCallback(
    ({nativeEvent: {data}}: WebViewMessageEvent) => {
      const event = JSON.parse(data);

      if (event.type === IMAGE_WITH_ALBUM) {
        onCheckPermission({
          type: 'photo',
          onFail: (message?: string) => {
            Alert.alert('앨범 라이브러리 권한을 얻을 수 없습니다', message);
          },
          onSuccess: async () => {
            const file = await onGetImageWithPhotoAlbum();

            sendMessageInWebview(file);
          },
        });
      }
      if (event.type === IMAGE_WITH_CAMERA) {
        onCheckPermission({
          type: 'camera',
          onFail: (message?: string) => {
            Alert.alert('카메라 권한을 얻을 수 없습니다', message);
          },
          onSuccess: async () => {
            const file = await onGetImageWithCamera();

            sendMessageInWebview(file);
          },
        });
      }
    },
    [
      sendMessageInWebview,
      onCheckPermission,
      onGetImageWithPhotoAlbum,
      onGetImageWithCamera,
    ],
  );

  return (
    <SafeAreaView style={styles.root}>
      <WebView
        source={{uri: sourceUrl}}
        originWhitelist={['*']}
        style={styles.root}
        ref={webviewRef}
        onMessage={onMessage}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default Home;
