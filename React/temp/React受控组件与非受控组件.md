---
title: React受控组件与非受控组件
date: 2019-10-04 23:34:00
categories: React
tags:
 - React
---

React受控组件与非受控组件
<!--more-->

## 受控组件

在 HTML 中，表单元素（如`<input>`、 `<textarea>` 和 `<select>`）之类的表单元素通常自己维护 state，并根据用户输入进行更新。而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用 [`setState()`](https://react-1251415695.cos-website.ap-chengdu.myqcloud.com/docs/react-component.html#setstate)来更新。

我们可以把两者结合起来，使 React 的 state 成为“唯一数据源”。**渲染表单的 React 组件还控制着用户输入过程中表单发生的操作**。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。

在 React 中，<input>、<textarea>、<select>之类的表单元素都是受控组件。

文件 input 标签是一个非受控组件：

> <input type="file" />

## 非受控组件

在大多数情况下，我们推荐使用 [受控组件](https://react-1251415695.cos-website.ap-chengdu.myqcloud.com/docs/forms.html) 来处理表单数据。在一个**受控组件**中，表单数据是由 **React 组件来管理**的。另一种替代方案是使用**非受控组件**，这时表单数据将交由 **DOM 节点来处理**。

要编写一个非受控组件，而不是为每个状态更新都编写数据处理函数，你可以 [使用 ref](https://react-1251415695.cos-website.ap-chengdu.myqcloud.com/docs/refs-and-the-dom.html) 来从 DOM 节点中获取表单数据。

例如，下面的代码使用非受控组件接受一个表单的值：

```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

