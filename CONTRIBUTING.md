# 贡献指南

感谢您对湖南建诚云信息技术有限公司官网项目的关注！本文档将帮助您了解如何为该项目做出贡献。

## 开发流程

### 1. Fork 和 Clone

```bash
# Fork 本仓库到您的 GitHub 账户
# 然后 Clone 您的 Fork
git clone https://github.com/YOUR_USERNAME/jianchengyun-website.git
cd jianchengyun-website
```

### 2. 安装依赖

```bash
npm install
```

### 3. 创建分支

```bash
git checkout -b feature/your-feature-name
```

### 4. 开发

- 遵循现有的代码风格
- 确保代码通过所有测试
- 更新相关文档

### 5. 提交更改

```bash
git add .
git commit -m "feat: 添加新功能描述"
git push origin feature/your-feature-name
```

### 6. 创建 Pull Request

在 GitHub 上创建 Pull Request，并填写 PR 模板。

## 代码规范

### 命名约定

- **文件**: 组件使用 PascalCase（如 `HomePage.tsx`），其他使用 camelCase
- **变量**: camelCase
- **常量**: UPPER_SNAKE_CASE
- **类型/接口**: PascalCase

### 代码风格

- 使用 TypeScript 严格模式
- 使用函数组件和 Hooks
- 避免使用 `any` 类型
- 组件文件不超过 500 行

### Git 提交规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat:` 新功能
- `fix:` Bug 修复
- `docs:` 文档更新
- `style:` 代码格式（不影响功能）
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建过程或辅助工具的变动

示例：
```
feat: 添加产品搜索功能
fix: 修复移动端导航栏显示问题
docs: 更新 API 文档
```

## 项目结构

```
client/          # 前端代码
├── src/
│   ├── pages/   # 页面组件
│   ├── api/     # API 请求
│   └── components/  # 可复用组件

server/          # 后端代码
├── modules/     # 业务模块
└── database/    # 数据库相关

shared/          # 共享类型
└── api.interface.ts
```

## 测试

```bash
# 运行所有测试
npm test

# 运行测试并监视
npm run test:watch

# 运行端到端测试
npm run test:e2e
```

## 问题反馈

如果您发现 Bug 或有功能建议，请：

1. 检查是否已有相关问题
2. 如果没有，创建新的 Issue
3. 使用提供的 Issue 模板
4. 提供详细的复现步骤

## 联系方式

如有任何问题，请联系：
- 邮箱: 281750153@qq.com

## 许可证

本项目私有，版权归湖南建诚云信息技术有限公司所有。
