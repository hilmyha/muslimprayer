import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useCityStore } from "../lib/store/cityStore";
import getAllCity from "../lib/api/getCity";
import { Ionicons } from "@expo/vector-icons";

interface City {
  id: number;
  lokasi: string;
}

export default function SearchCity() {
  const [cityList, setCityList] = useState<City[]>([]);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const { setCity } = useCityStore();

  useEffect(() => {
    getAllCity().then((res) => {
      setCityList(res);
    });
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredCities([]);
      setShowDropdown(false);
    } else {
      const filtered = cityList.filter((city) =>
        city.lokasi.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCities(filtered);
      setShowDropdown(filtered.length > 0);
    }
  };

  const handleSelectCity = (city: City) => {
    setCity(city);
    setSearchQuery("");
    setFilteredCities([]);
    setShowDropdown(false);
    Keyboard.dismiss();
  };

  return (
    <View style={{ position: "relative", zIndex: 2 }}>
      <View style={styles.input}>
        <Ionicons name="search" size={32} color="#60a5fa" />
        <TextInput
          placeholder="Search location"
          style={{ flex: 1 }}
          value={searchQuery}
          onChangeText={handleSearch}
          onFocus={() => setShowDropdown(true)}
        />
      </View>

      {showDropdown && (
        <View style={styles.dropdown}>
          <FlatList
            data={filteredCities}
            keyExtractor={(item) => item.id.toString()}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ maxHeight: 240 }} // Pastikan tinggi cukup
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelectCity(item)}
                style={styles.selector}
              >
                <Text style={{ textTransform: "capitalize" }}>
                  {item.lokasi}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  selector: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
  },
  dropdown: {
    position: "absolute",
    top: 62,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 8,
    maxHeight: 240, // Pastikan cukup besar agar bisa di-scroll
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
