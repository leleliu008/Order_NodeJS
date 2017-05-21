$(document).ready(function () {
    var step = 1;

    $('#okBtn').click(function () {
        var phoneNumber = $('#phoneNumber').val();

        if (step == 1) {
            if (phoneNumber) {
                if (phoneNumber.length != 11 || phoneNumber.indexOf('1') != 0) {
                    showAlert('请输入正确的电话号码');
                    return;
                }
            } else {
                showAlert('请输入电话号码');
                return;
            }

            asyncGet('/verifyCode', {phoneNumber: phoneNumber}, function (response) {      //请求成功时处理
                    var errMsg = '获取验证码失败';

                    if (response) {
                        if (response.code == 0) {
                            showAlert('获取验证码成功，请注意查看您的手机信息', function (index) {
                                $('#head').html('输入短信验证码：');
                                $('#phoneNumberContainer').addClass('hidden');
                                $('#verifyCodeContainer').removeClass('hidden');
                                $('#okBtn').html('验证');

                                step = 2;

                                layer.close(index);
                            });

                            return;
                        }

                        if (response.message) {
                            errMsg = response.message;
                        }
                    }

                    showAlert(errMsg);
                }
            );
        }
        else {
            var verifyCode = $('#verifyCode').val();
            if (!verifyCode) {
                showAlert('请输入短信验证码');
                return;
            }

            asyncPost('/verifyCode', {phoneNumber: phoneNumber, verifyCode: verifyCode}, function (response) { //请求成功时处理
                    var errMsg = '发送短信验证码失败';

                    if (response) {
                        if (response.message) {
                            errMsg = response.message;
                        }

                        if (response.code == 0) {
                            showAlert('密码重置成功', function () {
                                history.go(-1);
                            });
                            return;
                        } else if (response.code == 5) {
                            showAlert(errMsg, function () {
                                location.href = '/login'
                            });
                            return;
                        }
                    }

                    showAlert(errMsg);
                }
            );
        }
    });
});