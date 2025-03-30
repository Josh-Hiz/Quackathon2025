import React, { createContext, useContext, useState } from 'react';
import { runDeepModel } from './assets/ts/deepModel/deepModel';
import { getOpenAIClient } from './assets/ts/gpt/openaiService';
import * as Location from 'expo-location';
import * as SMS from 'expo-sms';

interface AppContextType {
	// current_cam_perms: PermissionResponse | null;
	// set_cam_perms: (perms: PermissionResponse | null) => void;
	current_uri: string | null;
	set_uri: (uri: string | null) => void;
	current_state: 'START' | 'PHOTO_TAKEN' | 'SENT_TO_CHATGPT' | 'SENT_TEXT';
	set_state: (
		state: 'START' | 'PHOTO_TAKEN' | 'SENT_TO_CHATGPT' | 'SENT_TEXT'
	) => void;
	current_emergency_type: string | null;
	set_emergency_type: (emergency_type: string | null) => void;
	current_gpt_response: string | null;
	set_gpt_response: (gpt_response: string | null) => void;
	take_photo: () => void;
	send_to_gpt: () => void;
	regen_gpt: () => void;
	send_text: () => void;
	reset: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	// const [current_cam_perms, set_cam_perms] = useState<PermissionResponse | null>(null);
	const [current_uri, set_uri] = useState<string | null>(null);
	const [current_state, set_state] = useState<
		'START' | 'PHOTO_TAKEN' | 'SENT_TO_CHATGPT' | 'SENT_TEXT'
	>('START');
	const [current_emergency_type, set_emergency_type] = useState<string | null>(
		null
	);
	const [current_gpt_response, set_gpt_response] = useState<string | null>(
		null
	);

	const take_photo = () => {
		set_state('PHOTO_TAKEN');
	};

	// Helper function to get current location
	async function getCurrentLocation() {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			throw 'Permission to access location was denied';
		}
		let location = await Location.getCurrentPositionAsync({});
		return location.coords;
	}

	const send_to_gpt = async () => {
		if (current_state === 'PHOTO_TAKEN') {
			set_state('SENT_TO_CHATGPT');
			try {
				const emergencyType = await runDeepModel(current_uri);
				set_emergency_type(emergencyType);
				const currentLocation = await getCurrentLocation();
				const openaiClient = await getOpenAIClient();
				set_gpt_response('Generating output, please stand by...');
				const response = await openaiClient.chat.completions.create({
					model: 'deepseek-chat',
					messages: [
						{
							role: 'system',
							content:
								'You are an assistant generating emergency SMS messages for first responders.',
						},
						{
							role: 'user',
							content: `Regenerate an urgent emergency SMS message for a ${emergencyType} occurring at ${currentLocation.latitude}, ${currentLocation.longitude}. The message should be concise and clear. Output in the following form: 1st line is the current situation, describe it generally, 2nd line is "Current Location: (${currentLocation.latitude}, ${currentLocation.longitude})"`,
						},
					],
					temperature: 0.7,
					max_tokens: 100,
				});
				const generatedMessage =
					response.choices[0]?.message?.content ||
					'ERROR: Emergency message could not be generated, please retry or call EMS!';
				set_gpt_response(generatedMessage);
			} catch (e) {
				console.log(e);
				set_gpt_response('ERROR: Could not generate message.');
			}
		}
	};

	const regen_gpt = async () => {
		if (current_state === 'SENT_TO_CHATGPT') {
			try {
				// Re-run the deep model and regenerate the emergency message
				const emergencyType = await runDeepModel(current_uri);
				set_emergency_type(emergencyType);
				const currentLocation = await getCurrentLocation();
				const openaiClient = await getOpenAIClient();
				set_gpt_response('Generating output, please stand by...');
				const response = await openaiClient.chat.completions.create({
					model: 'deepseek-chat',
					messages: [
						{
							role: 'system',
							content:
								'You are an assistant generating emergency SMS messages for first responders.',
						},
						{
							role: 'user',
							content: `Regenerate an urgent emergency SMS message for a ${emergencyType} occurring at ${currentLocation.latitude}, ${currentLocation.longitude}. The message should be concise and clear. Output in the following form: 1st line is the current situation, describe it generally, 2nd line is "Current Location: (${currentLocation.latitude}, ${currentLocation.longitude})"`,
						},
					],
					temperature: 0.7,
					max_tokens: 100,
				});
				const generatedMessage =
					response.choices[0]?.message?.content ||
					'ERROR: Emergency message could not be regenerated, please retry or call EMS!';
				set_gpt_response(generatedMessage);
			} catch (e) {
				set_gpt_response('ERROR: Could not regenerate message.');
			}
		}
	};

	const send_text = async () => {
		if (current_state === 'SENT_TO_CHATGPT') {
			set_state('SENT_TEXT');
			// TODO: send to number
			try {
				const isAvailable = await SMS.isAvailableAsync();
				if (isAvailable && current_gpt_response && current_uri) {
					const { result } = await SMS.sendSMSAsync(
						['9177832993'],
						current_gpt_response,
						{
							attachments: {
								uri: current_uri,
								mimeType: 'image/png',
								filename: 'picture.png',
							},
						}
					);
				} else {
					set_gpt_response('ERROR: SMS is not available, please call EMS!');
				}
			} catch (e) {
				set_gpt_response('ERROR: Could not send EMS message!');
			}
		}
	};

	const reset = () => {
		set_uri(null);
		set_state('START');
		set_emergency_type(null);
		set_gpt_response(null);
	};

	return (
		<AppContext.Provider
			value={{
				current_uri,
				set_uri,
				current_state,
				set_state,
				current_emergency_type,
				set_emergency_type,
				current_gpt_response,
				set_gpt_response,
				take_photo,
				send_to_gpt,
				regen_gpt,
				send_text,
				reset,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useAppContext must be used within an AppProvider');
	}
	return context;
};
