import { HttpStatus } from "@/assets/enum/http-status"
import { FreeTicketsSuccessResponse } from "@/server/model/tickets/tickets.model"
import ticketsService from "@/server/service/tickets/tickets-service"
import { AxiosError, AxiosResponse } from "axios"

const ticketsController = () => {
  const getFreeTickets = async (token: string): Promise<FreeTicketsSuccessResponse | undefined> => {
    try{
      const result: AxiosResponse<FreeTicketsSuccessResponse | undefined> = await ticketsService.getFreeTickets(token);

      if(result.status === HttpStatus.OK && result.data !== null){
        return Promise.resolve(result.data);
      }
    } catch(error){
      const { response } = error as AxiosError;
      return Promise.reject(response);
    }
  }

  return{
    getFreeTickets
  }
}

export default ticketsController();