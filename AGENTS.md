# 湖南建诚云信息技术有限公司产品推广页面 - 需求拆解文档

## 产品概述

- **产品类型**: 企业官网/产品落地页
- **场景类型**: prototype - app
- **目标用户**: 工业设计领域的企业客户、工程师、项目采购决策者
- **核心价值**: 展示三款核心工业软件产品（UKP3D、AIPSA、PHS3D），传递十年专业匠心与服务至上的品牌理念
- **界面语言**: 中文
- **主题偏好**: light
- **导航模式**: 锚点导航
- **导航布局**: Topbar

---

## 页面结构总览

**页面文件**: `HomePage.tsx`

| 区块名称 | 锚点 | 区块说明 |
|---------|------|---------|
| 首屏/Hero | `#hero` | 公司定位 + 核心价值主张"专业创造价值"，视觉震撼的工业风格背景 |
| 产品中心 | `#products` | 三款核心软件产品卡片展示（UKP3D、AIPSA、PHS3D），含产品功能介绍 |
| 项目案例 | `#cases` | 项目实例图片展示，证明产品在实际工程中的应用效果 |
| 关于我们 | `#about` | 十年专业匠心故事，公司发展历程与专业积淀 |
| 服务理念 | `#service` | 服务至上的工作理念，客户服务体系展示 |
| 联系我们 | `#contact` | CTA行动号召，联系方式与合作入口 |

---

## 导航配置

- **导航布局**: Topbar（顶部固定，滚动时显示阴影）
- **导航项**:
  | 导航文字 | 锚点 |
  |---------|------|
  | 首页 | `#hero` |
  | 产品中心 | `#products` |
  | 项目案例 | `#cases` |
  | 关于我们 | `#about` |
  | 联系我们 | `#contact` |

---

## 功能列表

- **区块**: 首屏/Hero
  - **页面目标**: 第一眼建立专业可信的品牌形象，传递核心价值
  - **功能点**:
    - 大标题展示"专业创造价值"品牌主张
    - 副标题描述公司定位（工业设计软件解决方案专家）
    - 背景视觉：工业管道/工厂三维场景氛围图
    - CTA按钮：向下滚动探索/立即咨询

- **区块**: 产品中心
  - **页面目标**: 清晰展示三款核心产品的功能与价值
  - **功能点**:
    - UKP3D管道设计软件卡片：三维管道设计、碰撞检测、自动出图功能介绍
    - AIPSA应力分析软件卡片：管道应力计算、规范校核、安全评估功能介绍
    - PHS3D支吊架设计软件卡片：支吊架选型、三维建模、荷载分析功能介绍
    - 每个产品卡片包含：产品图标、核心功能列表、应用场景标签
    - 悬停效果：卡片抬升 + 功能亮点高亮

- **区块**: 项目案例
  - **页面目标**: 用实际项目证明产品可靠性与专业性
  - **功能点**:
    - 项目实例图片网格展示（工厂实景、软件界面截图、设计成果图）
    - 图片懒加载 + 点击放大查看
    - 项目标签：行业类型（石化/电力/冶金等）
    - 简洁的项目描述文字

- **区块**: 关于我们
  - **页面目标**: 讲述十年匠心故事，建立情感信任
  - **功能点**:
    - 时间线形式展示公司发展历程（关键里程碑）
    - 核心数据展示：10年+行业经验、X+服务客户、Y+成功项目
    - 团队专业资质与行业认证展示
    - 工匠精神文案阐述

- **区块**: 服务理念
  - **页面目标**: 传递服务至上的工作理念
  - **功能点**:
    - 服务体系展示：售前咨询、实施部署、培训支持、售后维护
    - 服务承诺关键词：响应快速、专业支持、持续迭代
    - 客户评价/合作企业Logo展示（如有）

- **区块**: 联系我们
  - **页面目标**: 转化潜在客户，建立商务联系
  - **功能点**:
    - 联系表单：姓名、公司、电话、需求描述
    - 公司联系信息：电话、邮箱、地址
    - 提交成功提示
    - 返回顶部按钮

---

## 数据共享配置

| 存储键名 | 数据说明 | 使用页面 |
|---------|---------|---------|
| `__global_jcy_currentSection` | 当前可见区块标识，用于导航高亮，类型为 `string` | 首屏及各锚点区块 |

