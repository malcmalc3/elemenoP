import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import BackButton from '../../../components/BackButton';
import { useKeyboard } from '../../../contexts/KeyboardProvider';
import GameChar from '../GameChar';
import PlayerGameInfo from '../../../components/PlayerGameInfo/PlayerGameInfo';
import { pointValues } from '../../../utils/points';
import { useGameState } from '../../../contexts/GameStateProvider';
import CountdownCircle from '../CountdownCircle/CountdownCircle';
import { useUserProfile } from '../../../contexts/UserProfileProvider';

const paragraph = 'The hardest choices require the strongest wills';
const paragraphArr = paragraph.split('');

const START_SCROLL_OFFSET = 5;
const CHARS_PER_WORD = 5;
const MS_PER_MINUTE = 60000;

export default function SoloPlay() {
  const { lastKey, repeats } = useKeyboard();
  const { gameMode, gameState, setGameState } = useGameState();
  const { updateStat } = useUserProfile();

  const [shouldRecordCorrectness, setShouldRecordCorrectness] = useState(false);
  const [inQuitMode, setInQuitMode] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [currentWordsPerMinute, setCurrentWordsPerMinute] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [correctnessArr, setCorrectnessArr] = useState<boolean[]>(
    Array(paragraph.length).fill(undefined)
  );
  const [position, setPosition] = useState(0);
  const [showFader, setShowFader] = useState({ start: false, end: true });
/*


These packages were not updated with upgrade to expo 47

@react-native-community/masked-view,
@react-navigation/bottom-tabs, 
@react-navigation/native, 
@react-navigation/stack, 
react-native-countdown-circle-timer, 
react-native-elements, 
react-native-status-bar-height, 
recyclerlistview
*/

  useEffect(() => {
    setGameState("Starting");
  }, [setGameState]);

  useEffect(() => {
    if (gameState === "In Progress" && startTime === null) {
      setStartTime(Date.now());
    }
  }, [gameState]);

  useEffect(() => {
    //Game in progress, not in quit mode, hasnt finished all letters
    setShouldRecordCorrectness(gameState === "In Progress" && correctnessArr[correctnessArr.length -1] === undefined)
  }, [gameState]);

  useEffect(() => {
    if (startTime) {
      const elapsedMinutes = (Date.now() - startTime) / MS_PER_MINUTE;
      setCurrentWordsPerMinute(position / CHARS_PER_WORD / elapsedMinutes);
    }
  }, [position]);

  useEffect(() => {
    if (gameState === "Ended") {
      updateStat('SCORE', currentScore);
      updateStat('WORDS_PER_MINUTE', currentWordsPerMinute);
    }
  }, [gameState]);

  const flatListRef = useRef<FlatList<string> | null>(null);
  const setFlatListRef = useCallback((ref: FlatList<string> | null) => {
    flatListRef.current = ref;
  }, []);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const contentSize = event.nativeEvent.contentSize;
    const layoutWidth = event.nativeEvent.layoutMeasurement.width;
    setShowFader({
      start: offsetX > 0,
      end: contentSize.width - offsetX !== layoutWidth,
    });
  }, []);

  const increasePosition = useCallback((amount: number) => {
    setPosition((prev) => prev + amount);
  }, []);

  const decreasePosition = useCallback((amount: number) => {
    setPosition((prev) => {
      if (prev !== 0) setCurrentScore((prev) => prev + pointValues.backscpace);
      return Math.max(0, prev - amount)
    });
  }, []);

  const setCorrectness = useCallback(() => {
    if (shouldRecordCorrectness && !inQuitMode) {
      setCorrectnessArr((prev) => {
        let newArr = [...prev];
        for (let i = position; i < position + lastKey.length; i++) {
          newArr[i] = lastKey.charAt(i - position) === paragraph.charAt(i);
        }
        return newArr;
      });
    }
  }, [lastKey, position]);

  useEffect(() => {
    if (lastKey === ':') {
      setInQuitMode((prev) => !prev);
    }
    else if (shouldRecordCorrectness) {
      switch (lastKey) {
        case ':Empty:':
        case ':Enter:':
          // ignore
          break;
        case ':Backspace:':
          decreasePosition(1);
          break;
        default:
          setCorrectness();
          increasePosition(lastKey.length);
          break;
      }
    }
  }, [gameState, lastKey, repeats]);

  type charType = { item: string, index: number };
  const renderItem = ({ item, index }: charType) => (
    <GameChar
      char={item}
      currentLetter={index === position}
      onCorrect={() => setCurrentScore((prev) => prev + pointValues.correct)}
      onIncorrect={() => setCurrentScore((prev) => prev + pointValues.incorrect)}
      userTypedCorrectly={index >= position ? undefined : correctnessArr[index]}
      scrollList={() => flatListRef.current?.scrollToIndex({
        animated: true,
        index: Math.max(index - START_SCROLL_OFFSET, 0),
      })}
    />
  );

  return (
    <>
      <BackButton previousScreen='Main Menu' stringToMatch=":quit" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <PlayerGameInfo isOpponent={false} />
          {gameMode !== "Solo" && (
            <PlayerGameInfo isOpponent />
          )}
      </View>
      <View style={{ marginTop: 8, marginBottom: 8 }}>
        <Text h2 style={{ textAlign: 'center' }}>
          {`Score: ${currentScore}${gameMode === "Solo" ? "" : " - 49"}`}
        </Text>
      </View>
      <View style={{ marginTop: 8, marginBottom: 8 }}>
        <Text h2 style={{ textAlign: 'center' }}>
          {`WPM: ${Math.round(currentWordsPerMinute)}${gameMode === "Solo" ? "" : " - 49"}`}
        </Text>
      </View>
      <CountdownCircle />
      <View>
        <FlatList
          ref={(ref) => setFlatListRef(ref)}
          style={{
            paddingTop: 48,
          }}
          data={paragraphArr}
          renderItem={renderItem}
          horizontal
          initialNumToRender={paragraphArr.length}
          windowSize={10}
          maxToRenderPerBatch={10}
          keyExtractor={(item, index) => `${index}`}
          onScroll={handleScroll}
          onEnded={() => setGameState("Ended")}
        />
        {showFader.start &&
          <LinearGradient
            style={{position:'absolute', left: 0, width:20, height:'100%'}}
            start={[0,0]}
            end={[1,0]}
            colors={['#00BCFF', '#00BCFF00']}
            pointerEvents={'none'}
          />
        }
        {showFader.end &&
          <LinearGradient
            style={{position:'absolute', right: 0, width:20, height:'100%'}}
            start={[0,0]}
            end={[1,0]}
            colors={['#00BCFF00', '#00BCFF']}
            pointerEvents={'none'}
          />
        }
      </View>
    </>
  );
}
