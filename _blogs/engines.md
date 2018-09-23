# Rails Engines

## 关于Rails Engine
  Rails Engine是来自于官方Rails项目模块化的最佳方案。
  * [了解Rails Engine](https://guides.rubyonrails.org/engines.html)

## UI
  * [Semantic-UI](https://github.com/Semantic-Org/Semantic-UI)
  
## 如何使用
1. engines 提供了大量的针对Model层和Controller层的通用方法，我们尽可能采用Ruby中的 include(prepend)/extend 方式去引用。
  * include: 实例方法
  * prepend: 实例方法
  * extend: 类方法

  * 针对model和controller 提供的module, 统一放在各个项目 concerns 文件夹下面；

  如`the_auth`中在module `TheAuthUser` 提供了针对User的鉴权方法，使用时，在User模型中include即可。

  ```ruby
  class User < ApplicationRecord
    include TheAuthUser
  end
  ```
2. engines 预定义了大量model, 直接使用model看上去没有 include module 的方案灵活，实则不然。
  * ruby中对于预先定义过的class, 可直接使用class 关键字打开类，打开类的时候注意，继承的父类须保持一致, 或者省略继承。我们所提供的预定义的model,都是继承于类`ApplicationRecord`。
  * 在开发环境下(cache_classes设置为false)，主项目里定义的model 会默认优先于 engines 里的 model加载，需要在model定义之前 require engine里的model, 这并非副作用，可认为相当于使用 include 引入实例方法;
    
  ```ruby
  # 假设在engine the_trade 已定义 order model
  
  require_dependency 'the_trade/order'
  class Order < ApplicationRecord
  end
  ```
  * 默认位于engines中的model会加载，可以通过配置disable 某些model；
  ```ruby
    TheXxx.configure do |config|
      config.disabled_models = ['Model']
    end
    #或者
    TheXxx.config.disabled_models = ['']
  ```
3. Engines里的代码可以从各个层面去override;
  * model 层： 无论是include进来的module中的方法，还是重新打开类，定义同名方法即可，区别是include module引入的方法可以通过super去调用，而打开类只是被覆盖；
  * view 层： 以同样的路径覆盖位于engine中的文件即可。
  * controller/routes 层：在routes定义同路径路由覆盖; 

