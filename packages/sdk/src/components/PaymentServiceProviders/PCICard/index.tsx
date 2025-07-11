import type { FC } from "react";
import PaymentMethodCard from "@/components/PaymentMethodCard";
import type { CounsultPCICardSSD } from "@/types";
import CreditCard from "./CreditCard";
import CreditBind from "./CreditBind";

interface PCICardProps {
  config: CounsultPCICardSSD;
  onPaymentMethodSelected?: (paymentMethod: string) => void;
  onSubmit?: (payment: any) => Promise<any>;
  onComplete?: (payment: any) => Promise<any>;
  onError?: (error: Error) => void;
}

const PCICard: FC<PCICardProps> = ({
  config,
  onPaymentMethodSelected,
  onSubmit,
  onComplete,
  onError,
}) => {
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
