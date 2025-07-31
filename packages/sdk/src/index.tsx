import type { FC } from "react";
import type { Environment, StoreCode } from "@/types";
import { type PaymentError } from "@/utils";
import { useMemoizedFn } from "@/hooks";
import { EnvironmentProvider } from "./components/EnvironmentContext";
import QueryClientProvider from "./components/QueryClientProvider";
import Main, { type CompletedData, type SubmitData } from "./components/Main";

// 导出主SDK组件
interface LilyPaySDKProps {
  env: Environment;
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

const LilyPaySDK: FC<LilyPaySDKProps> = ({
  env,
  countryCode,
  storeCode,
  currency,
  amount,
  orderId,
  forterTokenCookie,
  onPaymentMethodSelected,
  onSubmit,
  onCompleted,
  onError,
}) => {
  const handleSubmit = useMemoizedFn((data: SubmitData) => {
    onSubmit?.(data);
  });

  const handleCompleted = useMemoizedFn((data: CompletedData) => {
    onCompleted?.(data);
  });

  const handleError = useMemoizedFn((error: PaymentError) => {
    onError?.(error);
  });

  return (
    <QueryClientProvider>
      <EnvironmentProvider key={env} env={env}>
        <Main
          key={orderId}
          currency={currency}
          amount={amount}
          storeCode={storeCode}
          countryCode={countryCode}
          orderId={orderId}
          forterTokenCookie={forterTokenCookie}
          onPaymentMethodSelected={onPaymentMethodSelected}
          onCompleted={handleCompleted}
          onSubmit={handleSubmit}
          onError={handleError}
        />
      </EnvironmentProvider>
    </QueryClientProvider>
  );
};

// 默认导出主SDK
export default LilyPaySDK;
