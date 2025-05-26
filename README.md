# 🚌 UBus – Your route Your Time

UBus is a smart, real-time ticket booking and tracking system for **short-distance government buses**. Inspired by the simplicity of apps like *Where is My Train*, UBus brings seamless digital ticketing and live GPS tracking to local bus commuters.

## 🚀 Project Overview

UBus aims to bridge the gap between public transport accessibility and technology by allowing users to:
- Book general tickets online for short-distance buses.
- Track live bus locations using GPS.
- View accurate Estimated Time of Arrival (ETA) for each stop.
- Travel without paper tickets – just show the digital pass.

## 📌 Problem Statement

Current public transportation systems often lack a centralized platform for ticket booking or real-time location tracking, especially in rural and semi-urban areas. Commuters face difficulties such as:
- No way to know when the bus will arrive.
- Long queues and cash-only ticketing.
- Inconsistent bus schedules.

## ✅ Our Solution

UBus solves this by creating a web-based platform where users can:
- Search for buses operating on specific routes.
- Book a general (non-reserved) ticket using their mobile.
- Get live updates on bus position using GPS.
- Pay securely through integrated digital payments.

## 🧩 Modules

### 1. User Interface (Web App)
- Sign up/login using OTP via Firebase Authentication.
- Search for routes and buses.
- Book tickets and get digital passes.
- Live bus tracking on map (Google Maps API).
- View past ticket history.

### 2. GPS Data Uploader
- Uses an external device (or app fallback) installed in buses.
- Sends real-time coordinates to Firestore.
- Admins can monitor active buses and routes.

### 3. Admin Interface
- Dashboard for depot-level monitoring.
- View bus activity, route status, and fare collection.
- Basic controls for route and schedule updates.

### 4. Payment Integration
- UPI/card/wallet-based ticket payments.
- Built using Razorpay (or other gateways).
- Auto-confirm ticket upon successful payment.

## ⚙️ Technologies Used

| Layer         | Tools / Technologies                       |
|--------------|---------------------------------------------|
| Frontend     | HTML, CSS, JavaScript, Firebase Hosting     |
| Backend      | Firebase Cloud Functions, Firestore         |
| Auth         | Firebase Authentication (Phone OTP)         |
| Database     | Firebase Firestore (NoSQL, real-time)       |
| Maps/GPS     | Google Maps API, GPS Device Integration     |
| Payments     | Razorpay / PhonePe API (for ticketing)      |
| Admin Tools  | Firebase Admin SDK                          |

## 📍 Live Tracking with GPS

UBus uses external GPS modules (or optionally the emergency GPS panic button in buses) to broadcast real-time locations to the server. This ensures accurate ETA predictions and reduces wait times at bus stops.

## 🔐 Authentication & Security

- Firebase Authentication secures access.
- Admin routes protected by role-based access.
- Firestore security rules prevent unauthorized access.

## 📅 Future Enhancements

- Offline booking integration for rural areas.
- AI-based crowd prediction.
- Multi-language interface.
- Native app (Android/iOS).

## 🤝 Team

Developed as part of a 2-week internship CREUD project by a team of 4.

---

# UBus
