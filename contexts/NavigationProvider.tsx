import React, { ReactNode, useState, createContext, useContext } from 'react';
import { AvailableScreens } from '../types';

interface NavigationContextTypes {
  currentScreen: AvailableScreens;
  setCurrentScreen: (curScreen: AvailableScreens) => void;
};

const NavigationContext = createContext<NavigationContextTypes>({
  currentScreen: 'Main Menu',
  setCurrentScreen: () => {},
});

interface NavigationProviderProps {
  children: ReactNode;
};

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
  const [currentScreen, setCurrentScreen] = useState<AvailableScreens>('Main Menu');

  return (
    <NavigationContext.Provider value={{currentScreen, setCurrentScreen}}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);