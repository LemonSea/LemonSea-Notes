---
title: 仿网易云做的 WebApp（四）
date: 2019-09-10 02:21:00
categories: React
tags:
 - CloudMusic WebApp
 - rem
 - React
 - 前端
---

- 跟着三元大佬做的一款网易云音乐的 WebApp（三元大佬电子书链接：https://sanyuan0704.github.io/react-cloud-music/）
- 主要技术栈：react hooks + redux + immutable.js + rem
- 这一章主要讲 `Recommend` 组件的开发，涉及UI方面的轮播图、列表，`react` 项目性能优化。

<!--more-->

---

## 轮播组件开发

### Slider组件测试与使用

在 `src/application/Recommend/index.js` 中，写入如下代码：

```js
import React from 'react';
import Slider from '../../components/slider';

function Recommend(props) {

    const bannerList = [1, 2, 3, 4].map(item => {
        return { imageUrl: "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg" }
    })

    return (
        <div>
            <Slider bannerList={bannerList}></Slider>
        </div>
    )
}

export default React.memo(Recommend);
```

我们在这里导入了我们的轮播图组件 `Slider` 并使用了它，当然这个组件我们还没写。

我们创建了一个数组 `bannerList`，用来模拟获取的数据，通过属性的方式传递给了 `Slider` 组件。

然后我们去 `src/components` 下新建一个 `slilder` 目录及其 `index.js` 文件夹：

```js
import React from 'react';

function Slider(props) {
    const { bannerList } = props

    return (
        <div>
            {
                bannerList.map((slider, index) => {
                    return (
                        <img key={index} src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
                    );
                })
            }
        </div>
    )
}

export default React.memo(Slider)
```

上面我们通过对象解构的方式获得了传递过来的数据 `bannerList`，然后使用这个数据创建了四个 `img` 标签，此时启动服务，在 `Recommend` 中可以看见四张图，如此我们的 `Slider` 组件可以正常使用。下面我们开始真正地编写一个轮播图组件吧。

### 使用 swiper 插件制作轮播图

#### 安装 swiper 并使用 react Hooks

首先安装 swiper 插件：

```bash
$ npm install swiper --save
```

在 `index.js` 中引入安装的 `swiper` 插件：

```js
import React,{ useEffect, useState } from 'react';
import "swiper/dist/css/swiper.css"
import Swiper from 'swiper';
```

这个项目是使用 `react Hooks` 进行开发的，所以我们同时引入了 `react Hooks` 开发必备的 `useEffect` 和 `useState`。

先利用 `react Hooks` 改写我们的组件：

```jsx
import React, { useEffect, useState } from 'react';
import "swiper/dist/css/swiper.css"
import Swiper from 'swiper';

function Slider(props) {
    const [sliderSwiper, setSliderSwiper] = useState(null);
    const { bannerList } = props

    useEffect(() => {

    })
    return (
        <div>
            {
                bannerList.map((slider, index) => {
                    return (
                        <img key={index} src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
                    );
                })
            }
        </div>
    )
}

export default React.memo(Slider)
```

上面的代码就是通过 `react Hooks` 的方法改写的。

`const [sliderSwiper, setSliderSwiper] = useState(null)` 在 `react Hooks` 中用来定义变量。

上面我们定义了变量 `sliderSwiper`，我们会通过 `setSliderSwiper` 来修改变量 `sliderSwiper`，这里的 `setSliderSwiper` 不需要我们自己写方法，它被自动定义，类似`setState`。`useState(null)` 的参数是定义的 `sliderSwiper` 的初始值，这里我们把初始值设定为空。

其中 `useEffect` 是类似于 `componentDidMount` 和 `componentDidUpdate` 的函数，会在组件第一次挂载或更新时被调用，理所当然的，我们一般会在这里优化我们的渲染。下面我们会用到。

#### 使用 swiper

`useEffect`  的第一个参数是一个方法。第二个参数是一个数组，数组中可以写入很多状态对应的变量。

