# MongoDB 初学

## 1.MongoDB 相关概念

### 1.1 业务应用场景

在“三高”需求时，使用 MongoDB:

- High performance：对数据库的高并发读写的需求。
- Huge Storage：对海量数据的高效率存储和访问的需求。
- High Scalability & High Availability：对数据库的高扩展性和高可用性的需求。

【SQL 数据库的行列已固定，不便于扩展】



具体应用场景：

1. 社交场景。存储用户信息，用户发表的朋友圈信息，地理位置索引实现附加的人，地点等功能。
2. 游戏场景。用户装备，积分，经验等。
3. 物流场景。订单信息，例如订单在运送过程中不断地更新。
4. 物联网场景。存储所有接入的智能设备信息，以及设备汇报的日志信息，并对这些信息进行维度分析。
5. 视频直播。用户信息、点赞互动信息等。



共同特点:

- 数据量大。
- 写入频繁。
- 价值较低的数据，对事务要求不高。

【什么时候选择】

应用不需要事务及复杂 join 支持。

新应用，需求会变，数据模型无法确定，想快速迭代开发。

应用需要 2000-3000 以上的读写QPS。

应用需要 TB 甚至 PB 级别数据存储。

应用需要 99.999% 高可用。

应用要求存储的数据不丢失。

应用需要大量的地理位置查询，文本查询。

### 1.2 简介

MongoDB 是开源、高性能、无模式的文档型数据库，是 NoSql 数据库，是最像关系型数据库（SQL）的非关系型数据库（NoSql）。

MongoDB 中的记录是一个文档，由字段和值对组成的数据结构。MongoDB 文档类似 JSON 对象。

### 1.3 体系结构

![image-20200105104732541](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200105104732541.png)

| SQL 术语/概念 | MongoDB 术语/概念 | 解释、说明                              |
| ------------- | ----------------- | --------------------------------------- |
| DabaBase      | DataBase          | 数据库                                  |
| Table         | collection        | 数据库表/集合                           |
| row           | document          | 数据记录行/文档                         |
| column        | field             | 数据字段/域                             |
| index         | index             | 索引                                    |
| table joins   |                   | 表连接，MongoDB 不支持                  |
|               | 嵌入文档          | MongoDB 通过嵌入文档代替多表连接        |
| primary key   | primary key       | 主键，MongoDB 自动将 _id 字段设置为主键 |

### 1.4 数据模型

### 1.5 特点

1. 高性能
2. 高可用性
3. 高扩展性
4. 丰富的查询支持

增删改查，数据聚合，文档搜索，地理空间查询等。

## 2.单机部署

### 2.1 Windows 单机部署与启动

官网下载

选择 zip 下载，解压即用。

#### 2.1.1 启动方法一：命令行启动

在解压的 bin 文件夹中运行 cmd 命令，输入：

```bash
$ mongodb --dbpath=../data/db
```

【其中的 daba/db 文件夹是我们自己在解压目录里面新建的，用于存放数据库的文件夹。】

其中成功后默认指定的是 27017 端口。成功后会在 data/db 文件夹下生成许多数据库文件。

#### 2.1.2 启动方法二：配置文件的启动

在解压目录下创建一个 conf 文件夹，该文件夹下创建一个 mongod.conf 文件，写入以下内容：

```bash
storage:
  #The directory where the mongod instance stores its data.Default Value is "\data\db" on Windows
  dbPath: H:\mongodb-win32-x86_64-2008plus-ssl-4.0.14\data\db
```

改内容实质是把命令行启动的输入语句转化过来的。

dbPath 的路径使用我们创建的 data/db 的路径。

启动：

同样的，在 bin 文件夹中运行 cmd 命令，输入：

```bash
$ mongod -f ..\conf\mongod.conf
```

或

```bash
$ mongod -config ..\conf\mongod.conf
```

#### 2.1.3 启动注意项

调试时可以简单命令行启动，但是部署时一定要配置文件。

### 2.2 Shell 连接（mongo 命令）

