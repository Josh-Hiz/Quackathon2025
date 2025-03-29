import React, { useState, useRef, useEffect } from 'react';
import {
  View, TextInput, TouchableOpacity, FlatList,
  Text, StyleSheet, Image, Dimensions, Platform
} from 'react-native';
import getCameraView from './components/CameraView';

const { width } = Dimensions.get('window');


const ChatScreen = () => {
  const cameraView = getCameraView()

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [photoUri, setPhotoUri] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const cameraRef = useRef(null);
  const webcamRef = useRef(null);
  const flatListRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true)
  return cameraView
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  messagesContainer: { flexGrow: 1, padding: 10 },
  message: { backgroundColor: '#007AFF', color: '#fff', padding: 10, marginVertical: 5, borderRadius: 10, alignSelf: 'flex-start', maxWidth: '80%' },
  imageContainer: { width: '100%', marginVertical: 5 },
  image: { width: '100%', height: width * 0.75, resizeMode: 'cover' },
  previewContainer: { position: 'absolute', bottom: 70, left: 10, right: 10, backgroundColor: '#000', borderRadius: 10, overflow: 'hidden' },
  previewImage: { width: '100%', height: width * 0.75, resizeMode: 'cover' },
  closeButton: { position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 15, padding: 5 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#ddd' },
  iconButton: { padding: 8 },
  input: { flex: 1, padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 20, marginHorizontal: 10, backgroundColor: '#fff' },
  cameraContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  camera: { width: width, height: width * 1.3 },
  webcam: { width: width, height: width * 1.3 },
  captureButton: { position: 'absolute', bottom: 20, alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.6)', padding: 15, borderRadius: 50 },
});

export default ChatScreen;