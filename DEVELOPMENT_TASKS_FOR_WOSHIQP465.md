# 💻 woshiqp465 开发任务详细指导

## 🎯 您的核心开发任务

### 主要任务：完善用户登录系统

**目标**: 将现有的登录框架完善为生产级别的安全登录系统  
**预估时间**: 2-4小时  
**难度等级**: ⭐⭐⭐ (中等)

---

## 📋 具体任务清单

### ✅ 已完成 (框架已准备)
- [x] `loginUser()` 方法基础结构
- [x] 用户查找逻辑
- [x] 基本的错误处理
- [x] 会话Token生成机制
- [x] 用户状态检查

### 🔧 您需要实现的功能

#### 1️⃣ 优化密码验证系统 ⭐⭐⭐
**文件**: `src/collaboration-demo.js`  
**位置**: 第235行 `verifyPassword()` 方法

**当前实现问题**:
```javascript
// 临时实现 - 需要您改进
verifyPassword(inputPassword, storedHash) {
    const tempHash = this.hashPassword(inputPassword);
    return tempHash === storedHash;
}
```

**您需要做什么**:
```javascript
// 建议实现方案1: 使用bcrypt
import bcrypt from 'bcrypt';

verifyPassword(inputPassword, storedHash) {
    try {
        // bcrypt会自动处理salt验证
        return bcrypt.compareSync(inputPassword, storedHash);
    } catch (error) {
        console.error('密码验证失败:', error);
        return false;
    }
}

// 同时需要修改createUser中的hashPassword方法
hashPassword(password) {
    const saltRounds = 12;
    return bcrypt.hashSync(password, saltRounds);
}
```

**需要安装依赖**:
```bash
npm install bcrypt
npm install @types/bcrypt  # 如果使用TypeScript
```

#### 2️⃣ 增强会话管理系统 ⭐⭐
**文件**: `src/collaboration-demo.js`  
**位置**: 第248行 `createSession()` 方法

**当前实现**:
```javascript
// 简单实现 - 您可以改进
createSession(user) {
    const sessionToken = `session_${user.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    // ... 基础实现
}
```

**建议改进方案**:
```javascript
import jwt from 'jsonwebtoken';

createSession(user) {
    // 方案1: JWT Token
    const payload = {
        userId: user.id,
        username: user.username,
        loginTime: new Date().toISOString()
    };
    
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'your-secret-key', {
        expiresIn: '24h',
        issuer: 'team-collaboration-system'
    });
    
    const sessionData = {
        token: token,
        userId: user.id,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        isActive: true,
        userAgent: 'collaboration-system', // 可以扩展
        ipAddress: null // 可以添加IP跟踪
    };
    
    // 存储到会话数组
    if (!this.sessions) this.sessions = [];
    this.sessions.push(sessionData);
    
    return sessionData;
}
```

**需要安装依赖**:
```bash
npm install jsonwebtoken
npm install @types/jsonwebtoken
```

#### 3️⃣ 完善数据验证系统 ⭐⭐
**文件**: `src/collaboration-demo.js`  
**位置**: 第389行 `validateProfileUpdates()` 方法

**当前状态**: 基础验证已实现，需要您扩展

**您需要添加的验证**:
```javascript
validateProfileUpdates(updates) {
    const errors = [];
    const allowedFields = [
        'displayName', 'firstName', 'lastName', 'avatar',
        'bio', 'location', 'website', 'phone'
    ];

    // 您可以添加的高级验证：
    
    // 1. 恶意内容检查
    for (const [field, value] of Object.entries(updates)) {
        if (typeof value === 'string') {
            // XSS检查
            if (/<script|javascript:|data:/i.test(value)) {
                errors.push(`${field}字段包含不安全内容`);
            }
            
            // SQL注入检查
            if (/(\b(SELECT|INSERT|UPDATE|DELETE|DROP)\b)/i.test(value)) {
                errors.push(`${field}字段包含可疑内容`);
            }
        }
    }
    
    // 2. 高级字段验证
    if (updates.website) {
        // URL验证改进
        try {
            const url = new URL(updates.website);
            if (!['http:', 'https:'].includes(url.protocol)) {
                errors.push('网站地址只支持HTTP/HTTPS协议');
            }
        } catch {
            errors.push('网站地址格式无效');
        }
    }
    
    if (updates.phone) {
        // 国际手机号验证
        const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10,14}$/;
        if (!phoneRegex.test(updates.phone.replace(/\s/g, ''))) {
            errors.push('手机号码格式无效');
        }
    }
    
    // 3. 字符长度和内容检查
    if (updates.bio && updates.bio.length > 500) {
        errors.push('个人简介不能超过500个字符');
    }
    
    if (updates.location && updates.location.length > 100) {
        errors.push('所在地不能超过100个字符');
    }
    
    return {
        success: errors.length === 0,
        message: errors.length > 0 ? '数据验证失败' : '验证通过',
        errors: errors
    };
}
```

### 🔒 可选高级任务

#### 4️⃣ 登录安全增强 ⭐⭐⭐⭐
**新增功能 - 您可以自由实现**

```javascript
// 添加登录失败限制
class LoginSecurityManager {
    constructor() {
        this.loginAttempts = new Map(); // IP -> {count, lastAttempt, lockedUntil}
        this.maxAttempts = 5;
        this.lockoutDuration = 15 * 60 * 1000; // 15分钟
    }
    
