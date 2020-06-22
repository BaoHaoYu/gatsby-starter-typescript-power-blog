---
title: 暗黑地牢mod制作
date: 2019-10-31 21:20:00
tags:
  - game
type: 'categories'
categories:
  - 其他
  - game
---

## 前言

以最简单的汉化 mod 为例子，之前电脑拿去修理，资料都丢失了，搞得我现在重新要重新学一遍，最好的文本编辑工具当然是 vscode 拉，notepad++太丑

<!-- more -->

## 找到官方教程

官方教程名字是：Darkest Dungeon - Modding Guide [Official]，英文能力好的话制作一个全新英雄不在话下
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Steam_p7XsAFvgie.png)

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Steam_cQ3ief8b2i.png)

## 主要工具

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/KuXf5E4QgH.png)

## 创建 mod 项目

生成项目 xml，改名为 project.xml
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/explorer_46OFNseG3w.png)

project.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<project>
	<!-- mod预览图标 -->
	<PreviewIconFile>preview_icon.png</PreviewIconFile>
	<ItemDescriptionShort/>
	<!-- mod文件地址 -->
	<ModDataPath>E:/Steam_work/demo/</ModDataPath>
	<!-- mod标题 -->
	<Title>Demo Test Mod</Title>
	<Language>english</Language>
	<UpdateDetails/>
	<!-- 是否公开mod -->
	<Visibility>private</Visibility>
	<UploadMode>direct_upload</UploadMode>
	<VersionMajor>0</VersionMajor>
	<VersionMinor>0</VersionMinor>
	<TargetBuild>0</TargetBuild>
	<!-- mod标签,方便别人搜索 -->
	<Tags>
		<Tags>Localization</Tags>
		<Tags>Chinese</Tags>
	</Tags>
	<!-- mod描述 -->
	<ItemDescription>Demo Test</ItemDescription>
</project>
```

preview_icon.png
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/darkest_dungeon_preview_icon.png)

## 找到汉化的 mod

如女伯爵文本内容在`Steam\steamapps\workshop\content\262060\1744414212\localization`
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/explorer_PAk40PCmSU.png)

拷贝到自己项目的 localization 文件目录下
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_qVhJS1dhy1.png)

## 汉化 xml

保留 english，汉化 schinese，其他语言全删除
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_tV4FVMWS0c.png)

拖动 xml 到 localition
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/explorer_5r9Z4TTY68.png)

生成汉化文件完毕
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/explorer_l7J6RHTGeZ.png)

## 上传到 steam

拖动
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/explorer_t7A3BTNtdJ.png)

成功后会在自己发布的 mod 列表中出现
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Steam_f6oZHJvAf2.png)
