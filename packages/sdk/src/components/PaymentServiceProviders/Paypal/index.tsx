import type { FC } from "react";
import PaymentMethodCard from "@/components/PaymentMethodCard";

interface PaypalProps {}

const Paypal: FC<PaypalProps> = ({}) => {
  return (
    <div>
      <PaymentMethodCard id="paypal">
        <div>1</div>
      </PaymentMethodCard>
    </div>
  );
};

export default Paypal;
