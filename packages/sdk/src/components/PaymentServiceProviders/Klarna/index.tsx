import type { FC } from "react";
import { Accordion } from "@/components/Accordion";

interface KlarnaProps {}

const Klarna: FC<KlarnaProps> = ({}) => {
  return (
    <div>
      <Accordion id="klarna" />
    </div>
  );
};

export default Klarna;
