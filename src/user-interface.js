// 用户界面管理 - 您负责的前端功能
// 由 Claude Code 生成，与 createUser() 完美配合

import UserManager from './collaboration-demo.js';

class UserInterface {
    constructor() {
        this.userManager = new UserManager();
        this.currentUser = null;
        this.init();
    }

    // 初始化界面
    init() {
        console.log('🎨 用户界面初始化中...');
        this.createHTML();
        this.bindEvents();
        this.updateUserList();
    }

    // 创建HTML结构
    createHTML() {
        const appContainer = document.createElement('div');
        appContainer.id = 'user-management-app';
        appContainer.innerHTML = `
            <div class="header">
                <h1>🤝 团队协作用户管理系统</h1>
                <p>由 Claude Code + Zed 协作开发</p>
            </div>

            <div class="main-content">
                <!-- 用户注册表单 -->
                <div class="form-section">
                    <h2>👤 用户注册</h2>
                    <form id="register-form" class="user-form">
                        <div class="form-group">
                            <label for="username">用户名 *</label>
                            <input type="text" id="username" name="username" 
                                   placeholder="3-20个字符，仅字母数字下划线" required>
                            <span class="error-text" id="username-error"></span>
                        </div>

                        <div class="form-group">
                            <label for="email">邮箱 *</label>
                            <input type="email" id="email" name="email" 
                                   placeholder="example@domain.com" required>
                            <span class="error-text" id="email-error"></span>
                        </div>

                        <div class="form-group">
                            <label for="password">密码 *</label>
                            <input type="password" id="password" name="password" 
                                   placeholder="至少6个字符" required>
                            <span class="error-text" id="password-error"></span>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="firstName">姓</label>
                                <input type="text" id="firstName" name="firstName" 
                                       placeholder="可选">
                            </div>
                            <div class="form-group">
                                <label for="lastName">名</label>
                                <input type="text" id="lastName" name="lastName" 
                                       placeholder="可选">
                            </div>
                        </div>

                        <button type="submit" class="submit-btn">
                            🚀 创建用户
                        </button>
                    </form>
                </div>

                <!-- 用户登录表单 (woshiqp465负责) -->
                <div class="form-section">
                    <h2>🔐 用户登录 <span class="todo-badge">woshiqp465待实现</span></h2>
                    <form id="login-form" class="user-form">
                        <div class="form-group">
                            <label for="login-username">用户名</label>
                            <input type="text" id="login-username" name="username" 
                                   placeholder="请输入用户名" disabled>
                        </div>
                        <div class="form-group">
                            <label for="login-password">密码</label>
                            <input type="password" id="login-password" name="password" 
                                   placeholder="请输入密码" disabled>
                        </div>
                        <button type="submit" class="submit-btn" disabled>
                            🔒 登录 (待woshiqp465实现)
                        </button>
                    </form>
                </div>
            </div>

            <!-- 用户列表显示 -->
            <div class="users-section">
                <h2>👥 用户列表</h2>
                <div id="user-stats" class="stats-bar"></div>
                <div id="users-container" class="users-grid"></div>
                <div id="user-actions" class="action-buttons">
                    <button id="refresh-btn" class="action-btn">🔄 刷新列表</button>
                    <button id="export-btn" class="action-btn">📤 导出数据</button>
                    <button id="search-btn" class="action-btn">🔍 搜索用户</button>
                </div>
            </div>

            <!-- 消息提示 -->
            <div id="message-container"></div>
        `;

        // 添加CSS样式
        const style = document.createElement('style');
        style.textContent = this.getCSS();
        document.head.appendChild(style);
        
        // 将界面添加到页面
        document.body.appendChild(appContainer);
    }

