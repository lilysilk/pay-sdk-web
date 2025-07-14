import React, { useState } from "react";
import LilyPaySDK from "lilysilk-pay-sdk-web";
import PaymentDemo from "./components/PaymentDemo";

function App() {
  const [activeTab, setActiveTab] = useState<"sdk" | "demo">("sdk");

  const tabStyle = (isActive: boolean): React.CSSProperties => ({
    padding: "12px 24px",
    border: "none",
    backgroundColor: isActive ? "#007bff" : "#f8f9fa",
    color: isActive ? "white" : "#495057",
    cursor: "pointer",
    borderRadius: "8px 8px 0 0",
    fontSize: "16px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: isActive ? "0 2px 4px rgba(0,123,255,0.3)" : "none",
  });

  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: "white",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  };

  const contentStyle: React.CSSProperties = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "32px 24px",
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "80px",
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "1.8rem",
                  fontWeight: "700",
                  color: "#343a40",
                }}
              >
                🌸 LilySilk Pay SDK
              </h1>
              <p
                style={{
                  margin: "4px 0 0 0",
                  color: "#6c757d",
                  fontSize: "0.9rem",
                }}
              >
                Payment SDK Testing Environment
              </p>
            </div>

            {/* Version Badge */}
            <div
              style={{
                padding: "6px 12px",
                backgroundColor: "#e7f3ff",
                border: "1px solid #b3d7ff",
                borderRadius: "16px",
                fontSize: "12px",
                fontWeight: "600",
                color: "#0066cc",
              }}
            >
              v0.0.1
            </div>
          </div>

          {/* Tabs */}
          <div
            style={{
              display: "flex",
              gap: "4px",
              borderBottom: "2px solid #e9ecef",
              paddingBottom: "0",
            }}
          >
            <button
              onClick={() => setActiveTab("sdk")}
              style={tabStyle(activeTab === "sdk")}
            >
              🏪 Complete SDK
            </button>
            <button
              onClick={() => setActiveTab("demo")}
              style={tabStyle(activeTab === "demo")}
            >
              💳 Payment Demo
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={contentStyle}>
        {activeTab === "sdk" && (
          <div>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                marginBottom: "24px",
              }}
            >
              <div style={{ padding: "24px" }}>
                <h2
                  style={{
                    marginTop: 0,
                    marginBottom: "16px",
                    color: "#343a40",
                    fontSize: "1.5rem",
                  }}
                >
                  🏪 Complete LilySilk Pay SDK
                </h2>
                <p style={{ color: "#6c757d", marginBottom: "24px" }}>
                  Testing the complete SDK package as users would import it.
                </p>

                <div
                  style={{
                    backgroundColor: "#e7f3ff",
                    border: "1px solid #b3d7ff",
                    borderRadius: "8px",
                    padding: "16px",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    marginBottom: "24px",
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
                    <li>Simulates real user experience</li>
                    <li>Validates build process and packaging</li>
                  </ul>
                </div>

                <div
                  style={{
                    border: "2px dashed #dee2e6",
                    borderRadius: "12px",
                    padding: "24px",
                    backgroundColor: "#f8f9fa",
                    minHeight: "300px",
                  }}
                >
                  <LilyPaySDK
                    countryCode="US"
                    env="dev"
                    orderId="123"
                    onPaymentMethodSelected={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "demo" && <PaymentDemo />}
      </div>
    </div>
  );
}

export default App;
