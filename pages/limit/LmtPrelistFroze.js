﻿/**
 * @create by chenqm1 on 2018-05-03
 * @description 预授信名单表
 */
define(function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,STD_ZB_CONT_STATUS,STD_ZB_LMT_STATE,STD_ZX_CUR_TYPE,STD_ZB_CERT_TYP,STD_ZX_YES_NO,FREEZE_REASON_TYPE,STD_ZB_APPR_STATUS,STD_ZX_QUERY_CASE');
        var vm = yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    valiPagePluginData: true,
                    expandCollapseName: ['1', '2', '3', '4'],
                    baseParams: {},
                    baseTab: 'baseTab',
                    lmtDataUrl: backend.creditService + '/api/lmt/prd/cont/normal',
                    freezeUrl: backend.creditService + "/api/lmt/freeze/apps",
                    contUrl: backend.ctrService + "/api/ctr/loan/contSerno",
                    dataUrlZX: backend.cusService + '/api/cus/rpt/condition',
                    queryFields: [
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
                        },
                        {
                            placeholder: '证件类型',
                            field: 'certType',
                            type: 'select',
                            dataCode: 'STD_ZB_CERT_TYP'
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
                            placeholder: '申请时间范围',
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
                                    if ( model.createTimeBetween === '') 
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
                            label: '冻结流水号',
                            prop: 'frzSerno',
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
                            width: '100px',
                            sortable: true,
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
                            resizable: true
                        },
                        {
                            label: '审批状态',
                            prop: 'approveStatus',
                            dataCode: 'STD_ZB_APPR_STATUS',
                            resizable: true
                        }
                    ],
                    contListColumns: [{
                            label: '合同号',
                            prop: 'contNo',
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
                            label: '合同金额(元)',
                            prop: 'contAmt',
                            sortable: true,
                            resizable: true,
                            formatter: function(row, column, cellValue){
                                return yufp.util.moneyFormatter(cellValue, 2);
                            }
                        },
                        {
                            label: '合同状态',
                            prop: 'contState',
                            sortable: true,
                            dataCode: 'STD_ZB_CONT_STATUS',
                            resizable: true
                        }
                    ],
                    updateFields: [{
                        columnCount: 3,
                        fields: [{
                                field: 'lmtContNo',
                                label: '授信协议号',
                                disabled: true,
                                rules: [{
                                    required: true,
                                    message: '授信协议号是必选项'
                                }]
                            },
                            {
                                field: 'balance',
                                label: '产品剩余可用额度(元)',
                                disabled: true,
                                formatter: yufp.util.moneyFormatter
                            },
                            {
                                field: 'createUser',
                                label: '冻结申请人',
                                disabled: true
                            },
                            {
                                field: 'lmtAmt',
                                label: '额度(元)',
                                disabled: true,
                                hidden: true
                            },
                            {
                                field: 'cusId',
                                label: '客户号',
                                disabled: true,
                                hidden: true
                            },
                            {
                                field: 'cusName',
                                label: '客户名称',
                                disabled: true,
                                hidden: true
                            },
                            {
                                field: 'certType',
                                label: '证件类型',
                                disabled: true,
                                type: 'select',
                                dataCode: 'STD_ZB_CERT_TYP',
                                hidden: true
                            },
                            {
                                field: 'certCode',
                                label: '证件号码',
                                disabled: true,
                                hidden: true
                            },
                            {
                                field: 'cyclicFlg',
                                label: '是否循环',
                                disabled: true,
                                type: 'select',
                                dataCode: 'STD_ZX_YES_NO',
                                hidden: true
                            },
                            {
                                field: 'frzReason',
                                label: '冻结原因',
                                type: 'select',
                                dataCode: 'FREEZE_REASON_TYPE',
                                hidden: true
                            }
                        ]
                    }, {
                        columnCount: 2,
                        fields: [{
                            field: 'remarks',
                            label: '冻结原因',
                            type: 'textarea',
                            rules: [{
                                required: true,
                                message: '冻结原因是必填项'
                            }]
                        }, ]
                    }],
                    updateButtons: [{
                            label: '保存',
                            type: 'primary',
                            icon: 'check',
                            hidden: false,
                            click: function (model) {
                                var validate = false;
                                _self.$refs.reform.validate(function (valid) {
                                    validate = valid;
                                });
                                if (!validate) {
                                    return;
                                }

                                var rMethod = '';
                                if (_self.viewType == "EDIT") {
                                    rMethod = 'PUT';
                                } else if (_self.viewType == "ADD") {
                                    rMethod = 'POST';
                                }

                                yufp.service.request({
                                    method: rMethod,
                                    url: '/credit/api/lmt/prelist',
                                    data: model,
                                    callback: function (code, message, response) {
                                        if (code == 0) {
                                            _self.$refs.reftable.remoteData();
                                            _self.$message('操作成功');
                                            _self.dialogVisible = false;
                                        } else {
                                            _self.$message('操作失败');
                                        }
                                    }
                                });
                            }
                        },
                        {
                            label: '取消',
                            type: 'primary',
                            icon: 'yx-undo2',
                            hidden: false,
                            click: function (model) {
                                _self.dialogVisible = false;
                            }
                        },
                    ],
                    height: yufp.frame.size().height - 103,
                    dialogVisible: false,
                    formDisabled: false,
                    viewType: 'DETAIL',
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    lmtQueryFields: [
                        {
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
                    tableColumnsZX: [
                        { label: '报告号', prop: 'reportno', sortable: true, resizable: true },
                        { label: '查询时间', prop: 'queryTime', sortable: true, resizable: true },
                        { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
                        { label: '证件类型', prop: 'certType', dataCode: 'STD_ZB_CERT_TYP'},
                        { label: '证件号码', prop: 'certCode', sortable: true, resizable: true },
                        { label: '查询原因', prop: 'queryCase', dataCode: 'STD_ZX_QUERY_CASE' },
                        { label: '查询人', prop: 'queryUser', sortable: true, resizable: true },
                        { label: '查询机构', prop: 'queryOrg', sortable: true, resizable: true },
                        { label: '查询法人机构', prop: 'queryMOrg', sortable: true, resizable: true }
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
                    }],
                    passUrl: backend.riskService + '/api/rsc/warn/loans/lmt/cont/no',
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
                    ]
                };
            },
            methods: {
                /**
                 * @param ctrlCode 操作码
                 */
                checkPermission: function (ctrlCode) {
                    return !yufp.session.checkCtrl(ctrlCode, cite.menuId);
                },
                precentFormat:function(rateY){
                    var percent = Number.parseFloat(rateY*100).toFixed(7);
                    return yufp.util.toPercent(percent);
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
                                vm.$refs.baseRef.formModel.balance = price;
                            } else
                                _self.$message({
                                    message: '查询产品剩余可用额度（元）出错',
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
                 * 
                 * @param viewType 表单类型
                 * @param editable 可编辑,默认false
                 */
                switchStatus: function (viewType, editable) {
                    var _self = this;
                    this.baseTab = 'baseTab';
                    _self.viewType = viewType;
                    this.aprvVisible = false;
                    // _self.updateButtons[0].hidden = !editable;
                    _self.updateButtons[1].hidden = !editable;
                    _self.formDisabled = !editable;
                    _self.dialogVisible = true;
                    this.$nextTick(function() {
                        this.$refs.lmtTable.remoteData();
                    });
                },
                returnFn: function () {
                    var _self = this;
                    _self.dialogVisible = false;
                },
                commitFn: function () {
                    var _self = this;
                    var validate = false;
                    this.$refs.baseRef.validate(function (valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    var obj = this.$refs.baseRef.formModel;
                    var rMethod = '';
                    if (_self.viewType == "EDIT") {
                        rMethod = 'PUT';
                    } else if (_self.viewType == "ADD") {
                        rMethod = 'POST';
                    }
                    yufp.service.request({
                        method: rMethod,
                        url: backend.creditService + '/api/lmt/freeze/app/submit',
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
                saveFn: function () {
                    var _self = this;
                    var validate = false;
                    this.$refs.baseRef.validate(function (valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    var obj = this.$refs.baseRef.formModel;
                    var rMethod = '';
                    if (_self.viewType == "EDIT") {
                        rMethod = 'PUT';
                    } else if (_self.viewType == "ADD") {
                        rMethod = 'POST';
                    }
                    yufp.service.request({
                        method: rMethod,
                        url: backend.creditService + '/api/lmt/freeze/app',
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
                addFn: function () {
                    var _self = this;
                    _self.switchStatus('ADD', true);
                    _self.$nextTick(function () {
                        _self.$refs.baseRef.resetFn();
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
                    if ( obj.approveStatus != '000' ) {
                        this.$message({message: '只能修改待发起的申请信息!', type: 'warning'});
                        return ;
                    }
                    this.switchStatus('EDIT', true);
                    this.$nextTick(function () {
                        
                        yufp.extend(this.$refs.baseRef.formModel, obj);
                        this.queryBalance(obj);
                        var cusName = obj.cusName;
                        var certType = obj.certType;
                        var certCode = obj.certCode;
                        var queryResult = '1';  //1征信查询成功，2或空为征信查询失败
                        var loginUserLeageOrgCode = yufp.session.user.legalOrg.orgCode;//法人机构
                        var params = {
                            cusName : cusName,
                            certType : certType,
                            certCode : certCode,
                            queryResult : queryResult,
                            loginUserLeageOrgCode : loginUserLeageOrgCode
                        };
                        //this.$refs.thirdReftable.remoteData(params);
                        var lmtParam = {
                            lmtContNo: obj.lmtContNo
                        };
                        this.$refs.mytable.remoteData(lmtParam);
                        this.$refs.passTable.remoteData(lmtParam);
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
                        yufp.extend(this.$refs.baseRef.formModel, obj);
                        var aprvInfo = {
                            aprvUserCode: obj.aprvUserCode,
                            aprvComment: obj.aprvComment,
                            aprvDate: obj.aprvDate
                        };
                        yufp.extend(this.$refs.aprvForm.formModel, aprvInfo);
                        var price = this.priceFormat(obj.lmtBalance);
                        this.$refs.baseRef.formModel.balance = price;
                        var cusName = obj.cusName;
                        var certType = obj.certType;
                        var certCode = obj.certCode;
                        var queryResult = '1';  //1征信查询成功，2或空为征信查询失败
                        var loginUserLeageOrgCode = yufp.session.user.legalOrg.orgCode;//法人机构
                        var params = {
                            cusName : cusName,
                            certType : certType,
                            certCode : certCode,
                            queryResult : queryResult,
                            loginUserLeageOrgCode : loginUserLeageOrgCode
                        };
                        //this.$refs.thirdReftable.remoteData(params);
                        var lmtParam = {
                            lmtContNo: obj.lmtContNo
                        };
                        this.$refs.mytable.remoteData(lmtParam);
                        this.$refs.passTable.remoteData(lmtParam);
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
                        arr.push(selections[i].frzSerno);
                        if ( selections[i].approveStatus != '000' ) {
                            this.$message({message: '只能删除待发起的申请信息!!', type: 'warning'});
                            return ;
                        }
                    }

                    this.$confirm('是否删除额度冻结申请？', '提示').then(function () {
                        yufp.service.request({
                            method: 'DELETE',
                            url: backend.creditService + '/api/lmt/freeze/app',
                            data: {
                                frzSerno: arr.join(',')
                            },
                            callback: function (code, message, response) {
                                if (code == 0) {
                                    _self.$refs.reftable.remoteData();
                                    _self.$message('操作成功');
                                } else {
                                    _self.$message('操作失败');
                                }
                            }
                        });
                    });

                },
                exportFn: function () {
                    yufp.util.exportExcelByTable({
                        fileName: '下载文件',
                        importType: 'service', // page当前页 selected 选中的数据  service 后端数据
                        ref: this.$refs.reftable,
                        url: '',
                        param: {}
                    });
                },
                searchFn: function(model, valid) {
                    if (valid) {
                        this.$refs.lmtTable.remoteData(model);
                    }
                },
                rowClickFn: function(row, event, column) {
                    var lmtParam = {
                        lmtContNo: row.lmtContNo
                    };
                    this.$refs.mytable.remoteData(lmtParam);
                    this.$refs.passTable.remoteData(lmtParam);
                    var model = this.$refs.baseRef.formModel;
                    yufp.extend(model, row);
                    model.createUser = yufp.session.userId;
                    this.queryBalance(row);
                    var cusName = row.cusName;
                    var certType = row.certType;
                    var certCode = row.certCode;
                    var queryResult = '1';  //1征信查询成功，2或空为征信查询失败
                    var loginUserLeageOrgCode = yufp.session.user.legalOrg.orgCode;//法人机构
                    var params = {
                        cusName : cusName,
                        certType : certType,
                        certCode : certCode,
                        queryResult : queryResult,
                        loginUserLeageOrgCode : loginUserLeageOrgCode
                    };
                   // this.$refs.thirdReftable.remoteData(params);
                },
                getCredit:function(){
                    var _self = this;
                    if (self ) return ;
                    var selections = this.$refs.thirdReftable.selections;
                    if (selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var cmisdata = selections[0];
                    yufp.service.request({
                        method: 'POST',
                        url: backend.cusService + '/api/cus/rpt/show',
                        data: cmisdata,
                        callback: function (code, message, response) {
                            if (response.code == 0) {
                                var report= response.data;
                                w = window.open('about:blank');
                                w.document.write(report);
                                w.document.close();
                            }else{
                                _self.$message('查看征信报告失败!');
                            }
                        }
                    });
                }
            },
            mounted: function(){
              data.children = this;
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