---
title: hexo-next添加gitalk评论系统
date: 2019-10-25 10:25:00
tags:
  - hexo
type: 'categories'
categories:
  - 编程
  - hexo
---

## 前言

gitalk 是一个高质量，不会被墙，基于 github 的 issue 的评论系统，[官方地址](https://github.com/gitalk/gitalk)

<!-- more -->

## 创建一个程序

[地址](https://github.com/settings/applications/new)

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_e2ebLWrY7h.png)

## 获得 Client ID 和 Client Secret

1.Client ID
2.Client Secret

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_P7biBG5dvs.png)

## 配置\_config.yml

{% note info %}

repo 必须是公有仓库，私有的是会导致 404
gitalk 仓库并没有强制要和博客仓库相同，所以创建一个新的仓库存储 gitalk

{% endnote %}

打开 next 主题的`_config.yml`，找到`gitalk`字段，修改成如下样子

```yml
gitalk:
  enable: true # 是否开启
  github_id: BaoHaoYu # 拥有者
  repo: hexo-blog-gitalk # 公有的仓库名称
  client_id: # 获得的Client ID
  client_secret: # 获得的Client Secret
  admin_user: BaoHaoYu # 管理者
  distraction_free_mode: true
  language:
```

## 未找到相关的 Issues 进行评论

那是因为需要手动创建，点击登录有即可
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_By7Go8XCNA.png)

进入其他博客地址的时候，会自动创建评论
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_idq1Ab3hXV.png)

## 测试

试着发表一条评论
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_FUlGIdKBiG.png)

在仓库的 issue 就可以发现了
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_Nk3XYF2vPU.png)
