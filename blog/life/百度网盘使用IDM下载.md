---
title: 百度网盘使用IDM下载
date: 2019-10-20 09:20:00
tags:
  - 效率
  - 百度云盘
type: categories
categories:
  - 其他
  - 杂谈
---

## 前言

100MB 带宽百度云下载速度只有 200KB/s，使用 IDM 下载可以达到将近 1MB/s，天下没有免费的网盘，网盘迟早要收割用户

<!-- more -->

## 方案一：使用网站解析

[baiduwp 地址](https://pan.baiduwp.com/)

输入分享链接
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_t5l81idmif.png)

直接使用 IDM 下载
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_pAPZmOnGUS.png)

## 方案二：使用脚本下载

### 准备工具

[Chrome 的 Tampermonkey BETA 扩展程序](https://chrome.google.com/webstore/detail/tampermonkey-beta/gcalenpjmijncebpfijmoaglllgpjagf)

### 加入脚本

[下载地址获得](https://greasyfork.org/zh-CN/scripts/387135-百度网盘vip破解-超大文件直链下载-不限速下载-永久生效-由于版权问题-暂不支持提取码嗅探啦)
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_alYBlafi5p.png)

### 使用 IDM 下载

每次进入`https://pan.baidu.com/s/******`这个地址会自动激活脚本
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/HuHNaSoRkR.png)

会自动跳到对应的页面，直接使用 IDM 下载
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_pAPZmOnGUS.png)

## IDM 下载 403 问题

有时候直接用 IDM 下载会出现 403 问题
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/IDMan_0nUAhcC7DE.png)

这是先用谷歌浏览器默认的下载器先下载
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_UMMt9Dd3OW.png)

`ctrl+j`进入下载页，使用`Transfer dowload to IDM`，IDM 就会接管下载了
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_Zs2OVUkUSp.png)
