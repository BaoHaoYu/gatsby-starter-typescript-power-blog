---
title: hexo-next主题安装与配置
date: 2019-10-08 18:27:00
tags:
  - hexo
type: 'categories'
categories:
  - 编程
  - hexo
---

## 主题安装[Next](https://github.com/theme-next/hexo-theme-next)

科隆主题到`theme/next`中

```bash
git clone https://github.com/theme-next/hexo-theme-next themes/next
```

修改根部`_config.yml`的`theme`字段为`next`

## 修改风格

`themes\next\_config.yml`修改`scheme:`

<!--more-->

## 添加搜索

配置[hexo-generator-search](https://github.com/wzpan/hexo-generator-search)
安装对应的包 `yarn add hexo-generator-search`，然后修改根部 `_config.yml`

添加如下内容

```yml
search:
  path: search.xml
  field: post
  content: true
```

开启主题中的搜索功能  
`themes\next\_config.yml`中的`enable`改成`true`

```yml
local_search:
  enable: true
```

## 首页折叠博客内容

`themes\next\_config.yml`

```yml
auto_excerpt:
  enable: true
  length: 150
```

所有的文章加入`<!-- more -->`

## 加入标签云

[git 地址](https://github.com/MikeCoder/hexo-tag-cloud)

根部安装`hexo-tag-cloud`

```bash
yarn add hexo-tag-cloud
```

`next/layout/_macro/sidebar.swig`加入如下内容

```django
{% if site.tags.length > 1 %}
  <script src="{{ url_for('/js/tagcloud.js') }}"></script>
  <script src="{{ url_for('/js/tagcanvas.js') }}"></script>
  <div class="widget-wrap">
    <h3 class="widget-title">Tag Cloud</h3>
    <div id="myCanvasContainer" class="widget tagcloud">
      <canvas width="250" height="250" id="resCanvas" style="width=100%">
        {{ list_tags() }}
      </canvas>
    </div>
  </div>
{% endif %}
```

效果如图  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_nnj5raiX9W.png)

## 加入 Note

配置`themes\next\_config.yml`的`note`字段以修改各种样式

```yml
note:
  style: flat
  icons: true
  border_radius: 3
  light_bg_offset: 0
```

md 文件加入如下格式内容

```md
<!-- primary success warning danger -->

{% note [class] [no-icon] %}
note text
{% endnote %}
```

{% note %}
note default
{% endnote %}

{% note primary %}
note primary
{% endnote %}

{% note success %}
note success
{% endnote %}

{% note info %}
note info
{% endnote %}

{% note warning %}
note warning
{% endnote %}

{% note danger %}
note danger
{% endnote %}

{% note danger no-icon %}
note danger no-icon
{% endnote %}
