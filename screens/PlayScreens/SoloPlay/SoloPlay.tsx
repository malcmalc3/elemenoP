import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import BackButton from '../../../components/BackButton';
import GameChar from '../GameChar';

const styles = StyleSheet.create({
  titleText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Minigame',
  },
});

export default function SoloPlay() {
  return (
    <>
      <BackButton previousScreen='Play Menu' />
      <View
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <GameChar
          char='e'
          currentLetter={false}
          userTypedCorrectly={false}
        />
      </View>
    </>
  );
}
