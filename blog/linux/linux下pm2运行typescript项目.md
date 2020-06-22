---
title: linux下pm2运行typescript项目
date: 2019-10-09 14:48:01
tags:
  - 编程
  - linux
  - nodejs
  - pm2
  - typescript
type: 'categories'
categories:
  - 编程
  - nodejs
---

## 克隆项目

```bash
git clone https://github.com/BaoHaoYu/pm2-typescript-demo.git
```

<!-- more -->

## 运行项目文件

```bash
pm2 start pm2.json
```

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Xshell_ItrwtP1Zwf.png)

## pm2.json

这个是关键文件

```json
{
  "apps": [
    {
      "name": "demo",
      "script": "./node_modules/.bin/ts-node",
      "args": "bin/www.ts"
    }
  ]
}
```
