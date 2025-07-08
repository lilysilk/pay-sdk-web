import type { FC } from "react";
import PaymentMethodCard from "@/components/PaymentMethodCard";

interface NuveiProps {
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (payment: any) => void;
}

const Nuvei: FC<NuveiProps> = ({ onPaymentMethodSelected, onSubmit }) => {
  return (
    <div>
      <PaymentMethodCard id="nuvei" onSelect={onPaymentMethodSelected}>
        <div>1</div>
      </PaymentMethodCard>
    </div>
  );
};

export default Nuvei;
