---
title: go修改excel文件
date: 2020-03-30 18:00
tags:
  - go
type: categories
categories:
  - 编程
  - go
---

[阿里巴巴员工开发的库，功能齐全](https://github.com/360EntSecGroup-Skylar/excelize)

<!-- more -->

## 实例代码

```go
package main

import "github.com/360EntSecGroup-Skylar/excelize"

func main() {
    f, e := excelize.OpenFile("./demo.xlsx")
    if e != nil {
        return
    }
    // 获得激活的页面
    s := f.GetSheetName(f.GetActiveSheetIndex())
    // 设置值
    f.SetCellValue(s, "A1", "Demo")
    // 设置行高
    f.SetRowHeight(s, 1, 60)
    // 设置行框
    f.SetColWidth(s, "A", "A", 25)
    // 设置文字样式
    style, e := f.NewStyle(`{ "font": { "size": 25, "color": "#09600B" }, "alignment": { "vertical":"center", "horizontal": "center" } }`)
    f.SetCellStyle(s, "A1", "A1", style)
    // 另存为
    f.SaveAs("new.xlsx")
}

```
