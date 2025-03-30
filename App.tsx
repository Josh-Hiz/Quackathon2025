import React from 'react';
import { View, Text, StyleSheet, Dimensions, Appearance } from 'react-native';
import { AppProvider, useAppContext } from './AppContext';
import InputBar from './components/InputBar';
import CameraView from './components/CameraView';

const { height } = Dimensions.get('window');

const MainApp = () => {
  const { current_state, current_gpt_response } = useAppContext();
  const colorScheme = Appearance.getColorScheme();

  return (
    <View style={colorScheme === 'dark' ? styles.containerDark : styles.containerLight}>
      <CameraView />

      <View style={colorScheme === 'dark' ? styles.descriptionContainerDark : styles.descriptionContainerLight}>
        <Text style={colorScheme === 'dark' ? styles.descriptionTextDark : styles.descriptionTextLight}>
          {"TEXT TO DISPLAY: choose current_gpt_response only in the last two states."}
        </Text>
      </View>

      <InputBar />
    </View>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

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
