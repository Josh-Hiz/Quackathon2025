import React, { useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Appearance } from 'react-native';
import { AppProvider, useAppContext } from './AppContext';
import InputBar from './components/InputBar';
import CameraComponent from './components/CameraComponent';

const { height } = Dimensions.get('window');

const MainApp = () => {
	const cameraRef = useRef(null);
	const { current_gpt_response } = useAppContext();
	const colorScheme = Appearance.getColorScheme();

	return (
		<View
			style={
				colorScheme === 'dark' ? styles.containerDark : styles.containerLight
			}
		>
			<CameraComponent ref={cameraRef} />
			<View
				style={
					colorScheme === 'dark'
						? styles.descriptionContainerDark
						: styles.descriptionContainerLight
				}
			>
				<Text
					style={
						colorScheme === 'dark'
							? styles.descriptionTextDark
							: styles.descriptionTextLight
					}
				>
					{current_gpt_response || 'Take a photo to generate an EMS message!'}
				</Text>
			</View>
			<InputBar ref={cameraRef} />
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
