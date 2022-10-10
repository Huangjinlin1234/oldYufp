/**
 * @author fuzm
 * @since 2018-05-21
 * @description  密码修改
 */
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    var vm = yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _this = this;
        // 验证两次密码是否相等
        var isEquals = function (rule, value, callback) {
          if (!value || value == '') {
            callback();
          } else {
            var password = _this.$refs.myform.formModel.newPassword;
            if (password == value) {
              callback();
            } else {
              callback('两次密码不一致，请重新输入');
            }
          }
        };
        // 密码输入格式：数字、字母、特殊字符
        var password = function (rule, value, callback) {
          if (value && value == old) {
            callback(new Error('修改的密码不能和原密码一致！'));
          }
          var old = _this.$refs.myform.formModel.oldPassword;
          var newPW = _this.$refs.myform.formModel.newPassword;
          var userCode = yufp.session.userCode;
          yufp.service.request({
            method: 'POST',
            url: backend.consoleService + '/api/s/user/' + userCode,
            data: userCode,
            callback: function (code, message, response) {
              if (code == 0 && response && response.code == 0) {
                if (response.rows.isTeller != 'Y') {
                  var reg = /((?=.*[a-zA-Z])(?=.*\d)|(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])|(?=.*\d)(?=.*[~!@#$%^&*])|(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*]))[a-zA-Z\d~!@#$%^&*]{5,16}/;
                  if (value && reg.test(value)) {
                    callback();
                  } else if (value && !reg.test(value)) {
                    callback(new Error('密码必须包含数字、字母或特殊字符(~!@#$%^&*)的至少两种'));
                  } else {
                    callback();
                  }
                }
              }
            }
          });
          // var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[a-z])(?=.*[~!@#$%^&*]).{5,16}/;
        };
        return {
          updateFields: [{
            columnCount: 1,
            fields: [
              {
                field: 'oldPassword',
                label: '原密码',
                placeholder: '请输入原密码',
                maxLength: 16,
                type: 'password',
                rules: [{ required: true, message: '必输项', trigger: 'blur'}]
              }, {
                field: 'newPassword',
                label: '新密码',
                placeholder: '请输入新密码',
                maxLength: 16,
                type: 'password',
                rules: [{ required: true, message: '必输项', trigger: 'blur'},
                  {validator: yufp.validator.countLength, max: 16, min: 5, message: '长度必须在5到16个字符之间'}, {validator: password}]
              }, {
                field: 'passwords',
                label: '确认密码',
                placeholder: '请再次输入新密码',
                maxLength: 16,
                type: 'password',
                rules: [{ required: true, message: '必输项', trigger: 'blur'},
                  {validator: yufp.validator.countLength, max: 16, min: 5, message: '长度必须在5到16个字符之间'}, {validator: isEquals}, {validator: password}]
              }
            ]
          }],
          updateButtons: [
            {
              label: '提交',
              type: 'primary',
              op: 'submit',
              click: function (model, valid) {
                if (valid) {
                  _this.modifyPassword(model);
                }
              }
            }, {
              label: '重置',
              type: 'primary',
              op: 'reset',
              click: function (model) {
                _this.$refs.myform.resetFields();
              }
            }
          ]
        };
      },
      methods: {
        modifyPassword: function (model) {
          var _this = this;

          // RSA加密
          // var getRSAPublicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDAYwQ81rc1KW8tTYpxrLS3ArVxB40otmbWyXwgDQRkLsCuQKiq6KZgAM/8sJuI12S1JVOXnMu5d420vKFFS/+Ibz4TxqjhLmgownaguMTbAGBzIPvfN5lL52mDmm/CvKu2YPCFvZV8YulNTCexvuj7OiWRUXpAbaQqu5tPOjGytQIDAQAB";
          // var encrypt = new JSEncrypt();
          // encrypt.setPublicKey(getRSAPublicKey);

          // sm2加密
          // var pubkeyHex =
          //     "704B640CBBE554DA4E860D186328B998A5B8CAFB07C79D0363FF0F6604C34338C95396707CE3F9567BEA055F62FCECF2FD4F1EA7ABBAF62D408BE667E0EAC793";
          var pubkeyHex;

          // 获取公钥
          yufp.service.request({
            url: backend.uaaService + '/api/login/pubkey',
            method: 'POST',
            callback: function (code, message, response) {
              if (response && response.code == 0) {
                pubkeyHex = response.rows;
                var paramMap = {
                  usercode: yufp.session.userId,
                  password: sm2Encrypt(_this.$refs.myform.formModel.oldPassword, pubkeyHex, 1), // c1c3c2方式
                  newPassword: sm2Encrypt(_this.$refs.myform.formModel.newPassword, pubkeyHex, 1)
                };
                yufp.service.request({
                  method: 'POST',
                  url: backend.uaaService + '/api/account/modifyUserPwd',
                  data: paramMap,
                  callback: function (code, message, response) {
                    if (code == 0 && response && response.code == 0) {
                      _this.$message({ type: 'success', message: '修改用户密码操作成功！'});
                      _this.$refs.myform.resetFields();
                    } else {
                      if (response && response.message) {
                        _this.$message({ type: 'error', message: response.message});
                      } else {
                        _this.$message({ type: 'error', message: '修改用户密码操作失败！'});
                      }
                    }
                  }
                });
              } else {
                console.log('公钥获取失败');
              }
            }
          });
        },
        resetFn: function (model) {
          this.$refs.myform.resetFields();
        }
      }
    });
  };

  // 消息处理
  exports.onmessage = function (type, message) {

  };

  // page销毁时触发destroy方法
  exports.destroy = function (id, cite) {

  };
});