```ts
// 产品数据结构
interface IProduct {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  tags: string[];
}

// 项目案例数据结构
interface ICase {
  id: string;
  title: string;
  industry: string;
  description: string;
  image: string;
}

-------

# UI 设计指南

> **场景类型**: `prototype`（应用架构设计 - Landing Site）
> **确认检查**: 本指南适用于企业产品落地页/官网场景，采用单页锚点导航模式。

> ℹ️ Section 1-2 为设计意图与决策上下文。Code agent 实现时以 Section 3 及之后的具体参数为准。

## 1. Design Archetype (设计原型)

### 1.1 内容理解
- **目标用户**: 工业设计领域的企业客户、工程师、项目采购决策者（B2B决策群体，注重专业度与可靠性）
- **核心目的**: 建立品牌信任、展示产品实力、引导商务咨询（说服 + 引导行动）
- **期望情绪**: 专业可信、匠心沉淀、技术领先（工业软件的精密感与制造业的厚重感）
- **需避免的感受**: 廉价感、花哨过度、不专业的科技风（避免千篇一律的SaaS蓝色渐变）

### 1.2 设计语言
- **Aesthetic Direction**: 工业精密感与专业可信度的结合，通过稳重的深蓝基调体现科技实力，暖铜强调色点缀传递匠心温度
- **Visual Signature**: 
  1. 极深蓝Header与Hero背景建立权威感
  2. 暖铜色（Copper）强调色体现工匠精神与价值创造
  3. 细微网格/线条装饰呼应工业设计软件的工程图纸属性
  4. 大字重标题与充裕留白营造大气专业的阅读体验
  5. 卡片式产品展示保持现代感与信息清晰度
- **Emotional Tone**: 专业可信（建立B2B信任）、匠心沉淀（十年专注的故事感）
- **Design Style**: Editorial 经典排版（主）+ Grid 网格（辅）— 正式报告般的权威感与工程设计的精准网格感结合，体现"专业创造价值"的品牌主张
- **Application Type**: Landing Site（产品落地页）

## 2. Design Principles (设计理念)
1. **专业先于炫技**：避免过度动画和花哨效果，用稳重的排版和克制的色彩建立B2B信任感
2. **内容驱动视觉**：产品功能与案例图片是核心，视觉设计服务于信息清晰传达
3. **工业美学**：通过深蓝、金属铜、几何线条等元素呼应工业设计软件的工程属性
4. **呼吸感与密度平衡**：充足的留白体现专业度，但保持适当信息密度以满足商务决策者的浏览效率
5. **一致性体验**：全站统一的圆角、阴影、色彩逻辑，确保滚动浏览时的视觉连贯性

## 3. Color System (色彩系统)

> 基于"专业创造价值"的B2B工业软件定位，自主生成配色体系。深蓝色体现科技与信任，暖铜色体现匠心与价值创造。

**配色设计理由**：选择极深蓝（Navy）作为主色建立权威与信任，符合工业软件的专业属性；暖铜色（Copper）作为强调色，既区别于常规科技蓝，又象征"价值"与"匠心"，呼应十年专业沉淀的品牌故事。

### 3.1 主题颜色

| 角色 | CSS 变量 | Tailwind Class | HSL 值 | 设计说明 |
|-----|---------|----------------|--------|---------|
| bg | `--background` | `bg-background` | `hsl(220 20% 97%)` | 极浅蓝灰，清爽专业，减少视觉疲劳 |
| surface | `--card` | `bg-card` | `hsl(0 0% 100%)` | 纯白卡片背景，确保内容可读性 |
| text | `--foreground` | `text-foreground` | `hsl(220 30% 12%)` | 深灰蓝，高对比度确保长文阅读舒适 |
| textMuted | `--muted-foreground` | `text-muted-foreground` | `hsl(220 15% 45%)` | 中灰蓝，用于辅助说明文字 |
| primary | `--primary` | `bg-primary` | `hsl(225 65% 28%)` | 极深蓝，主按钮与关键交互，体现权威 |
| primary-foreground | `--primary-foreground` | `text-primary-foreground` | `hsl(0 0% 100%)` | 白色，确保在深蓝背景上清晰可读 |
| accent | `--accent` | `bg-accent` | `hsl(28 75% 48%)` | 暖铜色，悬停状态与装饰强调，体现匠心价值 |
| accent-foreground | `--accent-foreground` | `text-accent-foreground` | `hsl(0 0% 100%)` | 白色，暖铜色背景上的文字 |
| border | `--border` | `border-border` | `hsl(220 20% 88%)` | 浅灰蓝边框， subtle但可辨识 |
| header | `--header` | `bg-[hsl(225_55%_12%)]` | `hsl(225 55% 12%)` | 极深蓝，Hero与Header背景，营造专业权威感 |
| header-foreground | - | `text-[hsl(0_0%_100%)]` | `hsl(0 0% 100%)` | 白色，深色Header上的文字 |

> **Color Token 语义速查（供 code agent 参考）**:
> - `primary` → 主行动：CTA按钮、关键链接、激活态高亮
> - `accent` → 状态反馈：悬停背景、装饰元素、服务标签、时间线节点
> - `muted` → 静态非交互：辅助文字、禁用态、占位符
> - `header` → 深色区域：Hero背景、Footer背景、导航栏背景（滚动后）

### 3.2 语义颜色（可选）

| 用途 | 角色 | HSL 值 | 说明 |
|-----|-----|--------|---------|
| 成功/正向 | `--success` | `hsl(142 71% 45%)` | 表单提交成功、正向状态 |
| 警告/注意 | `--warning` | `hsl(38 92% 50%)` | 提示性警告，与暖铜色区分 |
| 错误/负面 | `--destructive` | `hsl(0 72% 51%)` | 表单错误、删除操作 |

## 4. Typography (字体排版)

- **Heading**: Noto Sans SC (思源黑体) / "PingFang SC", "Microsoft YaHei", sans-serif
- **Body**: Noto Sans SC (思源黑体) / "PingFang SC", "Microsoft YaHei", sans-serif
- **字体导入**: 
  ```css
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700;900&display=swap');
  ```

**字体层级规范**：

| 层级 | 尺寸 | 字重 | 用途 |
|-----|------|-----|-----|
| Hero标题 | `text-4xl md:text-5xl lg:text-6xl` | `font-black` | 首屏核心价值主张"专业创造价值" |
| 区块标题 | `text-3xl md:text-4xl` | `font-bold` | 各锚点区块大标题（产品中心、关于我们等） |
| 卡片标题 | `text-xl md:text-2xl` | `font-semibold` | 产品名称、项目标题 |
| 正文 | `text-base` | `font-normal` | 描述文字、功能列表 |
| 小字/标签 | `text-sm` | `font-medium` | 标签、元数据、导航项 |

## 5. Global Layout Structure (全局布局结构)

### 5.1 Navigation Strategy (导航策略)

**导航模式**: Topbar（顶部固定导航栏）

**结构**:
- **布局**: 固定定位 `fixed top-0 left-0 right-0 z-50`，高度 `h-16`
- **背景**: 初始透明（Hero区融合），滚动后 `bg-[hsl(225_55%_12%)]/95 backdrop-blur-md`（深蓝毛玻璃）
- **内容**: Logo左侧，导航链接居中/右侧，CTA按钮最右
- **锚点导航**: 首页(#hero)、产品中心(#products)、项目案例(#cases)、关于我们(#about)、联系我们(#contact)

**移动端**: 汉堡菜单，侧滑抽屉导航

### 5.2 Page Content Zones (页面区块配置)

**Standard Content Zone（全页面统一）**:
- **Maximum Width**: `max-w-6xl`（落地页适中宽度，保证阅读舒适性）
- **Padding**: `px-4 md:px-6 lg:px-8`（响应式水平边距），区块垂直间距 `py-16 md:py-24`
- **Alignment**: `mx-auto` 居中
- **Vertical Spacing**: 区块间 `space-y-16 md:space-y-24`，保持8pt倍数一致性

**Hero 区块**:
- **Width**: `w-full`，内容区受Standard Content Zone约束
- **Height**: `min-h-[600px] md:min-h-[700px]`， Flex居中
- **Background**: 极深蓝 `hsl(225 55% 12%)`，叠加细微网格纹理或管道线条SVG装饰（透明度5-10%）

**各锚点区块**:
- `#products`: 三列网格产品卡片 (`grid md:grid-cols-3 gap-8`)
- `#cases`: 图片网格，可2-3列自适应 (`grid md:grid-cols-2 lg:grid-cols-3 gap-6`)
- `#about`: 左右布局（左侧时间线，右侧数据统计）或上下布局
- `#service`: 四列服务卡片 (`grid md:grid-cols-2 lg:grid-cols-4 gap-6`)
- `#contact`: 双列布局（左侧联系信息，右侧表单）

