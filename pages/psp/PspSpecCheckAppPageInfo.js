﻿/**
 * @create by luzy on 2019-09-10
 * @description 专项检查申请表
 */
define(function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,SPEC_CHECK_STATUS,STD_ZB_ASSURE_MEANS,STD_ZB_CERT_TYP,PRD_VARIETY_ZY');
        yufp.custom.vue({
                components: {
                    FileUpload: window.VueUploadComponent
                },
                el: cite.el,
                data: function () {
                    var _self = this;
                    return {
                        dataUrl: backend.riskmService + '/api/psp/spec/check/apps',
                        nlsApplyInfoUrl: backend.riskmService + '/api/apply/infos/sample',
                        sampleUrl: backend.riskmService + '/api/psp/spec/check/cus/queryInfo',
                        uploadUrl: backend.riskmService + '/api/psp/spec/check/cus/upload',
                        cusInfoIsNullURl: backend.riskmService + '/api/psp/spec/check/cus/chknull',
                        baseParams: {},
                        samplebaseParams: {},
                        nlsApplyParams: {},
                        expandCollapseName: ['identityInfo', 'backgroundInfo', 'indivMarInFo'],
                        queryFields: [
                            {placeholder: '任务编号', field: 'bizSerno', type: 'input'},
                            {placeholder: '检查名称', field: 'chkName', type: 'input'},
                            {placeholder: '任务创建人', field: 'createUser', type: 'input'},
                            {placeholder: '任务创建时间', field: 'createTime', type: 'date', editable: false},
                            {placeholder: '检查任务状态', field: 'specCheckStatus', type: 'select', dataCode: 'SPEC_CHECK_STATUS' }
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
                            {label: '任务编号', prop: 'bizSerno', sortable: true, resizable: true},
                            {label: '检查名称', prop: 'chkName', sortable: true, resizable: true},
                            {label: '任务创建人', prop: 'createUser', sortable: true, resizable: true},
                            {label: '任务创建时间', prop: 'createTime', sortable: true, resizable: true},
                            {label: '检查任务状态', prop: 'specCheckStatus', sortable: true, resizable: true, dataCode: 'SPEC_CHECK_STATUS'},
                            {label: '任务创建人名称', prop: 'createUserName', hidden: true,resizable: true}
                        ],
                        infoFields: [{
                            columnCount: 3,
                            fields: [
                                {label: '检查任务号', field: 'bizSerno', disabled: true},
                                {label: '检查名称', field: 'chkName', disabled: true, rules: [{required: true, message: '必填项', trigger: 'blur'}] },
                                {label: '检查任务状态', field: 'specCheckStatus', dataCode: 'SPEC_CHECK_STATUS', disabled: true,type: 'select'},
                                {label: '任务创建人', field: 'createUser', disabled: true},
                                {label: '任务创建人名称', field: 'createUserName', disabled: true, hidden: true},
                                {label: '任务创建时间', field: 'createTime', disabled: true},
                                {label: '录入机构', field: 'inputBrId', disabled: true},
                                {label: '任务办理人', field: 'hdlNo', disabled: true},
                                {label: '任务办理日期', field: 'hdlDate', disabled: true},
                                {label: '办理机构', field: 'orgCode', disabled: true},
                                {label: '办理机构名称', field: 'orgName', disabled: true}
                            ],
                        }],
                        infoFields2: [{
                            columnCount: 3,
                            fields: [
                                {label: '检查任务号', field: 'bizSerno', disabled: true,hidden:true},
                                {label: '检查名称', field: 'chkName', disabled: true,hidden:true},
                                {label: '检查任务状态', field: 'specCheckStatus', dataCode: 'SPEC_CHECK_STATUS', disabled: true,hidden:true},
                                {label: '任务创建人', field: 'createUser', disabled: true,hidden:true},
                                {label: '任务创建人名称', field: 'createUserName', disabled: true, hidden: true,hidden:true},
                                {label: '任务创建时间', field: 'createTime', disabled: true,hidden:true},
                                {label: '录入机构', field: 'inputBrId', disabled: true,hidden:true},
                                {label: '任务办理人', field: 'hdlNo', disabled: true,hidden:true},
                                {label: '任务办理日期', field: 'hdlDate', disabled: true,hidden:true},
                                {label: '办理机构', field: 'orgCode', disabled: true,hidden:true},
                                {label: '办理机构名称', field: 'orgName', disabled: true,hidden:true}
                            ],
                        }],
                        sampletableColumns: [
                            {label: '检查任务号', prop: 'bizSerno', hidden: true},
                            {label: '检查名称', field: 'chkName', disabled: true,hidden:true},
                            {label: '客户号', prop: 'cusId', sortable: true, resizable: true},
                            {
                                label: '客户名称', prop: 'cusName', sortable: true, resizable: true,
                                template: function () {
                                    return '<template scope="scope">\
                        <a href="javascript:void(0);" style="text-decoration:underline;"@click="_$event(\'custom-row-click\', scope.row)">{{ scope.row.cusName}}</a>\
                    </template>';
                                }
                            },
                            {label: '证件类型', prop: 'certType', sortable: true, resizable: true, dataCode: 'STD_ZB_CERT_TYP'},
                            {label: '证件号码', prop: 'certCode', sortable: true, resizable: true},
                        ],
                        queryNlsApplyInfoFields: [
                            {placeholder: '放款日期区间', field: 'loanDateRange', type: 'daterange'},
                            {placeholder: '放款开始日期', field: 'startLoanDate', type: 'date', hidden: true},
                            {placeholder: '放款结束日期', field: 'endLoanDate', type: 'date', hidden: true},
                            {
                                placeholder: '抽取比例', field: 'percentage', type: 'num',formatter: yufp.util.toPercent,
                                rules: [{required: true, message: '必填项，请输入0到100之间的数！', trigger: 'change', type:'number'},
                                    {
                                        validator: function (rule, value, callback) {
                                            if (typeof (value) == 'undefined' || value == null || isNaN(value) || value == '') {
                                                if (String(value).indexOf('%') != -1) {
                                                    _self.$refs.reform.formModel.percentage = parseFloat(String(value).replace('%',''));
                                                }
                                                callback();
                                            } else if (value < 0 || value > 100) {
                                                _self.$message({message: '请输入不小于0且不大于1的数！', type: 'warning'});
                                                return;
                                            } else {
                                                callback();
                                            }
                                        }
                                    }]
                            },
                            {placeholder: '产品信息', field: 'prdCode', type: 'select',dataCode:'PRD_VARIETY_ZY',
                                rules: [{required: true, message: '必填项，请选择抽样产品！'}]}
                        ],
                        queryNlsApplyInfoButtons: [
                            {
                                label: '生成', op: 'submit', type: 'primary', icon: 'search',
                                click: function (model, valid) {
                                    if (valid) {
                                        model.startLoanDate = model.loanDateRange[0];
                                        model.endLoanDate = model.loanDateRange[1];
                                        _self.$refs.nlsApplyInfoRef.remoteData(model);
                                    }
                                }
                            },
                            {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2'}
                        ],

                        nlsApplyInfoColumns: [
                            {prop: 'bizSerno', label: '流水号', hidden:true},
                            {prop: 'cusId', label: '客户号'},
                            {prop: 'cusName', label: '客户名称'},
                            {prop: 'certType', label: '证件类型', dataCode: 'STD_ZB_CERT_TYP'},
                            {prop: 'certCode', label: '证件号码'},
                        ],
                        //申请人基本信息-身份信息
                        identityInfoFields: [{
                            columnCount: 3,
                            fields: [
                                {field: 'cusId', label: '客户编号', disabled: true},
                                {field: 'cusName', label: '客户名称'},
                                {field: 'indivSex', label: '性别', type: 'select', dataCode: 'STD_ZX_SEX'},
                                {field: 'indivDtOfBirth', label: '出生日期', editable: false},//,type:'date'
                                {field: 'certType', label: '证件类型', type: 'select', dataCode: 'STD_ZB_CERT_TYP'},
                                {field: 'certCode', label: '证件号码'},
                                {field: 'phone', label: '手机号码'},
                                {field: 'fstAppChannel', label: '首次申请渠道', type: 'select', dataCode: 'APPLY_CHANNEL_TYPE'},
                                {field: 'indivRsdAddr', label: '居住地址'},
                                {field: 'indivNtn', label: '民族', type: 'select', dataCode: 'STD_ZB_NATION'},
                                {field: 'indivComName', label: '工作单位名称'},
                                {field: 'indivComTyp', label: '单位性质', type: 'select', dataCode: 'STD_ZB_REG_TYPE'},
                                {field: 'indivCrtfctn', label: '职称', type: 'select', dataCode: 'STD_ZX_TITLE'},
                                {field: 'indivOcc', label: '职业', type: 'select', dataCode: 'STD_ZX_EMPLOYMET'},
                                {
                                    field: 'indivAnnIncm',
                                    label: '个人月收入(元)',
                                    type: 'num',
                                    formatter: function (cellValue) {
                                        if (typeof (cellValue) == 'undefined' || cellValue == null || isNaN(cellValue))
                                            return;
                                        return yufp.util.moneyFormatter(cellValue, 2);
                                    }
                                },  //年收入情况
                                {field: 'postAddr', label: '通讯地址'},
                                {field: 'postCode', label: '邮政编码'},
                                {field: 'indivMarSt', label: '婚姻状况', type: 'select', dataCode: 'STD_ZX_MARR_STATUS'},
                                {field: 'inputId', label: '创建人'},   //登记人
                                {field: 'createTime', label: '创建时间'},
                                {field: 'lastUpdateUser', label: '最后修改人'},
                                {field: 'lastUpdateTime', label: '最后修改时间'}
                            ]
                        }],

                        //申请人基本信息-背景信息
                        backgroundInfoFields: [{
                            columnCount: 3,
                            fields: [
                                {field: 'indivEdt', label: '最高学历', type: 'select', dataCode: 'ZB_DEGREE'},
                                {field: 'agriFlg', label: '是否农户', type: 'select', dataCode: 'STD_YES_NO'},
                                {field: 'familyAddr', label: '家庭地址'},
                                {field: 'fphone', label: '家庭电话'},
                                {field: 'familyMincm', label: '家庭月收入(元)', type: 'num',
                                    formatter: function (cellValue) {
                                        if (typeof (cellValue) == 'undefined' || cellValue == null || isNaN(cellValue))
                                            return;
                                        return yufp.util.moneyFormatter(cellValue, 2);
                                    }
                                },
                                {field: 'indivHealSt', label: '健康状况', type: 'select', dataCode: 'STD_ZB_HEAL_ST', hidden: true},
                                {field: 'hasFamilyMember', label: '是否有家庭成员', type: 'select', dataCode: 'STD_ZX_YES_NO', hidden: true}
                            ]
                        }],

                        //申请人基本信息-婚姻状况
                        indivMarInFoFields: [{
                            columnCount: 3,
                            fields: [
                                {field: 'indivSpsName', label: '配偶姓名'},
                                {field: 'indivSpsMphn', label: '手机号码'},
                                {field: 'indivSpsPhone', label: '配偶联系电话'},
                                {field: 'indivSpsIdTyp', label: '配偶证件类型', type: 'select', dataCode: 'STD_ZB_CERT_TYP', hidden: false},
                                {field: 'indivSpsIdCode', label: '配偶证件号码', hidden: false},
                                {field: 'indivSpsIdPeriod', label: '配偶证件有效期', type: 'date', editable: false, hidden: true},
                                {field: 'indivScomName', label: '工作单位', hidden: true},
                                {field: 'indivSpsPhn', label: '单位电话', hidden: true}
                            ]
                        }],
                        height: yufp.frame.size().height - 103,
                        extensions: ['xls', 'xlsx'],
                        fileData: {},
                        headers: {},
                        files: [],
                        errors: [],
                        fileExcelName: '',
                        tipsVisible:false,
                        loading2: false,
                        dialogVisible: false,
                        editDialogVisible: false,
                        exportTipsVisible: false,
                        sampleVisible: false,
                        importBatchVisible: false,
                        importDialogVisible: false,
                        cusInfodialogVisible: false,
                        exportFileName: '贷后检查-人工检查发起',
                        returnShow: false,
                        infoShow: false,
                        viewType: 'DETAIL',
                        property: 'ADD',
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
                        if (viewType == 'ADD') {
                            _self.dialogVisible = true;
                            _self.infoShow = true;
                            _self.property = 'ADD';
                        } else if (viewType == 'EDIT') {
                            _self.dialogVisible = true;
                            _self.infoShow = true;
                            _self.returnShow = true;
                            _self.property = 'EDIT';
                        } else if (viewType == 'DETAIL') {
                            _self.dialogVisible = true;
                            _self.infoShow = false;
                            _self.returnShow = false;
                            _self.property = 'DETAIL';
                        }
                    },
                    switchParamsStatus: function () {
                        if (this.viewType == 'DETAIL') {
                            this.$refs.reform.switch('bizSerno', 'hidden', false, 'disabled', false);
                            this.$refs.reform.switch('chkName', 'disabled', true);
                            this.$refs.reform.switch('specCheckStatus', 'hidden', false, 'disabled', true);
                            this.$refs.reform.switch('createUser', 'hidden', false, 'disabled', true);
                            this.$refs.reform.switch('createTime', 'hidden', false, 'disabled', true);
                            this.$refs.reform.switch('inputBrId', 'hidden', false, 'disabled', true);
                            this.$refs.reform.switch('hdlNo', 'hidden', false, 'disabled', true);
                            this.$refs.reform.switch('hdlDate', 'hidden', false, 'disabled', true);
                            this.$refs.reform.switch('orgCode', 'hidden', false, 'disabled', true);
                            this.$refs.reform.switch('orgName', 'hidden', false, 'disabled', true);
                        } else if (this.viewType == 'ADD') {
                            this.$refs.reform.switch('bizSerno', 'hidden', true, 'disabled', true);
                            this.$refs.reform.switch('chkName', 'disabled', false);
                            this.$refs.reform.switch('specCheckStatus', 'hidden', true, 'disabled', true);
                            this.$refs.reform.switch('createUser', 'hidden', true, 'disabled', true);
                            this.$refs.reform.switch('createTime', 'hidden', true, 'disabled', true);
                            this.$refs.reform.switch('inputBrId', 'hidden', true, 'disabled', true);
                            this.$refs.reform.switch('hdlNo', 'hidden', true, 'disabled', true);
                            this.$refs.reform.switch('hdlDate', 'hidden', true, 'disabled', true);
                            this.$refs.reform.switch('orgCode', 'hidden', true, 'disabled', true);
                            this.$refs.reform.switch('orgName', 'hidden', true, 'disabled', true);
                        } else if (this.viewType == 'EDIT') {
                            this.$refs.reform.switch('bizSerno', 'hidden', false, 'disabled', true);
                            this.$refs.reform.switch('chkName', 'disabled', false);
                            this.$refs.reform.switch('specCheckStatus', 'hidden', true, 'disabled', true);
                            this.$refs.reform.switch('createUser', 'hidden', true, 'disabled', true);
                            this.$refs.reform.switch('createTime', 'hidden', true, 'disabled', true);
                            this.$refs.reform.switch('inputBrId', 'hidden', true, 'disabled', true);
                            this.$refs.reform.switch('hdlNo', 'hidden', true, 'disabled', true);
                            this.$refs.reform.switch('hdlDate', 'hidden', true, 'disabled', true);
                            this.$refs.reform.switch('orgCode', 'hidden', true, 'disabled', true);
                            this.$refs.reform.switch('orgName', 'hidden', true, 'disabled', true);
                        }
                    },

                    // 新增
                    addFn: function () {
                        this.switchStatus('ADD', true);
                        this.$nextTick(function () {
                            this.switchParamsStatus();
                            this.$refs.sampleReftable.data = [];
                            this.$refs.reform.resetFn();
                        })
                    },
                    // 新增(随机样本)
                    addSampleFn: function () {
                        var _self = this;
                        var bizSerno = _self.$refs.reform.bizSerno;
                        _self.$alert('数据抽取结束后，请选择需要提交的数据；若不选择，则默认提交所有数据。', '提示', {
                            confirmButtonText: '确定',
                            center: true,
                            callback: function (action) {
                                if (action === 'confirm') {
                                    _self.sampleVisible = true;
                                    _self.$nextTick(function () {
                                        this.$refs.nlsApplyInfoRef.data = [];
                                    })
                                }
                            }
                        });
                    },
                    // 新增(批量导入)
                    addImport: function () {
                        //删除之前操作的未保存的数据
                        var _self = this;
                        if (_self.viewType == 'ADD' && _self.$refs.sampleReftable.data.length >0 ){
                            var obj = _self.$refs.sampleReftable.data[0];
                        }else{
                            var obj = _self.$refs.reform.formModel;
                        }
                        _self.$alert('数据导入结束后，请选择需要提交的数据；若不选择，则默认提交所有数据。', '提示', {
                            confirmButtonText: '确定',
                            center: true,
                            callback: function (action) {
                                if (action === 'confirm') {
                                    _self.cleanIsNull(obj.bizSerno);
                                    _self.importBatchVisible = true;
                                    _self.$nextTick(function () {
                                        _self.$refs.nlsApplyInfoRef1.data = [];
                                        yufp.extend(_self.$refs.reform2.formModel, obj);
                                    })
                                }
                            }
                        });

                    },
                    // 修改
                    modifyFn: function () {
                        var _self = this;
                        if (this.$refs.reftable.selections.length != 1) {
                            this.$message({message: '请先选择一条记录', type: 'warning'});
                            return;
                        }
                        var obj = _self.$refs.reftable.selections[0];
                        if (obj.specCheckStatus == '01') {
                            this.$message({message: '检查任务已提交，不可再修改！', type: 'warning'});
                            return;
                        }
                        this.switchStatus('EDIT', true);
                        var bizSerno = obj.bizSerno;
                        _self.cleanIsNull(bizSerno);
                        this.$nextTick(function () {
                            this.switchParamsStatus();
                            this.samplebaseParams = {
                                bizSerno: bizSerno
                            }
                            _self.$refs.sampleReftable.remoteData(this.samplebaseParams);//异步传输
                            yufp.extend(_self.$refs.reform.formModel, obj);
                        });
                    },
                    //查看
                    infoFn: function () {
                        var _self = this;
                        if (this.$refs.reftable.selections.length != 1) {
                            this.$message({message: '请先选择一条记录', type: 'warning'});
                            return;
                        }
                        this.switchStatus('DETAIL', true);
                        this.$nextTick(function () {
                            this.switchParamsStatus();
                            var obj = _self.$refs.reftable.selections[0];
                            var bizSerno = obj.bizSerno;
                            this.samplebaseParams = {
                                bizSerno: bizSerno
                            }
                            _self.$refs.sampleReftable.remoteData(this.samplebaseParams);//异步传输
                            yufp.extend(_self.$refs.reform.formModel, obj);
                        });
                    },
                    //删除
                    deleteFn: function () {
                        var _self = this;
                        var selections = _self.$refs.reftable.selections;
                        if (selections.length < 1) {
                            _self.$message({message: '请先选择一条记录', type: 'warning'});
                            return;
                        }
                        var obj = this.$refs.reftable.selections[0];
                        var specCheckStatus = obj.specCheckStatus;
                        if (specCheckStatus != '00') {
                            this.$message({message: '检查任务已提交，不可删除！', type: 'warning'});
                            return;
                        }
                        _self.$confirm('是否删除？', '提示', {type: 'warning'}).then(function () {
                            yufp.service.request({
                                method: 'DELETE',
                                url: backend.riskmService + '/api/psp/spec/check/app',
                                data: obj,
                                callback: function (code, message, response) {
                                    if (code == 0) {
                                        _self.$refs.reftable.remoteData();
                                        _self.$message('操作成功');
                                    } else {
                                        _self.$message('操作失败');
                                    }
                                }
                            });
                        }).catch(function () {
                        });
                    },
                    deleteSampleFn: function () {
                        var _self = this;
                        var selections = _self.$refs.sampleReftable.selections;
                        if (selections.length < 1) {
                            _self.$message({message: '请先选择至少一条记录', type: 'warning'});
                            return;
                        }
                        var length = selections.length, arr = [];
                        for (var i = 0; i < length; i++) {
                            arr.push(selections[i].cusId);
                        }

                        var conditions = {
                            cusId: arr.join(','),
                            bizSerno: selections[0].bizSerno
                        }
                        _self.$confirm('是否删除?', '提示').then(function () {
                            yufp.service.request({
                                method: 'DELETE',
                                url: backend.riskmService + '/api/psp/spec/check/cus/oneInfo',
                                data: conditions,
                                callback: function (code, message, response) {
                                    if (code == 0) {
                                        _self.$refs.sampleReftable.remoteData();
                                        _self.$message('操作成功');
                                    } else {
                                        _self.$message('操作失败');
                                    }
                                }
                            });
                        });
                    },
                    //返回
                    buttonCont: function () {
                        var _self = this;
                        var obj = _self.$refs.sampleReftable.data[0];
                        if (obj != null) {
                            _self.cleanIsNull(obj.bizSerno);
                        }
                        _self.sampleVisible = false;
                    },
                    //新增保存
                    importsaveForm: function () {
                        var validate = false;
                        var _self = this;
                        _self.$refs.reform.validate(function (valid) {
                            validate = valid;
                        });
                        if (!validate) {
                            return;
                        }
                        if (_self.$refs.sampleReftable.data.length == 0) {
                            _self.$message({message: '当前数据为空，不予保存', type: 'warning'});
                            return;
                        }
                        var obj = _self.$refs.sampleReftable.data[0];
                        obj.chkName = _self.$refs.reform.formModel.chkName;

                        yufp.service.request({
                            method: "PUT",
                            url: backend.riskmService + '/api/psp/spec/check/cus/app/save',
                            data: obj,
                            callback: function (code, message, response) {
                                if (code == 0) {
                                    _self.dialogVisible = false;
                                    _self.$refs.reftable.remoteData();
                                    _self.$message('操作成功');
                                } else {
                                    _self.$message('操作失败');
                                }
                            }
                        });
                        var bizObj = obj.bizSerno;
                        if (bizObj != null) {
                            _self.cleanChkName(bizObj.bizSerno);
                            _self.cleanIsNull(bizObj.bizSerno);
                        }
                    },
                    //新增提交
                    importsubmitForm: function () {
                        var validate = false;
                        var _self = this;
                        _self.$refs.reform.validate(function (valid) {
                            validate = valid;
                        });
                        if (!validate) {
                            return;
                        }
                        if (_self.$refs.sampleReftable.data.length == 0) {
                            _self.$message({message: '当前数据为空，不予提交', type: 'warning'});
                            return;
                        }
                        var obj = _self.$refs.sampleReftable.data[0];
                        obj.chkName = _self.$refs.reform.formModel.chkName;

                        yufp.service.request({
                            method: "PUT",
                            url: backend.riskmService + '/api/psp/spec/check/cus/app/commit',
                            data: obj,
                            callback: function (code, message, response) {
                                if (code == 0) {
                                    _self.dialogVisible = false;
                                    _self.$refs.reftable.remoteData();
                                    _self.$message('操作成功');
                                } else {
                                    _self.$message('操作失败');
                                }
                            }
                        });
                        var bizObj = obj.bizSerno;
                        if (bizObj != null) {
                            _self.cleanChkName(bizObj.bizSerno);
                            _self.cleanIsNull(bizObj.bizSerno);
                        }
                    },
                    //新增返回
                    importbutton: function () {
                        var _self = this;
                        var bizObj = _self.$refs.sampleReftable.data[0];
                        if (bizObj != null) {
                            _self.cleanChkName(bizObj.bizSerno);
                            _self.cleanIsNull(bizObj.bizSerno);
                        }
                        this.dialogVisible = false;
                        //删除导入未使用的数据
                    },
                    // 修改保存
                    editSaveForm: function () {//修改的保存按钮
                        var validate = false;
                        var _self = this;
                        _self.$refs.reform.validate(function (valid) {
                            validate = valid;
                        });
                        if (!validate) {
                            return;
                        }
                        if (_self.$refs.sampleReftable.data.length == 0) {
                            _self.$message({message: '当前数据为空，不予保存', type: 'warning'});
                            return;
                        }
                        var obj = _self.$refs.sampleReftable.data[0];
                        obj.chkName = _self.$refs.reform.formModel.chkName;
                        yufp.service.request({
                            method: "PUT",
                            url: backend.riskmService + '/api/psp/spec/check/cus/app/edit/save',
                            data: obj,
                            callback: function (code, message, response) {
                                if (code == 0) {
                                    _self.$message('操作成功');
                                    _self.dialogVisible = false;
                                    _self.$refs.reftable.remoteData();
                                    var bizObj = _self.$refs.sampleReftable.data[0];
                                    if (bizObj != null) {
                                        _self.cleanChkName(bizObj.bizSerno);
                                        _self.cleanIsNull(bizObj.bizSerno);
                                    }
                                } else {
                                    _self.$message('操作失败');
                                }
                            }
                        });
                    },
                    //修改提交
                    editSubmitForm: function () {
                        var validate = false;
                        var _self = this;
                        _self.$refs.reform.validate(function (valid) {
                            validate = valid;
                        });
                        if (!validate) {
                            return;
                        }
                        if (_self.$refs.sampleReftable.data.length == 0) {
                            _self.$message({message: '当前数据为空，不予提交', type: 'warning'});
                            return;
                        }
                        var obj = _self.$refs.sampleReftable.data[0];
                        obj.chkName = _self.$refs.reform.formModel.chkName;
                        yufp.service.request({
                            method: "PUT",
                            url: backend.riskmService + '/api/psp/spec/check/cus/app/edit/commit',
                            data: obj,
                            callback: function (code, message, response) {
                                if (code == 0) {
                                    _self.$message('操作成功');
                                    _self.dialogVisible = false;
                                    _self.$refs.reftable.remoteData();
                                    var bizObj = _self.$refs.sampleReftable.data[0];
                                    if (bizObj != null) {
                                        _self.cleanChkName(bizObj.bizSerno);
                                        _self.cleanIsNull(bizObj.bizSerno);
                                    }
                                } else {
                                    _self.$message('操作失败');
                                }
                            }
                        });

                    },
                    cusNameClick: function (scope) {
                        var _self = this;
                        _self.cusInfodialogVisible = true;
                        //客户名称超链接处理函数
                        this.$nextTick(function () {
                            yufp.service.request({
                                method: "GET",
                                url: backend.cusService + '/api/cus/indiv/' + scope.cusId,
                                data: {},
                                callback: function (code, message, response) {
                                    if (response.success) {
                                        // 重置表单，防止第二次点击查看时，为空数据出现上一次查看的数据
                                        _self.$refs.identityInfo.resetFn();
                                        _self.$refs.backgroundInfo.resetFn();
                                        _self.$refs.indivMarInFo.resetFn();

                                        yufp.extend(_self.$refs.identityInfo.formModel, response.rows);
                                        yufp.extend(_self.$refs.backgroundInfo.formModel, response.rows);
                                        yufp.extend(_self.$refs.indivMarInFo.formModel, response.rows);
                                    } else {
                                        _self.$message("获取客户信息失败：" + response.message);
                                    }
                                }
                            });
                        });
                    },
                    //新增随机样本 选取
                    buttonReturn: function () {
                        var _self = this;
                        var selections = _self.$refs.nlsApplyInfoRef.selections;
                        var obj = _self.$refs.sampleReftable.data[0];
                        var length = selections.length, arr = [];
                        // 判断新增页面列表展示是否有数据
                        if (obj != null) {
                            for (var i = 0; i < length; i++) {
                                selections[i].bizSerno = obj.bizSerno;
                            }
                        }
                        this.$nextTick(function () {
                            yufp.service.request({
                                method: "PUT",
                                url: backend.riskmService + '/api/psp/spec/check/cus/sampleUpdata',
                                // data: selections[0],
                                data: JSON.stringify(selections),
                                callback: function (code, message, response) {
                                    if (code == 0) {
                                        var bizSerno;
                                        if (obj != null) {
                                            bizSerno = selections[0].bizSerno
                                        } else {
                                            bizSerno = response.rows.bizSerno;
                                        }
                                        this.samplebaseParams = {
                                            bizSerno: bizSerno
                                        };
                                        _self.$refs.sampleReftable.remoteData(this.samplebaseParams);
                                        _self.sampleVisible = false;
                                        _self.$message('操作成功');
                                    } else {
                                        _self.$message('操作失败');
                                    }
                                }
                            });
                        })
                    },
                    inputFile: function (newFile, oldFile) {
                        if (newFile && oldFile && !newFile.active && oldFile.active) {
                            var mesType = 'warning';
                            // Get response data
                            if (newFile.success === true) {
                                var msgData = newFile.response.message;
                                //flag:用来区分错误类型（excel填写错误/数据库存在历史数据的错误）
                                // this.flag = msgData.substring(0, msgData.indexOf(":"));
                                var errorMsg = msgData.substring(msgData.indexOf(":") + 1, msgData.length);
                                //转化为数组，用于遍历展示
                                this.errors = errorMsg.split(',');
                                if (typeof (newFile.response) === 'string'){
                                    newFile.response = JSON.parse(newFile.response);
                                }
                                if (newFile.response && newFile.response.message) {
                                    if (newFile.response.success === true){
                                        mesType = 'success';
                                        this.$message({message: newFile.response.message, type: mesType});
                                    } else {
                                        this.tipsVisible = true;
                                    }
                                    var bizS = newFile.response.rows;
                                    this.$refs.reform2.formModel.bizSerno = bizS;
                                    nlsApplyParams = {
                                        bizSerno:bizS
                                    };
                                    this.importDialogVisible = false;
                                    this.$refs.nlsApplyInfoRef1.remoteData(nlsApplyParams);
                                    this.files = [];
                                } else {
                                    this.$message({message: '上传文件失败!', type: mesType});
                                }
                            } else {
                                var message = '上传文件失败！';
                                if (newFile.error === 'extension') {
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
                    exportFn: function () {
                        var _self = this;
                        _self.exportTipsVisible = true;
                    },
                exportExcelFn:function () {
                    var _self = this;
                    var formValue = this.$refs.form.fm;
                    _self.exportTipsVisible = false;
                    this.$confirm('是否导出数据为Excel文件?', '提示').then(function () {
                        yufp.util.exportExcelByTable({
                            fileName: _self.exportFileName,
                            importType: 'service', // page当前页 selected 选中的数据  service 后端数据
                            ref: _self.$refs.reftable,
                            url: backend.riskmService + '/api/psp/spec/check/apps',
                            method: 'POST',
                            param: {
                                bizSerno: formValue.bizSerno,
                                chkName: formValue.chkName,
                                createUser: formValue.createUser,
                                createTime: formValue.createTime,
                                specCheckStatus: formValue.specCheckStatus,
                                exportFlag: 'exp'
                            }
                        });
                    })
                },
                exportCsvFn:function () {
                    var _self = this;
                    var formValue = this.$refs.form.fm;
                    _self.exportTipsVisible = false;
                    this.$confirm('是否导出数据为csv文件?', '提示').then(function () {
                        yufp.util.exportCsvByTable({
                            fileName: _self.exportFileName,
                            importType: 'service', // page当前页 selected 选中的数据  service 后端数据
                            ref: _self.$refs.reftable,
                            url: backend.riskmService + '/api/psp/spec/check/apps',
                            method: 'POST',
                            param: {
                                bizSerno: formValue.bizSerno,
                                chkName: formValue.chkName,
                                createUser: formValue.createUser,
                                createTime: formValue.createTime,
                                specCheckStatus: formValue.specCheckStatus,
                                exportFlag: 'exp'

                            }
                        });
                    })
                },
                canExportFn:function () {
                    this.exportTipsVisible = false;
                },
                    // 新增批量导入
                    importExcelFn: function () {
                        var _self = this;
                        this.fileExcelName = '';
                        _self.importDialogVisible = true;
                        _self.fileData = {};
                        _self.fileData = {bizSerno:_self.$refs.reform2.formModel.bizSerno}
                    },
                    // 下载模板
                    downloadFn: function () {
                        var downLoadUrl = backend.riskmService + '/api/psp/spec/check/cus/downLoad';
                        window.location.href = downLoadUrl;
                    },
                    // 新增批量导入 选取
                    importReturn: function () {
                        var _self = this;
                        var selections = _self.$refs.nlsApplyInfoRef1.selections;
                        var data = _self.$refs.nlsApplyInfoRef1.data[0];
                        // 选取后新增页面展示数据的条件
                        var bizNo;
                        var length = selections.length, arr1 = [];
                        if (selections.length > 0) {
                            for (var i = 0; i < length; i++) {
                                arr1.push(selections[i].cusId);
                            }
                        }

                        var conditions = {
                            cusId: arr1.join(','),
                            bizSerno: bizNo,
                            tempBizNo: data.bizSerno
                        }
                        // selections[0].cusId = arr1.join(',');
                        this.$nextTick(function () {
                            yufp.service.request({
                                method: "PUT",
                                url: backend.riskmService + '/api/psp/spec/check/cus/batchUpdata',
                                data: conditions,
                                callback: function (code, message, response) {
                                    if (code == 0) {
                                        var bizSerno;
                                        if (data != null) {
                                            bizSerno = data.bizSerno
                                        } else {
                                            bizSerno = response.rows.bizSerno;
                                        }
                                        this.samplebaseParams = {
                                            bizSerno: bizSerno
                                        };
                                        _self.$refs.sampleReftable.remoteData(this.samplebaseParams);
                                        _self.cleanIsNull(bizSerno);
                                        _self.importBatchVisible = false;
                                        _self.$message('操作成功');
                                    } else {
                                        _self.$message('操作失败');
                                    }
                                }
                            });
                        })
                    },
                    // 新增批量导入返回
                    importbuttonCont: function () {
                        var _self = this;
                        var bizSerno = _self.$refs.reform2.formModel.bizSerno;
                        this.cleanIsNull(bizSerno);
                        _self.importBatchVisible = false;
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
                    infoButton: function () {
                        this.cusInfodialogVisible = false;
                    },
                    cleanIsNull: function (bizSerno) {
                        var _self = this;
                        //将导入的数据 未使用的删除
                        yufp.service.request({
                            method: 'DELETE',
                            data:{
                                bizSerno:bizSerno
                            },
                            url: backend.riskmService + '/api/psp/spec/check/cus/chkNull',
                            callback: function (code, message, response) {
                                if (code == 0) {
                                    _self.$refs.reftable.remoteData();
                                } else {
                                    _self.$message('导入的数据未删除!');
                                }
                            }
                        });
                    },
                    cleanChkName: function (bizSerno) {
                        var _self = this;
                        //将导入的数据 未使用的删除
                        yufp.service.request({
                            method: 'POST',
                            data:{
                                bizSerno:bizSerno
                            },
                            url: backend.riskmService + '/api/psp/spec/check/cus/chkName',
                            callback: function (code, message, response) {
                                if (code == 0) {
                                    _self.$refs.reftable.remoteData();
                                } else {
                                    _self.$message('导入的数据未删除!');
                                }
                            }
                        });
                    },
                    clearFn: function () {
                        var _self = this;
                        _self.$refs.sampleReftable.data = [];
                        _self.$refs.nlsApplyInfoRef.data = [];
                        _self.$refs.nlsApplyInfoRef1.data = [];
                        _self.$refs.sampleform.fm.applyDate = '';
                        _self.$refs.sampleform.fm.createTime = '';
                        _self.$refs.queryFm.fm.remarks = '';
                    },
                //取消按钮
                    cancelFn1: function () {
                        this.files = [];
                        this.errors = [];
                        this.fileExcelName = '';
                        this.tipsVisible = false;
                    }
                }
            }
        );
    }
    ;
    // 消息处理
    exports.onmessage = function (type, message) {

    };
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {

    }

});
