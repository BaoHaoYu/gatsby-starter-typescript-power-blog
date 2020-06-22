---
title: travis+nodejs自动化部署静态文件
date: 2019-10-18 20:14:00
tags:
  - travis
  - nodejs
type: categories
categories:
  - 编程
  - travis
---

## travis 添加包

### 进入设置

需要先进入[官网](https://travis-ci.com/)登录

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_9brD06ijix.png)

<!-- more -->

### 进入库配置页

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_JnMttRK5h4.png)

### 选中需要自动化集成的库

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_nmL3wNYo9a.png)

### 点击确认按钮

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_KJwN7JtsgU.png)

## 为库添加 Token 变量

### 创建 github 的 token

#### 进入 token 设置页

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_5xdpFn7Na3.png)

#### 添加 token

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_JTVNOHwGsL.png)

#### 勾上对应权限

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_89KG4CDpDK.png)

#### 请记录好 token

因为 token 只显示一次
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_k1PH2dCh1a.png)

### 设置 travis 的环境变量

#### 进入设置页

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_2s2kLNb4KF.png)

#### 添加环境变量`GITHUB_TOKEN`

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_I4tys495tm.png)

> 如果没有添加会提示`invalid option "--github_token="` > ![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_RukkV1k3ZE.png)

## 项目下的.travis.yml 文件

```yml
language: node_js
node_js:
  - '8'
cache:
  apt: true
  directories:
    - node_modules # 缓存不经常更改的内容

install:
  - npm install

script:
  - npm run demo

deploy:
  provider: pages
  skip_cleanup: true
  keep_history: true
  github_token: $GITHUB_TOKEN
  # 只发布src文件
  local_dir: src
  on:
    branch: master
```

## 效果

自动创建`gh-pages`分支
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_hQg9RDdpMi.png)
