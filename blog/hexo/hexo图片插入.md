---
title: hexo图片插入
date: 2019-09-28 15:09:00
tags:
  - hexo
type: 'categories'
categories:
  - 编程
  - hexo
---

## 前言

本章方法是把博客图片放在项目内部，实属下策，每次都要为博客建立新的文件夹，保存到对应的目录，对图片重新命名，拷贝博客图片地址

## 图片左边对齐

运来的图时居中  
打开`themes\next\source\css\_common\scaffolding\base.styl`，修改

```styl
iframe, imge, video {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
}
```

改成这样子

```styl
iframe, video {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
}

img {
  display: block;
  margin-right: auto;
  max-width: 100%;
}
```

<!--more-->

## 插入图片

新建目录，`source\images`，把图片放入到里面，即可通过根部路径访问
![](/../images/hexo图片插入/图片示例.png)

## 图片缩小

github:  
[Hexo-all-minifier](https://github.com/vseventer/Hexo-all-minifier)

安装:  
`yarn add Hexo-all-minifier`

修改配置:  
`_config.yml`配置

```yml
image_minifier:
  enable: true
  interlaced: false
  multipass: false
  optimizationLevel: 2
  pngquant: false
  progressive: false
  silent: false
```
