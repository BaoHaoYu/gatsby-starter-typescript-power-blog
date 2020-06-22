---
title: linux搭建nodejs环境
date: 2019-09-29 17:08:00
tags:
  - 编程
  - linux
  - nodejs
type: 'categories'
categories:
  - 编程
  - nodejs
---

## 安装必要的命令

```bash
yum install unzip -y
```

## 搭建 node 环境

下载

```bash
wget https://nodejs.org/dist/v10.16.3/node-v10.16.3-linux-x64.tar.xz
```

<!--more-->

解压

```bash
xz -d node-v10.16.3-linux-x64.tar.xz
tar -xf /root/node-v10.16.3-linux-x64.tar -C /opt/env
```

bin 映射

```bash
ln -s /opt/env/node-v10.16.3-linux-x64/bin/node /usr/bin/node
ln -s /opt/env/node-v10.16.3-linux-x64/bin/npm /usr/bin/npm
```

临时集成 node 中的 bin 到 linux 命令中

```bash
export NODE_HOME=/opt/env/node-v10.16.3-linux-x64/bin
export PATH=$NODE_HOME:$PATH
```

测试是否成功

```bash
node -v
npm
```

## 安装 yarn

shell 安装 yarn

```bash
curl -o- -L https://yarnpkg.com/install.sh | bash
```

修改源地址

```bash
yarn config set registry https://registry.npm.taobao.org
yarn config set sass_binary_site=https://npm.taobao.org/mirrors/node-sass
yarn config set sharp_dist_base_url=https://npm.taobao.org/mirrors/sharp-libvips/v8.9.1
yarn config set electron_mirror https://npm.taobao.org/mirrors/electron/
yarn config set puppeteer_download_host https://npm.taobao.org/mirrors
yarn config set chromedriver_cdnurl https://npm.taobao.org/mirrors/chromedriver
yarn config set operadriver_cdnurl https://npm.taobao.org/mirrors/operadriver
yarn config set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs
yarn config set selenium_cdnurl https://npm.taobao.org/mirrors/selenium
yarn config set node_inspector_cdnurl https://npm.taobao.org/mirrors/node-inspector
```

临时集成 yarn 命令

```bash
export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"
```

## 安装 pm2

下载

```bash
npm install -g pm2
```

常用命令

```bash
pm2 start app.js # 启动
pm2 list # 显示运行中的程序
pm2 delete 0 # 移除id为0的程序
```

## 永久集成命令

进入 profile

```bash
vi /etc/profile
```

添加环境变量

```bash
export NODE_HOME=/opt/env/node-v10.16.3-linux-x64/bin
export PATH=$NODE_HOME:$PATH
export PATH=$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH
```

重新更新环境变量

```bash
source /etc/profile
```

通过命令可以看出是否配置成功
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Xshell_rtXLUci87A.png)
