---
title: 彻底删除window下的mysql
date: 2019-10-08 16:16:00
tags:
  - 编程
  - mysql
  - window
type: 'categories'
categories:
  - 编程
  - mysql
---

## 停止服务

`services.msc`
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/ONENOTE_s0VGriaRbH.png)

停止对应服务
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/ONENOTE_c0m9AcWgGM.png)

<!--more-->

## 卸载 mysql

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/explorer_NcmkR1ASwb.png)

## 清除注册表

删除如下三个文件夹

- `HKEY_LOCAL_MACHINE\SYSTEM\ControlSet001\Services\Eventlog\Application\MySQL`
- `HKEY_LOCAL_MACHINE\SYSTEM\ControlSet002\Services\Eventlog\Application\MySQL`
- `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Eventlog\Application\MySQL`

## 删除服务

```bash
sc delete mysql
```

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/ONENOTE_VHjgjr8Rs9.png)
