import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LastRead } from '@/models/read-state';
import { getSurahByIndex } from '@/services/surah-service';
import { getParahByIndex } from '@/services/parah-service';
import { useSQLiteContext } from 'expo-sqlite';
import { getValueFor, keys } from '@/helper/preferences';
import { Link } from 'expo-router';

export default function ContinueReadingButton({ lastRead }: { lastRead: LastRead | null }) {
  const [text, setText] = useState<string | undefined>(undefined);
  const [parahId, setParahId] = useState<number | null>(null);
  const [surahId, setSurahId] = useState<number | null>(null);
  const [ayahId, setAyahId] = useState<number | null>(null);
  const db = useSQLiteContext();

  useEffect(() => {
    async function updateData() {
        if (!lastRead) {
            return;
        }

        const { parah_id, surah_id, ayah_id } = lastRead;

        let _text: string = "";

        if (parah_id && parah_id !== 0) {
            setParahId(parah_id);
            _text = (await getParahByIndex(db, parah_id))?.en_name + " • ";
        }

        setSurahId(surah_id);
        setAyahId(ayah_id);

        _text += (await getSurahByIndex(db, surah_id))?.en_name + " • Ayah " + ayah_id;

        setText(_text);
    }

    updateData();
  }, [lastRead]);
  
  return text && (
    <TouchableOpacity style={styles.container}>
      <View>
        <Text style={styles.label}>
          Continue Reading
        </Text>

        <Text style={styles.subtext}>
            {text}
        </Text>
        
      </View>

      <Ionicons
        name="arrow-forward-circle"
        size={36}
        color="#fff"
      />

      <Link 
        key={text} 
        href={{ pathname: "/ayahs", params: { isFromLastRead: "true" } }} 
        style={StyleSheet.absoluteFillObject } 
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,

    backgroundColor: '#1E7F5C',
    borderRadius: 22,
    padding: 18,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 10,
  },

  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  subtext: {
    color: '#D1FAE5',
    marginTop: 4,
    fontSize: 13,
  },
});