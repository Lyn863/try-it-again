#!/bin/bash

# 设置环境变量
export NODE_ENV=production

# 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
    echo "正在安装依赖..."
    npm install --production
fi

# 启动服务器
echo "启动校园人格测试后端服务..."
node index.js