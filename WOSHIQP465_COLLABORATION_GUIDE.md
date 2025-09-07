# 🤝 woshiqp465 团队协作使用指南

欢迎加入团队协作项目！这里是您参与 Claude Code + Zed 协作开发的完整指南。

---

## 🚀 快速开始步骤

### 第1步：克隆项目到本地
```bash
# 克隆GitHub项目
git clone https://github.com/you922/team-collaboration-project.git
cd team-collaboration-project

# 查看项目结构
ls -la
```

### 第2步：安装和设置环境
```bash
# 如果项目有依赖，安装它们
npm install  # 如果有package.json

# 测试项目是否能正常运行
node src/collaboration-demo.js
```

### 第3步：下载并安装Zed编辑器
1. 访问：https://zed.dev
2. 下载适合您操作系统的版本
3. 安装Zed编辑器

### 第4步：在Zed中打开项目
```bash
# 如果Zed已安装命令行工具
zed team-collaboration-project

# 或者在Zed应用中: File -> Open -> 选择项目文件夹
```

---

## 🎯 您的开发任务

### 🔐 主要任务：实现用户登录功能

**文件位置**: `src/collaboration-demo.js`  
**方法名**: `loginUser(username, password)`  
**状态**: ✅ 框架已准备，您需要完善实现

#### 您需要实现的部分：

1. **密码验证优化** (`verifyPassword` 方法)
   - 当前是临时实现，需要使用安全的密码验证
   - 建议使用bcrypt或类似加密库

2. **会话管理改进** (`createSession` 方法)
   - 可以改为JWT token
   - 添加数据库存储支持
   - 实现会话过期机制

3. **登录安全增强**
   - 添加登录失败次数限制
   - 实现账户锁定机制
   - 添加登录日志记录

### 🤝 协作任务：完善用户资料更新

**文件位置**: `src/collaboration-demo.js`  
**方法名**: `updateUserProfile()` 中的数据验证部分  
**您负责**: `validateProfileUpdates()` 方法的详细实现

---

## 💻 代码协作流程

### 实时协作开发

1. **加入Zed协作会话**
   - 项目负责人会向您发送Zed协作链接
   - 点击链接加入协作会话
   - 您将看到实时的代码编辑和光标位置

2. **协作编辑**
   - 您的光标和选择会以彩色显示给其他协作者
   - 可以同时编辑不同部分的代码
   - 实时看到其他人的修改

3. **Git工作流程**
   ```bash
   # 开始工作前先同步
   git pull origin main
   
   # 创建您的功能分支
   git checkout -b feature/woshiqp465-login-system
   
   # 进行开发...
   
   # 提交您的更改
   git add .
   git commit -m "feat: 实现用户登录功能
   
   - 优化密码验证逻辑
   - 改进会话管理系统
   - 添加登录安全检查
   
   🤖 Generated with Claude Code
   Co-Authored-By: woshiqp465 <woshiqp465@users.noreply.github.com>"
   
   # 推送分支
   git push -u origin feature/woshiqp465-login-system
   
   # 在GitHub上创建Pull Request
   ```

---

## 📋 具体开发指导

### 🔐 loginUser() 方法完善指导

**当前文件**: `src/collaboration-demo.js` 第156行

```javascript
// 您需要改进的部分：

// 1. 改进密码验证 (第235行)
verifyPassword(inputPassword, storedHash) {
    // TODO: woshiqp465请实现安全的密码验证
    // 建议使用 bcrypt 或其他安全库
    
    // 临时实现 - 请替换
    const tempHash = this.hashPassword(inputPassword);
    return tempHash === storedHash;
}

// 2. 改进会话管理 (第248行)
createSession(user) {
    // TODO: woshiqp465可以实现JWT或其他会话方案
    
    // 您可以：
    // - 使用JWT token
    // - 连接数据库存储会话
    // - 实现更复杂的会话管理
}
```

### 🤝 协作更新功能指导

**当前文件**: `src/collaboration-demo.js` 第389行

```javascript
// 您需要完善的部分：
validateProfileUpdates(updates) {
    // TODO: woshiqp465请实现详细的数据验证
    
    // 当前有基础验证，您可以扩展：
    // - 添加更多字段验证规则
    // - 实现复杂的业务验证逻辑
    // - 添加安全检查
}
```

---

## 🌟 推荐的实现方案

### 方案1：使用bcrypt进行密码验证
```bash
# 安装bcrypt
npm install bcrypt

# 在代码中使用
import bcrypt from 'bcrypt';

// 在verifyPassword方法中：
const isValid = await bcrypt.compare(inputPassword, storedHash);
```

### 方案2：使用JWT进行会话管理
```bash
# 安装jsonwebtoken
npm install jsonwebtoken

# 在createSession方法中：
import jwt from 'jsonwebtoken';

const token = jwt.sign(
    { userId: user.id, username: user.username }, 
    'your-secret-key',
    { expiresIn: '24h' }
);
```

---

## 🛠️ 调试和测试

### 测试您的实现
```bash
# 运行完整测试套件
node src/collaboration-demo.js

# 您应该看到：
# ✅ 用户创建: 成功
# ✅ 用户登录: 成功  <- 这是您的实现
# ✅ 资料更新: 成功  <- 协作功能
```

### 调试技巧
- 使用 `console.log()` 添加调试信息
- 在Zed中设置断点进行调试
- 查看浏览器控制台的错误信息（如果测试Web界面）

---

## 📞 协作沟通

### 实时沟通
1. **Zed协作会话** - 实时看到彼此的代码修改
2. **GitHub评论** - 在PR和Issue中进行技术讨论
3. **代码注释** - 在代码中留下TODO和问题标记

### 协作约定
- 🟢 **绿色评论** - 功能完成
- 🟡 **黄色评论** - 需要讨论
- 🔴 **红色评论** - 发现问题
- 🤖 **Claude Code** - AI辅助生成的代码

---

## 🎯 完成检查清单

### 您的任务清单
- [ ] 克隆项目并成功运行
- [ ] 加入Zed协作会话  
- [ ] 实现 `verifyPassword()` 方法
- [ ] 改进 `createSession()` 方法
- [ ] 完善 `validateProfileUpdates()` 方法
- [ ] 测试所有功能正常工作
- [ ] 创建Pull Request
- [ ] 与团队进行代码审查

### 可选扩展任务
- [ ] 添加登录失败限制
- [ ] 实现账户锁定机制
- [ ] 添加密码强度检查
- [ ] 实现"记住我"功能
- [ ] 添加二次验证支持

---

## 🆘 常见问题和解决方案

### Q: 如何加入Zed协作会话？
A: 等待项目负责人发送协作链接，点击链接即可加入。

### Q: 代码冲突怎么处理？
A: 在Zed中可以实时看到冲突，通过协作沟通解决。

### Q: 不知道怎么实现某个功能？
A: 查看现有代码注释，或在GitHub Issue中提问。

### Q: 测试失败了怎么办？
A: 检查console输出，查看错误信息，必要时回滚到工作版本。

---

## 🎉 开始协作开发

**您现在就可以：**

1. **克隆项目**: `git clone https://github.com/you922/team-collaboration-project.git`
2. **安装Zed**: https://zed.dev  
3. **加入协作**: 等待协作链接
4. **开始开发**: 实现您的登录功能！

**项目地址**: https://github.com/you922/team-collaboration-project  
**协作状态**: 🟢 就绪，等待您的加入！

---

> 🤖 **本指南由 Claude Code 自动生成**  
> 📅 更新时间: 2025-09-07  
> 🤝 **欢迎加入团队协作开发！**