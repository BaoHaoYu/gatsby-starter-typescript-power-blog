---
title: vscode扩展开发(一)：HelloWorld
date: 2019-10-30 19:27:00
tags:
  - vscode
type: categories
categories:
  - 编程
  - vscode
---

`vscode`扩展开发，基于`nodejs` + `typescript`，[参考项目 vscode-align-by-regex](https://github.com/janjoerke/vscode-align-by-regex)

<!-- more -->

## Hello world 组件

### 初始化组件

```bash
npm install -g yo generator-code
```

```bash
yo code
```

基本信息
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/4GQq4uixVx.png)

填写信息完毕后自动创建文件夹和文件
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/cmd_OHVRI1y2s6.png)

### 启动

按 F5 会打开新的窗口，里面会有组件添加的东西，如 hello world 命令
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_YFvPF8ZXWW.png)
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_JLGYBc93FL.png)

### 调试组件

加入断点即可，其他都是默认配置好的了
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_eQU9SR4IhA.png)

## 命令修改

修改最频繁的是 contributes
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_KkW71Hj1Zf.png)

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_dF6vmAoeRm.png)

## 注意

{% note info %}
`package`设置'resource'字段否则插件调试运行十分的慢
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_uPI1tTL7Wd.png)
{% endnote %}

## 参考

- [api](https://code.visualstudio.com/api)
