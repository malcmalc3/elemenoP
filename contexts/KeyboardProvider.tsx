import React, { ReactNode, useState, createContext, useEffect, useContext } from 'react';
import { Keyboard, NativeSyntheticEvent, TextInputKeyPressEventData, KeyboardEvent } from 'react-native';
import { Input } from 'react-native-elements';

interface KeyboardContextTypes {
  lastKey: string,
  keyboardHeight: number,
};

const KeyboardContext = createContext<KeyboardContextTypes>({
  lastKey: '',
  keyboardHeight: 0,
});

type Props = {
  children: ReactNode
};

export const KeyboardProvider = ({ children }: Props) => {
  /** Keyboard height section */
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  function onKeyboardDidShow(e: KeyboardEvent): void {
    setKeyboardHeight(e.endCoordinates.height);
  }

  function onKeyboardDidHide(): void {
    setKeyboardHeight(0);
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return (): void => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
    };
  }, []);

  /** lastKey section: holds the last key pressed */
  const [lastKey, setLastKey] = useState('');
  const [inputRef, setInputRef] = useState<Input | null>(null);

  const handleKeyDown = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if(e.nativeEvent.key === 'Enter') {
      e.preventDefault();
    }
    setLastKey(e.nativeEvent.key);
  };

  useEffect(() => {
    inputRef?.focus();
  }, [inputRef])

  return (
    <KeyboardContext.Provider value={{lastKey, keyboardHeight}}>
      {children}
      <Input
        style={{ height: 0, width: 0, borderWidth: 0, position: "absolute", left: 1000 }}
        blurOnSubmit={false}
        caretHidden
        value=""
        onKeyPress={handleKeyDown}
        ref={ref => setInputRef(ref)}
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={false}
      />
    </KeyboardContext.Provider>
  );
};

export const useKeyboard = () => useContext(KeyboardContext);