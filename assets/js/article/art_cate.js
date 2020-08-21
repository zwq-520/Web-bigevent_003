$(function () {
    var layer = layui.layer
    var form = layui.form
    // 渲染文章类别列表
    initArtcateList()
    function initArtcateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tpl-art-cate', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    // 添加类别功能
    var indexadd = null
    $('#btnAdd').on('click', function () {
        // 弹出提示框
        indexadd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    // 确认添加功能 
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('添加图书成功！')
                initArtcateList()
                layer.close(indexadd)

            }
        })
    })

    // 编辑功能 
    var indexedit = null
    $('body').on('click', '#btn_edit', function () {
        var id = $(this).attr('data-id')
        // 弹出提示框
        indexedit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-edit').html()
        })
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })

    // 编辑提交功能
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('修改成功')
                initArtcateList()
                layer.close(indexedit)
            }
        })
    })

    // 删除功能
    $('body').on('click', '#btn_delete', function () {
        // 根据id删除
        var id = $(this).attr('data-id')
        // 弹出警示框
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initArtcateList()
                }
            })
        })
    })
})