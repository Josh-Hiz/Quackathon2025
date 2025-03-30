import React, { createContext, useContext, useState } from 'react';

// Define the shape of the context data
interface AppContextType {
  photoUri: string | null;
  setPhotoUri: (uri: string | null) => void;
  location: string | null;
  setLocation: (loc: string | null) => void;
  chatResponse: string;
  setChatResponse: (response: string) => void;
  appState: 'START' | 'PHOTO_TAKEN' | 'SENT_TO_CHATGPT' | 'SENT_TEXT';
  setAppState: (state: 'START' | 'PHOTO_TAKEN' | 'SENT_TO_CHATGPT' | 'SENT_TEXT') => void;
}

// Create context with default values
const AppContext = createContext<AppContextType | undefined>(undefined);

// Context Provider Component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [chatResponse, setChatResponse] = useState<string>('Take a picture to send to EMS!');
  const [appState, setAppState] = useState<'START' | 'PHOTO_TAKEN' | 'SENT_TO_CHATGPT' | 'SENT_TEXT'>('START');

  return (
    <AppContext.Provider value={{ photoUri, setPhotoUri, location, setLocation, chatResponse, setChatResponse, appState, setAppState }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

