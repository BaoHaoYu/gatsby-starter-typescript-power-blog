---
title: vscode使用prettier格式化
date: 2019-10-26 21:18:00
tags:
  - vscode
type: categories
categories:
  - 编程
  - vscode
---

## 前言

vscode + prettier 可以自动格式化 markdown，js，ts，java 等语言，深度定制格式化规则
[官方地址](https://prettier.io/)

<!-- more -->

## 安装 Prettier - Code formatter 插件

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_L3hj228dpu.png)

## 加入配置规则

在`package.json`中加入 `prettier` 字段

```json
"prettier": {
  "trailingComma": "es5",
  "printWidth": 80,
  "semi": false,
  "arrowParens": "always",
  "useTabs": false,
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "tabWidth": 2,
  "singleQuote": true
}
```

## 配置用户设置 settings.json

可以看出所有那些文件使用 prettier 格式化

```json
"[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
},
```

如要 vscode 保存的时候自动格式化，editor.formatOnSave 设置成 true

```json
"[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
},
```

## 扩展：结合 tslint

### 安装必要的包

```bash
yarn add typescript tslint tslint-config-prettier tslint-plugin-prettier
```

### 创建 tsconfig.json

```json
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "baseUrl": ".",
    "downlevelIteration": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "forceConsistentCasingInFileNames": true,
    "jsx": "react",
    "module": "commonjs",
    "moduleResolution": "node",
    "noEmitHelpers": false,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noUnusedLocals": false,
    "sourceMap": true,
    "strictNullChecks": true,
    "suppressImplicitAnyIndexErrors": true,
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "es2015.collection",
      "es2015.iterable",
      "es2015.promise",
      "es5"
    ]
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

### 安装 TSLint 插件

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/Code_o3wpMvcGjd.png)

### 设置修改自动格式化

vscode 的用户设置加入如下内容

```json
"editor.codeActionsOnSave": {
    "source.fixAll.tslint": true
},
```

做完这步就可以修改后自动保存了

### 命令行格式化所有文件

如果要格式化整个项目文件 ，package.json 加入 scripts 加入 tslint 命令，`npm run tslint`

```json
"tslint": "tslint --fix -p tsconfig.json"
```
