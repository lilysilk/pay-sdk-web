export interface Response<T> {
  code: number;
  data: T;
  msg: string | Record<string, string>;
  message: string;
  success: boolean;
  errMsg?: string;
  errCode?: string;
  i18nErrCode?: string;
}

export type Environment = "dev" | "beta" | "pre" | "prod";
