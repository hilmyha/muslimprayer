import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";

interface City {
  id: number;
  lokasi: string;
}

interface CityState {
  selectedCity: City | null;
  setCity: (city: City) => void;
  removeCity: () => void;
}

const secureStoreStorage = {
  getItem: async (key: string): Promise<string | null> => {
    const value = await SecureStore.getItemAsync(key);
    return value;
  },
  setItem: async (key: string, value: string): Promise<void> => {
    await SecureStore.setItemAsync(key, value);
  },
  removeItem: async (key: string): Promise<void> => {
    await SecureStore.deleteItemAsync(key);
  },
};

export const useCityStore = create<CityState>()(
  devtools(
    persist(
      (set) => ({
        selectedCity: null,
        setCity: (city) => set({ selectedCity: city }),
        removeCity: () => set({ selectedCity: null }),
      }),
      {
        name: "city-storage",
        storage: createJSONStorage(() => secureStoreStorage),
      }
    )
  )
);
