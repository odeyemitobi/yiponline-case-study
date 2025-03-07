import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { HeaderProps } from "../types";

export default function Header({
  title,
  showBackButton = false,
  showAddButton = false,
  rightAction,
  rightIcon,
}: HeaderProps) {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between p-4 bg-white border-b border-gray-200">
      <View className="flex-row items-center">
        {showBackButton && (
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Ionicons name="arrow-back" size={24} color="#3B82F6" />
          </TouchableOpacity>
        )}
        <Text className="text-xl font-semibold text-gray-800">{title}</Text>
      </View>

      <View>
        {showAddButton && (
          <TouchableOpacity
            onPress={() => router.push("/add-product")}
            className="p-2"
          >
            <Ionicons name="add-circle" size={28} color="#3B82F6" />
          </TouchableOpacity>
        )}

        {rightIcon && rightAction && (
          <TouchableOpacity onPress={rightAction} className="p-2">
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
