import type { FC } from "react";
import { useAtom } from "jotai";
import { paymentMethodAtom } from "@/atom";
import { useMemoizedFn } from "@/hooks";
import AccordionItem from "./AccordionItem";

interface AccordionProps {
  id: string;
}

const Accordion: FC<AccordionProps> = ({ id }) => {
  const [paymentMethod, setPaymentMethod] = useAtom(paymentMethodAtom);
  const handleSelect = useMemoizedFn((id: string) => {
    setPaymentMethod(id);
  });

  return (
    <AccordionItem
      id={id}
      logo={<div>1</div>}
      title={id}
      isSelected={paymentMethod === id}
      onSelect={handleSelect}
    >
      <div>1</div>
    </AccordionItem>
  );
};

export default Accordion;
