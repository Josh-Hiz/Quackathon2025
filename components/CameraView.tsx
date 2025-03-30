import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { forwardRef, useRef, useState } from 'react';
import { Button, StyleSheet, View, Image, Text } from 'react-native';
import { useAppContext } from '../AppContext';

const CameraComponent = forwardRef((props, ref) => {
  const { current_state, current_uri, set_uri } = useAppContext();
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  if (current_state !== 'START' && current_uri) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: current_uri }} style={styles.camera} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={ref}
        style={styles.camera}
        facing={facing}
      />
    </View>
  );
});

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
