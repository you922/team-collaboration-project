// 团队协作开发演示 - 用户管理系统
// 由 Claude Code 生成，供您与 woshiqp465 协作开发

class UserManager {
    constructor() {
        this.users = [];
        this.currentId = 1;
    }

    // ✅ 您负责实现的功能 - 由Claude Code完成
    createUser(userData) {
        try {
            // 1. 数据验证
            const validationResult = this.validateUserData(userData);
            if (!validationResult.isValid) {
                return {
                    success: false,
                    error: 'VALIDATION_ERROR',
                    message: validationResult.message,
                    details: validationResult.errors
                };
            }

            // 2. 检查用户名和邮箱是否已存在
            const duplicateCheck = this.checkDuplicateUser(userData.username, userData.email);
            if (!duplicateCheck.isUnique) {
                return {
                    success: false,
                    error: 'DUPLICATE_USER',
                    message: duplicateCheck.message
                };
            }

            // 3. 创建用户对象
            const newUser = {
                id: this.currentId++,
                username: userData.username.toLowerCase().trim(),
                email: userData.email.toLowerCase().trim(),
                displayName: userData.displayName || userData.username,
                passwordHash: this.hashPassword(userData.password),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                isActive: true,
                profile: {
                    firstName: userData.firstName || '',
                    lastName: userData.lastName || '',
                    avatar: userData.avatar || null
                }
            };

            // 4. 添加用户到数组
            this.users.push(newUser);

            // 5. 返回成功结果（不包含密码）
            const { passwordHash, ...userResponse } = newUser;
            
            console.log(`✅ 用户创建成功: ${newUser.username} (ID: ${newUser.id})`);
            
            return {
                success: true,
                message: '用户创建成功',
                user: userResponse
            };

        } catch (error) {
            console.error('创建用户时发生错误:', error);
            return {
                success: false,
                error: 'INTERNAL_ERROR',
                message: '服务器内部错误，请稍后重试'
            };
        }
    }

    // 数据验证方法
    validateUserData(userData) {
        const errors = [];

        // 检查必填字段
        if (!userData.username) errors.push('用户名不能为空');
        if (!userData.email) errors.push('邮箱不能为空');
        if (!userData.password) errors.push('密码不能为空');

        // 用户名验证
        if (userData.username) {
            if (userData.username.length < 3) errors.push('用户名至少3个字符');
            if (userData.username.length > 20) errors.push('用户名最多20个字符');
            if (!/^[a-zA-Z0-9_]+$/.test(userData.username)) {
                errors.push('用户名只能包含字母、数字和下划线');
            }
        }

        // 邮箱验证
        if (userData.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(userData.email)) {
                errors.push('邮箱格式无效');
            }
        }

        // 密码验证
        if (userData.password) {
            if (userData.password.length < 6) errors.push('密码至少6个字符');
            if (userData.password.length > 100) errors.push('密码最多100个字符');
        }

        return {
            isValid: errors.length === 0,
            message: errors.length > 0 ? '数据验证失败' : '验证通过',
            errors
        };
    }

    // 检查重复用户
    checkDuplicateUser(username, email) {
        const existingByUsername = this.users.find(
            user => user.username.toLowerCase() === username.toLowerCase()
        );
        
        const existingByEmail = this.users.find(
            user => user.email.toLowerCase() === email.toLowerCase()
        );

        if (existingByUsername) {
            return {
                isUnique: false,
                message: '用户名已被使用'
            };
        }

        if (existingByEmail) {
            return {
                isUnique: false,
                message: '邮箱已被注册'
            };
        }

        return {
            isUnique: true,
            message: '用户名和邮箱可用'
        };
    }

    // 简单密码哈希（生产环境应使用bcrypt等安全库）
    hashPassword(password) {
        // 这里使用简单的哈希，实际项目中应使用bcrypt
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // 转换为32位整数
        }
        return `simple_hash_${Math.abs(hash)}_${password.length}`;
    }

    // TODO: woshiqp465负责实现的功能  
    loginUser(username, password) {
        // 请woshiqp465实现用户登录逻辑
        console.log('待实现：用户登录功能');
        // 提示：验证用户名密码，返回登录状态
    }

    // TODO: 共同协作实现的功能
    updateUserProfile(userId, updates) {
        // 这个功能需要两人协作完成
        console.log('待实现：更新用户资料');
        // 提示：验证权限，更新数据，记录日志
    }

    // 示例：已完成的功能（由Claude Code生成）
    getAllUsers() {
        return this.users.map(user => ({
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt
        }));
    }
}

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserManager;
}

// 演示用法和测试
const userManager = new UserManager();
console.log('🤝 团队协作开发演示项目启动！');
console.log('👥 请与 woshiqp465 一起完成用户管理系统的开发');

// ✅ 测试createUser功能
console.log('\n=== 测试用户创建功能 ===');

// 测试1: 创建有效用户
const testUser1 = {
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123',
    firstName: 'Test',
    lastName: 'User'
};

const result1 = userManager.createUser(testUser1);
console.log('测试1 - 创建有效用户:', result1.success ? '✅ 成功' : '❌ 失败', result1.message);

// 测试2: 尝试创建重复用户
const result2 = userManager.createUser(testUser1);
console.log('测试2 - 重复用户:', result2.success ? '✅ 成功' : '❌ 失败', result2.message);

// 测试3: 无效数据验证
const invalidUser = {
    username: 'ab', // 太短
    email: 'invalid-email', // 无效邮箱
    password: '123' // 太短
};

const result3 = userManager.createUser(invalidUser);
console.log('测试3 - 无效数据:', result3.success ? '✅ 成功' : '❌ 失败', result3.message);
if (result3.details) {
    console.log('错误详情:', result3.details);
}

// 显示所有用户
console.log('\n=== 当前用户列表 ===');
const allUsers = userManager.getAllUsers();
console.log(`共有 ${allUsers.length} 个用户:`);
allUsers.forEach(user => {
    console.log(`- ${user.username} (${user.email}) - 创建于: ${user.createdAt}`);
});

console.log('\n✨ createUser功能实现完成！等待woshiqp465实现loginUser功能...');

export default UserManager;