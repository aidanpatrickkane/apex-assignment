import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import ActionItem from './ActionItem';
import { useRouter, useLocalSearchParams } from 'expo-router';

const actionItems = [
  {
    image: require('@/assets/images/apple-logo.png'),
    title: 'Think Different',
    subtitle: '1 minute listen',
    audioFile: require('@/assets/audio/think-different-jobs.mp3'),
  },
  {
    image: require('@/assets/images/if-logo.png'),
    title: 'If --',
    subtitle: '2 minute listen',
    audioFile: require('@/assets/audio/if-rk-lf.mp3'),
  },
];

const ActionItems: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [completedItems, setCompletedItems] = useState<number[]>([]);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  useEffect(() => {
    if (params.completedIndex !== undefined) {
      const completedIndex = parseInt(params.completedIndex as string, 10);
      handleCompletion(completedIndex);
      router.setParams({ completedIndex: undefined });
    }
  }, [params.completedIndex]);

  const handlePress = (index: number) => {
    if (index === activeItemIndex || completedItems.includes(index)) {
      router.push({
        pathname: '/AudioPlayer',
        params: {
          itemIndex: index.toString(),
        },
      });
    }
  };

  const handleCompletion = (index: number) => {
    setCompletedItems(prev => {
      if (!prev.includes(index)) {
        return [...prev, index];
      }
      return prev;
    });
    if (index === activeItemIndex && index < actionItems.length - 1) {
      setActiveItemIndex(index + 1);
    }
  };

  return (
    <View style={styles.container}>
      {actionItems.map((item, index) => (
        <ActionItem
          key={index}
          image={item.image}
          title={item.title}
          subtitle={item.subtitle}
          isActive={index === activeItemIndex || completedItems.includes(index)}
          isCompleted={completedItems.includes(index)}
          onPress={() => handlePress(index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
});

export default ActionItems;

