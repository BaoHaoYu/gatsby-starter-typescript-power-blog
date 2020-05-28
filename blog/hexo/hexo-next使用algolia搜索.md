---
title: hexo-next使用algolia搜索
date: 2019-10-23 21:05:06
tags:
  - hexo
type: 'categories'
categories:
  - 编程
  - hexo
---

## 前言

本地搜索的 search.xml 日益肿大，1M 小水管耗不起，一个搜索请求 search.xml 耗时超过两秒钟，这就有了 algolia 云搜索

注意索引有大小限制

> If you signed up for your plan online:
>
> - 10 KB for Pro, Starter, or Free accounts
> - 20 KB for legacy (Essential and Plus)

<!-- more -->

## 注册 algolia 账号

[官网地址](https://www.algolia.com/)，可以使用 GitHub 注册

## 创建 index

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_2f1WTrUpgi.png)

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_GaNWxwwOnQ.png)

## 加入配置

### 根部\_config.yml 配置

```yml
algolia:
  appId: *
  apiKey: *
  adminApiKey: *
  indexName: *
  chunkSize: 5000
  fields:
    - title
    - slug
    - path
    - content:strip
```

`fields`字段告诉 algolia 需要返回什么信息
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_r2gym36NDO.png)

### API Keys

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_MC0Zt9chyR.png)

序号对应的参数如下  
1.appId  
2.apiKey  
3.adminApiKey
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_jU9IfPNj35.png)

### indexName

indexName 参数
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_MZX68ccpm2.png)

## 上传网页到 algolia

先安装

```bash
yarn add hexo-algoliasearch
```

执行

```bash
hexo algolia
```

上传成功
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/cmd_DA01pPF8Mi.png)

可以在面板里查看
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_WSImyCnLR7.png)

## 解决 Bug: Please provide an application ID

`hexo-algoliasearch`使用的是`_config.yml`是`algolia.appId`，但是 CONFIG 使用的又是`algolia.applicationID`，两者读取关键参数字段不同导致的 bug，修改如下文件即可解决 bug

文件位置`themes\next\layout\_partials\head\head.swig`
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_KVHvoOc8Kq.png)

## 开启配置

next 的\_config.yml

```yml
algolia_search:
  enable: true
  hits:
    per_page: 10
  labels:
    input_placeholder: 搜索博客
    hits_empty: '没有任何结果: ${query}'
    hits_stats: '${hits} 个结果，查找时间 ${time} 毫秒'
```

## 效果

`algolia_search`

![d](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_kyHnDJQ9Tg.png)

`local_search`

![e](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_sxLn7AmnyB.png)

## 加入搜索内容

通过效果发现 algolia 没有把文章内容放出来，具体代买在`themes\next\source\js\algolia-search.js`里面

修改成如下代码
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_oC5F9HExpr.png)

```js
;(data, info) => {
  let link = data.permalink ? data.permalink : CONFIG.root + data.path
  let strip = data._highlightResult.contentStrip.value + ''
  // 截取部分信息
  const contentList = strip.match(/.+<em>.+?<\/em>.+/g) || []
  const stripString =
    contentList.map((v) => {
      return `
      <li>
        ${v}
      </li>
    `
    })[0] || ''
  return `
    <a href="${link}" class="algolia-hit-item-link">
      <div class="algolia-hit-item-title">
        ${data._highlightResult.title.value}
      </div>
    </a>
    <ul class="algolia-hit-item-strip">${stripString}</ul>
  `
}
```

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_wTyOdx8VZX.png)

## 参考链接

- [官方文档](https://www.algolia.com/doc/)
