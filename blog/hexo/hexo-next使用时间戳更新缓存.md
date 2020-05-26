---
title: hexo-next使用时间戳更新缓存
date: 2019-10-22 21:54:43
tags:
  - hexo
type: 'categories'
categories:
  - 编程
  - hexo
---

## 前言

网站老是请求缓存，经常忘记更新引用文件后面的版本？使用 hexo 的 helpers，读取引用文件的最后修改时间，添加到引用地址的尾部，从而达到清理缓存效果

<!-- more -->

## 原来方案

### 原方案代码

hexo 本来的方案使用统一的 version 更新来刷新缓存
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/HFkTvWEF2x.png)

核心代码在`themes\next\scripts\helpers\next-js.js`里面

```js
hexo.extend.helper.register('next_js', function(...urls) {
  let js = hexo.theme.config.js
  let version = this.next_env('version')
  return urls.map((url) => this.js(`${js}/${url}?v=${version}`)).join('')
})
```

### 原方案使用方法

插入`<script src="/js/[filename].js?v=[version]"></script>`

```django
{{- next_js('[filename].js') }}
```

### 原方案缺点

- 不能自动更新版本
- 一个文件修改更新版本后，其他没有修改过的文件缓存也会刷新

## 时间戳方案

### 问题

时间戳方案 travis 编译失败，目前无任何解决方案，所有本人暂时放弃 travis 在线编译，坚决要使用 travis 的人可以放弃本篇教程了
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_5iljws1nZ7.png)

### 思路

对每个引用的 js 加入`?mtime=最后修改时间`，从而发生改变的文件`mtime`就会改变，缓存会被更新，其他没有修改的文件则无变化

### 创建 helper

在`next/scripts/helpers`中创建`file-mtime.js`，如果没有依赖则安装依赖

```bash
yarn add moment fs-extra execa
```

具体代码，`fs-extra`和`git log`读取修改时间，`moment`格式化时间

```js
/* global hexo */

'use strict'

const moment = require('moment')
const fs = require('fs-extra')
const path = require('path')
const spawn = require('cross-spawn')

const timeFormat = 'YYYYMMDDHHmmss'

// 获得文件夹或者文件最后修改时间
function getGitLastLogTime(filePath) {
  const msg = spawn.sync('git log -1 --pretty=format:"%cD" ' + filePath, {
    shell: true,
  })
  return moment(msg.stdout.toString()).format(timeFormat)
}

// 获得最后修改时间
function getFileMtime(filePath, source_path) {
  const sp = source_path || hexo.theme.config.source_path
  const abpath = path.join(process.cwd(), sp, filePath)

  try {
    let mtime = fs.statSync(abpath).mtime
    return moment(mtime).format(timeFormat)
  } catch (error) {
    return ''
  }
}

// git项目中的文件或者文件夹修改时间
hexo.extend.helper.register('get_git_last_log_time', function(
  filePath,
  source_path
) {
  const sp = source_path || hexo.theme.config.source_path
  const abpath = path.join(process.cwd(), sp, filePath)

  return getGitLastLogTime(abpath)
})

// 文件修改时间
hexo.extend.helper.register('get_file_mtime', function(filePath, source_path) {
  return getFileMtime(filePath, source_path)
})

// 生成link并加入时间戳
hexo.extend.helper.register('link_has_file_mtime', function(
  filePath,
  source_path
) {
  const mtime = getFileMtime(filePath, source_path)

  return `<link rel="stylesheet" href="${filePath}?mtime=${mtime}" />`
})

// 生成script并加入时间戳
hexo.extend.helper.register('script_has_file_mtime', function(
  filePath,
  source_path
) {
  const mtime = getFileMtime(filePath, source_path)

  return `<script src="${filePath}?mtime=${mtime}"></script>`
})
```

### 引用方法

插入 script 标签`<script src="/js/[filename].js?mtime=[mtime]"></script>`

```django
{{- script_has_file_mtime('/js/[filename].js') }}
```

插入 link 标签`<link rel="stylesheet" href="/css/[filename].css?mtime=[mtime]">`

```django
{{- link_has_file_mtime('/css/[filename].css') }}
```

### main.css

在`themes\next\layout\_partials\head\head.swig`中，原来的引用如下

```html
<link
  rel="stylesheet"
  href="{{ url_for(theme.css) }}/main.css?v={{ version }}"
/>
```

`main.css`比较特殊，因为它是由`next/source/css`的多个 styl 文件合并而成的，从而需要用 git 获得`next/source/css`最后提交时间，这就是`get_git_last_log_time`的意义所在

```html
<link
  rel="stylesheet"
  href="{{ url_for(theme.css) }}/main.css?mtime={{- get_git_last_log_time(theme.css) }}"
/>
```

### 效果

替换所有的`next_js`为`script_has_file_mtime`之后
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_i7qdKgnPsh.png)

## 总结

活用 hexo 的 helpers
