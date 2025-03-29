import React from 'react';
import { View, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputBarProps {
  onTakePhoto: () => void;
  onSend: () => void;
  photoTaken: boolean;
}

const InputBar: React.FC<InputBarProps> = ({ onTakePhoto, onSend, photoTaken }) => {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === 'dark' ? 'white' : 'black';
  const disabledColor = colorScheme === 'dark' ? 'gray' : 'lightgray';

  return (
    <View style={colorScheme === 'dark' ? styles.inputContainerDark : styles.inputContainerLight}>
      {/* Take Photo Button */}
      <TouchableOpacity onPress={onTakePhoto} style={styles.button}>
        <Ionicons name="camera" size={32} color={iconColor} />
      </TouchableOpacity>

      {/* Send Button (Disabled if no photo) */}
      <TouchableOpacity onPress={onSend} style={[styles.button, !photoTaken && styles.disabledButton]} disabled={!photoTaken}>
        <Ionicons name="send" size={32} color={!photoTaken ? disabledColor : iconColor} />
      </TouchableOpacity>
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
  disabledButton: {
    opacity: 0.5,
  },
});

export default InputBar;