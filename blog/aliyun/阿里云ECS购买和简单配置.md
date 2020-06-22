---
title: 阿里云ECS购买和简单配置
date: 2019-09-30 14:48:00
tags:
  - 编程
  - 云服务
type: 'categories'
categories:
  - 编程
  - aliyun
---

## 官网

进入 [官网](https://cn.aliyun.com/) 进入购买界面  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_BhUaljCl28.png)

<!--more-->

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_n4oAxCorWy.png)

## 个人研究可以选个乞丐版的

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_vqK71ibAia.png)

镜像看个人熟悉那个系统  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_O0YqRBipMl.png)

## 配置安全组

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_wxfFE3vn5k.png)

本人小小博客，就不用流量了  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_LIALp4kfGc.png)

按流量计费 0.800 /GB，非常贵，电信日租卡 1 元 800MB，堪比 4G 流量费  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_viQyyGdKVU.png)

可以先开启 80 端口  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_sICIwnXvT5.png)

## 系统配置

设置好系统登录密码
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_I74C3HxqkK.png)

## 分组设置

全使用默认的即可  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_UTe3jl5oEp.png)

## 确认下单

最后核对一下信息，没错就下单了  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_7uWj5PJ0U0.png)

## 核心信息

公网 Ip 地址，到期时间  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_Wf6h9L6qHs.png)

## 阿里云需要注意的地方

### 防火墙和端口

阿里云服务器防火墙服务是默认关闭的
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Xshell_Ob6fpxtmbB.png)

其使用[ECS 控制台](https://ecs.console.aliyun.com)的安全组来控制端口连接
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_n2bxSuKGr3.png)

#### 添加端口

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_sIxmyJS2jR.png)

以添加 3306mysql 连接端口为例子，填写好关键的，其他使用默认的
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_ZRdCBlF8CT.png)

#### 安全组适应的实例

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_QEhfOJaIr0.png)
