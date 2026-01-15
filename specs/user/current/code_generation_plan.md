# 🧩 USER MODULE – CODE GENERATION PLAN (V1)

This plan strictly follows:

* Spec V3
* Architecture V1
* Data Models V1

Nothing outside this plan may be coded.

---

## 1️⃣ High-Level Rule (Non-Negotiable)

> **UI screens never talk to Firebase directly.**

All Firebase interaction goes through **services**.

---

## 2️⃣ Folder Structure (User Module)

```
src/
 └── user/
     ├── screens/
     │    ├── IntroSliderScreen
     │    ├── LoginScreen
     │    ├── RegisterScreen
     │    ├── ForgotPasswordScreen
     │    ├── VerifyEmailScreen
     │    ├── OnboardingProfileScreen
     │    ├── ProfileScreen
     │    └── SettingsScreen
     │
     ├── navigation/
     │    ├── UserRootNavigator
     │    ├── AuthStack
     │    ├── VerificationStack
     │    ├── OnboardingStack
     │    └── MainStack
     │
     ├── services/
     │    ├── authService
     │    ├── userService
     │    └── settingsService
     │
     ├── state/
     │    ├── userStateResolver
     │    ├── userContext
     │    └── userStateTypes
     │
     ├── hooks/
     │    ├── useAuth
     │    ├── useUser
     │    └── useUserState
     │
     ├── models/
     │    ├── AuthSession
     │    ├── UserProfile
     │    └── UserSettings
     │
     └── utils/
          ├── firstInstallStorage
          └── errorMapper
```

---

## 3️⃣ Responsibilities (Who Does What)

### Screens

* Render UI only
* Call hooks
* Never contain logic
* Never call Firebase

---

### Hooks (Glue Layer)

#### `useAuth`

Handles:

* Login
* Register
* Social login
* Logout
* Forgot password

Uses:

* authService

---

#### `useUser`

Handles:

* Fetch/update profile
* Fetch/update settings
* Onboarding completion

Uses:

* userService
* settingsService

---

#### `useUserState`

Handles:

* Combining auth + profile
* Producing `UserAppState`

Uses:

* userStateResolver

---

### Services (Business Logic)

#### `authService`

* Talks to Firebase Auth
* Emits auth session updates

---

#### `userService`

* Reads/writes `users` collection
* Enforces onboarding rules

---

#### `settingsService`

* Reads/writes `userSettings` collection
* Applies defaults

---

### State Resolver (Brain 🧠)

#### `userStateResolver`

Input:

* AuthSession
* UserProfile

Output:

* UserAppState

Uses logic from Step 4 **exactly**.

---

## 4️⃣ Navigation Control Rule

`UserRootNavigator`:

* Listens to `UserAppState`
* Chooses correct stack
* Screens never redirect themselves

---

## 5️⃣ Data Flow (Login Example)

```
LoginScreen
  → useAuth.login()
    → authService.login()
      → Firebase Auth
        → Auth event
          → useUserState updates
            → UserRootNavigator switches stack
```

No manual navigation hacks.

---

## 6️⃣ Onboarding Completion Flow

```
OnboardingProfileScreen
  → useUser.completeOnboarding()
    → userService.updateProfile()
      → onboardingDone = true
        → state recalculated
          → MainStack shown
```

---

## 7️⃣ Error Handling Plan

* Firebase errors caught in services
* Converted using `errorMapper`
* Hooks return friendly messages
* Screens display messages only

---

## 8️⃣ What Code Generation MUST Follow

Every generated code file must:

* Match folder responsibility
* Use defined models
* Respect state resolution order
* Avoid cross-layer leaks

If something is missing:
👉 Code must **fail loudly**, not guess.

---

## 🔒 FINAL LOCK POINT

At this point:

* Requirements ✅
* Spec ✅
* Architecture ✅
* Models & states ✅
* Code plan ✅

🚫 No more design decisions allowed during coding.

---

## 🚀 NEXT STEP (FINAL)

➡️ **Actual Code Generation**
We can now safely generate:

1. Firebase setup
2. Auth service
3. User state resolver
4. Navigation
5. Screens

Tell me what you want first:

👉 **“Generate Firebase auth service”**
👉 **“Generate user state resolver”**
👉 **“Generate navigation”**
👉 **“Generate everything step by step”**


