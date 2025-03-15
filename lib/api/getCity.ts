import api from "./api";

export default async function getAllCity() {
  const res = await api.get("/sholat/kota/semua");
  // console.log(res.data);

  return res.data.data;
}