**宽内容溢出策略**: 项目案例图片网格在移动端横向滑动 `overflow-x-auto md:overflow-visible`，保持容器max-w不变

## 6. Visual Effects & Motion (视觉效果与动效)

- **Header/Hero 视觉方案**: 
  - 背景: 极深蓝 `hsl(225 55% 12%)` 
  - 装饰: 右上角大面积半透明暖铜色圆形渐变 `radial-gradient(circle at 100% 0%, hsl(28 75% 48% / 0.15) 0%, transparent 50%)`，左下角细微工程网格线纹理（SVG，透明度5%）
  - 文字: 白色，大标题使用 `font-black tracking-tight`

- **装饰手法**: 
  - 区块标题左侧使用暖铜色竖条装饰 `w-1.5 h-8 bg-accent rounded-full`
  - 时间线节点使用暖铜色圆点
  - 产品卡片悬停时顶部出现2px暖铜色边框

- **圆角**: 
  - 卡片: `rounded-lg` (0.5rem)
  - 按钮: `rounded-md` (0.375rem，专业感) 或 `rounded-full` ( Pill形状，CTA突出)
  - 图片: `rounded-lg`
  - 输入框: `rounded-md`

- **阴影**: 
  - 卡片默认: `shadow-sm`
  - 卡片悬停: `shadow-md` + `translateY(-2px)` 微抬升
  - 导航栏滚动后: `shadow-md`
  - 固定按钮: `shadow-lg`

