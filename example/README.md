# LilySilk Pay SDK Example

这是一个独立的示例项目，用于测试和演示 LilySilk Pay SDK 的功能。

## 🏗️ **项目架构说明**

### **使用构建后的 SDK 包（推荐）**

本项目使用构建后的 SDK 包进行开发和测试：

```typescript
// ✅ 从构建的SDK包导入
import LilyPaySDK from "lilysilk-pay-sdk-web";
```

**优势：**

- 🎯 **真实用户体验** - 测试实际构建输出，而非源码
- 🔧 **构建验证** - 确保构建过程和导出配置正确
- 📦 **发布准备** - 模拟真实的包使用场景
- 🐛 **问题发现** - 及早发现构建相关的问题

### **依赖配置**

```json
{
  "dependencies": {
    "lilysilk-pay-sdk-web": "file:.."
  }
}
```

SDK 包通过 `file:..` 链接到父目录，确保始终使用最新构建版本。

## 🚀 **快速开始**

### 1. 安装依赖

```bash
yarn install
```

### 2. 确保 SDK 已构建

```bash
cd .. && yarn build && cd example
```

### 3. 启动开发服务器

```bash
yarn dev
```

### 4. 访问应用

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 📱 **功能特性**

### **两个主要界面：**

1. **🏪 Complete SDK** - 完整 SDK 组件展示

   - 展示整个 LilyPaySDK 组件
   - 测试主要用户界面
   - 所有支付提供商集成在一个组件中

2. **💳 Payment Demo** - 支付流程演示
   - 交互式支付配置
   - 多币种支持（USD、EUR、GBP、CNY、JPY）
   - 客户信息表单
   - 订单 ID 生成
   - 使用完整的 LilyPaySDK 组件

### **智能特性：**

- 优雅的错误处理
- 懒加载支付组件
- 自动失败隐藏

## 🔧 **开发工具**

- **热重载** - 修改代码立即生效
- **TypeScript** - 完整类型支持
- **错误边界** - 防止崩溃
- **开发调试** - 详细的控制台日志

## 📦 **SDK 包集成详细说明**

### **更新流程：**

1. **修改 SDK 源码** (在父目录)
2. **重新构建 SDK：**
   ```bash
   cd .. && yarn build
   ```
3. **重新安装依赖：**
   ```bash
   yarn install
   ```
4. **重启开发服务器：**
   ```bash
   yarn dev
   ```

### **简化的导入方式：**

```typescript
// ✅ 简洁导入完整SDK
import LilyPaySDK from "lilysilk-pay-sdk-web";

// 在组件中使用
<LilyPaySDK />;
```

## 🔄 **开发工作流程**

1. **SDK 开发** → 在父目录修改源码
2. **构建测试** → `yarn build` 生成分发包
3. **集成测试** → 在 example 项目中测试构建结果
4. **问题反馈** → 根据测试结果调整 SDK 代码
5. **循环优化** → 重复上述过程直到满意

## 🎨 **界面预览**

- **现代化 UI** - 卡片式布局，响应式设计
- **两个测试页面** - 完整 SDK 展示和交互式 Demo
- **配置面板** - 动态调整支付参数
- **实时预览** - 即时查看配置效果

## 📋 **可用脚本**

```bash
# 开发模式
yarn dev

# 构建生产版本
yarn build

# 预览构建结果
yarn preview

# TypeScript类型检查
yarn type-check
```

## ⚠️ **注意事项**

- 每次修改 SDK 源码后需要重新构建：`cd .. && yarn build`
- 使用 `file:..` 依赖可能需要手动重新安装：`yarn install`
- 开发时建议同时观察浏览器控制台和网络请求
- 如遇到缓存问题，清除浏览器缓存或重启开发服务器

## 🔧 **故障排除**

### **SDK 没有更新？**

```bash
cd .. && yarn build && cd example && yarn install && yarn dev
```

### **TypeScript 错误？**

```bash
yarn type-check
```

### **页面空白？**

- 检查浏览器控制台错误
- 确认 SDK 已正确构建
- 重启开发服务器

---

## 🔗 **相关链接**

- **主 SDK 项目** - `../` (父目录)
- **构建配置** - `../tsup.config.ts`
- **类型定义** - `../dist/index.d.ts`
