# MetabolicAI Pro - Aplikacja Mobilna

To jest wersja mobilna aplikacji MetabolicAI Pro, zbudowana przy użyciu Expo i React Native.

## Wymagania

- Node.js (v18 lub nowszy)
- npm lub yarn
- Konto Expo (do budowania aplikacji)

## Uruchamianie lokalnie

1. Zainstaluj zależności:
   ```bash
   npm install
   ```

2. Uruchom serwer deweloperski:
   ```bash
   npm start
   ```

3. Zeskanuj kod QR za pomocą aplikacji Expo Go na swoim telefonie (Android lub iOS).

## Budowanie pliku APK (Android)

Aby zbudować plik APK do instalacji na urządzeniu z Androidem, wykonaj następujące kroki:

1. Zainstaluj EAS CLI globalnie:
   ```bash
   npm install -g eas-cli
   ```

2. Zaloguj się do swojego konta Expo:
   ```bash
   eas login
   ```

3. Skonfiguruj projekt (jeśli jeszcze nie skonfigurowano):
   ```bash
   eas build:configure
   ```
   Wybierz `Android`.

4. Zmodyfikuj plik `eas.json`, aby dodać profil budowania APK (opcjonalnie, domyślnie buduje AAB dla Google Play):
   ```json
   {
     "build": {
       "preview": {
         "android": {
           "buildType": "apk"
         }
       },
       "production": {}
     }
   }
   ```

5. Uruchom budowanie:
   ```bash
   eas build -p android --profile preview
   ```

6. Poczekaj na zakończenie procesu. Po zakończeniu otrzymasz link do pobrania pliku `.apk`.

## Budowanie lokalne (bez chmury Expo)

Jeśli wolisz budować lokalnie (wymaga Android Studio i Java JDK):

1. Wygeneruj folder `android`:
   ```bash
   npx expo prebuild
   ```

2. Przejdź do folderu `android` i zbuduj:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

3. Plik APK znajdziesz w `android/app/build/outputs/apk/release/app-release.apk`.

## Funkcje

- **Dashboard**: Przegląd statystyk (Waga, BMI, TDEE, Cel) i wykresy trendów.
- **Kalkulator**: Obliczanie zapotrzebowania kalorycznego i BMI.
- **Historia**: Lista pomiarów z możliwością usuwania.
- **Kalorie**: Śledzenie posiłków i sugestie AI.
- **Profil**: Ustawienia użytkownika.

## Konfiguracja API

Aplikacja domyślnie łączy się z `http://localhost:3000`.
Jeśli uruchamiasz aplikację na fizycznym urządzeniu (nie w emulatorze), musisz zmienić adres URL API w plikach:
- `app/(tabs)/index.tsx`
- `app/(tabs)/calories.tsx`

Zmień `localhost` na adres IP swojego komputera w sieci lokalnej (np. `http://192.168.1.10:3000`).

## Technologie

- Expo
- React Native
- NativeWind (Tailwind CSS)
- React Native Gifted Charts
- Lucide React Native
- Expo Router
