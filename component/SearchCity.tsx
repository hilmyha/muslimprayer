import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import { useCityStore } from "../lib/store/cityStore";
import getAllCity from "../lib/api/getCity";

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
      <TextInput
        style={{
          height: 50,
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 8,
          paddingHorizontal: 16,
          fontSize: 16,
          marginVertical: 12,
          backgroundColor: "white",
        }}
        placeholder="Cari Lokasi..."
        value={searchQuery}
        onChangeText={handleSearch}
        onFocus={() => setShowDropdown(true)}
      />

      {showDropdown && (
        <View
          style={{
            position: "absolute",
            top: 62,
            left: 0,
            right: 0,
            backgroundColor: "white",
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#ddd",
            maxHeight: 200,
            overflow: "hidden",
            elevation: 3,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          }}
        >
          <FlatList
            data={filteredCities}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelectCity(item)}
                style={{
                  padding: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: "#E5E5E5",
                }}
              >
                <Text>{item.lokasi}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}
