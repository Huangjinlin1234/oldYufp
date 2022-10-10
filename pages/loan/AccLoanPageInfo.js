/**
 * @create by chenqm1 on 2018-05-14
 * @description 贷款借据
 */
define([
  './custom/widgets/js/UserSelecter.js',
  './custom/widgets/js/PrdIdInfoSelector.js'
], function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('STD_ZB_ASSURE_MEANS,STD_ZB_ACC_STATUS,STD_PRD_REPAY_MODE,TERM_STATUS,SETL_TYP,STD_ZB_CERT_TYP,APPLY_CHANNEL_TYPE,IMAGE_TYPE,STD_IS_OVER,TD_LEND_TYPE,RP_STS');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _self = this;
        return {
          baseTab: 'baseTab',
          tabName: 'first',
          expandCollapseName: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
          baseParams: {
          },
          baseLRdetailParams: { },  //还款记录信息参数
          baseLRplanParams: { }, 	// 还款计划信息参数
          imagesParams: { },  //影像信息
          
          dataUrl: backend.creditService + '/api/acc/loans',
          dataUrlLRdetail: backend.creditService + '/api/loan/repay/detail',
          dataUrlLRplan: backend.creditService + '/api/loan/repay/planNew',
          
          dataUrlImages: backend.edocService +'/api/query/image/platfrom/files',
          
          queryFields: [
            { placeholder: '借据号', field: 'billNo', type: 'input' },
            { placeholder: '渠道名称', field: 'channelCode', type: 'select', dataCode: 'APPLY_CHANNEL_TYPE',change:function(value,model,args){
                    _self.$refs.fromPrd.fm.prdCode = ''; //当下拉框值改变时，清空pop框产品值
            },rules: [{required: true, message: '渠道名称必输', trigger: 'blur'}]
            },
            { placeholder: '产品名称', field: 'prdCode', type: 'custom', is: 'div-prdId-info-selector' ,params:{type:''},
                rules: [{required: true, message: '产品名称必输', trigger: 'blur'}],
				clickFn:function(value,model,args){
					_self.$refs.fromPrd.switch('prdCode','params',{prdType:model.channelNo,type:'code'});
					_self.$refs.fromPrd.rebuildFn();
				}
            },
            { placeholder: '客户编号', field: 'cusId', type: 'input' },
            { placeholder: '证件类型', field: 'certType', type: 'select', dataCode: 'STD_ZB_CERT_TYP', datacodeFilter: function(options){
            	this.typeOptions = [];
            	for(var i=0; i<options.length; i++){
            		if(options[i].key != 'CN03' && options[i].key != 'HK01' && options[i].key != 'MO01' && options[i].key != 'TW01' && options[i].key != 'TW02'){
            			this.typeOptions.push(options[i]);
            		}
            	}
            } },
            { placeholder: '证件号码', field: 'certCode', type: 'input' },
            { placeholder: '借据状态', field: 'accountStatus', type: 'select', dataCode: 'STD_ZB_ACC_STATUS' ,datacodeFilter: function(options){
            	this.typeOptions = [];
            	for(var i=0; i<options.length; i++){
            		if(options[i].key != '5' && options[i].key != '6' ){
            			this.typeOptions.push(options[i]);
            		}
            	}
            } },
            { placeholder: '还款方式', field: 'repaymentMode', type: 'select', dataCode: 'STD_PRD_REPAY_MODE' ,datacodeFilter: function(options){
            	this.typeOptions = [];
            	for(var i=0; i<options.length; i++){
            		if( options[i].key != '202' && options[i].key != 'FB99' ){
            			this.typeOptions.push(options[i]);
            		}
            	}
            }},
              {placeholder: '贷款起始日起', field: 'applyDateMin', type: 'date'
                  //rules: [{required: true, message: '贷款起始日起必输', trigger: ['change','blur'],type :'date'}],
                 /* value:new Date().getFullYear() + '-'
                      + (new Date().getMonth()+1 < 10 ? '0' + (new Date().getMonth()+1):new Date().getMonth()+1) + '-'
                      + (new Date().getDate()< 10 ? '0'+new Date().getDate():new Date().getDate())*/
              },
              {placeholder: '贷款起始日止', field: 'applyDateMax', type: 'date'
                  //rules: [{required: true, message: '贷款起始日止必输', trigger: ['change','blur'],type :'date'}],
                  /*value:new Date().getFullYear() + '-'
                      + (new Date().getMonth()+1 < 10 ? '0' + (new Date().getMonth()+1):new Date().getMonth()+1) + '-'
                      + (new Date().getDate()< 10 ? '0'+new Date().getDate():new Date().getDate())*/
              }
          ],

          queryButtons: [
            { label: '查询',op: 'submit',type: 'primary',icon: 'search',
                click: function (model, valid) {
                if (valid) {
                    if((null==model.billNo || model.billNo == "")&&(null==model.channelCode || model.channelCode == "") &&
                        (null==model.prdCode || model.prdCode == "") && (null==model.cusId || model.cusId == "" )&&
                        (null==model.certType || model.certType == "" ) && (null==model.certCode || model.certCode == "" ) &&
                        (null==model.accountStatus || model.accountStatus == "" ) && (null==model.repaymentMode || model.repaymentMode == "" )&&
                        ((null==model.applyDateMin || model.applyDateMin == "" ) && (null==model.applyDateMax || model.applyDateMax == "" ))){
                        _self.$message('必须有一个查询条件!');
                    }else if((null==model.billNo || model.billNo == "" ) && (null==model.certCode || model.certCode == "" )
                    && ((null==model.applyDateMin || model.applyDateMin == "" ) && (null==model.applyDateMax || model.applyDateMax == "" ))){
                        _self.$message('借据号，证件号码，贷款起始日必须有一个必输!');
                    }else if((null==model.billNo || model.billNo == "" ) && (null==model.certCode || model.certCode == "" )){
                        var dateMin = new Date(model.applyDateMin);
                        var dateMin1 = new Date(model.applyDateMin);
                        var dateMinTime =  dateMin.getFullYear()+"-"+(dateMin.getMonth()+1)+"-"+dateMin.getDate();
                        var dateMax = new Date(model.applyDateMax);
                        var dateMaxTime =  dateMax.getFullYear()+"-"+(dateMax.getMonth()+1)+"-"+dateMax.getDate();
                        if(model.applyDateMin === "" || model.applyDateMin === undefined || model.applyDateMax === "" || model.applyDateMax === undefined){
                            _self.$message('贷款起始日起止必输!');
                        }else if(dateMax < dateMin){
                            _self.$message('贷款起始日结束日期不能小于开始日期!');
                        }else{
                            dateMin1.setMonth(dateMin.getMonth() +3);
                            dateMin1.setDate(dateMin.getDate() +1);
                            var dateMinTime1 =  dateMin1.getFullYear()+"-"+(dateMin1.getMonth()+1)+"-"+dateMin1.getDate();
                            if(dateMax > dateMin1){
                                _self.$message('贷款起始日起止时间不能超过三个月!');
                            }else{
                                _self.$refs.reftable.remoteData(model);
                            }
                        }
                    }else{
                        _self.$refs.reftable.remoteData(model);
                    }
                }
              } },
            { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
          ],

          tableColumns: [
            { label: '借据号', prop: 'billNo', sortable: true, resizable: true },
            { label: '借款合同号', prop: 'contNo', sortable: true, resizable: true },
            { label: '用信申请流水号', prop: 'applySeq', sortable: true, resizable: true },
            { label: '客户编号', prop: 'cusId', sortable: true, resizable: true },
            { label: '客户姓名', prop: 'cusName', sortable: true, resizable: true },
            { label: '证件类型', prop: 'certType', sortable: true, resizable: true, dataCode: 'STD_ZB_CERT_TYP'  },
            { label: '证件号码', prop: 'certCode', sortable: true, resizable: true },
            { label: '产品编号', prop: 'prdCode', sortable: true, resizable: true },
            { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
            { label: '渠道名称',prop: 'channelCode', sortable: true, resizable: true, dataCode: 'APPLY_CHANNEL_TYPE'  },
            { label: '贷款种类', prop: 'lendType', sortable: true, resizable: true, dataCode: 'TD_LEND_TYPE'},
            { label: '贷款起始日', prop: 'loanStartDate', sortable: true, resizable: true },
			{ label: '贷款到期日', prop: 'loanEndDate', sortable: true, resizable: true },
            { label: '执行年利率',prop: 'realityIrY', sortable: true, resizable: true,
            	formatter: function(row, column, cellValue) {
                    var num = parseFloat(cellValue);
                    if (typeof(num) == 'undefined'  || num == null || isNaN(num) )
                        return "";
                    var rateY = Number(num * 100).toFixed(2) + '%';
                    return rateY;
                }  },
            { label: '借据状态', prop: 'accountStatus', sortable: true, resizable: true, dataCode: 'STD_ZB_ACC_STATUS' },
            { label: '还款方式', prop: 'repaymentMode', sortable: true, resizable: true, dataCode: 'STD_PRD_REPAY_MODE' },
            { label: '归属机构', prop: 'mainBrId', sortable: true, resizable: true },
            { label: '借据金额', prop: 'loanAmount', sortable: true, resizable: true ,formatter: function (row, column, cellValue) {
                    return yufp.util.moneyFormatter(cellValue, 2);
                }  },
            { label: '借据余额', prop: 'loanBalance', sortable: true, resizable: true,formatter: function (row, column, cellValue) {
                    return yufp.util.moneyFormatter(cellValue, 2);
                }  }
          ],
          
          updateFields: [{
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
                { field: 'overdueBalance', label: '逾期本金', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                { field: 'unpdIntArrPrn', label: '应收罚息', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                { field: 'actIntArrPrn', label: '实收罚息', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                { field: 'unpdArrPrnBal1', label: '应收复利', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                { field: 'actArrPrnBal', label: '实收复利', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                /* 逾期应收 = 逾期本金 + 逾期利息 + 罚息（元）*/
                // { field: 'overdueReceInt', label: '逾期应收', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                { field: 'irAdjustMode', label: '利率调整方式', dataCode: 'STD_ZB_IR_ADJ_MODE', type: 'select'},
                { field: 'assureMeansMain', label: '主担保方式', dataCode: 'STD_ZB_ASSURE_MEANS', type: 'select'},
                { field: 'repaymentMode', label: '还款方式', dataCode: 'STD_PRD_REPAY_MODE', type: 'select'},
                { field: 'intRateType', label: '利率类型', dataCode: 'STD_ZB_EFR_CHNG_IND', type: 'select', hidden: true},
                { field: 'realityIrY', label: '执行年利率', type: 'num', formatter: yufp.util.toPercent},
                { field: 'prinFixedRate', label: '固定的罚息率', type: 'num', formatter: yufp.util.toPercent},
                { field: 'assureMeans3', label: '保险公司',dataCode: 'INSURER_TYPE', type: 'select'},
                { field: 'enterAccount', label: '放款账号'},
                { field: 'repaymentAccount', label: '还款账号'},
                { field: 'createUser', label: '创建人'},
                { field: 'createTime', label: '创建时间'},
                { field: 'lastUpdateUser', label: '最后修改人'},
                { field: 'lastUpdateTime', label: '最后修改时间'}
              ]
            }],
          
          // 还款记录明细信息
          tableColumnsLRdetail: [
        	  { label: '借据号', prop: 'loanNo', sortable: true, resizable: true },
        	  { label: '还款期数', prop: 'repayTerm', sortable: true, resizable: true },
        	  { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
        	  // { label: '计划还款日', prop: 'stmtDate', sortable: true, resizable: true }, // 取还款计划的计划还款日
        	  { label: '放款金额', prop: 'dnAmt', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                  return yufp.util.moneyFormatter(cellValue, 2);
                } },
	          /*{ label: '执行年利率', prop: 'intRat', sortable: true, resizable: true,
	          	  formatter: function(row, column, cellValue) {
	                    var num = parseFloat(cellValue);
	                    if (typeof(num) == 'undefined'  || num == null || isNaN(num) )
	                        return "";
	                    var rateY = Number(num * 100).toFixed(2) + '%';
	                    return rateY;
	           } },*/
	          { label: '还款类型', prop: 'setlTyp', sortable: true, resizable: true, dataCode: 'SETL_TYP' },  
	          { label: '还款日期', prop: 'setlApplyDt', sortable: true, resizable: true },
              { label: '总还款金额', prop: 'totalAmt', sortable: true, resizable: true,formatter: function (row, column, cellValue) {
                      return yufp.util.moneyFormatter(cellValue, 2);
                  }  },
              { label: '应还本金', prop: 'allOdPrcpAmt', sortable: true, resizable: true,formatter: function (row, column, cellValue) {
                  return yufp.util.moneyFormatter(cellValue, 2);
                }  },
              { label: '应还利息', prop: 'allOdNormIntAmt', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                return yufp.util.moneyFormatter(cellValue, 2);
              	} },   
              { label: '应还罚息', prop: 'allOdIntAmt', sortable: true, resizable: true,formatter: function (row, column, cellValue) {
                return yufp.util.moneyFormatter(cellValue, 2);
              } },
              { label: '应还复利', prop: 'allOdCommIntAmt', sortable: true, resizable: true,formatter: function (row, column, cellValue) {
                      return yufp.util.moneyFormatter(cellValue, 2);
                  } },
              { label: '应还费用', prop: 'totalFee', sortable: true, resizable: true,formatter: function (row, column, cellValue) {
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
              { label: '实还复利', prop: 'setlOdCommInt', sortable: true, resizable: true,formatter: function (row, column, cellValue) {
                      return yufp.util.moneyFormatter(cellValue, 2);
                  }  },
              { label: '实还费用', prop: 'setlTotalFee', sortable: true, resizable: true,formatter: function (row, column, cellValue) {
                      return yufp.util.moneyFormatter(cellValue, 2);
                  }  },
              { label: '还款账号', prop: 'disbAcNo', sortable: true, resizable: true, width: 180 },
              { label: '还款状态', prop: 'rpSts', sortable: true, resizable: true , dataCode: 'RP_STS'},
          ],
          
         // 还款计划信息
         tableColumnsLRplan: [
        	 { label: '借据号', prop: 'refNbr', sortable: true, resizable: true },
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
             /*{ label: '逾期本金', prop: 'principalDue', sortable: true, resizable: true,formatter: function (row, column, cellValue) {
                   return yufp.util.moneyFormatter(cellValue, 2);
               } },  
             { label: '非应计本金', prop: 'principalDue91', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
               return yufp.util.moneyFormatter(cellValue, 2);
               }, width: 160  },*/
             { label: '应还利息', prop: 'interest', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
               return yufp.util.moneyFormatter(cellValue, 2);
              }  },
             { label: '已还利息', prop: 'interestPaid', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
              return yufp.util.moneyFormatter(cellValue, 2);
              }  },
             /*{ label: '逾期利息', prop: 'interestDue', sortable: true, resizable: true , formatter: function (row, column, cellValue) {
              return yufp.util.moneyFormatter(cellValue, 2);
               } },    
             { label: '表外利息', prop: 'interestDue91', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
               return yufp.util.moneyFormatter(cellValue, 2);
               }  }, */
             { label: '应还罚息', prop: 'penaltyDue', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                 if (row.interestDue !== null && row.interestDue !== "" && row.interestDue !== 0 &&
                     row.productCd === '01020001') {
                     return yufp.util.moneyFormatter(row.interestDue - row.interest, 2);
                 }
               return yufp.util.moneyFormatter(cellValue, 2);
             }  },
             { label: '已还罚息', prop: 'penaltyPaid', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
               return yufp.util.moneyFormatter(cellValue, 2);
               }  },
             { label: '应还复利', prop: 'comIntDue', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                     return yufp.util.moneyFormatter(cellValue, 2);
                 }  },
             { label: '已还复利', prop: 'comIntPaid', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                     return yufp.util.moneyFormatter(cellValue, 2);
                 }  },
             { label: '应还费用', prop: 'feeDue', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                     return yufp.util.moneyFormatter(cellValue, 2);
                 }  },
             { label: '已还费用', prop: 'feePaid', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                     return yufp.util.moneyFormatter(cellValue, 2);
                 }  },
             { label: '是否逾期过', prop: 'isOverDue', sortable: true, resizable: true, dataCode: 'STD_IS_OVER'},
             { label: '结清日期', prop: 'clearDate', sortable: true, resizable: true},
         ],
          
          //影像信息
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

          updateButtons: [
              { label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false,
                click: function (model) {
                    _self.billVisible = false;
                } }
          ],

          height: yufp.frame.size().height - 103,
          billVisible: false,
          exportFileName: '贷款交易明细',
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false)
        };
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
    		  _self.formDisabled = !editable;
    		  //_self.dialogVisible = false;
    		  _self.billVisible = true;
    		  this.$nextTick(function () {

    		  });
    	  },

    	  //查看
    	  infoFn: function () {
    		  if (this.$refs.reftable.selections.length != 1) {
    			  this.$message({ message: '请先选择一条记录', type: 'warning' });
    			  return;
    		  }
    		  var _self = this;
    		  _self.switchStatus('DETAIL', false);
    		  var obj = _self.$refs.reftable.selections[0];
    		  var realityIrY = '';
    		  var prinFixedRate = '';
    		  var dataObj = {};
    		  if (obj.realityIrY != null) {
    			  realityIrY = yufp.util.toPercent((parseFloat(obj.realityIrY) * 100).toFixed(4));
    		  }
    		  if (obj.prinFixedRate != null) {
    			  prinFixedRate = yufp.util.toPercent((parseFloat(obj.prinFixedRate) * 100).toFixed(4));
    		  }
    		  yufp.extend(dataObj, obj, {realityIrY: realityIrY}, {prinFixedRate: prinFixedRate});

    		  _self.baseLRdetailParams = {
    				  loanNo: obj.billNo,
    				  prdName: obj.prdName
    		  };
    		  _self.baseLRplanParams = {
    				  refNbr: obj.billNo,
    				  prdName: obj.prdName
    		  }
    		  
    		  _self.imagesParams = {
    				  applySeq : obj.billNo,
                      prdCode: obj.prdCode
    		  }
    		  this.$nextTick(function () {
    			  _self.$refs.revform.resetFn();
    			  _self.$refs.LRdetailReftable.remoteData(_self.baseLRdetailParams); //还款记录信息查询
    			  _self.$refs.LRplanReftable.remoteData(_self.baseLRplanParams);   //还款计划信息查询
    			  _self.$refs.imagesReftable.remoteData(_self.imagesParams);   //影像信息
    			  yufp.extend(this.$refs.revform.formModel, dataObj);
                  //this.fieldShowDeal(_self.$refs.LRdetailReftable, _self.$refs.LRplanReftable, dataObj);
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
          //字段展示处理方法
    	  fieldShowDeal: function(LRdetailObj, LRplanObj, baseObj){
    		  for (var i = 0; i < LRdetailObj.total; i++) {
    			  LRdetailObj.data[i].prdName = baseObj.prdName; // 给还款明细信息列表，“产品名称”字段赋值
    			  //给还款明细列表，“计划还款日”字段赋值 == 还款计划列表对应期数的计划还款日
    			  for(var j = 0; j < LRplanObj.total; j++){
    				  if(LRdetailObj.data[i].repayTerm == LRplanObj.data[j].term) {
    					  LRdetailObj.data[i].stmtDate = LRplanObj.data[j].stmtDate;
    				  }
    			  }
    		  }
    		  for (var k = 0; k < LRplanObj.total; k++) {   // 给还款计划信息列表，“产品名称”字段赋值
    			  LRplanObj.data[k].prdName = baseObj.prdName;
    		  }
    	  },
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
