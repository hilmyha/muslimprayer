import { Link } from "expo-router";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import PrayerTime from "../../component/PrayerTime";
import getPrayerToday from "../../lib/api/getPrayer";
import { useCityStore } from "../../lib/store/cityStore";
import { PrayerResponse } from "../../lib/types/schedule";
import { Ionicons } from "@expo/vector-icons";
import Card from "../../component/Card";
import SearchCity from "../../component/SearchCity";
import Header from "../../component/Header";

export default function Home() {
  const { selectedCity } = useCityStore();
  const [prayerTimes, setPrayerTimes] = useState<PrayerResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchPrayerTimes() {
      if (!selectedCity) {
        setPrayerTimes(null);
        return;
      }

      setIsLoading(true);

      try {
        const data = await getPrayerToday();
        console.log(data);

        if (data) {
          setPrayerTimes(data);
        }
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPrayerTimes();
  }, [selectedCity]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={{ uri: "https://picsum.photos/200/600" }}
          style={{ width: "100%", height: 300 }}
          resizeMode="cover"
        >
          <Header prayerTimes={prayerTimes?.jadwal || null} />
        </ImageBackground>
        <View style={styles.content}>
          <Card location={selectedCity?.lokasi}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#007AFF" />
            ) : prayerTimes ? (
              <PrayerTime jadwal={prayerTimes.jadwal} />
            ) : (
              <SearchCity />
            )}
          </Card>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    marginTop: -48,
  },
});
