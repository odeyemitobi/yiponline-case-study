import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import ProductForm from "../components/ProductForm";

export default function AddProductScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header title="Add New Product" showBackButton />
      <ProductForm />
    </SafeAreaView>
  );
}
