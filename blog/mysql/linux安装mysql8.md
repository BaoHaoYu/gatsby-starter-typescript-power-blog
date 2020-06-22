---
title: linux安装mysql8
date: 2019-10-11 12:12:00
tags:
  - 编程
  - mysql
  - linux
type: 'categories'
categories:
  - 编程
  - mysql
---

## 下载

[地址](https://dev.mysql.com/downloads/mysql/)

### 选中版本

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Zf18Ruuluq.png)

<!--more-->

通过`uname -a`查看是否 64 位  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Xshell_lUVVxGZj3I.png)

### CentOS

以 CentOS7 64 位系统为例子，点击 Donwload 进入下载页面  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_jhMvxOoNKT.png)

### 获得下载链接

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_LrGvTViRKc.png)

### wget 下载 xz 包

```bash
wget https://dev.mysql.com/get/Downloads/MySQL-8.0/mysql-8.0.17-linux-glibc2.12-x86_64.tar.xz
```

## 在 linux 下配置

### 解压 xz

解压时间比较长，请耐心等待

```bash
tar -xvf mysql-8.0.17-linux-glibc2.12-x86_64.tar.xz -C /opt/env
```

解压完毕，进入目录查看文件情况

```bash
cd /opt/env/mysql-8.0.17-linux-glibc2.12-x86_64
ls
```

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Xshell_YBRBDkB7j6.png)

### 创建软链接

之后可以直接`cd /opt/env/mysql`进入该目录

```bash
ln -s mysql-8.0.17-linux-glibc2.12-x86_64 mysql
```

### 添加 mysql 用户组和用户

```bash
groupadd mysql
useradd -r -g mysql -s /bin/false mysql
```

### 为用户赋予 mysql 所有权

```bash
cd /opt/env/mysql
chown -R mysql:mysql ./
```

### 执行安装

保证`/opt/env/mysql-8.0.17-linux-glibc2.12-x86_64`目录下有 data 文件夹，没有则创建一个

```bash
./bin/mysqld --user=mysql --basedir=/opt/env/mysql --datadir=/opt/env/mysql/data --initialize
```

如果提示如下内容，请执行`yum install -y libaio`

```log
./bin/mysqld: error while loading shared libraries: libaio.so.1: cannot open shared object file: No such file or directory
```

安装完毕  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Xshell_ERfZA2WDLF.png)

## 配置 my.cnf

执行 `vi /etc/my.cnf`，默认配置修改更改
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Xshell_clVDUl19X6.png)

```ini
[mysqld]
# 设置3306端口
port=3306

# 设置mysql的安装目录
basedir=/opt/env/mysql/

# 设置mysql数据库的数据的存放目录
datadir=/opt/env/mysql/data
socket=/opt/env/mysql/mysql.sock
user=mysql

# 允许最大连接数
max_connections=10000

# 允许连接失败的次数。这是为了防止有人从该主机试图攻击数据库系统
max_connect_errors=10

# 服务端使用的字符集默认为UTF8
character-set-server=utf8

# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB

# 默认使用"mysql_native_password"插件认证
default_authentication_plugin=mysql_native_password

# 开启ip绑定
bind-address = 0.0.0.0

# pid文件
pid-file=/opt/env/mysql/mysqld.pid

[mysqld_safe]
# 错误日志
log-error=/var/log/mysqld.log

[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8

[client]
# 设置mysql客户端连接服务端时默认使用的端口
port=3306
```

> 注意：如果内存 512MB 在`[mysqld]`加入`innodb_buffer_pool_size=32MB`

## 配置环境变量

```bash
vi /etc/profile
```

```bash
export PATH=$PATH:/opt/env/mysql/bin:/opt/env/mysql/lib
export PATH
```

```bash
source /etc/profile
```

## 启动 mysql 服务

### 直接启动

```bash
cd /opt/env/mysql
./support-files/mysql.server start
```

### 通过服务启动

#### 添加服务

```bash
cp -a /opt/env/mysql/support-files/mysql.server /etc/init.d/mysqld
chmod +x /etc/rc.d/init.d/mysqld
chkconfig --add mysqld
```

检测是否添加成功

```bash
chkconfig  --list mysqld
```

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Xshell_8cUhDP3mBE.png)

#### 启动服务

命令 1

```bash
service mysql start
```

命令 2

```bash
/etc/rc.d/init.d/mysqld
```

## 512MB 内存的穷人已经放弃治疗

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_hpyNOS3SCU.png)

`ps aux|head -1;ps aux|grep -v PID|sort -rn -k +4|head`取进程占用内存(MEM)最高的前 10 个进程，node 占用了 3 分之 1  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Xshell_HBf72OekiE.png)

`free -m`可用内存 8MB  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Xshell_CsLDLaS5sd.png)
