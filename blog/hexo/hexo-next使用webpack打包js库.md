---
title: hexo-next使用webpack打包js库
date: 2019-10-17 18:59:43
tags:
  - hexo
type: 'categories'
categories:
  - 编程
  - hexo
---

## 前言

webpack 让多个引用打包成一个文件，减少 hexo-next 网站 js 的请求数目，适合带宽比较大的网站

<!-- more -->

## 打包前引用的 js

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_ce9WFdLKIR.png)

## 修改主题

### 主题的配置文件

`themes\next\_config.yml`添加一个配置

```yml
compress_js: true
```

### 动态判断

`themes\next\layout\_layout.swig`

```django
{%- if theme.compress_js %}
  <script type="text/javascript" src="/js/src/bundle.js?v=1.1.0"></script>
{% else %}
  <script type="text/javascript" src="https://cdn.bootcss.com/jquery.perfect-scrollbar/1.4.0/perfect-scrollbar.min.js?v=1.4.0"></script>
  <script type="text/javascript" src="https://cdn.bootcss.com/clipboard.js/2.0.4/clipboard.min.js"></script>
  <script type="text/javascript" src="/js/src/copy-code.js?v=0.1.0"></script>
  <script type="text/javascript" src="/js/src/click-pocket-monster.js?v=0.1.0"></script>
  <script type="text/javascript" src="/js/src/scroll-bar.js?v=0.1.0"></script>
{%- endif %}
```

### 主题自带的 js

`themes\next\layout\_scripts\index.swig`

```django
{%- if not theme.compress_js %}
  <!-- jquery,velocity等三方库 -->
  {% include 'vendors.swig' %}

  <!-- themes\next\source\js\utils.js -->
  {{- next_js('utils.js') }}

  <!-- themes\next\source\js\motion.js -->
  {%- if theme.motion.enable %}
    {{- next_js('motion.js') }}
  {%- endif %}
{%- endif %}

{%- set scheme_script = 'schemes/' + theme.scheme | lower + '.swig' %}

{%- if not theme.compress_js %}
  <!-- themes\next\source\js\schemes\muse.js -->
  {% include scheme_script %}

  <!-- themes\next\source\js\next-boot.js -->
  {{- next_js('next-boot.js') }}

  <!-- themes\next\source\js\bookmark.js -->
  {%- if theme.bookmark.enable %}
    {{- next_js('bookmark.js') }}
  {%- endif %}
{%- endif %}

{%- if theme.pjax %}
  {% include 'pjax.swig' %}
{%- endif %}
{% include 'three.swig' %}
```

### 搜索框 js

`themes\next\layout\_third-party\search\index.swig`

```django
{%- if theme.algolia_search.enable %}
  {% include 'algolia-search.swig' %}
{% elif theme.swiftype_key %}
  {% include 'swiftype.swig' %}
{% elif theme.local_search.enable and not theme.compress_js %}
  <!-- themes\next\source\js\local-search.js -->
  {% include 'localsearch.swig' %}
{%- endif %}
```

## webpack 打包

### 引用需要打包内容

创建`lib-list.js`

```js
window.Velocity = require('velocity-animate/velocity')
require('velocity-animate/velocity.ui')

const jQuery = require('jquery/dist/jquery.slim')
window.jQuery = jQuery
window.$ = jQuery

require('@fancyapps/fancybox/dist/jquery.fancybox')

window.anime = require('animejs/lib/anime')
window.ClipboardJS = require('clipboard')
window.lozad = require('lozad')
window.PerfectScrollbar = require('perfect-scrollbar/dist/perfect-scrollbar.common')

require('./themes/next/source/js/utils.js')
require('./themes/next/source/js/motion.js')
require('./themes/next/source/js/schemes/muse.js')
require('./themes/next/source/js/next-boot.js')
require('./themes/next/source/js/local-search.js')
require('./themes/next/source/js/src/copy-code.js')
require('./themes/next/source/js/src/click-pocket-monster.js')
require('./themes/next/source/js/src/scroll-bar.js')
```

### 打包配置

创建`webpack.config.js`

```js
const path = require('path')

module.exports = {
  entry: './lib-list.js',
  mode: 'production',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'themes/next/source/js/src'),
    libraryTarget: 'umd',
  },
}
```

### 打包 js

加入脚本  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_05GedqFS04.png)

```json
"build-bundle": "webpack",
```

执行 webpack 打包

```bash
npm run build-bundle
```

### 引用路径

```path
/js/src/bundle.js
```

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_In2vVNA0rw.png)

## 打包后的效果

减少了 10 来个请求，但是第一次首页更慢了 😳，因为本人服务器带宽限制，导致下载时间比响应时间更慢
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_OJwoI5NYtP.png)

## 总结

- 如果小网站，使用第三方 cnd 加速，访问量小，多那几个请求次数无关疼痒 😂
- 如果是大网站，使用资源压缩，反正有钱，流量无限加，但是性能不能无限加，万一性能导致的问题可亏大了 😄
