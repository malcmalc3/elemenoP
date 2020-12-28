import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Icon, Text, ThemeContext } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MenuOptionText from '../../components/MenuOptionText';
import { useNavigation } from '../../contexts/NavigationProvider';

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

  const [showHelper, setShowHelper] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHelper(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  
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
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          opacity: showHelper ? 1 : 0,
          marginTop: 16,
        }}>
        <Icon type="feather" name='info' color={theme.colors?.grey5}/>
        <Text style={{ color: theme.colors?.grey5, marginLeft: 4 }}>Type "play" to play</Text>
      </View>
    </>
  );
}
