import { StyleSheet } from 'react-native';

export const darkStyles = StyleSheet.create({
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
  }
});

export const lightStyles = StyleSheet.create({
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
  }
});