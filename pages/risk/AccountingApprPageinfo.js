/**
 * @create by xzw
 * @description 专项催收人工流转审批查看页面
 * @createDate 2019-09-10
 */
define(function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        // 引入字典项
        yufp.lookup.reg('STD_ZB_CERT_TYP,APPLY_CHANNEL_TYPE,STD_ZB_ACC_STATUS,COLLT_TASK_STATUS');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    baseParam:{},
                    dataUrl: backend.riskmService + '/api/collt/write/off/apps/biz',
                    expandCollapseName: ['1', '2','3'],
                    tableColumns: [
                        { label: '任务编号', prop: 'colltTaskNo', sortable: true, resizable: true },
                        { label: '客户编号', prop: 'cusId', sortable: true, resizable: true },
                        { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
                        { label: '证件类型', prop: 'certType', sortable: true, resizable: true, dataCode: 'STD_ZB_CERT_TYP' },
                        { label: '证件号码', prop: 'certCode', sortable: true, resizable: true },
                        { label: '合同编号', prop: 'contNo', sortable: true, resizable: true, hidden:true },
                        { label: '借据编号', prop: 'loanNo', sortable: true, resizable: true },
                        { label: '渠道名称', prop: 'channelCode', sortable: true, resizable: true, dataCode: 'APPLY_CHANNEL_TYPE' },
                        { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
                        { label: '借据金额', prop: 'loanAmount', sortable: true, resizable: true },
                        { label: '逾期金额', prop: 'overLmt', sortable: true, resizable: true },
                        { label: '逾期天数', prop: 'overDays', sortable: true, resizable: true },
                        { label: '借据起始日', prop: 'loanStartDate', sortable: true, resizable: true },
                        { label: '借据到期日', prop: 'loanEndDate', sortable: true, resizable: true },
                        { label: '借据状态', prop: 'accountStatus', sortable: true, resizable: true, dataCode: 'STD_ZB_ACC_STATUS' },
                        { label: '任务状态', prop: 'taskSts', sortable: true,resizable: true,dataCode: 'COLLT_TASK_STATUS' }
                    ],

                    updateFields: [{
                        columnCount: 3,
                        fields: [
                            {field: 'bizSerno', label: '流水号', disabled: true},
                            {field: 'inputDate', label: '登记日期', disabled: true},
                            {field: 'createUserCode', label: '创建人编号', disabled: true},
                            {field: 'createTime', label: '创建时间', disabled: true},
                            {field: 'lastUpdateUser', label: '最后修改人编号', disabled: true},
                            {field: 'lastUpdateTime', label: '最后修改时间', disabled: true},
                        ] },{
                        columnCount: 1,
                        fields:[{field: 'writeOffReason', label: '核销原因', disabled: true, type: 'textarea',maxlength:100,rows:3}]
                    }],

                    dataUrlAnnex: backend.riskmService + '/api/mon/relief/ann',
                    baseParamsAnnex:{},
                    tableColumnsAnnex:[
                        { label: '核销申请流水号', prop: 'flowAppNo', sortable: true, resizable: true },
                        { label: '借据号', prop: 'bizSerno', sortable: true, resizable: true ,hidden:true},
                        { label: '附件名称', prop: 'annexName', sortable: true, resizable: true },
                        { label: '附件描述', prop: 'annexDesc', sortable: true, resizable: true },
                        { label: '上传人', prop: 'uploadUser', sortable: true, resizable: true },
                        { label: '上传时间', prop: 'uploadTime', sortable: true, resizable: true },
                        { label: '最后更新人', prop: 'lastUploadUser', sortable: true, resizable: true },
                        { label: '最后更新时间', prop: 'lastUploadTime', sortable: true, resizable: true }
                    ],

                    height: yufp.frame.size().height - 103,
                    dialogVisible: false,
                    formDisabled: false,
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    valiPagePluginData: true,
                }
            },
            methods: {
                infoAnnexFn: function(){
                    this.$nextTick(function(){
                        var _self = this;
                        if (this.$refs.reftableAnnex.selections.length != 1 ) {
                            this.$message({ message: '请选择一条数据！', type: 'warning' });
                            return;
                        }
                        var right = '0100001';
                        var biz = this.$refs.reftableAnnex.selections[0].flowAppNo;
                        var date = this.$refs.reftableAnnex.selections[0].uploadTime.slice(0,10).replace(/\-/g,"");
                        _self.$confirm('将前往影像平台查看影像资料，是否继续？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            center: true,
                            callback: function (action) {
                                if (action === 'confirm') {
                                    yufp.service.request({
                                        method: 'POST',
                                        url: backend.edocService + "/api/doEncode",
                                        data: {
                                            applySeq : biz,
                                            sessionUserId: yufp.session.userId,
                                            sessionUserName: yufp.session.userName,
                                            sessionOrgCode: yufp.session.org.orgCode,
                                            sessionOrgName: yufp.session.org.orgName,
                                            startDate : date,
                                            rightCode : right
                                        },
                                        callback: function (code, message, response) {
                                            var row = response.rows;
                                            if (code == 0 && response.code == 0) {
                                                // row 为加密后的完整url请求
                                                window.open(row,'_blank');
                                            } else {
                                                this.$message("获取影像系统信息失败：" + response.message);
                                            }
                                        }
                                    });

                                }
                            }
                        });
                    });
                },
            },

            mounted: function () {
                data.children = this;
                var obj = data.datas[data.dataKey];
                this.valiPagePluginData = true;
                var _self = this;
                _self.baseParam = {
                    bizSerno:data.e_bizSerno
                };
                _self.baseParamsAnnex = {
                    flowAppNo : data.e_bizSerno,
                    bizSerno : data.e_bizSerno
                };
                this.$nextTick(function(){
                    // 展示同一流水号的催收任务借据
                    _self.$refs.reftable.remoteData(_self.baseParam);
                    yufp.extend(_self.$refs.reform.formModel, obj[0]);
                    _self.$refs.reftableAnnex.remoteData(_self.baseParamsAnnex);

                });
            } // end of mounted
        });
    };
    // 消息处理
    exports.onmessage = function (type, message) {};
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {}
});
