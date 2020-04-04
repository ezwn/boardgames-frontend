import { http } from "core/http";

export const fetchChat = async chatId => {
  const response = await http.get(
    `/chats/${chatId}`
  );
  const { data } = response;
  return data;
};

export const saveChat = async chat => {
  const response = await http.post(`/chats`, chat);
  return response.data;
};
