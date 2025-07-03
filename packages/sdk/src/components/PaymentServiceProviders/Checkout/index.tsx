import type { FC } from "react";
import { Accordion } from "@/components/Accordion";

interface CheckoutProps {}

const Checkout: FC<CheckoutProps> = ({}) => {
  return (
    <div>
      <Accordion id="checkout" />
    </div>
  );
};

export default Checkout;
