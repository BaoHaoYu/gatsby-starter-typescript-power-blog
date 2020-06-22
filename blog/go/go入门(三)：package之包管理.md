---
title: go入门(三)：package之包管理
date: 2020-03-25 20:00
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

## GOPATH

`GOPATH`是`go`包全局存放路径，把包放到`$GOPATH/src`下面，项目就可以通过`import $GOPATH/src/包名`引用

可以通过如下命令获得`GOPATH`

```bash
go env
```

在环境变量中修改修改`GOPATH`

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/SystemPropertiesAdvanced_QJXiqGCcQ1.png)

## Package 导出规则

`Package`导出规则由首字母大小写决定

### 函数

其他文件可以调用`Demo1`

```go
package myutil

func Demo1()  {

}
```

其他文件**不**可以调用`demo1`

```go
package myutil

func demo1()  {

}
```

### 结构体

可引用`People`，包括`People`中的所有字段

```go
package myutil

type People struct {
  Name string
  Age int
}
```

可引用`People`，**不**包括`People`中的`age`字段

```go
package myutil

type People struct {
  Name string
  age int
}
```

## package 的引用

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/goland64_I60I02tc6B.png)

main.go

```go
package main

import (
  "../myutil"
  "fmt"
)

func main() {
  var people = myutil.People{Name: "dd", Age: 111}
  fmt.Println(people)
}
```

当然也可以这样子引用`myuitl`

```go
import (
  "helloworld/myutil"
  "fmt"
)
```

## 包的下载

国内建议使用

- [阿里云](https://developer.aliyun.com/mirror/goproxy)
- [全球代理](https://goproxy.io/)

### 更换镜像地址

创建环境变量`GOPROXY`, 地址[](https://mirrors.aliyun.com/goproxy/)

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/SystemPropertiesAdvanced_YIY4t1d3F4.png)

### 安装模块

初始化`mod`

```bash
go mod init test
```

会多出一个文件`go.mod`，主要记录项目依赖的

```mod
module test

go 1.14
```

最终安装目录是`GOROOT/src`

```bash
go get github.com/astaxie/beego
```

## go.mod

`go.mod`可以管理项目依赖

```bash
go mod init demo
```

然后可以通过`demo/XXXX`引用对应的包了

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/goland64_F8XL4qNyJy.png)

执行`go run main.go`或者`go list`或者`go build`都会自动下载依赖包，并保存到`go.mod`中
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/goland64_4kv9PLMi29.png)
