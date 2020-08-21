$(function () {
    var layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 点击上传文件功能
    $('#btnChooseImg').on('click', function () {
        $('#file').click()
    })

    // 注册 文件上传表单 change改变事件
    $('#file').on('change', function (e) {
        // 拿到上传的文件
        var file = e.target.files[0]
        // 上传文件非空校验
        if (file === undefined) {
            return layer.msg('请上传图片')
        }
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    // 点击确定上传图片裁剪区域
    $('#btnUpload').on('click', function () {
        // 拿到裁剪区域 转换为 base64
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        // 发送请求到后台
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('上传头像失败')
                }
                layer.msg('上传头像成功')
                window.parent.getUserInfo()
            }
        })
    })

})