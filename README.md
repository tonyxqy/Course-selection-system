

实现了一个简易的选课系统，系统面向管理员、教师和学生三类用户，分别提供数据库维护、成绩评分和选课等功能。本报告将从数据库设计开始简要介绍系统的开发过程，并给出主要功能的效果展示（程序的功能图如下所示）。

![图示  描述已自动生成](file:///C:/Users/tony5/AppData/Local/Temp/msohtmlclip1/01/clip_image003.gif)

图1 系统功能图

数据库设计

​     程序包含两个数据库account和course_selection，前者用于存储用户账号、密码和身份信息，后者则用于存储包含课程、学生、教师和选课的相关信息。

account数据库

![表格  描述已自动生成](file:///C:/Users/tony5/AppData/Local/Temp/msohtmlclip1/01/clip_image005.gif)account数据库仅包含user一张表，该表的关系模式为USER(username,password,identity)。

其中username为用户名；password为用户的密码；而identity则为用户的身份信息，可选的身份包含管理员、教师和学生三种。

为了方便演示，数据表中已经内置了部分用户信息(如右图所示)，其中所有用户的密码字段都被设为12345678。

 

​                                                   图2 account数据库初始信息

course_selection数据库

course_selection数据库包含学生表student、教师表teacher、课程表course以及选课表selection共四张表，各表的关系模式如下所示(其中的主键和外键信息都已经用下划线或波浪线标识)：

STUDENT(student_id,student_name,gender,age,department,fee)

TEACHER(teacher_id,teacher_name,department,position)

COURSE(course_id,course_name,credit,department,teacher_id)

![img](file:///C:/Users/tony5/AppData/Local/Temp/msohtmlclip1/01/clip_image006.gif)SELECTION(student_id,course_id,grade,gpa)

​      学生表student中各个字段的含义为学生学号、姓名、性别、年龄、院系以及学费；教师表teacher中各个字段的含义为教师工号、姓名、院系以及职位；课程表course中各个字段的含义为课程号、课程名称、学分    选课表selection中各个字段的含义为学生学号、课程号、成绩和绩点。根据上面的分析，最终得到的数据库E-R图如下图所示。

![图示  描述已自动生成](file:///C:/Users/tony5/AppData/Local/Temp/msohtmlclip1/01/clip_image008.gif)

图3 E-R图

​      同样地，为了方便进行测试和演示，上述四张表中都已经预写入了相关数据，由于篇幅限制，此处不再一一列出。

功能实现

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

实现技术

本程序的UI采用了基于M-V-VM模式的渐进式框架Vue实现Web页面。本项目采用了“bootstrap”框架搭建响应式页面骨架，基于CSS 扩展语言less，html，js编写静态组件，通过“Vue.js”声明式渲染操作DOM，实现数据变化时的自动视图渲染。引入前端路由“Vue-Router”实现组件间切换将Website 转变为 SPA。利用“V-cli”脚手架组装组件并打包。前端与后端的通信采用axios封装ajax异步HTTP请求，以JSON格式POST方法与后端动态数据交互。

本项目设计了侧边栏，头部栏，展示格等组件，实现多页面代码复用，数据动态绑定。页面设计了登录，主页，查询已选课程，查看所授课程等页面，并建立路由守卫，实现管理员，教师，学生页面相分离。本项目在安全方面有些许简化，未采用cookies与tooken，通过写入浏览器session的方式实现登录。

本程序后端页面采用Node.js Express Web服务端框架。在Express框架中本项目定义中间件来响应 HTTP 请求，采用cors插件规避跨域同源共享问题，采用bodyparser解析HTTP请求体。在后端框架中运用nodejs与本地MySql互联，针对不同HTTP请求访问数据库并返回。

功能演示

根据上面介绍的功能分析和实现，本环节将一一做出相应的演示。主要包含登录界面以及三个用户界面展示，并给出主要功能的简要说明。

登录界面

​      本程序的登录界面如下图所示，可以通过radiobutton控件选择用户的身份，在下方的输入框中输入自己的账号和密码即可登陆系统。

![IMG_256](file:///C:/Users/tony5/AppData/Local/Temp/msohtmlclip1/01/clip_image010.jpg)

图4 登录界面

学生界面

当以正确的密码和身份登录学生账号之后就能进入学生界面了，由于身份权限的限制，学生账户将只能使用左侧属于学生的功能。默认界面是学生选课提醒页面，在这里学生能够看到待选的课程。

 

![IMG_256](file:///C:/Users/tony5/AppData/Local/Temp/msohtmlclip1/01/clip_image012.jpg)

图5 学生界面

点击查询已修课程成绩按钮即可查看所有已修课程的成绩，该界面中的所有信息都是只读的。

![XYT1`F827`K859FYJ2R4]3R](file:///C:/Users/tony5/AppData/Local/Temp/msohtmlclip1/01/clip_image014.jpg)

图6 成绩查询界面

​       此时点击选课界面即可开始选课，选课页面中会显示所有可选课程，点击课程的标签就会弹出课程信息，此时点击确定选课即可完成选课。

![2{KT$9(1]WTO_~J`KZ{MFA5](file:///C:/Users/tony5/AppData/Local/Temp/msohtmlclip1/01/clip_image016.jpg)

图7 选课界面

​      退课的过程与之类似，为了节省篇幅，各个界面这里就不一一介绍了。

教师页面

教师登录后自动进入教师页面，教师页面的结构与学生界面类似，不同的只是能够执行的功能。默认界面可以直接看到自己所授课程，并且没有访问学生或管理员功能的权限。

 

![IMG_256](file:///C:/Users/tony5/AppData/Local/Temp/msohtmlclip1/01/clip_image018.jpg)

图8 教师界面

在该界面点击某课程即可查看该课程的所有学生和成绩信息，点击其中的蓝色小按钮即可进入打分状态，在弹出的输入框中输入学生学号和成绩即可完成对改学生的评分，后端的SQL语句将会自动根据成绩计算对应的绩点并更新数据库。

![NQ8{%993KB2QC~@4MB{$5EA](file:///C:/Users/tony5/AppData/Local/Temp/msohtmlclip1/01/clip_image020.jpg)

图9 打分界面

 

管理员页面

管理员登陆成功后即可进入系统维护页面，同样地，管理员也只能使用针对管理员开发的接口，执行不属于管理员的功能将会提示无权限。

![IMG_256](file:///C:/Users/tony5/AppData/Local/Temp/msohtmlclip1/01/clip_image022.jpg)

通过左侧的功能菜单可以知道管理员系统包含account数据库的账户管理和course_selection数据库中各表的数据管理，具体内容无非是对数据库的增删改查，这里不做具体的演示。