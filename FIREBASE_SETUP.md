# Firebase Setup Guide

This app requires Firebase configuration to run. Follow these steps to set up Firebase:

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a new project" or select existing project
3. Enable Firebase Authentication and Firestore Database

## 2. Get Your Firebase Credentials

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Click on **Your apps** and select your web app (or create one)
3. Copy the configuration object - you'll need:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

## 3. Add Credentials to Your App

### Option A: Using Environment Variables (Recommended)

1. Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and paste your Firebase credentials:
   ```
   EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

3. Restart the Expo development server

### Option B: Using app.json

Edit `app.json` and update the `extra` section:
```json
{
  "expo": {
    "extra": {
      "firebaseApiKey": "your_api_key_here",
      "firebaseAuthDomain": "your_project.firebaseapp.com",
      "firebaseProjectId": "your_project_id",
      "firebaseStorageBucket": "your_project.appspot.com",
      "firebaseMessagingSenderId": "your_messaging_sender_id",
      "firebaseAppId": "your_app_id"
    }
  }
}
```

## 4. Configure Firebase Authentication

In Firebase Console:

1. Go to **Authentication** > **Sign-in method**
2. Enable **Email/Password** authentication
3. Enable **Google** authentication:
   - You'll need your app's OAuth credentials
   - For Expo apps, use `com.expo.updates` as the package name

## 5. Create Firestore Database

In Firebase Console:

1. Go to **Firestore Database**
2. Click **Create Database**
3. Start in **Test Mode** (development)
4. Choose your region (default is fine)

Create the following collections:
- `users` - Stores user profiles
- `userSettings` - Stores user preferences

## 6. Set Up Firestore Security Rules

In Firestore > Rules, set:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
    
    match /userSettings/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
  }
}
```

## 7. Run the App

```bash
npx expo start
```

The app should now load and display the intro slider on first launch!

## Troubleshooting

### "Component auth has not been registered yet"
- Your Firebase credentials are not set up
- Check your `.env` file or `app.json` extra section
- Restart the Expo development server

### Authentication fails
- Verify your Firebase credentials are correct
- Check Firestore rules allow your app to access collections
- Make sure Email/Password auth is enabled in Firebase Console

### Environment variables not loading
- For `.env` files, Expo requires variables to start with `EXPO_PUBLIC_`
- Restart the dev server after creating/updating `.env`
- Check that the `.env` file is in the root directory
