import { OPERATION_STATUS } from "./operationStatus";

export interface Operation {
  id: number;
  status: OPERATION_STATUS;
  properties: JSON;
  created_at: string;
  created_by: number;
}
