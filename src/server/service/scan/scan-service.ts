import { AxiosResponse } from "axios";
import api from '../api';
import { ImagePayload, ScanImageSuccessResponse } from "@/server/model/scan/scan.model";

const scanService = () => {
  const scanImage = async (image: ImagePayload): Promise<AxiosResponse<ScanImageSuccessResponse | undefined>> => {
    const formData = new FormData();
    formData.append('file', image.file);
    return api.post('/scan/selfie', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  return {scanImage}
}

export default scanService();
