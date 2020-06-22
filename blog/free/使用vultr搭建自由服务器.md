---
title: 使用vultr搭建自由服务器
date: 2019-11-15 18:11
tags:
  - 自由
type: categories
categories:
  - 其他
  - 自由
---

若为自由故，两者皆可抛

<!-- more -->

`shadowsocks`被重点关照，是时候寻找另外一个替代品了
[shadowsocks 地址](https://github.com/shadowsocks)

## 购买 vultr 服务器

### 注册 vultr 账号

[地址](https://www.vultr.com/)

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_gwAIwp1bAa.png)

### ping 测试延迟和丢包率

新建一个 bat 格式文件，复制如下内容到该文件，然后双击运行，不同的网络运营商可能会有不同的区别

```bash
@echo off
echo =========================================
echo From Local to Vultr 15 DCs Ping Test.beta
echo =========================================
pause
echo=
echo 01 Tokyo
ping hnd-jp-ping.vultr.com -n 10
echo=
echo =============================
echo 02 Singapore
ping sgp-ping.vultr.com -n 10
echo=
echo =============================
echo 03 Amsterdam
ping ams-nl-ping.vultr.com -n 10
echo=
echo =============================
echo 04 Paris
ping par-fr-ping.vultr.com -n 10
echo=
echo =============================
echo 05 Frankfurt
ping fra-de-ping.vultr.com -n 10
echo=
echo =============================
echo 06 London
ping lon-gb-ping.vultr.com -n 10
echo=
echo =============================
echo 07 New York
ping nj-us-ping.vultr.com -n 10
echo=
echo =============================
echo 08 Chicago
ping il-us-ping.vultr.com -n 10
echo=
echo =============================
echo 09 Dallas
ping tx-us-ping.vultr.com -n 10
echo=
echo =============================
echo 10 Atlanta
ping ga-us-ping.vultr.com -n 10
echo=
echo =============================
echo 11 Los Angeles
ping lax-ca-us-ping.vultr.com -n 10
echo=
echo =============================
echo 12 Miami
ping fl-us-ping.vultr.com -n 10
echo=
echo =============================
echo 13 Seattle
ping wa-us-ping.vultr.com -n 10
echo=
echo =============================
echo 14 Silicon Valley
ping sjo-ca-us-ping.vultr.com -n 10
echo=
echo =============================
echo 15 Sydney
ping syd-au-ping.vultr.com -n 10
echo=
pause
```

### 充值

可以使用支付宝

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_JwxYPTHsjO.png)

### 挑选服务器

选好低 ping 和低丢包率的服务器，开通费 0.01 美金

[地址](https://my.vultr.com/deploy/)

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_lRRtLRhs4p.png)

1.服务器类型
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_rOkdPt1NL2.png)

2.服务器所在地，根据 ping 测试结果挑选
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_4w0AM9cbSD.png)

3.服务器操作系统，不要选 CentOS8，选 CentOS 7
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_NUDji2TbxE.png)

4.服务器配置，乞丐版即可
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_v4w4xfc23q.png)

5.选完确定
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_hajYv2EBUu.png)

6.等待安装完毕
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_2YsiQRfWUJ.png)

### ping 服务器 IP

如果 ping 不通，则重新挑选服务器，直到挑到 ping 的通的服务器为止，每次重开服务器都要花 0.01 美金

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_Os4UJlfdUh.png)

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/v5efU1f7pO.png)

## 通过 xshell 连接服务器

先在网上下载 xshell 软件

填写服务器 IP
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/XshellCore_qCG3b5Kw6l.png)

填写密码
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_MZOgyPXNfI.png)

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/XshellCore_yATQXX6vKJ.png)

完成连接
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/XshellCore_pr95mkqX1D.png)

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Xshell_Yv53F9WN13.png)

## 一键安装 shadowsocksR

### 通过命令安装

```shell
# 第一步
wget --no-check-certificate -O shadowsocksR.sh https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocksR.sh

# 第二步
chmod +x shadowsocksR.sh

# 第三步
./shadowsocksR.sh 2>&1 | tee shadowsocksR.log
```

