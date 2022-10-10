﻿/**
 * @create by fuzm on 2018-05-07
 * @description 产品专案管理表
 */
define(['./custom/widgets/js/PrdInfoSelector.js',
		'./custom/widgets/js/RateSchemeSelecter.js'],
		function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE,APRV_STATUS,CASE_STATUS,STD_ZX_CUR_TYPE,STD_ZX_YES_NO,STD_PRD_REPAY_MODE,STD_ZB_REPAY_FREQ,STD_ZB_ASSURE_MEANS,LOAN_USE_TYPE');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
        	dataUrl: backend.consoleService + '/api/prd/case/manages',
            baseParams: {
            },
            queryFields: [
            { placeholder: '专案代码', field: 'caseCode', type: 'input' },
            { placeholder: '专案名称', field: 'caseName', type: 'input' },
            { placeholder: '产品号', field: 'prdCode', type: 'input'},
            { placeholder: '产品名称', field: 'prdName', type: 'input' },
            { placeholder: '审核状态', field: 'aprvStatus', type: 'select', dataCode:'APRV_STATUS' },
            { placeholder: '专案状态', field: 'caseStatus', type: 'select', dataCode:'CASE_STATUS' }
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
            { label: '专案代码', prop: 'caseCode', sortable: true, resizable: true },
            { label: '专案名称', prop: 'caseName', sortable: true, resizable: true ,
            	rules: [
                    { required: true, message: '必填项', trigger: 'blur'}
                    ]},
            { label: '产品号', prop: 'prdCode', sortable: true, resizable: true },
            { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
            { label: '生效日期', prop: 'effictiveDate', sortable: true, resizable: true },
            { label: '失效日期', prop: 'expiryDate', sortable: true, resizable: true},
            { label: '审核状态', prop: 'aprvStatus', sortable: true, resizable: true, dataCode:'APRV_STATUS' },
            { label: '专案状态', prop: 'caseStatus', sortable: true, resizable: true, dataCode:'CASE_STATUS' },
            { label: '机构', prop: 'legalOrgCode', sortable: true, resizable: true }
            ],
            updateFields: [{
              columnCount: 3,
              fields: [
                	 { field: 'caseCode', label: '专案代码',hidden:false,disabled:true},
                	 { field: 'caseName', label: '专案名称',
                		 rules: [
	                            { required: true, message: '必填项', trigger: 'blur' },
	                            { max: 80, message: '长度不能超过80', trigget: 'blur'}
	                        ]},
                	 { field: 'prdCode', label: '产品号', type: 'custom',is:'div-prd-info-selector'
                         ,clickFn: function (value, model, args) {
                         }
                         ,selectFn:function(value, model, args){
                        	 _self.setValues(value, model, args);
                        	 //_self.$refs.reform.formModel.prdName = model.prdName;
                        	 
                         },
                         rules: [
	                            { required: true, message: '必填项', trigger: 'blur' }
	                        ]},
                	 { field: 'prdName', label: '产品名称', disabled:true},
                	 { field: 'prdId', label: '产品ID', disabled:true, hidden:true},
                	 { field: 'prdDesc', label: '产品描述', type: 'textarea', disabled:true},
//                	 { field: 'currencyOpt', label: '币种', type:'select', dataCode:'STD_ZX_CUR_TYPE'},
//                	 { field: 'crdAprvMinAmt', label: '单笔最小金额(含)(元)', type: 'num', digit:2, formatter: yufp.util.moneyFormatter,
//	               		 rules: [
//	                            { required: true, message: '必填项', trigger: 'blur', type: 'number'},
//	                            { validator: function(rule, value, callback){
//	                            	var crdAprvMaxAmt = _self.$refs.reform.formModel.crdAprvMaxAmt;
//	                            	if(value<=0){
//	                            		callback(new Error("大于0"));
//	                            	}
//	                            	if(crdAprvMaxAmt && crdAprvMaxAmt > value) {
//	                            		callback();
//	                            	} else if(crdAprvMaxAmt && crdAprvMaxAmt < value) {
//	                            		callback(new Error("单笔最小金额不能大于单笔最高金额"));
//	                            	} else {
//	                            		callback();
//	                            	}
//	                            }}
//	                        ]},
//                	 { field: 'crdAprvMaxAmt', label: '单笔最高金额(含)(元)', type: 'num', digit:2, formatter: yufp.util.moneyFormatter, 
//	               		 rules: [
//	                            { required: true, message: '必填项', trigger: 'blur' , type: 'number'},
//	                            { validator: function(rule, value, callback){
//	                            	var crdAprvMinAmt = _self.$refs.reform.formModel.crdAprvMinAmt;
//	                            	if(crdAprvMinAmt && crdAprvMinAmt < value) {
//	                            		callback();
//	                            	} else if(crdAprvMinAmt && crdAprvMinAmt > value) {
//	                            		callback(new Error("单笔最高金额不能小于单笔最小金额"));
//	                            	} else {
//	                            		callback();
//	                            	}
//	                            }}
//	                        ]},
//                	 { field: 'loanAppMinAmt', label: '最小支用金额(含)(元)', type: 'num', digit:2, formatter: yufp.util.moneyFormatter, 
//	               		 rules: [
//	                            { required: true, message: '必填项', trigger: 'blur' , type: 'number'},
//	                            { validator: function(rule, value, callback){
//	                            	if(value<=0){
//	                            		callback(new Error("大于0"));
//	                            	}
//	                            	var loanAppMaxAmt = _self.$refs.reform.formModel.loanAppMaxAmt;
//	                            	if(loanAppMaxAmt && loanAppMaxAmt > value) {
//	                            		callback();
//	                            	} else if(loanAppMaxAmt && loanAppMaxAmt < value) {
//	                            		callback(new Error("单笔最小金额不能大于单笔最高金额"));
//	                            	} else {
//	                            		callback();
//	                            	}
//	                            }}
//	                        ]},
//                	 { field: 'loanAppMaxAmt', label: '最高支用金额(含)(元)', type: 'num', digit:2, formatter: yufp.util.moneyFormatter,
//	               		 rules: [
//	                            { required: true, message: '必填项', trigger: 'blur' , type: 'number'},
//	                            { validator: function(rule, value, callback){
//	                            	var loanAppMinAmt = _self.$refs.reform.formModel.loanAppMinAmt;
//	                            	if(loanAppMinAmt && loanAppMinAmt < value) {
//	                            		callback();
//	                            	} else if(loanAppMinAmt && loanAppMinAmt > value) {
//	                            		callback(new Error("单笔最高金额不能小于单笔最小金额"));
//	                            	} else {
//	                            		callback();
//	                            	}
//	                            }}
//	                        ]},
//                	 { field: 'cyclicWay', label: '额度是否循环', type: 'radio', dataCode: 'STD_ZX_YES_NO', 
//	               		 rules: [
//	                            { required: true, message: '必填项', trigger: 'blur' }
//	                        ]},
                     { field: 'rateSchemeId', label: '利率方案', type: 'custom',is:'div-rate-scheme-selector'
                         ,clickFn: function (value, model, args) {
                         }
                         ,selectFn:function(value, model, args){
//                        	 model.rateSchemeId = args[1].schemeNo;
                        	 model.rateSchemeName = args[1].schemeName;
                         },
                         rules: [
	                            { required: true, message: '必填项', trigger: 'blur' }
	                        ]},
                    { field: 'rateSchemeName', label: '利率方案', hidden:true},
                	 { field: 'repayWay', label: '还款方式', type: 'select', dataCode: 'STD_PRD_REPAY_MODE', 
	               		 rules: [
	                            { required: true, message: '必填项', trigger: 'blur' }
	                        ]},
//                	 { field: 'repayCycleType', label: '还款周期', type: 'select', dataCode: 'STD_ZB_REPAY_FREQ', 
//	               		 rules: [
//	                            { required: true, message: '必填项', trigger: 'blur' }
//	                        ]},
//                     { field: 'repayCycle', label: '还款周期', hidden:true},
//                	 { field: 'repayDay', label: '还款日', type: 'num',
//	               		 rules: [
//	                            { required: true, message: '必填项', trigger: 'blur', type: 'number' },
//	                            { validator: function(rule, value, callback){
//	                            	if(value<1 || value>31){
//	                      	          callback(new Error("请输入1-31之间的数字"));
//	                      	          _self.$refs.reform.formModel.loanAppMinAmt = '';
//	                      	        }else{
//	                      	        	callback();
//	                      	        }
//	                            }}
//	                        ]},
//                	 { field: 'inteDay', label: '结息日', type: 'num',
//                   		 rules: [
//                             { required: true, message: '必填项', trigger: 'blur' , type: 'number'},
//                             { validator: function(rule, value, callback){
//                             	if(value<1 || value>31){
//                       	          callback(new Error("请输入1-31之间的数字"));
//                       	          _self.$refs.reform.formModel.loanAppMinAmt = '';
//                       	        }else{
//                       	        	callback();
//                       	        }
//                             }}
//                         ]},
//                	 { field: 'overdueDefInte', label: '逾期罚息', value:"02", hidden:true},
//                	 { field: 'overdueInteUpRat', label: '逾期罚息浮动比例', type:'num', formatter: yufp.util.toPercent,
//		           		rules: [
//                            { required: true, message: '必填项', trigger: 'blur' ,type:'number'}
//                        ]},
//                	 { field: 'embeInteUpRatio', label: '挪用罚息浮动比例', type:'num', formatter: yufp.util.toPercent,
//			           		rules: [
//	                            { required: true, message: '必填项', trigger: 'blur' ,type:'number'}
//	                        ]},
//                	
//                	 { field: 'wheAgr', label: '是否涉农', type: 'radio', dataCode: 'STD_ZX_YES_NO', 
//            			rules: [
//            				{ required: true, message: '必填项', trigger: 'blur' }
//            				]},
        					{ field: 'effictiveDate', label: '生效日期', type: 'date',
                       		 rules: [
                    				{ required: true, message: '请选择生效日期', trigger: 'blur', type:'date' },
                    				{ validator: function(rule, value, callback){
                     					var expiryDate = _self.$refs.reform.formModel.expiryDate;
                     					var openday = new Date(yufp.session.OPENDAY);
                     					if(expiryDate!='' && value >= expiryDate){
                     						callback(new Error("生效日期须早于失效日期"));
                     						_self.$refs.reform.formModel.effictiveDate = '';
                     					}else if(value <= openday){
                     						callback(new Error("生效日期须晚于营业日期"));
                     						_self.$refs.reform.formModel.effictiveDate = '';
                     					}else{
                     						callback();
                     					}
                     				}}
                				]},
                       	 { field: 'expiryDate', label: '失效日期', type: 'date',
                       		 rules: [
                    				{ required: true, message: '请选择失效日期', trigger: 'blur' , type:'date'},
                    				{ validator: function(rule, value, callback){
                     					var effictiveDate = _self.$refs.reform.formModel.effictiveDate;
                     					if(effictiveDate!='' && value <= effictiveDate){
                     						callback(new Error("失效日期须晚于生效日期"));
                     						_self.$refs.reform.formModel.expiryDate = '';
                     					}else{
                     						callback();
                     					}
                     				}}
                				]}
              ]
            },
            {
            	columnCount: 1,
                fields: [
//                	 { field: 'guarWay', label: '担保方式', type: 'radio', dataCode: 'STD_ZB_ASSURE_MEANS',
//	               		 rules: [
//	                            { required: true, message: '必填项', trigger: 'blur' }
//	                        ]},
//                	 { field: 'loanUseGenere', label: '贷款用途类型', hidden:true},
//  	                 { field: 'loanUseType', label: '贷款用途种类', type: 'checkbox', dataCode: 'LOAN_USE_TYPE', 
//    	          		 rules: [
//    	                       { required: true, message: '必填项', trigger: 'blur' , type: 'array'}
//    	                   ]},
	                 { field: 'remark', label: '描述', type: 'textarea', 
	                	   rules: [
	                		 { required: true, message: '必填项', trigger: 'blur' },
	                         { max: 1000, message: '长度不能超过1000', trigget: 'blur'}
	                         ]}
                	]
                	
            },
            {
            	columnCount: 3,
                fields: [
	               	 { field: 'aprvStatus', label: '审核状态', disabled:true, type: 'select', dataCode:'APRV_STATUS' },
	            	 { field: 'caseStatus', label: '专案状态', disabled:true, type: 'select', dataCode:'CASE_STATUS'},
	            	 { field: 'legalOrgCode', label: '机构', disabled:true},
	            	 { field: 'orgCode', label: '创建机构', disabled:true, value: yufp.session.org.orgCode, hidden: true},
	            	 { field: 'createTime', label: '创建日期', disabled:true},
	            	 { field: 'createUser', label: '创建人', disabled:true},
	            	 { field: 'createUserName', label: '创建人名称', disabled:true},
	            	 { field: 'lastUpdateUser', label: '最后修改人', disabled:true},
	            	 { field: 'lastUpdateTime', label: '最后修改日期', disabled:true},
	            	 { field: 'applyUserCode', label: '申请人', hidden: true},
                	 { field: 'applyDate', label: '申请日期', hidden: true}
                	]
            }],
            updateButtons: [
              { label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                  _self.dialogVisible = false;
                } },
              { label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
            	  
              } }
            ],
            height: yufp.frame.size().height - 103,
            dialogVisible: false,
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
            // _self.updateButtons[0].hidden = !editable;
            _self.updateButtons[1].hidden = !editable;
            _self.formDisabled = !editable;
            _self.dialogVisible = true;
          },
          addFn: function () {
            var _self = this;
            _self.switchStatus('ADD', true);
            _self.$nextTick(function () {
            	_self.$refs.reform.switch('caseCode','hidden',true);
            	_self.$refs.reform.resetFn();
            });
          },
          modifyFn: function () {
        	  var _self = this;
            if (this.$refs.reftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            var selections = this.$refs.reftable.selections;
            var aprvStatus = selections[0].aprvStatus;
        	if(aprvStatus!='01'){
        		this.$message({ message: '审核状态为[待发起]才能修改', type: 'warning' });
        		return;
        	}
            this.switchStatus('EDIT', true);
            this.$nextTick(function () {
            	var obj = this.$refs.reftable.selections[0];
            	var loanUseType = '';//贷款用途
            	var repayDay = '';//还款日
            	var inteDay = '';//结息日
            	var overdueInteUpRat = '';//逾期罚息浮动比例
            	var embeInteUpRatio = '';//挪用罚息浮动比例
            	var effictiveDate = '';//生效日期
            	var expiryDate = '';//失效日期
            	
            	if(obj.loanUseType!=null && obj.loanUseType!=''){
            		loanUseType = obj.loanUseType.split(',');//贷款用途转为数组
            	}
            	if(obj.repayDay!=null && obj.repayDay!=''){
            		repayDay = parseInt(obj.repayDay);
            	}
            	if(obj.inteDay!=null && obj.inteDay!=''){
            		inteDay = parseInt(obj.inteDay);
            	}
            	if(obj.overdueInteUpRat!=null && obj.overdueInteUpRat!=''){
            		overdueInteUpRat = parseFloat((obj.overdueInteUpRat + ''))*100 + '%';
            	}
            	if(obj.embeInteUpRatio!=null && obj.embeInteUpRatio!=''){
            		embeInteUpRatio = parseFloat((obj.embeInteUpRatio + ''))*100 + '%';
            	}
            	if(obj.effictiveDate!=null && obj.effictiveDate!=''){
            		effictiveDate = new Date(obj.effictiveDate);
            	}
            	if(obj.expiryDate!=null && obj.expiryDate!=''){
            		expiryDate = new Date(obj.expiryDate);
            	}
    	
                yufp.extend(this.$refs.reform.formModel, obj, 
                		{ loanUseType: loanUseType,
                	      repayDay: repayDay, 
                	      inteDay: inteDay,
                	      overdueInteUpRat: overdueInteUpRat,
                	      embeInteUpRatio: embeInteUpRatio,
                	      effictiveDate: effictiveDate,
                	      expiryDate: expiryDate});
            });
          },
          infoFn: function () {
        	var _self = this;
            if (this.$refs.reftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            this.switchStatus('DETAIL', false);
            this.$nextTick(function () {
            	var obj = this.$refs.reftable.selections[0];
            	var loanUseType = '';
            	var overdueInteUpRat = '';//逾期罚息浮动比例
            	var embeInteUpRatio = '';//挪用罚息浮动比例
            	if(obj.loanUseType!=null && obj.loanUseType!=''){
            		loanUseType = obj.loanUseType.split(',');//贷款用途转为数组
            	}
            	if(obj.overdueInteUpRat!=null && obj.overdueInteUpRat!=''){
            		overdueInteUpRat = parseFloat((obj.overdueInteUpRat + ''))*100 + '%';
            	}
            	if(obj.embeInteUpRatio!=null && obj.embeInteUpRatio!=''){
            		embeInteUpRatio = parseFloat((obj.embeInteUpRatio + ''))*100 + '%';
            	}
            	_self.$refs.reform.switch('prdId','hidden',true);
            	yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0], { loanUseType: loanUseType},{overdueInteUpRat: overdueInteUpRat},{embeInteUpRatio: embeInteUpRatio});
            });
          },
          deleteFn: function () {
            var _self = this;
            var selections = _self.$refs.reftable.selections;
            if (selections.length < 1) {
              _self.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            var aprvStatus = selections[0].aprvStatus;
        	if(aprvStatus!='01'){
        		_self.$message({ message: '审核状态为[待发起]才能删除', type: 'warning' });
        		return;
        	}else{
        		_self.$confirm('是否删除?','提示',{type:'warning'}).then(function(){
        			var len = selections.length, arr = [];
                    for (var i = 0; i < len; i++) {
                      arr.push(selections[i].caseCode);
                    }
                    
                    yufp.service.request({
                      method: 'DELETE',
                      url: backend.consoleService + '/api/prd/case/manage',
                      data: {
                      	caseCode: arr.join(',')
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
        		}).catch(function(){});
        	}
            
          },
          saveForm: function() {
        	  var _self = this;
              var validate = false;
              _self.$refs.reform.validate(function (valid) {
                validate = valid;
              });
              if (!validate) {
                return;
              }
              var base = _self.$refs.reform;
              var comitData = {};
              yufp.extend(comitData, base.formModel);
//              if(comitData.loanUseType) {
//            	  comitData.loanUseType = comitData.loanUseType.join(',');
//              }
//              //逾期罚息浮动比例
//              if(comitData.overdueInteUpRat){
//            	  var overdueInteUpRat = comitData.overdueInteUpRat
//            	  overdueInteUpRat = parseFloat(overdueInteUpRat)/100;
//            	  comitData.overdueInteUpRat = overdueInteUpRat;
//              }
//              //挪用罚息浮动比例
//              if(comitData.embeInteUpRatio){
//            	  var embeInteUpRatio = comitData.embeInteUpRatio
//            	  embeInteUpRatio = parseFloat(embeInteUpRatio)/100;
//            	  comitData.embeInteUpRatio = embeInteUpRatio;
//              }
              
              var rMethod = '';
				if(_self.viewType == "EDIT") {
					rMethod = 'PUT';
				} else if(_self.viewType == "ADD") {
					rMethod = 'POST';
				}
              yufp.service.request({
                method: rMethod,
                url: backend.consoleService + '/api/prd/case/manage',
                data: comitData,
                callback: function (code, message, response) {
                  if (code == 0) {
                    var responseCode = response.code;
					 if(responseCode == 0){
						 _self.$refs.reftable.remoteData();
						 _self.$message('操作成功');
						 _self.dialogVisible = false;
					 }else{
						 _self.$message(response.message);
					 }
                  } else {
                  	_self.$message('操作失败');
                  }
                }
              });
          },
          submitForm: function() {
        	  var _self = this;
              var validate = false;
              _self.$refs.reform.validate(function (valid) {
                validate = valid;
              });
              if (!validate) {
                return;
              }
              var base = _self.$refs.reform;
              var comitData = {};
              yufp.extend(comitData, base.formModel);
              if(comitData.loanUseType) {
            	  comitData.loanUseType = comitData.loanUseType.join(',');
              }
              //逾期罚息浮动比例
              if(comitData.overdueInteUpRat){
            	  var overdueInteUpRat = comitData.overdueInteUpRat
            	  overdueInteUpRat = parseFloat(overdueInteUpRat)/100;
            	  comitData.overdueInteUpRat = overdueInteUpRat;
              }
              //挪用罚息浮动比例
              if(comitData.embeInteUpRatio){
            	  var embeInteUpRatio = comitData.embeInteUpRatio
            	  embeInteUpRatio = parseFloat(embeInteUpRatio)/100;
            	  comitData.embeInteUpRatio = embeInteUpRatio;
              }
              var rMethod = 'POST';
              yufp.service.request({
                method: rMethod,
                url: backend.consoleService + '/api/prd/case/submitManage',
                data: comitData,
                callback: function (code, message, response) {
                  if (code == 0) {
                    var responseCode = response.code;
					 if(responseCode == 0){
						 _self.$refs.reftable.remoteData();
						 _self.$message('操作成功');
						 _self.dialogVisible = false;
					 }else{
						 if(responseCode == -2){
							_self.$message(response.message);
							_self.$refs.reftable.remoteData();
							_self.dialogVisible = false;
						 }else{
						    _self.$message(response.message);
						 }
					 }
                  } else {
                  	_self.$message('操作失败');
                  }
                }
              });
          },
          stopFn: function () {
  	        var _self = this;
  	        var selections = _self.$refs.reftable.selections;
  	        if (selections.length < 1) {
  	          _self.$message({ message: '请先选择一条记录', type: 'warning' });
  	          return;
  	        }else{
  	        	var caseStatus = selections[0].caseStatus;
  	        	var aprvStatus = selections[0].aprvStatus;
  	        	if(caseStatus=='02' || (caseStatus=='01' && aprvStatus=='03')){
  	        		_self.$confirm('是否确认停用?','提示',{type:'warning'}).then(function(){
  	        			var len = selections.length, arr = [];
  	        	        for (var i = 0; i < len; i++) {
  	        	          arr.push(selections[i].caseCode);
  	        	        }
  	        	        yufp.service.request({
  	        	          method: 'PUT',
  	        	          url: backend.consoleService + '/api/prd/case/stopCase',
  	        	          data: {
  	        	        	  caseCode: arr.join(',')
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
  	        		}).catch(function(){});
  	        	}else{
  	        		_self.$message({ message: '该专案状态不支持停用', type: 'warning' });
  	        		return;
  	        	}
  	        }
          },
          closeForm: function(){
        	  var _self = this;
        	  _self.dialogVisible = false;
          },
          setValues: function(value, model, args){
        	 model.prdName = args[1].prdName;
        	 model.prdId = args[1].prdId;
         	 model.prdDesc = args[1].prdDesc;
//         	 model.currencyOpt = args[1].currencyOpt;
//         	 model.crdAprvMinAmt = args[1].crdAprvMinAmt;
//         	 model.crdAprvMaxAmt = args[1].crdAprvMaxAmt;
//         	 model.loanAppMinAmt = args[1].loanAppMinAmt;
//         	 model.loanAppMaxAmt = args[1].loanAppMaxAmt;
//         	 model.cyclicWay = args[1].cyclicWay;
         	 model.repayWay = args[1].repayWay;
//         	 model.repayCycle = args[1].repayCycle;
//         	 model.repayCycleType = args[1].repayCycleType;
//         	 model.inteDay = args[1].inteDay;
//         	 model.repayDay = args[1].repayDay;
//         	 model.overdueDefInte = args[1].overdueDefInte;
//         	 model.overdueInteUpRat = args[1].overdueInteUpRat;
//         	 model.embeDefInte = args[1].embeDefInte;
//         	 model.embeInteUpRatio = args[1].embeInteUpRatio;
//         	 model.loanUseGenere = args[1].loanUseGenere;
//         	 model.wheAgr = args[1].wheAgr;
//         	 model.guarWay = args[1].guarWay;
         	 model.rateSchemeId = args[1].rateSchemeId;
         	 model.rateSchemeName = args[1].rateSchemeName;
//         	 var loanUseType = '';//贷款用途
//         	 var repayDay = '';//还款日
//          	 var inteDay = '';//结息日
//          	 var overdueInteUpRat = '';//逾期罚息浮动比例
//         	 var embeInteUpRatio = '';//挪用罚息浮动比例
//         	 if(args[1].loanUseType!=null && args[1].loanUseType!=''){
//         		 loanUseType = args[1].loanUseType.split(',');//贷款用途转为数组
//         	 }
//         	 if(args[1].repayDay!=null && args[1].repayDay!=''){
//          		repayDay = parseInt(args[1].repayDay);
//          	}
//          	if(args[1].inteDay!=null && args[1].inteDay!=''){
//          		inteDay = parseInt(args[1].inteDay);
//          	}
//          	if(args[1].overdueInteUpRat!=null && args[1].overdueInteUpRat!=''){
//        		overdueInteUpRat = yufp.util.toPercent((parseFloat(args[1].overdueInteUpRat,4) * 10000)/100);
//        	}
//        	if(args[1].embeInteUpRatio!=null && args[1].embeInteUpRatio!=''){
//        		embeInteUpRatio = yufp.util.toPercent((parseFloat(args[1].embeInteUpRatio,4) * 10000)/100);
//        	}
//         	 model.loanUseType = loanUseType;
//         	 model.repayDay = repayDay;
//         	 model.inteDay = inteDay;
//         	 model.overdueInteUpRat = overdueInteUpRat;
//         	 model.embeInteUpRatio = embeInteUpRatio;
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
