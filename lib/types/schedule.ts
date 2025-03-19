export interface PrayerSchedule {
  imsak: string;
  subuh: string;
  dhuha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
}

export interface PrayerResponse {
  daerah: string;
  id: number;
  lokasi: string;
  jadwal: PrayerSchedule;
}
