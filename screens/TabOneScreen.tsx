import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from 'react-native-elements';
import { useDimensions } from '../hooks/useDimensions';
import { useKeyboard } from '../contexts/KeyboardProvider';
import { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MenuOptionText from '../components/MenuOptionText';

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default function TabOneScreen() {
  const insets = useSafeAreaInsets();

  const { window } = useDimensions();
  const { keyboardHeight } = useKeyboard();
  
  useEffect(() => {
    console.log(keyboardHeight);
  }, [keyboardHeight]);
  
  return (
    <View>
      <View style={{
        paddingTop: insets.top,
        height: (window.height - keyboardHeight),
        backgroundColor: '#00BCFF',
      }}>
        <Text h1 style={{ color: 'white' }}>2</Text>
        <MenuOptionText
          stringToMatch='play'
          onMatch={() => console.log('Go to play')}
        />
        <MenuOptionText
          stringToMatch='how to'
          onMatch={() => console.log('Go to how to')}
        />
        <MenuOptionText
          stringToMatch='stats'
          onMatch={() => console.log('Go to stats')}
        />
        <MenuOptionText
          stringToMatch='shop'
          onMatch={() => console.log('Go to shop')}
        />
      </View>
    </View>
  );
}
