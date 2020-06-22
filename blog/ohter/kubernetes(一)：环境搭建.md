---
title: kubernetes(一)：环境搭建
date: 2020-03-09 10:29:00
tags:
  - kubernetes
type: 'categories'
categories:
  - 编程
  - 容器
---

一波三折的谷歌源

<!-- more -->

## 安装 kubectl

使用 google 源

```sh
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://packages.cloud.google.com/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://packages.cloud.google.com/yum/doc/yum-key.gpg https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
EOF
```

如果 google 源被屏蔽，使用淘宝源

```sh
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
```

安装

```sh
yum install -y kubectl
```

成功  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Xshell_hUuGNjy55g.png)

## 配置 kubectl

通过`help`命令可以大概知道`kubectl`要做什么

```bash
kubectl --help
```

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Xshell_DG9AErQKsi.png)

## 安装 minikube

`minikube`是`Kubernets`的一种部署方式

[官方教程](https://minikube.sigs.k8s.io/docs/start/)

### window 裸机版

选择 window 版的一键安装
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_rdOb0Yj1ft.png)

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/minikube-installer_IVNukSHlx8.png)

通过 cmd 进入安装目录，运行`minikube`
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/cmd_AHwe6cHRxB.png)

通过`minikube start`运行，会自动下载虚拟机
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/cmd_SEp0qQXBVw.png)

`k8s.gcr.io`被墙

```log
! 虚拟机无权访问 k8s.gcr.io，或许您需要配置代理或者设置 --image-repository
```

运行时候加入`--image-repository`

```bash
minikube start --image-repository='mirrorgooglecontainers'
```

但是依旧提示`虚拟机无权访问 k8s.gcr.io`

### linux 下安装

如果是虚拟机安装需要提前检测，"no"说明不可以安装，因为虚拟机里面不可以再虚拟化了

```bash
egrep -q 'vmx|svm' /proc/cpuinfo && echo yes || echo no
```

官方的命令是从`google`中下载

```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 \
   && sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

国内要使用阿里云的

```bash
curl -Lo minikube http://kubernetes.oss-cn-hangzhou.aliyuncs.com/minikube/releases/v1.2.0/minikube-linux-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/
```

执行`minikube`可以看出有啥命令
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Xshell_JcS02T4f9W.png)

运行

```bash
minikube start --registry-mirror=https://registry.docker-cn.com
```

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Xshell_2OZuDrjGEN.png)

## 检测是否可用

```bash
kubectl run hello-minikube --image=k8s.gcr.io/echoserver:1.4 --port=8080
kubectl get pod
```

```log
[root@localhost ~]# kubectl run hello-minikube --image=k8s.gcr.io/echoserver:1.4 --port=8080
kubectl run --generator=deployment/apps.v1 is DEPRECATED and will be removed in a future version. Use kubectl run --generator=run-pod/v1 or kubectl create instead.
deployment.apps/hello-minikube created
[root@localhost ~]# kubectl get pod
NAME                             READY   STATUS              RESTARTS   AGE
hello-minikube-64c7df9db-tshnm   0/1     ContainerCreating   0          16s
```
