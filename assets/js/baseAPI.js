$.ajaxPrefilter(function (options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url

    // 设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 全局挂载complete回调函数
    options.complete = function (res) {
        // 如果未登录直接访问主页面 则强制跳转到登录页面
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //         // 强制清空token
            localStorage.removeItem('token')
            //         // 强制跳转到登录页面
            location.href = '/login.html'
        }
    }

})