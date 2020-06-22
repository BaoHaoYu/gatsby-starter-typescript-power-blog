---
title: git仓库重置作者信息
date: 2019-10-31 21:20:00
tags:
  - hexo
type: 'categories'
categories:
  - 编程
  - git
---

## 前言

在宿舍和家里的编写，填写用户名太过随意，导致出现多个仓库参与者，其实就我一个人而已
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Fork_H4Qiw0MmSo.png)

<!-- more -->

## 克隆到本地

```bash
git clone --bare https://github.com/user/repo.git
cd repo.git
```

## 通过命令重置

拷贝如下命令道 git 命令行中

```bash
#!/bin/sh
git filter-branch --env-filter '
OLD_EMAIL="旧邮箱"
CORRECT_NAME="新用户名"
CORRECT_EMAIL="新邮箱"
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/mintty_ixPKRTrcHh.png)

## 推送到远程

```bash
git push --force --tags origin 'refs/heads/*'
```
