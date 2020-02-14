---
title: 仿网易云做的 WebApp（六）
date: 2019-09-12 02:09:00
categories: React
tags:
 - CloudMusic WebApp
 - rem
 - React
 - 前端


---

- 跟着三元大佬做的一款网易云音乐的 WebApp（三元大佬电子书链接：https://sanyuan0704.github.io/react-cloud-music/）
- 主要技术栈：react hooks + redux + immutable.js + rem
- 这一章主要讲 `axios` 与 `redux` 的数据层开发。

<!--more-->

---

## axios 封装请求

### 安装 axios

```bash
$ npm install axios --save
```

因为这个项目用的是被人写的 `node.js` 项目提供 `api`，所以先去 `GitHub` 上面 `clone` 这个项目：[GitHub网易云音乐接口](https://github.com/Binaryify/NeteaseCloudMusicApi/tree/master)，然后把它运行在其他端口上，保证不和当前前端服务端口冲突。

### 配置 axios

关于 `api` 的调用我们写在 `api` 文件夹里，在这个文件夹下面创建 `config.js` 文件，里面编写 `axios` 的配置:

```js
import axios from 'axios';

export const baseUrl = 'http://localhost:4000';

// 创建axios的实例
const axiosInstance = axios.create({
  baseURL: baseUrl
});

// 响应拦截器【响应拦截器的作用是在接收到响应后进行一些操作】
axiosInstance.interceptors.response.use(
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  res => res.data,
  // 服务器状态码不是2开头的的情况
  err => {
    console.log(err, "网络错误");
  }
);

export {
  axiosInstance
};
```

这个是 axios 的实例配置，它会在所有请求前方加上 `http://localhost:3300`，即让所有数据从这个端口号请求。

本来还应该有下面的配置的：

```jsx
timeout: 5000， // request timeout  设置请求超时时间
responseType: "json",
withCredentials: true, // 是否允许带cookie这些
headers: {
  "Content-Type": "application/json;charset=utf-8"
}
```

响应拦截器很好理解，就是服务器返回给我们的数据，我们在拿到之前可以对他进行一些处理。例如：如果后台返回的状态码是2开头的，则正常返回数据。

### 封装不同的网络请求

在 `api` 文件夹下创建 `request.js` 文件，这个文件就封装不同的网络请求：

```js
import { axiosInstance } from "./config";

export const getBannerRequest = () => {
  return axiosInstance.get('/banner');
}

export const getRecommendListRequest = () => {
  return axiosInstance.get('/personalized');
}
```

这里封装了需要的两个接口，到时候直接调这些函数即可。

## reudx 开发

在 `Recommend` 目录下，新建 `store` 文件夹，然后新建以下文件：

```text
actionCreators.js // 放不同action的地方
constants.js      // 常量集合，存放不同action的type值
index.js          // 用来导出reducer，action
reducer.js        // 存放initialState和reducer函数
```

这是很自然的分离，如果用 `rudex` 的话，一般都会选择这样创建 `reudx` 结构。

这里是创建的 `Recommend` 组件的 `store`，然后我们会把它整合到整体的 `store` 中，即 `src` 的 `store` 中。

### 初始化 reducer：

在 `Recommend` 的 `store/reducer.js` 中写入如下代码，这就是一开始的 `reducer` 文件的内容：

```js
// 获取常量
import * as actionTypes from './constants';
// 导入 immutable 的 frmoJS 方法
import { fromJS } from 'immutable';

// 这里用到fromJS把JS数据结构转化成immutable数据结构
const defaultState = fromJS({
});

export default (state = defaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}
```

理所当然，此时的 `constants.js` 和 `actionCreators.js` 中还没有任何的内容。

### 链接到主仓库

既然定义了 `reducer`，就需要把它链接到主仓库 `src/store/reducer.js` 中去，我们这里使用 `Recommend/store/index.js` 文件来做导出，在里面写入下面的代码：

```js
// 导入仓库
import reducer from './reducer'
// 导入变量
import * as actionCreators from './actionCreators'

// 导出变量
export { reducer, actionCreators };
```

然后去  `src/reducer.js` 中导入 `Recommend/store/reducer/js` 并合并：

```js
// 合并 reducer 函数
import { combineReducers } from 'redux-immutable';
// 导入分仓库的 reducer
import { reducer as recommendReducer } from '../application/Recommend/store/index';

// 合并 reducer 函数为一个 obj
export default combineReducers({
    recommend: recommendReducer,
})
```

### 使用 connect

去 `Recommend/index.js` 中导入

```js
// 负责将 ui 组件包装成容器组件
import { connect } from "react-redux";
// 导入常量
import * as actionCreaters from './store/actionCreators';
```

connect 的使用方法是：

```js
// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => {

}
// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => {

}
// 将ui组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend))
```

### 修改 reducer

首先是在 `Recommend/store/reducer.js` 中创建 `bannerList` 和 `recommendList`：

```js
// 获取常量
import * as actionTypes from './constants';
// 导入 immutable 的 frmoJS 方法
import { fromJS } from 'immutable';

// 这里用到fromJS把JS数据结构转化成immutable数据结构
const defaultState = fromJS({
    bannerList: [],
    recommendList: [],
});

export default (state = defaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}
```

然后在 `constants` 中定义常量：

```js
//constants.js
export const CHANGE_BANNER = 'recommend/CHANGE_BANNER';

export const CHANGE_RECOMMEND_LIST = 'recommend/RECOMMEND_LIST';
```

再重新定义 `reducer` 函数：

```js
export default (state = defaultState, action) => {
  switch(action.type) {
    case actionTypes.CHANGE_BANNER:
      return state.set('bannerList', action.data);
    case actionTypes.CHANGE_RECOMMEND_LIST:
      return state.set('recommendList', action.data);
    default:
      return state;
  }
}
```

### index 中获取 redux 的数据

去 `Recommend/index.js` 中修改，我们先把之前的 `mock` 的数据删除了，换上重 `redux` 中获取的数据：

这里就需要使用我们之前的 `mapStateToProps` 方法了：

```js
// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
    // 不要再这里将数据toJS,不然每次diff比对props的时候都是不一样的引用，还是导致不必要的重渲染, 属于滥用immutable
    bannerList: state.getIn(['recommend', 'bannerList']),
    recommendList: state.getIn(['recommend','recommendList']),
})
```

`getIn` 是用来指定获取哪一个子 `reducer` 里的哪一个数据的，因为我们获取数据还是要通过全局的 `src/reducer.js` 来获取，所以我们要用这种方法指定数据的位置。`getIn` 的参数是一个数组，数组的第一个元素是在 `src/recuder.js` 中我们给 `Recommend/store/reducer.js` 命的名，第二个参数是 `Recommend/store/reducer.js` 中对应数据的名称。

把之前的 `mock` 数据改为下面的：

```js
// 对象结构
const { bannerList, recommendList } = props;
// 把 immutable 数据类型转换为对应的 js 数据类型
const bannerListJS = bannerList ? bannerList.toJS() : [];
const recommendListJS = recommendList ? recommendList.toJS() :[];``
```

这里我们要转一下获取到的数据的数据类型，因为我们 `redux` 中是 `immutable` 数据，而我们能使用的是 `js` 数据。

理所当然，我们的传递给子组件的数据也要修改一下：

```js
return (
        <Content>
            <Scroll className="list">
                <div>
                    <Slider bannerList={bannerListJS}></Slider>
                    <List recommendList={recommendListJS}></List>
                </div>
            </Scroll>
        </Content>
    )
```

此时如果 `redux` 中有数据，我们就已经获取到了，可是现在 `redux` 中还没有数据，所以接下来我们用 `axios` 来获取数据。

### 定义 axios 获取数据的函数

去 `actionCreators.js` 中写下如下代码：

```js
// 导入常量
import * as actionTypes from './constants';
// 将JS对象转换成immutable对象
import { fromJS } from 'immutable';
// 导入网络请求
import { getBannerRequest, getRecommendListRequest } from '../../../api/request';
```

通过 `axios` 获取轮播图的数据：

```js
// 获取轮播图数据
export const getBannerList = () => {
    return (dispatch) => {
        getBannerRequest().then(data => {
            dispatch(changeBannerList(data.banners));
        }).catch(() => {
            console.log("轮播图数据传输错误");
        })
    }
};
```

这里使用了之前定义的网络请求 `getBannerRequest`，所以它完整的请求路径其实是：`http://localhost:4000/banner`。

然后定义 `changeBannerList`，它是用来获取到数据后定义要传送给 `redux` 的数据的格式的：

```js
export const changeBannerList = (data) => ({
    type: actionTypes.CHANGE_BANNER,
    data: fromJS(data)
});
```

传给 `redux` 的数据格式是 `type` 和 `data`，`type` 是我们定义的常量，而 `data` 因为我们获取的是 `js` 数据的原因，这里要先转成 `immutable` 数据格式才能给 `redux` 使用。

用同样的写法获取推荐列表的数据，下面是整个 `actionCreators` 的代码：

```js
// 导入常量
import * as actionTypes from './constants';
// 将JS对象转换成immutable对象
import { fromJS } from 'immutable';
// 导入网络请求
import { getBannerRequest, getRecommendListRequest } from '../../../api/request';

export const changeBannerList = (data) => ({
    type: actionTypes.CHANGE_BANNER,
    data: fromJS(data)
});

export const changeRecommendList = (data) => ({
    type: actionTypes.CHANGE_RECOMMEND_LIST,
    data: fromJS(data)
});

// 获取轮播图数据
export const getBannerList = () => {
    return (dispatch) => {
        getBannerRequest().then(data => {
            dispatch(changeBannerList(data.banners));
        }).catch(() => {
            console.log("轮播图数据传输错误");
        })
    }
};

export const getRecommendList = () => {
    return (dispatch) => {
        getRecommendListRequest().then(data => {
            dispatch(changeRecommendList(data.result));
        }).catch(() => {
            console.log("推荐歌单数据传输错误");
        });
    }
};
```

### 在 Recommend 中使用获取数据的函数

首先拿到我们获取数据的方法，这里就用到了 `mapDispatchToProps`：

```js
// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => {
    return {
        getBannerDataDispatch() {
            dispatch(actionCreaters.getBannerList());
        },
        getRecommendListDataDispatch() {
            dispatch(actionCreaters.getRecommendList());
        },
    }
}
```

然后使用它：

```js
// 对象解构
const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

// 当传空数组([])时，只会在组件 mount 时执行内部方法。
useEffect(() => {
    getBannerDataDispatch();
    getRecommendListDataDispatch();
}, []);
```

以上，有了获取数据的方法，有了使用数据的方法，只要启动[GitHub网易云音乐接口](https://github.com/Binaryify/NeteaseCloudMusicApi/tree/master)，然后把它运行在其他端口上，并在 `api/config.js` 中的 `baseUrl` 配置成你运行的端口号，那么我们的页面数据应该已经可以正常使用了。

## 总结

### Recommend/index.js

```jsx
import React, { useEffect } from 'react';
import Slider from '../../components/slider';
import List from '../../components/list';
import Scroll from '../../baseUI/scroll';
import styled from 'styled-components';

import { connect } from "react-redux";
import * as actionCreaters from './store/actionCreators';

export const Content = styled.div`
  position: fixed;
  top: 2.4rem;
  bottom: 0;
  width: 100%;
  max-width: 750px;
`
function Recommend(props) {

    // const bannerList = [1, 2, 3, 4].map(item => {
    //     return { imageUrl: "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg" }
    // })
    // const recommendList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
    //     return {
    //         id: index,
    //         picUrl: "https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg",
    //         playCount: 17171122,
    //         name: "[洗澡时听的歌] 浴室里听歌吹泡泡o○o○o○"
    //     }
    // });

    const { bannerList, recommendList } = props;
    const bannerListJS = bannerList ? bannerList.toJS() : [];
    const recommendListJS = recommendList ? recommendList.toJS() : [];

    const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

    useEffect(() => {
        getBannerDataDispatch();
        getRecommendListDataDispatch();
    }, []);

    return (
        <Content>
            <Scroll className="list">
                <div>
                    <Slider bannerList={bannerListJS}></Slider>
                    <List recommendList={recommendListJS}></List>
                </div>
            </Scroll>
        </Content>
    )
}
// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
    // 不要再这里将数据toJS,不然每次diff比对props的时候都是不一样的引用，还是导致不必要的重渲染, 属于滥用immutable
    bannerList: state.getIn(['recommend', 'bannerList']),
    recommendList: state.getIn(['recommend', 'recommendList']),
})
// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => {
    return {
        getBannerDataDispatch() {
            dispatch(actionCreaters.getBannerList());
        },
        getRecommendListDataDispatch() {
            dispatch(actionCreaters.getRecommendList());
        },
    }
}
// 将ui组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend))
```

### Recommend/store/reducer.js

```js
// 获取常量
import * as actionTypes from './constants';
// 导入 immutable 的 frmoJS 方法
import { fromJS } from 'immutable';

// 这里用到fromJS把JS数据结构转化成immutable数据结构
const defaultState = fromJS({
    bannerList: [],
    recommendList: [],
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_BANNER:
            return state.set('bannerList', action.data);
        case actionTypes.CHANGE_RECOMMEND_LIST:
            return state.set('recommendList', action.data);
        default:
            return state;
    }
}
```

### Recommend/store/actionCreators.js

```js
// 导入常量
import * as actionTypes from './constants';
// 将JS对象转换成immutable对象
import { fromJS } from 'immutable';
// 导入网络请求
import { getBannerRequest, getRecommendListRequest } from '../../../api/request';

export const changeBannerList = (data) => ({
    type: actionTypes.CHANGE_BANNER,
    data: fromJS(data)
});

export const changeRecommendList = (data) => ({
    type: actionTypes.CHANGE_RECOMMEND_LIST,
    data: fromJS(data)
});

// 获取轮播图数据
export const getBannerList = () => {
    return (dispatch) => {
        getBannerRequest().then(data => {
            dispatch(changeBannerList(data.banners));
        }).catch(() => {
            console.log("轮播图数据传输错误");
        })
    }
};

export const getRecommendList = () => {
    return (dispatch) => {
        getRecommendListRequest().then(data => {
            dispatch(changeRecommendList(data.result));
        }).catch(() => {
            console.log("推荐歌单数据传输错误");
        });
    }
};
```

### Recommend/store/constants.js

```js
//constants.js
export const CHANGE_BANNER = 'recommend/CHANGE_BANNER';

export const CHANGE_RECOMMEND_LIST = 'recommend/RECOMMEND_LIST';
```

### src/store/reducer.js

```js
// 合并 reducer 函数
import { combineReducers } from 'redux-immutable';
// 导入分仓库的 reducer
import { reducer as recommendReducer } from '../application/Recommend/store/index';

// 合并 reducer 函数为一个 obj
export default combineReducers({
    recommend: recommendReducer,
})
```

