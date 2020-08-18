$(function () {
    // 1 登录界面与注册界面切换
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 2 自定义表单验证
    var form = layui.form
    var layer = layui.layer
    form.verify({
        // 密码验证规则
        pwd: [
            /^[\S]{6,16}$/, "密码必须6到16位，且不能出现空格"
        ],
        // 注册界面 确认密码验证规则
        repwd: function (value) {
            // 验证是否与密码框内容全等 进行判断
            // 拿到密码框的值
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return "两次输入密码不一样"
            }
        }
    })

    // 3 注册功能实现
    $('#form_reg').on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val(),
            },
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("注册成功请登录")
                $('#link_login').click()
                // reset 是一个原生js方法
                $('#form_reg')[0].reset()
            }
        })
    })

    // 4 登录功能
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $('#form_login').serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("恭喜，登录成功")
                // 把token 数据保存下来用于后面验证接口登录
                localStorage.setItem("token", res.token)
                location.href = "/index.html"
            }
        })
    })



})