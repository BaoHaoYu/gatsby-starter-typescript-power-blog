---
title: chrome插件开发(一)：基础入门
date: 2019-11-06 15:48:00
tags:
  - chrome
  - nodejs
type: categories
categories:
  - 编程
  - chrome
---

推销使用`typescript` + `gulp`开发，好处如下

安装`@types/chrome`可以提供完善的智能提示和 API 预览，也许想要进一步扩展可以加入`react`，`sass`，只要使用`nodejs`工程化，一切都变得十分美好

![智能提示](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_Ako9Q6BZrP.png)

<!-- more -->

![API预览](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_cW45boUm15.png)

2.使用`async`和`await`解决回调问题

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_IFZiYoW6Gu.png)

---

[本文项目地址](https://github.com/BaoHaoYu/chrome-typescript-extension)

## manifest.json

`manifest.json`是扩展核心配置文件

```json
{
  // 必须：就是2
  "manifest_version": 2,
  // 必须：扩展名称
  "name": "Hello World!",
  // 必须：描述
  "description": "测试用的",
  // 必须：版本
  "version": "0.1",
  // 权限
  "permissions": [
    // 浏览器数据
    "browsingData",
    // 下载权限
    "downloads",
    // 网络请求权限
    "webRequest",
    // 可对所有地址进行跨域请求
    "http://*/*",
    "https://*/*",
    // 标签权限
    "tabs"
  ],
  "browser_action": {
    // 必须：图标
    "default_icon": "img/icon_pocket_monster_1011.png",
    // 鼠标放上去显示的标题
    "default_title": "default_title = DDDD",
    // 鼠标弹出的内容，禁用行内js代码
    "default_popup": "./view/pop.html"
  },
  "background": {
    // 必须：扩展后台程序，谷歌浏览器打开之后会一直运行，可以使用谷歌扩展的所有API
    "scripts": ["./out/background.js"]
  },
  // 需要直接注入页面的JS
  "content_scripts": [
    {
      // "matches": ["<all_urls>"] 表示匹配所有地址
      // 匹配要注入js的地址，所有地址： ["<all_urls>"]
      "matches": ["https://www.baidu.com"],
      // 按顺序注入多个js
      "js": ["lib/jquery", "out/content-script-demo.js"],
      // 注入css文件
      "css": ["css/custom.css"],
      // 代码注入的时间
      // "document_start", "document_end", or "document_idle"
      // 默认"document_idle"，表示页面空闲时注入
      "run_at": "document_start"
    }
  ]
}
```

## 载入扩展

创建好`background.js`和`pop.html`进入`chrome://extensions/`

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_Jr5qeUHsFA.png)

本文项目扩展所在的目录

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_Ukq4jDdphr.png)

鼠标放上去效果

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_pDyxk8X5DJ.png)

点击弹窗内容

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_at3OhtCiyo.png)

扩展程序页可以看见扩展的名字，版本，描述，ID
 
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_WaSGHa9In5.png)

## 通信

感觉有点像安卓的广播

### content_scripts

接收信息(常用)

```js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request == 'msg from background') {
    sendResponse('msg from content_scripts')
  }
})
```

---

发送信息(常用)

```js
chrome.runtime.sendMessage('msg from content_scripts', function(response) {
  console.log(response)
})
```

### background.js

接收信息(常用)

```js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request == msgObj.DEMO1) {
    chrome.tabs.create({ index: 0 }, () => {})
  }
})
```

### pop.js

接收信息

```js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // code
})
```

---

发送信息(常用)

```js
// 给当前激活的窗口发送信息
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, 'msg from pop.js', () => {})
})
```

## 遇见的错误

```log
Unchecked runtime.lastError: The message port closed before a response was received.
```

原因：`sendMessage`发送的消息无任何接收者

---

```log
GET chrome-extension://invalid/ net::ERR_FAILED
```

原因：`manifest.json`没有添加`web_accessible_resources`字段，或者`web_accessible_resources`没有添加可以访问的资源

解决：`manifest.json`添加`web_accessible_resources`可访问资源

```json
{
  ...
  "web_accessible_resources": ["img/*.png"]
  ...
}
```

---

```log
Refused to execute inline script because it violates the following Content Security Policy directive: "script-src 'self' blob: filesystem:". Either the 'unsafe-inline' keyword
```

原因：html 页面的`script`标签嵌入了 js 代码。

解决：js 代码放到 js 文件中

```html
<!-- 错误 -->
<script>
  console.log('dddddddddd')
</script>

<!-- 正确 -->
<script src="..."></script>
```

## 更多参考

- [【干货】Chrome 插件(扩展)开发全攻略](http://blog.haoji.me/chrome-plugin-develop.html)
