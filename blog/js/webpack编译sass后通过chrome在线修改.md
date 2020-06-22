---
title: webpack编译sass后通过chrome在线修改
date: 2019-10-30 19:50:19
tags:
  - webpack
type: categories
categories:
  - 编程
  - webpack
---

## 前言

`css-loader`开启`sourcemap`后，发现`sources`一直有问题，从 2.\*版本，持续到 3.\*版本，导致`chrome`的`worksapce`无法快速定位修改 css

`GitHub`上面一直推皮球，`css-loader`说：那是`sass-loader`的错，`sass-loader`说：那是`css-loader`的错

{% note success %}
正常的 sources
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_kRCgoqF4Qe.png)
{% endnote %}

{% note danger %}
非正常的 sources
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_80cblMbRmm.png)
{% endnote %}

<!-- more -->

## 添加项目到 chrome 的 worksapce

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_NTQxDxR6ML.png)

## webpack 开启 sourcemap

```js
module: {
  rules: [
    {
      test: /\.scss/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            modules: {
              mode: 'local',
              localIdentName: '[local]__[hash:base64:5]',
            },
            sourceMap: true,
            importLoaders: 1,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    },
  ]
}
```

## css-loaderV3.2.0 修改方法 1

修改`node_modules\css-loader\dist\index.js`
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_1YmBMjGbTe.png)

```js
if (result.map) {
  const map = JSON.parse(result.map)
  map.sources = map.sources.map((src) => {
    if (/[A-Z|a-z]:.+/.test(src)) {
      return 'file:///' + src.replace(/\\/g, '/')
    }
    return src
  })
  result.map = JSON.stringify(map)
}
```

## css-loaderV3.2.0 修改方法 2

修改的位置
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_89CX8KruFG.png)

```js
if (result.map) {
  const map = JSON.parse(result.map)

  map.sources = map.sources.map((src) => {
    return src.replace(/\\/g, '/')
  })
  result.map = JSON.stringify(map)
}
```

修改后的效果
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_hHkpcV8Ytk.png)

## css-loaderV2.1.1 修改方法

修改`node_modules\css-loader\dist\index.js`

修改这段代码

```js
const moduleCode = `// Module\nexports.push([module.id, ${cssAsString}, ""${result.map ? `,${result.map}`
```

改成

```js
let map = null
if (result.map) {
  map = JSON.parse(result.map)
  map.sources = map.sources.map((src) => {
    if (/[A-Z|a-z]:.+/.test(src)) {
      return 'file:///' + src.replace(/\\/g, '/')
    }
    return src
  })
}
const moduleCode = `// Module\nexports.push([module.id, ${cssAsString}, ""${
  result.map ? `,${JSON.stringify(map)}` : ''
}]);\n\n`
```

## 效果

成功后有**绿点**，`ctrl + 鼠标左键`点击样式可以直接跳到 source 界面，定位到样式具体位置，效率暴涨，降低猝死概率
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/T0Qwbgr8P0.png)

快速定位 css 位置并修改
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/PTca7bJX4a.gif)

## 扩展：支持 css 在线修改

{% note info %}
`css-loaderV3.2.0`适用，使用 css-loaderV3.2.0 修改方法 2
{% endnote %}

诀窍在`wepback`配置中，`css文件`也使用`sass-loader`，`sass-loader`会把文件`sourcemap`配置的完善

```js
{
  // scss和css
  test: /\.(scss|css)/,
  use: [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        importLoaders: 1,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
      },
    },
  ],
},
```

修改成功
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_Fe1I6AV9tL.png)
