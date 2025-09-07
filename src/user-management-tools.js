// 用户管理工具库 - 扩展功能集合
// 由 Claude Code 生成，提供完整的用户管理解决方案

import UserManager from './collaboration-demo.js';

class UserManagementTools extends UserManager {
    constructor() {
        super();
        this.searchHistory = [];
        this.exportHistory = [];
        this.adminActions = [];
    }

    // 🔍 高级用户搜索功能
    searchUsers(query, options = {}) {
        const {
            searchIn = ['username', 'email', 'displayName'], // 搜索字段
            caseSensitive = false,
            exactMatch = false,
            includeInactive = false,
            limit = 50
        } = options;

        console.log(`🔍 搜索用户: "${query}"`);

        let users = this.getAllUsers();
        
        // 过滤非活跃用户
        if (!includeInactive) {
            users = users.filter(user => user.isActive);
        }

        // 执行搜索
        const searchTerm = caseSensitive ? query : query.toLowerCase();
        const results = users.filter(user => {
            return searchIn.some(field => {
                const fieldValue = this.getUserFieldValue(user, field);
                if (!fieldValue) return false;

                const searchValue = caseSensitive ? fieldValue : fieldValue.toLowerCase();
                
                if (exactMatch) {
                    return searchValue === searchTerm;
                } else {
                    return searchValue.includes(searchTerm);
                }
            });
        });

        // 限制结果数量
        const limitedResults = results.slice(0, limit);

        // 记录搜索历史
        this.recordSearchHistory(query, limitedResults.length, options);

        console.log(`📊 搜索结果: 找到 ${limitedResults.length} 个用户`);
        
        return {
            success: true,
            query: query,
            totalResults: limitedResults.length,
            users: limitedResults,
            searchOptions: options
        };
    }

    // 获取用户字段值的辅助方法
    getUserFieldValue(user, field) {
        switch (field) {
            case 'username': return user.username;
            case 'email': return user.email;
            case 'displayName': return user.displayName;
            case 'firstName': return user.profile?.firstName;
            case 'lastName': return user.profile?.lastName;
            case 'bio': return user.profile?.bio;
            case 'location': return user.profile?.location;
            default: return null;
        }
    }

    // 📊 用户统计分析
    getUserStatistics() {
        const users = this.users;
        const now = new Date();

        const stats = {
            总用户数: users.length,
            活跃用户: users.filter(u => u.isActive).length,
            禁用用户: users.filter(u => !u.isActive).length,
            今日注册: users.filter(u => {
                const createdDate = new Date(u.createdAt);
                return createdDate.toDateString() === now.toDateString();
            }).length,
            本周注册: users.filter(u => {
                const createdDate = new Date(u.createdAt);
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                return createdDate >= weekAgo;
            }).length,
            有头像用户: users.filter(u => u.profile?.avatar).length,
            完善资料用户: users.filter(u => 
                u.profile?.firstName && u.profile?.lastName && u.profile?.bio
            ).length
        };

        // 用户名长度分布
        const usernameLengths = users.map(u => u.username.length);
        stats.用户名平均长度 = Math.round(
            usernameLengths.reduce((a, b) => a + b, 0) / usernameLengths.length
        );

        // 邮箱域名统计
        const emailDomains = {};
        users.forEach(user => {
            const domain = user.email.split('@')[1];
            emailDomains[domain] = (emailDomains[domain] || 0) + 1;
        });
        stats.热门邮箱域名 = Object.entries(emailDomains)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([domain, count]) => ({ domain, count }));

