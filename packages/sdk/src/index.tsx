import type { FC } from "react";
import type { Environment } from "@/types";
import { EnvironmentProvider } from "./components/EnvironmentContext";
import QueryClientProvider from "./components/QueryClientProvider";
import Main from "./components/Main";

// 导出主SDK组件
interface LilyPaySDKProps {
  env: Environment;
  locale: string;
  countryCode: string;
  website: string;
  currency: string;
  amount: number;
  orderId: string;
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (orderId: string, paymentMethod: string) => void;
  onComplete?: (orderId: string, paymentMethod: string) => void;
  onError?: (error: Error) => void;
}

const LilyPaySDK: FC<LilyPaySDKProps> = ({
  env,
  locale,
  countryCode,
  website,
  currency,
  amount,
  orderId,
  onPaymentMethodSelected,
}) => {
  return (
    <QueryClientProvider>
      <EnvironmentProvider key={env} env={env}>
        <Main
          key={orderId}
          locale={locale}
          currency={currency}
          amount={amount}
          website={website}
          countryCode={countryCode}
          orderId={orderId}
          onPaymentMethodSelected={onPaymentMethodSelected}
        />
      </EnvironmentProvider>
    </QueryClientProvider>
  );
};

// 默认导出主SDK
export default LilyPaySDK;
