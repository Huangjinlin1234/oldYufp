/**
 * @create by ligm on 2019-08-10
 * @description 额度解冻申请表
 */
define([
    './custom/widgets/js/PrdIdInfoSelector.js',
    './custom/widgets/js/OrgPartSelector.js'
], function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,APPLY_CHANNEL_TYPE,STD_ZB_CERT_TYP,APRV_STATUS,CYCLIC_FLG,STD_ZB_LMT_STATE,STD_ZB_ACC_STATUS,LIMIT_STS,RULE_CODE_NAME_TOW_LEVEL,RISK_WARNING');
        var vm = yufp.custom.vue({
            components: {
                FileUpload: window.VueUploadComponent
            },
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    valiPagePluginData: true,
                    expandCollapseName: ['lmtTable', 'baseRef', 'mytable','mywarnlog','baseUpload'],
                    baseParams: {},
                    baseTab: 'baseTab',
                    dataUrl: backend.flowService + '/api/lmt/unfreeze/apps',
                    lmtDataUrl: backend.creditService + '/api/lmt/prd/conts',
                    contUrl: backend.flowService + '/api/lmt/terminate/app/acc/loans',
                    warnLogUrl : backend.riskmService + '/api/rsc/warn/byCertCode',
                    uploadUrl : backend.flowService + '/api/lmt/unfreeze/app/upLoad',
                    baseParams: {},
                    lmtStsParams: {
                        lmtStatus:'00'
                    },
                    queryFields: [
                        {placeholder: '解冻流水号', field: 'unfrzSerno', type: 'input'},
                        {placeholder: '冻结流水号', field: 'frzSerno', type: 'input'},
                        {placeholder: '授信协议编号', field: 'lmtContNo', type: 'input'},
                        {placeholder: '渠道', field: 'channelNo', type: 'select', dataCode: 'APPLY_CHANNEL_TYPE'},
                        {
                            placeholder: '产品名称',
                            field: 'prdName',
                            type: 'custom',
                            is: 'div-prdId-info-selector',
                            params: {prdType: '', type: ''},
                            clickFn: function (value, model, args) {
                                _self.$refs.query.switch('prdName', 'params', {prdType: model.channelNo, type: 'name'});
                                _self.$refs.query.rebuildFn();
                            }
                        },
                        {placeholder: '客户编号', field: 'cusId', type: 'input'},
                        {placeholder: '客户名称', field: 'cusName', type: 'input'},
                        {placeholder: '证件类型', field: 'certType', type: 'select', dataCode: 'STD_ZB_CERT_TYP'},
                        {placeholder: '证件号码', field: 'certCode', type: 'input'},
                        {placeholder: '归属机构', field: 'orgCode', type: 'custom', is: 'div-part-org-selector'},
                        {placeholder: '审批状态', field: 'approveStatus', type: 'select', dataCode: 'APRV_STATUS'},
                        {placeholder: '客户经理号', field: 'cusManager', type: 'input'},
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
                        {label: '解冻流水号', prop: 'unfrzSerno', sortable: true, resizable: true},
                        {label: '冻结流水号', prop: 'frzSerno', sortable: true, resizable: true},
                        {label: '授信协议编号', prop: 'lmtContNo', sortable: true, resizable: true},
                        {
                            label: '渠道号',
                            prop: 'channelNo',
                            sortable: true,
                            resizable: true,
                            type: 'select',
                            dataCode: 'APPLY_CHANNEL_TYPE'
                        },
                        {label: '产品名称', prop: 'prdName', sortable: true, resizable: true},
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
                        {label: '授信额度', prop: 'lmtAmt', sortable: true, resizable: true},
                        {
                            label: '是否循环',
                            prop: 'cyclicFlg',
                            sortable: true,
                            resizable: true,
                            type: 'select',
                            dataCode: 'CYCLIC_FLG'
                        },
                        {label: '归属机构编码', prop: 'orgCode', sortable: true, resizable: true ,hidden :true},
                        {label: '归属机构', prop: 'orgName', sortable: true, resizable: true},
                        {label: '客户经理', prop: 'cusManagerName', sortable: true, resizable: true},
                        {label: '解冻申请人', prop: 'createUserName', sortable: true, resizable: true},
                        {label: '申请日期', prop: 'applyDate', sortable: true, resizable: true},
                        {
                            label: '审批状态',
                            prop: 'approveStatus',
                            sortable: true,
                            resizable: true,
                            type: 'select',
                            dataCode: 'APRV_STATUS'
                        },
                        {label: '可用额度', prop: 'availAmt', sortable: true, resizable: true, hidden: true},
                        {label: '解冻原因', prop: 'unfrzReason', sortable: true, resizable: true, hidden: true},
                        {label: '备注', prop: 'remarks', sortable: true, resizable: true},
                        {label: '审批人编号', prop: 'aprvUserCode', sortable: true, resizable: true, hidden: true},
                        {label: '审批人名称', prop: 'aprvUserName', sortable: true, resizable: true, hidden: true},
                        {label: '审批日期', prop: 'aprvDate', sortable: true, resizable: true, hidden: true},
                        {label: '人工处理意见', prop: 'aprvComment', sortable: true, resizable: true, hidden: true},
                        {label: '产品id', prop: 'prdId', sortable: true, resizable: true, hidden: true},
                        {label: '产品编码', prop: 'prdCode', sortable: true, resizable: true, hidden: true},
                        {label: '创建时间', prop: 'createTime', sortable: true, resizable: true, hidden: true},
                        {label: '最后修改人', prop: 'lastUpdateUserName', sortable: true, resizable: true, hidden: true},
                        {label: '最后修改时间', prop: 'lastUpdateTime', sortable: true, resizable: true, hidden: true}
                    ],
                    lmtQueryFields: [
                        {placeholder: '授信协议编号', field: 'lmtContNo', type: 'input'},
                        {placeholder: '渠道', field: 'channelNo', type: 'select', dataCode: 'APPLY_CHANNEL_TYPE'},
                        {placeholder: '产品名称', field: 'prdName', type: 'input'},
                        {placeholder: '客户编号', field: 'cusId', type: 'input'},
                        {placeholder: '客户名称', field: 'cusName', type: 'input'},
                        {placeholder: '证件类型', field: 'certType', type: 'select', dataCode: 'STD_ZB_CERT_TYP'},
                        {placeholder: '证件号码', field: 'certCode', type: 'input'},
                        {}
                    ],

                    lmtTableColumns: [
                        // {label: '冻结流水号', prop: 'frzSerno', sortable: true, resizable: true },
                        {label: '授信协议号', prop: 'lmtContNo', sortable: true, resizable: true},
                        {label: '渠道名称', prop: 'channelNo',sortable: true,resizable: true, dataCode: 'APPLY_CHANNEL_TYPE'},
                        {label: '产品编号', prop: 'prdCode', sortable: true, resizable: true ,hidden: true},
                        {label: '产品名称', prop: 'prdName', sortable: true, resizable: true},
                        {label: '客户编号', prop: 'cusId', sortable: true, resizable: true},
                        {label: '客户名称', prop: 'cusName', sortable: true, resizable: true},
                        {label: '证件类型', prop: 'certType', sortable: true, resizable: true, dataCode: 'STD_ZB_CERT_TYP'},
                        {label: '证件号码', prop: 'certCode', sortable: true, resizable: true},
                        {label: '授信额度', prop: 'lmtAmt', sortable: true, resizable: true},
                        {label: '是否循环', prop: 'cyclicFlg', sortable: true, resizable: true, dataCode: 'CYCLIC_FLG'},
                        {label: '额度状态', prop: 'lmtStatus', sortable: true, resizable: true, dataCode: 'LIMIT_STS'},
                        {label: '额度起始日', prop: 'startDate', sortable: true, resizable: true},
                        {label: '额度到期日', prop: 'expireDate', sortable: true, resizable: true},
                        {label: '客户经理', prop: 'cusManager', sortable: true, resizable: true},
                        {label: '归属机构', prop: 'legalOrgCode', sortable: true, resizable: true}
                    ],

                    //  借据明细信息
                    contListColumns: [
                        {label: '借据号', prop: 'billNo', sortable: true, resizable: true},
                        {label: '客户姓名', prop: 'cusName', sortable: true, resizable: true},
                        {label: '借据金额', prop: 'loanAmount', sortable: true, resizable: true},
                        {label: '借据余额', prop: 'loanBalance', sortable: true, resizable: true},
                        {label: '借据状态', prop: 'accountStatus', sortable: true, resizable: true,/*type: 'select',*/ dataCode: 'STD_ZB_ACC_STATUS'}
                    ],

                    //  风险预警信息
                    warnLogListColumns: [
                        {label: '规则号', prop: 'ruleCode', sortable: true, resizable: true},
                        {label: '风险等级', prop: 'riskLevel', sortable: true, resizable: true,dataCode: 'RISK_WARNING'},
                        {label: '规则名称', prop: 'ruleCode', sortable: true, resizable: true,dataCode: 'RULE_CODE_NAME_TOW_LEVEL'}
                    ],

                    updateFields: [{
                        columnCount: 3,
                        fields: [
                            {field: 'unfrzSerno', label: '解冻流水号', disabled: true},
                            {field: 'frzSerno', label: '冻结流水号', disabled: true},
                            {field: 'lmtContNo', label: '授信协议编号', disabled: true},
                            {field: 'cusId', label: '客户编号', disabled: true},
                            {field: 'cusName', label: '客户名称', disabled: true},
                            {
                                field: 'certType',
                                label: '证件类型',
                                disabled: true,
                                type: 'select',
                                dataCode: 'STD_ZB_CERT_TYP'
                            },
                            {field: 'certCode', label: '证件号码', disabled: true},
                            {field: 'lmtAmt', label: '授信额度', disabled: true},
                            {field: 'cyclicFlg', label: '是否循环', disabled: true, type: 'select', dataCode: 'CYCLIC_FLG'},
                            {field: 'availAmt', label: '可用额度', disabled: true},
                            {
                                field: 'channelNo',
                                label: '渠道',
                                disabled: true,
                                type: 'select',
                                dataCode: 'APPLY_CHANNEL_TYPE'
                            },
                            {field: 'prdId', label: '产品id', disabled: true},
                            {field: 'prdCode', label: '产品编号', disabled: true},
                            {field: 'prdName', label: '产品名称', disabled: true},
                            {field: 'cusManagerName', label: '客户经理', disabled: true},
                            {field: 'orgName', label: '归属机构', disabled: true},
                            {field: 'createUser', label: '解冻申请人', disabled: true,hidden:true},
                            {field: 'createUserName', label: '解冻申请人', disabled: true},
                            {field: 'applyDate', label: '申请日期', disabled: true},
                            {
                                field: 'approveStatus',
                                label: '审批状态',
                                disabled: true,
                                type: 'select',
                                dataCode: 'APRV_STATUS'
                            },
                            {field: 'remarks', label: '备注', disabled: true},
                            {field: 'aprvUserCode', label: '审批人编号', disabled: true},
                            {field: 'aprvUserName', label: '审批人名称', disabled: true},
                            {field: 'aprvComment', label: '人工处理意见', disabled: true},
                            {field: 'aprvDate', label: '审批日期', disabled: true},
                            {field: 'createTime', label: '创建时间', disabled: true},
                            {field: 'lastUpdateUserName', label: '最后修改人', disabled: true},
                            {field: 'lastUpdateTime', label: '最后修改日期', disabled: true}
                        ]
                    }, {
                        columnCount: 1,
                        fields: [
                            {
                                field: 'unfrzReason', label: '解冻原因', type: "textarea",rows: 3, maxlength:100,
                                rules: [{
                                    required: true,
                                    message: '解冻原因是必填项'
                                }]
                            },
                        ]
                    }],

                    /** 附件上传*/
                    dataUrlAnnex: backend.riskmService + '/api/mon/relief/ann',
                    baseParamsAnnex:{},
                    tableColumnsAnnex:[
                        { label: '解冻申请流水号', prop: 'flowAppNo', sortable: true, resizable: true },
                        { label: '申请流水号', prop: 'bizSerno', sortable: true, resizable: true ,hidden:true},
                        { label: '附件名称', prop: 'annexName', sortable: true, resizable: true },
                        { label: '附件描述', prop: 'annexDesc', sortable: true, resizable: true },
                        { label: '上传人', prop: 'uploadUser', sortable: true, resizable: true },
                        { label: '上传时间', prop: 'uploadTime', sortable: true, resizable: true },
                        { label: '最后更新人', prop: 'lastUploadUser', sortable: true, resizable: true },
                        { label: '最后更新时间', prop: 'lastUploadTime', sortable: true, resizable: true }
                    ],
                    annexInfoFields: [
                        {
                            columnCount: 2,
                            fields: [
                                { field: 'annexName', label: '附件名称', type:'textarea', rows: 1,
                                    rules: [{required: true, message: '必填项', trigger: 'blur'}]
                                }
                            ]
                        },
                        {
                            columnCount: 1,
                            fields: [
                                { field: 'annexDesc', label: '附件描述', type:'textarea', rows: 3}
                            ]
                        }
                    ],
                    annexFormDisabled: false,
                    dialogVisibleAnnex: false,
                    flag: '',

                    height: yufp.frame.size().height - 103,
                    dialogVisible: false,
                    loading2: false,
                    importDialogVisible: false,
                    fileData: {},
                    fileExcelName: '',
                    extensions: ['xls', 'xlsx'],
                    exportFileName: '额度解冻申请信息',
                    headers: {},
                    files: [],
                    formDisabled: false,
                    viewType: 'DETAIL',
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
                    // _self.updateButtons[0].hidden = !editable;
                    _self.formDisabled = !editable;
                    _self.dialogVisible = true;
                },
                switchParamsStatus: function () {
                    var _self = this;
                    if (_self.viewType != 'ADD') {
                        _self.$refs.baseRef.switch('cusId', 'hidden', false);
                        _self.$refs.baseRef.switch('cusName', 'hidden', false);
                        _self.$refs.baseRef.switch('certType', 'hidden', false);
                        _self.$refs.baseRef.switch('certCode', 'hidden', false);
                        _self.$refs.baseRef.switch('lmtAmt', 'hidden', false);
                        _self.$refs.baseRef.switch('cyclicFlg', 'hidden', false);
                        _self.$refs.baseRef.switch('remarks', 'hidden', false);
                        _self.$refs.baseRef.switch('aprvUserCode', 'hidden', false);
                        _self.$refs.baseRef.switch('aprvUserName', 'hidden', false);
                        _self.$refs.baseRef.switch('aprvDate', 'hidden', false);
                        _self.$refs.baseRef.switch('aprvComment', 'hidden', false);
                        _self.$refs.baseRef.switch('channelNo', 'hidden', false);
                        _self.$refs.baseRef.switch('prdId', 'hidden', false);
                        _self.$refs.baseRef.switch('prdCode', 'hidden', false);
                        _self.$refs.baseRef.switch('prdName', 'hidden', false);
                        _self.$refs.baseRef.switch('orgName', 'hidden', false);
                        _self.$refs.baseRef.switch('cusManagerName', 'hidden', false);
                        _self.$refs.baseRef.switch('unfrzSerno', 'hidden', false);
                        _self.$refs.baseRef.switch('frzSerno', 'hidden', false);
                        _self.$refs.baseRef.switch('approveStatus', 'hidden', false);
                        _self.$refs.baseRef.switch('applyDate', 'hidden', false);
                        _self.$refs.baseRef.switch('createTime', 'hidden', false);
                        _self.$refs.baseRef.switch('lastUpdateUserName', 'hidden', false);
                        _self.$refs.baseRef.switch('lastUpdateTime', 'hidden', false);
                        _self.$refs.baseRef.switch('createUserName', 'hidden', false);
                    } else {
                        _self.$refs.baseRef.switch('cusId', 'hidden', true);
                        _self.$refs.baseRef.switch('cusName', 'hidden', true);
                        _self.$refs.baseRef.switch('certType', 'hidden', true);
                        _self.$refs.baseRef.switch('certCode', 'hidden', true);
                        _self.$refs.baseRef.switch('lmtAmt', 'hidden', true);
                        _self.$refs.baseRef.switch('cyclicFlg', 'hidden', true);
                        _self.$refs.baseRef.switch('remarks', 'hidden', true);
                        _self.$refs.baseRef.switch('aprvUserCode', 'hidden', true);
                        _self.$refs.baseRef.switch('aprvUserName', 'hidden', true);
                        _self.$refs.baseRef.switch('aprvDate', 'hidden', true);
                        _self.$refs.baseRef.switch('aprvComment', 'hidden', true);
                        _self.$refs.baseRef.switch('channelNo', 'hidden', true);
                        _self.$refs.baseRef.switch('prdId', 'hidden', true);
                        _self.$refs.baseRef.switch('prdCode', 'hidden', true);
                        _self.$refs.baseRef.switch('prdName', 'hidden', true);
                        _self.$refs.baseRef.switch('orgName', 'hidden', true);
                        _self.$refs.baseRef.switch('cusManagerName', 'hidden', true);
                        _self.$refs.baseRef.switch('unfrzSerno', 'hidden', true);
                        _self.$refs.baseRef.switch('frzSerno', 'hidden', true);
                        _self.$refs.baseRef.switch('approveStatus', 'hidden', true);
                        _self.$refs.baseRef.switch('applyDate', 'hidden', true);
                        _self.$refs.baseRef.switch('createTime', 'hidden', true);
                        _self.$refs.baseRef.switch('lastUpdateUserName', 'hidden', true);
                        _self.$refs.baseRef.switch('lastUpdateTime', 'hidden', true);
                        _self.$refs.baseRef.switch('createUserName', 'hidden', true);
                    }
                },
                lmtTagStatus: function () {
                    if (this.viewType != "ADD") {
                        this.$refs.basecollapse.$children[0].$el.hidden = true;
                    } else {
                        this.$refs.basecollapse.$children[0].$el.hidden = false;
                    }
                },
                addFn: function () {
                    var _self = this;
                    this.switchStatus('ADD', true);
                    _self.$nextTick(function () {
                        _self.lmtTagStatus();
                        _self.switchParamsStatus();
                        _self.clearFn();
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
                    var len = selections.length, arr = [];
                    for (var i = 0; i < len; i++) {
                        arr.push(selections[i].unfrzSerno);
                    }
                    this.$confirm('是否删除额度解冻申请？', '提示').then(function () {
                        if (selections[0].approveStatus != '01') {
                            _self.$message({message: '只能删除待发起的申请信息!!', type: 'warning'});
                            return;
                        }
                        yufp.service.request({
                            method: 'DELETE',
                            url: backend.flowService + '/api/lmt/unfreeze/app',
                            data: {
                                unfrzSerno: arr.join(',')
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
                modifyFn: function () {
                    var _self = this;
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    var obj = this.$refs.reftable.selections[0];
                    if (obj.approveStatus != '01' && obj.approveStatus != '05') {
                        this.$message({message: '审批状态为“待发起”、“打回”，才可修改。', type: 'warning'});
                        return;
                    }
                    _self.baseParamsAnnex = {flowAppNo : obj.unfrzSerno,bizSerno : obj.unfrzSerno};
                    this.switchStatus('EDIT', true);
                    this.$nextTick(function () {
                        _self.lmtTagStatus();
                        _self.switchParamsStatus();
                        yufp.extend(this.$refs.baseRef.formModel, obj);
                        var unfrzReason = obj.unfrzReason;
                        var params = {
                            unfrzReason: unfrzReason
                        };
                        var loanParam = {
                            certType: obj.certType,
                            certCode: obj.certCode
                        };
                        _self.$refs.mytable.remoteData(loanParam);
                        _self.$refs.mywarnlog.remoteData(loanParam);
                        _self.$refs.reftableAnnex.remoteData(_self.baseParamsAnnex);
                    });
                },
                infoFn: function () {
                    var _self = this;
                    if (_self.$refs.reftable.selections.length != 1) {
                        _self.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    var obj = _self.$refs.reftable.selections[0];
                    _self.baseParamsAnnex = {flowAppNo : obj.unfrzSerno,bizSerno : obj.unfrzSerno};

                    this.switchStatus('DETAIL', false);
                    _self.aprvVisible = true;
                    _self.$nextTick(function () {
                        _self.lmtTagStatus();
                        _self.switchParamsStatus();
                        yufp.extend(this.$refs.baseRef.formModel, obj);
                        var loanParam = {
                            certType: obj.certType,
                            certCode: obj.certCode
                        };
                        _self.$refs.mytable.remoteData(loanParam);
                        _self.$refs.mywarnlog.remoteData(loanParam);
                        _self.$refs.reftableAnnex.remoteData(_self.baseParamsAnnex);
                    });
                },
                saveFn: function () {
                    var _self = this;
                    var validate = false;
                    this.$refs.baseRef.validate(function (valid) {
                        validate = valid;
                    });
                    var obj = this.$refs.baseRef.formModel;
                    var upd = _self.$refs.reftableAnnex.data[0];
                    var rMethod = '';
                    if (_self.viewType == "EDIT") {
                        rMethod = 'PUT';
                    } else if (_self.viewType == "ADD") {
                        rMethod = 'POST';
                        if (_self.$refs.reftableAnnex.data.length>0){
                            yufp.extend(obj, {unfrzSerno:upd.flowAppNo});
                        }
                    }
                    yufp.service.request({
                        method: rMethod,
                        url: backend.flowService + '/api/lmt/unfreeze/app',
                        data: obj,
                        callback: function (code, message, response) {
                            if (code == 0 && response.rows >= 0) {
                                _self.$refs.reftable.remoteData();
                                vm.dialogVisible = false;
                                vm.$message({
                                    message: '处理成功!',
                                    type: 'success'
                                });
                                vm.$refs.reftable.remoteData();
                            } else
                                vm.$message({
                                    message: '保存失败，该授信额度信息存在未处理完成的额度冻结申请操作！',
                                    type: 'warning'
                                });
                            _self.$refs.reftable.remoteData();
                        }
                    });
                    _self.dialogVisible = false;
                    this.clearFn();
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

                    var upd = '';
                    upd = _self.$refs.reftableAnnex.data[0];
                    var rMethod = '';
                    var url = '';
                    if (_self.viewType == "EDIT") {
                        rMethod = 'POST';
                        url = backend.flowService + '/api/lmt/unfreeze/app/save';
                    } else if (_self.viewType == "ADD") {
                        rMethod = 'POST';
                        url = backend.flowService + '/api/lmt/unfreeze/app/commit';
                        if (_self.$refs.reftableAnnex.data.length>0){
                            yufp.extend(obj, {unfrzSerno:upd.flowAppNo});
                        }
                    }
                    yufp.service.request({
                        method: rMethod,
                        url: url,
                        data: obj,
                        callback: function (code, message, response) {
                            if (code == 0 && response.rows > 0) {
                                vm.dialogVisible = false;
                                vm.$message({
                                    message: '处理成功!',
                                    type: 'success'
                                });
                                vm.$refs.reftable.remoteData();
                            } else {
                                vm.$message({
                                    message: '提交失败，该授信额度信息额度冻结申请操作正在审批中！',
                                    type: 'warning'
                                });
                                _self.$refs.reftable.remoteData();
                            }
                        }
                    });
                    _self.dialogVisible = false;
                    this.clearFn();
                },

                cancleFn: function () {
                    var _self = this;
                    _self.dialogVisible = false;
                    this.clearFn();
                },

                returnFn: function () {
                    var _self = this;
                    _self.dialogVisible = false;
                    this.clearFn();
                },

                searchFn: function (model, valid) {
                    if (valid) {
                        this.$refs.lmtTable.remoteData(model);
                    }
                },

                rowClickFn: function (row, event, column) {
                    var model = this.$refs.baseRef.formModel;
                    yufp.extend(model, row);
                    model.createUser = yufp.session.userId;

                    var loanParam = {
                        certType: row.certType,
                        certCode: row.certCode,
                        prdCode: row.prdCode
                    };
                    this.$refs.mytable.remoteData(loanParam);
                    this.$refs.mywarnlog.remoteData(loanParam);
                },
                // 下载模板
                downloadFn: function () {
                    var downLoadUrl = backend.flowService + '/api/lmt/unfreeze/app/downLoad';
                    window.location.href = downLoadUrl;
                },
                // 导入
                importFn: function (){
                    var _self = this;
                    var _self = this;
                    this.fileExcelName = '';
                    _self.importDialogVisible = true;
                },
                inputFile: function (newFile, oldFile) {
                    if (newFile && oldFile && !newFile.active && oldFile.active) {
                        var mesType = 'warning';
                        // Get response data
                        if (newFile.success === true) {
                            if (typeof (newFile.response) === 'string'){
                                newFile.response = JSON.parse(newFile.response);
                            }
                            if (newFile.response && newFile.response.message) {
                                if (newFile.response.success === true) {
                                    mesType = 'success';
                                    this.$message({message: newFile.response.message, type: mesType});
                                } else {
                                    this.tipsVisible = true;
                                    mesType = 'warning';
                                    this.$message({message: '上传文件失败!' + newFile.response.message, type: mesType});
                                }
                            } else {
                                this.$message({message: '上传文件失败!' + newFile.response.message, type: mesType});
                            }
                            this.dialogImportExcelVisible = false;
                            this.$refs.reftable.remoteData();
                        } else {
                            var message = '上传文件失败！';
                            if (newFile.error === 'extension') {
                                message = '上传的文件只支持：';
                                for (var i = 0; i < this.extensions.length; i++) {
                                    message += this.extensions[i] + '、';0
                                }
                                message += '后缀的文件！';
                            }
                            this.$message({message: message, type: mesType});
                        }
                        this.files = [];
                        this.fileExcelName = '';
                        this.loading2 = false;
                        this.importDialogVisible = false;
                    }
                },
                inputFilter: function (newFile, oldFile, prevent) {
                    if (this.files.length > 1) {
                        this.$message({message: '一次只能选择一个文件！', type: 'warning'});
                        return prevent();
                    }
                    this.fileExcelName = newFile.name;
                    newFile.data = this.fileData;
                    newFile.blob = '';
                    var URL = window.URL || window.webkitURL;
                    if (URL && URL.createObjectURL && newFile.file) {
                        newFile.blob = URL.createObjectURL(newFile.file)
                    }
                },
                // 上传保存
                commitFileFn: function () {
                    var _self = this;
                    if (this.files.length == 0) {
                        _self.$message({message: '请选择一个文件', type: 'warning'});
                        return;
                    }
                    this.loading2 = true;
                    this.$nextTick(function () {
                        _self.$refs.upload.active = true;
                    });
                },
                // 上传取消
                cancelFn: function () {
                    this.files = [];
                    this.fileExcelName = '';
                    this.importDialogVisible = false;
                },

                clearFn: function () {
                    var _self = this;
                    _self.$refs.lmtTable.data = [];
                    _self.$refs.mytable.data = [];
                    _self.$refs.mywarnlog.data = [];
                    _self.$refs.reftableAnnex.data = [];
                    _self.$refs.baseRef.resetFields();
                    _self.$refs.queryFm.fm.lmtContNo = '';
                    _self.$refs.queryFm.fm.prdName = '';
                    _self.$refs.queryFm.fm.channelNo = '';
                    _self.$refs.queryFm.fm.cusId = '';
                    _self.$refs.queryFm.fm.cusName = '';
                    _self.$refs.queryFm.fm.certType = '';
                    _self.$refs.queryFm.fm.certCode = '';
                },
                uploadAnnexFile: function (item,bizSerno) {
                    var _self = this;
                    var date = yufp.util.dateFormat(new Date().getTime(), '{y}{m}{d}');
                    this.postWindow(bizSerno,date,item);
                },
                uploadAnnexFn: function () {
                    var _self = this;
                    _self.dialogVisibleAnnex = true;
                    _self.annexFormDisabled = false;
                    _self.flag = '';
                    var size  = _self.$refs.reftableAnnex.data.length;
                    this.$nextTick(function () {
                        _self.$refs.annexForm.resetFn();
                        if('EDIT' == _self.viewType){
                            var obj = _self.$refs.reftable.selections[0];
                            var bizSerno = obj.unfrzSerno;
                            yufp.extend(_self.$refs.annexForm.formModel,
                                {flowAppNo:bizSerno},
                                {bizSerno:bizSerno},
                                {uploadUser:yufp.session.userCode});
                        }else if('ADD' == _self.viewType && size>0){
                        var data = _self.$refs.reftableAnnex.data;
                        var bizSerno = data[0].flowAppNo;
                        yufp.extend(_self.$refs.annexForm.formModel,
                            {flowAppNo:bizSerno},
                            {bizSerno:bizSerno},
                            {uploadUser:yufp.session.userCode});
                        }else{
                            yufp.extend(_self.$refs.annexForm.formModel,
                                {uploadUser:yufp.session.userCode});
                        }
                    });
                },
                saveAnnexFn:function () {
                    var _self = this;
                    var validate = false;
                    _self.$refs.annexForm.validate(function (valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    var rMethod = '';
                    var msg = '';
                    var right = '';
                    var cmisdata = {};
                    if (_self.$refs.annexForm.formModel.flowAppNo != '' && _self.$refs.annexForm.formModel.flowAppNo != null) {
                        rMethod = 'PUT';
                    } else {
                        rMethod = 'POST';
                    }
                    yufp.extend(cmisdata, _self.$refs.annexForm.formModel);
                    right = '1111111';
                    msg = "此操作将保存数据,且保存本地记录后将前往影像平台新增影像资料，是否继续？"


                    _self.$confirm(msg, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function (action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: rMethod,
                                    url: backend.riskmService + '/api/s/limit/unfrz/uploadFile/his',
                                    data: cmisdata,
                                    callback: function (code, message, response) {
                                        if (response.code == 0) {
                                            if (rMethod == 'POST'){
                                                var dat = response.rows;
                                                _self.baseParamsAnnex = { flowAppNo : dat , bizSerno : dat };
                                            }
                                            else if (rMethod == 'PUT'){
                                                var dae = cmisdata.flowAppNo;
                                                _self.baseParamsAnnex = { flowAppNo : dae , bizSerno : dae };
                                            }
                                            _self.$refs.reftableAnnex.remoteData(_self.baseParamsAnnex);
                                            _self.dialogVisibleAnnex = false;
                                            _self.uploadAnnexFile(right,_self.baseParamsAnnex.bizSerno);
                                        } else {
                                            _self.$message(response.message);
                                        }
                                    }
                                });
                            }
                        }
                    });
                },

                infoAnnexFn: function () {
                    var _self = this;
                    if (this.$refs.reftableAnnex.selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var right = '0100000';
                    _self.dialogVisibleAnnex = true;
                    _self.annexFormDisabled = true;
                    _self.flag = 'VIEWINFO';
                    var obj = _self.$refs.reftableAnnex.selections[0];
                    _self.$nextTick(function () {
                        _self.$refs.annexForm.resetFn();
                        yufp.extend(_self.$refs.annexForm.formModel,obj);
                    });
                    _self.$confirm('将前往影像平台查看影像资料，是否继续？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function (action) {
                            if (action === 'confirm') {
                                var date = obj.uploadTime.slice(0,10).replace(/\-/g,"");
                                _self.postWindow(obj.flowAppNo,date,right);
                            }
                        }
                    });
                },

                cancleAnnesFn:function () {
                    var _self = this;
                    _self.dialogVisibleAnnex = false;
                    _self.$nextTick(function () {
                        _self.$refs.annexForm.resetFn();
                    });
                },
                postWindow: function(unfrzSerno,date,item){
                    yufp.service.request({
                        method: 'POST',
                        url: backend.edocService + "/api/doEncode",
                        data: {
                            applySeq : unfrzSerno,
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
