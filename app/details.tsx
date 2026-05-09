import { Resource } from "@/models/resource";
import { DropDownOption } from "@/models/dropdown-option";
import { getTafsirByAyah, getTafsirResources } from "@/services/quran-api/tafsir-service";
import { getTranslationByAyah, getTranslationResources } from "@/services/quran-api/translation-service";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState, useContext } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView, useWindowDimensions } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import RenderHtml from 'react-native-render-html';
import { ThemeContext } from '@/providers/contexts';
import ExpandableCard from "@/components/expandable-card";
import AppHeader from "@/components/app-header";


export default function Details() {
    const params = useLocalSearchParams();
    const ayahKey = params.ayahKey as string;
    const isTafsirRequested = params.action === 'Tafsirs';
    const title = params.action as string;

    const { isDarkMode } = useContext(ThemeContext);  
    const styles = isDarkMode ? darkStyles : lightStyles;

    const [resources, setResources] = useState<Record<string, Resource[]>>({});
    const [resourceKeys, setResourceKeys] = useState<DropDownOption[]>([]);
    const [resourceKey, setResourceKey] = useState<DropDownOption | null>();
    const [selectedResources, setSelectedResources] = useState<Resource[]>([]);
    const [isDropdownOpening, setIsDropdownOpening] = useState(false);

    const windowWidth = useWindowDimensions().width;

    useEffect(() => {
        async function getResources() {
            const resources = await (isTafsirRequested ? getTafsirResources() : getTranslationResources());
            setResources(resources);

            const resourceKeys = Object.keys(resources).map(item => ({
                label: item,
                value: item
            }));
            
            setResourceKeys(resourceKeys);
            setResourceKey(resourceKeys[0]);
            setSelectedResources(resources[resourceKeys[0].value]);
        }
        
        getResources();
    }, []);
    
    const onExpanded = async (key: string | number) => {
        const index = selectedResources.findIndex(x => x.id === key);

        if (index < 0) {
            return;
        }

        const resource = selectedResources[index];
        
        if (resource && (!resource.content || resource.content === '')) {
            const content = await (isTafsirRequested 
                ? getTafsirByAyah(resource.id, ayahKey)
                : getTranslationByAyah(resource.id, ayahKey)
            );

            const updatedResources = selectedResources.map((item) => {
                if (item.id === key) {
                    return { ...item, content }; // Return new object
                }
                return item; // Return existing object
            });

            setSelectedResources(updatedResources); // This triggers the UI refresh
        }
    };

    return (
        <View style={styles.container}>
            <AppHeader title={title} showBack={true} />

            <Dropdown
                data={resourceKeys}
                labelField="label"
                valueField="value"
                value={resourceKey}
                autoScroll={isDropdownOpening}
                onFocus={() => {
                    setIsDropdownOpening(true);
                    // Turn off autoScroll after a short delay (300ms)
                    // This gives it enough time to scroll smoothly but stops the "snapping"
                    setTimeout(() => setIsDropdownOpening(false), 300);
                }}
                maxHeight={600}
                placeholder="Select language"
                onChange={(item: DropDownOption) => { setResourceKey(item); setSelectedResources(resources[item.value]); }}
                activeColor={styles.dropdownActiveStyle.color}
                style={styles.dropdown}
                placeholderStyle={styles.dropdownTextStyle}
                selectedTextStyle={styles.dropdownSelectedStyle}
                containerStyle={styles.dropdownContainerStyle}
                itemContainerStyle={styles.dropdownItemContainerStyle}
                itemTextStyle={styles.dropdownTextStyle}
            />

            <ScrollView>
                <View style={{
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 200
                }}>
                    {selectedResources.map((item) => (
                        <ExpandableCard 
                            key={item.id} 
                            id={item.id} 
                            header={<Text style={styles.translation}>{item.name}</Text>}
                            onExpanded={onExpanded}
                            defaultExpanded={false}
                        >
                            <RenderHtml 
                                baseStyle={{...styles.translation, marginBottom: 20 }}
                                contentWidth={windowWidth}
                                source={{
                                    html: item.content || '<p>No content available</p>'
                                }}
                            />
                        </ExpandableCard>
                    ))}
                    
                </View>
            </ScrollView>
        </View>
    )
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
    marginVertical: 16,
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
    marginTop: 5,
    fontSize: 16,
  },

  tabs: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 16,
  },

  tab: {
    color: '#888',
    fontSize: 14,
  },
  dropdown: {
    margin: 20,
    backgroundColor: '#1F2A24',
    borderRadius: 10,
    padding: 10,
    borderColor: '#000',
    borderWidth: 0.5,
    width: '60%',
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
  },

  card: {
    backgroundColor: '#1E1E1E', 
    width: '100%',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, // Increased opacity for visibility
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#333',
    marginTop: 20,
    flexDirection: 'row'
  }
});

const lightStyles = StyleSheet.create({
  container: {
    //flex: 1,
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
    marginVertical: 16,
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
    marginTop: 5,
    fontSize: 16,
  },

  tabs: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 16,
  },

  tab: {
    color: '#6B7280',
    fontSize: 14,
  },

  dropdown: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    borderColor: '#E0E0E0',
    borderWidth: 0.5,
    width: '60%',
    alignSelf: 'center',
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
  },

  card: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 15,
    borderRadius: 12,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 4,
  }
});