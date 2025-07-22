// 消息事件类型和对应数据的映射
export interface SuccessData {
  lpsCardToken: string;
  lpsCardTokenVersion: string;
}

interface EventTypeDataMap {
  READY: { instanceId?: string };
  ERROR: { code: string; message: string };
  SUCCESS: { data: SuccessData };
  RESIZE: { width: number; height: number };
}

// 基础消息接口
interface BaseMessage {
  namespace: string;
  instanceId?: string;
}

// 判别联合类型 - 根据type字段推断具体的data类型
type MessageData<T extends keyof EventTypeDataMap = keyof EventTypeDataMap> =
  BaseMessage & {
    type: T;
    data: EventTypeDataMap[T];
  };

// 所有可能的消息类型联合
type IframeMessage =
  | MessageData<"READY">
  | MessageData<"ERROR">
  | MessageData<"SUCCESS">
  | MessageData<"RESIZE">;

// 有效的消息类型列表
const VALID_MESSAGE_TYPES = ["READY", "ERROR", "SUCCESS", "RESIZE"] as const;

// 类型守卫函数 - 检查是否为有效的iframe消息
export const isIframeMessage = (data: any): data is IframeMessage => {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof data.namespace === "string" &&
    typeof data.type === "string" &&
    VALID_MESSAGE_TYPES.includes(data.type) &&
    typeof data.data === "object"
  );
};

// 类型守卫函数 - 检查特定类型的消息
export const isMessageOfType = <T extends keyof EventTypeDataMap>(
  data: any,
  type: T
): data is MessageData<T> => {
  return isIframeMessage(data) && data.type === type;
};

// 导出类型
export type { EventTypeDataMap, MessageData, IframeMessage, BaseMessage };

// 常量
export const MESSAGE_NAMESPACE = "LILYSILK_PCI_IFRAME";
export const ALLOWED_ORIGINS = [
  "http://localhost:3001",
  "https://static-dev.lilysilk.com",
];

// 消息验证函数
export const validateMessageOrigin = (origin: string): boolean => {
  return ALLOWED_ORIGINS.includes(origin);
};
