import type { FC, PropsWithChildren } from "react";
import React from "react";
import { useSetAtom } from "jotai";
import { paymentMethodAtom } from "@/atom";

interface AccordionItemProps extends PropsWithChildren {
  id: string;
  logo: React.ReactNode;
  title: React.ReactNode;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const AccordionItem: FC<AccordionItemProps> = ({
  id,
  logo,
  title,
  children,
  isSelected,
  onSelect,
}) => {
  const setPaymentMethod = useSetAtom(paymentMethodAtom);

  return (
    <div className="flex flex-col gap-2" onClick={() => setPaymentMethod(id)}>
      <div className="flex items-center justify-between">
        <div>{logo}</div>
        <div>{title}</div>
        <div>{isSelected ? "Open" : "Close"}</div>
      </div>
      <div className="flex flex-col gap-2">{isSelected && children}</div>
    </div>
  );
};

export default AccordionItem;
