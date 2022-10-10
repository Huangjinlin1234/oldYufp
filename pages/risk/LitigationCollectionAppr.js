/**
 *
 * @author wanglihua
 * @description 诉讼催收人工流转审批页面
 * @since 2019/9/20 9:45
 * @date 2019/9/20 9:45
 * @version 0.1
 */
define(function (require,exports) {
    exports.ready = function (hashCode,data,cite) {
        yufp.lookup.reg('STD_COLLT_WAY');
        yufp.custom.vue({
            el: cite.el,
            data:function () {
                var _self = this;
                return {
                    updateFields: [
                        {
                            columnCount: 2,
                            fields: [
                                {field: 'cusId', label: '客户编号', disabled: true},
                                {field: 'cusName', label: '客户名称', disabled: true},
                                {field: 'phoneNum', label: '手机号码', disabled: true },
                                {field: 'liveAddr', label: '居住地址', disabled: true, hidden: true},
                                {field: 'loanNo', label: '借据编号', disabled: true},
                                {field: 'overDays', label: '逾期天数', disabled: true},
                                {field: 'overLmt', label: '逾期金额', disabled: true},

                                { field: 'flowApplyNo', label: '流转申请编号' },
                                { field: 'colltTaskNo', label: '催收任务编号' },
                                { field: 'basicColltTaskType', label: '原催收任务类型',type:'select',dataCode:'STD_COLLT_WAY' },
                                { field: 'flowColltTaskType', label: '流转催收任务类型', type:'select',dataCode:'STD_COLLT_WAY' },
                                { field: 'flowReson', label: '流转原因' },
                                { field: 'approveStatus', label: '审批状态', hidden:true },
                                { field: 'apprvUserCode', label: '审批人编号', hidden:true },
                                { field: 'apprvUserName', label: '审批人名称', hidden:true },
                                { field: 'apprvComment', label: '人工处理意见', hidden:true },
                                { field: 'apprvTime', label: '审批时间' },
                                { field: 'createUser', label: '创建人' },
                                { field: 'createTime', label: '创建时间' }
                            ]
                        }
                    ],
                    formDisabled:true,
                    valiPagePluginData: true
                }
            },
            mounted: function () {
                data.children = this;
                var obj = data.datas[data.dataKey];
                this.valiPagePluginData = true;
                var vieForm = this.$children[0].formModel;
                this.$nextTick(function(){
                    yufp.service.request({
                        method: 'POST',
                        url: backend.riskmService + '/api/get/task/byno',
                        data: {colltTaskNo:obj.colltTaskNo},
                        callback: function (code, message, response) {
                            if (response.code == 0) {
                                obj.cusId = response.rows.cusId;
                                obj.cusName = response.rows.cusName;
                                obj.phoneNum = response.rows.phoneNum;
                                obj.liveAddr = response.rows.liveAddr;
                                obj.loanNo = response.rows.loanNo;
                                obj.overDays = response.rows.overDays;
                                obj.overLmt = response.rows.overLmt;
                            }
                            yufp.extend(vieForm, obj);
                        }
                    });
                });
            }
        });
    };
    // 消息处理
    exports.onmessage = function (type, message) {

    };
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {

    }
});