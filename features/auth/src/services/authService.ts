import {
    Auth,
    GoogleAuthProvider,
    User,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithCredential,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { getFirebaseAuth } from '../../../../config/firebase';
import { AuthSession } from '../models';
import { userService } from './index';
/**
 * Firebase Authentication Service
 *
 * Handles all Firebase Auth operations: login, registration, password reset, etc.
 * Never call Firebase Auth directly from screens - use this service only.
 *
 * @see specs/user/current/technical_architecture.md
 */
class AuthService {
  private authInstance: Auth;

  constructor() {
    this.authInstance = getFirebaseAuth();
  }

  /**
   * Converts Firebase User to AuthSession
   * Used internally to maintain consistent session structure
   */
  private firebaseUserToSession(user: User | null): AuthSession {
    if (!user) {
      return {
        uid: null,
        email: null,
        provider: null,
        emailVerified: false,
      };
    }

    const provider = user.providerData[0]?.providerId === 'google.com'
      ? 'google'
      : 'email';

    return {
      uid: user.uid,
      email: user.email || null,
      provider,
      emailVerified: user.emailVerified,
    };
  }

  /**
   * Register a new user with email and password
   *
   * @param email - User's email address
   * @param password - User's password
   * @returns AuthSession with new user data
   * @throws Error if registration fails
   *
   * Side effects:
   * - Creates new user in Firebase Auth
   * - Creates user profile in Firestore
   * - Sends verification email
   */
  async register(email: string, password: string): Promise<AuthSession> {
    const userCredential = await createUserWithEmailAndPassword(
      this.authInstance,
      email,
      password
    );

    const user = userCredential.user;

    // Create user profile in Firestore
    try {
      await userService.createUserProfile(user.uid, email);
    } catch (error) {
      console.error('Failed to create user profile:', error);
      // Don't throw - user is already created in Auth
      // They can complete profile later
    }

    // Send verification email
    await this.sendVerificationEmail();

    return this.firebaseUserToSession(user);
  }

  /**
   * Login user with email and password
   *
   * @param email - User's email address
   * @param password - User's password
   * @returns AuthSession with user data
   * @throws Error if login fails
   *
   * Side effects:
   * - Authenticates user with Firebase
   * - Updates session
   */
  async login(email: string, password: string): Promise<AuthSession> {
    const userCredential = await signInWithEmailAndPassword(
      this.authInstance,
      email,
      password
    );

    return this.firebaseUserToSession(userCredential.user);
  }

  /**
   * Login user with Google OAuth
   *
   * @param idToken - Google ID token from native Google Sign-In
   * @returns AuthSession with user data
   * @throws Error if login fails
   *
   * Side effects:
   * - Authenticates user with Google provider
   * - Creates user profile in Firestore if doesn't exist
   * - Skips email verification for trusted provider
   */
  async loginWithGoogle(idToken: string): Promise<AuthSession> {
    const credential = GoogleAuthProvider.credential(idToken);
    const userCredential = await signInWithCredential(
      this.authInstance,
      credential
    );

    const user = userCredential.user;

    // Create user profile if it doesn't exist (for new users)
    try {
      const existingProfile = await userService.fetchUserProfile(user.uid);
      if (!existingProfile) {
        await userService.createUserProfile(user.uid, user.email || '');
      }
    } catch (error) {
      console.error('Failed to create user profile:', error);
      // Don't throw - user is already created in Auth
    }

    return this.firebaseUserToSession(user);
  }

  /**
   * Send verification email to current user
   *
   * Side effects:
   * - Sends email verification link via Firebase
   *
   * @throws Error if user not authenticated or email send fails
   */
  async sendVerificationEmail(): Promise<void> {
    const currentUser = this.authInstance.currentUser;
    if (!currentUser) {
      throw new Error('No user authenticated');
    }

    await sendEmailVerification(currentUser);
  }

  /**
   * Refresh verification status from Firebase
   *
   * Side effects:
   * - Reloads user data from Firebase
   *
   * @returns Updated AuthSession with current verification status
   * @throws Error if reload fails
   */
  async refreshEmailVerificationStatus(): Promise<AuthSession> {
    const currentUser = this.authInstance.currentUser;
    if (!currentUser) {
      return this.firebaseUserToSession(null);
    }

    await currentUser.reload();
    return this.firebaseUserToSession(currentUser);
  }

  /**
   * Send password reset email
   *
   * Note: Shows success message even if email doesn't exist (for security)
   *
   * @param email - Email address to send reset link to
   *
   * Side effects:
   * - Sends password reset email via Firebase
   */
  async sendPasswordResetEmail(email: string): Promise<void> {
    await sendPasswordResetEmail(this.authInstance, email);
  }

  /**
   * Logout current user
   *
   * Side effects:
   * - Signs out user from Firebase
   * - Clears authentication session
   *
   * @throws Error if logout fails
   */
  async logout(): Promise<void> {
    await signOut(this.authInstance);
  }

  /**
   * Get current authentication session
   *
   * @returns Current AuthSession or Guest session if not authenticated
   */
  getCurrentSession(): AuthSession {
    return this.firebaseUserToSession(this.authInstance.currentUser);
  }

  /**
   * Listen to authentication state changes
   *
   * @param callback - Function called when auth state changes, receives current session
   * @returns Unsubscribe function
   */
  onAuthStateChange(
    callback: (session: AuthSession) => void
  ): () => void {
    const unsubscribe = this.authInstance.onAuthStateChanged((user) => {
      callback(this.firebaseUserToSession(user));
    });

    return unsubscribe;
  }
}

// Export singleton instance
export const authService = new AuthService();
