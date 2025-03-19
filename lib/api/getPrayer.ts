import api from "./api";
import { useCityStore } from "../../lib/store/cityStore";

export default async function getPrayerToday() {
  const { selectedCity } = useCityStore.getState();

  if (!selectedCity) {
    return null;
  }

  const cityId = selectedCity.id;
  const today = new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Jakarta",
  })
    .format(new Date())
    .split("/")
    .reverse()
    .join("-");

  console.log(today);

  const res = await api.get(`/sholat/jadwal/${cityId}/${today}`);
  console.log(res.data);

  return res.data.data;
}
