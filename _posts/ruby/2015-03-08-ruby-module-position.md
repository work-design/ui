---
layout: post
category: ruby
title: 如何动态改变某个class的祖先链
---

在rails中，一个Controller的祖先链中定义了数个名为`process_action`的方法。

分别位于如下`module`中：

* `ActionController::ParamsWrapper`
* `ActionController::Instrumentation`
* `AbstractController::Callbacks`

在不同的模块中，方法`process_action`分别承载了一个功能，然后交处理通过`super`交给父类中的`process_action`继续处理。摘取其中一个方法的源码，如下：

```ruby
# File actionpack/lib/action_controller/metal/params_wrapper.rb, line 232
def process_action(*args)
  if _wrapper_enabled?
    if request.parameters[_wrapper_key].present?
      wrapped_hash = _extract_parameters(request.parameters)
    else
      wrapped_hash = _wrap_parameters request.request_parameters
    end

    wrapped_keys = request.request_parameters.keys
    wrapped_filtered_hash = _wrap_parameters request.filtered_parameters.slice(*wrapped_keys)

    # This will make the wrapped hash accessible from controller and view
    request.parameters.merge! wrapped_hash
    request.request_parameters.merge! wrapped_hash

    # This will display the wrapped hash in the log file
    request.filtered_parameters.merge! wrapped_filtered_hash
  end
  super
end
```

这是一个很有意思的利用ruby高级特性的设计。顺便提一下，我也是通过这个设计明白了，在ruby中为什么`方法名相同，参数数目不相同`并不被视作不同方法的一个好处了（否则这个黑魔法就不够好玩了）。

这个行为很像rack中中间件设计。我现在的需求是插入一个module到Controller的祖先链中，但我同样希望能够控制这个module的位置。

经过几天的思考，找到了解决办法，简单且巧妙。

```ruby
ActionController::HttpAuthentication::Token::ControllerMethods.include Light::Instrumentation
ActionController::Base.include ActionController::HttpAuthentication::Token::ControllerMethods
```

即：首先在你想插入的位置所在的module中include你所自定义的module，然后在重新include一下所在位置的那个module。

下一个问题：Controller祖先链中的大部分module都extend了`ActiveSupport::Concern`，这个将当前模块的祖先链扁平化了？所以include的自定义模块并不能出现在祖先链中。如上例中，我好不容易才找了一个没有extend concern 模块的module。
