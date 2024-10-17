// AudioPlayer.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Audio, AVPlaybackStatus } from 'expo-av';

// Use relative paths
const actionItems = [
  {
    image: require('../assets/images/apple-logo.png'),
    title: 'Think Different',
    subtitle: '1 minute listen',
    audioFile: require('../assets/audio/think-different-jobs.mp3'),
  },
  {
    image: require('../assets/images/apple-logo.png'),
    title: 'How to Improve Your Focus',
    subtitle: '5 minutes - Lesson',
    audioFile: require('../assets/audio/think-different-jobs.mp3'),
  },
];

export default function AudioPlayerScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { itemIndex } = params as { itemIndex: string };

  const index = parseInt(itemIndex, 10);
  const item = actionItems[index];

  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(1);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const prepareAudio = async () => {
      try {
        // Set audio mode
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });

        await loadSound();
      } catch (error) {
        console.error('Error in prepareAudio:', error);
      }
    };

    prepareAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const loadSound = async () => {
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(item.audioFile, {
        shouldPlay: true,
      });
      setSound(newSound);

      newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    } catch (error) {
      console.error('Error loading sound:', error);
    }
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis || 1);
      setProgress(status.positionMillis || 0);
      setIsPlaying(status.isPlaying);
      if (status.didJustFinish) {
        setIsFinished(true);
      }
    } else if (status.error) {
      console.error('Playback error:', status.error);
    }
  };

  const handlePlayPause = async () => {
    if (isPlaying) {
      await sound?.pauseAsync();
    } else {
      await sound?.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value);
    }
  };

  const handleForward = async () => {
    if (sound) {
      let newPosition = progress + 10000; // forward 10s
      if (newPosition > duration) newPosition = duration;
      await sound.setPositionAsync(newPosition);
    }
  };

  const handleBackward = async () => {
    if (sound) {
      let newPosition = progress - 10000; // backward 10s
      if (newPosition < 0) newPosition = 0;
      await sound.setPositionAsync(newPosition);
    }
  };

  const handleCompletion = () => {
    router.replace({
      pathname: '/',
      params: { completedIndex: itemIndex },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      {item.image && (
        <Image source={item.image} style={styles.image} resizeMode="cover" />
      )}

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={progress}
        onSlidingComplete={handleSeek}
        minimumTrackTintColor="#1FB28B"
        maximumTrackTintColor="#d3d3d3"
      />

      <View style={styles.controls}>
        <TouchableOpacity onPress={handleBackward}>
          <Ionicons name="play-back" size={32} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlayPause}>
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={32} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleForward}>
          <Ionicons name="play-forward" size={32} color="#000" />
        </TouchableOpacity>
      </View>

      {isFinished && (
        <TouchableOpacity style={styles.completeButton} onPress={handleCompletion}>
          <Text style={styles.completeButtonText}>Finish</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 70,
    left: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 24,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  slider: {
    width: '80%',
    height: 40,
    marginTop: 20,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  completeButton: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
