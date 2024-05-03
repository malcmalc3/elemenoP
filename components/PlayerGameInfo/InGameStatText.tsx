import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { StatType, useUserProfile } from '../../contexts/UserProfileProvider'; 
import { AnimatedStatChange } from '../AnimatedStatChange/AnimatedStatChange';

const statTypeToText = {
  'WORDS_PER_MINUTE': 'avg. wpm',
  'SCORE': 'avg. score',
};

interface InGameStatTextProps {
  isCurrentUser: boolean;
  statType: StatType;
};


export default function InGameStatText({
  isCurrentUser,
  statType,
}: InGameStatTextProps) {
  const { stats } = useUserProfile();

  const [displayStat, setDisplayStat] = useState<number | null>(null);
  const [change, setChange] = useState(0);

  useEffect(() => {
    if (displayStat !== null) {
      const newStat = isCurrentUser ? stats[statType].roundedValue : 0;
      setChange(newStat - displayStat);
      setDisplayStat(newStat);
    } else {
      setDisplayStat(isCurrentUser ? stats[statType].roundedValue : 0);
    }
  }, [isCurrentUser, statType, displayStat]);

  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, textAlign: 'center' }}>
          {`${statTypeToText[statType]}   ${displayStat ?? 0}`}
        </Text>
        {change !== 0 && <AnimatedStatChange value={change} duration={500} />}
      </View>
    </>
  );
}
