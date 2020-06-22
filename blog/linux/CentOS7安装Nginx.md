---
title: CentOS7安装Nginx
date: 2019-10-08 10:29:00
tags:
  - 编程
  - linux
  - nginx
type: 'categories'
categories:
  - 编程
  - nginx
---

## 安装

```bash
yum -y install nginx
```

<!--more-->

## 端口转发设置

### 配置 nginx.conf

```bash
vi /etc/nginx/nginx.conf
```

注释掉如下内容，否则 80 端口一直转发到/usr/share/nginx/html

```conf
server {
    listen       80 default_server;
    listen       [::]:80 default_server;
    server_name  _;
    root         /usr/share/nginx/html;

    # Load configuration files for the default server block.
    include /etc/nginx/default.d/*.conf;

    location / {
    }

    error_page 404 /404.html;
        location = /40x.html {
    }

    error_page 500 502 503 504 /50x.html;
        location = /50x.html {
    }
}
```

### 配置 conf 文件

#### 观察`nginx.conf`

可以发现 nginx 包含了所有的`conf.d`目录下的 conf 格式文件，如此在`/etc/nginx/conf.d`里面创建配置文件即可  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Xshell_Yw4aA16LFH.png)

#### 新建格式为 conf 的文件

在`/etc/nginx/conf.d`中新建格式为 conf 的文件

```bash
vi /etc/nginx/conf.d/blog.conf
```

#### 修改 conf 内容

- 注意一定保证 access_log 字段对应的文件是存在的
- 把 www.bhyddd.top 替换成你的域名或者 ip
- proxy_pass 字段的 9000 端口替换成你所需要的

```conf
server {
    listen 80;
    server_name www.bhyddd.top;

    location /
    {
        proxy_redirect off;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://localhost:9000;
    }

    access_log /opt/log/www.bhyddd.top/nginx.log;
}
```

#### 保存文件

按 esc 然后输入

```bash
:wq
```

### 重启

重启即可把 9000 端口映射到 80 端口

```bash
service nginx reload
```

## 效果

本人成功后拥有的第一个正式网站  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_lfIPHjgEKl.png)

## 常用命令

```bash
systemctl enable nginx # 设置开机启动
service nginx start # 启动nginx服务
service nginx stop # 停止nginx服务
service nginx restart # 重启nginx服务
service nginx reload # 重新加载配置，一般是在修改过nginx配置文件时使用。
```
