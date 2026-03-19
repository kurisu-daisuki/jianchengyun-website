# 湖南建诚云信息技术有限公司官网

<p align="center">
  <img src="https://via.placeholder.com/200x80?text=建诚云" alt="建诚云Logo" />
</p>

<p align="center">
  <strong>专业创造价值，服务成就未来</strong>
</p>

<p align="center">
  <a href="#技术栈">技术栈</a> •
  <a href="#功能特性">功能特性</a> •
  <a href="#快速开始">快速开始</a> •
  <a href="#部署">部署</a> •
  <a href="#项目结构">项目结构</a>
</p>

---

## 📋 项目简介

湖南建诚云信息技术有限公司官网，展示公司核心工业软件产品（UKP3D、AIPSA、PHS3D）、项目案例、客户合作案例、公司发展历程及最新活动。

### 主要模块

- 🏠 **首页/Hero** - 公司定位与核心价值主张
- 📦 **产品中心** - 三款核心软件产品展示
- 📁 **项目案例** - 工程项目实例展示
- 🤝 **客户案例** - 合作客户列表
- 📅 **最新活动** - 技术交流会等活动信息
- ℹ️ **关于我们** - 公司发展历程
- 📞 **联系我们** - 联系方式与在线咨询
- ⚙️ **后台管理** - 内容管理系统

---

## 🚀 技术栈

### 前端
- **框架**: React 19 + TypeScript
- **路由**: React Router DOM v6
- **样式**: Tailwind CSS 4 + styled-jsx
- **UI组件**: shadcn/ui
- **构建工具**: Rspack
- **状态管理**: React Hooks + Zustand

### 后端
- **框架**: NestJS 10.x + TypeScript
- **数据库**: PostgreSQL + Drizzle ORM
- **API**: RESTful API
- **模板引擎**: Nunjucks

### 工具
- **代码规范**: ESLint + Prettier
- **类型检查**: TypeScript
- **测试**: Jest
- **CI/CD**: GitHub Actions

---

## ✨ 功能特性

- ✅ 响应式设计，支持移动端/平板/桌面
- ✅ 锚点导航，平滑滚动
- ✅ 后台内容管理系统（CRUD）
- ✅ 产品管理
- ✅ 项目案例管理
- ✅ 客户案例管理
- ✅ 发展历程管理
- ✅ 活动内容管理
- ✅ 导航菜单管理
- ✅ 公司信息配置

---

## 🛠️ 快速开始

### 环境要求

- Node.js >= 22.0.0
- npm >= 10.0.0
- PostgreSQL 数据库

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
# 同时启动前端和后端
npm run dev

# 单独启动后端
npm run dev:server

# 单独启动前端
npm run dev:client
```

### 构建

```bash
# 构建生产版本
npm run build

# 单独构建后端
npm run build:server

# 单独构建前端
npm run build:client
```

### 启动生产环境

```bash
npm start
```

---

## 📦 部署

### 使用 GitHub Actions 自动部署

项目已配置 GitHub Actions 工作流，支持自动部署到服务器：

1. 在 GitHub 仓库设置中添加以下 Secrets：
   - `SERVER_HOST` - 服务器地址
   - `SERVER_USER` - SSH用户名
   - `SERVER_KEY` - SSH私钥
   - `DEPLOY_PATH` - 部署路径

2. 推送代码到 `main` 分支即可触发自动部署

### 手动部署

```bash
# 1. 构建项目
npm run build:prod

# 2. 上传到服务器
scp -r dist/ user@server:/path/to/app

# 3. 在服务器上启动
npm start
```

---

## 📁 项目结构

```
├── client/                 # 前端代码
│   ├── src/
│   │   ├── api/           # API请求
│   │   ├── components/    # 组件
│   │   │   ├── ui/        # shadcn/ui组件
│   │   │   └── business-ui/  # 业务组件
│   │   ├── pages/         # 页面
│   │   │   ├── HomePage/  # 首页
│   │   │   └── AdminPage/ # 后台管理
│   │   ├── hooks/         # 自定义Hooks
│   │   └── utils/         # 工具函数
│   ├── index.html
│   └── public/            # 静态资源
│
├── server/                # 后端代码
│   ├── modules/           # 业务模块
│   │   ├── content/       # 内容管理模块
│   │   └── view/          # 视图渲染
│   ├── database/          # 数据库Schema
│   └── common/            # 通用工具
│
├── shared/                # 前后端共享类型
│   └── api.interface.ts   # API类型定义
│
├── .github/               # GitHub配置
│   └── workflows/         # Actions工作流
│
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔧 数据库配置

数据库表结构由 `server/database/schema.ts` 定义，包含以下表：

- `company_info` - 公司信息
- `product` - 产品信息
- `project_case` - 项目案例
- `client_case` - 客户案例
- `company_timeline` - 发展历程
- `service_item` - 服务内容
- `event` - 活动信息
- `nav_menu` - 导航菜单

---

## 📝 代码规范

```bash
# 代码检查
npm run lint

# 类型检查
npm run type:check

# 格式化代码
npm run format
```

---

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

---

## 📄 许可证

本项目私有，版权归湖南建诚云信息技术有限公司所有。

---

## 📞 联系方式

- **公司**: 湖南建诚云信息技术有限公司
- **电话**: 0731-82807418 / 13975800230
- **邮箱**: 281750153@qq.com
- **地址**: 湖南省长沙市岳麓区杜鹃路99号天骄福邸综合楼北栋25层

---

<p align="center">
  Made with ❤️ by 建诚云技术团队
</p>
