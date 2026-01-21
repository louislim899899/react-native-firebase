import {
    doc,
    Firestore,
    getDoc,
    setDoc,
    updateDoc,
} from 'firebase/firestore';
import { getFirebaseDb } from '../../../../config/firebase';
import { UserSettings } from '../models';

const DEFAULT_SETTINGS: Omit<UserSettings, 'uid' | 'updatedAt'> = {
  theme: 'system',
  notifications: true,
  language: null,
};

/**
 * User Settings Service
 *
 * Handles all Firestore operations for user settings.
 * Manages theme, notifications, language preferences, etc.
 *
 * @see specs/user/current/technical_architecture.md
 */
class SettingsService {
  private dbInstance: Firestore;

  constructor() {
    this.dbInstance = getFirebaseDb();
  }

  /**
   * Fetch user settings from Firestore
   *
   * @param uid - Firebase UID of the user
   * @returns UserSettings, with defaults applied if settings don't exist
   *
   * Side effects:
   * - Reads from Firestore `userSettings` collection
   */
  async fetchUserSettings(uid: string): Promise<UserSettings> {
    const docRef = doc(this.dbInstance, 'userSettings', uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      // Return defaults for new users
      return {
        uid,
        ...DEFAULT_SETTINGS,
        updatedAt: Date.now(),
      };
    }

    return docSnap.data() as UserSettings;
  }

  /**
   * Initialize user settings
   *
   * Called after first successful login to create default settings.
   *
   * @param uid - Firebase UID
   * @returns Created UserSettings
   *
   * Side effects:
   * - Writes to Firestore `userSettings` collection
   */
  async initializeUserSettings(uid: string): Promise<UserSettings> {
    const newSettings: UserSettings = {
      uid,
      ...DEFAULT_SETTINGS,
      updatedAt: Date.now(),
    };

    const docRef = doc(this.dbInstance, 'userSettings', uid);
    await setDoc(docRef, newSettings);

    return newSettings;
  }

  /**
   * Update user theme preference
   *
   * @param uid - Firebase UID
   * @param theme - Theme preference ('light' | 'dark' | 'system')
   * @returns Updated UserSettings
   *
   * Side effects:
   * - Updates Firestore `userSettings` document
   */
  async updateTheme(
    uid: string,
    theme: 'light' | 'dark' | 'system'
  ): Promise<UserSettings> {
    const docRef = doc(this.dbInstance, 'userSettings', uid);

    await updateDoc(docRef, {
      theme,
      updatedAt: Date.now(),
    });

    return this.fetchUserSettings(uid);
  }

  /**
   * Update user notification preference
   *
   * @param uid - Firebase UID
   * @param enabled - Whether notifications are enabled
   * @returns Updated UserSettings
   *
   * Side effects:
   * - Updates Firestore `userSettings` document
   */
  async updateNotifications(
    uid: string,
    enabled: boolean
  ): Promise<UserSettings> {
    const docRef = doc(this.dbInstance, 'userSettings', uid);

    await updateDoc(docRef, {
      notifications: enabled,
      updatedAt: Date.now(),
    });

    return this.fetchUserSettings(uid);
  }

  /**
   * Update user language preference
   *
   * @param uid - Firebase UID
   * @param language - Language code (ISO 639-1)
   * @returns Updated UserSettings
   *
   * Side effects:
   * - Updates Firestore `userSettings` document
   */
  async updateLanguage(
    uid: string,
    language: string | null
  ): Promise<UserSettings> {
    const docRef = doc(this.dbInstance, 'userSettings', uid);

    await updateDoc(docRef, {
      language,
      updatedAt: Date.now(),
    });

    return this.fetchUserSettings(uid);
  }
}

// Export singleton instance
export const settingsService = new SettingsService();