- **复杂背景文字处理**:
  - Hero区深蓝背景: 纯白文字 `text-white`，对比度充足
  - 图片遮罩: 项目案例图片悬停时叠加 `bg-gradient-to-t from-black/60 to-transparent`，文字白色

- **缓动函数**: `cubic-bezier(0.4, 0, 0.2, 1)`（标准ease-out）

- **关键动效**:
  1. **导航栏显隐**: 滚动超过100px后，导航栏从透明变为深蓝毛玻璃背景，过渡300ms
  2. **卡片悬停**: 微抬升4px + 阴影加深，过渡200ms
  3. **按钮悬停**: Primary按钮背景变亮（`brightness(1.1)`），Ghost按钮背景出现浅灰
  4. **锚点滚动**: 平滑滚动 `scroll-behavior: smooth`，偏移量考虑固定导航高度（`scroll-mt-20`）

## 7. Components (组件指南)

> **必须引用 Color System 中的颜色角色**

### Buttons

**Primary (主CTA)**:
- 背景: `bg-primary` (`hsl(225 65% 28%)`)
- 文字: `text-primary-foreground` (白色)
- 圆角: `rounded-md` 或 `rounded-full`（仅CTA按钮）
- 内边距: `px-6 py-3`
- 字体: `font-semibold`
- Hover: `brightness(110%)` 或 `bg-[hsl(225_65%_33%)]`，轻微上移 `translateY(-1px)`
- Active: `scale(0.98)`

**Secondary (次要按钮)**:
- 背景: `bg-transparent`
- 边框: `border-2 border-primary`
- 文字: `text-primary`
- Hover: `bg-primary/5`

**Ghost (导航链接/文字按钮)**:
- 背景: 透明
- 文字: `text-foreground`（深色背景上用`text-white`）
- Hover: `bg-accent/10` 或 `bg-white/10`（深色背景），文字变为 `text-accent`

### Cards (产品卡片/服务卡片)

