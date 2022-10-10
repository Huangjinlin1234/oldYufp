/**
 * Created by yumeng on 2017/11/17.
 */
define(function (require, exports) {
    //page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        var aprvInfo = data.datas[data.dataKey] || {};
        yufp.lookup.reg('APRV_OPINION_BASE_1');
        //创建virtual model
        var vm = yufp.custom.vue({
            el: "#exampleForm",
            data: function () {
                var me = this;
                return {
                    editFields: [{
                        columnCount: 2,
                        fields: [
                            {
                                field: 'aprvOpinion',
                                label: '处理结果',
                                value: aprvInfo.aprvOpinion || '',
                                disabled: data.disabled != null ? data.disabled : false,
                                dataCode: 'APRV_OPINION_BASE_1',
                                type: 'radio',
                                rules: [{required: true, message: '请选择审批结果', trigger: 'blur'}]
                            }
                        ]
                    }, {
                        columnCount: 1,
                        fields: [
                            {
                                field: 'aprvComment',
                                label: '处理意见',
                                value: aprvInfo.aprvComment || '',
                                disabled: data.disabled != null ? data.disabled : false,
                                type: 'textarea',
                                rows: 3,
                                rules: [{required: true, message: '请填写处理意见', trigger: 'blur'}]
                            }
                        ]
                    }],
                    buttons: [
                        {
                            label: '重置',
                            op: 'reset',
                            type: 'primary',
                            icon: "yx-loop2",
                            hidden: data.disabled != null ? data.disabled : false,
                            click: function (model) {
                                me.isEndDone = !me.isEndDone;
                            }
                        },
                        {
                            label: '保存',
                            type: 'primary',
                            icon: "check",
                            op: 'submit',
                            hidden: data.disabled != null ? data.disabled : false,
                            click: function (model, valid) {
                                if (valid) {


                                }
                            }
                        }
                    ],
                    valiTaskDone: null
                };
            },
            methods: {
                valiPagePluginData: function (callback) {
                    var valid = false;
                    this.$refs.myform.validate(function (flag) {
                        valid = flag;
                    });
                    if (valid === false) {
                        callback(valid);
                        return;
                    }
                    var model = this.$refs.myform.formModel;
                    model.instNodeId = data.instNodeId;
                    model.aprvUserId = aprvInfo.aprvUserId || yufp.session.userId;
                    model.aprvUserName = aprvInfo.aprvUserName || yufp.session.userName;
                    model.aprvOrgCode = aprvInfo.aprvOrgCode || yufp.session.org.orgCode;
                    model.aprvLegalOrgCode = aprvInfo.aprvLegalOrgCode || yufp.session.legalOrg.orgCode;
                    model.e_bizSerno = data.e_bizSerno;
                    yufp.service.request({
                        method: 'POST',
                        url: backend.flowService + '/api/aprv/comment/submit',
                        data: model,
                        callback: function (code, message, response) {
                            if (code == 0) {
                                vm.valiTaskDone = callback;
                                data.taskDone(data, [model], vm);
                            } else {
                                callback(false);
                                vm.$message({message: '保存审批信息失败!', type: 'warning'});
                            }
                        }
                    });

                },
                //返回审批信息
                getApprInfo: function () {
                    return this.$refs.myform.formModel;
                }
            },
            mounted: function () {
                data.children = this;
            }
        });
    };
    //消息处理
    exports.onmessage = function (type, message) {

    };
    //page销毁时触发destroy方法
    exports.destroy = function (id, cite) {

    };
});