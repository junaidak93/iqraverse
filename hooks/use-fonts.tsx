import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

export function useFonts() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      Uthmani: require('../assets/fonts/Usmani-Script.ttf'),
    }).then(() => setLoaded(true));
  }, []);

  return loaded;
}