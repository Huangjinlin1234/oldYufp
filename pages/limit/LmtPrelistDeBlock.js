/**
 * @create by chenqm1 on 2018-05-03
 * @description 预授信名单表
 */
define(function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,STD_ZB_CERT_TYP,STD_ZX_YES_NO,FREEZE_REASON_TYPE,STD_ZB_APPR_STATUS,STD_ZB_SEVEN_SORT,STD_ZB_LMT_STATE,STD_ZX_QUERY_CASE');
        var vm = yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    lmtDataUrl: backend.creditService + '/api/lmt/prd/cont/freeze',
                    loanDetailUrl: backend.creditService + '/api/lmt/cont/no/acc/loans',
                    unfrzAppDataUrl: backend.creditService + '/api/lmt/unfreeze/apps',
                    passUrl: backend.riskService + '/api/rsc/warn/loans/lmt/cont/no',
                    dataUrlZX: backend.cusService + '/api/cus/rpt/condition',
                    baseParams: {

                    },
                    loanDetailParams: {

                    },
                    passBaseParams: {

                    },
                    queryFields: [{
                            placeholder: '解冻流水号',
                            field: 'unfrzSerno',
                            type: 'input'
                        },
                        {
                            placeholder: '客户号',
                            field: 'cusId',
                            type: 'input'
                        },
                        {
                            placeholder: '客户名称',
                            field: 'cusName',
                            type: 'input'
                        },
                        {
                            placeholder: '证件类型',
                            field: 'certType',
                            type: 'select',
                            dataCode: 'STD_ZB_CERT_TYP'
                        },
                        {
                            placeholder: '证件号码',
                            field: 'certCode',
                            type: 'input'
                        },
                        {
                            placeholder: '受理机构号',
                            field: 'mainBrId',
                            type: 'input'
                        },
                        {
                            placeholder: '申请人',
                            field: 'createUser',
                            type: 'input'
                        },
                        {
                            placeholder: '申请日期范围',
                            field: 'createTimeBetween',
                            type: 'daterange'
                        },
                        {
                            placeholder: '审批状态',
                            field: 'approveStatus',
                            type: 'select',
                            dataCode: 'STD_ZB_APPR_STATUS'
                        },
                        {
                            placeholder: '产品名称',
                            field: 'prdName',
                            type: 'input'
                        },
                        {
                            placeholder: '客户经理号',
                            field: 'cusManager',
                            type: 'input'
                        }
                    ],
                    queryButtons: [{
                            label: '查询',
                            op: 'submit',
                            type: 'primary',
                            icon: 'search',
                            click: function (model, valid) {
                                if (valid) {
                                    if (model.createTimeBetween === '')
                                        model.createTimeBetween = [];
                                    _self.$refs.reftable.remoteData(model);
                                }
                            }
                        },
                        {
                            label: '重置',
                            op: 'reset',
                            type: 'primary',
                            icon: 'yx-loop2'
                        }
                    ],

                    tableColumns: [{
                            label: '解冻流水号',
                            prop: 'unfrzSerno',
                            width: '200px',
                            resizable: true
                        },
                        {
                            label: '客户号',
                            prop: 'cusId',
                            width: '200px',
                            resizable: true
                        },
                        {
                            label: '客户名称',
                            prop: 'cusName',
                            width: '200px',
                            resizable: true
                        },
                        {
                            label: '授信协议号',
                            prop: 'lmtContNo',
                            width: '200px',
                            resizable: true
                        },
                        {
                            label: '额度(元)',
                            prop: 'lmtAmt',
                            resizable: true
                        },
                        {
                            label: '是否循环',
                            prop: 'cyclicFlg',
                            dataCode: 'STD_ZX_YES_NO',
                            resizable: true
                        },
                        {
                            label: '证件类型',
                            prop: 'certType',
                            dataCode: 'STD_ZB_CERT_TYP',
                            resizable: true
                        },
                        {
                            label: '证件号码',
                            prop: 'certCode',
                            width: '200px',
                            resizable: true
                        },
                        {
                            label: '受理机构号',
                            prop: 'mainBrId',
                            resizable: true
                        },
                        {
                            label: '客户经理号',
                            prop: 'cusManager',
                            resizable: true
                        },
                        {
                            label: '产品名称',
                            prop: 'prdName',
                            resizable: true
                        },
                        {
                            label: '申请人',
                            prop: 'createUser',
                            resizable: true
                        },
                        {
                            label: '申请日期',
                            prop: 'applyDate',
                            width: '100px',
                            resizable: true
                        },
                        {
                            label: '审批状态',
                            prop: 'approveStatus',
                            dataCode: 'STD_ZB_APPR_STATUS',
                            resizable: true
                        },
                        {
                            label: '审批人',
                            prop: 'aprvUserName',
                            resizable: true
                        },
                        {
                            label: '人工处理意见',
                            prop: 'aprvComment',
                            width: '200px',
                            resizable: true
                        },
                        {
                            label: '解冻原因',
                            prop: 'remarks',
                            resizable: true
                        }
                    ],

                    baseInfoFields: [{
                        columnCount: 2,
                        fields: [{
                                field: 'lmtContNo',
                                label: '授信协议号',
                                rules: [{
                                    required: true,
                                    message: '必选项',
                                    trigger: 'blur'
                                }],
                                disabled: true
                            },
                            {
                                field: 'mainBrId',
                                label: '受理机构号',
                                disabled: true
                            },
                            {
                                field: 'unfrzSerno',
                                label: '解冻流水号',
                                hidden: true
                            },
                            {
                                field: 'createUser',
                                label: '申请人',
                                disabled: true
                            },
                            {
                                field: 'aprvDate',
                                label: '申请时间',
                                disabled: true
                            }
                        ]
                    }],
                    loanDetailColumns: [{
                            label: '借据号',
                            prop: 'billNo',
                            resizable: true
                        },
                        {
                            label: '客户名称',
                            prop: 'cusName',
                            resizable: true
                        },
                        {
                            label: '贷款本金余额(元)',
                            prop: 'loanBalance',
                            resizable: true
                        },
                        {
                            label: '未结利息(元)',
                            prop: 'delayIntCumu',
                            resizable: true
                        },
                        {
                            label: '罚息(元)',
                            prop: 'unpdArrsIntBal',
                            resizable: true
                        },
                        {
                            label: '贷款利率(年)',
                            prop: 'realityIrY',
                            resizable: true,
                            formatter: function(row, column, cellValue) {
                                var num = parseFloat(cellValue);
                                if (typeof(num) == 'undefined'  || num == null || isNaN(num) )
                                    num = 0;
                                var rateY = Number(num * 100).toFixed(4) + '%';
                                return rateY;
                            }
                        },
                        {
                            label: '借据期限(天)',
                            prop: 'loanDay',
                            resizable: true
                        },
                        {
                            label: '七级分类',
                            prop: 'sevenResult',
                            resizable: true,
                            dataCode: 'STD_ZB_SEVEN_SORT'
                        }
                    ],
                    amtAndReasonFields: [{
                        columnCount: 2,
                        fields: [{
                            field: 'lmtAmt',
                            label: '解冻金额(元)',
                            disabled: true
                        }]
                    }, {
                        columnCount: 2,
                        fields: [{
                            field: 'remarks',
                            label: '解冻原因',
                            type: 'textarea',
                            rows: 6,
                            rules: [{
                                required: true,
                                message: '必填项',
                                trigger: 'blur'
                            }]
                        }]
                    }],
                    passColumns: [{
                            label: '规则ID',
                            prop: 'ruleCode',
                            sortable: true,
                            resizable: true
                        },
                        {
                            label: '规则名称',
                            prop: 'ruleName',
                            sortable: true,
                            resizable: true
                        },
                        {
                            label: '预警时间',
                            prop: 'riskDate',
                            sortable: true,
                            resizable: true
                        }
                    ],
                    height: yufp.frame.size().height - 103,
                    dialogVisible: false,
                    formDisabled: false,
                    viewType: 'DETAIL',
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    expandCollapseName: ['lmtContInfo', 'baseInfo', 'loanDetail', 'amtAndReason', 'aprvInfo'],
                    tabName: 'first',
                    lmtQueryFields: [{
                            placeholder: '授信协议号',
                            field: 'lmtContNo',
                            type: 'input'
                        },
                        {
                            placeholder: '客户号',
                            field: 'cusId',
                            type: 'input'
                        },
                        {
                            placeholder: '客户名称',
                            field: 'cusName',
                            type: 'input'
                        },
                        {
                            placeholder: '证件号码',
                            field: 'certCode',
                            type: 'input'
                        }
                    ],
                    lmtTableColumns: [
                        { label: '授信协议号', prop: 'lmtContNo', width: 260, sortable: true },
                        { label: '客户号', prop: 'cusId', width: 110},
                        { label: '客户名称', prop: 'cusName', width: 110 },
                        { label: '证件类型', prop: 'certType', width: 110, dataCode: 'STD_ZB_CERT_TYP' },
                        { label: '证件号码', prop: 'certCode', width: 100},
                        { label: '产品号', prop: 'prdCode', width: 80},
                        { label: '产品名称', prop: 'prdName', width: 80},
                        { label: '授信额度(元)', prop: 'lmtAmt', width: 80, formatter: function(row, column, cellValue){
                            return yufp.util.moneyFormatter(cellValue, 2);
                        } },
                        { label: '是否循环', prop: 'cyclicFlg', width: 80, dataCode: 'STD_ZX_YES_NO' },
                        { label: '利率(年)', prop: 'rateY', width: 80, formatter: function(row, column, cellValue) {
                            var num = parseFloat(cellValue);
                            if (typeof(num) == 'undefined'  || num == null || isNaN(num) )
                                num = 0;
                            var rateY = Number(num * 100).toFixed(4) + '%';
                            return rateY;
                        } },
                        { label: '授信状态', prop: 'lmtStatus', width: 80, dataCode: 'STD_ZB_LMT_STATE' },
                        { label: '起始日', prop: 'startDate', width: 80},
                        { label: '到期日期', prop: 'expireDate', width: 80},
                        { label: '客户经理号', prop: 'cusManager', width: 80},
                        { label: '法人机构名称', prop: 'legalOrgName', width: 80}
                    ],
                    tableColumnsZX: [{
                            label: '报告号',
                            prop: 'reportno',
                            sortable: true,
                            resizable: true
                        },
                        {
                            label: '查询时间',
                            prop: 'queryTime',
                            sortable: true,
                            resizable: true
                        },
                        {
                            label: '客户名称',
                            prop: 'cusName',
                            sortable: true,
                            resizable: true
                        },
                        {
                            label: '证件类型',
                            prop: 'certType',
                            dataCode: 'STD_ZB_CERT_TYP'
                        },
                        {
                            label: '证件号码',
                            prop: 'certCode',
                            sortable: true,
                            resizable: true
                        },
                        {
                            label: '查询原因',
                            prop: 'queryCase',
                            dataCode: 'STD_ZX_QUERY_CASE'
                        },
                        {
                            label: '查询人',
                            prop: 'queryUser',
                            sortable: true,
                            resizable: true
                        },
                        {
                            label: '查询机构',
                            prop: 'queryOrg',
                            sortable: true,
                            resizable: true
                        },
                        {
                            label: '查询法人机构',
                            prop: 'queryMOrg',
                            sortable: true,
                            resizable: true
                        }
                    ],
                    aprvVisible: false,
                    aprvFields: [{
                        columnCount: 3,
                        fields: [{
                            field: 'aprvUserCode',
                            label: '审批人用户代码'
                        },{
                            field: 'aprvDate',
                            label: '审批日期'
                        },{
                            field: 'aprvComment',
                            label: '人工处理意见',
                            type: 'textarea'
                        }]
                    }]
                };
            },
            methods: {
                /**
                 * @param ctrlCode 操作码
                 */
                checkPermission: function (ctrlCode) {
                    return true; //yufp.session.checkCtrl(ctrlCode, cite.menuId);
                },
                /** 查询余额 */
                queryBalance: function (obj) {
                    var _self = this;
                    yufp.service.request({
                        method: 'POST',
                        url: backend.creditService + '/api/lmt/prd/getContResult',
                        data: obj,
                        callback: function (code, message, response) {
                            if (code == 0) {
                                var price = _self.priceFormat(response.data.balance);
                                vm.$refs.amtAndReasonForm.formModel.balance = price;
                            } else
                                _self.$message({
                                    message: '查询产品额度余额（元）出错',
                                    type: 'warning'
                                });

                        }
                    });
                },
                priceFormat: function (value) {
                    var price = value;
                    return yufp.util.moneyFormatter(price, 2);
                },
                /**
                 * @param viewType 表单类型
                 * @param editable 可编辑,默认false
                 */
                switchStatus: function (viewType, editable) {
                    var _self = this;
                    this.aprvVisible = false;
                    this.tabName = 'first';
                    _self.viewType = viewType;
                    _self.formDisabled = !editable;
                    _self.dialogVisible = true;
                    this.$nextTick(function () {
                        this.$refs.lmtTable.remoteData();
                    });
                },
                addFn: function () {
                    var _self = this;
                    _self.switchStatus('ADD', true);
                    _self.$nextTick(function () {
                        _self.$refs.baseInfoform.resetFn();
                        _self.$refs.amtAndReasonForm.resetFn();
                        _self.$refs.loanDetailTable.data = [];
                        this.$refs.loanDetailTable.total = 0;
                    });
                },
                modifyFn: function () {
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({
                            message: '请先选择一条记录',
                            type: 'warning'
                        });
                        return;
                    }
                    var obj = this.$refs.reftable.selections[0];
                    if (obj.approveStatus != '000') {
                        this.$message({
                            message: '只能修改待发起的申请信息!',
                            type: 'warning'
                        });
                        return;
                    }
                    this.switchStatus('EDIT', true);
                    this.$nextTick(function () {
                        yufp.util.copyObj(this.$refs.baseInfoform.formModel, obj);
                        yufp.util.copyObj(this.$refs.amtAndReasonForm.formModel, obj);
                        var serno = {
                            lmtContNo: obj.lmtContNo
                        };
                        this.$refs.loanDetailTable.remoteData(serno);
                        this.queryBalance(obj);
                        var cusName = obj.cusName;
                        var certType = obj.certType;
                        var certCode = obj.certCode;
                        var queryResult = '1'; //1征信查询成功，2或空为征信查询失败
                        var loginUserLeageOrgCode = yufp.session.user.legalOrg.orgCode; //法人机构
                        var params = {
                            cusName: cusName,
                            certType: certType,
                            certCode: certCode,
                            queryResult: queryResult,
                            loginUserLeageOrgCode: loginUserLeageOrgCode
                        };
                        //this.$refs.thirdReftable.remoteData(params);
                    });
                },
                infoFn: function () {
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({
                            message: '请先选择一条记录',
                            type: 'warning'
                        });
                        return;
                    }
                    this.switchStatus('DETAIL', false);
                    var obj = this.$refs.reftable.selections[0];
                    if ( obj.approveStatus != '000' && obj.approveStatus != '111' ) 
                        this.aprvVisible = true;
                    this.$nextTick(function () {
                        
                        yufp.util.copyObj(this.$refs.baseInfoform.formModel, obj);
                        yufp.util.copyObj(this.$refs.amtAndReasonForm.formModel, obj);
                        var aprvInfo = {
                            aprvUserCode: obj.aprvUserCode,
                            aprvComment: obj.aprvComment,
                            aprvDate: obj.aprvDate
                        };
                        yufp.extend(this.$refs.aprvForm.formModel, aprvInfo);
                        var serno = {
                            lmtContNo: obj.lmtContNo
                        };
                        this.$refs.loanDetailTable.remoteData(serno);
                        this.queryBalance(obj);
                        var cusName = obj.cusName;
                        var certType = obj.certType;
                        var certCode = obj.certCode;
                        var queryResult = '1'; //1征信查询成功，2或空为征信查询失败
                        var loginUserLeageOrgCode = yufp.session.user.legalOrg.orgCode; //法人机构
                        var params = {
                            cusName: cusName,
                            certType: certType,
                            certCode: certCode,
                            queryResult: queryResult,
                            loginUserLeageOrgCode: loginUserLeageOrgCode
                        };
                        //this.$refs.thirdReftable.remoteData(params);
                    });
                },
                deleteFn: function () {
                    var _self = this;
                    var selections = _self.$refs.reftable.selections;
                    if (selections.length < 1) {
                        _self.$message({
                            message: '请先选择一条记录',
                            type: 'warning'
                        });
                        return;
                    }
                    var len = selections.length,
                        arr = [];
                    for (var i = 0; i < len; i++) {
                        arr.push(selections[i].unfrzSerno);
                        if (selections[i].approveStatus != '000') {
                            this.$message({
                                message: '只能删除带发起的申请信息!',
                                type: 'warning'
                            });
                            return;
                        }
                    }
                    this.$confirm('是否删除额度解冻申请？', '提示').then(function () {
                        yufp.service.request({
                            method: 'DELETE',
                            url: backend.creditService + '/api/lmt/unfreeze/app',
                            data: {
                                unfrzSerno: arr.join(',')
                            },
                            callback: function (code, message, response) {
                                if (code == 0) {
                                    _self.$refs.reftable.remoteData();
                                    _self.$message({
                                        message: '处理成功',
                                        type: 'success'
                                    });
                                } else {
                                    _self.$message('操作失败');
                                }
                            }
                        });
                    });

                },
                deblockFn: function () {
                    this.dialogVisible = true;
                },
                tabClick: function () {
                    if (!this.$refs.passTable) {
                        this.$nextTick(function () {
                            var lmtContNo = this.$refs.baseInfoform.formModel.lmtContNo;
                            var obj = {
                                lmtContNo: lmtContNo
                            };
                            this.$refs.passTable.remoteData(obj);
                        });
                    }
                },
                saveFn: function () {
                    var _self = this;
                    var validate = false;
                    this.$refs.baseInfoform.validate(function (valid) {
                        validate = valid;
                    });
                    if (!validate) return;

                    this.$refs.amtAndReasonForm.validate(function (valid) {
                        validate = valid;
                    });
                    if (!validate) return;

                    var obj = this.$refs.baseInfoform.formModel;
                    var otherForm = this.$refs.amtAndReasonForm.formModel;
                    yufp.extend(obj, otherForm);
                    var rMethod = '';
                    if (_self.viewType == "EDIT") {
                        rMethod = 'PUT';
                    } else if (_self.viewType == "ADD") {
                        rMethod = 'POST';
                    }

                    yufp.service.request({
                        method: rMethod,
                        url: backend.creditService + '/api/lmt/unfreeze/app',
                        data: obj,
                        callback: function (code, message, response) {
                            var data = response.data;
                            if (code == 0 && data >= 0) {
                                vm.dialogVisible = false;
                                vm.$message({
                                    message: '处理成功!',
                                    type: 'success'
                                });
                                vm.$refs.reftable.remoteData();
                            } else
                                vm.$message({
                                    message: response.message,
                                    type: 'warning'
                                });

                        }
                    });
                },
                returnFn: function () {
                    this.dialogVisible = false;
                },
                commitFn: function () {
                    var _self = this;
                    var validate = false;
                    this.$refs.baseInfoform.validate(function (valid) {
                        validate = valid;
                    });
                    if (!validate) return;

                    this.$refs.amtAndReasonForm.validate(function (valid) {
                        validate = valid;
                    });
                    if (!validate) return;

                    var obj = this.$refs.baseInfoform.formModel;
                    var otherForm = this.$refs.amtAndReasonForm.formModel;
                    yufp.extend(obj, otherForm);
                    var rMethod = '';
                    if (_self.viewType == "EDIT") {
                        rMethod = 'PUT';
                    } else if (_self.viewType == "ADD") {
                        rMethod = 'POST';
                    }

                    yufp.service.request({
                        method: rMethod,
                        url: backend.creditService + '/api/lmt/unfreeze/app/submit',
                        data: obj,
                        callback: function (code, message, response) {
                            var data = response.data;
                            if (code == 0 && data >= 0) {
                                vm.dialogVisible = false;
                                vm.$message({
                                    message: '处理成功!',
                                    type: 'success'
                                });
                                vm.$refs.reftable.remoteData();
                            } else
                                vm.$message({
                                    message: response.message,
                                    type: 'warning'
                                });

                        }
                    });
                },
                searchFn: function (model, valid) {
                    if (valid) {
                        this.$refs.lmtTable.remoteData(model);
                    }
                },
                rowClickFn: function (row, event, column) {
                    var serno = {
                        lmtContNo: row.lmtContNo
                    };
                    this.$refs.loanDetailTable.remoteData(serno);
                    var model = this.$refs.baseInfoform.formModel;
                    model.lmtContNo = row.lmtContNo;
                    model.mainBrId = yufp.session.org.orgCode;
                    model.createUser = yufp.session.userId;
                    model.aprvDate = yufp.util.dateFormat(new Date().getTime(), '{y}-{m}-{d}');
                    this.$refs.amtAndReasonForm.formModel.lmtAmt = row.lmtAmt;
                    //this.queryBalance(row);
                    if (this.$refs.passTable) {
                        this.$refs.passTable.remoteData(serno);
                    }
                    var cusName = row.cusName;
                    var certType = row.certType;
                    var certCode = row.certCode;
                    var queryResult = '1'; //1征信查询成功，2或空为征信查询失败
                    var loginUserLeageOrgCode = yufp.session.user.legalOrg.orgCode; //法人机构
                    var params = {
                        cusName: cusName,
                        certType: certType,
                        certCode: certCode,
                        queryResult: queryResult,
                        loginUserLeageOrgCode: loginUserLeageOrgCode
                    };
                    //this.$refs.thirdReftable.remoteData(params);
                },
                getCredit: function () {
                    var _self = this;
                    if (_self) return ;
                    var selections = this.$refs.thirdReftable.selections;
                    if (selections.length != 1) {
                        this.$message({
                            message: '请先选择一条记录',
                            type: 'warning'
                        });
                        return;
                    }
                    var cmisdata = selections[0];
                    yufp.service.request({
                        method: 'POST',
                        url: backend.cusService + '/api/cus/rpt/show',
                        data: cmisdata,
                        callback: function (code, message, response) {
                            if (response.code == 0) {
                                var report = response.data;
                                w = window.open('about:blank');
                                w.document.write(report);
                                w.document.close();
                            } else {
                                _self.$message('查看征信报告失败!');
                            }
                        }
                    });
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