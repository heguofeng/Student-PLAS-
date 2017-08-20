var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://localhost:27017/student");

//如果连接成功会执行error回调
db.connection.on("error", function(error) {
    console.log("数据库连接失败：" + error);
});
//如果连接成功会执行open回调
db.connection.once("open", function() {
    console.log("数据库连接成功");
});
//用来定义自增长id
var i = 0;

//定义一个 schema,描述此集合里有哪些字段，字段是什么类型
var StudentSchema = new mongoose.Schema({
    _id: { type: Number, default: function() { return i++; } },
    college: { type: String },
    name: { type: String },
    sex: { type: String },
    age: { type: Number },
    student_id: { type: Number }
});

//创建模型，可以用它来操作数据库中的Info集合，指的是整体
//加入第三个参数为collection name，否则会变成复数
var StudentModel = db.model("Info", StudentSchema, "Info");


module.exports = {
    //获得所有学生记录
    getStudents: () => {
        const data = StudentModel.find(function(err, docs) {
            if (err) {
                console.log("查找出错" + err);
                return;
            } else {
                // console.log("数据：" + docs);
            }
        });
        return data;
    },
    //创建一条学生记录
    createStudent: (college, name, sex, age, student_id) => {
        var StudentEntity = new StudentModel({
            college: college,
            name: name,
            sex: sex,
            age: age,
            student_id: student_id
        });
        // console.log(StudentEntity);
        var data = StudentEntity.save(function(err, docs) {
            if (err) {
                console.log("保存出错：" + err);
            } else {
                console.log("保存成功:" + docs);
            }
        });
        return data;
    },
    deleteStudent: (id) => {
        StudentModel.remove({ _id: id }, function(err, docs) {
            if (err) {
                console.log("删除出错：" + err);
            } else {
                console.log("删除成功：" + docs);
            }
        });

    },
    putStudent: (id, college, name, sex, age, student_id) => {
        StudentModel.findOneAndUpdate({ _id: id }, { $set: { college: college, name: name, sex: sex, age: age, student_id: student_id } }, function(err, docs) {
            if (err) {
                console.log("修改出错" + err);
            } else {
                console.log("修改成功" + docs);
            }
        });
    },
    getStudentById: (id) => {
        const data = StudentModel.findOne({ _id: id }, function(err, docs) {
            if (err) {
                console.log("查询出错" + err);
            } else {
                console.log("查询成功" + docs);
            }
        });
        return data;
    },
    delAllStudents: () => {
        StudentModel.remove({}, function(err, docs) {
            if (err) {
                console.log("删除失败" + err);
            } else {
                console.log("删除成功" + docs);
            }
        });
    },
    delSelect: (ids) => {
        StudentModel.remove({ _id: { $in: ids } }, function(err, docs) {
            if (err) {
                console.log("删除失败" + err);
            } else {
                console.log("删除成功" + docs);
            }
        });
    }


};