# 🤖 AI Execution Rules (Strict Contract)

> These rules **MUST be evaluated and satisfied before any code is written, modified, or executed**.
> If **any rule cannot be satisfied**, the AI **MUST stop**, explain the issue, and ask for explicit permission or clarification.

---

## 1️⃣ Environment & System Safety (HARD STOP)

### 1.1 System Integrity

* Do **NOT** modify:

  * macOS system files
  * macOS default-installed tools
  * Globally installed packages or modules (Node, npm, yarn, pnpm, etc.)
* If modification of system or global packages is required:

  * **STOP**
  * Explain **why it is required**
  * Ask for **explicit permission**

✅ Allowed:

* Project-local dependencies
* Project-local configuration files
* Repository-scoped tooling

---

## 2️⃣ Architecture & Platform Rules

### 2.1 React Native Architecture (Mandatory)

* All code **MUST target React Native New Architecture**

  * Fabric renderer
  * TurboModules
  * Hermes enabled
* Do **NOT** introduce:

  * Deprecated APIs
  * Legacy bridge-only native modules
  * Libraries incompatible with the New Architecture

---

### 2.2 Feature-Based Architecture (Mandatory)

* Code **MUST follow feature-based folder structure**
* Each feature:

  * Owns its UI, logic, state, and tests
  * Exposes only a minimal public interface
* Cross-feature communication must:

  * Go through explicit public APIs
  * Avoid deep imports or hidden coupling

❌ No shared “utils dumping ground”
❌ No circular dependencies

---

## 3️⃣ Testing Rules (Strict Order, No Exceptions)

### 3.1 Locked Tests First

Before writing **any new test or feature code**:

1. Run **all existing locked unit tests**
2. All locked tests **MUST pass**

If any locked test fails:

* **STOP**
* Fix the regression
* Do NOT continue until all locked tests pass

---

### 3.2 New Feature Tests

After locked tests pass:

* Write **new unit tests** for the new feature
* Tests must cover:

  * Happy paths
  * Failure paths
  * Edge cases
* Tests must be:

  * Deterministic
  * Isolated
  * Independent of external systems

---

## 4️⃣ Code Quality & Design Principles (Non-Negotiable)

### 4.1 Optimization Priority

Code must be optimized **in this exact order**:

1. **Readability**
2. **Speed**
3. **Memory usage**

If performance optimization reduces readability:

* Prefer readability
* Explain the trade-off clearly in comments

---

### 4.2 Single Responsibility Principle

* Every function must:

  * Do **one thing**
  * Have **one reason to change**
* If a function name needs “and” → it violates SRP

---

### 4.3 Avoid Code Duplication

* Do not duplicate logic across files or features
* Shared logic must be:

  * Extracted
  * Clearly named
  * Owned by a specific module

If duplication is unavoidable:

* Explain **why**
* Minimize scope

---

### 4.4 Descriptive Naming Convention

* Use intention-revealing names
* Names must describe **what**, not **how**
* Avoid abbreviations unless industry-standard

❌ `data`, `temp`, `handler`, `fn`
✅ `validatedUserInput`, `calculateSubscriptionPrice`

---

### 4.5 Clear Code Documentation

Every function **MUST** include:

* What the function does
* Parameters (name, meaning)
* Return value
* Side effects (if any)

Example:

```ts
/**
 * Calculates the total payable amount for a subscription.
 *
 * @param basePrice - Base subscription price
 * @param taxRate - Applied tax percentage
 * @returns Final payable amount
 */
function calculateTotalPrice(
  basePrice: number,
  taxRate: number
): number
```

---

## 5️⃣ Software Design Rules (Integrated Best Practices)

### 5.1 Prefer Pure Functions

* Prefer pure functions whenever possible
* Functions should avoid hidden side effects
* Side effects (IO, storage, network) must be explicit

---

### 5.2 Separation of Concerns

* Do **NOT** mix:

  * Business logic with UI logic
  * Data access with presentation
* Keep domain logic framework-agnostic

---

### 5.3 Keep Side Effects at the Edges

* Core logic should be deterministic
* Side effects should live in:

  * Services
  * Adapters
  * Effects layers

---

### 5.4 Composition Over Inheritance

* Prefer composition, hooks, and functions
* Avoid deep inheritance trees

---

### 5.5 Explicit Async Flow

* Async operations must be:

  * Explicit
  * Traceable
  * Properly handled with error boundaries
* No hidden promises or unhandled async logic

---

## 6️⃣ Change Safety & Scope Control

### 6.1 Minimal Necessary Change

* Modify **only** files required for the task
* Avoid unrelated refactors
* Do not reformat unrelated code

---

### 6.2 Backward Compatibility

* Do not introduce breaking changes unless explicitly requested
* If a breaking change is unavoidable:

  * Clearly identify it
  * Explain impact
  * Ask for approval

---

## 7️⃣ Dependency Management Rules

### 7.1 Dependency Discipline

* Do not add new dependencies unless:

  * Clearly justified
  * No simpler internal solution exists
* Prefer existing project dependencies

If adding a dependency:

* Explain:

  * Why it is needed
  * Alternatives considered
  * Impact on bundle size and maintenance

---

## 8️⃣ Error Handling Rules

* No silent failures
* Errors must:

  * Be explicit
  * Preserve original context
* User-facing errors must be human-readable
* Internal errors must be actionable for developers

---

## 9️⃣ Security & Data Safety

* Assume all inputs are untrusted
* Validate all external data
* Do not log sensitive information
* Do not expose secrets
* Follow least-privilege principles

---

## 🔟 Documentation, Specs & ADR Alignment

### 10.1 Spec Awareness

Before writing code, AI must review:

* Relevant module specs
* Existing ADRs
* Current data models

If implementation diverges from specs:

* Flag the inconsistency
* Propose updates
* Do NOT silently diverge

---

### 10.2 ADR Rules

* Architectural changes require an ADR
* AI may **draft** ADRs
* ADRs must be marked as **Proposed**
* AI must **never** mark ADRs as Accepted

---

## 1️⃣1️⃣ Failure Handling (Absolute Rule)

If **any rule above cannot be followed**:

1. Stop execution
2. Explain the conflict clearly
3. Ask for explicit instruction

No assumptions.
No shortcuts.
No silent deviations.

---

