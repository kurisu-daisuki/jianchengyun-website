# 部署指南

本文档介绍如何将湖南建诚云官网部署到生产环境。

## 部署方式

### 方式一：GitHub Actions 自动部署（推荐）

1. **配置服务器**
   ```bash
   # 在服务器上创建部署目录
   mkdir -p /var/www/jianchengyun
   cd /var/www/jianchengyun
   ```

2. **配置 GitHub Secrets**
   
   在 GitHub 仓库的 Settings -> Secrets and variables -> Actions 中添加：

   | Secret Name | Description |
   |------------|-------------|
   | `SERVER_HOST` | 服务器 IP 或域名 |
   | `SERVER_USER` | SSH 用户名 |
   | `SERVER_KEY` | SSH 私钥（完整内容） |
   | `DEPLOY_PATH` | 服务器上的部署路径（如 `/var/www/jianchengyun`） |

3. **配置 PM2**
   
   在服务器上安装并配置 PM2：
   ```bash
   npm install -g pm2
   
   # 创建 ecosystem 文件
   cat > ecosystem.config.js << 'EOF'
   module.exports = {
     apps: [{
       name: 'jianchengyun',
       script: './main.js',
       instances: 1,
       autorestart: true,
       watch: false,
       max_memory_restart: '1G',
       env: {
         NODE_ENV: 'production',
         PORT: 3000
       },
       error_file: './logs/err.log',
       out_file: './logs/out.log',
       log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
     }]
   };
   EOF
   ```

4. **推送代码触发部署**
   ```bash
   git push origin main
   ```

### 方式二：手动部署

1. **本地构建**
   ```bash
   npm run build:prod
   ```

2. **上传到服务器**
   ```bash
   # 打包
   tar -czf dist.tar.gz dist/ package*.json
   
   # 上传到服务器
   scp dist.tar.gz user@server:/var/www/jianchengyun/
   
   # 解压
   ssh user@server "cd /var/www/jianchengyun && tar -xzf dist.tar.gz"
   ```

3. **安装依赖并启动**
   ```bash
   ssh user@server
   cd /var/www/jianchengyun
   npm ci --production
   npm start
   ```

### 方式三：Docker 部署

1. **构建镜像**
   ```bash
   docker build -t jianchengyun:latest .
   ```

2. **运行容器**
   ```bash
   docker run -d \
     --name jianchengyun \
     -p 3000:3000 \
     -e NODE_ENV=production \
     -e DATABASE_URL=postgresql://user:pass@host/db \
     jianchengyun:latest
   ```

## 环境变量配置

创建 `.env` 文件：

```bash
# 数据库
DATABASE_URL=postgresql://username:password@localhost:5432/jianchengyun

# 服务器
NODE_ENV=production
PORT=3000
```

## Nginx 配置

```nginx
server {
    listen 80;
    server_name jianchengyun.com www.jianchengyun.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# HTTPS 配置（推荐）
server {
    listen 443 ssl http2;
    server_name jianchengyun.com www.jianchengyun.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 数据库迁移

如果需要初始化数据库：

```bash
# 生成 schema
npm run db:generate

# 推送 schema 到数据库
npm run db:push
```

## 监控与日志

### PM2 监控

```bash
# 查看状态
pm2 status

# 查看日志
pm2 logs jianchengyun

# 重启
pm2 restart jianchengyun

# 停止
pm2 stop jianchengyun
```

### 系统服务（systemd）

创建 `/etc/systemd/system/jianchengyun.service`：

```ini
[Unit]
Description=Jianchengyun Website
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/jianchengyun
ExecStart=/usr/bin/node main.js
Restart=on-failure
RestartSec=5
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
```

启用并启动：
```bash
sudo systemctl enable jianchengyun
sudo systemctl start jianchengyun
sudo systemctl status jianchengyun
```

## 备份策略

```bash
# 数据库备份
pg_dump jianchengyun > backup_$(date +%Y%m%d).sql

# 文件备份
tar -czf backup_$(date +%Y%m%d).tar.gz dist/
```

## 故障排查

| 问题 | 解决方案 |
|-----|---------|
| 应用无法启动 | 检查 `npm run type:check` |
| 数据库连接失败 | 检查 DATABASE_URL |
| 端口被占用 | `lsof -i :3000` 然后 kill |
| 权限问题 | `chmod -R 755 /var/www/jianchengyun` |

## 回滚

```bash
# 使用 PM2
pm2 reload jianchengyun --update-env

# 或手动
# 1. 恢复备份
# 2. 重启应用
```
