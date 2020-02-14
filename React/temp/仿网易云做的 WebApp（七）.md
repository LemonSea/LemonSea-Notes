---
title: 仿网易云做的 WebApp（七）
date: 2019-09-13 02:09:00
categories: React
tags:
 - CloudMusic WebApp
 - rem
 - React
 - 前端



---

- 跟着三元大佬做的一款网易云音乐的 WebApp（三元大佬电子书链接：https://sanyuan0704.github.io/react-cloud-music/）
- 主要技术栈：react hooks + redux + immutable.js + rem
- 这一章主要讲 `Recommend` 的性能优化：图片懒加载，与 `Loading` 动画。

<!--more-->

## 图片懒加载

### 视口内图片加载

我们使用一个成熟的图片懒加载库：`react-lazyload` 来做我们的图片懒加载。

安装：

```bash
$ npm install react-lazyload --save
```

在需要使用的地方导入它，这里我们是在 `components/list/index.js` 中导入的：

```js
import LazyLoad from "react-lazyload";
```

这里懒加载的原理是：在大量图片加载的情况下，会造成页面空白甚至卡顿，然而我们的视口就这么大，因此只需要让视口内的图片显示即可，同时图片未显示的时候给它一个默认的src，让一张非常精简的图片占位。这就是图片懒加载的原理。

所以，我们对 `img` 标签进行改造：

```js
//img标签外部包裹一层LazyLoad
<LazyLoad placeholder={<img width="100%" height="100%" src={require('./music.png')} alt="music"/>}>
  <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music"/>
</LazyLoad>
```

我们给 `img` 外面包裹了一层 `LazyLoad`，它会有一个占位图片 `music.png`，这个图片可以去相应分支拿。

现在我们做到了视口内的图片显示真实资源，视口外则显示占位图片。接下来要解决的就是当我们滑动时，记载新进入视口的图片。

### 滑动加载图片

这个懒加载库提供了一个滑动加载图片的方法：`forceCheck`，只需要在 `Recommend/index.js` 中使用它就行了：

给 `Scroll` 组件的 `onScroll` 传入 `forceCheck`：

```js
<Scroll className="list" onScroll={forceCheck}>
```

这里的 `onScroll` 是我们之前写 `Scroll` 组件就预设好了的方法。

至此，图片懒加载完成。

## 进场loading效果

### 制作动画效果

Ajax请求往往需要一定的时间，在这个时间内，页面会处于没有数据的状态，也就是空白状态，但是用户点击来的时候看见一片空白的时候心里是非常焦灼的，尤其是Ajax的请求时间长达几秒的时候，而loading效果便能减缓这种焦急的情绪，并且如果loading动画做的漂亮，还能够让人赏心悦目，让用户对App产生好感。

这个 `Loading` 动画，主要是利用了CSS3的animation-lay特性，让两个圆交错变化，产生一个涟漪的效果：

```js
import React from 'react';
import styled,{ keyframes } from 'styled-components';
import style from '../../assets/global-style';

const loading = keyframes`
    0%,100% {
        transform: scale(0.0);
    }
    50% {
        transform: scale(1.0);
    }
`
const LoadingWrapper = styled.div`
    >div {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 1.6rem;
        height: 1.6rem;
        /* 不透明级 */
        opacity: 0.6;
        border-radius: 50%;
        background-color: ${style["theme-color"]};
        animation: ${loading} 1.4s infinite ease-in;
    }
    >div:nth-child(2) {
        /* 定义动画何时开始 */
        animation-delay: -0.7s;
    }
`;

function Loading() {
    return (
        <LoadingWrapper>
            <div></div>
            <div></div>
        </LoadingWrapper>
    );
}

export default React.memo(Loading)
```

在 `Recommend` 组件中使用它：

```js
import Loading from '../../baseUI/loading/index';

//在返回的JSX代码中
<Content>
  ...
  <Loading></Loading>
<Content>
```

此时可以看见一个涟漪在屏幕中间跳动。

### 添加Loading的控制逻辑

现在 `Loading` 的动画效果一直都在，但我们要让它随我们的需求来出现和隐藏。我们在 `Recommend` 的 `redux` 中加一个控制器：

```bash
const defaultState = fromJS({
  ...
  enterLoading: true
});
```

然后在 `constants.js` 中添加常量：

```js
//constants.js
...
export const CHANGE_ENTER_LOADING = 'recommend/CHANGE_ENTER_LOADING';
```

在 `actionCreators.js` 中添加 `action` 以及修改 `getRecommendList`：

```js
//actionCreators.js
...
export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
});
//另外在获取推荐歌单后，应把loading状态改为false
export const getRecommendList = () => {
  return (dispatch) => {
    getRecommendListRequest().then(data => {
      dispatch(changeRecommendList(data.result));
      dispatch(changeEnterLoading(false));//改变loading
    }).catch(() => {
      console.log("推荐歌单数据传输错误");
    });
  }
};
```

返回去给 `reducer` 添加一个逻辑：

```js
case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.data);
```

最后在 `Recommend/index.js` 中使用：

```js
//recommend/index.js
const { bannerList, recommendList, enterLoading } = props;

//返回的JSX代码中应用它
<Content>
  ...
  { enterLoading ? <Loading></Loading> : null }
<Content>
  
// 获取数据
const mapStateToProps = (state) => ({
  ...
  enterLoading: state.getIn(['recommend', 'enterLoading'])
});

```

至此，`Loading` 动画完成。

## Redux数据缓存

问题:其实还有一个细节需要我们来优化，就是你现在切换到歌手页面，然后切回到推荐页，你在浏览器的Network中会看到又发了两次网络请求，而这两次请求是完全没有必要的，纯属浪费性能。

那如何来优化呢？根据我们这个项目的特点，利用Redux的数据来进行页面缓存成本最低，是不二之选。

其实操作起来也是非常简单的, 只需要做一些小小的改动：修改一下 `Recommend/index.js` 界面的 `useEffect`:

```js
//Recommend/index.js
useEffect(() => {
  // 如果页面有数据，则不发请求
  // immutable数据结构中长度属性size
  if(!bannerList.size){
    getBannerDataDispatch();
  }
  if(!recommendList.size){
    getRecommendListDataDispatch();
  }
  // eslint-disable-next-line
}, []);
```

我们加了一个判断，如果如果页面有数据，则不发请求。

至此，我们的 Recommend 组件就彻底完成了。