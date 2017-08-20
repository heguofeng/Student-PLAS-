// var fn_delete = async(ctx, next) => {
//     var name = ctx.request.body.name;
//     console.log(name);
//     await StudentModel.remove({ name: name }, function(err, docs) {
//         if (err) {
//             console.log("刪除出错：" + err);
//         } else {
//             console.log("刪除" + docs);
//         }
//     });
//     var data = await StudentModel.find(function(err, docs) {
//         if (err) {
//             console.log("查找出错" + err);
//             return;
//         }
//     });
//     ctx.render('index.html', {
//         title: "学生管理首页刪除",
//         docs: data,
//     });
// }

//保存文件
// var fn_fileSave = async(ctx, next) => {
//     let data = await StudentModel.find({}, function(err, docs) {
//         if (err) {
//             console.log("查找出错" + err);
//             return;
//         }
//     });
//     ctx.render('index.html', {
//         title: "学生管理首页-save",
//         docs: data,
//     });
//     fs.writeFile("output.txt", data, function(err) {
//         if (err) {
//             console.log("保存文件出错：" + err);
//         } else {
//             console.log("保存文件成功");
//         }
//     });

// }


module.exports = {
    'GET /': async(ctx, next) => {
        ctx.render('index.html', {
            title: "我的首页"
        });
    },
    // 'GET /123': async(ctx, next) => {
    //     ctx.response.body = "index.html"
    // }
};