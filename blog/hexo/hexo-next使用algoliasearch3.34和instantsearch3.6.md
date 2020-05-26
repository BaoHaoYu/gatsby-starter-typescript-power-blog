---
title: hexo-next使用algoliasearch3.34和instantsearch3.6
date: 2019-10-23 22:35:41
tags:
  - hexo
type: 'categories'
categories:
  - 编程
  - hexo
---

`nextV7.4.0`的`algolia`搜索缺陷

- 无法使用回车触发搜索，由于`algolia`服务器的延迟都普遍上 180ms，连续输入触发连续搜索请求的时候变得很卡
- 还有官方 api 是对应最新版的

所以我选择了更新`instantsearch.js`的版本

<!-- more -->

## 引用新版本的 js

### 配置\_confg.yml

`algolia_instant_js`字段修改，`algolia_search_js`字段是新加入的

```yml
# 修改成最新instantsearch版本
algolia_instant_js: https://cdn.bootcss.com/instantsearch.js/3.6.0/instantsearch.production.min.js

# 加入新的依赖字段
algolia_search_js: https://cdn.bootcss.com/algoliasearch/3.34.0/algoliasearch.min.js
```

### swig 页面引用 js

文件位置`themes\next\layout\_third-party\search\algolia-search.swig`

删除`algolia_instant_css_uri`和引用，最终内容如下

```django
{%- set algolia_instant_js_uri = theme.vendors.algolia_instant_js | default(next_vendors('//cdn.jsdelivr.net/npm/instantsearch.js@2/dist/instantsearch.min.js')) %}
{%- set algolia_search_js_uri = theme.vendors.algolia_search_js | default(next_vendors('//cdn.bootcss.com/algoliasearch/3.34.0/algoliasearch.min.js')) %}

<script src="{{ algolia_instant_js_uri }}"></script>
<script src="{{ algolia_search_js_uri }}"></script>

{{- script_has_file_mtime('/js/algolia-search.js') }}
```

## 修改 algolia 对应的 js 逻辑

文件位置在`themes\next\source\js\algolia-search.js`

### 新参数

改参数需要引用`algoliasearch.js`
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_WusGKNrP3d.png)

```js
searchClient: algoliasearch(
  algoliaSettings.appID,
  algoliaSettings.apiKey
),
```

### 回车触发

加入`searchAsYouType`
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_ajc6kb4qmb.png)

### 查找结果提示

`body`改成`text`
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_RIG9UtnxWJ.png)

这样就可以防止这里提示是英文
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_EDGV7pvE4a.png)

## 搜索效果

点击搜索按钮或者回车即可触发搜索

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_MnvPirrGEN.png)

## 搜索改进

### 隐藏搜索按钮

文件位置`themes\next\source\css\_common\components\third-party\search.styl`

在如下位置加入美化代码
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_UtbQXbYYZJ.png)

```css
.ais-SearchBox-submit,
.ais-SearchBox-reset,
.ais-SearchBox-submit {
  display: none;
}

.ais-SearchBox-loadingIndicator {
  position: absolute;
}
```

效果
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_W21eBlhDMB.png)

### 搜索结果高亮并加入内容预览

文件位置在`themes\next\source\js\algolia-search.js`，修改成如下代码
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_fiXs3jQcEs.png)

```js
item: (data, info) => {
  let link = data.permalink ? data.permalink : CONFIG.root + data.path
  let strip = data._highlightResult.contentStrip.value + ''
  // 截取部分信息
  const contentList = strip.match(/.+<mark>.+?<\/mark>.+/) || []
  const stripString =
    contentList.map((v) => {
      return `<p>${v}</p>`
    })[0] || ''

  return `
    <a href="${link}" class="algolia-hit-item-link">
      <div class="algolia-hit-item-title">
        ${data._highlightResult.title.value}
      </div>
    </a>
    ${stripString}
  `
},
```

效果
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_RY1qex8rWs.png)
