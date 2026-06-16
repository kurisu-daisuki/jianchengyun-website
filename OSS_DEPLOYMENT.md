# 阿里云 OSS 静态网站部署指南

> ✅ 本项目已改造为**纯静态网站**，可直接部署到阿里云 OSS，无需后端服务器。

## 改造说明

项目已完成以下全静态化改造：

| 改造项 | 说明 |
|--------|------|
| 数据内嵌 | 产品、时间线等数据从 API 调用改为 `client/src/data/static-content.ts` 静态文件 |
| Hash 路由 | `BrowserRouter` → `HashRouter`（OSS 无需服务端路由支持） |
| 模板变量 | 去除 `index.html` 中的 Handlebars 模板变量 `__platform__` |
| 零后端依赖 | 前端不再请求 NestJS API，可独立运行 |

> 📝 **更新网站内容**：只需修改 `client/src/data/static-content.ts` 和 `HomePage.tsx` 中的硬编码数据，重新构建部署即可。

---

## 前置准备

### 1. 阿里云 OSS 资源准备

| 资源 | 说明 |
|------|------|
| OSS Bucket | 用于存放静态文件，建议名称：`jianchengyun` |
| Bucket 地域 | 选择离目标用户最近的地域（如 `oss-cn-shenzhen`） |
| 读写权限 | 设置为**公共读** |
| 静态网站托管 | 在 Bucket 基础设置中开启 |
| 默认首页 | `index.html` |
| 默认 404 页 | `index.html`（HashRouter 回退） |

### 2. 安装 ossutil 工具

```bash
# Windows (PowerShell):
Invoke-WebRequest -Uri "https://gosspublic.alicdn.com/ossutil/1.7.19/ossutil-v1.7.19-windows-amd64.zip" -OutFile "$env:TEMP\ossutil.zip"
Expand-Archive -Path "$env:TEMP\ossutil.zip" -DestinationPath "C:\ossutil"
[Environment]::SetEnvironmentVariable("PATH", $env:PATH + ";C:\ossutil", "User")

# macOS/Linux:
curl -L https://gosspublic.alicdn.com/ossutil/1.7.19/ossutil-v1.7.19-linux-amd64.zip -o /tmp/ossutil.zip
unzip /tmp/ossutil.zip -d /usr/local/bin/
chmod +x /usr/local/bin/ossutil
```

### 3. 配置 ossutil

```bash
ossutil config
```

按提示输入：
- **AccessKey ID**：阿里云 RAM 用户的 AccessKey
- **AccessKey Secret**：对应的 Secret
- **Endpoint**：如 `oss-cn-shenzhen.aliyuncs.com`

> ⚠️ 建议使用 RAM 子账号，仅授予 OSS 读写权限。

---

## 一键部署

```bash
# macOS / Linux
npm run build:oss && npm run deploy:oss

# Windows PowerShell
npm run build:oss && npm run deploy:oss:win
```

部署脚本会自动：
1. 构建前端静态文件到 `dist/client/`
2. 上传 JS/CSS/图片（带长期缓存头）
3. 上传 HTML（不带缓存，确保即时更新）

---

## 手动部署

### 步骤 1：构建

```bash
npm run build:oss
# 产物在 dist/client/ 目录
```

### 步骤 2：上传

```bash
# JS/CSS/图片 - 长期缓存
ossutil cp -r dist/client/ oss://jianchengyun/ --update --meta "Cache-Control:public,max-age=31536000,immutable" --include "*.js" --include "*.css" --include "*.svg" --include "*.png"

# HTML - 不缓存
ossutil cp -r dist/client/ oss://jianchengyun/ --update --meta "Cache-Control:no-cache" --include "*.html"
```

### 步骤 3：配置 OSS 静态网站托管

1. 登录 [OSS 控制台](https://oss.console.aliyun.com/)
2. 进入 Bucket → **数据管理** → **静态页面**
3. 配置：
   - **默认首页**：`index.html`
   - **默认 404 页**：`index.html`

### 步骤 4（可选）：绑定自定义域名 + CDN + HTTPS

1. **CDN 加速**：在 OSS 控制台开启 CDN 加速
2. **自定义域名**：CNAME 解析到 CDN 域名
3. **HTTPS**：在 CDN 控制台申请免费 SSL 证书
4. **缓存配置**：
   - HTML 文件：缓存 0 秒
   - JS/CSS 文件：缓存 365 天
   - 图片：缓存 30 天

---

## 构建产物

```
dist/client/
├── index.html          # 入口页面（HashRouter SPA）
├── main.js             # 主 JS bundle
├── main.css            # 主 CSS
├── main.legacy.css     # 旧浏览器兼容 CSS
├── polyfills.js        # 旧浏览器 polyfill
├── favicon.svg         # 网站图标
└── routes.json         # 路由清单
```

---

## 更新网站内容

1. 编辑 `client/src/data/static-content.ts` 修改产品、时间线数据
2. 编辑 `client/src/pages/HomePage/HomePage.tsx` 修改页面文案
3. 运行 `npm run build:oss && npm run deploy:oss` 重新部署

---

## GitHub Actions 自动部署（可选）

创建 `.github/workflows/deploy-oss.yml`：

```yaml
name: Deploy to OSS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build:oss
      - name: Setup ossutil
        run: |
          curl -L https://gosspublic.alicdn.com/ossutil/1.7.19/ossutil-v1.7.19-linux-amd64.zip -o /tmp/ossutil.zip
          unzip /tmp/ossutil.zip -d /usr/local/bin/
          chmod +x /usr/local/bin/ossutil
          ossutil config -e ${{ secrets.OSS_ENDPOINT }} -i ${{ secrets.OSS_ACCESS_KEY_ID }} -k ${{ secrets.OSS_ACCESS_KEY_SECRET }}
      - name: Upload to OSS
        run: bash ./scripts/deploy-oss.sh
```

---

## 成本估算

| 资源 | 配置 | 预估月费用 |
|------|------|-----------|
| OSS 存储 | 100MB 标准存储 | ≈ ¥0.01 |
| OSS 外网流量 | 10GB/月 | ≈ ¥2.5 |
| CDN 流量 | 50GB/月 | ≈ ¥7.5 |
| **合计** | | **≈ ¥10/月** |

> 🎉 **无需 ECS 服务器，月费仅约 ¥10！**

---

## 常见问题

### Q: 部署后页面空白？
- 检查浏览器控制台 JS 错误
- 确认 OSS Bucket 权限为「公共读」
- 确认静态页面默认首页为 `index.html`

### Q: 刷新页面后 404？
- 确认 OSS 默认 404 页设置为 `index.html`
- 本项目使用 HashRouter，正常情况不会出现此问题

### Q: 文件更新后未生效？
- HTML 文件设置了 `Cache-Control: no-cache`
- 若配置了 CDN，需刷新 CDN 缓存
