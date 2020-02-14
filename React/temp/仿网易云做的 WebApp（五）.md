---
title: 仿网易云做的 WebApp（五）
date: 2019-09-11 02:09:00
categories: React
tags:
 - CloudMusic WebApp
 - rem
 - React
 - 前端

---

- 跟着三元大佬做的一款网易云音乐的 WebApp（三元大佬电子书链接：https://sanyuan0704.github.io/react-cloud-music/）
- 主要技术栈：react hooks + redux + immutable.js + rem
- 这一章主要讲 `Recommend` 的  `scroll` 组件的开发。

<!--more-->

---

## 打造 scroll 基础组件

### 安装 better-scroll 插件

是时候来做滑动组件啦。我们用插件 `better-scroll` 来做。

官网：[https://ustbhuangyi.github.io/better-scroll/#/examples/index-view](https://ustbhuangyi.github.io/better-scroll/#/examples/index-view)

`better-scroll` 有两个版本：

```bash
npm install better-scroll -S # install 1.x
npm install better-scroll@next -S # install 2.x，该版本带有所有插件的能力。
```

这里我们安装第二个版本：

```bash
$ npm install better-scroll@next --save
```

`better-scroll` 中文文档：[https://github.com/ustbhuangyi/better-scroll/blob/master/README_zh-CN.md](https://github.com/ustbhuangyi/better-scroll/blob/master/README_zh-CN.md)

使用参考资料：[当 BetterScroll 遇见 Vue](https://zhuanlan.zhihu.com/p/27407024)

业务 `scroll` 是基础组件，所以我们去 `baseUI` 种新建一个 `scroll` 文件夹及其 `index.js` 文件。

编写 `scroll` 插件：

`baseUI/scroll/index.js` 导入文件：

```jsx
import React,{ useEffect, useState } from 'react';
import BScroll from "better-scroll";
```

`better-scroll` 的可配置参数：

```js
Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizental']),//滚动的方向
  click: true,//是否支持点击
  refresh: PropTypes.bool,//是否刷新
  onScroll: PropTypes.func,//滑动触发的回调函数
  pullUp: PropTypes.func,//上拉加载逻辑
  pullDown: PropTypes.func,//下拉加载逻辑
  pullUpLoading: PropTypes.bool,//是否显示上拉loading动画
  pullDownLoading: PropTypes.bool,//是否显示下拉loading动画
  bounceTop: PropTypes.bool,//是否支持向上吸顶
  bounceBottom: PropTypes.bool//是否支持向下吸底
};
```

好了，首先我们先来写整体组件的架构：

```jsx
import React,{ useEffect, useState, useEffect, useRef } from 'react';
import BScroll from "better-scroll";

const Scroll = forwardRef((props, ref) => {
    return (
      <ScrollContainer ref={scrollContaninerRef}>
        {props.children}
      </ScrollContainer>
    );
})

export default Scroll;
```

这里我们要用 `react Hooks`，所以要引入 `useEffect` 和 `useState`。`ScrollContainer` 是样式组件，这里还没写，只是把结构放出来。

### forwarRef

`forwardRef` 即引用传递（Ref forwading）是一种通过父组件向子组件自动传递 `引用ref` 的技术。

当父组件需要控制其子组件的 `DOM` 的时候，如果我们仅仅在父组件中，在子组件的引用上，增加属性 `ref`，那么这个 `ref` 仅仅指向的是子组件，而不能知道子组件中的 `DOM` 节点。

而在 `React16` 中，我们可以通过 `Forwarding refs` 使得在父组件中可以得到子组件中的 `DOM` 节点。

 `Forwarding refs` 中提供了一个 `React.forwardRef` 来创建组件，在 `React.forwardRef` 的方法中传递了参数 `ref`，通过这个 `ref` 可以指向具体的某一个 `dom`节点。具体的指向流程为：

父组件myRef——>React.forwardRef中的实参——>通过forwardRef方法创建的子组件中的ref——>指向子组件中的某一个dom节点：

子组件：

```js
const Child=React.forwardRef((props,ref)=>(
  <input ref={ref} />
));
```

父组件：

```js
class Father extends React.Component{
  constructor(props){
    super(props);
    this.myRef=React.createRef();
  }
  componentDidMount(){
    console.log(this.myRef.current);
  }
  render(){
    return <Child ref={this.myRef}/>
  }
}
```

通过上面的方法，父组件可以得到子组件种的 `<input />`，而如果不用这种方法，得到的会是 `child`。

这种方法经常出现在高阶组件（HOC）中。

## 编写 scoll 核心逻辑代码

### 使用 hooks

首先写入 `hooks` 变量吧，在 `scoll` 组件内写入：

```jsx
//better-scroll实例对象
const [bScroll, setBScroll] = useState();
//current指向初始化bs实例需要的DOM元素 
const scrollContaninerRef = useRef();
```

现在的组件是：

```jsx
import React,{ useEffect, useState, useEffect, useRef } from 'react';
import BScroll from "better-scroll";

const Scroll = forwardRef((props, ref) => {
    // better-scroll实例对象
    const [bScroll, setBScroll] = useState();
    // current指向初始化bs实例需要的DOM元素 
    const scrollContaninerRef = useRef();

    return (
        <ScrollContainer ref={scrollContaninerRef}>
            {props.children}
        </ScrollContainer>
    );
})

export default Scroll;
```

这里解释一下 `useRef` 好了，应该已经注意到 `const scrollContaninerRef = useRef()` 和 `ref={scrollContaninerRef}` 了。这里的 `useRef` 的作用是保存变量，它会保存 `ScrollContainer` 的 `ref` 到 `scrollContaninerRef` 中。

然后处理一下这个组件获取到的参数，在 `scoll` 组件内写入:

```jsx
const { direction, click, refresh, pullUpLoading, pullDownLoading, bounceTop, bounceBottom } = props;
const { pullUp, pullDown, onScroll } = props;
```

我们通过结构赋值的方式拿到这些参数，虽然上面已经写过了，不过我再把可配置参数拿来对照着看吧。

```jsx
Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizental']),//滚动的方向
  click: true,//是否支持点击
  refresh: PropTypes.bool,//是否刷新
  onScroll: PropTypes.func,//滑动触发的回调函数
  pullUp: PropTypes.func,//上拉加载逻辑
  pullDown: PropTypes.func,//下拉加载逻辑
  pullUpLoading: PropTypes.bool,//是否显示上拉loading动画
  pullDownLoading: PropTypes.bool,//是否显示下拉loading动画
  bounceTop: PropTypes.bool,//是否支持向上吸顶
  bounceBottom: PropTypes.bool//是否支持向下吸底
};
```

### 创建 better-scroll

接下来创建 `better-scroll`，在 `scoll` 组件内写入：

```jsx
useEffect(() => {
  const scroll = new BScroll(scrollContaninerRef.current, {
    scrollX: direction === "horizental",
    scrollY: direction === "vertical",
    probeType: 3,
    click: click,
    bounce:{
      top: bounceTop,
      bottom: bounceBottom
    }
  });
  setBScroll(scroll);
  return () => {
    setBScroll(null);
  }
}, []);	
```

定义的 BScroll 的更多内容请查阅文档：[https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/options.html](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/options.html)，在选项基础中就可以看见属性的意义了。

这里用了 `useEffect` 的方法，值得注意的是在它的内部函数中有一个 `return`，这里是我前面没有提及的。现在说明一下：

而 `useEffect` 的第二个参数就是用来限制 useEffect 解绑的：

当 `useEffect` 不传入第二个参数的时候，每次状态发生变化，都会解绑；

当传空数组[]时，就是当组件将被销毁时才进行解绑；

传入值的话，就是值变动时才会解绑。

而挂载（mount）时，会执行一次非 `return` 的内容，而不执行 `return` 的函数，当 `change` 时，会执行第一次 `return` 的内容和第二次非 `return` 的内容。

### 重写渲染时刷新实例

每次重新渲染都要刷新实例，防止无法滑动:

在 `scoll` 组件内写入：

```jsx
useEffect(() => {
  if(refresh && bScroll){
    bScroll.refresh();
  }
});
```

这里通过是否刷新 `refresh` 以及实例对象 `bScroll` 是否有内容来判断是否需要刷新。

### 给实例绑定 scroll 事件

在 `scoll` 组件内写入：

```jsx
useEffect(() => {
  if(!bScroll || !onScroll) return;
  bScroll.on('scroll', (scroll) => {
    onScroll(scroll);
  })
  return () => {
    bScroll.off('scroll');
  }
}, [onScroll, bScroll]);
```

当 `bScroll` 实例有值且同时存在滑动触发的回调函数 `onScroll` 时，执行 `onScroll`。

这里解释一下 `scroll` 的 `on` 和 `off` 好了，虽然在其文档的 `方法/通用` 中也可查。

**on(type, fn, context)**

- 参数：
  - {String} type 事件名
  - {Function} fn 回调函数
  - {context} 函数执行的上下文环境，默认是 this
- 返回值：无
- 作用：监听当前实例上的[自定义事件](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/events.html)。如：scroll, scrollEnd, pullingUp, pullingDown等。

**off(type, fn)**

- 参数：
  - {String} type 事件名
  - {Function} fn 回调函数
- 返回值：无
- 作用：移除自定义事件监听器。只会移除这个回调的监听器。

### 进行上拉到底的判断，调用上拉刷新的函数

在 `scoll` 组件内写入：

```jsx
useEffect(() => {
  if(!bScroll || !pullUp) return;
  bScroll.on('scrollEnd', () => {
    //判断是否滑动到了底部
    if(bScroll.y <= bScroll.maxScrollY + 100){
      pullUp();
    }
  });
  return () => {
    bScroll.off('scrollEnd');
  }
}, [pullUp, bScroll]);
```

同样的：当 `bScroll` 实例有值且同时存在上拉加载逻辑 `pullUp` 时，判断是否滑到了底部，若是，则执行 `pullUp`。

### 进行下拉的判断，调用下拉刷新的函数

类似的，在 `scoll` 组件内写入：

```jsx
useEffect(() => {
  if(!bScroll || !pullDown) return;
  bScroll.on('touchEnd', (pos) => {
    //判断用户的下拉动作
    if(pos.y > 50) {
      pullDown();
    }
  });
  return () => {
    bScroll.off('touchEnd');
  }
}, [pullDown, bScroll]);
```

### 给外界暴露组件方法

假设上层组件中：

```jsx
//上层组件代码
const scrollRef = useRef();
...
<Scroll ref={scrollRef}></Scroll> 
```

希望通过这种调用方法的方式刷新scroll组件：

```jsx
scrollRef.current.refresh();
```

我们使用的方案是 `React Hooks` 中的 `useImperativeHandle` 提供的解决方案：

首先导入：

```js
import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle } from "react";
```

然后在 `Scroll` 组件里面写：

```jsx
// 一般和forwardRef一起使用，ref已经在forWardRef中默认传入
useImperativeHandle(ref, () => ({
  //给外界暴露refresh方法
  refresh() {
    if(bScroll) {
      bScroll.refresh();
      bScroll.scrollTo(0, 0);
    }
  },
  //给外界暴露getBScroll方法, 提供bs实例
  getBScroll() {
    if(bScroll) {
      return bScroll;
    }
  }
}));
```

### 默认赋值

完了吗？不，我们还有一步，那就是在组件中默认赋值，这样我们这个组件才算完成：

默认赋值，在 `scoll` 组件外写入：

```jsx
Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll:null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
};
```

这样就完成了默认赋值了。

### 类型检查

上面已经把 `scoll` 组件写完了，但这个组件参数这么多，我们追求完美，不如给参数来个类型检查。

首先导入：

```js
import PropTypes from "prop-types";
```

类型检查，在 `scoll` 组件外写入：

```jsx
Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizental']),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool,//是否支持向上吸顶
  bounceBottom: PropTypes.bool//是否支持向上吸顶
};
```

### 样式组件

对了，我们这里使用了样式组件，代码如下，直接写在这个 `index.js` 中就行了：

导入：

```js
import styled from 'styled-components';
```

在组件 `scroll` 外面写：

```js
const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`
```

## 总结

```jsx
import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import BScroll from "better-scroll";
import styled from 'styled-components';

const Scroll = forwardRef((props, ref) => {
    // better-scroll实例对象
    const [bScroll, setBScroll] = useState();
    // current指向初始化bs实例需要的DOM元素 
    const scrollContaninerRef = useRef();

    // 对象结构获取参数
    const { direction, click, refresh, pullUpLoading, pullDownLoading, bounceTop, bounceBottom } = props;
    const { pullUp, pullDown, onScroll } = props;

    // 创建 better-scroll
    useEffect(() => {
        const scroll = new BScroll(scrollContaninerRef.current, {
            scrollX: direction === "horizental",  // 当设置为 true 的时候，可以开启横向滚动。当设置 eventPassthrough 为 'horizontal' 的时候，该配置无效。
            scrollY: direction === "vertical",  // 当设置为 true 的时候，可以开启纵向滚动。当设置 eventPassthrough 为 'vertical' 的时候，该配置无效。
            // 有时候我们需要知道滚动的位置。
            // 当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；
            // 当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；
            // 当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。
            // 如果没有设置该值，其默认值为 0，即不派发 scroll 事件。
            probeType: 3,
            // better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 _constructed，值为 true。
            click: click,
            // 当滚动超过边缘的时候会有一小段回弹动画。设置为 true 则开启动画。
            // 这里使用的 变量 来控制
            bounce: {
                top: bounceTop,
                bottom: bounceBottom
            }
        });
        setBScroll(scroll);
        return () => {
            setBScroll(null);
        }
    }, []);

    // 每次渲染都刷新实例，防止无法滑动
    useEffect(() => {
        if (refresh && bScroll) {
            bScroll.refresh();
        }
    });

    // 给实例绑定scroll事件
    useEffect(() => {
        if (!bScroll || !onScroll) return;
        bScroll.on('scroll', (scroll) => {
            onScroll(scroll);
        })
        return () => {
            bScroll.off('scroll');
        }
    }, [onScroll, bScroll]);

    // 进行上拉到底的判断，调用上拉刷新的函数
    useEffect(() => {
        if (!bScroll || !pullUp) return;
        bScroll.on('scrollEnd', () => {
            //判断是否滑动到了底部
            if (bScroll.y <= bScroll.maxScrollY + 100) {
                pullUp();
            }
        });
        return () => {
            bScroll.off('scrollEnd');
        }
    }, [pullUp, bScroll]);

    // 进行下拉到底的判断，调用下拉刷新的函数
    useEffect(() => {
        if (!bScroll || !pullDown) return;
        bScroll.on('touchEnd', (pos) => {
            //判断用户的下拉动作
            if (pos.y > 50) {
                pullDown();
            }
        });
        return () => {
            bScroll.off('touchEnd');
        }
    }, [pullDown, bScroll]);

    // 一般和forwardRef一起使用，ref已经在forWardRef中默认传入
    useImperativeHandle(ref, () => ({
        //给外界暴露refresh方法
        refresh() {
            if (bScroll) {
                bScroll.refresh();
                bScroll.scrollTo(0, 0);
            }
        },
        //给外界暴露getBScroll方法, 提供bs实例
        getBScroll() {
            if (bScroll) {
                return bScroll;
            }
        }
    }));

    return (
        <ScrollContainer ref={scrollContaninerRef}>
            {props.children}
        </ScrollContainer>
    );
})

// 默认赋值
Scroll.defaultProps = {
    direction: "vertical",
    click: true,
    refresh: true,
    onScroll: null,
    pullUpLoading: false,
    pullDownLoading: false,
    pullUp: null,
    pullDown: null,
    bounceTop: true,
    bounceBottom: true
};

Scroll.propTypes = {
    direction: PropTypes.oneOf(['vertical', 'horizental']),
    refresh: PropTypes.bool,
    onScroll: PropTypes.func,
    pullUp: PropTypes.func,
    pullDown: PropTypes.func,
    pullUpLoading: PropTypes.bool,
    pullDownLoading: PropTypes.bool,
    bounceTop: PropTypes.bool,//是否支持向上吸顶
    bounceBottom: PropTypes.bool//是否支持向上吸顶
};

export default Scroll;
```

## 样式中使用

到 `Recommend` 目录下的 `index.js` 中，导入 `Scroll` 组件：

```js
import Scroll from '../../baseUI/scroll';
```

函数返回的JSX代码变化如下：

```js
<Content>
  <Scroll className="list">
    <div>
      <Slider bannerList={bannerList}></Slider>
      <List recommendList={recommendList}></List>
    </div>
  </Scroll>
</Content> 
```

这里的 Content 是样式组件，因为只有一个，所以直接在当前目录下写好了：

```js
import styled from 'styled-components';

export const Content = styled.div`
  position: fixed;
  top: 2.4rem;
  bottom: 0;
  width: 100%;
  max-width: 750px;
`
```

这里解释一下，我们之前给了 `<Scroll>` 组件一个高度和宽度，都是相对于父容器 `Content` 的 `100%`。

我们滑动时，滑动的不是 `<Scroll>` 这个组件，而是它里面的内容，即 `<div>`。

然后看 `Recommend` 组件，这里我们写了个绝对定位的样式组件 `Content`，为什么呢？那是因为我们没有给我们的 `Header` 组件加绝对定位，如果不给 `Recommend` 加绝对定位的话，我们滑动时滑动的会是整个页面，但是给了 `Recommend` 一个绝对定位，它就脱离了文档流了，我们再给它一个宽和高，并设置 `top` 定好位置。这样由于 `Recommend` 脱离了文档流，有固定的宽高，所以我们才能看见滑动的功能。实际上设置 `header` 组件绝对定位也是可以的，这里就尝试一下这种方法吧。

现在打开页面，你就能体会到下拉吸顶、上拉吸底的感觉了。不过还是有一个问题，当你下拉的时候，中间会有一段空白，感觉比较突兀，因为我们图片背后的红色是通过 `SliderContainer` 中 `.before` 设置的，所以解决这个问题也很简单。

还是从遮罩入手吧，去 `SliderContainer` 中的 `.before`，它在轮播组件 `slider` 的 `style.js` 中，修改如下：

```css
.before{
  position: absolute;
  top: -8rem;
  height: 10.666667rem;
  width: 100%;
  background: ${style["theme-color"]};
}
```

如此修改即可，我们通过扩大了 `.before` 的高度，来实现填充下拉间隙的目的。

至此，我们的滑动组件就完成了。