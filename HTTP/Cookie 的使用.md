# 服务端的 Cookie

Server 可以通过在响应头中添加 `Set-Cookie` 头部来发送一个 Cookie 给客户端缓存。

```js
Set-Cookie: NAME=VALUE; expires=Tue, 05 Jul 2011 07:26:31 GMT; path=/; domain=.hackr.jp'
```

| 属性         | 说明                                                         | 详细                                                         |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| NAME=VALUE   | 赋予 Cookie 的名称和其值（必需项）                           |                                                              |
| expires=DATE | Cookie 的有效期（若不明确指定则默认为浏览器关闭前为止）      | 一旦设定，只与客户端时间有关                                 |
| path=PATH    | 将服务器上的文件目录作为 Cookie 的适用对象（若不指定默认文档所在的文件目录） |                                                              |
| domain=域名  | 作为 Cookie 适用对象的域名（默认创建 Cookie 的服务器的域名） | 因为可做到与结尾匹配一致（如指定 example.com 时，www.example.com 和 www2.example.com 等都可以发送 Cookie），所有，除了针对具体指定的多个域名发送 Cookie 之外，不指定 domain 更安全。 |
| Secure       | 仅在 HTTPS 安全通信时才会发送 Cookie                         |                                                              |
| HttpOnly     | 加以限制，使得 Cookie 不能被 JavaScript 脚本访问             | 主要是为了防止 XSS（跨站脚本攻击）对 Cookie 的信息窃取。     |

服务器无法远程删除 Cookie，但可以通过指定 Cookie 的过期方式覆盖 Cookie 来达到远程删除的目的。