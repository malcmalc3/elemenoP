import * as React from 'react';
import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import { Text, ThemeContext } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MenuOptionText from '../../components/MenuOptionText';
import { useNavigation } from '../../contexts/NavigationProvider';
import HelperText from './HelperText';
import { useGameState } from '../../contexts/GameStateProvider';

const styles = StyleSheet.create({
  titleText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Minigame',
  },
});

export default function MainMenu() {
  const insets = useSafeAreaInsets();
  const { theme } = useContext(ThemeContext);

  const { setScreen } = useNavigation();
  const { setGameMode } = useGameState();

  const handleSoloPlayClick = () => {
    setGameMode('Solo');
    setScreen('Solo Play')
  }
  
  return (
    <>
      <View style={{
        alignContent: 'center',
        justifyContent: 'center',
        height: "40%",
      }}>
        <Text
          h1
          style={{
            color: 'white',
            textAlign: 'center',
            fontFamily: 'Minigame',
          }}
        >
          elemenoP!
        </Text>
      </View>
      <View style={{
        alignContent: 'center',
        justifyContent: 'center',
        height: "60%",
      }}>
        <MenuOptionText
          stringToMatch='play'
          onMatch={handleSoloPlayClick}
        />
        <MenuOptionText
          stringToMatch='how to'
          onMatch={() => setScreen('How To')}
        />
        <MenuOptionText
          stringToMatch='stats'
          onMatch={() => setScreen('Stats')}
        />
        <MenuOptionText
          stringToMatch='shop'
          onMatch={() => setScreen('Shop')}
        />
        <HelperText />
      </View>
    </>
  );
}
