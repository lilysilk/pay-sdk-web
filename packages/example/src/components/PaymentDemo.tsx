import React, { useState } from "react";
import LilyPaySDK from "lilysilk-pay-sdk-web";

const PaymentDemo: React.FC = () => {
  const [amount, setAmount] = useState(100);
  const [currency, setCurrency] = useState("USD");
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

  const selectedCurrency = currencyOptions.find((c) => c.value === currency);

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
              <strong>Customer:</strong> {paymentData.customerName}
            </div>
            <div>
              <strong>Email:</strong> {paymentData.customerEmail}
            </div>
            <div>
              <strong>Order ID:</strong> {paymentData.orderId}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
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
            <LilyPaySDK />
          </div>
        </div>
      </div>

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
              <li>Try different amounts to test validation</li>
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
