import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import { PrayerSchedule } from "../lib/types/schedule";
import { Ionicons } from "@expo/vector-icons";

interface PrayerTimesProps {
  jadwal: PrayerSchedule;
}

export default function PrayerTime({ jadwal }: PrayerTimesProps) {
  const prayerKeys = [
    "imsak",
    "subuh",
    "dhuha",
    "dzuhur",
    "ashar",
    "maghrib",
    "isya",
  ];

  return (
    <View>
      {prayerKeys.map((key) => (
        <View key={key} style={styles.container}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Text style={styles.title}>{key}</Text>
          </View>
          <Text style={styles.content}>
            {jadwal[key as keyof PrayerSchedule]}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  title: {
    textTransform: "capitalize",
    fontWeight: "500",
    fontSize: 16,
  },
  content: {
    fontWeight: "400",
    fontSize: 16,
  },
});
