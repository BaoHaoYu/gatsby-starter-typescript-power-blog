---
title: 虚拟机VMware安装centos7及网络配置
date: 2020-03-06 10:29:00
tags:
  - docker
type: 'categories'
categories:
  - 编程
  - 容器
---

虚拟虚拟

<!-- more -->

## 下载镜像

[http://isoredirect.centos.org/centos/7/isos/x86_64/](http://isoredirect.centos.org/centos/7/isos/x86_64/)

选择网易的镜像

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_6Z6bVMIlk3.png)

选择最小化安装包，该安装包没有界面

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_4pptHBUDX9.png)

## 安装镜像

1.-
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/vmware_FZtWSBmMvP.png)

2.-
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/vmware_9IhhtnPPwF.png)

3.-
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/vmware_B1IDOIuSI8.png)

4.-
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/vmware_RBjsId34PE.png)

回车安装
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/vmware_cl786Ot9AF.png)

选择语言，建议英文，方便以后到国外网站搜索问题
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/vmware_xULwx5LEAQ.png)

选择自动分区
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/vmware_bVX1GGg1fq.png)

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/vmware_noY7RpDsku.png)

设置 root 密码
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/vmware_KqBY2wFv8N.png)

安装完毕重启即可
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/vmware_KTThFLfb6w.png)

输入用户名 root 和之前设置的密码即可进入系统
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/vmware_OgibCmRYVd.png)

## 网络配置

安装完毕后，linux 系统无法上网

### 记录关键信息

#### 虚拟网络编辑器

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/3YVvgTG34O.png)

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/vmnetcfg_IosJ2PAdq9.png)

#### NTA

网关地址和子网掩码
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/vmnetcfg_m7uRJLkl39.png)

#### DHCP

IP 地址的范围
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/vmnetcfg_Ga6dYa4tVi.png)

### 修改网络配置

#### 修改配置文件

进入网络配置文件

```bash
vi /etc/sysconfig/network-scripts/ifcfg-ens33
```

底部加入如下信息

- IPADDR：DHCP 范围内的 IP 地址
- GATEWAY： 网关地址
- NETMASK： 子网掩码
- DNS1： DNS 和电脑保持一致
- DNS2： DNS 和电脑保持一致

```ini
IPADDR=192.168.255.200
GATEWAY=192.168.253.2
NETMASK=255.255.255.0
DNS1=202.96.134.133
DNS2=202.96.128.166
IPV6_PEERDNS=yes
IPV6_PEERROUTES=yes
IPV6_PRIVACY=no
```

修改`ONBOOT`成`yes`

```ini
ONBOOT=yes
```

#### 重启网络服务

```bash
service network restart
```

#### ping 外网

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/vmware_cAoeGf1M8G.png)

#### 找到 linux 的 ip 地址

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/vmware_byeKxnRvIG.png)

## ssh 连接虚拟机的 linux

找到输入 linux 的 ip
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/XshellCore_x7nP9iRf9D.png)

连接成功，xshell 界面比虚拟机的自带界面好很多
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Xshell_BC0Rju26eu.png)
