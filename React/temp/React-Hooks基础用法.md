---
title: React-Hooks基础用法
date: 2019-10-02 14:31:00
categories: React
tags:
 - React
 - React-Hooks
---

- React-Hooks 各类函数的用法。

<!--more-->

# react hooks

## useState

useState 是 react 自带的一个 hook 函数，它的作用就是用来声明状态变量。 useState 这个函数接收的参数是我们的状态初始值（initial state）， 它返回了一个数组，这个数组的第[0]项是当前的状态值， 第[1]项是可以改变状态值的方法函数。

```jsx
import React, { useState } from 'react';

function Example() {
    const [age, setAge] = useState(18);
    const [money, setMoney] = useState(1000);
    return (
        <div>
            <button onClick={() => { setAge(age + 1) }}>{age}</button>
            <button onClick={() => { setMoney(money + 1) }}>{money}</button>
        </div>
    )
}

export default Example;
```

## useEffect

使用useEffect，可以直接在函数组件内处理生命周期事件。 如果你熟悉 React class 的生命周期函数， 你可以把 useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合

> useEffect 使用需要注意的地方

- 有两个参数 callback 和 dependencies 数组
- 如果 dependencies 不存在，那么 callback 每次 render 都会执行
- 如果 dependencies 存在，只有当它发生了变化， callback 才会执行

```jsx
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function useEffectTest() {
  useEffect(() => {
      
    // 默认情况下，每次渲染后都会调用该函数
    console.log('render!');

    // 如果要实现 componentWillUnmount，
    // 在末尾处返回一个函数
    // React 在该函数组件卸载前调用该方法
    // 其命名为 cleanup 是为了表明此函数的目的，
    // 但其实也可以返回一个箭头函数或者给起一个别的名字。
    return function cleanup () {
        console.log('unmounting...');
    }
  })  
  return "useEffectTest";
}
```

> 阻止每次重新渲染都会执行 useEffect 如果希望 effect 较少运行，可以提供第二个参数 - 值数组。 将它们视为该effect的依赖关系。 如果其中一个依赖项自上次更改后，effect将再次运行。

传入有数据的数组：

```jsx
const [value, setValue] = useState(0);

useEffect(() => {
  // 仅在 value 更改时更新
  console.log(value);
  // 仅在组件卸载时更新
  return () => {
            console.log('组件卸载'+{ value })
  }
}, [value]) 
```

传入空数组

```jsx
const [value, setValue] = useState(0);

useEffect(() => {
  // 仅在第一次渲染时更新
  console.log(value);
  // 仅在组件卸载时更新
  return () => {
            console.log('组件卸载'+{ value })
  }
}, []) 
```

## useContext

useContext 可以实现共享状态最大的改变是可以在使用 Counter 的时候不必在包裹 Children 了，比方说我们先创建一个上下文， 这个上下文里头有一个名为 count 的 state，以及一个修改 count 的方法 setCount

> 在父组件中，使用 createContext 创建上下文并导出，然后通过 value 传递给子组件

```jsx
import React, { createContext, useState } from 'react';
import { Counter } from './Counter'
// 创建一个上下文，这个上下文要导出
export const CountContext = createContext()

function UseContext() {
    const [count, setCount] = useState(0)
    return (
        <div>
            {/* 使用创建的上下文，数据通过 value 传递给子组件，这里我们传递了一个对象 */}
            <CountContext.Provider value={{count,setCount}}>
                <Counter />
            </CountContext.Provider>
        </div>
    )
}

export default UseContext
```

> 在子组件中，导入父组件创建的上下文，然后使用 useContext 接收父组件通过 value 传递的值

```jsx
import React, { useContext } from 'react';
// 这里获取父组件的上下文
import { CountContext } from './index'
export function Counter() {
    // 通过 useContext 获取父组件传递的内容(d对象解构)
    const { count, setCount } = useContext(CountContext)
    return (
        <div>
            <h2>{count}</h2>
            <button onClick={() => { setCount(count + 1) }}>count</button>
        </div>
    )
}
```

## useReducer

Redux 的核心概念是，组件发出 action 与状态管理器通信。状态管理器收到 action 以后，使用 Reducer 函数算出新的状态

- 简单来说 reducer 是一个函数 (state, action) => newState： 接收当前应用的 state 和触发的动作 action，计算并返回最新的state。

`useReducer` 的作用就是创建一个状态管理器，它接收一个 `reducer` 和初始的 `state` 的值。它返回了一个数组，这个数组的第[0]项是当前的 `state`， 第[1]项是可以改变 `state` 的方法函数 `dispatch`，它会传递一个 `action` 给状态管理器。

> const [state, dispatch] = useReducer(reducer, initialState)

```jsx
import React, { useReducer } from 'react';

// 创建的 reducer
function reducer(state, action) {
    switch (action.type) {
        case 'add':
            return { count: state.count + 1 };
        case 'del':
            return { count: state.count - 1 };
        default:
            return state;
    }
}

function UseReducer() {
    const initialState = { count: 0 }
    // 利用 reducer 和 初始state 创建一个状态管理器，返回 state 和 dispatch
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <div>
            <p>{state.count}</p>
            {/* 利用 dispatch 传递一个 action 给状态管理器 */}
            <button onClick={()=>{dispatch({type:'add'})}}>add</button>
            <button onClick={()=>{dispatch({type:'del'})}}>del</button>
        </div>
    )
}

export default UseReducer;
```

> 通过 useReducer 和 useContext 可以实现 redux，useReducer 创建状态管理器，useContext 将管理器传递给所有的子类（通过 useContext 传递 state 和 dispatch）

## useMemo

`useMemo` 主要用来解决使用 React hooks 产生的无用渲染的性能问题。使用 function 的形式来声明组件，失去了 `shouldCompnentUpdate` （在组件更新之前）这个生命周期，也就是说我们没有办法通过组件更新前条件来决定组件是否更新。而且在函数组件中，也不再区分 `mount` 和 `update` 两个状态，这意味着函数组件的每一次调用都会执行内部的所有逻辑，就带来了非常大的性能损耗。`useMemo` 和 `useCallback` 都是解决上述性能问题的。

`React.memo()` 是判断一个函数组件的渲染是否重复执行；

`useMemo()` 是定义一段函数逻辑是否重复执行；

`useMemo(() => fn, inputs)` 跟 `useCallback(fn, inputs)` 效果一样。

```
import React, { useMemo } from 'react';

function UseMemo() {
    // useMemo 接收两个参数，一个是 callback,第二个参数是一个数组，与 useEffect 类似
    const increase = useMemo(() => {
        if (value > 2) return value + 1;
    }, [value]);
}

export default UseMemo;
```

## useRef

- 用`useRef`获取 React JSX 中的DOM元素，获取后你就可以控制DOM的任何东西了。但是一般不建议这样来作，React界面的变化可以通过状态来控制。
- 用`useRef`来保存变量， 渲染周期之间共享数据的存储（state不能存储跨渲染周期的数据，因为state的保存会触发组件重渲染），不过这个功能不多用，因为有了 `useContext`。

> 获取 DOM 节点

```jsx
import React, { useEffect, useRef } from 'react';

function UseRef() {
    // 定义一个 ref
    const h1Ref = useRef();

    useEffect(() => {
        // 输出获取到的DOM节点
        console.log('useRef',h1Ref)
    }, [])

    return (
        <div>
            {/*保存 h1 的ref到 h1Ref */}
            <h1 ref={h1Ref}>Hello World!</h1>
        </div>
    )
}

export default UseRef;
```

