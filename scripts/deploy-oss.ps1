# ============================================================
# OSS 静态网站构建 & 部署脚本 (Windows PowerShell)
# 用法: .\scripts\deploy-oss.ps1
# ============================================================
param(
    [string]$Bucket = "jianchengyun",
    [string]$Region = "oss-cn-shenzhen"
)

$ErrorActionPreference = "Stop"
$RootDir = $PSScriptRoot | Split-Path -Parent
$DistDir = "$RootDir\dist\client"
$Endpoint = "${Region}.aliyuncs.com"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  🚀 湖南建诚云 - OSS 静态网站部署" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# 步骤 1: 构建前端
Write-Host "📦 [1/3] 构建前端静态文件..." -ForegroundColor Yellow
Push-Location $RootDir
$env:NODE_ENV = "production"
npx rspack build --config rspack.config.js --env mode=production

# 修复 HTML 模板变量
node scripts/fix-html-oss.js

Pop-Location
Write-Host "   ✅ 构建完成 → $DistDir" -ForegroundColor Green
Write-Host ""

# 步骤 2: 列出产物
Write-Host "📋 [2/3] 构建产物:" -ForegroundColor Yellow
Get-ChildItem $DistDir | ForEach-Object {
    $size = [math]::Round($_.Length / 1KB, 1)
    Write-Host "   $($_.Name) (${size}KB)"
}
Write-Host ""

# 步骤 3: 上传至 OSS
Write-Host "☁️  [3/3] 上传至 oss://${Bucket}/ ..." -ForegroundColor Yellow

# JS/CSS/图片等带 hash 的文件 - 长期缓存
ossutil cp -r "$DistDir\" "oss://${Bucket}/" `
    --update `
    --endpoint "$Endpoint" `
    --meta "Cache-Control:public,max-age=31536000,immutable" `
    --include "*.js" --include "*.css" --include "*.svg" --include "*.png" --include "*.jpg" --include "*.webp"

# HTML 文件 - 不缓存
ossutil cp -r "$DistDir\" "oss://${Bucket}/" `
    --update `
    --endpoint "$Endpoint" `
    --meta "Cache-Control:no-cache" `
    --include "*.html"

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  ✅ 部署完成！" -ForegroundColor Green
Write-Host "  🌐 OSS 访问地址: https://${Bucket}.${Endpoint}/" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  下一步:" -ForegroundColor White
Write-Host "  1. 在 OSS 控制台开启「静态网站托管」"
Write-Host "  2. 默认首页设为 index.html"
Write-Host "  3. 默认 404 页设为 index.html"
Write-Host "  4. (可选) 绑定自定义域名 + CDN 加速"
