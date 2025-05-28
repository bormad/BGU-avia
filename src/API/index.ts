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
    return await sendAxiosRequest("get", "http://localhost:4000/flights");
  },
  getCompanies: async (): Promise<Company[]> => {
    return sendAxiosRequest("get", "http://localhost:4000/companies");
  },
};

export default ticketsAPI;
