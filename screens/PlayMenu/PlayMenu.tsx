import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import BackButton from '../../components/BackButton';
import MenuOptionText from '../../components/MenuOptionText';
import { useNavigation } from '../../contexts/NavigationProvider';
import EditNameField from './EditNameField';

const styles = StyleSheet.create({
  titleText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Minigame',
  },
});

export default function PlayMenu() {
  const { setScreen } = useNavigation();
  const [editingName, setEditingName] = useState(false);

  return (
    <>
      <BackButton previousScreen='Main Menu' active={!editingName} />
      <View
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          // borderWidth: 1,
          // flexDirection: 'column',
          // paddingTop: 24,
          // paddingBottom: 24,
          // height: (window.height - keyboardHeight),
        }}
      >
        <MenuOptionText
          stringToMatch='online'
          onMatch={() => setScreen('Versus Play')}
          active={!editingName}
        />
        <MenuOptionText
          stringToMatch='host private'
          onMatch={() => setScreen('Versus Play')}
          active={!editingName}
        />
        <MenuOptionText
          stringToMatch='join private'
          onMatch={() => setScreen('Versus Play')}
          active={!editingName}
        />
        <MenuOptionText
          stringToMatch='solo'
          onMatch={() => setScreen('Solo Play')}
          active={!editingName}
        />
        <Text h2 style={{opacity: 0}}>Filler</Text>
        <EditNameField
          editingName={editingName}
          setEditingName={setEditingName}
        />
      </View>
    </>
  );
}
