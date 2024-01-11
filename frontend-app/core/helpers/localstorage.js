import AsyncStorage from "@react-native-async-storage/async-storage";

export const local = async (key, value = undefined) => {
  try {
    if (value !== undefined) {
      const valueToStore =
        typeof value === "string" ? value : JSON.stringify(value);
      await AsyncStorage.setItem(key, valueToStore);
    } else {
      const item = await AsyncStorage.getItem(key);
      // Check if the key is "token" and return the item directly
      if (key === "token") {
        return item;
      }
      return item ? JSON.parse(item) : null;
    }
  } catch (error) {
    console.error("Error accessing AsyncStorage:", error);
  }
};
