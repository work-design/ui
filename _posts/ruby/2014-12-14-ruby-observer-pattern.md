---
layout: post
title: 设计模式之观察者模式
category: ruby
---

举这么个例子，假定你娶了个贤惠的小媳妇，小媳妇最喜欢的事情就是“你发工资了”，银行为你的工资卡提供了一个“余额变化提醒”的功能，于是小媳妇把她的手机号设成了通知手机，你发工资了这个事件小媳妇就会第一时间知道。

在这个过程中：

- “观察者（Observer）”是小媳妇；
- “观察者目标”是你；
- “观察事件”是你发工资了；
- “发布通知者”是银行。

观察者一般可以不止一个，假定你还有个小情人（女儿），小情人最喜欢的事情也是你“发工资了”，小情人也可以成为你的观察者。

观察者（Observer）模式又名发布-订阅（Publish/Subscribe）模式。定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知。

下面我们利用ruby标准库中自带的`observer`库来实现一个观察者模式的范例。

```ruby
require 'observer'

# 被观察者
class ObservableTarget
  include Observable
end

# 观察者-小媳妇
class ObserverWife

  # update方法是回调方法，notify_observers时调用
  def update(arg)
    puts "通知小媳妇" + arg
  end

end

# 观察者-小情人
class ObserverDaughter

  def update(arg)
    puts "通知小情人" + arg
  end

end
```

调用代码

```ruby
# 被观察者初始化
target = ObservableTarget.new

# 观察者初始化
wife = ObserverWife.new
daughter = ObserverDaughter.new

# 添加监视对象 小媳妇
target.add_observer(wife)

# 被观察者改变了
target.changed

# 通知观察者
target.notify_observers("发工资了")
# => 通知小媳妇发工资了

# 添加监视对象 小情人
target.add_observer(daughter)

# 被观察者改变了
target.changed

# 通知观察者
target.notify_observers("发工资了")
# => 通知小媳妇发工资了
# => 通知小情人发工资了
```
