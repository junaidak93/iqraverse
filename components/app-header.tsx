import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '@/providers/contexts';

interface AppHeaderProps {
  title: string;
  showBack?: boolean;
  showAsMainTitle?: boolean;
  showSettings?: boolean;
  showThemeToggle? : boolean;
}

export default function AppHeader({ title, showBack = false, showAsMainTitle = false, showSettings = true, showThemeToggle = true }: AppHeaderProps) {
  const router = useRouter();

  const { isDarkMode, toggleDarkMode } = useContext(AppContext);

  const styles = getStyles(isDarkMode);

  if (Platform.OS === 'android') {
    styles.title = styles.mainTitle;
  }

  return (
    <View style={styles.container}>
      {showBack && (
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons
            name="chevron-back"
            size={25}
            color={isDarkMode ? '#fff' : '#111'}
          />
        </TouchableOpacity>
      )}

      {showAsMainTitle ? (
        <Text style={styles.mainTitle}>{title}</Text>
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
      

      <View style={{flexDirection: 'row', justifyContent: 'flex-end', gap: 30, paddingRight: 15, marginTop: 8}}>
        {showThemeToggle && (
          <Ionicons
            name={isDarkMode ? 'sunny' : 'moon'}
            size={22}
            color={isDarkMode ? '#fff' : '#111'}
            onPress={() => toggleDarkMode()}
          />
        )}

        {showSettings && (
          <Ionicons
            name={'settings-outline'}
            size={22}
            color={isDarkMode ? '#fff' : '#111'}
            onPress={() => router.navigate('/settings')}
          />
        )}
      </View>
    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      height: 64,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      backgroundColor: isDark ? '#0f1511' : '#F7F9F8',
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#1F2A24' : '#E5E7EB',
      marginTop: 33
    },

    backButton: {
      width: 25,
      height: 25,
      borderRadius: 0,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 8,
    },

    placeholder: {
      width: 0,
    },

    title: {
      fontSize: 18,
      fontWeight: 'bold',
      alignSelf: 'center',
      color: isDark ? '#fff' : '#111827',
    },

    mainTitle: {
      fontSize: 18,
      marginTop: 8,
      fontWeight: 'bold',
      alignSelf: 'center',
      color: isDark ? '#fff' : '#111827',
    },
  });