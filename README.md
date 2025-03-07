# YipOnline Product App

A React Native mobile application built as a case study for YipOnline, allowing users to manage up to 5 products with name, photo, and pricing information.

## Features

- Add up to five products with name, photo, and price
- View all products in a responsive grid layout
- View detailed information for each product
- Edit existing product information
- Delete products
- Notification system for maximum product limit
- Smooth animations for enhanced user experience

## Tech Stack

- Expo SDK 50
- React Native
- TypeScript
- NativeWind (Tailwind CSS for React Native)
- React Native Reanimated for animations
- Expo Router for file-based navigation
- AsyncStorage for local data persistence
- Expo Image Picker for photo selection

## Getting Started

### Prerequisites

- Node.js (version 14 or above)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/yiponline-product-app.git
cd yiponline-product-app
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npx expo start
```

4. Run on a device or emulator
   - Press `i` to run on iOS Simulator
   - Press `a` to run on Android Emulator
   - Scan the QR code with Expo Go app on your physical device

## Usage

- **Home Screen**: View all added products or an empty state if none exist
- **Add Product**: Tap the + button to add a new product (if below 5 products)
- **Product Details**: Tap on a product card to view details
- **Edit Product**: From the product details screen, tap "Edit" to modify
- **Delete Product**: From the product details or home screen, use the delete button

## Case Study Requirements

This project fulfills the YipOnline case study requirements by:
1. Allowing users to upload up to five products to a simple product app
2. Enabling users to input the name, photo, and pricing of each product
3. Implementing a notification system to alert users when the maximum number of products (5) has been reached