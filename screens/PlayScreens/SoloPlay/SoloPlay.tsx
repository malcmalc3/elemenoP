import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import BackButton from '../../../components/BackButton';
import { useKeyboard } from '../../../contexts/KeyboardProvider';
import GameChar from '../GameChar';

const styles = StyleSheet.create({
  titleText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Minigame',
  },
});

const paragraph = 'Good morning';//'elemenoP';

export default function SoloPlay() {
  const { lastKey, repeats } = useKeyboard();

  const [correctnessArr, setCorrectnessArr] = useState<boolean[]>(
    Array(paragraph.length).fill(false)
  );
  const [position, setPosition] = useState(0);

  const increasePosition = useCallback((amount: number) => {
    setPosition((prev) => prev + amount);
  }, []);

  const decreasePosition = useCallback((amount: number) => {
    setPosition((prev) => Math.max(0, prev - amount));
  }, []);

  const setCorrectness = useCallback(() => {
    setCorrectnessArr((prev) => {
      let newArr = [...prev];
      for (let i = position; i < position + lastKey.length; i++) {
        newArr[i] = lastKey.charAt(i - position) === paragraph.charAt(i);
      }
      return newArr;
    });
  }, [lastKey, position]);

  useEffect(() => {
    console.log(lastKey);
    switch (lastKey) {
      case ':Empty:':
      case ':Enter:':
        // ignore
        break;
      case ':Backspace:':
        decreasePosition(1);
        break;
      default:
        setCorrectness();
        increasePosition(lastKey.length);
        break;
    }
    //TODO: NEED TO DO CASE FOR IF LASTKEY IS MULTIPLE CHARS
  }, [lastKey, repeats]);

  return (
    <>
      <BackButton previousScreen='Play Menu' />
      <View
        style={{
          // flex: 1,
          // display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          flexDirection: 'row',
        }}
      >
        {paragraph.split('').map((char, key) => (
          <GameChar
            key={key}
            char={char}
            currentLetter={key === position}
            userTypedCorrectly={key >= position ? undefined : correctnessArr[key]}
          />
        ))}
      </View>
    </>
  );
}
