/**
 * User Profile Data Model
 *
 * Stored in Firestore `users` collection.
 * Represents the user's profile information.
 *
 * @see specs/user/current/data_model.md
 */
export interface UserProfile {
  /**
   * Firestore document ID - must match Firebase Auth UID
   */
  uid: string;

  /**
   * User's email address - must match Firebase Auth email
   */
  email: string;

  /**
   * User's first name
   * Required for onboarding completion
   */
  firstName: string | null;

  /**
   * User's last name
   * Required for onboarding completion
   */
  lastName: string | null;

  /**
   * User's role ('user' | 'admin')
   * Default is 'user', assigned manually
   */
  role: 'user' | 'admin';

  /**
   * Profile photo URL
   * Can be updated by user
   */
  photoURL: string | null;

  /**
   * Whether the user has completed onboarding
   * Only true if firstName and lastName are set
   */
  onboardingDone: boolean;

  /**
   * Timestamp when profile was created
   */
  createdAt: number;

  /**
   * Timestamp when profile was last updated
   */
  updatedAt: number;
}
