use course_selection;

-- 查看课程表
-- 返回 课程号、课程名、学分、院系、教师号
select * from course;

-- 插入新课程(其中各个参数都通过输入框得到)
-- 返回 空
insert into course values(<课程编号>,<课程名称>,<学分>,<院系>,<教师工号>);
-- 删除当前课程(各个参数通过当前行得到)
-- 返回 空
delete from course where course_id=<当前行的课程号>;


-- 查看教师表
-- 返回 工号、教师姓名、院系、职位
select * from teacher;
-- 添加新教师(其中各个参数都通过输入框得到)
-- 返回 空
insert into teacher values(<教师工号>,<教师姓名>,<院系>,<职位>);
-- 删除当前教师信息(各个参数通过当前行得到)
-- 返回 空
delete from teacher where teacher_id=<当前行的教师工号>;


-- 查看学生表
-- 返回 学号、姓名、性别、年龄、院系、学费
select * from student;
-- 添加新学生(其中各个参数都通过输入框得到)
-- 返回 空
insert into student values(<学号>,<姓名>,<性别>,<年龄>,<院系>,<学费>);
-- 删除当前学生信息(各个参数通过当前行得到)
-- 返回 空
delete from student where student_id=<当前行的学生学号>;

-- 查看选课表
-- 返回 学号、课程号、成绩、绩点
select * from selection;
-- 插入选课记录(其中各个参数都通过输入框得到)
-- 返回 空
insert into selection values(<学号>,<课程号>,<分数>,<绩点>);
-- 删除当前选课记录(各个参数通过当前行得到)
-- 返回 空
delete from selection where course_id=<当前选课记录的课程号> and student_id=<当前选课记录的学号>;


-- 账户数据库的维护

-- 查看账户数据库
-- 返回 账户名、密码、身份
use account;
select * from user;
-- 插入账户数据
-- 返回 空
insert into user values(<账户名>,<密码>,<身份>);
-- 删除账户数据
-- 返回 空
delete from user where username=<当前行的账户名>;



-- 如果需要有修改密码的功能可以找我，和修改学生成绩类似，不是很复杂。


