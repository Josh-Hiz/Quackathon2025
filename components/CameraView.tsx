import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button, StyleSheet, Text, View, Appearance } from 'react-native';

const cameraComponent = () => { 
    const [permission, requestPermission] = useCameraPermissions();
    const colorScheme = Appearance.getColorScheme();

    if (!permission) {
      // Camera permissions are still loading.
      return <View />;
    }
  
    if (!permission.granted) {
      // Camera permissions are not granted yet.
      return (
        <View style={colorScheme === 'dark' ? styles.containerDark : styles.containerLight}>
          <Text style={colorScheme === 'dark' ? styles.descriptionTextDark : styles.descriptionTextLight}>We need your permission to show the camera</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      );
    }
  
    return (
      <View style={colorScheme === 'dark' ? styles.containerDark : styles.containerLight}>
        <CameraView style={styles.camera} facing={'back'}>
        </CameraView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    containerLight: {
      flex: 1,
      backgroundColor: '#F5F5F5',
      justifyContent: 'center'
    },
    containerDark: {
      flex: 1,
      backgroundColor: '#121212',
      justifyContent: 'center'
    },
    descriptionTextLight: {
      fontSize: 16,
      textAlign: 'center',
      color: '#333',
      paddingBottom: 10,
    },
    descriptionTextDark: {
      fontSize: 16,
      textAlign: 'center',
      color: '#FFF',
      paddingBottom: 10,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    camera: {
      flex: 1,
    }
  });

export default cameraComponent