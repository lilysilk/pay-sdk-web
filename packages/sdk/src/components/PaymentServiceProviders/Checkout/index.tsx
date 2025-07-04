import type { FC } from "react";
import PaymentMethodCard from "@/components/PaymentMethodCard";

interface CheckoutProps {}

const Checkout: FC<CheckoutProps> = ({}) => {
  return (
    <div>
      <PaymentMethodCard id="checkout">
        <div>1</div>
      </PaymentMethodCard>
    </div>
  );
};

export default Checkout;
