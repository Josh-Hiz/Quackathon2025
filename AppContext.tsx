import React, { createContext, useContext, useState } from 'react';

interface AppContextType {
  current_uri: string | null;
  set_uri: (uri: string | null) => void;
  current_state: 'START' | 'PHOTO_TAKEN' | 'SENT_TO_CHATGPT' | 'SENT_TEXT';
  set_state: (state: 'START' | 'PHOTO_TAKEN' | 'SENT_TO_CHATGPT' | 'SENT_TEXT') => void;
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

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [current_uri, set_uri] = useState<string | null>(null);
  const [current_state, set_state] = useState<'START' | 'PHOTO_TAKEN' | 'SENT_TO_CHATGPT' | 'SENT_TEXT'>('START');
  const [current_emergency_type, set_emergency_type] = useState<string | null>(null);
  const [current_gpt_response, set_gpt_response] = useState<string | null>(null);

  const take_photo = () => {
      set_state('PHOTO_TAKEN');
  };

  const send_to_gpt = () => {
    if (current_state === 'PHOTO_TAKEN') {
      set_state('SENT_TO_CHATGPT');
      // TODO:
    }
  };

  const regen_gpt = () => {
      // TODO: copy from send_to_gpt
  };

  const send_text = () => {
    if (current_state === 'SENT_TO_CHATGPT') {
      set_state('SENT_TEXT');
      // TODO: send to number
    }
  };

  const reset = () => {
    set_uri(null);
    set_state('START');
    set_emergency_type(null);
    set_gpt_response(null);
  };

  return (
    <AppContext.Provider value={{
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
      reset
    }}>
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
