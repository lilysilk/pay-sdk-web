import type { FC } from "react";
import Main from "./components/Main";

// 导出主SDK组件
interface LilyPaySDKProps {}

const LilyPaySDK: FC<LilyPaySDKProps> = ({}) => {
  return (
    <div>
      <Main />
    </div>
  );
};

// 默认导出主SDK
export default LilyPaySDK;
