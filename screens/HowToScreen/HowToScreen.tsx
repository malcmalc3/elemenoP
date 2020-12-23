import * as React from 'react';
import { StyleSheet } from 'react-native';

import MenuOptionText from '../../components/MenuOptionText';
import { useNavigation } from '../../contexts/NavigationProvider';

const styles = StyleSheet.create({
  titleText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Minigame',
  },
});

export default function HowToScreen() {
  const { setCurrentScreen } = useNavigation();
  
  return (
    <>
      <MenuOptionText
        stringToMatch='back'
        onMatch={() => setCurrentScreen('Main Menu')}
      />
    </>
  );
}
