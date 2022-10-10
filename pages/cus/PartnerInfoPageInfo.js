/**
 * @create by ligm on 2019-09-04
 * @description 合作方信息表
 */
define(function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite ) {
        yufp.lookup.reg('CRUD_TYPE,STD_YES_NO,COOPR_STS,PARTNER_TYPE,COST_TYPE,PAY_WARN_SIGN,PARTNER_PROPERTY,PRD_SORT,STD_PRD_TYPE,PRD_STATUS');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    baseParams: {
                    },
                    partnerRelProParams:{},
                    dataUrl: backend.cusService + '/api/partner/infos',
                    dataUrlPartnerRelPro: backend.cusService + '/api/partner/prd/infos',
                    baseTab: 'baseTab',
                    expandCollapseName: ['partnerInfo', 'cooperationInfo', 'relationInfo','partnerMat', 'partnerMatInfo'],
                    queryFields: [
                        { placeholder: '合作方编号', field: 'partnerId', type: 'input' },
                        { placeholder: '合作方名称', field: 'partnerName', type: 'input' },
                    ],
                    queryButtons: [
                        { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                                if (valid) {
                                    _self.$refs.reftable.remoteData(model);
                                }
                            } },
                        { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
                    ],

                    tableColumns: [
                        { label: '合作方编号', prop: 'partnerId', sortable: true, resizable: true },
                        { label: '合作方简称', prop: 'parSimpleName', sortable: true, resizable: true },
                        { label: '合作方名称', prop: 'partnerName', sortable: true, resizable: true },
                        { label: '是否启用', prop: 'isUse', sortable: true, resizable: true ,dataCode:'STD_YES_NO'},
                        { label: '归属机构', prop: 'orgCode', sortable: true, resizable: true },
                        { label: '合作开始日期', prop: 'cooprStartDt', sortable: true, resizable: true ,type: 'date'},
                        { label: '合作结束日期', prop: 'cooprEndDt', sortable: true, resizable: true ,type: 'date'},
                        { label: '合作状态', prop: 'cooprStatus', sortable: true, resizable: true ,dataCode:'COOPR_STS'},
                        { label: '创建人', prop: 'createUser', sortable: true, resizable: true },
                        { label: '创建时间', prop: 'createTime', sortable: true, resizable: true },
                        { label: '最后修改人', prop: 'lastUpdateUser', sortable: true, resizable: true },
                        { label: '最后修改时间', prop: 'lastUpdateTime', sortable: true, resizable: true,
                            formatter: function (row, column, cellValue) {
                                if (cellValue != null && cellValue != '')
                                    return cellValue.slice(0, 19);
                            }
                        }
                    ],

                    //合作方基本信息
                    partnerInfoFields: [{
                        columnCount: 3,
                        fields: [
                            { field: 'partnerType', label: '合作方类型',type:'select',dataCode:'PARTNER_TYPE',rules: [{required: true, message: '必填项'}]},
                            { field: 'partnerId', label: '合作方编号',rules: [{required: true, message: '必填项'}]},
                            { field: 'parSimpleName', label: '合作方简称'},
                            { field: 'partnerName', label: '合作方名称',rules: [{required: true, message: '必填项'}]},
                            { field: 'orgCode', label: '归属机构',disabled: true /*,rules: [{required: true, message: '必填项'}]*/},
                            { field: 'partnerProp', label: '合作方性质',type:'select',dataCode:'PARTNER_PROPERTY',rules: [{required: true, message: '必填项'}]},
                            { field: 'thirdDataId', label: '第三方数据标识',rules: [{required: true, message: '必填项'}]},
                            { field: 'isUse', label: '是否启用',type:'select',dataCode:'STD_YES_NO',rules: [{required: true, message: '必填项'}]},
                            { field: 'createUser', label: '创建人',disabled: true },
                            { field: 'createTime', label: '创建时间',disabled: true,
                                formatter: function (row, column, cellValue) {
                                    if (cellValue != null && cellValue != '')
                                        return cellValue.slice(0, 19);
                                }
                            },
                            { field: 'lastUpdateUser', label: '最后修改人',disabled: true },
                            { field: 'lastUpdateTime', label: '最后修改时间',disabled: true,
                                formatter: function (row, column, cellValue) {
                                    if (cellValue != null && cellValue != '')
                                        return cellValue.slice(0, 19);
                                }
                            },
                        ]
                    }],

                    //合作信息
                    cooperationInfoFields: [{
                        columnCount: 3,
                        fields: [
                            { field: 'cooprStatus', label: '合作状态',type:'select',dataCode:'COOPR_STS',rules: [{required: true, message: '必填项'}]},
                            { field: 'cooprStartDt', label: '合作开始日期',type: 'date',disable:true, formatter: yufp.util.dateFormatter,editable:false,
                                rules: [{required: true, message: '必填项', trigger: 'blur',type:'date'},
                                    { validator: function(rule, value, callback){
                                            var cooprEndDt = _self.$refs.cooperationInfo.formModel.cooprEndDt;
                                            if(cooprEndDt!='' && value >= cooprEndDt){
                                                callback(new Error("开始日期须早于结束日期"));
                                                _self.$refs.cooperationInfo.formModel.cooprStartDt = '';
                                            }else{
                                                callback();
                                            }
                                        }
                                    }
                                ]},
                            { field: 'cooprEndDt', label: '合作结束日期',type: 'date',editable:false,
                                rules: [{required: true, message: '必填项', trigger: 'blur' ,type:'date'},
                                    { validator: function(rule, value, callback){
                                            var cooprStartDt = _self.$refs.cooperationInfo.formModel.cooprStartDt;
                                            if(cooprStartDt!='' && value <= cooprStartDt){
                                                callback(new Error("结束日期须晚于开始日期"));
                                                _self.$refs.cooperationInfo.formModel.cooprEndDt = '';
                                            }else{
                                                callback();
                                            }
                                        }
                                    }
                                ]},
                            { field: 'cooprProtocolNo', label: '合作协议号',
                                rules: [{required: true, message: '必填项'}]},
                            { field: 'payAlertRatio', label: '赔付警戒比例(%)',
                                rules: [{validator: yufp.validator.gZero,  trigger: 'blur'},
                                    { validator: function(rule, value, callback){
                                            if(value <0 || value >100){
                                                callback(new Error("必须填写0-100的数字"));
                                            }else{
                                                callback();
                                            }
                                        }
                                    }
                                ]},
                            { field: 'payAlertMark', label: '赔付警戒标志',disabled:true, type:'select',dataCode:'PAY_WARN_SIGN' },
                            { field: 'costType', label: '费用类型', type: 'select', dataCode: 'COST_TYPE',
                                change: function (fields) {
                                    if (fields == '01') {
                                        _self.$refs.cooperationInfo.switch('loanBalSetlRatio', 'hidden', true);
                                        _self.$refs.cooperationInfo.switch('loanLmtSetlRatio', 'hidden', false);
                                    } else if (fields == '02') {
                                        _self.$refs.cooperationInfo.switch('loanLmtSetlRatio', 'hidden', true);
                                        _self.$refs.cooperationInfo.switch('loanBalSetlRatio', 'hidden', false);
                                    } else {
                                        _self.$refs.cooperationInfo.switch('loanLmtSetlRatio', 'hidden', true);
                                        _self.$refs.cooperationInfo.switch('loanBalSetlRatio', 'hidden', true);
                                    }
                                }
                            },
                            { field: 'loanLmtSetlRatio', label: '放款金额结算比例(%)', hidden: true},
                            { field: 'loanBalSetlRatio', label: '贷款余额结算比例(%)', hidden: true},
                            { field: 'costSetl', label: '费用结算',disabled:true}
                        ]
                    }],

                    //联系信息
                    relationInFoFields: [{
                        columnCount: 3,
                        fields: [
                            /** @date 2019/12/13 业务需暂时隐藏
                             * { field: 'certType', label: '证件类型',type:'select',dataCode:'STD_ZB_CERT_TYP',rules: [{required: true, message: '必填项'}]},
                             { field: 'certCode', label: '证件号码',rules: [{required: true, message: '必填项'}]},*/
                            { field: 'signCapital', label: '注册资本（万元）',type: 'num',digit: 0,formatter: yufp.util.moneyFormatter,
                                rules: [{ required: true, message: '必填项,请填入数字', trigger: 'blur', type: 'number' }]},
                            { field: 'compyAddr', label: '公司地址',rules: [{required: true, message: '必填项'}]},
                            { field: 'postCode', label: '邮政编码'},
                            { field: 'email', label: '电子邮箱'},
                            { field: 'contactTel', label: '联系电话',rules: [{required: true, message: '必填项'}]},
                            { field: 'fax', label: '传真'},
                            { field: 'legalReprtive', label: '法人代表'},
                            { field: 'legalReprtiveTel', label: '法人代表电话'},
                            { field: 'busnsMainUser', label: '业务主管'},
                            { field: 'mainUserTel', label: '业务主管电话'},
                            { field: 'mainUserEmail', label: '业务主管邮箱'},
                            { field: 'busnsContactUser', label: '业务联系人'},
                            { field: 'contactUserTel', label: '业务联系人电话'},
                            { field: 'contactUserEmail', label: '业务联系人邮箱'}
                        ]
                    }],

                    //合作方关联产品
                    tableColumnsPartnerRelPro: [
                        { label: '产品编号', prop: 'prdId', sortable: true, resizable: true },
                        { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
                        { label: '产品类别', prop: 'prdSort', sortable: true, resizable: true,dataCode:'PRD_SORT'},
                        { label: '产品类型', prop: 'prdType', sortable: true, resizable: true,dataCode:'STD_PRD_TYPE'},
                        { label: '产品状态', prop: 'prdStatus', sortable: true, resizable: true,dataCode:'PRD_STATUS'}
                    ],

                    //合作方关联产品增加表单
                    relationInFoFieldsII: [{
                        columnCount: 3,
                        fields: [
                            { field: 'prdId', label: '产品编号',rules: [{required: true, message: '必填项'}]},
                            { field: 'partnerId', label: '合作方编号',rules: [{required: true, message: '必填项'}]},
                            { field: 'prdName', label: '产品名称',rules: [{required: true, message: '必填项'}]},
                            { field: 'prdSort', label: '产品类别',type:'select',dataCode:'PRD_SORT',rules: [{required: true, message: '必填项'}]},
                            { field: 'prdType', label: '产品类型',type:'select',dataCode:'STD_PRD_TYPE',rules: [{required: true, message: '必填项'}]},
                            { field: 'prdStatus', label: '产品状态',type:'select',dataCode:'PRD_STATUS',rules: [{required: true, message: '必填项'}]}

                        ]
                    }],

                    updateButtons: [
                        { label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                _self.dialogVisible = false;
                            } },
                        { label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                                var validate = false;
                                _self.$refs.partnerInfo.validate(function (valid) {
                                    validate = valid;
                                });
                                _self.$refs.cooperationInfo.validate(function (valid) {
                                    validate = valid;
                                });

                                _self.$refs.relationInfo.validate(function (valid) {
                                    validate = valid;
                                });
                                if (!validate) {
                                    _self.$message({message: '请按照规则填写必填内容', type: 'warning'});
                                    return;
                                }

                                var partner = _self.$refs.reftable.selections[0];
                                var partnerInfo = _self.$refs.partnerInfo.formModel;
                                var cooperationInfo = _self.$refs.cooperationInfo.formModel;
                                var relationInfo = _self.$refs.relationInfo.formModel;

                                yufp.util.copyObj(partner,partnerInfo)
                                yufp.util.copyObj(partner,cooperationInfo)
                                yufp.util.copyObj(partner,relationInfo)

                                var rMethod = '';
                                if(_self.viewType == "EDIT") {
                                    rMethod = 'PUT';
                                } else if(_self.viewType == "ADD") {
                                    rMethod = 'POST';
                                }
                                yufp.service.request({
                                    method: rMethod,
                                    url: backend.cusService + '/api/partner/info',
                                    data: partner,
                                    callback: function (code, message, response) {
                                        if (code == 0) {
                                            // _self.$refs.reftable.remoteData(model);
                                            _self.$refs.partnerInfo.resetFn();
                                            _self.$refs.cooperationInfo.resetFn();
                                            _self.$refs.relationInfo.resetFn();
                                            _self.$refs.reftable.remoteData();
                                            _self.$message('操作成功');
                                            _self.dialogVisible = false;
                                        } else {
                                            _self.$message('操作失败');
                                        }
                                    }
                                });
                            } },
                        {
                            label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                _self.dialogVisible = false
                            }
                        }
                    ],

                    /** 附件上传*/
                    dataUrlAnnex: backend.riskmService + '/api/mon/relief/ann',
                    baseParamsAnnex:{},
                    tableColumnsAnnex:[
                        { label: '申请流水号', prop: 'flowAppNo', sortable: true, resizable: true },
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

                    // 合作方资料管理页面
                    uploadDialogVisible:false,

                    height: yufp.frame.size().height - 103,
                    dialogVisible: false,
                    formDisabled: false,
                    relProDialogVisible: false,
                    exportDialogVisible: false,
                    exportFileName: "合作方信息",
                    viewType: 'DETAIL',
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    flag:false,
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
                    _self.updateButtons[0].hidden = !editable;
                    _self.updateButtons[1].hidden = !editable;
                    _self.updateButtons[2].hidden = true;
                    _self.formDisabled = !editable;
                    _self.dialogVisible = true;
                },

                switchParamStatus: function () {
                    var val = this.viewType == 'ADD';
                    this.$refs.partnerInfo.switch('lastUpdateUser', 'hidden', val);
                    this.$refs.partnerInfo.switch('lastUpdateTime', 'hidden', val);
                    this.$refs.partnerInfo.rebuildFn();
                },
                // //折叠面板展示选择函数
                // tagPartStatus:function(tagType){
                //     if(tagType){
                //         this.$refs.basecollapse.$children[3].$el.hidden = true;
                //         this.$refs.basecollapse.$children[4].$el.hidden = false;
                //     }else{
                //         this.$refs.basecollapse.$children[3].$el.hidden = false;
                //         this.$refs.basecollapse.$children[4].$el.hidden = true;
                //     }
                // },

                addFn: function () {
                    var _self = this;
                    _self.switchStatus('ADD', true);
                    _self.$nextTick(function () {
                        _self.$refs.partnerInfo.resetFn();
                        _self.$refs.partnerInfo.switch('partnerId', 'disabled', false);
                        _self.switchParamStatus();
                        _self.dialogVisible=true;
                        _self.$refs.cooperationInfo.resetFn();
                        _self.$refs.relationInfo.resetFn();
                        // _self.tagPartStatus(false);
                    });
                },
                modifyFn: function () {
                    var _self = this;
                    if (_self.$refs.reftable.selections.length != 1) {
                        _self.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    _self.switchStatus('EDIT', true);
                    _self.$nextTick(function () {
                        _self.switchParamStatus();
                        _self.$refs.partnerInfo.switch('partnerId', 'disabled', true);
                        var obj = this.$refs.reftable.selections[0];
                        var partnerId = obj.partnerId;
                        this.partnerRelProParams = {
                            partnerId: partnerId,
                        };

                        this.$refs.partnerRelPro.remoteData(this.partnerRelProParams);

                        _self.$refs.partnerInfo.resetFn();
                        _self.$refs.cooperationInfo.resetFn();
                        _self.$refs.relationInfo.resetFn();

                        var obj = _self.$refs.reftable.selections[0];

                        var objPart=yufp.util.copyObj(_self.$refs.partnerInfo.formModel, obj);
                        var objCoop=yufp.util.copyObj(_self.$refs.cooperationInfo.formModel,obj);
                        var objRela=yufp.util.copyObj(_self.$refs.relationInfo.formModel, obj);

                        yufp.extend(_self.$refs.partnerInfo.formModel, objPart);
                        yufp.extend(_self.$refs.cooperationInfo.formModel, objCoop,{cooprStartDt:new Date(obj.cooprStartDt),cooprEndDt:new Date(obj.cooprEndDt)});
                        yufp.extend(_self.$refs.relationInfo.formModel, objRela);
                        // _self.tagPartStatus(false);
                    });
                },

                infoFn: function () {
                    var _self = this;
                    if (_self.$refs.reftable.selections.length != 1) {
                        _self.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }

                    _self.switchStatus('DETAIL', false);
                    _self.$nextTick(function () {
                        _self.switchParamStatus();
                        var obj = this.$refs.reftable.selections[0];
                        var partnerId = obj.partnerId;
                        this.partnerRelProParams = {
                            partnerId: partnerId,
                        };

                        this.$refs.partnerRelPro.remoteData(this.partnerRelProParams);
                        // _self.tagPartStatus(true);
                        yufp.extend(_self.$refs.partnerInfo.formModel, obj);
                        yufp.extend(_self.$refs.cooperationInfo.formModel, obj);
                        yufp.extend(_self.$refs.relationInfo.formModel, obj);
                        yufp.extend(_self.$refs.partnerRelPro.formModel, obj);

                        _self.setPayAlertMark();
                        _self.setCostSetl();
                    });
                },

                deleteFn: function () {
                    var _self = this;
                    var selections = _self.$refs.reftable.selections;
                    if (selections.length < 1) {
                        _self.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var obj = this.$refs.reftable.selections[0];
                    var isUse = obj.isUse;
                    if (isUse == 'Y') {
                        this.$message({message: '当前为启用状态，不可删除！', type: 'warning'});
                        return;
                    }
                    _self.$confirm('点击确定将永久删除该数据，是否确认？','提示',{type:'warning'}).then(function(){
                        yufp.service.request({
                            method: 'DELETE',
                            url: backend.cusService + '/api/partner/info',
                            data: _self.$refs.reftable.selections[0],
                            callback: function (code, message, response) {
                                if (code == 0) {
                                    _self.$refs.reftable.remoteData();
                                    _self.$message('操作成功');
                                } else {
                                    _self.$message('操作失败');
                                }
                            }
                        });
                    }).catch(function(){});
                },
                exportFn: function () {
                    var _self = this;
                    var formValue = _self.$refs.queryForm.fm;
                    var cmisdata = {
                        partnerId:formValue.partnerId,
                        partnerName:formValue.partnerName
                    };
                    yufp.extend(cmisdata);
                    cmisdata.downloadifyCallBack = function(callback) {
                        _self.exportDialogVisible = true;
                        _self.$nextTick(function () {
                            var span = document.getElementById("exportSpan");
                            callback(span);
                        });
                    };
                    this.$confirm('是否导出数据?', '提示').then(function () {
                        yufp.util.exportExcelByTable({
                            fileName: _self.exportFileName,
                            importType: 'service',//page当前页 selected 选中的数据  service 后端数据
                            ref: _self.$refs.reftable,
                            method: 'POST',
                            url: backend.cusService+ "/api/partner/infos/export",
                            param:cmisdata
                        });
                    });
                },


                // 返回键
                cancleFn: function () {
                    var _self = this;
                    _self.$refs.partnerInfo.resetFields();
                    _self.$refs.cooperationInfo.resetFields();
                    _self.$refs.relationInfo.resetFields();
                    _self.dialogVisible = false;
                },

                //保存前确认
                saveFn: function (){
                    var _self = this;
                    var validate1 = false;
                    var validate2 = false;
                    var validate3 = false;
                    _self.$refs.partnerInfo.validate(function (valid) {
                        validate1 = valid;
                    });

                    _self.$refs.cooperationInfo.validate(function (valid) {
                        validate2 = valid;
                    });

                    _self.$refs.relationInfo.validate(function (valid) {
                        validate3 = valid;
                    });
                    if (!validate1 || !validate2 || !validate3) {
                        _self.$message({message: '请按照规则填写必填内容', type: 'warning'});
                        return;
                    }

                    _self.$confirm('保存后立即生效，请确认是否继续？', '提示').then(function (action) {
                        if (action === 'confirm') {
                            _self.saveConfirmFn();
                        }
                    });
                },

                //保存键
                saveConfirmFn: function () {
                    var _self = this;

                    var obj = _self.$refs.reftable.selections[0];
                    var partner = new Object();
                    var partnerInfo = _self.$refs.partnerInfo.formModel;
                    var cooperationInfo = _self.$refs.cooperationInfo.formModel;
                    var relationInfo = _self.$refs.relationInfo.formModel;

                    yufp.extend(partner,partnerInfo);
                    yufp.extend(partner,cooperationInfo);
                    yufp.extend(partner,relationInfo);
                    var rMethod = '';
                    if(_self.viewType == "EDIT") {
                        rMethod = 'PUT';
                    } else if(_self.viewType == "ADD") {
                        rMethod = 'POST';
                    }
                    yufp.service.request({
                        method: rMethod,
                        url: backend.cusService + '/api/partner/info',
                        data: partner,
                        callback: function (code, message, response) {
                            if (response.code == 0) {
                                _self.$refs.partnerInfo.resetFn();
                                _self.$refs.cooperationInfo.resetFn();
                                _self.$refs.relationInfo.resetFn();
                                _self.$refs.reftable.remoteData();
                                _self.$message('操作成功');
                                _self.dialogVisible = false;
                            } else {
                                _self.$message(response.message);
                            }
                        }
                    });
                },


                //合作方关联产品 返回键
                proBackFn: function () {
                    var _self = this;
                    _self.relProDialogVisible = false;
                },

                //合作方关联产品 保存键
                proSaveFn: function () {
                    var _self = this;

                    var validate = false;
                    this.$refs.proAddRef.validate(function (valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    _self.relProDialogVisible = false;
                    _self.$confirm('保存后立即生效，请确认是否继续？', '提示').then(function (action) {
                        if (action === 'confirm') {
                            _self.afterProSaveFn();
                        }
                    });
                },

                afterProSaveFn: function () {
                    var _self = this;
                    var obj = _self.$refs.proAddRef.formModel;
                    yufp.service.request({
                        method: 'POST',
                        url: backend.cusService + '/api/partner/prd/info',
                        data:obj,
                        callback: function (code, message, response) {
                            if (response.success) {
                                _self.$refs.proAddRef.resetFields();
                                _self.$message('操作成功');
                                // _self.$refs.partnerRelPro.remoteData();
                                _self.relProDialogVisible = false;
                            } else {
                                _self.$message(response.message);
                            }
                        }
                    });
                },

                //合作方关联产品 增加键
                productAddFn: function () {
                    var _self = this;
                    _self.relProDialogVisible = true;
                    // _self.switchStatus('ADD', true);
                    _self.$nextTick(function () {
                        // var obj = _self.$refs.reftable.selections[0];
                        // yufp.extend(_self.$refs.proAddRef.formModel,obj);
                        _self.$refs.proAddRef.resetFields();
                        // _self.$refs.partnerRelPro.remoteData();
                    });
                },

                //合作方关联产品 删除键
                productDelFn: function () {
                    var _self = this;
                    var selections = _self.$refs.partnerRelPro.selections;
                    if (selections.length < 1) {
                        _self.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    _self.$confirm('是否删除?','提示',{type:'warning'}).then(function(){
                        yufp.service.request({
                            method: 'DELETE',
                            url: backend.cusService + '/api/partner/prd/info',
                            data: _self.$refs.partnerRelPro.selections[0],
                            callback: function (code, message, response) {
                                if (code == 0) {
                                    _self.$refs.partnerRelPro.remoteData();
                                    _self.$message('操作成功');
                                } else {
                                    _self.$message('操作失败');
                                }
                            }
                        });
                    }).catch(function(){});
                },

                uploadAnnexFile: function () {
                    var _self = this;
                    var selections = _self.$refs.reftable.selections;
                    if (selections.length != 1) {
                        _self.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    _self.uploadDialogVisible = true;
                    var partnerId = selections[0].partnerId;
                    _self.baseParamsAnnex = {
                        flowAppNo:partnerId,
                        bizSerno:partnerId
                    }
                    _self.$nextTick(function () {
                        _self.$refs.reftableAnnex.remoteData(_self.baseParamsAnnex);
                    });
                },
                //设置赔付警戒标志
                setPayAlertMark: function () {
                    var _self = this;
                    var payAltRat = _self.$refs.cooperationInfo.formModel.payAlertRatio;

                    //判断赔付警戒比例
                    if(null!=payAltRat && ""!=payAltRat){
                        yufp.service.request({
                            method: 'POST',
                            url: backend.cusService + '/api/get/bad/loan/ratio',
                            data: {partnerId: _self.$refs.partnerInfo.formModel.partnerId},
                            callback: function (code, message, response) {
                                if (code == 0 && response.code == 0) {
                                    if(response.rows > payAltRat){
                                        _self.$refs.cooperationInfo.formModel.payAlertMark = "严重";
                                    }else{
                                        _self.$refs.cooperationInfo.formModel.payAlertMark = "正常";
                                    }
                                } else {
                                }
                            }
                        });
                    }
                },

                //设置费用结算
                setCostSetl: function () {
                    var _self = this;
                    var costTyp = _self.$refs.cooperationInfo.formModel.costType;
                    var obj = _self.$refs.cooperationInfo.formModel;
                    var obj =  yufp.extend(obj, {partnerId: _self.$refs.partnerInfo.formModel.partnerId});
                    if(null!=costTyp && ""!=costTyp){
                        yufp.service.request({
                            method: 'POST',
                            url: backend.cusService + '/api/get/cost/fee',
                            data: obj,
                            callback: function (code, message, response) {
                                if (code == 0 && response.code == 0) {
                                    _self.$refs.cooperationInfo.formModel.costSetl = response.rows;
                                } else {
                                }
                            }
                        });
                    }
                },
                /**附件上传相关*/
                uploadAnnexFn: function () {
                    var _self = this;
                    _self.dialogVisibleAnnex = true;
                    _self.annexFormDisabled = false;
                    _self.flag = '';
                    var colltTaskNo = _self.$refs.reftable.selections[0].partnerId;
                    _self.$nextTick(function () {
                        yufp.extend(_self.$refs.annexForm.formModel,
                            {flowAppNo:colltTaskNo},
                            {bizSerno:colltTaskNo},
                            {uploadUser:yufp.session.userCode});
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
                    var rMethod = 'POST';
                    var msg = '此操作将保存数据,且保存本地记录后将前往影像平台新增影像资料，是否继续？';
                    var right = '1100000';
                    var date = yufp.util.dateFormat(new Date().getTime(), '{y}{m}{d}');
                    var cmisdata = {};
                    yufp.extend(cmisdata, _self.$refs.annexForm.formModel);
                    _self.$confirm(msg, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function (action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: rMethod,
                                    url: backend.riskmService + '/api/collt/task/distrs/uploadFile/his',
                                    data: cmisdata,
                                    callback: function (code, message, response) {
                                        if (response.code == 0) {
                                            var dat = response.rows;
                                            _self.baseParamsAnnex = { flowAppNo : dat , bizSerno : dat };
                                            _self.$refs.reftableAnnex.remoteData(_self.baseParamsAnnex);
                                            _self.dialogVisibleAnnex = false;
                                            _self.postWindow(_self.baseParamsAnnex.bizSerno,date,right);
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
                                _self.$message("获取影像系统信息失败：" + response.message);
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

                updateBackFn: function () {
                    var _self = this;
                    _self.uploadDialogVisible = false;
                },

            } //end of methods
        });
    };
    // 消息处理
    exports.onmessage = function (type, message) {

    };
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {

    }

});
