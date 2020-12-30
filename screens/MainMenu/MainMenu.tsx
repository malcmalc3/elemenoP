import * as React from 'react';
import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import { Text, ThemeContext } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MenuOptionText from '../../components/MenuOptionText';
import { useNavigation } from '../../contexts/NavigationProvider';
import HelperText from './HelperText';

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

  const { setCurrentScreen } = useNavigation();
  
  return (
    <>
      <View style={{
        alignContent: 'center',
        justifyContent: 'center',
        // borderWidth: 1,
        height: insets.top * 8,
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
      <MenuOptionText
        stringToMatch='play'
        onMatch={() => setCurrentScreen('Play Menu')}
      />
      <MenuOptionText
        stringToMatch='how to'
        onMatch={() => setCurrentScreen('How To')}
      />
      <MenuOptionText
        stringToMatch='stats'
        onMatch={() => setCurrentScreen('Stats')}
      />
      <MenuOptionText
        stringToMatch='shop'
        onMatch={() => setCurrentScreen('Shop')}
      />
      <HelperText />
    </>
  );
}