        console.log('📊 用户统计分析完成');
        return stats;
    }

    // 🗑️ 用户删除功能 (软删除)
    deleteUser(userId, sessionToken, options = {}) {
        const { hardDelete = false, reason = '管理员删除' } = options;
        
        console.log(`🗑️ 删除用户请求: 用户ID ${userId}`);

        // 权限验证
        const authResult = this.validateAdminPermission(sessionToken);
        if (!authResult.success) {
            return authResult;
        }

        const user = this.users.find(u => u.id === userId);
        if (!user) {
            return {
                success: false,
                error: 'USER_NOT_FOUND',
                message: '用户不存在'
            };
        }

        if (hardDelete) {
            // 硬删除：完全移除用户
            const index = this.users.findIndex(u => u.id === userId);
            this.users.splice(index, 1);
            
            console.log(`❌ 用户已永久删除: ${user.username}`);
        } else {
            // 软删除：标记为非活跃
            user.isActive = false;
            user.deletedAt = new Date().toISOString();
            user.deleteReason = reason;
            user.deletedBy = authResult.adminUser.id;
            
            console.log(`🚫 用户已禁用: ${user.username}`);
        }

        // 记录管理员操作
        this.recordAdminAction({
            type: hardDelete ? 'HARD_DELETE' : 'SOFT_DELETE',
            targetUserId: userId,
            targetUsername: user.username,
            adminId: authResult.adminUser.id,
            reason: reason
        });

        return {
            success: true,
            message: hardDelete ? '用户已永久删除' : '用户已禁用',
            deletedUser: {
                id: user.id,
                username: user.username,
                deletedAt: user.deletedAt
            }
        };
    }

    // 🔄 恢复已删除用户
    restoreUser(userId, sessionToken) {
        console.log(`🔄 恢复用户请求: 用户ID ${userId}`);

        const authResult = this.validateAdminPermission(sessionToken);
        if (!authResult.success) {
            return authResult;
        }

        const user = this.users.find(u => u.id === userId);
        if (!user) {
            return {
                success: false,
                error: 'USER_NOT_FOUND',
                message: '用户不存在'
            };
        }

        if (user.isActive) {
            return {
                success: false,
                error: 'USER_ALREADY_ACTIVE',
                message: '用户已经是活跃状态'
            };
        }

        // 恢复用户
        user.isActive = true;
        user.restoredAt = new Date().toISOString();
        user.restoredBy = authResult.adminUser.id;
        delete user.deletedAt;
        delete user.deleteReason;
        delete user.deletedBy;

        this.recordAdminAction({
            type: 'RESTORE_USER',
            targetUserId: userId,
            targetUsername: user.username,
            adminId: authResult.adminUser.id
        });

        console.log(`✅ 用户已恢复: ${user.username}`);
        return {
            success: true,
            message: '用户已恢复',
            restoredUser: {
                id: user.id,
                username: user.username,
                restoredAt: user.restoredAt
            }
        };
    }

    // 📤 高级数据导出
    exportUserData(options = {}) {
        const {
            format = 'json', // json, csv, xml
            includeInactive = false,
            fields = 'all',
            compression = false
        } = options;

        console.log(`📤 导出用户数据: 格式 ${format}`);

        let users = includeInactive ? this.users : this.users.filter(u => u.isActive);
        
        // 字段过滤
        if (fields !== 'all' && Array.isArray(fields)) {
            users = users.map(user => {
                const filtered = {};
                fields.forEach(field => {
                    if (user[field] !== undefined) {
                        filtered[field] = user[field];
                    }
                });
                return filtered;
            });
        }

        let exportData;
        let mimeType;
        let fileExtension;

        switch (format) {
            case 'csv':
                exportData = this.convertToCSV(users);
                mimeType = 'text/csv';
                fileExtension = 'csv';
                break;
            case 'xml':
                exportData = this.convertToXML(users);
                mimeType = 'application/xml';
                fileExtension = 'xml';
                break;
            default: // json
                exportData = JSON.stringify(users, null, 2);
                mimeType = 'application/json';
                fileExtension = 'json';
        }

        // 记录导出历史
        this.recordExportHistory({
            format: format,
            userCount: users.length,
            includeInactive: includeInactive,
            fields: fields
        });

        console.log(`✅ 数据导出完成: ${users.length} 个用户`);
        
        return {
            success: true,
            data: exportData,
            metadata: {
                format: format,
                userCount: users.length,
                exportTime: new Date().toISOString(),
                mimeType: mimeType,
                fileExtension: fileExtension
            }
        };
    }

    // CSV转换辅助方法
    convertToCSV(users) {
        if (users.length === 0) return '';
        
        const headers = Object.keys(users[0]);
        const csvRows = [];
        
        csvRows.push(headers.join(','));
        
        users.forEach(user => {
            const values = headers.map(header => {
                const val = user[header];
                return typeof val === 'object' ? JSON.stringify(val) : val;
            });
            csvRows.push(values.join(','));
        });
        
        return csvRows.join('\n');
    }

    // XML转换辅助方法
    convertToXML(users) {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<users>\n';
        
        users.forEach(user => {
            xml += '  <user>\n';
            Object.entries(user).forEach(([key, value]) => {
                const xmlValue = typeof value === 'object' ? JSON.stringify(value) : value;
                xml += `    <${key}>${xmlValue}</${key}>\n`;
            });
            xml += '  </user>\n';
        });
        
        xml += '</users>';
        return xml;
    }

    // 🔐 管理员权限验证
    validateAdminPermission(sessionToken) {
        if (!sessionToken) {
            return {
                success: false,
                error: 'NO_SESSION',
                message: '需要管理员权限'
            };
        }

        const session = this.verifySession(sessionToken);
        if (!session) {
            return {
                success: false,
                error: 'INVALID_SESSION',
                message: '会话无效或已过期'
            };
        }

        const adminUser = this.users.find(u => u.id === session.userId);
        if (!adminUser || !adminUser.isAdmin) {
            return {
                success: false,
                error: 'INSUFFICIENT_PRIVILEGES',
                message: '需要管理员权限'
            };
        }

        return {
            success: true,
            adminUser: adminUser
        };
    }

    // 📝 记录搜索历史
    recordSearchHistory(query, resultCount, options) {
        this.searchHistory.push({
            id: this.searchHistory.length + 1,
            query: query,
            resultCount: resultCount,
            options: options,
            timestamp: new Date().toISOString()
        });
        
        // 保留最近100条搜索记录
        if (this.searchHistory.length > 100) {
            this.searchHistory = this.searchHistory.slice(-100);
        }
    }

    // 📝 记录导出历史
    recordExportHistory(exportInfo) {
        this.exportHistory.push({
            id: this.exportHistory.length + 1,
            ...exportInfo,
            timestamp: new Date().toISOString()
        });
    }

    // 📝 记录管理员操作
    recordAdminAction(actionInfo) {
        this.adminActions.push({
            id: this.adminActions.length + 1,
            ...actionInfo,
            timestamp: new Date().toISOString()
        });
        
        console.log(`🛡️ 管理员操作记录: ${actionInfo.type}`);
    }

    // 📊 获取系统活动报告
    getActivityReport(days = 7) {
        const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
        
        const report = {
            reportPeriod: `最近 ${days} 天`,
            generatedAt: new Date().toISOString(),
            
            userActivity: {
                newRegistrations: this.users.filter(u => 
                    new Date(u.createdAt) >= cutoffDate
                ).length,
                profileUpdates: this.updateLogs ? this.updateLogs.filter(log => 
                    new Date(log.timestamp) >= cutoffDate
                ).length : 0,
                userLogins: this.sessions ? this.sessions.filter(s => 
                    new Date(s.createdAt) >= cutoffDate
                ).length : 0
            },
            
            systemActivity: {
                searches: this.searchHistory.filter(s => 
                    new Date(s.timestamp) >= cutoffDate
                ).length,
                exports: this.exportHistory.filter(e => 
                    new Date(e.timestamp) >= cutoffDate
                ).length,
                adminActions: this.adminActions.filter(a => 
                    new Date(a.timestamp) >= cutoffDate
                ).length
            },
            
            currentStats: this.getUserStatistics()
        };

        console.log(`📊 活动报告生成完成: ${days} 天数据`);
        return report;
    }
}

export default UserManagementTools;