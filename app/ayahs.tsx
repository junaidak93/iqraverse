import React, { useEffect, useMemo, useRef, useState, useContext, act } from 'react';
import { View, Text, StyleSheet, Pressable, StatusBar, Alert  } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import * as ayahService from '@/services/ayah-service';
import * as surahService from '@/services/surah-service';
import * as parahService from '@/services/parah-service';
import { Ayah } from '@/models/ayah';
import { Link, useLocalSearchParams } from 'expo-router';
import { Surah } from '@/models/surah';
import { useFonts } from '@/hooks/use-fonts';
import { FlashList, FlashListRef } from "@shopify/flash-list";
import { Dropdown } from 'react-native-element-dropdown';
import { AppContext } from '@/providers/contexts';
import AyahOption from '@/models/ayahOption';
import { MaterialIcons } from '@expo/vector-icons';
import AppHeader from '@/components/app-header';
import { AudioPlayer, AudioPlayerRef } from '@/components/audio-player';
import { getAyahAudio } from '@/assets/static-data/sample-audio';
import { getAyahKey, getAyahDisplayKey } from '@/helper/key-helper';


export default function AyahList() {
    useFonts();

    const { isDarkMode, lastRead, updateLastRead, reciterId, autoPlayNextAyah } = useContext(AppContext);
    const styles = isDarkMode ? darkStyles : lightStyles;

    const db = useSQLiteContext();
    const [ayahs, setAyahs] = useState<Ayah[]>([]);
    const [surahs, setSurahs] = useState<Surah[]>();
    const [activeAyah, setActiveAyah] = useState<Ayah>();
    const [activeAyahOption, setActiveAyahOption] = useState<AyahOption | null>();
    const [isDropdownOpening, setIsDropdownOpening] = useState(false);
    const [title, setTitle] = useState<string>("IqraVerse");

    const childRefs = useRef<Record<string, AudioPlayerRef | null>>({});

    const params = useLocalSearchParams();
    let surah_id : number = params.surah_id ? +params.surah_id : 0;
    let parah_id : number = params.parah_id ? +params.parah_id : 0;
    let ayah_id : number = params.ayah_id ? +params.ayah_id : 0;

    const isFromLastRead: boolean = params.isFromLastRead ? params.isFromLastRead.toString() === 'true' : false;

    if (isFromLastRead && lastRead) {
        parah_id = lastRead.parah_id ? +lastRead.parah_id : 0;
        surah_id = +lastRead.surah_id;
        ayah_id = +lastRead.ayah_id;
    }

    useEffect(() => {
      async function fetchData() {
        
        const ayahList = parah_id > 0
            ? await ayahService.getAllAyahsByParahIndex(db, +parah_id)
            : await ayahService.getAllAyahsBySurahIndex(db, +surah_id);

        const surahOrParah = parah_id > 0 
          ? (await parahService.getParahByIndex(db, parah_id))
          : (await surahService.getSurahByIndex(db, surah_id));

        setTitle(`${surahOrParah?.en_name} - ${surahOrParah?.ar_name}`);
        
        if (ayahList && ayahList.length > 0) {
            const surahIds = [...new Set(ayahList.map(ayah => ayah.surah_id))].join(',');

            let surahList = await surahService.getSurahsByIndices(db, surahIds);
            setSurahs(surahList);
        }

        setAyahs(ayahList);
      }

      fetchData();
    }, []);


    useEffect(() => {
      if (ayahs && ayahs.length > 0 && ayah_id && surah_id) {
        const ayah = ayahs.find(x => x.ayah_id === ayah_id && x.surah_id === surah_id);
        if (ayah) {
          onAyahSelected(ayah);
        }
      }
    }, [ayahs]);

    const ayahOptions = useMemo(() => {
      return ayahs?.map((a) => ({
        id: getAyahDisplayKey(a),
        surah: `${surahs?.find(x => x.index === a.surah_id)?.ar_name}`,
        label: `${a.ayah_id === 1 && a.surah_id !== 1 ? a.ar_text.replaceAll('بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ', '').trim() : a.ar_text}`,
        value: a,
      }));
    }, [ayahs]);

    const listRef = useRef<FlashListRef<Ayah>>(null);

    const scrollToAyah = (item : AyahOption) => {
      const index = ayahs.findIndex(a => a.ayah_id === item.value.ayah_id && a.surah_id === item.value.surah_id);
      const _activeAyah = ayahs.find(a => a.ayah_id === item.value.ayah_id && a.surah_id === item.value.surah_id);

      if (index !== -1) {
        setTimeout(() => {
          listRef.current?.scrollToIndex({
            index,
            animated: true,
          });
        }, 300);

        if (activeAyah !== _activeAyah) {
          setActiveAyah(_activeAyah);
        }
      }
    };

    const openSheet = (type: 'Translations' | 'Tafsirs' | 'Lessons' | 'Reflections') => {
      Alert.alert(`${type} will be available soon!`, "This is a feature where you may use this space to contemplate how the wisdom of the Quran connects with your life and faith.");
    };

    const BISMILLAH = 'بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ';
    const BISMILLAH2 = 'بِّسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ';

    const isFirstAyah = (ayah: Ayah) => ayah.ayah_id === 1 && !isSurahTauba(ayah);

    const isAyahBismillah = (ayah: Ayah) => ayah.ar_text == BISMILLAH;

    const isSurahTauba = (ayah: Ayah) => ayah.surah_id === 9;

    const getSurahRender = (ayah: Ayah) => {
        if (surahs) {
            let _surah = surahs.find(x => x.index === ayah.surah_id);

            return (
                <View style={styles.surahHeader}>
                    <Text style={styles.surahName}>{_surah?.ar_name}</Text>
                    <Text style={styles.translation}>{_surah?.en_meaning}</Text>
                </View>
            );
        }

        return (<></>);
    };

    const getAyahDisplayText = (ayah: Ayah) => {
      if (isFirstAyah(ayah)) {
        return ayah.ar_text.replaceAll(BISMILLAH, '').replaceAll(BISMILLAH2, '').trim();
      }
      return ayah.ar_text;
    }

    const onAyahSelected = (ayah : Ayah) => {
      setActiveAyah(ayah);

      const option = ayahOptions.find(x => x.value === ayah) as AyahOption;
      setActiveAyahOption(option);
      scrollToAyah(option);

      updateLastRead({
        parah_id,
        surah_id: ayah.surah_id,
        ayah_id: ayah.ayah_id
      });
    }

    const getAudioUrl = (ayah: Ayah) => getAyahAudio(ayah, reciterId);

    const play = (ayah: Ayah) => {
      if (activeAyah) {
        childRefs?.current[getAyahKey(ayah)]?.pause();
      }

      onAyahSelected(ayah);
      childRefs?.current[getAyahKey(ayah)]?.playOrPause();
    }

    const onAudioCompleted = (ayah: Ayah) => {
      if (!autoPlayNextAyah) {
        return;
      }

      const index = ayahs.findIndex(x => x === ayah);

      if (index < ayahs.length - 1) {
        const nextAyah = ayahs[index + 1];
        onAyahSelected(nextAyah);
        childRefs?.current[getAyahKey(nextAyah)]?.playOrPause();
      }
    }

    return (
        <View style={styles.container}>

          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} translucent={true} backgroundColor="transparent" />
          <AppHeader title={title} showBack={true} showSettings={false} />
        
          <Dropdown
            data={ayahOptions}
            labelField="id"
            valueField="value"
            value={activeAyahOption}
            autoScroll={isDropdownOpening}
            search={true}
            searchPlaceholder='Search'
            inputSearchStyle={styles.inputSearchStyle}
            onFocus={() => {
              setIsDropdownOpening(true);
              // Turn off autoScroll after a short delay (300ms)
              // This gives it enough time to scroll smoothly but stops the "snapping"
              setTimeout(() => setIsDropdownOpening(false), 300);
            }}
            placeholder="Go to Ayah"
            activeColor={styles.dropdownActiveStyle.color}
            onChange={(item) => { onAyahSelected(item.value); }}
            style={styles.dropdown}
            placeholderStyle={styles.dropdownTextStyle}
            selectedTextStyle={styles.dropdownSelectedStyle}
            containerStyle={styles.dropdownContainerStyle}
            itemContainerStyle={styles.dropdownItemContainerStyle}
            itemTextStyle={styles.dropdownTextStyle}
          />

          {/* Ayah List */}
          <FlashList
              removeClippedSubviews={true}
              data={ayahs}
              ref={listRef}
              style={{ marginBottom: 50 }}
              keyExtractor={(item) => (item.surah_id.toString() + item.ayah_id.toString())}
              renderItem={({ item }) => (
              <View>

                  {/* 🕌 Surah Header (only once) */}
                  {isFirstAyah(item) && (
                      <View style={styles.ayahContainer}>
                          {getSurahRender(item)}

                          <View style={styles.separator} />

                          {/* 🧾 Bismillah */}
                          {!isSurahTauba(item) && (
                              <Text style={styles.bismillah}>{BISMILLAH}</Text>
                          )}

                          {/* <View style={{ height: 1, backgroundColor: '#222', marginVertical: 10 }} /> */}
                      </View>
                  )}

                  {!isAyahBismillah(item) && (<View style={[styles.ayahContainer, item === activeAyah && { backgroundColor: '#1E7F5C22' }]}>

                      <Pressable onPress={() => onAyahSelected(item)}>
                        {/* Ayah Number */}
                        <Text style={{...styles.tab, fontSize: 18}}>{getAyahDisplayKey(item)}</Text>

                        {/* Arabic */}
                        <Text style={styles.arabic}>{getAyahDisplayText(item)}</Text>

                        {/* Arabic */}
                        <Text style={{...styles.tab, marginTop: 10}}>Translation:</Text>
                        <Text style={{...styles.translation, paddingBottom: 10}}>{item.en_meaning}</Text>
                      </Pressable>

                      {/* Tabs */}
                      <View style={styles.tabs}>
                          <Pressable onPress={() => play(item)}>
                            <View pointerEvents="none">
                              <AudioPlayer
                                audioSource={getAudioUrl(item)}
                                onCompleted={() => onAudioCompleted(item)}
                                ref={(el) => {
                                  const key = getAyahKey(item);
                                  if (el) {
                                    childRefs.current[key] = el;
                                  } else {
                                    delete childRefs.current[key];
                                  }
                                }}
                              />
                              <Text style={{...styles.tab, marginTop: 8}}>Recitation</Text>
                            </View>
                          </Pressable>

                          <Link style={{ marginLeft: 5 }} href={{ pathname: '/details', params: { ayahKey: getAyahKey(item), action: 'Translations' } }} >
                            <View>
                              <MaterialIcons name="language" size={32} style={{ alignSelf: 'center' }} color="#1E7F5C" />
                              <Text style={{...styles.tab, marginTop: 10}}>Translations</Text>
                            </View>
                          </Link>

                          <Link style={{ marginLeft: 5 }} href={{ pathname: '/details', params: { ayahKey: getAyahKey(item), action: 'Tafsirs' } }} >
                              <View>
                                <MaterialIcons name="menu-book" size={32} style={{ alignSelf: 'center' }} color="#1E7F5C" />
                                <Text style={{...styles.tab, marginTop: 10}}>Tafsirs</Text>
                              </View>
                          </Link>

                          {/* <Pressable style={{ marginLeft: 5 }} onPress={() => openSheet('Lessons')}>
                              <View>
                                <MaterialCommunityIcons name="lightbulb-outline" size={32} style={{ alignSelf: 'center' }} color="#1E7F5C" />
                                <Text style={{...styles.tab, marginTop: 10}}>Lessons</Text>
                              </View>
                          </Pressable> */}

                          <Pressable style={{ marginLeft: 5 }} onPress={() => openSheet('Reflections')}>
                              <View>
                                <MaterialIcons name="self-improvement" size={32} style={{ alignSelf: 'center' }} color="#1E7F5C" />
                                <Text style={{...styles.tab, marginTop: 10}}>Reflections</Text>
                              </View>
                          </Pressable> 
                      </View>

                  </View>)}
              </View>
              )}
          />
          
        </View>
    );
}

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1511',
  },

  header: {
    padding: 16,
  },

  bismillah: {
    fontFamily: 'Uthmani',
    textAlign: 'center',
    fontSize: 24,
    marginVertical: 12,
    color: '#1E7F5C',
  },

  surahHeader: {
    alignItems: 'center',
    marginVertical: 0,
  },

  surahName: {
    fontFamily: 'Uthmani',
    color: '#fff',
    fontSize: 50,
    fontWeight: '600',
  },

  ayahContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#222',
  },

  separator: {
    height: 1, 
    marginVertical: 10,
    backgroundColor: '#222',
  },

  arabic: {
    fontFamily: 'Uthmani',
    color: '#fff',
    fontSize: 28,
    textAlign: 'right',
    lineHeight: 48,
    paddingTop: 15
  },

  translation: {
    color: '#ccc',
    marginTop: 12,
    fontSize: 16,
  },

  tabs: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 16,
  },

  tab: {
    color: '#888',
    fontSize: 14,
  },
  dropdown: {
    margin: 12,
    marginTop: 20,
    backgroundColor: '#1F2A24',
    borderRadius: 10,
    padding: 10,
    borderColor: '#000',
    borderWidth: 0.5,
    width: '40%',
    alignSelf: 'center'
  },
  dropdownActiveStyle:{
    color: '#183a28'
  },
  dropdownTextStyle: {
    color: '#aaa'
  },
  inputSearchStyle: {
    color: '#eee4e4'
  },
  dropdownSelectedStyle: {
    color: '#fff'
  },
  dropdownContainerStyle: {
    backgroundColor: '#1F2A24',
    borderColor: '#000',
    borderWidth: 0.5,
  },
  dropdownItemContainerStyle: {
    backgroundColor: '#1F2A24'
  }
});

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8', // soft off-white (better than pure white)
  },

  header: {
    padding: 16,
  },

  bismillah: {
    fontFamily: 'Uthmani',
    textAlign: 'center',
    fontSize: 24,
    marginVertical: 12,
    color: '#1E7F5C', // keep brand color
  },

  surahHeader: {
    alignItems: 'center',
    marginVertical: 0,
  },

  surahName: {
    fontFamily: 'Uthmani',
    color: '#0F1511', // dark text instead of black
    fontSize: 50,
    fontWeight: '600',
  },

  ayahContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB', // subtle divider
  },

  separator: {
    height: 1, 
    marginVertical: 10,
    backgroundColor: '#E5E7EB',
  },

  arabic: {
    fontFamily: 'Uthmani',
    color: '#111827', // deep gray (easier on eyes)
    fontSize: 28,
    textAlign: 'right',
    lineHeight: 48,
    paddingTop: 15,
  },

  translation: {
    color: '#4B5563', // softer gray
    marginTop: 12,
    fontSize: 16,
  },

  tabs: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 16,
  },

  tab: {
    color: '#6B7280',
    fontSize: 14,
  },

  dropdown: {
    margin: 12,
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    width: '40%',
    alignSelf: 'center'
  },
  dropdownActiveStyle:{
    color: '#c8f1db'
  },
  dropdownTextStyle: {
    color: '#666'
  },
  inputSearchStyle: {
    color: '#4c4848'
  },
  dropdownSelectedStyle: {
    color: '#000'
  },
  dropdownContainerStyle: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  dropdownItemContainerStyle: {
    backgroundColor: '#FFFFFF'
  }
});