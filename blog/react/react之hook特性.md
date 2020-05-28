---
title: react之hook特性
date: 2020-04-15 16:00:00
banner: http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/react-hook.png
description: hook 可加强函数式编程，减少类和装饰器，目前第三方项目在 hook 上百花齐放。
tags:
  - react
type: categories
categories:
  - 编程
  - react
---

2019 年 2 月 6 日，`react`正式加入`hook`，`hook`可以让码农在函数式组件里使用`setState`，`componentDidMount`等类似特性，并且易于重复利用，加强函数式编程，减少类和装饰器，目前第三方`hook`项目百花齐放

<!-- more -->

## facebook 团队对 hook 的展望

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_l7KhBglRs4.png)

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_UgLpCMsMr9.png)

## 推销网站

- [react-hooks（hook 和 class 对比）](https://wattenberger.com/blog/react-hooks)
- [replace-lifecycle-with-hooks-in-react（hook 对应的生命周期）](https://dev.to/trentyang/replace-lifecycle-with-hooks-in-react-3d4n)

## useState

可以达到`this.state`, `this.setState`功能

{{< codes Hook Class >}}

{{< code >}}
```tsx
import React from 'react'

export function UseHookDemo() {
  const [state, setState] = React.useState({ value: '' })
  return (
    <input
      type="text"
      value={state.value}
      onChange={(e) => setState({ value: e.target.value })}
    />
  )
}
```
{{< /code >}}

{{< code >}}
```tsx
import React from 'react';

export class ClassDemo extends React.Component {
  state = {
    value: '',
  };

  render() {
    return (
      <input
        type="text"
        value={this.state.value}
        onChange={(e) => this.setState({ value: e.target.value })}
      />
    );
  }
}

```
{{< /code >}}

{{< /codes >}}

## useEffect

`useEffect`可以实现`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`这三个特性

1.`react`的生命周期函数会在`useEffect`中执行

```tsx
import * as React from 'react'

function UseEffect(p: { value: string; onChange: any }) {
  React.useEffect(() => {
    // componentDidMount or componentDidUpdate
    return () => {
      // componentWillUnmount
    }
  })

  return (
    <div>
      <span>demo:</span>
      <input type="text" value={p.value} onChange={p.onChange} />
    </div>
  )
}
```

2.参考值变化才执行之后的方法, `React.useEffect`第二个参数就是参考值, 如下是`class`组件对比`hook`函数式组件

```tsx
componentDidUpdate(prevProps: any) {
    if (prevProps.value === this.props.value) return
    // componentDidUpdate
}
```

```tsx
React.useEffect(() => {
  // componentDidMount or componentDidUpdate
}, [p.value])
```

3.提取`componentDidMount`, `React.useEffect`第二个参数改成空数组

```tsx
React.useEffect(() => {
  // componentDidMount
  return () => {
    // componentWillUnmount
  }
}, [])
```

4.提取`componentDidMount`, `componentDidUpdate`分开执行

```tsx
const hasMount = React.useRef(false)

React.useEffect(() => {
  if (hasMount.current) {
    // componentDidUpdate
  } else {
    hasMount.current = true
    // componentDidMount
  }
}, [p.value])
```

可以封装成自定义的`Effect`，减少代码

```jsx
// 自定义Effect
const useUpdateEffect = (cb: any, deps?: React.DependencyList) => {
  const hasMount = React.useRef(false)

  React.useEffect(() => {
    if (hasMount.current) {
      cb()
    } else {
      hasMount.current = true
    }
  }, deps)
}

function UseEffect(p: { value: string; onChange: any }) {
  // 达到了分开执行的效果
  React.useEffect(() => {
    // componentDidMount
  }, [])
  useUpdateEffect(() => {
    // componentDidUpdate
  }, [p.value])

  return (
    <div>
      <span>demo:</span>
      <input type="text" value={p.value} onChange={p.onChange} />
    </div>
  )
}
```

## useContext

`useContext`可代替`Consumer`, `Consumer`代码比较长

```tsx
import * as React from 'react'

const c = React.createContext({ data: '', time: '' })
const { Provider, Consumer } = c

const ChildrenConsumer = () => {
  return (
    <Consumer>
      {(props) => (
        <div>
          UseContext: data-> {props.data} time-> {props.time}
        </div>
      )}
    </Consumer>
  )
}

const ChildrenUseContext = () => {
  const usec = React.useContext(c)
  return (
    <div>
      UseContext: data-> {usec.data} time-> {usec.time}
    </div>
  )
}

export const UseContext: React.FunctionComponent<any> = (props) => {
  return (
    <Provider value={{ data: props.data, time: props.time }}>
      <ChildrenUseContext />
      <ChildrenConsumer />
    </Provider>
  )
}
```

## useRef

`useRef().current`可以保存任何值, 可以把`useRef().current`当做`class`中的属性`public current`

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_kLGTKT399f.png)

如下使用`useHook`可以代替`createRef`

```tsx
import * as React from 'react'

function UseRef() {
  const rootRef = React.useRef(null)
  const onButtonClick = () => {
    console.log(rootRef.current)
  }
  return (
    <div ref={rootRef}>
      <button onClick={onButtonClick}>ddd</button>
    </div>
  )
}

class Demo extends React.Component {
  rootRef = React.createRef()

  onButtonClick = () => {
    console.log(rootRef.current)
  }

  render() {
    return (
      <div ref={this.rootRef}>
        <button onClick={this.onButtonClick}>ddd</button>
      </div>
    )
  }
}
```

## useMemo

`useMemo`主要用来性能优化

1.`useMemo`主要用**参考值**重新计算获得数据, 类似`vuex`的`computed`, `reselect`

```tsx
import * as React from 'react'

function computeData(data: number) {
  // 复杂高耗能逻辑
  return 200 + data
}

export const UseMemo: React.FunctionComponent<any> = (props) => {
  const newData = React.useMemo(() => {
    return computeData(props.data)
  }, [props.data])
  return <div>UseMemo: data-> {newData}</div>
}
```

2.可以实现`class`组件中的`React.PureComponent`, 如下就是只有`props`发生改变才会重新渲染

```tsx
const CountText = React.memo((p: { count: number }) => {
  console.log(p.count)
  return <span>{p.count}</span>
})
```

## useCallback

参考如下两个链接，解释为何需要`useCallback`，如何达到`PureComponent`效果
[usememo-and-usecallback](https://kentcdodds.com/blog/usememo-and-usecallback)
[translation-usememo-and-usecallback](https://jancat.github.io/post/2019/translation-usememo-and-usecallback/)

```tsx
import * as React from 'react'

export function UseCallbackBase() {
  const [count, setCount] = React.useState(0)
  // () => setCount((c) => c + 1)将会保存下载
  const increment = React.useCallback(() => setCount((c) => c + 1), [])
  // 每次渲染都会重新定义，相当于内联函数, 性能提升极小
  // const increment1 = () => setCount(c => c + 1)
  return <button onClick={increment}>UseCallback: {count}</button>
}
```

## 实现 PureComponent

```tsx
import * as React from 'react'

// 相当于class组件中的React.PureComponent
const CountButton = React.memo((p: { onClick: any; count: number }) => {
  console.log(p.count)
  return <button onClick={p.onClick}>{p.count}</button>
})

export function UseCallback() {
  const [count1, setCount1] = React.useState(0)
  const increment1 = React.useCallback(() => setCount1((c) => c + 1), [])
  const [count2, setCount2] = React.useState(0)
  const increment2 = React.useCallback(() => setCount2((c) => c + 1), [])
  // increment1 increment2被保存了下来，不会每次都重新定义
  return (
    <div>
      <CountButton count={count1} onClick={increment1} />
      <CountButton count={count2} onClick={increment2} />
    </div>
  )
}
```

## 大量第三方库

- [awesome-react-hooks（有关 hook 的优秀项目和资料）](https://github.com/rehooks/awesome-react-hooks)
- [react-use（大量使用 hook 实现的功能）](https://github.com/streamich/react-use), 自定义`hook`前先在这里找找是否有对应的`hook`
- [react-hook-form（表单）](https://react-hook-form.com/)
- [react-spring（css 动画）](https://github.com/react-spring/react-spring), 可代替`react-transition-group`
- [react-use-gesture（动画拖拽）](https://use-gesture.netlify.app/)
- [easy-peasy（简化版 redux）](https://github.com/ctrlplusb/easy-peasy)

### react-router

可以舍弃`withRouter`，使用`hook`可以获得所有参数  
![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_VTpXueXP63.png)

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_WTX4iO30UG.png)

### redux

不用`connect`也可以快速获得`dispatch`和状态

```tsx
const dispatch = useDispatch()
const isOn = useSelector((state: RootState) => state.isOn)
```

### react-dnd

![](http://bhyblog.oss-cn-shenzhen.aliyuncs.com/hexo/chrome_693jrbYOpF.png)
