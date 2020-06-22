---
title: 忘记window的mysql密码
date: 2019-10-08 16:59:00
tags:
  - 编程
  - mysql
  - window
type: 'categories'
categories:
  - 编程
  - mysql
---

## 结束 mysql 服务

services.msc  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/ONENOTE_s0VGriaRbH.png)

<!--more-->

停止对应服务
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/ONENOTE_c0m9AcWgGM.png)

## 跳过密码验证

找到`my-default.ini`的位置  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/ONENOTE_QSLE4X2mL0.png)

```bash
mysqld --defaults-file="C:\Program Files\MySQL\MySQL Server 5.7\my-default.ini" --console --skip-grant-tables
mysqld --defaults-file="C:\Program Files\MySQL\MySQL Server 5.7\my.ini" --console --skip-grant-tables
```

如果出现如下错误提示

```log
mysqld: Can't change dir to 'C:\Program Files\MySQL\MySQL Server 5.7\data\' (Errcode: 2 - No such file or directory)
```

在`my-default.ini`的`[mysqld]`加入`datadir`配置，注意`datadir`目录必须是存在的

```ini
datadir=D:\mysql_datadir
```

正常情况下目录是这样子的，如果不是这样子，重装`mysql`服务，参考 "压缩包的形式安装"
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/ONENOTE_nGVdypUhRx.png)

执行完毕后，出现如下内容，表示`mysql`这个数据库被锁了，在`mysql`安装目录里面看有没有`user.MYD` 文件，没有就重装`mysqlf`服务
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Honeyview_J2WseSDCtc.png)

## 修改密码

再打开一个 cmd，接下来输入`mysql`就可以跳过密码验证了
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/ONENOTE_bKyH2pLj4v.png)

```sql
update mysql.user set authentication_string=password('a123456') where user='root';
FLUSH PRIVILEGES;
```

重新登陆一下

```sql
mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED BY 'a123456';
SET PASSWORD = PASSWORD('a123456');
```

最后，启动 mysql 服务
