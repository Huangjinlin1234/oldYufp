/**
 * @create by chenqm1 on 2018-05-04
 * @description 预授信名单批次申请表
 */
define(['custom/widgets/js/OrgSelector.js',
    'custom/widgets/js/DutyUserSelector.js',
    'custom/widgets/js/PrdInfoSelector.js'],function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,STD_ZB_APPR_STATUS,STD_ZB_IR_FLOAT_TYPE,STD_ZB_CHOOSE_RESULT,STD_ZB_PRELMT_TMPSTS,STD_ZB_CREDIT_GRADE,STD_ZB_CUS_LEVEL,STD_ZB_EFR_CHNG_IND,STD_ZB_ODS_VERIFY_STS');
        yufp.custom.vue({
            components: {
                FileUpload: window.VueUploadComponent
            },
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    dataUrl: backend.creditService + '/api/lmt/prelist/batch/apps',
                    uploadUrl: backend.creditService + '/api/lmt/prelist/batch/upload',
                    temdataUrl: backend.creditService + '/api/lmt/prelist/queryByPage',
                    baseParams: {

                    },
                    temBaseParams: {
                        chooseResult: "0','2"
                    },
                    passBaseParams: {
                        chooseResult: "1"
                    },
                    tableFilters: {
                        ratePctFilter: function (value) {
                            if (!value){
                                return '';
                            } else{
                                return yufp.util.toPercent((parseFloat(value) * 100).toFixed(7));
                            }
                        }
                    },
                    queryFields: [
                        { placeholder: '法人机构', field: 'legalOrgCode', type: 'custom',is:'div-org-selector'},
                        { placeholder: '批次号', field: 'batchSerno', type: 'input' },
                        { placeholder: '创建人', field: 'createUserName',  type: 'input'},
                        { placeholder: '复核人', field: 'reviewUserName',  type: 'input'},
                        { placeholder: '创建时间', field: 'importDateRange', type: 'daterange' },
                        { placeholder: '复核日期', field: 'reviewDate', type: 'date' },
                        { placeholder: '状态', field: 'approveStatus', type: 'select',dataCode: 'STD_ZB_APPR_STATUS' }
                    ],
                    queryButtons: [
                        { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                                if (valid) {
                                    if(model.importDateRange == ''){
                                        model.importDateRange = [];
                                    }
                                    _self.$refs.reftable.remoteData(model);
                                }
                            } },
                        { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
                    ],
                    tableColumns: [
                        { label: '批次号', prop: 'batchSerno', sortable: true,  resizable: true, width: '240px' },
                        { label: '导入笔数', prop: 'importNum', sortable: false, resizable: true },
                        { label: '导入日期', prop: 'importDate', sortable: true, resizable: true },
                        { label: '状态', prop: 'approveStatus', sortable: true, resizable: true, dataCode: 'STD_ZB_APPR_STATUS' },
                        { label: '复核人', prop: 'reviewUser',  resizable: true, hidden: true},
                        { label: '复核人', prop: 'reviewUserName',  resizable: true},
                        { label: '复核日期', prop: 'reviewDate',  resizable: true},
                        { label: '校验状态', prop: 'verifyStatus', sortable: false, resizable: true, dataCode: 'STD_ZB_ODS_VERIFY_STS'},
                        { label: '创建人', prop: 'createUser', sortable: false, resizable: true, hidden: true },
                        { label: '创建人', prop: 'createUserName', sortable: false, resizable: true, hidden: false },
                        { label: '登记机构代码', prop: 'inputBrId', sortable: false, resizable: true, hidden: true },
                        { label: '法人机构代码', prop: 'legalOrgCode', sortable: false, resizable: true},
                        { label: '法人机构名称', prop: 'legalOrgName', sortable: false, resizable: true },
                        { label: '创建时间', prop: 'createTime', sortable: false, resizable: true, hidden: true},
                        { label: '最后更新人', prop: 'lastUpdateUser', sortable: false, resizable: true, hidden: true },
                        { label: '最后修改时间', prop: 'lastUpdateTime', sortable: false, resizable: true, hidden: true }
                    ],
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
                        { label: '短信营销额度(元)', prop: 'msgMarketingLmt', sortable: false, resizable: true, width: '120px',formatter: function(row, column, cellValue) {
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
                        { label: '固定利率(年)', prop: 'fixedRate', sortable: false, resizable: true , template: function () {
                                return '<template scope="scope"> {{ scope.row.fixedRate | ratePctFilter }} </template>';
                            }},
                        { label: '利率浮动方式', prop: 'irFloatType', sortable: false, resizable: true, dataCode: 'STD_ZB_IR_FLOAT_TYPE' },
                        { label: '利率浮动比例', prop: 'irFloatPct', sortable: false, resizable: true, template: function () {
                                return '<template scope="scope"> {{ scope.row.irFloatPct | ratePctFilter }} </template>';
                            } },
                        { label: '利率调整方式', prop: 'irAdjustMode', sortable: false, resizable: true, dataCode: 'STD_ZB_IREXE_TYPE', hidden: true  },
                        { label: '客户风险系数', prop: 'cusRpn', sortable: false, resizable: true, hidden: true },
                        { label: '信用等级', prop: 'creditLevel', sortable: false, resizable: true, hidden: true, dataCode: 'STD_ZB_CREDIT_GRADE' },
                        { label: '客户级别', prop: 'cusLevel', sortable: false, resizable: true, hidden: true, dataCode: 'STD_ZB_CUS_LEVEL' },
                        { label: '激活有效期（天）', prop: 'actValidDays', sortable: false, resizable: true },
                        { label: '是否农户', prop: 'agriFlg', sortable: false, resizable: true, dataCode: 'STD_ZX_YES_NO', hidden: true  },
                        { label: '是否有工作单位', prop: 'hasWorkPlace', sortable: false, resizable: true, type: 'select',dataCode: 'STD_ZX_YES_NO', hidden: true  },
                        { label: '工作单位名称', prop: 'workPlace', sortable: false, resizable: true, width: '240px', hidden: true},
                        { label: '状态', prop: 'status', sortable: false, resizable: true, dataCode: 'STD_ZB_PRELMT_TMPSTS'},
                        { label: '客户经理号', prop: 'cusManager', sortable: false, resizable: true , hidden: true},
                        { label: '推荐人手机号码', prop: 'referrerMobile', sortable: false, resizable: true , hidden: true},
                        { label: '回访电话号码', prop: 'callBackTelnum', sortable: false, resizable: true , hidden: true},
                        { label: '主管机构代码', prop: 'mainBrId', sortable: false, resizable: true , hidden: true},
                        { label: '出账机构代码', prop: 'chargeoffBrId', sortable: false, resizable: true , hidden: true},
                        { label: '法人机构代码', prop: 'legalOrgCode', sortable: false, resizable: true , hidden: true},
                        { label: '法人机构名称', prop: 'legalOrgName', sortable: false, resizable: true , hidden: true},
                        { label: '法人机构简称', prop: 'legalOrgSimpleName', sortable: false, resizable: true , hidden: true},
                        { label: '筛选结果', prop: 'chooseResult', sortable: false, resizable: true, dataCode: 'STD_ZB_CHOOSE_RESULT'},
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
                            { field: 'createUser', label: '创建人',hidden: true},
                            { field: 'createUserName', label: '创建人'},
                            { field: 'reviewUser', label: '复核人',hidden: true},
                            { field: 'reviewUserName', label: '复核人'},
                            { field: 'reviewDate', label: '复核日期'},
                            { field: 'inputBrId', label: '登记机构代码'},
                            { field: 'legalOrgCode', label: '法人机构代码'},
                            { field: 'legalOrgName', label: '法人机构名称'},
                            { field: 'createTime', label: '创建时间'},
                            { field: 'lastUpdateUser', label: '最后更新人'},
                            { field: 'lastUpdateTime', label: '最后修改时间'}
                        ]
                    },{
                        columnCount: 1,
                        fields: [
                            { field: 'reviewOpinion', label: '复核意见', type: 'textarea', rows: 6}
                        ]
                    }],
                    commitFields: [{
                        columnCount: 2,
                        fields: [
                            { field: 'reviewUser', label: '复核人', rules: [{ required: true, message: '请在岗位下选择一位复核人', trigger: 'blur'}],
                                type: 'custom', is: 'div-duty-user-selector', params: {dutyCodes:['D000000116','D000000090','D000000099','D000000107'] },
                                selectFn: function (val, formModel, arguments){
                                    formModel.reviewUserName = arguments[1].userName;
                                }
                            },
                            {field: 'reviewUserName', hidden: true},
                            {field: 'batchSerno', hidden: true}
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
                            { label: '证件到期日', field: 'certExpireDate'},
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
                            { label: '最高授信额度(元)', field: 'maxCreditLimit', type:'num',formatter: function(cellValue) {
                                    if (typeof(cellValue) == 'undefined'  || cellValue == null || isNaN(cellValue) )
                                        return;
                                    return yufp.util.moneyFormatter(cellValue, 2);
                                } },
                            { label: '期限(月)', field: 'term' },
                            { label: '利率模式', field: 'irMode', dataCode: 'STD_ZB_EFR_CHNG_IND' , type: 'select' },
                            { label: '固定利率(年)', field: 'fixedRate', type:'num',formatter: function(cellValue) {
                                    var num = parseFloat(cellValue);
                                    if (typeof(num) == 'undefined'  || num == null || isNaN(num) )
                                        num = 0;
                                    var rateY = Number(num * 100).toFixed(4) + '%';
                                    return rateY;
                                }},
                            { label: '利率浮动方式', field: 'irFloatType', dataCode: 'STD_ZB_IR_FLOAT_TYPE', type: 'select' },
                            { label: '利率浮动比例', field: 'irFloatPct', type:'num',formatter: function(cellValue) {
                                    var num = parseFloat(cellValue);
                                    if (typeof(num) == 'undefined'  || num == null || isNaN(num) )
                                        num = 0;
                                    var rateY = Number(num * 100).toFixed(4) + '%';
                                    return rateY;
                                } },
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
                            { label: '备注', field: 'remarks' },
                            { label: '创建时间', field: 'createTime' },
                            { label: '最后更新人', field: 'lastUpdateUser' },
                            { label: '最后修改时间', field: 'lastUpdateTime' }
                        ]
                    }],
                    wbButtons: [
                        { label: '关闭', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                _self.wbDialogVisible = false;
                            } }
                    ],
                    createFields: [{
                        columnCount: 2,
                        fields: [
                            // { field: 'batchSerno', label: '文件名称' ,disabled: true},
                            { field: 'prdCode', label: '产品号', type: 'custom', is: 'div-prd-info-selector', params: { },
                                selectFn: function (val, formModel, arguments){ formModel.prdName = arguments[1].prdName;
                                }, rules: [{ required: true, message: '请选择一个产品', trigger: 'blur'}]},
                            { field: 'prdName', label: '产品名称',disabled: true},
                            { field: 'importDate', label: '导入日期' ,type: 'input',disabled: true},
                            { field: 'legalOrgCode', label: '法人机构代码', type: 'custom',is:'div-org-selector', disabled: true},
                            { field: 'legalOrgName', label: '法人机构名称' ,hidden: true},
                            { field: 'createUser', label: '创建人' ,hidden: true},
                            { field: 'createUserName', label: '创建人' ,disabled: true},
                            { field: 'approveStatus', label: '状态', type: 'select', dataCode: 'STD_ZB_APPR_STATUS' ,disabled: true}

                        ]
                    }],
                    height: yufp.frame.size().height - 103,
                    dialogVisible: false,
                    formDisabled: false,
                    viewType: 'DETAIL',
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    temdialogVisible : false,
                    temformDisabled : false,
                    createDialogVisible: false,
                    loading2: false,
                    wbDialogVisible: false,
                    wbDisabled: true,
                    uplaodForm: null,
                    uploadData:{},
                    files: [],
                    extensions: ['xls', 'xlsx'],
                    fileData: {},
                    headers: {
                    }
                }
            },
            methods: {
                /**
                 * @param ctrlCode 操作码
                 */
                checkPermission: function(ctrlCode) {
                    return !yufp.session.checkCtrl(ctrlCode, cite.menuId);
                },
                /**
                 * @param viewType 表单类型
                 * @param editable 可编辑,默认false
                 */
                switchStatus: function (viewType, editable) {
                    var _self = this;
                    _self.viewType = viewType;
                    _self.updateButtons[1].hidden = !editable;
                    _self.formDisabled = !editable;
                    _self.dialogVisible = true;
                },
                commitFn: function () {
                    var _self = this;
                    if (this.$refs.reftable.selections.length < 1) {
                        _self.$message({ message: '请先选择记录', type: 'warning' });
                        return;
                    }else if(this.$refs.reftable.selections[0].approveStatus == '997'){
                        _self.$message({ message: '通过的记录不能再次操作', type: 'warning' });
                        return;
                    }else if(this.$refs.reftable.selections[0].approveStatus == '111') {
                        _self.$message({ message: '该记录在复核中', type: 'warning' });
                        return;
                    }else if(this.$refs.reftable.selections[0].createUser != yufp.session.userId){
                        _self.$message({ message: '该记录不是本人创建,不能提交!', type: 'warning' });
                        return;
                    }else{
                        var modelData = this.$refs.reftable.selections[0];
                        _self.$confirm('是否提交?', '提示', {
                            cancelButtonText: '关闭',
                            confirmButtonText: '确定',
                            type: 'warning'
                        }).then( function() {
                            yufp.service.request({
                                method: 'PUT',
                                url: backend.creditService + '/api/lmt/prelist/batch/commit',
                                data: modelData,
                                callback: function (code, message, response) {
                                    if (response.success == true) {
                                        setTimeout(function () {
                                            _self.$refs.reftable.remoteData();
                                            _self.$message('提交成功');
                                        }, 1000);

                                    } else {
                                        _self.$message(response.message);
                                    }
                                }
                            });
                        }).catch( function() {
                            this.$message({
                                type: 'info',
                                message: '已取消提交'
                            });
                        });
                    }
                },
                downloadFn: function () {
                    var downLoadUrl = backend.creditService + '/api/lmt/prelist/batch/downLoad';
                    window.location.href = downLoadUrl;
                   // yufp.util.download(downLoadUrl);
                },
                infoFn: function () {
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }else{
                        this.dialogVisible = true;
                        this.formDisabled = true;
                        this.$nextTick(function () {
                            yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0]);
                            var _self = this;
                            //查询状态为1-生效的数据
                            _self.$refs.passtable.remoteData({batchSerno : this.$refs.reftable.selections[0].batchSerno, chooseResult: "1"});

                            _self.$refs.temreftable.remoteData({batchSerno : this.$refs.reftable.selections[0].batchSerno, chooseResult: "0','2"});
                        });
                    }
                },
                deleteFn: function () {
                    var _self = this;
                    var selections = _self.$refs.reftable.selections;
                    if (selections.length < 1) {
                        _self.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    for(var i=0; i<selections.length;i++){
                        if(selections[i].approveStatus != '000'){
                            _self.$message({ message: '该记录不是待发起状态，请重新选择', type: 'warning' });
                            return;
                        }
                    }
                    _self.$confirm('是否删除?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '关闭',
                        type: 'warning'
                    }).then( function() {
                        var len = selections.length, arr = [];
                        for (var i = 0; i < len; i++) {
                            var ob = {};
                            ob.batchSerno = selections[i].batchSerno;
                            arr.push(ob);
                        }
                        yufp.service.request({
                            method: 'DELETE',
                            url: backend.creditService + '/api/lmt/prelist/batch/deletebybatch',
                            data: JSON.stringify(arr),
                            callback: function (code, message, response) {
                                _self.$refs.reftable.remoteData();
                                if (response.success) {
                                    _self.$message('操作成功');
                                } else {
                                    _self.$message.error('操作失败:' + response.message);
                                }
                            }
                        });
                    }).catch( function() {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                },
                exportFn: function () {
                    var _self = this;
                    var selections = _self.$refs.reftable.selections;
                    if (selections.length < 1) {
                        _self.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }else{
                        var exportUrl = backend.creditService + '/api/lmt/prelist/batch/exprot?batchSerno=' + selections[0].batchSerno;
                        yufp.service.request({
                            method: 'GET',
                            url: backend.creditService + '/api/lmt/prelist/batch/queryExprotList?batchSerno=' + selections[0].batchSerno,
                            callback: function (code, message, response) {
                                if (response.success) {
                                    // yufp.util.download(exportUrl);
                                    window.location.href = exportUrl;
                                } else {
                                    _self.$message(response.message);
                                }
                            }
                        });
                    }
                },
                /**
                 * Has changed
                 * @param  Object|undefined   newFile   Read only
                 * @param  Object|undefined   oldFile   Read only
                 * @return undefined
                 */
                inputFile: function (newFile, oldFile) {
                    if (newFile && oldFile && !newFile.active && oldFile.active) {
                        var mesType = 'warning';
                        // Get response data
                        if ( newFile.success === true) {
                            if (typeof (newFile.response) === 'string')
                                newFile.response = JSON.parse(newFile.response);
                            if ( newFile.response && newFile.response.message ) {
                                if (newFile.response.success === true)
                                    mesType = 'success';
                                this.$message({message: newFile.response.message, type: mesType});
                            }else
                                this.$message({message: '上传文件失败!', type: mesType});
                            this.createDialogVisible = false;
                            this.$refs.reftable.remoteData();
                            this.files = [];
                        }else {
                            var message = '上传文件失败！';
                            if (newFile.error === 'extension'){
                                message = '上传的文件只支持：';
                                for (var i = 0; i < this.extensions.length; i++) {
                                    message += this.extensions[i] + '、';
                                }
                                message += '后缀的文件！';
                            }
                            this.$message({message: message, type: mesType});
                        }
                        this.loading2 = false;
                    }
                },
                /**
                 * Pretreatment
                 * @param  Object|undefined   newFile   Read and write
                 * @param  Object|undefined   oldFile   Read only
                 * @param  Function           prevent   Prevent changing
                 * @return undefined
                 */
                inputFilter: function (newFile, oldFile, prevent) {
                    if(this.files.length > 1 ) {
                        this.$message({message: '一次只能选择一个文件', type: 'warning'});
                        return prevent();
                    }
                    // Create a blob field
                    newFile.data = this.fileData;
                    newFile.blob = '';
                    var URL = window.URL || window.webkitURL;
                    if (URL && URL.createObjectURL && newFile.file) {
                        newFile.blob = URL.createObjectURL(newFile.file)
                    }
                },
                beforeAvatarUpload: function (file) {
                    var isExcel2003 = file.type === 'application/vnd.ms-excel';//excel2003
                    var isExcel2007 = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';//excel2007
                    //const isLt2M = file.size / 1024 / 1024 < 2;
                    if (!isExcel2003 && !isExcel2007) {
                        this.$message.error('白名单导入文件只能是excel文件!');
                    }
                    //this.uplaodForm.append("file", file);
                    return isExcel2003 || isExcel2007;
                },
                createFn: function () {
                    var _self = this;
                    this.createDialogVisible = true;
                    this.$nextTick(function () {
                        _self.$refs.createForm.resetFn();
                        var ob = {importDate: yufp.util.dateFormat(new Date(), '{y}-{m}-{d}'), createUser: yufp.session.userId, createUserName: yufp.session.userName,
                            approveStatus: '000', legalOrgCode: yufp.session.legalOrg.orgCode, legalOrgName: yufp.session.legalOrg.orgName};
                        yufp.util.copyObj(_self.$refs.createForm.formModel, ob);
                    });
                },
                cancelFn: function(){
                    this.createDialogVisible = false;
                },
                submitUpload: function (file) {
                    var _self = this;
                    var validate = false;
                    this.$refs.createForm.validate(function (valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    if(this.$refs.upload.uploadFiles.length == 0){
                        this.$message({ message: '请选择一个文件', type: 'warning' });
                    }else{
                        this.uplaodForm.delete('importDate');
                        this.uplaodForm.delete('legalOrgCode');
                        this.uplaodForm.delete('createUser');
                        this.uplaodForm.delete('createUserName');
                        this.uplaodForm.delete('prdCode');
                        this.uplaodForm.delete('prdName');
                        this.uplaodForm.delete('approveStatus');
                        this.uplaodForm.delete('file');
                        this.uplaodForm.append('importDate', yufp.util.dateFormat(this.$refs.createForm.formModel.importDate));
                        this.uplaodForm.append('legalOrgCode', this.$refs.createForm.formModel.legalOrgCode);
                        this.uplaodForm.append('createUser', this.$refs.createForm.formModel.createUser);
                        this.uplaodForm.append('createUserName', this.$refs.createForm.formModel.createUserName);
                        this.uplaodForm.append('prdCode', this.$refs.createForm.formModel.prdCode);
                        this.uplaodForm.append('prdName', this.$refs.createForm.formModel.prdName);
                        this.uplaodForm.append('approveStatus', this.$refs.createForm.formModel.approveStatus);
                        this.uplaodForm.append("file", this.$refs.upload.uploadFiles[0].raw);
                        // this.$refs.upload.submit();
                        this.loading2 = true;
                        yufp.service.request({
                            method: 'POST',
                            url: backend.creditService + '/api/lmt/prelist/batch/upload',
                            processData: false,
                            contentType: false,
                            headers: {},
                            data: this.uplaodForm,
                            callback: function (code, message, response) {
                                if (response.success) {
                                    _self.$message({message: '导入成功', type: 'success' });
                                } else {
                                    _self.$message({message: '导入失败:' + response.message, type: 'warning' });
                                }
                                _self.createDialogVisible = false;
                                _self.$refs.upload.clearFiles();//清空上传列表
                                _self.loading2 = false;
                                _self.$refs.reftable.remoteData();
                            }
                        });
                    }
                },
                changeFile: function (file, fileList) {
                    var isExcel2003 = file.raw.type === 'application/vnd.ms-excel';//excel2003
                    var isExcel2007 = file.raw.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';//excel2007
                    if (!isExcel2003 && !isExcel2007) {
                        this.$message.error('白名单导入文件只能是excel文件!');
                        this.$refs.upload.fileList = fileList.slice(0, fileList.length - 1);//从上传文件列表中删除不符合的文件
                    }
                    if(fileList.length > 1){
                        this.$message({ message: '请只上传一个文件', type: 'warning' });
                        this.$refs.upload.fileList = fileList.slice(0, 1);//只取第一个文件
                    }
                },
                successUpload: function (response, file, fileList) {
                    if(response.success == true){
                        this.$message({message: '导入成功', type: 'success' });
                        this.$refs.reftable.remoteData();
                    }else{
                        this.$message.error('导入失败:' + response.message);
                    }
                    this.createDialogVisible = false;
                    this.$refs.upload.clearFiles();//清空上传列表
                    this.loading2 = false;
                },
                errorUpload: function (err, file, fileList) {
                    this.$message.error(err.message);
                    this.$refs.upload.clearFiles();//清空上传列表
                    this.loading2 = false;
                },
                temmodifyFn: function () {
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    this.switchStatus('EDIT', true);
                    this.$nextTick(function () {
                        var obj = this.$refs.reftable.selections[0];
                        yufp.extend(this.$refs.reform.formModel, obj);
                    });
                },
                teminfoFn: function () {
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    this.switchStatus('DETAIL', false);
                    this.$nextTick(function () {
                        yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0]);
                    });
                },
                temdeleteFn: function () {//删除操作只是修改状态
                    var _self = this;
                    var serno = this.$refs.reftable.selections[0].batchSerno;
                    var selections = _self.$refs.temreftable.selections;
                    if (selections.length < 1) {
                        _self.$message({ message: '请先选择记录', type: 'warning' });
                        return;
                    }else{
                        _self.$confirm('是否删除?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '关闭',
                            type: 'warning'
                        }).then( function() {
                            var mydata = [];
                            for (var i = 0; i < selections.length; i++) {
                                var tmpList = {};
                                tmpList.preSerno = selections[i].preSerno;
                                tmpList.status = '2';//修改状态为已失效
                                mydata.push(tmpList);
                            }
                            yufp.service.request({
                                method: 'PUT',
                                url: backend.creditService + '/api/lmt/prelist/temlist',
                                data: JSON.stringify(mydata),
                                callback: function (code, message, response) {
                                    if (response.success == true) {
                                        _self.$refs.temreftable.remoteData({batchSerno : serno});
                                        _self.$message('操作成功');
                                    } else {
                                        _self.$message(response.message);
                                    }
                                }
                            });
                        }).catch( function() {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });
                        });
                    }
                },
                tabClick: function (tabs) {
                    if(tabs.index == "0"){
                        //查询状态为1-生效的数据
                        this.$refs.passtable.remoteData({batchSerno : this.$refs.reftable.selections[0].batchSerno, chooseResult: "1"});
                    }else if(tabs.index == "1"){
                        this.$refs.temreftable.remoteData({batchSerno : this.$refs.reftable.selections[0].batchSerno, chooseResult: "0','2"});
                    }
                },
                tmpInfoFn: function(value){
                    var ob = {};
                    if(value == 'passtable'){
                        if (this.$refs.passtable.selections.length != 1) {
                            this.$message({ message: '请先选择一条记录', type: 'warning' });
                            return;
                        }else{
                            this.wbDialogVisible = true;
                            this.$nextTick(function () {
                                var obj = this.$refs.passtable.selections[0];
                                this.$refs.wbForm.resetFn();
                                yufp.util.copyObj(this.$refs.wbForm.formModel, obj);
                            });
                        }
                    }else if(value == 'temreftable'){
                        if(this.$refs.temreftable.selections.length != 1){
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
                    }
                },
                commitFileFn: function () {
                    var validate = false;
                    this.$refs.createForm.validate(function (valid) {
                        validate = valid;
                    });
                    if (!validate)
                        return ;
                    if (this.files.length == 0) {
                        this.$message({message: '请选择一个文件', type: 'warning'});
                        return;
                    }
                    this.loading2 = true;
                    this.fileData = this.$refs.createForm.formModel;
                    this.$nextTick(function () {
                        this.$refs.upload.active = true;
                    })
                },
                closeFn: function () {
                    this.files = [];
                    this.createDialogVisible = false;
                },
                cancelFileFn: function(){

                }
            },
            mounted: function () {
                this.$nextTick(function () {
                    if(yufp.session.legalOrg.orgCode != '00001'){
                        this.$refs.queryForm.switch('legalOrgCode', 'hidden', true);
                        this.$refs.queryForm.rebuildFn();
                    }
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