    checkLoginAttempt(identifier) {
        const attempts = this.loginAttempts.get(identifier);
        
        if (attempts && attempts.lockedUntil > Date.now()) {
            return {
                allowed: false,
                message: '账户已被锁定，请稍后重试',
                lockedUntil: new Date(attempts.lockedUntil)
            };
        }
        
        return { allowed: true };
    }
    
    recordFailedLogin(identifier) {
        const attempts = this.loginAttempts.get(identifier) || { count: 0, lastAttempt: 0, lockedUntil: 0 };
        
        attempts.count += 1;
        attempts.lastAttempt = Date.now();
        
        if (attempts.count >= this.maxAttempts) {
            attempts.lockedUntil = Date.now() + this.lockoutDuration;
        }
        
        this.loginAttempts.set(identifier, attempts);
    }
    
    recordSuccessfulLogin(identifier) {
        this.loginAttempts.delete(identifier);
    }
}
```

---

## 🧪 测试您的实现

### 测试用例

```javascript
// 在src/collaboration-demo.js末尾添加测试
console.log('\n=== woshiqp465 功能测试 ===');

// 测试1: 密码验证
console.log('\n--- 测试密码验证 ---');
const testHash = userManager.hashPassword('testpassword123');
const isValid = userManager.verifyPassword('testpassword123', testHash);
console.log('✅ 密码验证:', isValid ? '通过' : '失败');

// 测试2: JWT会话
console.log('\n--- 测试JWT会话 ---');
if (createResult.success) {
    const loginResult = userManager.loginUser('alice', 'securepass123');
    if (loginResult.success) {
        console.log('✅ JWT令牌生成:', loginResult.session.token ? '成功' : '失败');
        
        // 验证JWT
        const session = userManager.verifySession(loginResult.session.token);
        console.log('✅ JWT验证:', session ? '成功' : '失败');
    }
}

// 测试3: 数据验证增强
console.log('\n--- 测试数据验证 ---');
const maliciousUpdates = {
    bio: '<script>alert("xss")</script>',
    website: 'javascript:alert("hack")',
    phone: '123' // 无效手机号
};
const validationResult = userManager.validateProfileUpdates(maliciousUpdates);
console.log('✅ 恶意内容检测:', !validationResult.success ? '通过' : '失败');
console.log('🛡️ 检测到错误:', validationResult.errors);
```

### 预期测试结果

```
=== woshiqp465 功能测试 ===

--- 测试密码验证 ---
✅ 密码验证: 通过

--- 测试JWT会话 ---
🔐 尝试登录用户: alice
🔍 密码验证: ✅ 通过
🎫 创建JWT会话: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
✅ 用户登录成功: alice
✅ JWT令牌生成: 成功
✅ JWT验证: 成功

--- 测试数据验证 ---
✅ 恶意内容检测: 通过
🛡️ 检测到错误: ["bio字段包含不安全内容", "网站地址格式无效", "手机号码格式无效"]
```

---

## 📚 参考资源

### 必读文档
- [bcrypt文档](https://www.npmjs.com/package/bcrypt)
- [JWT文档](https://www.npmjs.com/package/jsonwebtoken)
- [Node.js安全最佳实践](https://nodejs.org/en/docs/guides/security/)

### 代码示例
- 查看 `src/collaboration-demo.js` 中现有的 `createUser()` 实现
- 参考 `src/user-interface.js` 中的验证逻辑
- 学习 `src/user-management-tools.js` 中的高级功能

---

## 🎯 完成标准

### 最低要求 ✅
- [ ] `verifyPassword()` 使用安全的密码验证
- [ ] `createSession()` 生成有效的会话令牌
- [ ] `validateProfileUpdates()` 基本数据验证
- [ ] 所有现有测试通过

### 推荐标准 ⭐
- [ ] 使用bcrypt进行密码哈希
- [ ] JWT令牌会话管理
- [ ] XSS和注入攻击防护
- [ ] 详细的错误日志

### 优秀标准 🏆
- [ ] 登录失败限制机制
- [ ] 账户锁定功能
- [ ] 高级安全检查
- [ ] 完整的单元测试

---

## 🤝 协作提示

### 与项目负责人沟通
- **提问**: 不确定的地方及时在Zed协作会话中询问
- **进度**: 定期更新开发进度
- **测试**: 完成功能后一起测试

### 代码规范
- 使用相同的代码格式和注释风格
- 添加适当的错误处理
- 编写清晰的提交信息

### Git工作流
```bash
# 1. 同步最新代码
git pull origin main

# 2. 创建您的开发分支
git checkout -b feature/woshiqp465-login-enhancements

# 3. 完成开发后提交
git add .
git commit -m "feat: 完善用户登录系统安全性

- 实现bcrypt密码验证
- 添加JWT会话管理
- 增强数据验证安全检查
- 添加登录失败限制机制

🤖 Generated with Claude Code
Co-Authored-By: woshiqp465 <woshiqp465@users.noreply.github.com>"

# 4. 推送并创建PR
git push -u origin feature/woshiqp465-login-enhancements
```

---

## 🚀 开始开发

**您现在可以：**

1. **查看代码**: 仔细阅读 `src/collaboration-demo.js` 第235行和248行
2. **安装依赖**: `npm install bcrypt jsonwebtoken`
3. **开始实现**: 从 `verifyPassword()` 方法开始
4. **实时协作**: 在Zed协作会话中与项目负责人讨论

**预计开发时间**: 2-4小时  
**建议开发顺序**: 密码验证 → JWT会话 → 数据验证 → 安全增强

---

> 🎯 **您的开发任务已明确！**  
> 🤝 **随时在Zed协作会话中沟通**  
> 🚀 **开始实现您的登录系统吧！**