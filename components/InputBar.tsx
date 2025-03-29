import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputBarProps {
    onTakePhoto: () => void;
    onSend: () => void;
    photoTaken: boolean;
    description: string;
    setDescription: (text: string) => void;
  }

const InputBar: React.FC<InputBarProps> = ({ onTakePhoto, onSend, photoTaken, description, setDescription }) => {
    return (
    <View style={styles.inputContainer}>
      {/* Take Photo Button */}
      <TouchableOpacity onPress={onTakePhoto} style={styles.iconButton}>
        <Ionicons name="camera" size={24} color="black" />
      </TouchableOpacity>

      {/* EMS Description Input */}
      <TextInput
        style={styles.input}
        placeholder="EMS Description Here"
        value={description}
        onChangeText={setDescription}
      />

      {/* Send Button (Disabled if no photo) */}
      <TouchableOpacity onPress={onSend} style={[styles.iconButton, !photoTaken && styles.disabledButton]} disabled={!photoTaken}>
        <Ionicons name="send" size={24} color={!photoTaken ? "gray" : "black"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  iconButton: {
    padding: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    marginHorizontal: 10,
    backgroundColor: '#fff',
  },
});

export default InputBar;