刚刚连接时使用的是 mongod 命令，现在需要使用的是 mongo 命令：

![image-20200106093502142](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200106093502142.png)

**注意，连接时，刚刚启动的服务不能关闭！**

连接本地时，只需要在 bin 目录下的 cmd 命令行中输入 mongo，就会自动连接我们启动的 mongodb 服务。

验证连接是否成功可以输入一个小命令：

```bash
$ show dbs
```

该命令是查看数据库，如已连接会出现已有数据库。

默认数据库有三个：

- admin
- config
- local

如果带上参数的连接：

```bash
$ mongo --host=localhost --port 27017
```

上面是指定本地连接，端口号为 27017，用小命令验证连接成功。

### 2.3 Compass 图形化界面

官网下载，community 版本免费，如果是安装版，步骤安装；如果是压缩版，解压缩运行 MongoDBCompassCommunity.exe，然后使用默认连接即可（默认连接本地，27017 端口）

### 2.4 Linux 系统中的安装和启动

类似 Windows 方法，不过下载 Linux 版本。

服务器端配置要配置详细一点，可查看 哔哩哔哩 MongoDB 收藏夹《MongoDB基础入门到高级进阶》第六章：”Linux 系统的安装启动与连接“。

## 3.基本常用命令

### 3.1 案例需求

存放文章评论的数据存放到 MongoDB 中，数据结构参考如下：

数据库：articledb

| 专栏文章评论   | comment        |                    |                              |
| -------------- | -------------- | ------------------ | ---------------------------- |
| 字段名称       | 字段含义       | 字段类型           | 备注                         |
| _id            | ID             | ObjectId 或 String | Mongo 的主键的字段           |
| articleid      | 文章的 ID      | String             |                              |
| content        | 评论内容       | String             |                              |
| userid         | 评论人 ID      | String             |                              |
| nickname       | 评论人昵称     | String             |                              |
| createdatetime | 评论的日期时间 | Date               |                              |
| likenum        | 点赞数         | Int32              |                              |
| replynum       | 回复数         | Int32              |                              |
| state          | 状态           | String             | 0：不可见；1：可见；         |
| parentid       | 上级 ID        | String             | 如果为０表示文章的顶级评论。 |

### 3.2 数据库操作

#### 3.2.1 选择（切换）和创建数据库

选择（切换）和创建数据库的语法格式：

```bash
$ use 数据库名称
```

如果数据库不存在则自动创建，存在则切换到该数据库。

需要注意的是，使用 use 创建的时候，数据库是创建到内存中的，此时没有持久化到磁盘中，当该数据库有一个 collection 时，才会自动持久化到磁盘。

可以键入：

```bash
$ db
```

命令查看当前选中的数据库。

#### 3.2.2 删除数据库

MongoDB 数据库的删除语法如下：

```bash
$ db.dropDatabase()
```

提示：主要用来删除已经持久化的数据库。db 指代当前数据库。

#### 3.2.3 默认数据库

- **admin**：即 root 数据库，存放用户的权限。
- **local**：这个数据永远不会被辅助，可以用来存储限于本地单台服务器的任意集合。
- **config**：当 Mongo 用于分片设置时，config 数据库在内部使用，用于保存分片的相关信息。

### 3.3 集合操作

集合（collection）类似于 SQL 数据库中的表（Table）。

#### 3.3.1 显示创建集合

基本语法：

```bash
$ db.createCollection(name)
```

参数说明：

- db：指代当前选中的库

- name：要创建的集合名称。

示例：

创建一个名为 `mine` 的普通集合：

```bash
$ db.createCollection("mine")
```

查看当前库中的表：show 或 table 命令：

```bash
$ show collections
```

或

```bash
$ show tables
```

#### 3.3.2 隐式创建集合

当向一个集合中插入一个文档的时候，如果集合不存在，则会自动创建集合。

我们一般也是使用的隐式创建集合。

#### 3.3.3 集合的删除

基本语法：

```bash
$ db.name.drop()
```

