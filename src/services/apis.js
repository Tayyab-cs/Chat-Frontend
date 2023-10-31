import axios from "axios";
import Domain from "./Endpoint";

export const contacts = async () => {
  let response = await axios.get(`${Domain}/api/chat/dashboard`);
  console.log(response);
  return response.data.result;
};

export const chatDetails = async (id, page) => {
  let response = await axios.get(
    `${Domain}/api/chat/fetchchat/${id}?page=${page}&limit=20`,
  );
  console.log(response);
  return response.data.result;
};
