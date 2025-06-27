import type { FC } from "react";
import React from "react";
import CombinedPayments from "./CombinedPayments";

interface MainProps {}

const Main: FC<MainProps> = ({}) => {
  return (
    <div>
      <CombinedPayments />
    </div>
  );
};

export default Main;
