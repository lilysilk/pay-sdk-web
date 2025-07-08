import { useRef, type FC } from "react";
import {
  loadCheckoutWebComponents,
  type CheckoutWebComponents,
} from "@checkout.com/checkout-web-components";
import { useMemoizedFn } from "@/hooks";
import PaymentMethodCard from "@/components/PaymentMethodCard";

interface CheckoutProps {
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (payment: any) => void;
}

const Checkout: FC<CheckoutProps> = ({ onPaymentMethodSelected, onSubmit }) => {
  const initCheckoutPromiseRef = useRef<Promise<CheckoutWebComponents> | null>(
    null
  );
  if (initCheckoutPromiseRef.current === null) {
    initCheckoutPromiseRef.current = loadCheckoutWebComponents({
      paymentSession,
      publicKey,
      environment: "sandbox",
      locale: "en",
    });
  }

  return (
    <div>
      <PaymentMethodCard id="checkout" onSelect={onPaymentMethodSelected}>
        <div>1</div>
      </PaymentMethodCard>
    </div>
  );
};

export default Checkout;
