import { useEffect, useRef, useState, type FC } from "react";
import { useMemoizedFn } from "@/hooks";
import Button from "@/components/Button";

interface KlarnaElementProps {
  category: string;
  initKlarnaPromise: Promise<any>;
  onSubmit?: (payment: any) => Promise<any>;
  onComplete?: (payment: any) => Promise<any>;
  onError?: (error: Error) => void;
}

const KlarnaElement: FC<KlarnaElementProps> = ({
  category,
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
          payment_method_category: category,
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

  const handleSubmit = useMemoizedFn(async () => {
    try {
      setIsLoading(true);
      await initKlarnaPromise;
      window?.Klarna?.Payments?.authorize(
        {
          // 需要根据api返回的数据来填充
          payment_method_category: category,
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
    isUnmountedRef.current = false;
    initElement();
    return () => {
      isUnmountedRef.current = true;
    };
  }, []);

  return (
    <>
      <div ref={containerRef} />
      <Button onClick={handleSubmit} disable={isLoading} text="PLACE ORDER" />
    </>
  );
};

export default KlarnaElement;
