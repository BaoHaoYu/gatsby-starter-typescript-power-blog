---
title: window搭建nodejs环境
date: 2019-10-12 21:30:00
tags:
  - 编程
  - nodejs
type: 'categories'
categories:
  - 编程
  - nodejs
---

## 通过 msi 安装

[地址](https://nodejs.org/en/)

选择稳定版
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_jL66yAaYjI.png)

不断点击下一步即可安装好

<!--more-->

## 通过压缩包安装

### 下载

[地址](https://nodejs.org/en/download/)

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_M7X8lEREwY.png)

### 解压

结构大概是这样子  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/explorer_L0aAfxkutW.png)

### 添加环境变量

系统变量

- 变量名: `NODE_HOME`
- 变量值: `G:\env\node-v10.16.3-win-x64`

环境变量 PATH

- `%NODE_HOME%`

输入：`node -v` 和 `npm -v`，如果又版本提示说明环境配置成功
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/powershell_hiGr8EnvGQ.png)

## 安装完毕后

### 设置 npm 全局安装路径

找到 `node-v10.16.3-win-x64\node_modules\npm\npmrc`，如果没有则新建一个，加入如下内容

```config
prefix=G:\env\node-v10.16.3-win-x64
```

使用`npm install jquery -g`可以看见全局安装到新的目录下（原来安装在 c 盘）
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/explorer_PJJGFrP1a5.png)

### 使用 nrm 切换源

安装： `npm install -g nrm`

显示所有可用源：`nrm ls`  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/powershell_2BJQh2QCur.png)

使用淘宝源：`nrm use taobao`  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/powershell_E575Ber9eE.png)

### 使用 yarn 代替 npm

> 注意：如果 yarn 全局目录和 npm 全局目录设置成一样的话，执行`yarn global add <lib>`会导致`node_modules`的包全部清空，在里面的 npm 也会被清除
> 所以：npm 和 yarn 的全局目录不要设置成一样，**建议全局使用 npm，项目使用 yarn**

安装

```bash
npm install yarn -g
```

设置 yarn 全局目录

```bash
yarn config set global-folder G:\env\yarn-global
```

切换 node-sass（加快 sass 二进制包下载）

```bash
yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g
```

切换默认源

```bash
yarn config set registry https://registry.npm.taobao.org
```

设置缓存目录

```bash
yarn config set cache-folder G:\env\yarn-chache
```

设置环境变量 PATH

```path
G:\env\yarn-global
```
