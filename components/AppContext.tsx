import React, { createContext, useState, useContext } from 'react';

interface AppContextType {
  photoUri: string | null;
  setPhotoUri: (uri: string | null) => void;
  chatResponse: string;
  setChatResponse: (response: string) => void;
  appState: 'START' | 'PHOTO_TAKEN' | 'SENT_TO_CHATGPT' | 'SENT_TEXT';
  setAppState: (state: 'START' | 'PHOTO_TAKEN' | 'SENT_TO_CHATGPT' | 'SENT_TEXT') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [chatResponse, setChatResponse] = useState<string>('');
  const [appState, setAppState] = useState<'START' | 'PHOTO_TAKEN' | 'SENT_TO_CHATGPT' | 'SENT_TEXT'>('START');

  return (
    <AppContext.Provider value={{ photoUri, setPhotoUri, chatResponse, setChatResponse, appState, setAppState }}>
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

export default AppContext;
