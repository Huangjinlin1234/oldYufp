/**
 * @create by chenqm1 on 2018-05-04
 * @description 个人客户信息表
 */
define([
    './custom/widgets/js/AddrDicSelecter.js'
], function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('STD_ZB_CERT_TYP,STD_ZX_SEX,STD_ZX_MARR_STATUS,STD_LOAN_USE,STD_ZB_ACT_STSREPAY_DAY_TYPE,STD_ZB_ASSURE_MEANS,APPLY_CHANNEL_TYPE,' +
            'LOAN_STATUS,STD_YES_NO,STD_ZX_EMPLOYMET,CONT_TYPE,STD_ZB_CONT_STATUS,NLS_APPLY_STATE,STD_ZB_TERM_TYPE,BD_POLCY_CD,BD_INCM_AMT_LVL,CYCLIC_FLG,' +
            'STD_ZB_CRD_LMT_TYPE,STD_PRD_REPAY_MODE,STD_ZB_ACC_STATUS,STD_ZX_YES_NO,REL_COUNTRY_TAX,ZB_POS_LEVEL,WORKING_STATE,HED_IMAGE_TYPE');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    baseTab: 'baseTab',
                    dataUrl: backend.cusService + "/api/cus/indivs",
                    dataUrlNlsApp: backend.creditService + '/api/nlsApplyInfo/by', //客户放款申请信息列表
                    dataUrlLoan: backend.creditService + '/api/acc/loans/by/cust',  //借据信息列表
                    dataUrlNlsCredit: backend.creditService + '/api/nls/credit/infos/by/cust',//授信申请详情列表
                    dataUrlImages: backend.edocService +'/api/query/image/platfrom/hed/files',
                    baseParams: {
                    },
                    baseParamsNlsApp: {},
                    baseParamsLoan: {},
                    baseParamImages: {},
                    baseParamsNlsCredit: {},
                    expandCollapseName: ['identityInfo', 'backgroundInfo', 'indivMarInFo', 'creditInfo', 'baiduItem'],
                    queryFields: [
                        {placeholder: '客户编号', field: 'cusId', type: 'input'},
                        {placeholder: '客户名称', field: 'cusName', type: 'input'},
                        {placeholder: '证件类型', field: 'certType', type: 'select', dataCode: 'STD_ZB_CERT_TYP'},
                        {placeholder: '证件号码', field: 'certCode', type: 'input'},
                        {placeholder: '三要素是否修改', field: 'threeEleNotes', type: 'select',dataCode: 'STD_ZX_YES_NO'}
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
                        {label: '客户编号', prop: 'cusId', sortable: true, resizable: true},
                        {label: 'ECIF正式客户号', prop: 'selfCusId',width:150, sortable: true, resizable: true},
                        {label: '客户名称', prop: 'cusName', sortable: true, resizable: true},
                        {label: '证件类型', prop: 'certType', sortable: true, resizable: true, dataCode: 'STD_ZB_CERT_TYP'},
                        {label: '证件号码', prop: 'certCode', sortable: true, resizable: true},
                        {label: '性别', prop: 'indivSex', sortable: true, resizable: true, dataCode: 'STD_ZX_SEX'},
                        {label: '手机号码', prop: 'phone', sortable: true, resizable: true},
                        {label: '首次申请渠道', prop: 'fstAppChannel', sortable: true, resizable: true, dataCode: 'APPLY_CHANNEL_TYPE'},
                        {label: '创建时间', prop: 'createTime', sortable: true, resizable: true},
                        {label: '三要素修改记录', prop: 'threeEleNotes',width:400, sortable: true, resizable: true},
                        {label: '国籍', prop: 'indivCountry', sortable: true, resizable: true,hidden:true},
                        {label: '证件到期日', prop: 'indivIdExpDt', sortable: true, resizable: true,hidden:true},
                        // {label: '婚姻状况', prop: 'indivMarSt', sortable: true, resizable: true, dataCode: 'STD_ZX_MARR_STATUS', hidden: true}
                    ],

                    //申请人基本信息-身份信息
                    identityInfoFields: [{
                        columnCount: 3,
                        fields: [
                            {field: 'cusId', label: '客户编号', disabled: true, disabled: true},
                            {field: 'selfCusId', label: 'ECIF正式客户号', disabled: true},
                            {field: 'cusName', label: '客户名称', disabled: true},
                            {field: 'indivSex', label: '性别', type: 'select', dataCode: 'STD_ZX_SEX', disabled: true},
                            {field: 'indivDtOfBirth', label: '出生日期', type: 'date', disabled: true},//,type:'date'
                            {field: 'certType', label: '证件类型', type: 'select', dataCode: 'STD_ZB_CERT_TYP', disabled: true},
                            {field: 'certCode', label: '证件号码', disabled: true},
                            {field: 'phone', label: '手机号码', disabled: true},
                            {field: 'fstAppChannel', label: '首次申请渠道', disabled: true, type: 'select', dataCode: 'APPLY_CHANNEL_TYPE'},
                            {field: 'indivRsdAddr', label: '居住地址', disabled: true},
                            {field: 'indivNtn', label: '民族', type: 'select', dataCode: 'STD_ZB_NATION', disabled: true},
                            {field: 'indivComName', label: '工作单位名称', disabled: true},
                            {field: 'indivComTyp', label: '单位性质', type: 'select', dataCode: 'STD_ZB_REG_TYPE', disabled: true},
                            {field: 'indivCrtfctn', label: '职称', type: 'select', dataCode: 'STD_ZX_TITLE', disabled: true},
                            {field: 'indivOcc', label: '职业', disabled: true, type: 'select', dataCode: 'STD_ZX_EMPLOYMET'},
                            {field: 'posLevel', label: '职务级别', disabled: true, resizable: true, type: 'select', dataCode: 'ZB_POS_LEVEL'},
                            {field: 'workStatus', label: '在岗状态', disabled: true, resizable: true, type: 'select',dataCode: 'WORKING_STATE'},
                            {field: 'svcWorkMonths', label: '在职月数', disabled: true, resizable: true},
                            {
                                field: 'indivAnnIncm',
                                label: '个人月收入(元)',
                                disabled: true,
                                type: 'num',
                                formatter: function (cellValue) {
                                    if (typeof (cellValue) == 'undefined' || cellValue == null || isNaN(cellValue))
                                        return;
                                    return yufp.util.moneyFormatter(cellValue, 2);
                                }, disabled: true
                                // , rules: [{validator: yufp.validator.number, message: '必须填写数字', trigger: 'blur'}]
                            },  //年收入情况
                            {field: 'postAddr', label: '通讯地址', disabled: true},
                            {field: 'postCode', label: '邮政编码', disabled: true},
                            {
                                field: 'indivMarSt', label: '婚姻状况', type: 'select', dataCode: 'STD_ZX_MARR_STATUS', disabled: true
                                // change: function (fields) {
                                //     if (fields == "20" || fields == "21" || fields == "22" || fields == "23") {
                                //         _self.$refs.basecollapse.$children[2].$el.hidden = false;
                                //         _self.$refs.indivMarInFo.formRules.indivSpsName[0].required = true;
                                //           _self.$refs.indivMarInFo.formRules.indivSpsIdTyp[0].required = true;
                                //           _self.$refs.indivMarInFo.formRules.indivSpsIdCode[0].required = true;
                                //           _self.$refs.indivMarInFo.formRules.indivSpsIdPeriod[0].required = true;
                                //     } else {
                                //         _self.$refs.basecollapse.$children[2].$el.hidden = true;
                                //         _self.$refs.indivMarInFo.formRules.indivSpsName[0].required = false;
                                //           _self.$refs.indivMarInFo.formRules.indivSpsIdTyp[0].required = false;
                                //           _self.$refs.indivMarInFo.formRules.indivSpsIdCode[0].required = false;
                                //           _self.$refs.indivMarInFo.formRules.indivSpsIdPeriod[0].required = false;
                                //     }
                                // }
                            },
                            {field: 'inputId', label: '创建人', disabled: true},   //登记人
                            {field: 'createTime', label: '创建时间', disabled: true},
                            {field: 'lastUpdateUser', label: '最后修改人', disabled: true},
                            {field: 'lastUpdateTime', label: '最后修改时间', disabled: true},
                            {field: 'indivCountry', label: '国籍', disabled: true, type: 'select',dataCode: 'REL_COUNTRY'},
                            {field: 'indivIdExpDt', label: '证件到期日', disabled: true}
                        ]
                    }],

                    //申请人基本信息-背景信息
                    backgroundInfoFields: [{
                        columnCount: 3,
                        fields: [
                            {field: 'indivEdt', label: '最高学历', type: 'select', dataCode: 'ZB_DEGREE', disabled: true},
                            {field: 'agriFlg', label: '是否农户', type: 'select', dataCode: 'STD_YES_NO', disabled: true},
                            {field: 'familyAddr', label: '家庭地址'},
                            {field: 'fphone', label: '家庭电话', disabled: true},
                            {
                                field: 'familyMincm',
                                label: '家庭月收入(元)',
                                disabled: true,
                                type: 'num',
                                formatter: function (cellValue) {
                                    if (typeof (cellValue) == 'undefined' || cellValue == null || isNaN(cellValue))
                                        return;
                                    return yufp.util.moneyFormatter(cellValue, 2);
                                }, disabled: true,
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

                    //申请人基本信息-婚姻状况
                    indivMarInFoFields: [{
                        columnCount: 3,
                        fields: [
                            {field: 'indivSpsName',label: '配偶姓名',rules: [{required: false, message: '已婚客户，此项必填!', trigger: 'blur'}], disabled: true},
                            {field: 'indivSpsMphn', label: '手机号码', disabled: true},
                            {field: 'indivSpsPhone', label: '配偶联系电话', disabled: true},
                            {field: 'indivSpsIdTyp',label: '配偶证件类型',type: 'select',dataCode: 'STD_ZB_CERT_TYP',hidden: true},
                            {field: 'indivSpsIdCode', label: '配偶证件号码', hidden: true},
                            {field: 'indivSpsIdPeriod', label: '配偶证件有效期', type: 'date', editable: false, hidden: true},
                            {field: 'indivScomName', label: '工作单位', hidden: true},
                            {field: 'indivSpsPhn', label: '单位电话', hidden: true}
                        ]
                    }],

                    //授信申请信息
                    creditApplReftableColumns: [
                        {label: '授信申请流水号', prop: 'lmtApplySeq', sortable: true, resizable: true, width: '150'},
                        {
                            label: '渠道名称',
                            prop: 'channelNo',
                            sortable: true,
                            resizable: true,
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
                        {
                            label: '授信金额(元)', prop: 'approveAmt', sortable: true, resizable: true, width: '150',
                            formatter: function (row, column, cellValue) {
                                if (!row.approveAmt) {
                                    return row.approveAmt;
                                } else {
                                    return yufp.util.moneyFormatter(row.approveAmt, 2);
                                }
                            }
                        },
                        {
                            label: '是否循环',
                            prop: 'cyclicFlg',
                            sortable: true,
                            resizable: true,
                            type: 'select',
                            dataCode: 'CYCLIC_FLG'
                        },
                        {label: '授信有效期', prop: 'applyTerm', sortable: true, resizable: true, width: '150'},
                        {
                            label: '授信有效期类型',
                            prop: 'termType',
                            sortable: true,
                            resizable: true,
                            dataCode: 'STD_ZB_TERM_TYPE',
                            width: '150'
                        },
                        {label: '进件日期', prop: 'applyDate', sortable: true, resizable: true},
                        {label: '客户经理', prop: 'cusManager', sortable: true, resizable: true, hidden: true},
                        {label: '客户经理', prop: 'cusManagerName', sortable: true, resizable: true},
                        {label: '主管机构', prop: 'nlsOperOrgid', sortable: true, resizable: true, hidden: true},
                        {label: '主管机构', prop: 'nlsOperOrgName', sortable: true, resizable: true},
                        {label: '贷款用途', prop: 'loanUseType', sortable: true, resizable: true, dataCode: 'STD_LOAN_USE'},
                        {label: '审批状态', prop: 'apprvSts', sortable: true, resizable: true, dataCode: 'NLS_APPLY_STATE'},
                        {label: '审批日期', prop: 'apprvDate', sortable: true, resizable: true, hidden: false}
                    ],

                    //放款申请详细信息       /** 按照放款申请信息表nls_apply_loanpay展示  **/
                    loanApplInFoFields: [{
                        columnCount: 3,
                        fields: []
                    }],

                    //客户放款申请信息列表
                    tableColumnsLoanAppl: [
                        {label: '用信申请流水号', prop: 'applySeq', sortable: true, resizable: true, width: '180'},
                        {
                            label: '渠道名称',
                            prop: 'channelNo',
                            sortable: true,
                            resizable: true,
                            dataCode: 'APPLY_CHANNEL_TYPE',
                            hidden: true
                        },
                        {label: '客户编号', prop: 'cusId', sortable: true, resizable: true, hidden: true},
                        {label: '客户名称', prop: 'cusName', sortable: true, resizable: true},
                        {label: '证件类型', prop: 'certType', sortable: true, resizable: true, dataCode: 'STD_ZB_CERT_TYP'},
                        {label: '证件号码', prop: 'certCode', sortable: true, resizable: true, width: '150'},
                        {label: '产品名称', prop: 'prdName', sortable: true, resizable: true},
                        {
                            label: '申请金额（元）', prop: 'applyAmt', sortable: true, resizable: true,
                            formatter: function (row, column, cellValue) {
                                return yufp.util.moneyFormatter(cellValue, 2);
                            }
                        },
                        {label: '申请时间', prop: 'applyTime', sortable: true, resizable: true, width: '150'},
                        {label: '贷款期限', prop: 'loanTerm', sortable: true, resizable: true}, // 贷款期限 + 期限类型
                        {
                            label: '网贷申请状态',
                            prop: 'nlsApplyState',
                            sortable: true,
                            resizable: true,
                            dataCode: 'NLS_APPLY_STATE',
                        },
                        {
                            label: '放款金额（元）', prop: 'amountOfLoan', sortable: true, resizable: true,
                            formatter: function (row, column, cellValue) {
                                return yufp.util.moneyFormatter(cellValue, 2);
                            }
                        },
                        {label: '放款状态', prop: 'dnSts', sortable: true, resizable: true, dataCode: 'LOAN_STATUS'},
                        {label: '最后修改时间', prop: 'lastModifyTime', sortable: true, resizable: true},
                    ],

                    //借款详细信息                  /** 按照贷款表ctr_loan_cont展示  **/
                    /*loanCtrInFoFields: [{
                        columnCount: 3,
                        fields: []
                    }],*/

                    //客户借款信息
                    tableColumnsLoanCtr: [
                        {label: '借据编号', prop: 'billNo', sortable: true, resizable: true, width: 200},
                        {label: '产品编号', prop: 'prdCode', sortable: true, resizable: true},
                        {label: '产品名称', prop: 'prdName', sortable: true, resizable: true},
                        {label: '客户编号', prop: 'cusId', sortable: true, resizable: true},
                        {label: '客户名称', prop: 'cusName', sortable: true, resizable: true},
                        {label: '证件类型', prop: 'certType', sortable: true, resizable: true, dataCode: 'STD_ZB_CERT_TYP'},
                        {label: '证件号码', prop: 'certCode', sortable: true, resizable: true},
                        {label: '借据金额（元）', prop: 'loanAmount', sortable: true, resizable: true,
                            formatter: function (row, column, cellValue) {
                                if(cellValue == null || cellValue == ''){
                                    return cellValue;
                                }
                                return yufp.util.moneyFormatter(cellValue, 2);
                            }},
                        {label: '借据余额（元）', prop: 'loanBalance', sortable: true, resizable: true,
                            formatter: function (row, column, cellValue) {
                                if(cellValue == null || cellValue == ''){
                                    return cellValue;
                                }
                                return yufp.util.moneyFormatter(cellValue, 2);
                            }
                        },
                        {label: '借据状态', prop: 'accountStatus', sortable: true, resizable: true, type: 'select', dataCode: 'STD_ZB_ACC_STATUS'},
                        {label: '最后修改时间', prop: 'lastUpdateTime', sortable: true, resizable: true},

                    ],

                    //影像信息
                    tableColumnsImages: [
                        { label: '流水号', prop: 'applySeq', sortable: false, resizable: true },
                        { label: '影像类型', prop: 'imageType', sortable: false, resizable: true, dataCode: 'HED_IMAGE_TYPE' },
                        { label: '影像批次号', prop: 'batch', sortable: false, resizable: true, width: '480',
                            template: function () {
                                return '<template scope="scope">\
	     			  			<a href="javascript:void(0);" style="text-decoration:underline;"@click="_$event(\'custom-row-click\', scope.row)">{{ scope.row.batch }}</a>\
	     			  		  </template>';
                            } },
                        { label: '上传状态', prop: 'state', sortable: false, resizable: true },
                        { label: '进件日期', prop: 'startDate', sortable: true, resizable: true },
                        { label: '上传时间', prop: 'createTime', sortable: true, resizable: true },
                        { label: '产品', prop: 'prdName', sortable: false, resizable: true }
                    ],

                    //还款计划
                    /*repayPlanInFoFields: [{
                        columnCount: 3,
                        fields: [
                            {field: 'loanNo', label: '借据编号'},
                            {field: 'applySeq', label: '期号', editable: false},
                            {field: 'ctrNo', label: '到期日', editable: false},
                            {field: 'loanEndDate', label: '账单日', editable: false},
                            {field: 'sbsyRate', label: '贴息利率'},
                            {field: 'periAmt', label: '期供金额'},
                            {field: 'principal', label: '本金'},
                            {field: 'normalInt', label: '正常利息'},
                            {field: 'overInt', label: '逾期利息', editable: false},
                            {field: 'compInt', label: '复利', editable: false},
                            {field: 'sbsyAmt', label: '贴息金额'},
                            {field: 'feeAmt', label: '费用金额'}
                        ]
                    }],*/

                    updateButtons: [
                        {
                            label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {

                                // var cus = _self.$refs.reftable.selections[0];
                                //yufp.util.copyObj(cus ,_self.$refs.backgroundInfo.formModel);
                                // yufp.util.copyObj(cus, _self.$refs.identityInfo.formModel);
                                //yufp.util.copyObj(cus ,_self.$refs.contInFo.formModel);
                                //yufp.util.copyObj(cus ,_self.$refs.comInFo.formModel);
                                // var idenInfo = false;
                                // var backInfo = false;
                                // var MarInFo = false;
                                // var conInFo = false;

                                // _self.$refs.identityInfo.validate(function (valid) {
                                //     idenInfo = valid;
                                // });
                                /*_self.$refs.backgroundInfo.validate(function (valid) {
                                    backInfo = valid;
                                });*/
                                /*_self.$refs.contInFo.validate(function (valid) {
                                    conInFo = valid;
                                });*/
                                /*_self.$refs.comInFo.validate(function (valid) {
                                    compInFo = valid;
                                });*/
                                // if (!idenInfo || !backInfo || !MarInFo || !conInFo) {
                                //     _self.$message({message: '请按照规则填写必填内容', type: 'warning'});
                                //     return;
                                // }
                                // if (yufp.session.userId != cus.cusManager) {//登录人不是客户经理，不允许修改
                                //     _self.$message({message: '只有客户经理才能修改客户资料', type: 'warning'});
                                //     return;
                                // }

                                var cus = _self.$refs.reftable.selections[0];
                                var identityInfo = _self.$refs.identityInfo.formModel;
                                var backgroundInfo = _self.$refs.backgroundInfo.formModel;
                                var indivMarInFo = _self.$refs.indivMarInFo.formModel;
                                yufp.util.copyObj(cus,identityInfo);
                                yufp.util.copyObj(cus,backgroundInfo);
                                yufp.util.copyObj(cus,indivMarInFo);

                                yufp.service.request({
                                    method: "PUT",
                                    url: backend.cusService + '/api/cus/indiv',
                                    data: cus,
                                    callback: function (code, message, response) {
                                        if (response.code == 0) {
                                            _self.$refs.identityInfo.resetFn();
                                            _self.$refs.reftable.remoteData();
                                            _self.$message('操作成功');
                                            _self.dialogVisible = false;
                                        } else {
                                            _self.$message('操作失败'+ response.message);
                                        }
                                    }
                                });
                            }
                        },

                        {
                            label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                _self.dialogVisible = false;
                            }
                        }
                        /* { label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                             _self.$refs.identityInfo.resetFn();
                             _self.$refs.backgroundInfo.resetFn();
                             _self.$refs.indivMarInFo.resetFn();
                             //_self.$refs.contInFo.resetFn();
                             //_self.$refs.comInFo.resetFn();
                             _self.dialogVisible = false;
                         } }*/
                    ],
                    height: yufp.frame.size().height - 103,
                    dialogVisible: false,
                    formDisabled: false,
                    creditDisabled: true,
                    creditDialogVisible: false,
                    isEditOp: true,
                    // updatedialogVisible:false,
                    // viewType: 'DETAIL',
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
                switchBankRel: function () {
                    var _self = this;
                    var bankRel = _self.$refs.identityInfo.formModel.cusBankRel;
                    this.$nextTick(function () {
                        if (bankRel == '02' || bankRel == '04') {
                            return true;
                        } else {
                            return false;
                        }
                    })
                },

                //影像批次号超链接处理函数
                batchSernoClick: function(scope){
                    var serNo = scope.applySeq;
                    var date = scope.startDate;
                    if(null!= date && ''!=date && 'undefined' !=date){
                        while(null != date.match('-')){
                            date = date.replace('-', '');
                        }
                    }
                    this.getRightCode(scope);
                },

                getRightCode: function (scope) {
                    var _self = this;
                    var rightCode;
                    var userCode  = yufp.session.userId;
                    yufp.service.request({
                        method: 'GET',
                        url: backend.consoleService + "/api/s/user/role/by/"+userCode,
                        callback: function (code, message, response) {
                            if (code == 0 && response.code == 0) {
                                rightCode = response.rows;
                                var _self = this;
                                var startDate = scope.startDate.replace(new RegExp('-','g'),'');
                                yufp.service.request({
                                    method: 'POST',
                                    url: backend.edocService + "/api/doEncode",
                                    data: {
                                        applySeq : scope.certCode,
                                        prdCode: scope.prdCode,
                                        sessionUserId: yufp.session.userId,
                                        sessionUserName: yufp.session.userName,
                                        sessionOrgCode: yufp.session.org.orgCode,
                                        sessionOrgName: yufp.session.org.orgName,
                                        startDate : startDate,
                                        rightCode : rightCode
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
                            }

                        }
                    });
                },

                switchStatus: function (viewType, editable) {
                    var _self = this;
                    _self.viewType = viewType;
                    // _self.updateButtons[0].hidden = !editable;
                    //   _self.updateButtons[1].hidden = !editable;
                    _self.formDisabled = !editable;
                    _self.dialogVisible = true;
                    this.$nextTick(function () {
                            var certId = _self.$refs.reftable.selections[0].certCode;
                            //计算年龄
                            var mydata = new Date();
                            var month = mydata.getMonth() + 1;
                            var day = mydata.getDate();
                            var age = mydata.getFullYear() - certId.substring(6, 10) - 1;
                            if (certId.substring(10, 12) < month || certId.substring(10, 12) == month && certId.substring(12, 14) <= day) {
                                age++;
                            }
                            _self.$refs.identityInfo.formModel.indivAge = age;
                        }
                    );
                },

                /*addFn: function () {
                    var _self = this;
                    //_self.switchStatus('ADD', true);
                    _self.dialogVisible = true;
                    _self.$nextTick(function () {

                        //  _self.$refs.reform.resetFields();
                    });
                },*/

                modifyFn: function () {
                    var _self = this;
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    this.switchStatus('EDIT', true);
                    _self.isEditOp = false;
                    this.$nextTick(function () {
                        _self.$refs.identityInfo.resetFn();
                        _self.$refs.backgroundInfo.resetFn();
                        _self.$refs.indivMarInFo.resetFn();

                        // this.$refs.cmisref.$children[2].$el.style.display  = 'none';
                        var obj = this.$refs.reftable.selections[0];
                        // var changeArr = ['identityInfoFields', 'backgroundInfoFields', 'indivMarInFoFields', 'contInFoFields', 'comInFoFields'];
                        // for (var i = 0; i < changeArr.length; i++) {
                        //     this.switchInvalidDateToNull(changeArr[i], obj);
                        // }
                        if (typeof (obj.indivDtOfBirth) != 'undefined' && obj.indivDtOfBirth != null && obj.indivDtOfBirth != '') {
                            if (obj.indivDtOfBirth.indexOf("-") == -1) {
                                obj.indivDtOfBirth = obj.indivDtOfBirth.replace(/^(\d{4})(\d{2})(\d{2})$/,"$1-$2-$3");
                            }
                        }
                        // yufp.util.copyObj( this.$refs.backgroundInfo.formModel, obj);
                        yufp.util.copyObj(this.$refs.identityInfo.formModel, obj);
                        yufp.util.copyObj(this.$refs.backgroundInfo.formModel, obj);
                        yufp.util.copyObj(this.$refs.indivMarInFo.formModel, obj);
                        //yufp.util.copyObj( this.$refs.contInFo.formModel, obj);
                        //yufp.util.copyObj( this.$refs.comInFo.formModel, obj);
                        //_self.$refs.contInFo.groupFields[0].fields[13].calcDisabled=false;
                        // this.$refs.contInFo.groupFields[0].fields[12].calcDisabled=true;

                        //_self.$refs.basecollapse.$children[2].$el.hidden =true;
                    });
                    _self.updateButtons[0].hidden = false;
                    // _self.updateButtons[1].hidden = true;
                    //_self.updateButtons[2].hidden = false;
                },

                switchInvalidDateToNull: function (fidldName, obj) {
                    if (typeof (fidldName) == 'undefined' || fidldName == null)
                        return;
                    if (typeof (obj) == 'undefined' || obj == null)
                        return;
                    if (yufp.isArray(this[fidldName])) {
                        for (var i = 0; i < this[fidldName].length; i++) {
                            var temp = this[fidldName][i];
                            if (yufp.isArray(temp.fields)) {
                                for (var j = 0; j < temp.fields.length; j++) {
                                    var f = temp.fields[j];
                                    if (f.type == 'date' && new Date(obj[f.field]) == 'Invalid Date') {
                                        obj[f.field] = null;
                                    }
                                }
                            }
                        }
                    }

                },

                //查看按钮
                infoFn: function () {
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }

                    this.switchStatus('DETAIL', false);
                    var _self = this;
                    _self.isEditOp = true;
                    //  _self.$refs.contInFo.groupFields[0].fields[13].calcDisabled=true;
                    _self.updateButtons[0].hidden = true;
                    _self.updateButtons[1].hidden = false;

                    var obj = _self.$refs.reftable.selections[0];
                    if (typeof (obj.indivDtOfBirth) != 'undefined' && obj.indivDtOfBirth != null && obj.indivDtOfBirth != '') {
                        if (obj.indivDtOfBirth.indexOf("-") == -1) {
                            obj.indivDtOfBirth = obj.indivDtOfBirth.replace(/^(\d{4})(\d{2})(\d{2})$/,"$1-$2-$3");
                        }
                    }
                    /* 设置放款申请信息查询参数  */
                    _self.baseParamsNlsApp = {
                        /**cusId: obj.cusId
                         * @date 2019/12/10
                         * 【2019D0509】【(问题编号)】
                         * 关联客户的授信、用信、合同、借据，均以"证件类型 + 证件号码" 为准，因为有些产品的数据不一定存在客户编号
                         */
                        certCode: obj.certCode,
                        certType: obj.certType
                    };
                    /* 设置借款信息查询参数  */
                    _self.baseParamsLoan = {
                        //cusId: obj.cusId
                        certCode: obj.certCode,
                        certType: obj.certType
                    };
                    /* 设置授信申请详情查询参数  */
                    _self.baseParamsNlsCredit = {
                        //cusId: obj.cusId
                        certCode: obj.certCode,
                        certType: obj.certType
                    };
                    /* 设置影像查询参数  */
                    _self.baseParamImages = {
                        certCode: obj.certCode
                    };
                    this.$nextTick(function () {
                        _self.$refs.identityInfo.resetFn();
                        _self.$refs.backgroundInfo.resetFn();
                        _self.$refs.indivMarInFo.resetFn();

                        _self.$refs.loanApplReftable.remoteData(_self.baseParamsNlsApp);
                        _self.$refs.loanCtrReftable.remoteData(_self.baseParamsLoan);
                        _self.$refs.creditApplReftable.remoteData(_self.baseParamsNlsCredit);
                        _self.$refs.imageCtrReftable.remoteData(_self.baseParamImages)
                        //yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0]);
                        yufp.util.copyObj(this.$refs.identityInfo.formModel, obj);
                        yufp.util.copyObj(this.$refs.backgroundInfo.formModel, obj);
                        yufp.util.copyObj(this.$refs.indivMarInFo.formModel, obj);
                        //yufp.util.copyObj( this.$refs.contInFo.formModel, obj);
                        //yufp.util.copyObj( this.$refs.comInFo.formModel, obj);

                    });
                    /*_self.$refs.contInFo.groupFields[0].fields[13].calcDisabled=true;
                    this.dataUrlZX= backend.cusService + '/api/cus/rpt/condition';
                    this.$nextTick(function() {
                        var  _self = this;
                        var obj = this.$refs.reftable.selections[0];
                        var cusName = obj.cusName;
                        var certType = obj.certType;
                        var certCode = obj.certCode;
                        var queryResult = '1';  //1征信查询成功，2或空为征信查询失败
                        var loginUserLeageOrgCode = obj.loginUserLeageOrgCode;//法人机构
                        var params = {
                                cusName : cusName,
                                certType : certType,
                                certCode : certCode,
                                queryResult : queryResult,
                                loginUserLeageOrgCode : loginUserLeageOrgCode
                        }
                        this.$refs.thirdReftable.remoteData(params);
                        yufp.service.request({
                            method: 'POST',
                            url: backend.cusService + '/api/cus/rpt/condition',
                            data: params,
                            callback: function (code, message, response) {
                                if (response.code == 0) {
                                    this.thirdReftable = response.data;
                                }else{
                                    _self.$message('查看征信报告失败!');
                                }
                            }
                        } );
                    });
                    _self.$refs.contInFo.groupFields[0].fields[13].calcDisabled=false;*/
                },

                tmpInfoFn: function (value) {
                    var ob = {};
                    if (this.$refs.creditApplReftable.selections.length != 1) {
                        this.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    } else {
                        var obj = this.$refs.creditApplReftable.selections[0];
                        this.creditDialogVisible = true;
                        this.$nextTick(function () {

                            this.$refs.creditForm.resetFn();
                            yufp.util.copyObj(this.$refs.creditForm.formModel, obj);
                            yufp.util.copyObj(this.$refs.baiduForm.formModel, obj);
                        });
                    }
                },

                cominfoFn: function () {
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }

                    this.switchStatus('DETAIL', false);
                    var _self = this;
                    _self.updateButtons[0].hidden = true;
                    _self.updateButtons[1].hidden = false;
                    //_self.updateButtons[2].hidden = true;
                    this.$nextTick(function () {
                        var obj = this.$refs.reftable.selections[0];
                        //yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0]);
                        //yufp.util.copyObj( this.$refs.backgroundInfo.formModel, obj);
                        yufp.util.copyObj(this.$refs.identityInfo.formModel, obj);
                        //yufp.util.copyObj( this.$refs.contInFo.formModel, obj);
                        //yufp.util.copyObj( this.$refs.comInFo.formModel, obj);
                    });
                },

                /*deleteFn: function () {
                  var _self = this;
                  var selections = _self.$refs.reftable.selections;
                  if (selections.length < 1) {
                    _self.$message({ message: '请先选择一条记录', type: 'warning' });
                    return;
                  }
                  var len = selections.length, arr = [];
                  for (var i = 0; i < len; i++) {
                    arr.push(selections[i].cusId);
                  }

                  yufp.service.request({
                    method: 'DELETE',
                    url: backend.cusService+'/api/cus/indiv',
                    data: {
                      cusId: arr.join(',')
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
                },*/

                //导出按钮
                exportFn: function () {
                    var _self = this;
                    var formValue = _self.$refs.queryForm.fm;
                    var params = {
                        cusId: formValue.cusId,
                        cusName: formValue.cusName,
                        certType: formValue.certType,
                        certCode: formValue.certCode,
                        exportFlag: 'exp'
                    };

                    _self.$confirm('是否导出数据?', '提示').then(function () {
                        yufp.util.exportExcelByTable({
                            fileName: '客户信息清单',
                            importType: 'service', // page当前页 selected 选中的数据  service 后端数据
                            ref: _self.$refs.reftable,
                            url: backend.cusService + '/api/cus/indivs',
                            method: 'POST',
                            param: {
                                cusId: formValue.cusId,
                                cusName: formValue.cusName,
                                certType: formValue.certType,
                                certCode: formValue.certCode,
                                exportFlag: 'exp'
                            }
                        });
                    })
                } // end of exportFn


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
