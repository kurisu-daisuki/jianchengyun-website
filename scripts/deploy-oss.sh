#!/usr/bin/env bash
# ============================================================
# 🚀 湖南建诚云 - 阿里云 OSS 一键部署脚本
# ============================================================
# 前置条件：
#   1. 安装 ossutil（阿里云命令行工具）
#      macOS: brew install ossutil
#      Linux: 从 https://www.alibabacloud.com/help/zh/oss/developer-reference/install-ossutil 下载
#   2. 配置 ossutil：
#      ossutil config -e oss-cn-shenzhen.aliyuncs.com -i YOUR_ACCESS_KEY -k YOUR_SECRET_KEY
#   3. 在 OSS 控制台创建 Bucket 并开启「静态网站托管」
# ============================================================
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DIST_DIR="$ROOT_DIR/dist/client"

# --------------- 📋 配置（按需修改） ---------------
OSS_BUCKET="${OSS_BUCKET:-jianchengyun}"
OSS_REGION="${OSS_REGION:-oss-cn-shenzhen}"
OSS_ENDPOINT="${OSS_REGION}.aliyuncs.com"
# ------------------------------------------------

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
BOLD='\033[1m'
NC='\033[0m'

echo -e "${CYAN}${BOLD}=========================================="
echo -e "  🚀 湖南建诚云 - OSS 静态网站部署"
echo -e "==========================================${NC}"
echo ""

# ============================================================
# 步骤 0️⃣ 环境检查
# ============================================================
echo -e "${YELLOW}🔍 [0/4] 检查部署环境...${NC}"

# 检查 ossutil 是否安装
if ! command -v ossutil &> /dev/null; then
    echo -e "${RED}❌ 未检测到 ossutil，请先安装：${NC}"
    echo ""
    echo "  macOS:"
    echo "    brew install ossutil"
    echo ""
    echo "  Linux:"
    echo "    curl -L https://gosspublic.alicdn.com/ossutil/1.7.19/ossutil-v1.7.19-linux-amd64.zip -o /tmp/ossutil.zip"
    echo "    unzip /tmp/ossutil.zip -d /usr/local/bin/"
    echo "    chmod +x /usr/local/bin/ossutil"
    echo ""
    echo "  Windows (PowerShell):"
    echo "    Invoke-WebRequest -Uri 'https://gosspublic.alicdn.com/ossutil/1.7.19/ossutil-v1.7.19-windows-amd64.zip' -OutFile '\$env:TEMP\\\\ossutil.zip'"
    echo "    Expand-Archive -Path '\$env:TEMP\\\\ossutil.zip' -DestinationPath 'C:\\\\ossutil'"
    exit 1
fi

# 检查 ossutil 配置是否有效
if ! ossutil ls "oss://${OSS_BUCKET}" --endpoint "$OSS_ENDPOINT" &> /dev/null; then
    echo -e "${RED}❌ ossutil 未正确配置或 Bucket 不可访问${NC}"
    echo ""
    echo "  请先配置 ossutil："
    echo "    ossutil config -e ${OSS_ENDPOINT} -i YOUR_ACCESS_KEY_ID -k YOUR_ACCESS_KEY_SECRET"
    echo ""
    echo "  然后在阿里云 OSS 控制台创建 Bucket: ${OSS_BUCKET}"
    echo "  地域: ${OSS_REGION}"
    echo "  访问: https://oss.console.aliyun.com/"
    exit 1
fi

echo -e "   ${GREEN}✅ ossutil 已安装并正确配置${NC}"
echo ""

# ============================================================
# 步骤 1️⃣ 构建前端静态文件
# ============================================================
echo -e "${YELLOW}📦 [1/4] 构建前端静态文件...${NC}"
cd "$ROOT_DIR"

# 清理旧构建产物
rm -rf "$DIST_DIR"

# 构建前端（仅客户端）
NODE_ENV=production npx rspack build --config rspack.config.js --env mode=production

# 修复 HTML 中的 Handlebars 模板变量（替换为静态值）
if [ -f scripts/fix-html-oss.js ]; then
  node scripts/fix-html-oss.js
fi

echo -e "   ${GREEN}✅ 构建完成 → $DIST_DIR${NC}"
echo ""

# ============================================================
# 步骤 2️⃣ 列出构建产物
# ============================================================
echo -e "${YELLOW}📋 [2/4] 构建产物清单:${NC}"
TOTAL_SIZE=$(du -sh "$DIST_DIR" 2>/dev/null | cut -f1 || echo "未知")
echo "   总计: ${TOTAL_SIZE}"

