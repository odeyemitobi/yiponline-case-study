/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#3B82F6";
const tintColorDark = "#0EA5E9";

export default {
  light: {
    text: "#1F2937",
    background: "#F9FAFB",
    tint: tintColorLight,
    tabIconDefault: "#6B7280",
    tabIconSelected: tintColorLight,
    card: "#FFFFFF",
    border: "#E5E7EB",
    notification: "#EF4444",
    primary: "#3B82F6",
    secondary: "#10B981",
    accent: "#8B5CF6",
    gray: "#6B7280",
    error: "#EF4444",
    success: "#10B981",
    warning: "#F59E0B",
    info: "#3B82F6",
  },
  dark: {
    text: "#F9FAFB",
    background: "#111827",
    tint: tintColorDark,
    tabIconDefault: "#9CA3AF",
    tabIconSelected: tintColorDark,
    card: "#1F2937",
    border: "#374151",
    notification: "#EF4444",
    primary: "#3B82F6",
    secondary: "#10B981",
    accent: "#8B5CF6",
    gray: "#9CA3AF",
    error: "#EF4444",
    success: "#10B981",
    warning: "#F59E0B",
    info: "#60A5FA",
  },
};
