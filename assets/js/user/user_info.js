$(function () {
    // 1 验证昵称的 规则
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度为1~6之间'
            }
        }
    })


    // 2 获取用户信息 然后渲染
    initUserInfo()
    var layer = layui.layer
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: "/my/userinfo",
            // data: $('.layui-form').serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 渲染到对应的表单中
                form.val('formUserinfo', res.data)
            }
        })
    }

    // 重置按钮功能
    $('#rebtn').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })

    // 提交修改功能 提交整个表单信息到后台
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $('.layui-form').serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('提交修改信息成功')
                window.parent.getUserInfo()
            }
        })
    })

})