或：

```bash
$ db.collection.drop()
```

参数说明：

- db：指代当前库。
- name：要删除的集合的名称。

返回值：

- true：成功删除选定集合
- false：删除失败

示例：

删除刚刚创建的 `mine` 集合：

```bash
$ db.mine.drop()
```

此时再用 `show.collections` 命令查看会发现 mine 集合已被删除。

### 3.4 文档基本 CRUD

文档（document）的数据结构和 JSON 基本一致。

所有存储在集合中的数据都是 BSON 格式。

#### 3.4.1 文档的插入

##### 3.4.1.1 单个文档插入

使用 `insert()` 或 `save()` 方法向集合中插入文档。

基本语法：

```bash
db.collection.insert(
	<document or array of documents>,
	{
		writeConcern:<document>,
		ordered:<boolean>
	}
)
```

参数说明：

| Parameter    | Type              | Description                                                  |
| ------------ | ----------------- | ------------------------------------------------------------ |
| db           |                   | 当前所在的库。                                               |
| collection   |                   | 要插入的集合名。                                             |
| document     | document or array | 要插入到集合中的文档或文档数组。（json 格式）                |
| writeConcern | document          | 可选。插入时选中的性能和可靠性的基本。                       |
| ordered      | Boolean           | 可选。true：按顺序插入数组中的文档，如果插入出错，MongoDB 将返回而不处理数组中的其余文档；false：无序插入，如果插入出错，继续处理数组中的主文档。默认为 true。 |

示例：

```bash
$ db.comment.insert({
	"_id":"002",
	"articleid":"10000",
	"content":"今天天气真好，阳光明媚",
	"userid":"1001",
	"nickname":"Rose",
	"createdatetime":new Date(),
	"likenum":NumberInt(10),
	"state":null
})
```

返回 `WriteResult({ "nInserted" : 1 })` 表示插入成功。

##### 3.4.1.2 批量插入

基本语法：

```bash
db.collection.insertMany(
	[<document 1>,<document 2>,...]
	{
		writeConcern:<document>,
		ordered:<boolean>
	}
)
```

参数说明：

| Parameter    | Type     | Description                                                  |
| ------------ | -------- | ------------------------------------------------------------ |
| db           |          | 当前所在的库。                                               |
| collection   |          | 要插入的集合名。                                             |
| document     | document | 要插入到集合中的文档或文档数组（Json 格式）。                |
| writeConcern | document | 可选。插入时选中的性能和可靠性的基本。                       |
| ordered      | Boolean  | 可选。true：按顺序插入数组中的文档，如果插入出错，MongoDB 将返回而不处理数组中的其余文档；false：无序插入，如果插入出错，继续处理数组中的主文档。默认为 true。 |

示例：

```bash
$ db.comment.insertMany([
{
	"articleid":"1",
	"content":"水要烧开才能喝",
	"userid":"1001",
	"nickname":"Leon",
	"createdatetime":new Date(),
	"likenum":NumberInt(110),
	"state":0
},
{
	"articleid":"2",
	"content":"今天天气真好，阳光明媚",
	"userid":"1002",
	"nickname":"Rose",
	"createdatetime":new Date(),
	"likenum":NumberInt(210),
	"state":1
},
{
	"articleid":"3",
	"content":"今天出去玩",
	"userid":"1002",
	"nickname":"Rose",
	"createdatetime":new Date(),
	"likenum":NumberInt(12),
	"state":1
},
{
	"articleid":"4",
	"content":"天气真好",
	"userid":"1003",
	"nickname":"Mary",
	"createdatetime":new Date(),
	"likenum":NumberInt(10),
	"state":1
},
{
	"articleid":"5",
	"content":"暴雪掩埋",
	"userid":"1004",
	"nickname":"Andy",
	"createdatetime":new Date(),
	"likenum":NumberInt(10),
	"state":1
}
]);
```

##### 注意

批量插入时，如果某条数据插入失败，将会终止插入，但已插入成功的数据不会回滚（当 `ordered` 为 true 时）。

