import * as React from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import { Text } from 'react-native-elements';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { useGameState } from '../../../contexts/GameStateProvider';
import { useCallback, useState } from 'react';

export default function CountdownCircle() {
  const { countdownSeconds, gameDuration, gameState, setGameState } = useGameState();
  const [size, setSize] = useState<number>()

  const getSize = useCallback((event: LayoutChangeEvent) => {
    const { height, width } = event.nativeEvent.layout;
    setSize(Math.min(height, width));
  }, []);

  const getDuration = useCallback(() => {
    switch (gameState) {
      case "Starting":
        return countdownSeconds;
      case "In Progress":
        return gameDuration;
      default:
        return 0;
    }
  }, [countdownSeconds, gameDuration, gameState]);

  const getText = useCallback(() => {
    switch (gameState) {
      case "Starting":
        return "Game will begin in ";
      default:
        return "";
    }
  }, [gameState]);

  const handleOnComplete = useCallback(() => {
    switch (gameState) {
      case "Starting":
        setGameState("In Progress");
        break;
      case "In Progress":
        setGameState("Ended");
        break;
    }
  }, [gameState]);

  return (
    <>
      <View
        onLayout={(event) => getSize(event)}
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 8,
          paddingBottom: 8,
        }}
      >
        <CountdownCircleTimer
          key={gameState}
          isPlaying={!!getDuration()}
          duration={getDuration()}
          colors={gameState === "In Progress" ? [
            ['#FFFFFF', 0.7],
            ['#FFFFFF', 0.1],
            ['#FF0000', 0.2],
          ] : [['#BBBBBB', 1]]}
          onComplete={handleOnComplete}
          trailColor={gameState === "In Progress" ? 'orange' : "#BBBBBB"}
          size={size}
        >
          {({ remainingTime }) => (
            <Text
              h3
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 16,
              }}
            >
              {`${getText()} ${remainingTime}`}
            </Text>
          )}
        </CountdownCircleTimer>
      </View>
    </>
  );
}
