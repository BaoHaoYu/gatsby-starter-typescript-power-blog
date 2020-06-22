---
title: go 入门(二)：struct 和 interface
date: 2020-03-25 19:00
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

## go 没有类

取而代之的是`struct`，和`typescript`的`interface`类似，不过没有泛型

```go
type People struct {
  Name string
  Age int
}

var people = myutil.People{Name: "dd", Age: 111}


func demo(p myutil.People)  {
  fmt.Print(p.Age)
}
```

## 结构体的嵌套

```go
type People struct {
  Name    string
  Age     int
  Address struct {
    city   string
    street string
  }
}
```

```go
type Address struct {
  city   string
  street string
}

type People struct {
  Name    string
  Age     int
  Address Address
}
```

## 好处

1.方便重构，只要对应的字段都可以一次性修改

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/pwqN7MsUSb.png)

## 接口

```go
package demo

import "fmt"

// 接口
type help interface {
  add() int
  del() int
}

// 接口方法的各种实现
type People struct {
  Age int
}

func (people People) add() int {
  return people.Age + 20
}
func (people People) del() int {
  return people.Age - 20
}

type Animal struct {
  Lifespan int
}

func (animal Animal) add() int {
  return animal.Lifespan + 20
}
func (animal Animal) del() int {
  return animal.Lifespan - 20
}

// 接口入口
func InterfaceDemo(i help) {
  fmt.Println(i.add())
  fmt.Println(i.del())
}

```
