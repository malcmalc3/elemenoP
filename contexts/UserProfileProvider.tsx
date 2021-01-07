// import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  ReactNode,
  useState,
  createContext,
  useContext,
  useEffect,
} from 'react';
import useAsyncStorage from '../hooks/useAsyncStorage';
import { generateRandomUsername } from '../utils/randomUsername';

interface UserProfileContextTypes {
  username: string;
  setUsername: (newUsername: string) => void;
};

const UserProfileContext = createContext<UserProfileContextTypes>({
  username: '',
  setUsername: () => {},
});

interface UserProfileProviderProps {
  children: ReactNode;
};

export const UserProfileProvider = ({ children }: UserProfileProviderProps) => {
  const [username, setUsername] = useAsyncStorage('username', generateRandomUsername());

  return (
    <UserProfileContext.Provider value={{username, setUsername}}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);