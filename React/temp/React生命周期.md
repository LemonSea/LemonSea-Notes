---
title: React生命周期
date: 2019-10-04 21:14:00
categories: React
tags:
 - React
---

- React16 版本前与16版本后的生命周期。

<!--more-->

## React（后）生命周期

### 生命周期图谱

> 简略生命周期图谱

![1570195029675](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1570195029675.png)

> 详细生命周期图谱

![1570195123354](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1570195123354.png)

原来（React v16.0前）的生命周期在React v16推出的[Fiber](https://zhuanlan.zhihu.com/p/26027085)之后就不合适了，因为如果要开启async rendering，在render函数之前的所有函数，都有可能被执行多次。

原来（React v16.0前）的生命周期在render前执行的有：

- componentWillMount（已废除，被 getDerivedStateFromProps 替代）
- componentWillReceiveProps（已废除，被 getDerivedStateFromProps 替代）
- shouldComponentUpdate
- componentWillUpdate（已废除，被 getDerivedStateFromProps 替代）

如果开发者开了async rendering，而且又在以上这些 `render` 前执行的生命周期方法做 `AJAX` 请求的话，那 `AJAX` 将被无谓地多次调用。。。明显不是我们期望的结果。而且在 `componentWillMount` 里发起 `AJAX`，不管多快得到结果也赶不上首次 `render`，而且 `componentWillMount` 在服务器端渲染也会被调用到（当然，也许这是预期的结果），这样的 `IO操作` 放在 `componentDidMount` 里更合适。

禁止不能用比劝导开发者不要这样用的效果更好，所以除了 `shouldComponentUpdate`，其他在render函数之前的所有函数（componentWillMount，componentWillReceiveProps，componentWillUpdate）都被 `getDerivedStateFromProps ` 替代。

也就是用一个静态函数 `getDerivedStateFromProps` 来取代被 废弃的几个生命周期函数，就是强制开发者在 `render` 之前只做无副作用的操作，而且能做的操作局限在根据 `props` 和 `state` 决定新的 `state`。

### getDerivedStateFromProps

`getDerivedStateFromProps` 取代 `componentWillMount`、componentWillReceiveProps、`componentWillUpdate`。

`getDerivedStateFromProps` 无论是 `Mounting` 还是 `Updating`，也无论是因为什么引起的 `Updating`，全部都会被调用，它应该返回一个对象来更新状态，或者返回null来不更新任何内容。

### getSnapshotBeforeUpdate

`getSnapshotBeforeUpdate()` 在 `render` 之后执行，而执行之时DOM元素还没有被更新，给了一个机会去获取DOM信息，计算得到一个 `snapshot`，这个 `snapshot` 会作为 `componentDidUpdate` 的第三个参数传入，`snapshot` 可以是任何值。

```jsx
 getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('#enter getSnapshotBeforeUpdate');
    return 'foo';
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('#enter componentDidUpdate snapshot = ', snapshot);
  }
```

### Mount（挂载）

使用：

> constructor()
>
> static getDerivedStateFromProps()
>
> render()
>
> componentDidMount()

废弃：

> componentWillMount()

### Update（更新）

使用：

> static getDerivedStateFromProps()
>
> shouldComponentUpdate()
>
> render()
>
> getSnapshotBeforeUpdate()
>
> componentDidUpdate()

废弃：

> componentWillReceiveProps()
>
> componentWillUpdate()

### Unmount（移除）

使用：

> componentWillUnmount()

### 错误处理

当渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法：

> [`static getDerivedStateFromError()`](https://react-1251415695.cos-website.ap-chengdu.myqcloud.com/docs/react-component.html#static-getderivedstatefromerror)
>
> [`componentDidCatch()`](https://react-1251415695.cos-website.ap-chengdu.myqcloud.com/docs/react-component.html#componentdidcatch)

---

## React16（前）生命周期

### 生命周期图谱

![img](https://upload-images.jianshu.io/upload_images/5287253-bd799f87556b5ecc.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

### 初始化阶段

也就是以下代码中类的构造方法( `constructor()` ),Test 类继承了 `react Component` 这个基类，也就继承这个 `react` 的基类，才能有 `render()`,生命周期等方法可以使用，这也说明为什么`函数组件不能使用这些方法`的原因。

`super(props)`用来调用基类的构造方法( `constructor()` ), 也将父组件的 `props` 注入给子组件，功子组件读取(组件中 `props` 只读不可变，`state` 可变)。
而 `constructor()` 用来做一些组件的初始化工作，如定义 `this.state` 的初始内容。

```jsx
import React, { Component } from 'react';

class Test extends Component {
  constructor(props) {
    super(props);
  }
}
```

### Mount（挂载）

> #### componentWillMount => render => componentDidMount

#### componentWillMount（Mount 前）

在组件挂载到DOM前调用，且只会被调用一次，在这边调用 `this.setState` 不会引起组件重新渲染，也可以把写在这边的内容提前到 `constructor()` 中，所以项目中很少用。

#### render

根据组件的 `props` 和 `state`（无两者的重传递和重赋值，论值是否有变化，都可以引起组件重新 `render`） ，return 一个 `React` 元素（描述组件，即UI），不负责组件实际渲染工作，之后由 `React` 自身根据此元素去渲染出页面 `DOM`。`render` 是纯函数（Pure function：函数的返回结果只依赖于它的参数；函数执行过程里面没有副作用），不能在里面执行 `this.setState`，会有改变组件状态的副作用（指当调用函数时，除了返回函数值之外，还对主调用函数产生附加的影响。例如修改全局变量（函数外的变量）或修改参数）。

#### componentDidMount（Mount 后）

组件挂载到DOM后调用，且只会被调用一次

### Update（更新）

> #### componentWillReceiveProps => shouldComponentUpdate => componentWillUpdate => render => componentDidUpdate

在讲述此阶段前需要先明确下 `react` 组件更新机制。`setState` 引起的 `state` 更新或父组件重新 `render` 引起的 `props` 更新，更新后的 `state` 和 `props` 相对之前无论是否有变化，都将引起子组件的重新 `render`。

#### 造成组件更新有两类（三种）情况

1. 父组件重新render

子组件显示父组件穿过来的`props`有两种方式：

- 直接使用

这种方式，父组件改变`props`后，子组件重新渲染，由于直接使用的`props`，所以我们不需要做什么就可以正常显示最新的`props`：

```
class Child extends Component {
    render() {
        return <div>{this.props.someThings}</div>
    }
}
```

- 转换成自己的`state`

这种方式，由于我们使用的是`state`，所以每当父组件每次重新传递`props`时，我们需要重新处理下，将`props`转换成自己的`state`，这里就用到了 `componentWillReceiveProps`。

每次子组件接收到新的 `props`，都会重新渲染一次，除非你做了处理来阻止（比如使用：`shouldComponentUpdate`），但是你可以在这次渲染前，根据新的 `props` 更新 `state`，更新 `state` 也会触发一次重新渲染，但 `react` 不会这么傻，所以只会渲染一次，即官网的：

> 在该函数(componentWillReceiveProps)中调用 this.setState() 将不会引起第二次渲染。

```
class Child extends Component {
    constructor(props) {
        super(props);
        this.state = {
            someThings: props.someThings
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({someThings: nextProps.someThings});
    }
    render() {
        return <div>{this.state.someThings}</div>
    }
}
```

2. 组件本身调用 `setState`，无论 `state` 有没有变化。可通过 `shouldComponentUpdate` 方法优化。

#### componentWillReceiveProps(nextProps)

此方法只调用于 `props` 引起的组件更新过程中，参数 `nextProps` 是父组件传给当前组件的新 `props`。但父组件 `render` 方法的调用不能保证重传给当前组件的 `props` 是有变化的，所以在此方法中根据 `nextProps` 和 `this.props` 来查明重传的 `props` 是否改变，以及如果改变了要执行啥，比如根据新的 `props` 调用 `this.setState` 触发当前组件的重新 `render`。

#### shouldComponentUpdate(nextProps, nextState)

此方法可以通过比较 `nextProps`，`nextState` 及当前组件的 `this.props`，`this.state`，返回true时当前组件将继续执行更新过程，返回false则当前组件更新停止，以此可用来减少组件的不必要渲染，优化组件性能。

ps：这边也可以看出，就算 `componentWillReceiveProps()` 中执行了 `this.setState`，更新了 `state`，但在 `render` 前（如 `shouldComponentUpdate`，`componentWillUpdate`），`this.state` 依然指向`更新前`的 `state`，不然 `nextState` 及当前组件的 `this.state` 的对比就一直是true了。

#### componentWillUpdate(nextProps, nextState)

此方法在调用 `render` 方法前执行，在这边可执行一些组件更新发生前的工作，一般较少用。

#### render

render方法在上文讲过，这边只是重新调用。

#### componentDidUpdate(prevProps, prevState)

此方法在组件更新后被调用，可以操作组件更新的DOM，`prevProps` 和 `prevState` 这两个参数指的是组件`更新前`的 `props` 和 `state`。

### Unmount（卸载）

#### componentWillUnmount

此方法在组件被卸载前调用，可以在这里执行一些清理工作，比如清楚组件中使用的定时器，清楚 `componentDidMount`中手动创建的DOM元素等，以避免引起内存泄漏。

## 参考

>[程墨Morgan老师的React v16.3之后的组件生命周期函数](https://zhuanlan.zhihu.com/p/38030418)
>
>[详解React生命周期(包括react16版)](https://www.jianshu.com/p/514fe21b9914)
>
>[React 官方文档](https://react-1251415695.cos-website.ap-chengdu.myqcloud.com/docs/react-component.html#static-getderivedstatefromerror)