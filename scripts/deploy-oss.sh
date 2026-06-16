#!/usr/bin/env bash
# ============================================================
# OSS 静态网站构建 & 部署脚本
# 用法: ./scripts/deploy-oss.sh
# ============================================================
set -euo pipefail

ROOT_DIR="$(pwd)"
DIST_DIR="$ROOT_DIR/dist/client"

# --------------- 配置（按需修改） ---------------
OSS_BUCKET="${OSS_BUCKET:-jianchengyun}"
OSS_REGION="${OSS_REGION:-oss-cn-shenzhen}"
OSS_ENDPOINT="${OSS_REGION}.aliyuncs.com"
# ------------------------------------------------

echo "=========================================="
echo "  🚀 湖南建诚云 - OSS 静态网站部署"
echo "=========================================="
echo ""

# 步骤 1: 构建前端
echo "📦 [1/3] 构建前端静态文件..."
NODE_ENV=production npx rspack build --config rspack.config.js --env mode=production
echo "   ✅ 构建完成 → $DIST_DIR"
echo ""

# 步骤 2: 列出产物
echo "📋 [2/3] 构建产物:"
ls -lh "$DIST_DIR"/
echo ""

# 步骤 3: 上传至 OSS
echo "☁️  [3/3] 上传至 oss://${OSS_BUCKET}/ ..."

# 上传所有文件，--update 只更新有变化的文件
ossutil cp -r "$DIST_DIR/" "oss://${OSS_BUCKET}/" \
  --update \
  --endpoint "$OSS_ENDPOINT" \
  --meta "Cache-Control:public,max-age=31536000,immutable" \
  --include "*.js" \
  --include "*.css" \
  --include "*.svg" \
  --include "*.png" \
  --include "*.jpg" \
  --include "*.webp"

# HTML 文件不缓存
ossutil cp -r "$DIST_DIR/" "oss://${OSS_BUCKET}/" \
  --update \
  --endpoint "$OSS_ENDPOINT" \
  --meta "Cache-Control:no-cache" \
  --include "*.html"

echo ""
echo "=========================================="
echo "  ✅ 部署完成！"
echo "  🌐 OSS 访问地址: https://${OSS_BUCKET}.${OSS_ENDPOINT}/"
echo "=========================================="
echo ""
echo "  下一步:"
echo "  1. 在 OSS 控制台开启「静态网站托管」"
echo "  2. 默认首页设为 index.html"
echo "  3. 默认 404 页设为 index.html"
echo "  4. (可选) 绑定自定义域名 + CDN 加速"
