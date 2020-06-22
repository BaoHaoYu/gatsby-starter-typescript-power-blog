---
title: typescript高级类型
date: 2019-10-26 22:14:00
banner: http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_mIMH2bH74D.png
tags:
  - typescript
  - 总结
type: 'categories'
description: string，number 这些简单类型一看就会，复杂的是各种高级类型
categories:
  - 编程
  - typescript
---

## 前言

就以如下代码为例子

```ts
// 例子
interface IStudent {
  teachers?: {
    physical: string
    biological: string
  }

  parents: {
    mother: string
    father: string
  }
}
```

<!-- more -->

## 单个子集

```ts
const teacher: IStudent['teachers'] = {
  physical: 'pp',
  biological: 'bb',
}
```

## keyof：键名

```ts
const key1: keyof IStudent = 'parents'
const key2: keyof IStudent = 'teachers'
```

## Partial：任意子类型

```ts
const partial: Partial<IStudent> = {
  teachers: {
    physical: 'pp',
    biological: 'bb',
  },
}
```

## Required：可选变成必填

```ts
const required: Required<IStudent> = {
  teachers: {
    physical: 'pp',
    biological: 'bb',
  },

  parents: {
    mother: 'mm',
    father: 'ff',
  },
}
```

## Readonly：只读类型

```ts
const readonly: Readonly<IStudent> = {
  teachers: {
    physical: 'pp',
    biological: 'bb',
  },

  parents: {
    mother: 'mm',
    father: 'ff',
  },
}
```

## Exclude：差集

```ts
const exclude: Exclude<keyof IStudent, 'parents'> = 'teachers'
```

## Extract：交集

```ts
const extract: Extract<keyof IStudent, 'teachers' | 'hehe'> = 'teachers'
```

## Pick：子集

```ts
const pick: Pick<IStudent, 'teachers'> = {
  teachers: {
    physical: 'pp',
    biological: 'bb',
  },
}
```

## Omit：排除指定键

```ts
const omit: Omit<IStudent, 'parents'> = {
  teachers: {
    physical: 'pp',
    biological: 'bb',
  },
}
```

## Record：记录

```ts
const record: Record<'bhy', IStudent> = {
  bhy: {
    parents: {
      mother: 'mm',
      father: 'ff',
    },
  },
}
```

## Parameters：函数参数

```ts
type GetInfo = (name: string, age: number) => IStudent
const parameters: Parameters<GetInfo> = ['bhy', 100]
```

## ReturnType：函数返回类型

```ts
type GetInfo = (name: string, age: number) => IStudent
const returnType: ReturnType<GetInfo> = {
  parents: {
    mother: 'mm',
    father: 'ff',
  },
}
```

## ConstructorParameters：构造函数参数

```ts
interface IClockConstructor {
  new (hour: number, minute: number)
}

const constructorParameters: ConstructorParameters<IClockConstructor> = [
  100,
  400,
]
```
