import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { LayoutChangeEvent, StyleSheet } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { Text, ThemeContext } from 'react-native-elements';
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
  pointsText: {
    position: 'absolute',
  }
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
  const [pointsPosX, setPointsPosX] = useState(0);
  const [showPoints, setShowPoints] = useState(false);
  const posY = useSharedValue(yStartOffset);
  const opacity = useSharedValue(0);

  const measureChar = useCallback((event: LayoutChangeEvent) => {
    const layout = event.nativeEvent.layout;
    setPointsPosX(layout.x + (layout.width / 4));
  }, []);
  
  const pointsAnimatedStyle = useAnimatedStyle(() => {
    return {
      top: withTiming(
        posY.value,
        { duration: animationDuration },
        () => runOnJS(setShowPoints)(false),
      ),
      opacity: withTiming(
        opacity.value,
        { duration: animationDuration },
      ),
    };
  });

  useEffect(() => {
    if (showPoints) {
      opacity.value = 1;
      posY.value = yEndOffset;
    } else {
      opacity.value = 0;
      posY.value = yStartOffset;
    }
  }, [showPoints]);

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

  useEffect(() => {
    if (userTypedCorrectly !== undefined) {
      if (userTypedCorrectly) {
        setPointValue(pointValues.correct);
      } else {
        setPointValue(pointValues.incorrect);
      }
      setShowPoints(true);
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
      {showPoints && (
        <Animated.Text
          style={[
            styles.pointsText,
            { left: pointsPosX },
            pointsAnimatedStyle,
          ]}
        >
          <Text
            h4
            style={{
              ...determineColor(),
              textShadowRadius: 0,
            }}
          >
            {Math.abs(pointValue)}
          </Text>
        </Animated.Text>
      )}
    </>
  );
}
