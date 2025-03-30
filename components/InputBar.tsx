import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from './AppContext';

const InputBar: React.FC = () => {
  const { appState, setAppState, setChatResponse, setPhotoUri } = useAppContext();

  const handleSend = () => {
    if (appState === 'PHOTO_TAKEN') {
      setAppState('SENT_TO_CHATGPT');
      setChatResponse("This is a generated EMS description from OpenAI.");
    }
  };

  const handleReset = () => {
    setPhotoUri(null);
    setAppState('START');
    setChatResponse('Take a picture to send to EMS!');
  };

  return (
    <View style={styles.inputContainer}>
      {appState === 'PHOTO_TAKEN' && (
        <>
          <TouchableOpacity onPress={handleReset} style={styles.button}>
            <Ionicons name="refresh" size={32} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSend} style={styles.button}>
            <Ionicons name="send" size={32} color="grey" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

export default InputBar;
