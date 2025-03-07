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

export interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showAddButton?: boolean;
  rightAction?: () => void;
  rightIcon?: React.ReactNode;
}

export interface ImagePickerProps {
  imageUri: string;
  onImageSelected: (uri: string) => void;
}

export interface ProductFormProps {
  existingProduct?: Product;
  isEditing?: boolean;
}

export interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
}

export interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}
