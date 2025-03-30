import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { useAppContext } from './AppContext';

const CameraComponent: React.FC = () => {
  const { appState, photoUri, setPhotoUri, setAppState } = useAppContext();
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const takePhoto = async () => {
    if (cameraRef.current && appState === 'START') {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
      setAppState('PHOTO_TAKEN');
    }
  };

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {appState === 'PHOTO_TAKEN' && photoUri ? (
        <Image source={{ uri: photoUri }} style={styles.camera} />
      ) : (
        <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
      )}
      <Button title="Take Photo" onPress={takePhoto} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  }
});

export default CameraComponent;
