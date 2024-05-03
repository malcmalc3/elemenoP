import * as React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserProfile } from '../../contexts/UserProfileProvider';
import { useGameState } from '../../contexts/GameStateProvider';
import InGameStatText from './InGameStatText';

interface PlayerGameInfoProps {
  isOpponent: boolean;
};

export default function PlayerGameInfo({
  isOpponent,
}: PlayerGameInfoProps) {
  const { username } = useUserProfile();
  const { gameMode } = useGameState();
  
  return (
    <>
      <View
        style={{
          alignItems: 'center',
          borderWidth: 2,
          paddingLeft: isOpponent ? 4 : 40,
          marginLeft: isOpponent ? 4 : -40,
          paddingRight: isOpponent ? 40 : 4,
          marginRight: isOpponent ? -40 : 4,
          borderColor: 'white',
          borderRadius: 12,
          flex: 1,
        }}
      >
        {gameMode !== 'Solo' && (
          <>
            <View>
              <Text style={{ fontSize: 18, textAlign: 'center' }}>
                {isOpponent ? 'opp' : username}
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 18, textAlign: 'center' }}>
                {`win%   ${isOpponent ? 31 : 87}`}
              </Text>
            </View>
          </>
        )}
        <InGameStatText isCurrentUser={!isOpponent} statType='WORDS_PER_MINUTE' />
        <InGameStatText isCurrentUser={!isOpponent} statType='SCORE' />
      </View>
    </>
  );
}