- 背景: `bg-card` (白色)
- 边框: `border border-border` (`hsl(220 20% 88%)`)
- 圆角: `rounded-lg`
- 阴影: `shadow-sm`
- 内边距: `p-6 md:p-8`
- Hover: `shadow-md translateY(-4px)`，顶部出现2px暖铜色边框 `border-t-2 border-accent`
- 结构: 图标/图片区 + 标题 + 功能列表 + 标签

### Form Elements (联系表单)

**输入框**:
- 背景: `bg-white`
- 边框: `border border-border`，Focus时 `ring-2 ring-primary/20 border-primary`
- 圆角: `rounded-md`
- 内边距: `px-4 py-3`
- Placeholder: `text-muted-foreground`

**提交按钮**: 使用Primary Button样式，全宽或自适应

### Section Headers (区块标题)

- 结构: 左侧装饰竖条 + 标题文字 + 可选副标题
- 装饰条: `w-1.5 h-10 bg-accent rounded-full mr-4`
- 标题: `text-3xl md:text-4xl font-bold text-foreground`
- 副标题: `text-lg text-muted-foreground mt-2`
- 布局: Flex居中或左对齐（根据区块内容密度决定）

### Timeline (关于我们-时间线)

- 线条: `w-0.5 bg-border`，左侧绝对定位
- 节点: `w-4 h-4 rounded-full bg-accent border-4 border-background`
- 内容卡片: 左侧留白 `pl-8`，白色背景或无背景
- 年份标记: `font-bold text-accent` 或 `font-bold text-primary`

### Image Cards (项目案例)

- 容器: `rounded-lg overflow-hidden relative group`
- 图片: `object-cover w-full h-64`
- 遮罩: 默认透明，Hover时 `bg-gradient-to-t from-black/70 via-black/20 to-transparent`
- 文字: 默认隐藏，Hover时显示在底部 `text-white`
- 过渡: 300ms ease-out

## 8. Flexibility Note (灵活性说明)

> **一致性优先原则**：本落地页为单页应用，所有区块使用相同的核心参数（最大宽度、圆角、阴影等），确保整体设计语言统一。
>
> **允许的微调范围**（code agent 可自行判断）：
> - 响应式断点适配（如移动端将三列产品网格改为单列）
> - 区块内部的局部间距（如卡片内边距可根据内容量微调）
> - Hero区背景装饰元素的密度和位置可根据实际视觉效果微调
> - 项目案例图片的实际高度可根据图片比例调整（保持`aspect-ratio`或固定`h-64`）
>
> **禁止的随意变更**：
> - ❌ 不同区块使用不同的最大宽度（必须统一`max-w-6xl`）
> - ❌ 不同按钮使用不同的圆角风格（必须统一设计）
> - ❌ 改变主色调（深蓝）或强调色（暖铜）的HSL值
> - ❌ 引入与工业专业感不符的鲜艳色彩（如霓虹色、彩虹渐变）

## 9. Signature & Constraints (设计签名与禁区)

### DO (视觉签名)
1. **权威深蓝Header**: Hero与Footer使用`hsl(225 55% 12%)`极深蓝背景，建立专业权威感
2. **暖铜色价值点缀**: 所有强调元素（装饰条、悬停态、时间线节点）使用暖铜色`hsl(28 75% 48%)`，呼应"价值"主题
3. **工程网格纹理**: Hero背景叠加极淡的工程网格线或管道线条SVG（透明度<10%），强化工业软件属性
4. **卡片微交互**: 产品卡片悬停时顶部出现2px暖铜色边框+微抬升，提供清晰反馈
5. **大字重对比**: 标题使用`font-black`或`font-bold`，正文使用`font-normal`，形成清晰的Editorial排版层次

### DON'T (禁止做法)
> 通用约束参见「通用约束」。以下为 Prototype - Landing Site 特有：
- ❌ 使用默认AI蓝（`bg-blue-500`）替代设计的深蓝主色
- ❌ 使用紫色渐变或其他与工业专业感不符的背景
- ❌ 添加与内容无关的浮动装饰（如随机几何形状、粒子效果）
- ❌ 产品卡片使用大面积渐变背景（保持白色卡片+细边框的专业感）
- ❌ 项目案例图片使用圆角过大（保持`rounded-lg`即可，避免过于圆润可爱）
- ❌ 导航栏使用透明背景滚动全程（必须在滚动后变为实色/毛玻璃确保可读性）