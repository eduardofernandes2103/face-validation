  export interface ImagePayload{
    file: Blob
  }
  
  export interface HasFreeTickets {
    hasFreeTickets: boolean
  }
  export interface ScanImageSuccessResponse{
    response: HasFreeTickets;
  }