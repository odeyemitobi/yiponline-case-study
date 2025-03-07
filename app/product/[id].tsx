import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeInRight } from "react-native-reanimated";
import { useProducts } from "../../context/ProductContext";
import Header from "../../components/Header";
import ProductForm from "../../components/ProductForm";
import { showProductDeletedNotification } from "../../utils/notifications";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { products, deleteProduct } = useProducts();
  const [product, setProduct] = useState(products.find((p) => p.id === id));
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === id);
    setProduct(foundProduct);

    if (!foundProduct) {
      router.replace("/");
    }
  }, [id, products]);

  if (!product) {
    return null;
  }

  const handleDelete = () => {
    Alert.alert(
      "Delete Product",
      "Are you sure you want to delete this product?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteProduct(product.id);
            showProductDeletedNotification();
            router.replace("/");
          },
        },
      ]
    );
  };

  if (isEditing) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <Header
          title="Edit Product"
          showBackButton
          rightAction={() => setIsEditing(false)}
          rightIcon={<Ionicons name="close-circle" size={24} color="#3B82F6" />}
        />
        <ProductForm existingProduct={product} isEditing />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header title="Product Details" showBackButton />

      <ScrollView className="flex-1">
        <View className="relative">
          <Image
            source={{ uri: product.imageUri }}
            className="w-full h-64"
            resizeMode="cover"
          />
        </View>

        <View className="p-4">
          <Animated.View entering={FadeInRight.duration(400).delay(100)}>
            <Text className="text-2xl font-bold text-gray-800 mb-2">
              {product.name}
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInRight.duration(400).delay(200)}>
            <Text className="text-xl font-semibold text-primary mb-4">
              ${product.price.toFixed(2)}
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInRight.duration(400).delay(300)}
            className="flex-row mt-6 mb-6"
          >
            <View className="flex-1 items-center justify-center py-2 bg-gray-100 rounded-lg mr-2">
              <Text className="text-sm text-gray-500">Added On</Text>
              <Text className="text-base font-medium text-gray-700">
                {new Date(product.createdAt).toLocaleDateString()}
              </Text>
            </View>

            <View className="flex-1 items-center justify-center py-2 bg-gray-100 rounded-lg ml-2">
              <Text className="text-sm text-gray-500">Product ID</Text>
              <Text className="text-base font-medium text-gray-700">
                {product.id.substring(0, 8)}...
              </Text>
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeIn.duration(600).delay(400)}
            className="flex-row mt-4"
          >
            <TouchableOpacity
              onPress={() => setIsEditing(true)}
              className="flex-1 flex-row items-center justify-center bg-primary p-3 rounded-lg mr-2"
            >
              <Ionicons name="create-outline" size={20} color="white" />
              <Text className="text-white font-medium ml-2">Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleDelete}
              className="flex-1 flex-row items-center justify-center bg-error p-3 rounded-lg ml-2"
            >
              <Ionicons name="trash-outline" size={20} color="white" />
              <Text className="text-white font-medium ml-2">Delete</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
