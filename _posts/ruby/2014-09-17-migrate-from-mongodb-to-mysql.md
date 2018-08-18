---
title: 从mongodb向mysql迁移数据
layout: post
category: database
---

## 数据迁移指南

### 从mongodb导出csv格式数据

- 命令：`mongoexport`
#### 参数
- `-d`: 指定数据库，`-d status_dev`
- `-c`: 指定collicitons，`-c users`
- `-q`: 指定查询条件，注意条件中出现的`$`符号需要转义`\$`
- `--csv`: 导出为csv格式
- `-f`: 指定导出的列，csv必须，`-f user_key,token,user_behavior._id`
- `-o`: 指定导出文件及位置，`-o ~/work/users.csv`

完整示例：

```bash
mongoexport \
-d status_dev \
-c users \
-q "{'user_behavior.current_thin_plan_milestone': {'\$ne': null} }" \
--csv \
-f user_key,user_behavior.current_thin_plan_milestone,user_behavior.thin_plan_milestone_completed_on \
-o ~/work/users.csv
```

### 导入csv格式数据至mysql

```sql
load data infile '~/work/users.csv'   -- 为了安全，如果文件路径为根路径，需要使用load data local infile
into table users
fields terminated by ','  -- 字段之间以逗号分隔
fields enclosed by '"'  -- 字符串以半角双引号包围
fields escaped by '"'  -- 字符串本身的双引号用"转义，即用两个双引号表示，也有用\转义
lines terminated by '\r\n'  -- 数据行之间以\r\n分隔
ignore 1 lines;  -- 另外，第一行标题行需要单独设置。
```

里面最关键的部分就是格式参数，这个参数是根据RFC4180文档设置的，该文档全称Common Format and MIME Type for Comma-Separated Values (CSV) Files，其中详细描述了CSV格式。



