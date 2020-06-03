---
title: chrome调试nodejs
date: 2019-10-25 10:23:00
tags:
  - chrome
  - nodejs
type: categories
categories:
  - 编程
  - nodejs
---

## 前言

chrome 调试 nodejs 更加符合个人习惯

<!-- more -->

## 打开 nodejs 开工具

输入`chrome://inspect/`

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_YuPkdc2Ykx.png)

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_flsto4wkcT.png)

## 使用 inspect 命令调试

```bash
node --inspect-brk src/index.js
```

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/cmd_HROcOIX7SG.png)

`-brk`表示在第一行自动断点
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_m81OxD3CEG.png)
