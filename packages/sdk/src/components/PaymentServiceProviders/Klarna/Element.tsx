import { useEffect, useRef, useState, type FC } from "react";
import { PaymentError } from "@/utils";
import { useMemoizedFn } from "@/hooks";
import Button from "@/components/Button";

export interface SubmitData {
  type: string;
  authorization_token: string;
}

interface KlarnaElementProps {
  category: string;
  onSubmit?: (payment: SubmitData) => Promise<any>;
  onComplete?: (type: string) => Promise<any>;
  onError?: (error: PaymentError) => void;
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
          onError?.(PaymentError.businessError((error as Error)?.message));
        }
      }
    );
  });

  const handleSubmit = useMemoizedFn(async () => {
    try {
      setIsLoading(true);
      window?.Klarna?.Payments?.authorize(
        {
          // 需要根据api返回的数据来填充
          payment_method_category: category,
        },
        async ({
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
            try {
              const result = await onSubmit?.({
                type: category,
                authorization_token,
              });
              await onComplete?.(category);
            } catch (error) {
              onError?.(PaymentError.businessError((error as Error)?.message));
            }
          } else if (error) {
            // 根据需求看是否需要处理错误 看文档如何处理
            onError?.(PaymentError.businessError((error as Error)?.message));
          }
        }
      );
    } catch (error) {
      onError?.(PaymentError.businessError((error as Error)?.message));
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
