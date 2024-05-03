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

export type StatType = 'WORDS_PER_MINUTE' | 'SCORE';

interface Stat {
  value: number;
  roundedValue: number;
  count: number;
}

const initialStats = {
  WORDS_PER_MINUTE: { value: 0, roundedValue: 0, count: 0 },
  SCORE: { value: 0, roundedValue: 0, count: 0 },
};

interface UserProfileContextTypes {
  username: string;
  setUsername: (newUsername: string) => void;
  stats: Record<StatType, Stat>;
  updateStat: (type: StatType, newValue: number) => void;
};

const UserProfileContext = createContext<UserProfileContextTypes>({
  username: '',
  setUsername: () => {},
  stats: initialStats,
  updateStat: () => {},
});

interface UserProfileProviderProps {
  children: ReactNode;
};

export const UserProfileProvider = ({ children }: UserProfileProviderProps) => {
  const [username, setUsername] = useAsyncStorage('username', generateRandomUsername());
  const [stats, setStats] = useAsyncStorage('stats', initialStats);

  const updateStat = (type: StatType, newValue: number) => {
    const oldStat = stats[type];
    const newCount = oldStat.count + 1;
    const newAvg = ((oldStat.value * oldStat.count) + newValue) / newCount;
    
    setStats({
      ...stats,
      [type]: { value: newAvg, roundedValue: Math.round(newAvg), count: newCount },
    });
  };


  return (
    <UserProfileContext.Provider value={{
      username,
      setUsername,
      stats,
      updateStat,
    }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);