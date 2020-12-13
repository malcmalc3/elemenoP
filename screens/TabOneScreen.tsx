import * as React from 'react';
import { NativeSyntheticEvent, StyleSheet, TextInputKeyPressEventData, View } from 'react-native';

import { Input, Text } from 'react-native-elements';
import { useDimensions } from '../hooks/useDimensions';
import { useKeyboard } from '../hooks/useKeyboard';
import { useEffect, useState } from 'react';
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
  const { keyboardHeight } = useKeyboard();

  const [text, setText] = useState('');
  const [inputRef, setInputRef] = useState<Input | null>(null);

  const handleKeyDown = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    console.log(e.nativeEvent.key);
    if(e.nativeEvent.key === 'Enter') {
      e.preventDefault();
    }
  };

  useEffect(() => {
    inputRef?.focus();
  }, [inputRef])
  
  return (
    <View style={{
      flex: 1,
      paddingTop: insets.top,
      height: (window.height - keyboardHeight),
      backgroundColor: '#00BCFF',
    }}>
      <Text h1 style={{ color: 'white' }}>2</Text>
      <Input
        style={{ height: 0, width: 0, borderWidth: 0 }}
        blurOnSubmit={false}
        caretHidden
        value=""
        onKeyPress={handleKeyDown}
        ref={ref => setInputRef(ref)}
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={false}
      />
    </View>
  );
}
