import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import { ThemeProvider } from 'react-native-elements';
import { KeyboardProvider } from './contexts/KeyboardProvider';
import { useFonts } from 'expo-font';
import { NavigationProvider } from './contexts/NavigationProvider';
import RootComponent from './screens/RootComponent';
import { UserProfileProvider } from './contexts/UserProfileProvider';

const theme = {
  colors: {
    primary: '#0076BE', //Blue
    secondary: '#48BF91', //Green
  },
  Text: {
    style: {
      color: 'white',
      fontFamily: 'Minigame',
    },
  },
};

export default function App() {
  const isLoadingComplete = useCachedResources();

  const [fontsLoaded] = useFonts({
    'Minigame': require('./assets/fonts/Minigame.otf'),
    'Minigame-Italic': require('./assets/fonts/Minigame-Italic.otf'),
    'Minigame-Oblique': require('./assets/fonts/Minigame-Oblique.otf'),
  });

  if (!isLoadingComplete || !fontsLoaded) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <KeyboardProvider>
            <NavigationProvider>
              <UserProfileProvider>
                <RootComponent />
              </UserProfileProvider>
            </NavigationProvider>
          </KeyboardProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }
}