{% note info %}
如果出现`no acceptable C compiler found in \$PATH`则执行`yum install gcc`
{% endnote %}

> 以上脚本来源于秋水逸冰

### 填写关键信息

执行`./shadowsocksR.sh 2>&1 | tee shadowsocksR.log`后会出现如下信息

```shell
# 密码
Please enter password for ShadowsocksR:
(Default password: teddysun.com):

# 端口
Please enter a port for ShadowsocksR [1-65535]
(Default port: 13889):11111

# 加密方式
Please select stream cipher for ShadowsocksR:
1) none
2) aes-256-cfb
3) aes-192-cfb
4) aes-128-cfb
5) aes-256-cfb8
6) aes-192-cfb8
7) aes-128-cfb8
8) aes-256-ctr
9) aes-192-ctr
10) aes-128-ctr
11) chacha20-ietf
12) chacha20
13) salsa20
14) xchacha20
15) xsalsa20
16) rc4-md5
Which cipher you d select(Default: aes-256-cfb):12

# 协议
Please select protocol for ShadowsocksR:
1) origin
2) verify_deflate
3) auth_sha1_v4
4) auth_sha1_v4_compatible
5) auth_aes128_md5
6) auth_aes128_sha1
7) auth_chain_a
8) auth_chain_b
9) auth_chain_c
10) auth_chain_d
11) auth_chain_e
12) auth_chain_f
Which protocol you d select(Default: origin):1

# 混淆
Please select obfs for ShadowsocksR:
1) plain
2) http_simple
3) http_simple_compatible
4) http_post
5) http_post_compatible
6) tls1.2_ticket_auth
7) tls1.2_ticket_auth_compatible
8) tls1.2_ticket_fastauth
9) tls1.2_ticket_fastauth_compatible
Which obfs you d select(Default: plain):1
```

### 记录关键信息

`shadowsocks-windows`会用到
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Xshell_6IbPe2yl4g.png)

### shadowsocks 配置文件位置

```shell
vi /etc/shadowsocks.json
```

`shadowsocks.json`内容大概如下
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Xshell_Jyxc59bM0o.png)

{% note info %}
修改后需要重启 ssr
{% endnote %}

## 重启和停止 shadowsocksR

```shell
# ssserver命令
ssserver -c /etc/shadowsocks.json -d start   # 启动ssr
ssserver -c /etc/shadowsocks.json -d stop    # 停止ssr
ssserver -c /etc/shadowsocks.json -d restart # 重新启动ssr

# systemctl命令
systemctl status shadowsocks  # 启动ssr
systemctl stop shadowsocks    # 停止ssr
systemctl restart shadowsocks # 重新启动ssr
```

## 一键安装 BBR

### 安装

bbr 可以让 shadowsocksR 更加快速！

```shell
# 第一步
wget --no-check-certificate https://github.com/teddysun/across/raw/master/bbr.sh

# 第二步
chmod +x bbr.sh

# 第三步
./bbr.sh
```

### 检测是否安装成功

```shell
lsmod | grep bbr
```

含有`tcp_bbr`说明成功了

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Xshell_k61pxhYWAX.png)

## 使用 shadowsocks-windows 连接

[地址](https://github.com/shadowsocks/shadowsocks-windows/releases)，下载最新版

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_IvU8vGhghj.png)

填写关键 SSR 信息
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Shadowsocks_uBRtn7SHa7.png)

完成，你自由了！
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_8bL9ifLh9T.png)

## 扩展：快照备份

{% note info %}
备份后如果购买新的服务器，可以通过快照还原，这样就不用重复安装 SSR
{% endnote %}

把系统制作成快照
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_cKVuYceuJq.png)

购买服务器的时候使用快照创建
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_rlwbyyPt1t.png)

## 扩展阅读

[关闭阿里云后台监控扫描](https://www.wuzuowei.net/11855.html)
