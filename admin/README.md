权限后台：
vue：
地址栏：通过 router.addRoute 用来动态添加路由  相当于先创建共同的路由 再根据不同身份创建不同的路由
左侧菜单：
门户系统中：先固定创建界面再通过vAdmin自定义指令 来判断
react中：
 地址栏：先有一个总的路由 最后根据身份的权限来限制过滤路由
 左侧菜单：也是有一个总路由数组 然后有个人路由数组 最后过滤出来

 particles.vue3 进行粒子效果
 vuex-persistedstate 进行vuex持久化

 使用nodejs express server初始化
 然后在routes中创建路由(可以进行模块化) 使用mongoose来连接 创建模型以及注册数据库   
 在app中注册该路由  

 后台项目步骤：
 1.写好外层路由 如login与mainbox  使用router.addRoute 用来动态添加路由
 2.写好各个组件基本结构 
 3.将登陆界面与后台界面完成
 4.使用nodejs完成接口 vue使用反向代理：
    (1)初始化 express server
    (2)然后在routes中创建路由(可以进行模块化)
    (3)使用mongoose来连接  创建模型
    (4)在app中注册该路由 
    (5)注册数据库 在www中引入 
5.做登录鉴权：使用jsonwebtoken
   (1).封装JWT方法：加密生成token与解密token
   (2)在登录接口中使用加密方法生成token之后放在响应头res.header中
   (3)使用axios拦截器 在响应体中本地存储token
   (4)在axios请求拦截器中 将本地存储的token放在请求头中
   (5)在express的app中使用中间件来验证token：
         1.首先剔除登录接口
         2.拿到请求头中的token
         3.使用JWT解密方法解析token
         4.如果token没过期能获取到则使用JWT加密重新获得新token并再次放在响应头中
         5.如果token过期 则返回状态401 并在axios响应体中跳转到登陆界面

文件上传：
上传图片的原始对象 
使用multer来处理multipart类型的文件上传，作为中间件
然后将该文件放在req中
读取src时要加上后端服务器的地址


富文本编辑器使用wangeditor
时间处理使用moment
传子组件的值如果还没生成的话可在子组件使用v-if
v-html读取带有标签的内容

进度条使用nprogress 放在路由守卫中
搜索框使用了el-popover

详情跳详情 使用watchEffect 同时判断参数 return;

