"use client";

import type { FC, PropsWithChildren, ReactNode } from "react";
import React, { useMemo, useRef } from "react";
import ky, { type KyInstance } from "ky";
import {
  Environment,
  Response,
  ConsultPaymentParams,
  ConsultPaymentSSD,
} from "@/types";

const apiBaseByEnvMap: Record<Environment, string> = {
  dev: "https://api.dev-sps-pci.lilysilk.com",
  beta: "https://api.dev-sps-pci.lilysilk.com",
  pre: "https://api.dev-sps-pci.lilysilk.com",
  prod: "https://api.dev-sps-pci.lilysilk.com",
};

const authTokenByEnvMap: Record<Environment, string> = {
  dev: "d61NANYHeGkH95p0Qtbydhc204zk4Ax4",
  beta: "d61NANYHeGkH95p0Qtbydhc204zk4Ax4",
  pre: "d61NANYHeGkH95p0Qtbydhc204zk4Ax4",
  prod: "d61NANYHeGkH95p0Qtbydhc204zk4Ax4",
};

export interface FeedbackAlertConfig {
  id: number;
  type: "success" | "error";
  duration?: number;
  message: ReactNode;
}

export interface EnviromentContextProps {
  env: Environment;
  consultPayment: (
    params: ConsultPaymentParams
  ) => Promise<Response<ConsultPaymentSSD>>;
  confirmPayment: (params: {}) => Promise<Response<any>>;
  completePayment: (params: {}) => Promise<Response<any>>;
  getPaymentStatuss: (storeCode: string) => Promise<Response<any>>;
  getServerTime: () => Promise<Response<any>>;
}

export const EnvironmentContext =
  React.createContext<EnviromentContextProps | null>(null);

export interface EnviromentProviderProps extends PropsWithChildren {
  env: Environment;
}

export const EnvironmentProvider: FC<EnviromentProviderProps> = ({
  env,
  children,
}) => {
  const requestRef = useRef<KyInstance>(
    ky.extend({
      prefixUrl: `${apiBaseByEnvMap[env]}`,
      credentials: "include",
      timeout: 30000,
      retry: 1,
      headers: {
        Authorization: `Bearer ${authTokenByEnvMap[env]}`,
      },
    })
  );

  const envcContext = useMemo(
    () => ({
      env,
      consultPayment: async (params: ConsultPaymentParams) => {
        return requestRef.current
          .post<Response<ConsultPaymentSSD>>(`api/v1/payments/consult`, {
            json: params,
          })
          .json();
      },
      confirmPayment: async (params: {}) => {
        return requestRef.current
          .post<Response<any>>(`api/v1/payments/confirm`, {
            json: params,
          })
          .json();
      },
      completePayment: async (params: {}) => {
        return requestRef.current
          .post<Response<any>>(`api/v1/payments/complete`, {
            json: params,
          })
          .json();
      },
      getPaymentStatuss: async (storeCode: string) => {
        return requestRef.current
          .get<Response<any>>(`order/api/v2/order/getAbConfig.json`)
          .json();
      },
      getServerTime: async () => {
        return requestRef.current
          .get<Response<any>>(`api/v1/forter/getTime`)
          .json();
      },
    }),
    []
  );

  return (
    <EnvironmentContext.Provider value={envcContext}>
      {children}
    </EnvironmentContext.Provider>
  );
};
