---
title: hexo主题next文件解析
date: 2019-10-08 15:59:44
tags:
  - hexo
type: 'categories'
categories:
  - 编程
  - hexo
---

`themes\next\source\js\schemes\muse.js`

- 侧边栏收缩展开：`showSidebar`和`hideSidebar`

`themes\next\source\js\motion.js`：动画设置

- 博客标题底部线条和顶部线条动画 `getMistLineSettings`

`themes\next\layout\_scripts\vendors.swig`

- `jquery`加载

```code
themes\next\layout\_macro\post.swig # markdown主体
themes\next\layout\_macro\sidebar.swig # 侧边栏，包含标签，导航之类的
themes\next\layout\_layout.swig # 总体布局
themes\next\layout\category.swig # 分类

themes\next\layout\_scripts\vendors.swig # 所有常驻js库，如jquery
themes\next\source\js\motion.js # 动画设置

themes\next\scripts\filters # 过滤器，提供各种hook类似的功能
```
