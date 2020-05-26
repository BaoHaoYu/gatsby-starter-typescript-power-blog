---
title: hexo添加管理系统
date: 2019-09-28 15:09:00
tags:
  - hexo
type: categories
categories:
  - 编程
  - hexo
---

## 前言

hexo 后台管理系统，有点脱裤子放屁感觉，还是 vscode 写 markdown 舒服，要使用后台管理适合用`wordpress`

<!--more-->

## hexo-admin

hexo 没有后台管理，以[hexo-admin](https://github.com/jaredly/hexo-admin)辅助管理

## 安装

`yarn add hexo-admin`

## 进入管理后台进行配置

地址为：http://localhost:4000/admin

账号密码配置好  
![](/../images/hexo添加管理系统/密码.png)

拷贝 Admin Config Section 到`_config.yml`里面  
![](/../images/hexo添加管理系统/生成的配置.png)

## 重启服务

清理项目  
`hexo clean`

重新构建项目  
`hexo generate`

启动 server  
`hexo server -d`
