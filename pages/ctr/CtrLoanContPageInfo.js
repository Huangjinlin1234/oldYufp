﻿/**
 * @create by chenqm1 on 2018-05-16
 * @description 贷款合同表
 */
define([
    './custom/widgets/js/PrdIdInfoSelector.js'
], function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,STD_ZB_CERT_TYP,CONT_TYPE,STD_ZB_CONT_STATUS,APPLY_CHANNEL_TYPE,IMAGE_TYPE');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    dataUrl: backend.creditService + '/api/ctr/loan/conts',
                    dataUrlImages: backend.edocService +'/api/query/image/platfrom/files', //影像信息

                    baseParams: {
                    },
                    imagesParams: {},
                    tableFilters: {
                        ratePctFilter: function (value) {
                            if (!value) {
                                return '';
                            } else {
                                return yufp.util.toPercent((parseFloat(value, 4) * 100).toFixed(7));
                            }
                        }
                    },

                    queryFields: [
                        { placeholder: '合同号', field: 'contNo', type: 'input' },
                        { placeholder: '合同类型', field: 'contType', type: 'input',type:'select',dataCode: 'CONT_TYPE' ,datacodeFilter: function(options){
                                this.typeOptions = [];
                                for(var i=0; i<options.length; i++){
                                    if(options[i].key != '03'){
                                        this.typeOptions.push(options[i]);
                                    }
                                }
                            }},
                        { placeholder: '渠道名称',field: 'channelCode', type: 'select', dataCode:'APPLY_CHANNEL_TYPE',
                            change:function(value,model,args){
//            	_self.$refs.fromPrd.fm.prdName=''; //当下拉框值改变时，清空pop框产品值
                                _self.$refs.form.fm.prdCode=''; //当下拉框值改变时，清空pop框产品值
                            }},
                        { placeholder: '产品名称', field: 'prdCode', type: 'custom', is: 'div-prdId-info-selector' ,params:{prdType:'',type:''},
                            clickFn:function(value,model,args){
                                _self.$refs.fromPrd.switch('prdCode','params',{prdType:model.channelNo,type:'code'});
                                _self.$refs.fromPrd.rebuildFn();
                            }},
                        { placeholder: '客户编号', field: 'cusId', type: 'input' },
                        { placeholder: '证件类型', field: 'certType', type: 'select', dataCode: 'STD_ZB_CERT_TYP', datacodeFilter: function(options){
                                this.typeOptions = [];
                                for(var i=0; i<options.length; i++){
                                    if(options[i].key != 'CN03' && options[i].key != 'HK01' && options[i].key != 'MO01' && options[i].key != 'TW01' && options[i].key != 'TW02'){
                                        this.typeOptions.push(options[i]);
                                    }
                                }
                            }},
                        { placeholder: '证件号码', field: 'certCode', type: 'input' },
                        { placeholder: '签订日期', field: 'signDate',type:'date',
                            value:new Date().getFullYear() + '-'
                                + (new Date().getMonth()+1 < 10 ? '0' + (new Date().getMonth()+1):new Date().getMonth()+1) + '-'
                                + (new Date().getDate()< 10 ? '0'+new Date().getDate():new Date().getDate())
                        },//value: 给时间控件赋值默认值（当天）
                        { placeholder: '合同状态', field: 'contState', type: 'select', dataCode: 'STD_ZB_CONT_STATUS'},
                    ],

                    queryButtons: [
                        { label: '查询', op: 'submit', type: 'primary', icon: 'search',
                            click: function (model, valid) {
                                if (valid) {
                                    _self.$refs.reftable.remoteData(model);
                                }
                            } },
                        { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
                    ],

                    tableColumns: [
                        { label: '合同号', prop: 'contNo', sortable: true, resizable: true, width: 200 },
                        { label: '渠道名称', prop: 'channelCode', sortable: true, resizable: true, dataCode: 'APPLY_CHANNEL_TYPE' },
                        { label: '产品编号', prop: 'prdCode', sortable: true, resizable: true },
                        { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
                        { label: '客户编号', prop: 'cusId', sortable: true, resizable: true },
                        { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
                        { label: '证件类型', prop: 'certType', sortable: true, resizable: true, dataCode: 'STD_ZB_CERT_TYP' },
                        { label: '证件号码', prop: 'certCode', sortable: true, resizable: true },
                        { label: '合同类型', prop: 'contType', sortable: true, resizable: true, dataCode: 'CONT_TYPE'},
                        { label: '合同金额', prop: 'contAmt', sortable: true, resizable: true, formatter: function(row, column, cellValue) {
                                return yufp.util.moneyFormatter(cellValue, 2);
                            } },
                        { label: '合同签订日期', prop: 'signDate', sortable: true, resizable: true},
                        // { label: '到期日期', prop: 'endContDate', sortable: true, resizable: true}, //合同只有签订日期
                        { label: '合同状态', prop: 'contState', sortable: true, resizable: true, dataCode: 'STD_ZB_CONT_STATUS' },
                    ],

                    updateFields: [{
                        columnCount: 3,
                        fields: [
                            { field: 'contNo', label: '合同号', disabled: true },
                            { field: 'contType', label: '合同类型', disabled: true ,type:'select',dataCode: 'CONT_TYPE'},
                            { field: 'prdId', label: '产品ID', disabled: true, hidden: true},
                            { field: 'prdCode', label: '产品编号', disabled: true},
                            { field: 'prdName', label: '产品名称', disabled: true},
                            { field: 'channelCode', label: '渠道名称', disabled: true, type: 'select', dataCode: 'APPLY_CHANNEL_TYPE' },
                            { field: 'cusId', label: '客户编号', disabled: true},
                            { field: 'cusName', label: '客户名称', disabled: true},
                            { field: 'certType', label: '证件类型', disabled: true, type: 'select', dataCode: 'STD_ZB_CERT_TYP' },
                            { field: 'certCode', label: '证件号码', disabled: true},
                            { field: 'loanTerm', label: '期限', disabled: true,hidden:true},
                            { field: 'termTimeType', label: '期限类型', disabled: true, type: 'select', dataCode: 'STD_ZB_TERM_TYPE' ,hidden:true},
                            { field: 'approvalAmt', label: '审批金额（元）', disabled: true, type:'num',formatter: function(cellValue) {
                                    if (typeof(cellValue) == 'undefined'  || cellValue == null || isNaN(cellValue) )
                                        return;
                                    return yufp.util.moneyFormatter(cellValue, 2);
                                },hidden:true},
                            { field: 'contAmt', label: '合同金额（元）', disabled: true, type:'num',formatter: function(cellValue) {
                                    if (typeof(cellValue) == 'undefined'  || cellValue == null || isNaN(cellValue) )
                                        return;
                                    return yufp.util.moneyFormatter(cellValue, 2);
                                }},
                            { field: 'approvalAmt', label: '合同可用金额（元）', disabled: true, type:'num',formatter: function(cellValue) {
                                    if (typeof(cellValue) == 'undefined'  || cellValue == null || isNaN(cellValue) )
                                        return;
                                    return yufp.util.moneyFormatter(cellValue, 2);
                                }, hidden: true },
                            { field: 'contAmt', label: '累计发放金额（元）', disabled: true, type:'num',formatter: function(cellValue) {
                                    if (typeof(cellValue) == 'undefined'  || cellValue == null || isNaN(cellValue) )
                                        return;
                                    return yufp.util.moneyFormatter(cellValue, 2);
                                }, hidden: true },
                            { field: 'contType', label: '合同类型', type: 'select', dataCode: 'CONT_TYPE', disabled: true,hidden:true},
                            { field: 'contState', label: '合同状态', type: 'select', dataCode: 'STD_ZB_CONT_STATUS', disabled: true},
                            { field: 'signDate', label: '合同签订日期', disabled: true},
                            // { field: 'contEndDt', label: '到期日期', disabled: true},
                            { field: 'createUser', label: '创建人',disabled: true},
                            { field: 'createTime', label: '创建时间', hidden: false, disabled: true},
                            { field: 'lastUpdateUser', label: '最后更新人', hidden: false, disabled: true},
                            { field: 'lastUpdateTime', label: '最近更新时间', hidden: false, disabled: true},
                            { field: 'contStartDt', label: '申请日期', disabled: true,hidden:true},
                            { field: 'createDate', label: '创建日期', disabled: true, hidden: true }
                        ]
                    }],

                    ctrFields: [{
                        columnCount: 3,
                        fields: [
                            { field: 'contNo', label: '合同号', disabled: true },
                            { field: 'serno', label: '业务流水号', disabled: true},
                            { field: 'prdId', label: '产品ID', disabled: true, hidden: true},
                            { field: 'prdCode', label: '产品编号', disabled: true},
                            { field: 'prdName', label: '产品名称', disabled: true},
                            { field: 'cusId', label: '客户号', disabled: true},
                            { field: 'cusName', label: '客户名称', disabled: true},
                            { field: 'loanUseType', label: '贷款用途', type: 'select', dataCode: 'LOAN_USE_GENERE', disabled: true},
                            // { field: 'useDec', label: '借款用途',disabled: true},
                            { field: 'cusManager', label: '客户经理号', disabled: true},
                            { field: 'inputBrId', label: '登记机构代码', disabled: true},
                            { field: 'mainBrId', label: '主管机构代码', disabled: true},
                            { field: 'finaBrId', label: '账务机构代码', disabled: true},
                            { field: 'legalOrgCode', label: '法人机构代码', disabled: true},
                            { field: 'legalOrgName', label: '法人机构名称', disabled: true},
                            { field: 'chargeoffBrId', label: '出账机构代码', disabled: true},
                            { field: 'lmtAdjBase', label: '授信基础类型', type: 'select', dataCode: 'STD_ZB_ADJ_BASE', disabled: true},
                            { field: 'createTime', label: '创建时间', hidden: true, disabled: true},
                            { field: 'lastUpdateUser', label: '最后更新人', hidden: true, disabled: true},
                            { field: 'lastUpdateTime', label: '最近更新时间', hidden: true, disabled: true}
                        ]
                    }],

                    fields1: [{
                        columnCount: 3,
                        fields: [
                            { field: 'assureMeansMain', label: '担保方式', type: 'select', dataCode: 'STD_ZB_ASSURE_MEANS', disabled: true},
                            { field: 'assureMeans2', label: '担保方式2', type: 'select', dataCode: 'STD_ZB_ASSURE_MEANS', disabled: true},
                            { field: 'assureMeans3', label: '担保方式3', type: 'select', dataCode: 'STD_ZB_ASSURE_MEANS', disabled: true},

                            { field: 'currencyType', label: '币种', type: 'select', dataCode: 'STD_ZX_CUR_TYPE', disabled: true},
                            { field: 'approvalAmt', label: '审批金额(元)', disabled: true},
                            { field: 'contAmt', label: '合同金额(元)', disabled: true},

                            { field: 'termTimeType', label: '期限时间类型', type: 'select', dataCode: 'STD_ZB_TERM_TYPE', disabled: true},
                            { field: 'loanTerm', label: '期限', disabled: true},
                            { field: 'loanStartDate', label: '借据起始日', disabled: true},
                            { field: 'loanEndDate', label: '借据到期日', disabled: true},

                            { field: 'rulingIrY',label: '基准利率(年)',type: 'num',
                                formatter: function (cellValue) {
                                    var num = parseFloat(cellValue);
                                    if (typeof num == 'undefined' || num == null || isNaN(num)) {
                                        num = 0;
                                    }
                                    var rateY = Number(num * 100).toFixed(4) + '%';
                                    return rateY;
                                },disabled: true },
                            { field: 'intRateType', label: '利率类型', type: 'select', dataCode: 'STD_ZB_EFR_CHNG_IND', disabled: true},
                            { field: 'irExeType', label: '利率变更生效方式', type: 'select', dataCode: 'STD_ZB_IREXE_TYPE', disabled: true},
                            { field: 'fixedRate',
                                label: '固定利率(年)',
                                disabled: true,
                                type: 'num',
                                formatter: function (cellValue) {
                                    var num = parseFloat(cellValue);
                                    if (typeof num == 'undefined' || num == null || isNaN(num)) {
                                        num = 0;
                                    }
                                    var rateY = Number(num * 100).toFixed(4) + '%';
                                    return rateY;
                                }},
                            { field: 'irAdjustMode', label: '利率调整方式', type: 'select', dataCode: 'STD_ZB_IREXE_TYPE', disabled: true},
                            { field: 'calFloatingRate',
                                label: '利率浮动比',
                                disabled: true,
                                type: 'num',
                                formatter: function (cellValue) {
                                    var num = parseFloat(cellValue);
                                    if (typeof num == 'undefined' || num == null || isNaN(num)) {
                                        num = 0;
                                    }
                                    var rateY = Number(num * 100).toFixed(4) + '%';
                                    return rateY;
                                }},
                            { field: 'realityIrY',
                                label: '执行利率(年)',
                                disabled: true,
                                type: 'num',
                                formatter: function (cellValue) {
                                    var num = parseFloat(cellValue);
                                    if (typeof num == 'undefined' || num == null || isNaN(num)) {
                                        num = 0
                                        ;
                                    }
                                    var rateY = Number(num * 100).toFixed(4) + '%';
                                    return rateY;
                                }},
                            { field: 'overdueRate',
                                label: '罚息浮动比',
                                disabled: true,
                                type: 'num',
                                formatter: function (cellValue) {
                                    var num = parseFloat(cellValue);
                                    if (typeof num == 'undefined' || num == null || isNaN(num)) {
                                        num = 0;
                                    }
                                    var rateY = Number(num * 100).toFixed(4) + '%';
                                    return rateY;
                                }},
                            { field: 'apprIntRateInc',
                                label: '罚息利率增量（挪用利率）',
                                disabled: true,
                                type: 'num',
                                formatter: function (cellValue) {
                                    var num = parseFloat(cellValue);
                                    if (typeof num == 'undefined' || num == null || isNaN(num)) {
                                        num = 0;
                                    }
                                    var rateY = Number(num * 100).toFixed(4) + '%';
                                    return rateY;
                                }},
                            // { field: 'repaymentPeriods', label: '结息周期',disabled: true},
                            { field: 'interestAccMode', label: '结息周期', disabled: true, type: 'select', dataCode: 'STD_ZB_REPAY_FREQ'},
                            { field: 'enterAccount', label: '入账账号', disabled: true},
                            // { field: 'enterAccountName', label: '入账账户名称',disabled: true},
                            { field: 'cusName', label: '入账账户名称', disabled: true},
                            { field: 'repaymentAccount', label: '还款账号', disabled: true},
                            // { field: 'repaymentAccName', label: '还款账户名称',disabled: true},
                            { field: 'cusName', label: '还款账户名称', disabled: true},
                            { field: 'repaymentDayType', label: '还款日类型', type: 'select', dataCode: 'REPAY_DAY_TYPE', disabled: true},
                            { field: 'repaymentDay', label: '还款日', disabled: true},
                            { field: 'repaymentSrcDec', label: '还款来源', disabled: true},
                            { field: 'repaymentMode', label: '还款方式', type: 'select', dataCode: 'STD_PRD_REPAY_MODE', disabled: true},
                            { field: 'fldvalue01', label: '备注1', disabled: true, hidden: true},
                            { field: 'cancelDate', label: '核销日期', disabled: true},
                            { field: 'repaymentCard', label: '还款卡号', disabled: true},
                            { field: 'loanAccount', label: '贷款账号', disabled: true},
                            { field: 'contType', label: '是否循环', type: 'select', dataCode: 'STD_ZX_YES_NO', disabled: true},
                            { field: 'changeDate', label: '合同变更日期', disabled: true},
                            { field: 'signDate', label: '合同签订日期', disabled: true},
                            { field: 'contState', label: '合同状态', type: 'select', dataCode: 'STD_ZB_CONT_STATUS', disabled: true},
                            { field: 'inputId', label: '申请人', disabled: true}
                        ]
                    }],

                    //影像信息
                    tableColumnsImages: [
                        { label: '合同号', prop: 'applySeq', sortable: true, resizable: true },
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

                    updateButtons: [
                        { label: '返回',type: 'primary',icon: 'yx-undo2',hidden: false,
                            click: function (model) {
                                _self.dialogVisible = false;
                            } },
                        { label: '保存',
                            type: 'primary',
                            icon: 'check',
                            hidden: false,
                            click: function (model) {
                                var validate = false;
                                _self.$refs.reform.validate(function (valid) {
                                    validate = valid;
                                });
                                if (!validate) {
                                    return;
                                }

                                var rMethod = '';
                                if (_self.viewType == 'EDIT') {
                                    rMethod = 'PUT';
                                } else if (_self.viewType == 'ADD') {
                                    rMethod = 'POST';
                                }

                                yufp.service.request({
                                    method: rMethod,
                                    url: '/api/ctr/loan/cont',
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
                            } }
                    ],
                    buttons6: [
                        { label: '返回',type: 'primary',icon: 'yx-undo2', hidden: false,
                            click: function (model) {
                                _self.dialogVisible = false;
                            } }
                    ],
                    height: yufp.frame.size().height - 103,
                    dialogVisible: false,
                    formDisabled: false,
                    viewType: 'DETAIL',
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    tabName: 'loanCtrInfo',
                    ctrVisible: true,
                    prdVisible: false
                };
            },
            methods: {
                /**
                 * @param ctrlCode 操作码
                 */
                checkPermission: function (ctrlCode) {
                    return true;/* !yufp.session.checkCtrl(ctrlCode, cite.menuId);*/
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
                    var _self = this;
                    this.switchStatus('DETAIL', false);

                    _self.imagesParams = {
                        applySeq : _self.$refs.reftable.selections[0].contNo,
                        prdCode  : _self.$refs.reftable.selections[0].prdCode
                    }

                    this.$nextTick(function () {
                        yufp.extend(this.$refs.ctrForm.formModel, this.$refs.reftable.selections[0]);

                        _self.$refs.imagesReftable.remoteData(_self.imagesParams);   //影像信息
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
                        arr.push(selections[i].contNo);
                    }

                    yufp.service.request({
                        method: 'DELETE',
                        url: '/api/ctr/loan/cont',
                        data: {
                            contNo: arr.join(',')
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

                exportFn: function () {
                    yufp.util.exportExcelByTable({
                        fileName: '下载文件',
                        importType: 'service', // page当前页 selected 选中的数据  service 后端数据
                        ref: this.$refs.reftable,
                        url: '',
                        param: {}
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
                }
                /*postWindow: function(scope){
                    var _self = this;
                    var startDate = scope.startDate.replace(new RegExp('-','g'),'');
                    yufp.service.request({
                        method: 'POST',
                        url: backend.edocService + "/api/query/image/platfrom/info",
                        data: {
                            applySeq : scope.applySeq,
                            prdCode: scope.prdCode
                        },
                        callback: function (code, message, response) {
                            var row = response.rows;
                            if (code == 0 && response.code == 0) {
                                var imageForm = document.createElement("form");
                                imageForm.id = "imageForm";
                                imageForm.method = "post";
                                imageForm.action = row.imagePlatfromUrl;
                                imageForm.target = "_blank";
                                var hideInput1 = document.createElement("input");
                                hideInput1.type = "hidden";
                                hideInput1.name = "UID";
                                hideInput1.value = row.imagePlatfromUserName;
                                var hideInput2 = document.createElement("input");
                                hideInput2.type = "hidden";
                                hideInput2.name = "PWD";
                                hideInput2.value = row.imagePlatfromPassWord;
                                var hideInput3 = document.createElement("input");
                                hideInput3.type = "hidden";
                                hideInput3.name = "AppID";
                                hideInput3.value = row.imagePlatfromAppId;
                                var hideInput4 = document.createElement("input");
                                hideInput4.type = "hidden";
                                hideInput4.name = "UserID";
                                hideInput4.value = yufp.session.userId;
                                var hideInput5 = document.createElement("input");
                                hideInput5.type = "hidden";
                                hideInput5.name = "UserName";
                                hideInput5.value = yufp.session.userName;
                                var hideInput6 = document.createElement("input");
                                hideInput6.type = "hidden";
                                hideInput6.name = "OrgID";
                                hideInput6.value = yufp.session.org.orgCode;
                                var hideInput7 = document.createElement("input");
                                hideInput7.type = "hidden";
                                hideInput7.name = "OrgName";
                                hideInput7.value = yufp.session.org.orgName;
                                var hideInput8 = document.createElement("input");
                                hideInput8.type = "hidden";
                                hideInput8.name = "info1";
                                hideInput8.value = 'BUSI_SERIAL_NO:'+row.applySeq+';OBJECT_NAME:'+row.imagePlatfromModelCode+';QUERY_TIME:'+startDate+';FILELEVEL:1;RIGHT:0100000';
                                imageForm.appendChild(hideInput1);
                                imageForm.appendChild(hideInput2);
                                imageForm.appendChild(hideInput3);
                                imageForm.appendChild(hideInput4);
                                imageForm.appendChild(hideInput5);
                                imageForm.appendChild(hideInput6);
                                imageForm.appendChild(hideInput7);
                                imageForm.appendChild(hideInput8);
                                document.body.appendChild(imageForm);
                                imageForm.submit();
                                document.body.removeChild(imageForm);
                            } else {
                                _self.$message("获取影像系统信息失败：" + response.message);
                            }
                        }
                    });
                }*/
            }
        });
    };
    // 消息处理
    exports.onmessage = function (type, message) {

    };
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {

    };
});
