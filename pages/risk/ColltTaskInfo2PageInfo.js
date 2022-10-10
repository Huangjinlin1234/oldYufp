/**
 * @create by luzhaoyu on 2019-08-27
 * @description 催收任务信息
 */
define([
    './custom/widgets/js/UserSelecter.js',
    './custom/widgets/js/DutySelecter.js',
    './custom/widgets/js/GrantAuthInfoDutySelector.js',
    './custom/widgets/js/SUserDutySelecter.js',
], function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,STD_RISK_LEVEL,TODO,STD_COLLT_WAY,IDENT_WAY,COLLT_OUTS_TASK_STS,STD_ZX_SEX,STD_ZB_CERT_TYP,STD_ZB_NATION,STD_ZB_REG_TYPE,STD_ZX_TITLE,STD_ZX_EMPLOYMET,STD_ZX_MARR_STATUS,ZB_DEGREE,STD_YES_NO,STD_ZB_HEAL_ST,STD_ZX_YES_NO,APPLY_CHANNEL_TYPE,STD_ZB_ACC_STATUS,STD_ZX_CUR_TYPE,STD_ZB_TERM_TYPE,STD_ZB_IR_ADJ_MODE,STD_ZB_ASSURE_MEANS,STD_PRD_REPAY_MODE,STD_ZB_EFR_CHNG_IND');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    baseTab: 'baseTab',
                    taskTab: 'taskTab',
                    dataUrl: backend.riskmService + '/api/collt/task/infos',
                    dataUrlRcd: backend.riskmService + '/api/collt/task/rcds/taskno',
                    baseParams: {
                        isTaskDistr: 'N',
                        colltWayList:"('03','04','05')"
                    },
                    baseParamsRcd: {},
                    expandCollapseName: ['baseCusInfo', 'revform', 'taskFlowform', 'taskRcdform'],
                    expandCollapseCus: ['identityInfo', 'backgroundInfo', 'indivMarInFo'],
                    taskCollapseName: ['baseRef'],

                    queryFields: [
                        {placeholder: '催收任务编号', field: 'colltTaskNo', type: 'input'},
                        {placeholder: '借据编号', field: 'loanNo', type: 'input'},
                        {placeholder: '证件号', field: 'certCode', type: 'input'},
                        {placeholder: '客户编号', field: 'cusId', type: 'input'},
                        {placeholder: '客户名称', field: 'cusName', type: 'input'},
                        {placeholder: '风险等级', field: 'riskLevel', type: 'select', dataCode: 'STD_RISK_LEVEL'},
                        {placeholder: '任务状态', field: 'taskSts', type: 'select', dataCode: 'COLLT_OUTS_TASK_STS'},
                        {placeholder: '催收方式', field: 'colltWay', type: 'select', dataCode: 'STD_COLLT_WAY'}
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
                        {label: '催收任务编号', prop: 'colltTaskNo', sortable: true, resizable: true, type: 'input'},
                        {label: '客户编号', prop: 'cusId', sortable: true, resizable: true},
                        {
                            label: '客户名称', prop: 'cusName', sortable: true, resizable: true
                            , template: function () {
                                return '<template scope="scope">\
                                    <a href="javascript:void(0);" style="text-decoration:underline;"@click="_$event(\'custom-row-click\', scope.row,scope.row.cusName)">{{ scope.row.cusName}}</a>\
                                </template>';
                            }
                        },
                        {label: '证件号', prop: 'certCode', sortable: true, resizable: true},
                        {
                            label: '借据编号', prop: 'loanNo', sortable: true, resizable: true
                            , template: function () {
                                return '<template scope="scope">\
                                    <a href="javascript:void(0);" style="text-decoration:underline;"@click="_$event(\'custom-row-click\', scope.row,scope.row.loanNo)">{{ scope.row.loanNo }}</a>\
                                </template>';
                            }
                        },
                        {label: '逾期天数', prop: 'overDays', sortable: true, resizable: true},
                        {label: '逾期金额', prop: 'overLmt', sortable: true, resizable: true},
                        {label: '逾期期数', prop: 'overNper', sortable: true, resizable: true},
                        {label: '风险等级', prop: 'riskLevel', sortable: true, resizable: true, dataCode: 'STD_RISK_LEVEL'},
                        {label: '风险类型', prop: 'riskType', sortable: true, resizable: true, dataCode: 'TODO'},
                        {label: '催收方式', prop: 'colltWay', sortable: true, resizable: true, dataCode: 'STD_COLLT_WAY'},
                        {label: '识别方式', prop: 'identWay', sortable: true, resizable: true, dataCode: 'IDENT_WAY'},
                        {
                            label: '任务状态',
                            prop: 'taskSts',
                            sortable: true,
                            resizable: true,
                            dataCode: 'COLLT_OUTS_TASK_STS'
                        },
                        {label: '催收员名称', prop: 'inputUserName', sortable: true, resizable: true},
                        {label: '入催时间', prop: 'createTime', sortable: true, resizable: true},
                        {label: '任务完成时间', prop: 'taskFnshTime', sortable: true, resizable: true}
                    ],

                    baseInfoFields: [{
                        columnCount: 3,
                        fields: [
                            {field: 'cusId', label: '客户编号', disabled: true},
                            {field: 'cusName', label: '客户名称', disabled: true},
                            {field: 'certType', label: '证件类型', type: 'select', dataCode: 'STD_ZB_CERT_TYP', disabled: true},
                            {field: 'certCode', label: '证件号码', disabled: true},
                            {field: 'phone', label: '手机号码', disabled: true},
                            {field: 'indivRsdAddr', label: '居住地址', disabled: true}
                        ]
                   }],

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
                                field: 'indivAnnIncm', label: '个人月收入(元)', type: 'num', formatter: function (cellValue) {
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
                            {
                                field: 'familyMincm', label: '家庭月收入(元)', type: 'num', formatter: function (cellValue) {
                                    if (typeof (cellValue) == 'undefined' || cellValue == null || isNaN(cellValue))
                                        return;
                                    return yufp.util.moneyFormatter(cellValue, 2);
                                }
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
                            {field: 'indivSpsName', label: '配偶姓名'},
                            {field: 'indivSpsMphn', label: '手机号码'},
                            {field: 'indivSpsPhone', label: '配偶联系电话'},
                            {
                                field: 'indivSpsIdTyp',
                                label: '配偶证件类型',
                                type: 'select',
                                dataCode: 'STD_ZB_CERT_TYP',
                                hidden: false
                            },
                            {field: 'indivSpsIdCode', label: '配偶证件号码', hidden: false},
                            {field: 'indivSpsIdPeriod', label: '配偶证件有效期', type: 'date', editable: false, hidden: true},
                            {field: 'indivScomName', label: '工作单位', hidden: true},
                            {field: 'indivSpsPhn', label: '单位电话', hidden: true}
                        ]
                    }],

                    revformFields: [{
                        columnCount: 3,
                        fields: [
                            { field: 'contNo', label: '借款合同号'},
                            { field: 'billNo', label: '借据号'},
                            { field: 'channelCode', label: '渠道名称', type: 'select', dataCode: 'APPLY_CHANNEL_TYPE' },
                            { field: 'prdName', label: '产品名称'},
                            { field: 'loanAmount', label: '借据金额', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                            { field: 'unpdPrinBal', label: '逾期本金金额', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                            { field: 'overdueDays', label: '逾期本金天数'},
                            { field: 'loanStartDate', label: '贷款起始日'},
                            { field: 'loanEndDate', label: '贷款到期日'},
                            { field: 'accountStatus', label: '借据状态', type: 'select', dataCode: 'STD_ZB_ACC_STATUS' }
                        ]
                    }],

                    //贷款借据信息
                    loanFields: [{
                        columnCount: 3,
                        fields: [
                            { field: 'billNo', label: '借据号'},
                            { field: 'contNo', label: '借款合同号'},
                            { field: 'applySeq', label: '用信申请流水号'},
                            { field: 'cusId', label: '客户编号'},
                            { field: 'cusName', label: '客户姓名'},
                            { field: 'prdCode', label: '产品编号'},
                            { field: 'prdName', label: '产品名称'},
                            { field: 'channelCode', label: '渠道名称', type: 'select', dataCode: 'APPLY_CHANNEL_TYPE' },
                            { field: 'accountStatus', label: '借据状态', type: 'select', dataCode: 'STD_ZB_ACC_STATUS' },
                            { field: 'loanAmount', label: '借据金额', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                            { field: 'loanBalance', label: '借据余额', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                            { field: 'curType', label: '币种', type: 'select', dataCode: 'STD_ZX_CUR_TYPE' },
                            { field: 'loanStartDate', label: '贷款起始日'},
                            { field: 'loanEndDate', label: '贷款到期日'},
                            { field: 'loanTerm', label: '贷款期限'},
                            { field: 'loadTermType', label: '期限类型', dataCode: 'STD_ZB_TERM_TYPE', type: 'select'},
                            { field: 'capOverdueDate', label: '本金逾期起始日'},
                            { field: 'receIntCumu', label: '应收利息', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                            { field: 'actualIntCumu', label: '实收利息', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                            { field: 'overdueDays', label: '逾期天数'},
                            { field: 'unpdPrinBal', label: '逾期本金', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                            { field: 'unpdIntArrPrn', label: '应收罚息', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                            { field: 'actIntArrPrn', label: '实收罚息', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                            { field: 'actArrPrnBal', label: '应收复利', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                            { field: 'unpdIntArrPrn', label: '实收复利', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                            /* 逾期应收 = 逾期本金 + 逾期利息 + 罚息（元）*/
                            // { field: 'overdueReceInt', label: '逾期应收', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                            { field: 'irAdjustMode', label: '利率调整方式', dataCode: 'STD_ZB_IR_ADJ_MODE', type: 'select'},
                            { field: 'assureMeansMain', label: '主担保方式', dataCode: 'ASSURE_MEANS_MAIN', type: 'select'},
                            { field: 'repaymentMode', label: '还款方式', dataCode: 'STD_PRD_REPAY_MODE', type: 'select'},
                            { field: 'intRateType', label: '利率类型', dataCode: 'STD_ZB_EFR_CHNG_IND', type: 'select', hidden: true},
                            { field: 'realityIrY', label: '执行年利率', type: 'num', formatter: yufp.util.toPercent},
                            { field: 'prinFixedRate', label: '固定的罚息率', type: 'num', formatter: yufp.util.toPercent},
                            { field: 'createUser', label: '创建人'},
                            { field: 'createTime', label: '创建时间'},
                            { field: 'lastUpdateUser', label: '最后修改人'},
                            { field: 'lastUpdateTime', label: '最后修改时间'}
                        ]
                    }],

                    //历史催收信息
                    rcdTableColumns: [
                        {label: '催收任务编号', prop: 'colltTaskNo', sortable: true, resizable: true},
                        {label: '催收方式', prop: 'colltWay', sortable: true, resizable: true},
                        {label: '催收时间', prop: 'colltTime', sortable: true, resizable: true},
                        {label: '催收代码', prop: 'colltCode', sortable: true, resizable: true},
                        {label: '还款金额', prop: 'repayLmt', sortable: true, resizable: true},
                        {label: '还款日期', prop: 'repayDate', sortable: true, resizable: true},
                        {label: '催收结果备注', prop: 'colltRestRemark', sortable: true, resizable: true},
                        {label: '登记员', prop: 'inputUserCode', sortable: true, resizable: true}
                    ],

                    taskFlowformFields: [{
                        columnCount: 2,
                        fields: [
                            {
                                field: 'flowColltTaskType',
                                label: '流转催收任务类型',
                                sortable: true,
                                resizable: true,
                                dataCode: 'STD_COLLT_WAY',
                                type: 'select',
                                change: function (fields, value) {
                                    var colltWay = _self.$refs.reftable.selections[0].colltWay;
                                    if(fields === colltWay){
                                        _self.$message({message: '原催收方式已是，不需再流转！', type: 'warning'});
                                    }
                                    if('03'===colltWay || '04'===colltWay || '05'===colltWay){
                                        if ('01' === fields) {
                                            _self.$message({message: '不支持外催任务（委外催收、诉讼催收、风险代理催收）流转至内催（电话催收）！', type: 'warning'});
                                        }
                                    }
                                },
                                rules: [{
                                    required: true,
                                    message: '流转催收任务类型是必选项'
                                }]
                            }
                        ]
                    }, {
                        columnCount: 2,
                        fields: [
                            {
                                field: 'flowReson', label: '流转原因', sortable: true, resizable: true, type: 'textarea',
                                rows: 3,
                                rules: [{
                                    required: true,
                                    message: '流转原因是必选项'
                                }
                                ]
                            }
                        ]

                    }
                    ],

                    //任务分配
                    baseRefFields: [{
                        // columnCount: 1,
                        fields: [
                            {
                                label: '岗位名称', field: 'dutyName', type: 'custom',
                                is: 'grant-auth-duty-selector',
                                params: {userName: ''},
                                selectFn: function (val, formModel, arguments) {
                                    _self.$refs.baseRef.switch('dutyName', 'params', {userName: formModel.userName});
                                    var org = arguments[1];
                                    formModel.dutyName = org.dutyName;
                                    formModel.dutyCode = org.dutyCode;
                                },
                                rules: [{required: true, message: '必填!', trigger: 'blur'}]
                            },
                            {label: '岗位代码', field: 'dutyCode', type: 'input', hidden: true},
                        ]
                    }, {
                        // columnCount: 1,
                        fields: [
                            {
                                label: '用户名称', field: 'userName', type: 'custom',
                                is: 'div-user-duty-selector',
                                params: {dutyCode: ''},
                                clickFn: function (value, model, args) {
                                    var dutyCode = model.dutyCode;
                                    _self.$refs.baseRef.switch('userName', 'params', {dutyCode: model.dutyCode});
                                    _self.$refs.baseRef.rebuildFn();
                                },
                                selectFn: function (val, formModel, arguments) {
                                    var org = arguments[1];
                                    formModel.userName = org.userName;
                                    formModel.userCode = org.userCode;
                                },
                                rules: [{required: true, message: '必填!', trigger: 'blur'}]
                            },
                            {label: '用户编号', field: 'userCode', type: 'input', hidden: true},
                        ]
                    }],
                    returnButton: [
                        {
                            label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                _self.dialogVisibleFlow = false;
                            }
                        }
                    ],
                    updateButtons:
                        [
                            {
                                label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                                    var validate = false;
                                    _self.$refs.taskFlowform.validate(function (valid) {
                                        validate = valid;
                                    });
                                    if (!validate) {
                                        return;
                                    }
                                    var flowColltTaskType = model.flowColltTaskType;
                                    var colltWay = _self.$refs.reftable.selections[0].colltWay;
                                    if(flowColltTaskType === colltWay){
                                        _self.$message({message: '原催收方式已是，不需再流转！', type: 'warning'});
                                        return;
                                    }
                                    if('03'===colltWay || '04'===colltWay || '05'===colltWay){
                                        if ('01' === flowColltTaskType) {
                                            _self.$message({message: '不支持外催任务（委外催收、诉讼催收、风险代理催收）流转至内催（电话催收）！', type: 'warning'});
                                            return;
                                        }
                                    }
                                    var overDays = model.overDays;
                                    //05风险代理催收
                                    if (flowColltTaskType == '05') {
                                        if (overDays <= 360) {
                                            _self.$message("催收任务借据逾期日期未超过360天，不能流转到风险代理！");
                                            return;
                                        }
                                    }
                                    model.aprvUserCode = yufp.session.userId;
                                    model.aprvUserName = yufp.session.userName;
                                    model.createUser = yufp.session.userId;
                                    model.createUserOrg = yufp.session.org.orgCode;
                                    yufp.service.request({
                                        method: 'POST',
                                        url: backend.riskmService + '/api/collt/task/flow/app',
                                        data: model,
                                        callback: function (code, message, response) {
                                            if (code == 0) {
                                                _self.$refs.reftable.remoteData();
                                                _self.$message('操作成功');
                                                _self.dialogVisibleFlow = false;
                                            } else {
                                                _self.$message('操作失败');
                                            }
                                        }
                                    });
                                }
                            },
                            {
                                label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                    _self.dialogVisibleFlow = false;
                                }
                            }
                        ],
                    height: yufp.frame.size().height - 103,
                    dialogVisibleFlow: false,
                    dialogVisibleTask: false,
                    formDisabled: false,
                    dialogVisibleLoan: false,
                    dialogVisibleCus: false,
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

                switchStatus: function (viewType, editable) {
                    var _self = this;
                    _self.viewType = viewType;
                    // _self.updateButtons[0].hidden = !editable;
                    _self.formDisabled = editable;
                    _self.dialogVisibleFlow = editable
                },

                //超链接处理函数
                tablePropClick: function (scope, name) {
                    var _self = this;
                    _self.formDisabled = true;
                    var cusName = scope.cusName;
                    var loanNo = scope.loanNo;
                    if (name == cusName) {
                        //客户名称超链接处理函数
                        _self.dialogVisibleCus = true;
                        this.$nextTick(function () {
                            yufp.service.request({
                                method: "GET",
                                url: backend.cusService + '/api/cus/indiv/' + scope.cusId,
                                data: {},
                                callback: function (code, message, response) {
                                    _self.$refs.identityInfo.resetFn();
                                    _self.$refs.backgroundInfo.resetFn();
                                    _self.$refs.indivMarInFo.resetFn();
                                    if (response.success) {
                                        yufp.extend(_self.$refs.identityInfo.formModel, response.rows);
                                        yufp.extend(_self.$refs.backgroundInfo.formModel, response.rows);
                                        yufp.extend(_self.$refs.indivMarInFo.formModel, response.rows);
                                    } else {
                                        _self.$message("获取客户信息失败：" + response.message);
                                    }
                                }
                            });
                        });
                    } else if (name == loanNo) {
                        //借据编号超链接处理函数
                        var _self = this;
                        _self.dialogVisibleLoan = true;
                        this.$nextTick(function () {
                            _self.$refs.revformLoan.resetFn();
                            yufp.service.request({
                                method: "GET",
                                url: backend.creditService + '/api/acc/loan/' + scope.loanNo,
                                data: {},
                                callback: function (code, message, response) {
                                    if (response.success) {
                                        yufp.extend(_self.$refs.revformLoan.formModel, response.rows);
                                    } else {
                                        _self.$message("获取催收借据信息失败：" + response.message);
                                    }
                                }
                            });
                        })
                    }
                },

                /**
                 * @param viewType 表单类型
                 * @param editable 可编辑,默认false
                 */
                // 任务分配
                taskAllocationFn: function () {
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    var _self = this;
                    var obj = this.$refs.reftable.selections[0];
                    // var inputUserName = row.inputUserName;
                    // if (inputUserName != '' && inputUserName != null && inputUserName != "") {
                    //     this.$message({message: '只能对“催收员为空”的记录进行操作！', type: 'warning'});
                    //     return;
                    // }
                    var colltTask = obj.colltWay;
                    if ('03' == colltTask || '04' == colltTask || '05' == colltTask) {
                        _self.$message("不支持对外催任务（委外催收、诉讼催收、风险代理催收）进行任务分配！");
                        return;
                    }
                    if('01' != obj.taskSts){
                        _self.$message('只能处理任务状态为"正常"的数据');
                        return;
                    }
                    _self.dialogVisibleTask = true;
                    _self.dialogVisibleFlow = false;

                    this.$nextTick(function () {
                        var model = this.$refs.baseRef.formModel;
                        yufp.extend(model, obj);
                        model.lastUpdateUser = yufp.session.userId;
                        _self.$refs.baseRef.resetFn();
                    });
                },

                //人工流转
                artificialFlowFn: function () {
                    var _self = this;
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    var obj = _self.$refs.reftable.selections[0];
                    var taskSts = obj.taskSts;
                    if (taskSts != '01') {
                        this.$message({message: '只能处理任务状态为"正常"的数据', type: 'warning'});
                        return;
                    }
                    _self.dialogVisibleFlow = true;
                    _self.switchStatus('ADD', true);
                    this.$nextTick(function () {
                        //_self.switchParamsStatus();
                        _self.$refs.taskFlowform.resetFn();
                        //客户基本信息
                        _self.getCusInfo(obj);
                        //催收借据信息
                        _self.getLoanInfo(obj);
                        // 历史催收信息
                        var params = {
                            colltTaskNo: obj.colltTaskNo
                        }
                        _self.$refs.taskRcdform.remoteData(params);
                        yufp.extend(_self.$refs.taskFlowform.formModel, obj);
                    });
                },

                // 获取客户信息
                getCusInfo: function (obj) {
                    var _self = this;
                    yufp.service.request({
                        method: "GET",
                        url: backend.cusService + '/api/cus/indiv/' + obj.cusId,
                        data: {},
                        callback: function (code, message, response) {
                            _self.$refs.baseCusInfo.resetFn();
                            // _self.$refs.identityInfo.resetFn();
                            // _self.$refs.backgroundInfo.resetFn();
                            // _self.$refs.indivMarInFo.resetFn();
                            if (response.success) {
                                yufp.extend(_self.$refs.baseCusInfo.formModel, response.rows);
                                // yufp.extend(_self.$refs.identityInfo.formModel, response.rows);
                                // yufp.extend(_self.$refs.backgroundInfo.formModel, response.rows);
                                // yufp.extend(_self.$refs.indivMarInFo.formModel, response.rows);
                            } else {
                                _self.$message("获取客户信息失败：" + response.message);
                            }
                        }
                    });
                },

                // 获取催收借据信息
                getLoanInfo: function (row) {
                    var _self = this;
                    yufp.service.request({
                        method: "GET",
                        url: backend.creditService + '/api/acc/loan/' + row.loanNo,
                        data: {},
                        callback: function (code, message, response) {
                            // 重置表单，防止第二次点击查看时，为空数据出现上一次查看的数据
                            _self.$refs.revform.resetFn();
                            if (response.success) {
                                yufp.extend(_self.$refs.revform.formModel, response.rows);
                            } else {
                                _self.$message("获取催收借据信息失败：" + response.message);
                            }
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
                    var selections = this.$refs.reftable.selections[0];
                    var obj = this.$refs.baseRef.formModel;
                    selections.inputUserCode = obj.userCode;
                    selections.inputUserName = obj.userName;
                    selections.lastUpdateUser = yufp.session.userId;
                    yufp.service.request({
                        method: 'PUT',
                        url: backend.riskmService + '/api/collt/task/info',
                        data: selections,
                        callback: function (code, message, response) {
                            var data = response.rows;
                            if (code == 0 && data >= 0) {
                                _self.dialogVisibleTask = false;
                                _self.$message({
                                    message: '处理成功!',
                                    type: 'success'
                                });
                                _self.$refs.reftable.remoteData();
                            } else {
                                _self.$message({
                                    message: response.message,
                                    type: 'warning'
                                });
                            }
                        }
                    });

                },

                cancelFn: function () {
                    var _self = this;
                    _self.dialogVisibleTask = false;
                },

                accLoanInfoFn: function () {
                    var _self = this;
                    _self.dialogVisibleLoan = true;
                    this.$nextTick(function () {
                        this.$refs.revformLoan.resetFn();
                        yufp.extend(this.$refs.revformLoan.formModel, this.$refs.revform.formModel);
                    })
                },

                retrunFn: function () {
                    var _self = this;
                    _self.dialogVisibleLoan = false;
                },

                // 客户信息页面，返回按钮
                returnCusFn: function () {
                    this.dialogVisibleCus = false;
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
