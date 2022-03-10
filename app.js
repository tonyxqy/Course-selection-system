// 注意修改了art-templte模块的规则，服务端仅能使用{{}}语法
// 修改位置在compile文件夹下的default.JS

// 引用express框架
const express = require("express");

// 创建网站服务器
const app = express();
// 数据库连接

// 规避同源策略
const cors = require("cors");
app.use(cors());

// 引用路径模块
const path = require("path");

// 静态资源访问，使用static中间件使得位于public内的静态资源无条件开放
// -------------------------------
// 开放静态资源文件-express，path
app.use(express.static(path.join(__dirname, "public")));
// -------------------------------

// 引入body-Parser
// -----------------------------------
// 借此可以使用req.body方法
const bodyParser = require("body-parser");
// 处理post参数
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// -----------------------------------

// 本地存储模块
// --------------------------------------
// 导入cookie模块中间件
// 引入cookie密钥以保证cookie安全性
// const {credentials} = require('./config');
// const cookieParser = require('cookie-parser');
// app.use(cookieParser(credentials.cookieSecret))
// 导入session模块中间件
// session实现内存存储
const session = require("express-session");
app.use(session({ secret: "secret key" }));
// ---------------------------------------

// express框架下模板引擎，express-art-template
// ------------------------------
// 告诉框架模板所在位置
// app.set('views',path.join(__dirname,'views'));
// // 告诉模板默认后缀是
// app.set('view engine','art');
// // 当渲染后缀为art时,使用的模板引擎
// app.engine('art',require('express-art-template'));
// -------------------------------

// 本项目不使用模板引擎
// 引入模板引擎，此模板引擎仅用于事件处理
// --------------------------------
// const template = require('art-template');
// // 引入dateformate 对时间归一化处理
// const dateFormat = require('dateformat');
// template.defaults.imports.dateFormat = dateFormat;
// --------------------------------

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "xuyq",
  database: "account",
});
connection.connect();
var course_selection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "xuyq",
  database: "course_selection",
});
course_selection.connect();

