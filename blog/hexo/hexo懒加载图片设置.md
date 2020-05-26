---
title: hexo懒加载图片设置
date: 2019-10-09 10:54:59
tags:
  - hexo
type: 'categories'
categories:
  - 编程
  - hexo
---

## 前言

国人开发`hexo-lazyload-image`和`fancybox`冲突，一直未修复，其实简单加入一点代码就可以显示记载中图片

<!--more-->

## 开启 lazyload

`themes\next\_config.yml`的`lazyload`设置为`true`

> `themes\next\scripts\filters\lazyload.js`会把 img 标签的 src 去掉，放到 data-src 中再利用[lozad.js](https://github.com/ApoorvSaxena/lozad.js)这个库实现懒加载

但是默认设置加载中的图片地址

## 创建 lazy-view.js

在`scripts`创建一个`lazy-view.js`

```js
'use strict'

let cheerio

hexo.extend.filter.register(
  'after_post_render',
  (data) => {
    var loadinggif = hexo.config.loadinggif

    if (!loadinggif) return

    if (!cheerio) cheerio = require('cheerio')

    const $ = cheerio.load(data.content, { decodeEntities: false })
    const images = $('img')
    if (!images.length) return

    // hexo-next 默认会移除掉img的src属性，添加data-src
    images.attr('src', loadinggif)

    data.content = $.html()
  },
  10
)
```

## 为`_config.yml`添加组件配置

```yml
loadinggif: /images/loading.gif
```

## 添加 loading.gif

随便找一张 gif 图命名为`loading.gif`，把`loading.gif`放入到`source\images`

## 防止滚动动画触发图片加载

### 原因

点击目录导航会通过动画滚动到指定位置，滚动过程中经过那些图片会触发不必要的加载

### 清除回到顶部动画

`themes\next\source\js\utils.js`第 175 行  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_fh9MZLb4MZ.png)

duration 改成 0

```js
backToTop &&
  backToTop.addEventListener('click', () => {
    window.anime({
      targets: [document.documentElement, document.body],
      duration: 500,
      easing: 'linear',
      scrollTop: 0,
    })
  })
```

改成这样子，清除滚动的动画

```js
backToTop &&
  backToTop.addEventListener('click', () => {
    window.anime({
      targets: [document.documentElement, document.body],
      duration: 0,
      easing: 'linear',
      scrollTop: 0,
    })
  })
```

### 清除目录导航滚动动画

`themes\next\source\js\utils.js`第 252 行  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_yG1lntLc8I.png)

修改前

```js
window.anime({
  targets: [document.documentElement, document.body],
  duration: 500,
  easing: 'linear',
  scrollTop: offset + 10,
})
```

修改后

```js
window.anime({
  targets: [document.documentElement, document.body],
  duration: 0,
  easing: 'linear',
  scrollTop: offset + 10,
})
```

## 效果

浏览器窗口没有滚到位置的图片 src 是对应的 gif 图  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_dnqlZwU3Cv.png)

浏览器窗口滚到位置自动加载对应的图片  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_IckxIiJkrX.png)
