---
title: vscode调试typescript
date: 2019-10-25 09:23:00
tags:
  - typescript
  - vscode
type: categories
categories:
  - 编程
  - vscode
---

## 前言

vscode 直接调试 typescript，不用把 typescript 编译成 js

<!-- more -->

## 大概目录结构

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_CcWaBiqxJa.png)

## 运行配置

`.vscode\launch.json`

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Current TS File",
      "type": "node",
      "request": "launch",
      "args": ["${relativeFile}"],
      "runtimeArgs": ["--nolazy", "-r", "ts-node/register"],
      "sourceMaps": true,
      "cwd": "${workspaceRoot}",
      "protocol": "inspector"
    }
  ]
}
```

## ts 配置文件

`tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "outDir": "out",
    "rootDir": "src",
    "sourceMap": true
  },
  "include": ["src"]
}
```

## 效果

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_UltXSgNy1r.png)
