---
title: 如何写rakefile
layout: post
category: ruby
published: true
---

rake 是ruby世界里一个非常好用的任务构建工具，其江湖地位极高。

### rake是如何工作的

要在项目中运行rake命令，需要首先在项目中包含一个`Rakefile`文件。不然会报如下错误：

```
rake aborted!
No Rakefile found (looking for: rakefile, Rakefile, rakefile.rb, Rakefile.rb)

(See full trace by running task with --trace)
```

我们来看看rake是如何运行的，rake命令的源码中主要是调用了`Rake::Application`对象的一个`run`方法：

```ruby
require 'rake'

Rake.application.run
```

 Rake::Application对象的`run`方法主要做了以下三件事情：

 - Initialize the command line options (+init+).
 - Define the tasks (+load_rakefile+).
 - Run the top level tasks (+top_level+).

### rakefile如何定义rake任务

假设我们写了几个rake任务，目录结构如下：

```
bootstrap/
├── tasks/
   ├── bootstrap.rake
   └── test.rake
```
然后在`Rakefile`里`import`进来rake文件，代码如下：

```ruby
#!/usr/bin/env rake

import 'tasks/bootstrap.rake'
import 'tasks/test.rake'
```

rake的import方法 同 Ruby 的 require 不一样，import 并不是立即进行导入的，而是在整个 Rakefile 执行结束之后才全部导入，因此，可以在任意的地方写 import ，而不用担心依赖关系，需要共享的变量之类的只要在主 Rakefile 中定义了即可。

运行`rake --tasks`就能看到任务正常加载进来了。
