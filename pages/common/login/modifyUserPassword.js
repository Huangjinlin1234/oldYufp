/**
 * @updated by
 * @description 用户首次登录修改密码
 */
define(function (require, exports) {

    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function (hashCode, data, cite) {

        //提交
        var submitFn = function () {
            var userCode = $('#userCode').val();
            var oldPassword = $('#oldPassword').val();
            var newPassword = $('#newPassword').val();
            var passwords = $('#passwords').val();

            //密码输入格式：数字、字母、特殊字符
            var reg = /((?=.*[a-zA-Z])(?=.*\d)|(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])|(?=.*\d)(?=.*[~!@#$%^&*])|(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*]))[a-zA-Z\d~!@#$%^&*]{5,16}/;

            if(userCode==''){
                $('#msg').text('请输入用户名!').show();
                $('#userCode').focus();
                return;
            }
            if(oldPassword==''){
                $('#msg').text('请输入原密码!').show();
                $('#oldPassword').focus();
                return;
            }
            if(newPassword==null || newPassword=='' ){
                $('#msg').text('请输入新密码!').show();
                $('#newPassword').focus();
                return;
            }else{
                if(!reg.test(newPassword)){
                    //$('#msg').text('密码必须包含数字、字母或特殊字符(~!@#$%^&*)的至少两种!').show();
                    $('#msg').text('不符合密码规则，请遵守密码规则(见网页底部)').show();
                    $('#newPassword').focus();
                    return;
                }
            }
            if(passwords==null || passwords==''){
                $('#msg').text('请再次输入新密码!').show();
                $('#passwords').focus();
                return;
            }else{
                if(newPassword != passwords){
                    $('#msg').text('两次密码不一致，请重新输入!').show();
                    return;
                }
                if(!reg.test(passwords)){
                    $('#msg').text('不符合密码规则，请遵守密码规则(见网页底部)').show();
                    $('#passwords').focus();
                    return;
                }
            }
            $('#msg').hide();

            //RSA加密
            var getRSAPublicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDAYwQ81rc1KW8tTYpxrLS3ArVxB40otmbWyXwgDQRkLsCuQKiq6KZgAM/8sJuI12S1JVOXnMu5d420vKFFS/+Ibz4TxqjhLmgownaguMTbAGBzIPvfN5lL52mDmm/CvKu2YPCFvZV8YulNTCexvuj7OiWRUXpAbaQqu5tPOjGytQIDAQAB";
            var encrypt = new JSEncrypt();
            encrypt.setPublicKey(getRSAPublicKey);

            var paramMap = {
                usercode: userCode,
                password: encrypt.encrypt(oldPassword),
                newPassword: encrypt.encrypt(newPassword)
            };

            yufp.service.request({
                method: 'POST',
                url: backend.uaaService+"/api/account/modifyUserPwd",
                data: paramMap,
                callback: function (code, message, response) {
                    if(code == 0 && response && response.code == 0 ) {
                        alert('修改用户密码操作成功，请重新登录！');
                        setTimeout(function () {
                            yufp.router.to("login");
                        }, 1000);
                    } else {
                        if(response && response.message) {
                            $('#msg').text(response.message).show();
                        } else {
                            $('#msg').text('修改用户密码操作失败！').show();
                        }
                    }
                }
            });
        }

        $("#submitFn").click(function(){
            submitFn();
        });

        $("#resetFn").click(function(){
            $('#userCode').val("");
            $('#oldPassword').val("");
            $('#newPassword').val("");
            $('#passwords').val("");
        });

        $('#userCode').keyup(function(){
            if(event.keyCode == '13') {
                submitFn();
            }
        });

        $('#oldPassword').keyup(function(){
            if(event.keyCode == '13') {
                submitFn();
            }
        });

        $('#newPassword').keyup(function(){
            if(event.keyCode == '13') {
                submitFn();
            }
        });

        $('#passwords').keyup(function(){
            if(event.keyCode == '13') {
                submitFn();
            }
        });
    };
});