---
title: vscode扩展开发(二)：常用API查询
date: 2020-01-15 19:27:00
tags:
  - vscode
type: categories
categories:
  - 编程
  - vscode
---

方便大脑回忆

<!-- more -->

## 修改选中的文本

```ts
vscode.window.activeTextEditor.edit(async (editBuilder) => {
  if (!vscode.window.activeTextEditor) return
  // 选中的区域
  const selectRange = vscode.window.activeTextEditor.selection

  //  如果没有选中任何东西
  if (selectRange.isEmpty) return

  // 选中的文本
  const selectText = vscode.window.activeTextEditor.document.getText(
    selectRange
  )

  // 替换选中的文本
  editBuilder.replace(selectRange, 'text')
})
```

## 顶部输入框

```ts
let text = await vscode.window.showInputBox({
  prompt: 'Enter text.',
  value: lastInput,
})
```

## 获得扩展配置

先要有配置

```json
"contributes": {
  "configuration": {
    "title": "Title 1",
    "properties": {
      "demo.config": {
        "type": "string",
        "deprecationMessage": "Demo config"
      }
    }
  }
}
```

```ts
let demoConfig = vscode.workspace.getConfiguration().get('demo.config')
```

## 通过注册修改文本

```ts
vscode.commands.registerTextEditorCommand(
  'XXXXXXXX',
  async (
    editor: vscode.TextEditor,
    edit: vscode.TextEditorEdit,
    args: any[]
  ) => {
    await editor.edit((e) => {
      let selectRange = editor.selection
      e.replace(selectRange, '选中')
    })
  }
)
```
