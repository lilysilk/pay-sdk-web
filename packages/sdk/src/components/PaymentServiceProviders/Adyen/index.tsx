import type { FC } from "react";
import { Accordion } from "@/components/Accordion";

interface AdyenProps {}

const Adyen: FC<AdyenProps> = ({}) => {
  return (
    <div>
      <Accordion id="adyen" />
    </div>
  );
};

export default Adyen;
