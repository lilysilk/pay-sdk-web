import type { FC } from "react";
import type { Environment, StoreCode } from "@/types";
import { EnvironmentProvider } from "./components/EnvironmentContext";
import QueryClientProvider from "./components/QueryClientProvider";
import Main from "./components/Main";

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
  onSubmit?: (orderId: string, paymentMethod: string) => void;
  onComplete?: (orderId: string, paymentMethod: string) => void;
  onError?: (error: Error) => void;
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
}) => {
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
        />
      </EnvironmentProvider>
    </QueryClientProvider>
  );
};

// 默认导出主SDK
export default LilyPaySDK;
