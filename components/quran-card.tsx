import { Href, Link } from 'expo-router';
import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ThemeContext } from '@/providers/contexts';

type Props = {
  index: string;
  arName: string;
  enName: string;
  enMeaning: string;
  type: 'parah' | 'surah';
  verses?: number;
  ruku?: number;
  parahRange?: string;
  pageRange?: string;
  verseRanges?: string[];
  href: Href
};

export default function QuranCard({
  index,
  arName,
  enName,
  enMeaning,
  type,
  verses,
  ruku,
  parahRange,
  pageRange,
  verseRanges,
  href
}: Props) {
  const isSurah = type === 'surah';
  const { isDarkMode } = useContext(ThemeContext);  
  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={[styles.card, isSurah ? styles.blueCard : styles.greenCard]}>
        {/* Top Badge */}
        <View style={styles.badge}>
            <Text style={styles.badgeText}>{index}</Text>
        </View>

        {/* Arabic Name */}
        <Text style={[styles.arabic, isSurah ? styles.blueText : styles.greenText]}>
            {arName}
        </Text>

        {/* Type */}
        <Text style={styles.type}>
            {type.toUpperCase()}
        </Text>

        {/* English Name */}
        <Text style={styles.title}>{enName}</Text>

        {/* Meaning */}
        <Text style={styles.meaning}>{enMeaning}</Text>

        {/* Bottom Info */}
        <View style={styles.footer}>
            {verses && (
            <View style={styles.footerItem}>
                <Text style={styles.footerLabel}>Verses</Text>
                <Text style={styles.footerValue}>{verses}</Text>
            </View>
            )}

            {ruku && (
            <View style={styles.footerItem}>
                <Text style={styles.footerLabel}>Ruku</Text>
                <Text style={styles.footerValue}>{ruku}</Text>
            </View>
            )}

            {parahRange && (
            <View style={styles.footerItem}>
                <Text style={styles.footerLabel}>Parah</Text>
                <Text style={styles.footerValue}>{parahRange}</Text>
            </View>
            )}

            {pageRange && (
            <View style={styles.footerItem}>
                <Text style={styles.footerLabel}>Pages</Text>
                <Text style={styles.footerValue}>{pageRange}</Text>
            </View>
            )}

            {verseRanges && (
                <View style={styles.footerItem}>
                    <Text style={styles.footerLabel}>Verses</Text>
                    <FlatList 
                        data={verseRanges}
                        renderItem={({ item }) => <Text style={styles.footerValue}>{item}</Text>}
                    ></FlatList>
                </View>
            )}
        </View>

        <Link key={index} href={href} style={{
            ...StyleSheet.absoluteFillObject            
        }}></Link>
    </View>
  );
}

const lightStyles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 16,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: 170,
    height: 'auto',
    marginLeft: 8
  },

  greenCard: {
    backgroundColor: '#EAF5EF',
  },

  blueCard: {
    backgroundColor: '#EEF2FB',
  },

  badge: {
    position: 'absolute',
    top: -12,
    alignSelf: 'center',
    backgroundColor: '#1E7F5C',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeText: {
    color: '#fff',
    fontWeight: 'bold'
  },

  arabic: {
    fontFamily: 'Uthmani',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
  },

  greenText: {
    color: '#1E7F5C',
  },

  blueText: {
    color: '#2C3E8F',
  },

  type: {
    textAlign: 'center',
    color: '#888',
    marginTop: 4,
    letterSpacing: 1,
  },

  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
  },

  meaning: {
    textAlign: 'center',
    color: '#777',
    marginTop: 4,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    height: 'auto'
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
    alignItems: 'flex-end',
    marginTop: 16,
    paddingTop: 10,
    borderColor: '#ddd',
  },

  footerItem: {
    alignItems: 'center',
  },

  footerLabel: {
    fontSize: 10,
    color: '#999',
  },

  footerValue: {
    fontWeight: '600',
  },
});

const darkStyles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 16,
    marginVertical: 15,
    backgroundColor: '#151A17', // base dark card
    shadowColor: '#000',
    shadowOpacity: 0.4, // stronger shadow for dark
    shadowRadius: 12,
    elevation: 8,
    width: 170,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#1F2A24', // subtle border for separation
  },

  greenCard: {
    backgroundColor: '#16261F', // dark green tint
  },

  blueCard: {
    backgroundColor: '#1A1F2E', // dark blue tint
  },

  badge: {
    position: 'absolute',
    top: -12,
    alignSelf: 'center',
    backgroundColor: '#1E7F5C',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 6,
  },

  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  arabic: {
    fontFamily: 'Uthmani',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
    color: '#F3F4F6', // near-white for clarity
  },

  greenText: {
    color: '#34D399', // softer green for dark
  },

  blueText: {
    color: '#7DA2FF', // softer blue
  },

  type: {
    textAlign: 'center',
    color: '#9CA3AF', // muted gray
    marginTop: 4,
    letterSpacing: 1,
  },

  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
    color: '#FFFFFF',
  },

  meaning: {
    textAlign: 'center',
    color: '#9CA3AF',
    marginTop: 4,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
    alignItems: 'flex-end',
    marginTop: 16,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: '#1F2A24', // subtle divider
  },

  footerItem: {
    alignItems: 'center',
  },

  footerLabel: {
    fontSize: 10,
    color: '#6B7280',
  },

  footerValue: {
    fontWeight: '600',
    color: '#E5E7EB',
  },
});