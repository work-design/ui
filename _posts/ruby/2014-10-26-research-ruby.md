---
title: 研究ruby的一些小技巧
layout: post
category: ruby
---

## 关于类

```ruby
class Exam < ActionView::Base
end
```
- `Exam.superclass`  超类，顶级超类为`BaseObject`
- `Exam.ancestors`  类包含的模块（包含类本身）
- `Exam.included_modules`  类包含的模块（不包含类本身）
- `Exam.class_variables`  类的类变量（默认包含继承的类变量，参数`false`为不包含继承的类变量）
- `Exam.constants`  类的常数（默认包含继承的类变量，参数`false`为不包含继承的常数）
- `Exam.instance_methods`  类的实例方法（默认包含继承的类变量，参数`false`为不包含继承的实例方法）


## 关于对象

```ruby
a = Exam.new
```
- `a.class`  对象的类
- `a.object_id`  对象的“对象ID”，同名方法`a.__id__`
- `a.instance_variables`  对象的实例变量
- `a.instance_variable_get :@xx`  查看具体实例变量
- `a.methods`  对象包含的方法，通过传递参数可以查看一定范围内的方法，其他几个方法：`private_methods protected_methods public_methods singleton_methods`

## 关于方法

```ruby
def a.a_method
end
```

- `a.method(:a_method)`  得到一个method对象；
- `a.method(:a_method).source_location`  查看方法定义的文件及所在行；
