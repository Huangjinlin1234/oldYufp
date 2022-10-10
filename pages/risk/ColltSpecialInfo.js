/**
 * @create xieziwei
 * @description 专项催收页面
 */
define(function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('APRV_STATUS,CRUD_TYPE,STD_RISK_LEVEL,COLLT_TASK_STATUS,STD_COLLT_WAY,IDENT_WAY,STD_ZB_CERT_TYP,APPLY_CHANNEL_TYPE,STD_ZB_ACC_STATUS,STD_ZX_CUR_TYPE,STD_ZB_TERM_TYPE,STD_ZB_IR_ADJ_MODE,STD_ZB_ASSURE_MEANS,STD_PRD_REPAY_MODE,STD_ZB_EFR_CHNG_IND,rpt_achieve_total_by_day');
        var vm = yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    baseParams: {
                        colltWay: '02',
                        isTaskDistr: 'Y'
                    },
                    //任务认领列表默认加载参数
                    baseParamsCla:{
                        colltWay: '02',
                        isTaskDistr: 'N'
                    },
                    baseTab: 'baseTab',
                    expandCollapseName: ['cusInfo','accLoan','colltHistory','taskFlowHistory','colltRegisterInfo','taskFlow'],
                    // 首页：催收任务信息表
                    taskInfoDataUrl: backend.riskmService + '/api/collt/task/special/infos',
                    //任务认领
                    taskInfoDataUrl2: backend.riskmService + '/api/collt/task/infos/all',
                    // 催收记录
                    taskRcdDataUrl: backend.riskmService + '/api/collt/task/rcds/taskno',
                    // 人工流转
                    taskFlowDataUrl: backend.riskmService + '/api/collt/task/flow/app',
                    // 短信提示
                    smsNoticeDataUrl: backend.riskmService + '/api/collt/sms/notice/app',


                    queryFields: [
                        { placeholder: '催收任务编号', field: 'colltTaskNo', type: 'input'},
                        { placeholder: '借据编号', field: 'loanNo', type: 'input'},
                        { placeholder: '证件号', field: 'certCode', type: 'input'},
                        { placeholder: '客户编号', field: 'cusId', type: 'input' },
                        { placeholder: '客户名称', field: 'cusName', type: 'input' },
                        { placeholder: '风险等级', field: 'riskLevel', type: 'select',dataCode:'STD_RISK_LEVEL'},
                        { placeholder: '任务状态', field: 'taskSts', type: 'select',dataCode:'COLLT_TASK_STATUS'}
                    ],
                    queryButtons: [
                        { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                                if (valid) {
                                    _self.$refs.reftable.remoteData(model);
                                }
                            } },
                        { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
                    ],

                    // 首页：催收任务池
                    tableColumns: [
                        { label: '催收任务编号', prop: 'colltTaskNo', sortable: true,  resizable: true },
                        { label: '分配批次号', prop: 'colltBatchNo',resizable: true ,hidden:true},
                        { label: '分配机构编号', prop: 'outsOrgCode', resizable: true ,hidden:true},
                        { label: '分配机构名称', prop: 'outsOrgName', resizable: true ,hidden:true},
                        { label: '催收方式', prop: 'colltWay', resizable: true ,type:'select',dataCode:'STD_COLLT_WAY',hidden:true},
                        { label: '委外经手类型', prop: 'outsHdleType',  resizable: true ,hidden:true},
                        { label: '客户编号', prop: 'cusId', sortable: true, resizable: true },
                        { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
                        { label: '证件号', prop: 'certCode', sortable: true, resizable: true},
                        { label: '手机号码', prop: 'phoneNum', sortable: true, resizable: true },
                        { label: '居住地址', prop: 'liveAddr',  sortable: true,  resizable: true },
                        { label: '借据编号', prop: 'loanNo',  sortable: true,  resizable: true },
                        { label: '逾期天数', prop: 'overDays', sortable: true, resizable: true },
                        { label: '逾期金额', prop: 'overLmt', sortable: true,  resizable: true },
                        { label: '逾期期数', prop: 'overNper', sortable: true,  resizable: true },
                        { label: '风险等级', prop: 'riskLevel', sortable: true, resizable: true ,type:'select',dataCode:'STD_RISK_LEVEL'},
                        { label: '风险类型', prop: 'riskType', sortable: true, resizable: true ,type:'select',dataCode:'TO_DO'},
                        { label: '催收方式', prop: 'colltWay', sortable: true, resizable: true ,type:'select',dataCode:'STD_COLLT_WAY'},
                        { label: '识别方式', prop: 'identWay', sortable: true, resizable: true ,type:'select',dataCode:'IDENT_WAY'},
                        { label: '任务状态', prop: 'taskSts', sortable: true, resizable: true ,type:'select',dataCode:'COLLT_TASK_STATUS'},
                        { label: '催收员编号', prop: 'inputUserCode',resizable: true ,hidden:true},
                        { label: '催收员名称', prop: 'inputUserName',  sortable: true, resizable: true },
                        { label: '入催时间', prop: 'createTime', resizable: true},
                        { label: '任务完成时间', prop: 'taskFnshTime' ,sortable: true, resizable: true },

                        { label: '操作员', prop: 'opUserCode', resizable: true ,hidden:true},
                        { label: '操作员所属机构', prop: 'opOrgCode', resizable: true ,hidden:true},
                        { label: '创建人', prop: 'createUser',resizable: true ,hidden:true},
                        { label: '最后更新人', prop: 'lastUpdateUser', resizable: true ,hidden:true},
                        { label: '最后更新时间', prop: 'lastUpdateTime',  resizable: true ,hidden:true}
                    ],

                    // 客户信息表单
                    cusInfoFields:[{
                        columnCount: 3,
                        fields: [
                            { field: 'cusId', label: '客户编号',disabled: true },
                            { field: 'cusName', label: '客户名称' ,disabled: true },
                            { field: 'certType', label: '证件类型',disabled: true  ,type: 'select',dataCode: 'STD_ZB_CERT_TYP'},
                            { field: 'certCode', label: '证件号码',disabled: true },
                            { field: 'phone', label: '手机号码',disabled: true  },
                            { field: 'indivRsdAddr', label: '居住地址' ,disabled: true }
                        ]}
                    ],
                    // 催收借据详情查看表单
                    accLoanInfoFields:[
                        {columnCount: 3,
                            fields: [
                                { field: 'billNo', label: '借据编号',disabled: true },
                                { field: 'cusId', label: '客户号',disabled: true },
                                { field: 'cusName', label: '客户姓名',disabled: true },
                                { field: 'prdCode', label: '产品编号',disabled: true },
                                { field: 'prdName', label: '产品名称',disabled: true },
                                { field: 'channelCode', label: '渠道',disabled: true , type: 'select', dataCode: 'APPLY_CHANNEL_TYPE' },
                                { field: 'accountStatus', label: '借据状态',disabled: true , type: 'select', dataCode: 'STD_ZB_ACC_STATUS' },
                                { field: 'loanAmount', label: '借据金额',disabled: true , type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                                { field: 'loanBalance', label: '借据余额',disabled: true , type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                                { field: 'curType', label: '币种',disabled: true , type: 'select', dataCode: 'STD_ZX_CUR_TYPE' },
                                { field: 'loanStartDate', label: '贷款起始日',disabled: true },
                                { field: 'loanEndDate', label: '贷款到期日',disabled: true },
                                { field: 'loanTerm', label: '贷款期限',disabled: true },
                                { field: 'loadTermType', label: '期限类型',disabled: true , type: 'select', dataCode: 'STD_ZB_TERM_TYPE'},
                                { field: 'capOverdueDate', label: '本金逾期起始日',disabled: true },
                                { field: 'receIntCumu', label: '应收利息',disabled: true , type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                                { field: 'intAccr', label: '应收利息（元）', hidden: true,disabled: true },
                                { field: 'overdueDays', label: '逾期天数',disabled: true },
                                { field: 'unpdPrinBal', label: '逾期本金',disabled: true , type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                                //逾期利息 delay_int_cumu
                                { field: 'unpdIntArrPrn', label: '罚息',disabled: true , type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                                /* 逾期应收 = 逾期本金 + 逾期利息 + 罚息（元）*/
                                { field: 'overdueReceInt', label: '逾期应收',disabled: true , type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                                { field: 'irAdjustMode', label: '利率调整方式',disabled: true , dataCode: 'STD_ZB_IR_ADJ_MODE', type: 'select'},
                                { field: 'assureMeansMain', label: '主担保方式',disabled: true , dataCode: 'STD_ZB_ASSURE_MEANS', type: 'select'},
                                { field: 'repaymentMode', label: '还款方式',disabled: true , dataCode: 'STD_PRD_REPAY_MODE', type: 'select'},
                                { field: 'fine2IntAccr', label: '应收利息罚息', hidden: true,disabled: true },
                                { field: 'intRateType', label: '利率类型', dataCode: 'STD_ZB_EFR_CHNG_IND', type: 'select', hidden: true,disabled: true },
                                { field: 'realityIrY', label: '执行年利率',disabled: true , type: 'num', formatter: yufp.util.toPercent},
                                { field: 'prinFixedRate', label: '固定的罚息率',disabled: true , type: 'num', formatter: yufp.util.toPercent},
                                { field: 'createUser', label: '创建人',disabled: true },
                                { field: 'createTime', label: '创建时间',disabled: true },
                                { field: 'lastUpdateUser', label: '最后修改人',disabled: true },
                                { field: 'lastUpdateTime', label: '最后修改时间',disabled: true }
                            ]
                        }
                    ],

                    // 历史催收记录表格
                    colltRcdTableColumns:[
                        { label: '催收任务编号', prop: 'colltTaskNo', sortable: true},
                        { label: '催收方式', prop: 'colltWay', sortable: true,type:'select',dataCode:'STD_COLLT_WAY'},
                        { label: '催收时间', prop: 'colltTime', sortable: true },
                        { label: '催收代码', prop: 'colltCode', sortable: true},
                        { label: '还款金额', prop: 'repayLmt', sortable: true},
                        { label: '还款日期', prop: 'repayDate', sortable: true },
                        { label: '催收结果备注', prop: 'colltRestRemark', sortable: true},
                        { label: '登记员', prop: 'inputUserCode', sortable: true ,hidden:true},
                        { label: '登记员', prop: 'inputUserName', sortable: true},

                        { label: '催收记录流水号', prop: 'colltSerno', sortable: true,hidden:true },
                        { label: '保证金金额', prop: 'marginAmt', sortable: true, hidden:true },
                        { label: '代理开始日期', prop: 'agentStartDt', sortable: true,hidden:true},
                        { label: '代理结束日期', prop: 'agentEndDt', sortable: true, hidden:true},
                        { label: '催收回收率', prop: 'colltRecRate', sortable: true, hidden:true },
                        { label: '登记日期', prop: 'inputDate', sortable: true, hidden:true},
                        { label: '最新修改人', prop: 'lastChgUsr', sortable: true, hidden:true},
                        { label: '最后修改时间', prop: 'lastChgTime', sortable: true, hidden:true }
                    ],

                    // 专项催收登记信息表单
                    colltRegisterInfoFields:[{
                        columnCount: 2,
                        fields: [
                            { field: 'inputDate', label: '登记日期',disabled: true },
                            { field: 'colltCode', label: '催收代码',rules: [{required: true, message: '催收代码是必填项'}]},
                            { field: 'repayLmt', label: '还款金额', rules: [{ required: true, message: '必填项', trigger: 'blur' },
                                { validator: yufp.validator.gZero,message: '必须填写数字', trigger: 'blur'} ]},
                            { field: 'repayDate', label: '还款日期',type: 'date' ,editable:false,rules: [{required: true, message: '还款日期是必填项'}]},
                            { field: 'colltRestRemark', label: '催收结果备注',type:'textarea',rules: [{required: true, message: '催收结果备注是必填项'}]},

                            { field: 'colltSerno;', label: '催收记录流水号',disabled: true, hidden:true },
                            { field: 'colltTaskNo', label: '催收任务编号',hidden:true },
                            { field: 'colltWay', label: '催收方式',hidden:true},
                            { field: 'colltTime', label: '催收时间',hidden:true},
                            { field: 'marginAmt', label: '保证金金额',hidden:true },
                            { field: 'agentStartDt', label: '代理开始日期',hidden:true},
                            { field: 'agentEndDt', label: '代理结束日期',hidden:true},
                            { field: 'colltRecRate', label: '催收回收率',hidden:true},
                            { field: 'inputUserCode', label: '登记员',hidden:true},
                            { field: 'lastChgUsr', label: '最新修改人',hidden:true },
                            { field: 'lastChgTime', label: '最后修改时间',hidden:true}
                        ]}
                    ],

                    // 任务流转信息表单
                    taskFlowFields:[{
                        columnCount: 3,
                        fields: [
                            { field: 'flowApplyNo', label: '流转申请编号',hidden:true},
                            { field: 'colltTaskNo', label: '催收任务编号',hidden:true},
                            { field: 'taskSts', label: '原催收任务状态',type:'select', dataCode:'COLLT_TASK_STATUS' ,hidden:true},
                            { field: 'basicColltTaskType', label: '原催收任务类型',hidden:true },
                            { field: 'flowColltTaskType', label: '流转催收任务类型',type:'select',dataCode:'STD_COLLT_WAY',
                                datacodeFilter: function(options){
                                    this.typeOptions = [];
                                    for(var i=0; i<options.length; i++){
                                        if(options[i].key == '01' || options[i].key == '03' || options[i].key == '04' || options[i].key == '05'){
                                            this.typeOptions.push(options[i]);
                                        }
                                    }
                                },
                                rules: [{required: true, message: '必填项'}]},
                            { field: 'flowReson', label: '流转原因',type:'textarea',rules: [{required: true, message: '流转原因是必填项'}]},
                            { field: 'approveStatus', label: '审批状态',hidden:true ,type:'select',dataCode: 'APRV_STATUS'},
                            { field: 'aprvUserCode', label: '审批人编号',hidden:true },
                            { field: 'aprvUserName', label: '审批人名称',hidden:true},
                            { field: 'aprvComment', label: '人工处理意见',hidden:true},
                            { field: 'aprvTime', label: '审批时间',hidden:true},
                            { field: 'createUser', label: '创建人',hidden:true },
                            { field: 'createTime', label: '创建时间',hidden:true},
                            { field: 'lastUpdateUser', label: '最后更新人',hidden:true },
                            { field: 'lastUpdateTime', label: '最后更新时间',hidden:true}
                        ]}
                    ],

                    // 短信通知表单
                    smsNoticeAppFields:[{
                        columnCount: 3,
                        fields: [
                            { field: 'smsNoticeApp', label: '短信通知申请流水号',hidden:true},
                            { field: 'colltTaskNo', label: '催收任务编号', disabled: true, hidden:true},
                            { field: 'colltWay', label: '催收方式',disabled:true, type:'select',dataCode:'STD_COLLT_WAY', hidden:true},
                            { field: 'cusId', label: '客户编号', hidden:true},
                            { field: 'cusName', label: '客户名称', disabled:true, hidden:true},
                            { field: 'phoneNum', label: '手机号码',hidden:true},

                            { field: 'approveStatus', label: '审批状态', type:'select',dataCode: 'APRV_STATUS',hidden:true},
                            { field: 'createUser', label: '创建人', disabled:true, hidden:true},
                            { field: 'createTime', label: '创建时间', disabled:true, hidden:true},
                            { field: 'lastUpdateUser', label: '最后更新人',hidden:true},
                            { field: 'lastUpdateTime', label: '最后更新时间',hidden:true}
                        ]},
                        {
                            columnCount: 1,
                            fields: [
                                { field: 'sendMsg', label: '发送内容',disabled:true, type:'textarea', rows: 3},
                            ]}
                    ],

                    taskFlowRcdDataUrl: backend.riskmService + '/api/collt/task/flow/rcd',
                    taskFlowRcdTableColumns:[
                        { label: '流转申请编号', prop: 'flowApplyNo' ,sortable: true, resizable: true },
                        { label: '催收任务编号', prop: 'colltTaskNo', sortable: true,  resizable: true },
                        { label: '原催收任务类型', prop: 'basicColltTaskType', resizable: true,type:'select', dataCode:'STD_COLLT_WAY'},
                        { label: '流转催收任务类型', prop: 'flowColltTaskType', resizable: true ,type:'select', dataCode:'STD_COLLT_WAY'},
                        { label: '创建人', prop: 'createUser',resizable: true },
                        { label: '审批通过时间', prop: 'aprvTime', resizable: true },
                    ],

                    updateFields: [{
                        columnCount: 3,
                        fields: [
                            { field: 'flowApplyNo', label: '流转申请编号'},
                            { field: 'colltTaskNo', label: '催收任务编号'},
                            { field: 'basicColltTaskType', label: '原催收任务类型'},
                            { field: 'flowColltTaskType', label: '流转催收任务类型'},
                            { field: 'flowReson', label: '流转原因'},
                            { field: 'approveStatus', label: '审批状态'},
                            { field: 'aprvUserCode', label: '审批人编号'},
                            { field: 'aprvUserName', label: '审批人名称'},
                            { field: 'aprvComment', label: '人工处理意见'},
                            { field: 'aprvTime', label: '审批时间'},
                            { field: 'createUser', label: '创建人'},
                            { field: 'createTime', label: '创建时间'},
                            { field: 'lastUpdateUser', label: '最后更新人'},
                            { field: 'lastUpdateTime', label: '最后更新时间'}
                        ]
                    }],
                    updateButtons: [
                        { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                                if (valid) {
                                    _self.$refs.reftable2.remoteData(model);
                                }
                            } },
                        { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
                    ],
                    height: yufp.frame.size().height - 103,
                    dialogVisible: false,
                    taskGetdialogVisible : false,
                    historyDialogVisible : false,
                    messageDialogVisible : false,
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
                    _self.updateButtons[1].hidden = !editable;
                    _self.formDisabled = !editable;


                },

                // 借据表单内容展示选择函数
                accLoanFieldsStatus: function (infoType) {
                    var _self = this;
                    if (!infoType) {
                        _self.$refs.accLoanRef.switch('cusId', 'hidden', true);
                        _self.$refs.accLoanRef.switch('cusName', 'hidden', true);
                        _self.$refs.accLoanRef.switch('prdCode', 'hidden', true);
                        _self.$refs.accLoanRef.switch('loanBalance', 'hidden', true);
                        _self.$refs.accLoanRef.switch('curType', 'hidden', true);
                        _self.$refs.accLoanRef.switch('loanTerm', 'hidden', true);
                        _self.$refs.accLoanRef.switch('loadTermType', 'hidden', true);
                        _self.$refs.accLoanRef.switch('capOverdueDate', 'hidden', true);
                        _self.$refs.accLoanRef.switch('receIntCumu', 'hidden', true);
                        _self.$refs.accLoanRef.switch('intAccr', 'hidden', true);
                        _self.$refs.accLoanRef.switch('unpdIntArrPrn', 'hidden', true);
                        _self.$refs.accLoanRef.switch('overdueReceInt', 'hidden', true);
                        _self.$refs.accLoanRef.switch('irAdjustMode', 'hidden', true);
                        _self.$refs.accLoanRef.switch('assureMeansMain', 'hidden', true);
                        _self.$refs.accLoanRef.switch('repaymentMode', 'hidden', true);
                        _self.$refs.accLoanRef.switch('fine2IntAccr', 'hidden', true);
                        _self.$refs.accLoanRef.switch('intRateType', 'hidden', true);
                        _self.$refs.accLoanRef.switch('realityIrY', 'hidden', true);
                        _self.$refs.accLoanRef.switch('prinFixedRate', 'hidden', true);
                        _self.$refs.accLoanRef.switch('createUser', 'hidden', true);
                        _self.$refs.accLoanRef.switch('createTime', 'hidden', true);
                        _self.$refs.accLoanRef.switch('lastUpdateUser', 'hidden', true);
                        _self.$refs.accLoanRef.switch('lastUpdateTime', 'hidden', true);
                    }
                    else{
                        _self.$refs.accLoanRef.switch('cusId', 'hidden', false);
                        _self.$refs.accLoanRef.switch('cusName', 'hidden', false);
                        _self.$refs.accLoanRef.switch('prdCode', 'hidden', false);
                        _self.$refs.accLoanRef.switch('loanBalance', 'hidden', false);
                        _self.$refs.accLoanRef.switch('curType', 'hidden', false);
                        _self.$refs.accLoanRef.switch('loanTerm', 'hidden', false);
                        _self.$refs.accLoanRef.switch('loadTermType', 'hidden', false);
                        _self.$refs.accLoanRef.switch('capOverdueDate', 'hidden', false);
                        _self.$refs.accLoanRef.switch('receIntCumu', 'hidden', false);
                        _self.$refs.accLoanRef.switch('intAccr', 'hidden', false);
                        _self.$refs.accLoanRef.switch('unpdIntArrPrn', 'hidden', false);
                        _self.$refs.accLoanRef.switch('overdueReceInt', 'hidden', false);
                        _self.$refs.accLoanRef.switch('irAdjustMode', 'hidden', false);
                        _self.$refs.accLoanRef.switch('assureMeansMain', 'hidden', false);
                        _self.$refs.accLoanRef.switch('repaymentMode', 'hidden', false);
                        _self.$refs.accLoanRef.switch('fine2IntAccr', 'hidden', false);
                        _self.$refs.accLoanRef.switch('intRateType', 'hidden', false);
                        _self.$refs.accLoanRef.switch('realityIrY', 'hidden', false);
                        _self.$refs.accLoanRef.switch('prinFixedRate', 'hidden', false);
                        _self.$refs.accLoanRef.switch('createUser', 'hidden', false);
                        _self.$refs.accLoanRef.switch('createTime', 'hidden', false);
                        _self.$refs.accLoanRef.switch('lastUpdateUser', 'hidden', false);
                        _self.$refs.accLoanRef.switch('lastUpdateTime', 'hidden', false);
                    }
                },

                //  折叠面板展示选择函数
                tagPartStatus:function(flowPartTagType){
                    if(flowPartTagType){
                        this.$refs.basecollapse.$children[3].$el.hidden = false;
                        this.$refs.basecollapse.$children[4].$el.hidden = true;
                        this.$refs.basecollapse.$children[5].$el.hidden = false;
                    }else{
                        this.$refs.basecollapse.$children[3].$el.hidden = true;
                        this.$refs.basecollapse.$children[4].$el.hidden = false;
                        this.$refs.basecollapse.$children[5].$el.hidden = true;
                    }
                },

                // 查询客户表
                cusInfoQuery: function(cusId){
                    var _self = this;
                    yufp.service.request({
                        method: 'GET',
                        // 客户信息表
                        url: backend.cusService + '/api/cus/indiv/'+cusId,
                        data: {
                        },
                        callback: function (code, message, response) {
                            if (response.success) {
                                _self.$refs.cusInfoRef.resetFn();
                                yufp.extend(_self.$refs.cusInfoRef.formModel, response.rows);
                            } else {
                                _self.$message("获取客户信息失败");
                            }
                        }
                    });
                },

                // 查询借据表
                accLoanQuery: function(loanNo){
                    var _self = this;
                    yufp.service.request({
                        method: 'GET',
                        // 借据信息表
                        url: backend.creditService + '/api/acc/loan/'+loanNo,
                        data: {
                        },
                        callback: function (code, message, response) {
                            if (response.success) {
                                _self.$refs.accLoanRef.resetFn();
                                yufp.extend(_self.$refs.accLoanRef.formModel, response.rows);
                            } else {
                                _self.$message(response.message);
                            }
                        }
                    });
                },

                // 任务认领对话框
                taskGet: function () {
                    var _self = this;
                    _self.switchStatus('ADD', true);
                    _self.taskGetdialogVisible = true;
                    _self.messageDialogVisible = false;
                    _self.dialogVisible = false;
                    _self.historyDialogVisible = false;
                    _self.$nextTick(function () {
                        _self.$refs.reftable2.remoteData();
                    });
                },

                // 任务认领按钮
                getTask: function(){
                    var _self = this;
                    this.$nextTick(function () {
                    });
                    var num = this.$refs.reftable2.selections.length;
                    if (num < 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    _self.$confirm('认领后您需要进行电话催收登记催收结果', '提示').then(function (action) {
                        if (action === 'confirm') {
                            _self.afterGetTask();
                        }
                    });
                },

                afterGetTask: function () {
                    var _self = this;
                    var num = this.$refs.reftable2.selections.length;
                    for (var i=0;i<num;i++){
                        var obj = _self.$refs.reftable2.selections[i];
                        yufp.service.request({
                            method: 'PUT',
                            url: backend.riskmService + '/api/collt/task/info/alw',
                            data: obj,
                            callback: function (code, message, response) {
                                var data = response;
                                if (code == 0 ) {
                                    vm.dialogVisible = false;
                                    vm.$message({
                                        message: '处理成功!',
                                        type: 'success'
                                    });
                                    vm.$refs.reftable.remoteData();
                                    vm.$refs.reftable2.remoteData();
                                } else
                                    vm.$message({
                                        message: '认领任务失败！',
                                        type: 'warning'
                                    });
                            }
                        });
                    }
                    _self.$refs.queryFm.fm.cusId='';
                    _self.$refs.queryFm.fm.cusName='';
                    _self.$refs.queryFm.fm.riskLevel='';
                    _self.$refs.queryFm.fm.taskSts='';
                    _self.taskGetdialogVisible = false;
                },

                // 任务登记对话框
                taskReg: function () {
                    var _self = this;
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var obj = _self.$refs.reftable.selections[0];
                    if(obj.taskSts != '01' && obj.taskSts != '02'){
                        _self.$message({ message: '现阶段只支持对任务状态为【待处理】或【已处理】的催收任务进行任务登记', type: 'warning' });
                        return;
                    }
                    _self.taskGetdialogVisible = false;
                    _self.messageDialogVisible = false;
                    _self.dialogVisible = true;
                    _self.historyDialogVisible = false;


                    //  客户编号查询客户信息
                    var cusId = obj.cusId;
                    _self.cusInfoQuery(cusId);
                    //  借据编号插叙借据信息
                    var loanNo = obj.loanNo;
                    _self.accLoanQuery(loanNo);
                    //  催收任务编号查询历史催收记录
                    this.$nextTick(function () {
                        _self.$refs.colltRegisterInfoRef.formModel.inputDate = yufp.session.OPENDAY;
                        yufp.extend(this.$refs.colltRegisterInfoRef.formModel, obj);
                        _self.accLoanFieldsStatus(false);
                        _self.tagPartStatus(false);
                        _self.$refs.colltHistoryTable.remoteData(obj);
                    });

                },

                // 任务流转对话框
                taskflow: function () {
                    var _self = this;
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var obj = _self.$refs.reftable.selections[0];
                    if (obj.taskSts != '01' && obj.taskSts != '02') {
                        _self.$message({ message: '只能对催收任务为【待处理】或【已处理】的催收任务进行人工流转！', type: 'warning' });
                        return;
                    }
                    _self.taskGetdialogVisible = false;
                    _self.messageDialogVisible = false;
                    _self.dialogVisible = true;
                    _self.historyDialogVisible = false;
                    //  客户编号查询客户信息
                    var cusId = obj.cusId;
                    _self.cusInfoQuery(cusId);
                    //  借据编号插叙借据信息
                    var loanNo = obj.loanNo;
                    _self.accLoanQuery(loanNo);

                    var flowTaskRcdParams = {
                        colltTaskNo: obj.colltTaskNo,
                    };
                    //  催收任务编号查询历史催收记录
                    this.$nextTick(function () {
                        _self.accLoanFieldsStatus(false);
                        _self.tagPartStatus(true);
                        _self.$refs.colltHistoryTable.remoteData(obj);
                        _self.$refs.taskFlowRcdTable.remoteData(flowTaskRcdParams);
                        yufp.extend(this.$refs.taskFlowRef.formModel, obj);
                    });
                },

                // 短信通知对话框
                smsInfo: function () {
                    var _self = this;
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var obj = _self.$refs.reftable.selections[0];
                    if(obj.taskSts != '01' && obj.taskSts != '02'){
                        _self.$message({ message: '只能对催收任务为【待处理】或【已处理】的催收任务进行短信通知操作！', type: 'warning' });
                        return;
                    }
                    _self.taskGetdialogVisible = false;
                    _self.messageDialogVisible = true;
                    _self.dialogVisible = false;
                    _self.historyDialogVisible = false;

                    var message = "尊敬的客户:" + obj.cusName + "，您的借据:" + obj.loanNo + "，已逾期" + obj.overDays + "天，逾期金额为:" + obj.overLmt
                        + "，麻烦尽快归还，以免产生更多的费用，以及不必要的征信黑点！" + "【发送短信内容格式，需求尚未确定！】";

                    this.$nextTick(function () {
                        _self.$refs.smsInfoRef.formModel.sendMsg = message;
                        yufp.extend(this.$refs.smsInfoRef.formModel, obj);
                    });
                },

                //历史纪录对话框
                historyInfo: function () {
                    var _self = this;
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }

                    _self.taskGetdialogVisible = false;
                    _self.messageDialogVisible = false;
                    _self.dialogVisible = false;
                    _self.historyDialogVisible = true;

                    var obj = _self.$refs.reftable.selections[0];
                    this.$nextTick(function () {
                        _self.$refs.colltHistoryTable2.remoteData(obj);
                    });

                },

                // 保存键
                saveRegisterInfoFn: function(){
                    var _self = this;
                    var obj = this.$refs.colltRegisterInfoRef.formModel;
                    var validate = false;
                    this.$refs.colltRegisterInfoRef.validate(function (valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }

                    var objTable = _self.$refs.reftable.selections[0];
                    if(objTable.overLmt < obj.repayLmt){
                        _self.$message({ message: '还款金额不能大于逾期金额，请核实再操作！', type: 'warning' });
                        return;
                    }

                    yufp.service.request({
                        method: 'POST',
                        url: backend.riskmService + '/api/collt/task/rcd/alw',
                        data:obj,
                        callback: function (code, message, response) {
                            if (response.success) {
                                _self.$message("保存成功：" + response.message);
                                _self.dialogVisible = false;
                                _self.$refs.colltRegisterInfoRef.resetFields();
                                _self.$refs.reftable.remoteData();
                            } else {
                                _self.$message("保存失败：" + response.message);
                            }
                        }
                    });
                },

                // 提交键
                commitFlowInfoFn: function(){
                    var _self = this;
                    var obj = this.$refs.taskFlowRef.formModel;
                    var validate = false;
                    this.$refs.taskFlowRef.validate(function (valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    yufp.service.request({
                        method: 'POST',
                        url: backend.flowService + '/api/collt/task/flow/app/alw',
                        data: obj,
                        callback: function (code, message, response) {
                            if (code==0 && response.rows>0) {
                                _self.$refs.reftable.remoteData();
                                _self.$message("提交成功");
                            } else {
                                _self.$message("提交失败：" + response.message);
                            }
                        }
                    });
                    _self.dialogVisible = false;
                    _self.$refs.taskFlowRef.resetFields();
                },

                // 确认键
                sureFn: function(){
                  var _self = this;
                    var obj = this.$refs.smsInfoRef.formModel;
                    var validate = false;
                    this.$refs.smsInfoRef.validate(function (valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    yufp.service.request({
                        method: 'POST',
                        url: backend.flowService + '/api/collt/task/flow/app/sure',
                        data: obj,
                        callback: function (code, message, response) {
                            if (code == 0 && response.rows > 0) {
                                _self.$message("发起流程成功");
                                _self.$refs.reftable.remoteData();
                            } else {
                                _self.$message("发起流程失败：" + response.message);
                            }
                        }
                    });
                    _self.messageDialogVisible = false;
                },

                // 取消键
                cancleFn: function () {
                    var _self = this;
                    _self.dialogVisible = false;
                    _self.$refs.cusInfoRef.resetFn();
                    _self.$refs.accLoanRef.resetFn();
                    _self.$refs.colltRegisterInfoRef.resetFields();
                    _self.$refs.taskFlowRef.resetFields();
                },

                // 返回键
                returnFn: function(){
                    var _self = this;
                    _self.taskGetdialogVisible = false;
                    _self.$refs.queryFm.fm.cusId='';
                    _self.$refs.queryFm.fm.cusName='';
                    _self.$refs.queryFm.fm.riskLevel='';
                    _self.$refs.queryFm.fm.taskSts='';
                },
                returnFn1: function(){
                    var _self = this;
                    _self.historyDialogVisible = false;
                },
                returnFn2: function(){
                    var _self = this;
                    _self.messageDialogVisible = false;
                },

                // 借据查看键
                accLoanInfoFn: function () {
                    var _self = this;
                    this.$nextTick(function () {
                        _self.accLoanFieldsStatus(true);
                    });
                },

                // 借据返回键
                accLoanReturnFn: function () {
                    var _self = this;
                    this.$nextTick(function () {
                        _self.accLoanFieldsStatus(false);
                    });
                },

                //撤回功能
                withdrawFn: function () {
                    var _self = this;
                    if (_self.$refs.reftable.selections.length != 1) {
                        _self.$message({ message: '请先选择一条记录', type:'warning' });
                        return;
                    }
                    var obj = _self.$refs.reftable.selections[0];
                    _self.$confirm('请确认是否要强制执行撤回？', '提示').then(function () {
                        yufp.service.request({
                            method: 'POST',
                            url: backend.riskmService + "/api/collt/task/infos/withdraw",
                            data: obj,
                            callback: function (code, message, response) {
                                if (code==0 && response.rows > 0) {
                                    _self.$refs.reftable.remoteData();
                                    _self.$message("已成功撤回到催收任务池");
                                } else {
                                    _self.$message("操作失败：" + response.message);
                                }
                            }
                        });
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
