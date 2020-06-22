---
title: go入门(一)：HelloWorld
date: 2020-03-25 18:00
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

## 配置 window 的 go 环境

[下载地址](https://golang.org/dl/)
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_pIlG8jcHof.png)

执行`go version`，有显示版本说明成功配置了`go`环境
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/cmd_JRqdlSkmC7.png)

## 开发工具

`vscode`和`goland`，`goland`作为大型`ide`开发起来还是比较顺手的

运行的时候要选好`go`的安装目录
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/goland64_Oj2KSH4Ogi.png)

## Hello world

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/goland64_iIZehheWp1.png)

```go
package main

import ("fmt")

func main() {
    fmt.Println("hello world")
}
```

当然也可以执行`go run main.go`达到同样效果
