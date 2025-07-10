import type { FC } from "react";
import React from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaymentMethodCard from "@/components/PaymentMethodCard";
import PaypalElement from "./Element";

interface QuickPaypalProps {
  onSubmit?: (payment: any) => Promise<any>;
  onCompleted?: (payment: any) => Promise<any>;
  onError?: (error: Error) => void;
}

const QuickPaypal: FC<QuickPaypalProps> = ({
  onSubmit,
  onCompleted,
  onError,
}) => {
  return (
    <PayPalScriptProvider
      options={{
        // 需要接口获取
        clientId: "test",
        components: "buttons",
        intent: "capture",
        vault: false,
        // 需要动态传入
        currency: "USD",
        commit: false,
      }}
    >
      <PaypalElement
        onSubmit={onSubmit}
        onCompleted={onCompleted}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default QuickPaypal;
