---
title: hexo安装
date: 2019-09-28 11:12:00
tags:
  - hexo
type: 'categories'
categories:
  - 编程
  - hexo
---

## 安装

git 地址
[hexo](https://github.com/hexojs/hexo)

下载  
`npm install -g hexo-cli`

初始化  
`hexo init blog`

安装依赖  
`npm install` 或者 `yarn`

启动  
`hexo server`，然后打开[4000 端口](http://localhost:4000)

清理项目
`hexo clean`

重新构建项目
`hexo generate`

<!--more-->

## 修改基础配置\_config.yml

可以让自己个性化

```yml
title: 玛雅神棍博客
subtitle: 技术生活和自由
description: 一个无聊之人
keywords:
author: 玛雅神棍
language: zh-CN
timezone:
```

现在基本功能完成

## 问题链接

[地址](http://theme-next.iissnan.com/faqs.html#custom-content-width)

## 其他博客地址

[github 分享自己博客地址](https://github.com/iissnan/hexo-theme-next/issues/119)

## 总结

在 vscode 编辑比 hexo-admin 编辑体验好多了，码农专用