因为批量插入容易出错，因此可以使用 `try...catch` 捕捉异常。

示例：

```bash
$ try {
	db.comment.insertMany([
	{
        "articleid":"1",
        "content":"今天天气真好，阳光明媚",
        "userid":"1001",
        "nickname":"Rose",
        "createdatetime":new Date(),
        "likenum":NumberInt(10),
        "state":null
    },
    {
        "articleid":"2",
        "content":"今天天气真好，阳光明媚",
        "userid":"1001",
        "nickname":"Rose",
        "createdatetime":new Date(),
        "likenum":NumberInt(10),
        "state":null
    },
    {
        "articleid":"3",
        "content":"今天天气真好，阳光明媚",
        "userid":"1001",
        "nickname":"Rose",
        "createdatetime":new Date(),
        "likenum":NumberInt(10),
        "state":null
    }
	]);
} catch (e) {
	print(e);
}
```

#### 3.4.2 文档的基本查询

##### 3.4.2.1 条件查询

基本语法：

指定条件查询：

```bash
$ db.collection.find(<query>,[projection])
```

查询满足条件的第一条：

```bash
$ db.collection.findOne(<query>,[projection])
```

参数：

| Parameter  | Type     | Description                                                  |
| ---------- | -------- | ------------------------------------------------------------ |
| db         |          | 当前所在的库。                                               |
| collection |          | 要查询的集合名。                                             |
| query      | document | 可选。使用查询运算符指定选择筛选器。若要返回集合中所有文档，可省略或置空。 |
| projection | document | 可选。指定要在与查询筛选器匹配的文档中返回的字段（投影）。若要返回匹配文档中的所有字段，则省略。 |

示例：

查询全部：

```bash
$ db.comment.find()
```

指定条件单个查询：

```bash
$ db.comment.find({articleid:'2'})
```

获取满足查询条件的第一天数据：

```bash
$ db.comment.findOne({articleid:'2'})
```

##### 3.4.2.2 投影查询

在查询时带上需要显示的参数并指定其 Boolean 值为1；也可以指定不需要显示的参数其 Boolean 值为0。`_id` 字段是默认查询的。

基本语法：

指定条件查询：

```bash
$ db.collection.find(<query>,<conditions>,[projection])
```

查询满足条件的第一条：

```bash
$ db.collection.findOne(<query>,<conditions>,[projection])
```

参数：

| Parameter  | Type     | Description                                                  |
| ---------- | -------- | ------------------------------------------------------------ |
| db         |          | 当前所在的库。                                               |
| collection |          | 要查询的集合名。                                             |
| query      | document | 可选。使用查询运算符指定选择筛选器。若要返回集合中所有文档，可省略或置空（{}）。 |
| conditions | document | 可选，指定需要显示或隐藏的参数。1：显示；0：隐藏。           |
| projection | document | 可选。指定要在与查询筛选器匹配的文档中返回的字段（投影）。若要返回匹配文档中的所有字段，则省略。 |

示例：

```bash
$ db.comment.find({articleid:"2"},{content:1,state:1})
```

#### 3.4.3 文档的更新

基本语法：

```bash
$ db.collection.update(query, update, options)
```

或

```bash
$ db.collection.update(
	<query>,
	<update>,
	{
		upset:<boolean>,
		multi:<boolean>,
		writeConcern:<document>
	}
)
```

参数：

