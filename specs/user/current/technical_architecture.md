# 🏗️ USER MODULE – TECHNICAL ARCHITECTURE (V1)

This architecture **implements the finalized spec** using:

* React Native
* Firebase Authentication
* Firebase Database (Firestore)

Nothing outside this is allowed.

---

## 1️⃣ High-Level Architecture (Big Picture)

Think of the app as **layers**:

```
UI Screens
   ↓
Navigation Guards (state checks)
   ↓
Auth & User State Manager
   ↓
Firebase Auth
Firebase Database
```

Key rule:

> **Screens never talk to Firebase directly.**
> They go through a **User/Auth layer**.

---

## 2️⃣ Core System Pieces (Main Building Blocks)

### A. Auth Service (Brain of login)

Responsible for:

* Login
* Register
* Social login
* Logout
* Forgot password
* Listening to auth state changes

Uses:

* Firebase Auth only

---

### B. User Data Service (Profile & settings)

Responsible for:

* User profile data (name, role, photo)
* User settings (theme, notifications, etc.)
* Onboarding completion flag

Uses:

* Firebase Database only

---

### C. User State Manager (MOST IMPORTANT)

This decides **where the user goes**.

It combines:

* Firebase auth status
* Email verification status
* Onboarding completion
* Role

It outputs:

* Current **User State**

Example output:

```
Guest
AuthenticatedUnverified
VerifiedNotOnboarded
FullyOnboardedUser
Admin
```

Navigation depends ONLY on this.

---

## 3️⃣ Navigation Architecture (Screen Control)

### App Entry Flow (Root Navigator)

On app launch:

1. Check **first install flag**
2. Check **auth state**
3. Check **verification**
4. Check **onboarding**
5. Route user accordingly

---

### Navigation Stacks

#### 1. Intro Stack

* IntroSliderScreen (4 pages)

Shown only if:

* First install = true

---

#### 2. Auth Stack

* LoginScreen
* RegisterScreen
* ForgotPasswordScreen

Shown if:

* User = Guest

---

#### 3. Verification Stack

* VerifyEmailScreen

Shown if:

* Authenticated
* Email not verified

---

#### 4. Onboarding Stack

* OnboardingProfileScreen

Shown if:

* Email verified
* Onboarding incomplete

---

#### 5. Main App Stack

* Home
* Profile
* Settings
* Admin (if role = Admin)

Shown if:

* Fully onboarded

---

## 4️⃣ Firebase Data Architecture

### Firebase Auth (Managed by Firebase)

Stored by Firebase:

* Email
* Password (hashed)
* Provider (email / Google)
* Email verification status

App never touches password data.

---

### Firestore Collections

#### `users` collection

Document ID:

* `uid` (from Firebase Auth)

Fields:

```
uid
firstName
lastName
email
role            // user | admin
photoURL
onboardingDone  // true | false
createdAt
updatedAt
```

---

#### `userSettings` collection

Document ID:

* `uid`

Fields:

```
theme           // light | dark | system
notifications   // true | false
language
updatedAt
```

---

## 5️⃣ Auth State Flow (Event-Based)

Firebase emits auth events:

* Login
* Logout
* App restart

Flow:

```
Firebase Auth Event
   ↓
Auth Service updates
   ↓
User State Manager recalculates state
   ↓
Navigation updates automatically
```

No screen manually redirects.

---

## 6️⃣ Social Login Architecture

* Firebase handles Google sign-in
* After success:

  * Check if user doc exists

    * NO → create user record
    * YES → load existing data
* If onboardingDone = false → onboarding flow

Email verification:

* Skipped if provider is trusted (Google)

---

## 7️⃣ First Install Logic (Local Storage)

Stored locally (device only):

```
hasSeenIntro = true | false
```

Rules:

* Set after skip or completion
* Not tied to user account
* Reset on app reinstall

---

## 8️⃣ Security Rules (Architecture-Level)

* Firebase Security Rules enforce:

  * Users can only read/write own documents
* Role-based access checked in UI
* Admin checks duplicated in backend rules

---

## 9️⃣ Error Handling Strategy

* Firebase errors mapped to app-level errors
* UI never shows raw Firebase messages
* Central error handler in Auth Service

---

## 🔒 Architecture Lock

This architecture:

* Implements Spec V2 exactly
* Prevents feature creep
* Prevents inconsistent navigation
* Is ready for code generation

---

