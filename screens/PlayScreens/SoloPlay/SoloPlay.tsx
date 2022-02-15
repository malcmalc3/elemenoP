import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import BackButton from '../../../components/BackButton';
import { useKeyboard } from '../../../contexts/KeyboardProvider';
import GameChar from '../GameChar';
import PlayerGameInfo from '../PlayerGameInfo';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { pointValues } from '../../../utils/points';

const paragraph = 'The hardest choices require the strongest wills';
const paragraphArr = paragraph.split('');

const START_SCROLL_OFFSET = 5;

export default function SoloPlay() {
  const { lastKey, repeats } = useKeyboard();

  const flatListRef = useRef<FlatList<string> | null>(null);
  const setFlatListRef = useCallback((ref: FlatList<string> | null) => {
    flatListRef.current = ref;
  }, []);

  const [points, setPoints] = useState(0);
  const [correctnessArr, setCorrectnessArr] = useState<boolean[]>(
    Array(paragraph.length).fill(undefined)
  );
  const [position, setPosition] = useState(0);
  const [showFader, setShowFader] = useState({ start: false, end: true });

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const contentSize = event.nativeEvent.contentSize;
    const layoutWidth = event.nativeEvent.layoutMeasurement.width;
    setShowFader({
      start: offsetX > 0,
      end: contentSize.width - offsetX !== layoutWidth,
    })
  }, []);

  const increasePosition = useCallback((amount: number) => {
    setPosition((prev) => prev + amount);
  }, []);

  const decreasePosition = useCallback((amount: number) => {
    setPosition((prev) => {
      if (prev !== 0) setPoints((prev) => prev + pointValues.backscpace);
      return Math.max(0, prev - amount)
    });
  }, []);

  const setCorrectness = useCallback(() => {
    setCorrectnessArr((prev) => {
      let newArr = [...prev];
      for (let i = position; i < position + lastKey.length; i++) {
        newArr[i] = lastKey.charAt(i - position) === paragraph.charAt(i);
      }
      return newArr;
    });
  }, [lastKey, position]);

  useEffect(() => {
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
  }, [lastKey, repeats]);

  type charType = { item: string, index: number };
  const renderItem = ({ item, index }: charType) => (
    <GameChar
      char={item}
      currentLetter={index === position}
      onCorrect={() => setPoints((prev) => prev + pointValues.correct)}
      onIncorrect={() => setPoints((prev) => prev + pointValues.incorrect)}
      userTypedCorrectly={index >= position ? undefined : correctnessArr[index]}
      scrollList={() => flatListRef.current?.scrollToIndex({
        animated: true,
        index: Math.max(index - START_SCROLL_OFFSET, 0),
      })}
    />
  );

  return (
    <>
      <BackButton previousScreen='Play Menu' />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <PlayerGameInfo isOpponent={false} />
          <PlayerGameInfo isOpponent />
      </View>
      <View
        style={{
          marginTop: 8,
          marginBottom: 8,
        }}>
          {/* <Text h3 style={{ textAlign: 'center' }}>score</Text> */}
          <Text h2 style={{ textAlign: 'center' }}>{`${points} - 49`}</Text>
      </View>
      <View
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
          isPlaying
          duration={10}
          colors={[
            ['#FFFFFF', 0.7],
            ['#FFFFFF', 0.1],
            ['#FF0000', 0.2],
          ]}
          trailColor='orange'
          size={140}
        >
          {({ remainingTime }) => (
            <Text h2>
              {remainingTime}
            </Text>
          )}
        </CountdownCircleTimer>
      </View>
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
