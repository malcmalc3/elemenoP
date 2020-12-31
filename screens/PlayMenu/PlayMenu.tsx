import * as React from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import BackButton from '../../components/BackButton';
import MenuOptionText from '../../components/MenuOptionText';
import { useNavigation } from '../../contexts/NavigationProvider';

const styles = StyleSheet.create({
  titleText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Minigame',
  },
});

export default function PlayMenu() {  
  const { setCurrentScreen } = useNavigation();

  const [backButtonActive, setBackButtonActive] = useState(true);

  return (
    <>
      {backButtonActive && <BackButton previousScreen='Main Menu' />}
      <MenuOptionText
        stringToMatch='online'
        onMatch={() => setCurrentScreen('Versus Play')}
      />
      <MenuOptionText
        stringToMatch='host private'
        onMatch={() => setCurrentScreen('Versus Play')}
      />
      <MenuOptionText
        stringToMatch='join private'
        onMatch={() => setCurrentScreen('Versus Play')}
      />
      <MenuOptionText
        stringToMatch='practice'
        onMatch={() => setCurrentScreen('Pactice Play')}
      />
    </>
  );
}
