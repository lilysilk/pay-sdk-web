import type { FC } from "react";
import React, { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useMemoizedFn } from "@/hooks";

// 懒加载包装器 - 处理懒加载、错误边界和状态追踪
const LazyLoadWrapper: FC<{
  children: React.ReactNode;
  name: string;
  onRenderError: (name: string) => void;
}> = ({ children, name, onRenderError }) => {
  return (
    <ErrorBoundary
      fallback={null} // 静默失败，什么都不显示
      onError={(error) => {
        console.error(`${name} failed to load:`, error);
        onRenderError(name);
      }}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default LazyLoadWrapper;
