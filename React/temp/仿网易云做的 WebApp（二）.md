---
title: 仿网易云做的 WebApp（二）.md
date: 2019-09-09 00:12:31
categories: React
tags:
 - CloudMusic WebApp
 - rem
 - React
 - 前端

---

- 跟着三元大佬做的一款网易云音乐的 WebApp（三元大佬电子书链接：https://sanyuan0704.github.io/react-cloud-music/）
- 主要技术栈：react hooks + redux + immutable.js + rem
- 这一章主要讲 `Home` 组件的开发与 `rem` 布局

<!--more-->

---

## 全局样式准备

三元大佬用的是 `px` 布局，这里我准备改一下，用 `rem` 布局。

### 使用 `flexible.js`

安装：

```bash
$ npm i lib-flexible --save 
```

使用：

在 `src` 的 `App.js` 中导入 `flexible`：

```js
import 'lib-flexible'
```

### 书写全局样式

我们先去 `assets` 目录下新建 `global-style.js` 文件，内容如下：

```js
// 这里定义的全局的通用属性

// 扩大可点击区域
const extendClick = () => {
    return`
        position: relative;
        &:before {
            content: '';
            position: absolute;
            top: -.266667rem;
            bottom: -.266667rem;
            left: -.266667rem;
            right: -.266667rem;
        }
    `
}

// 一行文字溢出部分用 …… 代替
const noWrap = () => {
    return`
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    `
}

export default {
    'theme-color': '#d44439',  // 主题颜色——网易云红
    'theme-color-shadow': 'rgba(212, 68, 57, .5)',  // 主题颜色——暗色
    'font-color-light': '#f1f1f1',  // 字体颜色——高亮灰白色
    'font-color-desc': '#2E3030',  // 字体颜色——黑灰色
    'font-color-desc-v2': '#bba8a8',  // 字体颜色——带红色的深灰色
    'font-size-ss': '10px',  // 字体大小——极小
    'font-size-s': '12px',  // 字体大小——小
    'font-size-m': '14px',  // 字体大小——正常
    'font-size-l': '16px',  // 字体大小——大
    'font-size-ll': '18px',  // 字体大小——极大
    'border-color': '#e4e4e4',  // 边框颜色——白灰色
    'background-color': '#f2f3f4',  // 背景颜色——银灰色
    'background-color-shadow': 'rgba(0, 0, 0, 0.3)',  // 背景颜色——深灰黑色
    'hightlight-background-color': '#fff',  // 背景颜色——白色
    extendClick,
    noWrap
}
```

上面注释掉的是三元大佬的代码，我用的 `rem` 重写了一份，这里我假设设计稿是 `750px`，而我使用了 `flexible.js` 来做适配，因为 `flexible.js` 是把设备划分为 `10份`，所有我这边 `1rem` 为 `75px`。可以使用 `cssrem` 这个插件来帮助我们进行计算，只要记得把 `Cssrem: Root Font Size` 的大小设置为 `75` 就好了。具体的原因请自行百度。：）

值得注意的是我们这里的字体大小并没有使用 `rem`，依然使用的是 `px`。但是我们使用的图标需要使用 `rem`，这里可能不会被注意到，因为我们不希望字体随屏幕变化，但是图标我们希望它是自适应的。上面没有用到图标，下面这一小节就展示了图标用 `rem` 而字体用 `px`。

---

## 顶部栏开发

### 书写顶部栏样式

我们使用 `styled-components` 来做组件：

```js
import styled from 'styled-components';
import style from '../../assets/global-style';

export const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 10px;
  background: ${style["theme-color"]};
  &>span {
    line-height: 1.066667rem;
    color: #f1f1f1;
    font-size: 20px;
    &.iconfont {
      font-size: .666667rem;
    }
  }
`
```

你应该注意到了，这里我们导入了全局样式 `global-style`，并使用里面预先设定好的颜色：`theme-color`，这正是 `styled-components` 的优点，它和 `less` 一样，允许我们使用变量，而这里我们是用 `js` 语法写的，所以变量的使用方法是：`${style["theme-color"]}`，这里是对象解构的写法。

### 使用样式组件

```js
//src/appliction/Home/index.js
import React from 'react';
import { renderRoutes } from "react-router-config";
import { Top } from './style';

function Home(props) {
  const { route } = props;

  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">WebApp</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>
      { renderRoutes(route.routes) }
    </div>
  )
}

export default React.memo(Home);
```

现在就启动服务，就可以看见效果了。

---

## Tab栏开发

### 书写Tab栏样式

同样的，我们使用 `styled-components` 来写样式组件。

- 我们先写整体的包含快 `Tab`：

```js

export const Tab = styled.div`
  height: 1.066667rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${style['theme-color']};
`;
```

现在我们定义了 `Tag` 的高，因为它里面有三个子元素，所有我们使用 `flex` 布局，给 `Tag` 一个背景颜色。

- 之后写里面的三个小组件的样式：

```js
export const TabItem = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
```

- 现在的 `Tag` 组件：

```js
<Tab>
    <TabItem><span>推荐</span></TabItem>
    <TabItem><span>歌手</span></TabItem>
    <TabItem><span>排行榜</span></TabItem>
</Tab>
```

- 运用路由：

导入 ```react-router-dom```：

```js
import { NavLink } from 'react-router-dom';//利用NavLink组件进行路由跳转
```

现在的 `Tag` 组件：

```js
<Tab>
        <NavLink to="/recommend" activeClassName="selected"><TabItem><span>推荐</span></TabItem></NavLink>
        <NavLink to="/singers" activeClassName="selected"><TabItem><span>歌手</span></TabItem></NavLink>
        <NavLink to="/rank" activeClassName="selected"><TabItem><span>排行榜</span></TabItem></NavLink>
</Tab>
```

- 更新 `Tab` 样式：

使用 `<NavLink></NavLink>` 组件，会变成 `a` 标签，所有我们修改后的样式是：

```js

export const Tab = styled.div`
  height: 1.066667rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${style['theme-color']};
  a {
    flex: 1;
    padding: .053333rem 0;
    font-size: .373333rem;
    color: #e4e4e4;
    &.selected {
      span {
        padding: .08rem 0;
        font-weight: 700;
        color: #f1f1f1;
        border-bottom: .053333rem solid #f1f1f1;
      }
    }
  }
`;
```

注意到 `a` 同级的样式 `selected`，这个样式使用了 `activeClassName`，这个方法会在处于当前路由时，自动添加里面写的样式，所以上面我们给三个 `<NavLink></NavLink>` 都写了 `activeClassName="selected"`，这样当我们选中哪一个路由时，哪一个路由就有了 `selected` 的样式。

还应当这样 `selected` 样式是添加到 `a` 标签上的，所以我们在 `a` 的样式中使用的是 `&`，表示同级的关系。

现在应当可以展示结果，并通过点击实现路由的切换效果了。