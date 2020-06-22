---
title: docker(一)：通过安装包在window下配置docker
date: 2020-03-05 10:29:00
tags:
  - docker
type: 'categories'
categories:
  - 编程
  - docker
---

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_ZXJkgjDxjP.png)

<!-- more -->

- [docker(一)：入门](</docker/docker(一)：入门/>)
- [docker(二)：linux 下配置 docker](</docker/docker(三)：管理nodejs项目/>)
- [docker(三)：管理 nodejs 项目](</docker/docker(三)：管理nodejs项目/>)

[csdn 参考 1](https://blog.csdn.net/q610376681/article/details/90483576#1.1%20docker%E7%9A%84%E5%8F%91%E5%B1%95%E5%8F%B2)

[官方 参考 2](https://docs.docker.com/install/linux/docker-ce/centos/#install-using-the-repository)

## 基本概念

### 镜像

可以共享！

### 容器

像简化版虚拟机

### 仓库

放镜像的地方，类似于`npm`，`pypi`，建议使用国内仓库

## win10

win10 版 下载地址[docker-ce-desktop-windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows/)，大概 900 多 MB

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_Xgaq6Atyma.png)

下载好的文件

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/explorer_8MxIB8PS7V.png)

## win7

### 下载

[toolbox_install_windows](https://docs.docker.com/toolbox/toolbox_install_windows/)

[阿里云下载地址](http://mirrors.aliyun.com/docker-toolbox/windows/docker-toolbox/?spm=5176.8351553.0.0.4bc61991tQpsnV)

下载好的文件

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/explorer_WixDGvJmR3.png)

安装完毕后多出的三个程序

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/explorer_qSOndADRAU.png)

点击`Docker Quickstart Terminal`出现

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_WfwmUDCoVZ.png)

确保快捷方式对应正确

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/explorer_A9ZnJ2pP47.png)

### 启动

点击`Docker Quickstart Terminal`，从 GitHub 下载十分的慢

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/bash_iJnkRWDDYv.png)

### 从 offcloud 下载 boot2docker.iso

建议使用[offcloud](https://www.offcloud.com/)，输入地址
`https://github.com/boot2docker/boot2docker/releases/download/v19.03.5/boot2docker.iso`

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_aAQ626dMfG.png)

放到`C:\Users\用户名\.docker\machine\cache`中然后**断网**

### 默认的虚拟机

default

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/VirtualBox_JmVNbpnIfR.png)

打开后输入`docker version`，可以看出`docker`已经安装到虚拟机中了

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/VirtualBox_iYShwCyPjc.png)
