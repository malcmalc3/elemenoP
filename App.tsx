import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import { ThemeProvider } from 'react-native-elements';
import TabOneScreen from './screens/TabOneScreen';
import { KeyboardProvider } from './contexts/KeyboardProvider';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ThemeProvider>
          <KeyboardProvider>
            <TabOneScreen />
          </KeyboardProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }
}
