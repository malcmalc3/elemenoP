import * as React from 'react';
import { View } from 'react-native';
import { useNavigation } from '../contexts/NavigationProvider';
import { AvailableScreens } from '../types';
import MenuOptionText from './MenuOptionText';

interface BackButtonProps {
  previousScreen: AvailableScreens;
  active?: boolean;
};

export default function BackButton({
  previousScreen,
  active = true,
}: BackButtonProps) {
  const { setScreen } = useNavigation();
  
  return (
    <View style={{ alignSelf: 'flex-start' }}>
      <MenuOptionText
        stringToMatch='back'
        onMatch={() => setScreen(previousScreen)}
        active={active}
      />
    </View>
  );
}
