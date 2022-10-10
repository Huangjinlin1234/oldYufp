/**
 * @create by chenqm1 on 2018-05-04
 * @description 额度台账查询
 */
define([
    './custom/widgets/js/YufpDemoSelector.js',
      './custom/widgets/js/YufpOrgTree.js',
      './custom/widgets/js/YufpUserSelector.js'
    ],function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE,STD_ZB_PRELMT_STS,STD_ZB_CERT_TYP,STD_ZB_PRELMT_TYPE,STD_ZB_TERM_TYPE,STD_ZB_EFR_CHNG_IND,STD_ZB_IR_FLOAT_TYPE,STD_ZB_IR_ADJ_MODE,STD_ZB_PRELMT_OP,LAY_OFF_FLAG,STD_ZX_YES_NO,STD_ZB_LMT_STATE,STD_ZB_APPR_STATUS,STD_ZB_CREDIT_GRADE,STD_PRD_REPAY_MODE,STD_ZB_REPAY_FREQ,LOAN_USE_GENERE,CONT_TYPE,STD_ZB_CONT_STATUS,STD_ZB_IREXE_TYPE');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
           //dataUrl: backend.creditService + '/api/lmt/prelists',
            dataUrl: backend.creditService+'/api/lmt/prelists',
            dataUrlFrozee: backend.creditService+'/api/lmt/cont/no/freeze/apps',
            dataUrlUnfrozee:backend.creditService + '/api/lmt/cont/no/unfreeze/apps',
            dataUrlLmtCont:backend.creditService + '/api/lmt/prd/cont/',
            dataUrlCtrCont: backend.ctrService + '/api/ctr/loan/contLmtContNo',
        //  dataUrl: backend.creditService+ '/api/lmt/indiv/xfs',//前台是同过credit.web调用xfService
            baseParams: {
            },
            queryFields: [
            	 { placeholder: '授信协议号', field: 'lmtContNo', type: 'input' },
            	 { placeholder: '客户号', field: 'cusId', type: 'input' },
                 { placeholder: '客户名称', field: 'cusName', type: 'input' },
                // { placeholder: '证件类型', field: 'certType', type: 'select',dataCode:'STD_ZB_CERT_TYP' },
                 { placeholder: '证件号码', field: 'certCode', type: 'input'},
                 //{ placeholder: '产品代码', field: 'prdCode', type: 'input' },
                 { placeholder: '产品名称', field: 'prdName', type: 'input' },
                 { placeholder: '预授信金额起(元)', field: 'lmtAmtStart', type: 'num',digit:2,formatter:yufp.util.moneyFormatter,
                 	rules:[ { validator: yufp.validator.gZero, type:'number', trigger: 'blur'}]},
                 { placeholder: '预授信金额止(元)', field: 'lmtAmtEnd', type: 'num', digit:2,formatter:yufp.util.moneyFormatter,
                     rules:[ { validator: yufp.validator.gZero, type:'number', trigger: 'blur'}]},
                 { placeholder: '预授信状态', field: 'status', type: 'select',dataCode:'STD_ZB_PRELMT_STS'},
                 { placeholder: '授信状态', field: 'lmtStatus', type: 'select',dataCode:'STD_ZB_LMT_STATE'},
                 { placeholder: '主管机构代码', field: 'mainBrId', type: 'input' }
            ],
            queryButtons: [
              { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                  if (valid) {
                    _self.$refs.reftable.remoteData(model);
                  }
                } },
              { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2',click: function () {
                      _self.queryReset = false;
                      _self.$nextTick(function () {
                          _self.queryReset = true;
                      });
                  } }
            ],
            prelistColumns: [
                  { label: '批次流水号', prop: 'batchSerno', sortable: true, resizable: false,hidden:true },
                  { label: '证件类型', prop: 'certType', sortable: true, resizable: true,dataCode:'STD_ZB_CERT_TYP',hidden:true},
                  { label: '手机号码', prop: 'mobile', sortable: true, resizable: false,hidden:true },
                  { label: '产品代码', prop: 'prdCode', sortable: true, resizable: false,hidden:true },
                  { label: '预授信号', prop: 'preSerno', sortable: true, resizable: false,hidden:true},
                  { label: '授信协议号', prop: 'lmtContNo', sortable: true, resizable: true },
                  { label: '客户号', prop: 'cusId', sortable: true, resizable: true},
                  { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
                  { label: '证件号码', prop: 'certCode', sortable: true, resizable: true },
                  { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
                  { label: '预授信金额(元)', prop: 'lmtAmt', sortable: true, resizable: true, formatter: function(row, column, cellValue) {
                          return yufp.util.moneyFormatter(cellValue, 2);
                      } },
                  { label: '激活有效期（天）', prop: 'actValidDays', sortable: true, resizable: true },
                  { label: '预授信状态', prop: 'status', sortable: true, resizable: true,dataCode:'STD_ZB_PRELMT_STS'},
                  { label: '已激活金额(元)', prop: 'actLmtAmt', sortable: true, resizable: false,hidden:true },
                  { label: '待激活金额(元)', prop: 'waitActAmt', sortable: true, resizable: false,hidden:true },
                  { label: '实际授信额度(元)', prop: '***', sortable: true, resizable: false, formatter: function(row, column, cellValue) {
                          return yufp.util.moneyFormatter(cellValue, 2);
                      } },
                  { label: '利率(年)', prop: 'rateY', sortable: true, resizable: false,formatter:_self.precentFormat},
                  { label: '授信状态', prop: 'lmtStatus', sortable: true, resizable: false,dataCode:'STD_ZB_LMT_STATE'},
                  { label: '起始日', prop: 'startDate', sortable: true, resizable: false},
                  { label: '到期日', prop: 'expireDate', sortable: true, resizable: false},
                  { label: '客户经理号', prop: 'cusManager', sortable: true, resizable: true },
                  { label: '管理机构代码', prop: 'mainBrId', sortable: true, resizable: true },
                 // { label: '客户申办日期', prop: '***', sortable: true, resizable: true },                  
                  { label: '额度类型', prop: 'lmtType', sortable: true, resizable: false,hidden:true },
                  { label: '出账机构代码', prop: 'chargeoffBrId', sortable: true, resizable: true,hidden:true},
                  { label: '备注', prop: 'remarks', sortable: true, resizable: true },   
                  { label: '期限', prop: 'term', sortable: true, resizable: false,hidden:true },
                  { label: '利率模式', prop: 'irMode', sortable: true, resizable: false,hidden:true },
                  { label: '固定利率(年)', prop: 'fixedRate', sortable: true, resizable: false,hidden:true },
                  { label: '利率浮动方式', prop: 'irFloatType', sortable: true, resizable: false,hidden:true },
                  { label: '利率浮动比例', prop: 'irFloatPct', sortable: true, resizable: false,hidden:true },
                  { label: '利率调整方式', prop: 'irAdjustMode', sortable: true, resizable: false,hidden:true},
                  { label: '客户风险系数', prop: 'cusRpn', sortable: true, resizable: false,hidden:true },
                  { label: '信用等级', prop: 'creditLevel', sortable: true, resizable: false,hidden:true },
                  { label: '是否农户', prop: 'agriFlg', sortable: true, resizable: false,hidden:true },
                  { label: '是否有工作单位', prop: 'hasWorkPlace', sortable: true, resizable: false,hidden:true },
                  { label: '工作单位名称', prop: 'workPlace', sortable: true, resizable: false,hidden:true },
                  { label: '当前操作', prop: 'curOp', sortable: true, resizable: false,hidden:true },
                  { label: '备注', prop: 'remarks', sortable: true, resizable: false,hidden:true },
                  { label: '法人机构代码', prop: 'legalOrgCode', sortable: true, resizable: false,hidden:true },
                  { label: '法人机构名称', prop: 'legalOrgName', sortable: true, resizable: false,hidden:true },
                  { label: '导入日期', prop: 'importDate', sortable: true, resizable: false,hidden:true },
                  { label: '创建日期', prop: 'createDate', sortable: true, resizable: false,hidden:true },
                  { label: '创建时间', prop: 'createTime', sortable: true, resizable: false,hidden:true },
                  { label: '最后更新人', prop: 'lastUpdateUser', sortable: true, resizable: false,hidden:true },
                  { label: '最后修改时间', prop: 'lastUpdateTime', sortable: true, resizable: false,hidden:true },
                  { label: '授信流水号', prop: 'lmtSerno', sortable: true, resizable: false,hidden:true }
            ],
            ctrContColumns: [
                 //{ label: '授信协议编号', prop: 'lmtContNo', sortable: true, resizable: true },
                 { label: '客户号', prop: 'cusId', sortable: true, resizable: true ,hidden:true},
                 { label: '客户名称', prop: 'cusName', sortable: true, resizable: true ,hidden:true},
                 { label: '证件类型', prop: 'certType', sortable: true, resizable: true ,dataCode: 'STD_ZB_CERT_TYP'},
                 { label: '证件号码', prop: 'certCode', sortable: true, resizable: true  },
                 { label: '合同号', prop: 'contNo', sortable: true, resizable: true},
                 { label: '合同金额(元)', prop: 'contAmt', sortable: true, resizable: true,
                             formatter: function(row, column, cellValue) {
                             	         if(!row.contAmt) {
                             	         	return row.contAmt;
                             	         } else {
                                      return yufp.util.moneyFormatter(row.approvalAmt, 2);
                             	         }
                             }
                   },
                   { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
                   { label: '合同起始日', prop: 'loanStartDate', sortable: true, resizable: true },
                   { label: '合同到期日', prop: 'loanEndDate', sortable: true, resizable: true },
                   { label: '利率(年)', prop: 'realityIrY',  sortable: true, resizable: true, type:'num',formatter: function(cellValue) {
                           var num = parseFloat(cellValue);
                           if (typeof(num) == 'undefined'  || num == null || isNaN(num) )
                               num = 0;
                           var rateY = Number(num * 100).toFixed(4) + '%';
                           return rateY;
                       }
                   },
                	   { label: '客户经理号', prop: 'cusManager', sortable: true, resizable: true },
                	   { label: '主管机构代码', prop: 'mainBrId', sortable: true, resizable: true },
                	   { label: '合同状态', prop: 'contState', sortable: true, resizable: true ,dataCode: 'STD_ZB_CONT_STATUS' }
                 //{ label: '期限时间类型', prop: 'termTimeType', sortable: true, resizable: true ,dataCode: 'STD_ZB_TERM_TYPE'},
                 //{ label: '期限', prop: 'loanTerm', sortable: true, resizable: true },
//                 { label: '还款方式', prop: 'repaymentMode', sortable: true, resizable: true, dataCode: 'STD_PRD_REPAY_MODE' },
//                 { label: '合同签订日期', prop: 'signDate', sortable: true, resizable: true,hidden:true},
            ],
            frozeeColumns: [{
                label: '申请人',
                prop: 'createUser',
                resizable: true
              },
              {
                label: '申请日期',
                prop: 'applyDate',
                resizable: true
              },
              {
                label: '冻结原因',
                prop: 'remarks',
                resizable: true
              },
              {
                label: '审批状态',
                prop: 'approveStatus',
                dataCode: 'STD_ZB_APPR_STATUS',
                resizable: true
              },
              {
                label: '审批日期',
                prop: 'aprvDate',
                resizable: true
              }
            ],
           unFrozeeColumns: [{
               label: '申请人',
               prop: 'createUser',
               resizable: true
             },
             {
               label: '申请日期',
               prop: 'applyDate',
               resizable: true
             },
             {
               label: '解冻原因',
               prop: 'remarks',
               resizable: true
             },
             {
               label: '审批状态',
               prop: 'approveStatus',
               dataCode: 'STD_ZB_APPR_STATUS',
               resizable: true
             },
             {
               label: '审批日期',
               prop: 'aprvDate',
               resizable: true
             }
           ],
            prelistFields: [{
              columnCount:3 ,
              fields: [
            	  { field: 'preSerno', label: '预授信流水号' },
              	 { field: 'lmtSerno', label: '授信流水号'},
              	 { field: 'batchSerno', label: '批次流水号'},
              	 { field: 'cusId', label: '客户号'},
              	 { field: 'cusName', label: '客户名称'},
              	 { field: 'certType', label: '证件类型',type:'select',dataCode:'STD_ZB_CERT_TYP'},
              	 { field: 'certCode', label: '证件号码'},
              	 { field: 'certExpireDate', label: '证件有效期'},
              	 { field: 'mobile', label: '手机号码'},
              	 { field: 'prdCode', label: '产品代码'},
              	 { field: 'prdName', label: '业务产品名称'},
              	 { field: 'lmtType', label: '额度类型',type:'select',dataCode:'STD_ZB_PRELMT_TYPE'},
              	 { field: 'msgMarketingLmt', label: '短信营销额度(元)',type:'num' },
              	 { field: 'lmtAmt', label: '授信额度(元)',type:'num' },
              	 { field: 'actLmtAmt', label: '已激活金额(元)' },
              	 { field: 'waitActAmt', label: '待激活金额(元)' },
              	 { field: 'term', label: '期限'},
              	 { field: 'termType', label: '期限类型',type:'select',dataCode:'STD_ZB_TERM_TYPE'},
              	 { field: 'irMode', label: '利率模式',type:'select',dataCode:'STD_ZB_EFR_CHNG_IND'},
              	 { field: 'fixedRate', label: '固定利率(年)',type:'num'
//              		 template: function () {
//                       return '<template scope="scope"> {{ scope.row.irFloatPct | ratePctFilter }} </template>';}
              	 },
              	 { field: 'irFloatType', label: '利率浮动方式',type:'select',dataCode:'STD_ZB_IR_FLOAT_TYPE'},
              	 { field: 'irFloatPct', label: '利率浮动比例',formatter:_self.precentFormat},
              	 { field: 'irAdjustMode', label: '利率调整方式',type:'select',dataCode:'STD_ZB_IREXE_TYPE'},
              	 { field: 'cusRpn', label: '客户风险系数',hidden:true},
              	 { field: 'creditLevel', label: '信用等级',type:'select',dataCode:'STD_ZB_CREDIT_GRADE'},
              	 { field: 'actValidDays', label: '激活有效期（天）'},
              	 { field: 'agriFlg', label: '是否农户',type:'select',dataCode:'STD_ZX_YES_NO'},
              	 { field: 'hasWorkPlace', label: '是否有工作单位',type:'select',dataCode:'LAY_OFF_FLAG'},
              	 { field: 'workPlace', label: '工作单位名称'},
              	 { field: 'referrerMobile', label: '推荐人手机号码'},
              	 { field: 'status', label: '状态',type:'select',dataCode:'STD_ZB_PRELMT_STS'},
              	 { field: 'curOp', label: '当前操作',type:'select',dataCode:'STD_ZB_PRELMT_OP'},
              	 { field: 'remarks', label: '备注'},
              	 { field: 'cusManager', label: '客户经理号'},
              	 { field: 'mainBrId', label: '主管机构代码'},
              	 { field: 'chargeoffBrId', label: '出账机构代码'},
              	 { field: 'legalOrgCode', label: '法人机构代码'},
              	 { field: 'legalOrgName', label: '法人机构名称'},
              	 { field: 'importDate', label: '导入日期'},
              	 { field: 'createDate', label: '创建日期'},
              	 { field: 'createTime', label: '创建时间'},
              	 { field: 'lastUpdateUser', label: '最后更新人'},
              	 { field: 'lastUpdateTime', label: '最后修改时间'}             
              	 ]
            }],
            tabName:'prelist',
            ctrFields: [{
                columnCount: 3,
                fields: [
                  { field: 'contNo', label: '合同号',disabled: true },
                  { field: 'serno', label: '业务流水号',disabled: true},
                  { field: 'lmtContNo', label: '授信协议号',disabled: true},
                  { field: 'prdId', label: '产品号',disabled: true},
                  { field: 'prdCode', label: '产品代码',disabled: true},
                  { field: 'prdName', label: '产品名称',disabled: true},
                  { field: 'cusId', label: '客户号',disabled: true},
                  { field: 'cusName', label: '客户名称',disabled: true},
                  { field: 'loanUseType', label: '贷款用途',type: 'select',dataCode: 'LOAN_USE_GENERE',disabled: true},
                  //{ field: 'useDec', label: '借款用途',disabled: true},
                  { field: 'cusManager', label: '客户经理号',disabled: true},
                  { field: 'inputBrId', label: '登记机构代码',disabled: true},
                  { field: 'mainBrId', label: '主管机构代码',disabled: true},
                  { field: 'finaBrId', label: '账务机构代码',disabled: true},
                  { field: 'legalOrgCode', label: '法人机构代码',disabled: true},
                  { field: 'legalOrgName', label: '法人机构名称',disabled: true},
                  { field: 'chargeoffBrId', label: '出账机构代码',disabled: true},
                  { field: 'createTime', label: '创建时间',hidden: true,disabled: true},
                  { field: 'lastUpdateUser', label: '最后更新人',hidden: true,disabled: true},
                  { field: 'lastUpdateTime', label: '最近更新时间',hidden: true,disabled: true},
                ]
              }],
              fields1: [{
                columnCount: 3,
                fields: [
                    { field: 'assureMeansMain', label: '担保方式',type: 'select',dataCode: 'STD_ZB_ASSURE_MEANS',disabled: true},
                    { field: 'assureMeans2', label: '担保方式2',type: 'select',dataCode: 'STD_ZB_ASSURE_MEANS',disabled: true},
                    { field: 'assureMeans3', label: '担保方式3',type: 'select',dataCode: 'STD_ZB_ASSURE_MEANS',disabled: true}
                ]
              }],
              fields2: [{
                columnCount: 3,
                fields: [
                    { field: 'currencyType', label: '币种', type: 'select', dataCode: 'STD_ZX_CUR_TYPE',disabled: true},
                    { field: 'approvalAmt', label: '审批金额(元)',disabled: true},
                    { field: 'contAmt', label: '合同金额(元)',disabled: true}
                ]
              }],
              fields3: [{
                columnCount: 3,
                fields: [
                    { field: 'termTimeType', label: '期限时间类型' ,type: 'select',dataCode: 'STD_ZB_TERM_TYPE',disabled: true},
                    { field: 'loanTerm', label: '期限',disabled: true},
                    { field: 'loanStartDate', label: '借据起始日',disabled: true},
                    { field: 'loanEndDate', label: '借据到期日',disabled: true}
                ]
              }],
              fields4: [{
                columnCount: 3,
                fields: [
                    { field: 'rulingIrY', label: '基准利率(年)',disabled: true},
                    { field: 'intRateType', label: '利率类型',type: 'select',dataCode: 'STD_ZB_EFR_CHNG_IND',disabled: true},
                    { field: 'irExeType', label: '利率变更生效方式',type: 'select',dataCode: 'STD_ZB_IREXE_TYPE',disabled: true},
                    //{ field: 'fixedRate', label: '固定利率(年)' ,disabled: true},
                    { field: 'irAdjustMode', label: '利率调整方式',type: 'select',dataCode: 'STD_ZB_IREXE_TYPE',disabled: true},
                    { field: 'calFloatingRate', label: '利率浮动比',disabled: true},
                    { field: 'realityIrY', label: '执行利率(年)',disabled: true},
                    { field: 'overdueRate', label: '罚息浮动比',disabled: true},
                    { field: 'apprIntRateInc', label: '罚息利率增量（挪用利率）',disabled: true},
                    { field: 'repaymentPeriodType', label: '结息周期',type: 'select',dataCode:'STD_ZB_REPAY_FREQ',disabled: true,}
                ]
              }],
              fields5: [{
                columnCount: 4,
                fields: [
                    { field: 'enterAccount', label: '入账账号',disabled: true},
                   // { field: 'enterAccountName', label: '入账账户名称',disabled: true},
                    { field: 'repaymentAccount', label: '还款账号',disabled: true},
                    //{ field: 'repaymentAccName', label: '还款账户名称',disabled: true},
                    { field: 'repaymentDayType', label: '还款日类型',type: 'select',dataCode: 'REPAY_DAY_TYPE',disabled: true},
                    { field: 'repaymentDay', label: '还款日',disabled: true},
                    { field: 'repaymentSrcDec', label: '还款来源',disabled: true},
                    { field: 'repaymentMode', label: '还款方式',type: 'select',dataCode: 'STD_PRD_REPAY_MODE',disabled: true},
                    { field: 'fldvalue01', label: '备注1',disabled: true},
                    { field: 'cancelDate', label: '核销日期',disabled: true},
                    { field: 'repaymentCard', label: '还款卡号',disabled: true},
                    { field: 'loanAccount', label: '贷款账号',disabled: true}
                ]
              }],
              fields6: [{
                columnCount: 4,
                fields: [
                    {field: 'contType', label: '是否循环' ,type: 'select',dataCode: 'STD_ZX_YES_NO',disabled: true},
                    { field: 'changeDate', label: '合同变更日期',disabled: true},
                    { field: 'signDate', label: '合同签订日期',disabled: true},
                    { field: 'contState', label: '合同状态',type: 'select',dataCode: 'STD_ZB_CONT_STATUS' ,disabled: true},
                    { field: 'inputId', label: '申请人',disabled: true}
                ]
              }],
          prdContFields : [{
                columnCount: 3,
                fields: [
                	  { field: 'lmtContNo', label: '授信协议号'},
                  	 { field: 'lmtSerno', label: '授信申请流水号'},
                  	 { field: 'cusId', label: '客户号'},
                  	 { field: 'cusName', label: '客户名称'},
                  	 { field: 'certType', label: '证件类型',type:'select',dataCode:'STD_ZB_CERT_TYP'},
                  	 { field: 'certCode', label: '证件号码'},
                  	 { field: 'prdId', label: '产品ID'},
                  	 { field: 'prdCode', label: '产品号'},
                  	 { field: 'prdName', label: '产品名称'},
                  	 { field: 'caseCode', label: '专案编号'},
                  	 { field: 'caseName', label: '专案名称'},
                  	 { field: 'lmtAmt', label: '授信额度(元)'},
                  	 { field: 'cyclicFlg', label: '是否循环',type:'select',dataCode:'STD_ZX_YES_NO'},
                  	 { field: 'currencyType', label: '币种',type:'select',dataCode:'STD_ZX_CUR_TYPE'},
                  	 { field: 'term', label: '期限'},
                  	 { field: 'termType', label: '期限类型',type:'select',dataCode:'STD_ZB_TERM_TYPE'},
                  	 { field: 'rateY', label: '利率(年)'},
                  	 { field: 'assureMeansMain', label: '担保方式',type:'select',dataCode:'STD_ZB_ASSURE_MEANS'},
//                  	 { field: 'assureMeans2', label: '担保方式2'},
//                  	 { field: 'assureMeans3', label: '担保方式3'},
                  	 { field: 'repaymentMode', label: '还款方式',type:'select',dataCode:'STD_PRD_REPAY_MODE'},
                  	 { field: 'repaymentPeriodType', label: '还款周期',type:'select',dataCode:'STD_ZB_REPAY_FREQ'},
                  	 { field: 'repaymentDayType', label: '还款日类型',type:'select',dataCode:'REPAY_DAY_TYPE'},
                  	 { field: 'repaymentDay', label: '还款日'},
                  	 { field: 'repaymentSrcDec', label: '还款来源'},
                  	 { field: 'loanUse', label: '贷款用途',type:'select',dataCode:'LOAN_USE_GENERE'},
                  	 { field: 'loanUseSub', label: '贷款用途类别',type:'checkbox',dataCode:'LOAN_USE_TYPE'},
                  	 { field: 'lmtStatus', label: '授信状态',type:'select',dataCode:'STD_ZB_LMT_STATE'},
                  	 { field: 'startDate', label: '起始日'},
                  	 { field: 'expireDate', label: '到期日期'},
                  	 { field: 'signDate', label: '签订日期'},
                  	 { field: 'validDays', label: '授信批复有效期(天)'},
                  	 { field: 'cusManager', label: '客户经理号'},
                  	 { field: 'mainBrId', label: '管理机构代码'},
                  	 { field: 'chargeoffBrId', label: '出账机构代码'},
                  	 { field: 'legalOrgCode', label: '机构法人代码'},
                  	 { field: 'legalOrgName', label: '机构法人名称'},
                  	 { field: 'createTime', label: '创建时间'},
                  	 { field: 'lastUpdateUser', label: '最后更新人'},
                  	 { field: 'lastUpdateTime', label: '最近更新时间'}
                    ]               
            }],
            fromButtons: [
              { label: '关闭', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                  _self.dialogVisible = false;
                } }
            ],  
           contDialogVisible: false,
           dialogVisible: false,
           formDisabled: true,
           queryReset: true,
           viewType: 'DETAIL',
           viewTitle: yufp.lookup.find('CRUD_TYPE', false),
        freezeAprvFields: [{
            columnCount: 3,
            fields: [{
              field: 'aprvUserCode',
              label: '审批人用户代码'
            },{
              field: 'aprvDate',
              label: '审批日期'
            },{
              field: 'aprvComment',
              label: '人工处理意见',
              type: 'textarea'
            }]
          }],
          unfreezeVisibale: false,
          unfreezeCollapse: ['unFreBase', 'unAmtAndReason', 'unfreAprv'],
          unFreBaseFields: [{
            columnCount: 2,
            fields: [
              {
                field: 'lmtContNo',
                label: '授信协议号'
              },
              {
                field: 'mainBrId',
                label: '受理机构代码'
              },
              {
                  field: 'createUser',
                  label: '申请人'
              },
              {
                field: 'applyDate',
                label: '申请时间'
              }
            ]
          }],
          unAmtAndReasonFields: [{
            columnCount: 2,
            fields: [{
              field: 'lmtAmt',
              label: '解冻金额(元)'
            }]
          }, {
            columnCount: 2,
            fields: [{
              field: 'remarks',
              label: '解冻原因',
              type: 'textarea',
              rows: 6
            }]
          }],
          unfreAprvFields: [{
            columnCount: 3,
            fields: [{
              field: 'aprvUserCode',
              label: '审批人用户代码'
            },{
              field: 'aprvDate',
              label: '审批日期'
            },{
              field: 'aprvComment',
              label: '人工处理意见',
              type: 'textarea'
            }]
          }],
          freezeVisibale: false,
          freezeCollapse: ['freezeBase', 'freezeAprv'],
          freezeBaseFields: [{
            columnCount: 3,
            fields: [
              {
                field: 'lmtContNo',
                label: '授信协议号'
              },
              {
                  field: 'lmtAmt',
                  label: '产品额度(元)',
                  formatter: yufp.util.moneyFormatter
              },
              {
                  field: 'createUser',
                  label: '冻结申请人',
                  disabled: true
              }
            ]}, {
              columnCount: 2,
              fields: [{
                  field: 'remarks',
                  label: '冻结原因',
                  type: 'textarea'
              }]
            }],
      };
      },
      methods : {    
        realAmtFormat:function(row, column, cellValue){
        	var status = row.status;
        	var actAmt = row.actLmtAmt;
        	var waitAmt = row.waitActAmt;
        	if(status==10||status==90||status==98||status==99||!status){
        		return yufp.util.moneyFormatter(0,2);
        	}      	
        	if(status!=30){
        		return yufp.util.moneyFormatter(actAmt,2);
        	}else{        		
        		return yufp.util.moneyFormatter(waitAmt,2);
        	}       	
        },
        precentFormat:function(row, column, cellValue){
        	   var num = parseFloat(cellValue);
               if (typeof(num) == 'undefined'  || num == null || isNaN(num) )
                   num = 0;
               var rateY = Number(num * 100).toFixed(4) + '%';
               return rateY;
    	},
          /**
          * @param ctrlCode 操作码
          */
          checkPermission: function(ctrlCode) {
             return !yufp.session.checkCtrl(ctrlCode, cite.menuId);
          },  
           infoFn: function() {
           if (this.$refs.reftable.selections.length != 1) {
              this.$message({message : '请先选择一条记录',type : 'warning'});
              return;
            }
            var _self = this;
            _self.dialogVisible = true;
            var obj = this.$refs.reftable.selections[0];          
//            this.dataUrlRule = backend.consoleService + '/api/s/rule/exe/result/' + obj.lmtSerno;
//            this.dataUrlXF=backend.creditService + '/api/lmt/indiv/app/xfs/' + obj.lmtSerno; 
            this.switchStatus('DETAIL', true);
            this.$nextTick(function() {
              	var  _self = this;
              	var percent_1  = this.$refs.reftable.selections[0].fixedRate;
            	var percent_2  = this.$refs.reftable.selections[0].irFloatPct;
            	var price_1 = this.$refs.reftable.selections[0].lmtAmt;
            	var price_2 = this.$refs.reftable.selections[0].actLmtAmt;
            	var price_3 = this.$refs.reftable.selections[0].waitActAmt;
            	if (typeof(percent_1) == 'undefined'  || percent_1 == null || isNaN(percent_1) ){
            		percent_1 = 0;            		
            	}
            	percent_1 = parseFloat(percent_1*100,4).toFixed(4)+'%';
            	if (typeof(percent_2) == 'undefined'  || percent_2 == null || isNaN(percent_2) ){
            		percent_2 = 0;            		
            	}
            	percent_2 = parseFloat(percent_2*100,4).toFixed(4)+'%';
            	price_1 = yufp.util.moneyFormatter(price_1,2);
            	price_2 = yufp.util.moneyFormatter(price_2,2);
            	price_3 = yufp.util.moneyFormatter(price_3,2);
              var data = {};
              yufp.extend(data, this.$refs.reftable.selections[0]);
            	data.fixedRate = percent_1;    	
            	data.irFloatPct = percent_2;    	
            	data.lmtAmt = price_1;
            	data.actLmtAmt = price_2;
            	data.waitActAmt = price_3;
              yufp.extend(this.$refs.reform1.formModel, data);
              var lmtContNo = data.lmtContNo;
              //yufp.util.copyObj(this.$refs.baseInfo.formModel,this.$refs.reftable.selections[0]);//拷贝对象的值
              if(lmtContNo){          	  
              yufp.service.request({
                        method: "POST",
                        url: _self.dataUrlLmtCont+lmtContNo,
                        //url: backend.creditService + '/lmt/prd/cont/'+lmtContNo,
                        //data: JSON.stringify({cusId: this.$refs.reftable.selections[0].cusId}),
                        data:'',
                        callback: function (code, message, response) {                        	
                            if (response.success == true) {
                                _self.$refs.reform2.resetFn();//清空
                                var percent_response_1  = response.data.rateY;
                            	var price_response_1  = response.data.lmtAmt;
                            	if (typeof(percent_response_1) == 'undefined'  || percent_response_1 == null || isNaN(percent_response_1) ){
                            		percent_response_1 = 0;            		
                            	}
                            	var loanUseSub = response.data.loanUseSub;
                            	if ( typeof(loanUseSub) != 'undefined' && loanUseSub != null  ){
                            		loanUseSub = loanUseSub.split(",");
                            	}
                                percent_response_1 = parseFloat(percent_response_1*100,4).toFixed(4)+'%';
                            	price_response_1 = yufp.util.moneyFormatter(price_1,2);
                            	response.data.rateY = percent_response_1;
                            	response.data.lmtAmt = price_response_1;
                            	response.data.loanUseSub = loanUseSub;
                                yufp.extend(_self.$refs.reform2.formModel, response.data);//申请人基本信息赋值
                            } else {
                                _self.$message(response.message);
                            }
                        }
                    })
              }      
                var ctrLmtContNo = {lmtContNo:lmtContNo};
//                yufp.extend(this.$refs.approveInfoRef.formModel, obj);
               this.$refs.ctrContTable.remoteData(ctrLmtContNo);
               this.$refs.frezeeTable.remoteData(ctrLmtContNo);
               this.$refs.unfreezeTable.remoteData(ctrLmtContNo);
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
        switchStatus : function(viewType, editable) {
          var _self = this;
          _self.viewType = viewType;
          _self.formDisabled = true;
          _self.dialogVisible = true;
        },
        ctrContInfoFn: function() {
            var selections = this.$refs.ctrContTable.selections;
            if ( selections.length != 1) {
              this.$message({message: '请选择一条合同记录!', type: 'warning'});
              return;
            }
            this.contDialogVisible = true;
            var obj = selections[0];
            var obj_percent_1 = obj.realityIrY; 
        	if (typeof(obj_percent_1) == 'undefined'  || obj_percent_1 == null || isNaN(obj_percent_1) ){
        		obj_percent_1 = 0;            		
        	}
        	obj_percent_1 = parseFloat(obj_percent_1*100,4).toFixed(4)+'%';
        	obj.realityIrY = obj_percent_1;
        	var obj_percent_2 = obj.rulingIrY;
        	if (typeof(obj_percent_2) == 'undefined'  || obj_percent_2 == null || isNaN(obj_percent_2) ){
        		obj_percent_2 = 0;            		
        	}
        	obj_percent_2 = parseFloat(obj_percent_2*100,4).toFixed(4)+'%';
        	obj.rulingIrY = obj_percent_2;
        	var obj_percent_3 = obj.calFloatingRate;
        	if (typeof(obj_percent_3) == 'undefined'  || obj_percent_3 == null || isNaN(obj_percent_3) ){
        		obj_percent_3 = 0;            		
        	}
        	obj_percent_3 = parseFloat(obj_percent_3*100,4).toFixed(4)+'%';
        	obj.calFloatingRate = obj_percent_3;
        	var obj_percent_4 = obj.overdueRate;
        	if (typeof(obj_percent_4) == 'undefined'  || obj_percent_4 == null || isNaN(obj_percent_4) ){
        		obj_percent_4 = 0;            		
        	}
        	obj_percent_4 = parseFloat(obj_percent_4*100,4).toFixed(4)+'%';
        	obj.overdueRate = obj_percent_4;
        	var obj_percent_5 = obj.apprIntRateInc;
        	if (typeof(obj_percent_5) == 'undefined'  || obj_percent_5 == null || isNaN(obj_percent_5) ){
        		obj_percent_5 = 0;            		
        	}
        	obj_percent_5 = parseFloat(obj_percent_5*100,4).toFixed(4)+'%';
        	obj.apprIntRateInc = obj_percent_5;
        	var obj_price_1 = obj.approvalAmt;
        	obj_price_1 = yufp.util.moneyFormatter(obj_price_1,2);        	 
        	obj.approvalAmt = obj_price_1;
        	var obj_price_2 = obj.contAmt;
        	obj_price_2 = yufp.util.moneyFormatter(obj_price_2,2);        	 
        	obj.contAmt = obj_price_2;     	
            this.$nextTick(function() {
              yufp.util.copyObj(this.$refs.ctrForm.formModel, obj);
              yufp.util.copyObj(this.$refs.form1.formModel, obj);
              yufp.util.copyObj(this.$refs.form2.formModel, obj);
              yufp.util.copyObj(this.$refs.form3.formModel, obj);
              yufp.util.copyObj(this.$refs.form4.formModel, obj);
              yufp.util.copyObj(this.$refs.form5.formModel, obj);
              yufp.util.copyObj(this.$refs.form6.formModel, obj);
            });

          },
          contCloseFn: function() {
              this.contDialogVisible = false;
            },
            
        freezeInfoFn: function() {
            var selections = this.$refs.frezeeTable.selections;
            if ( selections.length != 1) {
              this.$message({message: '请选择一条冻结记录!', type: 'warning'});
              return;
            }
            this.freezeVisibale = true;
            var obj = selections[0];
            this.$nextTick(function () {
              yufp.util.copyObj(this.$refs.freezeBase.formModel, obj);
              yufp.util.copyObj(this.$refs.freezeAprv.formModel, obj);
            });
          },
          
          freezeCloseFn: function() {
              this.freezeVisibale = false; 
            },
          unfreezeInfoFn: function() {
              var selections = this.$refs.unfreezeTable.selections;
              if ( selections.length != 1) {
                this.$message({message: '请选择一条解冻记录!', type: 'warning'});
                return;
              }
              this.unfreezeVisibale = true;
              var obj = selections[0];
              this.$nextTick(function () {
                yufp.util.copyObj(this.$refs.unFreBase.formModel, obj);
                yufp.util.copyObj(this.$refs.unAmtAndReason.formModel, obj);
                yufp.util.copyObj(this.$refs.unfreAprv.formModel, obj);
              });
            },
            unfreezeCloseFn: function() {
                this.unfreezeVisibale = false; 
              }       
     //   submitForm : submitForm,
        /*returnForm : function() {
          var _self = this;
          _self.dialogVisible = false;
        }*/
      }
      });
    };
    // 消息处理
  exports.onmessage = function(type, message) {

  };
  // page销毁时触发destroy方法
  exports.destroy = function(id, cite) {
  }
});





