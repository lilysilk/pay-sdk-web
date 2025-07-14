import type { FC } from "react";
import type { Environment } from "@/types";
import { EnvironmentProvider } from "./components/EnvironmentContext";
import QueryClientProvider from "./components/QueryClientProvider";
import Main from "./components/Main";

// 导出主SDK组件
interface LilyPaySDKProps {
  locale?: string;
  countryCode: string;
  env: Environment;
  orderId: string;
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (orderId: string, paymentMethod: string) => void;
  onComplete?: (orderId: string, paymentMethod: string) => void;
  onError?: (error: Error) => void;
}

const LilyPaySDK: FC<LilyPaySDKProps> = ({
  locale,
  countryCode,
  env,
  orderId,
  onPaymentMethodSelected,
}) => {
  return (
    <QueryClientProvider>
      <EnvironmentProvider key={env} env={env}>
        <Main
          countryCode={countryCode}
          onPaymentMethodSelected={onPaymentMethodSelected}
        />
      </EnvironmentProvider>
    </QueryClientProvider>
  );
};

// 默认导出主SDK
export default LilyPaySDK;
