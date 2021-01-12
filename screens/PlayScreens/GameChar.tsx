import * as React from 'react';
import { Animated, LayoutChangeEvent, StyleSheet } from 'react-native';
import { Text, ThemeContext } from 'react-native-elements';
import { useCallback, useRef, useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { pointValues } from '../../utils/points';

const styles = StyleSheet.create({
  greenLetter: {
    color: '#AAFFAA',
    textShadowColor: 'rgba(0, 255, 0, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 6,
  },
  orangeLetter: {
    color: 'orange',
    textShadowColor: 'rgba(255, 165, 0, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 6,
  },
  redLetter: {
    color: 'red',
    textShadowColor: 'rgba(255, 0, 0, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 6,
  },
});

const animationDuration = 500;
const yStartOffset = -10;
const yEndOffset = -40;

interface GameCharProps {
  /** The character that this component will display */
  char: string;
  /** If true, this is the letter that the user is currently on */
  currentLetter: boolean;
  /** If the user has typed this letter correctly or not. Undefined if they haven't gotten to it */
  userTypedCorrectly?: boolean;
}

export default function GameChar({
  char,
  currentLetter,
  userTypedCorrectly,
}: GameCharProps) {
  const { theme } = useContext(ThemeContext);

  const [pointValue, setPointValue] = useState(0);
  const charPositionRef = useRef({ x: 0, y: 0 });
  const [pointsOpacity] = useState(new Animated.Value(0));
  const [pointsPosition] = useState(new Animated.ValueXY(undefined));

  const measureChar = useCallback((event: LayoutChangeEvent) => {
    const layout = event.nativeEvent.layout;
    charPositionRef.current = { x: layout.x, y: layout.y }
  }, []);

  const positionPoints = useCallback(() => {
    pointsPosition.setValue({
      x: charPositionRef.current.x,
      y: charPositionRef.current.y + yStartOffset,
    });
  }, [pointsPosition]);

  useEffect(() => {
    positionPoints();
  }, [charPositionRef.current, positionPoints]);

  const determineColor = useCallback(() => {
    if (currentLetter) {
      return styles.orangeLetter;
    }
    if (userTypedCorrectly !== undefined) {
      if (userTypedCorrectly) {
        return styles.greenLetter;
      }
      return styles.redLetter;
    }
  }, [currentLetter, userTypedCorrectly]);

  const fadeOutPoints = () => {
    pointsOpacity.setValue(1)
    Animated.timing(pointsOpacity, {
      toValue: 0,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };

  const translatePointsUp = () => {
    Animated.timing(pointsPosition, {
      toValue: {
        x: charPositionRef.current.x,
        y: charPositionRef.current.y + yEndOffset,
      },
      duration: animationDuration,
      useNativeDriver: true,
    }).start(() => {
      // Logic whenever an iteration finishes...
      positionPoints();
    });
  };

  useEffect(() => {
    if (userTypedCorrectly !== undefined) {
      if (userTypedCorrectly) {
        setPointValue(pointValues.correct);
      } else {
        setPointValue(pointValues.incorrect);
      }
      fadeOutPoints();
      translatePointsUp();
    }
  }, [userTypedCorrectly]);
  
  return (
    <>
      <Text
        h2
        onLayout={(event) => measureChar(event)}
        style={{ ...determineColor() }}
      >
        {char}
      </Text>
      <Animated.Text
        style={{
          position: 'absolute',
          left: 0,
          paddingLeft: 2,
          opacity: pointsOpacity,
          transform: [
            { translateX: pointsPosition.x },
            { translateY: pointsPosition.y },
          ]
        }}
      >
        <Text h4 style={{...determineColor(), textShadowRadius: 0}}>
          {Math.abs(pointValue)}
        </Text>
      </Animated.Text>
    </>
  );
}
