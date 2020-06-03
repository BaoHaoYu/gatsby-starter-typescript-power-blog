---
title: 让flash不在弹窗
date: 2019-11-02 10:49:10
tags:
  - 软件
type: categories
categories:
  - 软件
  - 其他
---

## 前言

Adobe 和重庆重橙网络科技有限公司达成合作，为中国提供特供版的 flash，结果一堆弹窗，还出售用户隐私，不过也多亏这个垃圾公司的弹窗，我才发现重庆重橙网络这家垃圾。

流氓永远是流氓，永远不会成为枭雄，偷用户隐私，结果因为弹窗暴露自己，不会隐忍，贪图便宜。

<!-- more -->

## 方案一：下载原版 flash 离线安装包

下载[地址](https://labs.adobe.com/downloads/flashplayer.html)，必须穿墙才能下载，否则会跳到中国 flash
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_qXrdWtNd9x.png)

{% note info %}
断网安装，不断网会跳到中国 flash 官网
{% endnote %}

本人提取的地址，需要翻墙下载

- [IE install_flash_player_ax](https://fpdownload.macromedia.com/pub/labs/flashruntimes/flashplayer/install_flash_player_ax.exe)
- [火狐 install_flash_player](https://fpdownload.macromedia.com/pub/labs/flashruntimes/flashplayer/install_flash_player.exe)
- [谷歌 install_flash_player_ppapi](https://fpdownload.macromedia.com/pub/labs/flashruntimes/flashplayer/install_flash_player_ppapi.exe)

## 方案二：下载原版 flash 在线安装包(推销)

### 获得下载地址

需要穿墙，[地址](https://get.adobe.com/flashplayer/)，正版界面
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_bOWGXT7yen.png)

赝品
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_ycJhrZmiku.png)

### 下载地址

无法穿墙的同学可以用我的下载地址，这个不用穿墙

- [Window 火狐 flashplayer32_ha_install](https://admdownload.adobe.com/bin/live/flashplayer32_ha_install.exe)
- [Window 谷歌 flashplayer32pp_ha_install](https://admdownload.adobe.com/bin/live/flashplayer32pp_ha_install.exe)
- [Window IE flashplayer32ax_ha_install](https://admdownload.adobe.com/bin/live/flashplayer32ax_ha_install.exe)
- [Mac Safari 和火狐 install_flash_player_osx](https://fpdownload.adobe.com/get/flashplayer/pdc/32.0.0.270/install_flash_player_osx.dmg)
- [Mac 谷歌 install_flash_player_osx_ppapi](https://fpdownload.adobe.com/get/flashplayer/pdc/32.0.0.270/install_flash_player_osx_ppapi.dmg)

### 安装界面

正版
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/flashplayer32pp_ha_install_Ws7DJhMhL0.png)

赝品
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/lVHpKFgMf3.png)

## 成功标识

打开`C:\Windows\SysWOW64\Macromed\Flash`，手术非常成功，Helper Service 完美切除
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/explorer_uc6d8oiTot.png)
