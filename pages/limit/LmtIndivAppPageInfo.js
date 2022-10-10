/**
 * @create by chenqm1 on 2018-05-04
 * @description 个人授信申请表
 */
define([
    './custom/widgets/js/YufpDemoSelector.js',
    './custom/widgets/js/YufpOrgTree.js',
    './custom/widgets/js/YufpUserSelector.js',
    './custom/widgets/js/AddrDicSelecter.js',
    './custom/widgets/js/OrgSelector.js',
    './custom/widgets/js/UserSelecter.js',
    './custom/widgets/js/PrdIdInfoSelector.js'
], function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,STD_ZB_NATION,STD_ZX_YES_NO,STD_ZX_SEX,NLS_APPLY_STATE,' +
            ',STD_ZB_CERT_TYP,STD_ZX_TITLE,STD_ZB_TERM_TYPE,STD_ZB_ASSURE_MEANS,STD_YES_NO,ZB_DEGREE,STD_ZX_EMPLOYMET,' +
            ',STD_YES_NO,STD_LOAN_USE,STD_ZX_MARR_STATUS,CYCLIC_FLG,APPLY_DATE_TYPE,ZB_POS_LEVEL,WORKING_STATE,IMAGE_TYPE');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    dataUrl: backend.creditService + '/api/nls/credit/infos',
                    dataUrlZX: backend.creditService + '/api/query/report/infos',
                    imageManages: ['imageManage','imageManage2','imageManageLend'],
                    imageTable: 'imageTable',
                    baseParams: {},
                    baseParamsZX: {},
                    baseParamsSP: {},
                    imagesParams: { },  //影像信息
                    imagesParamsLend: { },  //影像信息
                    dataUrlImages: backend.edocService +'/api/query/image/platfrom/wsd/files',
                    dataUrlImagesLend: backend.edocService +'/api/query/image/platfrom/wsd/filesLend',
                    resetQuery: true,
                    resetQueryYX: true,
                    queryFields: [
                        {placeholder: '申请流水号', field: 'lmtApplySeq', type: 'input'},
                        {
                            placeholder: '渠道名称 ', field: 'channelNo', type: 'select', dataCode: 'APPLY_CHANNEL_TYPE',
                            change: function (value, model, args) {
                                _self.$refs.form.fm.prdCode = ''; //当下拉框值改变时，清空pop框产品值
                            }
                            ,rules: [{required: true, message: '渠道名称必输', trigger: 'blur'}]
                        },
                        {
                            placeholder: '产品名称',
                            field: 'prdCode',
                            type: 'custom',
                            is: 'div-prdId-info-selector',
                            params: {type: ''},
                            clickFn: function (value, model, args) {
                                _self.$refs.form.switch('prdCode', 'params', {prdType: model.channelNo, type: 'code'});
                                _self.$refs.form.rebuildFn();
                            },rules: [{required: true, message: '产品名称必输', trigger: 'blur'}]
                        },
                        {placeholder: '证件类型', field: 'certType', type: 'select', dataCode: 'STD_ZB_CERT_TYP'},
                        {placeholder: '证件号码', field: 'certCode', type: 'input'},
                        {placeholder: '审批状态', field: 'apprvSts', type: 'select', dataCode: 'NLS_APPLY_STATE'},
                        {placeholder: '日期类型', field: 'applyDateType', type: 'select', dataCode: 'APPLY_DATE_TYPE',value:'05',rules: [{required: true, message: '日期类型不能为空', trigger: 'blur'}],
                            change: function (value, model, args) {
                                if (value == '04'){
                                    _self.$refs.form.switch('applyDate', 'hidden', false);
                                    var time = new Date().getTime()-60*60*24*1000;
                                    var date = new Date(time);
                                    var Y = date.getFullYear() + '-';
                                    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):date.getMonth()+1) + '-';
                                    var D = (date.getDate()< 10 ? '0'+date.getDate():date.getDate());
                                    _self.$refs.form.fm.applyDate = Y+M+D;
                                }else {
                                    _self.$refs.form.fm.applyDate = '';
                                    _self.$refs.form.switch('applyDate', 'hidden', true);
                                }
                            },hidden: true},
                        {placeholder: '申请日期',id:'applyDate',field: 'applyDate', type: 'date', editable: true, hidden: true},
                        {placeholder: '主管机构',field: 'nlsOperOrgid', type: 'custom',is: 'div-org-selector',params: {showType: 'CNNAME'}},
                        {placeholder: '申办日期起', field: 'applyDateMin', type: 'date'
                            //rules: [{required: true, message: '申办日期起必输', trigger: ['change','blur'],type :'date'}],
                            /*value:new Date().getFullYear() + '-'
                                + (new Date().getMonth()+1 < 10 ? '0' + (new Date().getMonth()+1):new Date().getMonth()+1) + '-'
                                + (new Date().getDate()< 10 ? '0'+new Date().getDate():new Date().getDate())*/
                        },
                        {placeholder: '申办日期止', field: 'applyDateMax', type: 'date'
                            //rules: [{required: true, message: '申办日期止必输', trigger: ['change','blur'],type :'date'}],
                            /*value:new Date().getFullYear() + '-'
                                + (new Date().getMonth()+1 < 10 ? '0' + (new Date().getMonth()+1):new Date().getMonth()+1) + '-'
                                + (new Date().getDate()< 10 ? '0'+new Date().getDate():new Date().getDate())*/
                        }
                    ],
                    queryButtons: [
                        {
                            label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                                if (valid) {
                                    if((model.channelNo === "" || model.channelNo === undefined)){
                                        _self.$message('渠道名称不能为空!');
                                    }else if((model.prdCode === "" || model.prdCode === undefined)){
                                        _self.$message('产品名称不能为空!');
                                    }else if((null==model.lmtApplySeq || model.lmtApplySeq == "") && (null==model.certCode || model.certCode == "") && ((model.applyDateMin === "" || model.applyDateMin === undefined)|| (model.applyDateMax === "" || model.applyDateMax === undefined))){
                                        _self.$message('申请流水号，证件号码，申请日期起止必须有一个必输!');
                                    }else if((null==model.lmtApplySeq || model.lmtApplySeq == "") && (null==model.certCode || model.certCode == "")){
                                        var dateMin = new Date(model.applyDateMin);
                                        var dateMin1 = new Date(model.applyDateMin);
                                        var dateMinTime =  dateMin.getFullYear()+"-"+(dateMin.getMonth()+1)+"-"+dateMin.getDate();
                                        var dateMax = new Date(model.applyDateMax);
                                        var dateMaxTime =  dateMax.getFullYear()+"-"+(dateMax.getMonth()+1)+"-"+dateMax.getDate();
                                        if(dateMax < dateMin){
                                            _self.$message('申办日期结束日期不能小于开始日期!');
                                        }else{
                                            dateMin1.setMonth(dateMin.getMonth() +3);
                                            dateMin1.setDate(dateMin.getDate() +1);
                                            var dateMinTime1 =  dateMin1.getFullYear()+"-"+(dateMin1.getMonth()+1)+"-"+dateMin1.getDate();
                                            if(dateMax > dateMin1){
                                                _self.$message('申办日期起止时间不能超过三个月!');
                                            }else{
                                                _self.$refs.reftable.remoteData(model);
                                            }
                                        }
                                    }else{
                                        _self.$refs.reftable.remoteData(model);
                                    }
                                }
                            }
                        },
                        {
                            label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2', click: function () {
                                _self.resetQuery = false;
                                _self.$nextTick(function () {
                                    this.resetQuery = true;
                                });
                            }
                        }
                    ],
                    queryFields1: [
                        {placeholder: '借据号', field: 'relNo', type: 'input'}
                    ],
                    queryButtons1: [
                        {
                            label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                                if (valid) {
                                    _self.$refs.imagesReftableLend.remoteData(model);
                                }
                            }
                        },
                        {
                            label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2', click: function () {
                                _self.resetQueryYX = false;
                                _self.$nextTick(function () {
                                    this.resetQueryYX = true;
                                });
                            }
                        }
                    ],
                    tableColumns: [
                        {
                            label: '申请流水号', prop: 'lmtApplySeq', sortable: true, resizable: true, width: '150',
                            template: function () {
                                return '<template scope="scope">\
                    			<a href="javascript:void(0);" style="text-decoration:underline;"@click="_$event(\'custom-row-click\', scope.row)">{{ scope.row.lmtApplySeq }}</a>\
                    		</template>';
                            }
                        },
                        {label: '渠道名称', prop: 'channelNo', sortable: true, resizable: true, dataCode: 'APPLY_CHANNEL_TYPE'},
                        {label: '产品名称', prop: 'prdName', sortable: true, resizable: true},
                        {label: '客户编号', prop: 'cusId', sortable: true, resizable: true},
                        {label: '客户名称', prop: 'cusName', sortable: true, resizable: true},
                        {label: '证件类型', prop: 'certType', sortable: true, resizable: true, dataCode: 'STD_ZB_CERT_TYP'},
                        {label: '证件号码', prop: 'certCode', sortable: true, resizable: true},
                        {label: '授信金额(元)', prop: 'approveAmt', sortable: true, resizable: true, width: '150',
                            formatter: function (row, column, cellValue) {
                                if (!row.approveAmt) {
                                    return row.approveAmt;
                                } else {
                                    return yufp.util.moneyFormatter(row.approveAmt, 2);
                                }
                            }
                        },
                        {label: '是否循环', prop: 'cyclicFlg', sortable: true, resizable: true, type: 'select', dataCode: 'CYCLIC_FLG'},
                        {label: '授信有效期', prop: 'applyTerm', sortable: true, resizable: true, width: '150'},
                        {label: '授信有效期类型', prop: 'termType', sortable: true, resizable: true, dataCode: 'STD_ZB_TERM_TYPE', width: '150'},
                        {label: '申请日期', prop: 'applyDate', sortable: true, resizable: true},
                        {label: '客户经理', prop: 'nlsOperUserid', sortable: true, resizable: true},
                        {label: '主管机构', prop: 'nlsOperOrgid', sortable: true, resizable: true},
                        {label: '贷款用途', prop: 'loanUseType', sortable: true, resizable: true, dataCode: 'STD_LOAN_USE'},
                        {label: '审批状态', prop: 'apprvSts', sortable: true, resizable: true, dataCode: 'NLS_APPLY_STATE'},
                        {label: '审批日期', prop: 'apprvDate', sortable: true, resizable: true, hidden: false}
                    ],

                    //授信信息
                    approveInfoFields: [{
                        columnCount: 2,
                        fields: [
                            {field: 'lmtApplySeq', label: '申请流水号', disabled: true},
                            {field: 'channelNo', label: '渠道名称', disabled: true, type: 'select', dataCode: 'APPLY_CHANNEL_TYPE',
                                change: function (fields) {
                                    if (fields != "05") {
                                        _self.$refs.basecollapse.$children[1].$el.hidden = true;
                                    } else {
                                        _self.$refs.basecollapse.$children[1].$el.hidden = false;
                                    }
                                }
                            },
                            {field: 'prdName', label: '产品名称', disabled: true},
                            {field: 'cusId', label: '客户编号', disabled: true},
                            {field: 'cusName', label: '客户名称', disabled: true},
                            {field: 'certType', label: '证件类型', disabled: true, type: 'select', dataCode: 'STD_ZB_CERT_TYP'},
                            {field: 'certCode', label: '证件号码', disabled: true},
                            {field: 'posLevel', label: '职务级别', disabled: true, type: 'select', dataCode: 'ZB_POS_LEVEL'},
                            {field: 'workStatus', label: '在岗状态', disabled: true, type: 'select',dataCode: 'WORKING_STATE'},
                            {field: 'svcWorkMonths', label: '在职月数', disabled: true},
                            {field: 'applyDate', label: '申请日期', disabled: true},
                            {field: 'approveAmt', label: '授信额度(元)', disabled: true,
                                formatter: function (row, column, cellValue) {
                                    if (!row.approveAmt) {
                                        return row.approveAmt;
                                    } else {
                                        return yufp.util.moneyFormatter(row.approveAmt, 2);
                                    }
                                }
                            },
                            {field: 'lmtContNo', label: '授信额度编号', disabled: true},
                            {
                                field: 'apprvSts',
                                label: '审批状态',
                                disabled: true,
                                type: 'select',
                                dataCode: 'NLS_APPLY_STATE'
                            },
                            {
                                field: 'refuseCause',
                                label: '拒绝原因',
                                type: 'textarea',
                                disabled: true
                            },
                            {
                                field: 'cyclicFlg',
                                label: '额度循环标志',
                                disabled: true,
                                type: 'select',
                                dataCode: 'CYCLIC_FLG'
                            },
                            {field: 'applyTerm', label: '授信期限', disabled: true},
                            {
                                field: 'termType',
                                label: '授信期限类型',
                                disabled: true,
                                type: 'select',
                                dataCode: 'STD_ZB_TERM_TYPE'
                            },
                            {field: 'startDate', label: '授信起始日', disabled: true},//？？？
                            {field: 'expireDate', label: '授信到期日', disabled: true},//？？？
                            {field: 'chargeoffBrId', label: '出账机构', disabled: true},
                            {field: 'nlsOperOrgid', label: '主管机构', disabled: true},
                            {field: 'dnAccount', label: '放款卡号', disabled: true},
                            {field: 'cusManager', label: '客户经理', disabled: true},
                            {
                                field: 'assureMeansMain',
                                label: '担保方式',
                                type: 'select',
                                dataCode: 'STD_ZB_ASSURE_MEANS',
                                disabled: true
                            },
                            {
                                field: 'loanUseType',
                                label: '贷款用途',
                                disabled: true,
                                type: 'select',
                                dataCode: 'STD_LOAN_USE'
                            },
                            {field: 'apprvDate', label: '审批日期', disabled: true},
                            { field: 'createUser', label: '创建人' ,disabled:true},
                            { field: 'createTime', label: '创建时间' ,disabled:true},
                            { field: 'lastUpdateUser', label: '最新修改人' ,disabled:true},
                            { field: 'lastUpdateTime', label: '最后修改时间' ,disabled:true}
                        ]
                    }],
                    //百度特色字段
                    baiduFields: [{
                        columnCount: 2,
                        fields: [
                            {field: 'bdReasonCode', label: '百度原因码', disabled: true},
                            {field: 'bdReasonMsg', label: '百度原因码说明', disabled: true},
                            {field: 'bdRisCode', label: '百度策略码', type: 'select', dataCode: 'BD_POLCY_CD', disabled: true},
                            {field: 'bdDxmScore', label: '度小满A模型分', disabled: true},
                            {field: 'bdPreCustSeg', label: '人群分层', disabled: true},
                            {field: 'bdHolmesBlackScore', label: '关联黑产分', disabled: true},
                            {field: 'bdHolmesAgentScore', label: '关联中介分', disabled: true},
                            {field: 'bdBlackListType', label: '黑名单类型', disabled: true},
                            {field: 'bdPrcidNormalScoreExp3', label: '内部多头分（身份证）', disabled: true},
                            {field: 'bdBidNormalScoreExp3', label: '内部多头分（百度帐号）', disabled: true},
                            {field: 'bdPhoneNormalScoreExp3', label: '内部多头分（手机）', disabled: true},
                            {field: 'bdIncome', label: '税后月收入（区间）', type: 'select', dataCode: 'BD_INCM_AMT_LVL', disabled: true},
                            {field: 'bdIntIncome12', label: '等额本金12期利息（循环产品）', disabled: true, type: 'num', digit: 4, formatter: yufp.util.moneyFormatter}
                        ]
                    }],

                    //申请人基本信息-身份信息
                    identityInfoFields: [{
                        columnCount: 3,
                        fields: [
                            {field: 'cusId', label: '客户号', disabled: true},
                            {field: 'cusName', label: '客户名称', disabled: true},
                            {field: 'indivSex', label: '性别', disabled: true, type: 'select', dataCode: 'STD_ZX_SEX'},
                            {field: 'indivDtOfBirth', label: '出生日期', editable: false, disabled: true},//,type:'date'
                            {field: 'certType', label: '证件类型', type: 'select', dataCode: 'STD_ZB_CERT_TYP', disabled: true},
                            {field: 'certCode', label: '证件号码', disabled: true},
                            {field: 'phone', label: '手机号码', disabled: true},
                            {field: 'fstAppChannel',
                                label: '首次申请渠道',
                                disabled: true,
                                type: 'select',
                                dataCode: 'APPLY_CHANNEL_TYPE'
                            },
                            {field: 'indivRsdAddr', label: '居住地址', disabled: true},
                            {field: 'indivNtn', label: '民族', disabled: true, type: 'select', dataCode: 'STD_ZB_NATION'},
                            {field: 'indivComName', label: '工作单位名称', disabled: true},
                            {
                                field: 'indivComTyp',
                                label: '单位性质',
                                disabled: true,
                                type: 'select',
                                dataCode: 'STD_ZB_REG_TYPE'
                            },
                            {
                                field: 'indivCrtfctn',
                                label: '职称',
                                disabled: true,
                                type: 'select',
                                dataCode: 'STD_ZX_TITLE'
                            },
                            {
                                field: 'indivOcc',
                                label: '职业',
                                disabled: true,
                                type: 'select',
                                dataCode: 'STD_ZX_EMPLOYMET'
                            },
                            {
                                field: 'indivAnnIncm',
                                label: '个人月收入(元)',
                                disabled: true,
                                type: 'num',
                                formatter: function (cellValue) {
                                    if (typeof (cellValue) == 'undefined' || cellValue == null || isNaN(cellValue))
                                        return;
                                    return yufp.util.moneyFormatter(cellValue, 2);
                                },
                                rules: [{validator: yufp.validator.number, message: '必须填写数字', trigger: 'blur'}]
                            },  //年收入情况
                            {field: 'postAddr', label: '通讯地址', disabled: true},
                            {field: 'postCode', label: '邮政编码', disabled: true},
                            {field: 'indivMarSt', label: '婚姻状况', disabled: true, type: 'select', dataCode: 'STD_ZX_MARR_STATUS'/*,
                                change: function (fields) {
                                    if (fields == "20" || fields == "21" || fields == "22" || fields == "23") {
                                        _self.$refs.basecollapseSecond.$children[2].$el.hidden = false;
                                        _self.$refs.indivMarInFo.formRules.indivSpsName[0].required = true;
                                        _self.$refs.indivMarInFo.formRules.indivSpsIdTyp[0].required = true;
                                        _self.$refs.indivMarInFo.formRules.indivSpsIdCode[0].required = true;
                                        _self.$refs.indivMarInFo.formRules.indivSpsIdPeriod[0].required = true;
                                    } else {
                                        _self.$refs.basecollapseSecond.$children[2].$el.hidden = true;
                                        _self.$refs.indivMarInFo.formRules.indivSpsName[0].required = false;
                                        _self.$refs.indivMarInFo.formRules.indivSpsIdTyp[0].required = false;
                                        _self.$refs.indivMarInFo.formRules.indivSpsIdCode[0].required = false;
                                        _self.$refs.indivMarInFo.formRules.indivSpsIdPeriod[0].required = false;
                                    }
                                }*/
                            },
                            {field: 'inputId', label: '创建人', disabled: true},   //登记人
                            {field: 'createTime', label: '创建时间', disabled: true},
                            {field: 'lastUpdateUser', label: '最后修改人', disabled: true},
                            {field: 'lastUpdateTime', label: '最后修改时间', disabled: true}
                        ]
                    }],

                    //申请人基本信息-背景信息
                    backgroundInfoFields: [{
                        columnCount: 3,
                        fields: [
                            {field: 'indivEdt', label: '最高学历', disabled: true, type: 'select', dataCode: 'ZB_DEGREE'},
                            {field: 'agriFlg', label: '是否农户', disabled: true, type: 'select', dataCode: 'STD_YES_NO'},
                            {field: 'familyAddr', label: '家庭地址', disabled: true},
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
                                }

                            },
                            {
                                field: 'indivHealSt',
                                label: '健康状况',
                                disabled: true,
                                type: 'select',
                                dataCode: 'STD_ZB_HEAL_ST',
                                hidden: true
                            },
                            {
                                field: 'hasFamilyMember',
                                label: '是否有家庭成员',
                                disabled: true,
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
                            {
                                field: 'indivSpsName',
                                label: '配偶姓名',
                                disabled: true,
                                rules: [{required: false, message: '已婚客户，此项必填!', trigger: 'blur'}]
                            },
                            {field: 'indivSpsMphn', label: '手机号码', disabled: true},
                            {field: 'indivSpsPhone', label: '配偶联系电话', disabled: true},
                            {
                                field: 'indivSpsIdTyp',
                                label: '配偶证件类型',
                                disabled: true,
                                type: 'select',
                                dataCode: 'STD_ZB_CERT_TYP',
                                hidden: true
                            },
                            {field: 'indivSpsIdCode', label: '配偶证件号码', disabled: true, hidden: true},
                            {
                                field: 'indivSpsIdPeriod',
                                label: '配偶证件有效期',
                                disabled: true,
                                type: 'date',
                                editable: false,
                                hidden: true
                            },
                            {field: 'indivScomName', label: '工作单位', disabled: true, hidden: true},
                            {field: 'indivSpsPhn', label: '单位电话', disabled: true, hidden: true}
                        ]
                    }],

                    tableColumnsZX: [
                        {label: '报告号', prop: 'reportId', sortable: true, resizable: true},
                        {label: '请求时间', prop: 'requestTime', sortable: true, resizable: true},
                        {label: '报告时间', prop: 'reportTime', sortable: true, resizable: true},
                        {label: '被查询者姓名', prop: 'cername', sortable: true, resizable: true},
                        {label: '被查询者证件类型',prop: 'certype',sortable: true,resizable: true,dataCode: 'STD_ZB_CERT_TYP'},
                        {label: '被查询者证件号码', prop: 'cercode', sortable: true, resizable: true},
                        {label: '查询操作员', prop: 'user', sortable: true, resizable: true}
                    ],

                    tableColumnsSP: [
                        {prop: 'cusId', label: '客户编号', sortable: true, resizable: true},
                        {prop: 'cusName', label: '客户名称', sortable: true, resizable: true},
                        {
                            prop: 'prdCode',
                            label: '产品编号',
                            sortable: true,
                            resizable: true,
                            rules: [{validator: yufp.validator.number, message: '数字', trigger: 'blur'}]
                        },
                        {
                            prop: 'prdName', label: '产品名称', sortable: true, resizable: true,
                            rules: [{max: 24, message: '最大长度为24个字符串', trigger: 'blur'}]
                        },
                        {prop: 'soltCode', label: '当前插槽代码', sortable: true, resizable: true},
                        {prop: 'soltName', label: '当前插槽名称', sortable: true, resizable: true},
                        {prop: 'rspMsg', label: '响应信息', sortable: true, resizable: true}
                    ],


                    updateButtons: [
                        {
                            label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false,
                            click: function (model) {
                                _self.dialogVisible = false;
                                _self.resetQueryYX = false;
                                _self.$nextTick(function () {
                                    this.resetQueryYX = true;
                                });
                                if (true) {
                                    _self.$refs.imagesReftableLend.remoteData(model);
                                }
                            }
                        }
                    ],

                    //网贷业务过程信息
                    nlsProsBizInFoFields: [
                        {
                            columnCount: 3,
                            fields: [
                                { field: 'lmtApplySeq', label: '申请流水号' , disabled: true, hidden:true},
                                { field: 'cusId', label: '客户编号' , disabled: true},
                                { field: 'cusName', label: '客户名称' , disabled: true},
                                { field: 'prdCode', label: '产品编号' , disabled: true},
                                { field: 'prdName', label: '产品名称', disabled: true },
                                { field: 'soltCode', label: '当前插槽代码' , disabled: true},
                                { field: 'soltName', label: '当前插槽名称', disabled: true},
                                { field: 'rspMsg', label: '响应信息', disabled: true}
                            ]
                        }
                    ],
                    //影像信息/query/report/infos
                    tableColumnsImages: [
                        { label: '流水号', prop: 'applySeq', sortable: true, resizable: true },
                        { label: '影像类型', prop: 'imageType', sortable: true, resizable: true, dataCode: 'IMAGE_TYPE' },
                        { label: '影像批次号', prop: 'batch', sortable: true, resizable: true, width: '480',
                            template: function () {
                                return '<template scope="scope">\
	     			  			<a href="javascript:void(0);" style="text-decoration:underline;"@click="_$event(\'custom-row-click\', scope.row)">{{ scope.row.batch }}</a>\
	     			  		  </template>';
                            } },
                        { label: '上传状态', prop: 'state', sortable: true, resizable: true },
                        { label: '进件日期', prop: 'startDate', sortable: true, resizable: true },
                        { label: '上传时间', prop: 'createTime', sortable: true, resizable: true }
                    ],
                    //影像信息贷中fileslend
                    tableColumnsImagesLend: [
                        { label: '流水号', prop: 'applySeq', sortable: true, resizable: true },
                        { label: '影像类型', prop: 'imageType', sortable: true, resizable: true, dataCode: 'IMAGE_TYPE' },
                        { label: '影像批次号', prop: 'batch', sortable: true, resizable: true, width: '480',
                            template: function () {
                                return '<template scope="scope">\
	     			  			<a href="javascript:void(0);" style="text-decoration:underline;"@click="_$event(\'custom-row-click\', scope.row)">{{ scope.row.batch }}</a>\
	     			  		  </template>';
                            } },
                        { label: '上传状态', prop: 'state', sortable: true, resizable: true },
                        { label: '进件日期', prop: 'startDate', sortable: true, resizable: true },
                        { label: '上传时间', prop: 'createTime', sortable: true, resizable: true },
                        { label: '借据号', prop: 'relNo', sortable: true, resizable: true , hidden: false}

                    ],
                    height: yufp.frame.size().height - 103,
                    dialogVisible: false,
                    formDisabled: true,
                    viewType: 'DETAIL',
                    tabName: 'first',
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    expandCollapseName: ['applyBase', 'approveInfoSecond', 'baiduItem', 'identityInfo', 'backgroundInfo', 'indivMarInFo']
                }
            },

            methods: {

                getCredit: function () {
                    var _self = this;
                    var selections = this.$refs.thirdReftable.selections;
                    if (selections.length != 1) {
                        this.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    var cmisdata = selections[0].reportId;
                    yufp.service.request({
                        method: 'POST',
                        url: backend.creditService + '/api/cus/rpt/show',
                        data: {reportId: cmisdata},
                        callback: function (code, message, response) {
                            if (response.code == 0) {
                                var report = response.rows.content;
                                if (report != null || report != "") {
                                    w = window.open('about:blank');
                                    w.document.write(report);
                                    w.document.close();
                                } else {
                                    _self.$message('没有查询到征信报告!');
                                }
                            } else {
                                _self.$message('查看征信报告失败!');
                            }
                        }
                    });
                },

                /**
                 * @param ctrlCode 操作码
                 */
                checkPermission: function (ctrlCode) {
                    return !yufp.session.checkCtrl(ctrlCode, cite.menuId);
                },

                infoFn: function () {
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }

                    var _self = this;
                    _self.dialogVisible = true;
                    //隐藏影像信息
                    _self.isShowImageManage = false;
                    var obj = this.$refs.reftable.selections[0];
                    this.switchStatus('DETAIL', true);
                    _self.baseParamsZX = {
                        cercode: obj.certCode
                    };

                    this.$nextTick(function () {
                        var _self = this;
                        var certId = _self.$refs.reftable.selections[0].certCode;
                        var cusId = _self.$refs.reftable.selections[0].cusId;
                        //计算年龄
                        var mydata = new Date();
                        var month = mydata.getMonth() + 1;
                        var day = mydata.getDate();
                        var age = mydata.getFullYear() - certId.substring(6, 10) - 1;
                        if (certId.substring(10, 12) < month || certId.substring(10, 12) == month && certId.substring(12, 14) <= day) {
                            age++;
                        }
                        if (certId != null && certId != '') {
                            var url = backend.cusService + '/api/cus/indiv/' + certId;
                        } else {
                            _self.$message({message: "证件号为空，无法查询准确的客户信息", type: 'warning'});
                        }
                        yufp.service.request({
                            method: "GET",
                            url: url,
                            data: certId,
                            callback: function (code, message, response) {
                                // 重置表单，防止第二次点击查看时，为空数据出现上一次查看的数据
                                _self.$refs.identityInfo.resetFn();
                                _self.$refs.backgroundInfo.resetFn();
                                if (response.success) {
                                    yufp.extend(_self.$refs.identityInfo.formModel, response.rows);
                                    yufp.extend(_self.$refs.backgroundInfo.formModel, response.rows);
                                }
                            }
                        });
                        yufp.extend(this.$refs.approveInfoRef.formModel, obj);
                        yufp.extend(this.$refs.baiduRef.formModel, obj);
                        yufp.extend(this.$refs.nlsProsBizInFo.formModel, obj);
                        // this.$refs.forthReftable.remoteData(_self.baseParamsSP);
                        this.$refs.thirdReftable.remoteData(_self.baseParamsZX);
                        _self.imagesParams = {
                            applySeq : obj.lmtApplySeq,
                            prdCode: obj.prdCode
                        }
                        _self.$refs.imagesReftable.remoteData(_self.imagesParams);   //影像信息
                    });


                },

                tabClick: function (tabs) {
                    if (tabs.name == 'second') {
                        var _self = this;
                        var otherObj = {
                            cusManager: this.$refs.reftable.selections[0].cusManager,
                            mainBrName: this.$refs.reftable.selections[0].mainBrName
                        };
                        // yufp.extend(this.$refs.otherRef.formModel, otherObj);//其他选项卡赋值
                        var applyBaseObj = {cusName: '', cusId: '', certType: '', certCode: ''};
                        yufp.util.copyObj(applyBaseObj, this.$refs.reftable.selections[0]);//拷贝对象的值
                        yufp.service.request({
                            method: "POST",
                            url: backend.creditService + '/api/lmt/indiv/getCusInfo',
                            data: JSON.stringify({cusId: this.$refs.reftable.selections[0].cusId}),
                            callback: function (code, message, response) {
                                if (response.success == true) {
                                    yufp.extend(_self.$refs.applyRef.formModel, response.data);//申请人基本信息赋值
                                } else {
                                    _self.$message(response.message);
                                }
                            }
                        });
                        //yufp.extend(this.$refs.applyRef.formModel, applyBaseObj);//申请人基本信息赋值
                        yufp.util.copyObj(this.$refs.approveInfoRef.formModel, this.$refs.reftable.selections[0]);//拷贝对象的值
                        //yufp.extend(this.$refs.approveInfoRef.formModel, approveInfoObj);//申请人基本信息赋值

                    }
                },

                //影像获取
                obtainImage: function () {
                    var _self = this;
                    yufp.service.request({
                        method: "POST",
                        data: this.$refs.reftable.selections[0],
                        url: backend.creditService + '/api/lmt/indiv/getIsrpInfo',
                        callback: function (code, message, response) {
                            if (response.code == '999999') {
                                var url = response.data.emcUrl;
                                w = window.open(url);
                            } else {

                                _self.$message({message: response.message, type: 'warning'});
                            }
                        }
                    });


                },
                customRowClick: function (scope) {
                    this.switchStatus('EDIT', true);
                    this.$nextTick(function () {
                        var obj = scope.row;
                        var dataObj = {};
                        yufp.extend(dataObj, obj, {barthday: new Date(obj.barthday)});

                        yufp.extend(false, this.$refs.approveInfo.formModel, dataObj);
                        yufp.extend(false, this.$refs.familyRef.formModel, dataObj);
                        yufp.extend(false, this.$refs.obligateRef.formModel, dataObj);
                    });
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
                                        applySeq : scope.applySeq,
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
                //操作权限检查
                checkPermission: function (ctrlCode) {
                    return true;
                },
                /**
                 * @param viewType
                 *            表单类型
                 * @param editable
                 *            可编辑,默认false
                 */
                switchStatus: function (viewType, editable) {
                    var _self = this;
                    _self.viewType = viewType;
                    _self.formDisabled = !editable;
                    _self.dialogVisible = true;
                    this.$nextTick(function () {
                        }
                    );
                },

                //申请流水号超链接处理函数
                lmtApplySeqClick: function (scope) {
                    var _self = this;
                    _self.dialogVisible = true;

                    _self.baseParamsRel = {
                        lmtApplySeq: scope.lmtApplySeq
                    };

                    _self.baseParamsZX = {
                        cercode: scope.certCode
                    };
                    _self.switchStatus('DETAIL', true);
                    this.$nextTick(function () {

                        var _self = this;
                        var certId = scope.certCode;
                        var cusId = scope.cusId;
                        //计算年龄
                        var mydata = new Date();
                        var month = mydata.getMonth() + 1;
                        var day = mydata.getDate();
                        var age = mydata.getFullYear() - certId.substring(6, 10) - 1;
                        if (certId.substring(10, 12) < month || certId.substring(10, 12) == month && certId.substring(12, 14) <= day) {
                            age++;
                        }
                        if (certId != null && certId != '') {
                            var url = backend.cusService + '/api/cus/indiv/' + certId;
                        } else {
                            _self.$message({message: "证件号为空，无法查询准确的客户信息", type: 'warning'});
                        }
                        yufp.service.request({
                            method: "GET",
                            url: url,
                            data: {},
                            callback: function (code, message, response) {
                                // 重置表单，防止第二次点击查看时，为空数据出现上一次查看的数据
                                _self.$refs.identityInfo.resetFn();
                                _self.$refs.backgroundInfo.resetFn();
                                if (response.success) {
                                    yufp.extend(_self.$refs.identityInfo.formModel, response.rows);
                                    yufp.extend(_self.$refs.backgroundInfo.formModel, response.rows);

                                }
                            }
                        });
                        yufp.extend(this.$refs.approveInfoRef.formModel, scope);
                        yufp.extend(this.$refs.baiduRef.formModel, scope);
                        yufp.extend(this.$refs.nlsProsBizInFo.formModel, scope);
                        this.$refs.thirdReftable.remoteData(_self.baseParamsZX);
                        _self.imagesParams = {
                            applySeq : scope.lmtApplySeq,
                            prdCode: scope.prdCode
                        }
                        _self.$refs.imagesReftable.remoteData(_self.imagesParams);   //影像信息
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