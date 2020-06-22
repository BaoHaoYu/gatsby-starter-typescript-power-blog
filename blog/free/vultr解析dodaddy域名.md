---
title: vultr解析dodaddy域名
date: 2020-03-10 18:00
tags:
  - 自由
type: categories
categories:
  - 其他
  - 自由
---

不用备案，不用实名制，支持支付宝

<!-- more -->

## 前期准备

- 注册 godaddy
- 注册 vultr 账号
- 购买 vultr 服务器

godaddy 地址：[https://www.godaddy.com/](https://www.godaddy.com/)
vultr 地址：[https://vultr.com/](https://vultr.com/)

## godaddy 域名购买

搜索域名
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_bAsbJqwKO1.png)

挑个自己喜欢的，不要`cn`结尾的，因为`cn`结尾的域名要提供证件信息
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_TE2jFIcXOM.png)

不要太贵，有的第一年很便宜，但是续费十分的贵，如下第一年 23 元，之后续费 335 元
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_MfnMTi302B.png)

然后就是进入购物车了，就行淘宝买东西一样
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_a5CwDtt3AX.png)

## 配置 DNS 服务器

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_TJJXm5H2NL.png)

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_XuuFDVQi7T.png)

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_BRED1IPFS4.png)

改成如下两个`ns1.vultr.com`和`ns2.vultr.com`
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_fXDQiuQl1V.png)

## vultr 配置域名解析

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_mnaJ0H44Pv.png)

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_VNrDSLLy5G.png)

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_li5qiUygYs.png)

完成后
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_E3VToav2uX.png)
