import type { FC } from "react";
import PaymentMethodCard from "@/components/PaymentMethodCard";
import CreditCard from "./CreditCard";
import CreditBind from "./CreditBind";

interface PCICardProps {
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (payment: any) => void;
}

const PCICard: FC<PCICardProps> = ({ onPaymentMethodSelected, onSubmit }) => {
  return (
    <>
      <PaymentMethodCard
        id="pcicard-credit-bind"
        onSelect={onPaymentMethodSelected}
      >
        <CreditBind />
      </PaymentMethodCard>
      <PaymentMethodCard
        id="pcicard-credit-card"
        onSelect={onPaymentMethodSelected}
      >
        <CreditCard />
      </PaymentMethodCard>
    </>
  );
};

export default PCICard;
