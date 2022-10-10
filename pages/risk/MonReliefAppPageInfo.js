/**
 * @create by ligm on 2019-10-29
 * @description 息费减免申请
 */
define(function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE,APRV_STATUS,APPLY_CHANNEL_TYPE,STD_ZB_ACC_STATUS,STD_ZB_CERT_TYP,SETL_TYP,TERM_STATUS,RELIEF_STS');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
            baseParams: {
            },
            dataUrl: backend.riskmService + '/api/mon/relief/apps',
            queryFields: [
              { placeholder: '减免申请流水号', field: 'reliefAppNo', type: 'input' },
              { placeholder: '客户编号', field: 'cusId', type: 'input' },
              { placeholder: '客户名称', field: 'cusName', type: 'input' },
              { placeholder: '借据编号', field: 'billNo', type: 'input' },
              { placeholder: '审批状态', field: 'approveStatus', type: 'select', dataCode:'APRV_STATUS' },
              { placeholder: '申请日期', field: 'createDateS2E', type: 'daterange', value: [], editable: false},
              { placeholder: '申请开始日期', field: 'createDateS', type: 'date', hidden: true},
              { placeholder: '申请结束日期', field: 'createDateE', type: 'date', hidden: true},
            ],

            queryButtons: [
              { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                  if (valid) {
                      model.createDateS = model.createDateS2E[0];
                      model.createDateE = model.createDateS2E[1];
                      _self.$refs.reftable.remoteData(model);
                  }
                } },
              { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
            ],
  
            tableColumns: [
              { label: '减免申请流水号', prop: 'reliefAppNo', sortable: true, resizable: true },
              { label: '客户编号', prop: 'cusId', sortable: true, resizable: true },
              { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
              { label: '证件类型', prop: 'certType', sortable: true, resizable: true, dataCode: 'STD_ZB_CERT_TYP' },
              { label: '证件号码', prop: 'certCode', sortable: true, resizable: true },
              { label: '合同编号', prop: 'contNo', sortable: true, resizable: true },
              { label: '借据编号', prop: 'billNo', sortable: true, resizable: true },
              { label: '渠道名称', prop: 'channelCode', sortable: true, resizable: true, dataCode: 'APPLY_CHANNEL_TYPE' },
              { label: '产品编号', prop: 'prdCode', sortable: true, resizable: true, hidden: true },
              { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
              { label: '借据金额', prop: 'loanAmount', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                      return yufp.util.moneyFormatter(cellValue, 2);
                  } },
              { label: '逾期本金金额', prop: 'overdueBalance', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                      return yufp.util.moneyFormatter(cellValue, 2);
                  } },  // from efp_loan.acc_loan，overdue_balance（逾期贷款余额(元)）
              { label: '逾期本金天数', prop: 'overdueDays', sortable: true, resizable: true },
              { label: '逾期利息金额', prop: 'delayIntCumu', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                      return yufp.util.moneyFormatter(cellValue, 2);
                  } }, // from efp_loan.acc_loan, delay_int_cumu(欠息累计)
              { label: '借据起始日', prop: 'loanStartDate', sortable: true, resizable: true },
              { label: '借据到期日', prop: 'loanEndDate', sortable: true, resizable: true },
              { label: '借据状态', prop: 'loanStatus', sortable: true, resizable: true, dataCode: 'STD_ZB_ACC_STATUS' },
              { label: '审批状态', prop: 'approveStatus', sortable: true, resizable: true, dataCode: 'APRV_STATUS' },
              { label: '审批人编号', prop: 'aprvUserCode', sortable: true, resizable: true, hidden: true},
              { label: '审批人名称', prop: 'aprvUserName', sortable: true, resizable: true, hidden: true},
              { label: '申请时间', prop: 'createTime', sortable: true, resizable: true},

              { label: '减免金额', prop: 'reliefLmt', sortable: true, resizable: true, hidden: true, formatter: function (row, column, cellValue) {
                      return yufp.util.moneyFormatter(cellValue, 2);
                  } },
              { label: '减免幅度(%)', prop: 'reliefRange', sortable: true, resizable: true, hidden: true },
              { label: '减免原因', prop: 'reliefReson', sortable: true, resizable: true, hidden: true },
              { label: '备注', prop: 'remarks', sortable: true, resizable: true, hidden: true }
              // { label: '息费减免状态', prop: 'reliefStatus', type: 'select', dataCode:'RELIEF_STS' , hidden: true}
            ],

            updateButtons: [
              { label: '提交', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                  var validate = false;
                  _self.$refs.reliefInfo.validate(function (valid) {
                    validate = valid;
                  });
                  if (!validate) {
                    return;
                  }
                  var result = _self.$refs.accLoanInfo.formModel.receIntCumu + _self.$refs.accLoanInfo.formModel.unpdArrPrnBal1 +
                      _self.$refs.accLoanInfo.formModel.unpdArrsIntBal1;
                  var reliefLmt = _self.$refs.reliefInfo.formModel.reliefLmt;
                  if(reliefLmt <= 0){
                      _self.$message({message: '减免金额不能小于等于零，请重新输入！', type: 'warning'});
                      return;
                  }
                  if(reliefLmt > result){
                      _self.$message({message: '减免金额不能大于应收利息、应收复利与应收罚息之和！', type: 'warning'});
                      return;
                  }
                  _self.fullscreenLoading = true;
                  var obj = {};
                  yufp.extend(obj, _self.$refs.cusBaseInfo.formModel);
                  yufp.extend(obj, _self.$refs.accLoanInfo.formModel);
                  yufp.extend(obj, _self.$refs.reliefInfo.formModel);

                  obj.unpdArrPrnBal = _self.$refs.accLoanInfo.formModel.unpdArrPrnBal1;
                  obj.receIntPen = _self.$refs.accLoanInfo.formModel.unpdArrsIntBal1;
                  var rMethod = '';
                  if (_self.viewType == 'EDIT') {
                      rMethod = 'PUT';
                  } else if (_self.viewType == 'ADD') {
                      rMethod = 'POST';
                  }
                  yufp.service.request({
                    method: rMethod,
                    url: backend.flowService + '/api/mon/relief/app',
                    data: obj,
                    timeout: 15000,
                    callback: function (code, message, response) {
                      if (code == 0 && response.rows > 0) {
                        _self.$message('息费减免申请发起成功！');
                      } else {
                        _self.$message('操作失败:' + response.message);
                      }
                      _self.$refs.reftable.remoteData();
                      _self.fullscreenLoading = false;
                      _self.dialogVisible = false;
                    }
                  });
                } },
              { label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                  _self.dialogVisible = false;
                } },
              { label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                    _self.dialogVisible = false;
                } }
            ],


            /** *************************** 逾期借据选择 start *************************** */
            baseParamsLoan: {
              monFlag: '10'
            },
            dataUrlLoan: backend.creditService + '/api/acc/loans',

            queryFieldsLoan: [
              { placeholder: '借据编号', field: 'billNo', type: 'input' },
              { placeholder: '客户编号', field: 'cusId', type: 'input' },
              { placeholder: '客户名称', field: 'cusName', type: 'input' }
            ],

            queryButtonsLoan: [
              { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                      if (valid) {
                          _self.$refs.reftableLoan.remoteData(model);
                      }
                  } },
              { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
            ],

            tableColumnsLoan: [
              { label: '减免申请流水号', prop: 'reliefAppNo', sortable: true, resizable: true, hidden: true },
              { label: '借据编号', prop: 'billNo', sortable: true, resizable: true },
              { label: '合同编号', prop: 'contNo', sortable: true, resizable: true },
              { label: '客户编号', prop: 'cusId', sortable: true, resizable: true },
              { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
              { label: '证件类型', prop: 'certType', sortable: true, resizable: true, dataCode: 'STD_ZB_CERT_TYP' },
              { label: '证件号码', prop: 'certCode', sortable: true, resizable: true },
              { label: '渠道名称', prop: 'channelCode', sortable: true, resizable: true, dataCode: 'APPLY_CHANNEL_TYPE' },
              { label: '产品编号', prop: 'prdCode', sortable: true, resizable: true, hidden: true },
              { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
              { label: '借据金额', prop: 'loanAmount', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                      return yufp.util.moneyFormatter(cellValue, 2);
                  } },
              { label: '逾期本金金额', prop: 'overdueBalance', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                      return yufp.util.moneyFormatter(cellValue, 2);
                  } },
              { label: '逾期本金天数', prop: 'overdueDays', sortable: true, resizable: true },
              { label: '逾期利息金额', prop: 'delayIntCumu', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                      return yufp.util.moneyFormatter(cellValue, 2);
                  } },
              { label: '应收利息', prop: 'delayIntCumu', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                      return yufp.util.moneyFormatter(cellValue, 2);
                  }},
              { label: '应收复利', prop: 'unpdArrPrnBal1', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                    return yufp.util.moneyFormatter(cellValue, 2);
                }},
              { label: '应收罚息', prop: 'unpdArrsIntBal1', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                      return yufp.util.moneyFormatter(cellValue, 2);
                  }},
              { label: '借据起始日', prop: 'loanStartDate', sortable: true, resizable: true },
              { label: '借据到期日', prop: 'loanEndDate', sortable: true, resizable: true },
              { label: '借据状态', prop: 'accountStatus', sortable: true, resizable: true, dataCode: 'STD_ZB_ACC_STATUS'},
              { label: '贷款号', prop: 'loanSeq', sortable: true, resizable: true, hidden: true },
              { label: '发放号', prop: 'distrNo', sortable: true, resizable: true, hidden: true },
              { label: '客户经理', prop: 'cusManager', sortable: true, resizable: true, hidden: true },
              { label: '登记机构', prop: 'inputBrId', sortable: true, resizable: true, hidden: true}
            ], /** 逾期借据选择 end   *************************** */

              /** 客户基本信息 */
            cusBaseInfoFields: [{
              columnCount: 2,
              fields: [
                  {field: 'cusId', label: '客户编号', disabled: true},
                  {field: 'cusName', label: '客户名称', disabled: true},
                  {field: 'certType',label: '证件类型', disabled: true, type: 'select',dataCode: 'STD_ZB_CERT_TYP'},
                  {field: 'certCode', label: '证件号码', disabled: true}
              ]
            }],

            /** 催收借据信息 */
            accLoanInfoFields: [{
              columnCount: 2,
              fields: [
                  {field: 'billNo', label: '借据编号', disabled: true, hidden: false},
                  {field: 'contNo', label: '合同编号', disabled: true, hidden: false},
                  {field: 'channelCode', label: '渠道名称', disabled:true, type: 'select', dataCode:'APPLY_CHANNEL_TYPE'},
                  {field: 'prdCode', label: '产品编号', hidden: true},
                  {field: 'prdName', label: '产品名称', disabled:true},
                  {field: 'loanAmount', label: '借据金额', disabled: true, hidden: false, type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                  {field: 'overdueBalance', label: '逾期本金金额', disabled: true, hidden: false, type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                  {field: 'overdueDays', label: '逾期本金天数', disabled: true, hidden: false},
                  {field: 'delayIntCumu', label: '逾期利息金额', disabled: true, type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                  {field: 'receIntCumu', label: '应收利息', disabled: true, type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                  {field: 'unpdArrPrnBal1', label: '应收复利', disabled: true, type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                  {field: 'unpdArrsIntBal1', label: '应收罚息', disabled: true, type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                  {field: 'loanStartDate', label: '借据起始日', disabled: true, hidden: false},
                  {field: 'loanEndDate', label: '借据到期日', disabled: true, hidden: false},
                  {field: 'accountStatus',label: '借据状态',disabled: true,hidden: false,type: 'select',dataCode: 'STD_ZB_ACC_STATUS'},
                  { field: 'cusManager', label: '客户经理', disabled: true, hidden: true},
                  { field: 'inputBrId', label: '登记机构', disabled: true, hidden: true},
                  { field: 'loanSeq', label: '贷款号', disabled: true, hidden: true},
                  { field: 'distrNo', label: '发放号', disabled: true, hidden: true},
              ]
            }],
          /** 附件上传*/
          dataUrlAnnex: backend.riskmService + '/api/mon/relief/ann',
          baseParamsAnnex:{},
          tableColumnsAnnex:[
              { label: '减免申请流水号', prop: 'flowAppNo', sortable: true, resizable: true },
              { label: '借据号', prop: 'bizSerno', sortable: true, resizable: true },
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
                      {field: 'fileSignCode', label: '', disabled: true, hidden: true},
                      {field: 'flowAppNo', label: '减免申请流水号', disabled: true,
                          rules: [{required: true, message: '必填项', trigger: 'blur'}]
                      },
                      {field: 'bizSerno', label: '借据号', disabled: true,
                          rules: [{required: true, message: '必填项', trigger: 'blur'}]
                      },
                      // {field: 'annexName', label: '附件名称'},
                      // {field: 'annexDesc', label: '附件描述'},
                      {field: 'uploadUser', label: '上传人', disabled: true,
                          rules: [{required: true, message: '必填项', trigger: 'blur'}]
                      },
                      {field: 'uploadTime', label: '上传时间', disabled: true, hidden: true},
                      {field: 'lastUploadUser', label: '最后更新人', disabled: true, hidden: true},
                      {field: 'lastUploadTime', label: '最后更新时间', disabled: true, hidden: true}
                  ]
              },
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
          /** 审批信息 */
          apprInfoFields: [{
              columnCount: 2,
              fields: [
                  {field: 'approveStatus', label: '审批状态', disabled:true, type: 'select', dataCode:'APRV_STATUS'},
                  {field: 'aprvUserCode', label: '审批人编号', disabled: true, hidden: true},
                  {field: 'aprvUserName', label: '审批人名称', disabled: true},
                  {field: 'aprvTime', label: '审批时间', disabled: true},
              ]
          },{
              columnCount: 1,
              fields: [
                  { field: 'aprvComment', label: '审批意见', disabled:true, type:'textarea', rows: 3}
              ]
          },],

            /** 息费减免信息 */
            reliefInfoFields: [{
                columnCount: 2,
                fields: [
                    {field: 'reliefAppNo', label: '减免申请流水号', disabled: true, hidden: true},
                    { field: 'reliefLmt', label: '减免金额', rules: [{ required: true, message: '必输项', trigger: 'blur' },
                            { validator: yufp.validator.gZero,message: '必须填写数字', trigger: 'blur'},
                            { validator:
                                function(rule, value, callback){
                                    var reliefLmt = _self.$refs.reliefInfo.formModel.reliefLmt;
                                    if(null==reliefLmt || ''==reliefLmt){
                                        _self.$refs.reliefInfo.formModel.reliefRange = '';
                                        callback();
                                    }else{
                                        var overdueBalance = _self.$refs.accLoanInfo.formModel.overdueBalance;
                                        var receIntCumu = _self.$refs.accLoanInfo.formModel.receIntCumu;
                                        var unpdArrPrnBal = _self.$refs.accLoanInfo.formModel.unpdArrPrnBal1;
                                        var receIntPen = _self.$refs.accLoanInfo.formModel.unpdArrsIntBal1;
                                        //欠费余额=逾期应还本金+应还利息+费用（复利+罚息）
                                        var result = overdueBalance + receIntCumu + unpdArrPrnBal + receIntPen;
                                        if(null==result || ''==result){
                                            _self.$message('欠费余额为空，无法计算减免幅度！');
                                            _self.$refs.reliefInfo.formModel.reliefRange = '';
                                            callback();
                                        }else{
                                            var reliefRange = ((reliefLmt /  result) * 100).toFixed(2);
                                            _self.$refs.reliefInfo.formModel.reliefRange = reliefRange;
                                            callback();
                                        }
                                    }
                                }
                            } ]},
                    { field: 'reliefRange', label: '减免幅度(%)', disabled:true, rules: [{ required: true, message: '必输项', trigger: 'blur' },
                            { validator: yufp.validator.gZero,message: '必须填写数字', trigger: 'blur'}]}
                ]
            },{
                columnCount: 1,
                fields: [
                    { field: 'reliefReson', label: '减免原因', type:'textarea', rows: 3, rules: [{ required: true, message: '必输项', trigger: 'blur' }]}
                ]
            },{
                columnCount: 1,
                fields: [
                    { field: 'remarks', label: '备注', type:'textarea', rows: 3},
                ]}
            ],

            /** 还款记录明细信息 */
            baseParamsRepayDetail: {
            },
            dataUrlRepayDetail: backend.creditService + '/api/loan/repay/detail',

            tableColumnsRepayDetail: [
              { label: '还款期数', prop: 'repayTerm', sortable: true, resizable: true },
              { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
              { label: '计划还款日', prop: 'stmtDate', sortable: true, resizable: true }, // 取还款计划的 计划还款日
              { label: '放款金额', prop: 'dnAmt', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                      return yufp.util.moneyFormatter(cellValue, 2);
                  } },
              { label: '执行年利率', prop: 'intRat', sortable: true, resizable: true,
                  formatter: function(row, column, cellValue) {
                      var num = parseFloat(cellValue);
                      if (typeof(num) == 'undefined'  || num == null || isNaN(num) )
                          return "";
                      var rateY = Number(num * 100).toFixed(2) + '%';
                      return rateY;
                  } },
              { label: '还款类型', prop: 'setlTyp', sortable: true, resizable: true, dataCode: 'SETL_TYP' },
              { label: '实际还款日期', prop: 'setlApplyDt', sortable: true, resizable: true },
              { label: '应还本金', prop: 'allOdPrcpAmt', sortable: true, resizable: true,formatter: function (row, column, cellValue) {
                      return yufp.util.moneyFormatter(cellValue, 2);
                  }  },
              { label: '应还利息', prop: 'allOdNormIntAmt', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                      return yufp.util.moneyFormatter(cellValue, 2);
                  } },
              { label: '应还罚息', prop: 'allOdIntAmt', sortable: true, resizable: true,formatter: function (row, column, cellValue) {
                      return yufp.util.moneyFormatter(cellValue, 2);
                  } },
              { label: '实还本金', prop: 'setlOdPrcpAmt', sortable: true, resizable: true,formatter: function (row, column, cellValue) {
                      return yufp.util.moneyFormatter(cellValue, 2);
                  }  },
              { label: '实还利息', prop: 'setlOdNormInt', sortable: true, resizable: true,formatter: function (row, column, cellValue) {
                      return yufp.util.moneyFormatter(cellValue, 2);
                  }  },
              { label: '实还罚息', prop: 'setlOdIntAmt', sortable: true, resizable: true,formatter: function (row, column, cellValue) {
                      return yufp.util.moneyFormatter(cellValue, 2);
                  }  },
              { label: '还款账号', prop: 'disbAcNo', sortable: true, resizable: true, width: 180 }
            ],

            baseParamsRepayPlan: {

            },
            dataUrlRepayPlan : backend.creditService + '/api/loan/repay/plan',

            tableColumnsRepayPlan: [
              { label: '还款期数', prop: 'term', sortable: true, resizable: true },
              { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
              { label: '计划还款日', prop: 'stmtDate', sortable: true, resizable: true },
              { label: '期数状态', prop: 'status', sortable: true, resizable: true , dataCode: 'TERM_STATUS'},
              { label: '应还本金', prop: 'principal', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                      return yufp.util.moneyFormatter(cellValue, 2);
                  } },
              { label: '已还本金', prop: 'principalPaid', sortable: true, resizable: true,formatter: function (row, column, cellValue) {
                      return yufp.util.moneyFormatter(cellValue, 2);
                  } },
              { label: '逾期本金', prop: 'principalDue', sortable: true, resizable: true,formatter: function (row, column, cellValue) {
                      return yufp.util.moneyFormatter(cellValue, 2);
                  } },
              { label: '非应计本金', prop: 'principalDue91', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                      return yufp.util.moneyFormatter(cellValue, 2);
                  }, width: 160  },
              { label: '应还利息', prop: 'interest', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                      return yufp.util.moneyFormatter(cellValue, 2);
                  }  },
              { label: '已还利息', prop: 'interestPaid', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                      return yufp.util.moneyFormatter(cellValue, 2);
                  }  },
              { label: '逾期利息', prop: 'interestDue', sortable: true, resizable: true , formatter: function (row, column, cellValue) {
                      return yufp.util.moneyFormatter(cellValue, 2);
                  } },
              { label: '表外利息', prop: 'interestDue91', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                      return yufp.util.moneyFormatter(cellValue, 2);
                  }  },
              { label: '应还罚息', prop: 'penaltyDue', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                      return yufp.util.moneyFormatter(cellValue, 2);
                  }  },
              { label: '已还罚息', prop: 'penaltyPaid', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                      return yufp.util.moneyFormatter(cellValue, 2);
                  }  }
            ],

            rebackButtons: [
              {
                  label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                      _self.dialogVisibleDetail = false;
                  }
              }
            ],

            height: yufp.frame.size().height - 103,
            dialogVisible: false,
            dialogVisibleLoan: false,
            checkIsShowCus: false,
            checkIsShowAccLoan: false,
            checkIsShowRelief: false,
            checkIsShowUpload: false,
            checkIsShowRepayDetail: false,
            checkIsShowRepayPlan: false,
            checkIsShowAppr: false,
            formDisabled: false,
            annexFormDisabled: false,
            dialogVisibleAnnex: false,
            fullscreenLoading: false,
            annexViewType: '',
            flag: '',
            dialogVisibleDetail: false,
            monReliefDetailViewRootId: 'monReliefDetailView',
            exportFileName: '息费减免申请信息',
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
                _self.dialogVisible = true;
                _self.checkIsShowCus = true;
                _self.checkIsShowAccLoan = true;
                _self.checkIsShowRelief = true;

                if ('ADD' == viewType) {
                    _self.checkIsShowAppr = false;
                } else {
                    _self.checkIsShowAppr = true;
                }

                _self.checkIsShowUpload = editable;
                _self.checkIsShowRepayDetail = !editable;
                _self.checkIsShowRepayPlan = !editable;

                _self.updateButtons[0].hidden = !editable;
                _self.updateButtons[1].hidden = !editable;
                _self.updateButtons[2].hidden = editable;
            },

            setbaseParamsAnnex: function () {
                var _self = this;
                if ('EDIT' == _self.viewType) {
                    var obj = _self.$refs.reftable.selections[0];
                    _self.baseParamsAnnex = {
                        flowAppNo: obj.reliefAppNo,
                        bizSerno: obj.billNo
                    }
                }
                if ('ADD' == _self.viewType) {
                    _self.baseParamsAnnex = {
                        flowAppNo: _self.$refs.reliefInfo.formModel.reliefAppNo,
                        bizSerno: _self.$refs.accLoanInfo.formModel.billNo
                    }
                }
            },

          addFn: function () {
            var _self = this;
            //_self.switchStatus('ADD', true);
            _self.dialogVisibleLoan = true;
            //_self.viewType = 'ADD';
            //_self.checkIsShowAppr = false;
            _self.$nextTick(function () {
              _self.$refs.reftableLoan.remoteData();
            });
          },

          //逾期借据选择确认
          confirmFn: function(){
              if (this.$refs.reftableLoan.selections.length != 1) {
                  this.$message({ message: '请先选择一条记录', type: 'warning' });
                  return;
              }
              var _self = this;
              var obj = _self.$refs.reftableLoan.selections[0];
              yufp.service.request({
                  method: 'POST',
                  url: backend.riskmService + '/api/mon/relief/app/check/loan',
                  data: {
                      billNo: obj.billNo
                  },
                  callback: function (code, message, response) {
                      if (code == 0 && response.rows == 0) {
                          //获取减免申请流水号
                          yufp.service.request({
                              method: 'GET',
                              url: backend.riskmService + '/api/get/relief/app/no?timestamp='+ new Date().getTime(),
                              data: {},
                              callback: function (code, message, response) {
                                  if (response.code == 0 && null != response.rows) {
                                      obj.reliefAppNo = response.rows;
                                      _self.rebackLoanInfo(obj);
                                  } else {
                                      _self.$message('操作失败:' +response.message);
                                  }
                              }
                          });
                      } else if(response.rows == -1){
                          _self.$message('借据编号【' + obj.billNo + '】，存在未处理完成的息费减免申请，请先处理！');
                      }
                      else {
                          _self.$message('操作失败:' + response.message);
                      }
                  }
              });
            },


            //选择借据信息回显
            rebackLoanInfo: function(obj){
                var _self = this;
                _self.dialogVisibleLoan = false;
                _self.switchStatus('ADD', true);
                _self.formDisabled = false;
                _self.$nextTick(function () {
                    _self.$refs.cusBaseInfo.resetFn();
                    _self.$refs.accLoanInfo.resetFn();
                    _self.$refs.reliefInfo.resetFn();
                    yufp.extend(_self.$refs.cusBaseInfo.formModel, obj);
                    yufp.extend(_self.$refs.accLoanInfo.formModel, obj);
                    _self.$refs.reliefInfo.formModel.reliefAppNo = obj.reliefAppNo;
                    _self.$refs.accLoanInfo.formModel.loanStatus = obj.accountStatus;
                    _self.$refs.accLoanInfo.formModel.receIntPen = obj.delayIntCumu1;

                    _self.setbaseParamsAnnex();
                    _self.$refs.reftableAnnex.remoteData(_self.baseParamsAnnex);
                });
            },


            //取消
            cancelFn: function () {
                this.dialogVisibleLoan = false;
                this.$refs.reftable.remoteData();
            },

            modifyFn: function () {
                var _self = this;
                if (_self.$refs.reftable.selections.length != 1) {
                    this.$message({message: '请先选择一条记录', type: 'warning'});
                    return;
                }
                var obj = _self.$refs.reftable.selections[0];
                if(!(obj.approveStatus === '01' || obj.approveStatus === '05')){
                    _self.$message({message: '只能修改审批状态为"待发起"或"打回"的申请信息！', type: 'warning'});
                    return;
                }
                _self.baseParamsAnnex = {
                    flowAppNo: obj.reliefAppNo,
                    bizSerno: obj.billNo
                }
                _self.switchStatus('EDIT', true);
                _self.formDisabled = false;
                this.$nextTick(function () {
                    _self.$refs.cusBaseInfo.resetFn();
                    _self.$refs.accLoanInfo.resetFn();
                    _self.$refs.reliefInfo.resetFn();
                    _self.$refs.apprInfo.resetFn();

                    _self.$refs.reftableAnnex.remoteData(_self.baseParamsAnnex);
                    yufp.extend(_self.$refs.cusBaseInfo.formModel, obj);
                    yufp.extend(_self.$refs.accLoanInfo.formModel, obj);
                    yufp.extend(_self.$refs.apprInfo.formModel, obj);
                    yufp.extend(_self.$refs.reliefInfo.formModel, obj, {reliefLmt: obj.reliefLmt + ""});
                    _self.$refs.accLoanInfo.formModel.accountStatus = obj.loanStatus;
                    _self.$refs.accLoanInfo.formModel.delayIntCumu1 = obj.receIntPen;
                    _self.$refs.accLoanInfo.formModel.unpdArrPrnBal1 = obj.unpdArrPrnBal;
                    _self.$refs.accLoanInfo.formModel.unpdArrsIntBal1 = obj.receIntPen;
                });
            },

            infoFn: function () {
            if (this.$refs.reftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            var _self = this;
            _self.switchStatus('DETAIL', false);
            _self.formDisabled = true;

            var obj = _self.$refs.reftable.selections[0];

            _self.baseParamsRepayDetail = {
              loanNo: obj.billNo,
              prdName: obj.prdName
            };

            _self.baseParamsRepayPlan = {
              refNbr: obj.billNo,
              prdName: obj.prdName
            };
            this.$nextTick(function () {
                _self.$refs.cusBaseInfo.resetFn();
                _self.$refs.accLoanInfo.resetFn();
                _self.$refs.reliefInfo.resetFn();
                _self.$refs.apprInfo.resetFn();

                _self.$refs.reftableRepayDetail.remoteData(_self.baseParamsRepayDetail);
                _self.$refs.reftableRepayPlan.remoteData(_self.baseParamsRepayPlan);

                yufp.extend(_self.$refs.cusBaseInfo.formModel, obj);
                yufp.extend(_self.$refs.accLoanInfo.formModel, obj);
                yufp.extend(_self.$refs.reliefInfo.formModel, obj);
                yufp.extend(_self.$refs.apprInfo.formModel, obj);
                _self.$refs.accLoanInfo.formModel.accountStatus = obj.loanStatus;
                _self.$refs.accLoanInfo.formModel.delayIntCumu1 = obj.receIntPen;
                _self.$refs.accLoanInfo.formModel.unpdArrPrnBal1 = obj.unpdArrPrnBal;
                _self.$refs.accLoanInfo.formModel.unpdArrsIntBal1 = obj.receIntPen;
            });
          },


          /** 附件上传 */
          uploadAnnexFile: function (item) {
              var _self = this;
              var reliefAppNo = _self.$refs.accLoanInfo.formModel.reliefAppNo;
              var date = yufp.util.dateFormat(new Date().getTime(), '{y}{m}{d}');
              this.getRightCode(reliefAppNo,date,item);
          },
            getRightCode: function (reliefAppNo,date,rightCode) {
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
            },

        uploadAnnexFn: function () {
            var _self = this;
            _self.dialogVisibleAnnex = true;
            _self.annexFormDisabled = false;
            _self.flag = '';
            _self.annexViewType = 'NEWANN';
            this.$nextTick(function () {
                _self.$refs.annexForm.resetFn();
                if('EDIT' == _self.viewType){
                    var obj = _self.$refs.reftable.selections[0];
                    yufp.extend(_self.$refs.annexForm.formModel,
                        {flowAppNo:obj.reliefAppNo},
                        {bizSerno:obj.billNo},
                        {uploadUser:yufp.session.userCode});
                }
                if('ADD' == _self.viewType)
                    yufp.extend(_self.$refs.annexForm.formModel,
                        {flowAppNo : _self.$refs.reliefInfo.formModel.reliefAppNo},
                        {bizSerno: _self.$refs.accLoanInfo.formModel.billNo},
                        {uploadUser: yufp.session.userCode});
                _self.$refs.annexForm.switch('uploadTime', 'hidden', true);
                _self.$refs.annexForm.switch('lastUploadUser', 'hidden', true);
                _self.$refs.annexForm.switch('lastUploadTime', 'hidden', true);
            });
        },
        modifyAnnexFn: function () {
            var _self = this;
            if (this.$refs.reftableAnnex.selections.length != 1) {
                this.$message({ message: '请先选择一条记录', type: 'warning' });
                return;
            }
            var obj = _self.$refs.reftableAnnex.selections[0];
            _self.dialogVisibleAnnex = true;
            _self.annexFormDisabled = false;
            _self.flag = '';
            _self.annexViewType = 'UPDATEANN';
            _self.$nextTick(function () {
                _self.$refs.annexForm.resetFn();
                yufp.extend(_self.$refs.annexForm.formModel,obj,{lastUploadUser:yufp.session.userCode});
                _self.$refs.annexForm.switch('uploadTime', 'hidden', false);
                _self.$refs.annexForm.switch('lastUploadUser', 'hidden', false);
                _self.$refs.annexForm.switch('lastUploadTime', 'hidden', false);
            });

        },
        infoAnnexFn: function () {
            var _self = this;
            if (this.$refs.reftableAnnex.selections.length != 1) {
                this.$message({ message: '请先选择一条记录', type: 'warning' });
                return;
            }
            var right = '0100000';
            _self.dialogVisibleAnnex = true;
            _self.annexFormDisabled = true;
            _self.flag = 'VIEWINFO';
            var obj = _self.$refs.reftableAnnex.selections[0];
            _self.$nextTick(function () {
                _self.$refs.annexForm.resetFn();
                yufp.extend(_self.$refs.annexForm.formModel,obj);
                _self.$refs.annexForm.switch('uploadTime', 'hidden', false);
                _self.$refs.annexForm.switch('lastUploadUser', 'hidden', false);
                _self.$refs.annexForm.switch('lastUploadTime', 'hidden', false);
                _self.$refs.annexForm.switch('lastUploadTime', 'hidden', false);
                _self.$refs.annexForm.switch('lastUploadTime', 'hidden', false);
            });
            _self.$confirm('将前往影像平台查看影像资料，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true,
                callback: function (action) {
                    if (action === 'confirm') {
                        _self.uploadAnnexFile(right);
                    }
                }
            });
        },
        deleteAnnexFn: function () {
            var _self = this;
            if (_self.$refs.reftableAnnex.selections.length != 1) {
                this.$message({ message: '请先选择要删除的记录', type: 'warning' });
                return;
            }
            var right = '0110000';
            var obj = _self.$refs.reftableAnnex.selections[0];
            _self.$confirm('此操作将永久删除该数据,且删除本地记录后将前往影像平台删除影像资料，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true,
                callback: function (action) {
                    if (action === 'confirm') {
                        yufp.service.request({
                            method: 'DELETE',
                            url: backend.riskmService + '/api/s/delMon/reliefAnn/msg',
                            data: obj,
                            callback: function (code, message, response) {
                                if (response.code == 0) {
                                    if (_self.$refs.reftableAnnex != 'undefined') _self.$refs.reftableAnnex.remoteData(_self.baseParamsAnnex);
                                    _self.$message('操作成功');
                                    _self.uploadAnnexFile(right);
                                } else {
                                    _self.$message('操作失败');
                                }
                            }
                        });
                    }
                }
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
            var rMethod = '';
            var msg = '';
            var right = '';
            if (_self.annexViewType == 'UPDATEANN') {
                rMethod = 'PUT';
                right = '0101000';
                msg = "此操作将保存修改的数据,且保存本地记录后将前往影像平台修改影像资料，是否继续？"
            } else if (_self.annexViewType == 'NEWANN') {
                rMethod = 'POST';
                right = '1100000';
                msg = "此操作将保存数据,且保存本地记录后将前往影像平台新增影像资料，是否继续？"
            }

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
                            url: backend.riskmService + '/api/s/mon/reliefAnn/msg',
                            data: cmisdata,
                            callback: function (code, message, response) {
                                if (response.code == 0) {
                                    _self.setbaseParamsAnnex();
                                    _self.$refs.reftableAnnex.remoteData(_self.baseParamsAnnex);
                                    _self.dialogVisibleAnnex = false;
                                    _self.uploadAnnexFile(right);
                                } else {
                                    _self.$message(response.message);
                                }
                            }
                        });
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

        exportFn: function () {
            var _self = this;
            var formValue = this.$refs.queryForm.fm;
            this.$confirm('是否导出数据?', '提示').then(function () {
                yufp.util.exportExcelByTable({
                    fileName: _self.exportFileName,
                    importType: 'service', // page当前页 selected 选中的数据  service 后端数据
                    ref: _self.$refs.reftable,
                    url: backend.riskmService + '/api/mon/relief/apps',
                    method: 'POST',
                    param: {
                        reliefAppNo: formValue.reliefAppNo,
                        cusId: formValue.cusId,
                        cusName: formValue.cusName,
                        billNo: formValue.billNo,
                        approveStatus: formValue.approveStatus,
                        createDateS: formValue.createDateS,
                        createDateE: formValue.createDateE,
                        exportFlag: 'exp'
                    }
                });
            })
        },

        reliefInfoFn: function(reliefDetail){
            var _self = this;
            _self.dialogVisibleDetail = true;
            _self.$nextTick(function () {
                if(reliefDetail == 'reliefDetail') {
                    yufp.router.to("COLLT_MonReliefDetailPageInfo", null, _self.monReliefDetailViewRootId);
                }
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
