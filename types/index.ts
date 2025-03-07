export interface Product {
  id: string;
  name: string;
  price: number;
  imageUri: string;
  createdAt: number;
}

export interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id" | "createdAt">) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  isMaxProductsReached: boolean;
  MAX_PRODUCTS: number;
}
