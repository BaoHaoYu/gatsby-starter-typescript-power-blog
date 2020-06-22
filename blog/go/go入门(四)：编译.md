---
title: go入门(四)：编译
date: 2020-03-27 20:00
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

## 示例代码

mian.go，启动 8080 端口

```go
package main

import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default()

    r.GET("/", func(context *gin.Context) {
        context.JSON(200, gin.H{"message": "done"})
    })

    r.Run()
}
```

## 编译成 exe

1.`window`下执行编译命令后会生成对应的`exe`文件

```bash
go build
```

生成的文件名由`go.mod`决定
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/explorer_Nbw4RApeqI.png)

2.执行编译好的文件

双击打开 `exe`
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/demo_fDyM6YA6Q3.png)

通过浏览器可以看见 8080 端口已经开启了服务
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_sXZ9Oy9kbf.png)

## 编译成 linux

[参考地址](https://blog.csdn.net/this_capslock/article/details/17415409)

编译后是一个二级制文件

```bash
SET CGO_ENABLED=0
SET GOOS=linux
SET GOARCH=amd64
go build main.go
```

把二级制文件直接放到`linux`里面，可以直接执行二级制文件，不需要搭建任何环境，这也是`go`的一大特点

```bash
chmod 777 main
./main
```

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Xshell_Pi7RWg8Isp.png)
