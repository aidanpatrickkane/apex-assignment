import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useColorScheme, Text, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  Extrapolation,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';

const HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 60;

type Props = PropsWithChildren<{
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [0, HEADER_HEIGHT],
            [0, -HEADER_HEIGHT],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  const stickyHeaderAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollOffset.value,
        [HEADER_HEIGHT - STICKY_HEADER_HEIGHT, HEADER_HEIGHT],
        [0, 1],
        Extrapolation.CLAMP
      )
    }
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.View style={[styles.stickyHeader, stickyHeaderAnimatedStyle]}>
        <Text style={styles.stickyHeaderTitle}>MINDSET</Text>
      </Animated.View>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
          ]}>
            <Text style={styles.headerTitle}>MINDSET</Text>
            <Text style={styles.quoteSymbol}>"</Text>
            <Text style={styles.quote}>What is this brief, mortal life, if not the pursuit of legacy?</Text>
        </Animated.View>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    borderRadius: 35,
    overflow: 'visible',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.6,
    elevation: 8, // android stuff
    marginBottom: 10,
    gap: 0,
  },
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: STICKY_HEADER_HEIGHT,
    backgroundColor: 'black',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stickyHeaderTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 75,
    textAlign: 'center',
  },
  quoteSymbol: {
    fontSize: 72,
    color: 'white',
    opacity: 0.7,
    paddingLeft: 40,
    paddingTop: 40,
    fontFamily: 'Arial'
  },
  quote: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: 40,
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});
