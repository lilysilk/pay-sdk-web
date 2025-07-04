import type { FC } from "react";
import PaymentMethodCard from "@/components/PaymentMethodCard";

interface AirwallexProps {}

const Airwallex: FC<AirwallexProps> = ({}) => {
  return (
    <div>
      <PaymentMethodCard id="airwallex">
        <div>1</div>
      </PaymentMethodCard>
    </div>
  );
};

export default Airwallex;
