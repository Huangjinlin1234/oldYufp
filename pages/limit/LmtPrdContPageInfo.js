/**
 * @create by wanglh4
 * @description 授信额度查询的前端js
 * @createDate 2019-03-14 21:10:16
 */
define(function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        //引入字典项
        yufp.lookup.reg('CRUD_TYPE,STD_ZB_APPR_STATUS,STD_ZB_ADJ_STATUS,STD_ZB_CERT_TYP,STD_ZB_ADJ_TYPE,STD_ZB_ADJ_BASE,STD_ZB_LMT_REJECT_RSN,STD_ZB_TERM_TYPE');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
            var _self = this;
            return {
            	dataUrl:backend.creditService + '/api/lmt/prd/conts',
                baseParams: {
                },
                baseTab: 'baseTab',
                expandCollapseName: ['identityInfo', 'backgroundInfo', 'indivMarInFo'],
                //搜索条件
                queryFields: [
                    {placeholder: '授信协议编号', field: 'lmtContNo', type: 'input'},
                    {placeholder: '授信申请编号', field: 'lmtApplySeq', type: 'input'},
                    {placeholder: '额度状态', field: 'lmtStatus', type: 'select',dataCode:'LIMIT_STS'},
                    {placeholder: '渠道名称', field: 'channelNo', type: 'select',dataCode:'APPLY_CHANNEL_TYPE'},
                    {placeholder: '产品名称', field: 'prdName', type: 'input'},
                    {placeholder: '客户编号', field: 'cusId', type: 'input'},
                    {placeholder: '客户姓名', field: 'cusName', type: 'input'},
                    {placeholder: '证件类型', field: 'certType', type: 'select',dataCode:'STD_ZB_CERT_TYP'},
                    {placeholder: '证件号码', field: 'certCode', type: 'input'}
                ],
                queryButtons: [
                    {label:'查询', op: 'submit', type:'primary', icon:'search', click:function (model, valid) {
                        if (valid) {
                            _self.$refs.reftable.remoteData(model);
                        }
                    }},
                    {label:'重置', op:'reset', type:'primary', icon:'yx-loop2'}
                ],
                tableColumns: [
                    {label:'授信协议编号', prop:'lmtContNo', sortable:true, resizable:true},
                    {label:'授信申请编号', prop:'lmtApplySeq', sortable:true, resizable:true},
                    {label:'客户编号', prop:'cusId', sortable:true, resizable:true},
                    {label:'客户姓名', prop:'cusName', sortable:true, resizable:true},
                    {label:'证件类型', prop:'certType', sortable:true, resizable:true,dataCode:'STD_ZB_CERT_TYP'},
                    {label:'证件号码', prop:'certCode', sortable:true, resizable:true},
                    {label:'渠道名称', prop:'channelNo', sortable:true, resizable:true,dataCode:'APPLY_CHANNEL_TYPE'},
                    {label:'产品名称', prop:'prdName', sortable:true, resizable:true},
                    {label:'授信额度', prop:'lmtAmt', sortable:true, resizable:true},
                    {label:'可用额度', prop:'availAmt', sortable:true, resizable:true},
                    {label:'额度有效期', prop:'term', sortable:true, resizable:true},
                    {label:'额度有效期类型', prop:'termType', sortable:true, resizable:true,dataCode:'STD_ZB_TERM_TYPE'},
                    {label:'有效期起', prop:'startDate', sortable:true, resizable:true},
                    {label:'有效期至', prop:'expireDate', sortable:true, resizable:true},
                    {label:'额度状态', prop:'lmtStatus', sortable:true, resizable:true,dataCode:'LIMIT_STS'}
                ],
                updateFields: [{
                    columnCount: 3,
                    fields: [
                        {field:'lmtApplySeq', label:'授信申请编号'},
                        {field:'cusId', label:'客户编号'},
                        {field:'cusName', label:'客户名称'},
                        {field:'certType', label:'证件类型',type:'select',dataCode:'STD_ZB_CERT_TYP'},
                        {field:'certCode', label:'证件号码'},
                        {field:'channelNo', label:'渠道名称',type:'select',dataCode:'APPLY_CHANNEL_TYPE'},
                        {field:'prdName', label:'产品名称'},
                        {field:'lmtAmt', label:'授信额度'},//
                        {field:'availAmt', label:'可用额度'},
                        {field:'preOccAmt', label:'预占用额度'},
                        {field:'occAmt', label:'已占用额度'},
                        {field:'term', label:'额度有效期'},
                        {field:'termType', label:'额度有效期类型',type:'select',dataCode:'STD_ZB_TERM_TYPE'},
                        {field:'startDate', label:'生效日期'},
                        {field:'expireDate', label:'失效日期'},
                        {field:'repaymentMode', label:'还款方式',type:'select',dataCode:'STD_PRD_REPAY_MODE'},
                        {field:'cyclicFlg', label:'是否循环',type:'select',dataCode:'CYCLIC_FLG'},
                        {field:'rateY', label:'年利率'},
                        {field:'lmtStatus', label:'额度状态',type:'select',dataCode:'LIMIT_STS'},
                        {field:'loanAccount', label:'放款账户'},
                        {field:'recvAccount', label:'还款账户'}
                    ]
                }],

                updateButtons: [
                    {label:'返回', type:'primary', icon:'yx-undo2', hidden:false, click:function (model) {
                        _self.dialogVisible = false;
                    }},
                    {label:'保存', type:'primary', icon:'check', hidden:false, click:function (model) {
                        var validate = false;
                        _self.$refs.reform.validate(function (valid) {
                            validate = valid;
                        });
                        if (!validate) {
                            return;
                        }
                        var rMethod = '';
                        if(_self.viewType == "EDIT") {
                            rMethod = 'PUT';
                        } else if(_self.viewType == "ADD") {
                            rMethod = 'POST';
                        }
                        yufp.service.request({
                            method: rMethod,
                            url: '',
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
                    }}
                ],

                //客户信息-身份信息
                identityInfoFields: [{
                    columnCount: 3,
                    fields: [
                        {field: 'cusId', label: '客户号', disabled: true},
                        {field: 'cusName', label: '客户名称'},
                        {field: 'indivSex', label: '性别', type: 'select', dataCode: 'STD_ZX_SEX'},
                        {field: 'indivDtOfBirth', label: '出生日期', type: 'date', editable: false},//,type:'date'
                        {field: 'certType', label: '证件类型', type: 'select', dataCode: 'STD_ZB_CERT_TYP'},
                        {field: 'certCode', label: '证件号码'},
                        {field: 'phone', label: '手机号码'},
                        {field: 'fstAppChannel', label: '首次申请渠道', disabled: true, type: 'select', dataCode: 'APPLY_CHANNEL_TYPE'},
                        {field: 'indivRsdAddr', label: '居住地址'},
                        {field: 'indivNtn', label: '民族', type: 'select', dataCode: 'STD_ZB_NATION'},
                        {field: 'indivComName', label: '工作单位名称', disabled: true},
                        {field: 'indivComTyp', label: '单位性质', type: 'select', dataCode: 'STD_ZB_REG_TYPE'},
                        {field: 'indivCrtfctn', label: '职称', type: 'select', dataCode: 'STD_ZX_TITLE'},
                        {field: 'indivOcc', label: '职业', disabled: true, type: 'select', dataCode: 'STD_ZX_EMPLOYMET'},
                        {
                            field: 'indivAnnIncm',
                            label: '个人月收入(元)',
                            disabled: true,
                            type: 'num',
                            formatter: function (cellValue) {
                                if (typeof (cellValue) == 'undefined' || cellValue == null || isNaN(cellValue))
                                    return;
                                return yufp.util.moneyFormatter(cellValue, 2);
                            }
                        },  //年收入情况
                        {field: 'postAddr', label: '通讯地址'},
                        {field: 'postCode', label: '邮政编码'},
                        {
                            field: 'indivMarSt', label: '婚姻状况', type: 'select', dataCode: 'STD_ZX_MARR_STATUS'/*,
                            change: function (fields) {
                                if (fields == "20" || fields == "21" || fields == "22" || fields == "23") {
                                    _self.$refs.basecollapse.$children[2].$el.hidden = false;
                                    _self.$refs.indivMarInFo.formRules.indivSpsName[0].required = true;
                                } else {
                                    _self.$refs.basecollapse.$children[2].$el.hidden = true;
                                    _self.$refs.indivMarInFo.formRules.indivSpsName[0].required = false;
                                }
                            }*/
                        },
                        {field: 'inputId', label: '创建人', disabled: true},
                        {field: 'createTime', label: '创建时间', disabled: true},
                        {field: 'lastUpdateUser', label: '最后修改人', disabled: true},
                        {field: 'lastUpdateTime', label: '最后修改时间', disabled: true}
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
                        {
                            field: 'familyMincm',
                            label: '家庭月收入(元)',
                            disabled: true,
                            type: 'num',
                            formatter: function (cellValue) {
                                if (typeof (cellValue) == 'undefined' || cellValue == null || isNaN(cellValue))
                                    return;
                                return yufp.util.moneyFormatter(cellValue, 2);
                            },
                            rules: [{validator: yufp.validator.number, message: '必须填写数字', trigger: 'blur'}]
                        },
                        {
                            field: 'indivHealSt',
                            label: '健康状况',
                            type: 'select',
                            dataCode: 'STD_ZB_HEAL_ST',
                            hidden: true
                        },
                        {
                            field: 'hasFamilyMember',
                            label: '是否有家庭成员',
                            type: 'select',
                            dataCode: 'STD_ZX_YES_NO',
                            hidden: true
                        }
                    ]
                }],

                //客户信息-婚姻状况
                indivMarInFoFields: [{
                    columnCount: 3,
                    fields: [
                        {field: 'indivSpsName',label: '配偶姓名',rules: [{required: false, message: '已婚客户，此项必填!', trigger: 'blur'}]},
                        {field: 'indivSpsMphn', label: '手机号码'},
                        {field: 'indivSpsPhone', label: '配偶联系电话'},
                        {field: 'indivSpsIdTyp',label: '配偶证件类型',type: 'select',dataCode: 'STD_ZB_CERT_TYP',hidden: true},
                        {field: 'indivSpsIdCode', label: '配偶证件号码', hidden: true},
                        {field: 'indivSpsIdPeriod', label: '配偶证件有效期', type: 'date', editable: false, hidden: true},
                        {field: 'indivScomName', label: '工作单位', hidden: true},
                        {field: 'indivSpsPhn', label: '单位电话', hidden: true}
                    ]
                }],

                rebackButtons:[
                    {
                        label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                            _self.dialogVisible = false;
                        }
                    }
                ],

                height: yufp.frame.size().height - 103,
                dialogVisible: false,
                formDisabled: false,
                viewType: 'DETAIL',
                viewTitle: yufp.lookup.find('CRUD_TYPE', false)
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
                    // _self.updateButtons[0].hidden = !editable;
                    _self.updateButtons[1].hidden = !editable;
                    _self.formDisabled = !editable;
                     _self.dialogVisible = true;
                },
                addFn: function () {
                    var _self = this;
                    _self.switchStatus('ADD', true);
                    _self.$nextTick(function () {
                        _self.$refs.reform.resetFn();
                    });
                },
                modifyFn: function () {
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

                infoFn: function () {
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    this.switchStatus('DETAIL', false);
                    var obj = this.$refs.reftable.selections[0];
                    this.$nextTick(function () {
                        yufp.extend(this.$refs.reform.formModel, obj);
                        this.queryCusInfo(obj.certCode);
                    });
                },

                deleteFn: function () {
                    var _self = this;
                    var selections = _self.$refs.reftable.selections;
                    if (selections.length < 1) {
                        _self.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    
                    yufp.service.request({
                        method: 'DELETE',
                        url: '',
                        data: {
                            adjSerno: selections[0].adjSerno
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
                },

                //查询客户信息
                queryCusInfo: function (cusId) {
                    var _self = this;
                    _self.$nextTick(function () {
                        yufp.service.request({
                            method: "GET",
                            url: backend.cusService + '/api/cus/indiv/' + cusId,
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
                                    // _self.$message("获取客户信息失败：" + response.message);
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
                }
            }
        });
    };
    // 消息处理
    exports.onmessage = function (type, message) {};
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {}
});
