$(function () {
    // 自定义校验规则
    var form = layui.form
    form.verify({
        // 统一密码校验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        // 新旧密码验证
        samepwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新密码不能与旧密码一样'
            }
        },

        // 确认密码验证
        repwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '新密码两次输入不一样'
            }
        }


    })

    // 修改密码功能
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $('.layui-form').serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('修改密码成功')
                $('.layui-form')[0].reset()
            }
        })
    })
})