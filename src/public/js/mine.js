$(document).ready(function () {
    asyncGet('/mine/api', null, function (response) {
        var errMsg = '登陆失败';
        if (response) {
            if (response.code == 0 && response.data) {
                if (response.data.icon) {
                    $('#icon').attr('src', response.data.icon);
                }

                $('#name').html(response.data.name);
                $('#telephone').html(response.data.phoneNumber);

                return;
            }

            if (response.code == 4) {
                location.href = '/login';
                return;
            }

            if (response.message) {
                errMsg = response.message;
            }
        }

        showAlert(errMsg);
    });

    $('#change-password').click(function () {
        window.location.href = '/mine/change-password';
    });
    $('#order-mine').click(function () {
        window.location.href = '/order/mine';
    });
    $('#order-all').click(function () {
        window.location.href = '/order/all';
    });
    $('#about').click(function () {
        window.location.href = '/about';
    });
    $('.btn-logout').click(function () {
        asyncPost('/logout', null, function (response) {
            var errMsg = '退出失败';
            if (response) {
                if (response.code == 0) {
                    window.location.href = '/login';
                    return;
                }

                if (response.message) {
                    errMsg = response.message;
                }
            }

            showAlert(errMsg);
        });
    });
});