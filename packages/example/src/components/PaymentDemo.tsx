import React, { useState, useEffect } from "react";
import LilyPaySDK from "lilysilk-pay-sdk-web";

const PaymentDemo: React.FC = () => {
  const [amount, setAmount] = useState(100);
  const [currency, setCurrency] = useState("USD");
  const [countryCode, setCountryCode] = useState("US");
  const [locale, setLocale] = useState("en");
  const [website, setWebsite] = useState("shop.lilysilk.com");
  const [actualOrderId, setActualOrderId] = useState<string | null>(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [paymentData, setPaymentData] = useState({
    customerEmail: "test@example.com",
    customerName: "John Doe",
    orderId: `order_${Date.now()}`,
  });

  const cardStyle: React.CSSProperties = {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    marginBottom: "24px",
  };

  const inputStyle: React.CSSProperties = {
    padding: "8px 12px",
    border: "2px solid #e9ecef",
    borderRadius: "6px",
    fontSize: "14px",
    transition: "border-color 0.2s ease",
  };

  const currencyOptions = [
    { value: "USD", label: "US Dollar ($)", symbol: "$" },
    { value: "EUR", label: "Euro (€)", symbol: "€" },
    { value: "GBP", label: "British Pound (£)", symbol: "£" },
    { value: "CNY", label: "Chinese Yuan (¥)", symbol: "¥" },
    { value: "JPY", label: "Japanese Yen (¥)", symbol: "¥" },
  ];

  const countryOptions = [
    { value: "US", label: "United States" },
    { value: "GB", label: "United Kingdom" },
    { value: "DE", label: "Germany" },
    { value: "FR", label: "France" },
    { value: "CN", label: "China" },
    { value: "JP", label: "Japan" },
    { value: "AU", label: "Australia" },
    { value: "CA", label: "Canada" },
  ];

  const localeOptions = [
    { value: "en", label: "English" },
    { value: "zh", label: "中文" },
    { value: "ja", label: "日本語" },
    { value: "de", label: "Deutsch" },
    { value: "fr", label: "Français" },
  ];

  const websiteOptions = [
    { value: "shop.lilysilk.com", label: "Main Shop" },
    { value: "shop.dev-shop.lilysilk.com", label: "Dev Shop" },
    { value: "beta.lilysilk.com", label: "Beta Shop" },
  ];

  const selectedCurrency = currencyOptions.find((c) => c.value === currency);

  // 模拟 upsert 接口调用，创建实际的订单ID
  const createPaymentOrder = async () => {
    setIsCreatingOrder(true);
    try {
      // 模拟 API 调用
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 模拟从 response.data.id 获取实际订单ID
      const mockResponse = {
        code: 200,
        success: true,
        message: "Order created successfully",
        data: {
          id: `sps_order_${Date.now()}`,
          amount: amount,
          currency: currency,
          status: "pending",
        },
      };

      setActualOrderId(mockResponse.data.id);
      console.log("Order created:", mockResponse.data);
    } catch (error) {
      console.error("Failed to create order:", error);
    } finally {
      setIsCreatingOrder(false);
    }
  };

  // 当支付参数变化时，重置订单ID
  useEffect(() => {
    setActualOrderId(null);
  }, [amount, currency, countryCode, website, paymentData.orderId]);

  return (
    <div>
      {/* Configuration Panel */}
      <div style={cardStyle}>
        <div style={{ padding: "24px" }}>
          <h2
            style={{
              marginTop: 0,
              marginBottom: "16px",
              color: "#343a40",
              fontSize: "1.5rem",
            }}
          >
            💳 Payment Demo Configuration
          </h2>
          <p style={{ color: "#6c757d", marginBottom: "24px" }}>
            Configure payment parameters to test different scenarios with the
            LilySilk Pay SDK.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {/* Amount & Currency */}
            <div>
              <h4 style={{ marginBottom: "12px", color: "#495057" }}>
                💰 Payment Amount
              </h4>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  style={{ ...inputStyle, flex: 2 }}
                  min="1"
                  max="999999"
                />
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  style={{ ...inputStyle, flex: 1 }}
                >
                  {currencyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.value}
                    </option>
                  ))}
                </select>
              </div>
              <div
                style={{
                  marginTop: "8px",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#007bff",
                }}
              >
                {selectedCurrency?.symbol}
                {amount.toLocaleString()} {currency}
              </div>
            </div>

            {/* Country & Locale */}
            <div>
              <h4 style={{ marginBottom: "12px", color: "#495057" }}>
                🌍 Country & Locale
              </h4>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  style={inputStyle}
                >
                  {countryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <select
                  value={locale}
                  onChange={(e) => setLocale(e.target.value)}
                  style={inputStyle}
                >
                  {localeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Website */}
            <div>
              <h4 style={{ marginBottom: "12px", color: "#495057" }}>
                🌐 Website
              </h4>
              <select
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                style={inputStyle}
              >
                {websiteOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Customer Info */}
            <div>
              <h4 style={{ marginBottom: "12px", color: "#495057" }}>
                👤 Customer Information
              </h4>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <input
                  type="email"
                  value={paymentData.customerEmail}
                  onChange={(e) =>
                    setPaymentData((prev) => ({
                      ...prev,
                      customerEmail: e.target.value,
                    }))
                  }
                  placeholder="Customer Email"
                  style={inputStyle}
                />
                <input
                  type="text"
                  value={paymentData.customerName}
                  onChange={(e) =>
                    setPaymentData((prev) => ({
                      ...prev,
                      customerName: e.target.value,
                    }))
                  }
                  placeholder="Customer Name"
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Order Info */}
            <div>
              <h4 style={{ marginBottom: "12px", color: "#495057" }}>
                📦 Order Information
              </h4>
              <input
                type="text"
                value={paymentData.orderId}
                onChange={(e) =>
                  setPaymentData((prev) => ({
                    ...prev,
                    orderId: e.target.value,
                  }))
                }
                placeholder="Order ID"
                style={inputStyle}
              />
              <button
                onClick={() =>
                  setPaymentData((prev) => ({
                    ...prev,
                    orderId: `order_${Date.now()}`,
                  }))
                }
                style={{
                  marginTop: "8px",
                  padding: "6px 12px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                Generate New ID
              </button>
            </div>
          </div>

          {/* Quick Amount Buttons */}
          <div style={{ marginTop: "20px" }}>
            <h4 style={{ marginBottom: "12px", color: "#495057" }}>
              ⚡ Quick Amount Selection
            </h4>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {[10, 25, 50, 100, 200, 500].map((quickAmount) => (
                <button
                  key={quickAmount}
                  onClick={() => setAmount(quickAmount)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor:
                      amount === quickAmount ? "#007bff" : "#f8f9fa",
                    color: amount === quickAmount ? "white" : "#495057",
                    border: "2px solid",
                    borderColor: amount === quickAmount ? "#007bff" : "#e9ecef",
                    borderRadius: "20px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "500",
                    transition: "all 0.2s ease",
                  }}
                >
                  {selectedCurrency?.symbol}
                  {quickAmount}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Summary */}
      <div style={cardStyle}>
        <div style={{ padding: "24px" }}>
          <h3
            style={{
              marginTop: 0,
              marginBottom: "16px",
              color: "#343a40",
              fontSize: "1.3rem",
            }}
          >
            📋 Payment Summary
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
              padding: "16px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
            }}
          >
            <div>
              <strong>Amount:</strong> {selectedCurrency?.symbol}
              {amount.toLocaleString()} {currency}
            </div>
            <div>
              <strong>Country:</strong>{" "}
              {countryOptions.find((c) => c.value === countryCode)?.label}
            </div>
            <div>
              <strong>Locale:</strong>{" "}
              {localeOptions.find((l) => l.value === locale)?.label}
            </div>
            <div>
              <strong>Website:</strong> {website}
            </div>
            <div>
              <strong>Customer:</strong> {paymentData.customerName}
            </div>
            <div>
              <strong>Email:</strong> {paymentData.customerEmail}
            </div>
            <div>
              <strong>Local Order ID:</strong> {paymentData.orderId}
            </div>
            <div>
              <strong>SPS Order ID:</strong>{" "}
              {actualOrderId || "Not created yet"}
            </div>
          </div>
        </div>
      </div>

      {/* Order Creation */}
      <div style={cardStyle}>
        <div style={{ padding: "24px" }}>
          <h3
            style={{
              marginTop: 0,
              marginBottom: "16px",
              color: "#343a40",
              fontSize: "1.3rem",
            }}
          >
            🚀 Order Creation
          </h3>
          <p style={{ color: "#6c757d", marginBottom: "16px" }}>
            First create a payment order through upsert API to get the actual
            order ID.
          </p>

          <button
            onClick={createPaymentOrder}
            disabled={isCreatingOrder}
            style={{
              padding: "12px 24px",
              backgroundColor: actualOrderId ? "#28a745" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: isCreatingOrder ? "not-allowed" : "pointer",
              opacity: isCreatingOrder ? 0.7 : 1,
              transition: "all 0.2s ease",
            }}
          >
            {isCreatingOrder
              ? "Creating Order..."
              : actualOrderId
              ? "✅ Order Created"
              : "Create Payment Order"}
          </button>
        </div>
      </div>

      {/* Payment Methods */}
      {actualOrderId && (
        <div style={cardStyle}>
          <div style={{ padding: "24px" }}>
            <h3
              style={{
                marginTop: 0,
                marginBottom: "16px",
                color: "#343a40",
                fontSize: "1.3rem",
              }}
            >
              🏪 LilySilk Pay SDK
            </h3>
            <p style={{ color: "#6c757d", marginBottom: "24px" }}>
              Complete SDK component with all payment providers integrated.
            </p>

            <div
              style={{
                border: "2px dashed #dee2e6",
                borderRadius: "12px",
                padding: "24px",
                backgroundColor: "#f8f9fa",
                minHeight: "200px",
              }}
            >
              <LilyPaySDK
                env="dev"
                locale={locale}
                countryCode={countryCode}
                website={website}
                currency={currency}
                amount={amount}
                orderId={actualOrderId}
                onPaymentMethodSelected={(paymentMethod) => {
                  console.log("Payment method selected:", paymentMethod);
                }}
                onSubmit={(orderId, paymentMethod) => {
                  console.log("Payment submitted:", { orderId, paymentMethod });
                }}
                onComplete={(orderId, paymentMethod) => {
                  console.log("Payment completed:", { orderId, paymentMethod });
                }}
                onError={(error) => {
                  console.error("Payment error:", error);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Development Notes */}
      <div style={cardStyle}>
        <div style={{ padding: "24px" }}>
          <h3
            style={{
              marginTop: 0,
              marginBottom: "16px",
              color: "#343a40",
              fontSize: "1.3rem",
            }}
          >
            🔧 Development Notes
          </h3>
          <div
            style={{
              backgroundColor: "#e7f3ff",
              border: "1px solid #b3d7ff",
              borderRadius: "8px",
              padding: "16px",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
          >
            <p style={{ margin: "0 0 8px 0" }}>
              <strong>📦 Using Built SDK Package:</strong>
            </p>
            <ul style={{ margin: 0, paddingLeft: "20px" }}>
              <li>
                Imported as:{" "}
                <code>import LilyPaySDK from 'lilysilk-pay-sdk-web'</code>
              </li>
              <li>Testing actual build output (not source code)</li>
              <li>
                Create order first to get SPS order ID from response.data.id
              </li>
              <li>All required props are now properly configured</li>
              <li>Use browser's Network tab to monitor API calls</li>
              <li>Check console for component loading logs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDemo;
