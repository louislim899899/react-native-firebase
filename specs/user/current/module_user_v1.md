# 📘 USER MODULE – SPECIFICATION (V1)

This document defines the **complete and finalized behavior** of the User module for a React Native app.

This is the **rulebook** future AI must obey.

---

## 1️⃣ Purpose of the User Module

The User module handles:

* User identity
* Authentication & authorization
* Account onboarding
* User preferences & settings

This module does **NOT** handle:

* Payments
* Messaging
* Content creation
* Analytics

---

## 2️⃣ Technology Constraint (Important 🔒)

### Authentication Provider

* The app **must use Google Firebase Authentication**
* All authentication flows must be handled by Firebase

### Data Storage

* User profile data and settings must be stored in **Firebase (Firestore or Realtime DB)**
* Auth data and app data are logically separated

No other auth or database systems are allowed.

---

## 3️⃣ User Types (RBAC – Role Based Access Control)

### Roles

* **Guest** – Not logged in
* **User** – Standard logged-in user
* **Admin** – Elevated permissions

### Rules

* Every account has **exactly one role**
* Default role on registration = `User`
* Role can only be changed by Admin
* Role affects accessible screens and actions

---

## 4️⃣ Authentication Features

### 4.1 Registration (Email & Password)

User can register using:

* Email
* Password

Rules:

* Email must be unique
* Password is required
* Firebase creates the account
* User is NOT fully onboarded immediately after register

---

### 4.2 Email Verification (Mandatory)

After registration:

* Verification email is sent via Firebase
* User must verify email before full access

Rules:

* Unverified users have limited access
* App must detect verification status

---

### 4.3 Post-Registration Onboarding (Step-by-Step)

After email verification, user is guided through required steps:

#### Step 1: Basic Profile

* First name (required)
* Last name (required)

Rules:

* User cannot skip required steps
* Progress is saved

Only after completion:

* User is considered fully onboarded

---

### 4.4 Login

User can log in using:

* Email + password
* Social login (see below)

Rules:

* Incorrect credentials show error
* Successful login restores session
* Firebase manages session persistence

---

### 4.5 Social Login

Supported providers:

* Google
* (Others can be added later, not required now)

Rules:

* Firebase handles social authentication
* If first-time social login:

  * User must still complete onboarding steps
* Email verification is handled by provider

---

### 4.6 Logout

* User can log out manually
* Session is cleared
* User becomes Guest

---

### 4.7 Forgot Password

Forgot password flow:

* User enters registered email
* Firebase sends password reset email
* User resets password outside the app

Rules:

* App must show success/failure feedback
* No password reset logic handled manually

---

## 5️⃣ First-Time App Install Experience (Onboarding Slider)

### App Intro Slider

* 4-page swipeable slider
* Shown ONLY on first app install

Pages typically include:

* App value proposition
* Key features
* Privacy / security reassurance
* Call to action (Get Started)

Rules:

* Existing users NEVER see this again
* Slider completion state is stored locally
* User can skip the slider

---

## 6️⃣ Authorization Rules (RBAC Behavior)

* Guest cannot access authenticated screens
* Unverified users have limited access
* Onboarding-incomplete users are redirected to onboarding
* Admin-only features are protected

Authorization must be checked before rendering protected screens.

---

## 7️⃣ User Profile

### Stored Profile Data

* First name
* Last name
* Email (read-only)
* Role (read-only for User)
* Profile photo (optional)

Rules:

* User can edit their own profile
* Email cannot be changed
* Role cannot be changed by the user

---

## 8️⃣ User Settings (Preferences)

Settings include:

* Notifications (on/off)
* Theme (light / dark / system)
* Language (if supported)

Rules:

* Stored per user in Firebase
* Persist across sessions
* Defaults applied on first login

---

## 9️⃣ Security Rules (Behavior-Level)

* Firebase manages password security
* App must not expose sensitive auth data
* Users cannot access other users’ data
* Auth state must be validated before data access

---

## 🔟 Error Handling

Common errors:

* Invalid credentials
* Email already registered
* Unverified email
* Unauthorized access

Rules:

* Errors must be user-friendly
* No technical error details shown

---

## 1️⃣1️⃣ Non-Goals ❌

This module will NOT:

* Support multi-role users
* Support account deletion
* Support custom auth systems
* Support offline authentication

---

## 🔒 Document Status

* **Specification Version: V2**
* This document is the **single source of truth**
* All architecture and code must strictly follow it
* Changes require a new version
