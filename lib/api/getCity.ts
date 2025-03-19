import api from "./api";

export default async function getAllCity() {
  const res = await api.get("/sholat/kota/semua");

  return res.data.data;
}
