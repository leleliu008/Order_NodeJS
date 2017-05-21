$(document).ready(function () {
    asyncGet('/order/mine/api', null, function (response) {      //请求成功时处理
        var errMsg = '请求失败';

        if (response) {
            if (response.code == 0 && response.dishes && response.dishes.length > 0) {
                var totalPrice = 0;

                for (var i = 0; i < response.dishes.length; i++) {
                    var item = response.dishes[i];
                    totalPrice += (item.price * item.count);

                    $('#dishes').append("<div style='font-size: 14px; color: #c72323; margin-top: 5px; margin-bottom: 5px'>" + item.count + "个" + item.name + "</div>");
                }

                $('#totalPrice').html(totalPrice);

                return;
            }

            if (response.message) {
                errMsg = response.message;
            }
        }

        showAlert(errMsg);
    });

    $('.btn').click(function () {
        window.location.href = '/';
    });
});