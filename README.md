#!/bin/bash

# 查找并停止运行中的Node.js服务器进程
echo "正在停止校园人格测试后端服务..."
PID=$(ps aux | grep '[n]ode index.js' | awk '{print $2}')

if [ ! -z "$PID" ]; then
    kill $PID
    echo "服务已停止 (PID: $PID)"
else
    echo "未找到运行中的服务进程"
fi