---
title: chrome插件开发(二)：webRequest网络请求
date: 2019-11-06 15:48:00
tags:
  - chrome
  - nodejs
type: categories
categories:
  - 编程
  - chrome
---

chrome 插件中的`chrome.webRequest`配置负责网络请求，可以重定向，中断页面的网络请求

<!-- more -->

## 前言

需要在`manifest.json`权限`permissions`字段加入`webRequest`

---

[本文项目地址](https://github.com/BaoHaoYu/chrome-typescript-extension)

## 重定向到外部链接

`manifest.json`权限`webRequestBlocking`，如下是简单的图片重定向

```ts
// 重定向
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    console.log(details)
    return {
      redirectUrl:
        'http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_Ako9Q6BZrP.png',
    }
  },
  {
    urls: ['https://www.baidu.com/img/bd_logo1.png?where=super'],
  },
  ['blocking']
)
```

`console.log(details)`结果

```log
frameId: 0
initiator: "https://www.baidu.com"
method: "GET"
parentFrameId: -1
requestId: "15885"
tabId: 249
timeStamp: 1573116681964.935
type: "image"
url: "https://www.baidu.com/img/bd_logo1.png?where=super"
```

把百度图片替换成其他图片
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_KhAJQoYUD9.png)

但是图片链接依旧是不变的，这就是重定向，前台的东西不变，拿给你的东西变成其他玩意
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_h9cbJUFtnh.png)

## 重定向到内部文件

`manifest.json`添加`web_accessible_resources`，告诉扩展页面可以访问的内部文件

```json
"web_accessible_resources": ["img/*.png"]
```

```ts
// 重定向
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    return {
      redirectUrl: chrome.extension.getURL('img/icon_pocket_monster_1011.png'),
    }
  },
  {
    urls: ['https://www.baidu.com/img/bd_logo1.png?where=super'],
  },
  ['blocking']
)
```

可以看见百度的 logo 替换成插件内部的一张图片
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_HxrJLA1B12.png)

## 使用场景

{% note info %}
有的页面或者资源是用 js 动态请求生成的，这时候想要获得对应的资源最好的方法就是在原 js 上进行修改
{% endnote %}
