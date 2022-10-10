/**
 * @create by ligm on 2019-08-27
 * @description 委外任务分配主表
 */
define(['./custom/widgets/js/ColltTaskInfoToOutsSelector.js'
],function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE,STD_HANDLE_TYPE,STD_RISK_LEVEL,COLLT_OUTS_TASK_STS,STD_COLLT_WAY,IDENT_WAY,STD_YES_NO,TIME_UNIT');
      yufp.custom.vue({
        components: {
          FileUpload: window.VueUploadComponent
        },
        el: cite.el,
        data: function () {
          var _self = this;
          return {
            dataUrl: backend.riskmService + '/api/outs/task/distr/mains',
            baseParams: {
              isPassDistr: 'Y'
            },

            queryFields: [
              { placeholder: '分配批次号', field: 'colltBatchNo', type: 'input', hidden: true },
              { placeholder: '手别', field: 'outsHdleType', type: 'select', dataCode:'STD_HANDLE_TYPE' },
              { placeholder: '分配日期', field: 'distrTime', type: 'date' ,editable:false },
              { placeholder: '操作员', field: 'opUserCode', type: 'input', hidden: true },
              { placeholder: '操作员所属机构', field: 'opOrgCode', type: 'input', hidden: true }
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
              { label: '分配批次号', prop: 'colltBatchNo', sortable: true, resizable: true },
              { label: '手别', prop: 'outsHdleType', sortable: true, resizable: true, dataCode:'STD_HANDLE_TYPE' },
              { label: '分配金额', prop: 'distrLmt', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                  return yufp.util.moneyFormatter(cellValue, 2);
                } },
              { label: '分配户数', prop: 'distrCustNum', sortable: true, resizable: true },
              { label: '分配金额占比', prop: 'distrLmtRatio', sortable: true, resizable: true,
                formatter: function (row, column, cellValue) {
                  var num = parseFloat(cellValue);
                  if (typeof (num) == 'undefined' || num == null || isNaN(num))
                    num = 0;
                  var rateY = yufp.util.toPercent((parseFloat(num) * 100).toFixed(6));
                  return rateY;
                } },
              { label: '分配户数占比', prop: 'distrCustsRatio', sortable: true, resizable: true },
              { label: '分配时间', prop: 'distrTime', sortable: true, resizable: true },
              { label: '操作员', prop: 'opUserCode', sortable: true, resizable: true, hidden:true},
              { label: '操作员', prop: 'opUserName', sortable: true, resizable: true },
              { label: '操作员所属机构', prop: 'opOrgCode', sortable: true, resizable: true , hidden:true},
              { label: '操作员所属机构', prop: 'opOrgName', sortable: true, resizable: true },
            ],
            /**分案机构版本号展示*/
            dataRateUrl: backend.flowService + "/api/distri/rate/orgver001",
            ratebaseParams: {
              cooprOrgType:'001'
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
              {
                label: '一手案件占比', prop: 'primCaseRatio', sortable: true, resizable: true,
                formatter: function (row, column, cellValue) {
                  var num = parseFloat(cellValue);
                  if (typeof (num) == 'undefined' || num == null || isNaN(num))
                    num = 0;
                  var rateY = yufp.util.toPercent((parseFloat(num) * 100).toFixed(6));
                  return rateY;
                }
              },
              {
                label: '二手案件占比', prop: 'secdCaseRatio', sortable: true, resizable: true,
                formatter: function (row, column, cellValue) {
                  var num = parseFloat(cellValue);
                  if (typeof (num) == 'undefined' || num == null || isNaN(num))
                    num = 0;
                  var rateY = yufp.util.toPercent((parseFloat(num) * 100).toFixed(6));
                  return rateY;
                }
              },
              {
                label: '三手案件占比', prop: 'thdCaseRatio', sortable: true, resizable: true,
                formatter: function (row, column, cellValue) {
                  var num = parseFloat(cellValue);
                  if (typeof (num) == 'undefined' || num == null || isNaN(num))
                    num = 0;
                  var rateY = yufp.util.toPercent((parseFloat(num) * 100).toFixed(6));
                  return rateY;
                }
              },
              {
                label: '长账龄案件占比', prop: 'longAgeCaseRatio', sortable: true, resizable: true,
                formatter: function (row, column, cellValue) {
                  var num = parseFloat(cellValue);
                  if (typeof (num) == 'undefined' || num == null || isNaN(num))
                    num = 0;
                  var rateY = yufp.util.toPercent((parseFloat(num) * 100).toFixed(6));
                  return rateY;
                }
              }
            ],

            updateFields: [{
              columnCount: 3,
              fields: [
                	 { field: 'colltBatchNo', label: '分配批次号'},
                	 { field: 'outsHdleType', label: '手别'},
                	 { field: 'distrLmt', label: '分配金额'},
                	 { field: 'distrCustNum', label: '分配户数'},
                	 { field: 'distrLmtRatio', label: '分配金额占比'},
                	 { field: 'distrCustsRatio', label: '分配户数占比'},
                	 { field: 'distrTime', label: '分配时间'},
                	 { field: 'opUserCode', label: '操作员'},
                	 { field: 'opOrgCode', label: '操作员所属机构'},
                	 { field: 'createUser', label: '创建人'},
                	 { field: 'createTime', label: '创建时间'},
                	 { field: 'lastChgUsr', label: '最新修改人'},
                	 { field: 'lastChgTime', label: '最后修改时间'}
              ]
            }],

            updateButtons: [
              { label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                  _self.dialogVisible = false;
                } },
              { label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                  var validate = false;
                  _self.$refs.reform.validate(function (valid) {
                    validate = valid;
                  });
                  if (!validate) {
                    return;
                  }

                  var rMethod = '';
                  if (_self.viewType == "EDIT") {
                    rMethod = 'PUT';
                  } else if (_self.viewType == "ADD") {
                    rMethod = 'POST';
                  }

                  yufp.service.request({
                    method: rMethod,
                    url: '/api/outs/task/distr/main',
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

            fullscreenLoading: false,
            //分配查看页面
            baseParamsFp: { },
            dataUrlFp: backend.riskmService + '/api/collt/task/distr/by/Condition',
            queryFieldsFp: [
              { placeholder: '分配批次号', field: 'colltBatchNo', type: 'input', hidden: true  },
              { placeholder: '委外机构编号', field: 'outsOrgCode', type: 'input' },
              { placeholder: '委外机构名称', field: 'outsOrgName', type: 'input' },
              { placeholder: '催收方式', field: 'colltWay', type: 'input', hidden: true  },
              { placeholder: '委外经手类型', field: 'outsHdleType', type: 'input', hidden: true  },
              { placeholder: '分配时间', field: 'distrTime', type: 'input', type: 'date' ,editable:false  }
            ],

            queryButtonsFp: [
              { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                  if (valid) {
                    model.colltBatchNo = _self.baseParamsFp.colltBatchNo;
                    model.outsHdleType = _self.baseParamsFp.outsHdleType;
                    _self.$refs.reftableFp.remoteData(model);
                  }
                } },
              { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
            ],

            tableColumnsFp: [
              // 用于导出受理页面列表数据
              { label: '催收任务编号', prop: 'colltTaskNo', sortable: true, resizable: true, hidden: true },
              { label: '分配批次号', prop: 'colltBatchNo', sortable: true, resizable: true },
              { label: '委外机构编号', prop: 'outsOrgCode', sortable: true, resizable: true },
              { label: '委外机构名称', prop: 'outsOrgName', sortable: true, resizable: true },
              { label: '委外经手类型', prop: 'outsHdleType', sortable: true, resizable: true, hidden: true, dataCode: 'STD_HANDLE_TYPE' },

              { label: '分配金额', prop: 'distrLmt', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                  return yufp.util.moneyFormatter(cellValue, 2);
                }   },
              { label: '分配任务数', prop: 'distrTaskNum', sortable: true, resizable: true},
              { label: '分配金额占比', prop: 'lmtRadioInHandType', sortable: true, resizable: true,
                formatter: function (row, column, cellValue) {
                  var num = parseFloat(cellValue);
                  if (typeof (num) == 'undefined' || num == null || isNaN(num))
                    num = 0;
                  var rateY = yufp.util.toPercent((parseFloat(num) * 100).toFixed(2));
                  return rateY;
                } },
              { label: '分配任务数占比', prop: 'distrTasksRatio', sortable: true, resizable: true,
                formatter: function (row, column, cellValue) {
                  var num = parseFloat(cellValue);
                  if (typeof (num) == 'undefined' || num == null || isNaN(num))
                    num = 0;
                  var rateY = yufp.util.toPercent((parseFloat(num) * 100).toFixed(6));
                  return rateY;
                } },
              { label: '分配时间', prop: 'distrTime', sortable: true, resizable: true },

              /** 用于导出受理页面列表数据  start  */
              { label: '客户编号', prop: 'cusId', sortable: true, resizable: true, hidden: true  },
              { label: '客户名称', prop: 'cusName', sortable: true, resizable: true, hidden: true  },
              { label: '借据编号', prop: 'loanNo', sortable: true, resizable: true, hidden: true  },
              { label: '逾期天数', prop: 'overDays', sortable: true, resizable: true, hidden: true  },
              { label: '逾期金额', prop: 'overLmt', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                  return yufp.util.moneyFormatter(cellValue, 2);
                }, hidden: true   },
              { label: '逾期期数', prop: 'overNper', sortable: true, resizable: true, hidden: true  },
              { label: '风险等级', prop: 'riskLevel', sortable: true, resizable: true, dataCode:'STD_RISK_LEVEL', hidden: true  },
              { label: '风险类型', prop: 'riskType', sortable: true, resizable: true, hidden: true  },
              { label: '催收方式', prop: 'colltWay', sortable: true, resizable: true, dataCode:'STD_COLLT_WAY', hidden: true },
              { label: '识别方式', prop: 'identWay', sortable: true, resizable: true, dataCode:'IDENT_WAY', hidden: true },
              { label: '任务状态', prop: 'taskSts', sortable: true, resizable: true, dataCode:'COLLT_OUTS_TASK_STS', hidden: true },
              { label: '入催时间', prop: 'createTime', sortable: true, resizable: true, hidden: true },
              /** 用于导出受理页面列表数据  end  */
              { label: '操作员', prop: 'opUserName', sortable: true, resizable: true },
              { label: '操作员所属机构', prop: 'opOrgName', sortable: true, resizable: true },



            ],

            rebackMainButtons:[
              {
                label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                  _self.dialogVisibleFp = false;
                }
              }
            ],

            /** -------------------------------------------------- 受理页面 ------------------------------------------------- start */
            baseParamsSl: { },
            // dataUrlSl: backend.riskmService + '/api/qry/collt/task/infos',
            dataUrlSl: backend.riskmService + '/api/collt/task/outs/infos',

            queryFieldsSl: [
              { placeholder: '催收任务编号', field: 'colltTaskNo', type: 'input'},
              { placeholder: '借据编号', field: 'loanNo', type: 'input'},
              { placeholder: '证件号', field: 'certCode', type: 'input'},
              { placeholder: '客户编号', field: 'cusId', type: 'input' },
              { placeholder: '客户名称', field: 'cusName', type: 'input' },
              { placeholder: '风险等级', field: 'riskLevel', type: 'select', dataCode:'STD_RISK_LEVEL' },
              { placeholder: '任务状态', field: 'taskSts', type: 'select', dataCode:'COLLT_OUTS_TASK_STS' }
            ],

            queryButtonsSl: [
              { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                  if (valid) {
                    _self.$refs.reftableSl.remoteData(model);
                  }
                } },
              { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
            ],

            tableColumnsSl: [
              { label: '催收任务编号', prop: 'colltTaskNo', sortable: true, resizable: true },
              { label: '分配批次号', prop: 'colltBatchNo', sortable: true, resizable: true },
              { label: '委外机构编号', prop: 'outsOrgCode', sortable: true, resizable: true },
              { label: '委外机构名称', prop: 'outsOrgName', sortable: true, resizable: true },
              { label: '委外经手类型', prop: 'outsHdleType', sortable: true, resizable: true, hidden: true },
              { label: '客户编号', prop: 'cusId', sortable: true, resizable: true },
              { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
              { label: '证件号', prop: 'certCode', sortable: true, resizable: true},
              { label: '手机号码', prop: 'phoneNum', sortable: true, resizable: true, hidden: true },
              { label: '借据编号', prop: 'loanNo', sortable: true, resizable: true },
              { label: '逾期天数', prop: 'overDays', sortable: true, resizable: true },
              { label: '逾期金额', prop: 'overLmt', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                  return yufp.util.moneyFormatter(cellValue, 2);
                }  },
              { label: '逾期期数', prop: 'overNper', sortable: true, resizable: true },
              { label: '风险等级', prop: 'riskLevel', sortable: true, resizable: true, dataCode:'STD_RISK_LEVEL' },
              { label: '风险类型', prop: 'riskType', sortable: true, resizable: true },
              { label: '催收方式', prop: 'colltWay', sortable: true, resizable: true, dataCode:'STD_COLLT_WAY' },
              { label: '识别方式', prop: 'identWay', sortable: true, resizable: true, dataCode:'IDENT_WAY' },
              { label: '任务状态', prop: 'taskSts', sortable: true, resizable: true, dataCode:'COLLT_OUTS_TASK_STS' },
              { label: '入催时间', prop: 'createTime', sortable: true, resizable: true },
              { label: '操作员', prop: 'opUserName', sortable: true, resizable: true },
              { label: '操作员所属机构', prop: 'opOrgName', sortable: true, resizable: true },

              { label: '催收余额', prop: 'colltBalance', sortable: true, resizable: true, hidden:true }
            ],

            rebackFpButtons:[
              {
                label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                  _self.dialogVisibleSl = false;
                }
              }
            ],

            /** 客户基本信息 */
            cusBaseInfoFields: [{
              columnCount: 2,
              fields: [
                {field: 'outsOrgCode', label: '委外机构编号', disabled: true, hidden: false},
                {field: 'outsOrgName', label: '委外机构名称', disabled: true, hidden: false},
                {field: 'cusId', label: '客户编号', disabled: true, hidden: false},
                {field: 'cusName', label: '客户名称', disabled: true, hidden: false},
                {field: 'certType',label: '证件类型', disabled: true, hidden: false,type: 'select',dataCode: 'STD_ZB_CERT_TYP'},
                {field: 'certCode', label: '证件号码', disabled: true, hidden: false},
                {field: 'indivSex', label: '性别', disabled: true, hidden: false,type: 'select', dataCode: 'STD_ZX_SEX'},
                {field: 'phoneNum', label: '手机号码', disabled: true, hidden: false}
              ]
            }],

            /** 催收借据信息 ------------- start  */
            collReceiptInfoFields: [{
              columnCount: 3,
              fields: [
                {field: 'loanNo', label: '借据编号', disabled: true, hidden: false},
                {field: 'loanStartDate', label: '借据起始日', disabled: true, hidden: false},
                {field: 'loanEndDate', label: '借据到期日', disabled: true, hidden: false},
                {field: 'loanAmount', label: '借据金额', disabled: true, hidden: false, formatter: function (row, column, cellValue) {
                    return yufp.util.moneyFormatter(cellValue, 2);
                  }},
                {field: 'unpdPrinBal', label: '逾期本金', disabled: true, hidden: false},
                {field: 'overDays', label: '逾期天数', disabled: true, hidden: false},
                {field: 'accountStatus',label: '借据状态',disabled: true,hidden: false,type: 'select',dataCode: 'STD_ZB_ACC_STATUS'},
                {field: 'contNo', label: '合同编号', disabled: true, hidden: false},
                {field: 'channelCode', label: '渠道名称', disabled: true, hidden: false, type: 'select', dataCode: 'APPLY_CHANNEL_TYPE'},
                {field: 'prdName', label: '产品名称', disabled: true, hidden: false},
                {field: '', label: '逾期利息金额', disabled: true, hidden: true}
              ]
            }],
            //催收借据详情查看按钮
            collReceiptButtons: [
              {
                label: '查看', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                  _self.dialogAccLaonVisible = true;
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
                }
              }
            ],
            accLaonFields: [
              {
                columnCount: 3,
                fields:[
                  { field: 'billNo', label: '借据号'},
                  { field: 'cusId', label: '客户号'},
                  { field: 'cusName', label: '客户姓名'},
                  { field: 'prdCode', label: '产品编号'},
                  { field: 'prdName', label: '产品名称'},
                  { field: 'channelCode', label: '渠道', type: 'select', dataCode: 'APPLY_CHANNEL_TYPE' },
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
                  { field: 'intAccr', label: '应收利息（元）', hidden: true},
                  { field: 'overdueDays', label: '逾期天数'},
                  { field: 'unpdPrinBal', label: '逾期本金', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                  //逾期利息 delay_int_cumu
                  { field: 'unpdIntArrPrn', label: '罚息', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                  /* 逾期应收 = 逾期本金 + 逾期利息 + 罚息（元）*/
                  { field: 'overdueReceInt', label: '逾期应收', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                  { field: 'irAdjustMode', label: '利率调整方式', dataCode: 'STD_ZB_IR_ADJ_MODE', type: 'select'},
                  { field: 'assureMeansMain', label: '主担保方式', dataCode: 'STD_ZB_ASSURE_MEANS', type: 'select'},
                  { field: 'repaymentMode', label: '还款方式', dataCode: 'STD_PRD_REPAY_MODE', type: 'select'},
                  { field: 'fine2IntAccr', label: '应收利息罚息', hidden: true},
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
            ],/** 催收借据信息 -------------  end  */

            // 催收历史信息
            dataUrlhisColl: backend.riskmService + "/api/collt/task/rcds/taskno",
            hisCollParams: {},
            hisCollColumns: [ // 催收任务记录表 （collt_task_rcd）
              {label: '催收任务编号', prop: 'colltTaskNo', sortable: true, resizable: true},
              {label: '催收方式', prop: 'colltWay', sortable: true, resizable: true, dataCode: 'STD_COLLT_WAY'},
              {label: '催收时间', prop: 'colltTime', sortable: true, resizable: true},
              {label: '催收代码', prop: 'colltCode', sortable: true, resizable: true},
              {label: '还款金额', prop: 'repayLmt', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                  return yufp.util.moneyFormatter(cellValue, 2);
                }},
              {label: '还款日期', prop: 'repayDate', sortable: true, resizable: true},
              {label: '催收结果备注', prop: 'colltRestRemark', sortable: true, resizable: true},
              {label: '登记员', prop: 'inputUserCode', sortable: true, resizable: true, hidden: true},
              {label: '登记员', prop: 'inputUserName', sortable: true, resizable: true}
            ],

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

            //委外催收登记信息
            settleCollInfoFields: [
              {
                columnCount: 3,
                fields: [
                  {field: 'colltTaskNo', label: '催收任务编号', disabled: true, hidden: true},
                  {field: 'colltWay', label: '催收方式', disabled: true, hidden: true},
                  {field: 'colltBatchNo', label: '分配批次号', disabled: true, hidden: true},
                  {field: 'outsOrgCode', label: '分配机构编号', disabled: true, hidden: true},
                  {field: 'outsOrgName', label: '分配机构名称', disabled: true, hidden: true},
                  {field: 'outsHdleType', label: '委外经手类型', disabled: true, hidden: true},
                  {field: 'inputUserCode', label: '登记员', disabled: true, hidden: true},
                  {field: 'inputDate', label: '登记日期', disabled: true, hidden: false, rules: [ { required: true, message: '必输项', trigger: 'blur' }]},
                  {field: 'colltCode', label: '催收代码', disabled: false, hidden: false, rules: [ { required: true, message: '必输项', trigger: 'blur' }]},
                  {field: 'colltRecRate', label: '催收回款率(%)', disabled: true, hidden: false,type: 'num', digit: 2, formatter: yufp.util.moneyFormatter, rules: [ { required: true, message: '必输项', trigger: 'blur' }]}
                ]
              },
              {
                columnCount: 1,
                fields: [
                  {field: 'colltRestRemark', label: '催收结果备注', type: 'textarea', rows: 3, rules: [ { required: true, message: '必输项', trigger: 'blur' }]}
                ]
              }
            ],
            settleCollInfoButtons: [
              {
                label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                  _self.$confirm('请确认结案信息是否正确填写?确认保存后，信息不可修改。', '提示', {type: 'warning'}).then(function () {
                      var validate = false;
                      _self.$refs.settleCollInfo.validate(function (valid) {
                          validate = valid;
                      });
                      if (!validate) {
                          return;
                      }
                      /*var rMethod = '';
                          if (_self.viewType == "EDIT") {
                              rMethod = 'PUT';
                          } else if (_self.viewType == "ADD") {
                              rMethod = 'POST';
                      }*/
                      yufp.service.request({
                          method: 'POST',
                          url: backend.riskmService + "/api/collt/task/rcd",
                          data: model,
                          callback: function (code, message, response) {
                              if (code == 0 && response.rows > 0) {
                                  _self.$message('操作成功！');
                                  _self.dialogTrdVisible = false;
                                  _self.$refs.reftableSl.remoteData();
                              } else {
                                  _self.$message('操作失败！');
                              }
                          }
                      });
                  })
                }
              },
              {
                label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                  _self.dialogTrdVisible = false;
                }
              }
            ],
            /** 人工流转   start  */
            dataUrlflow: backend.riskmService + "/api/collt/task/flow/apps",
            flowParams: {},
            flowColumns: [
              {label: '催收任务编号', prop: 'colltTaskNo', sortable: true, resizable: true},
              {label: '流转催收任务类型', prop: 'flowColltTaskType', sortable: true, resizable: true, dataCode:'STD_COLLT_WAY'},
              {label: '流转原因', prop: 'flowReson', sortable: true, resizable: true},
              {label: '操作员', prop: 'createUser', sortable: true, resizable: true, hidden: true},
              {label: '操作员', prop: 'createUserName', sortable: true, resizable: true},
              {label: '操作时间', prop: 'createTime', sortable: true, resizable: true},
              {label: '操作员所属机构', prop: 'createUserOrg', sortable: true, resizable: true, hidden: true},
              {label: '操作员所属机构', prop: 'createUserOrgName', sortable: true, resizable: true }
            ],
            flowInfoFields: [
              {
                columnCount: 3,
                fields: [
                  {field: 'flowColltTaskType', label: '流转催收任务类型', disabled: false,type:'select',dataCode:'STD_COLLT_WAY',
                    datacodeFilter: function (options) {
                      this.typeOptions = [];
                      for (var i = 0; i < options.length; i++) {
                        if (options[i].key == '02' || options[i].key == '04' || options[i].key == '05') {
                          this.typeOptions.push(options[i]);
                        }
                      }
                    },rules: [{ required: true, message: '必输项', trigger: 'blur' }]
                  },
                  {field: 'colltTaskNo', label: '催收任务编号', disabled: true, hidden: true},
                  {field: 'taskSts', label: '原催收任务状态',type:'select', dataCode:'COLLT_TASK_STATUS' ,hidden:true},
                  {field: 'basicColltTaskType', label: '原催收任务类型', disabled: true, hidden: true},
                  {field: 'createUser', label: '操作员', disabled: true, hidden: true},
                  {field: 'createTime', label: '操作时间', disabled: true, hidden: true},
                  {field: 'createUserOrg', label: '操作员所属机构', disabled: true, hidden: true}
                ]
              },
              {
                columnCount: 1,
                fields: [
                  {field: 'flowReson', label: '流转原因', type: 'textarea', rows: 3, rules: [{ required: true, message: '必输项', trigger: 'blur' }]}
                ]
              }
            ],
            flowInfoButtons: [
              {
                label: '提交', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                  _self.$confirm('请确认流转信息是否正确填写?', '提示', {type: 'warning'}).then(function () {
                    var validate = false;
                    _self.$refs.flowInfo.validate(function (valid) {
                      validate = valid;
                    });
                    if (!validate) {
                      return;
                    }
                    var obj = _self.$refs.reftableSl.selections[0];
                    model.colltTaskNo = obj.colltTaskNo;
                    model.taskSts = obj.taskSts;
                    model.basicColltTaskType = obj.colltWay;
                    yufp.service.request({
                      method: 'POST',
                      url: backend.flowService + "/api/outs/collt/task/flow/app",
                      data: model,
                      callback: function (code, message, response) {
                        if (code == 0 && response.code == 0) {
                          _self.$message(response.message);
                        } else {
                          _self.$message('提交失败:'+ response.message);
                        }
                        _self.$refs.reftableSl.remoteData();
                        _self.dialogTrdVisible = false;
                      }
                    });
                  })
                }
              },
              {
                label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                  _self.dialogTrdVisible = false;
                }
              }
            ],/** 人工流转 end */

            /* *****  延期信息 ********************* start ***/
            delayParams: {},
            dataUrlDelay: backend.riskmService + '/api/collt/delay/case/records',
            delayColumns: [
              { label: '催收任务编号', prop: 'colltTaskNo', sortable: true, resizable: true },
              { label: '分配批次号', prop: 'colltBatchNo', sortable: true, resizable: true },
              { label: '委外机构编号', prop: 'outsOrgCode', sortable: true, resizable: true },
              { label: '委外机构名称', prop: 'outsOrgName', sortable: true, resizable: true },
              { label: '客户编号', prop: 'cusId', sortable: true, resizable: true },
              { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
              { label: '借据编号', prop: 'loanNo', sortable: true, resizable: true },
              { label: '延长时间', prop: 'delayTime', sortable: true, resizable: true },
              { label: '延长时间单位', prop: 'delayTimeUnit', sortable: true, resizable: true, dataCode: 'TIME_UNIT'},
              { label: '申请时间', prop: 'createTime', sortable: true, resizable: true},
              { label: '操作员', prop: 'opUserName', sortable: true, resizable: true },
              { label: '操作员所属机构', prop: 'opOrgName', sortable: true, resizable: true }
            ],
            /* *****  延期信息 ********************* start ***/


            /** 受理页面 -- 返回按钮 */
            rebackTrdButtons: [
              {
                label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                  _self.dialogTrdVisible = false;
                }
              }
            ],

            /** 延案页面 -- 返回按钮 */
            rebackForthButtons: [
              {
                label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                  _self.delayAppDialogVisible = false;
                  _self.$refs.reftableSl.remoteData();
                }
              }
            ],


            /** ----------------------------- 导入催收结果 ------------------------------------------------ start */
            dataUrlColltRes: backend.riskmService + "/api/collt/res/records",
            uploadUrl: backend.riskmService + "/api/collt/res/record/temp/upload",
            colltResParams: {
              colltWay: '03'
            },
            colltResColumns: [ //collt_res_record（催收结果记录）
              {label: '记录流水号', prop: 'recordSerno', sortable: true, resizable: true, hidden:true},
              {label: '催收任务编号', prop: 'colltTaskNo', sortable: true, resizable: true},
              {label: '客户编号', prop: 'cusId', sortable: true, resizable: true},
              {label: '客户名称', prop: 'cusName', sortable: true, resizable: true},
              {label: '借据编号', prop: 'loanNo', sortable: true, resizable: true},
              {label: '操作员', prop: 'opUserCode', sortable: true, resizable: true},
              {label: '操作员所属机构', prop: 'opOrgCode', sortable: true, resizable: true},
              {label: '还款金额', prop: 'repayLmt', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                  return yufp.util.moneyFormatter(cellValue, 2);
                }},
              {label: '还款日期', prop: 'repayDate', sortable: true, resizable: true},
              // {label: '任务状态', prop: 'taskSts', sortable: true, resizable: true, dataCode: 'COLLT_OUTS_TASK_STS'},
              {label: '催收结果备注', prop: 'colltResRemark', sortable: true, resizable: true},
              {label: '是否有效', prop: 'isValid', sortable: true, resizable: true, dataCode: 'STD_YES_NO', hidden:true}
            ],
            /**导入催收结果--单笔新增 start*/
            singleFields: [
              {
                columnCount: 2,
                fields: [
                  {field: 'colltTaskNo',label: '催收任务编号',type: 'custom',is: 'div-colltTaskInfoToOuts-selector', params:{colltWay: ''},
                    clickFn:function(value,model,args){
                      _self.$refs.singleInfo.switch('colltTaskNo','params',{colltWay : '03', colltBatchNo: _self.baseParamsFp.colltBatchNo,
                        outsHdleType: _self.baseParamsFp.outsHdleType, outsOrgCode: _self.baseParamsSl.outsOrgCode});
                      _self.$refs.singleInfo.rebuildFn();
                    },
                    selectFn: function (val, formModel, arguments) {
                      formModel.colltBatchNo = arguments[1].colltBatchNo;
                      formModel.outsOrgCode = arguments[1].outsOrgCode;
                      formModel.outsOrgName = arguments[1].outsOrgName;
                      formModel.outsHdleType = arguments[1].outsHdleType;
                      formModel.cusId = arguments[1].cusId;
                      formModel.cusName = arguments[1].cusName;
                      formModel.loanNo = arguments[1].loanNo;
                      formModel.opUserCode = arguments[1].opUserCode;
                      formModel.opOrgCode = arguments[1].opOrgCode;
                    },
                    rules: [{ required: true, message: '必输项', trigger: 'blur' }]
                  },
                  {field: 'cusId', label: '客户编号', disabled: true, hidden: false, rules: [{ required: true, message: '必输项', trigger: 'blur' }] },
                  {field: 'cusName', label: '客户名称', disabled: true, hidden: false, rules: [{ required: true, message: '必输项', trigger: 'blur' }] },
                  {field: 'loanNo', label: '借据编号', disabled: true, hidden: false, rules: [{ required: true, message: '必输项', trigger: 'blur' }] },
                  {field: 'opUserCode', label: '操作员', disabled: true, hidden: false, rules: [{ required: true, message: '必输项', trigger: 'blur' }] },
                  {field: 'opOrgCode', label: '操作员所属机构', disabled: true, hidden: false, rules: [{ required: true, message: '必输项', trigger: 'blur' }] },
                  {field: 'repayLmt', label: '还款金额', disabled: false, hidden: false, rules: [{ required: true, message: '必输项', trigger: 'blur' },
                      { validator: yufp.validator.gZero,message: '必须填写数字', trigger: 'blur'} ]},
                  {field: 'repayDate', label: '还款日期', editable: false, type:'date', rules: [{ required: true, message: '必输项', trigger: 'blur', type:'date' }]},
                  // {field: 'taskSts', label: '任务状态', disabled: false, hidden: false, type: 'select', dataCode: 'COLLT_OUTS_TASK_STS',
                  //   rules: [{ required: true, message: '必输项', trigger: 'blur' }],
                  //   datacodeFilter: function (options) {
                  //     this.typeOptions = [];
                  //     for (var i = 0; i < options.length; i++) {
                  //       if (options[i].key == '03') {
                  //         this.typeOptions.push(options[i]);
                  //       }
                  //     }
                  //   }
                  // },
                  {field: 'isValid', label: '是否有效', disabled: false, type: 'select', dataCode: 'STD_YES_NO', hidden: true},
                  {field: 'colltBatchNo', label: '分配批次', disabled: false,  hidden: true},
                  {field: 'outsOrgCode', label: '委外机构编号', disabled: false,  hidden: true},
                  {field: 'outsOrgName', label: '委外机构名称', disabled: false,  hidden: true},
                  {field: 'outsHdleType', label: '委外经手类型', disabled: false,  hidden: true}
                ]
              },
              {
                columnCount: 1,
                fields: [
                  {field: 'colltResRemark', label: '催收结果备注', type: 'textarea', rows: 3, rules: [{ required: true, message: '必输项', trigger: 'blur' }] }
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
                  /*var rMethod = '';
                  if (_self.viewType == "EDIT") {
                      rMethod = 'PUT';
                  } else if (_self.viewType == "ADD") {
                      rMethod = 'POST';
                  }*/
                  _self.$confirm('请确认数据准确无误？点击确定，继续保存操作。', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true,
                    callback: function (action) {
                      if (action === 'confirm') {
                        // 催收方式为"委外催收"
                        model.colltWay = '03';
                        yufp.service.request({
                          method: 'POST',
                          url: backend.riskmService + '/api/collt/res/record',
                          data: model,
                          callback: function (code, message, response) {
                            if (code == 0 && response.code == 0) {
                              _self.$refs.collRsTable.remoteData();
                              _self.$message('操作成功！');
                              _self.$refs.singleInfo.resetFields();
                              _self.dialogSingleVisible = false;
                            } else {
                              _self.$message('操作失败:' + response.message);
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
            ],/**单笔新增 end*/

            closeImportButtons:[
              {
                label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                  _self.$refs.reftableSl.remoteData();
                  _self.dialogImportVisible = false;
                }
              }
            ],

            dataUrlcollRsTemp: backend.riskmService + "/api/collt/res/record/temp/infos",
            collRsTempParams: {},
            collRsTempColumns:[
              {label: '记录流水号', prop: 'recordSerno', sortable: true, resizable: true, hidden:true},
              {label: '催收任务编号', prop: 'colltTaskNo', sortable: true, resizable: true},
              {label: '客户编号', prop: 'cusId', sortable: true, resizable: true},
              {label: '客户名称', prop: 'cusName', sortable: true, resizable: true},
              {label: '借据编号', prop: 'loanNo', sortable: true, resizable: true},
              {label: '还款金额', prop: 'repayLmt', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                  return yufp.util.moneyFormatter(cellValue, 2);
                }},
              {label: '还款日期', prop: 'repayDate', sortable: true, resizable: true},
              // {label: '任务状态', prop: 'taskSts', sortable: true, resizable: true, dataCode: 'COLLT_OUTS_TASK_STS'},
              {label: '催收结果备注', prop: 'colltResRemark', sortable: true, resizable: true},
              {label: '操作员', prop: 'opUserName', sortable: true, resizable: true},
              {label: '操作员所属机构', prop: 'opOrgName', sortable: true, resizable: true},
              {label: '是否有效', prop: 'isValid', sortable: true, resizable: true, dataCode: 'STD_YES_NO', hidden:true}
            ],

            /** ----------------------------- 导入催收结果 ------------------------------------------------ end   */


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

            height: yufp.frame.size().height - 103,
            dialogVisible: false,
            dialogVisibleFp: false,
            dialogVisibleSl: false,
            formDisabled: false,
            exportFileName: '委外催收任务分配信息_',
            /**  *********************************** 受理页面参数 ************************** start */
            dialogTrdVisible: false,
            checkIsShowFlow: true,
            checkIsShowDelay: true,
            checkIsShowUpload: true,
            checkIsShowCus: true,
            checkIsShowCollReceipt: true,
            checkIsShowHisColl: true,
            isShowHisCollDetail: true,
            dialogAccLaonVisible: false,
            checkIsShowLitiColl: true,
            checkIsShowFlowForm: true,
            checkIsShowFlowTable: true,
            checkIsShowDelayTable: true,
            distriRateVisible: false,
            /**  *********************************** 受理页面参数 ************************** end  */

            /** ------------------------- 导入催收结果页面参数 start  */
            dialogSingleVisible: false,
            dialogImportExcelVisible :false,
            dialogImportVisible: false,
            loading2: false,
            extensions: ['xls', 'xlsx'],
            fileData: {},
            headers: {},
            files: [],
            fileExcelName: '',
            dialogTempVisible: false,
            /** ------------------------- 导入催收结果页面参数 end   */
            delayAppDialogVisible: false,
            outsTaskDistrMainRootId: 'outsTaskDistrMain',
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
            // _self.updateButtons[0].hidden = !editable;
            _self.updateButtons[1].hidden = !editable;
            _self.formDisabled = !editable;
            _self.dialogVisible = true;
          },

          //先查询可分案的机构版本号
          addFn: function () {
            var _self = this;
            _self.distriRateVisible = true;
            _self.ratebaseParams = {
              cooprOrgType:'001'
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
          divisionFn: function () {
            var _self = this;
            // _self.switchStatus('ADD', true);
            // _self.$nextTick(function () {
            //   _self.$refs.reftable.remoteData();
            // });
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
                    method: 'POST',
                    url: backend.flowService + '/api/outs/task/distr/case',
                    data: {
                      colltWay: '03',
                      versionNo: selections[0].versionNo
                    },
                    callback: function (code, message, response) {
                      if (code == 0 && response.code == 0) {
                        _self.$message('分案成功，已提交分案结果，待审批处理！');
                      } else {
                        _self.$message('操作失败，原因：'+response.message);
                      }
                      _self.fullscreenLoading = false;
                      _self.$refs.reftable.remoteData();
                    }
                  });
                }
              }
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

          // 查看分配（某一委外经手类型分配的委外机构详情）
          infoFn: function () {
            if (this.$refs.reftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            var _self = this;
            var obj = _self.$refs.reftable.selections[0];
            _self.baseParamsFp = {
              colltBatchNo: obj.colltBatchNo,
              outsHdleType: obj.outsHdleType
            };
            //this.switchStatus('DETAIL', false);
            _self.dialogVisibleFp = true;
            this.$nextTick(function () {
              // yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0]);
              this.$refs.reftableFp.remoteData(_self.baseParamsFp);
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
              url: '/api/outs/task/distr/main',
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

          // 分配查看页面--导出（根据分配批次号和委外机构编号，查询催收任务信息表collt_task_info获取） 导出某机构某批次的所有案件
          exportFn: function () {
            var _self = this;
            if (_self.$refs.reftableFp.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            var obj = _self.$refs.reftableFp.selections[0];
            var trips = "是否导出【" + obj.outsOrgName + "】的催收任务数据？";

            // { label: '分配金额', prop: 'distrLmt', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
            //   return yufp.util.moneyFormatter(cellValue, 2);
            // }   },
            // { label: '分配任务数', prop: 'distrTaskNum', sortable: true, resizable: true},
            // { label: '分配金额占比', prop: 'distrLmtRatio', sortable: true, resizable: true },
            // { label: '分配任务数占比', prop: 'distrTasksRatio', sortable: true, resizable: true },
            // { label: '分配时间', prop: 'distrTime', sortable: true, resizable: true },

            var tableColumns =  _self.$refs.reftableFp.tableColumns;
            var result = [];
            for(i=0; i<tableColumns.length; i++){
              if(tableColumns[i].prop == 'distrLmt' || tableColumns[i].prop == 'distrTaskNum' || tableColumns[i].prop == 'distrLmtRatio' ||
                  tableColumns[i].prop == 'distrTasksRatio' || tableColumns[i].prop == 'distrTime'){
                continue;
              }else {
                result.push(tableColumns[i]);
              }
            }
            _self.$refs.reftableFp.tableColumns = result;

            //20201121lmj
            var dt = new Date();
            var curYear = dt.getFullYear();
            var curMonth = ("0"+((dt.getMonth())+1)).slice(-2);
            var curDay = ("0"+dt.getDate()).slice(-2);
            var currDt = curYear + curMonth + curDay;
            this.$confirm(trips, '提示').then(function () {
              yufp.util.exportExcelByTable({
                fileName: "委外催收任务分配信息_"+obj.outsOrgName+'_'+currDt,
                importType: 'service', // page当前页 selected 选中的数据  service 后端数据
                ref:  _self.$refs.reftableFp ,
                url: backend.riskmService + '/api/collt/task/infos/export',
                method:'POST',
                param: {
                  colltBatchNo: obj.colltBatchNo,
                  outsOrgCode: obj.outsOrgCode,
                  colltWay: '03',
                }
              });
            });
          },

          // 分配查看页面--受理
          acceptFn: function () {
            if (this.$refs.reftableFp.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            var _self = this;
            var obj = _self.$refs.reftableFp.selections[0];

            _self.baseParamsSl = {
              colltBatchNo: obj.colltBatchNo,
              outsOrgCode: obj.outsOrgCode,
              outsHdleType: obj.outsHdleType

            };
            //this.switchStatus('DETAIL', false);
            _self.dialogVisibleSl = true;
            this.$nextTick(function () {
              _self.$refs.reftableSl.remoteData(_self.baseParamsSl);
            });
          },

          //受理页面--结案
          settleFn: function () {
            var _self = this;
            if (_self.$refs.reftableSl.selections.length != 1) {
              _self.$message({message: '请先选择一条记录', type: 'warning'});
              return;
            }
            var obj = _self.$refs.reftableSl.selections[0];
            if(obj.taskSts != '03' && obj.taskSts != '08'){
              _self.$message({message: '现阶段只支持对任务状态为"结清"或"到期结案"的催收任务进行结案！', type: 'warning'});
              return;
            }
            _self.dialogTrdVisible = true;
            //结案时详细页面隐藏流转信息的部分
            _self.checkIsShowFlow = false;
            //结案时详细页面显示附件上传的部分
            _self.checkIsShowUpload = true;
            //显示委外催收
            _self.checkIsShowLitiColl = true;
            //显示其他催收方式的历史催收信息
            _self.checkIsShowHisColl = true;
            //隐藏查看页面的催收历史记录信息
            _self.isShowHisCollDetail = false;
            //隐藏延期信息
            _self.checkIsShowDelay = false;

            // 附件上传记录表格参数
            _self.baseParamsAnnex = {
              flowAppNo : obj.colltTaskNo,
              bizSerno : obj.colltTaskNo
            };
            _self.$nextTick(function () {
              _self.$refs.cusBaseInfo.switch('outsOrgCode', 'hidden', false);
              _self.$refs.cusBaseInfo.switch('outsOrgName', 'hidden', false);
              _self.$refs.cusBaseInfo.switch('phoneNum', 'hidden', false);
              _self.$refs.cusBaseInfo.switch('indivSex', 'hidden', false);
              // 附件上传记录数据展示
              _self.$refs.reftableAnnex.remoteData(_self.baseParamsAnnex);
            });
            //客户基本信息
            _self.queryCusInfo(obj);
            //催收借据列表
            _self.queryLaonInfo(obj);
            //历史催收记录
            _self.queryHisColl(obj);
            //委外催收登记
            _self.outsCollReg(obj);
          },

          //受理页面--延案
          delayFn: function (delayCase) {
            var _self = this;
            // _self.dialogVisibleSl = false;
            // _self.dialogVisibleFp = false;
            _self.delayAppDialogVisible = true;

            _self.$nextTick(function () {
              if(delayCase == 'delayCase') {
                var paramData = {
                  // editable: data.editable,
                  colltBatchNo: _self.baseParamsSl.colltBatchNo,
                  outsOrgCode: _self.baseParamsSl.outsOrgCode,
                  outsHdleType: _self.baseParamsSl.outsHdleType

                };
                yufp.router.to("COLLT_ColltDelayCaseRecordPageInfo", paramData, _self.outsTaskDistrMainRootId);
              }
            });
          },

          //受理页面--查看
          infoSlFn: function () {
            var _self = this;
            var obj = _self.$refs.reftableSl.selections;
            if (obj.length != 1) {
              _self.$message({message: '请先选择一条记录', type: 'warning'});
              return;
            }
            _self.dialogTrdVisible = true;
            //查看时详细页面显示流转信息的部分
            _self.checkIsShowFlow = true;
            //显示历史催收登记记录
            _self.isShowHisCollDetail = true;
            //显示历史流转信息
            _self.checkIsShowFlowTable = true;
            //显示延期信息
            _self.checkIsShowDelayTable = true;

            //查看时详细页面隐藏附件上传的部分
            _self.checkIsShowUpload = false;
            //隐藏流转信息输入框
            _self.checkIsShowFlowForm = false;
            //隐藏委外催收登记
            _self.checkIsShowLitiColl = false;
            //隐藏其他催收方式的历史催收信息
            _self.checkIsShowHisColl = false;

            _self.$nextTick(function () {
              _self.$refs.cusBaseInfo.switch('outsOrgCode', 'hidden', true);
              _self.$refs.cusBaseInfo.switch('outsOrgName', 'hidden', true);
              _self.$refs.cusBaseInfo.switch('indivSex', 'hidden', true);
              _self.$refs.cusBaseInfo.switch('phoneNum', 'hidden', true);
            });
            //客户基本信息
            _self.queryCusInfo(obj[0]);
            //催收借据列表
            _self.queryLaonInfo(obj[0]);
            //历史催收记录
            _self.queryHisCollDetail(obj[0]);
            //人工流转
            _self.manualFlow(obj[0]);
            //延期信息
            _self.delayCollts(obj[0]);
          },

          //受理页面--人工流转
          flowFn: function () {
            var _self = this;

            if (_self.$refs.reftableSl.selections.length != 1) {
              _self.$message({message: '请先选择一条记录', type: 'warning'});
              return;
            }
            var obj = _self.$refs.reftableSl.selections[0];
            if(obj.taskSts != '01' && obj.taskSts != '02' && obj.taskSts != '07'){
              _self.$message({message: '现阶段只支持对任务状态为"正常"、"延案"、"处理中"的催收任务进行人工流转！', type: 'warning'});
              return;
            }
            _self.dialogTrdVisible = true;
            //查看时详细页面显示流转信息的部分
            _self.checkIsShowFlow = true;
            //查看时详细页面隐藏附件上传的部分
            _self.checkIsShowUpload = false;
            //隐藏历史流转信息
            _self.checkIsShowFlowTable = false;
            //显示流转信息输入框
            _self.checkIsShowFlowForm = true;
            //隐藏委外催收登记
            _self.checkIsShowLitiColl = false;
            //隐藏延期信息
            _self.checkIsShowDelay = false;
            //隐藏查看页面的催收历史记录信息
            _self.isShowHisCollDetail = false;
            _self.$nextTick(function () {
              _self.$refs.cusBaseInfo.switch('outsOrgCode', 'hidden', true);
              _self.$refs.cusBaseInfo.switch('outsOrgName', 'hidden', true);
              _self.$refs.cusBaseInfo.switch('indivSex', 'hidden', true);
              _self.$refs.cusBaseInfo.switch('phoneNum', 'hidden', true);
            })
            //客户基本信息
            _self.queryCusInfo(obj);
            //催收借据列表
            _self.queryLaonInfo(obj);
            //历史催收记录
            _self.queryHisColl(obj);
            //人工流转
            //_self.manualFlow(obj);
          },

          //查询客户信息
          queryCusInfo: function (item) {
            var _self = this;
            _self.$nextTick(function () {
              yufp.service.request({
                method: "GET",
                url: backend.cusService + '/api/cus/indiv/' + item.cusId,
                data: {},
                callback: function (code, message, response) {
                  if (response.success) {
                    // 重置表单，防止第二次点击查看时，为空数据出现上一次查看的数据
                    _self.$refs.cusBaseInfo.resetFn();
                    yufp.extend(_self.$refs.cusBaseInfo.formModel, response.rows);//, {outsOrgCode: item.outsOrgCode}, {outsOrgName: item.outsOrgName});
                  } else {
                    // _self.$message("获取客户信息失败：" + response.message);
                  }
                  //该部分字段信息来源于催收任务表
                  _self.$refs.cusBaseInfo.formModel.outsOrgCode = item.outsOrgCode;
                  _self.$refs.cusBaseInfo.formModel.outsOrgName = item.outsOrgName;
                  _self.$refs.cusBaseInfo.formModel.phoneNum = item.phoneNum;
                }
              });

            });
          },

          //查询催收借据
          queryLaonInfo: function (item) {
            var _self = this;
            _self.$nextTick(function () {
              yufp.service.request({
                method: "GET",
                url: backend.creditService + '/api/acc/loan/' + item.loanNo,
                data: {},
                callback: function (code, message, response) {
                  if (response.success) {
                    // 重置表单，防止第二次点击查看时，为空数据出现上一次查看的数据
                    _self.$refs.collReceiptInfo.resetFn();
                    //基本信息
                    yufp.extend(_self.$refs.collReceiptInfo.formModel,response.rows,{loanNo: item.loanNo}, {overDays: item.overDays});
                  } else {
                    //_self.$message("获取催收借据信息失败：" + response.message);
                  }
                }
              });
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

          //查询历史催收记录 -- 查看页面
          queryHisCollDetail: function (item) {
            var _self = this;
            _self.hisCollDetailParams = {
              colltTaskNo: item.colltTaskNo,
              cooprOrgNo: item.outsOrgCode,
              cooprOrgName: item.outsOrgName,
              outsHdleType: item.outsHdleType
            };
            _self.$nextTick(function () {
              _self.$refs.hisCollDetailTable.remoteData(_self.hisCollDetailParams);
            });
          },

          //人工流转处理
          manualFlow: function (item) { //collt_task_flow_app
            var _self = this;
            _self.flowParams = {
              colltTaskNo: item.colltTaskNo
            };
            this.$nextTick(function () {
              _self.$refs.flowTable.remoteData(_self.flowParams);
            });
          },

          //延期信息处理
          delayCollts: function (item) { //collt_delay_case_record
            var _self = this;
            _self.delayParams = {
              colltTaskNo: item.colltTaskNo
            };
            this.$nextTick(function () {
              _self.$refs.delayTable.remoteData(_self.delayParams);
            });
          },

          //委外机构催收登记
          outsCollReg: function (item) {
            var _self = this;
            _self.$nextTick(function () {
              // 重置表单，防止第二次点击查看时，为空数据出现上一次查看的数据
              _self.$refs.settleCollInfo.resetFn();
              _self.setColltRecRate(item);
              yufp.extend(_self.$refs.settleCollInfo.formModel,
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
                  outsHdleType: item.outsHdleType
                },
                callback: function (code, message, response) {
                  if (response.success) {
                    // 计算结果后面加上''，将数据类型转换为string，不然执行保存的时候，必填项失效
                    if (item.colltBalance !=null && item.colltBalance != 0){
                      _self.$refs.settleCollInfo.formModel.colltRecRate =yufp.util.moneyFormatter(response.rows / item.colltBalance, 4)*100  + '';
                    }else{
                      _self.$refs.settleCollInfo.formModel.colltRecRate = null;
                    }
                  } else {
                    _self.$message("获取还款金额失败：" + response.message);
                    //_self.$refs.settleCollInfo.formModel.colltRecRate = 0;
                  }
                }
              });
            }
            if(item.taskSts == '03'){
              _self.$refs.settleCollInfo.formModel.colltRecRate = 100 + '';
            }
          },

          // 委外延案申请页面关闭按钮回调函数LitigationCollectionPageInfo.js
          cancelOutsFn: function () {
            this.$refs.reftableSl.remoteData();
            this.delayAppDialogVisible = false;
          },

          /** 导入催收结果处理  ***************************** start */

          //新增
          singleCreateFn: function () {
            var _self = this;
            _self.dialogSingleVisible = true;
            // _self.$nextTick(function () {
            //   yufp.extend(_self.$refs.singleInfo.formModel,
            //       {opUserCode:yufp.session.userId},
            //       {opOrgCode:yufp.session.org.orgCode}
            //   );
            // });
          },

          //受理页面--导入催收结果
          importFn: function () {
            var _self = this;
            _self.dialogImportVisible = true;
            yufp.extend(_self.colltResParams, {outsOrgCode: _self.baseParamsSl.outsOrgCode});
            this.$nextTick(function () {
              _self.$refs.collRsTable.remoteData(_self.colltResParams);
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

          inputFile: function (newFile, oldFile) {
            if (newFile && oldFile && !newFile.active && oldFile.active) {
              var mesType = 'warning';
              // Get response data
              if (newFile.success === true) {
                var msgData = newFile.response.message;
                //flag:用来区分错误类型（excel填写错误/数据库存在历史数据的错误）
                this.flag = msgData.substring(0,msgData.indexOf(":"))
                var errorMsg = msgData.substring(msgData.indexOf(":") + 1,msgData.length);
                //转化为数组，用于遍历展示
                this.errors = errorMsg.split(',');
                if (typeof (newFile.response) === 'string')
                  newFile.response = JSON.parse(newFile.response);
                if (newFile.response && newFile.response.message) {
                  if (newFile.response.success === true) {
                    mesType = 'success';
                    this.$message({message: newFile.response.message, type: mesType});
                  } else {
                    this.tipsVisible = true;
                  }
                  /*this.$msgbox({
                      title: '错误信息',
                      message: h('div', null, newDatas),
                      confirmButtonText: '确认',
                      showCancelButton: true,
                      cancelButtonText: '取消',
                      type: 'warning',
                      center: true,
                      callback: function (action) {

                      }
                  });*/
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
              //数据暂存在临时表，确认后再存入正式表
              this.checkAndCon();
            }
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

          //导入文件页面——保存
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

          //导入文件页面——取消按钮
          cancelFn: function () {
            this.files = [];
            this.fileExcelName = '';
            this.dialogImportExcelVisible = false;
          },

          //催收结果信息刪除
          // colltResDeleteFn: function () {
          //   var _self = this;
          //   var selections = _self.$refs.collRsTable.selections;
          //   if (selections.length < 1) {
          //     _self.$message({message: '请先选择一条记录', type: 'warning'});
          //     return;
          //   }
          //   var len = selections.length, arr = [];
          //   for (var i = 0; i < len; i++) {
          //     arr.push(selections[i].recordSerno);
          //   }
          //   _self.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          //     confirmButtonText: '确定',
          //     cancelButtonText: '取消',
          //     type: 'warning',
          //     center: true,
          //     callback: function (action) {
          //       if (action === 'confirm') {
          //         yufp.service.request({
          //           method: 'DELETE',
          //           url: backend.riskmService + "/api/collt/res/records",
          //           data: {
          //             recordSerno: arr.join(',')
          //           },
          //           callback: function (code, message, response) {
          //             if (code == 0) {
          //               _self.$refs.collRsTable.remoteData();
          //               _self.$message('操作成功');
          //             } else {
          //               _self.$message('操作失败');
          //             }
          //           }
          //         });
          //       }
          //     }
          //   });
          // },

          //导入结果展示和确认页面展示
          checkAndCon:function(){
            var _self = this;
            _self.dialogTempVisible = true;
            _self.$nextTick(function () {
              _self.$refs.collRsTempTable.remoteData();
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
                  _self.$refs.collRsTempTable.remoteData();
                  //_self.$message('操作成功');
                } else {
                  //_self.$message('操作失败');
                }
              }
            });
          },

          //导入结果展示和确认页面——删除
          tempDeleteFn: function () {
            var _self = this;
            var selections = _self.$refs.collRsTempTable.selections;
            if (selections.length < 1) {
              _self.$message({message: '请先选择一条记录', type: 'warning'});
              return;
            }
            var len = selections.length, arr = [];
            for (var i = 0; i < len; i++) {
              arr.push(selections[i].recordSerno);
            }
            _self.batchDelete(arr, backend.riskmService + "/api/collt/res/records/temp");
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
                        if (_self.$refs.collRsTable != 'undifined') _self.$refs.collRsTable.remoteData();
                        if (_self.$refs.collRsTempTable != 'undifined') _self.$refs.collRsTempTable.remoteData();
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

          //确认需要的数据并保存
          confirmDataFn: function () {
            var _self = this;
            yufp.service.request({
              method: 'POST',
              url: backend.riskmService + "/api/collt/res/temp/save",
              data: {},
              callback: function (code, message, response) {
                if (response.success) {
                  _self.$refs.collRsTable.remoteData();
                  _self.deleteTemp();
                  _self.$message('操作成功');
                } else {
                  _self.deleteTemp();
                  _self.$message('操作失败,'+response.message);
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

          /** 导入催收结果处理  ***************************** end   */

          //撤回功能
          withdrawFn: function () {
            var _self = this;
            if (_self.$refs.reftableSl.selections.length != 1) {
              _self.$message({ message: '请先选择一条记录', type:'warning' });
              return;
            }
            var obj = _self.$refs.reftableSl.selections[0];
            _self.$confirm('请确认是否要强制执行撤回？', '提示').then(function () {
              yufp.service.request({
                method: 'POST',
                url: backend.riskmService + "/api/collt/task/infos/withdraw",
                data: obj,
                callback: function (code, message, response) {
                  if (code==0 && response.rows > 0) {
                    _self.$refs.reftableSl.remoteData();
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
            var colltTaskNo = _self.$refs.reftableSl.selections[0].colltTaskNo;
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
