import { ImageBackground, Text, View } from 'react-native';
import { Parah } from '@/models/parah';

export default function ParahView({ parah }: { parah: Parah }) {
  return (
    <View style={{ marginLeft: 15, marginTop: 15, borderRadius: 8, borderColor: 'gray', borderWidth: 0.25, overflow: 'scroll', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <ImageBackground 
            source={require('../assets/images/icon.png')} 
            resizeMode="cover"
            blurRadius={20} 
            style={{
                flex: 1,
                justifyContent: 'center',
                opacity: 1,
            }}
        >
            <View style={{ width: 165, height: 165, flex: 1, alignSelf: 'flex-end' }}>
                <Text style={{ color: 'black', fontSize: 20, margin: 6, writingDirection: 'rtl', fontWeight: 'bold' }}>{parah.ar_name}</Text>
                <Text style={{ color: 'black', fontSize: 20, margin: 6 }}>{parah.en_name}</Text>
                <Text style={{ color: 'black', margin: 6 }}>{parah.en_meaning}</Text>
            </View>
        </ImageBackground>
      </View>
    );
}