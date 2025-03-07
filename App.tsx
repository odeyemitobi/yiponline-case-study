import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { ProductProvider } from "./context/ProductContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <ProductProvider>
        <StatusBar style="auto" />
        {/* Expo Router will attach to this! */}
        <Toast />
      </ProductProvider>
    </SafeAreaProvider>
  );
}
