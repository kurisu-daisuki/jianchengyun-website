# 推送代码到GitHub - 操作指南

## 前置信息
- GitHub邮箱: 281750153@qq.com
- 请替换下方命令中的 `YOUR_USERNAME` 为您的GitHub用户名

---

## 📋 完整推送步骤

### 1. 打开终端
在项目根目录打开终端（包含 client/ 和 server/ 的文件夹）

### 2. 执行以下命令

```bash
# ========== 步骤1: 配置Git身份 ==========
git config --global user.name "建诚云技术"
git config --global user.email "281750153@qq.com"

# ========== 步骤2: 初始化Git ==========
git init

# ========== 步骤3: 添加所有文件 ==========
git add .

# ========== 步骤4: 提交更改 ==========
git commit -m "Initial commit: 建诚云官网完整项目

- 添加前端React网站
- 添加后台管理系统
- 添加GitHub Actions自动部署配置
- 添加项目文档"

# ========== 步骤5: 设置分支名 ==========
git branch -M main

# ========== 步骤6: 连接远程仓库 ==========
# ⚠️ 请替换 YOUR_USERNAME 为您的GitHub用户名
git remote add origin https://github.com/YOUR_USERNAME/jianchengyun-website.git

# ========== 步骤7: 推送到GitHub ==========
git push -u origin main
```

---

## 🔐 身份验证

执行 `git push` 时会要求登录：

### 方式一：HTTPS（推荐新手）
- 用户名：您的GitHub用户名
- 密码：使用 **Personal Access Token**（不是登录密码）

**如何获取Token：**
1. 登录GitHub → Settings → Developer settings → Personal access tokens
2. 点击 Generate new token (classic)
3. 勾选 `repo` 权限
4. 生成后复制token作为密码

### 方式二：SSH（推荐长期使用）
```bash
# 生成SSH密钥
ssh-keygen -t ed25519 -C "281750153@qq.com"

# 查看并复制公钥
cat ~/.ssh/id_ed25519.pub

# 添加到GitHub：
# GitHub → Settings → SSH and GPG keys → New SSH key
```

---

## ✅ 验证推送成功

推送完成后，在浏览器访问：
```
https://github.com/YOUR_USERNAME/jianchengyun-website
```

应该能看到所有文件：
- client/ (前端代码)
- server/ (后端代码)
- .github/ (GitHub配置)
- README.md
- 等等

---

## ❓ 常见问题

### 问题1：远程仓库已存在
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/jianchengyun-website.git
```

### 问题2：推送被拒绝（非快进）
```bash
git pull origin main --rebase
git push origin main
```

### 问题3：权限 denied
- 检查Token是否有 `repo` 权限
- 检查仓库是否为Public或您有权限访问

---

## 🚀 配置自动部署（可选）

推送成功后，配置GitHub Secrets实现自动部署：

1. 打开仓库页面 → Settings → Secrets and variables → Actions
2. 点击 "New repository secret" 添加：
   - `SERVER_HOST` = 您的服务器IP
   - `SERVER_USER` = root (或您的用户名)
   - `SERVER_KEY` = SSH私钥内容
   - `DEPLOY_PATH` = /var/www/jianchengyun (部署路径)

---

## 📞 需要帮助？

如果在执行过程中遇到任何错误，请复制错误信息发送给我。
