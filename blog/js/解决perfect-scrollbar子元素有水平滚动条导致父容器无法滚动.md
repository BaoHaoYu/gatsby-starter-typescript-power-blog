---
title: 解决perfect-scrollbar子元素有水平滚动条导致父容器无法滚动
date: 2019-10-15 19:50:19
tags:
  - 编程
  - js
type: categories
categories:
  - 编程
  - javascript
---

## 前言

开发到美化博客滚动条的时候，博客内容的代码出现横向滚动的时候，鼠标在代码中用滚轮上下滚动会失效

<!-- more -->

## 解决方案 1: 换版本

换`v1.3`版本的`perfect-scrollbar`

## 解决方案 2: 修改源码

### 修改关键位置

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_WnJoraC61G.png)

```js
if (!element.contains(target))
```

改成

```js
if (element.contains(target))
```

### 扩展：查找 bug 的过程

#### 谁发生了变化

经过`Chrome`控制台发现，每次滚动的时候都会修改`class`为`ps__rail-y`的标签`style`属性  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_EkYTWPoKfO.png)

#### 属性修改断点

加属性修改断点就可以找到源码位置  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_Z7h7nrcImG.png)

#### 错误堆栈

刷新页面后再次滚动会触发断点，跑到最外层的函数`mousewheelHandler`中  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_NB9McLXkgX.png)

#### 定位关键函数

稍微看看源码，找到了一段代码会中断代码`mousewheelHandler`的执行，所以关键变成了`shouldBeConsumedByChild`返回时 true 的话，就会中断执行  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_yO6nrthd9M.png)

#### 修改关键行

既然返回 true 就不行，就找个逻辑清晰的地方让它返回 false

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_WnJoraC61G.png)

- 原来的逻辑：如果`perfect-scrollbar`元素**不包含**当前触发滚轮滚动的元素，则`perfect-scrollbar`元素继续滚动

- 后来的逻辑：如果`perfect-scrollbar`元素**包含**当前触发滚轮滚动的元素，则`perfect-scrollbar`元素继续滚动
