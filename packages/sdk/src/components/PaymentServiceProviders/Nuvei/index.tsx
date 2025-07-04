import type { FC } from "react";
import PaymentMethodCard from "@/components/PaymentMethodCard";

interface NuveiProps {}

const Nuvei: FC<NuveiProps> = ({}) => {
  return (
    <div>
      <PaymentMethodCard id="nuvei">
        <div>1</div>
      </PaymentMethodCard>
    </div>
  );
};

export default Nuvei;
