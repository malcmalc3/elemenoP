import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from 'react-native-elements';
import { useState } from 'react';
import { useKeyboard } from '../contexts/KeyboardProvider';
import { useEffect } from 'react';

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

interface MenuOptionTextProps {
  stringToMatch: string;
  onMatch: VoidFunction;
}

export default function MenuOptionText({
  stringToMatch,
  onMatch,
}: MenuOptionTextProps) {
  const [matchingString, setMatchingString] = useState('');
  const { lastKey, repeats } = useKeyboard();

  useEffect(() => {
    setMatchingString((prev) => {
      if (stringToMatch.toLowerCase().startsWith(prev + lastKey.toLowerCase())) {
        return `${prev}${lastKey.toLowerCase()}`;
      }
      return '';
    });
  }, [lastKey, repeats]);

  useEffect(() => {
    if (matchingString.toLowerCase() === stringToMatch.toLowerCase()) {
      onMatch();
    }
  }, [matchingString]);
  
  return (
    <View style={{
      flex: 1,
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center',
      // borderWidth: 1,
      // paddingTop: insets.top,
      // height: (window.height - keyboardHeight),
    }}>
      <Text
        h2
        style={{
          color: 'white',
          textAlign: 'center',
          fontFamily: 'Minigame',
        }}
      >
        <Text
          style={{
            color: '#AAFFAA',
            textShadowColor: 'rgba(0, 255, 0, 1)',
            textShadowOffset: {width: -1, height: 1},
            textShadowRadius: 6,
          }}
        >
          {stringToMatch.substring(0, matchingString.length)}
        </Text>
        <Text style={{ color: 'white' }}>
          {stringToMatch.substring(matchingString.length)}
        </Text>
      </Text>
    </View>
  );
}
