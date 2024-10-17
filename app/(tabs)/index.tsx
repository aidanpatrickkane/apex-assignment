import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ActionItems from '@/components/ActionItems';
import Notes from '@/components/Notes';
import { StyleSheet } from 'react-native';
import { Calendar } from '@/components/Calendar';

export default function HomeScreen() {

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#323232', dark: '#1D3D47' }}>
      <ThemedView style={styles.calendarContainer}>
        <ThemedText type="subtitle">Day 15</ThemedText>
        <Calendar currentDay={16} currentMonth={10} currentYear={2024}/>
      </ThemedView>
      <ActionItems />
      <Notes />
      </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  calendarContainer: {
    flexDirection: 'column',
    gap: 8,
    paddingHorizontal: 16,
  },
});
