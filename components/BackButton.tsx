import * as React from 'react';
import { View } from 'react-native';
import { useNavigation } from '../contexts/NavigationProvider';
import { AvailableScreens } from '../types';
import MenuOptionText from './MenuOptionText';

interface BackButtonProps {
  previousScreen: AvailableScreens;
};

export default function BackButton({ previousScreen }: BackButtonProps) {
  const { setCurrentScreen } = useNavigation();
  
  return (
    <View
      style={{
        width: 100,
        height: 60,
      }}
    >
      <MenuOptionText
        stringToMatch='back'
        onMatch={() => setCurrentScreen(previousScreen)}
      />
    </View>
  );
}
