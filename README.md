## WHMALL UI

#### 说明
- 基于 [Semantic-UI](https://github.com/Semantic-Org/Semantic-UI) 改造;


#### 浏览器支持详细

| 功能 | 支持情况 | 涉及组件 |
|---|---|---|
| flex | IE 10 | items, side |



### 使用方法
- 安装less: `npm install -g less`, less命令为`lessc`
- 安装: `npm install -g less-plugin-clean-css`

### 生成
- `lessc --clean-css whmall-ui.less whmall-ui.css`

### 本地开发
- `bundle install`
- `jekyll s`

### 优化改造
- 不让语义话标签影响样式

#### 参考文档
[flexbox](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes)