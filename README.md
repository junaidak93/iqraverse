# IqraVerse

A modern Quran reading experience built with Expo + React Native.

IqraVerse combines offline-first Quran access with elegant Uthmani typography, smooth navigation, reflections, tafsir integration, bookmarks, and immersive recitation playback.

## Features

### Current

* Offline Quran access via SQLite
* Surah & Parah browsing
* Uthmani Arabic rendering
* Dark / Light mode
* Smooth ayah scrolling
* Ayah jump navigation
* Search for Surahs and Parahs
* Modern top-tab navigation
* Interactive ayah actions

### In Progress

* Quran.com API integration
* Tafsir & translations
* Reflections
* Bookmarks
* Last-read persistence
* Qirat audio playback

## Tech Stack

* Expo
* React Native
* Expo Router
* SQLite
* Quran.com API
* Expo AV
* Custom Uthmani font

## Project Structure

```bash
app/
components/
assets/
database/
services/
constants/
```

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npx expo start
```

### Android

```bash
npx expo run:android
```

### iOS

```bash
npx expo run:ios
```

## Environment Setup

Create a `.env` file:

```env
QURAN_API_CLIENT_ID=
QURAN_API_CLIENT_SECRET=
```

## Vision

IqraVerse is designed to become more than a Quran reader.

The goal is to create a thoughtful digital companion for reading, reflection, understanding, and spiritual consistency.

## Roadmap

* Multi-language translations
* Advanced tafsir support
* Audio recitations
* Cloud sync
* Daily reflections
* Reading streaks
* Personalized insights

## License

MIT