| Parameter    | Type                 | Description                                                  |
| ------------ | -------------------- | ------------------------------------------------------------ |
| db           |                      | 当前所在的库。                                               |
| collection   |                      | 要更新的集合名。                                             |
| query        | document             | 更新的选择条件。使用方法通 find()。                          |
| update       | document or pipeline | 要应用的修改。该值可以是：包含更新运算符表达式的文档，或仅包含键值对的替换文档，或在 MongoDB 4.2 中启动聚合管道。 |
| upsert       | Boolean              | 可选。true：没有与匹配条件匹配的文档时创建新文档。默认 false。 |
| multi        | Boolean              | 可选。true：更新符合查询条件的多个文档。false：更新一个文档。默认 false。 |
| writeConcern | document             | 可选。表示写问题的文档。抛出异常的级别。                     |
| collation    | document             | 可选。<br />指定要用于操作的校对规则。<br />校对规则允许用户为字符串比较指定特定于语言的规则，例如字母大小写和重音标记的规则。<br />校对规则选项语法：<br />校对规则：{<br />区域设置：<string>，<br />caseLevel：<boolean>，<br />caseFirst：<string>，<br />强度：<int>，<br />numericordering：<boolean>，<br />替代：string，<br />最大变量：<string>，<br />向后：<boolean>，<br />}<br />指定校对规则时，区域字段是必须的，其他字段可选。详情查看文档。 |
| arrayFilters | array                | 可选。<br />一个筛选文档数组，用于确定要为数组字段上的更新操作修改哪些数组元素。 |
| hint         | document or string   | 可选。指定用于支持查询谓词的索引的文档或字符串。该消息可以采用索引规范文档或索引名称字符串。如果指定的索引不存在，则说明操作错误。详情查阅文档。 |

注意：主要用前六个参数。

示例：

##### 3.4.3.1 覆盖的修改

如果我们想修改 _id 为 `5e12a82c0909647651333134` 的记录，点赞量为 101，输入以下语句：

```bash
$ db.comment.update({_id:ObjectId("5e12a82c0909647651333133")},{"likenum":NumberInt(2222)})
```

执行后，我们会发现，这条文档除了 likenum 字段，其他字段都不见了。这里使用了 `ObjectId` 和 `NumberInt ` 方法进行转义。

##### 3.4.3.2 局部的修改

在 JSON 前加上 `$set` 命令：

```bash
$ db.comment.update({_id:ObjectId("5e12a82c0909647651333134")},{$set:{"likenum":NumberInt(2222)}})
```

这样只会修改我们指定的字段。

##### 3.4.3.3 批量修改

批量修改，需要把 `multi` 属性配置为 true。

默认情况下，修改一条：

```bash
$ db.comment.update({userid:"1001"},{$set:{nickname:"屋大维"}})
```

批量修改：

```bash
$ db.comment.update({userid:"1001"},{$set:{nickname:"屋大维"}},{multi:true})
```

#####  3.4.3.4 列值增长的修改

使用 `$inc` 运算符实现（当然，程序计算后更新也行）：

```bash
$ db.comment.update({_id:ObjectId("5e130ec7651b1aa08a1c50e6")},{$inc:{"likenum":NumberInt(1)}})
```

使用 `$inc` 运算符时，默认是局部更新。

#### 3.4.4 文档的删除

删除文档的语法结构：

```bash
$ db.collection.remove(条件)
```

注意，删除方法默认删除所有符合条件的文档。

以下语句会删除全部数据，**慎用**！

```bash
$ db.collection.remove([])
```

示例：

删除 `_id` 为 `002` 的数据：

```bash
$ db.comment.remove({_id:"002"})
```

### 3.5 文档的分页查询

#### 3.5.1 统计查询

使用 `count()` 方法。

基本语法：

```bash
$ db.collection.count(query, options)
```

参数：

| Parameter | Type     | Description                    |
| --------- | -------- | ------------------------------ |
| query     | document | 查询的选择条件。               |
| options   | document | 可选。用于修改计数的额外选项。 |

【示例】

##### 3.5.1.1 统计所有数据总数

```bash
$ db.collection.count()
```

##### 3.5.1.2 统计对应条件数据总数

查询 `comment` 集合中 `userid` 为 `1001` 的数据总数：

```bash
$ db.comment.count({"userid":"1001"})
```

#### 3.5.2 分页查询

使用 `limit()` 方法读取指定数量的数据，使用 `skip()` 方法跳过指定数量的数据。

基本语法：

```bash
$ db.collection.find().limit(number).skip(number)
```

