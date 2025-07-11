import { useEffect, useRef, useState, type FC } from "react";
import { useMemoizedFn } from "@/hooks";

interface KlarnaElementProps {
  initKlarnaPromise: Promise<any>;
  onSubmit?: (payment: any) => Promise<any>;
  onComplete?: (payment: any) => Promise<any>;
  onError?: (error: Error) => void;
}

const KlarnaElement: FC<KlarnaElementProps> = ({
  initKlarnaPromise,
  onSubmit,
  onComplete,
  onError,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // const elementRef = useRef<Component>();
  const isUnmountedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  const initElement = useMemoizedFn(async () => {
    await initKlarnaPromise;
    if (!isUnmountedRef.current) {
      window?.Klarna?.Payments?.load(
        {
          container: containerRef.current!,
          // 需要根据api返回的数据来填充
          payment_method_category: "pay_later",
        },
        ({ show_form, error }: { show_form: boolean; error: unknown }) => {
          if (show_form) {
            setIsLoading(false);
          } else if (error) {
            // 根据需求看是否需要处理错误
          }
        }
      );
    }
  });

  const handleSubmit = useMemoizedFn(() => {
    try {
      setIsLoading(true);
      window?.Klarna?.Payments?.authorize(
        {
          // 需要根据api返回的数据来填充
          payment_method_category: "pay_later",
        },
        ({
          approved,
          show_form,
          authorization_token,
          error,
        }: {
          approved: boolean;
          show_form: boolean;
          authorization_token: string;
          error: unknown;
        }) => {
          if (approved) {
            onSubmit?.({
              authorization_token,
            });
          } else if (error) {
            // 根据需求看是否需要处理错误 看文档如何处理
            // onError?.(error as Error);
          }
        }
      );
    } catch (error) {
      onError?.(error as Error);
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    initElement();
    return () => {
      isUnmountedRef.current = true;
    };
  }, []);

  return (
    <>
      <div ref={containerRef} />
      <button onClick={handleSubmit} disabled={isLoading}>
        Submit
      </button>
    </>
  );
};

export default KlarnaElement;
