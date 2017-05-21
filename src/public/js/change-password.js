$(document).ready(function () {
    $('#okBtn').click(function () {
        var oldPassword = $('#oldPassword').val();
        var newPassword = $('#newPassword').val();
        var confirmPassword = $('#confirmPassword').val();

        if (oldPassword) {
            if (oldPassword.length < 6) {
                showAlert('请至少输入6位密码');
                return;
            }
        } else {
            showAlert('请输入旧密码，6~16个字符');
            return;
        }

        if (newPassword) {
            if (newPassword.length < 6) {
                showAlert('请至少输入6位密码');
                return;
            }
        } else {
            showAlert('请输入新密码，6~16个字符');
            return;
        }

        if (confirmPassword) {
            if (confirmPassword.length < 6) {
                showAlert('请至少输入6位密码');
                return;
            }
        } else {
            showAlert('请再次输入新密码，6~16个字符');
            return;
        }

        if (newPassword != confirmPassword) {
            showAlert('两次输入的密码不一致，请重新输入');
            return;
        }

        asyncPost('/mine/change-password', {'oldPassword': oldPassword, 'newPassword': newPassword}, function (response) {      //请求成功时处理
                var errMsg = '修改密码失败';

                if (response) {
                    if (response.code == 0) {
                        showAlert('密码修改成功');
                        return;
                    }

                    if (response.code == 4) {
                        showAlert('Token已经过期，请重新登陆', function () {
                            location.href = '/login';
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
    });
});