export interface KeyableObject {
  [key: string]: unknown;
}

export type ResponseBody = {
  resCode: string;
  dataRes: KeyableObject | null;
  errMsg: string[];
};
