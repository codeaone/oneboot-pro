以oneboot来做最基础的框架，在这基础上实现更多的示例
一些高频使用的工具类，统一使用core包下的，这样可以统一大家的使用习惯
所有的第三方组件，都有必要做一些浅浅的封装，方便保持代码风格上的统一
日志：日志分片，日志脱敏，摘要日志（web,http,prc,redis,mq,dao的层的日志打印）
异常：异常的定义，使用
文件上传，下载，导入，导出方案
权限，审计日志，
前端UI组件+业务组件
先弄一个完整的CRUD，导入导出，文件上传等功能
所有的URL统一使用小写，采用Rest风格
数据扩展JSON
数据字典


## 数据格式检查
非空，长度，枚举
数据字典
数据格式检查


需要完成的列表：
1、完成信息脱敏功能，包括：日志，web，json输出方式
2、完成切面摘要日志打印：web，rpc，service，dal，dal-query，redis，mq
3、完成一个标准的CURD，导入导出功能
4、针对POST场景下的接口幂等实现
5、实现数据字典的设计与功能实现
6、处理下mysql层面几个常见的异常：主键冲突，长度超出，值不为空
7、spring 的一些常用注解，及使用场景说明
8、逻辑删除，版本更新，历史表，快照表的设计与实现
9、表动态扩展方案与实现
10、依赖其它表字段时，页面上需要显示中文，通用解决方案（缓存+in ids查询）
11、系统参数配置设计与实现，需要做到页面上能友好的配置，针对多环境，记录变更版本
12、 
针对表字段变更记录，有没有好的方案
审计，
Controller 控制层，在控制层，不要写业务代码？ 前后分离后，控制层就失去了作用，
控制什么？控制显示数据？数据流转。 控制路由！现在这个路由在前端处理了，后端不需要关注，只需要处理接口请求与响应。
manger 管理层
service
dao
@Component 那这个什么时候使用
以上每个节点，都需要考虑非常的细致，需要去考虑更多的实际使用场景