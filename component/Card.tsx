import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useCityStore } from "../lib/store/cityStore";

interface CardProps {
  location: string | undefined;
  children: React.ReactNode;
}

export default function Card({ location, children }: CardProps) {
  const { removeCity } = useCityStore();

  return (
    <View style={styles.card}>
      {location && (
        <View style={styles.cardHeader}>
          <View style={styles.cardLocation}>
            <Ionicons name="location-sharp" size={32} color="#60a5fa" />
            <Text style={styles.title}>{location}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "Change Location",
                "Are you sure you want to change the location?",
                [
                  { text: "No", style: "cancel" },
                  {
                    text: "Yes",
                    onPress: () => removeCity(), // Hapus lokasi jika pengguna menekan "Ya"
                  },
                ],
                { cancelable: true }
              );
            }}
          >
            <Ionicons
              name="ellipsis-vertical-sharp"
              size={24}
              color="#9ca3af"
            />
          </TouchableOpacity>
        </View>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    paddingTop: 4,
    paddingBottom: 16,
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: 1,
  },
  cardLocation: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: { fontSize: 18, textTransform: "capitalize", color: "#1f2937" },
});
