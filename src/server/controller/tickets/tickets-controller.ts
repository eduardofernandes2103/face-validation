import { HttpStatus } from "@/assets/enum/http-status"
import { 
  CreateFreeTicketsPayload,
  CreateFreeTicketsSuccessResponse, 
  FreeTicketsSuccessResponse,
  GenerateCredentialsImagePayload,
  GenerateCredentialsImageSuccessResponse
} from "@/server/model/tickets/tickets.model"
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

  const createFreeTickets = async (token:string, data: CreateFreeTicketsPayload): Promise<CreateFreeTicketsSuccessResponse | undefined> => {
    try{
      const result: AxiosResponse<CreateFreeTicketsSuccessResponse | undefined> = await ticketsService.createFreeTickets(token, data);

      if(result.status === HttpStatus.OK && result.data !== null){
        return Promise.resolve(result.data);
      }
    } catch (error){
      const { response } = error as AxiosError;
      return Promise.reject(response);
    }
  }

  const generateCredentialsImage = async (image: GenerateCredentialsImagePayload, validationCode: string, cpf: string) => {
    try{
      const result: AxiosResponse<GenerateCredentialsImageSuccessResponse | undefined> = await ticketsService.generateCredentialsImage(image, validationCode, cpf);

      if(result.status === HttpStatus.OK && result.data !== null){
        return Promise.resolve(result.data);
      }
    } catch (error){
      const { response } = error as AxiosError;
      return Promise.reject(response);
    }
  }

  return{
    getFreeTickets,
    createFreeTickets,
    generateCredentialsImage
  }
}

export default ticketsController();