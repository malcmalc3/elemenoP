import { useEffect, useState } from 'react';
import { Text, ThemeContext } from 'react-native-elements';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import React, { useContext } from 'react';

interface AnimatedStatChangeProps {
  value: number;
  duration: number;
}

export const AnimatedStatChange: React.FC<AnimatedStatChangeProps> = ({ value, duration }) => {
  const { theme } = useContext(ThemeContext);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (value !== 0) {
      setOpacity(1);
      setTimeout(() => setOpacity(0), duration);
    }
  }, [value, duration]);

  const fadeAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity, { duration: duration / 2 }),
    };
  });

  const color = value > 0 ? 'green' : value < 0 ? 'red' : 'white';

  return (
    <Animated.View style={[{ marginLeft: 10 }, fadeAnimatedStyle]}>
      <Text style={{ color }}>{`${value >= 0 ? '+' : ''}${value}`}</Text>
    </Animated.View>
  );
};