参数：

| Parameter  | Type     | Description        |
| ---------- | -------- | ------------------ |
| collection | document | 指定查询的集合。   |
| number     | number   | 限定或跳过的数据。 |

#### 3.5.3 排序查询

使用 `sort()` 命令对数据进行排序，可选参数：1：升序排列，-1：降序排列。默认 `_id` 升序。

基本语法：

```bash
$ db.collection.find().sort({KEY:1})
```

参数：

| Parameter  | Type     | Description      |
| ---------- | -------- | ---------------- |
| collection | document | 指定查询的集合。 |
| KEY        | document | 指定排序的属性。 |

可指定多个排序条件。

【示例】

按照 `_id` 降序排列：

```bash
$ db.comment.find().sort({"_id":-1})
```

### 3.6 文档的更多查询

#### 3.6.1 正则的复杂条件查询

MogoDB 的模糊查询是通过**正则表达式**实现的：

基本语法：

```bash
$ db.collection.find({field:/正则表达式/})
```

或

```bash
$ db.collection.find({字段:/正则表达式/})
```

正则表达式是 JavaScript 的语法，直接量的写法。

【用例】

查询内容开头未`今天`的数据：

```bash
$ db.comment.find({content:/^今天/})
```

#### 3.6.2 比较查询

使用 <,<=,>,>= 这些操作符对应的指令。

【基本语法】

大于：

```bash
$ db.collection.find({"field":{$gt:value}})  // 大于：field > value
```

小于：

```bash
$ db.collection.find({"field":{$lt:value}})  // 大于：field < value
```

大于等于：

```bash
$ db.collection.find({"field":{$gte:value}})  // 大于：field >= value
```

小于等于：

```bash
$ db.collection.find({"field":{$lte:value}})  // 大于：field <= value
```

不等于：

```bash
$ db.collection.find({"field":{$ne:value}})  // 大于：field != value
```

【示例】

查询 `likenum` 大于等于 `11` 的值。

```bash
 $ db.comment.find({"likenum":{$gte:NumberInt(11)}})
```

#### 3.6.3 包含查询

包含使用 `$in` 操作符；不包含使用 `$nin` 操作符。

【示例】

查询 `userid` 包含 1002 和 1003 的值。

```bash
$ db.comment.find({"userid":{$in:["1002","1003"]}})
```

查询 `userid` 不包含 1002 和 1003 的值。

```bash
$ db.comment.find({"userid":{$nin:["1002","1003"]}})
```

#### 3.6.4 条件查询

##### 3.6.4.1 与（and）查询

需要查询同时满足两个以上条件，使用 `$and` 操作符将条件进行关联。（相当于 SQL 的 and）

【语法格式】

```bash
$and:[{},{},{}]
```

【示例】

查询评论集合 `likenum` 大于等于 100 且小于等于 200 的文档：

```bash
$ db.comment.find({$and:[{"likenum":{$gte:NumberInt(100)}},{"likenum":{$lte:NumberInt(200)}}]})
```

##### 3.6.4.2 或（or）查询

需要查询同时满足两个以上条件，使用 `$or` 操作符将条件进行关联。（相当于 SQL 的 and）

【语法格式】

```bash
$or:[{},{},{}]
```

【示例】

查询评论集合 `likenum` 小于等于 100 或大于等于 200 的文档：

```bash
$ db.comment.find({$or:[{"likenum":{$lte:NumberInt(100)}},{"likenum":{$gte:NumberInt(200)}}]})
```

## 4 索引 - Index

### 4.1 概述

索引支持在 MongoDB 中高效地进行查询。如果没有索引，MongoDB 必须执行全集合扫描，即扫描集合中的每个文档，以选择与查询语句匹配的文档。这种扫描全集合的查询效率是非常低的，特别在处理大量数据时。

如果查询存在适当的索引，MongoDB 可以使用该索引限制必须检查的文档数。

