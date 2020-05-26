---
title: hexo添加背景图片
date: 2019-10-13 10:23:27
tags:
  - 编程
type: 'categories'
categories:
  - 编程
  - hexo
---

## 前言

hexo 有背景无背景，逼格都是不一样的

<!--more-->

## 方案一（推销）

在`themes\next\source\css\main.styl`添加如下代码，纯碎 css 搞定

```css
body {
  background: url('') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
```

参考[perfect-full-page-background-image](https://css-tricks.com/perfect-full-page-background-image/)

## 方案二：通过 js 添加

### 加入新的配置

根部`_config.yml`，根据个人爱好加入不同的图片吧

```yml
backgroundImage: https://bhyblog.oss-cn-shenzhen.aliyuncs.com/wallhaven/wallhaven-47j129.jpg
```

### 为 CONFIG 加入新字段

`themes\next\layout\_partials\head\head.swig`和 CONFIG 变量添加

```json
backgroundImage: {{ config.backgroundImage | json_encode }}
```

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_4x0XCbMAYW.png)

### 创建 js 文件

`themes\next\source\js\src\background-image.js`

```js
/**
 * 添加背景图片
 */
!(function(window, document) {
  const url = CONFIG.backgroundImage

  if (url === '') return

  const $body = document.getElementsByTagName('body')[0]

  var img = new Image()
  img.src = url

  // 自动获得图片大小
  img.onload = function() {
    // 图片宽
    const width = this.width
    // 图片高
    const height = this.height
    resize()
    $body.style.backgroundImage = `url(${url})`
    $body.style.backgroundRepeat = 'no-repeat'
    $body.style.backgroundAttachment = `fixed`
    $body.style.backgroundPosition = `50% 50%`

    window.addEventListener('resize', resize)

    // 重新修改大小
    function resize() {
      const windowW = $body.clientWidth
      const windowH = $body.clientHeight
      // 背景图片高度100%，宽度自适应
      if (windowW / windowH < width / height) {
        $body.style.backgroundSize = 'auto 100%'
      }
      // 背景图片宽度100%，高度自适应
      else {
        $body.style.backgroundSize = '100% auto'
      }
    }
  }
})(window, document)
```

### 引用 js 文件

在`themes\next\layout\_layout.swig`中的**body 头部添加**如下代码

```js
<script type="text/javascript" src="/js/src/background-image.js"></script>
```

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_eg8HOMuOO7.png)

> 在 body 头部添加的好处是：在页面元素加载好之前就添加好背景图片
> 在 body 尾部添加要等到 body 其他元素加载好了，才会执行添加背景图片逻辑

### 重启 hexo

```bash
hexo clean
hexo server
```

### js 效果

拉宽
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_WaEpkVVOmJ.png)

拉高
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_PhdgZFwkyo.png)

### 方案二优点

- 背景图片可以自动调整大小
- 抽离了背景图片做成了可配置项

### 方案二缺点

- 进入页面会又一瞬间的白屏
