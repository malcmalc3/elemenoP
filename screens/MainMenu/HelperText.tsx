import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Animated } from 'react-native';

import { Icon, Text, ThemeContext } from 'react-native-elements';

const helperTexts = [
  `Type "play" to play!`,
  `Type "how to" to learn the rules!`,
  `Type "stats" to see how good you are!`,
  `Type "shop" to customize your character!`,
]

export default function HelperText() {
  const { theme } = useContext(ThemeContext);

  const [showHelperText, setShowHelperText] = useState(false);
  const [currentHelperText, setCurrentHelperText] = useState(0);
  const [fadeAnimation] = useState(new Animated.Value(0));

  const animateFading = () => {
    Animated.sequence([
      Animated.delay(500),
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(5000),
      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Logic whenever an iteration finishes...
      setCurrentHelperText((prev) => prev + 1 === helperTexts.length ? 0 : prev + 1);
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHelperText(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showHelperText) {
      animateFading();
    }
  }, [currentHelperText, showHelperText]);
  
  return (
    <Animated.View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        opacity: fadeAnimation, //showHelper ? 1 : 0,
        marginTop: 16,
        marginBottom: 16,
      }}>
      <Icon type="feather" name='info' color={theme.colors?.grey5}/>
      <Text
        style={{
          color: theme.colors?.grey5,
          marginLeft: 4
        }}
      >
        {helperTexts[currentHelperText]}
      </Text>
    </Animated.View>
  );
}
