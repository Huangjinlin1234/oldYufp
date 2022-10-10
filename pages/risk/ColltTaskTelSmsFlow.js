/**
 * @create by dengzc
 * @description 电话催收人工流转审批查看页面
 */
define(function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        // 引入字典项
        yufp.lookup.reg('STD_COLLT_WAY,APRV_STATUS');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    //  基本申请信息表单
                    updateFields:[
                        {columnCount: 3,
                            fields: [
                                { field: 'smsNoticeApp', label: '短信通知申请流水号',disabled:true},
                                { field: 'colltTaskNo', label: '催收任务编号',disabled: true},
                                { field: 'colltWay', label: '催收方式',disabled:true,type:'select',dataCode:'STD_COLLT_WAY'},
                                { field: 'cusId', label: '客户编号',disabled:true},
                                { field: 'cusName', label: '客户名称',disabled:true},
                                { field: 'phoneNum', label: '手机号码',disabled:true},
                            ]},

                        {columnCount: 1,
                            fields: [
                                { field: 'sendMsg', label: '发送内容',disabled:true,type:'textarea',rows:5},
                            ]},

                        {columnCount: 3,
                            fields: [
                                { field: 'approveStatus', label: '审批状态',disabled:true,type:'select',dataCode: 'APRV_STATUS'},
                                // { field: 'aprvUserCode', label: '审批人编号',disabled:true},
                                // { field: 'aprvUserName', label: '审批人名称',disabled:true},
                                // { field: 'aprvComment', label: '人工处理意见',disabled:true},
                                // { field: 'aprvTime', label: '审批时间',disabled:true},
                                { field: 'createUser', label: '创建人',disabled:true},
                                { field: 'createTime', label: '创建时间',disabled:true},
                                // { field: 'lastUpdateUser', label: '最后更新人',disabled:true},
                                // { field: 'lastUpdateTime', label: '最后更新时间',disabled:true}
                            ]}

                    ],
                    height: yufp.frame.size().height - 103,
                    dialogVisible: false,
                    formDisabled: false,
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    valiPagePluginData: true,
                }
            },
            methods: {

            },
            mounted: function () {
                data.children = this;
                var obj = data.datas[data.dataKey];
                this.valiPagePluginData = true;
                var _self = this;
                this.$nextTick(function(){
                    yufp.extend(this.$refs.reform.formModel, obj);
                });
            } // end of mounted
        });
    };
    // 消息处理
    exports.onmessage = function (type, message) {};
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {}
});
