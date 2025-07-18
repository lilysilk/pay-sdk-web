import { useEffect, useRef, useState, type FC } from "react";
import { useMemoizedFn } from "@/hooks";
import Button from "@/components/Button";

interface KlarnaElementProps {
  category: string;
  onSubmit?: (payment: any) => Promise<any>;
  onComplete?: (payment: any) => Promise<any>;
  onError?: (error: Error) => void;
}

const KlarnaElement: FC<KlarnaElementProps> = ({
  category,
  onSubmit,
  onComplete,
  onError,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const initElement = useMemoizedFn(async () => {
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
    // window.aaa = aaa;
  });

  const handleSubmit = useMemoizedFn(async () => {
    try {
      setIsLoading(true);
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
    initElement();
    return () => {};
  }, []);

  return (
    <>
      <div ref={containerRef} />
      <Button onClick={handleSubmit} disable={isLoading} text="PLACE ORDER" />
    </>
  );
};

export default KlarnaElement;
