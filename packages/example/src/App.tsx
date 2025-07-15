import React, { useState, useEffect, useRef } from "react";
import LilyPaySDK from "lilysilk-pay-sdk-web";

function App() {
  // Form state
  const [countryCode, setCountryCode] = useState("ES");
  const [website, setWebsite] = useState("ES");
  const [currency, setCurrency] = useState("EUR");
  const [amountValue, setAmountValue] = useState("11000");
  const [email, setEmail] = useState("jdoe@example.com");
  const [locale, setLocale] = useState("en");

  // UI state
  const [createOrderStatus, setCreateOrderStatus] = useState("创建订单");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState("支付");

  // LilySilk Pay SDK instance
  const lilyPaySDKRef = useRef<any>(null);

  // Payment callbacks
  const onPaymentCompleted = (result: any) => {
    alert("onPaymentCompleted");
    console.log("onPaymentCompleted", result);
  };

  const onVerifyingPaymentResult = () => {
    console.log("onVerifyingPaymentResult");
  };

  const onPaymentFailed = (error: any) => {
    console.log("onPaymentFailed", error);
    setPaymentStatus("支付失败");
  };

  // Form validation
  const validateForm = () => {
    if (!countryCode) {
      alert("请选择国家");
      return false;
    }
    if (!currency) {
      alert("请选择币种");
      return false;
    }
    if (!amountValue) {
      alert("请填写金额");
      return false;
    }
    if (!email) {
      alert("请填写邮箱");
      return false;
    }
    return true;
  };

  // Custom createOrder function using fetch
  const createOrder = async (orderData: any) => {
    const response = await fetch(
      "https://api.dev-sps-pci.lilysilk.com/api/v1/payment-orders/upsert",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer d61NANYHeGkH95p0Qtbydhc204zk4Ax4",
        },
        credentials: "include", // Include cookies
        body: JSON.stringify(orderData),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  };

  // Get create order options
  const getCreateOrderOption = () => {
    if (!validateForm()) return null;

    return {
      idempotencyId: "482046C3A7E94F5BD1FE3C66C",
      uniqueId: "cartUUID",
      transactionId: Date.now(),
      transactionType: "checkoutOrder",
      totalAmount: {
        cents: amountValue,
        currency: currency,
      },
      transactionInformation: {
        totalAmount: {
          cents: amountValue,
          currency: currency,
        },
        lineItems: [
          {
            id: 111,
            skuId: "skuid1",
            title: "demo 01",
            description: "Shoes",
            quantity: "1",
            unitPrice: {
              cents: amountValue,
              currency: currency,
            },
            totalAmount: {
              cents: amountValue,
              currency: currency,
            },
            discountPrice: {
              cents: amountValue,
              currency: currency,
            },
            amountIncludesTax: false,
            discountApplied: false,
            imgUrl:
              "https://t7.baidu.com/it/u=1819248061,230866778&fm=193&f=GIF",
            itemUrl:
              "https://t7.baidu.com/it/u=1819248061,230866778&fm=193&f=GIF",
          },
        ],
      },
      billingAddress: {
        firstName: "John",
        lastName: "Doe",
        addressLine1: "123 Main Street",
        addressLine2: "Apt 4B",
        city: "Anytown",
        state: "California",
        postalCode: "12345",
        country: "United States",
        email,
        houseNumberOrName: "123",
        street: "Happy Street",
        phoneNumber: "650-965-6000",
        countryCode: countryCode,
      },
      deliveryAddress: {
        firstName: "John",
        lastName: "Doe",
        addressLine1: "123 Main Street",
        addressLine2: "Apt 4B",
        city: "Anytown",
        state: "California",
        postalCode: "12345",
        country: "United States",
        email,
        houseNumberOrName: "123",
        street: "Happy Street",
        phoneNumber: "650-965-6000",
        countryCode: countryCode,
      },
      language: "EN_US",
      website: website,
      countryCode: countryCode,
      memberId: 11111,
      shopId: 22222,
      customer: {
        accountId: 0,
        isLogin: false,
        email: "email_6bff13a8c95f",
        created: 0,
        shopId: 10001,
        level: "1",
      },
    };
  };

  // Create order handler
  const handleCreateOrder = async () => {
    const orderOptions = getCreateOrderOption();
    if (!orderOptions) return;

    setCreateOrderStatus("创建订单中...");

    try {
      const res = await createOrder(orderOptions);
      const id = res.data?.id || res.id; // Handle different response structures

      if (id) {
        setOrderId(id);
        setCreateOrderStatus("创建订单成功");
        console.log("Order Id", id);

        // Initialize LilyPaySDK with the order
        initializeLilyPaySDK(id);
      } else {
        setCreateOrderStatus("创建订单失败");
      }
    } catch (error) {
      console.log(error);
      setCreateOrderStatus("创建订单失败");
    }
  };

  // Initialize LilyPaySDK
  const initializeLilyPaySDK = (orderId: string) => {
    // Clear existing instance if any
    if (lilyPaySDKRef.current) {
      lilyPaySDKRef.current = null;
    }

    // Create new LilyPaySDK instance
    lilyPaySDKRef.current = {
      orderId: orderId,
      countryCode: countryCode,
      website: website,
      currency: currency,
      amount: parseInt(amountValue),
      email: email,
    };

    console.log("LilyPaySDK initialized with:", lilyPaySDKRef.current);
  };

  // Update order handler
  const handleUpdateOrder = async () => {
    if (!orderId) return;

    const orderOptions = getCreateOrderOption();
    if (!orderOptions) return;

    try {
      const updatedOrderData = { ...orderOptions, id: orderId };
      await createOrder(updatedOrderData);
      console.log("Order updated");

      // Reinitialize LilyPaySDK with updated data
      initializeLilyPaySDK(orderId);
    } catch (error) {
      console.log("Update order failed:", error);
    }
  };

  // Payment handler
  const handlePayment = async () => {
    if (!lilyPaySDKRef.current) return;

    setPaymentStatus("支付中...");
    try {
      // Simulate payment process
      console.log("Processing payment with LilyPaySDK:", lilyPaySDKRef.current);

      // Here you would integrate with the actual LilyPaySDK payment methods
      setTimeout(() => {
        onPaymentCompleted({ orderId: orderId, status: "success" });
        setPaymentStatus("支付成功");
      }, 2000);
    } catch (error) {
      setPaymentStatus("支付失败");
      onPaymentFailed(error);
      console.log("Payment failed:", error);
    }
  };

  // Quick PayPal handlers
  const handleQuickPayPal = () => {
    console.log("Quick PayPal initiated with LilyPaySDK");
    // Here you would integrate LilyPaySDK's quick PayPal functionality
  };

  // Initialize on mount
  useEffect(() => {
    // Set global loading functions
    window.fullLoading = {
      open: () => {},
      close: () => {},
    };

    console.log("LilyPaySDK App initialized");
  }, []);

  return (
    <div style={{ padding: "16px", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>
        🌸 LilySilk Pay SDK Demo
      </h1>

      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "18px", marginBottom: "16px" }}>支付流程演示</h2>
        <ol style={{ marginBottom: "16px", lineHeight: "1.6" }}>
          <li>1. 创建订单</li>
          <li>
            2. 填写表单:
            <br />
            <span style={{ fontFamily: "monospace", fontSize: "14px" }}>
              <span style={{ display: "inline-block", width: "64px" }}>
                adyen:
              </span>{" "}
              3700 0000 0000 002 03/30 7373
            </span>
            <br />
            <span style={{ fontFamily: "monospace", fontSize: "14px" }}>
              <span style={{ display: "inline-block", width: "64px" }}>
                adyen:
              </span>{" "}
              4035 5014 2814 6300 03/30 737 Simon Hopper
            </span>
            <br />
            <span style={{ fontFamily: "monospace", fontSize: "14px" }}>
              <span style={{ display: "inline-block", width: "64px" }}>
                nuvei:
              </span>{" "}
              4000027891380961 12/30 217 Jane Smith
            </span>
          </li>
          <li>3. 支付订单</li>
        </ol>

        {/* Form */}
        <div
          style={{
            display: "grid",
            gap: "12px",
            maxWidth: "400px",
            marginBottom: "24px",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "4px",
                fontWeight: "500",
              }}
            >
              国家:
            </label>
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              <option value="">-请选择国家--</option>
              <option value="JP">日本</option>
              <option value="NL">荷兰</option>
              <option value="SG">SG</option>
              <option value="KR">韩国</option>
              <option value="US">美国</option>
              <option value="GB">GB</option>
              <option value="ES">西班牙</option>
            </select>
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "4px",
                fontWeight: "500",
              }}
            >
              站点:
            </label>
            <select
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              <option value="">-请选择站点--</option>
              <option value="US">US</option>
              <option value="DE">DE</option>
              <option value="NL">NL</option>
              <option value="UK">UK</option>
              <option value="CA">CA</option>
              <option value="AU">AU</option>
              <option value="SG">SG</option>
              <option value="FR">FR</option>
              <option value="ES">ES</option>
              <option value="IT">IT</option>
              <option value="SE">SE</option>
              <option value="DK">DK</option>
              <option value="JP">JP</option>
              <option value="kr">kr</option>
            </select>
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "4px",
                fontWeight: "500",
              }}
            >
              币种:
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              <option value="">-请选择币种--</option>
              <option value="JPY">JPY</option>
              <option value="EUR">EUR</option>
              <option value="SGD">SGD</option>
              <option value="KRW">KRW</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "4px",
                fontWeight: "500",
              }}
            >
              金额:
            </label>
            <input
              type="text"
              placeholder="请输入金额"
              value={amountValue}
              onChange={(e) => setAmountValue(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "4px",
                fontWeight: "500",
              }}
            >
              邮箱:
            </label>
            <input
              type="email"
              placeholder="请输入邮箱"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >
          <button
            onClick={handleCreateOrder}
            style={{
              padding: "12px 24px",
              backgroundColor: "#000",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {createOrderStatus}
          </button>

          <button
            onClick={handleUpdateOrder}
            disabled={!orderId}
            style={{
              padding: "12px 24px",
              backgroundColor: orderId ? "#000" : "#ccc",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: orderId ? "pointer" : "not-allowed",
            }}
          >
            更新订单
          </button>

          <button
            onClick={handleQuickPayPal}
            style={{
              padding: "12px 24px",
              backgroundColor: "#000",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            quickPaypal
          </button>
        </div>
      </div>

      {/* LilyPaySDK Payment Component */}
      <div
        style={{
          marginBottom: "24px",
          border: "2px dashed #dee2e6",
          borderRadius: "8px",
          padding: "24px",
          backgroundColor: "#f8f9fa",
          minHeight: "200px",
        }}
      >
        {orderId ? (
          <LilyPaySDK
            env="dev"
            locale={locale}
            countryCode={countryCode}
            website={website}
            currency={currency}
            amount={parseInt(amountValue) || 0}
            orderId={orderId}
            onPaymentMethodSelected={(method: any) => {
              console.log("Payment method selected:", method);
            }}
            onSubmit={(orderId: string, paymentMethod: string) => {
              console.log("Payment submitted:", { orderId, paymentMethod });
            }}
            onComplete={(orderId: string, paymentMethod: string) => {
              console.log("Payment completed:", { orderId, paymentMethod });
              onPaymentCompleted({ orderId, paymentMethod });
            }}
            onError={(error: Error) => {
              console.error("Payment error:", error);
              onPaymentFailed(error);
            }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "150px",
              color: "#666",
            }}
          >
            请先创建订单以加载支付组件
          </div>
        )}
      </div>

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        disabled={!orderId}
        style={{
          padding: "12px 24px",
          backgroundColor: orderId ? "#000" : "#ccc",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: orderId ? "pointer" : "not-allowed",
          fontSize: "16px",
          fontWeight: "600",
        }}
      >
        {paymentStatus}
      </button>
    </div>
  );
}

// Global type declarations
declare global {
  interface Window {
    fullLoading: {
      open: () => void;
      close: () => void;
    };
  }
}

export default App;
