import type { FC } from "react";
import PaymentMethodCard from "@/components/PaymentMethodCard";

interface KlarnaProps {}

const Klarna: FC<KlarnaProps> = ({}) => {
  return (
    <div>
      <PaymentMethodCard id="klarna">
        <div>1</div>
      </PaymentMethodCard>
    </div>
  );
};

export default Klarna;
