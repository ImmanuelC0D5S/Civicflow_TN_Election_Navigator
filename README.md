# 🗳️ CivicFlow TN: Election Navigator

**Master Your Sovereignty.**

CivicFlow TN is a premium, data-driven platform designed to navigate the democratic landscape of Tamil Nadu. Built with the high-fidelity **Midnight Sovereign** design system, the application empowers citizens with real-time constituency tracking, interactive polling booth discovery, and a personalized Voter Academy journey.

---

## 🎯 Project Overview

### 🏛️ Chosen Vertical: Civic Technology (GovTech)
CivicFlow TN focuses on **Election Participation and Literacy**. It aims to bridge the gap between complex democratic processes and citizen engagement through high-precision digital tools.

### 🧠 Approach and Logic
- **Midnight Sovereign Aesthetic**: We moved away from generic government UI in favor of a "Tactical Premium" design. This makes civic participation feel like an empowering, high-stakes mission rather than a bureaucratic chore.
- **Gamified Literacy**: By introducing a **Voter Readiness Score** and **XP-based Learning Hub**, we incentivize users to complete educational modules that are often ignored.
- **Progressive Disclosure**: Information is revealed through a linear "Journey" (Timeline and Academy), preventing cognitive overload by guiding users through one phase of the election at a time.

### ⚙️ How the Solution Works
1. **Real-time Persistence**: The app uses **Firebase Firestore** to sync a user's `UserProgress` (completed modules, registration status) across devices.
2. **Context-Driven Architecture**: 
   - `AuthContext`: Manages secure Google OAuth sessions.
   - `ProgressContext`: Bridges the gap between the Learning Hub and the User Dashboard, calculating readiness scores on the fly.
   - `LanguageContext`: Enables seamless switching between English and Tamil using a key-based translation engine.
3. **Validation & Security**: Form inputs (like the Registration checker) are validated using **Zod** and sanitized with **DOMPurify** to ensure data integrity and security.

### 📝 Assumptions Made
- **Data Source**: For this demonstration, we assume a centralized API exists for Tamil Nadu election data; current data is served via a robust **Mock Data Engine** (`tn_mock_data.ts`).
- **Age Requirement**: The system assumes the standard Indian voting age of 18+, which is enforced via the `registrationSchema` validation.
- **Connectivity**: While the app has local-storage fallbacks, it assumes an active internet connection for the full "Sovereign" experience (Firebase sync and Google Maps).

---

## ✨ Core Features

### 🗺️ Polling Locator (Tactical Map)
- **Dark-Themed Interface**: Custom Google Maps integration with high-contrast tactical styling.
- **Real-time Filtering**: Search constituencies and areas with instant glassmorphic result panels.
- **Accessibility Indicators**: Identify stations equipped for elderly and disabled voters.

### 🎓 Voter Academy (Learning Journey)
- **Sequential Unlocks**: A linear learning path where modules unlock as you master constitutional concepts.
- **XP Progression**: Earn experience points for every expert article read and assessment completed.
- **Expert Content**: Deep dives into Article 326, EVM/VVPAT integrity, and Booth Day protocols.

### 📅 Election Timeline
- **Glow-Path Visualization**: A vertical, interactive schedule tracking critical phases from Notification to Result Day.
- **Voter Guidelines**: Quick-access rules and tips integrated directly into the timeline nodes.

### 👤 User Dashboard
- **Voter Readiness Score**: A dynamic circular progress tracker showing your current preparedness level.
- **Firestore Sync**: Real-time persistence of your learning progress and civic profile via Firebase.

---

## 🚀 Tech Stack

- **Framework**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/)
- **Backend/Auth**: [Google Firebase](https://firebase.google.com/) (Auth & Firestore)
- **Maps**: [Google Maps Platform](https://developers.google.com/maps)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/civicflow-tn-navigator.git
   cd civicflow-tn-navigator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your Google/Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_key
   VITE_FIREBASE_AUTH_DOMAIN=your_domain
   VITE_FIREBASE_PROJECT_ID=your_id
   VITE_GOOGLE_MAPS_API_KEY=your_maps_key
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

---

## 🎨 Midnight Sovereign Design System

This project adheres to the **Midnight Sovereign** design tokens:
- **Neon Saffron** (`#FFC107`): Primary Action / Power
- **Electric Teal** (`#00D1C1`): Progress / Verification
- **Deep Charcoal** (`#121414`): Surface / Foundation
- **Glassmorphism**: 80% opacity backgrounds with `backdrop-blur-glass` and grain textures.

---

## ⚖️ Disclaimer

CivicFlow TN is a non-partisan educational tool. It is not an official government application. All data is for informational purposes only.

---
*Created with ❤️ for the citizens of Tamil Nadu.*
