import { useState, useEffect, type FC } from "react";
import {
  loadCheckoutWebComponents,
  type CheckoutWebComponents,
  type ComponentNameUnion,
} from "@checkout.com/checkout-web-components";
import { ConsultCheckoutSSD, ConsultPaymentMethodSSD } from "@/types";
import { isApplePaySupported } from "@/utils";
import PaymentMethodCard from "@/components/PaymentMethodCard";
import CheckoutElement from "./Element";

interface CheckoutProps {
  config: ConsultCheckoutSSD;
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (payment: any) => Promise<any>;
  onComplete?: (payment: any) => Promise<any>;
  onError?: (error: Error) => void;
}

const Checkout: FC<CheckoutProps> = ({
  config,
  onPaymentMethodSelected,
  onSubmit,
  onComplete,
  onError,
}) => {
  const [checkout, setCheckout] = useState<CheckoutWebComponents | null>(null);

  useEffect(() => {
    const initCheckout = async () => {
      try {
        const client = await loadCheckoutWebComponents({
          paymentSession: config.authMeta,
          publicKey: config.merchantConfiguration.publicKey,
          environment: "sandbox",
          locale: "en-US",
        });
        setCheckout(client);
      } catch (error) {
        onError?.(error as Error);
        setCheckout(null);
      }
    };
    initCheckout();
  }, []);

  const renderElement = (
    method: ConsultPaymentMethodSSD,
    checkout: CheckoutWebComponents
  ) => {
    const extraOptions =
      method.type === "googlepay"
        ? {
            buttonType: "fill",
          }
        : {};

    return (
      <CheckoutElement
        name={method.type as ComponentNameUnion}
        extraOptions={extraOptions}
        checkout={checkout}
        onSubmit={onSubmit}
        onComplete={onComplete}
        onError={onError}
      />
    );
  };

  return (
    checkout &&
    config.paymentConfiguration.paymentMethods.map((method) => {
      if (method.type === "applepay" && !isApplePaySupported) {
        return null;
      }

      return (
        <PaymentMethodCard
          key={method.type}
          id={`checkou-${method.type}`}
          title={method.name}
          onSelect={onPaymentMethodSelected}
        >
          {renderElement(method, checkout)}
        </PaymentMethodCard>
      );
    })
  );
};

export default Checkout;
