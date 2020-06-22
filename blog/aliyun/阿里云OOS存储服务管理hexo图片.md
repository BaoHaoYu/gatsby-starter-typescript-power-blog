---
title: 阿里云OOS存储服务管理hexo图片
date: 2019-09-29 17:08:00
tags:
  - 编程
  - 云服务
type: 'categories'
categories:
  - 编程
  - aliyun
---

## 前言

hexo 博客最烦人就是图片管理，我只想要**如下两步**完成图片插入，这种功能在论坛和博客功能十分常见

- 快捷键截图
- `ctrl+v`

在找到解决方案之前甚至想换`wordpress`搭建，放弃 markdown 编辑器，使用普通的论坛式编辑器，后来发现了阿里云 OOS 可以使用 SDK 深度开发

<!--more-->

## 准备工具

- ShareX 截图工具，[git 地址](https://github.com/ShareX/ShareX)，本人对 ShareX 的介绍[地址](/2019/09/29/software/ShareX%E6%88%AA%E5%9B%BE%E8%BD%AF%E4%BB%B6/)
- 搭建好 node 和 git 的 linux 服务器

## 阿里云 oos 配置

### 何为阿里云 OOS

[官方地址](https://oss.console.aliyun.com/overview)

> 官方介绍

海量、安全、低成本、高可靠的云存储服务，提供 99.9999999999%的数据可靠性。使用 RESTful API 可以在互联网任何位置存储和访问，容量和处理能力弹性扩展，多种存储类型供选择全面优化存储成本。

> OOS 优点

- 通样流量空间远比 ECS 云服务器低
- 可通过 SDK 深度开发，支持 Java，C#,Nodejs 等多门语言
- BAT 大厂保证，不会随便倒闭

> OOS 缺点

- 只能用于存储
- 复杂的计费方式，[计费详情](https://www.aliyun.com/price/product#/oss/detail)
- 目录无法重命名
- 文件只能按文件名排序

### 购买 oos

[oos 地址](https://www.aliyun.com/product/oss/)
购买标准版
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_SGphlB0Tpc.png)

选好配置
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_suerNcgfSN.png)

### 添加 bucket

[OOS 控制台地址](https://oss.console.aliyun.com/overview)
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_W0Vhq22vcK.png)

可以手动添加目录，上传图片
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_CFnEZC48PZ.png)

### 配置 Access key

进入 Access key 配置界面
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_vOVtY39Be9.png)

创建子用户 AccessKey
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_Pns7rwpbPA.png)

点击选择 OOS 权限，这样 AccessKey 只能控制 OOS
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_MKiSsC6c5c.png)

请记录着两个重要信息，accessKeyId，accessKeySecret，之后会用到
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_kX3Qay4op1.png)

## 选择一个自己熟悉语言的 SDK

### SDK 列表

[OOS 开发文档链接](https://help.aliyun.com/document_detail/52830.html)，本人试用的是 nodejs，如果懒得研究 SDK，就用本人的 nodjs 项目吧
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_iEwZcqymA4.png)

### 通过我的 nodejs 项目上传到 OOS

#### 克隆项目

如果自己不想开发服务端的话，安装我的项目，本人项目自带 png 压缩，linux 下按顺序执行如下命令

```bash
git clone https://github.com/BaoHaoYu/oos_blog_server.git
cd oos_blog_server
yarn
```

#### 配置 config.ts

`accessKeyId`和`accessKeySecret`刚刚已经通过获得

```ts
export default {
  // 端口
  port: '9000',
  // blog静态目录
  blogPublic: '/opt/www/hexo-blog/public',
  // 域名
  region: '',
  // 阿里云accessKeyId
  accessKeyId: '',
  // 阿里云accessKeySecret
  accessKeySecret: '',
}
```

域名参数的位置
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_qtiqWEFZDi.png)

blogPublic 为`hexo generate`生成静态文件的位置

#### 通过 pm2 运行项目

```bash
pm2 start pm2.json
```

## 配置 ShareX 上传

> 如下都是以是我的项目[oos_blog_serve](https://github.com/BaoHaoYu/oos_blog_server)为标准

### 设置截完图立马上传

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/DAiDHDHmy3.png)

### 配置上传目标

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/ShareX_xSFUobWtmX.png)

### 填写关键信息

第 5 点是上传路径，在`src\routes\index.ts`中修改，遮挡的部分是服务器 IP 或者域名
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/ShareX_LW6lgxa8Gq.png)

如下是本人项目设置的参数
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/ShareX_K1nNAArHrf.png)

### 配置信息解析

因为我上传成功后返回的是 url 链接文本，所以都选`$response$`
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/ShareX_IIo5orxCvV.png)

可以直接生成 markdown 路径，不用敲“`![]()`”这些字符了
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/ShareX_2BlSrD1PRx.png)

### 配置完毕测试

点击测试
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/ShareX_MVCwu9ebpq.png)

测试成功会返回 url 地址
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_AaKNngag9E.png)

远程 OOS 目录可以看见测试的图片
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_eQZ8O2bUV4.png)

### 勾选好上传目标

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/ShareX_DQotj9V2LC.png)

## 完成

现在可以愉快的截图，本篇博客图片全部都是通过自动上传到 oos
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_EBAjG3ytJI.png)

如下截图都是自动上传，效率暴涨
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_bUFIT08OCr.png)

## 其他方案

1.[七牛云](https://www.qiniu.com/)，0-10G 免费
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_dYhGWv9ueN.png)

2.Window 下的[MPIC](http://mpic.lzhaofu.cn/)图片上传工具，界面有点简陋，单人开发的工具
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_3HfghyHcuZ.png)

3.Mac 下的[iPic](https://apps.apple.com/cn/app/ipic-tu-chuang-shen-qi/id1101244278?ign-mpt=uo%3D4&mt=12)图片上传工具
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_Le8E2OpHGr.png)

4.[sm.ms](https://sm.ms/)图床，v2ex 一个用户开发的
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_a4N5k9nIPp.png)

5.微博图床
