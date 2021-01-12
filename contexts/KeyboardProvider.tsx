import React, { ReactNode, useState, createContext, useEffect, useContext, useCallback } from 'react';
import { Keyboard, NativeSyntheticEvent, TextInputKeyPressEventData, KeyboardEvent } from 'react-native';
import { Input } from 'react-native-elements';

interface KeyboardContextTypes {
  lastKey: string;
  repeats: number;
  keyboardHeight: number;
  clearKeyboard: VoidFunction;
};

const KeyboardContext = createContext<KeyboardContextTypes>({
  lastKey: '',
  repeats: 0,
  keyboardHeight: 0,
  clearKeyboard: () => {},
});

interface KeyboardProviderProps {
  children: ReactNode;
};

export const KeyboardProvider = ({ children }: KeyboardProviderProps) => {
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
  const [repeats, setRepeats] = useState(0);
  const [inputRef, setInputRef] = useState<Input | null>(null);

  const handleEnterKey = useCallback(() => {
    setLastKey(':Enter:');
  }, []);

  const handleKeyDown = (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    const key = event.nativeEvent.key;
    setLastKey((prevKey) => {
      key === prevKey ? setRepeats((prevRepeats) => prevRepeats + 1) : setRepeats(0);
      return key;
    });
  };

  const clearKeyboard = useCallback(() => {
    setLastKey(':Empty:');
  }, []);

  const handleLostFocus = useCallback(() => {
    inputRef?.focus();
  }, [inputRef]);

  useEffect(() => {
    inputRef?.focus();
  }, [inputRef])

  return (
    <KeyboardContext.Provider value={{lastKey, repeats, keyboardHeight, clearKeyboard}}>
      {children}
      <Input
        style={{ height: 0, width: 0, borderWidth: 0, position: "absolute", left: 1000 }}
        blurOnSubmit={false}
        onBlur={handleLostFocus}
        onSubmitEditing={handleEnterKey}
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