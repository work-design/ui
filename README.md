## Work Design UI

Work Design UI 是Work Design 所使用的UI框架，是对多个UI框架的优化和改进；

- [weui](https://github.com/Tencent/weui)
- [Fomantic-UI](https://github.com/fomantic/Fomantic-UI)

我们对原生框架采用了 可插拔，非侵入式的改进。

#### 浏览器支持详细

| 功能 | 支持情况 | 涉及组件 |
|---|---|---|
| flex | IE 10 | items, side |



### 使用方法
- 安装less: `npm install -g less`, less命令为`lessc`

### 生成
* `yarn run semantic_css`

### 本地开发
1. `git submodule update --init`
2. `yarn run prepare`
2. `yarn install`
3. `yarn run dev`


### 优化改造
- 不让语义化标签影响样式

#### 参考文档
[flexbox](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes)
