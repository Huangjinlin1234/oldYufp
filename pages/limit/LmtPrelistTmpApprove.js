﻿/**
 * @create by chenqm1 on 2018-05-04
 * @description 预授信名单批次申请表
 */
define(['custom/widgets/js/OrgSelector.js'],function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,STD_ZB_APPR_STATUS,STD_ZB_IR_FLOAT_TYPE,STD_ZB_CHOOSE_RESULT,STD_ZB_PRELMT_TMPSTS,STD_ZB_CREDIT_GRADE,' +
            'STD_ZB_CUS_LEVEL,STD_ZB_EFR_CHNG_IND,STD_ZB_ODS_VERIFY_STS,STD_ZB_SEVEN_SORT');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    valiPagePluginData: true,
                    dataUrl: backend.creditService + '/api/lmt/prelist/batch/apps',
                    uploadUrl: backend.creditService + '/api/lmt/prelist/batch/upload',
                    temdataUrl: backend.creditService + '/api/lmt/prelist/queryByPage',
                    //审批状态是审批中、审批通过、打回的
                    baseParams: {
                        approveStatus : "111','997','998','992",
                        reviewUser : yufp.session.userId
                    },
                    passBaseParams: {
                        chooseResult: "1"
                    },
                    noPassBaseParams: {
                        chooseResult: "0','2"
                    },
                    tableFilters: {
                        ratePctFilter: function (value) {
                            if (!value) {
                                return '';
                            }else{
                                return yufp.util.toPercent((parseFloat(value,4) * 100).toFixed(11));
                            }
                        }
                    },
                    temtableColumns :  [
                        { label: '预授信流水号', prop: 'preSerno', sortable: false, resizable: true, width: '240px', hidden: true  },
                        { label: '批次号', prop: 'batchSerno', sortable: false, resizable: true, width: '240px', hidden: true  },
                        { label: '客户号', prop: 'cusId', sortable: false, resizable: true, width: '160px' },
                        { label: '客户名称', prop: 'cusName', sortable: false, resizable: true },
                        { label: '证件类型', prop: 'certType', sortable: false, resizable: true, dataCode: 'STD_ZB_CERT_TYP', hidden: true  },
                        { label: '证件号码', prop: 'certCode', sortable: false, resizable: true, width: '240px'},
                        { label: '手机号码', prop: 'mobile', sortable: false, resizable: true, width: '120px'},
                        { label: '产品代码', prop: 'prdCode', sortable: false, resizable: true, hidden: true},
                        { label: '产品名称', prop: 'prdName', sortable: false, resizable: true },
                        // { label: '额度类型', prop: 'lmtType', sortable: false, resizable: true, dataCode: 'STD_ZB_PRELMT_TYPE', hidden: true },
                        { label: '短信营销额度(元)', prop: 'msgMarketingLmt', sortable: false, resizable: true, width: '120px', formatter: function(row, column, cellValue) {
                                return yufp.util.moneyFormatter(cellValue, 2);
                            } },
                        { label: '授信额度(元)', prop: 'lmtAmt', sortable: false, resizable: true,formatter: function(row, column, cellValue) {
                                return yufp.util.moneyFormatter(cellValue, 2);
                            } },
                        { label: '最高授信额度(元)', prop: 'maxCreditLimit', sortable: false, resizable: true , hidden: true,formatter: function(row, column, cellValue) {
                                return yufp.util.moneyFormatter(cellValue, 2);
                            } },
                        { label: '期限(月)', prop: 'term', sortable: false, resizable: true },
                        { label: '利率模式', prop: 'irMode', sortable: false, resizable: true, dataCode: 'STD_ZB_EFR_CHNG_IND' , hidden: false },
                        { label: '固定利率(年)', prop: 'fixedRate', sortable: false, resizable: true, template: function () {
                                return '<template scope="scope"> {{ scope.row.fixedRate | ratePctFilter }} </template>';
                            } },
                        { label: '利率浮动方式', prop: 'irFloatType', sortable: false, resizable: true, dataCode: 'STD_ZB_IR_FLOAT_TYPE' },
                        { label: '利率浮动比例', prop: 'irFloatPct', sortable: false, resizable: true, template: function () {
                                return '<template scope="scope"> {{ scope.row.irFloatPct | ratePctFilter }} </template>';
                            } },
                        { label: '利率调整方式', prop: 'irAdjustMode', sortable: false, resizable: true, dataCode: 'STD_ZB_IREXE_TYPE', hidden: true  },
                        { label: '客户风险系数', prop: 'cusRpn', sortable: false, resizable: true, hidden: true },
                        { label: '信用等级', prop: 'creditLevel', sortable: false, resizable: true, hidden: true , dataCode: 'STD_ZB_CREDIT_GRADE' },
                        { label: '客户级别', prop: 'cusLevel', sortable: false, resizable: true, hidden: true, dataCode: 'STD_ZB_CUS_LEVEL' },
                        { label: '激活有效期（天）', prop: 'actValidDays', sortable: false, resizable: true },
                        { label: '是否农户', prop: 'agriFlg', sortable: false, resizable: true, dataCode: 'STD_ZX_YES_NO', hidden: true  },
                        { label: '是否有工作单位', prop: 'hasWorkPlace', sortable: false, resizable: true, type: 'select',dataCode: 'STD_ZX_YES_NO', hidden: true  },
                        { label: '工作单位名称', prop: 'workPlace', sortable: false, resizable: true, width: '240px', hidden: true},
                        { label: '状态', prop: 'status', sortable: false, resizable: true, dataCode: 'STD_ZB_PRELMT_TMPSTS' , hidden: false },
                        { label: '客户经理号', prop: 'cusManager', sortable: false, resizable: true , hidden: true},
                        { label: '推荐人手机号码', prop: 'referrerMobile', sortable: false, resizable: true , hidden: true},
                        { label: '回访电话号码', prop: 'callBackTelnum', sortable: false, resizable: true , hidden: true},
                        { label: '主管机构代码', prop: 'mainBrId', sortable: false, resizable: true , hidden: true},
                        { label: '出账机构代码', prop: 'chargeoffBrId', sortable: false, resizable: true , hidden: true},
                        { label: '法人机构代码', prop: 'legalOrgCode', sortable: false, resizable: true , hidden: true},
                        { label: '法人机构名称', prop: 'legalOrgName', sortable: false, resizable: true , hidden: true},
                        { label: '法人机构简称', prop: 'legalOrgSimpleName', sortable: false, resizable: true , hidden: true},
                        { label: '筛选结果', prop: 'chooseResult', sortable: false, resizable: true, dataCode: 'STD_ZB_CHOOSE_RESULT' , hidden: false },
                        { label: '备注', prop: 'remarks', sortable: false, resizable: true , hidden: true},
                        { label: '创建时间', prop: 'createTime', sortable: false, resizable: true, hidden: true },
                        { label: '最后更新人', prop: 'lastUpdateUser', sortable: false, resizable: true, hidden: true },
                        { label: '最后修改时间', prop: 'lastUpdateTime', sortable: false, resizable: true, hidden: true }
                    ],
                    updateFields: [{
                        columnCount: 3,
                        fields: [
                            { field: 'batchSerno', label: '批次流水号'},
                            { field: 'importDate', label: '导入日期'},
                            { field: 'approveStatus', label: '状态', type: 'select', dataCode: 'STD_ZB_APPR_STATUS' },
                            { field: 'createUser', label: '创建人'},
                            { field: 'reviewUser', label: '复核人',  type: 'input', hidden: true},
                            { field: 'reviewUserName', label: '复核人',  type: 'input'},
                            { field: 'reviewDate', label: '复核日期', type: 'input'},
                            { field: 'inputBrId', label: '登记机构代码'},
                            { field: 'legalOrgCode', label: '法人机构代码'},
                            { field: 'legalOrgName', label: '法人机构名称'},
                            { field: 'createTime', label: '创建时间'},
                            { field: 'lastUpdateUser', label: '最后更新人'},
                            { field: 'lastUpdateTime', label: '最后修改时间'}
                        ]
                    }],
                   wbFields: [{
                        columnCount: 4,
                        fields: [
                            { label: '预授信流水号', field: 'preSerno' },
                            { label: '批次流水号', field: 'batchSerno'},
                            { label: '客户号', field: 'cusId' },
                            { label: '客户名称', field: 'cusName' },
                            { label: '证件类型', field: 'certType', dataCode: 'STD_ZB_CERT_TYP', type: 'select'  },
                            { label: '证件号码', field: 'certCode'},
                            { label: '手机号码', field: 'mobile'},
                            { label: '产品代码', field: 'prdCode'},
                            { label: '产品名称', field: 'prdName' },
                            // { label: '额度类型', field: 'lmtType', dataCode: 'STD_ZB_PRELMT_TYPE', type: 'select' },
                            { label: '短信营销额度(元)', field: 'msgMarketingLmt' , type:'num',formatter: function(cellValue) {
                                    if (typeof(cellValue) == 'undefined'  || cellValue == null || isNaN(cellValue) )
                                        return;
                                    return yufp.util.moneyFormatter(cellValue, 2);
                                } },
                            { label: '授信额度(元)', field: 'lmtAmt' , type:'num',formatter: function(cellValue) {
                                    if (typeof(cellValue) == 'undefined'  || cellValue == null || isNaN(cellValue) )
                                        return;
                                    return yufp.util.moneyFormatter(cellValue, 2);
                                }},
                            { label: '最高授信额度(元)', field: 'maxCreditLimit' , type:'num',formatter: function(cellValue) {
                                    if (typeof(cellValue) == 'undefined'  || cellValue == null || isNaN(cellValue) )
                                        return;
                                    return yufp.util.moneyFormatter(cellValue, 2);
                                }},
                            { label: '期限(月)', field: 'term' },
                            { label: '利率模式', field: 'irMode', dataCode: 'STD_ZB_EFR_CHNG_IND' , type: 'select' },
                            { label: '固定利率(年)', field: 'fixedRate', type:'num',formatter: function(cellValue) {
                                    var num = parseFloat(cellValue);
                                    if (typeof(num) == 'undefined'  || num == null || isNaN(num) )
                                        num = 0;
                                    var rateY = Number(num * 100).toFixed(4) + '%';
                                    return rateY;
                                } },
                            { label: '利率浮动方式', field: 'irFloatType', dataCode: 'STD_ZB_IR_FLOAT_TYPE', type: 'select' },
                            { label: '利率浮动比例', field: 'irFloatPct' , type:'num',formatter: function(cellValue) {
                                    var num = parseFloat(cellValue);
                                    if (typeof(num) == 'undefined'  || num == null || isNaN(num) )
                                        num = 0;
                                    var rateY = Number(num * 100).toFixed(4) + '%';
                                    return rateY;
                                }},
                            { label: '利率调整方式', field: 'irAdjustMode', dataCode: 'STD_ZB_IREXE_TYPE', type: 'select'  },
                            { label: '客户风险系数', field: 'cusRpn' },
                            { label: '信用等级', field: 'creditLevel',dataCode: 'STD_ZB_CREDIT_GRADE', type: 'select' },
                            { label: '客户级别', field: 'cusLevel',dataCode: 'STD_ZB_CUS_LEVEL', type: 'select' },
                            { label: '激活有效期（天）', field: 'actValidDays' },
                            { label: '是否农户', field: 'agriFlg', dataCode: 'STD_ZX_YES_NO' , type: 'select' },
                            { label: '是否有工作单位', field: 'hasWorkPlace', type: 'select',dataCode: 'STD_ZX_YES_NO', type: 'select'  },
                            { label: '工作单位名称', field: 'workPlace'},
                            { label: '状态', field: 'status', dataCode: 'STD_ZB_PRELMT_TMPSTS', type: 'select'},
                            { label: '客户经理号', field: 'cusManager' },
                            { label: '推荐人手机号码', field: 'referrerMobile'},
                            { label: '回访电话号码', field: 'callBackTelnum'},
                            { label: '主管机构代码', field: 'mainBrId' },
                            { label: '出账机构代码', field: 'chargeoffBrId' },
                            { label: '法人机构代码', field: 'legalOrgCode' },
                            { label: '法人机构名称', field: 'legalOrgName' },
                            { label: '法人机构简称', field: 'legalOrgSimpleName' },
                            { label: '筛选结果', field: 'chooseResult', dataCode: 'STD_ZB_CHOOSE_RESULT', type: 'select'},
                            { label: '创建时间', field: 'createTime' },
                            { label: '最后更新人', field: 'lastUpdateUser' },
                            { label: '最后修改时间', field: 'lastUpdateTime' }
                        ]
                    },{
                        columnCount: 2,
                        fields: [
                            { label: '备注', field: 'remarks' ,type:'textarea',rows:4}
                        ]
                    }],
                    npFields: [{
                        columnCount: 3,
                        fields: [
                            { label: '预授信流水号', field: 'preSerno' },
                            { label: '法人机构代码', field: 'legalOrgCode' },
                            { label: '证件号码', field: 'certCode'},
                            { label: '本人是否涉诉' ,field: 'refLawsuit', dataCode: 'STD_ZX_YES_NO', type: 'select'},
                            { label: '本人是否欠税' ,field: 'owingTaxesInd', dataCode: 'STD_ZX_YES_NO', type: 'select'},
                            { label: '本人是否老赖' ,field: 'deadbeatInd', dataCode: 'STD_ZX_YES_NO', type: 'select'},
                            { label: '本人是否黑名单' ,field: 'blacklistInd', dataCode: 'STD_ZX_YES_NO', type: 'select'},
                            { label: '本人是否员工' ,field: 'employeeInd', dataCode: 'STD_ZX_YES_NO', type: 'select'},
                            { label: '本人行内是否逾期' ,field: 'loanOdInd', dataCode: 'STD_ZX_YES_NO', type: 'select'},
                            { label: '本人风险级别' ,field: 'riskLevel', dataCode: 'STD_ZB_SEVEN_SORT', type: 'select'},
                            { label: '配偶证件号码' ,field: 'pspCertCode' },
                            { label: '配偶是否涉诉' ,field: 'pspRefLawsuit', dataCode: 'STD_ZX_YES_NO', type: 'select'},
                            { label: '配偶是否欠税' ,field: 'pspOwingTaxesInd', dataCode: 'STD_ZX_YES_NO', type: 'select'},
                            { label: '配偶是否老赖' ,field: 'pspDeadbeatInd', dataCode: 'STD_ZX_YES_NO', type: 'select' },
                            { label: '配偶是否黑名单' ,field: 'pspBlacklistInd', dataCode: 'STD_ZX_YES_NO', type: 'select'},
                            { label: '配偶是否员工' ,field: 'pspEmployeeInd', dataCode: 'STD_ZX_YES_NO', type: 'select'},
                            { label: '配偶行内是否逾期' ,field: 'pspLoanOdInd', dataCode: 'STD_ZX_YES_NO', type: 'select'},
                            { label: '配偶风险级别' ,field: 'pspRiskLevel', dataCode: 'STD_ZB_SEVEN_SORT', type: 'select'},
                            { label: '授信的法人机构数' ,field: 'lmtLegalOrgCount'},
                            { label: '行内授信总额度' ,field: 'bankTotalLmtamt'},
                            { label: '法人机构授信总额度' ,field: 'legalOrgTotalLmtamt'}
                        ]
                    }],
                    wbButtons: [
                        { label: '关闭', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                _self.wbDialogVisible = false;
                                _self.npDialogVisible = false;
                            } }
                    ],
                    height: yufp.frame.size().height - 103,
                    viewType: 'DETAIL',
                    wbDialogVisible: false,
                    wbDisabled: true,
                    npDialogVisible: false,
                    npDisabled: true,
                    batchSerno: ''
                }
            },
            methods: {
                /**
                 * @param ctrlCode 操作码
                 */
                checkPermission: function(ctrlCode) {
                    return data.parentName == 'todoList';
                },
                export1Fn: function (value) {
                    var _self = this;
                    if(value == 'passTable'){
                        var exportUrl = backend.creditService + '/api/lmt/prelist/batch/exprot?batchSerno=' + this.batchSerno + '&chooseResult=1';
                        yufp.service.request({
                            method: 'GET',
                            url: backend.creditService + '/api/lmt/prelist/batch/queryExprotList?batchSerno=' + this.batchSerno + '&chooseResult=1',
                            callback: function (code, message, response) {
                                if (response.success) {
                                    window.location.href = exportUrl;
                                } else {
                                    _self.$message(response.message);
                                }
                            }
                        });
                    }else if(value == 'noPassTable'){
                        var exportUrl = backend.creditService + '/api/lmt/prelist/batch/exprot?batchSerno=' + this.batchSerno + '&chooseResult=2';
                        yufp.service.request({
                            method: 'GET',
                            url: backend.creditService + '/api/lmt/prelist/batch/queryExprotList?batchSerno=' + this.batchSerno + '&chooseResult=2',
                            callback: function (code, message, response) {
                                if (response.success) {
                                    window.location.href = exportUrl;
                                } else {
                                    _self.$message(response.message);
                                }
                            }
                        });
                    }
                },
                tabClick: function (tabs) {
                    if(tabs.index == "0"){
                        this.$refs.temreftable.remoteData({batchSerno : this.batchSerno, status : "0','1','9"});
                    }
                },
                reviewTabClick: function (tabs) {
                    if(tabs.index == "1"){
                        this.$refs.passTable.remoteData({batchSerno : this.batchSerno, chooseResult : '1'});
                    }else if(tabs.index == "2") {
                        this.$refs.noPassTable.remoteData({batchSerno : this.batchSerno, chooseResult : "0','2"});
                    }
                },
                tmpInfoFn: function(value){
                    var ob = {};
                    if(value == 'passTable'){
                        if (this.$refs.passTable.selections.length != 1) {
                            this.$message({ message: '请先选择一条记录', type: 'warning' });
                            return;
                        }else{
                            this.wbDialogVisible = true;
                            this.$nextTick(function () {
                                var obj = this.$refs.passTable.selections[0];
                                this.$refs.wbForm.resetFn();
                                yufp.util.copyObj(this.$refs.wbForm.formModel, obj);
                            });
                        }
                    }else if(value == 'temreftable'){
                        if (this.$refs.temreftable.selections.length != 1) {
                            this.$message({ message: '请先选择一条记录', type: 'warning' });
                            return;
                        }else{
                            this.wbDialogVisible = true;
                            this.$nextTick(function () {
                                var obj = this.$refs.temreftable.selections[0];
                                this.$refs.wbForm.resetFn();
                                yufp.util.copyObj(this.$refs.wbForm.formModel, obj);
                            });
                        }
                    }else if(value == 'noPassTable'){
                        if (this.$refs.noPassTable.selections.length != 1) {
                            this.$message({ message: '请先选择一条记录', type: 'warning' });
                            return;
                        }else{
                            this.wbDialogVisible = false;
                            this.npDialogVisible = true;
                            this.$nextTick(function () {
                                var _self = this;
                                var obj = this.$refs.noPassTable.selections[0];
                                var _riskObj = {};
                                yufp.service.request({
                                    method: 'GET',
                                    url: backend.cusService + '/api/cus/cusprelistriskinfo/' + obj.preSerno,
                                    // data: {preSerno: obj.preSerno},
                                    callback: function (code, message, response) {
                                        if (response.success) {
                                            _riskObj = response.data;
                                            yufp.extend(_self.$refs.npForm.formModel, _riskObj);
                                        } else {
                                            _self.$message({ message: '请求失败!', type: 'warning' });
                                        }
                                    }
                                });
                                this.$refs.wbForm.resetFn();
                                yufp.util.copyObj(this.$refs.wbForm.formModel, obj);

                            });
                        }
                    }
                },
                invalidFn: function () {
                    var _self = this;
                    var selections = _self.$refs.passTable.selections;
                    if (selections.length < 1) {
                        _self.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var len = selections.length, arr = [];
                    var hasNotValid = false;
                    for (var i = 0; i < len; i++) {
                        if (selections[i].chooseResult != '1')
                            hasNotValid = true;
                        arr.push(selections[i]);
                    }
                    if (hasNotValid == true){
                        _self.$message('数据必须为筛选通过状态');
                        return;
                    }
                    yufp.service.request({
                        method: 'POST',
                        url: backend.creditService + '/api/lmt/prelist/batch/invalid',
                        data: JSON.stringify(selections),
                        callback: function (code, message, response) {
                            if (code == 0) {
                                var result = response.data;
                                if (result == null)
                                    _self.$message('操作失败');
                                else {
                                    if (result.length == 0) {
                                        _self.$message('操作成功');
                                        _self.$refs.passTable.remoteData();
                                    }
                                    else {
                                        var str = '';
                                        for (var i = 0; i < result.length; i++) {
                                            str += result[i].batchSerno+'    '
                                        }
                                        _self.$message({message:'只能对筛选通过、且未生效的客户进行失效操作', type: 'warning'});
                                    }
                                }
                            }
                            else
                                _self.$message('操作失败');
                        }
                    });
                }

            },
            mounted: function () {
                data.children = this;
                var param = data.datas[data.dataKey];
                this.$nextTick(function () {
                    this.$refs.passTable.remoteData({batchSerno : param, chooseResult : '1'});
                    this.$refs.noPassTable.remoteData({batchSerno : param, chooseResult : "0','2"});
                    this.batchSerno = param;
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
