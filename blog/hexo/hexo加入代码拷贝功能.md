---
title: hexo加入代码拷贝功能
date: 2019-10-11 14:55:39
tags:
  - hexo
type: 'categories'
categories:
  - 编程
  - hexo
---

## 加入按钮样式

创建样式文件 `themes\next\source\css\my.styl`

```styl
// 复制代码的按钮
.btn-copy-code
    position: absolute;
    right: 0;
    opacity: 0.1;
    z-index: 10;
    cursor: pointer;
    transition: all 0.3s;
    &:hover
        opacity: 0.5;

code
    cursor: pointer;
    transition: all 0.3s;
    &:hover
        background-color: #dcdcdc
```

<!--more-->

在`themes\next\source\css\main.styl`引用按钮样式

```styl
@import "my.styl"
```

## 加入 js 代码

`themes\next\source\js\src\copy-code.js`

```js
// 页面载入完成后，创建复制按钮
!(function(e, t, a) {
  // code
  var initCopyCode = function() {
    var copyHtml = ''
    copyHtml += '<button class="btn-copy-code" data-clipboard-snippet="">'
    copyHtml += '  <i class="fa fa-globe"></i><span>copy</span>'
    copyHtml += '</button>'
    $('.highlight .code pre').before(copyHtml)

    // 拷贝按钮
    new ClipboardJS('.btn-copy-code', {
      target: function(trigger) {
        return trigger.nextElementSibling
      },
    })

    // 迷你代码块
    new ClipboardJS('.post-body code', {
      target: function(trigger) {
        return trigger
      },
    })
  }
  initCopyCode()
})(window, document)
```

`themes\next\layout\_layout.swig`的 body 底部引用 js 代码

```js
<script src="https://cdn.bootcss.com/clipboard.js/2.0.4/clipboard.min.js"></script>
<script src="/js/src/copy-code.js"></script>
```

## 效果图

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_91CD83jU8A.png)
