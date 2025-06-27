import React from "react";

export interface PaymentConfig {
  apiKey: string;
  environment?: "development" | "production";
  baseUrl?: string;
}

export interface PaymentOptions {
  amount: number;
  currency: string;
  orderId: string;
  description?: string;
}

export class LilysilkPaySDK {
  private config: PaymentConfig;

  constructor(config: PaymentConfig) {
    this.config = {
      environment: "production",
      baseUrl: "https://api.lilysilk.com",
      ...config,
    };
  }

  async createPayment(options: PaymentOptions) {
    // 实现支付创建逻辑
    const { amount, currency, orderId, description } = options;

    try {
      const response = await fetch(`${this.config.baseUrl}/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          amount,
          currency,
          orderId,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error(`Payment creation failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Payment creation error:", error);
      throw error;
    }
  }
}

export interface PaymentButtonProps {
  config: PaymentConfig;
  options: PaymentOptions;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
  children?: React.ReactNode;
  className?: string;
}

export const PaymentButton: React.FC<PaymentButtonProps> = ({
  config,
  options,
  onSuccess,
  onError,
  children = "Pay Now",
  className = "",
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      const sdk = new LilysilkPaySDK(config);
      const result = await sdk.createPayment(options);
      onSuccess?.(result);
    } catch (error) {
      const err = error instanceof Error ? error : new Error("Payment failed");
      onError?.(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading}
      className={`payment-button ${className}`}
      style={{
        padding: "12px 24px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: isLoading ? "not-allowed" : "pointer",
        opacity: isLoading ? 0.6 : 1,
        ...(!className && {
          fontSize: "16px",
          fontWeight: "500",
        }),
      }}
    >
      {isLoading ? "Processing..." : children}
    </button>
  );
};

// 默认导出
export default LilysilkPaySDK;
