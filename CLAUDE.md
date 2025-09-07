# Claude Code 团队协作配置

## 项目信息
- **项目名称**: Team Collaboration Project
- **团队成员**: 
  - 您 (项目负责人)
  - woshiqp465 (GitHub协作者)
- **创建时间**: 2025-09-07

## Claude Code 协作工作流

### 1. 开发环境
- **主要编辑器**: Zed (实时协作编辑)
- **AI 助手**: Claude Code
- **版本控制**: Git + GitHub
- **项目管理**: Claude Code TodoWrite

### 2. 协作规范
#### 代码开发
- 使用 Claude Code 进行代码生成和调试
- 通过 Zed 实时协作编辑
- 每个功能分支使用规范的提交信息

#### 任务管理  
- 使用 Claude Code 的 TodoWrite 工具跟踪任务
- 每日同步进度和计划
- 代码审查使用 Claude Code 分析

#### 沟通协作
- 通过 GitHub Issues 讨论技术问题
- 使用 Pull Request 进行代码审查
- Claude Code 辅助生成技术文档

### 3. 常用命令
```bash
# Git 操作
git status
git add .
git commit -m "feat: 新功能描述"
git push origin feature-branch

# GitHub CLI
gh pr create --title "PR标题" --body "详细描述"
gh issue create --title "问题标题" --body "问题描述"

# Claude Code 协作
# 通过 Claude Code 生成代码、文档和测试
# 使用 TodoWrite 跟踪任务进度
```

### 4. 项目结构
```
team-collaboration-project/
├── src/                # 源代码目录
├── docs/               # 项目文档
├── tests/              # 测试文件
├── .github/            # GitHub 配置
├── CLAUDE.md           # Claude Code 配置 (本文件)
├── README.md           # 项目说明
└── package.json        # 依赖配置 (如适用)
```

## 协作最佳实践
1. 提交前使用 Claude Code 检查代码质量
2. 定期同步远程仓库更改
3. 使用描述性的提交信息
4. 每个新功能使用独立分支开发
5. 通过 Claude Code 生成和维护文档

---
> 🤖 本文档由 Claude Code 生成并维护