import type { FC } from "react";
import PaymentMethodCard from "@/components/PaymentMethodCard";

interface KlarnaProps {
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (payment: any) => void;
}

const Klarna: FC<KlarnaProps> = ({ onPaymentMethodSelected, onSubmit }) => {
  return (
    <div>
      <PaymentMethodCard id="klarna" onSelect={onPaymentMethodSelected}>
        <div>1</div>
      </PaymentMethodCard>
    </div>
  );
};

export default Klarna;
