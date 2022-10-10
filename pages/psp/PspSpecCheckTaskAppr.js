/**
 * @create xzw
 * @description 检查登记流程审批查看页面
 * @createDate 2018-08-24
 */
define(function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        // 引入字典项
        yufp.lookup.reg('S_ZB_CHK_TYPE,STD_ZB_CERT_TYP,APRV_STATUS,SPEC_CHECK_STATUS');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    expandCollapseName: ['1', '2'],
                    updateFields: [{
                        columnCount: 3,
                        fields: [
                            {field: 'bizSerno', label: '检查任务流水号',disabled: true },
                            {field: 'chkName', label: '检查名称',disabled: true },
                            {field: 'chkState', label: '检查任务状态',disabled: true ,type:'select',dataCode:'SPEC_CHECK_STATUS'},
                            {field: 'cusId', label: '客户编号',disabled: true },
                            {field: 'cusName', label: '客户名称',disabled: true },
                            /*{field: 'chkBln', label: '检查贷款余额',disabled: true },
                            {field: 'chkNum', label: '检查贷款笔数',disabled: true },*/
                            {field: 'ownCdt', label: '授信总额',disabled: true },
                            {field: 'loanTotalBln', label: '贷款总余额',disabled: true },
                            {field: 'othUnFactor', label: '其他不利因素',disabled: true },
                            {field: 'expSugg', label: '情况说明及建议',disabled: true },
                            /*{field: 'taskProId', label: '任务分配人',disabled: true },
                            {field: 'taskProBrId', label: '任务分配机构',disabled: true },
                            {field: 'taskExeId', label: '任务执行人',disabled: true },
                            {field: 'hdlNo', label: '任务办理人',disabled: true },
                            {field: 'hdlDate', label: '任务办理日期',disabled: true },*/
                            {field: 'createTime', label: '创建时间',disabled: true },
                            {field: 'lastUpdateUser', label: '最后更新人',disabled: true },
                            {field: 'chkType', label: '检查类型',disabled: true,type:'select',dataCode:'S_ZB_CHK_TYPE' },
                            {field: 'realFinDate', label: '实际完成日期',disabled: true },
                            {field: 'createUser', label: '创建人',disabled: true },
                            {field: 'lastUpdateTime', label: '最后修改日期',disabled: true },
                            {field: 'orgCode', label: '机构代码',disabled: true },
                            {field: 'orgName', label: '机构名称',disabled: true },
                            {field: 'cusType', label: '客户类型',disabled: true },
                            {field: 'contNo', label: '合同编号',disabled: true },
                            {field: 'contAmt', label: '合同金额',disabled: true },
                            {field: 'loanStartDate', label: '贷款起始日',disabled: true },
                            {field: 'loanEndDate', label: '贷款到期时间',disabled: true },
                            {field: 'mainBrId', label: '主管机构',disabled: true },
                            {field: 'cusManager', label: '客户经理',disabled: true },
                            {field: 'certType', label: '证件类型',disabled: true ,type:'select',dataCode:'STD_ZB_CERT_TYP'},
                            {field: 'certCode', label: '证件号码',disabled: true },
                            /*{field: 'inputBrId', label: '登记机构',disabled: true },
                            {field: 'daybatDate', label: '跑批日期',disabled: true },*/
                            {field: 'chkTaskNo', label: '检查任务编号',disabled: true },
                            {field: 'approveStatus', label: '审批状态',disabled: true,type: 'select',dataCode:'APRV_STATUS' },
                           /* {field: 'aprvUserCode', label: '审批人编号',disabled: true },
                            {field: 'aprvUserName', label: '审批人名称',disabled: true },
                            {field: 'aprvDate', label: '审批日期',disabled: true },
                            {field: 'aprvComment', label: '人工处理意见',disabled: true },*/
                        ]
                    }],
                    dataUrlAnnex: backend.riskmService + '/api/mon/relief/ann',
                    baseParamsAnnex:{},
                    tableColumnsAnnex:[
                        { label: '检查登记申请流水号', prop: 'flowAppNo', sortable: true, resizable: true },
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
                _self.baseParamsAnnex = {
                    flowAppNo : data.e_bizSerno,
                    bizSerno : data.e_bizSerno
                };
                this.$nextTick(function(){
                    yufp.extend(this.$refs.reform.formModel, obj);
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
