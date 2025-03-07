import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { EmptyStateProps } from "../types";

export default function EmptyState({
  title = "No Products Yet",
  message = "Start adding products to your inventory.",
  icon = <Ionicons name="cube-outline" size={80} color="#9CA3AF" />,
  actionLabel = "Add Your First Product",
  onAction,
}: EmptyStateProps) {
  const router = useRouter();

  const handleAction = () => {
    if (onAction) {
      onAction();
    } else {
      router.push("/add-product");
    }
  };

  return (
    <Animated.View
      entering={FadeIn.duration(500)}
      className="flex-1 items-center justify-center p-6"
    >
      <Animated.View
        entering={FadeInDown.duration(600).delay(100)}
        className="items-center"
      >
        {icon}
      </Animated.View>

      <Animated.Text
        entering={FadeInDown.duration(600).delay(200)}
        className="text-xl font-bold text-gray-800 mt-6 text-center"
      >
        {title}
      </Animated.Text>

      <Animated.Text
        entering={FadeInDown.duration(600).delay(300)}
        className="text-gray-500 mt-2 text-center mb-8"
      >
        {message}
      </Animated.Text>

      <Animated.View entering={FadeInDown.duration(600).delay(400)}>
        <TouchableOpacity
          onPress={handleAction}
          className="bg-primary px-6 py-3 rounded-lg flex-row items-center"
        >
          <Ionicons name="add-circle-outline" size={20} color="white" />
          <Text className="text-white font-medium ml-2">{actionLabel}</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
}
