import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import * as surahService from '@/services/surah-service';
import { Surah } from '@/models/surah';
import QuranCard from '../../components/quran-card';
import { useFonts } from '@/hooks/use-fonts';
import { FlashList } from '@shopify/flash-list';
import { ColorScheme } from '@/helper/color-scheme-helper';
import SearchBox from '@/components/searchbox';
import debounce from '@/helper/debouncer';

export default function SurahList() {
  useFonts();
  const db = useSQLiteContext();
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [searchText, setSearchText] = useState('');

  const styles = ColorScheme.isDarkMode ? darkStyles : lightStyles;

  useEffect(() => {
    async function fetchData() {
      const surahList = await surahService.getAllSurahs(db);
      setSurahs(surahList);
    }
    fetchData();
  }, [db]);

  const filteredSurahs = useMemo(() => {
    if (!searchText) 
      return surahs;

    return surahs.filter((s) =>
        s.en_name.toLowerCase().includes(searchText.toLowerCase()) ||
        s.ar_name.includes(searchText) ||
        s.en_meaning.toLowerCase().includes(searchText.toLowerCase())
      );
  }, [searchText, surahs]);

  return (
    <View style={{ flex: 1 }}>
      <SearchBox value={searchText} onChange={setSearchText} />

      <FlatList
        numColumns={2}
        style={styles.list}
        //contentContainerStyle={{ alignSelf: 'flex-start' }}
        data={filteredSurahs}
        keyExtractor={(item) => item.index.toString()}
        renderItem={({ item }) => 
          <QuranCard
            index={item.index.toString()}
            href={{ pathname: "../ayahs", params: { surah_id: item.index } }}
            arName={item.ar_name}
            enName={item.en_name}
            enMeaning={item.en_meaning}
            ruku={item.raku_count}
            parahRange={item.parah_ids}
            verses={item.ayah_count}
            type="surah"
          />
        }
      />
    </View>
  );
}

const darkStyles = StyleSheet.create({
  list: {
    backgroundColor: '#282626'
  }
});

const lightStyles = StyleSheet.create({
  list: {
    backgroundColor: '#f0e9e9'
  }
});