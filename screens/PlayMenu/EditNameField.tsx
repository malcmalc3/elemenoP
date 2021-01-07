import * as React from 'react';
import { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, ThemeContext } from 'react-native-elements';
import MenuOptionText from '../../components/MenuOptionText';
import { useKeyboard } from '../../contexts/KeyboardProvider';
import { useUserProfile } from '../../contexts/UserProfileProvider';

const styles = StyleSheet.create({
  titleText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Minigame',
  },
});

interface EditNameFieldProps {
  editingName: boolean;
  setEditingName: (active: boolean) => void;
};

export default function EditNameField({
  editingName,
  setEditingName,
}: EditNameFieldProps) {
  const { theme } = useContext(ThemeContext);
  
  const [inputValue, setInputValue] = useState('');
  const { lastKey, repeats } = useKeyboard();
  const { username, setUsername } = useUserProfile();

  const handleNameMatch = useCallback(() => {
    setEditingName(true);
  }, []);

  const handleEnterKey = useCallback(() => {
    setEditingName(false);
    setUsername(inputValue);
  }, [inputValue]);

  useEffect(() => {
    if (editingName) {
      setInputValue((prev) => {
        if (lastKey === 'Backspace') {
          return prev.slice(0, -1);
        }
        if (prev.length >= 25) {
          return prev.slice(0, 25);
        }
        if (lastKey === ' ') {
          return prev;
        }
        if (lastKey === ':Enter:') {
          handleEnterKey();
          return prev;
        }
        return `${prev}${lastKey}`;
      });
    }
  }, [editingName, lastKey, repeats]);

  useEffect(() => {
    setInputValue(username);
  }, [username, editingName]);
  
  return (
    <View style={{
      flexDirection:'row',
      alignItems:'center',
      justifyContent: 'center',
      paddingHorizontal: 32,
    }}>
      <MenuOptionText
        stringToMatch='name'
        onMatch={handleNameMatch}
        active={!editingName}
      />
      <Text
        numberOfLines={1}
        ellipsizeMode={editingName ? 'head' : 'tail'}
        style={{
          borderWidth: 5,
          borderRadius: 16,
          marginLeft: 8,
          flex: 2,
          paddingLeft: 8,
          borderColor: editingName ? '#AAFFAA' : 'orange',
          color: editingName ? 'white' : theme.colors?.grey5,
          fontSize: 16,
        }}
      >
        {`${inputValue}${editingName ? '|' : ''}`}
      </Text>
    </View>
  );
}
