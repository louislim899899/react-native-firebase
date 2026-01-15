/**
 * User Application State
 *
 * Represents the current state of the user in the application.
 * A user is always in exactly one of these states.
 *
 * @see specs/user/current/data_model.md
 */
export enum UserAppState {
  /**
   * App is opened, user is not logged in
   */
  GUEST = 'GUEST',

  /**
   * User has an account but email is not verified
   */
  AUTHENTICATED_UNVERIFIED = 'AUTHENTICATED_UNVERIFIED',

  /**
   * User's email is verified but onboarding is incomplete
   */
  VERIFIED_NOT_ONBOARDED = 'VERIFIED_NOT_ONBOARDED',

  /**
   * User has completed all onboarding and is a regular user
   */
  FULLY_ONBOARDED_USER = 'FULLY_ONBOARDED_USER',

  /**
   * User has completed all onboarding and has admin privileges
   */
  FULLY_ONBOARDED_ADMIN = 'FULLY_ONBOARDED_ADMIN',
}
