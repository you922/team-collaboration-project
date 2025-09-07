# 团队协作指南

## Claude Code + Zed 协作工作流程

### 1. 日常开发协作

#### 启动协作会话
1. **Zed中创建协作会话**:
   - 打开项目: `zed ~/team-collaboration-project`
   - 点击协作图标，创建新会话
   - 分享会话链接给 woshiqp465

2. **Claude Code 辅助开发**:
   - 使用 Claude Code 生成和优化代码
   - 通过 TodoWrite 工具跟踪任务进度
   - 自动生成提交信息和文档

#### 分支管理策略
```bash
# 主分支保护
main        # 生产就绪代码
develop     # 开发集成分支

# 功能分支命名
feature/用户名-功能描述    # 如: feature/woshiqp465-login-system
bugfix/用户名-bug描述     # 如: bugfix/yourname-api-error
```

### 2. 任务分配流程

#### 使用Claude Code TodoWrite管理任务
```markdown
## 当前Sprint任务 (使用Claude Code TodoWrite)
- [ ] 用户认证系统 (负责人: woshiqp465)
- [ ] 前端界面设计 (负责人: 您)  
- [ ] API接口开发 (共同开发)
- [ ] 单元测试编写 (Claude Code辅助)
```

#### GitHub Issues集成
- 每个大功能创建Issue
- 使用标签分类: `enhancement`, `bug`, `documentation`
- 通过PR关联Issues: `Closes #1`

### 3. 代码审查流程

#### Pull Request规范
1. **PR标题格式**: `feat: 添加用户登录功能`
2. **PR描述模板**:
```markdown
## 变更概述
- 功能描述

## Claude Code辅助
- [ ] 代码质量检查
- [ ] 自动测试生成
- [ ] 文档更新

## 测试
- [ ] 单元测试通过
- [ ] 集成测试通过

## 协作信息
- Zed会话ID: [会话链接]
- 协作时长: X小时
```

### 4. 沟通协调

#### 实时协作
- **Zed协作**: 实时代码编辑和讨论
- **Claude Code**: AI辅助解决技术难题
- **GitHub**: 异步代码审查和问题讨论

#### 同步会议
- 每日站会 (15分钟)
- Sprint计划会 (使用Claude Code分析任务)
- 代码review会 (Zed实时协作)

### 5. 质量保证

#### Claude Code集成
- **自动代码审查**: 使用Claude Code检查代码质量
- **文档生成**: 自动生成API文档和README
- **测试辅助**: AI辅助编写单元测试

#### Git提交规范
```bash
# 使用Claude Code生成提交信息
feat: 新功能
fix: 修复bug  
docs: 文档更新
style: 代码格式
refactor: 重构
test: 测试相关
chore: 构建过程或辅助工具

# 示例提交
git commit -m "feat: 添加用户登录API

- 实现JWT认证
- 添加密码加密
- 集成数据库验证

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
```

---
> 📝 本协作指南由 Claude Code 生成，团队可根据实际情况调整