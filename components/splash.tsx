import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, useWindowDimensions } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Image } from 'expo-image';
import { AppContext } from '@/providers/contexts';

export default function SplashScreen() {
  const { isDarkMode } = useContext(AppContext);
  const { width, height } = useWindowDimensions();

  const opacity = useSharedValue(0.6);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, {
        duration: 1400,
      }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const darkImageSource = '@/assets/images/splash-dark.jpg';
  const lightImageSource = '@/assets/images/splash-light.jpg';

  return (
    <View style={{
        flex: 1,
        backgroundColor: isDarkMode ? '#0F1511' : '#F7F9F8',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 80,
    }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} translucent={true} backgroundColor="transparent" />

      <Animated.View
        entering={FadeIn.duration(600)}
        exiting={FadeOut.duration(400)}
        style={styles.content}
      >
        {isDarkMode ? (
          <Image
            source={require(darkImageSource)}
            style={{ width, height }}
            contentFit="cover"
          />
        ) : (
          <Image
            source={require(lightImageSource)}
            style={{ width, height: height + 50 }}
            contentFit="cover"
          />
        )}

        {/* <Text style={styles.title}>IqraVerse</Text>

        <Text style={styles.tagline}>
          Read • Reflect • Listen
        </Text> */}
      </Animated.View>

      {/* <Animated.Text style={[styles.poweredBy, animatedStyle]}>
        Powered by Quran.Foundation APIs
      </Animated.Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1511',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 80,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 130,
    height: 130,
    marginBottom: 24,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  tagline: {
    color: '#A8B3AD',
    fontSize: 15,
    marginTop: 10,
    letterSpacing: 1,
  },

  poweredBy: {
    color: '#5D6A64',
    fontSize: 12,
    letterSpacing: 0.8,
  },
});
