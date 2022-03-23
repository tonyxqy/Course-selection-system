-- 选课界面应当有的功能

-- 对于学生而言，首先登录之后应当有显示学生信息的板块(例如我们选课网站右侧的学生信息)，这些信息通过查询学生表得到。
-- 返回格式为 学号、姓名、性别、年龄、院系
select student_id,student_name,gender,age,department from student where student_id=<学生的学号，登录时已经得到>;

-- 已修课程成绩（显示所有已经修完的课程的相关信息），通过点击可以在主表格中显示相关信息。
-- 返回格式为 课程号、课程名、学分、院系、成绩、绩点 
select selection.course_id,course_name,credit,department,grade,gpa from selection left join course on selection.course_id=course.course_id
    where grade IS NOT NULL AND selection.student_id=<学生的学号，登录时已经得到>;

-- 可选课程（显示所有未修的课程的信息），通过点击可以在主表格中显示相关信息（可以通过勾选对应行完成选课）。
select * from course where course_id not in(
	select course_id from selection where student_id=<学生的学号，登录时已经得到>
);
-- 创建可选课程的视图，用于选课时的合法性判断。
create view valid as select * from course where course_id not in(
	select course_id from selection where student_id=<学生的学号，登录时已经得到>
);

-- 已选课程(显示所有已经选择的课程信息，即成绩为NULL的信息)，通过点击可以在主表格中显示相关信息（可以通过勾选对应行完成选课）。
-- 返回格式为 课程号、课程名、学分、院系、教师名
select course.course_id,course_name,credit,course.department,teacher_name from selection
left join course on selection.course_id=course.course_id
left join teacher on course.teacher_id=teacher.teacher_id
where student_id=<学生的学号，登录时已经得到> and grade is null;

-- 查询课程（通过输入框中的课程号、课程名称、教师名称、院系等条件列出所有满足条件的课程）
-- 返回格式为 课程号、课程名、学分、院系、教师名
select course.course_id,course_name,credit,course.department,teacher_name from 
course inner join teacher on course.teacher_id=teacher.teacher_id where <各种条件拼凑而成的查询结果，条件如下所示，如果对应输入框不为空就将其中的条件拼接>

course_id=<课程号>
course_name=<课程名称>
teacher_name=<教师名称>
course.department=<院系>

-- 选课按钮(按下即完成选中课程的选课)，其中的学号和课程号通过当前选中课程得到。
insert into selection values(
	<学号>,<课程号>,NULL,NULL
)

-- 退课按钮(按下即完成选中课程的选课)，其中的学号和课程号都通过当前选中课程得到。
delete from selection where student_id=<学号>,course_id=<课程号>