当不写第二个参数时，每次状态发生变化，都会执行内部方法，包括 `mount` 和 `update`。

传入值时，当值发生变化时，我们才会执行内部方法。

当传空数组 `[]` 时，只会在组件 `mount` 时执行内部方法。

先看看 `swiper` 插件的使用结构，大家可以查阅 `swiper` 的 [api](https://www.swiper.com.cn/api/index.html)：我们在 `react Hooks` 中这样写：

```jsx
const [sliderSwiper, setSliderSwiper] = useState(null);
const { bannerList } = props;

useEffect(() => {
	if (bannerList.length && !sliderSwiper) {
    	let sliderSwiper = new Swiper(".slider-container", {
         	loop: true,  // 开启环路
            autoplay: true,  // 开启自动播放（默认3000ms）
            autoplayDisableOnInteraction: false,  // 用户操作swiper后，是否停止autoplay。
            pagination: { el: '.swiper-pagination' },  // 使用分页器导航
        });
        setSliderSwiper(sliderSwiper);
    }
}, [bannerList.length, sliderSwiper]);
  
  return (
    <div>
      <div className="slider-container">
        <div className="swiper-wrapper">
      		<div className="swiper-slide">{/* 图片展示 */}</div>
        </div>
        <div className="swiper-pagination"></div>
      </div> 
    </div>
  );
}
```

上面的 `bannerList` 是我们接收的图片数据，`sliderSwiper` 是我们定义的一个变量，通过 `setSliderSwiper` 对 `sliderSwiper` 进行修改，这正是 `react Hooks` 的语法。我们把 `new Swiper` 写在 `useEffect` 里面，给 `useEffect` 的第二个参数传入两个值：`bannerList.length` 和 `sliderSwiper`，除了挂载时（`mount`），只有当`bannerList.length` 或 `sliderSwiper` 变化（`update`）时才执行 `useEffect` 的内部方法。

所以，现在我们的 `index.js` 文件就变成了：

```jsx
import React, { useEffect, useState } from 'react';
import "swiper/dist/css/swiper.css"
import Swiper from 'swiper';
import { SliderContainer } from './style';

function Slider(props) {
    const [sliderSwiper, setSliderSwiper] = useState(null);
    const { bannerList } = props;

    useEffect(() => {
        if (bannerList.length && !sliderSwiper) {
            let sliderSwiper = new Swiper(".slider-container", {
                loop: true,  // 开启环路
                autoplay: {
                    delay: 3000,  // 自动播放（3000ms）
                    stopOnLastSlide: false,  // 图片在最后一张时回到第一张继续播放
                    disableOnInteraction: false,  // 用户操作后不会停止自动播放
                },
                pagination: { el: '.swiper-pagination' },  // 使用分页器导航
            });
            setSliderSwiper(sliderSwiper);
        }
    }, [bannerList.length, sliderSwiper]);

    return (
        <SliderContainer>
            <div className="slider-container">
                <div className="swiper-wrapper">
                    {/* 图片展示 */}
                    {
                        bannerList.map((slider, index) => {
                            return (
                                <div key={index} className="swiper-slide">
                                    <img src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
                                </div>
                                
                            );
                        })
                    }
                </div>
                {/* 分页器。如果放置在swiper-container外面，需要自定义样式。 */}
                <div className="swiper-pagination"></div>
            </div>
        </SliderContainer>
    );
}

export default React.memo(Slider)
```

我们现在就可以看到轮播图的效果了，不过现在轮播图的样式还有问题，所以我们调节一下轮播图的样式。

#### 调节 swiper 样式

因为整个 `swiper` 都放在了外面的样式组件 `SliderContainer` 中，所以去 `style.js` 中写样式吧：

首先导入文件：

```js
import styled from 'styled-components';
import style from '../../assets/global-style';
```

定义 `SliderContainer` 的整体样式：

```js
export const SliderContainer = styled.div`
    position: relative;
    box-sizing: border-box;
    width: 100%;
`;
```

定义 `slider-container` 的样式：

```js
export const SliderContainer = styled.div`
    .slider-container{
        position: relative;
        width: 98%;
        overflow: hidden;
        margin:auto;
        border-radius: .16rem;
    }
`;
```

overflow 很重要！！！

定义分页器导航样式：

```js
export const SliderContainer = styled.div`
    .swiper-pagination-bullet-active{
      background: ${style["theme-color"]};
    }
`;
```

就是换了一个颜色……

然后发现图片背后还应该有个背景，外面在 `SliderContainer` 里面添加一个 `div`：`<div className="before"></div>`，则现在的 `SliderContainer` 是：

```jsx
<SliderContainer>
    <div className="before"></div>
      <div className="slider-container">
        <div className="swiper-wrapper">
          {
            bannerList.map(slider => {
              return (
                <div className="swiper-slide" key={slider.imageUrl}>
                  <div className="slider-nav">
                    <img src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
                  </div>
                </div>
              );
            })
          }
        </div>
        <div className="swiper-pagination"></div>
      </div> 
    </SliderContainer>
```

#### 总结

`components/slider/index.js：`

```jsx
import React, { useEffect, useState } from 'react';
import { SliderContainer } from './style';
import "swiper/dist/css/swiper.css";
import Swiper from "swiper";

function Slider(props) {
    const [sliderSwiper, setSliderSwiper] = useState(null);
    const { bannerList } = props;

    useEffect(() => {
        if (bannerList.length && !sliderSwiper) {
            let sliderSwiper = new Swiper(".slider-container", {
                loop: true,  // 开启环路
                autoplay: {
                    delay: 3000,  // 自动播放（3000ms）
                    stopOnLastSlide: false,  // 图片在最后一张时回到第一张继续播放
                    disableOnInteraction: false,  // 用户操作后不会停止自动播放
                },
                pagination: { el: '.swiper-pagination', type: 'bullets', },  // 使用分页器导航
            });
            setSliderSwiper(sliderSwiper);
        }
    }, [bannerList.length, sliderSwiper]);

    return (
        <SliderContainer>
            <div className="before"></div>
            <div className="slider-container">
                <div className="swiper-wrapper">
                    {/* 图片展示 */}
                    {
                        bannerList.map((slider, index) => {
                            return (
                                <div key={index} className="swiper-slide">
                                    <img src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
                                </div>

                            );
                        })
                    }
                </div>
                {/* 分页器。如果放置在swiper-container外面，需要自定义样式。 */}
                <div className="swiper-pagination"></div>
            </div>
        </SliderContainer>
    );
}

export default React.memo(Slider)
```

`components/slider/style.js：`

```js
import styled from 'styled-components';
import style from '../../assets/global-style';

export const SliderContainer = styled.div`
    position: relative;
    box-sizing: border-box;
    width: 100%;
    
    .before{
    position: absolute;
    top: 0;
    height: 60%;
    width: 100%;
    background: ${style["theme-color"]};
  }
    .slider-container{
        position: relative;
        width: 98%;
        overflow: hidden;
        margin:auto;
        border-radius: .16rem;
    }

    .swiper-pagination-bullet-active{
      background: ${style["theme-color"]};
    }
`;
```

---

## 推荐列表的开发

### RecommendList 组件测试与使用

在 `recommend` 组件中，导入 `List` 组件：

```js
import List from '../../components/list';
```

使用 `List` 组件：

```js
return (
        <div>
            <Slider bannerList={bannerList}></Slider>
            <List recommendList={recommendList}></List>
        </div>
    )
```

然后我们去 `src/components` 下新建一个 `list` 文件夹及其 `index.js` 文件夹：

```js
import React from 'react';

function RecommendList(props) {
    const { recommendList } = props
    return (
        <div>
            {
                recommendList.map((item, index) => {
                    return (
                        <img key={index} src={item.picUrl} alt={item.name} />
                    )
                })
            }
        </div>
    )
}

export default React.memo(RecommendList)
```

如你所见，因为这里没有涉及到业务，所以使用的是无状态组件。

现在启动服务就可以看见我们获取到的数据了。

### RecommendList 组件样式布局

既然已经可以拿到数据了，就开始做样式和布局吧。同样的在当前目录下创建 `style.js`，在里面写样式组件并在 `index.js` 中导入：

```js
import {
    ListWrapper,
    List,
    ListItem,
} from './style';
```

使用：

```js
<ListWrapper>
            <ListTitle>
                <div className='title'>推荐歌单</div>
                <div className='tag'>歌单广场</div>
            </ListTitle>
            <List>
                {
                    recommendList.map((item, index) => {
                        return (
                            <ListItem>
                                <img key={index} src={item.picUrl} alt={item.name} />
                            </ListItem>
                        )
                    })
                }
            </List>
</ListWrapper>
```

上面我分了三个样式组件，首先是整体的 `ListWraper`，头部 `ListTitle`，然后是 `List`，它包含众多的 `ListItem`，每一个 `ListItem` 都是一份数据。

对此的样式 `style.js` 是：

```js
import styled from 'styled-components';
import style from '../../assets/global-style';

export const ListWrapper = styled.div`
    position: relative;
    width: 100%;
`
export const ListTitle = styled.div`
    overflow: hidden;
    line-height: 1.066667rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .title {
        font-size: .373333rem;
        font-weight: 700;
        padding-left: .16rem;
    }
    .tag {
        height: .266667rem;
        font-size: .266667rem;
        font-weight: 600;
        padding: .053333rem .16rem;
        margin-right: .16rem;
        line-height: .266667rem;
        color: #444;
        border: .026667rem solid rgb(211, 210, 210);
        border-radius: .213333rem;
    }
`

export const List = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`

export const ListItem = styled.div`
    box-sizing: border-box;
    flex: 33.33%;
    padding: 0 .16rem .16rem .16rem;
    img {
        width: 100%;
    }
`
```



然后在做 `ListItem` 的布局样式：

`index.js：`

```jsx
<ListItem key={item.id}>
	<div className="img_wrapper">
    	<div className="decorate"></div>
    	{/* 加此参数可以减小请求的图片资源大小 */}
        <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music" />
        <div className="play_count">
			<i className="iconfont play">&#xe885;</i>
			<span className="count">{item.playCount}</span>
		</div>
	</div>
	<div className="desc">{item.name}</div>
</ListItem>
```

`styles.js：`

```js
export const ListItem = styled.div`
    position: relative;
    width: 32%;
    .img_wrapper{
        .decorate {
            position: absolute;
            top: 0;
            width: 100%;
            height: .933333rem;
            border-radius: .08rem;
            background: linear-gradient(hsla(0,0%,43%,.4),hsla(0,0%,100%,0));
        }
        position: relative;
        height: 0;
        padding-bottom: 100%;
        .play_count {
            position: absolute;
            right: .053333rem;
            top: .053333rem;
            font-size: .32rem;
            line-height: .4rem;
            color: ${style["font-color-light"]};
            .play{
                font-size: .426667rem;
                vertical-align: top;
            }
        }
        img {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: .08rem;
        }
  }
  .desc {
        overflow: hidden;
        margin-top: .053333rem;
        padding: 0 .053333rem;
        height: 1.333333rem;
        text-align: left;
        font-size: .32rem;
        line-height: 1.4;
        color: ${style["font-color-desc"]};
    }
`
```

### 封装工具函数

如今已经可以看到样式了，但是有一个小细节：听过人数现在不好看，最好能用带单位的方式呈现，所以我们要封装一个用来计算的函数，我们在 `src/api` 下面新建一个 `utils.js` 文件，里面放这个工具函数：

```js
export const getCount = (count) => {
    if (count < 0) return;
    if (count < 10000) {
        return count;
    } else if (Math.floor(count / 10000) < 10000) {
        return Math.floor(count / 1000) / 10 + "万";
    } else {
        return Math.floor(count / 10000000) / 10 + "亿";
    }
}
```

然后在 index.js 中引用它：

```js
import { getCount } from "../../api/utils";
```

使用它进行计算：

```jsx
<span className="count">{getCount(item.playCount)}</span>
```

### 小细节

在 `ListItem` 中 `img` 标签的上方，有个这个：`<div className="decorate"></div>`

对应的 `style.js` 样式：

```js
.decorate {
  position: absolute;
  top: 0;
  width: 100%;
  height: 35px;
  border-radius: 3px;
  background: linear-gradient(hsla(0,0%,43%,.4),hsla(0,0%,100%,0));
}
```

三元大佬原文：它的作用就是给给图片上的图标和文字提供一个遮罩，因为在字体颜色是白色，在面对白色图片背景的时候，文字会看不清或者看不到，因此提供一个阴影来衬托出文字，这个细节很容易被忽略, 希望大家也能注意一下。

这个细节很到位啊，这里就提升了用户体验，学到了。

### 总结

`components/list/index.js：`

```jsx
import React from 'react';
import {
    ListWrapper,
    List,
    ListTitle,
    ListItem,
} from './style';
import { getCount } from "../../api/utils";

function RecommendList(props) {
    const { recommendList } = props
    return (
        <ListWrapper>
            <ListTitle>
                <div className='title'>推荐歌单</div>
                <div className='tag'>歌单广场</div>
            </ListTitle>
            <List>
                {
                    recommendList.map((item, index) => {
                        return (
                            <ListItem key={item.id}>
                                <div className="img_wrapper">
                                    <div className="decorate"></div>
                                    {/* 加此参数可以减小请求的图片资源大小 */}
                                    <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music" />
                                    <div className="play_count">
                                        <i className="iconfont play">&#xe885;</i>
                                        <span className="count">{getCount(item.playCount)}</span>
                                    </div>
                                </div>
                                <div className="desc">{item.name}</div>
                            </ListItem>
                        )
                    })
                }
            </List>
        </ListWrapper>
    )
}

export default React.memo(RecommendList)
```

`components/list/style.js：`

```js
import styled from 'styled-components';
import style from '../../assets/global-style';

export const ListWrapper = styled.div`
    position: relative;
    width: 100%;
`
export const ListTitle = styled.div`
    overflow: hidden;
    line-height: 1.066667rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .title {
        font-size: .373333rem;
        font-weight: 700;
        padding-left: .16rem;
    }
    .tag {
        height: .266667rem;
        font-size: .266667rem;
        font-weight: 600;
        padding: .053333rem .16rem;
        margin-right: .16rem;
        line-height: .266667rem;
        color: #444;
        border: .026667rem solid rgb(211, 210, 210);
        border-radius: .213333rem;
    }
`

export const List = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
`

export const ListItem = styled.div`
    position: relative;
    width: 32%;
    .img_wrapper{
        .decorate {
            position: absolute;
            top: 0;
            width: 100%;
            height: .933333rem;
            border-radius: .08rem;
            background: linear-gradient(hsla(0,0%,43%,.4),hsla(0,0%,100%,0));
        }
        position: relative;
        height: 0;
        padding-bottom: 100%;
        .play_count {
            position: absolute;
            right: .053333rem;
            top: .053333rem;
            font-size: .32rem;
            line-height: .4rem;
            color: ${style["font-color-light"]};
            .play{
                font-size: .426667rem;
                vertical-align: top;
            }
        }
        img {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: .08rem;
        }
  }
  .desc {
        overflow: hidden;
        margin-top: .053333rem;
        padding: 0 .053333rem;
        height: 1.333333rem;
        text-align: left;
        font-size: .32rem;
        line-height: 1.4;
        color: ${style["font-color-desc"]};
    }
`
```

