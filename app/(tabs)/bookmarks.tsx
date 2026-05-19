import QuranCard from "@/components/quran-card";
import * as ayahService from '@/services/ayah-service';
import { useFonts } from "@/hooks/use-fonts";
import { AppContext } from "@/providers/contexts";
import { useSQLiteContext } from "expo-sqlite";
import { useContext, useEffect, useState, useMemo } from "react";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { FlatList, StyleSheet, useWindowDimensions, View, Text, Pressable } from 'react-native';
import { Ayah } from "@/models/ayah";
import { getAyahKey, getAyahDisplayKey } from '@/helper/key-helper';
import { darkStyles, lightStyles } from '@/styles/ayah';
import { Link } from "expo-router";
import SearchBox from '@/components/searchbox';

export default function Bookmarks() {
    const { 
        isDarkMode,
        bookmarks,
        addBookmark,
        removeBookmark
    } = useContext(AppContext);

    const { width } = useWindowDimensions();

    const [ayahs, setAyahs] = useState<Ayah[]>([]);
    const [searchText, setSearchText] = useState('');

    useFonts();
    const db = useSQLiteContext();
 
    const styles = isDarkMode ? darkStyles : lightStyles;

    const getAyah = async (bookmark: { surah_id: number; ayah_id: number }) => {
        return await ayahService.getAyahById(db, bookmark.surah_id, bookmark.ayah_id);return await ayahService.getAyahById(db, bookmark.surah_id, bookmark.ayah_id);
    }

    useEffect(() => {
        const fetchAyahs = async () => {
            const ayahPromises = bookmarks?.map(getAyah);
            const fetchedAyahs = await Promise.all(ayahPromises ?? []) as Ayah[];
            
            if (fetchedAyahs) {
                fetchedAyahs.forEach(a => a.isBookmarked = true);
                setAyahs(fetchedAyahs);
            }
        };

        fetchAyahs();
    }, [bookmarks]);

    const toggleBookmark = (ayah: Ayah) => {
        if (ayah.isBookmarked) {
            ayah.isBookmarked = false;
            removeBookmark({ parah_id: ayah.parah_id, surah_id: ayah.surah_id, ayah_id: ayah.ayah_id });
        } else {
            ayah.isBookmarked = true;
            addBookmark(ayah);
        }
    };

    const filteredAyahs = useMemo(() => {
        if (!searchText) 
          return ayahs;
    
        return ayahs.filter((s) =>
            getAyahKey(s).includes(searchText.trim()) ||
            getAyahDisplayKey(s).includes(searchText.trim()) ||
            s.en_meaning.toLowerCase().includes(searchText.toLowerCase()) ||
            s.ar_text.includes(searchText)
        );
    }, [searchText, ayahs]);

    const BISMILLAH = 'بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ';
    const BISMILLAH2 = 'بِّسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ';

    const isSurahTauba = (ayah: Ayah) => ayah.surah_id === 9;

    const isFirstAyah = (ayah: Ayah) => ayah.ayah_id === 1 && !isSurahTauba(ayah);

    const getAyahDisplayText = (ayah: Ayah) => {
        if (isFirstAyah(ayah)) {
            return ayah.ar_text.replaceAll(BISMILLAH, '').replaceAll(BISMILLAH2, '').trim();
        }
        return ayah.ar_text;
    }

    return (
        <View style={{ flex: 1, backgroundColor: isDarkMode ? '#0f1511' : '#f0e9e9' }}>
            <SearchBox value={searchText} onChange={setSearchText} />
            
            <FlatList
                contentContainerStyle={{ alignSelf: 'flex-start' }}
                data={filteredAyahs}
                keyExtractor={(item) => `${item.surah_id} : ${item.ayah_id}`}
                renderItem={({ item }) =>
                    <Link 
                        style={{ 
                            ...styles.card, 
                            marginLeft: 15, 
                            marginRight: 15, 
                            marginTop: 15, 
                            width: width - 30
                        }} 
                        href={{ pathname: "../ayahs", params: { surah_id: item.surah_id, ayah_id: item.ayah_id } }}>
                        <View style={styles.ayahContainer}>
                            {/* Header Row */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: 10,
                                }}
                            >
                                {/* Ayah Number */}
                                <Text style={{ ...styles.tab, fontSize: 18 }}>
                                    {getAyahDisplayKey(item)}
                                </Text>

                                {/* Bookmark Button */}
                                <Pressable
                                    onPress={() => toggleBookmark(item)}
                                    hitSlop={10}
                                >
                                    <Ionicons
                                        name={
                                            item.isBookmarked
                                                ? 'bookmark'
                                                : 'bookmark-outline'
                                        }
                                        size={24}
                                        color={styles.tab.color}
                                    />
                                </Pressable>
                            </View>

                            {/* Arabic */}
                            <Text style={{...styles.arabic, height: 100}} numberOfLines={1} ellipsizeMode="tail">
                                {getAyahDisplayText(item)}
                            </Text>

                            {/* Translation Label */}
                            <Text  
                                style={{
                                    ...styles.tab,
                                    marginTop: 10,
                                }}
                            >
                                Translation:
                            </Text>

                            {/* Translation */}
                            <Text numberOfLines={1} ellipsizeMode="tail"
                                style={{
                                    ...styles.translation,
                                    paddingBottom: 10,
                                }}
                            >
                                {item.en_meaning}
                            </Text>

                        </View>
                    </Link>
                } 
            />
        </View>
    );
}