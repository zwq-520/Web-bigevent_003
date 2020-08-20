var baseURL = "http://ajax.frontend.itheima.net"
$.ajaxPrefilter(function (params) {
    params.url = baseURL + params.url
    // alert(params.url)

    // 统一设置 需要验证权限的 请求头
    if (params.url.indexOf(/my/) !== -1) {
        params.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 设置用户拦截
    params.complete = function (res) {
        console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1 清楚本地存储
            localStorage.removeItem('token')
            // 2 跳转到登录界面
            location.href = '/login.html'
        }
    }

})