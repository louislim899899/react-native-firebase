/**
 * User Settings Data Model
 *
 * Stored in Firestore `userSettings` collection.
 * Persists user preferences across devices.
 *
 * @see specs/user/current/data_model.md
 */
export interface UserSettings {
  /**
   * Firestore document ID - must match Firebase Auth UID
   */
  uid: string;

  /**
   * Theme preference
   */
  theme: 'light' | 'dark' | 'system';

  /**
   * Whether push notifications are enabled
   */
  notifications: boolean;

  /**
   * Language preference (ISO 639-1 code)
   */
  language: string | null;

  /**
   * Timestamp when settings were last updated
   */
  updatedAt: number;
}
