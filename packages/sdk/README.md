# LilySilk Pay SDK for Web

A comprehensive payment SDK for web applications supporting multiple payment providers.

## Features

- 🚀 Multiple payment providers support (Adyen, Airwallex, Checkout.com, PayPal)
- 🎯 React-first design with TypeScript support
- 📦 Tree-shakable ESM/CJS builds
- 🔒 Type-safe payment handling
- 🎨 Customizable UI components
- ⚡ Built with modern tools (Vite, tsup)

## Installation

### From Private GitHub Repository

```bash
# Install from GitHub (requires access to private repository)
npm install git+https://github.com/lilysilk/pay-sdk-web.git#v0.0.1

# Or with specific version tag
npm install git+https://github.com/lilysilk/pay-sdk-web.git#v1.0.0

# With pnpm
pnpm add git+https://github.com/lilysilk/pay-sdk-web.git#v0.0.1

# With yarn
yarn add git+https://github.com/lilysilk/pay-sdk-web.git#v0.0.1
```

### In package.json

```json
{
  "dependencies": {
    "lilysilk-pay-sdk-web": "git+https://github.com/lilysilk/pay-sdk-web.git#v0.0.1"
  }
}
```

## Quick Start

```tsx
import React from "react";
import { PaymentProvider, PaymentForm } from "lilysilk-pay-sdk-web";

function App() {
  return (
    <PaymentProvider
      config={{
        apiKey: "your-api-key",
        environment: "sandbox", // or 'production'
      }}
    >
      <PaymentForm
        amount={1000} // Amount in cents
        currency="USD"
        onSuccess={(result) => {
          console.log("Payment successful:", result);
        }}
        onError={(error) => {
          console.error("Payment failed:", error);
        }}
      />
    </PaymentProvider>
  );
}

export default App;
```

## Documentation

Visit our [example application](https://your-username.github.io/lilysilk-pay-sdk-web/) to see the SDK in action and explore all available features.

## Supported Payment Providers

- **Adyen** - Global payment platform
- **Airwallex** - Modern payment infrastructure
- **Checkout.com** - Universal payment platform
- **PayPal** - Popular digital wallet

## Development

This SDK is built using:

- **TypeScript** for type safety
- **React** for UI components
- **tsup** for building and bundling
- **ESM/CJS** dual package support

## Versioning

We use semantic versioning. For the available versions, see the [releases page](https://github.com/your-username/lilysilk-pay-sdk-web/releases).

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For questions and support, please contact the development team or create an issue in the repository.
