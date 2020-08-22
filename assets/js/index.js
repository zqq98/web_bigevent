$(function () {
    getUserInfo()
    var layer = layui.layer
    // 点击按钮实现退出功能
    $('#btnLogout').on('click', function () {
        //   提示用户是否确认退出
        layer.confirm('确定退出登录？', {
                icon: 3,
                title: '提示'
            },
            function (index) {
                //    清除本地存储中的token
                localStorage.removeItem('token')
                // 跳转到登录页面
                location.href = '/login.html'
                // 关闭confirm询问框
                layer.close(index)
            })
    })
})
// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        },
        // 无论成功还是失败最终都会调用complete回调函数
        // complete: function (res) {
        //     // 如果未登录直接访问主页面 则强制跳转到登录页面
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 强制清空token
        //         localStorage.removeItem('token')
        //         // 强制跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}

// 渲染用户的头像
function renderAvatar(user) {
    //    获取用户的名称
    var name = user.nickname || user.username
    // 设置欢迎的文本
    $('#welcom').html('欢迎&nbsp;&nbsp;' + name)
    // 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文字头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }


}