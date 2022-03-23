-- 创建数据库
drop database course_selection
CREATE DATABASE course_selection
USE course_selection


-- 创建学生表
CREATE TABLE student(
	student_id CHAR(8) NOT NULL,
    student_name CHAR(12),
    gender CHAR(2),
    age INT,
    department CHAR(36),
    fee FLOAT(2),
    PRIMARY KEY(student_id)
)COLLATE utf8_general_ci DEFAULT CHARACTER SET utf8;


-- 创建教师表
CREATE TABLE teacher(
	teacher_id CHAR(4),
    teacher_name CHAR(12),
    department CHAR(36),
    position CHAR(12),
    PRIMARY KEY(teacher_id)
)COLLATE utf8_general_ci DEFAULT CHARACTER SET utf8;

-- 创建课程表
CREATE TABLE course(
	course_id char(2),
    course_name CHAR(24),
    credit INT,
    department CHAR(36),
    teacher_id CHAR(8),
    PRIMARY KEY(course_id),    
    FOREIGN KEY(teacher_id) REFERENCES teacher(teacher_id)
)COLLATE utf8_general_ci DEFAULT CHARACTER SET utf8;

DROP TABLE selection;
-- 创建选课表
CREATE TABLE selection(
    student_id CHAR(8),
    course_id CHAR(2),
    grade INT,
    gpa FLOAT(1),
    FOREIGN KEY(student_id) REFERENCES student(student_id),
    FOREIGN KEY(course_id) REFERENCES course(course_id),
    PRIMARY KEY(student_id,course_id)
)COLLATE utf8_general_ci DEFAULT CHARACTER SET utf8;

