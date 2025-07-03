import { useEffect } from "react";
import { getServerTime } from "@/api";

// timeSync.js
// 存储时间差值（服务器时间 - 本地时间）
let serverTimeDiff = 0;
// 标记是否已经同步过时间
let isSynced = false;
// 标记是否正在同步
let isSyncing = false;

/**
 * 同步服务器时间
 * @returns {Promise<void>}
 */
const syncServerTime = async (orderId: string) => {
  // 如果已经同步过或正在同步，则不再同步
  if (isSynced || isSyncing) return;

  isSyncing = true;

  try {
    // 记录请求发送时间
    const requestStartTime = Date.now();

    // 使用fetch获取服务器时间
    const response = await fetch(
      `${getServerTime()}?${new URLSearchParams({
        orderId,
        localTimeM: requestStartTime.toString(),
      }).toString()}`
    );
    const data = await response.json();

    // 记录响应接收时间
    const requestEndTime = Date.now();

    // 计算网络延迟（往返时间 / 2）
    const networkDelay = Math.round((requestEndTime - requestStartTime) / 2);

    // 从响应中获取服务器时间戳
    const serverTimestamp = data.data; // 假设返回的是 { data: 毫秒时间戳 }

    // 计算调整后的服务器时间（考虑网络延迟）
    const adjustedServerTime = serverTimestamp + networkDelay;

    // 计算本地时间与服务器时间的差值
    serverTimeDiff = adjustedServerTime - requestEndTime;
    // 标记已同步
    isSynced = true;

    console.log(
      `serverTimestamp is: ${serverTimestamp}, localTimestamp is: ${requestEndTime}, networkDelay is: ${networkDelay}, serverTimeDiff is: ${serverTimeDiff}`
    );
    console.log("Server time synced. Difference:", serverTimeDiff, "ms");
  } catch (err) {
    console.error("Failed to sync server time:", err);
    // 同步失败，使用本地时间（差值为0）
    serverTimeDiff = 0;
  } finally {
    isSyncing = false;
  }
};

/**
 * 获取当前的服务器时间戳（毫秒）
 * @returns {number} 当前的服务器时间戳
 */
export const getCurrentTimestamp = (orderId: string, triggerSync = true) => {
  // 如果未同步，尝试同步（不等待结果）
  if (triggerSync && !isSynced && !isSyncing) {
    syncServerTime(orderId).catch(console.error);
  }

  // 返回经过修正的时间戳
  return Date.now() + serverTimeDiff;
};

/**
 * 服务器时间钩子，返回当前服务器时间戳
 * @returns {number} 当前服务器时间戳
 */
const useCurrentTime = (orderId: string, triggerSync = true) => {
  // 在组件挂载时尝试同步
  useEffect(() => {
    if (triggerSync && !isSynced && !isSyncing) {
      syncServerTime(orderId).catch(console.error);
    }
  }, []);

  // 直接返回当前的服务器时间戳
  return () => getCurrentTimestamp(orderId, triggerSync);
};

export default useCurrentTime;
