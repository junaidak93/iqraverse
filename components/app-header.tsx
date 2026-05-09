import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '@/providers/contexts';

interface AppHeaderProps {
  title: string;
  showBack?: boolean;
}

export default function AppHeader({ title, showBack = false }: AppHeaderProps) {
  const router = useRouter();

  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const styles = getStyles(isDarkMode);

  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


  return (
    <View style={styles.container}>
      {showBack ? (
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons
            name="chevron-back"
            size={26}
            color={isDarkMode ? '#fff' : '#111'}
          />
        </TouchableOpacity>
      ) : (
        
        <View style={styles.placeholder}>
          <Image
            source={require('./../assets/images/icon.png')}
            placeholder={blurhash}
            contentFit="fill"
            
            transition={1000}
            style={{
              // width: 28,
              // height: 28,
              margin: 5,
              borderRadius: 6,

              flex: 1,
              width: 55
              //backgroundColor: '#0553',
            }}
          />
        </View>
      )}

      <Text style={styles.title}>{title}</Text>

      <View style={styles.placeholder}>
        <Ionicons
          name={isDarkMode ? 'sunny' : 'moon'}
          size={22}
          color={isDarkMode ? '#fff' : '#111'}
          onPress={() => toggleTheme()}
        />
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
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },

    placeholder: {
      width: 40,
    },

    title: {
      fontSize: 20,
      fontWeight: '600',
      color: isDark ? '#fff' : '#111827',
    },
  });