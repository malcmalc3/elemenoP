import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from 'react-native-elements';
import { useDimensions } from '../hooks/useDimensions';
import { useKeyboard } from '../contexts/KeyboardProvider';
import { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const { lastKey, keyboardHeight } = useKeyboard();
  
  useEffect(() => {
    console.log(lastKey);
  }, [lastKey]);
  
  return (
    <View style={{
      flex: 1,
      paddingTop: insets.top,
      height: (window.height - keyboardHeight),
      backgroundColor: '#00BCFF',
    }}>
      <Text h1 style={{ color: 'white' }}>2</Text>
    </View>
  );
}
