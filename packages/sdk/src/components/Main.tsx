import { useEffect, useContext, type FC } from "react";
import { Provider as JotaiProvider } from "jotai";
import { useMutation } from "@tanstack/react-query";
import type { PSPType, StoreCode } from "@/types";
import { PaymentError } from "@/utils";
import { useMemoizedFn } from "@/hooks";
import { EnvironmentContext } from "./EnvironmentContext";
import Container from "./Container";
import CombinedPayments, { type CompleteData } from "./CombinedPayments";
import { testData } from "./testData";

export interface SubmitData {
  pspType: PSPType;
  paymentType: string;
}

export interface CompletedData {
  pspType: PSPType;
  paymentType: string;
}

interface MainProps {
  countryCode: string;
  storeCode: StoreCode;
  currency: string;
  amount: number;
  orderId: string;
  forterTokenCookie: string;
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (data: SubmitData) => void;
  onCompleted?: (data: CompletedData) => void;
  onError?: (error: PaymentError) => void;
}

const Main: FC<MainProps> = ({
  countryCode,
  storeCode,
  currency,
  amount,
  orderId,
  forterTokenCookie,
  onError,
  onPaymentMethodSelected,
  onCompleted,
  onSubmit,
}) => {
  const { consultPayment, completePayment, getPaymentStatuss } =
    useContext(EnvironmentContext)!;
  const {
    data,
    mutate: initPayment,
    isPending,
    error,
    reset,
  } = useMutation({
    mutationFn: async () => {
      // const statusRes = await getPaymentStatuss("123");
      const consultRes = await consultPayment({
        req_id: "web",
        // paymentOrderId: orderId,
        paymentOrderId: orderId,
        countryCode: countryCode,
        website: storeCode,
        paymentGroup: "wallet",
        metadata: {
          returnUrl:
            "https://shop.dev-shop.lilysilk.com/us/checkout?checkout-order-id=1151238690131984&unique-code=M8fcgrx0NalazpOU0su1bE5Co8ANYNK6rPsB00ehF5Y%3D&sps-id=1151236977159300",
        },
      });
      return {
        status: true,
        consult: consultRes,
        // consult: testData,
      };
    },
    onSuccess(data) {
      console.log(data);
    },
    onError(error) {
      // 这里接口报错了 应该在当前组件处理 展示错误信息和重试按钮 错误信息打印下就行了
      console.error("consult error: ", error);
    },
  });

  const { mutateAsync: completePaymentMutateAsync } = useMutation({
    mutationFn: async (payment: CompleteData) => {
      const res = await completePayment({
        channel: "Web",
        paymentOrderId: orderId,
        pspType: payment.pspType,
      });
      if (!res.success) {
        throw new Error(res.message);
      }
      return res;
    },
    onSuccess(data, variables) {
      console.log(data);
      onCompleted?.({
        pspType: variables.pspType,
        paymentType: variables.paymentType,
      });
    },
    onError(error) {
      // complete报错需要抛给上层 应该还要刷新收银台
      onError?.(PaymentError.apiError(error.message));
    },
  });

  const handleComlete = useMemoizedFn(async (payment: CompleteData) => {
    return completePaymentMutateAsync(payment);
  });

  const handleError = useMemoizedFn((error: PaymentError) => {
    onError?.(error);
  });

  useEffect(() => {
    initPayment();
  }, []);

  return (
    <Container>
      <JotaiProvider>
        {error ? (
          <div>
            {error.message}
            <button onClick={() => reset()}>Reset</button>
          </div>
        ) : isPending ? (
          <div>Loading...</div>
        ) : (
          <CombinedPayments
            orderId={orderId}
            amount={amount}
            currency={currency}
            countryCode={countryCode}
            forterTokenCookie={forterTokenCookie}
            paymentServiceProviders={
              data?.consult?.data?.paymentServiceProviders || []
            }
            onComplete={handleComlete}
            onPaymentMethodSelected={onPaymentMethodSelected}
            onError={handleError}
            onSubmit={onSubmit}
          />
        )}
      </JotaiProvider>
    </Container>
  );
};

export default Main;
