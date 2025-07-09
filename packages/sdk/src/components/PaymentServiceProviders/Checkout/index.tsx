import { useRef, type FC } from "react";
import {
  loadCheckoutWebComponents,
  type CheckoutWebComponents,
  type ComponentNameUnion,
} from "@checkout.com/checkout-web-components";
import { ConsultCheckoutSSD, ConsultPaymentMethodSSD } from "@/types";
import PaymentMethodCard from "@/components/PaymentMethodCard";
import CheckoutElement from "./Element";

interface CheckoutProps {
  config: ConsultCheckoutSSD;
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (payment: any) => void;
  onCompleted?: (payment: any) => void;
  onError?: (error: Error) => void;
}

const Checkout: FC<CheckoutProps> = ({
  config,
  onPaymentMethodSelected,
  onSubmit,
  onCompleted,
  onError,
}) => {
  const initCheckoutPromiseRef = useRef(
    loadCheckoutWebComponents({
      paymentSession: config.authMeta,
      publicKey: config.merchantConfiguration.publicKey,
      environment: "sandbox",
      locale: "en",
    })
  );

  const renderElement = (method: ConsultPaymentMethodSSD) => {
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
        initCheckoutPromise={initCheckoutPromiseRef.current!}
        onSubmit={onSubmit}
        onCompleted={onCompleted}
        onError={onError}
      />
    );
  };

  return (
    <>
      {config.paymentConfiguration.paymentMethods.map((method) => (
        <PaymentMethodCard
          id={`checkou-${method.type}`}
          key={method.type}
          onSelect={onPaymentMethodSelected}
        >
          {renderElement(method)}
        </PaymentMethodCard>
      ))}
    </>
  );
};

export default Checkout;
