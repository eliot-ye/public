# Public 仓库的 Copilot 指令

## 项目概述
此仓库从 TypeScript 类型定义生成 JSON 模式，用于应用控制配置。它支持多个应用（如 PPG、ledger-light-rn），包括版本控制、警报和环境设置。

## 架构
- **模式生成**：使用 `typescript-json-schema` 将 `JSONSchema/types.d.ts` 中的 TS 类型转换为 `PPG/JSONSchemas/` 或 `GPL/*/` 中的 JSON 模式。
- **类型定义**：`SControlJSON` 是 `ControlItem` 的数组，从外部 PPG-Smarttravel 项目导入。
- **控制结构**：每个 `ControlItem` 为平台（ios、android）定义版本特定的规则，包括警报、阻塞和环境覆盖。

## 关键工作流程
- **生成模式**：运行 `yarn json` 从当前类型更新 JSON 模式。
- **验证**：使用生成的模式（如 `SControlJSON.json`）验证控制 JSON 文件，如 `version_v2.json` 或 `control.json`。

## 约定
- **文件命名**：模式以 TS 类型命名（如 `SControlJSON` → `SControlJSON.json`）。
- **版本控制**：`versionName` 数组支持 "All" 用于全局规则；规则按索引顺序应用（后覆盖）。
- **平台特定性**：`platform` 数组过滤规则；支持 ios、android、macos、web、windows。
- **警报**：`ControlJSONAlert` 支持 i18n（zh-cn、zh-hk、en、tr）；可选 onceId 用于一次性显示。

## 模式
- **环境覆盖**：属性如 `CE_ApiServerList`、`CE_SentryDSN` 允许按版本环境配置。
- **危险环境检测**：`CE_HazardousEnv` 标志如 canMockLocation、isDebuggedMode 等。
- **API 服务器映射**：`NSEnv.CEApiServerItem` 将域名映射到服务端点（Campaign、Member 等）。

## 集成点
- **外部类型**：从 `/Users/eliot.yecn.ey.com/work/PPG-Smarttravel/...` 导入 `ControlItem` – 如果移动则更新路径。
- **应用特定文件夹**：`GPL/` 和 `PPG/` 包含每个应用的控制文件；为新应用镜像结构。

## 示例
- 添加新控制属性：在 `types.d.ts` 中定义，使用 `yarn json` 重新生成，在 `control.json` 中验证。
- 版本特定警报：设置 `versionName: ["1.2.0"]`，`alert: {title: "需要更新"}`，`isBlock: true`。