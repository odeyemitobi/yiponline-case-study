import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Product } from "../types";
import { useProducts } from "../context/ProductContext";
import ImagePicker from "./ImagePicker";
import {
  showProductAddedNotification,
  showProductUpdatedNotification,
  showErrorNotification,
} from "../utils/notifications";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
import { ProductFormProps } from "../types";

export default function ProductForm({
  existingProduct,
  isEditing = false,
}: ProductFormProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { addProduct, updateProduct, isMaxProductsReached } = useProducts();

  useEffect(() => {
    if (existingProduct) {
      setName(existingProduct.name);
      setPrice(existingProduct.price.toString());
      setImageUri(existingProduct.imageUri);
    }
  }, [existingProduct]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!price.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(Number(price)) || Number(price) <= 0) {
      newErrors.price = "Price must be a valid positive number";
    }

    if (!imageUri) {
      newErrors.image = "Product image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setIsSubmitting(true);

      if (isEditing && existingProduct) {
        await updateProduct({
          ...existingProduct,
          name,
          price: Number(price),
          imageUri,
        });
        showProductUpdatedNotification();
      } else {
        await addProduct({
          name,
          price: Number(price),
          imageUri,
        });
        showProductAddedNotification();
      }

      router.replace("/");
    } catch (error) {
      console.error("Error saving product:", error);
      showErrorNotification("Failed to save product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView className="flex-1 p-4">
        <Animated.View
          entering={FadeInUp.duration(400).delay(100)}
          exiting={FadeOutDown.duration(300)}
          className="mb-6"
        >
          <Text className="text-lg font-medium text-gray-800 mb-2">
            Product Image
          </Text>
          <ImagePicker imageUri={imageUri} onImageSelected={setImageUri} />
          {errors.image && (
            <Text className="text-error text-sm mt-1">{errors.image}</Text>
          )}
        </Animated.View>

        <Animated.View
          entering={FadeInUp.duration(400).delay(200)}
          exiting={FadeOutDown.duration(300)}
          className="mb-6"
        >
          <Text className="text-lg font-medium text-gray-800 mb-2">
            Product Name
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter product name"
            className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-base"
          />
          {errors.name && (
            <Text className="text-error text-sm mt-1">{errors.name}</Text>
          )}
        </Animated.View>

        <Animated.View
          entering={FadeInUp.duration(400).delay(300)}
          exiting={FadeOutDown.duration(300)}
          className="mb-8"
        >
          <Text className="text-lg font-medium text-gray-800 mb-2">Price</Text>
          <TextInput
            value={price}
            onChangeText={setPrice}
            placeholder="Enter price"
            keyboardType="numeric"
            className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-base"
          />
          {errors.price && (
            <Text className="text-error text-sm mt-1">{errors.price}</Text>
          )}
        </Animated.View>

        <Animated.View
          entering={FadeInUp.duration(400).delay(400)}
          exiting={FadeOutDown.duration(300)}
        >
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isSubmitting || (!isEditing && isMaxProductsReached)}
            className={`p-4 rounded-lg items-center ${
              isSubmitting || (!isEditing && isMaxProductsReached)
                ? "bg-gray-400"
                : "bg-primary"
            }`}
          >
            <Text className="text-white font-medium text-lg">
              {isSubmitting
                ? "Saving..."
                : isEditing
                ? "Update Product"
                : "Add Product"}
            </Text>
          </TouchableOpacity>

          {!isEditing && isMaxProductsReached && (
            <Text className="text-error text-center mt-2">
              You have reached the maximum limit of 5 products.
            </Text>
          )}
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
