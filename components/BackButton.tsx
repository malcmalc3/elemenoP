import * as React from 'react';
import { View } from 'react-native';
import { useNavigation } from '../contexts/NavigationProvider';
import { AvailableScreens } from '../types';
import MenuOptionText from './MenuOptionText';

interface BackButtonProps {
  previousScreen: AvailableScreens;
  active?: boolean;
  stringToMatch?: string;
};

export default function BackButton({
  previousScreen,
  active = true,
  stringToMatch = "back",
}: BackButtonProps) {
  const { setScreen } = useNavigation();
  
  return (
    <View style={{ alignSelf: 'flex-start' }}>
      <MenuOptionText
        stringToMatch={stringToMatch}
        onMatch={() => setScreen(previousScreen)}
        active={active}
      />
    </View>
  );
}
