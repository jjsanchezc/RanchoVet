@echo off

REM Install dependencies for the main project
npm install
npx expo install react-native@0.69.9
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar react-native-gesture-handler
npx expo install react-native-web@~0.18.7 react-dom@18.0.0
npx expo install @expo/webpack-config@^0.17.0
npx expo install @react-native-async-storage/async-storage
npx expo install socket.io-client

REM Change directory to "server" and install its dependencies
cd /d server
npm install
