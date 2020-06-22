---
title: window下mysql以压缩包的形式安装
date: 2019-10-08 15:59:00
tags:
  - 编程
  - mysql
  - window
type: 'categories'
categories:
  - 编程
  - mysql
---

## 官网下载

zip 格式的[MySQL Server](https://dev.mysql.com/downloads/mysql/)的压缩包，
确保原来 mysql 服务已经清除  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_oB4sWudNBK.png)

## 配置 my.ini

创建文件夹 datadir
5.6 的 mysql 只有 my-default.ini,需要自己手动创建

```ini
[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8
[mysqld]
#设置3306端口
port = 3306
# 设置mysql的安装目录
basedir=C:\mysql-5.7.12-winx64
# 设置mysql数据库的数据的存放目录
datadir=C:\mysql-5.7.12-winx64\data
# 允许最大连接数
max_connections=200
# 服务端使用的字符集默认为8比特编码的latin1字符集
character-set-server=utf8
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
```

<!--more-->

## 初始化

以管理员身份运行 cmd，并 cd 到 mysql 中的 bin 目录下，执行命令:

```bash
mysqld --initialize --user=mysql --console
```

该命令会创建 data 目录与数据库，**生成 root 用户和临时密码，5.6 的版本默认没有 root 密码**，  
如下图，我们需要记住这个命令以便于登录。
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Honeyview_QBABwU5M7J.png)

## 配置环境变量

右键此电脑（计算机）-属性-高级系统设置-高级-环境变量
在系统变量中的 PATH 中加入你的 bin 目录，如：`C:\mysql-5.7.12-winx64\bin`

## 安装 MySQL 服务

以管理员身份运行 cmd，并输入

```bash
mysqld install MySQL --defaults-file="D:\Program Files (x86)\mysql-5.7.21-winx64\my.ini"
```

然后启动服务

```bash
net start mysql
```

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/ONENOTE_F31XYpWdUk.png)

## 修改 root 密码

```sql
update mysql.user set authentication_string=password('a123456') where user='root';
ALTER USER 'root'@'localhost' IDENTIFIED BY 'a123456';
FLUSH PRIVILEGES;
```

_如果是 5.6_

```sql
update mysql.user set password=password('a123456') where user='root';
```
