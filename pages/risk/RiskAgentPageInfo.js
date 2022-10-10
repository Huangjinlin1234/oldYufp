/**
 * @create by ligm on 2019-08-27
 * @description 催收任务分配
 */
define(['./custom/widgets/js/ColltTaskInfoSelector.js',
    './custom/widgets/js/OrgSelector.js'
],function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,STD_RISK_LEVEL,COLLT_OUTS_TASK_STS,IDENT_WAY,STD_ZB_EFR_CHNG_IND,STD_PRD_REPAY_MODE,STD_ZB_ASSURE_MEANS,STD_COLLT_WAY,STD_ZB_IR_ADJ_MODE,STD_ZB_CERT_TYP,STD_ZB_TERM_TYPE,STD_ZX_SEX,STD_ZB_ACC_STATUS,STD_YES_NO,APPLY_CHANNEL_TYPE,STD_ZX_CUR_TYPE');
        yufp.custom.vue({
            components: {
                FileUpload: window.VueUploadComponent
            },
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    /**主页面列表 start*/
                    dataUrl: backend.riskmService + "/api/collt/task/distrs",
                    baseParams: {
                        colltWay:'05',
                        isPassDistr: 'Y'
                    },
                    queryFields: [
                        {placeholder: '风险代理机构编号', field: 'outsOrgCode', type: 'input'},
                        {placeholder: '风险代理机构名称', field: 'outsOrgName', type: 'input'},
                        {placeholder: '分配时间', field: 'distrTime', type: 'date'}
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

                    tableColumns: [//collt_task_distr
                        {label: '分配批次', prop: 'colltBatchNo', sortable: true, resizable: true},
                        {label: '风险代理机构编号', prop: 'outsOrgCode', sortable: true, resizable: true},
                        {label: '风险代理机构名称', prop: 'outsOrgName', sortable: true, resizable: true},
                        {
                            label: '分配金额', prop: 'distrLmt', sortable: true, resizable: true,
                            formatter: function (row, column, cellValue) {
                                if (!row.distrLmt) {
                                    return row.distrLmt;
                                } else {
                                    return yufp.util.moneyFormatter(row.distrLmt, 2);
                                }
                            }
                        },
                        {label: '分配任务数', prop: 'distrTaskNum', sortable: true, resizable: true},
                        {
                            label: '分配金额占比', prop: 'distrLmtRatio', sortable: true, resizable: true,
                            formatter: function (row, column, cellValue) {
                                var num = parseFloat(cellValue);
                                if (typeof (num) == 'undefined' || num == null || isNaN(num))
                                    num = 0;
                                var rateY = yufp.util.toPercent((parseFloat(num) * 100).toFixed(6));
                                return rateY;
                            }
                        },
                        {
                            label: '分配任务数占比', prop: 'distrTasksRatio', sortable: true, resizable: true,
                            formatter: function (row, column, cellValue) {
                                var num = parseFloat(cellValue);
                                if (typeof (num) == 'undefined' || num == null || isNaN(num))
                                    num = 0;
                                var rateY = yufp.util.toPercent((parseFloat(num) * 100).toFixed(6));
                                return rateY;
                            }
                        },
                        {label: '分配时间', prop: 'distrTime', sortable: true, resizable: true},
                        {label: '操作员', prop: 'opUserCode', sortable: true, resizable: true},
                        {label: '操作员所属机构', prop: 'opOrgCode', sortable: true, resizable: true, is: 'div-org-selector', params: {showType: 'CNNAME'}}
                    ],
                    /**主页面列表 end*/
                    /**分案机构版本号展示*/
                    dataRateUrl: backend.flowService + "/api/distri/rate/orgver",
                    ratebaseParams: {
                        cooprOrgType:'002'
                    },
                    queryOrgVerFields: [
                        {placeholder: '版本号', field: 'versionNo', type: 'input'}
                    ],
                    queryOrgVerButtons: [
                        {
                            label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                                if (valid) {
                                    _self.$refs.refRatetable.remoteData(model);
                                }
                            }
                        },
                        {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2'}
                    ],
                    tableRateColumns: [
                        { label: '版本号', prop: 'versionNo', sortable: true, resizable: true },
                        { label: '审批完成时间', prop: 'apprvFnshTime', sortable: true, resizable: true}
                    ],
                    dataRateDelUrl: backend.flowService + "/api/distri/rate/orgver/detail",
                    ratebaseDetParams:{},
                    tableDetColumns: [
                        { label: '版本号', prop: 'versionNo', sortable: true, resizable: true },
                        { label: '合作机构号', prop: 'cooprOrgNo', sortable: true, resizable: true },
                        { label: '合作机构名称', prop: 'cooprOrgName', sortable: true, resizable: true },
                        { label: '案件占比', prop: 'caseRatio', sortable: true, resizable: true,
                            formatter: function (row, column, cellValue) {
                                var num = parseFloat(cellValue);
                                if (typeof (num) == 'undefined' || num == null || isNaN(num))
                                    num = 0;
                                var rateY = yufp.util.toPercent((parseFloat(num) * 100).toFixed(6));
                                return rateY;
                            }
                        }
                    ],
                    /**分配查看 start*/
                    dataUrlDistri: backend.riskmService + "/api/collt/task/riskAgt/infos",
                    distriParams: {},
                    queryDistriFields: [
                        {placeholder: '催收任务编号', field: 'colltTaskNo', type: 'input'},
                        {placeholder: '借据编号', field: 'loanNo', type: 'input'},
                        {placeholder: '证件号', field: 'certCode', type: 'input'},
                        {placeholder: '客户编号', field: 'cusId', type: 'input'},
                        {placeholder: '客户名称', field: 'cusName', type: 'input'},
                        {placeholder: '风险等级', field: 'riskLevel', type: 'select', dataCode: 'STD_RISK_LEVEL'},
                        {placeholder: '任务状态', field: 'taskSts', type: 'select', dataCode: 'COLLT_OUTS_TASK_STS'}
                    ],
                    queryDistriButtons: [
                        {
                            label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                                if (valid) {
                                    _self.$refs.reftableDistri.remoteData(model);
                                }
                            }
                        },
                        {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2'}
                    ],
                    distriColumns: [
                        {label:'催收任务编号', prop: 'colltTaskNo', sortable: true, resizable: true},
                        {label:'分配批次', prop: 'colltBatchNo', sortable: true, resizable: true},
                        {label:'风险代理机构编号', prop: 'outsOrgCode', sortable: true, resizable: true},
                        {label:'风险代理机构名称', prop: 'outsOrgName', sortable: true, resizable: true},
                        {label:'客户编号', prop: 'cusId', sortable: true, resizable: true},
                        {label:'客户名称', prop: 'cusName', sortable: true, resizable: true},
                        {label: '证件号', prop: 'certCode', sortable: true, resizable: true},
                        {label:'借据编号', prop: 'loanNo', sortable: true, resizable: true},
                        {label:'逾期天数', prop: 'overDays', sortable: true, resizable: true},
                        {
                            label: '逾期金额', prop: 'overLmt', sortable: true, resizable: true,
                            formatter: function (row, column, cellValue) {
                                if (!row.overLmt) {
                                    return row.overLmt;
                                } else {
                                    return yufp.util.moneyFormatter(row.overLmt, 2);
                                }
                            }
                        },
                        {label:'逾期期数', prop: 'overNper', sortable: true, resizable: true},
                        {label:'风险等级', prop: 'riskLevel',sortable: true,resizable: true,dataCode: 'STD_RISK_LEVEL'},
                        {label:'风险类型', prop: 'riskType', sortable: true, resizable: true, dataCode: ''},
                        {label:'催收方式', prop: 'colltWay',sortable: true,resizable: true,dataCode: 'STD_COLLT_WAY'},
                        {label:'识别方式', prop: 'identWay', sortable: true, resizable: true, dataCode: 'IDENT_WAY'},
                        {label:'任务状态', prop: 'taskSts', sortable: true,resizable: true,dataCode: 'COLLT_OUTS_TASK_STS'},
                        {label:'入催时间', prop: 'createTime', sortable: true, resizable: true},
                        {label:'操作员', prop: 'opUserCode', sortable: true, resizable: true},
                        {label:'操作员所属机构', prop: 'opOrgCode', sortable: true, resizable: true}
                    ],
                    closeButtons: [
                        {
                            label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                _self.dialogDistriVisible = false;
                            }
                        }
                    ],
                    /**分配查看 end*/

                    /**客户基本信息 start*/
                    cusBaseInfoFields: [{
                        columnCount: 2,
                        fields: [
                            {field: 'outsOrgCode', label: '风险代理机构编号', disabled: true, hidden: false},
                            {field: 'outsOrgName', label: '风险代理机构名称', disabled: true, hidden: false},
                            {field: 'cusId', label: '客户编号', disabled: true, hidden: false},
                            {field: 'cusName', label: '客户名称', disabled: true, hidden: false},
                            {field: 'certType',label: '证件类型', disabled: true, hidden: false,type: 'select',dataCode: 'STD_ZB_CERT_TYP'},
                            {field: 'certCode', label: '证件号码', disabled: true, hidden: false}


                        ]
                    }],
                    /**客户基本信息 end*/

                    /**催收借据列表 start*/
                    collReceiptInfoFields: [
                        {
                            columnCount: 3,
                            fields: [
                                {field: 'contNo', label: '合同编号', disabled: true, hidden: false},
                                {field: 'loanNo', label: '借据编号', disabled: true, hidden: false},
                                {field: 'channelCode', label: '渠道名称', disabled: true, hidden: false},
                                {field: 'prdName', label: '产品名称', disabled: true, hidden: false},
                                {field: 'loanAmount', label: '借据金额(元)', disabled: true, hidden: false,type:'num',digit: 2,formatter: yufp.util.moneyFormatter},
                                {field: 'unpdPrinBal', label: '逾期本金金额', disabled: true, hidden: false,type:'num',digit: 2,formatter: yufp.util.moneyFormatter},
                                {field: 'overDays', label: '逾期本金天数', disabled: true, hidden: false},
                                {field: '', label: '逾期利息金额', disabled: true, hidden: false},
                                {field: 'overDays', label: '逾期利息天数', disabled: true, hidden: false},
                                {field: 'loanStartDate', label: '借据起始日', disabled: true, hidden: false},
                                {field: 'loanEndDate', label: '借据到期日', disabled: true, hidden: false},
                                {field: 'accountStatus', label: '借据状态', disabled: true, hidden: false, type: 'select', dataCode: 'STD_ZB_ACC_STATUS'}
                            ]
                        }
                    ],
                    collReceiptButtons: [
                        {
                            label: '查看', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                                _self.dialogAccLaonVisible = true;
                                if (model.loanNo != null && model.loanNo !='') {
                                    _self.$nextTick(function () {
                                        yufp.service.request({
                                            method: "GET",
                                            url: backend.creditService + '/api/acc/loan/' + model.loanNo,
                                            data: {},
                                            callback: function (code, message, response) {
                                                if (response.success) {
                                                    // 重置表单，防止第二次点击查看时，为空数据出现上一次查看的数据
                                                    _self.$refs.accLaonInfo.resetFn();
                                                    yufp.extend(_self.$refs.accLaonInfo.formModel,response.rows);
                                                } else {
                                                    _self.$message("获取催收借据信息失败：" + response.message);
                                                }
                                            }
                                        });
                                    })
                                } else {
                                    _self.$message({message: "借据号为空，无法查询准确信息！", type: 'warning'});
                                }
                            }
                        }
                    ],
                    accLaonFields: [
                        {
                            columnCount: 3,
                            fields:[
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
                        }
                    ],
                    accLaonButtons:[
                        {
                            label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                _self.dialogAccLaonVisible = false;
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

                    /**催收借据列表 end*/
                    /**历史催收记录 start*/
                    dataUrlhisColl: backend.riskmService + "/api/collt/task/rcds/taskno",
                    hisCollParams: {},
                    hisCollColumns: [//collt_task_rcd
                        {label: '催收任务编号', prop: 'colltTaskNo', sortable: true, resizable: true},
                        {label: '催收方式', prop: 'colltWay', sortable: true, resizable: true, dataCode: 'STD_COLLT_WAY'},
                        {label: '催收时间', prop: 'colltTime', sortable: true, resizable: true, hidden:true},
                        {label: '催收代码', prop: 'colltCode', sortable: true, resizable: true},
                        {label: '还款金额', prop: 'repayLmt', sortable: true, resizable: true},
                        {label: '还款日期', prop: 'repayDate', sortable: true, resizable: true, hidden:true},
                        {label: '催收结果备注', prop: 'colltRestRemark', sortable: true, resizable: true},
                        {label: '登记员', prop: 'inputUserCode', sortable: true, resizable: true, hidden:true},
                        {label: '登记员', prop: 'inputUserName', sortable: true, resizable: true}
                    ],
                    /**历史催收记录 end*/

                    /** 历史催收记录，用于查看页面 */
                    hisCollDetailParams: {},
                    hisCollDetailColumns: [ // 催收任务记录表 （collt_task_rcd）
                        {label: '催收任务编号', prop: 'colltTaskNo', sortable: true, resizable: true},
                        {label: '催收方式', prop: 'colltWay', sortable: true, resizable: true, dataCode: 'STD_COLLT_WAY'},
                        {label: '催收时间', prop: 'colltTime', sortable: true, resizable: true, hidden:true},
                        {label: '催收代码', prop: 'colltCode', sortable: true, resizable: true},
                        {label: '委外经手类型', prop: 'outsHdleType', sortable: true, resizable: true, dataCode: 'STD_HANDLE_TYPE'},
                        {label: '外催机构编号', prop: 'outsOrgCode', sortable: true, resizable: true},
                        {label: '外催机构名称', prop: 'outsOrgName', sortable: true, resizable: true},
                        {label: '还款金额', prop: 'repayLmt', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                                return yufp.util.moneyFormatter(cellValue, 2);
                            }},
                        {label: '还款日期', prop: 'repayDate', sortable: true, resizable: true, hidden:true},
                        {label: '催收回款率(%)', prop: 'colltRecRate', sortable: true, resizable: true,
                            formatter: function (row, column, cellValue) {
                                if (!row.colltRecRate) {
                                    return row.colltRecRate;
                                } else {
                                    return yufp.util.decimalToPercent(row.colltRecRate, 2);
                                }
                            }},
                        {label: '催收结果备注', prop: 'colltRestRemark', sortable: true, resizable: true},
                        {label: '登记日期', prop: 'inputDate', sortable: true, resizable: true},
                        {label: '登记员', prop: 'inputUserCode', sortable: true, resizable: true, hidden: true},
                        {label: '登记员', prop: 'inputUserName', sortable: true, resizable: true}
                    ],


                    /**流转信息*/
                    dataUrlflow: backend.riskmService + "/api/collt/task/flow/apps",
                    flowParams: {},
                    flowColumns: [
                        {label: '催收任务编号', prop: 'colltTaskNo', sortable: true, resizable: true},
                        {label: '流转催收任务类型', prop: 'flowColltTaskType', sortable: true, resizable: true,type:'select',dataCode:'STD_COLLT_WAY'},
                        {label: '流转原因', prop: 'flowReson', sortable: true, resizable: true},
                        {label: '操作员', prop: 'createUser', sortable: true, resizable: true},
                        {label: '操作时间', prop: 'createTime', sortable: true, resizable: true},
                        {label: '操作员所属机构', prop: 'createUserOrg', sortable: true, resizable: true}
                    ],
                    /**风险代理催收登记信息 start*/
                    litiCollInfoFields: [
                        {
                            columnCount: 2,
                            fields: [
                                {field: 'colltTaskNo', label: '催收任务编号', disabled: true, hidden: true},
                                {field: 'colltWay', label: '催收方式', disabled: true, hidden: true},
                                {field: 'colltBatchNo', label: '分配批次号', disabled: true, hidden: true},
                                {field: 'outsOrgCode', label: '分配机构编号', disabled: true, hidden: true},
                                {field: 'outsOrgName', label: '分配机构名称', disabled: true, hidden: true},
                                {field: 'inputUserCode', label: '登记员', disabled: true, hidden: true},
                                {field: 'inputDate', label: '登记日期', disabled: true, hidden: false},
                                {
                                    field: 'colltCode', label: '催收代码', disabled: false, hidden: false,
                                    rules: [{required: true, message: '必填项', trigger: 'blur'}]
                                },
                                {field: 'marginAmt', label: '保证金金额', disabled: false, hidden: false,
                                    rules: [{required: true, message: '必填项', trigger: 'blur'}]},
                                {field: 'agentDtRange', label: '代理周期', disabled: false, hidden: false, type: 'daterange' ,value:[] , editable:false,
                                    rules: [{required: true, message: '必填项', trigger: 'blur', type:"array"}] },
                                {field: 'colltRecRate', label: '催收回款率(%)', disabled: true, hidden: false,
                                    rules: [{required: true, message: '必填项', trigger: 'blur'}]},
                                {field: 'repayLmt', label: '回收金额', disabled: false, hidden: true}
                            ]
                        },
                        {
                            columnCount: 1,
                            fields: [
                                {field: 'colltRestRemark', label: '催收结果备注', type: 'textarea', rows: 3, rules: [{required: true, message: '必填项', trigger: 'blur'}]}
                            ]
                        }
                    ],
                    litiCollInfoButtons: [
                        {
                            label: '提交', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                                var validate = false;
                                _self.$refs.litiCollInfo.validate(function (valid) {
                                    validate = valid;
                                });
                                if (!validate) {
                                    return;
                                }
                                var obj = {

                                };
                                yufp.service.request({
                                    method: 'POST',
                                    url: backend.riskmService + "/api/collt/task/rcd",
                                    data: obj,
                                    callback: function (code, message, response) {
                                        if (code == 0) {
                                            _self.$message('操作成功');
                                            _self.dialogSonVisible = false;
                                            var conditions = {
                                                colltBatchNo: model.colltBatchNo,
                                                outsOrgCode: model.outsOrgCode,
                                                colltWay:model.colltWay
                                            };
                                            _self.$nextTick(function () {
                                                _self.$refs.reftableDistri.remoteData(conditions);
                                            });
                                        } else {
                                            _self.$message('操作失败');
                                        }
                                    }
                                });
                            }
                        },
                        {
                            label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                _self.dialogSonVisible = false;
                            }
                        }
                    ],
                    /**风险代理催收登记信息 end*/
                    /**附件上传 start*/
                    // dataUrlannex: backend.riskmService + "/api/collt/task/distrs",
                    // annexParams: {},
                    // annexColumns: [
                    //     {label: '序号', prop: 'opUserCode', sortable: true, resizable: true},
                    //     {label: '附件名称', prop: 'opUserCode', sortable: true, resizable: true},
                    //     {label: '附件描述', prop: 'opUserCode', sortable: true, resizable: true},
                    //     {label: '上传人', prop: 'opUserCode', sortable: true, resizable: true},
                    //     {label: '上传时间', prop: 'opUserCode', sortable: true, resizable: true}
                    // ],
                    /**附件上传 end*/
                    /**催收结果 start*/
                    dataUrlcollRs: backend.riskmService + "/api/collt/res/records",
                    collRsParams: {
                        colltWay:'05'
                    },
                    collRsColumns: [//collt_res_record
                        {label: '记录流水号', prop: 'recordSerno', sortable: true, resizable: true, hidden: true},
                        {label: '催收任务编号', prop: 'colltTaskNo', sortable: true, resizable: true},
                        {label: '催收方式', prop: 'colltWay', sortable: true, resizable: true, dataCode: 'STD_COLLT_WAY'},
                        {label: '客户编号', prop: 'cusId', sortable: true, resizable: true},
                        {label: '客户名称', prop: 'cusName', sortable: true, resizable: true},
                        {label: '借据编号', prop: 'loanNo', sortable: true, resizable: true},
                        {
                            label: '还款金额', prop: 'repayLmt', sortable: true, resizable: true,
                            formatter: function (row, column, cellValue) {
                                if (!row.repayLmt) {
                                    return row.repayLmt;
                                } else {
                                    return yufp.util.moneyFormatter(row.repayLmt, 2);
                                }
                            }
                        },
                        {label: '还款日期', prop: 'repayDate', sortable: true, resizable: true},
                        // {label: '任务状态', prop: 'taskSts', sortable: true, resizable: true, dataCode: 'COLLT_OUTS_TASK_STS'},
                        {label: '催收结果备注', prop: 'colltResRemark', sortable: true, resizable: true},
                        {label: '操作员', prop: 'opUserCode', sortable: true, resizable: true},
                        {label: '操作员所属机构', prop: 'opOrgCode', sortable: true, resizable: true},
                        {label: '是否有效', prop: 'isValid', sortable: true, resizable: true, dataCode: 'STD_YES_NO', hidden: true}
                    ],

                    closeImportButtons:[
                        {
                            label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                var conditions = {
                                    colltBatchNo: model.colltBatchNo,
                                    outsOrgCode: model.outsOrgCode,
                                    colltWay:model.colltWay
                                };
                                _self.$nextTick(function () {
                                    _self.$refs.reftableDistri.remoteData(conditions);
                                });
                                _self.dialogImportVisible = false;
                            }
                        }
                    ],

                    /**关闭dialogSonVisible*/
                    closeSonButtons: [
                        {
                            label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                _self.dialogSonVisible = false;
                            }
                        }
                    ],
                    /**上传文件 */
                    uploadUrl: backend.riskmService + "/api/collt/res/record/temp/upload",
                    /**单笔新增 start*/
                    singleFields: [
                        {
                            columnCount: 2,
                            fields: [
                                {
                                    field: 'colltTaskNo', label: '催收任务编号', type: 'custom', is: 'div-colltTaskInfo-selector', params: {},
                                    clickFn:function(value,model,args){
                                        _self.$refs.singleInfo.switch('colltTaskNo','params',{colltWay : _self.distriParams.colltWay,
                                            colltBatchNo: _self.distriParams.colltBatchNo, outsOrgCode: _self.distriParams.outsOrgCode});
                                        _self.$refs.singleInfo.rebuildFn();
                                    },
                                    selectFn: function (val, formModel, arguments) {
                                        formModel.colltBatchNo = arguments[1].colltBatchNo;
                                        formModel.outsOrgCode = arguments[1].outsOrgCode;
                                        formModel.outsOrgName = arguments[1].outsOrgName;
                                        formModel.cusId = arguments[1].cusId;
                                        formModel.cusName = arguments[1].cusName;
                                        formModel.loanNo = arguments[1].loanNo;
                                        formModel.opUserCode = arguments[1].opUserCode;
                                        formModel.opOrgCode = arguments[1].opOrgCode;
                                    },
                                    rules: [{required: true, message: '必填项', trigger: 'blur'}]
                                },
                                {
                                    field: 'cusId', label: '客户编号', disabled: true, hidden: false,
                                    rules: [{required: true, message: '必填项', trigger: 'blur'}]
                                },
                                {
                                    field: 'colltWay', label: '催收方式', disabled: true, hidden: false, type:'select', dataCode: 'STD_COLLT_WAY',
                                    rules: [{required: true, message: '必填项', trigger: 'blur'}]
                                },
                                {
                                    field: 'cusName', label: '客户名称', disabled: true, hidden: false,
                                    rules: [{required: true, message: '必填项', trigger: 'blur'}]
                                },
                                {
                                    field: 'loanNo', label: '借据编号', disabled: true, hidden: false,
                                    rules: [{required: true, message: '必填项', trigger: 'blur'}]
                                },
                                {
                                    field: 'repayLmt', label: '还款金额', disabled: false, hidden: false,type:'num',digit: 2,formatter: yufp.util.moneyFormatter,
                                    rules: [{ required: true, message: '必填项,请填入数字', trigger: 'blur', type: 'number' }]
                                },
                                {
                                    field: 'repayDate', label: '还款日期', disabled: false, hidden: false, type: 'date',
                                    rules: [{required: true, message: '必填项', trigger: 'blur', type: 'date'}]
                                },
                                // {
                                //     field: 'taskSts', label: '任务状态', disabled: false, hidden: false, type: 'select', dataCode: 'COLLT_OUTS_TASK_STS',
                                //     datacodeFilter: function (options) {
                                //         this.typeOptions = [];
                                //         for (var i = 0; i < options.length; i++) {
                                //             if (options[i].key == '03') {
                                //                 this.typeOptions.push(options[i]);
                                //             }
                                //         }
                                //     },
                                //     rules: [{required: true, message: '必填项', trigger: 'blur'}]
                                // },
                                {
                                    field: 'opUserCode', label: '操作员', disabled: true, hidden: false,
                                    rules: [{required: true, message: '必填项', trigger: 'blur'}]
                                },
                                {
                                    field: 'opOrgCode', label: '操作员所属机构', disabled: true, hidden: false,
                                    rules: [{required: true, message: '必填项', trigger: 'blur'}]
                                },
                                {
                                    field: 'isValid', label: '是否有效', disabled: false, hidden: true, type: 'select', dataCode: 'STD_YES_NO',
                                    // rules: [{required: true, message: '必填项', trigger: 'blur'}]
                                },
                                {field: 'colltBatchNo', label: '分配批次', disabled: false,  hidden: true},
                                {field: 'outsOrgCode', label: '风险代理机构编号', disabled: false,  hidden: true},
                                {field: 'outsOrgName', label: '风险代理机构名称', disabled: false,  hidden: true}
                            ]
                        },
                        {
                            columnCount: 1,
                            fields: [
                                {
                                    field: 'colltResRemark', label: '催收结果备注', type: 'textarea', rows: 3,
                                    rules: [{required: true, message: '必填项', trigger: 'blur'}]
                                }
                            ]
                        }
                    ],
                    singleButtons: [
                        {
                            label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                                var validate = false;
                                _self.$refs.singleInfo.validate(function (valid) {
                                    validate = valid;
                                });
                                if (!validate) {
                                    return;
                                }
                                _self.$confirm('确认数据准确无误？点击确定继续保存操作。', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning',
                                    center: true,
                                    callback: function (action) {
                                        if (action === 'confirm') {
                                            yufp.service.request({
                                                method: 'POST',
                                                url: backend.riskmService + '/api/collt/res/record',
                                                data: model,
                                                callback: function (code, message, response) {
                                                    if (response.code == 0) {
                                                        _self.$message('操作成功');
                                                        _self.dialogSingleVisible = false;
                                                        _self.$refs.singleInfo.resetFn();
                                                        _self.$refs.collRsTable.remoteData();
                                                    } else {
                                                        _self.$message('操作失败' + response.message);
                                                    }
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        },
                        {
                            label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                _self.$refs.singleInfo.resetFn();
                                _self.dialogSingleVisible = false;
                            }
                        }
                    ],
                    /**单笔新增 end*/
                    /**按模板导入临时列表*/
                    dataUrlcollRsTemp: backend.riskmService + "/api/collt/res/record/temp/infos",
                    collRsTempParams: {},
                    collRsTempColumns:[
                        {label: '记录流水号', prop: 'recordSerno', sortable: true, resizable: true, hidden:true},
                        {label: '催收任务编号', prop: 'colltTaskNo', sortable: true, resizable: true},
                        {label: '催收方式', prop: 'colltWay', sortable: true, resizable: true, dataCode: 'STD_COLLT_WAY'},
                        {label: '客户编号', prop: 'cusId', sortable: true, resizable: true},
                        {label: '客户名称', prop: 'cusName', sortable: true, resizable: true},
                        {label: '借据编号', prop: 'loanNo', sortable: true, resizable: true},
                        {
                            label: '还款金额', prop: 'repayLmt', sortable: true, resizable: true,
                            formatter: function (row, column, cellValue) {
                                if (!row.repayLmt) {
                                    return row.repayLmt;
                                } else {
                                    return yufp.util.moneyFormatter(row.repayLmt, 2);
                                }
                            }
                        },
                        {label: '还款日期', prop: 'repayDate', sortable: true, resizable: true},
                        // {label: '任务状态', prop: 'taskSts', sortable: true, resizable: true, dataCode: 'COLLT_OUTS_TASK_STS'},
                        {label: '催收结果备注', prop: 'colltResRemark', sortable: true, resizable: true},
                        {label: '操作员', prop: 'opUserCode', sortable: true, resizable: true},
                        {label: '操作员所属机构', prop: 'opOrgCode', sortable: true, resizable: true},
                        {label: '是否有效', prop: 'isValid', sortable: true, resizable: true, dataCode: 'STD_YES_NO'}
                    ],
                    /**单笔新增 end*/
                    /**上传文件 end*/
                    height: yufp.frame.size().height - 103,
                    extensions: ['xls', 'xlsx'],
                    fileData: {},
                    headers: {},
                    files: [],
                    errors: [],
                    fileExcelName: '',
                    tipsVisible: false,
                    loading2: false,
                    fullscreenLoading: false,
                    dialogDistriVisible: false,
                    dialogSonVisible: false,
                    dialogSingleVisible: false,
                    dialogAccLaonVisible: false,
                    dialogImportVisible: false,
                    dialogImportExcelVisible :false,
                    dialogTempVisible: false,
                    formDisabled: false,
                    distriRateVisible: false,
                    checkIsShowCus: true,
                    checkIsShowCollReceipt: true,
                    checkIsShowHisColl: true,
                    isShowHisCollDetail: false,
                    checkIsShowLitiColl: true,
                    checkIsShowAnnex: true,
                    checkIsShowFlow: true,
                    checkIsShowFlowTable: true,
                    checkIsShowFlowForm: true,
                    exportFileName: "风险代理任务分配信息",
                    tabName: 'firstTab',
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
                },
                /**主页面列表按钮功能实现*/
                //导出
                exportFn: function () {
                    var _self = this;
                    var obj = _self.$refs.reftable.selections[0];
                    if (_self.$refs.reftable.selections.length != 1) {
                        _self.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }

                    //20201121lmj
                    var dt = new Date();
                    var curYear = dt.getFullYear();
                    var curMonth = ("0"+((dt.getMonth())+1)).slice(-2);
                    var curDay = ("0"+dt.getDate()).slice(-2);
                    var currDt = curYear + curMonth + curDay;
                    this.$confirm('是否导出数据?', '提示').then(function () {
                        yufp.util.exportExcelByTable({
                            fileName: "风险代理任务分配信息_"+obj.outsOrgName+'_'+currDt,
                            importType: 'service', // page当前页 selected 选中的数据  service 后端数据
                            ref: _self.$refs.reftableDistri,
                            url: backend.riskmService + "/api/collt/task/riskAgt/infos",
                            method: 'POST',
                            param: {
                                outsOrgCode: obj.outsOrgCode,
				colltBatchNo: obj.colltBatchNo,
                                colltWay:'05',
                                exportFlag: 'exp'
                            }
                        });
                    });
                },
                //分案
                //先查询可分案的机构版本号
                divisionFn: function () {
                    var _self = this;
                    _self.distriRateVisible = true;
                    _self.ratebaseParams = {
                        cooprOrgType:'003'
                    },
                        this.$nextTick(function () {
                            _self.$refs.refRateDettable.data = [];
                            _self.$refs.refRatetable.remoteData(_self.ratebaseParams);
                        });
                },
                searchdataRateDelFn: function (row, event) {
                    var _self = this;
                    _self.ratebaseDetParams = {
                        versionNo: row.versionNo
                    };
                    this.$nextTick(function () {
                        _self.$refs.refRateDettable.data = [];
                        this.$refs.refRateDettable.remoteData(_self.ratebaseDetParams);
                    });

                },
                cancelVerNoFn :function () {
                    var _self = this;
                    _self.distriRateVisible = false;
                },
                confirmVerNoFn: function () {
                    var _self = this;
                    var selections = _self.$refs.refRatetable.selections;
                    if (selections.length != 1) {
                        _self.$message({message: '请先在“版本号”列表项选择一条版本号', type: 'warning'});
                        return;
                    }
                    _self.distriRateVisible = false;
                    _self.$confirm('以该版本的机构案件分配比例开始分案？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function (action) {
                            if (action === 'confirm') {
                                _self.fullscreenLoading = true;
                                yufp.service.request({
                                    method: "POST",
                                    url: backend.flowService + '/api/collt/task/infos/div',
                                    data: {
                                        colltWay:'05',
                                        cooprOrgType: '003',
                                        opUserCode: yufp.session.userCode,
                                        opOrgCode: yufp.session.org.orgCode,
                                        versionNo: selections[0].versionNo
                                    },
                                    callback: function (code, message, response) {
                                        if (response.success) {
                                            _self.$refs.reftable.remoteData();
                                            // _self.$message({ message: response.message , type: "success" });
                                            _self.$message({ message: '分案成功，已提交分案结果，待审批处理！' , type: "success" });
                                            _self.fullscreenLoading = false;
                                        } else {
                                            _self.$message({ message: response.message , type: "warning" });
                                            _self.fullscreenLoading = false;
                                        }
                                    }
                                });
                            }
                        }
                    });


                },
                //分配查看
                assignFn: function () {
                    var _self = this;
                    var obj = _self.$refs.reftable.selections;
                    if (obj.length != 1) {
                        _self.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    _self.dialogDistriVisible = true;
                    _self.distriParams = {
                        colltBatchNo: obj[0].colltBatchNo,
                        outsOrgCode: obj[0].outsOrgCode,
                        colltWay:obj[0].colltWay
                    };
                    this.$nextTick(function () {
                        _self.$refs.reftableDistri.remoteData(_self.distriParams);
                    });
                },
                /**分配查看主页面按钮功能实现*/
                //结案
                closeCaseFn: function () {
                    var _self = this;
                    _self.viewType = 'ADD';
                    var obj = _self.$refs.reftableDistri.selections;
                    if (obj.length != 1) {
                        _self.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    if (obj[0].taskSts != '03' && obj[0].taskSts != '08') {
                        _self.$message({message: '现阶段只支持对任务状态为"结清"或"到期结案"的催收任务进行结案！', type: 'warning'});
                        return;
                    }
                    //结案时详细页面隐藏流转信息的部分
                    _self.checkIsShowFlow = false;
                    //隐藏外催登记信息
                    _self.isShowHisCollDetail = false;

                    //结案时详细页面显示附件上传的部分
                    _self.checkIsShowAnnex = true;
                    //
                    _self.dialogSonVisible = true;
                    //显示律所催收
                    _self.checkIsShowLitiColl = true;
                    //显示历史催收记录
                    _self.checkIsShowHisColl = true;
                    // 附件上传记录表格参数
                    _self.baseParamsAnnex = {
                        flowAppNo : obj[0].colltTaskNo,
                        bizSerno : obj[0].colltTaskNo
                    };

                    _self.$nextTick(function () {
                        _self.$refs.cusBaseInfo.switch('outsOrgCode', 'hidden', false);
                        _self.$refs.cusBaseInfo.switch('outsOrgName', 'hidden', false);
                        _self.$refs.cusBaseInfo.switch('indivSex', 'hidden', false);
                        _self.$refs.cusBaseInfo.switch('phoneNum', 'hidden', false);
                        // 附件上传记录数据展示
                        _self.$refs.reftableAnnex.remoteData(_self.baseParamsAnnex);
                    })
                    //客户基本信息
                    _self.queryCusInfo(obj[0]);
                    //催收借据列表
                    _self.queryLaonInfo(obj[0]);
                    //历史催收记录
                    _self.queryHisColl(obj[0]);
                    //律所催收登记
                    _self.litiCollReg(obj[0]);
                },
                //查看
                detailFn: function () {
                    var _self = this;
                    var obj = _self.$refs.reftableDistri.selections;
                    if (obj.length != 1) {
                        _self.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    //查看时详细页面显示流转信息的部分
                    _self.checkIsShowFlow = true;
                    //
                    _self.dialogSonVisible = true;
                    //显示历史流转信息
                    _self.checkIsShowFlowTable = true;
                    //显示外催登记信息
                    _self.isShowHisCollDetail = true;

                    //查看时详细页面隐藏附件上传的部分
                    _self.checkIsShowAnnex = false;
                    //隐藏流转信息输入框
                    _self.checkIsShowFlowForm = false;
                    //隐藏律所催收
                    _self.checkIsShowLitiColl = false;
                    //隐藏历史催收记录
                    _self.checkIsShowHisColl = false;

                    _self.$nextTick(function () {
                        _self.$refs.cusBaseInfo.switch('outsOrgCode', 'hidden', true);
                        _self.$refs.cusBaseInfo.switch('outsOrgName', 'hidden', true);
                        _self.$refs.cusBaseInfo.switch('indivSex', 'hidden', true);
                        _self.$refs.cusBaseInfo.switch('phoneNum', 'hidden', true);
                    })
                    //客户基本信息
                    _self.queryCusInfo(obj[0]);
                    //催收借据列表
                    _self.queryLaonInfo(obj[0]);
                    //历史催收记录
                    _self.queryHisColl(obj[0]);
                    //人工流转
                    _self.manualFlow(obj[0]);
                },
                //查询客户信息
                queryCusInfo: function (item) {
                    var _self = this;
                    _self.$nextTick(function () {
                        // 重置表单，防止第二次点击查看时，为空数据出现上一次查看的数据
                        _self.$refs.cusBaseInfo.resetFn();
                    });
                    if (item.cusId != null && item.cusId != '') {
                        yufp.service.request({
                            method: "GET",
                            url: backend.cusService + '/api/cus/indiv/' + item.cusId,
                            data: {},
                            callback: function (code, message, response) {
                                if (response.success) {
                                    _self.$nextTick(function () {
                                        yufp.extend(_self.$refs.cusBaseInfo.formModel,
                                            response.rows,
                                            {outsOrgCode: item.outsOrgCode},
                                            {outsOrgName: item.outsOrgName},
                                            {phoneNum: item.phoneNum});
                                    });
                                } else {
                                    _self.$message("获取客户信息失败：" + response.message);
                                }
                            }
                        });
                    } else {
                        _self.$message({message: "客户号为空，无法查询准确信息！", type: 'warning'});
                    }
                },
                //查询催收借据
                queryLaonInfo: function (item) {
                    var _self = this;
                    _self.$nextTick(function () {
                        // 重置表单，防止第二次点击查看时，为空数据出现上一次查看的数据
                        _self.$refs.collReceiptInfo.resetFn();
                    });
                    yufp.service.request({
                        method: "GET",
                        url: backend.creditService + '/api/acc/loan/' + item.loanNo,
                        data: {},
                        callback: function (code, message, response) {
                            if (response.success) {
                                _self.$nextTick(function () {
                                    //基本信息
                                    yufp.extend(_self.$refs.collReceiptInfo.formModel,
                                        response.rows,
                                        {loanNo: item.loanNo},
                                        {overDays: item.overDays});
                                });
                            } else {
                                _self.$message("获取催收借据信息失败：" + response.message);
                            }
                        }
                    });
                },
                //查询历史催收记录
                queryHisColl: function (item) {
                    var _self = this;
                    _self.hisCollParams = {
                        colltTaskNo: item.colltTaskNo
                    };
                    _self.$nextTick(function () {
                        _self.$refs.hisCollTable.remoteData(_self.hisCollParams);
                    });
                },

                //风险代理催收登记
                /**litiCollReg: function (item) {
                    var _self = this;
                    _self.$nextTick(function () {
                        _self.$refs.litiCollInfo.resetFn();

                        yufp.service.request({
                            method: 'POST',
                            url: backend.riskmService + '/api/get/repayLmt',
                            data: {
                                colltTaskNo:item.colltTaskNo,
                                colltBatchNo:item.colltBatchNo,
                                outsOrgCode:item.outsOrgCode
                            },
                            callback: function (code, message, response) {
                                if (code == 0) {
                                    // 计算结果后面加上''，将数据类型转换为string，不然执行保存的时候，必填项失效
                                    _self.$refs.litiCollInfo.formModel.colltRecRate = (response.rows / item.overLmt * 100) + '';
                                } else {
                                    this.$message({message: '催收登记处理失败！', type: 'warning'});
                                }
                            }
                        });

                        yufp.extend(_self.$refs.litiCollInfo.formModel,
                            {inputDate: yufp.session.OPENDAY},
                            {colltTaskNo: item.colltTaskNo},
                            {colltWay:item.colltWay},
                            {colltBatchNo: item.colltBatchNo},
                            {outsOrgCode: item.outsOrgCode},
                            {outsOrgName: item.outsOrgName},
                            {inputUserCode:yufp.session.userCode},
                            {repayLmt:response.rows.repayLmt}
                        );
                    });
                },*/

                litiCollReg: function (item) {
                    var _self = this;
                    _self.$nextTick(function () {
                        // 重置表单，防止第二次点击查看时，为空数据出现上一次查看的数据
                        _self.$refs.litiCollInfo.resetFn();
                        _self.setColltRecRate(item);
                        yufp.extend(_self.$refs.litiCollInfo.formModel,
                            {colltTaskNo: item.colltTaskNo},
                            {colltWay: item.colltWay},
                            {colltBatchNo: item.colltBatchNo},
                            {outsOrgCode: item.outsOrgCode},
                            {outsOrgName: item.outsOrgName},
                            {outsHdleType: item.outsHdleType},
                            {inputDate: yufp.session.OPENDAY},
                            {inputUserCode: yufp.session.userId}
                        );

                    });
                },
                setColltRecRate: function(item){
                    var _self = this;
                    if(item.taskSts == '08'){
                        yufp.service.request({
                            method: "POST",
                            url: backend.riskmService + '/api/get/repay/lmt',
                            data: {
                                colltBatchNo: item.colltBatchNo,
                                loanNo : item.loanNo,
                                colltWay: item.colltWay,
                            },
                            callback: function (code, message, response) {
                                if (response.success) {
                                    // 计算结果后面加上''，将数据类型转换为string，不然执行保存的时候，必填项失效
                                    _self.$refs.litiCollInfo.formModel.colltRecRate = yufp.util.moneyFormatter(response.rows / item.colltBalance, 4) * 100 + '';
                                } else {
                                    _self.$message("获取还款金额失败：" + response.message);
                                }
                            }
                        });
                    }
                    if(item.taskSts == '03'){
                        _self.$refs.litiCollInfo.formModel.colltRecRate = 100 + '';
                    }
                },

                //人工流转
                manualFlow: function (item) {
                    var _self = this;
                    var obj = _self.$refs.reftableDistri.selections;
                    if (obj.length != 1) {
                        _self.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    _self.flowParams = {
                        colltTaskNo: obj[0].colltTaskNo
                    };
                    this.$nextTick(function () {
                        _self.$refs.flowTable.remoteData(_self.flowParams);
                    });
                },
                //催收结果信息
                importFn: function () {
                    var _self = this;
                    _self.dialogImportVisible = true;
                    //限制表格只加载某机构的催收结果信息
                    yufp.extend(_self.collRsParams, {outsOrgCode: _self.distriParams.outsOrgCode});
                    _self.$nextTick(function () {
                        _self.$refs.collRsTable.remoteData(_self.collRsParams);
                    });
                },
                //模板下载
                downloadFn: function () {
                    var downLoadUrl = backend.riskmService + '/api/collt/res/record/template/downLoad';
                    window.location.href = downLoadUrl;
                },
                //按模板导入面板
                importExcelFn: function () {
                    this.dialogImportExcelVisible = true;
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
                //保存
                commitFileFn: function () {
                    if (this.files.length == 0) {
                        this.$message({message: '请选择一个文件', type: 'warning'});
                        return;
                    }
                    this.loading2 = true;
                    this.$nextTick(function () {
                        this.$refs.upload.active = true;
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
                                if (newFile.response.success === true) {
                                    mesType = 'success';
                                    this.$message({message: newFile.response.message, type: mesType});
                                    this.dialogTempVisible = true;
                                    this.$nextTick(function () {
                                        this.$refs.collRsTempTable.remoteData();
                                    });
                                } else {
                                    this.tipsVisible = true;
                                }
                            } else {
                                this.$message({message: '上传文件失败!', type: mesType});
                            }
                            this.dialogImportExcelVisible = false;
                            this.$refs.collRsTable.remoteData();
                            this.files = [];
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
                //取消按钮
                cancelFn: function () {
                    this.files = [];
                    this.fileExcelName = '';
                    this.dialogImportExcelVisible = false;
                },
                //单笔新增
                singleCreateFn: function () {
                    var _self = this;
                    _self.dialogSingleVisible = true;
                    _self.$nextTick(function () {
                        yufp.extend(_self.$refs.singleInfo.formModel,
                            // {opUserCode:yufp.session.userId},
                            // {opOrgCode:yufp.session.org.orgCode},
                            {colltWay:'05'}
                        );
                    });
                },
                //删除不需要的数据
                tempDeleteFn: function () {
                    var _self = this;
                    var selections = _self.$refs.collRsTempTable.selections;
                    if (selections.length < 1) {
                        _self.$message({message: '请先选择要删除的记录', type: 'warning'});
                        return;
                    }
                    var len = selections.length, arr = [];
                    for (var i = 0; i < len; i++) {
                        arr.push(selections[i].recordSerno);
                    }
                    _self.batchDelete(arr,backend.riskmService + "/api/collt/res/records/temp");
                },
                //确认需要的数据并保存
                confirmDataFn: function () {
                    var _self = this;
                    yufp.service.request({
                        method: 'POST',
                        url: backend.riskmService + "/api/collt/res/temp/save",
                        data: {},
                        callback: function (code, message, response) {
                            if (response.code == 0) {
                                _self.$refs.collRsTable.remoteData();
                                _self.deleteTemp();
                                _self.$message('操作成功');
                            } else {
                                // _self.deleteTemp();
                                _self.$message({message: '操作失败：' + response.message, type: 'warning'});
                            }
                        }
                    });
                },
                //取消导入操作
                concancelFn: function () {
                    var _self = this;
                    _self.$confirm('此操作将会清空您已经上传的数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function (action) {
                            if (action === 'confirm') {
                                _self.deleteTemp();
                            }
                        }
                    });
                },
                //删除暂存的数据
                deleteTemp: function () {
                    var _self = this;
                    _self.files = [];
                    _self.fileExcelName = '';
                    _self.dialogTempVisible = false;
                    yufp.service.request({
                        method: 'DELETE',
                        url: backend.riskmService + "/api/collt/res/all/temp",
                        data: {},
                        callback: function (code, message, response) {
                            if (code == 0) {
                                _self.$message('操作成功');
                            } else {
                                _self.$message({message: '操作失败', type: 'warning'});
                            }
                        }
                    });
                },
                //催收结果信息刪除
                singleDeleteFn: function () {
                    var _self = this;
                    var selections = _self.$refs.collRsTable.selections;
                    if (selections.length < 1) {
                        _self.$message({message: '请先选择要删除的记录', type: 'warning'});
                        return;
                    }
                    var len = selections.length, arr = [];
                    for (var i = 0; i < len; i++) {
                        arr.push(selections[i].recordSerno);
                    }
                    _self.batchDelete(arr,backend.riskmService + "/api/collt/res/records");
                },
                //批量删除操作
                batchDelete: function (item,url) {
                    var _self = this;
                    _self.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function (action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: 'DELETE',
                                    url: url,
                                    data: {
                                        recordSerno: item.join(',')
                                    },
                                    callback: function (code, message, response) {
                                        if (code == 0) {
                                            if (_self.$refs.collRsTable != 'undefined') _self.$refs.collRsTable.remoteData();
                                            if (_self.$refs.collRsTempTable != 'undefined') _self.$refs.collRsTempTable.remoteData();
                                            _self.$message('操作成功');
                                        } else {
                                            _self.$message('操作失败');
                                        }
                                    }
                                });
                            }
                        }
                    });
                },
                //取消按钮
                cancelFn1: function () {
                    this.files = [];
                    this.errors = [];
                    this.fileExcelName = '';
                    this.importDialogVisible = false;
                    this.tipsVisible = false;
                    this.dialogTempVisible = true;
                },
                //导入催收信息 end

                //撤回功能
                withdrawFn: function () {
                    var _self = this;
                    if (_self.$refs.reftableDistri.selections.length != 1) {
                        _self.$message({ message: '请先选择一条记录', type:'warning' });
                        return;
                    }
                    var obj = _self.$refs.reftableDistri.selections[0];
                    _self.$confirm('请确认是否要强制执行撤回？', '提示').then(function () {
                        yufp.service.request({
                            method: 'POST',
                            url: backend.riskmService + "/api/collt/task/infos/withdraw",
                            data: obj,
                            callback: function (code, message, response) {
                                if (code==0 && response.rows > 0) {
                                    _self.$refs.reftableDistri.remoteData();
                                    _self.$message("已成功撤回到催收任务池");
                                } else {
                                    _self.$message("操作失败：" + response.message);
                                }
                            }
                        });
                    });
                },


                /**附件上传相关*/
                uploadAnnexFn: function () {
                    var _self = this;
                    _self.dialogVisibleAnnex = true;
                    _self.annexFormDisabled = false;
                    _self.flag = '';
                    var colltTaskNo = _self.$refs.reftableDistri.selections[0].colltTaskNo;
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
                                this.$message("获取影像系统信息失败：" + response.message);
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