    // CSS样式
    getCSS() {
        return `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            #user-management-app {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                color: #333;
            }

            .header {
                text-align: center;
                margin-bottom: 40px;
                color: white;
            }

            .header h1 {
                font-size: 2.5rem;
                margin-bottom: 10px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }

            .main-content {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 30px;
                margin-bottom: 40px;
            }

            .form-section {
                background: white;
                padding: 30px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            }

            .form-section h2 {
                margin-bottom: 20px;
                color: #4a5568;
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .todo-badge {
                background: #fed7d7;
                color: #c53030;
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 0.7rem;
                font-weight: bold;
            }

            .user-form {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            .form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
            }

            .form-group {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }

            .form-group label {
                font-weight: 600;
                color: #4a5568;
            }

            .form-group input {
                padding: 12px 15px;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                font-size: 1rem;
                transition: border-color 0.3s ease;
            }

            .form-group input:focus {
                outline: none;
                border-color: #667eea;
                box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            }

            .form-group input:disabled {
                background-color: #f7fafc;
                color: #a0aec0;
                cursor: not-allowed;
            }

            .error-text {
                color: #e53e3e;
                font-size: 0.875rem;
                min-height: 20px;
            }

            .submit-btn {
                background: linear-gradient(45deg, #667eea, #764ba2);
                color: white;
                border: none;
                padding: 15px 30px;
                border-radius: 8px;
                font-size: 1.1rem;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.2s ease;
            }

            .submit-btn:hover:not(:disabled) {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
            }

            .submit-btn:disabled {
                background: #cbd5e0;
                cursor: not-allowed;
                transform: none;
            }

            .users-section {
                background: white;
                padding: 30px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            }

            .stats-bar {
                background: #f7fafc;
                padding: 15px;
                border-radius: 8px;
                margin-bottom: 20px;
                font-weight: 600;
                color: #4a5568;
            }

            .users-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 20px;
                margin-bottom: 20px;
            }

            .user-card {
                background: #f8f9fa;
                border: 1px solid #e2e8f0;
                border-radius: 10px;
                padding: 20px;
                transition: transform 0.2s ease;
            }

            .user-card:hover {
                transform: translateY(-3px);
                box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            }

            .user-card h3 {
                color: #2d3748;
                margin-bottom: 10px;
            }

            .user-info {
                color: #718096;
                font-size: 0.9rem;
                line-height: 1.5;
            }

            .action-buttons {
                display: flex;
                gap: 15px;
                flex-wrap: wrap;
            }

            .action-btn {
                background: white;
                border: 2px solid #667eea;
                color: #667eea;
                padding: 10px 20px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
            }

            .action-btn:hover {
                background: #667eea;
                color: white;
            }

            .message {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 8px;
                font-weight: 600;
                z-index: 1000;
                animation: slideIn 0.3s ease;
            }

            .message.success {
                background: #c6f6d5;
                color: #25543e;
                border: 1px solid #9ae6b4;
            }

            .message.error {
                background: #fed7d7;
                color: #c53030;
                border: 1px solid #feb2b2;
            }

            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }

            @media (max-width: 768px) {
                .main-content {
                    grid-template-columns: 1fr;
                }
                
                .form-row {
                    grid-template-columns: 1fr;
                }
                
                .users-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;
    }

    // 绑定事件
    bindEvents() {
        // 注册表单提交
        document.getElementById('register-form').addEventListener('submit', (e) => {
            this.handleRegistration(e);
        });

        // 实时验证
        ['username', 'email', 'password'].forEach(field => {
            document.getElementById(field).addEventListener('blur', (e) => {
                this.validateField(field, e.target.value);
            });
        });

        // 刷新按钮
        document.getElementById('refresh-btn').addEventListener('click', () => {
            this.updateUserList();
            this.showMessage('用户列表已刷新', 'success');
        });

        // 导出按钮
        document.getElementById('export-btn').addEventListener('click', () => {
            this.exportUsers();
        });

        // 搜索按钮
        document.getElementById('search-btn').addEventListener('click', () => {
            this.showSearchDialog();
        });
    }

    // 处理用户注册
    handleRegistration(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const userData = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName')
        };

        // 清除之前的错误信息
        this.clearErrors();

        // 调用createUser功能
        const result = this.userManager.createUser(userData);

        if (result.success) {
            this.showMessage(`✅ 用户 ${result.user.username} 创建成功！`, 'success');
            e.target.reset();
            this.updateUserList();
        } else {
            this.showMessage(`❌ ${result.message}`, 'error');
            
            // 显示详细错误信息
            if (result.details) {
                result.details.forEach(error => {
                    this.showFieldError(error);
                });
            }
        }
    }

    // 字段验证
    validateField(fieldName, value) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        let error = '';

        switch (fieldName) {
            case 'username':
                if (value.length < 3) error = '用户名至少3个字符';
                else if (value.length > 20) error = '用户名最多20个字符';
                else if (!/^[a-zA-Z0-9_]+$/.test(value)) error = '只能包含字母、数字和下划线';
                break;
            case 'email':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = '邮箱格式无效';
                break;
            case 'password':
                if (value.length < 6) error = '密码至少6个字符';
                else if (value.length > 100) error = '密码最多100个字符';
                break;
        }

        errorElement.textContent = error;
        return error === '';
    }

    // 更新用户列表
    updateUserList() {
        const users = this.userManager.getAllUsers();
        const container = document.getElementById('users-container');
        const stats = document.getElementById('user-stats');

        // 更新统计信息
        stats.textContent = `共有 ${users.length} 个用户`;

        // 更新用户卡片
        container.innerHTML = users.map(user => `
            <div class="user-card">
                <h3>👤 ${user.displayName || user.username}</h3>
                <div class="user-info">
                    <p><strong>用户名:</strong> ${user.username}</p>
                    <p><strong>邮箱:</strong> ${user.email}</p>
                    <p><strong>ID:</strong> ${user.id}</p>
                    <p><strong>创建时间:</strong> ${new Date(user.createdAt).toLocaleString()}</p>
                    <p><strong>状态:</strong> ${user.isActive ? '🟢 活跃' : '🔴 禁用'}</p>
                </div>
            </div>
        `).join('');
    }

    // 导出用户数据
    exportUsers() {
        const users = this.userManager.getAllUsers();
        const dataStr = JSON.stringify(users, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `users_export_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        this.showMessage(`📤 导出 ${users.length} 个用户数据`, 'success');
    }

