---
title: ps新人技巧
date: 2019-10-13 16:47:48
tags:
  - 软件
  - 效率
  - photoshop
type: categories
categories:
  - 软件
  - photoshop
---

## 文件无法拖动到 ps

打开注册表`win + r`输入`regedit`

在顶部输入如下内容

```log
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System
```

<!--more-->

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/regedit_FxWga2bhQ6.png)

修改`EnableLUA`的值为 0，然后**重启电脑**
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/regedit_nmd1JAvmSK.png)

## 让图片保存为 png

## 切片

## 批量处理

## 常用快捷键

| 快捷键             | 说明                                         |
| ------------------ | -------------------------------------------- |
| `ctrl + r`         | 打开基线                                     |
| `ctrl + j`         | 以选区建立新图层                             |
| `ctrl + shifl + j` | 以选区建立新图层，并删除原来的图层的选区部分 |
| `ctrl + alt + c`   | 改变画布大小                                 |
| `ctrl + i + r`     | 去掉图像空白                                 |
| `ctrl + shift + e` | 合并可见图层                                 |
