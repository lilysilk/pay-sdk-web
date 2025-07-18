import type { FC, PropsWithChildren } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { css } from "@emotion/react";
import { paymentMethodAtom, getAccordionIsSelectedAtom } from "@/atom";
import { useMemoizedFn } from "@/hooks";
import Radio from "@/components/Radio";

interface PaymentMethodCardProps extends PropsWithChildren {
  id: string;
  logo?: React.ReactNode;
  title?: React.ReactNode;
  onSelect?: (id: string) => void;
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

const PaymentMethodCard: FC<PaymentMethodCardProps> = ({
  id,
  children,
  logo,
  title,
  onSelect,
}) => {
  const isSelected = useAtomValue(getAccordionIsSelectedAtom(id));
  const setPaymentMethod = useSetAtom(paymentMethodAtom);

  const handleClick = useMemoizedFn(() => {
    setPaymentMethod(id);
    onSelect?.(id);
  });

  return (
    <div css={containerStyles}>
      <div css={headerStyles} onClick={handleClick}>
        <div css={headerContentStyles}>
          <Radio
            name="payment-method"
            checked={isSelected}
            css={{ flex: "none" }}
          />
          <div css={titleStyles}>{title || id}</div>
        </div>
      </div>
      {isSelected && <div css={contentStyles}>{children}</div>}
    </div>
  );
};

export default PaymentMethodCard;
