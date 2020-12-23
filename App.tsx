import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import { ThemeProvider } from 'react-native-elements';
import TabOneScreen from './screens/TabOneScreen';
import { KeyboardProvider } from './contexts/KeyboardProvider';
import { useFonts } from 'expo-font';
import { NavigationProvider } from './contexts/NavigationProvider';

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
        <ThemeProvider>
          <NavigationProvider>
            <KeyboardProvider>
              <TabOneScreen />
            </KeyboardProvider>
          </NavigationProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }
}
