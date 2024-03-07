export interface agentLoginPayload {
  email: string;
  password: string;
}

export interface agentSuccessResponse {
  response: {
    token: string;
  };
}
  