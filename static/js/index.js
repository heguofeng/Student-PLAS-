var app = new Vue({
    el: '#app',
    data: {
        students: {
            college: "",
            name: '',
            sex: '',
            age: '',
            student_id: ''
        },
        student: {
            college: "信息与工程",
            name: '何国锋',
            sex: '男',
            age: '23',
            student_id: '1306010053'
        },
        showFlag: false, //新建
        showFlag2: false, //修改
        checkAll: false //是否都已选中

    },
    //加载完vue后执行，类似于jquery的ready
    mounted: function() {
        this.$nextTick(function() {
            this.newLoad();
        });
    },
    methods: {
        //添加学生
        submitForm: function() {
            var _this = this;
            var
                student = {
                    college: _this.student.college,
                    name: _this.student.name,
                    sex: _this.student.sex,
                    age: _this.student.age,
                    student_id: _this.student.student_id
                };
            axios.post('/api/student', student).then(function(response) {
                _this.newLoad();
                _this.showFlag = false;
            }).catch(function(err) {
                alert("添加出错" + err);
            });
        },
        //修改
        updateForm: function(id) {
            var _this = this;
            var
                newStudent = {
                    college: _this.student.college,
                    name: _this.student.name,
                    sex: _this.student.sex,
                    age: _this.student.age,
                    student_id: _this.student.student_id
                };
            axios.put('/api/student/' + id, newStudent).then(function(response) {
                // alert("已成功修改");
                _this.newLoad();
                _this.showFlag2 = false;
            }).catch(function(err) {
                alert(err);
            });
        },
        //点击删除
        deleteStudent: function(id) {
            var _this = this;
            axios.delete('/api/student/' + id).then(function(response) {
                _this.newLoad();
                alert(response.data.result);
            }).catch(function(err) {
                alert(err);
            })
        },
        // 点击修改按钮
        putStudent: function(id) {
            var _this = this;
            _this.showFlag2 = true;
            var _this = this;
            axios.get('/api/student/' + id).then(function(response) {
                _this.student = response.data.student;
            }).catch(function(err) {
                alert(err);
            });
        },
        //首次加载
        newLoad: function() {
            var _this = this;
            axios.get('api/students').then(function(response) {
                _this.students = response.data.students;
            }).catch(function(error) {
                console.log("查找出错" + error);
            });
        },
        //删除所有学生
        deleteAll: function() {
            var _this = this;
            axios.delete('/api/delAllStudents').then(function(response) {
                alert(response.data.result);
                _this.newLoad();
            }).catch(function(err) {
                alert("删除失败" + err);
            });
        },
        //选择学生
        selectStudent: function(student) {
            if (typeof student.checked == "undefined") {
                this.$set(student, 'checked', true);
            } else {
                student.checked = !student.checked;
            }
            this.isCheckAll(); //每次判断是否全选
        },
        selectAll: function(isCheck) {
            this.checkAll = isCheck; //直接给全选参数赋值
            this.students.forEach(function(item) {
                if (typeof item.checked == "undefined") {
                    Vue.set(item, "checked", isCheck); //这里传入的应该是isCheck，而不是true
                } else {
                    item.checked = isCheck;
                }
            });
        },
        isCheckAll: function() {
            let flag = true;
            this.students.forEach(function(item) {
                if (!item.checked) {
                    flag = false;
                }
            })
            if (flag) {
                this.checkAll = true;
            } else {
                this.checkAll = false;
            }
        },
        deleteSelect: function() {
            var _this = this;
            var ids = [];
            if (confirm("真的要删除吗？")) {
                this.students.forEach(function(item) {
                    if (item.checked == true) {
                        ids.push(item._id);
                    }
                });
                if (ids.length == 0) {
                    alert("请先选择要删除的学生");
                } else {
                    axios({
                            method: "delete",
                            url: '/api/delSelect',
                            data: {
                                ids: ids
                            }
                        })
                        .then(function(response) {
                            alert(response.data.result);
                            _this.newLoad();
                        }).catch(function(err) {
                            alert(err);
                        });
                }
            }
        }
    }
});
window.app = app;