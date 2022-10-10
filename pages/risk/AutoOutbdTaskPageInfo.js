/**
 * @create by ligm on 2019-08-27
 * @description 自动外呼任务
 */
define([
    './custom/widgets/js/UserSelecter.js',
    './custom/widgets/js/DutySelecter.js',
    './custom/widgets/js/GrantAuthInfoDutySelector.js',
    './custom/widgets/js/GrantAuthInfoUserSelector.js'
],function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,STD_RISK_LEVEL,COLLT_TASK_STATUS,TODO,OUTBOUND_COLLT_WAY,CASE_QUEUE,STD_ZB_CERT_TYP');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    dataUrl:backend.riskmService + '/api/auto/outbd/tasks',
                    baseParams: {
                    },
                    baseTab: 'baseTab',
                    expandCollapseName: ['identityInfo', 'backgroundInfo', 'indivMarInFo','cusInfo','accLoan'],
                    queryFields: [
                        { placeholder: '客户编号', field: 'cusId', type: 'input' },
                        { placeholder: '客户名称', field: 'cusName', type: 'input' },
                        { placeholder: '风险等级', field: 'riskLevel', type: 'select' ,dataCode:"STD_RISK_LEVEL"},
                        { placeholder: '任务状态', field: 'taskSts', type: 'select',dataCode:"COLLT_TASK_STATUS" },
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
                        { label: '催收任务编号', prop: 'colltTaskNo', sortable: true, resizable: true },
                        { label: '客户编号', prop: 'cusId', sortable: true, resizable: true },
                        { label: '客户名称', prop: 'cusName', sortable: true, resizable: true,
                            template: function () {
                                return '<template scope="scope">\
                    			<a href="javascript:void(0);" style="text-decoration:underline;"@click="_$event(\'custom-row-click\',scope.row,scope.row.cusName)">{{ scope.row.cusName }}</a>\
                    		</template>';
                            }
                        },
                        { label: '借据编号', prop: 'loanNo', sortable: true, resizable: true,
                            template: function () {
                                return '<template scope="scope">\
                    			<a href="javascript:void(0);" style="text-decoration:underline;"@click="_$event(\'custom-row-click\', scope.row,scope.row.loanNo)">{{ scope.row.loanNo }}</a>\
                    		</template>';
                            }
                        },
                        { label: '逾期天数', prop: 'overDays', sortable: true, resizable: true },
                        { label: '逾期金额', prop: 'overLmt', sortable: true, resizable: true },
                        { label: '逾期期数', prop: 'overNper', sortable: true, resizable: true },
                        { label: '风险等级', prop: 'riskLevel', sortable: true, resizable: true,dataCode:"STD_RISK_LEVEL" },
                        { label: '风险类型', prop: 'riskType', sortable: true, resizable: true,dataCode:"TODO" },
                        { label: '催收方式', prop: 'colltWay', sortable: true, resizable: true ,dataCode:"OUTBOUND_COLLT_WAY"},
                        { label: '案件队列', prop: 'caseQueue', sortable: true, resizable: true,dataCode:"CASE_QUEUE" },
                        { label: '任务状态', prop: 'taskSts', sortable: true, resizable: true,dataCode:"COLLT_TASK_STATUS"},
                        { label: '催收时间', prop: 'createTime', sortable: true, resizable: true },
                        // { label: '发送内容', prop: 'sendContent', sortable: true, resizable: true },
                        { label: '任务完成时间', prop: 'finishTime', sortable: true, resizable: true },
                    ],

                    updateButtons: [
                        {
                            label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false,
                            click: function (model) {
                                _self.dialogVisible = false;
                            }
                        }
                    ],

                    //申请人基本信息-身份信息
                    identityInfoFields: [{
                        columnCount: 3,
                        fields: [
                            {field: 'cusId', label: '客户编号', disabled: true},
                            {field: 'cusName', label: '客户名称', disabled: true},
                            {field: 'indivSex', label: '性别', type: 'select', dataCode: 'STD_ZX_SEX', disabled: true},
                            {field: 'indivDtOfBirth', label: '出生日期', editable: false, disabled: true},//,type:'date'
                            {field: 'certType', label: '证件类型', type: 'select', dataCode: 'STD_ZB_CERT_TYP', disabled: true},
                            {field: 'certCode', label: '证件号码', disabled: true},
                            {field: 'phone', label: '手机号码', disabled: true},
                            {field: 'fstAppChannel', label: '首次申请渠道', type: 'select', dataCode: 'APPLY_CHANNEL_TYPE', disabled: true},
                            {field: 'indivRsdAddr', label: '居住地址', disabled: true},
                            {field: 'indivNtn', label: '民族', type: 'select', dataCode: 'STD_ZB_NATION', disabled: true},
                            {field: 'indivComName', label: '工作单位名称', disabled: true},
                            {field: 'indivComTyp', label: '单位性质', type: 'select', dataCode: 'STD_ZB_REG_TYPE', disabled: true},
                            {field: 'indivCrtfctn', label: '职称', type: 'select', dataCode: 'STD_ZX_TITLE', disabled: true},
                            {field: 'indivOcc', label: '职业', type: 'select', dataCode: 'STD_ZX_EMPLOYMET', disabled: true},
                            {
                                field: 'indivAnnIncm', label: '个人月收入(元)', disabled: true, type: 'num', formatter: function (cellValue) {
                                    if (typeof (cellValue) == 'undefined' || cellValue == null || isNaN(cellValue))
                                        return;
                                    return yufp.util.moneyFormatter(cellValue, 2);
                                }
                            },  //年收入情况
                            {field: 'postAddr', label: '通讯地址', disabled: true},
                            {field: 'postCode', label: '邮政编码', disabled: true},
                            {field: 'indivMarSt', label: '婚姻状况', disabled: true, type: 'select', dataCode: 'STD_ZX_MARR_STATUS'},
                            {field: 'inputId', label: '创建人', disabled: true},   //登记人
                            {field: 'createTime', label: '创建时间', disabled: true},
                            {field: 'lastUpdateUser', label: '最后修改人', disabled: true},
                            {field: 'lastUpdateTime', label: '最后修改时间', disabled: true}
                        ] }],

                    //申请人基本信息-背景信息
                    backgroundInfoFields: [{
                        columnCount: 3,
                        fields: [
                            { field: 'indivEdt', label: '最高学历', disabled: true, type: 'select',dataCode:'ZB_DEGREE'},
                            { field: 'agriFlg', label: '是否农户', disabled: true, type: 'select', dataCode:'STD_YES_NO' },
                            { field: 'familyAddr', label: '家庭地址', disabled: true },
                            { field: 'fphone', label: '家庭电话', disabled: true},
                            { field: 'familyMincm', label: '家庭月收入(元)', disabled: true, type:'num',formatter: function(cellValue) {
                                    if (typeof(cellValue) == 'undefined'  || cellValue == null || isNaN(cellValue) )
                                        return;
                                    return yufp.util.moneyFormatter(cellValue, 2);
                                },rules: [{ validator: yufp.validator.number, message: '必须填写数字', trigger: 'blur'} ]},
                            { field: 'indivHealSt', label: '健康状况', disabled: true, type: 'select',dataCode:'STD_ZB_HEAL_ST', hidden:true },
                            { field: 'hasFamilyMember', label: '是否有家庭成员', disabled: true, type: 'select', dataCode:'STD_ZX_YES_NO', hidden:true }
                        ] }],

                    //申请人基本信息-婚姻状况
                    indivMarInFoFields: [{
                        columnCount: 3,
                        fields: [
                            { field: 'indivSpsName', label: '配偶姓名', disabled: true , rules: [ { required: false, message: '已婚客户，此项必填!', trigger: 'blur'}]},
                            { field: 'indivSpsMphn', label: '手机号码', disabled: true },
                            { field: 'indivSpsPhone', label: '配偶联系电话', disabled: true },
                            { field: 'indivSpsIdTyp', label: '配偶证件类型', disabled: true, type: 'select',dataCode:'STD_ZB_CERT_TYP', hidden: true},
                            { field: 'indivSpsIdCode', label: '配偶证件号码' , disabled: true, hidden: true},
                            { field: 'indivSpsIdPeriod', label: '配偶证件有效期', disabled: true,type:'date' , editable: false,  hidden: true },
                            { field: 'indivScomName', label: '工作单位', disabled: true, hidden: true},
                            { field: 'indivSpsPhn', label: '单位电话', disabled: true, hidden: true}
                        ] }],

                    // //客户信息页面的返回按钮
                    // retrunCusButtons:[
                    //     {
                    //         label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                    //             _self.cusDialogVisible = false;
                    //             _self.$refs.reftable.remoteData();
                    //         }
                    //     }
                    // ],

                    //借据信息展示 -- 借据信息查看详情一致
                    revformFieldsLoan: [{
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
                            //逾期利息 delay_int_cumu
                            { field: 'unpdIntArrPrn', label: '罚息', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                            /* 逾期应收 = 逾期本金 + 逾期利息 + 罚息（元）*/
                            { field: 'fine2IntAccr', label: '应收利息罚息', hidden: true},
                            { field: 'overdueReceInt', label: '逾期应收', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                            { field: 'irAdjustMode', label: '利率调整方式', dataCode: 'STD_ZB_IR_ADJ_MODE', type: 'select'},
                            { field: 'assureMeansMain', label: '主担保方式', dataCode: 'STD_ZB_ASSURE_MEANS', type: 'select'},
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

                    // //借据信息页面的返回按钮
                    // retrunLoanButtons:[
                    //     {
                    //         label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                    //             _self.loanDialogVisible = false;
                    //             _self.$refs.reftable.remoteData();
                    //         }
                    //     }
                    // ],

                    //查看催收记录
                    dataUrlRcd: backend.riskmService + '/api/auto/outbd/tasks',
                    baseParamsRcd: {
                    },
                    tableColumnsRcd: [
                        { label: '催收任务编号', prop: 'colltTaskNo', sortable: true, resizable: true },
                        { label: '催收方式', prop: 'colltWay', sortable: true, resizable: true , dataCode:'OUTBOUND_COLLT_WAY'},
                        { label: '催收时间', prop: 'colltTime', sortable: true, resizable: true },
                        { label: '发送内容', prop: 'sendContent', sortable: true, resizable: true },
                    ],

                    cusInfoFields: [{
                        columnCount: 2,
                        fields: [
                            {field: 'cusId', label: '客户编号', disabled: true},
                            {field: 'cusName', label: '客户名称', disabled: true},
                            {field: 'certType', label: '证件类型', type: 'select', dataCode: 'STD_ZB_CERT_TYP', disabled: true},
                            {field: 'certCode', label: '证件号码', disabled: true},
                        ]
                    }],

                    // //借据信息页面的返回按钮
                    // retrunRcdButtons:[
                    //     {
                    //         label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                    //             _self.detailDialogVisible = false;
                    //             _self.$refs.reftable.remoteData();
                    //         }
                    //     }
                    // ],

                    height: yufp.frame.size().height - 103,
                    cusDialogVisible: false,
                    detailDialogVisible: false,
                    checkIsShowCus: false,
                    formDisabled: false,
                    checkIsShowRcd: false,
                    loanDialogVisible: false,
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

                switchStatus: function (viewType, editable) {
                    var _self = this;
                    _self.viewType = viewType;
                    // _self.updateButtons[0].hidden = !editable;
                    _self.formDisabled = editable;
                    _self.cusDialogVisible = editable
                },

                //超链接处理函数
                tablePropClick: function (scope, name) {
                    var _self = this;
                    _self.cusDialogVisible = true;
                    _self.formDisabled = true;
                    var cusName = scope.cusName;
                    var loanNo = scope.loanNo;
                    if (name == cusName) {
                        //客户名称超链接处理函数
                        _self.cusDialogVisible = true;
                        this.$nextTick(function () {
                            yufp.service.request({
                                method: "GET",
                                url: backend.cusService + '/api/cus/indiv/' + scope.cusId,
                                data: {},
                                callback: function (code, message, response) {
                                    if (response.success) {
                                        _self.$refs.identityInfo.resetFn();
                                        _self.$refs.backgroundInfo.resetFn();
                                        _self.$refs.indivMarInFo.resetFn();

                                        yufp.extend(_self.$refs.identityInfo.formModel, response.rows);
                                        yufp.extend(_self.$refs.backgroundInfo.formModel, response.rows);
                                        yufp.extend(_self.$refs.indivMarInFo.formModel, response.rows);
                                    } else {
                                        _self.$message("获取客户基本信息失败：" + response.message);
                                    }
                                }
                            });
                        });
                    } else {
                        //借据编号超链接处理函数
                        var _self = this;
                        _self.loanDialogVisible = true;
                        _self.cusDialogVisible = false;
                        this.$nextTick(function () {
                            yufp.service.request({
                                method: "GET",
                                url: backend.creditService + '/api/acc/loan/' + scope.loanNo,
                                data: {},
                                callback: function (code, message, response) {
                                    if (response.success) {
                                        _self.$refs.revformLoan.resetFn();
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
                switchStatus: function (viewType, editable) {
                    var _self = this;
                    _self.viewType = viewType;
                    // _self.updateButtons[0].hidden = !editable;
                    // _self.updateButtons[1].hidden = !editable;
                    _self.formDisabled = !editable;
                    _self.cusDialogVisible = true;

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
                    var _self = this;
                    _self.detailDialogVisible = true;
                    _self.checkIsShowCus = true;
                    _self.checkIsShowRcd = true;
                    var obj = _self.$refs.reftable.selections[0];
                    _self.baseParamsRcd = {
                        colltTaskNo: obj.colltTaskNo
                    }
                    this.$nextTick(function () {
                        if(obj.cusId != '' && obj.cusId != null){
                            _self.queryCusInfo(obj.cusId);
                        }
                        _self.$refs.reftableRcd.remoteData(_self.baseParamsRcd);
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
                                    _self.$refs.cusInfo.resetFn();
                                    yufp.extend(_self.$refs.cusInfo.formModel, response.rows);
                                } else {
                                }
                            }
                        });
                    });
                },

                deleteFn: function () {
                    var _self = this;
                    var selections = _self.$refs.reftable.selections;
                    if (selections.length < 1) {
                        _self.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var len = selections.length, arr = [];
                    for (var i = 0; i < len; i++) {
                    }

                    yufp.service.request({
                        method: 'DELETE',
                        url: '/api/auto/outbd/task',
                        data: {
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
                cusReturnFn:function () {
                    this.cusDialogVisible = false;
                    this.$refs.reftable.remoteData();
                },
                LoanReturnFn:function () {
                    this.loanDialogVisible = false;
                    this.$refs.reftable.remoteData();
                },
                detailReturnFn:function () {
                    this.detailDialogVisible = false;
                    this.$refs.reftable.remoteData();
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
    exports.onmessage = function (type, message) {

    };
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {

    }

});
