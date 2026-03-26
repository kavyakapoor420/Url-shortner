import api from "./axios";

export const createShortUrl = async (payload) => {
  const { data } = await api.post("/urls", payload);
  return data;
};

export const fetchMyUrls = async () => {
  const { data } = await api.get("/urls");
  return data;
};
