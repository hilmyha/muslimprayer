import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useMemo, useState } from "react";

interface PrayerTimes {
  subuh: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
}

interface HeaderProps {
  prayerTimes: PrayerTimes | null;
}

export default function Header({ prayerTimes }: HeaderProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setTimeout(() => setTime(new Date()), 1000);
    return () => clearTimeout(timer);
  }, [time]);

  const nextPrayerCountdown = useMemo(() => {
    if (!prayerTimes) return "Jadwal tidak tersedia";

    const now = new Date();
    for (const [name, prayerTime] of Object.entries(prayerTimes)) {
      const [hours, minutes] = prayerTime.split(":").map(Number);
      const targetTime = new Date(now);
      targetTime.setHours(hours, minutes, 0, 0);

      if (now < targetTime) {
        const diff = targetTime.getTime() - now.getTime();
        const hh = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, "0");
        const mm = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
        const ss = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, "0");
        return `${
          name.charAt(0).toUpperCase() + name.slice(1)
        } - ${hh}:${mm}:${ss}`;
      }
    }

    return "Semua sholat telah berlalu hari ini.";
  }, [prayerTimes, time]);

  return (
    <View style={styles.container}>
      <Text style={styles.clock}>
        {time.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hourCycle: "h23" })}
      </Text>
      <Text style={styles.countdown}>{nextPrayerCountdown}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 24,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  clock: {
    color: "white",
    fontSize: 48,
    fontWeight: "900",
  },
  countdown: {
    color: "white",
    fontSize: 18,
  },
});
