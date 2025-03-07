import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product, ProductContextType } from "../types";
import {
  showMaxProductsReachedNotification,
  showErrorNotification,
} from "../utils/notifications";

const MAX_PRODUCTS = 5;
const STORAGE_KEY = "@YipOnline_Products";

const defaultContextValue: ProductContextType = {
  products: [],
  addProduct: async () => {},
  deleteProduct: async () => {},
  updateProduct: async () => {},
  isMaxProductsReached: false,
  MAX_PRODUCTS: MAX_PRODUCTS,
};

const ProductContext = createContext<ProductContextType>(defaultContextValue);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isMaxProductsReached, setIsMaxProductsReached] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    setIsMaxProductsReached(products.length >= MAX_PRODUCTS);
  }, [products]);

  const loadProducts = async () => {
    try {
      const storedProducts = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
    } catch (error) {
      console.error("Failed to load products:", error);
      showErrorNotification("Failed to load products");
    }
  };

  const saveProducts = async (updatedProducts: Product[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
    } catch (error) {
      console.error("Failed to save products:", error);
      showErrorNotification("Failed to save products");
    }
  };

  const addProduct = async (product: Omit<Product, "id" | "createdAt">) => {
    if (products.length >= MAX_PRODUCTS) {
      showMaxProductsReachedNotification();
      return;
    }

    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    await saveProducts(updatedProducts);

    if (updatedProducts.length >= MAX_PRODUCTS) {
      showMaxProductsReachedNotification();
    }
  };

  const deleteProduct = async (id: string) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    await saveProducts(updatedProducts);
  };

  const updateProduct = async (updatedProduct: Product) => {
    const updatedProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    await saveProducts(updatedProducts);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        updateProduct,
        isMaxProductsReached,
        MAX_PRODUCTS,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
