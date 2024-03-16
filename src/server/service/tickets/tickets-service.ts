import { AxiosResponse } from "axios";
import api from '../api';
import { CreateFreeTicketsPayload, CreateFreeTicketsSuccessResponse, FreeTicketsSuccessResponse } from "@/server/model/tickets/tickets.model";

const ticketsService = () => {
  const getFreeTickets = async (token: string): Promise<AxiosResponse<FreeTicketsSuccessResponse | undefined>> => {
    return api.get<FreeTicketsSuccessResponse>('/free-tickets', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  const createFreeTickets = async (token: string, data: CreateFreeTicketsPayload):Promise<AxiosResponse<CreateFreeTicketsSuccessResponse | undefined>> => {
    return api.post<CreateFreeTicketsSuccessResponse>('/free-tickets/create', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  return {
    getFreeTickets,
    createFreeTickets
  }
}

export default ticketsService();
