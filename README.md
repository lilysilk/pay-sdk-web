# Lilysilk Pay SDK Web

Lilysilk 支付 SDK 的 Web 版本，提供便捷的支付集成解决方案。

## 安装

```bash
npm install lilysilk-pay-sdk-web
```

## 使用方法

### 基本用法

```tsx
import { LilysilkPaySDK, PaymentButton } from "lilysilk-pay-sdk-web";

// 创建SDK实例
const paySDK = new LilysilkPaySDK({
  apiKey: "your-api-key",
  environment: "production", // 或 'development'
});

// 创建支付
const payment = await paySDK.createPayment({
  amount: 10000, // 金额（分）
  currency: "USD",
  orderId: "order-123",
  description: "订单描述",
});
```

### React 组件

```tsx
import { PaymentButton } from "lilysilk-pay-sdk-web";

function App() {
  const config = {
    apiKey: "your-api-key",
    environment: "production",
  };

  const paymentOptions = {
    amount: 10000,
    currency: "USD",
    orderId: "order-123",
    description: "商品购买",
  };

  return (
    <PaymentButton
      config={config}
      options={paymentOptions}
      onSuccess={(result) => {
        console.log("支付成功:", result);
      }}
      onError={(error) => {
        console.error("支付失败:", error);
      }}
    >
      立即支付
    </PaymentButton>
  );
}
```

## 开发

```bash
# 安装依赖
npm install

# 开发模式（监听文件变化）
npm run dev

# 构建
npm run build

# 类型检查
npm run type-check

# 清理构建文件
npm run clean
```

## API 文档

### LilysilkPaySDK

#### 构造函数

```typescript
new LilysilkPaySDK(config: PaymentConfig)
```

#### PaymentConfig

- `apiKey: string` - API 密钥
- `environment?: 'development' | 'production'` - 环境（默认：production）
- `baseUrl?: string` - API 基础 URL（默认：https://api.lilysilk.com）

#### 方法

##### createPayment(options: PaymentOptions)

创建支付订单。

- `amount: number` - 支付金额（分）
- `currency: string` - 货币代码
- `orderId: string` - 订单 ID
- `description?: string` - 订单描述

### PaymentButton

React 支付按钮组件。

#### Props

- `config: PaymentConfig` - SDK 配置
- `options: PaymentOptions` - 支付选项
- `onSuccess?: (result: any) => void` - 支付成功回调
- `onError?: (error: Error) => void` - 支付失败回调
- `children?: React.ReactNode` - 按钮内容（默认：Pay Now）
- `className?: string` - 自定义 CSS 类名

## 许可证

MIT
