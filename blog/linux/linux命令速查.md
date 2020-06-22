---
title: linux命令速查
date: 2019-09-29 17:08:00
tags:
  - linux
type: 'categories'
categories:
  - 编程
  - linux
---

## 防火墙

### 服务

```bash
systemctl status firewalld  # 状态
systemctl start firewalld   # 开启
systemctl stop firewalld    # 关闭
systemctl restart firewalld # 重启
```

<!--more-->

### 开放和删除端口

```bash
firewall-cmd --zone=public --add-port=80/tcp --permanent     # 开放端口
firewall-cmd --reload                                        # 重新加载
firewall-cmd --list-ports                                    # 显示所有端口
firewall-cmd --zone=public --remove-port=80/tcp --permanent  # 删除端口
```

## yum

```bash
yum -y install httpd                 # 安装
yum -y remove httpd php php-gd mysql # 删除
yum update php                       # 更新
yum search xz                        # 搜索
```

## httpd(Appache)

```bash
systemctl status httpd
systemctl start httpd
systemctl stop httpd
systemctl restart httpd
```

## mysql

```bash
mysql -u root -p          # 登录
show databases;           # 显示所有数据库
use test;                 # 使用某个数据库
drop database cnpmjs;     # 删除数据库
create database [name];   # 创建数据库
create table [tablename]; # 建表
```

## 解压

```bash
tar zxvf ddd.gz -C /root/ddd # 解压 gz 到指定位置
tar -xf ddd.tar -C /opt/env  # 解压 tar 到指定位置
tar -Jxf ddd.xz -C /opt/env  # 解压 xz 到指定位置，不显示日志
tar -xvf ddd.xz -C /opt/env  # 解压 xz 到指定位置，会打印解压出来的文件
unzip ddd.zip -d /opt/dd     # 解压 zip 到指定位置
```

## 删除

```bash
rm -rf /var/log/httpd/access # 删除文件夹所有文件，无任何提示
```

## 内存

```bash
free -m                                               # 内存使用情况
ps aux|head -1;ps aux|grep -v PID|sort -rn -k +4|head # 内存占用前 10 的程序
```

## 硬盘

```bash
df -h        # 硬盘空间
du -sh [***] # 返回该目录的大小
du -sm [***] # 返回该文件夹总 M 数
du -h [***]  # 查看指定文件夹下的所有文件大小（包含子文件夹）
```

## 常用安装

```bash
yum install net-tools # netstat命令
yum install epel-release # 更多的库
```

## 端口

```bash
netstat -tunlp |grep # 查看端口
```

## 技巧

1.模糊匹配，可以省略不必要的字符

```bash
service start mys*
unzip *.zip -d ./
```
