export interface FreeTicketsInterface{
  id: string,
  cpf: string | null,
  client_name: string,
  client_email: string,
  client_phone_number: string,
  selfie_image: string | null,
  qr_code_image: string | null,
  vaidation_code: string | null,
  is_approved: boolean
}

export interface FreeTicketsSuccessResponse{
  response: {
    "free-tickets": FreeTicketsInterface [],
  }
}

export interface FreeTicketsErrorResponse{
  statusCode: number,
  response: {
    errors: string
  }
}

export interface CreateFreeTicketsPayload{
  client_name: string,
  client_email: string,
  client_phone_number: string,
}

export interface CreateFreeTicketsSuccessResponse{
  response: string;
}

export interface CreateFreeTicketsErrorResponse{
  response: {
    errors: string;
  }
}