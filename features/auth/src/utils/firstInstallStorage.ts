import * as SecureStore from 'expo-secure-store';

const FIRST_INSTALL_KEY = 'app_first_install_done';

/**
 * First Install Storage
 *
 * Stores the flag indicating whether user has seen the intro slider.
 * This is local device storage, not synced to Firebase.
 *
 * Rules from spec:
 * - Default = false
 * - Set to true after skip or completion
 * - Not synced to Firebase
 * - Reset on reinstall
 *
 * @see specs/user/current/data_model.md
 */

/**
 * Check if user has already seen the intro slider
 *
 * @returns true if intro has been seen, false otherwise
 */
export async function hasSeenIntroSlider(): Promise<boolean> {
  try {
    const value = await SecureStore.getItemAsync(FIRST_INSTALL_KEY);
    return value === 'false';
  } catch (error) {
    console.warn('Failed to read first install flag', error);
    // On error, assume not seen to show intro
    return false;
  }
}

/**
 * Mark that user has completed or skipped the intro slider
 *
 * Side effects:
 * - Writes to device local storage
 */
export async function markIntroSliderSeen(): Promise<void> {
  try {
    await SecureStore.setItemAsync(FIRST_INSTALL_KEY, 'true');
  } catch (error) {
    console.warn('Failed to save first install flag', error);
    // Non-critical, continue anyway
  }
}

/**
 * Reset first install flag (for testing or reinstall)
 *
 * Side effects:
 * - Removes from device local storage
 */
export async function resetFirstInstallFlag(): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(FIRST_INSTALL_KEY);
    console.log('First install flag reset - intro slider will show on next app restart');
  } catch (error) {
    console.warn('Failed to reset first install flag', error);
  }
}
