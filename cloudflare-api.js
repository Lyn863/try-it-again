# 校园人格测试 - 管理页面使用指南

## 管理页面功能介绍

管理页面（`admin.html`）是一个静态的数据管理界面，用于查看测试统计数据和导出测试结果。该页面不依赖后端API，使用模拟数据进行展示，适合在各种环境中快速部署和使用。

### 主要功能

1. **数据概览** - 显示测试总次数、今日测试、平均完成时间等关键指标
2. **图表分析** - 提供人格类型分布和五大人格维度平均分的可视化图表
3. **数据导出** - 支持JSON和CSV两种格式的数据导出
4. **最近记录** - 展示最近的测试记录详情

## 如何使用管理页面

### 本地使用

1. 直接在浏览器中打开 `admin.html` 文件
2. 页面会自动加载模拟数据并显示统计信息
3. 点击"刷新数据"按钮可以重新加载数据
4. 使用"导出JSON"或"导出CSV"按钮导出数据

### 与后端集成（可选）

如果您希望使用真实数据，可以修改 `admin.html` 中的 JavaScript 代码：

1. 找到 `mockData` 对象定义
2. 将其替换为从后端API获取数据的代码：

```javascript
// 示例：从后端API获取数据
async function loadRealData() {
    try {
        const response = await fetch('http://your-backend-api/stats');
        const data = await response.json();
        
        // 更新页面数据
        document.getElementById('total-tests').textContent = data.totalTests;
        document.getElementById('today-tests').textContent = data.todayTests;
        // ... 更新其他数据
        
        return data;
    } catch (error) {
        console.error('获取数据失败:', error);
        return mockData; // 失败时使用模拟数据
    }
}
```

## 数据导出功能

### JSON 格式导出

JSON格式导出包含完整的数据结构：

- 导出时间和元数据
- 统计摘要信息
- 人格类型分布数据
- 五大人格维度平均分
- 最近测试记录详情

### CSV 格式导出

CSV格式导出适合在电子表格软件中查看：

- 包含测试ID、时间、人格类型和五大人格维度得分
- 格式简洁，易于分析
- 可直接导入Excel、Google Sheets等软件

## Railway 部署指南

### 准备工作

1. 注册 [Railway](https://railway.app) 账号
2. 安装 [Railway CLI](https://docs.railway.app/develop/cli)（可选）
3. 确保项目中包含以下文件：
   - `index.html`（主测试页面）
   - `admin.html`（管理页面）
   - `railway.json`（Railway配置）
   - `package.json`（项目配置）

### 部署步骤

#### 方法一：通过 Railway CLI 部署

1. 登录 Railway CLI：
```bash
railway login
```

2. 初始化项目：
```bash
railway init
```

3. 部署项目：
```bash
railway up
```

4. 打开部署的应用：
```bash
railway open
```

#### 方法二：通过 GitHub 部署

1. 将项目推送到 GitHub 仓库
2. 在 Railway 控制台中点击 "New Project"
3. 选择 "Deploy from GitHub repo"
4. 选择您的 GitHub 仓库
5. Railway 会自动检测配置并开始部署

### 部署配置说明

`railway.json` 文件包含了 Railway 部署的配置：

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "static"  // 使用静态站点构建器
  },
  "deploy": {
    "startCommand": "npx http-server -p $PORT -c-1"  // 启动HTTP服务器
  },
  "env": {
    "PORT": {
      "type": "number",
      "default": 3000
    }
  }
}
```

### 访问管理页面

部署完成后：

1. 主测试页面：`https://your-app-name.railway.app/`
2. 管理页面：`https://your-app-name.railway.app/admin.html`

## 自定义配置

### 修改模拟数据

您可以在 `admin.html` 文件中修改 `mockData` 对象来自定义模拟数据：

```javascript
const mockData = {
    totalTests: 1234,  // 修改总测试次数
    todayTests: 45,    // 修改今日测试次数
    avgTime: '2:34',   // 修改平均完成时间
    topPersonality: '校园阿波罗',  // 修改最常见人格类型
    // ... 其他数据
};
```

### 自定义图表样式

图表使用 Chart.js 库，您可以修改图表配置来自定义样式：

```javascript
personalityChart = new Chart(personalityCtx, {
    type: 'bar',  // 可以改为 'line', 'doughnut', 'pie' 等
    data: {
        // ... 数据配置
    },
    options: {
        // ... 样式配置
        colors: ['#ff0000', '#00ff00', '#0000ff'],  // 自定义颜色
    }
});
```

### 添加新的数据指标

1. 在HTML中添加新的指标卡片：
```html
<div class="border border-neutral-200 p-6 bg-white">
    <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-light text-neutral-700">新指标</h3>
        <i class="fa fa-icon-name text-neutral-400 text-xl"></i>
    </div>
    <p id="new-metric" class="text-3xl font-light text-primary">0</p>
    <p class="text-sm text-neutral-500 mt-2">指标描述</p>
</div>
```

2. 在JavaScript中更新数据：
```javascript
document.getElementById('new-metric').textContent = mockData.newMetric;
```

## 安全考虑

由于管理页面是静态的，不涉及用户认证，建议：

1. 在生产环境中为管理页面添加访问控制
2. 不要在模拟数据中包含敏感信息
3. 如果集成真实API，确保API有适当的认证机制

## 故障排除

### 页面无法加载

- 确保所有文件都已正确上传
- 检查浏览器控制台是否有错误信息
- 确保文件名大小写正确（特别是在Linux服务器上）

### 图表不显示

- 检查Chart.js库是否正确加载
- 确保Canvas元素ID与JavaScript代码中的ID匹配
- 检查浏览器控制台是否有Chart.js相关错误

### 导出功能不工作

- 确保浏览器支持Blob API
- 检查浏览器是否阻止了文件下载
- 尝试使用不同的浏览器

## 浏览器兼容性

管理页面支持所有现代浏览器：

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 更新日志

### v1.0.0
- 初始版本发布
- 添加数据概览功能
- 添加图表分析功能
- 添加数据导出功能
- 添加最近记录展示功能
- 添加Railway部署配置

## 许可证

MIT License