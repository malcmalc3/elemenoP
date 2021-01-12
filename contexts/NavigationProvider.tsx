import React, { ReactNode, useState, createContext, useContext, useEffect, useCallback } from 'react';
import { AvailableScreens } from '../types';
import { useKeyboard } from './KeyboardProvider';

interface NavigationContextTypes {
  currentScreen: AvailableScreens;
  setScreen: (curScreen: AvailableScreens) => void;
};

const NavigationContext = createContext<NavigationContextTypes>({
  currentScreen: 'Main Menu',
  setScreen: () => {},
});

interface NavigationProviderProps {
  children: ReactNode;
};

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
  const { clearKeyboard } = useKeyboard();
  const [currentScreen, setCurrentScreen] = useState<AvailableScreens>('Main Menu');

  const setScreen = useCallback((nextScreen: AvailableScreens) => {
    clearKeyboard();
    setCurrentScreen(nextScreen);
  }, []);

  return (
    <NavigationContext.Provider value={{currentScreen, setScreen}}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);