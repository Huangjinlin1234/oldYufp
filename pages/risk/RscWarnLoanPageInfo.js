/**
 * @create by chenqm1 on 2018-05-07
 * @description 风险预警台账
 */
define(function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE,STD_ZB_CERT_TYP,RISK_WARNING,BASICFN_RISK_CLASS,RULE_CODE_NAME_TOW_LEVEL');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
              dataUrl: backend.riskmService + '/api/rsc/warn/loans',
              dataUrlcomm: backend.riskmService + '/api/rsc/warn/loan/hist/rule',
              dataUrlHN: '',
              dataUrlCdp: '',
              dataUrlExternal: '',
              baseParams: {},
              hanLinReftableParams: {},
              cdpReftableParams: {},
              externalReftableParams: {},
              queryFields: [
                  {placeholder: '客户号', field: 'cusId', type: 'input'},
                  {placeholder: '客户名称', field: 'cusName', type: 'input'},
                  {placeholder: '证件类型', field: 'certType', type: 'select', dataCode: 'STD_ZB_CERT_TYP'},
                  {placeholder: '证件号码', field: 'certCode', type: 'input'},
                  {placeholder: '规则号', field: 'ruleCode', type: 'input', hidden: true},
                  {placeholder: '当前风险预警原因', field: 'ruleName', type: 'input'},
                  {placeholder: '当前风险预警原因', field: 'warmSour', type: 'input', hidden: true},
                  {placeholder: '当前预警产生日期', field: 'riskDate', type: 'date', editable: false},
                  {placeholder: '客户经理号', field: 'cusManager', type: 'input' },
                  {placeholder: '主管机构', field: 'mainBrId', type: 'input' }
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
                  {label: '客户号', prop: 'cusId', sortable: true, resizable: true},
                  {label: '客户名称', prop: 'cusName', sortable: true, resizable: true},
                  {label: '证件类型', prop: 'certType', sortable: true, resizable: true, dataCode: 'STD_ZB_CERT_TYP'},
                  {label: '证件号码', prop: 'certCode', sortable: true, resizable: true},
                  {label: '合同号', prop: 'contNo', sortable: true, resizable: true},
                  {label: '借据号', prop: 'billNo', sortable: true, resizable: true},
                  {label: '贷款余额', prop: 'loanBalance', sortable: true, resizable: true},
                  {label: '贷款起始日', prop: 'loanStartDate', sortable: true, resizable: true},
                  {label: '贷款到期日', prop: 'loanEndDate', sortable: true, resizable: true},
                  {label: '当前风险预警原因', prop: 'ruleName', sortable: true, resizable: true},
                  {label: '当前预警产生日期', prop: 'riskDate', sortable: true, resizable: true},
                  {label: '客户经理号', prop: 'cusManager', sortable: true, resizable: true},
                  {label: '主管机构', prop: 'mainBrId', sortable: true, resizable: true},

                  /*
                  {label: '风险等级', prop: 'riskLevel', sortable: true, resizable: true, hidden:true, dataCode: 'RISK_WARNING'},
                  {label: '规则号', prop: 'ruleCode', sortable: true, resizable: true, hidden:true},
                  {label: '描述', prop: 'descContent', sortable: true, resizable: true, hidden:true},
                  {label: '任务号', prop: 'taskNo', sortable: true, resizable: true, hidden: true}*/
              ],
              dataUrlwarningInfo: backend.riskmService + '/api/rec/rsc/warnInfo',
              warningInfoParams: {},
              warningInfotableColumns: [
                  {label: '客户号', prop: 'cusId', sortable: true, resizable: true},
                  {label: '客户名称', prop: 'cusName', sortable: true, resizable: true},
                  {label: '证件类型', prop: 'certType', sortable: true, resizable: true, dataCode: 'STD_ZB_CERT_TYP'},
                  {label: '证件号码', prop: 'certCode', sortable: true, resizable: true},
                  {label: '合同号', prop: 'contNo', sortable: true, resizable: true},
                  {label: '借据号', prop: 'billNo', sortable: true, resizable: true},
                  {label: '贷款余额', prop: 'loanBalance', sortable: true, resizable: true},
                  {label: '贷款起始日', prop: 'loanStartDate', sortable: true, resizable: true},
                  {label: '贷款到期日', prop: 'loanEndDate', sortable: true, resizable: true},
                  {label: '当前风险预警原因', prop: 'ruleName', sortable: true, resizable: true},
                  {label: '当前预警产生日期', prop: 'riskDate', sortable: true, resizable: true},
                  {label: '风险等级', prop: 'riskLevel', sortable: true, resizable: true, dataCode: 'RISK_WARNING'},
                  {label: '规则号', prop: 'ruleCode', sortable: true, resizable: true},
                  {label: '描述', prop: 'descContent', sortable: true, resizable: true},
                  {label: '任务号', prop: 'taskNo', sortable: true, resizable: true, hidden: true},
                  { label: '规则名称', prop: 'ruleName', resizable: true, disabled: true},
              ],
            /*warningInfoFields: [{
                columnCount: 2,
                fields: [
                	 { field: 'ruleCode', label: '规则号', disabled: true},
                	 { field: 'descContent', label: '描述', disabled: true},
                     { field: 'riskLevel', label: '风险等级', disabled: true},
                     { field: 'cusId', label: '客户号', disabled: true },
                     { field: 'cusName', label: '客户名称', disabled: true },
                     { field: 'certType', label: '证件类型', disabled: true,dataCode:'STD_ZB_CERT_TYP' },
                     { field: 'certCode', label: '证件号码', disabled: true },
                     { field: 'contNo', label: '合同号', disabled: true },
                     { field: 'billNo', label: '借据号', disabled: true },
                     { field: 'loanBalance', label: '贷款余额', disabled: true },
                     { field: 'loanStartDate', label: '贷款日期', disabled: true },
                     { field: 'loanEndDate', label: '贷款到期日', disabled: true },
                     { field: 'warmSour', label: '当前风险预警来源', disabled: true },
                     { field: 'riskDate', label: '当前预警产生日期', disabled: true },
                ]
              }],*/
              queryNewInfoFields: [{
                  columnCount: 4,
                  fields: [
                      { placeholder: '客户号', field: 'cusId',
                          rules: [{required: true, message: '必填项', trigger: 'blur'}] },
                      { placeholder: '客户名称', field: 'cusName',
                          rules: [{required: true, message: '必填项', trigger: 'blur'}] },
                      { placeholder: '证件类型', field: 'certType', type:'select', dataCode:'STD_ZB_CERT_TYP',
                          rules: [{required: true, message: '必填项', trigger: 'blur'}] },
                      { placeholder: '证件号码', field: 'certCode',
                          rules: [{required: true, message: '必填项', trigger: 'blur'}] },
                      { placeholder: '借据号', field: 'billNo',
                          rules: [{required: true, message: '必填项', trigger: 'blur'}] },
                  ]}
              ],
              dataUrlnewInfo: backend.riskmService + '/api/getrec/curr/rsc/warn',
              newInfotableParams:{},
              newInfotableColumns:[
                  { label: '客户号', prop: 'cusId', disabled: true },
                  { label: '客户名称', prop: 'cusName', disabled: true },
                  { label: '证件类型', prop: 'certType', disabled: true,dataCode:'STD_ZB_CERT_TYP' },
                  { label: '证件号码', prop: 'certCode', disabled: true },
                  { label: '合同号', prop: 'contNo', disabled: true },
                  { label: '借据号', prop: 'billNo', disabled: true },
                  { label: '贷款余额', prop: 'loanBalance', disabled: true },
                  { label: '贷款起始日', prop: 'loanStartDate', disabled: true },
                  { label: '贷款到期日', prop: 'loanEndDate', disabled: true },
                  { label: '当前风险预警原因', prop: 'ruleName', disabled: true },
                  { label: '当前预警产生日期', prop: 'riskDate', disabled: true },
                  { label: '风险等级', prop: 'riskLevel', disabled: true, dataCode: 'RISK_WARNING'},
                  { label: '规则号', prop: 'ruleCode', disabled: true},
                  { label: '描述', prop: 'descContent', disabled: true}
              ],
              /*newInfoFields:[{
                  columnCount: 2,
                  fields: [
                      { field: 'ruleCode', label: '规则号', disabled: true},
                      { field: 'descContent', label: '描述', disabled: true},
                      { field: 'riskLevel', label: '风险等级', disabled: true},
                      { field: 'cusId', label: '客户号', disabled: true },
                      { field: 'cusName', label: '客户名称', disabled: true },
                      { field: 'certType', label: '证件类型', disabled: true,dataCode:'STD_ZB_CERT_TYP' },
                      { field: 'certCode', label: '证件号码', disabled: true },
                      { field: 'contNo', label: '合同号', disabled: true },
                      { field: 'billNo', label: '借据号', disabled: true },
                      { field: 'loanBalance', label: '贷款余额', disabled: true },
                      { field: 'loanStartDate', label: '贷款日期', disabled: true },
                      { field: 'loanEndDate', label: '贷款到期日', disabled: true },
                      { field: 'warmSour', label: '当前风险预警来源', disabled: true },
                      { field: 'riskDate', label: '当前预警产生日期', disabled: true },
                  ]
              }],*/

              //人行征信tab页
              cdpReftableColumns: [
                  {label: '规则编号', prop: 'ruleCode', sortable: true, resizable: true, hidden:true },
                  {label: '规则名称', prop: 'ruleName', sortable: true, resizable: true},
                  {label: '历史值', prop: 'histValue', sortable: true, resizable: true},
                  {label: '当前值', prop: 'currValue', sortable: true, resizable: true}
              ],

              //行内信息tab页
              hanLinReftableColumns: [
                  {label: '规则编号', prop: 'ruleCode', sortable: true, resizable: true, hidden:true },
                  {label: '规则名称', prop: 'ruleName', sortable: true, resizable: true},
                  {label: '历史值', prop: 'histValue', sortable: true, resizable: true},
                  {label: '当前值', prop: 'currValue', sortable: true, resizable: true}
              ],
              //外部数据tab页
              externalReftableColumns: [
                  {label: '规则编号', prop: 'ruleCode', sortable: true, resizable: true, hidden:true },
                  {label: '分类', prop: 'classification', sortable: true, resizable: true, dataCode:'BASICFN_RISK_CLASS'},
                  {label: '规则名称', prop: 'ruleName', sortable: true, resizable: true},
                  {label: '历史值', prop: 'histValue', sortable: true, resizable: true},
                  {label: '当前值', prop: 'currValue', sortable: true, resizable: true}
              ],

              updateButtons: [
                  {
                      label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false,
                      click: function (model) {
                          _self.dialogVisible = false;
                      }
                  }
              ],
              height: yufp.frame.size().height - 103,
              dialogVisible: false,
              exportDialogVisible: false,
              newInfoDialogVisible: false,
              exportFileName: '风险预警台账',
              formDisabled: true,
              viewType: 'DETAIL',
              tabName: 'riskTab',
              viewTitle: yufp.lookup.find('CRUD_TYPE', false),
              expandCollapseName: ['applyBase', 'warningInfoSecond', 'cdpTab', 'hanlinTab', 'externalTab', 'pyInfo', 'prfInfo', 'FICOInfo', 'tengxInfo', 'tdInfo']
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
                  // _self.updateButtons[0].hidden = !editable;
                  //_self.updateButtons[1].hidden = !editable;
                  _self.formDisabled = !editable;
                  _self.dialogVisible = true;
              },
              infoFn: function () {
                  var _self = this;
                  var obj = this.$refs.reftable.selections;
                  if (obj.length != 1) {
                      this.$message({message: '请先选择一条记录', type: 'warning'});
                      return;
                  }
                  this.switchStatus('DETAIL', true);
                  _self.warningInfoParams = {
                      cusId: obj[0].cusId,
                      cusName: obj[0].cusName,
                      certType: obj[0].certType,
                      certCode: obj[0].certCode
                  };
                  _self.cdpReftableParams = {
                      tabType: '02'
                  }
                  _self.hanLinReftableParams = {
                      tabType: '01'
                  }
                  _self.externalReftableParams = {
                      tabType: '03'
                  }

                  var conditions = {
                      cusId: obj[0].cusId,
                      cusName: obj[0].cusName,
                      certType: obj[0].certType,
                      certCode: obj[0].certCode
                  };
                  _self.$nextTick(function () {
                      _self.$refs.warningInfotable.remoteData(_self.warningInfoParams);

                      yufp.service.request({
                          method: "POST",
                          url: backend.riskmService + '/api/rec/hist/rsc/warn',
                          data: conditions,
                          callback: function (code, message, response) {
                              if (response.code == 0) {
                                  _self.$refs.cdpReftable.remoteData(_self.cdpReftableParams);
                                  _self.$refs.hanlinReftable.remoteData(_self.hanLinReftableParams);
                                  _self.$refs.externalReftable.remoteData(_self.externalReftableParams);
                              } else {
                                  _self.$refs.cdpReftable.remoteData(_self.cdpReftableParams);
                                  _self.$refs.hanlinReftable.remoteData(_self.hanLinReftableParams);
                                  _self.$refs.externalReftable.remoteData(_self.externalReftableParams);
                                  _self.$message({message: "处理失败：" + response.message, type: 'warning'});
                              }
                          }
                      });
                  });
              },
              getNewestCredit: function () {
                  var _self = this;
                  var selections = this.$refs.reftable.selections;
                  if (selections.length != 1) {
                      this.$message({message: '请先选择一条记录', type: 'warning'});
                      return;
                  }
                  var condition = {
                      cusId: selections[0].cusId,
                      cusName: selections[0].cusName,
                      certType: selections[0].certType,
                      certCode: selections[0].certCode
                  };
                  yufp.service.request({
                      method: 'POST',
                      url: backend.riskmService + '/api/get/zxrpt/show',
                      data: condition,
                      callback: function (code, message, response) {
                          if (response.code == 0) {
                              var report = response.rows.content;
                              if (report != null && report != "") {
                                  w = window.open('about:blank');
                                  w.document.write(report);
                                  w.document.close();
                              } else {
                                  _self.$message('没有查询到最新征信报告!');
                              }
                          } else {
                              _self.$message({message: '查看最新征信报告失败：' + response.message, type: 'warning'});
                          }
                      }
                  });
              },
              getHistoryCredit: function () {
                  var _self = this;
                  var selections = this.$refs.reftable.selections;
                  if (selections.length != 1) {
                      this.$message({message: '请先选择一条记录', type: 'warning'});
                      return;
                  }
                  var condition = {
                      cusId: selections[0].cusId,
                      cusName: selections[0].cusName,
                      certType: selections[0].certType,
                      certCode: selections[0].certCode
                  };
                  yufp.service.request({
                      method: 'POST',
                      url: backend.riskmService + '/api/get/histzxrpt/show',
                      data: condition,
                      callback: function (code, message, response) {
                          if (response.code == 0) {
                              var report = response.rows.content;
                              if (report != "" && report != null) {
                                  w = window.open('about:blank');
                                  w.document.write(report);
                                  w.document.close();
                              } else {
                                  _self.$message('没有查询到征信报告!');
                              }
                          } else {
                              _self.$message({message: '查看历史征信报告失败：' + response.message, type: 'warning'});
                          }
                      }
                  });
              },
              exportFn: function () {
                  var _self = this;
                  var obj = _self.$refs.form.fm;
                  _self.$confirm('是否导出数据?', '提示').then(function () {
                      yufp.util.exportExcelByTable({
                          fileName: _self.exportFileName,
                          importType: 'service',
                          ref: _self.$refs.reftable,
                          url: backend.riskmService + '/api/rsc/warn/loans',
                          method: 'POST',
                          param: {
                              cusId: obj.cusId,
                              cusName: obj.cusName,
                              certType: obj.certType,
                              certCode: obj.certCode,
                              ruleCode: obj.ruleCode,
                              ruleName: obj.ruleName,
                              warmSour: obj.warmSour,
                              riskDate: obj.riskDate,
                              cusManager: obj.cusManager,
                              mainBrId: obj.mainBrId,
                              exportFlag: 'exp'
                          }
                      });
                  });
              },
              realtimequeryFn: function () {
                  var _self = this;
                  _self.newInfoDialogVisible = true;
                  var obj = _self.$refs.reftable.selections;
                  if (obj.length == 1) {
                      _self.$nextTick(function () {
                          _self.$refs.newInfoForm.resetFn();
                          _self.$refs.newInfotable.data = [];
                          yufp.extend(_self.$refs.newInfoForm.formModel, obj[0])
                      });
                  }
              },
              searchFn: function () {
                  var _self = this;
                  var fm = _self.$refs.newInfoForm.formModel;
                  var validate = false;
                  _self.$refs.newInfoForm.validate(function (valid) {
                      validate = valid;
                  });
                  if (!validate) return;
                  _self.newInfotableParams = {
                      cusId: fm.cusId,
                      cusName: fm.cusName,
                      certType: fm.certType,
                      certCode: fm.certCode,
                      billNo: fm.billNo
                  }
                  yufp.service.request({
                      method: 'POST',
                      url:  backend.riskmService + '/api/rec/curr/rsc/warn',
                      data: fm,
                      callback: function (code, message, response) {
                          if (response.code == 0) {
                              _self.$nextTick(function () {
                                  _self.$refs.newInfotable.remoteData(_self.newInfotableParams);
                              });
                          } else {
                              _self.$message({message: '操作失败：' + response.message, type: 'warning'});
                          }
                      }
                  });
              },
              resetFn: function () {
                  var _self = this;
                  _self.$refs.newInfoForm.resetFn();
              },
              closeFn: function () {
                  var _self = this;
                  _self.$refs.newInfoForm.resetFn();
                  _self.$refs.newInfotable.data = [];
                  _self.newInfoDialogVisible = false;
              },
              rowClass: function (row,index) {

                  if (row.currValue != row.histValue) {
                      // return {"background-color":"#fffbc0"}
                      return {"background-color":"#F7ECEC"}
                  }
              }
          },

      });
    };
    // 消息处理
    exports.onmessage = function (type, message) {

    };
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {

    }

});
