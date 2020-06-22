---
title: python通过调用官方Api修改Excel表格
date: 2019-10-16 15:14:00
tags:
  - 编程
  - python
type: categories
categories:
  - 编程
  - python
---

## 前言

不止 Excel 可以修改，所有的 Office 软件都可以修改，比起 python 第三方库，微软提供的功能实在强大，Api 也十分完善

[官方 Api 地址](https://docs.microsoft.com/en-us/office/vba/api/overview/)

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_jVb7RdXqeP.png)

<!-- more -->

## 安装 pywin32

使用`pip`安装

```bash
pip install pywin32
```

---

使用`pipenv`安装

```bash
pipenv install pywin32
```

## 最基础表格修改

```python
import win32com.client as win32

excel = win32.gencache.EnsureDispatch('Excel.Application')
excel.Visible = False # 是否显示程序
wb = excel.Workbooks.Open('path') # 打开表格
ws = wb.Worksheets('sheets1') # 打开sheets1

ws.Rows(5).EntireRow.Delete() # 删除第五行

ws.Range('A1').Value = info # 修改A1单元格的值
ws.Range('A1').RowHeight = 150 # 行高

ws.Range('A1').Font.ColorIndex = 3 # 字体颜色
ws.Range('A1').Font.Size = 12 # 字体大小

ws.Range('A1').VerticalAlignment = -4108 # 垂直居中
ws.Range('A1').HorizontalAlignment = -4108 # 水平居中

ws.Range('B1:C5').Value = 'Haha' # 修改B1到C5范围内的值
ws.Range('E1:E3').Merge() # 合并E1到E3的单元格

wb.SaveAs(r'D:\ddd.xlsx') # 保存到某处
excel.Application.Quit() # 退出
excel.Application.DisplayAlerts = True # 自动确定
```
