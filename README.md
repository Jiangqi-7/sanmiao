# 三秒 (sanmiao) - AI 工具导航站

> 道法自然，AI 为用

## 项目概览

水墨中国风的 AI 工具导航站，基于 Next.js App Router 构建。展示 AI 工具使用教程、书签收藏、推理谜题、山海经异兽等内容。

**技术栈：** Next.js 16 + React 19 + TypeScript + Tailwind CSS + Turso (libSQL)

**配色：** 水墨黑 #1a1a1a + 米白 #fafafa + 灰度文字

**部署：** Vercel (https://sanmiao.vercel.app)

## 页面与模块

| 页面 | 路由 | 状态 | 说明 |
|------|------|------|------|
| 首页 | `/` | ✅ 完整 | 九宫格后天八卦导航，道法自然主题 |
| 博客 | `/blog` | ✅ 完整 | 5篇静态文章列表 |
| 文章详情 | `/blog/[slug]` | ⚠️ 框架 | 模板已建，内容为假数据 |
| 书签 | `/bookmarks` | ✅ 完整 | CRUD + 分页 + 搜索 + 导入导出 |
| 推理阁 | `/puzzles` | ✅ 完整 | 13道谜题列表 + 分页 |
| 谜题详情 | `/puzzles/[id]` | ✅ 完整 | 支持 markdown 图片渲染 |
| 山海经 | `/shan-hai-jing` | ⚠️ 静态数据 | 仅 2 个异兽条目 |
| 关于 | `/about` | ✅ 静态 | 个人信息页 |

## API 接口

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/bookmarks` | GET | 分页获取书签 |
| `/api/bookmarks` | POST | 创建书签 |
| `/api/bookmarks/[id]` | PUT/DELETE | 更新/删除 |
| `/api/bookmarks/search` | GET | 搜索书签 |
| `/api/bookmarks/import` | POST | 批量导入 |
| `/api/bookmarks/export` | GET | 导出 CSV/JSON |

## 待完善

- [ ] **blog/[slug] 内容真实化**：文章详情页目前是假数据，需要将 MDX 文件内容真实渲染
- [ ] **山海经扩充**：目前只有 2 个异兽（烛龙、夔牛），需要继续添加
- [ ] **图片管理**：现有图片均为外部 OSS 链接，考虑增加本地上传或图床功能
- [ ] **书签搜索优化**：支持标签筛选、排序
- [ ] **SEO 优化**：每个页面增加 meta、OG 标签

## 文件结构

```
src/
├── app/
│   ├── page.tsx              # 首页
│   ├── blog/
│   │   ├── page.tsx          # 博客列表
│   │   └── [slug]/page.tsx    # 文章详情(未完成)
│   ├── bookmarks/
│   │   └── page.tsx          # 书签管理
│   ├── puzzles/
│   │   ├── page.tsx          # 谜题列表
│   │   └── [id]/page.tsx     # 谜题详情
│   ├── shan-hai-jing/
│   │   └── page.tsx          # 山海经
│   ├── about/
│   │   └── page.tsx          # 关于
│   └── api/bookmarks/        # 书签 API
├── lib/
│   ├── db/bookmarks.ts        # 书签数据库操作
│   ├── db/types.ts            # 类型定义
│   ├── puzzles.ts             # 13道谜题内容
│   └── design-system.ts       # 设计系统(八卦)
└── components/
    ├── header.tsx             # 导航栏
    ├── footer.tsx             # 底部
    ├── bagua-decorations.tsx  # 八卦装饰
    ├── image-lightbox.tsx     # 图片放大
    └── ...
```

## 最近更新

- **2026-05-21**: 修复谜题图片路径和缺失文件问题
- **2026-05-10**: 依赖升级 (Next 16.2.6, React 19.2.6)
- **2026-05-10**: 水墨设计风格迭代 (5次调整)
- **2026-05-08**: 添加书签导入导出、推理阁谜题功能