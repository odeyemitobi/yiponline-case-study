import Toast from "react-native-toast-message";

type ToastType = "success" | "error" | "info";

export function showNotification(
  type: ToastType,
  title: string,
  message: string,
  duration = 3000
) {
  Toast.show({
    type,
    text1: title,
    text2: message,
    position: "top",
    visibilityTime: duration,
  });
}

export function showMaxProductsReachedNotification() {
  showNotification(
    "info",
    "Maximum Products Reached",
    "You have reached the maximum limit of 5 products. Please delete some products to add more.",
    4000
  );
}

export function showProductAddedNotification() {
  showNotification(
    "success",
    "Product Added",
    "Your product has been successfully added.",
    3000
  );
}

export function showProductUpdatedNotification() {
  showNotification(
    "success",
    "Product Updated",
    "Your product has been successfully updated.",
    3000
  );
}

export function showProductDeletedNotification() {
  showNotification(
    "success",
    "Product Deleted",
    "Your product has been successfully deleted.",
    3000
  );
}

export function showErrorNotification(message: string) {
  showNotification("error", "Error", message, 4000);
}
