import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Appearance } from 'react-native';
import InputBar from './components/InputBar';
import CameraView from './components/CameraView';

const { height } = Dimensions.get('window');

const App = () => {
  const [photoTaken, setPhotoTaken] = useState(false);
  const [emsDescription, setEmsDescription] = useState('');
  const colorScheme = Appearance.getColorScheme();

  const handleTakePhoto = () => {
    setPhotoTaken(true);
  };

  const handleSend = async () => {
    if (photoTaken) {
      const generatedDescription = "This is a generated EMS description from OpenAI.";
      setEmsDescription(generatedDescription);
    }
  };
  console.log(colorScheme)
  return (
    <View style={colorScheme === 'dark' ? styles.containerDark : styles.containerLight}>
      <CameraView />
      <View style={colorScheme === 'dark' ? styles.descriptionContainerDark : styles.descriptionContainerLight}>
        <Text style={colorScheme === 'dark' ? styles.descriptionTextDark : styles.descriptionTextLight}>
          {emsDescription || "EMS Description Here"}
        </Text>
      </View>
      <InputBar onTakePhoto={handleTakePhoto} onSend={handleSend} photoTaken={photoTaken} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  containerDark: {
    flex: 1,
    backgroundColor: '#121212',
  },
  descriptionContainerLight: {
    height: height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  descriptionContainerDark: {
    height: height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1E1E1E',
    borderTopWidth: 1,
    borderColor: '#444',
  },
  descriptionTextLight: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  descriptionTextDark: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FFF',
  },
});

export default App;
