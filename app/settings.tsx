import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  useColorScheme,
  Image,
  StatusBar,
} from 'react-native';
import AppHeader from '@/components/app-header';
import { Ionicons } from '@expo/vector-icons';
import reciters from '@/assets/static-data/reciters';
import { Dropdown } from 'react-native-element-dropdown';
import { AppContext } from '@/providers/contexts';

export default function SettingsScreen() {
  const { 
    isDarkMode, 
    autoPlayNextAyah, 
    updateAutoPlayNextAyah, 
    theme, 
    updateTheme, 
    reciterId, 
    updateReciterId 
  } = useContext(AppContext);

  const [reciter, setReciter] = useState(reciters.find(r => r.id === reciterId));

  function getReciterItem(item: any) {
    return (
        <View style={styles.dropdownItem}>
            <Image
                source={item.image}
                style={styles.avatar}
            />
            
            <View style={styles.dropdownText}>
                <Text style={{ fontSize: 16 }}>
                    {item.reciter_name}
                </Text>

                <Text style={{ fontSize: 12 }}>
                    {item.style}
                </Text>
            </View>
        </View>
    );
  }

return (
  <View style={[
    styles.container,
    {
      backgroundColor: isDarkMode
        ? '#0f1511'
        : '#F7F9F8'
    }
  ]}>
    <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} translucent={true} backgroundColor="transparent" />
    <AppHeader title="Settings" showBack={true} showSettings={false} showThemeToggle={false} />

    <View style={styles.section}>
        <Text style={styles.heading}>
            Recitation
        </Text>

        <Dropdown
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            selectedTextProps={{
                numberOfLines: 2
            }}
            data={reciters}
            labelField="reciter_name"
            valueField="id"
            value={reciter?.id}
            autoScroll={true}
            onChange={item => {
                setReciter(item);
                updateReciterId(item.id);
            }}
            
            renderItem={item => getReciterItem(item)}
            renderLeftIcon={() => {
                const selected = reciters.find(r => r.id === reciter?.id);

                return selected ? (
                    <Image
                        source={selected.image}
                        style={styles.avatar}
                    />
                ) : null;
            }}
        />
    </View>

    <View style={styles.section}>
        <Text style={styles.heading}>
            Playback
        </Text>

        <View style={styles.card}>
            <Text style={styles.cardText}>Autoplay next ayah</Text>
            <Switch value={autoPlayNextAyah} onValueChange={(value) => updateAutoPlayNextAyah(value)} />
        </View>
    </View>

    <View style={{...styles.section, marginTop: 20}}>
        <Text style={styles.heading}>
            Appearance
        </Text>

        {['system', 'dark', 'light'].map(
            option => (
            <TouchableOpacity
                key={option}
                style={styles.card}
                onPress={() =>
                    updateTheme(option as any)
                }
            >
                <Text style={styles.cardText}>
                {option.charAt(0).toUpperCase() +
                    option.slice(1)}
                </Text>

                {theme === option && (
                <Ionicons
                    name="checkmark-circle"
                    size={22}
                    color="#1E7F5C"
                />
                )}
            </TouchableOpacity>
            )
        )}
    </View>
</View>
)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  section: {
    marginTop: 24,
    paddingHorizontal: 18,
  },

  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#1E7F5C',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    elevation: 3,
  },

  cardText: {
    fontSize: 16,
    flex: 1,
    marginLeft: 12,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },

  dropdown: {
    height: 65,
    borderRadius: 18,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    elevation: 3,
  },

  dropdownContainer: {
    borderRadius: 18,
    overflow: 'hidden',
  },

  placeholderStyle: {
    fontSize: 16,
  },

  selectedTextStyle: {
    marginLeft: 12,
    fontSize: 16,
  },

  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },

  dropdownText: {
    marginLeft: 12,
    fontSize: 16,
  },
});