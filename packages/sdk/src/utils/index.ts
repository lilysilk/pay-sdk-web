export * from "./loadExternalScript";

declare global {
  interface Window {
    ApplePaySession: any;
  }
}

export const checkApplePaySupport = () => {
  // 首先检查window对象上是否有ApplePaySession
  if (window.ApplePaySession) {
    // 检查是否支持Apple Pay (基本支持)
    if (ApplePaySession.canMakePayments()) {
      // 进一步检查是否支持特定的Apple Pay版本，这里以版本3为例
      // const versionSupported = ApplePaySession.supportsVersion(3);
      // if (versionSupported) {
      //     console.log("此浏览器支持Apple Pay，并且支持版本3.");
      //     return true;
      // } else {
      //     console.log("此浏览器支持Apple Pay，但不支持版本3.");
      //     return false;
      // }
      return true;
    } else {
      console.log("此浏览器不支持进行Apple Pay支付.");
      return false;
    }
  } else {
    console.log("此浏览器不支持Apple Pay.");
    return false;
  }
};

export const getCurrentUrl = () => {
  const currentUrl = new URL(window.location.href);

  // 移除 redirectResult 查询参数（如果存在）
  currentUrl.searchParams.delete("redirectResult");

  return currentUrl.toString();
};

export const isApplePaySupported = checkApplePaySupport();
