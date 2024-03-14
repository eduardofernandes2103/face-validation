import { AxiosResponse } from "axios";
import api from '../api';
import { FreeTicketsSuccessResponse } from "@/server/model/tickets/tickets.model";

const ticketsService = () => {
  const getFreeTickets = async (token: string): Promise<AxiosResponse<FreeTicketsSuccessResponse | undefined>> => {
    return api.get<FreeTicketsSuccessResponse>('/free-tickets', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  return {
    getFreeTickets
  }
}

export default ticketsService();
