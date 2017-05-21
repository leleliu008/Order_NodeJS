$(document).ready(function () {
    asyncGet("/order/mine/api", null, function (response) {
            var errMsg = '请求失败';
            if (response) {
                if (response.code == 0 && response.dishes && response.dishes.length > 0) {
                    var totalPrice = 0;

                    for (var i = 0; i < response.dishes.length; i++) {
                        var item = response.dishes[i];
                        totalPrice += (item.price * item.count);

                        $('#summary').append("<div style='font-size: 14px; color: #c72323; margin-top: 5px; margin-bottom: 5px'>" + item.count + "个" + item.name + "</div>");
                    }

                    $('#title').html('总价：' + totalPrice + '元');
                    $('#okBtn').html('取消该订单');
                    $('#okBtn').click(function () {
                        cancelOrder();
                    });

                    return;
                }

                if (response.message) {
                    errMsg = response.message;
                }
            }

            $('#title').html(errMsg);

            if (response.code == 2) {
                $('#okBtn').html('去订餐');
                $('#okBtn').click(function () {
                    location.href = '/';
                });
            } else {
                $('#okBtn').html('重试');
                $('#okBtn').click(function () {
                    location.reload();
                });
            }
        },
        function () {
            $('#title').html('请求失败，请重试！');
            $('#okBtn').html('重试');
            $('#okBtn').click(function () {
                location.reload();
            });
        }
    );

    function cancelOrder() {
        asyncPost('/order/mine/cancel', null, function (response) {//请求成功时处理
            if (response) {
                if (response.code == 0) {
                    location.reload();
                    return;
                }
                showAlert(response.message ? response.message : "取消失败");
            }
        });
    }
});