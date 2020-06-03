---
title: Mailspring电子邮件客户端
date: 2019-11-04 18:08:00
tags:
  - 软件
  - 效率
type: categories
categories:
  - 软件
  - 其他
---

## 前言

开源，写着是 UI 部分开源，Pro 用户收费
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/mailspring_2esQ1M9WJJ.png)

<!-- more -->

## 特性

[官网地址](https://getmailspring.com/)，基于 `electron`

<!-- more -->

### 人气开源项目

[Github 地址](https://github.com/Foundry376/Mailspring)

### 中文

![](https://getmailspring.com/static/img/features/localization.png)

### 支持多个主流 Email

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/mailspring_2n7GcePW2h.png)

### 高颜值

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/mailspring_rSQfvTaeDZ.png)

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/mailspring_a66IfkNwHB.png)

## 缺点

1.免费版最多支持 4 个邮箱

2.需要登录，Mailspring ID

3.Mailspring ID 登录慢

4.断网无法登录

## GitHub 信息节选

> Mailspring's UI is open source (GPLv3) and written in TypeScript with Electron and React.
> 该项目只是 UI 部分，不包括核心代码
> _[摘自 Github 开发者 Mailspring](https://github.com/Foundry376/Mailspring)_

---

> It will be open-sourced in the future but is currently closed source.
> 现在不开源，将来有开源的打算
> _[摘自 Github 开发者 Mailspring](https://github.com/Foundry376/Mailspring)_

---

> Unfortunately, it doesn't make sense to remove the Mailspring ID and make the mail client better for you, because it pulls us further away from doing a great job on the pro features for paying users that will ultimately make this a long-lasting open source project.
> Hope that helps! I'm going to flag this as a wontfix for now, but I welcome everyone's thoughts and feedback here
> 不好意思，不收费是不行的，收费是为了你好啊。pro 付费用户可以让我们马不停蹄全力开发，我们想要为 pro 付费用户提供更好的服务，删除 Mailspring ID 无法为 pro 付费用户提供更好的服务，没有 pro 付费用户就没有开源。
> 我们拒绝放弃付费用户，但是我欢迎所有人提供意见，帮我们改善产品。
> _[摘自 Github 开发者 Mailspring](https://github.com/Foundry376/Mailspring/issues/33)_

开发者对 Mailspring ID 的回答，满满的钱味，被踩了 83 次，总结来说金钱第一，有钱后是否开源看心情。收费没有收费的样子，开源没有开源的样子。

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_bv7sQZtHvT.png)

> A beautiful, fast and maintained fork of @Nylas Mail by one of the original authors.
> 该项目是 fork Nylas Mail
> _[摘自 Github 开发者 Mailspring](https://github.com/Foundry376/Mailspring)_

用其他人开源项目打包收费

---

> After having read the justification from the devs, that they are maintaining a server (and presumably paying for it) just for the sake of storing metadata associated with mail messages, I smiled a little bit. What I would do (and plenty of people can also get there) is to use IMAP folders to store such metadata and cache it locally. Now tell me this is "technically unfeasible". Make me smile again :)
> 收费是为了维护一台保存邮件元数据的服务器，我有点想笑。我只是想 IMAP 文件夹把邮件元数据存储在本地，现在开发者告诉我这在技术上是不可行的，我实在忍不住笑出来 :)。
> _[摘自 Github 用户](https://github.com/Foundry376/Mailspring/issues/33)_

忽悠小白可以，不过在 Github 高手如云的地方明显丢人了，说本地存储技术上不可实现，看到这里已经卸载 Mailspring。

## 总结

虽说开源，其实是半开源，用开源揽人气。有可能隐私泄露，毕竟是小团队，个人玩玩就好，正式使用或者企业用不合适，等正式开源（放弃项目）的时候再使用也不迟。2017 有人提过跳过登录，不过被拒绝了，[GitHub 讨论地址](https://github.com/Foundry376/Mailspring/issues/33)。

最后`outlook`网页版支持 IMAP/SMTP 设置，最多可以连接高达 20 个其他电子邮件账户，以后本地邮件客户端优势会越来越小。
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_b8oJlumUO3.png)
