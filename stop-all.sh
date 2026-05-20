#!/bin/bash

echo "========================================="
echo "启动校园人格测试完整应用"
echo "========================================="

# 检查 Node.js 是否已安装
if ! command -v node &> /dev/null; then
    echo "错误: 未找到 Node.js。请先安装 Node.js。"
    exit 1
fi

# 检查 npm 是否已安装
if ! command -v npm &> /dev/null; then
    echo "错误: 未找到 npm。请先安装 npm。"
    exit 1
fi

echo "正在启动后端服务..."
cd backend
./start.sh &
BACKEND_PID=$!
cd ..

echo "后端服务已启动 (PID: $BACKEND_PID)"
echo "后端服务地址: http://localhost:3001"

# 等待后端服务启动
echo "等待后端服务初始化..."
sleep 3

echo ""
echo "========================================="
echo "应用启动完成！"
echo "========================================="
echo "后端服务: http://localhost:3001"
echo "前端页面: 请在浏览器中打开 index.html 文件"
echo ""
echo "使用说明:"
echo "1. 在浏览器中打开 index.html 文件"
echo "2. 开始进行校园人格测试"
echo "3. 测试结果将自动保存到后端数据库"
echo ""
echo "停止服务:"
echo "运行 ./stop-all.sh 停止所有服务"
echo "========================================="

# 保持脚本运行，显示日志
echo ""
echo "实时日志输出:"
echo "-----------------------------------------"
tail -f /dev/null