    // 搜索对话框
    showSearchDialog() {
        const query = prompt('🔍 搜索用户 (输入用户名或邮箱):');
        if (query) {
            const users = this.userManager.getAllUsers();
            const results = users.filter(user => 
                user.username.includes(query.toLowerCase()) ||
                user.email.includes(query.toLowerCase())
            );
            
            if (results.length > 0) {
                this.showMessage(`🔍 找到 ${results.length} 个用户`, 'success');
                // 这里可以高亮显示搜索结果
            } else {
                this.showMessage('😔 未找到匹配的用户', 'error');
            }
        }
    }

    // 显示消息
    showMessage(message, type = 'success') {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${type}`;
        messageEl.textContent = message;
        
        document.getElementById('message-container').appendChild(messageEl);
        
        setTimeout(() => {
            messageEl.remove();
        }, 4000);
    }

    // 清除错误信息
    clearErrors() {
        document.querySelectorAll('.error-text').forEach(el => {
            el.textContent = '';
        });
    }

    // 显示字段错误
    showFieldError(errorMessage) {
        if (errorMessage.includes('用户名')) {
            document.getElementById('username-error').textContent = errorMessage;
        } else if (errorMessage.includes('邮箱')) {
            document.getElementById('email-error').textContent = errorMessage;
        } else if (errorMessage.includes('密码')) {
            document.getElementById('password-error').textContent = errorMessage;
        }
    }
}

// 导出类
export default UserInterface;