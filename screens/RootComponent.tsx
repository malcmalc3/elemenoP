import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { useDimensions } from '../hooks/useDimensions';
import { useKeyboard } from '../contexts/KeyboardProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '../contexts/NavigationProvider';
import MainMenu from './MainMenu/MainMenu';
import PlayMenu from './PlayMenu/PlayMenu';
import HowToScreen from './HowToScreen/HowToScreen';
import StatsScreen from './StatsScreen/StatsScreen';
import ShopScreen from './ShopScreen/ShopScreen';
import SoloPlay from './PlayScreens/SoloPlay/SoloPlay';
import VersusPlay from './PlayScreens/VersusPlay';
import { GameStateProvider } from '../contexts/GameStateProvider';

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default function RootComponent() {
  const insets = useSafeAreaInsets();

  const { window } = useDimensions();
  const { keyboardHeight } = useKeyboard();
  const { currentScreen } = useNavigation();
  
  return (
    <View>
      <View style={{
        paddingTop: insets.top,
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: insets.bottom,
        height: (window.height - keyboardHeight),
        backgroundColor: '#00BCFF',
      }}>
        {currentScreen === 'Main Menu' && (<MainMenu />)}
        {currentScreen === 'Play Menu' && (<PlayMenu />)}
        {currentScreen === 'How To' && (<HowToScreen />)}
        {currentScreen === 'Stats' && (<StatsScreen />)}
        {currentScreen === 'Shop' && (<ShopScreen />)}
        {currentScreen === 'Solo Play' && (
          <GameStateProvider>
            <SoloPlay />
          </GameStateProvider>
        )}
        {currentScreen === 'Versus Play' && (<VersusPlay />)}
      </View>
    </View>
  );
}
