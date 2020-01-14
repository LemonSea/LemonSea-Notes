# 1. 安装（install）

## 1.1 基本语法

【基本语法】

```bash
$ npm install moduleNames
```

【参数】

| Parameter  | Description  |
| ---------- | ------------ |
| moudleName | 安装包的名称 |

安装完毕后会产生一个 `node_modules` 目录，其目录下就是安装的各个 node 模块。

安装一般分为**全局模式**于**本地模式**，默认本地模式，包会被安装到你的应用程序代码的本地 `node_modules` 目录下。

## 1.2 全局安装

**全局安装**需要添加 `-g` 命令，全局安装的代码是供命令行使用的：

```bash
$ npm install moduleNames -g
```

可以通过一下命令查看当前使用的安装模式：

```bash
$ npm get global
```

## 1.3 安装包信息写入

如果在接上 `--save` 命令，会将安装包信息写入 `package.json` 文件中的 1`dependencies`，当其他开发人员使用代码时，可以使用 `npm install` 直接安装所有 `package.json` 中的依赖。

【npm 下载时，加上 `--save` 表明是发布时仍然要依赖的包，加上 `--save-dev` 表明是开发和测试时使用的包。】

# 2. 卸载（uninstall）

【基本语法】

```bash
$ npm uninstall moudleName
```

卸载对应模块。

【参数】

| Parameter  | Description  |
| ---------- | ------------ |
| moudleName | 安装包的名称 |

【加上 `--save` 时，会在删除的同时移除对应的信息。 

# 3. 更新（update）

【基本语法】

```bash
$ npm update moduleName
```

更新对应模块。

【参数】

| Parameter  | Description  |
| ---------- | ------------ |
| moudleName | 安装包的名称 |

# 4. 初始化

【基本语法】

```bash
$ npm init
```

初始化，引导创建一个package.json文件，包括名称、版本、作者这些信息等。

# 5. 查看包安装路径

## 5.1 全局包安装路径

【基本语法】

```bash
$ npm root -g
```

查看全局包安装路径。

## 5.2 当前包安装路径

【基本语法】

```bash
$ npm root
```

查看当前包安装路径。

# 6. 查看npm 全局安装的根目录

【基本语法】

```shell
$ npm bin
```



