import { CameraView, useCameraPermissions } from 'expo-camera';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import {
	Button,
	StyleSheet,
	View,
	Image,
	Text,
	Appearance,
} from 'react-native';
import { useAppContext } from '../AppContext';

const CameraComponent = forwardRef((props, forwardedRef) => {
	const { current_state, current_uri } = useAppContext();
	const [permission, requestPermission] = useCameraPermissions();
	const colorScheme = Appearance.getColorScheme();
	const ref = useRef<CameraView>(null);
	useImperativeHandle(forwardedRef, () => ref.current as CameraView);

	if (!permission) return <View />;
	if (!permission.granted) {
		return (
			<View
				style={
					colorScheme === 'dark' ? styles.containerDark : styles.containerLight
				}
			>
				<Text
					style={
						colorScheme === 'dark'
							? styles.descriptionTextDark
							: styles.descriptionTextLight
					}
				>
					We need your permission to show the camera
				</Text>
				<Button
					onPress={requestPermission}
					title="Grant Permission"
				/>
			</View>
		);
	}

	if (current_state !== 'START' && current_uri) {
		return (
			<View
				style={
					colorScheme === 'dark' ? styles.containerDark : styles.containerLight
				}
			>
				<Image
					source={{ uri: current_uri }}
					style={styles.camera}
				/>
			</View>
		);
	}

	return (
		<View
			style={
				colorScheme === 'dark' ? styles.containerDark : styles.containerLight
			}
		>
			<CameraView
				ref={ref}
				style={styles.camera}
				facing={'back'}
			/>
		</View>
	);
});

const styles = StyleSheet.create({
	containerLight: {
		flex: 1,
		backgroundColor: '#F5F5F5',
		justifyContent: 'center',
	},
	containerDark: {
		flex: 1,
		backgroundColor: '#121212',
		justifyContent: 'center',
	},
	descriptionTextLight: {
		fontSize: 16,
		textAlign: 'center',
		color: '#333',
		paddingBottom: 10,
	},
	descriptionTextDark: {
		fontSize: 16,
		textAlign: 'center',
		color: '#FFF',
		paddingBottom: 10,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	camera: {
		flex: 1,
	},
});

export default CameraComponent;
