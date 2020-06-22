---
title: 通过access tokens克隆Github私有库
date: 2019-12-10 21:20:00
tags:
  - git
type: 'categories'
categories:
  - 编程
  - git
---

通过`access tokens`克隆`GitHub`私有库而不用输入用户名和密码

<!-- more -->

## 创建 token

[地址](https://github.com/settings/tokens)

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_3hmIEnNghW.png)

## linux

### 加入到环境变量

```bash
vi /etc/profile
```

底部加入如下内容

```bash
export GITHUB_TOKEN=<Personal access tokens>
export PATH=$PATH:$GITHUB_TOKEN
```

刷新变量

```bash
source /etc/profile
```

### 克隆

可以直接引用`${GITHUB_TOKEN}`克隆私有库，可以免除输入用户名和密码

```bash
git clone https://${GITHUB_TOKEN}@github.com/********.git --branch=gh-pages --depth=1
```
