import type { FC } from "react";
import { Accordion } from "@/components/Accordion";

interface PCICardProps {}

const PCICard: FC<PCICardProps> = ({}) => {
  return (
    <div>
      <Accordion id="pcicard" />
    </div>
  );
};

export default PCICard;
