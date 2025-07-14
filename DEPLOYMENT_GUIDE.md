# LilySilk Pay SDK 部署指南

本指南将帮助你发布 SDK 到 GitHub 并部署示例项目到 GitHub Pages。

## 前置要求

1. **GitHub 仓库设置**

   - 确保仓库已创建并推送到 GitHub
   - 更新 `packages/sdk/package.json` 中的 repository URL
   - 更新 `packages/example/vite.config.ts` 中的 base 路径

2. **GitHub Pages 设置**
   - 前往 GitHub 仓库 → Settings → Pages
   - Source 选择 "GitHub Actions"
   - 保存设置

## 发布 SDK 到 GitHub

### 1. 创建新版本发布

```bash
# 补丁版本更新 (0.0.1 → 0.0.2)
pnpm release:patch

# 小版本更新 (0.0.1 → 0.1.0)
pnpm release:minor

# 大版本更新 (0.0.1 → 1.0.0)
pnpm release:major
```

### 2. 推送到 GitHub 触发构建

```bash
# 推送代码和标签，触发 GitHub Actions
pnpm publish:sdk
```

这将：

- 推送代码到 main 分支
- 推送版本标签
- 自动触发 GitHub Actions 构建
- 创建 Release 并附加构建产物

### 3. 验证发布

1. 前往 GitHub 仓库的 "Releases" 页面
2. 确认新版本已创建
3. 下载并检查构建产物

## 部署示例项目到 GitHub Pages

### 自动部署

每当推送到 main 分支时，GitHub Actions 会自动：

- 构建 SDK
- 构建示例项目
- 部署到 GitHub Pages

```bash
# 触发 Pages 部署
pnpm deploy:pages
```

### 手动触发

也可以在 GitHub 仓库的 Actions 页面手动触发 "Deploy Example to GitHub Pages" 工作流。

## 在其他项目中使用 SDK

### 1. 通过 GitHub URL 安装

```bash
# 安装最新版本
npm install git+https://github.com/lilysilk/pay-sdk-web.git

# 安装特定版本
npm install git+https://github.com/lilysilk/pay-sdk-web.git#v0.0.2

# 使用 pnpm
pnpm add git+https://github.com/lilysilk/pay-sdk-web.git#v0.0.2
```

### 2. 在 package.json 中声明

```json
{
  "dependencies": {
    "lilysilk-pay-sdk-web": "git+https://github.com/lilysilk/pay-sdk-web.git#v0.0.2"
  }
}
```

### 3. 私有仓库访问

如果是私有仓库，需要配置 GitHub 访问权限：

```bash
# 使用 SSH
npm install git+ssh://git@github.com/lilysilk/pay-sdk-web.git#v0.0.2

# 使用 Personal Access Token
npm install git+https://username:token@github.com/lilysilk/pay-sdk-web.git#v0.0.2
```

## 工作流程说明

### SDK 发布工作流 (.github/workflows/build-sdk.yml)

触发条件：

- 推送版本标签 (v\*)
- 手动触发

执行步骤：

1. 安装依赖
2. 类型检查
3. 构建 SDK
4. 打包构建产物
5. 创建 GitHub Release

### Pages 部署工作流 (.github/workflows/deploy-pages.yml)

触发条件：

- 推送到 main/master 分支
- 手动触发

执行步骤：

1. 安装依赖
2. 构建 SDK
3. 构建示例项目
4. 部署到 GitHub Pages

## 常见问题

### Q: 如何更新已发布的版本？

A: 发布新的版本标签即可，不建议修改已存在的标签。

### Q: 构建失败怎么办？

A: 检查 GitHub Actions 日志，常见问题：

- 依赖安装失败
- TypeScript 类型错误
- 构建配置问题

### Q: pnpm lockfile 兼容性错误？

A: 如果遇到 `ERR_PNPM_NO_LOCKFILE` 或 lockfile 版本不兼容错误：

- 确保 GitHub Actions 中的 pnpm 版本与本地版本兼容
- 本地使用 pnpm 10+ 时，GitHub Actions 也应使用 pnpm 10+
- 可以运行 `pnpm install --no-frozen-lockfile` 来绕过 lockfile 检查（不推荐生产环境）

### Q: 如何撤回发布？

A: 在 GitHub Releases 页面删除对应的 Release，但建议发布新版本而不是撤回。

### Q: Pages 部署失败？

A: 确认：

- GitHub Pages 已启用
- 工作流有正确的权限
- 构建产物路径正确

## 下一步

1. ✅ 已更新为正确的 GitHub 仓库地址 `lilysilk/pay-sdk-web`
2. ✅ 已调整 base 路径和 repository URL
3. 测试完整的发布流程
4. 文档化 API 使用方法

## 维护

- 定期更新依赖
- 监控 GitHub Actions 状态
- 关注安全更新
- 维护文档和示例
