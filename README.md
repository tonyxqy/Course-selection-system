

实现了一个简易的选课系统，系统面向管理员、教师和学生三类用户，分别提供数据库维护、成绩评分和选课等功能。

# 功能实现

​      按照项目需求，设计的程序需要设计学生、教师和管理员三类用户的接口，并分别实现各自需要的功能，比如学生的课程查询、选课和退课，教师的教授课程查询、课程打分，管理员的对数据库的增删改查等等，下面分别做出相关的介绍。

学生

​      学生需要的功能大致可以分为查询所有课程、查询可选课程、查询已选课程成绩、选课课程以及退出课程，涉及的数据表包含学生表student、课程表course和选课表selection。

​      上述五个功能基本都只需要按照条件查询数据库并在用户界面显示出来，要使用的SQL语句也只有SELECT。当然对于选课和退课而言则需要涉及对数据库的增和删，对应的是INSERT和DELETE语句。下面给出这部分功能的SQL语句。

| 查询学生信息   select   student_id,student_name,gender,age,department from student where   student_id=<学生的学号，登录时已经得到>; |
| ------------------------------------------------------------ |
| 查询已修课程成绩    Select selection.course_id, course_name, credit,   department, grade, gpafrom selection left join course on selection.course_id =   course.course_id where grade IS NOT NULL AND selection.student_id = <学号>; |
| 查询可选课程   select * from course where course_id not in( select course_id from selection where   student_id=<学号>); |
| 查询已选课程   select course.course_id, course_name, credit,   course.department, teacher_name from selection left join course on   selection.course_id = course.course_id left join teacher on course.teacher_id   = teacher.teacher_id where student_id = <学号>   and grade is null; |
| 选课   insert into selection values( <学号>, <课程号>, NULL,   NULL); |
| 退课   delete from selection where student_id=<学号>,course_id=<课程号>; |

​      当然上面并不是所有用到的SQL语句，在课程查询界面学生还能够通过限定课程号、课程名称和院系等信息搜索满足条件的课程，该功能的实现需要在后端利用字符串按条件拼接，这里受篇幅所限不详细列出。

教师

​      教师需要的功能主要是查询自己教授的课程以及为上自己课的学生打分，由于有绩点字段的存在，需要保证成绩与绩点的同步更改，不过为了方便，教师仅需输入成绩，对应的绩点将由系统自动计算并更新。这部分功能涉及的数据表有课程表course、教师表teacher以及选课表selection。

​      总结上面的两个主要功能，分别需要多表查询相关信息以及利用UPDATE语句更新选课表成绩字段的值，相应的SQL语句如下所示。

| 查询自己教授的指定课程   select course.course_id, course_name,   student_id, (select student_name from student where student_id =   selection.student_id) as student_name, grade, gpa, ( select department from   student where student_id = selection.student_id ) as department from course   left join selection on course.course_id = selection.course_id where   teacher_id = <工号>   and course.course_id = <课程号> |
| ------------------------------------------------------------ |
| 为某课程的某个学生打分   update selection set grade=<成绩> where student_id=<学号> and course_id=<课程号> |

​      为了实现成绩与绩点的实时更新，可以通过创建并调用对应的存储过程根据成绩计算并更新绩点的值，存储过程定义的SQL语句虽然不难但是比较繁琐，如下所示。



​      上面的几个SQL语句共同实现了教师需要的两个主要功能，当然老师也拥有和学生一样的有关课程查询的相关功能，这部分的SQL语句与学生类似，此处不再列出。

管理员

​      管理员是大多数数据库管理系统都具有的一个重要角色，主要负责各个数据库的维护，拥有修改数据库中任意数据的权限。本程序中管理员的功能主要有：account数据库的增删，其实就相当于用户的注册和注销操作；course_selection数据库的增删改查，用于在选课时间过后为学生退课或选课，当然还有学生、教师与课程信息的维护。

​      具体到SQL语句的编写，由于对每张表的处理过程都类似（都是利用INSERT和DELETE进行行的增加和删除、利用SELECT查询数据库中的信息），且没有像学生和教师那样进行定制化查询的需求（基本不需要多表查询），所以用到的SQL语句都比较简短，由于此部分SQL语句的数量较多，这里也就不一一列出了。

# 实现技术

本程序的UI采用了基于M-V-VM模式的渐进式框架Vue实现Web页面。本项目采用了“bootstrap”框架搭建响应式页面骨架，基于CSS 扩展语言less，html，js编写静态组件，通过“Vue.js”声明式渲染操作DOM，实现数据变化时的自动视图渲染。引入前端路由“Vue-Router”实现组件间切换将Website 转变为 SPA。利用“V-cli”脚手架组装组件并打包。前端与后端的通信采用axios封装ajax异步HTTP请求，以JSON格式POST方法与后端动态数据交互。

本项目设计了侧边栏，头部栏，展示格等组件，实现多页面代码复用，数据动态绑定。页面设计了登录，主页，查询已选课程，查看所授课程等页面，并建立路由守卫，实现管理员，教师，学生页面相分离。本项目在安全方面有些许简化，未采用cookies与tooken，通过写入浏览器session的方式实现登录。

本程序后端页面采用Node.js Express Web服务端框架。在Express框架中本项目定义中间件来响应 HTTP 请求，采用cors插件规避跨域同源共享问题，采用bodyparser解析HTTP请求体。在后端框架中运用nodejs与本地MySql互联，针对不同HTTP请求访问数据库并返回。

# 使用方法

0 下载安装node.js 
1 打开文件夹，npm install 
2 node app.js 到此为止打开了后端
3 打开fronthead文件夹 npm install
4 npm run serve 打开前端代理 根据提示打开网址。