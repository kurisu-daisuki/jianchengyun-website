/**
 * OSS 静态部署 HTML 后处理脚本
 * 将 rspack 构建产物中的 Handlebars 模板变量替换为静态值
 */
const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve(__dirname, '..', 'dist', 'client', 'index.html');

if (!fs.existsSync(htmlPath)) {
  console.error('❌ index.html 不存在，请先运行 npm run build:oss');
  process.exit(1);
}

let html = fs.readFileSync(htmlPath, 'utf-8');

// 替换 Handlebars 模板变量为静态默认值
const replacements = {
  '{{appName}}': '湖南建诚云',
  '{{appAvatar}}': '/favicon.svg',
  '{{{appAvatar}}}': '/favicon.svg',
  '{{appDescription}}': '湖南建诚云信息技术有限公司 - 专业创造价值',
  '{{csrfToken}}': '',
  '{{userId}}': '',
  '{{tenantId}}': '',
  '{{appId}}': '',
  '{{environment}}': 'production',
  '{{currentUrl}}': '',
};

for (const [key, value] of Object.entries(replacements)) {
  html = html.replaceAll(key, value);
}

fs.writeFileSync(htmlPath, html, 'utf-8');
console.log('✅ HTML 模板变量已替换为静态值');
console.log(`   文件: ${htmlPath}`);
