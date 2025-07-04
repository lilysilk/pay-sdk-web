import type { FC } from "react";
import PaymentMethodCard from "@/components/PaymentMethodCard";

interface PCICardProps {}

const PCICard: FC<PCICardProps> = ({}) => {
  return (
    <div>
      <PaymentMethodCard id="pcicard">
        <div>1</div>
      </PaymentMethodCard>
    </div>
  );
};

export default PCICard;
