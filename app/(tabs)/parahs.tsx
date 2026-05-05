import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import * as parahService from '@/services/parah-service';
import { Parah } from '@/models/parah';
import QuranCard from '../../components/quran-card';
import { useFonts } from '@/hooks/use-fonts';
import { ColorScheme } from '@/helper/color-scheme-helper';
import SearchBox from '@/components/searchbox';

export default function ParahList() {
  useFonts();
  const db = useSQLiteContext();
  const [parahs, setParahs] = useState<Parah[]>([]);
  const [searchText, setSearchText] = useState('');

  const styles = ColorScheme.isDarkMode ? darkStyles : lightStyles;

  useEffect(() => {
    async function fetchData() {
      const parahList = await parahService.getAllParahs(db);
      setParahs(parahList);
    }
    fetchData();
  }, [db]);

  const filteredParahs = useMemo(() => {
    if (!searchText) 
      return parahs;

    return parahs.filter((s) =>
        s.en_name.toLowerCase().includes(searchText.toLowerCase()) ||
        s.ar_name.includes(searchText) ||
        s.en_meaning.toLowerCase().includes(searchText.toLowerCase())
      );
  }, [searchText, parahs]);

  return (
    <View style={{ flex: 1 }}>
      <SearchBox value={searchText} onChange={setSearchText} />

      <FlatList
        style={styles.list}
        numColumns={2}
        contentContainerStyle={{ alignSelf: 'flex-start' }}
        data={filteredParahs}
        keyExtractor={(item) => item.index.toString()}
        renderItem={({ item }) =>
          <QuranCard
            index={item.index.toString()}
            href={{ pathname: "../ayahs", params: { parah_id: item.index } }}
            arName={item.ar_name}
            enName={item.en_name}
            enMeaning={item.en_meaning}
            verses={item.ayah_count}
            type="parah"
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