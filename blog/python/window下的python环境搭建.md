---
title: window下的python环境搭建
date: 2019-10-16 14:49:00
tags:
  - 编程
  - python
type: categories
categories:
  - 编程
  - python
---

## 安装 python

> [下载页地址](https://www.python.org/downloads/windows/)

下载`Windows x86-64 executable installer`
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_jrrk9cjK39.png)

完成安装后执行`pip --version`，会输出版本则安装成功
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/cmd_uDc8LLbS7D.png)

<!-- more -->

## python 编辑器

- [VsCode](https://code.visualstudio.com/)(免费)，安装 Python 插件
  ![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_e4RX2gEyRO.png)

- [PyCharm](https://www.jetbrains.com/pycharm/)(收费)

## 官方源地址

找包就在这里找

> [pypi 地址](https://pypi.org/)

## 修改源地址

pip 会从[pypi](https://pypi.org/)下载 python 所需要的包，国外的源偏慢

进入：`C:\Users\<username>\pip\pip.ini`，没有`pip.ini`则创建`pip.ini`

```ini
[global]
index-url = http://pypi.douban.com/simple
[install]
trusted-host=pypi.douban.com
```

## 虚拟环境

### 使用 pipenv 创建虚拟环境(推销)

#### 安装 pipenv

```bash
pip install pipenv
```

#### 常用命令

- `pipenv --three`：来生成 Python3 的虚拟环境
- `pipenv shell`：进入虚拟环境
- `pipenv install`：安装所有依赖包
- `pipenv install *pack*`：安装某个包
- `pipenv run ***`：直接通过虚拟环境执行文件

#### 修改 pipenv 源

`Pipfile`

```ini
[[source]]
url = "https://pypi.douban.com/simple"
```

### 官方方法创建虚拟环境

#### 生成环境

[官方教程链接](https://docs.python.org/3/library/venv.html)

生成目录

```bash
python -m venv D:\project-demo\python-demo\venv
```

把命令切换到虚拟环境

```bash
C:\> D:\project-demo\python-demo\venv\Scripts\activate.bat
```

#### 保存依赖到文本

```bash
pip freeze >requirements.txt
```

#### 通过依赖文本安装

```bash
pip install -r requirements.txt
```

#### 虚拟环境安装目录

默认安装在 C 盘。通过修改环境变量来配置环境安装目录

{% note info %}
添加系统变量，变变量名为`WORKON_HOME`，值为虚拟环境所在目录
{% endnote %}

#### 扩展一：通过 vscode 调试

#### 其他

虚拟环境所在目录

```bash
pipenv --venv
```

## python 库

- [pydash](https://pypi.org/project/pydash/)：类似`lodash`
- [Pillow](https://pypi.org/project/Pillow/)：图片处理
- [python-docx](https://pypi.org/project/python-docx/)：doxc 文档处理
- [Flask](https://pypi.org/project/Flask/)：服务器
- [PyAutoGUI](https://pypi.org/project/Flask/)：自动控制键盘鼠标
- [PySide2](https://pypi.org/project/PySide2/)：ui 框架
- [tensorflow](https://pypi.org/project/tensorflow/)：机械学习框架
- [pynput](https://pypi.org/project/pynput/)：键盘鼠标监视
- [pyperclip](https://pypi.org/project/pyperclip/)：剪切复制
- [pipenv](https://pypi.org/project/pipenv/)：环境管理 [参考](https://blog.csdn.net/qq_37925422/article/details/79646462)
- [openpyxl](https://pypi.org/project/openpyxl/)：超级强大读写 xlsx，可插入图表
- [awesome-python](https://github.com/vinta/awesome-python)：python 好用的东西

## pylint

[参考](https://www.jianshu.com/p/c0bd637f706d)
