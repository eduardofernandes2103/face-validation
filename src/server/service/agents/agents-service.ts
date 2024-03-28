import { AxiosResponse } from 'axios';
import api from '../api';
import { agentLoginPayload, agentSuccessResponse } from '@/server/model/agents/agents.model';

const agentsService = () => {
  const takeAuth = async (
    data: agentLoginPayload
  ): Promise<AxiosResponse<agentSuccessResponse | undefined>> => {
    return api.post<agentSuccessResponse>('agents/login', data);
  };

  return {
    takeAuth
  };
};

export default agentsService();
