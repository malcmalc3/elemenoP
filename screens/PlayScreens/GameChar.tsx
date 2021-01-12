import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, ThemeContext } from 'react-native-elements';
import { useCallback, useState } from 'react';
import { useKeyboard } from '../../contexts/KeyboardProvider';
import { useEffect } from 'react';
import { useContext } from 'react';

const styles = StyleSheet.create({
  greenLetter: {
    color: '#AAFFAA',
    textShadowColor: 'rgba(0, 255, 0, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 6,
  },
  orangeLetter: {
    color: 'orange',
    textShadowColor: 'rgba(255, 165, 0, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 6,
  },
  redLetter: {
    color: 'red',
    textShadowColor: 'rgba(255, 0, 0, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 6,
  },
});

interface GameCharProps {
  /** The character that this component will display */
  char: string;
  /** If true, this is the letter that the user is currently on */
  currentLetter: boolean;
  /** If the user has typed this letter correctly or not. Undefined if they haven't gotten to it */
  userTypedCorrectly?: boolean;
}

export default function GameChar({
  char,
  currentLetter,
  userTypedCorrectly,
}: GameCharProps) {
  const { theme } = useContext(ThemeContext);

  const determineColor = useCallback(() => {
    if (currentLetter) {
      return styles.orangeLetter;
    }
    if (userTypedCorrectly !== undefined) {
      if (userTypedCorrectly) {
        return styles.greenLetter;
      }
      return styles.redLetter;
    }
  }, [currentLetter, userTypedCorrectly]);
  
  return (
    <Text
      h2
      style={{ ...determineColor(), textAlign: 'center' }}
    >
      {char}
    </Text>
  );
}
