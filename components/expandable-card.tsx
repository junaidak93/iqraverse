import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Or use any icon library
import { ThemeContext } from '@/providers/contexts';

// Enable LayoutAnimation for Android
// if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

const ExpandableCard = ({ id, header, children, onExpanded, defaultExpanded = false } : { id: string | number, header: any, children: any, onExpanded: (key: string | number) => any, defaultExpanded: boolean }) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const { isDarkMode } = useContext(ThemeContext);  
  const styles = isDarkMode ? darkModeSytles : lightModeStyles;

  const toggleExpand = () => {
    if (!expanded) {
        onExpanded(id);
    }

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity 
        style={styles.headerTouch} 
        onPress={toggleExpand} 
        activeOpacity={0.8}
      >
        {/* Custom Header Area */}
        <View style={styles.headerContent}>
          {header}
        </View>
        
        <MaterialIcons 
          name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
          size={24} 
          color={isDarkMode ? '#fff' : '#222'} 
        />
      </TouchableOpacity>

      {/* Custom Inner Content Area */}
      {expanded && (
        <View style={styles.innerContent}>
          {children}
        </View>
      )}
    </View>
  );
};

const lightModeStyles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F8F9FA',
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#212529', // Dark charcoal/black text
    fontSize: 16,
    fontWeight: '600',
  },
  contentContainer: {
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#E9ECEF', // Soft grey divider
    marginVertical: 10,
  },
  contentText: {
    color: '#495057', // Medium grey for readability
    fontSize: 14,
    lineHeight: 20,
  },
  headerTouch: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContent: { flex: 1 },
  innerContent: {
    padding: 15,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#F1F3F5', // Very light border
  },
});


const darkModeSytles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#121212',
  },
  card: {
    backgroundColor: '#1E1E1E',
    width: '100%',
    padding: 15,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginTop: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  contentContainer: {
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 10,
  },
  contentText: {
    color: '#A0A0A0',
    fontSize: 14,
    lineHeight: 20,
  },
  headerTouch: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContent: { flex: 1 },
  innerContent: {
    padding: 15,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
});

export default ExpandableCard;
