import { Link } from "expo-router";
import { Text, TouchableWithoutFeedback, View, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import { useCityStore } from "../../lib/store/cityStore";
import SearchCity from "../../component/SearchCity";
import getPrayerToday from "../../lib/api/getPrayer";

interface PrayerSchedule {
  ashar: string;
  date: string;
  dhuha: string;
  dzuhur: string;
  imsak: string;
  isya: string;
  maghrib: string;
  subuh: string;
  tanggal: string;
  terbit: string;
}

interface PrayerResponse {
  daerah: string;
  id: number;
  lokasi: string;
  jadwal: PrayerSchedule;
}

export default function Home() {
  const { selectedCity, removeCity } = useCityStore();
  const [prayerTimes, setPrayerTimes] = useState<PrayerResponse | null>(null);

  useEffect(() => {
    async function fetchPrayerTimes() {
      if (!selectedCity) {
        setPrayerTimes(null);
        return;
      }
      
      const data = await getPrayerToday();
      console.log(data);

      if (data) {
        setPrayerTimes(data);
      }
    }

    fetchPrayerTimes();
  }, [selectedCity]);

  const handleRemoveCity = () => {
    removeCity();
    setPrayerTimes(null); // 🔥 Reset prayerTimes saat lokasi dihapus
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Pilih Lokasi</Text>

        {selectedCity ? (
          <>
            <Text style={{ fontSize: 16, marginTop: 10 }}>
              Lokasi yang dipilih: {selectedCity.lokasi} (ID: {selectedCity.id})
            </Text>
            <Text
              style={{ fontSize: 18, color: "#007AFF", marginTop: 8 }}
              onPress={handleRemoveCity}
            >
              Hapus lokasi
            </Text>
          </>
        ) : (
          <SearchCity />
        )}

        <View>
          <Text style={{ fontSize: 16, marginTop: 10 }}>
            {selectedCity?.lokasi}
          </Text>

          {selectedCity && prayerTimes && (
            <>
              <Text style={{ fontSize: 16, marginTop: 10 }}>
                Sholat Subuh: {prayerTimes.jadwal.subuh}
              </Text>
              <Text style={{ fontSize: 16, marginTop: 10 }}>
                Sholat Dzuhur: {prayerTimes.jadwal.dzuhur}
              </Text>
              <Text style={{ fontSize: 16, marginTop: 10 }}>
                Sholat Ashar: {prayerTimes.jadwal.ashar}
              </Text>
              <Text style={{ fontSize: 16, marginTop: 10 }}>
                Sholat Maghrib: {prayerTimes.jadwal.maghrib}
              </Text>
              <Text style={{ fontSize: 16, marginTop: 10 }}>
                Sholat Isya: {prayerTimes.jadwal.isya}
              </Text>
            </>
          )}
        </View>

        <Link
          href="/setting"
          style={{ fontSize: 18, color: "#007AFF", marginTop: 20 }}
        >
          Ke Setting
        </Link>
      </View>
    </TouchableWithoutFeedback>
  );
}
