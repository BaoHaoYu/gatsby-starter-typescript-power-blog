---
title: vscode同步设置
date: 2019-10-14 09:27:00
tags:
  - vscode
type: categories
categories:
  - 编程
  - vscode
---

## 前言

`Settings Sync`可以通过`GitHub`让 vscode 设置，插件，代码块在两台电脑之间同步，首先必须要有`GitHub`账号

<!-- more -->

## 下载 Settings Sync

找到插件`Settings Sync`  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_JfvSkqoD2F.png)

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_awNx3C2lFW.png)

## 快捷键上传下载

- 上传设置 : `Shift + Alt + U`
- 下载设置 : `Shift + Alt + D`

上传完毕会生成一个 Gist，请**记录好 Gist**  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_cPsUuJOWZ3.png)

这个设置会在用户的配置里面`setting.json`

## 上传日志

使用`Shift + Alt + U`上传后打印的 OUTPUT 日志，记录的插件详情

```log
CODE SETTINGS SYNC UPLOAD SUMMARY
Version: 3.4.3
--------------------
GitHub Token: 4549**********
GitHub Gist: 74d1aa803de3b3
GitHub Gist Type: Secret

Restarting Visual Studio Code may be required to apply color and file icon theme.
--------------------
Files Uploaded:
  extensions.json > extensions.json
  settings.json > settings.json
  typescript.code-snippets > snippets\typescript.code-snippets
  typescript.json > snippets\typescript.json
  typescriptreact.code-snippets > snippets\typescriptreact.code-snippets
  typescriptreact.json > snippets\typescriptreact.json

Extensions Ignored:
  No extensions ignored.

Extensions Removed:
  No extensions removed.

Extensions Added:
  autodocstring v0.3.0
  bracket-pair-colorizer v1.0.61
  code-settings-sync v3.4.3
  csharp v1.21.4
  easy-snippet-maker v0.0.6
  gc-excelviewer v2.1.32
  githistory v0.4.6
  gitlens v10.1.1
  language-stylus v1.11.0
  markdown-all-in-one v2.5.1
  markdown-image-paste v1.3.2
  markdown-preview-github-styles v0.1.6
  material-icon-theme v3.9.1
  prettier-vscode v2.3.0
  python v2019.10.41019
  sort-lines v1.8.0
  stylelint v0.51.0
  swig v0.0.5
  vscode-icons v9.4.0
  vscode-markdownlint v0.31.0
  vscode-npm-dependency v1.2.2
  vscode-npm-script v0.3.9
  vscode-theme-onedark v2.1.0
  vscode-typescript-tslint-plugin v1.2.2
--------------------
Done.
```

## 其他设备同步

在用户的配置里面添加**记录下来的 Gist**

```json
"sync.gist": ""
```
