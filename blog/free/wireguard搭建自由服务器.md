---
title: wireguard搭建自由服务器
date: 2020-03-09 18:00
tags:
  - 自由
type: categories
categories:
  - 其他
  - 自由
---

若为自由故，两者皆可抛

<!-- more -->

缺点只有全局代理，优点快速小众不会被关照，因为无法支持多用户，所以无法开机场，[参考地址](http://www.wangchao.info/1811.html)

[其他 v2ray](https://www.hijk.pw/centos-one-click-install-v2ray/)

## 前提

使用`centos8`，使用`centos7`会失败

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Xshell_7OK1fh4dUv.png)

## 一键安装

```bash
# 下载脚本
wget --no-check-certificate -O /opt/wireguard.sh https://raw.githubusercontent.com/teddysun/across/master/wireguard.sh

# 赋予权限
chmod 755 /opt/wireguard.sh

# 运行脚本
/opt/wireguard.sh -r
```

成功后的提示，注意绿色的文字，`/etc/wireguard/wg0_client`为配置文件
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Xshell_83PKD08qwB.png)

## 其他命令

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Xshell_vPddksyEkw.png)

## 安装和配置 window 客户端

拷贝`/etc/wireguard/wg0_client`的内容

```bash
vi /etc/wireguard/wg0_client
```

创建一个`conf`格式的文件，粘贴`/etc/wireguard/wg0_client`的内容
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_gGuQonB5i2.png)

添加文件
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/wireguard_CUDZsnJVdt.png)

添加完之后自动完成所有配置，点击`Activate`即可完成自由
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/wireguard_TsN2upDe0G.png)

成功标识，自由的味道
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_WI6hn6mPQq.png)
