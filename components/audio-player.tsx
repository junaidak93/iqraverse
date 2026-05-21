import React, { useEffect, useRef, forwardRef, useImperativeHandle  } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  audioSource: string;
  onCompleted?: (() => void) | null;
}

export interface AudioPlayerRef {
  playOrPause: () => void;
  pause: () => void;
}

let lastEnteredTime: number = Date.now();

export const AudioPlayer = forwardRef<AudioPlayerRef, Props>(({ audioSource, onCompleted = null } : Props, ref) => {
    const bismillah = useAudioPlayer({
        uri: getBismillahSource(audioSource)
    });

    const bismillahStatus = useAudioPlayerStatus(bismillah);

    const isBismillahRequired = (audioSource.endsWith("001.mp3") && !audioSource.endsWith("009001.mp3")) || audioSource.endsWith("001002.mp3");

    const sound = useAudioPlayer({
        uri: audioSource
    });

    const status = useAudioPlayerStatus(sound);
    const isMounted = useRef(true);

    const isPlaying = status.playing || bismillahStatus.playing;

    function togglePlayback() {
        try {
            if (sound && isMounted.current) {
                if (status.playing) {
                    sound.pause();
                } else if (bismillahStatus.playing) {
                    bismillah.pause();
                } else if (isBismillahRequired) {
                    bismillah.seekTo(0);
                    bismillah.play();
                } else {
                    sound.seekTo(0);
                    sound.play();
                }
            }
        } catch (e) {
            console.error('Playback error:', e);
        }
    }

    sound.addListener("playbackStatusUpdate", (audioStatus) => {
        if (audioStatus.didJustFinish && (Date.now() - lastEnteredTime) > 1000 && onCompleted) {
            lastEnteredTime = Date.now();
            onCompleted();
        }
    });

    // Expose the function to the parent
    useImperativeHandle(ref, () => ({
        playOrPause: () => {
            togglePlayback();
        },
        pause: () => {
            bismillah?.pause();
            sound?.pause();
        }
    }));

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (bismillahStatus.didJustFinish) {
            sound.seekTo(0);
            sound.play();
        }
    }, [bismillahStatus]);

    return (
        <View style={styles.container}>
        <TouchableOpacity onPress={togglePlayback}>
            <Ionicons
            name={
                isPlaying
                ? 'pause-circle-outline'
                : 'play-circle-outline'
            }
            size={35}
            color="#1E7F5C"
            />
        </TouchableOpacity>
        </View>
    );
});

function getBismillahSource(audioSource: string) : string {
    const segments = audioSource.split('/');

    let bismillahSource = '';

    for (let segment in segments) {
        if (segments[segment].endsWith(".mp3")) {
            bismillahSource += '001001.mp3';
        } else {
            bismillahSource += segments[segment] + '/';
        }
    }

    return bismillahSource;
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: -1
    }
});
