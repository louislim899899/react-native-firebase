**Architecture**
React Native new architecture 
- JSI
- new rendering system - Fabric
- Turbo Modules

**High-level Architecture**
UI (Screens & Components)
        ↓
ViewModel (Hooks / Controllers)
        ↓
Services (Firebase, APIs)
        ↓
Data Models

**Feature structure**
packages/
  core/
    auth/
    user/
    payment/
    navigation/
    ui/
    config/

  features/
    chat/
    listing/
    profile/
    notifications/

  shared/
    hooks/
    utils/
    types/
    api/

**Rule (MUST)**
- loosely coupled
- not over 10 line code in each function
- 

