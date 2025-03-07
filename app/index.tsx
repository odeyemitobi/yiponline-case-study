import React, { useCallback } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import { useFocusEffect } from "expo-router";
import Animated, { FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProducts } from "../context/ProductContext";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import EmptyState from "../components/EmptyState";
import { showProductDeletedNotification } from "../utils/notifications";

export default function HomeScreen() {
  const { products, deleteProduct } = useProducts();
  const [refreshing, setRefreshing] = React.useState(false);
  const [forceUpdate, setForceUpdate] = React.useState(0);

  useFocusEffect(
    useCallback(() => {
      // Trigger a re-render when screen is focused
      setForceUpdate((prev) => prev + 1);
    }, [])
  );

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id);
    showProductDeletedNotification();
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate a refresh delay
    setTimeout(() => {
      setRefreshing(false);
      setForceUpdate((prev) => prev + 1);
    }, 1000);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-50 p-10">
      <Header title="My Products" showAddButton={products.length < 5} />

      {products.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Animated.View
              entering={FadeInUp.duration(400).delay(index * 100)}
              className="px-4"
            >
              <ProductCard product={item} onDelete={handleDeleteProduct} />
            </Animated.View>
          )}
          contentContainerStyle={{
            paddingVertical: 16,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={<View style={{ height: 80 }} />}
        />
      )}
    </SafeAreaView>
  );
}
