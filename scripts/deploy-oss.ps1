# ============================================================
# 🚀 湖南建诚云 - 阿里云 OSS 一键部署脚本 (Windows)
# ============================================================
# 前置条件：
#   1. 安装 ossutil（阿里云命令行工具）
#      Invoke-WebRequest -Uri 'https://gosspublic.alicdn.com/ossutil/1.7.19/ossutil-v1.7.19-windows-amd64.zip' -OutFile "$env:TEMP\ossutil.zip"
#      Expand-Archive -Path "$env:TEMP\ossutil.zip" -DestinationPath "C:\ossutil"
#   2. 配置 ossutil：
#      C:\ossutil\ossutil.exe config -e oss-cn-shenzhen.aliyuncs.com -i YOUR_ACCESS_KEY -k YOUR_SECRET_KEY
#   3. 在 OSS 控制台创建 Bucket 并开启「静态网站托管」
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

# ============================================================
# 步骤 0: 环境检查
# ============================================================
Write-Host "🔍 [0/4] 检查部署环境..." -ForegroundColor Yellow

# 检查 ossutil 是否可用
$ossutilCheck = Get-Command ossutil -ErrorAction SilentlyContinue
if (-not $ossutilCheck) {
    # 尝试 C:\ossutil\ossutil.exe
    if (Test-Path "C:\ossutil\ossutil.exe") {
        $env:PATH += ";C:\ossutil"
    } else {
        Write-Host "❌ 未检测到 ossutil，请先安装：" -ForegroundColor Red
        Write-Host ""
        Write-Host "  PowerShell (管理员):"
        Write-Host "    Invoke-WebRequest -Uri 'https://gosspublic.alicdn.com/ossutil/1.7.19/ossutil-v1.7.19-windows-amd64.zip' -OutFile `"`$env:TEMP\ossutil.zip`""
        Write-Host "    Expand-Archive -Path `"`$env:TEMP\ossutil.zip`" -DestinationPath `"C:\ossutil`""
        Write-Host "    [Environment]::SetEnvironmentVariable('PATH', `$env:PATH + ';C:\ossutil', 'User')"
        Write-Host ""
        exit 1
    }
}

Write-Host "   ✅ ossutil 已安装" -ForegroundColor Green
Write-Host ""

# ============================================================
# 步骤 1: 构建前端
# ============================================================
Write-Host "📦 [1/4] 构建前端静态文件..." -ForegroundColor Yellow
Push-Location $RootDir

# 清理旧构建产物
if (Test-Path $DistDir) {
    Remove-Item -Recurse -Force $DistDir
}

$env:NODE_ENV = "production"
npx rspack build --config rspack.config.js --env mode=production

# 修复 HTML 模板变量
if (Test-Path "scripts\fix-html-oss.js") {
    node scripts\fix-html-oss.js
}

Pop-Location
Write-Host "   ✅ 构建完成 → $DistDir" -ForegroundColor Green
Write-Host ""

# ============================================================
# 步骤 2: 列出产物
# ============================================================
Write-Host "📋 [2/4] 构建产物清单:" -ForegroundColor Yellow
$totalSize = 0
Get-ChildItem -Path $DistDir -File | ForEach-Object {
    $sizeKB = [math]::Round($_.Length / 1KB, 1)
    $totalSize += $_.Length
    Write-Host "   ├── $($_.Name) ($sizeKB KB)"
}
$totalMB = [math]::Round($totalSize / 1MB, 2)
Write-Host "   总计: $totalMB MB" -ForegroundColor White
Write-Host ""

# ============================================================
# 步骤 3: 上传到 OSS
# ============================================================
Write-Host "☁️  [3/4] 上传文件至 oss://${Bucket}/ ..." -ForegroundColor Yellow

# 上传 JS/CSS/字体/图片等静态资源（长期缓存）
Write-Host "   📤 上传静态资源（JS/CSS/图片/字体）..."
ossutil cp -r "$DistDir\" "oss://${Bucket}/" `
    --update `
    --endpoint "$Endpoint" `
    --meta "Cache-Control:public,max-age=31536000,immutable" `
    --include "*.js" --include "*.css" `
    --include "*.svg" --include "*.png" --include "*.jpg" --include "*.jpeg" --include "*.webp" --include "*.gif" --include "*.ico" `
    --include "*.woff" --include "*.woff2" --include "*.ttf"

# 上传 HTML 文件（不缓存）
Write-Host "   📤 上传 HTML 文件..."
ossutil cp -r "$DistDir\" "oss://${Bucket}/" `
    --update `
    --endpoint "$Endpoint" `
    --meta "Cache-Control:no-cache" `
    --include "*.html"

# 上传其他文件
Write-Host "   📤 上传其他文件..."
ossutil cp -r "$DistDir\" "oss://${Bucket}/" `
    --update `
    --endpoint "$Endpoint" `
    --meta "Cache-Control:public,max-age=86400" `
    --exclude "*.js" --exclude "*.css" `
    --exclude "*.svg" --exclude "*.png" --exclude "*.jpg" --exclude "*.jpeg" --exclude "*.webp" --exclude "*.gif" --exclude "*.ico" `
    --exclude "*.woff" --exclude "*.woff2" --exclude "*.ttf" `
    --exclude "*.html"

Write-Host "   ✅ 上传完成" -ForegroundColor Green
Write-Host ""

# ============================================================
# 步骤 4: 验证部署结果
# ============================================================
Write-Host "🔬 [4/4] 验证部署结果..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://${Bucket}.${Endpoint}/index.html" -Method Head -TimeoutSec 10 -ErrorAction Stop
    Write-Host "   ✅ index.html 可正常访问 (HTTP $($response.StatusCode))" -ForegroundColor Green
} catch {
    Write-Host "   ⚠️  index.html 访问异常: $($_.Exception.Message)" -ForegroundColor Yellow
    Write-Host "      请确保 OSS Bucket 权限为「公共读」并开启「静态网站托管」" -ForegroundColor Yellow
}
Write-Host ""

# ============================================================
# ✅ 部署完成
# ============================================================
Write-Host "==========================================" -ForegroundColor Green
Write-Host "  ✅ 部署完成！" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""
Write-Host "  🌐 访问地址: " -NoNewline
Write-Host "https://${Bucket}.${Endpoint}/" -ForegroundColor Cyan
Write-Host ""
Write-Host "  📌 下一步操作：" -ForegroundColor White
Write-Host ""
Write-Host "  1. 开启静态网站托管" -ForegroundColor Yellow
Write-Host "     OSS 控制台 → 选中 Bucket → 数据管理 → 静态页面"
Write-Host "     - 默认首页: index.html"
Write-Host "     - 默认 404 页: index.html"
Write-Host ""
Write-Host "  2. 设置 Bucket 权限为「公共读」" -ForegroundColor Yellow
Write-Host ""
Write-Host "  3. (推荐) 配置 CDN 加速 + 自定义域名" -ForegroundColor Yellow
Write-Host "     参考: https://help.aliyun.com/document_detail/31868.html"
Write-Host ""
Write-Host "  💡 后续更新网站只需重新运行此脚本即可！" -ForegroundColor Cyan