索引是特殊的数据结构，它以易于遍历的形式存储集合数据集的一小部分。索引存储特定字段或一组字段的值，按字段值排序。索引项的排序支持有效的相等匹配合基于范围的查询操作。此外，MongoDB 还可以使用索引中的排序返回排序结果。

详情查阅官方文档。

【了解】

MongoDB 的索引使用的 B 树数据结构（B-Tree，MySql 使用的是 B+Tree）

### 4.2 索引的类型

#### 4.2.1 单字段索引

MongoDB 支持在文档的单个字段上创建用户定义的升序/降序索引，称为单字段索引（Single Field Index）。

对于单个字段索引和排序操作，索引键的排序顺序（升序/降序）并不重要，因为 MongoDB 可以在任何方向上遍历索引。

![image-20200107101850756](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200107101850756.png)

如图，假设要查询 35，就先找到 30-45 的区间，在这个区间中查找 35。

#### 4.2.2 复合索引

MongoDB 还支持多个字段的用户自定义索引，即复合索引（Compound Index）。

复合索引中列出的字段顺序具有重要意义。例如：如果复合索引由 `{ userid:1, score:-1 }` 组成，则索引首先按 `userid` 正序排列，然后在每个 `userid` 的值内，再按照 `score` 降序排列。

![image-20200107102831108](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200107102831108.png)

如图，先按照 userid 升序排列（ASCⅡ），再在每个 suerid 内部按照 score 降序排列。

#### 4.2.3 其他索引

地理空间索引（Geospatial Index），文本索引（Text Index），哈希索引（Hashed Index）。



地理空间索引（Geospatial Index）

为了支持对地理空间坐标数据的有效查询，MongoDB 提供两种特殊的索引：返回结果时使用平面几何的二维索引和返回结果时使用球面几何的二维球面索引。

文本索引（Text Index）

MongoDB 提供一种文本索引类型，支持在集合中搜索字符串内容。这些文本索引不存储特定于语言的停止词（如 "the","a","or"），而将集合中的词作为词干，只存储词根。（文本索引性能不高）

哈希索引（Hashed Index）

为了支持基于散列的分片，MongoDB 提供了散列索引类型，它对字段值的散列进行索引。这些索引在其范围内的值分布更加随机，但只支持相等匹配，不支持基于范围的查询。

### 4.3 索引的管理操作

#### 4.3.1 索引的查看

【说明】

返回一个集合中的所有索引的数组。

【语法】

```bash
$ db.collection.getIndexes()
```

![image-20200107104241022](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200107104241022.png)

返回一个数组，其中任意对象结构：

- v：number  // 版本号
- key：object  // 表明是哪个字段加的索引，以及索引的排序方式
- name：string  // 索引名称，默认是 "字段" + "_"  + "排序规则（1/-1）"
- ns：string  //ns 是命名空间（namespace）的简写，其值表示在哪个命名空间下

#### 4.3.2 索引的创建

【说明】

在集合中创建索引。

【语法】

```bash
$ db.collection.createIndex(keys, options)
```

【参数】

| Parameter | Type     | Description                                                  |
| --------- | -------- | ------------------------------------------------------------ |
| Keys      | document | 包含字段和值的文档，其中字段是索引值，值描述该字段的索引类型。1：升序；-1：降序。（MongoDB 支持几种不同的索引类型，包括文本、地理空间和哈希索引） |
| options   | document | 可选。包含一组控制索引创建的选项的文档。                     |

options（更多选项）常见参数列表：

| Parameter | Type    | Description                                                  |
| --------- | ------- | ------------------------------------------------------------ |
| unique    | Boolean | 建立的索引是否唯一。true：唯一；false：不唯一。默认：false。 |
| name      | string  | 指定索引名称。不指定按照默认命名方式命名。                   |

##### 4.3.2.1 单字段索引

单字段升序/降序不影响查询效率。

【示例】

```bash
$ db.comment.createIndex({userid:1})
```

##### 4.3.2.2 复合索引

建立方法同单字段索引，指定 `key` 时指定多个字段即可。

