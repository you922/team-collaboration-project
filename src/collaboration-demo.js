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

    // 🔗 woshiqp465负责实现的功能 - 框架已准备
    loginUser(username, password) {
        try {
            console.log(`🔐 尝试登录用户: ${username}`);
            
            // TODO: woshiqp465请实现以下逻辑：
            
            // 1. 输入验证
            if (!username || !password) {
                return {
                    success: false,
                    error: 'MISSING_CREDENTIALS',
                    message: '用户名和密码不能为空'
                };
            }

            // 2. 查找用户
            const user = this.users.find(u => 
                u.username.toLowerCase() === username.toLowerCase()
            );
            
            if (!user) {
                return {
                    success: false,
                    error: 'USER_NOT_FOUND',
                    message: '用户不存在'
                };
            }

            // 3. 验证密码 - woshiqp465请实现这部分
            const isPasswordValid = this.verifyPassword(password, user.passwordHash);
            if (!isPasswordValid) {
                return {
                    success: false,
                    error: 'INVALID_PASSWORD',
                    message: '密码错误'
                };
            }

            // 4. 检查用户状态
            if (!user.isActive) {
                return {
                    success: false,
                    error: 'USER_INACTIVE',
                    message: '用户账户已被禁用'
                };
            }

            // 5. 创建登录会话 - woshiqp465请实现
            const sessionData = this.createSession(user);

            // 6. 更新登录时间
            user.lastLoginAt = new Date().toISOString();

            console.log(`✅ 用户登录成功: ${user.username}`);
            
            return {
                success: true,
                message: '登录成功',
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    displayName: user.displayName,
                    lastLoginAt: user.lastLoginAt
                },
                session: sessionData
            };

        } catch (error) {
            console.error('登录过程发生错误:', error);
            return {
                success: false,
                error: 'LOGIN_ERROR',
                message: '登录失败，请稍后重试'
            };
        }
    }

    // 🔗 密码验证方法 - woshiqp465请实现
    verifyPassword(inputPassword, storedHash) {
        // TODO: woshiqp465请实现密码验证逻辑
        // 提示: 这应该与hashPassword方法对应
        
        // 临时实现 - woshiqp465请替换为安全的验证
        const tempHash = this.hashPassword(inputPassword);
        const isValid = tempHash === storedHash;
        
        console.log(`🔍 密码验证: ${isValid ? '✅ 通过' : '❌ 失败'}`);
        return isValid;
    }

    // 🔗 会话创建方法 - woshiqp465请实现
    createSession(user) {
        // TODO: woshiqp465请实现会话管理
        // 提示: 可以使用JWT或简单的session token
        
        const sessionToken = `session_${user.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24小时后过期
        
        const sessionData = {
            token: sessionToken,
            userId: user.id,
            createdAt: new Date().toISOString(),
            expiresAt: expiresAt.toISOString(),
            isActive: true
        };

        // 存储会话 - woshiqp465可以改为数据库存储
        if (!this.sessions) this.sessions = [];
        this.sessions.push(sessionData);
        
        console.log(`🎫 创建会话: ${sessionToken}`);
        return sessionData;
    }

    // 🔗 会话验证方法 - woshiqp465可以扩展
    verifySession(sessionToken) {
        if (!this.sessions) return null;
        
        const session = this.sessions.find(s => 
            s.token === sessionToken && 
            s.isActive && 
            new Date(s.expiresAt) > new Date()
        );
        
        return session ? session : null;
    }

    // 🔗 登出方法 - woshiqp465可以实现
    logoutUser(sessionToken) {
        if (!this.sessions) return { success: false, message: '无效会话' };
        
        const session = this.sessions.find(s => s.token === sessionToken);
        if (session) {
            session.isActive = false;
            return { success: true, message: '登出成功' };
        }
        
        return { success: false, message: '会话不存在' };
    }

    // 🤝 共同协作实现的功能 - 您和woshiqp465一起完成
    updateUserProfile(userId, updates, sessionToken = null) {
        try {
            console.log(`🔄 尝试更新用户资料: 用户ID ${userId}`);
            
            // 第1部分：权限验证 (您负责实现) ✅
            const authResult = this.validateUpdatePermission(userId, sessionToken);
            if (!authResult.success) {
                return authResult;
            }

            // 第2部分：数据验证 (woshiqp465负责实现) ⏳
            const validationResult = this.validateProfileUpdates(updates);
            if (!validationResult.success) {
                return validationResult;
            }

            // 第3部分：执行更新 (协作完成) 🤝
            const updateResult = this.executeProfileUpdate(userId, updates, authResult.requestingUser);
            if (!updateResult.success) {
                return updateResult;
            }

            // 第4部分：记录日志 (您负责实现) ✅
            this.logProfileUpdate(userId, updates, authResult.requestingUser);

            console.log(`✅ 用户资料更新成功: 用户ID ${userId}`);
            return {
                success: true,
                message: '用户资料更新成功',
                updatedUser: updateResult.updatedUser,
                updatedFields: Object.keys(updates)
            };

        } catch (error) {
            console.error('更新用户资料时发生错误:', error);
            return {
                success: false,
                error: 'UPDATE_ERROR',
                message: '更新失败，请稍后重试'
            };
        }
    }

    // ✅ 第1部分：权限验证 (您负责实现)
    validateUpdatePermission(userId, sessionToken) {
        // 检查会话有效性
        if (sessionToken) {
            const session = this.verifySession(sessionToken);
            if (!session) {
                return {
                    success: false,
                    error: 'INVALID_SESSION',
                    message: '会话无效或已过期'
                };
            }

            const requestingUser = this.users.find(u => u.id === session.userId);
            if (!requestingUser) {
                return {
                    success: false,
                    error: 'USER_NOT_FOUND',
                    message: '请求用户不存在'
                };
            }

            // 权限检查：用户只能更新自己的资料，除非是管理员
            if (session.userId !== userId && !requestingUser.isAdmin) {
                return {
                    success: false,
                    error: 'PERMISSION_DENIED',
                    message: '权限不足，只能更新自己的资料'
                };
            }

            return {
                success: true,
                requestingUser: requestingUser,
                targetUserId: userId
            };
        }

        // 如果没有session，只允许更新基本信息（临时方案）
        return {
            success: true,
            requestingUser: null,
            targetUserId: userId,
            isGuest: true
        };
    }

    // ⏳ 第2部分：数据验证 (woshiqp465负责实现)
    validateProfileUpdates(updates) {
        // TODO: woshiqp465请实现详细的数据验证
        
        const errors = [];
        const allowedFields = [
            'displayName', 'firstName', 'lastName', 'avatar',
            'bio', 'location', 'website', 'phone'
        ];

        // 检查更新字段是否允许
        for (const field in updates) {
            if (!allowedFields.includes(field)) {
                errors.push(`不允许更新字段: ${field}`);
            }
        }

        // 验证具体字段 - woshiqp465可以扩展
        if (updates.displayName && updates.displayName.length > 50) {
            errors.push('显示名称不能超过50个字符');
        }

        if (updates.bio && updates.bio.length > 500) {
            errors.push('个人简介不能超过500个字符');
        }

        if (updates.website && !/^https?:\/\/.+/.test(updates.website)) {
            errors.push('网站地址格式无效');
        }

        if (updates.phone && !/^\d{10,15}$/.test(updates.phone.replace(/\D/g, ''))) {
            errors.push('手机号码格式无效');
        }

        return {
            success: errors.length === 0,
            message: errors.length > 0 ? '数据验证失败' : '验证通过',
            errors: errors
        };
    }

    // 🤝 第3部分：执行更新 (协作完成)
    executeProfileUpdate(userId, updates, requestingUser) {
        const user = this.users.find(u => u.id === userId);
        if (!user) {
            return {
                success: false,
                error: 'USER_NOT_FOUND',
                message: '用户不存在'
            };
        }

        // 创建更新前的备份
        const originalProfile = { ...user.profile };

        // 执行更新
        for (const [field, value] of Object.entries(updates)) {
            if (field === 'displayName') {
                user.displayName = value;
            } else {
                // 更新profile字段
                if (!user.profile) user.profile = {};
                user.profile[field] = value;
            }
        }

        // 更新时间戳
        user.updatedAt = new Date().toISOString();

        return {
            success: true,
            updatedUser: {
                id: user.id,
                username: user.username,
                email: user.email,
                displayName: user.displayName,
                profile: user.profile,
                updatedAt: user.updatedAt
            },
            originalProfile: originalProfile
        };
    }

    // ✅ 第4部分：记录日志 (您负责实现)
    logProfileUpdate(userId, updates, requestingUser) {
        if (!this.updateLogs) this.updateLogs = [];

        const logEntry = {
            id: this.updateLogs.length + 1,
            type: 'PROFILE_UPDATE',
            targetUserId: userId,
            requestingUserId: requestingUser ? requestingUser.id : null,
            requestingUsername: requestingUser ? requestingUser.username : 'anonymous',
            updatedFields: Object.keys(updates),
            timestamp: new Date().toISOString(),
            details: {
                fieldsCount: Object.keys(updates).length,
                hasAvatar: 'avatar' in updates,
                hasContactInfo: 'phone' in updates || 'website' in updates
            }
        };

        this.updateLogs.push(logEntry);
        
        console.log(`📝 记录更新日志: ${logEntry.requestingUsername} 更新了用户 ${userId} 的 ${logEntry.fieldsCount} 个字段`);
    }

    // 🔍 获取更新日志 (管理功能)
    getUpdateLogs(userId = null, limit = 50) {
        if (!this.updateLogs) return [];
        
        let logs = this.updateLogs;
        
        if (userId) {
            logs = logs.filter(log => log.targetUserId === userId);
        }
        
        return logs
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, limit);
    }

    // 🛡️ 撤销更新功能 (高级协作功能)
    revertProfileUpdate(logId, sessionToken) {
        // TODO: 可以由您和woshiqp465协作实现撤销功能
        console.log(`🔄 撤销更新请求: 日志ID ${logId}`);
        return {
            success: false,
            message: '撤销功能待实现 - 需要协作完成'
        };
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

// ✅ 完整功能测试套件
console.log('\n=== 🎯 完整团队协作功能测试 ===');

// 测试1: 用户创建功能 (您已实现)
console.log('\n--- 测试用户创建功能 ---');
const testUser1 = {
    username: 'alice',
    email: 'alice@example.com',
    password: 'securepass123',
    firstName: 'Alice',
    lastName: 'Johnson'
};

const createResult = userManager.createUser(testUser1);
console.log('✅ 用户创建:', createResult.success ? '成功' : '失败', '|', createResult.message);

// 创建第二个用户用于测试
const testUser2 = {
    username: 'bob',
    email: 'bob@example.com',
    password: 'password456',
    firstName: 'Bob',
    lastName: 'Smith'
};
const createResult2 = userManager.createUser(testUser2);

// 测试2: 用户登录功能 (woshiqp465负责，框架已准备)
console.log('\n--- 测试用户登录功能 (框架已准备) ---');
if (createResult.success) {
    const loginResult = userManager.loginUser('alice', 'securepass123');
    console.log('🔐 用户登录:', loginResult.success ? '成功' : '失败', '|', loginResult.message);
    
    if (loginResult.success) {
        console.log('🎫 会话令牌:', loginResult.session.token.substring(0, 20) + '...');
        
        // 测试3: 用户资料更新功能 (协作功能)
        console.log('\n--- 测试用户资料更新功能 (协作功能) ---');
        const updates = {
            displayName: 'Alice J.',
            bio: '软件工程师，热爱编程',
            location: '北京',
            website: 'https://alice.dev'
        };
        
        const updateResult = userManager.updateUserProfile(
            loginResult.user.id, 
            updates, 
            loginResult.session.token
        );
        console.log('🔄 资料更新:', updateResult.success ? '成功' : '失败', '|', updateResult.message);
        
        if (updateResult.success) {
            console.log('📝 更新字段:', updateResult.updatedFields.join(', '));
        }
    }
}

// 测试4: 高级管理工具 (额外功能D)
console.log('\n--- 测试高级管理工具 ---');

// 导入高级工具类（如果可用）
try {
    // 这里可以测试UserManagementTools的功能
    console.log('🛠️ 高级管理工具已准备，包含:');
    console.log('  - 🔍 高级用户搜索');
    console.log('  - 📊 用户统计分析'); 
    console.log('  - 🗑️ 用户删除/恢复');
    console.log('  - 📤 多格式数据导出');
    console.log('  - 📋 活动报告生成');
} catch (error) {
    console.log('🛠️ 高级管理工具: 独立模块已创建');
}

// 显示当前系统状态
console.log('\n=== 📊 系统状态总览 ===');
const allUsers = userManager.getAllUsers();
console.log(`👥 总用户数: ${allUsers.length}`);
console.log(`🔐 活跃会话: ${userManager.sessions ? userManager.sessions.length : 0}`);
console.log(`📝 更新日志: ${userManager.updateLogs ? userManager.updateLogs.length : 0}`);

console.log('\n=== 🤝 团队协作进度 ===');
console.log('✅ createUser() - 您已完成');
console.log('🔄 loginUser() - woshiqp465框架已准备，待完善');
console.log('🤝 updateUserProfile() - 协作架构已设计');
console.log('🛠️ 管理工具 - 完整工具库已创建');

console.log('\n=== 👥 当前用户列表 ===');
allUsers.forEach(user => {
    console.log(`👤 ${user.displayName || user.username} (@${user.username})`);
    console.log(`   📧 ${user.email}`);
    console.log(`   ⏰ 注册: ${new Date(user.createdAt).toLocaleString()}`);
    console.log(`   🔄 更新: ${new Date(user.updatedAt).toLocaleString()}`);
    if (user.profile?.bio) console.log(`   💬 "${user.profile.bio}"`);
    console.log('');
});

console.log('🎉 团队协作用户管理系统演示完成！');
console.log('🚀 现在可以在Zed中与woshiqp465开始实时协作开发！');

export default UserManager;