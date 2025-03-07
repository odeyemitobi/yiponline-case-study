import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
} from "react-native-reanimated";
import { Product } from "../types";
import { ProductCardProps } from "../types";

export default function ProductCard({ product, onDelete }: ProductCardProps) {
  const router = useRouter();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const handlePress = () => {
    scale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );

    router.push({
      pathname: "/product/[id]",
      params: { id: product.id },
    });
  };

  const handleDelete = () => {
    scale.value = withTiming(0.95, { duration: 100 });
    opacity.value = withTiming(0, { duration: 300 }, () => {
      onDelete(product.id);
    });
  };

  return (
    <Animated.View style={cardStyle}>
      <TouchableOpacity
        onPress={handlePress}
        className="bg-white rounded-lg overflow-hidden mb-4"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 2,
        }}
      >
        <View className="relative">
          <Image
            source={{ uri: product.imageUri }}
            className="w-full h-40"
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={handleDelete}
            className="absolute top-2 right-2 bg-black/50 p-2 rounded-full"
          >
            <Ionicons name="trash-outline" size={18} color="white" />
          </TouchableOpacity>
        </View>

        <View className="p-3">
          <Text className="text-lg font-medium text-gray-800 mb-1 line-clamp-1">
            {product.name}
          </Text>
          <Text className="text-primary font-bold text-lg">
            ${product.price.toFixed(2)}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
