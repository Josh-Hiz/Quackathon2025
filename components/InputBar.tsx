import React from 'react';
import { Appearance, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../AppContext';
import { exports } from './CameraView'

const InputBar: React.FC = () => {
  const {
    current_state,
    take_photo,
    send_to_gpt,
    regen_gpt,
    send_text,
    reset
  } = useAppContext();
  const colorScheme = Appearance.getColorScheme();
  const iconColor = colorScheme === 'dark' ? 'white' : 'black';
  const disabledColor = colorScheme === 'dark' ? 'gray' : 'lightgray';

  return (
    <View style={colorScheme === 'dark' ? styles.inputContainerDark : styles.inputContainerLight}>
      {/* START state */}
      {current_state === 'START' && (
        <TouchableOpacity onPress={exports.make_photo} style={styles.button}>
          <Ionicons name="camera" size={32} color={iconColor} />
        </TouchableOpacity>
      )}

      {/* PHOTO_TAKEN state */}
      {current_state === 'PHOTO_TAKEN' && (
        <>
          <TouchableOpacity onPress={reset} style={styles.button}>
            <Ionicons name="refresh" size={32} color={iconColor} />
          </TouchableOpacity>
          <TouchableOpacity onPress={send_to_gpt} style={styles.button}>
            <Ionicons name="send" size={32} color={iconColor} />
          </TouchableOpacity>
        </>
      )}

      {/* SENT_TO_CHATGPT state buttons */}
      {current_state === 'SENT_TO_CHATGPT' && (
        <>
          <TouchableOpacity onPress={reset} style={styles.button}>
            <Ionicons name="refresh" size={32} color={iconColor} />
          </TouchableOpacity>
          <TouchableOpacity onPress={regen_gpt} style={styles.button}>
            <Ionicons name="reload" size={32} color={iconColor} />
          </TouchableOpacity>
          <TouchableOpacity onPress={send_text} style={styles.button}>
            <Ionicons name="chatbox" size={32} color={iconColor} />
          </TouchableOpacity>
        </>
      )}

      {/* SENT_TEXT state */}
      {current_state === 'SENT_TEXT' && (
        <TouchableOpacity onPress={reset} style={styles.button}>
          <Ionicons name="refresh" size={32} color={iconColor} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainerLight: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  inputContainerDark: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#121212',
    borderTopWidth: 1,
    borderColor: '#444',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

export default InputBar;
