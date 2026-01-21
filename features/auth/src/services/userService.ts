import {
    doc,
    Firestore,
    getDoc,
    setDoc,
    updateDoc,
} from 'firebase/firestore';
import { getFirebaseDb } from '../../../../config/firebase';
import { UserProfile } from '../models';

/**
 * User Data Service
 *
 * Handles all Firestore operations for user profiles.
 * Manages user profile data, onboarding completion, and profile updates.
 *
 * @see specs/user/current/technical_architecture.md
 */
class UserService {
  private dbInstance: Firestore;

  constructor() {
    this.dbInstance = getFirebaseDb();
  }

  /**
   * Fetch user profile from Firestore
   *
   * @param uid - Firebase UID of the user
   * @returns UserProfile if found, null if not found
   *
   * Side effects:
   * - Reads from Firestore `users` collection
   */
  async fetchUserProfile(uid: string): Promise<UserProfile | null> {
    const docRef = doc(this.dbInstance, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return docSnap.data() as UserProfile;
  }

  /**
   * Create a new user profile
   *
   * Called after registration or first social login.
   * Sets default values for new users.
   *
   * @param uid - Firebase UID
   * @param email - User's email
   * @returns Created UserProfile
   *
   * Side effects:
   * - Writes to Firestore `users` collection
   */
  async createUserProfile(uid: string, email: string): Promise<UserProfile> {
    const now = Date.now();

    const newProfile: UserProfile = {
      uid,
      email,
      firstName: null,
      lastName: null,
      role: 'user',
      photoURL: null,
      onboardingDone: false,
      createdAt: now,
      updatedAt: now,
    };

    const docRef = doc(this.dbInstance, 'users', uid);
    await setDoc(docRef, newProfile);

    return newProfile;
  }

  /**
   * Complete user onboarding
   *
   * Sets firstName, lastName, and marks onboarding as complete.
   * User cannot access main app until this is called.
   *
   * @param uid - Firebase UID
   * @param firstName - User's first name
   * @param lastName - User's last name
   * @returns Updated UserProfile
   * @throws Error if user profile doesn't exist
   *
   * Side effects:
   * - Updates Firestore `users` document
   * - Triggers state recalculation in UI
   */
  async completeOnboarding(
    uid: string,
    firstName: string,
    lastName: string
  ): Promise<UserProfile> {
    const docRef = doc(this.dbInstance, 'users', uid);

    const updateData = {
      firstName,
      lastName,
      onboardingDone: true,
      updatedAt: Date.now(),
    };

    await updateDoc(docRef, updateData);

    // Fetch and return updated profile
    const updatedProfile = await this.fetchUserProfile(uid);
    if (!updatedProfile) {
      throw new Error('Failed to fetch updated profile');
    }

    return updatedProfile;
  }

  /**
   * Update user profile photo
   *
   * @param uid - Firebase UID
   * @param photoURL - New photo URL
   * @returns Updated UserProfile
   *
   * Side effects:
   * - Updates Firestore `users` document
   */
  async updateProfilePhoto(
    uid: string,
    photoURL: string
  ): Promise<UserProfile> {
    const docRef = doc(this.dbInstance, 'users', uid);

    await updateDoc(docRef, {
      photoURL,
      updatedAt: Date.now(),
    });

    const updatedProfile = await this.fetchUserProfile(uid);
    if (!updatedProfile) {
      throw new Error('Failed to fetch updated profile');
    }

    return updatedProfile;
  }

  /**
   * Update user name (first and/or last name)
   *
   * @param uid - Firebase UID
   * @param firstName - Optional new first name
   * @param lastName - Optional new last name
   * @returns Updated UserProfile
   *
   * Side effects:
   * - Updates Firestore `users` document
   */
  async updateProfileName(
    uid: string,
    firstName?: string,
    lastName?: string
  ): Promise<UserProfile> {
    const docRef = doc(this.dbInstance, 'users', uid);

    const updateData: Record<string, any> = {
      updatedAt: Date.now(),
    };

    if (firstName !== undefined) {
      updateData.firstName = firstName;
    }
    if (lastName !== undefined) {
      updateData.lastName = lastName;
    }

    await updateDoc(docRef, updateData);

    const updatedProfile = await this.fetchUserProfile(uid);
    if (!updatedProfile) {
      throw new Error('Failed to fetch updated profile');
    }

    return updatedProfile;
  }
}

// Export singleton instance
export const userService = new UserService();
