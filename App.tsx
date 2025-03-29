import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CameraView from './components/CameraView';
import InputBar from './components/InputBar';

const App = () => {
  const [photoTaken, setPhotoTaken] = useState(false);
  const [description, setDescription] = useState('');

  const handleTakePhoto = () => {
    // Logic to take photo and set state
    setPhotoTaken(true);
  };

  const handleSend = () => {
    if (photoTaken) {
      // Logic to send EMS report
      console.log('Sending EMS report with description:', description);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView />
      <InputBar
        onTakePhoto={handleTakePhoto}
        onSend={handleSend}
        photoTaken={photoTaken}
        description={description}
        setDescription={setDescription}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default App;
