import type { FC } from "react";
import { css } from "@emotion/react";

interface LoadingProps {}

const styles = css({
  display: "inline-block",
  width: "2rem",
  height: "2rem",
  verticalAlign: "text-bottom",
  border: "0.25em solid currentColor",
  borderRightColor: "transparent",
  borderRadius: "50%",
  animation: "spinner-border 0.75s linear infinite",
  "@keyframes spinner-border": {
    to: {
      transform: "rotate(360deg)",
    },
  },
});

const Loading: FC<LoadingProps> = ({}) => {
  return <div css={styles} />;
};

export default Loading;
