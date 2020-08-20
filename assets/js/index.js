$(function () {
    // 获取用户信息
    getUserInfo()

    // 退出功能
    var layer = layui.layer
    $('#btnlogout').on('click', function () {
        // 退出提示框
        layer.confirm('是否确定退出', { icon: 3, title: '提示' }, function (index) {
            // 1 清楚本地存储
            localStorage.removeItem('token')
            // 2 跳转到登录界面
            location.href = '/login.html'
            // 3 关闭提示框
            layer.close(index);
        });
    })
})

//   获取用户信息

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            // 渲染客户信息
            renderAvatar(res.data)
        }
    })
}

// 渲染用户信息到页面的函数
function renderAvatar(user) {
    // 渲染欢迎部分  根据昵称优先 用户名次之 来渲染
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;' + name)
    // 进行头像的 选择性 上传
    if (user.user_pic !== null) {
        // 有图片 
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.user-avatar').hide()
    } else {
        // 无图片 
        $('.layui-nav-img').hide()
        // 获取要展示的 首字母 并且大写
        var first = name[0].toUpperCase()
        $('.user-avatar').html(first).show()
    }
}