if [ -d "$DIST_DIR" ]; then
    find "$DIST_DIR" -maxdepth 1 -type f | while read -r file; do
        local_size=$(du -h "$file" | cut -f1)
        echo "   ├── $(basename "$file") (${local_size})"
    done
fi
echo ""

# ============================================================
# 步骤 3️⃣ 上传到 OSS
# ============================================================
echo -e "${YELLOW}☁️  [3/4] 上传文件至 oss://${OSS_BUCKET}/ ...${NC}"

# 上传 JS/CSS/字体/图片等带 hash 的静态资源（长期缓存，1年）
echo "   📤 上传静态资源（JS/CSS/图片/字体）..."
ossutil cp -r "$DIST_DIR/" "oss://${OSS_BUCKET}/" \
    --update \
    --endpoint "$OSS_ENDPOINT" \
    --meta "Cache-Control:public,max-age=31536000,immutable" \
    --include "*.js" \
    --include "*.css" \
    --include "*.svg" \
    --include "*.png" \
    --include "*.jpg" \
    --include "*.jpeg" \
    --include "*.webp" \
    --include "*.gif" \
    --include "*.ico" \
    --include "*.woff" \
    --include "*.woff2" \
    --include "*.ttf"

# 上传 HTML 文件（不缓存，确保即时更新）
echo "   📤 上传 HTML 文件..."
ossutil cp -r "$DIST_DIR/" "oss://${OSS_BUCKET}/" \
    --update \
    --endpoint "$OSS_ENDPOINT" \
    --meta "Cache-Control:no-cache" \
    --include "*.html"

# 上传其他文件
echo "   📤 上传其他文件..."
ossutil cp -r "$DIST_DIR/" "oss://${OSS_BUCKET}/" \
    --update \
    --endpoint "$OSS_ENDPOINT" \
    --meta "Cache-Control:public,max-age=86400" \
    --exclude "*.js" \
    --exclude "*.css" \
    --exclude "*.svg" \
    --exclude "*.png" \
    --exclude "*.jpg" \
    --exclude "*.jpeg" \
    --exclude "*.webp" \
    --exclude "*.gif" \
    --exclude "*.ico" \
    --exclude "*.woff" \
    --exclude "*.woff2" \
    --exclude "*.ttf" \
    --exclude "*.html"

echo -e "   ${GREEN}✅ 上传完成${NC}"
echo ""

# ============================================================
# 步骤 4️⃣ 验证部署
# ============================================================
echo -e "${YELLOW}🔬 [4/4] 验证部署结果...${NC}"

OSS_URL="https://${OSS_BUCKET}.${OSS_ENDPOINT}/index.html"
if command -v curl &> /dev/null; then
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$OSS_URL" 2>/dev/null || echo "000")
    if [ "$HTTP_CODE" = "200" ]; then
        echo -e "   ${GREEN}✅ index.html 可正常访问 (HTTP ${HTTP_CODE})${NC}"
    else
        echo -e "   ${YELLOW}⚠️  index.html 返回 HTTP ${HTTP_CODE}${NC}"
        echo "      请确保 OSS Bucket 权限为「公共读」并开启「静态网站托管」"
    fi
fi
echo ""

# ============================================================
# ✅ 部署完成
# ============================================================
echo -e "${GREEN}${BOLD}=========================================="
echo -e "  ✅ 部署完成！"
echo -e "==========================================${NC}"
echo ""
echo -e "  🌐 访问地址: ${BOLD}https://${OSS_BUCKET}.${OSS_ENDPOINT}/${NC}"
echo ""
echo -e "  📌 ${BOLD}下一步操作：${NC}"
echo ""
echo -e "  1. ${YELLOW}开启静态网站托管${NC}"
echo "     OSS 控制台 → 选中 Bucket → 数据管理 → 静态页面"
echo "     - 默认首页: index.html"
echo "     - 默认 404 页: index.html (SPA 路由回退)"
echo ""
echo -e "  2. ${YELLOW}设置 Bucket 权限为「公共读」${NC}"
echo ""
echo -e "  3. ${YELLOW}（推荐）配置 CDN 加速 + 自定义域名${NC}"
echo "     参考: https://help.aliyun.com/document_detail/31868.html"
echo ""
echo -e "  💡 ${CYAN}后续更新网站只需重新运行此脚本即可！${NC}"