// 路由功能构建
// =================================
// app.METHOD路由处理函数
// 接收路径作为第一个参数
app.post("/login", (req, res) => {
  let { username, password, authority } = req.body;
  //   console.log(username, password, authority);
  var sql = `SELECT * FROM account.user WHERE username=${username} AND password='${password}' AND identity='${authority}'`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.send("error");
      return;
    }
    console.log(result[0].identity);
    if (result[0].identity == "学生") {
      var sql = `select student_id,student_name,gender,age,department from student where student_id=${result[0].username}`;
      course_selection.query(sql, function (err, result) {
        if (err) {
          console.log("[SELECT ERROR] - ", err.message);
          res.send("error");
          return;
        }
        res.send(result[0]);
      });
    } else {
      var sql = `select teacher_id,teacher_name,department,position from teacher where teacher_id=${result[0].username}`;
      course_selection.query(sql, function (err, result) {
        if (err) {
          console.log("[SELECT ERROR] - ", err.message);
          res.send("error");
          return;
        }
        console.log(result[0]);
        res.send(result[0]);
      });
    }
  });
});
app.post("/havechosen", (req, res) => {
  let student_id = req.body.student_id;
  var sql = `select course.course_id,course_name,credit,course.department,teacher_name from selection
    left join course on selection.course_id=course.course_id
    left join teacher on course.teacher_id=teacher.teacher_id
    where student_id=${student_id} and grade is null;`;
  course_selection.query(sql, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.send("error");
      return;
    }
    res.send(result);
  });
});
app.post("/deleteclass", (req, res) => {
  let { student_id, course_id } = req.body;
  // console.log(student_id,course_id)
  var sql = `delete from selection where student_id=${student_id} AND course_id=${course_id}`;
  course_selection.query(sql, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.send("error");
      return;
    }
    // console.log(result);
    res.send(result);
  });
});
app.post("/couldchose", (req, res) => {
  let student_id = req.body.student_id;
  var sql = `select * from course where course_id not in(
    select course_id from selection where student_id=${student_id});`;
  course_selection.query(sql, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.send("error");
      return;
    }
    res.send(result);
  });
});
app.post("/chengji", (req, res) => {
  let student_id = req.body.student_id;
  console.log(student_id);
  var sql = `select selection.course_id,course_name,credit,department,grade,gpa from selection left join course on selection.course_id=course.course_id
  where grade IS NOT NULL AND selection.student_id=${student_id};`;
  course_selection.query(sql, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.send("error");
      return;
    }
    res.send(result);
  });
});
app.post("/kecheng", (req, res) => {
  let { teacher_id, course_id } = req.body;
  var sql = `select course.course_id,course_name,student_id,(select student_name from student where student_id=selection.student_id) as student_name,grade,gpa,
  (select department from student where student_id=selection.student_id) as department from
  course left join selection on course.course_id=selection.course_id where teacher_id="${teacher_id}" and course.course_id="${course_id}"`;
  course_selection.query(sql, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.send("error");
      return;
    }
    // console.log(result);
    res.send(result);
  });
});
app.post("/changevalue", (req, res) => {
  let { course_id, student_id, grade } = req.body;
  console.log(course_id, student_id, grade);
  var sql = `update selection set grade=${grade} where student_id="${student_id}" and course_id="${course_id}";`;
  course_selection.query(sql, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.send("error");
      return;
    }
    var sql = `call updateGPA(${grade},"${student_id}","${course_id}");`;
    course_selection.query(sql, function (err, result) {
      if (err) {
        console.log("[SELECT ERROR] - ", err.message);
        res.send("error");
        return;
      }
    });
  });
});
app.post("/xuanke", (req, res) => {
  let { student_id, course_id } = req.body;
  var sql = `insert into selection values('${student_id}','${course_id}',NULL,NULL);`;
  course_selection.query(sql, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.send("error");
      return;
    }
    console.log(result);
    res.send(result);
  });
});
app.post("/course", (req, res) => {
  var sql = `select * from course;`;
  course_selection.query(sql, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.send("error");
      return;
    }
    console.log(result);
    res.send(result);
  });
});
app.post("/account", (req, res) => {
  var sql = `select * from user;`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.send("error");
      return;
    }
    console.log(result);
    res.send(result);
  });
});
app.post("/accountadded", (req, res) => {
  let { username, password, identity } = req.body;
  var sql = `insert into user values("${username}","${password}","${identity}");`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.send("error");
      return;
    }
    console.log(result);
    var sql = `select * from user;`;
    connection.query(sql, function (err, result) {
      if (err) {
        console.log("[SELECT ERROR] - ", err.message);
        res.send("error");
        return;
      }
      console.log(result);
      res.send(result);
    });
  });
});
app.post("/student", (req, res) => {
  var sql = `select * from student;`;
  course_selection.query(sql, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.send("error");
      return;
    }
    console.log(result);
    res.send(result);
  });
});
app.post("/mylesson", (req, res) => {
  let teacher_id = req.body.student_id;
  var sql = `select course_id,course_name,credit,department from course  where teacher_id='${teacher_id}'`;
  course_selection.query(sql, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.send("error");
      return;
    }
    console.log(result);
    res.send(result);
  });
});
app.post("/studentadded", (req, res) => {
  let { student_id, student_name, gender, age, department, fee } = req.body;
  var sql = `insert into student values("${student_id}","${student_name}","${gender}","${age}","${department}","${fee}");`;
  course_selection.query(sql, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.send("error");
      return;
    }
    console.log(result);
    var sql = `select * from student;`;
    course_selection.query(sql, function (err, result) {
      if (err) {
        console.log("[SELECT ERROR] - ", err.message);
        res.send("error");
        return;
      }
      console.log(result);
      res.send(result);
    });
  });
});
app.post("/teacher", (req, res) => {
  var sql = `select * from teacher;`;
  course_selection.query(sql, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.send("error");
      return;
    }
    console.log(result);
    res.send(result);
  });
});
app.post("/teacheradded", (req, res) => {
  let { teacher_id, teacher_name, department, position } = req.body;
  var sql = `insert into teacher values("${teacher_id}","${teacher_name}","${department}","${position}");`;
  course_selection.query(sql, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.send("error");
      return;
    }
    console.log(result);
    var sql = `select * from teacher;`;
    course_selection.query(sql, function (err, result) {
      if (err) {
        console.log("[SELECT ERROR] - ", err.message);
        res.send("error");
        return;
      }
      console.log(result);
      res.send(result);
    });
  });
});
app.post("/courseadded", (req, res) => {
  let { course_id, course_name, credit, department, teacher_id } = req.body;
  var sql = `insert into course values("${course_id}","${course_name}","${credit}","${department}","${teacher_id}");`;
  course_selection.query(sql, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.send("error");
      return;
    }
    console.log(result);
    var sql = `select * from course;`;
    course_selection.query(sql, function (err, result) {
      if (err) {
        console.log("[SELECT ERROR] - ", err.message);
        res.send("error");
        return;
      }
      console.log(result);
      res.send(result);
    });
  });
});

// ==================================

// 错误处理中间件
// -------------------------------------
app.use((err, req, res, next) => {
  const result = JSON.parse(err);
  let params = [];
  for (let attr in result) {
    if (attr != "path") {
      params.push(attr + "=" + result[attr]);
    }
  }
  res.redirect(`${result.path}?${params.join("&")}`);
});
// -------------------------------------

// 监听端口
app.listen(3000);
console.log("网站服务器启动成功，请访问localhoast");
