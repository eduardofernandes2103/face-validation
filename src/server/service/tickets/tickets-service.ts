import { AxiosResponse } from "axios";
import api from '../api';
import { 
  CreateFreeTicketsPayload, 
  CreateFreeTicketsSuccessResponse, 
  FreeTicketsSuccessResponse, 
  GenerateCredentialsImagePayload, 
  GenerateCredentialsImageSuccessResponse 
} from "@/server/model/tickets/tickets.model";

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

  const generateCredentialsImage = async (
    image: GenerateCredentialsImagePayload, 
    validationCode: string, 
    cpf: string
  ): Promise<AxiosResponse<GenerateCredentialsImageSuccessResponse | undefined>> => {
    const formData = new FormData();
    formData.append('file', image.file);
    return api.post(`/free-tickets/${validationCode}/${cpf}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  return {
    getFreeTickets,
    createFreeTickets,
    generateCredentialsImage
  }
}

export default ticketsService();
