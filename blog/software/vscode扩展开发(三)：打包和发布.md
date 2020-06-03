---
title: vscode扩展开发(三)：打包和发布
date: 2020-01-16 19:27:00
tags:
  - vscode
type: categories
categories:
  - 编程
  - vscode
---

发布到网上，不要钱

<!-- more -->

## 安装 vsce

```bash
npm install vsce -g
```

## 创建项目和 token

地址: [https://aka.ms/SignupAzureDevOps](https://aka.ms/SignupAzureDevOps)

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_IkunsoB2mY.png)

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_kUJcLe3c6p.png)

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_gnmViI7xmy.png)

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_TWRhRrAXNj.png)

拷贝好代码生成的字符

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_rqxes0VMVQ.png)

## 命令

```bash
# 打包生成本地文件
vsce package

# 创建用户
vsce create-publisher name

# 上传（自动打包）
vsce publish

# 登录
vsce login name
```

## 上传失败处理

如果上传失败进入[https://marketplace.visualstudio.com/manage/](https://marketplace.visualstudio.com/manage/)手打上传打包的文件
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_bIrZdBCoZR.png)

## 纪念人生第一个 vscode 扩展

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_DQJTYcUaOn.png)
