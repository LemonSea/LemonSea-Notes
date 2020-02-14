---
title: axios 基础.md
date: 2019-10-04 00:12:31
categories: axios
tags:
 - axios

---

这里主要介绍的是 axios 的基础
<!--more-->

## GET

### axios.get()

```js
axios.get('https://localhost:44322/api/user/get')
      .then((response) => {
        console.log('原始get方法成功：')
        console.log(response.data);//请求的返回体
      })
      .catch((error) => {
        console.log(error);//异常
      });
```

### methods 方法

```js
axios(
      {
        methods: 'get',
        url: 'https://localhost:44322/api/user/get',
      })
      .then((response) => {
        console.log('methods方法成功：')
        console.log(response.data);//请求的返回体
      })
      .catch((error) => {
        console.log(error);//异常
      });
```

## POST

### methods

```js
let data = {
      "name":"walk dog",
      "isComplete":true
    }
    axios({
      method: "POST",
      headers:{'Content-type':'application/json',},
      url: 'https://localhost:44305/api/Todo/PostTodoItem',
      data: data,
    })
      .then((response) => {
        console.log('发送成功：')
        console.log(response.data);//请求的返回体
      })
      .catch((error) => {
        console.log(error);//异常
      });
```

## .net Core 跨域设置

在 `Startup.cs` 中，在 `ConfigureServices` 里面添加：

```c#
// CORS 配置            
services.AddCors();
```

然后在 `Configure` 里面添加：

```c#
// CORS 配置  
            app.UseCors(builder => builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
```

注意，这个要写在 `app.UseMvc();` 上面。