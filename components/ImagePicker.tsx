import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import * as ExpoImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { ImagePickerProps } from "../types";

export default function ImagePicker({
  imageUri,
  onImageSelected,
}: ImagePickerProps) {
  const [loading, setLoading] = useState(false);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePress = () => {
    scale.value = withTiming(0.95, { duration: 100 }, () => {
      scale.value = withTiming(1, { duration: 100 });
    });
  };

  const pickImage = async () => {
    handlePress();

    try {
      setLoading(true);

      // Request permissions
      const { status } =
        await ExpoImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        setLoading(false);
        return;
      }

      const result = await ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        onImageSelected(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      alert("Failed to pick image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        onPress={pickImage}
        className="overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50"
        style={{ aspectRatio: 1 }}
        disabled={loading}
      >
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#3B82F6" />
          </View>
        ) : imageUri ? (
          <View className="relative flex-1">
            <Image
              source={{ uri: imageUri }}
              className="flex-1"
              resizeMode="cover"
            />
            <View className="absolute top-2 right-2 bg-black/50 rounded-full p-1">
              <Ionicons name="camera" size={20} color="white" />
            </View>
          </View>
        ) : (
          <View className="flex-1 items-center justify-center p-4">
            <Ionicons name="image-outline" size={40} color="#9CA3AF" />
            <Text className="mt-2 text-center text-gray-500">
              Tap to select a product image
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}
