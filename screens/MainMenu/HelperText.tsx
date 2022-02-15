import * as React from 'react';
import { useCallback, useContext, useState } from 'react';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  withDelay,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';

import { Icon, Text, ThemeContext } from 'react-native-elements';

const helperTexts = [
  `Type "play" to play!`,
  `Type "how to" to learn the rules!`,
  `Type "stats" to see how good you are!`,
  `Type "shop" to customize your character!`,
]

export default function HelperText() {
  const { theme } = useContext(ThemeContext);

  const [currentHelperText, setCurrentHelperText] = useState(0);

  const cycleHelperText = useCallback(() => {
    setCurrentHelperText((prev) => {
      if (prev + 1 === helperTexts.length) {
        return 0;
      }
      return prev + 1
    });
  }, []);

  const fadeAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withSequence(
        withTiming(0, { duration: 0 }),
        withDelay(
          1000,
          withRepeat(
            withSequence(
              withDelay(500, withTiming(1, { duration: 1000 })),
              withDelay(5000, withTiming(0, { duration: 1000 }, () => runOnJS(cycleHelperText)())),
            ),
            -1,
          ),
        ),
      ),
    };
  });

  return (
    <Animated.View
      style={[
        {
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 16,
          marginBottom: 16,
        },
        fadeAnimatedStyle,
      ]}
    >
      <Icon
        type="feather"
        name='info'
        color={theme.colors?.grey5}
        // TODO: Remove these two after upgrading to v4 of react-native-elements
        hasTVPreferredFocus={undefined}
        tvParallaxProperties={undefined}
      />
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
