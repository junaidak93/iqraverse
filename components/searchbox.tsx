import React, { Dispatch, useContext } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { ThemeContext } from '@/providers/contexts';

export default function SearchBox({ value, onChange }: { value: string, onChange: Dispatch<React.SetStateAction<string>> }) {  
  const { isDarkMode } = useContext(ThemeContext);  
  const styles = isDarkMode ? darkStyles : lightStyles;

    return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search..."
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChange}
        style={styles.input}
      />
    </View>
  );
}

const darkStyles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#0f1511'//'#282626'
  },
  input: {
    backgroundColor: '#1F2A24',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#fff',
    borderColor: '#000',
    borderWidth: 0.5
  }
});

const lightStyles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#f0e9e9'
  },
  input: {
    color: '#1F2A24',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 0.5
  },
});