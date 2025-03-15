import api from "./api";
import { useCityStore } from "../../lib/store/cityStore";

export default async function getPrayerToday() {
  const { selectedCity } = useCityStore.getState();

  if (!selectedCity) {
    return null;
  }

  const cityId = selectedCity.id;
  const today = new Date().toISOString().split("T")[0];

  const res = await api.get(`/sholat/jadwal/${cityId}/${today}`);
  console.log(res.data);

  return res.data.data;
}
