const db = require('../db');
const APIError = require('../rest').APIError;

module.exports = {

    'GET /api/students': async(ctx, next) => {
        var data = await db.getStudents();
        if (data != undefined) {
            ctx.rest({
                students: data
            });
        }

    },
    'POST /api/student': async(ctx, next) => {
        ctx.rest({
            student: db.createStudent(
                ctx.request.body.college,
                ctx.request.body.name,
                ctx.request.body.sex,
                ctx.request.body.age,
                ctx.request.body.student_id)
        });
    },
    'DELETE /api/student/:id': async(ctx, next) => {
        console.log(`删除学生 ${ctx.params.id}`);
        db.deleteStudent(ctx.params.id);
        ctx.rest({
            result: "删除成功"
        });

    },
    'PUT /api/student/:id': async(ctx, next) => {
        console.log(`修改学生：${ctx.params.id}`);
        ctx.rest({
            student: db.putStudent(
                ctx.params.id,
                ctx.request.body.college,
                ctx.request.body.name,
                ctx.request.body.sex,
                ctx.request.body.age,
                ctx.request.body.student_id
            )
        });
    },
    'GET /api/student/:id': async(ctx, next) => {
        console.log("查询学生 号码" + ctx.params.id);
        ctx.rest({
            student: await db.getStudentById(
                ctx.params.id,
            )
        });
    },
    'DELETE /api/delAllStudents': async(ctx, next) => {
        console.log("删除所有学生");
        db.delAllStudents();
        ctx.rest({
            result: "删除所有数据成功"
        });
    },
    'DELETE /api/delSelect': async(ctx, next) => {
        console.log("已删除所选中的学生");
        db.delSelect(ctx.request.body.ids);
        ctx.rest({
            result: "已删除所选中的学生"
        });
    }
};