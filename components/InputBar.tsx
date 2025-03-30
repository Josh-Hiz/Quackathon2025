import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputBarProps {
  appState: 'START' | 'PHOTO_TAKEN' | 'SENT_TO_CHATGPT' | 'SENT_TEXT';
  onTakePhoto: () => void;
  onSend: () => void;
  onText: () => void;
  onRegen: () => void;
  onReset: () => void;
  colorScheme: string | null | undefined;
}

const InputBar: React.FC<InputBarProps> = ({
  appState,
  onTakePhoto,
  onSend,
  onText,
  onRegen,
  onReset,
  colorScheme,
}) => {
  const iconColor = colorScheme === 'dark' ? 'white' : 'lightgrey';
  return (
    <View style={colorScheme === 'dark' ? styles.inputContainerDark : styles.inputContainerLight}>
      {/* START state buttons */}
      {appState === 'START' && (
        <TouchableOpacity onPress={onTakePhoto} style={styles.button}>
          <Ionicons name="camera" size={32} color={iconColor} />
        </TouchableOpacity>
      )}

      {/* PHOTO_TAKEN state buttons */}
      {appState === 'PHOTO_TAKEN' && (
        <>
          <TouchableOpacity onPress={onReset} style={styles.button}>
            <Ionicons name="refresh" size={32} color={iconColor} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onSend} style={styles.button}>
            <Ionicons name="send" size={32} color={iconColor} />
          </TouchableOpacity>
        </>
      )}

      {/* SENT_TO_CHATGPT state buttons */}
      {appState === 'SENT_TO_CHATGPT' && (
        <>
          <TouchableOpacity onPress={onReset} style={styles.button}>
            <Ionicons name="refresh" size={32} color={iconColor} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onRegen} style={styles.button}>
            <Ionicons name="reload" size={32} color={iconColor} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onText} style={styles.button}>
            <Ionicons name="chatbox" size={32} color={iconColor} />
          </TouchableOpacity>
        </>
      )}

      {/* SENT_TEXT state buttons - Only reset available */}
      {appState === 'SENT_TEXT' && (
        <TouchableOpacity onPress={onReset} style={styles.button}>
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