import { AxiosError, AxiosResponse } from 'axios';
import { agentLoginPayload, agentSuccessResponse } from '@/server/model/agents/agents.model';
import agentsService from '@/server/service/agents/agents-service';
import { HttpStatus } from '@/assets/enum/http-status';

const usersController = () => {
  const takeAuth = async (
    data: agentLoginPayload
  ): Promise<agentSuccessResponse | undefined> => {
    try {
      const result: AxiosResponse<agentSuccessResponse | undefined> =
        await agentsService.takeAuth(data);

      if (result.status === HttpStatus.OK && result.data != null) {
        return Promise.resolve(result.data);
      }
    } catch (error) {
      const { response } = error as AxiosError;

      console.error(response);
      return Promise.reject(response);
    }
  };

  return {
    takeAuth
  };
};

export default usersController();
