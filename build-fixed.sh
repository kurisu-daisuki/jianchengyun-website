#!/bin/bash
# 修复版构建脚本 - 顺序构建防止超时

set -e

echo "🔨 开始构建 (顺序模式)..."

# 设置 Node 内存限制
export NODE_OPTIONS="--max-old-space-size=4096"

# 先构建服务端
echo "📦 [1/2] 构建 Server..."
npm run build:server

# 再构建客户端
echo "📦 [2/2] 构建 Client..."
npm run build:client

echo "✅ 构建完成！"
