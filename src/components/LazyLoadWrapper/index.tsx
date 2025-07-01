import type { FC } from "react";
import React, { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";

// 组件状态类型
export type ComponentStatus = "loading" | "success" | "error";

// 成功状态追踪器
const ComponentSuccessTracker: FC<{
  children: React.ReactNode;
  name: string;
  onSuccess: (name: string, status: ComponentStatus) => void;
}> = ({ children, name, onSuccess }) => {
  // 组件渲染成功时调用
  useEffect(() => {
    onSuccess(name, "success");
  }, [name, onSuccess]);

  return children;
};

// 懒加载包装器 - 处理懒加载、错误边界和状态追踪
const LazyLoadWrapper: FC<{
  children: React.ReactNode;
  name: string;
  onStatusChange: (name: string, status: ComponentStatus) => void;
}> = ({ children, name, onStatusChange }) => {
  // 初始化为loading状态
  useEffect(() => {
    onStatusChange(name, "loading");
  }, [name, onStatusChange]);

  return (
    <ErrorBoundary
      fallback={null} // 静默失败，什么都不显示
      onError={(error) => {
        console.error(`${name} failed to load:`, error);
        onStatusChange(name, "error");
      }}
    >
      <Suspense fallback={null}>
        <ComponentSuccessTracker name={name} onSuccess={onStatusChange}>
          {children}
        </ComponentSuccessTracker>
      </Suspense>
    </ErrorBoundary>
  );
};

export default LazyLoadWrapper;
