---
title: go入门(五)：守护进程
date: 2020-03-28 20:00
tags:
  - go
type: categories
categories:
  - 编程
  - go
---

[go 入门(一)：HelloWorld](</go/go入门(一)：HelloWorld/>)
[go 入门(二)：struct 和 interface](</go/go入门(二)：struct和interface/>)
[go 入门(三)：package 之包管理](</go/go入门(三)：package之包管理/>)
[go 入门(四)：编译](</go/go入门(四)：编译/>)
[go 入门(五)：守护进程](</go/go入门(五)：守护进程/>)

<!-- more -->

[参考链接](https://jonathanmh.com/deploying-go-apps-systemd-10-minutes-without-docker/)

## 使用 systemctl

1.创建服务文件

```bash
vi /lib/systemd/system/godemo1.service
```

2.配置服务文件

```ini
[Unit]
Description=godemo1

[Service]
Type=simple
Restart=always
RestartSec=5s
ExecStart=/opt/www/godemo1/main

[Install]
WantedBy=multi-user.target
```

3.关键字段说明

- Description：描述
- ExecStart：go 二级制文件

---

4.启动服务

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Xshell_87HSffvQQA.png)
