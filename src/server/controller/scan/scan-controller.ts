import { HttpStatus } from "@/assets/enum/http-status"
import { ImagePayload, ScanImageSuccessResponse } from "@/server/model/scan/scan.model"
import scanService from "@/server/service/scan/scan-service"
import { AxiosError, AxiosResponse } from "axios"

const scanController = () => {
  const scanImage = async (image: ImagePayload) => {
    try{
      const result: AxiosResponse<ScanImageSuccessResponse | undefined> = await scanService.scanImage(image);

      if(result.status === HttpStatus.OK && result.data !== null){
        return Promise.resolve(result.data);
      }
    } catch (error){
      const { response } = error as AxiosError;
      return Promise.reject(response);
    }
  }

  return{scanImage}
}

export default scanController();