import type { FC } from "react";
import { Accordion } from "@/components/Accordion";

interface PaypalProps {}

const Paypal: FC<PaypalProps> = ({}) => {
  return (
    <div>
      <Accordion id="paypal" />
    </div>
  );
};

export default Paypal;
