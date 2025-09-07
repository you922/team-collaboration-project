# 任务模板

## Claude Code TodoWrite 任务示例

### 当前Sprint: 项目初始化 (2025-09-07)

#### 团队任务分配
- **您**: 项目架构设计、前端开发
- **woshiqp465**: 后端API、数据库设计

#### 使用方法
1. 在Claude Code中使用TodoWrite工具
2. 复制以下任务到您的todo列表:

```json
[
  {
    "content": "设计项目整体架构",
    "status": "pending", 
    "activeForm": "设计项目整体架构",
    "assignee": "您",
    "estimated_hours": 4,
    "priority": "high"
  },
  {
    "content": "创建用户认证API",
    "status": "pending",
    "activeForm": "创建用户认证API", 
    "assignee": "woshiqp465",
    "estimated_hours": 6,
    "priority": "high"
  },
  {
    "content": "设计数据库schema",
    "status": "pending",
    "activeForm": "设计数据库schema",
    "assignee": "woshiqp465", 
    "estimated_hours": 3,
    "priority": "medium"
  },
  {
    "content": "实现前端登录界面",
    "status": "pending",
    "activeForm": "实现前端登录界面",
    "assignee": "您",
    "estimated_hours": 5,
    "priority": "medium"
  },
  {
    "content": "编写单元测试",
    "status": "pending", 
    "activeForm": "编写单元测试",
    "assignee": "共同",
    "estimated_hours": 4,
    "priority": "low"
  }
]
```

#### 协作流程
1. **任务启动**: 在Zed中开始协作会话
2. **实时开发**: 使用Claude Code辅助编码
3. **进度同步**: 更新TodoWrite任务状态
4. **代码提交**: 遵循Git commit规范
5. **代码审查**: 创建PR并相互review

#### 完成标准
- [ ] 功能完整实现
- [ ] 代码通过Claude Code质量检查
- [ ] 单元测试覆盖率>80%
- [ ] 文档完整更新
- [ ] PR通过review并合并

---
> 🤖 任务模板由Claude Code生成，请根据实际项目调整