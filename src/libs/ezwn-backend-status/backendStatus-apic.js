import { anonymousHttp as http } from "core/http";

export const fetchBackendStatus = async () => {
  const response = await http.get(
    `/status/up`
  );
  return response.data;
};
