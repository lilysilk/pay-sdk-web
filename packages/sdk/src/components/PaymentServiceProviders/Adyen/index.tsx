import type { FC } from "react";
import PaymentMethodCard from "@/components/PaymentMethodCard";

interface AdyenProps {}

const Adyen: FC<AdyenProps> = ({}) => {
  return (
    <div>
      <PaymentMethodCard id="adyen">
        <div>1</div>
      </PaymentMethodCard>
    </div>
  );
};

export default Adyen;
