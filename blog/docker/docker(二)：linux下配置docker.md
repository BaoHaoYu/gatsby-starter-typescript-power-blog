---
title: docker(二)：linux下配置docker
date: 2020-03-05 18:00:00
tags:
  - docker
type: 'categories'
categories:
  - 编程
  - docker
---

- [docker(一)：入门](</docker/docker(一)：入门/>)
- [docker(二)：linux 下配置 docker](</docker/docker(三)：管理nodejs项目/>)
- [docker(三)：管理 nodejs 项目](</docker/docker(三)：管理nodejs项目/>)

<!-- more -->

## linux 下安装

### 检测内核是否符合安装要求

必须高于`3.10`  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Xshell_HiGrnpNhV4.png)

```bash
uname -r
```

### 卸载原来安装的 docker

```bash
yum list installed | grep docker # 列出你安装过的包
containerd.io.x86_64                 1.2.13-3.1.el7                 @docker-ce-stable
docker-ce.x86_64                     3:19.03.7-3.el7                @docker-ce-stable
docker-ce-cli.x86_64                 1:19.03.7-3.el7                @docker-ce-stable

yum -y remove docker-ce.x86_64 docker-ce-cli.x86_64 containerd.io.x86_64 # 删除安装包
rm -rf /var/lib/docker # 删除镜像/容器等
```

### 安装依赖

```bash
yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2
```

### 设置仓库

```bash
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

### 安装 docker

```bash
yum install docker-ce docker-ce-cli containerd.io -y # 安装
systemctl enable docker # 开机启动
```

### 启动

```bash
service docker start
```

### 设置 docker 仓库

```bash
vi /etc/docker/daemon.json
```

```json
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}
```

## 运行 hello-world

```bash
docker run hello-world
```

阿里云的服务器结果内存不足
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Xshell_KLHEI8RQUh.png)

使用本地的虚拟机才成功
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Xshell_usLhIkKGKW.png)
