/**
 * @create by ligm on 2019-08-10
 * @description 额度冻结申请表
 */
define([
    './custom/widgets/js/PrdIdInfoSelector.js',
    './custom/widgets/js/OrgPartSelector.js'
], function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,APPLY_CHANNEL_TYPE,STD_ZB_CERT_TYP,APRV_STATUS,CYCLIC_FLG,STD_ZB_LMT_STATE,LIMIT_STS,STD_ZB_ACC_STATUS');
        var vm = yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    expandCollapseName: ['lmtTable', 'baseRef', 'mytable'],
                    baseTab: 'baseTab',
                    dataUrl: backend.flowService + '/api/lmt/freeze/apps',
                    lmtDataUrl: backend.creditService + '/api/lmt/prd/conts',
                    contUrl: backend.flowService + '/api/lmt/terminate/app/acc/loans',
                    baseParams: {},
                    contBaseParams: {
                        isLmtStatus:"03','02'"
                    },
                    loanBaseParams: {},
                    queryFields: [
                        {placeholder: '授信协议编号', field: 'lmtContNo', type: 'input'},
                        {placeholder: '渠道', field: 'channelNo', type: 'select', dataCode: 'APPLY_CHANNEL_TYPE'},
                        {
                            placeholder: '产品名称',
                            field: 'prdName',
                            type: 'custom',
                            is: 'div-prdId-info-selector',
                            params: {prdType: '', type: ''},
                            clickFn: function (value, model, args) {
                                _self.$refs.form.switch('prdName', 'params', {prdType: model.channelNo, type: 'name'});
                                _self.$refs.form.rebuildFn();
                            }
                        },
                        {placeholder: '客户经理', field: 'cusManager', type: 'input'},
                        {placeholder: '客户编号', field: 'cusId', type: 'input'},
                        {placeholder: '客户名称', field: 'cusName', type: 'input'},
                        {placeholder: '证件类型', field: 'certType', type: 'select', dataCode: 'STD_ZB_CERT_TYP'},
                        {placeholder: '证件号码', field: 'certCode', type: 'input'},
                        {placeholder: '归属机构', field: 'orgCode',type: 'custom', is: 'div-part-org-selector'},
                        {placeholder: '冻结申请人', field: 'createUser', type: 'input', hidden: true},
                        {placeholder: '申请日期范围', field: 'applyDate_b2e', type: 'daterange', value: [], editable: false},
                        {placeholder: '审批状态', field: 'approveStatus', type: 'select', dataCode: 'APRV_STATUS'},
                    ],
                    queryButtons: [
                        {
                            label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                                if (valid) {
                                    model.startApplyData = model.applyDate_b2e[0];
                                    model.endApplyData = model.applyDate_b2e[1];
                                    _self.$refs.reftable.remoteData(model);
                                }
                            }
                        },
                        {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2'}
                    ],

                    tableColumns: [
                        {label: '冻结流水号', prop: 'frzSerno', sortable: true, resizable: true},
                        {
                            label: '渠道',
                            prop: 'channelNo',
                            sortable: true,
                            resizable: true,
                            dataCode: 'APPLY_CHANNEL_TYPE'
                        },
                        {label: '产品名称', prop: 'prdName', sortable: true, resizable: true},
                        {label: '客户编号', prop: 'cusId', sortable: true, resizable: true},
                        {label: '客户名称', prop: 'cusName', sortable: true, resizable: true},
                        {label: '证件类型', prop: 'certType', sortable: true, resizable: true, dataCode: 'STD_ZB_CERT_TYP'},
                        {label: '证件号码', prop: 'certCode', sortable: true, resizable: true},
                        {label: '授信协议号', prop: 'lmtContNo', sortable: true, resizable: true},
                        {label: '授信额度', prop: 'lmtAmt', sortable: true, resizable: true},
                        {label: '是否循环', prop: 'cyclicFlg', sortable: true, resizable: true, dataCode: 'CYCLIC_FLG'},
                        {label: '归属机构编码', prop: 'orgCode', sortable: true, resizable: true ,hidden :true},
                        {label: '归属机构', prop: 'orgName', sortable: true, resizable: true},
                        {label: '客户经理', prop: 'cusManagerName', sortable: true, resizable: true},
                        {label: '申请人', prop: 'createUserName', sortable: true, resizable: true},
                        {label: '申请日期', prop: 'applyDate', sortable: true, resizable: true},
                        {
                            label: '审批状态',
                            prop: 'approveStatus',
                            sortable: true,
                            resizable: true,
                            dataCode: 'APRV_STATUS'
                        },
                    ],

                    lmtQueryFields: [
                        {placeholder: '授信协议编号', field: 'lmtContNo', type: 'input'},
                        {placeholder: '渠道', field: 'channelNo', type: 'select', dataCode: 'APPLY_CHANNEL_TYPE'},
                        {placeholder: '产品名称', field: 'prdName', type: 'input'},
                        {placeholder: '客户编号', field: 'cusId', type: 'input'},
                        {placeholder: '客户名称', field: 'cusName', type: 'input'},
                        {placeholder: '证件类型', field: 'certType', type: 'select', dataCode: 'STD_ZB_CERT_TYP'},
                        {placeholder: '证件号码', field: 'certCode', type: 'input'},
                        // 设置授信协议展示的审批状态条件：为有效的展示
                        {placeholder: '额度状态', field: 'lmtStatus', value: '02', hidden: 'true', dataCode: 'LIMIT_STS'},
                    ],
                    lmtTableColumns: [
                        {label: '授信协议号', prop: 'lmtContNo', sortable: true, resizable: true},
                        {label: '客户编号', prop: 'cusId', sortable: true, resizable: true},
                        {label: '客户名称', prop: 'cusName', sortable: true, resizable: true},
                        {label: '证件类型', prop: 'certType', sortable: true, resizable: true, dataCode: 'STD_ZB_CERT_TYP'},
                        {label: '证件号码', prop: 'certCode', sortable: true, resizable: true},
                        {
                            label: '渠道名称',
                            prop: 'channelNo',
                            sortable: true,
                            resizable: true,
                            dataCode: 'APPLY_CHANNEL_TYPE'
                        },
                        {label: '产品编号', prop: 'prdCode', sortable: true, resizable: true ,hidden: true},
                        {label: '产品名称', prop: 'prdName', sortable: true, resizable: true},
                        {label: '授信额度', prop: 'lmtAmt', sortable: true, resizable: true},
                        {label: '是否循环', prop: 'cyclicFlg', sortable: true, resizable: true, dataCode: 'CYCLIC_FLG'},
                        {label: '额度状态', prop: 'lmtStatus', sortable: true, resizable: true, dataCode: 'LIMIT_STS'},
                        {label: '额度起始日', prop: 'startDate', sortable: true, resizable: true},
                        {label: '额度到期日', prop: 'expireDate', sortable: true, resizable: true},
                        {label: '客户经理', prop: 'cusManager', sortable: true, resizable: true},
                        {label: '归属机构', prop: 'orgCode', sortable: true, resizable: true }
                    ],
                    updateFields: [{
                        columnCount: 3,
                        fields: [
                            {field: 'frzSerno', label: '冻结流水号', disabled: true},
                            {field: 'cusId', label: '客户编号', disabled: true},
                            {field: 'cusName', label: '客户名称', disabled: true},
                            {
                                field: 'certType',
                                label: '证件类型',
                                type: 'select',
                                dataCode: 'STD_ZB_CERT_TYP',
                                disabled: true
                            },
                            {field: 'certCode', label: '证件号码', disabled: true},
                            {field: 'lmtAmt', label: '授信额度', disabled: true},
                            {field: 'cyclicFlg', label: '是否循环', type: 'select', dataCode: 'CYCLIC_FLG', disabled: true},
                            {field: 'startDate', label: '额度起始日期', disabled: true},
                            {field: 'expireDate', label: '额度到期日期', disabled: true},
                            {field: 'applyDate', label: '申请日期', disabled: true},
                            {
                                field: 'channelNo',
                                label: '渠道',
                                type: 'select',
                                dataCode: 'APPLY_CHANNEL_TYPE',
                                disabled: true
                            },
                            {field: 'prdId', label: '产品id', disabled: true},
                            {field: 'prdCode', label: '产品编号', disabled: true},
                            {field: 'prdName', label: '产品名称', disabled: true},
                            {field: 'cusManager', label: '客户经理', disabled: true,hidden:true},
                            {field: 'cusManagerName', label: '客户经理', disabled: true},
                            {field: 'orgName', label: '归属机构', disabled: true},
                            {field: 'remarks', label: '备注', disabled: true},
                            {field: 'aprvUserName', label: '审批人名称', disabled: true},
                            {field: 'aprvUserCode', label: '审批人编号', disabled: true},
                            {field: 'aprvComment', label: '人工处理意见', disabled: true},
                            {field: 'aprvDate', label: '审批日期', disabled: true},
                            {field: 'createTime', label: '创建时间', disabled: true},
                            {field: 'lastUpdateUserName', label: '最后修改人', disabled: true},
                            {field: 'lastUpdateTime', label: '最后修改时间', disabled: true},
                            {
                                field: 'lmtContNo', label: '授信协议编号', disabled: true,
                                rules: [{
                                    required: true,
                                    message: '授信协议编号是必选项'
                                }]
                            },
                            {
                                field: 'availAmt', label: '可用额度', disabled: true,
                                rules: [{
                                    required: true,
                                    message: '可用额度是必填项'
                                }]
                            },
                            {field: 'createUser', label: '冻结申请人', disabled: true,hidden:true},
                            {field: 'createUserName', label: '解冻申请人', disabled: true},
                            {
                                field: 'approveStatus',
                                label: '审批状态',
                                type: 'select',
                                dataCode: 'APRV_STATUS',
                                disabled: true
                            }
                        ]
                    }, {
                        columnCount: 1,
                        fields: [
                            {
                                field: 'frzReason',
                                label: '冻结原因',
                                type: 'textarea',
                                rows: 3,
                                maxlength:100,
                                rules: [{
                                    required: true,
                                    message: '冻结原因是必填项'
                                }]
                            },
                        ]
                    }],
                    contListColumns: [
                        {label: '借据编号', prop: 'billNo', sortable: true, resizable: true, disabled: true},
                        {label: '客户名称', prop: 'cusName', sortable: true, resizable: true, disabled: true},
                        {label: '借据金额', prop: 'loanAmount', sortable: true, resizable: true, disabled: true},
                        {label: '借据余额', prop: 'loanBalance', sortable: true, resizable: true, disabled: true},
                        {
                            label: '借据状态',
                            prop: 'accountStatus',
                            sortable: true,
                            resizable: true,
                            disabled: true,
                            dataCode: 'STD_ZB_ACC_STATUS'
                        }
                    ],

                    height: yufp.frame.size().height - 103,
                    dialogVisible: false,
                    formDisabled: false,
                    // formStatusDisabled: true,
                    itemShow: true,
                    searchShow: true,
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
                    this.baseTab = 'baseTab';
                    _self.viewType = viewType;
                    // _self.updateButtons[1].hidden = !editable;
                    _self.formDisabled = !editable;
                    _self.dialogVisible = true;
                    this.$nextTick(function () {
                        if (viewType == 'ADD') {
                            _self.searchShow = editable;
                        }
                        if (viewType == 'EDIT') {
                            _self.searchShow = !editable;
                        }
                        if (viewType == 'DETAIL') {
                            _self.searchShow = !editable;
                        }
                    });
                },
                switchParamsStatus: function () {
                    if (this.viewType == 'ADD') {
                        this.$refs.baseRef.switch('lmtContNo', 'disabled', true);
                        this.$refs.baseRef.switch('availAmt', 'disabled', true);
                        this.$refs.baseRef.switch('frzReason', 'disabled', false);

                        this.$refs.baseRef.switch('frzSerno', 'hidden', true);
                        this.$refs.baseRef.switch('cusId', 'hidden', true);
                        this.$refs.baseRef.switch('cusName', 'hidden', true);
                        this.$refs.baseRef.switch('certType', 'hidden', true);
                        this.$refs.baseRef.switch('certCode', 'hidden', true);
                        this.$refs.baseRef.switch('lmtAmt', 'hidden', true);
                        this.$refs.baseRef.switch('cyclicFlg', 'hidden', true);
                        this.$refs.baseRef.switch('startDate', 'hidden', true);
                        this.$refs.baseRef.switch('expireDate', 'hidden', true);
                        this.$refs.baseRef.switch('applyDate', 'hidden', true);
                        this.$refs.baseRef.switch('channelNo', 'hidden', true);
                        this.$refs.baseRef.switch('prdId', 'hidden', true);
                        this.$refs.baseRef.switch('prdCode', 'hidden', true);
                        this.$refs.baseRef.switch('prdName', 'hidden', true);
                        this.$refs.baseRef.switch('cusManagerName', 'hidden', true);
                        this.$refs.baseRef.switch('orgName', 'hidden', true);
                        this.$refs.baseRef.switch('remarks', 'hidden', true);
                        this.$refs.baseRef.switch('approveStatus', 'hidden', true);
                        this.$refs.baseRef.switch('aprvUserName', 'hidden', true);
                        this.$refs.baseRef.switch('aprvUserCode', 'hidden', true);
                        this.$refs.baseRef.switch('aprvComment', 'hidden', true);
                        this.$refs.baseRef.switch('aprvDate', 'hidden', true);
                        this.$refs.baseRef.switch('createTime', 'hidden', true);
                        this.$refs.baseRef.switch('lastUpdateUserName', 'hidden', true);
                        this.$refs.baseRef.switch('lastUpdateTime', 'hidden', true);
                        this.$refs.baseRef.switch('createUserName', 'hidden', true);
                    } else if (this.viewType == 'EDIT') {
                        this.$refs.baseRef.switch('frzSerno', 'hidden', false);
                        this.$refs.baseRef.switch('cusId', 'hidden', false);
                        this.$refs.baseRef.switch('cusName', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('certType', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('certCode', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('lmtAmt', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('cyclicFlg', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('startDate', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('expireDate', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('applyDate', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('channelNo', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('prdId', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('prdCode', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('prdName', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('cusManagerName', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('orgName', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('remarks', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('approveStatus', 'hidden', true, 'disabled', true);
                        this.$refs.baseRef.switch('aprvUserName', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('aprvUserCode', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('aprvComment', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('aprvDate', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('createTime', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('lastUpdateUserName', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('lastUpdateTime', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('createUserName', 'hidden', false);
                        this.$refs.baseRef.switch('lmtContNo', 'disabled', true, 'required', true);
                        this.$refs.baseRef.switch('availAmt', 'disabled', true, 'required', true);
                        this.$refs.baseRef.switch('frzReason', 'disabled', false, 'required', true);
                    } else if (this.viewType == 'DETAIL') {
                        this.$refs.baseRef.switch('frzSerno', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('cusId', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('cusName', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('certType', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('certCode', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('lmtAmt', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('cyclicFlg', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('startDate', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('expireDate', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('applyDate', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('channelNo', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('prdId', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('prdCode', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('prdName', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('cusManagerName', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('orgCode', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('remarks', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('approveStatus', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('aprvUserName', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('aprvUserCode', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('aprvComment', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('aprvDate', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('createTime', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('lastUpdateUser', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('lastUpdateTime', 'hidden', false, 'disabled', true);
                        this.$refs.baseRef.switch('createUserName', 'hidden', false);
                        this.$refs.baseRef.switch('lmtContNo', 'disabled', true, 'required', true);
                        this.$refs.baseRef.switch('availAmt', 'disabled', true, 'required', true);
                        this.$refs.baseRef.switch('frzReason', 'disabled', true, 'required', true);
                    }
                    this.$refs.baseRef.rebuildFn();
                },
                addFn: function () {
                    var _self = this;
                    _self.itemShow = true;
                    _self.switchStatus('ADD', true);
                    _self.$nextTick(function () {
                        _self.switchParamsStatus();
                        _self.$refs.baseRef.resetFn();
                        _self.$refs.queryFm.fm.lmtContNo = '';
                        _self.$refs.queryFm.fm.prdName = '';
                        _self.$refs.queryFm.fm.channelNo = '';
                        _self.$refs.queryFm.fm.cusId = '';
                        _self.$refs.queryFm.fm.cusName = '';
                        _self.$refs.queryFm.fm.certType = '';
                        _self.$refs.queryFm.fm.certCode = '';
                        _self.$refs.lmtTable.data = [];
                        _self.$refs.mytable.data = [];
                    });
                },
                modifyFn: function () {
                    var _self = this;
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({
                            message: '请先选择一条记录',
                            type: 'warning'
                        });
                        return;
                    }
                    _self.itemShow = false;
                    var obj = this.$refs.reftable.selections[0];
                    obj.createUser = yufp.session.userId;
                    if (obj.approveStatus != '01' && obj.approveStatus != '05') {
                        this.$message({message: '审批状态为“待发起”、“退回”，才可修改。', type: 'warning'});
                        return;
                    }
                    this.switchStatus('EDIT', true);
                    this.$nextTick(function () {
                        _self.switchParamsStatus();
                        yufp.extend(this.$refs.baseRef.formModel, obj);
                        // var cusName = obj.cusName;
                        var certType = obj.certType;
                        var certCode = obj.certCode;
                        this.loanBaseParams = {
                            certType: certType,
                            certCode: certCode
                        };
                        var lmtContNo = obj.lmtContNo;
                        this.contBaseParams = {
                            lmtContNo: lmtContNo
                        };
                        this.$refs.mytable.remoteData(this.loanBaseParams);
                        this.$refs.lmtTable.remoteData(this.contBaseParams);
                    });
                },
                infoFn: function () {
                    var _self = this;
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({
                            message: '请先选择一条记录',
                            type: 'warning'
                        });
                        return;
                    }

                    _self.itemShow = false;
                    var obj = this.$refs.reftable.selections[0];

                    this.switchStatus('DETAIL', false);
                    this.$nextTick(function () {
                        _self.switchParamsStatus();
                        yufp.extend(this.$refs.baseRef.formModel, obj);

                        var cusName = obj.cusName;
                        var certType = obj.certType;
                        var certCode = obj.certCode;
                        this.baseParams = {
                            cusName: cusName,
                            certType: certType,
                            certCode: certCode,
                        };
                        this.$refs.mytable.remoteData(this.baseParams);
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
                        if (selections[i].approveStatus != '01') {
                            this.$message({message: '只能删除待发起的申请信息!!', type: 'warning'});
                            return;
                        }
                    }

                    this.$confirm('是否删除额度终止申请？', '提示').then(function () {
                        yufp.service.request({
                            method: 'DELETE',
                            url: backend.flowService + '/api/lmt/freeze/app',
                            data: {
                                frzSerno: arr.join(',')
                            },
                            callback: function (code, message, response) {
                                if (code == 0) {
                                    _self.$message('操作成功');
                                } else {
                                    _self.$message('操作失败');
                                }
                                _self.$refs.reftable.remoteData();
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
                searchFn: function (model, valid) {
                    if (valid) {
                        this.$refs.lmtTable.remoteData(model);
                    }
                },
                rowClickFn: function (row, event, column) {
                    var _self = this;
                    var lmtStatus = row.lmtStatus;
                    console.log(lmtStatus)
                    if (lmtStatus == '00') {
                        this.$message({message: '提示该协议已冻结，无需重复申请！', type: 'warning'});
                        return;
                    }
                    var model = this.$refs.baseRef.formModel;
                    yufp.extend(model, row);

                    model.createUser = yufp.session.userId;
                    model.orgCode = yufp.session.org.orgCode;
                    var certType = row.certType;
                    var certCode = row.certCode;
                    this.loanBaseParams = {
                        certType: certType,
                        certCode: certCode,
                        prdCode: row.prdCode

                    };
                    this.$refs.mytable.remoteData(this.loanBaseParams);
                },
                clearFn: function () {
                    var _self = this;
                    _self.$refs.lmtTable.data = [];
                    _self.$refs.mytable.data = [];
                    _self.$refs.baseRef.resetFields();
                    _self.$refs.queryFm.fm.lmtContNo = '';
                    _self.$refs.queryFm.fm.prdName = '';
                    _self.$refs.queryFm.fm.channelNo = '';
                    _self.$refs.queryFm.fm.cusId = '';
                    _self.$refs.queryFm.fm.cusName = '';
                    _self.$refs.queryFm.fm.certType = '';
                    _self.$refs.queryFm.fm.certCode = '';
                },
                lmtStat: function (info) {
                    var obj = this.$refs.baseRef.formModel;
                    var lmtStatus = obj.lmtStatus;
                    if (lmtStatus == "00" || lmtStatus == "03") {
                        var lmtSta = lmtStatus;
                        info = false;
                        if (lmtSta == "00") {
                            lmtSta = "已冻结";
                        } else if (lmtSta == "03") {
                            lmtSta = "已失效"
                        }
                        this.$message({message: '授信额度状态为 ' + lmtSta + ' ，不符合业务规则！', type: 'warning'});
                        return info;
                    }
                    return info;
                },
                returnFn: function () {
                    var _self = this;
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
                    if (_self.lmtStat() == false) {
                        return;
                    }
                    ;
                    var rMethod = '';
                    if (_self.viewType == "EDIT") {
                        rMethod = 'PUT';
                    } else if (_self.viewType == "ADD") {
                        rMethod = 'POST';
                    }
                    yufp.service.request({
                        method: rMethod,
                        url: backend.flowService + '/api/lmt/freeze/app/commit',
                        data: obj,
                        callback: function (code, message, response) {
                            console.log(response.code)
                            if (response.code == 0) {
                                _self.$refs.reftable.remoteData();
                                _self.$message({
                                    message: '处理成功!',
                                    type: 'success'
                                });
                            } else {
                                _self.$message({
                                    message: response.message,
                                    type: 'warning'
                                });
                            }
                        }
                    });
                    _self.dialogVisible = false;
                    this.clearFn();
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
                    if (_self.lmtStat() == false) {
                        return;
                    }
                    ;
                    var rMethod = '';
                    if (_self.viewType == "EDIT") {
                        rMethod = 'PUT';
                    } else if (_self.viewType == "ADD") {
                        rMethod = 'POST';
                    }

                    yufp.service.request({
                        method: rMethod,
                        url: backend.flowService + '/api/lmt/freeze/app/save',
                        data: obj,
                        callback: function (code, message, response) {
                            if (response.code == 0) {
                                _self.$refs.reftable.remoteData();
                                _self.$message({
                                    message: '处理成功!',
                                    type: 'success'
                                });
                            } else {
                                _self.$message({
                                    message: response.message,
                                    type: 'warning'
                                });
                            }
                        }
                    });
                    _self.dialogVisible = false;
                    this.clearFn();
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
