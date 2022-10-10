/**
 * @create by xzw
 * @description 专项催收人工流转审批查看页面
 * @createDate 2019-09-10
 */
define(function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        // 引入字典项
        yufp.lookup.reg('CRUD_TYPE,STD_ZB_CERT_TYP,CYCLIC_FLG,APPLY_CHANNEL_TYPE,CYCLIC_FLG');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    updateFields:[{
                        columnCount: 3,
                        fields: [
                            {field: 'frzSerno', label: '冻结流水号', disabled: true},
                            {field: 'cusId', label: '客户编号', disabled: true},
                            {field: 'cusName', label: '客户名称', disabled: true},
                            {field: 'certType', label: '证件类型',type: 'select',dataCode: 'STD_ZB_CERT_TYP',disabled: true},
                            {field: 'certCode', label: '证件号码', disabled: true},
                            {field: 'lmtAmt', label: '授信额度', disabled: true},
                            {field: 'cyclicFlg', label: '是否循环', type: 'select', dataCode: 'CYCLIC_FLG', disabled: true},
                            {field: 'startDate', label: '额度起始日期', disabled: true},
                            {field: 'expireDate', label: '额度到期日期', disabled: true},
                            {field: 'applyDate', label: '申请日期', disabled: true},
                            {field: 'channelNo',label: '渠道',type: 'select',dataCode: 'APPLY_CHANNEL_TYPE',disabled: true},
                            {field: 'prdId', label: '产品id', disabled: true,hidden:true},
                            {field: 'prdCode', label: '产品编号', disabled: true,hidden:true},
                            {field: 'prdName', label: '产品名称', disabled: true},
                            {field: 'cusManagerName', label: '客户经理', disabled: true},
                            {field: 'orgName', label: '归属机构', disabled: true},
                            {field: 'remarks', label: '备注', disabled: true},
                            {field: 'lmtContNo', label: '授信协议编号', disabled: true},
                            {field: 'availAmt', label: '可用额度', disabled: true,},
                            {field: 'createUser', label: '冻结申请人', disabled: true},
                            {field: 'frzReason', label: '冻结原因',type:'textarea',disabled: true},
                            {field: 'approveStatus',label: '审批状态',type: 'select',dataCode: 'APRV_STATUS',disabled: true},
                            {field: 'createTime', label: '创建时间', disabled: true},
                            {field: 'lastUpdateUserName', label: '最后修改人', disabled: true},
                            {field: 'lastUpdateTime', label: '最后修改时间', disabled: true}
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
