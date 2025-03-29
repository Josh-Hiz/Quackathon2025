import React, { useState, useRef, useEffect } from 'react';
import {
  View, TouchableOpacity, FlatList,
  Text, StyleSheet, Image, Dimensions, Platform,
  TextInput, Alert, Linking
} from 'react-native';
import { Camera } from 'expo-camera';
import Webcam from 'react-webcam';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

type Message = {
  id: string;
  image: string;
};

const PhotoApp = () => {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const cameraRef = useRef<Camera>(null);
  const webcamRef = useRef<Webcam>(null);
  const flatListRef = useRef<FlatList>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const phoneInputRef = useRef<TextInput>(null);

  // Request Camera Permission
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      } else {
        setHasPermission(true);
      }
    })();
  }, []);

  // Focus phone input when shown
  useEffect(() => {
    if (showPhoneInput && phoneInputRef.current) {
      phoneInputRef.current.focus();
    }
  }, [showPhoneInput]);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const containerHeight = event.nativeEvent.layoutMeasurement.height;
    setIsAtBottom(offsetY + containerHeight >= contentHeight - 20);
  };

  const openCamera = () => {
    setIsCameraOpen(true);
  };

  const takePhotoMobile = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
      setPhotoUri(photo.uri);
      setIsCameraOpen(false);
    }
  };

  const takePhotoWeb = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setPhotoUri(imageSrc);
      setIsCameraOpen(false);
    }
  };

  const sendPhoto = () => {
    if (photoUri) {
      setMessages([...messages, { id: messages.length.toString(), image: photoUri }]);
      setPhotoUri(null);
      if (isAtBottom && flatListRef.current) {
        setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
      }
    }
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  const handleCall = async () => {
    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter a phone number');
      return;
    }

    if (Platform.OS === 'web') {
      const telLink = document.createElement('a');
      telLink.href = `tel:${phoneNumber}`;
      telLink.click();

      setTimeout(() => {
        if (!document.hidden) {
          Alert.alert(
            'Call Not Initiated',
            `To call ${phoneNumber}, please use your phone's dialer`,
            [
              {
                text: 'Copy Number',
                onPress: () => {
                  navigator.clipboard.writeText(phoneNumber);
                  Alert.alert('Number copied to clipboard');
                }
              },
              { text: 'OK' }
            ]
          );
        }
      }, 300);
    } else {
      const url = Platform.select({
        ios: `telprompt:${phoneNumber}`,
        android: `tel:${phoneNumber}`,
      });
      try {
        await Linking.openURL(url!);
      } catch (error) {
        Alert.alert('Error', 'Failed to initiate call');
      }
    }
  };

  const handleSMS = async () => {
    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter a phone number');
      return;
    }

    const lastPhoto = messages.length > 0 ? messages[messages.length - 1].image : null;
    const message = lastPhoto ? 'Emergency photo attached' : 'Emergency call';

    if (Platform.OS === 'web') {
      const smsLink = document.createElement('a');
      smsLink.href = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
      smsLink.click();

      setTimeout(() => {
        if (!document.hidden) {
          Alert.alert(
            'SMS Not Initiated',
            `To message ${phoneNumber}, please use your phone's messaging app`,
            [
              {
                text: 'Copy Number',
                onPress: () => {
                  navigator.clipboard.writeText(phoneNumber);
                  Alert.alert('Number copied to clipboard');
                }
              },
              {
                text: 'Copy Message',
                onPress: () => {
                  navigator.clipboard.writeText(message);
                  Alert.alert('Message copied to clipboard');
                }
              },
              { text: 'OK' }
            ]
          );
        }
      }, 300);
    } else {
      let url: string;
      if (Platform.OS === 'ios') {
        url = `sms:${phoneNumber}&body=${encodeURIComponent(message)}`;
      } else {
        url = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
      }
      try {
        await Linking.openURL(url);
      } catch (error) {
        Alert.alert('Error', 'Failed to open messaging app');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Camera View with Visible Controls */}
      {isCameraOpen && hasPermission && Platform.OS !== 'web' ? (
        <View style={styles.cameraContainer}>
          <Camera
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.cameraControls}>
            <TouchableOpacity style={styles.closeButton} onPress={closeCamera}>
              <Icon name="times" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.captureButton} onPress={takePhotoMobile}>
              <Icon name="camera" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      ) : isCameraOpen && Platform.OS === 'web' ? (
        <View style={styles.cameraContainer}>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "user" }}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.cameraControls}>
            <TouchableOpacity style={styles.closeButton} onPress={closeCamera}>
              <Icon name="times" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.captureButton} onPress={takePhotoWeb}>
              <Icon name="camera" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          {/* Phone Number Input */}
          {showPhoneInput && (
            <View style={styles.phoneInputContainer}>
              <TextInput
                ref={phoneInputRef}
                style={styles.phoneInput}
                placeholder="Enter phone number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                autoFocus={true}
                onSubmitEditing={() => {
                  // Optional: Auto-submit when user presses return
                  if (phoneNumber.trim()) {
                    handleCall();
                  }
                }}
              />
              <TouchableOpacity
                style={styles.closePhoneInput}
                onPress={() => setShowPhoneInput(false)}
              >
                <Icon name="times" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          )}

          {/* Messages List */}
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
              </View>
            )}
            contentContainerStyle={styles.messagesContainer}
            onScroll={handleScroll}
          />

          {/* Image Preview */}
          {photoUri && (
            <View style={styles.previewContainer}>
              <Image source={{ uri: photoUri }} style={styles.previewImage} />
              <TouchableOpacity style={styles.closeButton} onPress={() => setPhotoUri(null)}>
                <Icon name="times-circle" size={24} color="white" />
              </TouchableOpacity>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={openCamera}>
              <Icon name="camera" size={24} color="white" />
              <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: photoUri ? '#007AFF' : '#ccc' }]}
              onPress={sendPhoto}
              disabled={!photoUri}
            >
              <Icon name="send" size={24} color="white" />
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
          </View>

          {/* Emergency Buttons */}
          <View style={styles.emergencyButtonContainer}>
            {!showPhoneInput ? (
              <TouchableOpacity
                style={styles.emergencyButton}
                onPress={() => setShowPhoneInput(true)}
              >
                <Icon name="phone" size={20} color="white" />
                <Text style={styles.emergencyButtonText}>Emergency Call</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  style={[styles.emergencyButton, { backgroundColor: '#4CAF50' }]}
                  onPress={handleCall}
                >
                  <Icon name="phone" size={20} color="white" />
                  <Text style={styles.emergencyButtonText}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.emergencyButton, { backgroundColor: '#FF9800' }]}
                  onPress={handleSMS}
                >
                  <Icon name="envelope" size={20} color="white" />
                  <Text style={styles.emergencyButtonText}>SMS</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', justifyContent: 'flex-end' },
  messagesContainer: { flexGrow: 1, padding: 10 },
  imageContainer: { width: '100%', marginVertical: 5 },
  image: { width: '100%', height: width * 0.75, resizeMode: 'cover', borderRadius: 8 },
  previewContainer: {
    position: 'absolute',
    bottom: 150,
    left: 10,
    right: 10,
    backgroundColor: '#000',
    borderRadius: 10,
    overflow: 'hidden'
  },
  previewImage: { width: '100%', height: width * 0.75, resizeMode: 'cover' },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    padding: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
    backgroundColor: '#F5F5F5'
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    minWidth: '40%',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  cameraControls: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  captureButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    borderRadius: 50,
  },
  emergencyButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderTopWidth: 1,
    borderTopColor: '#ddd'
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F44336',
    padding: 12,
    borderRadius: 10,
    minWidth: '45%',
    justifyContent: 'center'
  },
  emergencyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  phoneInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16
  },
  closePhoneInput: {
    padding: 5,
    marginLeft: 5
  }
});

export default PhotoApp;
