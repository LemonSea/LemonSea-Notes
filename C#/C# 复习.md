# 1. 类与名称空间

类（class）是构成程序的主体。

名称空间（namespace）以树形结构组织类（和其他类型）。

# 2. 方法

## 2.1 类型

方法前的类型表示返回值的类型。调用方法时的类型要和方法前的方法的类型相同。

## 2.2 命名

方法的名称必须是动词或动词短语。

C# 的方法命名首字母必须大写，而变量必须是驼峰命名法。【Java 都是驼峰命名法】

## 2.3 声明

私有（private）：仅在该对象上能够调用；

公共（public）：在其他对象上能够调用；

静态（static）：仅对象（JS 对应的就是构造函数）上能够获取，实例无法获取。

非静态（没有定义声明 static 的）：可在实例上获取。

## 2.4 其他

方法也叫算法。

数据 + 方法 = 程序。

# 3. 实参与形参

实参：arguments：值，调用时

形参：parameter：变量，声明时

# 4. 参数的种类

## 4.1 普通参数

## 4.2 引用参数

![1577975311325](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1577975311325.png)

在普通参数前面加上 ref。

引用参数的作用就是显示地指明会有副作用**改变**这个参数的值。

## 4.3 输出参数

![1577975432106](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1577975432106.png)

在普通参数前面加上 out。

引用参数是显示地指明会通过这个参数向外**输出**值。

## 4.4 数组参数 params

params 关键字前：

```C#
class Program
{
    static void Main(string[] args)
    {
        var myIntArray = new int[] { 1, 2, 3 };
        int result = CalculateSum(myIntArray);
        Console.WriteLine(result);
    }

    static int CalculateSum(int[] intArray)
    {
        int sum = 0;
        foreach (var item in intArray)
        {
            sum += item;
        }

        return sum;
    }
}
```

params 关键字后

```C#
class Program
{
    static void Main(string[] args)
    {
        int result = CalculateSum(1, 2, 3);
        Console.WriteLine(result);
    }

    static int CalculateSum(params int[] intArray)
    {
        int sum = 0;
        foreach (var item in intArray)
        {
            sum += item;
        }

        return sum;
    }
}
```

只能由一个参数，且参数只能是最后一个。

## 4.5 具名参数

不是参数的种类，而是参数的写法：

使用具名参数：参数的位置不再受约束。

具名参数的优点：

- 提高代码可读性

- 参数的位置不在受参数列表约束

```C#
class Program
{
    static void Main(string[] args)
    {
        PrintInfo("Tim", 34);

        PrintInfo(age: 24, name:"Wonder");
    }

    static void PrintInfo(string name, int age)
    {
        Console.WriteLine("Helllo {0}, you are {1}.",name,age);
    }
}
```

## 4.6 默认参数（可选参数）

可以在参数传入时指定默认值（同 JavaScript）。

## 4.7 扩展方法

