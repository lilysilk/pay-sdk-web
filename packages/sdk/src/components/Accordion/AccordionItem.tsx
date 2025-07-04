import type { FC, PropsWithChildren } from "react";
import React from "react";
import { useSetAtom } from "jotai";
import { css } from "@emotion/react";
import { paymentMethodAtom } from "@/atom";
import Radio from "@/components/Radio";

interface AccordionItemProps extends PropsWithChildren {
  id: string;
  logo: React.ReactNode;
  title: React.ReactNode;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const containerStyles = css({
  border: "1px solid #e0ded3",
  borderRadius: "2px",
  margin: "16px 0",
  cursor: "pointer",
});

const headerStyles = css({
  display: "flex",
  alignItems: "center",
  padding: "16px 24px",
});

const headerContentStyles = css({
  width: "100%",
  display: "flex",
  alignItems: "center",
  minHeight: "24px",
  "@media (min-width: 1024px)": {
    height: "40px",
  },
});

const titleStyles = css({
  flex: 1,
  fontFamily: "Futura-Medium",
  fontSize: "18px",
  lineHeight: "24px",
  color: "#3b4021",
  "@media (max-width: 768px)": {
    fontSize: "14px",
    lineHeight: "18px",
  },
});

const contentStyles = css({
  padding: "0 24px 20px 56px",

  "@media (max-width: 768px)": {
    padding: "0 16px 16px",
    paddingBottom: "12px",
  },
});

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
    <div css={containerStyles} onClick={() => setPaymentMethod(id)}>
      <div css={headerStyles}>
        <div css={headerContentStyles}>
          <Radio
            name="payment-method"
            checked={isSelected}
            css={{ flex: "none" }}
          />
          <div css={titleStyles}>{title}</div>
        </div>
      </div>
      {isSelected && <div css={contentStyles}>{children}</div>}
    </div>
  );
};

export default AccordionItem;
