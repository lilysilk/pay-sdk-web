import type { FC } from "react";
import React from "react";
import { useMemoizedFn } from "@/hooks";

interface NuveiGooglePayProps {
  initNuveiPromise: Promise<any>;
}

const NuveiGooglePay: FC<NuveiGooglePayProps> = ({ initNuveiPromise }) => {
  const initElement = useMemoizedFn(async () => {
    const safecharge = await initNuveiPromise;
  });

  return <div>GooglePay</div>;
};

export default NuveiGooglePay;