```bash
$ db.comment.createIndex({userid:1,nickname:-1})
```

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200107105630193.png" alt="image-20200107105630193" style="zoom: 80%;" />

复合索引默认 `name` 是拼接的。

#### 4.3.3 索引的删除

【说明】

可以移除指定的索引，或移除所有索引。

##### 4.3.3.1 指定索引的移除

【语法】

```bash
$ db.collection.dropIndex(index)
```

【参数】

| Parameter | Type               | Description                                                  |
| --------- | ------------------ | ------------------------------------------------------------ |
| index     | string or document | 指定要删除的索引。可以通过**索引名称**或**索引规范文档指定**索引。<br />注意：若要删除文本索引，要指定索引名称。 |

【示例】

删除 `comment` 下的 `{userid:1}` 的索引：

```bash
$ db.comment.dropIndex({userid:1})
```

也可以通过索引名称删除：删除 `comment` 下的名称为 `userid_1_nickname_-1` 的索引：

```bash
$ db.comment.dropIndex("userid_1_nickname_-1")
```

##### 4.3.3.2 移除所有索引

【语法】

```bash
$ db.collection.dropIndexes()
```



注意：移除所有索引不会移除 "_id"，只会移除我们自建的索引。

### 4.4 索引的使用

#### 4.4.1 执行计划

分析查询性能（Analyze Query Performance）通常使用执行计划（解释计划、Explain Plan）来查看查询的情况，如查询耗费的时间，是否基于索引查询等。

【语法】

```bash
$ db.collection.find().explain()
```

只需要在正常的查询语句后面加上 `explain()` 即可。

返回执行计划。

【示例】

我们没有对 `userid` 添加索引时的解释计划结果：

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200107150405759.png" alt="image-20200107150405759" style="zoom:80%;" />

可以看到 `winningPlan` 中的 `stage` 是 `COLLSCAN`，即 `集合扫描（collection scan）`，全局扫描。

可以看到，这次查询没有用上索引。也可以通过 compass 更直观地看。

给 `userid` 添加上解释计划后的结果：

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200107151310181.png" alt="image-20200107151310181" style="zoom:67%;" />

可以看到 `winningPlan` 中的 `stage` 是 `FETCH`，是 `抓取` 的意思。可以通过 Compass 更直观地看到。

#### 4.4.2 涵盖的查询

Covered Queries

当查询条件和查询的投影仅包含索引字段时，MongoDB 直接从索引返回结果，而不扫描任何文档或将文档插入内存。这些覆盖的查询可以非常有效。

![image-20200107153301343](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200107153301343.png)

如上图，索引中有 `score` 字段，投影查询也只查 `score`（隐藏了 id），它就只会查索引，查了索引已经拿到数据（socre），没有查询的必要，就不会再去查文档。

【总结】

一般索引会查找两次，以找到值，一次索引，一次文档。

涵盖的查询只查一次，在索引查询就得到了值，所有只查一次索引，不查文档。

## 5 文章评论

### 5.1 需求分析

数据库：articledb

| 专栏文章评论   | comment        |                    |                              |
| -------------- | -------------- | ------------------ | ---------------------------- |
| 字段名称       | 字段含义       | 字段类型           | 备注                         |
| _id            | ID             | ObjectId 或 String | Mongo 的主键的字段           |
| articleid      | 文章的 ID      | String             |                              |
| content        | 评论内容       | String             |                              |
| userid         | 评论人 ID      | String             |                              |
| nickname       | 评论人昵称     | String             |                              |
| createdatetime | 评论的日期时间 | Date               |                              |
| likenum        | 点赞数         | Int32              |                              |
| replynum       | 回复数         | Int32              |                              |
| state          | 状态           | String             | 0：不可见；1：可见；         |
| parentid       | 上级 ID        | String             | 如果为０表示文章的顶级评论。 |

一下内容需要 Java 知识，以后再学习。

## 结束命令

在 cmd 中 ctrl + c 会结束当前运行的服务。

