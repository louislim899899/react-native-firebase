
# 🧠 USER MODULE – DATA MODELS & STATE DEFINITIONS (V1)

This document defines:

* What data exists
* What shape it has
* What states are allowed
* How states are derived

Nothing outside this is valid.

---

## 1️⃣ Core User State (Single Source of Truth)

The app must always resolve the user into **exactly one** of the following states:

### `UserAppState`

```
GUEST
AUTHENTICATED_UNVERIFIED
VERIFIED_NOT_ONBOARDED
FULLY_ONBOARDED_USER
FULLY_ONBOARDED_ADMIN
```

Rules:

* No overlaps
* No partial states
* Navigation depends ONLY on this value

---

## 2️⃣ Auth Session Model (From Firebase)

### `AuthSession`

Represents authentication status only.

Fields:

```
uid            // string | null
email          // string | null
provider       // email | google
emailVerified  // boolean
```

Rules:

* If `uid` is null → user is Guest
* This data comes ONLY from Firebase Auth
* Never stored manually

---

## 3️⃣ User Profile Data Model (Firestore)

### `UserProfile`

Document ID:

* `uid`

Fields:

```
uid            // string
email          // string
firstName      // string | null
lastName       // string | null
role           // "user" | "admin"
photoURL       // string | null
onboardingDone // boolean
createdAt
updatedAt
```

Rules:

* `email` must match Firebase Auth email
* `onboardingDone = false` until profile is completed
* Role defaults to `"user"`

---

## 4️⃣ User Settings Data Model

### `UserSettings`

Document ID:

* `uid`

Fields:

```
theme          // "light" | "dark" | "system"
notifications  // boolean
language       // string | null
updatedAt
```

Rules:

* Created on first successful login
* Defaults applied if missing

---

## 5️⃣ First Install State (Local Only)

### `AppInstallState`

Stored locally on device:

```
hasSeenIntro // boolean
```

Rules:

* Default = false
* Set true after skip or completion
* Not synced to Firebase
* Reset on reinstall

---

## 6️⃣ Derived User State Logic (CRITICAL)

This logic MUST be followed exactly.

### State Resolution Order

```
IF uid == null
  → GUEST

ELSE IF emailVerified == false
  → AUTHENTICATED_UNVERIFIED

ELSE IF onboardingDone == false
  → VERIFIED_NOT_ONBOARDED

ELSE IF role == "admin"
  → FULLY_ONBOARDED_ADMIN

ELSE
  → FULLY_ONBOARDED_USER
```

Rules:

* Role is checked LAST
* Admin cannot skip verification or onboarding
* No shortcuts allowed

---

## 7️⃣ Navigation Mapping (State → Stack)

| UserAppState             | Navigation Stack                |
| ------------------------ | ------------------------------- |
| GUEST                    | Intro (if first install) → Auth |
| AUTHENTICATED_UNVERIFIED | Verify Email                    |
| VERIFIED_NOT_ONBOARDED   | Onboarding                      |
| FULLY_ONBOARDED_USER     | Main App                        |
| FULLY_ONBOARDED_ADMIN    | Main App + Admin                |

---

## 8️⃣ Onboarding Completion Rules

Onboarding is considered complete ONLY when:

* firstName is NOT null
* lastName is NOT null
* onboardingDone is true

If any condition fails:

* User remains `VERIFIED_NOT_ONBOARDED`

---

## 9️⃣ Social Login Edge Case Handling

For social login:

* `emailVerified` is assumed true if provider is Google
* `firstName` and `lastName` may be empty initially
* Onboarding is still required

---

## 🔒 Data Model Lock

* These models cannot be changed without a new version
* Code generation must strictly follow these shapes
* Missing data must block navigation, not be guessed