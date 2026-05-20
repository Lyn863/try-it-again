<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>校园人格测试 - 管理页面</title>
    <!-- Tailwind CSS v3 -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Font Awesome -->
    <link href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.8/dist/chart.umd.min.js"></script>
    <!-- Tailwind 配置 -->
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#000000',
                        secondary: '#666666',
                        accent: '#3B82F6',
                        neutral: {
                            100: '#F9FAFB',
                            200: '#F3F4F6',
                            300: '#E5E7EB',
                            400: '#D1D5DB',
                            500: '#9CA3AF',
                            600: '#6B7280',
                            700: '#4B5563',
                            800: '#1F2937',
                            900: '#111827',
                        }
                    },
                    fontFamily: {
                        sans: ['Inter', 'system-ui', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <style type="text/tailwindcss">
        @layer utilities {
            .text-shadow {
                text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
            }
            .transition-all-300 {
                transition: all 300ms ease-in-out;
            }
            .card-hover:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
            }
            .line-element {
                @apply h-px bg-black my-6;
            }
            .corner-line {
                @apply absolute;
            }
            .corner-line-top {
                @apply top-0 left-0 w-16 h-px bg-black;
            }
            .corner-line-left {
                @apply top-0 left-0 h-16 w-px bg-black;
            }
            .corner-line-bottom {
                @apply bottom-0 right-0 w-16 h-px bg-black;
            }
            .corner-line-right {
                @apply bottom-0 right-0 h-16 w-px bg-black;
            }
            .horizontal-line {
                @apply absolute left-0 h-px bg-black opacity-30;
            }
            .vertical-line {
                @apply absolute top-0 w-px bg-black opacity-30;
            }
        }
    </style>
</head>
<body class="bg-white font-sans text-neutral-900 overflow-x-hidden">
    <div class="relative min-h-screen">
        <!-- 装饰线条 -->
        <div class="absolute inset-0 pointer-events-none">
            <div class="horizontal-line top-1/4 w-full"></div>
            <div class="horizontal-line top-2/4 w-full"></div>
            <div class="horizontal-line top-3/4 w-full"></div>
            <div class="vertical-line left-1/4 h-full"></div>
            <div class="vertical-line left-2/4 h-full"></div>
            <div class="vertical-line left-3/4 h-full"></div>
        </div>
        
        <!-- 角落线条 -->
        <div class="corner-line corner-line-top"></div>
        <div class="corner-line corner-line-left"></div>
        <div class="corner-line corner-line-bottom"></div>
        <div class="corner-line corner-line-right"></div>
        
        <div class="container mx-auto px-4 py-8 max-w-6xl relative z-10">
            <!-- 头部 -->
            <header class="mb-12">
                <div class="flex justify-between items-center">
                    <div>
                        <h1 class="text-3xl font-light text-primary mb-2">校园人格测试</h1>
                        <p class="text-neutral-600">管理页面</p>
                    </div>
                    <div class="flex items-center space-x-4">
                        <span id="current-date" class="text-neutral-600 text-sm"></span>
                        <button id="refresh-btn" class="bg-white border border-primary text-primary font-light py-2 px-6 hover:bg-neutral-50 transition-all-300 text-sm">
                            <i class="fa fa-refresh mr-2"></i> 刷新数据
                        </button>
                    </div>
                </div>
                <div class="line-element w-full mt-6"></div>
            </header>

            <!-- 数据概览 -->
            <section class="mb-12">
                <h2 class="text-2xl font-light text-neutral-800 mb-8">数据概览</h2>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div class="border border-neutral-200 p-6 bg-white">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-light text-neutral-700">总测试次数</h3>
                            <i class="fa fa-users text-neutral-400 text-xl"></i>
                        </div>
                        <p id="total-tests" class="text-3xl font-light text-primary">0</p>
                        <p class="text-sm text-neutral-500 mt-2">所有用户的测试总次数</p>
                    </div>
                    <div class="border border-neutral-200 p-6 bg-white">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-light text-neutral-700">今日测试</h3>
                            <i class="fa fa-calendar-check-o text-neutral-400 text-xl"></i>
                        </div>
                        <p id="today-tests" class="text-3xl font-light text-primary">0</p>
                        <p class="text-sm text-neutral-500 mt-2">今天完成的测试次数</p>
                    </div>
                    <div class="border border-neutral-200 p-6 bg-white">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-light text-neutral-700">平均完成时间</h3>
                            <i class="fa fa-clock-o text-neutral-400 text-xl"></i>
                        </div>
                        <p id="avg-time" class="text-3xl font-light text-primary">0:00</p>
                        <p class="text-sm text-neutral-500 mt-2">用户完成测试的平均时间</p>
                    </div>
                    <div class="border border-neutral-200 p-6 bg-white">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-light text-neutral-700">活跃人格类型</h3>
                            <i class="fa fa-star text-neutral-400 text-xl"></i>
                        </div>
                        <p id="top-personality" class="text-xl font-light text-primary">暂无</p>
                        <p class="text-sm text-neutral-500 mt-2">最常见的人格类型</p>
                    </div>
                </div>
            </section>

            <!-- 图表区域 -->
            <section class="mb-12">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- 人格类型分布 -->
                    <div class="border border-neutral-200 p-6 bg-white">
                        <h3 class="text-xl font-light text-neutral-800 mb-6">人格类型分布</h3>
                        <div class="h-80">
                            <canvas id="personality-chart"></canvas>
                        </div>
                    </div>
                    
                    <!-- 五大人格维度平均分 -->
                    <div class="border border-neutral-200 p-6 bg-white">
                        <h3 class="text-xl font-light text-neutral-800 mb-6">五大人格维度平均分</h3>
                        <div class="h-80">
                            <canvas id="dimensions-chart"></canvas>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 数据导出 -->
            <section class="mb-12">
                <h2 class="text-2xl font-light text-neutral-800 mb-8">数据导出</h2>
                <div class="border border-neutral-200 p-8 bg-white">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 class="text-lg font-light text-neutral-700 mb-4">JSON 格式</h3>
                            <p class="text-neutral-600 mb-6">导出完整的测试数据，包含所有用户信息和测试结果，适合进一步分析和处理。</p>
                            <button id="export-json-btn" class="bg-white border border-primary text-primary font-light py-3 px-8 hover:bg-neutral-50 transition-all-300">
                                <i class="fa fa-download mr-3"></i> 导出 JSON
                            </button>
                        </div>
                        <div>
                            <h3 class="text-lg font-light text-neutral-700 mb-4">CSV 格式</h3>
                            <p class="text-neutral-600 mb-6">导出简洁的表格数据，适合在 Excel 或其他电子表格软件中查看和分析。</p>
                            <button id="export-csv-btn" class="bg-white border border-primary text-primary font-light py-3 px-8 hover:bg-neutral-50 transition-all-300">
                                <i class="fa fa-file-excel-o mr-3"></i> 导出 CSV
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 最近测试记录 -->
            <section class="mb-12">
                <h2 class="text-2xl font-light text-neutral-800 mb-8">最近测试记录</h2>
                <div class="border border-neutral-200 bg-white overflow-x-auto">
                    <table class="min-w-full">
                        <thead>
                            <tr class="border-b border-neutral-200">
                                <th class="px-6 py-4 text-left text-sm font-light text-neutral-600">测试ID</th>
                                <th class="px-6 py-4 text-left text-sm font-light text-neutral-600">时间</th>
                                <th class="px-6 py-4 text-left text-sm font-light text-neutral-600">人格类型</th>
                                <th class="px-6 py-4 text-left text-sm font-light text-neutral-600">外向性</th>
                                <th class="px-6 py-4 text-left text-sm font-light text-neutral-600">神经质</th>
                                <th class="px-6 py-4 text-left text-sm font-light text-neutral-600">宜人性</th>
                                <th class="px-6 py-4 text-left text-sm font-light text-neutral-600">尽责性</th>
                                <th class="px-6 py-4 text-left text-sm font-light text-neutral-600">开放性</th>
                            </tr>
                        </thead>
                        <tbody id="recent-tests">
                            <tr>
                                <td colspan="8" class="px-6 py-12 text-center text-neutral-500">暂无测试数据</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- 底部 -->
            <footer class="text-center text-neutral-500 text-sm">
                <div class="line-element w-32 mx-auto"></div>
                <p class="mb-4">校园人格测试管理页面</p>
                <p>© 2024 Personality Test. All rights reserved.</p>
            </footer>
        </div>
    </div>

    <!-- 导出进度弹窗 -->
    <div id="export-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
        <div class="bg-white p-8 max-w-md w-full mx-4 text-center">
            <div class="mb-6">
                <div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
            <h3 class="text-xl font-light text-neutral-800 mb-4">正在导出数据</h3>
            <p id="export-status" class="text-neutral-600 mb-6">正在准备导出数据，请稍候...</p>
            <div class="w-full bg-neutral-200 h-2 mb-6">
                <div id="export-progress" class="bg-primary h-2 transition-all duration-300" style="width: 0%"></div>
            </div>
            <button id="cancel-export" class="bg-white border border-neutral-300 text-neutral-600 font-light py-2 px-6 hover:bg-neutral-50 transition-all-300">
                取消
            </button>
        </div>
    </div>

    <script>
        // 模拟数据
        const mockData = {
            totalTests: 1234,
            todayTests: 45,
            avgTime: '2:34',
            topPersonality: '校园阿波罗',
            personalityTypes: [
                { type: '校园阿波罗', count: 256, percentage: 20.7 },
                { type: '校园雅典娜', count: 203, percentage: 16.5 },
                { type: '校园狄俄尼索斯', count: 187, percentage: 15.2 },
                { type: '校园赫尔墨斯', count: 156, percentage: 12.6 },
                { type: '校园阿尔忒弥斯', count: 124, percentage: 10.0 },
                { type: '校园宙斯', count: 102, percentage: 8.3 },
                { type: '校园德墨忒尔', count: 89, percentage: 7.2 },
                { type: '校园波塞冬', count: 78, percentage: 6.3 },
                { type: '校园哈迪斯', count: 56, percentage: 4.5 },
                { type: '校园赫斯提亚', count: 33, percentage: 2.7 }
            ],
            dimensions: {
                E: 3.5,
                N: 2.8,
                A: 3.2,
                C: 3.0,
                O: 3.3
            },
            recentTests: [
                {
                    id: 1001,
                    timestamp: '2024-01-15 14:32:18',
                    personalityType: '校园阿波罗',
                    scores: { E: 4.2, N: 1.8, A: 4.5, C: 3.2, O: 3.5 }
                },
                {
                    id: 1002,
                    timestamp: '2024-01-15 13:45:02',
                    personalityType: '校园雅典娜',
                    scores: { E: 3.0, N: 2.2, A: 3.5, C: 4.8, O: 4.7 }
                },
                {
                    id: 1003,
                    timestamp: '2024-01-15 12:18:34',
                    personalityType: '校园狄俄尼索斯',
                    scores: { E: 4.7, N: 3.2, A: 3.5, C: 2.1, O: 4.6 }
                },
                {
                    id: 1004,
                    timestamp: '2024-01-15 11:03:56',
                    personalityType: '校园赫尔墨斯',
                    scores: { E: 4.5, N: 2.5, A: 3.8, C: 3.5, O: 4.2 }
                },
                {
                    id: 1005,
                    timestamp: '2024-01-15 10:22:41',
                    personalityType: '校园阿尔忒弥斯',
                    scores: { E: 2.2, N: 2.1, A: 3.6, C: 4.5, O: 3.2 }
                }
            ]
        };

        // 图表实例
        let personalityChart = null;
        let dimensionsChart = null;

        // 初始化页面
        document.addEventListener('DOMContentLoaded', function() {
            updateCurrentDate();
            loadMockData();
            initCharts();
            bindEvents();
        });

        // 更新当前日期
        function updateCurrentDate() {
            const now = new Date();
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
            };
            document.getElementById('current-date').textContent = now.toLocaleDateString('zh-CN', options);
        }

        // 加载模拟数据
        function loadMockData() {
            document.getElementById('total-tests').textContent = mockData.totalTests;
            document.getElementById('today-tests').textContent = mockData.todayTests;
            document.getElementById('avg-time').textContent = mockData.avgTime;
            document.getElementById('top-personality').textContent = mockData.topPersonality;
            
            updateRecentTests();
        }

        // 更新最近测试记录
        function updateRecentTests() {
            const tbody = document.getElementById('recent-tests');
            tbody.innerHTML = '';
            
            if (mockData.recentTests.length === 0) {
                tbody.innerHTML = '<tr><td colspan="8" class="px-6 py-12 text-center text-neutral-500">暂无测试数据</td></tr>';
                return;
            }
            
            mockData.recentTests.forEach(test => {
                const row = document.createElement('tr');
                row.className = 'border-b border-neutral-200 hover:bg-neutral-50';
                
                row.innerHTML = `
                    <td class="px-6 py-4 text-sm text-neutral-700">${test.id}</td>
                    <td class="px-6 py-4 text-sm text-neutral-700">${test.timestamp}</td>
                    <td class="px-6 py-4 text-sm text-neutral-700 font-medium">${test.personalityType}</td>
                    <td class="px-6 py-4 text-sm text-neutral-700">${test.scores.E}</td>
                    <td class="px-6 py-4 text-sm text-neutral-700">${test.scores.N}</td>
                    <td class="px-6 py-4 text-sm text-neutral-700">${test.scores.A}</td>
                    <td class="px-6 py-4 text-sm text-neutral-700">${test.scores.C}</td>
                    <td class="px-6 py-4 text-sm text-neutral-700">${test.scores.O}</td>
                `;
                
                tbody.appendChild(row);
            });
        }

        // 初始化图表
        function initCharts() {
            // 人格类型分布图表
            const personalityCtx = document.getElementById('personality-chart');
            personalityChart = new Chart(personalityCtx, {
                type: 'bar',
                data: {
                    labels: mockData.personalityTypes.map(item => item.type),
                    datasets: [{
                        label: '测试次数',
                        data: mockData.personalityTypes.map(item => item.count),
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        borderColor: 'rgba(0, 0, 0, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                precision: 0
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });

            // 维度平均分图表
            const dimensionsCtx = document.getElementById('dimensions-chart');
            dimensionsChart = new Chart(dimensionsCtx, {
                type: 'radar',
                data: {
                    labels: ['外向性 (E)', '神经质 (N)', '宜人性 (A)', '尽责性 (C)', '开放性 (O)'],
                    datasets: [{
                        label: '平均分',
                        data: [
                            mockData.dimensions.E,
                            mockData.dimensions.N,
                            mockData.dimensions.A,
                            mockData.dimensions.C,
                            mockData.dimensions.O
                        ],
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        borderColor: 'rgba(0, 0, 0, 1)',
                        borderWidth: 1,
                        pointBackgroundColor: 'rgba(0, 0, 0, 1)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 5,
                            ticks: {
                                precision: 1
                            }
                        }
                    }
                }
            });
        }

        // 绑定事件
        function bindEvents() {
            // 刷新按钮
            document.getElementById('refresh-btn').addEventListener('click', function() {
                // 模拟刷新动画
                this.disabled = true;
                this.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i> 刷新中...';
                
                setTimeout(() => {
                    this.disabled = false;
                    this.innerHTML = '<i class="fa fa-refresh mr-2"></i> 刷新数据';
                    updateCurrentDate();
                    
                    // 显示刷新成功提示
                    showToast('数据已刷新');
                }, 1500);
            });

            // 导出JSON按钮
            document.getElementById('export-json-btn').addEventListener('click', function() {
                exportData('json');
            });

            // 导出CSV按钮
            document.getElementById('export-csv-btn').addEventListener('click', function() {
                exportData('csv');
            });

            // 取消导出按钮
            document.getElementById('cancel-export').addEventListener('click', function() {
                hideExportModal();
            });
        }

        // 导出数据
        function exportData(format) {
            showExportModal();
            
            let progress = 0;
            const progressBar = document.getElementById('export-progress');
            const statusText = document.getElementById('export-status');
            
            const interval = setInterval(() => {
                progress += Math.random() * 20;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    
                    setTimeout(() => {
                        hideExportModal();
                        generateExportFile(format);
                        showToast(`数据已成功导出为 ${format.toUpperCase()} 格式`);
                    }, 500);
                }
                
                progressBar.style.width = `${progress}%`;
                statusText.textContent = `正在处理数据... ${Math.round(progress)}%`;
            }, 200);
        }

        // 生成导出文件
        function generateExportFile(format) {
            const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
            const filename = `personality_test_data_${timestamp}.${format}`;
            
            if (format === 'json') {
                const data = {
                    export_time: new Date().toISOString(),
                    total_records: mockData.totalTests,
                    summary: {
                        total_tests: mockData.totalTests,
                        today_tests: mockData.todayTests,
                        avg_time: mockData.avgTime,
                        top_personality: mockData.topPersonality
                    },
                    personality_types: mockData.personalityTypes,
                    dimensions: mockData.dimensions,
                    recent_tests: mockData.recentTests
                };
                
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                downloadFile(blob, filename);
            } else if (format === 'csv') {
                const headers = ['测试ID', '时间', '人格类型', '外向性(E)', '神经质(N)', '宜人性(A)', '尽责性(C)', '开放性(O)'];
                const rows = mockData.recentTests.map(test => [
                    test.id,
                    `"${test.timestamp}"`,
                    `"${test.personalityType}"`,
                    test.scores.E,
                    test.scores.N,
                    test.scores.A,
                    test.scores.C,
                    test.scores.O
                ]);
                
                const csvContent = [
                    headers.join(','),
                    ...rows.map(row => row.join(','))
                ].join('\n');
                
                const blob = new Blob([csvContent], { type: 'text/csv; charset=utf-8' });
                downloadFile(blob, filename);
            }
        }

        // 下载文件
        function downloadFile(blob, filename) {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }

        // 显示导出弹窗
        function showExportModal() {
            document.getElementById('export-modal').classList.remove('hidden');
        }

        // 隐藏导出弹窗
        function hideExportModal() {
            document.getElementById('export-modal').classList.add('hidden');
            document.getElementById('export-progress').style.width = '0%';
            document.getElementById('export-status').textContent = '正在准备导出数据，请稍候...';
        }

        // 显示提示消息
        function showToast(message) {
            // 创建提示元素
            const toast = document.createElement('div');
            toast.className = 'fixed top-4 right-4 bg-black text-white px-6 py-3 z-50 transform translate-x-full transition-transform duration-300';
            toast.textContent = message;
            
            document.body.appendChild(toast);
            
            // 显示提示
            setTimeout(() => {
                toast.classList.remove('translate-x-full');
            }, 100);
            
            // 自动隐藏
            setTimeout(() => {
                toast.classList.add('translate-x-full');
                setTimeout(() => {
                    document.body.removeChild(toast);
                }, 300);
            }, 3000);
        }
    </script>
</body>
</html>