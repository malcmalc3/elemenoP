import * as React from 'react';
import { StyleSheet } from 'react-native';
import BackButton from '../../components/BackButton';

const styles = StyleSheet.create({
  titleText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Minigame',
  },
});

export default function VersusPlay() {
  return (
    <>
      <BackButton previousScreen='Play Menu' />
    </>
  );
}
