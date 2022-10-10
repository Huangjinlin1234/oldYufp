/**
 * @create by chenqm1 on 2018-05-11
 * @description 贷后检查报告表
 */
define(function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,STD_ZB_CHK_STATE,STD_ZB_CERT_TYP,S_ZB_CHK_RESULT,S_ZB_CHK_TYPE');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    expandCollapseName: ['a', 'b', 'cdpTab'],
                    zxExpandCollapseName: ['cdpReitem','redititem'],
                    dataUrl: backend.riskmService + '/api/psp/check/rpts',
                    baseParams: {},
                    queryFields: [
                        {placeholder: '检查任务编号', field: 'bizSerno', type: 'input'},
                        {placeholder: '检查名称', field: 'chkName', type: 'input'},
                        {placeholder: '客户编号', field: 'cusId', type: 'input'},
                        {placeholder: '客户名称', field: 'cusName', type: 'input'},
                        {placeholder: '证件类型', field: 'certType', type: 'select', dataCode: 'STD_ZB_CERT_TYP'},
                        {placeholder: '证件号码', field: 'certCode', type: 'input'},
                        //{ placeholder: '检查内容',field: 'chkCont', type: 'input' },
                        {placeholder: '检查任务状态', field: 'chkState', type: 'select', dataCode: 'STD_ZB_CHK_STATE'},
                        //{ placeholder: '主管机构', field: 'mainBrId', type: 'input' },
                        {placeholder: '客户经理号', field: 'cusManager', type: 'input'},
                        //{ placeholder: '创建人',field: 'createUser', type: 'input' },
                        //{ placeholder: '创建时间区间', field: 'createTimeDaterange', type: 'daterange' ,value:[], editable:false }
                    ],
                    queryButtons: [
                        {
                            label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                                if (valid) {
                                    _self.$refs.reftable.remoteData(model);
                                }
                            }
                        },
                        {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2'}
                    ],

                    tableColumns: [
                        {label: '检查任务编号', prop: 'bizSerno', sortable: true, resizable: true},
                        { label: '检查任务流水号', prop: 'bizSernoFlow', sortable: true, resizable: true ,hidden:true},
                        {label: '检查名称', prop: 'chkName', sortable: true, resizable: true},
                        {label: '客户编号', prop: 'cusId', sortable: true, resizable: true},
                        {label: '客户名称', prop: 'cusName', sortable: true, resizable: true},
                        {
                            label: '证件类型',
                            prop: 'certType',
                            sortable: true,
                            resizable: true,
                            type: 'select',
                            dataCode: 'STD_ZB_CERT_TYP'
                        },
                        {label: '证件号码', prop: 'certCode', sortable: true, resizable: true},
                        //{ label: '检查内容',prop: 'chkCont', sortable: true, resizable: true },
                        {
                            label: '检查任务状态',
                            prop: 'chkState',
                            sortable: true,
                            resizable: true,
                            type: 'select',
                            dataCode: 'STD_ZB_CHK_STATE'
                        },
                        {label: '客户经理号', prop: 'cusManager', sortable: true, resizable: true},
                        {label: '管理机构', prop: 'mainBrId', sortable: true, resizable: true},
                        // { label: '创建人',prop: 'createUser', sortable: true, resizable: true },
                        //{ label: '创建时间', prop: 'createTime',sortable: true, resizable: true },
                    ],
                    updateFields: [{
                        columnCount: 3,
                        fields: [
                            {field: 'bizSerno', label: '检查任务编号'},
                            {field: 'chkName', label: '检查名称'},
                            {field: 'cusId', label: '客户编号'},
                            {field: 'cusName', label: '客户名称'},
                            {field: 'certType', label: '证件类型', type: 'select', dataCode: 'STD_ZB_CERT_TYP'},
                            {field: 'certCode', label: '证件号码'},
                            {field: 'ownCdt', label: '授信总额(元)', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                            {field: 'loanTotalBln', label: '贷款总余额(元)', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter}
                            //{ field: 'chkCont', label: '检查内容'},
                            //{ field: 'chkState', label: '检查任务状态' , type: 'select' ,dataCode:'STD_ZB_CHK_STATE'}

                        ]
                    }, {
                        columnCount: 1,
                        fields: [
                            {field: 'othUnFactor', label: '其他不利因素', type: "textarea"},
                            {field: 'expSugg', label: '情况说明及建议', type: "textarea"}
                        ]
                    }],

                    updateOrgFields: [{
                        columnCount: 3,
                        fields: [
                            {field: 'cusManager', label: '客户经理号'},
                            {field: 'mainBrId', label: '主管机构'},
                            {field: 'createUser', label: '创建人'},
                            {field: 'createTime', label: '创建时间'},
                            {field: 'inputBrId', label: '登记机构', hidden: true}
                        ]
                    }],


                    /** 附件上传*/
                    dataUrlAnnex: backend.riskmService + '/api/mon/relief/ann',
                    baseParamsAnnex:{},
                    tableColumnsAnnex:[
                        { label: '检查登记申请流水号', prop: 'flowAppNo', sortable: true, resizable: true },
                        { label: '申请流水号', prop: 'bizSerno', sortable: true, resizable: true ,hidden:true},
                        { label: '附件名称', prop: 'annexName', sortable: true, resizable: true },
                        { label: '附件描述', prop: 'annexDesc', sortable: true, resizable: true },
                        { label: '上传人', prop: 'uploadUser', sortable: true, resizable: true },
                        { label: '上传时间', prop: 'uploadTime', sortable: true, resizable: true },
                        { label: '最后更新人', prop: 'lastUploadUser', sortable: true, resizable: true },
                        { label: '最后更新时间', prop: 'lastUploadTime', sortable: true, resizable: true }
                    ],

                    //人行征信tab页
                    dataUrlcomm: backend.riskmService + '/api/rsc/warn/loan/hist/rule',
                    cdpReftableParams: {},
                    cdpReftableColumns: [
                        {label: '规则编号', prop: 'ruleCode', sortable: true, resizable: true, hidden:true },
                        {label: '规则名称', prop: 'ruleName', sortable: true, resizable: true},
                        {label: '历史值', prop: 'histValue', sortable: true, resizable: true},
                        {label: '当前值', prop: 'currValue', sortable: true, resizable: true}
                    ],
                    //征信报告
                    dataUrlZx:backend.riskmService+'/api/rsc/warn/zxReport',
                    zxReftableParams:{},
                    zxReftableColumns:[
                        {label: '征信报告号', prop: 'reportId', sortable: true, resizable: true},
                        {label: '客户姓名', prop: 'cusName', sortable: true, resizable: true},
                        {label: '证件号码', prop: 'certCode', sortable: true, resizable: true},
                        {
                            label: '创建时间', prop: 'createTime', sortable: true, resizable: true,
                            formatter: function (row, column, cellValue) {
                                if (!row.createTime) {
                                    return row.createTime;
                                } else {
                                    return yufp.util.dateFormat(row.createTime);
                                }
                            }
                        },
                        {
                            label: '征信报告更新时间', prop: 'updateTime', sortable: true, resizable: true,
                            formatter: function (row, column, cellValue) {
                                if (!row.updateTime) {
                                    return row.updateTime;
                                } else {
                                    return yufp.util.dateFormat(row.updateTime);
                                }
                            }
                        },
                    ],
                    height: yufp.frame.size().height,
                    dialogVisible: false,
                    formDisabled: false,
                    printVisible: false,
                    printStyle: '',
                    reportSrc: "",
                    viewType: 'DETAIL',
                    tabName: 'basicTab',
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false)
                }
            },
            methods: {
                /**
                 * @param ctrlCode 操作码
                 */
                checkPermission: function (ctrlCode) {
                    return !yufp.session.checkCtrl(ctrlCode, cite.menuId);
                },
                /**
                 * @param viewType 表单类型
                 * @param editable 可编辑,默认false
                 */
                switchStatus: function (viewType, editable) {
                    var _self = this;
                    _self.viewType = viewType;
                    _self.formDisabled = !editable;
                    _self.dialogVisible = true;
                },
                infoFn: function () {
                    var _self = this;
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    _self.cdpReftableParams = {
                        tabType: '02'
                    }
                    var obj = this.$refs.reftable.selections[0];
                    var conditions = {
                        cusId: obj.cusId,
                        cusName: obj.cusName,
                        certType: obj.certType,
                        certCode: obj.certCode
                    };
                    _self.zxReftableParams = {
                        cusId: obj.cusId,
                        cusName: obj.cusName,
                        certType: obj.certType,
                        certCode: obj.certCode
                    }
                    // 附件上传记录表格参数
                    _self.baseParamsAnnex = {
                        flowAppNo : obj.bizSernoFlow,
                        bizSerno : obj.bizSernoFlow
                    };
                    this.switchStatus('DETAIL', false);
                    this.$nextTick(function () {
                        _self.clearFn();
                        yufp.util.copyObj(this.$refs.reform.formModel, obj);
                        yufp.util.copyObj(this.$refs.bform.formModel, obj);
                        _self.$refs.zxReftable.remoteData(_self.zxReftableParams);
                        _self.$refs.reftableAnnex.remoteData(_self.baseParamsAnnex);   //附件上传
                        yufp.service.request({
                            method: "POST",
                            url: backend.riskmService + '/api/rec/hist/rsc/warn',
                            data: conditions,
                            callback: function (code, message, response) {
                                if (response.code == 0) {
                                    _self.$refs.cdpReftable.remoteData(_self.cdpReftableParams);
                                } else {
                                    _self.$refs.cdpReftable.remoteData(_self.cdpReftableParams);
                                    _self.$message({message: "处理失败：" + response.message, type: 'warning'});
                                }
                            }
                        });
                    });
                },
//          cancleFn: function(){
//                var _self = this;
//                _self.dialogVisible = false;
//          },

                printFn: function () {
                    var _self = this;
                    var selections = _self.$refs.reftable.selections;
                    if (selections.length < 1) {
                        _self.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    //&ReportName=检查
                    var len = selections.length;
                    var cusId = [];
                    var bizSerno = [];
                    for (var i = 0; i < len; i++) {
                        cusId.push(selections[i].cusId);
                        bizSerno.push(selections[i].bizSerno);
                    }
                    this.printStyle = {scoller: 'auto', width: '100%', height: ' ' + this.height, border: 'auto'};
                    this.reportSrc = yufp.settings.reportUrl + "/reportForms.jsp?Sys_ReportName=PspCheckRpt&bizSerno=" + bizSerno + "&cusId=" + cusId;
                    this.printVisible = true;
                },
                getContentFn: function () {
                    var _self = this;
                    var selections = this.$refs.zxReftable.selections;
                    if (selections.length != 1) {
                        this.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    var condition = {
                        reportId: selections[0].reportId
                    };
                    yufp.service.request({
                        method: 'POST',
                        url: backend.creditService + '/api/cus/rpt/show',
                        data: condition,
                        callback: function (code, message, response) {
                            if (response.code == 0) {
                                var report = response.rows.content;
                                if (report != "" && report != null) {
                                    w = window.open('about:blank');
                                    w.document.write(report);
                                    w.document.close();
                                } else {
                                    _self.$message('没有查询到征信报告!');
                                }
                            } else {
                                _self.$message({message: '查看征信报告失败：' + response.message, type: 'warning'});
                            }
                        }
                    });
                },
                exportFn: function () {
                    var _self = this;
                    var selections = this.$refs.reftable.selections;
                    if (selections.length != 1) {
                        this.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    var bizSerno = selections[0].bizSerno;
//              var len = selections.length;
//              var bizSernos = [];
//              for (var i = 0; i < len; i++) {
//                bizSernos.push(selections[i].bizSerno);
//              }
                    var downLoadUrl = backend.riskmService + '/api/psp/check/rpt/down/' + bizSerno;
                    _self.$confirm('是否导出数据?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function (action) {
                            if (action === 'confirm') {
                                window.location.href = downLoadUrl;
                            }
                        }
                    });
                },
                closeFn: function () {
                    var _self = this;
                    _self.dialogVisible = false;
                },
                infoAnnexFn: function () {
                    var _self = this;
                    if (this.$refs.reftableAnnex.selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    _self.dialogVisibleAnnex = true;
                    _self.annexFormDisabled = true;
                    _self.flag = 'VIEWINFO';
                    var obj = _self.$refs.reftableAnnex.selections[0];
                    _self.$nextTick(function () {
                        _self.$refs.annexForm.resetFn();
                        yufp.extend(_self.$refs.annexForm.formModel,obj);
                    });
                    var right = '1100000';
                    var date = obj.uploadTime.slice(0,10).replace(/\-/g,"");
                    _self.$confirm('将前往影像平台查看影像资料，是否继续？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function (action) {
                            if (action === 'confirm') {
                                _self.postWindow(obj.flowAppNo,date,right);
                            }
                        }
                    });
                },

                postWindow: function(reliefAppNo,date,item){
                    yufp.service.request({
                        method: 'POST',
                        url: backend.edocService + "/api/doEncode",
                        data: {
                            applySeq : reliefAppNo,
                            sessionUserId: yufp.session.userId,
                            sessionUserName: yufp.session.userName,
                            sessionOrgCode: yufp.session.org.orgCode,
                            sessionOrgName: yufp.session.org.orgName,
                            startDate : date,
                            rightCode : item
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
                },

                clearFn: function () {
                    var _self = this;
                    _self.$refs.reform.resetFields();
                    _self.$refs.bform.resetFields();
                    _self.$refs.cdpReftable.data = [];
                    _self.$refs.zxReftable.data = [];

                }
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
