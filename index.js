# 校园人格测试后端服务

这是一个基于 Node.js + SQLite 的轻量级后端服务，为校园人格测试应用提供数据存储、统计分析和数据导出功能。

## 技术栈

- **Node.js**: JavaScript 运行时
- **Express**: Web 框架
- **SQLite**: 轻量级数据库
- **CORS**: 跨域资源共享
- **Helmet**: 安全增强

## 功能特性

- 📊 **数据存储**: 保存用户测试结果到 SQLite 数据库
- 📈 **统计分析**: 提供人格类型分布和维度平均分统计
- 💾 **数据导出**: 支持 JSON 和 CSV 格式数据导出
- 🔒 **安全防护**: 使用 Helmet 增强安全性
- 🌐 **跨域支持**: 配置 CORS 允许前端访问

## 快速开始

### 1. 安装依赖

```bash
cd backend
npm install
```

### 2. 启动服务

```bash
# 开发模式
npm start

# 或使用启动脚本
./start.sh
```

服务将在 `http://localhost:3001` 启动。

### 3. 停止服务

```bash
# 使用停止脚本
./stop.sh
```

## API 接口

### 基础信息
- **GET /** - 获取 API 信息和端点列表
- **GET /health** - 健康检查

### 核心功能
- **POST /api/save-result** - 保存测试结果
- **GET /api/stats** - 获取统计数据
- **GET /api/export** - 导出数据 (支持 JSON/CSV)
- **GET /api/personality-types** - 获取人格类型信息

## 数据库结构

### `test_results` 表
- `id`: 自增主键
- `timestamp`: 测试时间戳
- `personality_type`: 人格类型
- `e_score`: 外向性得分
- `n_score`: 神经质得分
- `a_score`: 宜人性得分
- `c_score`: 尽责性得分
- `o_score`: 开放性得分
- `user_info`: 用户信息 (JSON 格式)

### `dimension_stats` 视图
- 提供五大人格维度的平均分统计
- 包含总测试次数

## 数据导出

### JSON 格式
```bash
curl "http://localhost:3001/api/export?format=json" -o personality_test_data.json
```

### CSV 格式
```bash
curl "http://localhost:3001/api/export?format=csv" -o personality_test_data.csv
```

## 环境变量

- `PORT`: 服务器端口 (默认: 3001)
- `NODE_ENV`: 运行环境 (development/production)

## 安全配置

- 使用 Helmet 中间件增强安全性
- CORS 配置限制允许的来源
- 输入验证和参数检查

## 部署说明

### 生产环境部署

1. 设置环境变量
```bash
export NODE_ENV=production
export PORT=8080
```

2. 启动服务
```bash
./start.sh
```

### 进程管理

推荐使用 PM2 进行进程管理:

```bash
npm install -g pm2
pm2 start index.js --name "personality-test-backend"
pm2 save
pm2 startup
```

## 监控与日志

- 服务启动日志输出到控制台
- 错误信息记录到控制台
- 可配置日志文件输出 (建议使用 Winston)

## 维护指南

### 数据库备份

```bash
sqlite3 personality_test.db ".backup backup_$(date +%Y%m%d).db"
```

### 数据库恢复

```bash
sqlite3 personality_test.db ".restore backup_YYYYMMDD.db"
```

## 故障排除

### 常见问题

1. **端口被占用**: 修改 PORT 环境变量
2. **数据库权限**: 确保有读写权限
3. **依赖安装失败**: 检查网络连接和 npm 配置

### 健康检查

```bash
curl http://localhost:3001/health
```

## 开发指南

### 添加新功能

1. 在 `index.js` 中添加新的路由
2. 实现相应的处理函数
3. 更新 README.md 文档

### 数据库迁移

修改数据库结构时，建议:
1. 备份现有数据
2. 创建迁移脚本
3. 测试迁移过程

## 许可证

MIT License