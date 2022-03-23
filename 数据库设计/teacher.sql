use course_selection


-- 课程查询(查询教师教授的全部课程)
-- 返回 课程号、课程名、学分、院系
select course_id,course_name,credit,department from course  where teacher_id=<教师工号，登录时获得>

-- 查询自己教授的指定课程(通过输入文本框获取)的所有学生，及其成绩情况。------这是点击查看课程之后能看到的详细信息
-- 返回 课程号、课程名、学生学号、学生姓名、分数、绩点、学生所属院系
select course.course_id,course_name,student_id,(select student_name from student where student_id=selection.student_id) as student_name,grade,gpa,
(select department from student where student_id=selection.student_id) as department from
course left join selection on course.course_id=selection.course_id where teacher_id=<教师工号，登录时获得> and course.course_id=<查询时给定的课程号>

-- 修改学生成绩（通过分数单元格中的直接输入新值，教师应当只能修改该列的值，gpa会同步更改，无需关心）
-- 无返回值

DELIMITER //
create procedure updateGPA(in score int,in stid char(8),in cid char(2))
begin
	case
		when score>=90 then update selection set gpa=4.0 where student_id=stid and course_id=cid;
		when score>=85 then update selection set gpa=3.7 where student_id=stid and course_id=cid;
		when score>=82 then update selection set gpa=3.3 where student_id=stid and course_id=cid;
		when score>=78 then update selection set gpa=3.0 where student_id=stid and course_id=cid;
		when score>=75 then update selection set gpa=2.7 where student_id=stid and course_id=cid;
		when score>=72 then update selection set gpa=2.3 where student_id=stid and course_id=cid;
		when score>=68 then update selection set gpa=2.0 where student_id=stid and course_id=cid;
		when score>=66 then update selection set gpa=1.7 where student_id=stid and course_id=cid;
		when score>=64 then update selection set gpa=1.5 where student_id=stid and course_id=cid;
		when score>=60 then update selection set gpa=1.0 where student_id=stid and course_id=cid;
		else update selection set gpa=0.0 where student_id=stid and course_id=cid;
    end case;
end
//
DELIMITER ;
update selection set grade=<在单元格中获取输入的成绩> where student_id=<当前单元格所在行对应的学生的学号> and course_id=<当前单元格所在行对应的课程的课程号>
set sql_safe_updates = off;
call updateGPA(<在单元格中获取输入的成绩>,<当前单元格所在行对应的学生的学号>,<当前单元格所在行对应的课程的课程号>);
set sql_safe_updates = on;
