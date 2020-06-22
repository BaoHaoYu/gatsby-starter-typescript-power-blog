---
title: v2ray搭建带有流量伪装的自由服务器
date: 2020-03-10 18:00
tags:
  - 自由
type: categories
categories:
  - 其他
  - 自由
---

若为自由故，两者皆可抛

<!-- more -->

使用流量伪装！[参考地址](https://www.hijk.pw/v2ray-one-click-script-with-mask/)

[项目地址](https://github.com/2dust/v2rayN)

## 前期准备

一台国外服务器，如`vultr`之类的

## 购买域名

[国外优秀的域名注册商介绍 域名注册新的选择](http://www.chinaz.com/web/2009/1214/101041.shtml)

## 执行脚本

```bash
bash <(curl -sL https://raw.githubusercontent.com/hijkpw/scripts/master/centos_install_v2ray2.sh)
```

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Xshell_mSGDRODqY7.png)

结果
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Xshell_ATG2jxRPrI.png)

条条大路通自由
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_T8q5o4KQm4.png)

## 常用命令

```bash
# 启动
systemctl start v2ray

# 停止
systemctl stop v2ray

# 重启
systemctl restart v2ray

# 卸载
bash <(curl -sL https://raw.githubusercontent.com/hijkpw/scripts/master/centos_install_v2ray2.sh) uninstall
```