![img](https://cdn.nlark.com/yuque/0/2018/png/101969/1542077341452-a488434a-9211-4572-906b-254c3c5aae15.png)

扩展方法前：

```C#
class Program
{
    static void Main(string[] args)
    {
        double x = 3.14159;
        // double 类型本身没有 Round 方法，只能使用 Math.Round。
        double y = Math.Round(x, 4);
        Console.WriteLine(y);
    }
}
```

扩展方法后：

```C#
class Program
{
    static void Main(string[] args)
    {
        double x = 3.14159;
        // double 类型本身没有 Round 方法，只能使用 Math.Round。
        double y = x.Round(4);
        Console.WriteLine(y);
    }
}

static class DoubleExtension
{
    public static double Round(this double input,int digits)
    {
        return Math.Round(input, digits);
    }
}
```



# 5. 数据类型

![1577970110939](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1577970110939.png)

# 6. 类型转换

![image-20200103105028684](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200103105028684.png)

# 7. 类

## 7.1 实例与静态字段

实例字段初始化的时机是在 实例创建的时候，而静态字段初始化的时机在运行环境加载数据类型的时候。

静态构造器只执行一次;

![image-20200103154545778](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200103154545778.png)

# 8. 装箱拆箱

 当我们把一个值类型装箱为引用类型时，数据从栈移动到堆上。反之，数据从堆移动到栈上。这种在堆和栈之间的移动带来了性能的损失。

数据从值类型转变为引用类型的过程称为“装箱”，反之为“拆箱”。 

 ![img](https://pic002.cnblogs.com/images/2010/141116/2010092121074950.jpg) 

栈内存的分配是从高内存地址到低内存地址的分配。

# 9. 构造函数

## 9.1 自定义构造器

![1577973518596](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1577973518596.png)

在构造函数内部自调用（即自定义构造器，如果不这样，会创建一个不带参数的默认构造器），然后进行赋默认值。后面的实例就会获得这个默认值。

## 9.2 带参数的构造器

![1577973755788](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1577973755788.png)

在定义构造函数的时候，自定义一个有参数的构造器，之后的实例在构造的时候必须带上参数。

注意：如果和定义默认参数的构造器一起使用，则这个构造器会被覆盖掉。

# 10 委托

## 10.1 委托类型

### 10.1.1Action

C# 提供的委托，是接受没有返回值的方法。

最基础的委托：Action，接受一个参数空不返回值的方法。

![image-20200103103013277](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200103103013277.png)

![image-20200103102955081](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200103102955081.png)

### 10.2.2 Func

和 Action 一样，Func 也是 C# 提供的委托，其有16种，随自己的需要选择。

Func 接受有返回值的方法。

### 10.3.3 自定义委托

**delegate** 关键字声明委托，其作用就是把方法当成参数传递。（因为 JavaScript 一开始就是可以把 Function 当作参数，所以这里忘了 C# 不能直接这样做，要使用委托）

委托是类，所以声明位置是和 class 处于同一个级别。但 C# 允许嵌套声明类（一个类里面可以声明另一个类），所以有时也会有 delegate 在 class 内部声明的情况。

```C#
public delegate double Calc(double x, double y);

class Program
{
    static void Main(string[] args)
    {
        var calculator = new Calculator();
        var calc1 = new Calc(calculator.Mul);

        Console.WriteLine(calc1(5, 6));
    }
}

class Calculator
{
    public double Mul(double x, double y)
    {
        return x * y;
    }

    public double Div(double x, double y)
    {
        return x / y;
    }
}
```

### 10.4.4 模板方法

### 10.5.5 回调方法

### 10.6.6 总结

委托是方法级别的耦合，要慎用。

委托可能穿透覆盖外层方法，造成逻辑错误，慎用。

委托可能造成内存泄漏，慎用。

## 10.2 委托使用方法

### 10.2.1 多播委托

![image-20200103185737843](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200103185737843.png)

一个方法调用多个委托，即多播委托。

### 10.2.2 隐式异步调用

使用 BeginInvoke()，在一个分支线程中调用这个方法。

# 11. 接口

用**接口**取**委托**。

# 12. 泛型：\<T\>

## 12.1 类型形参

![1577975147798](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1577975147798.png)

上面的意思是未来会有一个\<T\>（现在不知道的类型）类型参与进这个方法中。

类型形参可以构成方法的重载。

# 13. 重载（overload）

不同的参数类型，泛型，参数种类都能构成重载。

# 14. 其他

## 14.1 方法设计原则

一个方法只处理一个事情 ，最多两个，且两个的话一个是主方法，一个是辅方法。

## 14.2 异常处理原则

尽可能多地处理异常，以免程序崩溃。

## 14.3 算法题概述

多做算法题。

没做算法题都写总结！

# 15. 复习的底层原理视频

哔哩哔哩 C# 收藏夹《C#语言入门详解》第4章（系统默认，值类型，引用类型在内存中的存储）、第7章（装箱与拆箱在内存中的变化）、第9章（执行栈在内存中的存储）

# 16. C# 进阶必读书籍

![81223463](http://free-en-01.oss.tusy.xyz/202013/24878-d3yiok.bp5jm.png)

 

