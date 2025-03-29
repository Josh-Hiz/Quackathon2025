import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Appearance } from 'react-native';
import InputBar from './components/InputBar';
import CameraView from './components/CameraView';

const { height } = Dimensions.get('window');

type AppState = 'START' | 'PHOTO_TAKEN' | 'SENT_TO_CHATGPT' | 'SENT_TEXT';

const App = () => {
  const startString = 'Take a picture to send to EMS!'
  const [appState, setAppState] = useState<AppState>('START');
  const [emsDescription, setEmsDescription] = useState(startString);
  const colorScheme = Appearance.getColorScheme();

  const handleTakePhoto = () => {
    setAppState('PHOTO_TAKEN');
  };

  const handleSend = async () => {
    if (appState === 'PHOTO_TAKEN') {
      setAppState('SENT_TO_CHATGPT');
      // Simulate API call to ChatGPT
      const generatedDescription = "This is a generated EMS description from OpenAI.";
      setEmsDescription(generatedDescription);
    }
  };

  const handleText = () => {
    if (appState === 'SENT_TO_CHATGPT') {
      setAppState('SENT_TEXT');
      // Here you would actually send the text to the phone number
    }
  };

  const handleRegen = () => {
    if (appState === 'SENT_TO_CHATGPT') {
      // Simulate regenerating the description
      const regeneratedDescription = "This is a regenerated EMS description from OpenAI.";
      setEmsDescription(regeneratedDescription);
    }
  };

  const handleReset = () => {
    setAppState('START');
    setEmsDescription(startString);
  };

  return (
    <View style={colorScheme === 'dark' ? styles.containerDark : styles.containerLight}>
      <CameraView />
      <View style={colorScheme === 'dark' ? styles.descriptionContainerDark : styles.descriptionContainerLight}>
        <Text style={colorScheme === 'dark' ? styles.descriptionTextDark : styles.descriptionTextLight}>
          {emsDescription || "EMS Description Here"}
        </Text>
      </View>

      <InputBar
        appState={appState}
        onTakePhoto={handleTakePhoto}
        onSend={handleSend}
        onText={handleText}
        onRegen={handleRegen}
        onReset={handleReset}
        colorScheme={colorScheme}
      />
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
