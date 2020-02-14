---
title: 仿网易云做的 WebApp（三）
date: 2019-09-09 01:39:03
categories: React
tags:
 - CloudMusic WebApp
 - rem
 - React
 - 前端
---

- 跟着三元大佬做的一款网易云音乐的 WebApp（三元大佬电子书链接：https://sanyuan0704.github.io/react-cloud-music/）
- 主要技术栈：react hooks + redux + immutable.js + rem
- 这一章主要讲 `redux` 的使用，初步搭建 `store` 的结构。

<!--more-->

---

## redux准备

### 安装对应的依赖

```bash
$ npm install redux redux-thunk redux-immutable react-redux immutable --save
```

`redux`、`react-redux` 它们自不必说，是使用 `redux` 必备的。

`reudx-thunk` 是中间件，类似的还有 `saga`，这里我们使用的是 `thunk`。

`immutable` 是 `Facebook` 开发一个 `持久化数据结构`，它是一经创建变不可修改的数据，普遍运用于 `redux` 中。

### 创建总仓库

在 `src` 的 `store` 目录下，创建 `index.js` 和 `reducer.js`，我们写给 `reducer.js` 添加内容：

```js
import { combineReducers } from 'redux-immutable';

export default combineReducers({
    
})
```

应当注意到我们导入了 `redux-immutable` 的方法 `combineReducers`，`combineReducers` 是一个辅助函数，这一小节的标题是：**创建总仓库**。所以现在创建的这个仓库并不是用来存放某些具体的数据的，而是用来整合其他仓库的 `reducer` 的数据的，而辅助函数 `combineReducers` 就用来帮我们完成这件事。

`combineReducers` 辅助函数的作用是，把多个不同 `reducer` 函数（功能组件中的 `reducer`）作为 `value`，合并成一个最终的 `reducer` 函数（我们现在的这个`reducer`）的 `object`，然后就可以对我们现在这个 `reducer` 调用 `createStore`。

在后面会体现它的作用。

然后是 `index.js` 文件：

```js
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
))
```

应当注意到，这里使用了增强函数，在启用谷歌调试工具 `redux` 的基础上使用了中间件 `thunk`。

### 在项目中使用 store

我们去 `App.js` 中做一些修改：

```js
import React from 'react';
import { IconStyle } from './assets/iconfont/iconfont';
import { GlobalStyle } from './style';
import { HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes';
import { Provider } from 'react-redux';
import store from './store/index';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        {renderRoutes(routes)}
      </HashRouter>
    </Provider>
  );
}

export default App;
```

我们导入我们刚刚创建的仓库 `store`，然后使用 `react-redux` 的 `Provider` 方法，让我们的仓库能被所有被 `<Provider store={store}></Provider>` 的组件使用。

---

