import { View, Text, Button } from "react-native";
import React from "react";
import { useCityStore } from "../../lib/store/cityStore";
import SearchCity from "../../component/SearchCity";

export default function Setting() {
  const { selectedCity, removeCity } = useCityStore();
  return (
    <View style={{ padding: 16 }}>
      <Text>Setting</Text>
      {selectedCity ? (
        <View style={{ marginVertical: 16 }}>
          <Text>{selectedCity.lokasi}</Text>
          <Text onPress={removeCity}>Hapus kota</Text>
        </View>
      ) : (
        <View style={{ marginVertical: 16 }}>
          <Text>City not selected</Text>
          <SearchCity />
        </View>
      )}
    </View>
  );
}
