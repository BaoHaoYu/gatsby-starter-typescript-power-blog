---
title: python库：Pillow图形处理
date: 2019-11-14 18:30:00
tags:
  - 编程
  - python
type: categories
categories:
  - 编程
  - python
---

`pillow`是`python`强大的图形处理库，有加入水印，滤镜，文字或者加入色块，矩形方框等诸多功能

<!-- more -->

## 安装

```bash
pipenv install Pillow
```

或者

```bash
pip install Pillow
```

## 例子

```python
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# 选取图片
im: Image.Image = Image.open('images/主板启动项选择快捷键.jpg')
draw = ImageDraw.Draw(im)

# 长方形框
draw.rectangle(xy=[(10, 10), (50, 50)], width=3, outline='red')

# 添加文字
fnt = ImageFont.truetype('C:\Windows\Fonts\STHUPO.TTF', 40)
draw.text(xy=(10, 80), text="中文中文", font=fnt, fill=(0, 137, 255, 208))

# 截取一部分
region: Image.Image = im.crop((100, 100, 400, 400))

# 尺寸修改
region = region.resize((200, 200))

# 旋转
region = region.rotate(45)

# 拼接一张图片
icon: Image.Image = Image.open('images/icon_pocket_monster_1011.png')
im.paste(icon, (30, 200))

# 使用模糊滤镜遮挡部分内容
box = (0, 300, 500, 600)
ma: Image.Image = im.crop(box)
ma = ma.filter(ImageFilter.BoxBlur(3))
im.paste(ma, box)

# 保存图片
im.save('__out__/ddd.jpg')
region.save('__out__/region.jpg')
```
