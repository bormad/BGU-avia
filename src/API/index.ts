import axios from "axios";
import { Company, TicketProps } from "../data/types";

const sendAxiosRequest = async (method: string, url: string, data?: {}) => {
  return axios({
    method,
    url,
    data: data,
  }).then((response) => response.data);
};

const ticketsAPI = {
  getTickets: async (): Promise<TicketProps[]> => {
    return await sendAxiosRequest(
      "get",
      "https://api.npoint.io/163b5e66df9f2741243e"
    );
  },
  getCompanies: async (): Promise<Company[]> => {
    return sendAxiosRequest(
      "get",
      "https://api.npoint.io/a1b1c28b32d9785bb26c"
    );
  },
};

export default ticketsAPI;
