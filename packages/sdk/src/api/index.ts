import { request } from "@/utils";
import type { Response } from "@/types";

/**
 * 删除账单学习地址
 * @param
 */
export const consultPayment = async (params: {}) => {
  return request
    .post<Response<any>>(`/order/api/v2/order/removeAddress.json`, {
      json: params,
    })
    .json();
};

/**
 * 删除账单学习地址
 * @param
 */
export const confirmPayment = async (params: {}) => {
  return request
    .post<Response<any>>(`/order/api/v2/order/removeAddress.json`, {
      json: params,
    })
    .json();
};

/**
 * 删除账单学习地址
 * @param
 */
export const completePayment = async (params: {}) => {
  return request
    .post<Response<any>>(`/order/api/v2/order/removeAddress.json`, {
      json: params,
    })
    .json();
};

/**
 * 获取地址ab测试概率
 * @returns
 */
export const getPaymentStatuss = async (storeCode: string) => {
  return request
    .get<Response<any>>(`/order/api/v2/order/getAbConfig.json`)
    .json();
};

/**
 * 获取地址ab测试概率
 * @returns
 */
export const getServerTime = async () => {
  return request
    .get<Response<any>>(`/order/api/v2/order/getAbConfig.json`)
    .json();
};
