Below is **SPECIFICATION V2 (Refined & AI-Proof)**
This version adds **clear rules, edge cases, and state logic** — still no code.

---

# 📘 USER MODULE – SPECIFICATION (V2 – Refined)

This document is the **authoritative source of truth** for the User module.
If something is not written here, it **must not be implemented**.

---

## 1️⃣ User States (VERY IMPORTANT)

A user is always in **exactly one** of these states:

1. **Guest**

   * App opened, not logged in

2. **Authenticated but Unverified**

   * Account exists
   * Email NOT verified

3. **Verified but Not Onboarded**

   * Email verified
   * Required profile info incomplete

4. **Fully Onboarded User**

   * Email verified
   * Profile completed

5. **Admin**

   * Same as Fully Onboarded User + admin permissions

👉 Navigation and access are driven by **state**, not just login.

---

## 2️⃣ App Launch Decision Flow (Clarified)

On app launch, the system must check **in this order**:

1. Is this the **first time app is installed**?

   * YES → show 4-page intro slider
   * NO → skip slider

2. Is user authenticated?

   * NO → Guest flow
   * YES → continue

3. Is email verified?

   * NO → force email verification screen

4. Is onboarding complete?

   * NO → force onboarding steps

5. Otherwise

   * Go to main app

No step may be skipped.

---

## 3️⃣ First-Time App Intro Slider (Refined)

* Exactly **4 pages**
* Shown only once per device install
* Can be skipped at any time

Rules:

* Completion or skip is saved locally
* Logging out does NOT reset slider
* Reinstalling app resets slider

---

## 4️⃣ Registration Flow (Email & Password)

### Flow:

1. User enters email + password
2. Firebase creates account
3. Verification email is sent
4. User is logged in but restricted

Restrictions before verification:

* Cannot access main app
* Can only see:

  * Verify email screen
  * Resend verification email
  * Logout

---

## 5️⃣ Email Verification (Strict Rules)

* Verification is mandatory
* App must re-check verification status on app reopen
* Manual refresh allowed

Edge cases:

* User closes app before verifying → resumes verification flow
* User logs out → verification still required on next login

---

## 6️⃣ Social Login (Clarified)

Supported:

* Google (mandatory)
* Others optional in future

Rules:

* Firebase handles identity
* If social provider provides verified email:

  * Email verification step is skipped
* First-time social users must still:

  * Complete onboarding (name fields)

---

## 7️⃣ Onboarding (Profile Completion)

Required fields:

* First name
* Last name

Rules:

* Cannot access main app until completed
* Progress is saved
* User cannot skip

Once completed:

* User state becomes **Fully Onboarded**

---

## 8️⃣ Login Flow (Refined)

Login methods:

* Email + password
* Social login

Rules:

* Failed login shows generic error
* Successful login restores last valid state
* Session persistence handled by Firebase

---

## 9️⃣ Forgot Password Flow

Flow:

1. User enters email
2. Firebase sends reset email
3. User completes reset externally

Rules:

* App never handles new passwords
* Success message shown even if email exists (security)

---

## 🔟 RBAC (Authorization Rules – Clarified)

Role assignment:

* Default role = `User`
* Admin assigned manually (outside this module)

Rules:

* Role does NOT override onboarding rules
* Admin must still be verified & onboarded
* UI must hide unauthorized features

---

## 1️⃣1️⃣ User Profile Rules (Tightened)

Editable:

* First name
* Last name
* Profile photo

Read-only:

* Email
* Role

Rules:

* Changes are immediately saved to Firebase
* User can only edit own profile

---

## 1️⃣2️⃣ Settings Rules (Refined)

Settings storage:

* Per user in Firebase

Defaults:

* Applied on first successful login

Rules:

* Settings load after authentication
* Settings persist across devices

---

## 1️⃣3️⃣ Error Handling Rules (AI-Safe)

* No raw Firebase errors shown
* All errors mapped to friendly messages
* Same error message for:

  * Wrong email
  * Wrong password
  * Non-existent account

---

## 1️⃣4️⃣ Explicit Non-Goals ❌ (Locked)

This module will NOT:

* Delete accounts
* Change email
* Support offline auth
* Handle custom backend auth
* Support multiple roles per user

---

## 🔒 FINAL STATUS CHECK

This spec is now:

* ✅ Deterministic
* ✅ Step-driven
* ✅ No guessing allowed
* ✅ Ready for architecture design

---

## ✅ NEXT STEP (Step 3)

➡️ **Generate Technical Architecture**

* Screen map
* State machine
* Firebase collections
* Data models
* Auth guards

When you’re ready, just say:

👉 **“Proceed to technical architecture”**

And we’ll build it clean, layer by layer 😎
