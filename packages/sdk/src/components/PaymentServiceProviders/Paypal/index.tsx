import type { FC } from "react";
import PaymentMethodCard from "@/components/PaymentMethodCard";

interface PaypalProps {
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (payment: any) => void;
}

const Paypal: FC<PaypalProps> = ({ onPaymentMethodSelected, onSubmit }) => {
  return (
    <div>
      <PaymentMethodCard id="paypal" onSelect={onPaymentMethodSelected}>
        <div>1</div>
      </PaymentMethodCard>
    </div>
  );
};

export default Paypal;
