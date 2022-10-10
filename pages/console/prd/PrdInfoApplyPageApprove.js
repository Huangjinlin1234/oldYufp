/**
 * @create by fuzm on 2018-05-03
 * @description 产品审批信息表
 */
define(['./custom/widgets/js/ContTempGSelector.js',
		'./custom/widgets/js/RateSchemeSelecter.js',
		'./custom/widgets/js/TelVerifGrpSelector.js',
		'./custom/widgets/js/BizFlowInfoSelector.js',
		'./custom/widgets/js/RuleCollSelector.js'
	   ],
		function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
    	yufp.lookup.reg('CRUD_TYPE,STD_ZX_CUR_TYPE,PRD_THL_DRI,STD_ZX_YES_NO,STD_ZB_TERM_TYPE,STD_PRD_REPAY_MODE,STD_ZB_ASSURE_MEANS,LOAN_USE_TYPE,ENTER_CHANNEL,STD_ZB_IREXE_TYPE,REPAY_CYCLE,APRV_STATUS,REPAY_DAY_TYPE,STD_ZB_REPAY_FREQ');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
          	valiPagePluginData: false,
        	dataUrl: backend.consoleService + '/api/prd/info/applys',
        	expandCollapseName: ['base','loan','other'],
            baseParams: {
            },
            queryFields: [
            { placeholder: '申请流水号', field: 'bizSerno', type: 'input' },
            { placeholder: '产品号', field: 'prdCode', type: 'input' },
            { placeholder: '产品名称', field: 'prdName', type: 'input' },
            { placeholder: '产品类型', field: 'prdThlDri', type: 'select' , dataCode:'PRD_THL_DRI' },
            { placeholder: '审核状态', field: 'aprvStatus', type: 'select', dataCode:'APRV_STATUS'}
            ],
  
            baseFields: [{
                columnCount: 3,
                fields: [
                	 { field: 'bizSerno', label: '申请流水号', hidden:false,disabled:true},
	               	 { field: 'prdId', label: '产品ID', hidden:false,disabled:true},
	               	 { field: 'prdCode', label: '产品号', hidden:false,disabled:true},
	               	 { field: 'prdName', label: '产品名称',
	               		 rules: [
	                            { required: true, message: '必填项', trigger: 'blur' },
	                            { max: 60, message: '长度不能超过60', trigget: 'blur'}
	                        ]},
	                    { field: 'prdThlDri', label: '产品类型', type: 'select', dataCode: 'PRD_THL_DRI',  
	                   	 rules: [
	                            { required: true, message: '必填项', trigger: 'blur' }
	                        ]},
	               	 { field: 'prdCoefficient', label: '产品系数', type:'num', hidden:true},
	               	 { field: 'currencyOpt', label: '币种', type: 'select', dataCode: 'STD_ZX_CUR_TYPE', 
	               		 rules: [
	                            { required: true, message: '必填项', trigger: 'blur' }
	                        ]},
                    { field: 'limitAmt', label: '产品限额(万元)', type:'num', digit:2, formatter: yufp.util.moneyFormatter,
                      rules: [
                          { validator: function(rule, value, callback){
                          	if(value && value<=0){
                          		callback(new Error("大于0"));
                          	}else{
                          		callback();
                          	}
                          }}
                          ]
                    }
	                ]
            },{
            	columnCount: 2,
                fields: [
                	{ field: 'prdDesc', label: '产品描述', type: 'textarea',
                		rules: [
                            { max: 1000, message: '长度不能超过1000', trigget: 'blur'}
                        ]}
                ]
            },{
            	columnCount: 2,
                fields: [
                	{ field: 'reqDesc', label: '变更原因', type: 'textarea', hidden: true,
                		rules: [
                            { max: 500, message: '长度不能超过500', trigget: 'blur'}
                        ]}
                ]
            }],
            loanFields: [{
                columnCount: 3,
                fields: [
	            	 { field: 'crdAprvMinAmt', label: '单笔最小金额(含)(元)', type: 'num', digit:2, formatter: yufp.util.moneyFormatter,
	               		 rules: [
	                            { required: true, message: '必填项', trigger: 'blur', type: 'number'},
	                            { validator: function(rule, value, callback){
	                            	var crdAprvMaxAmt = _self.$refs.loanRef.formModel.crdAprvMaxAmt;
	                            	if(value<=0){
	                            		callback(new Error("大于0"));
	                            	}
	                            	if(crdAprvMaxAmt && crdAprvMaxAmt > value) {
	                            		callback();
	                            	} else if(crdAprvMaxAmt && crdAprvMaxAmt < value) {
	                            		callback(new Error("单笔最小金额不能大于单笔最高金额"));
	                            	} else {
	                            		callback();
	                            	}
	                            }}
	                        ]},
		           	 { field: 'crdAprvMaxAmt', label: '单笔最高金额(含)(元)', type: 'num', digit:2, formatter: yufp.util.moneyFormatter, 
	               		 rules: [
	                            { required: true, message: '必填项', trigger: 'blur' , type: 'number'},
	                            { validator: function(rule, value, callback){
	                            	var crdAprvMinAmt = _self.$refs.loanRef.formModel.crdAprvMinAmt;
	                            	if(crdAprvMinAmt && crdAprvMinAmt < value) {
	                            		callback();
	                            	} else if(crdAprvMinAmt && crdAprvMinAmt > value) {
	                            		callback(new Error("单笔最高金额不能小于单笔最小金额"));
	                            	} else {
	                            		callback();
	                            	}
	                            }}
	                        ]},
		           	 { field: 'loanAppMinAmt', label: '最小支用金额(含)(元)', type: 'num', digit:2, formatter: yufp.util.moneyFormatter, 
	               		 rules: [
	                            { required: true, message: '必填项', trigger: 'blur' , type: 'number'},
	                            { validator: function(rule, value, callback){
	                            	if(value<=0){
	                            		callback(new Error("大于0"));
	                            	}
	                            	var loanAppMaxAmt = _self.$refs.loanRef.formModel.loanAppMaxAmt;
	                            	if(loanAppMaxAmt && loanAppMaxAmt > value) {
	                            		callback();
	                            	} else if(loanAppMaxAmt && loanAppMaxAmt < value) {
	                            		callback(new Error("单笔最小金额不能大于单笔最高金额"));
	                            	} else {
	                            		callback();
	                            	}
	                            }}
	                        ]},
		           	 { field: 'loanAppMaxAmt', label: '最高支用金额(含)(元)', type: 'num', digit:2, formatter: yufp.util.moneyFormatter,
	               		 rules: [
	                            { required: true, message: '必填项', trigger: 'blur' , type: 'number'},
	                            { validator: function(rule, value, callback){
	                            	var loanAppMinAmt = _self.$refs.loanRef.formModel.loanAppMinAmt;
	                            	if(loanAppMinAmt && loanAppMinAmt < value) {
	                            		callback();
	                            	} else if(loanAppMinAmt && loanAppMinAmt > value) {
	                            		callback(new Error("单笔最高金额不能小于单笔最小金额"));
	                            	} else {
	                            		callback();
	                            	}
	                            }}
	                        ]},
		           	 { field: 'cyclicWay', label: '额度是否循环', type: 'radio', dataCode: 'STD_ZX_YES_NO', 
	               		 rules: [
	                            { required: true, message: '必填项', trigger: 'blur' }
	                        ]},
                     { field: 'creditTermUnit', label: '授信期限单位', type: 'select', dataCode: 'STD_ZB_TERM_TYPE', 
                    	rules: [
                    		{ required: true, message: '必填项', trigger: 'blur' }
                    		]},
		           	 { field: 'creditTerm', label: '授信期限值', type: 'num',
                    	rules: [
                                { required: true, message: '必填项', trigger: 'blur', type: 'number'}, 
                                { validator: yufp.validator.pInt},
                                { validator: function(rule, value, callback){
                                	if(value==0){
                                		callback(new Error("非0正整数"));
                                	}else{
                                		callback();
                                	}
	                            }}
	                        ]},
		           	 { field: 'repayWay', label: '还款方式', type: 'select', dataCode: 'STD_PRD_REPAY_MODE', 
	               		 rules: [
	                            { required: true, message: '必填项', trigger: 'blur' }
	                        ]},
                     { field: 'repayDayType', label: '还款日类型', type: 'select', dataCode:'REPAY_DAY_TYPE',
                    	 rules: [
                             { required: true, message: '必填项', trigger: 'blur' }
                         ]},
                     { field: 'repayDay', label: '还款日', type: 'num',
	               		 rules: [
	                            { required: true, message: '必填项', trigger: 'blur', type: 'number' },
	                            { validator: function(rule, value, callback){
	                            	if(value<1 || value>31){
	                      	          callback(new Error("请输入1-31之间的数字"));
	                      	        }else{
	                      	        	callback();
	                      	        }
	                            }}
	                        ]},
                    { field: 'inteDay', label: '结息日', type: 'num',
               		 rules: [
                            { required: true, message: '必填项', trigger: 'blur' , type: 'number'},
                            { validator: function(rule, value, callback){
                            	if(value<1 || value>31){
                      	          callback(new Error("请输入1-31之间的数字"));
                      	        }else{
                      	        	callback();
                      	        }
                            }}
                        ]},
		           	 { field: 'overdueDefInte', label: '逾期罚息', value:"02", hidden:true},
		           	 { field: 'overdueInteUpRat', label: '逾期罚息浮动比例', type:'num', formatter: yufp.util.toPercent,
		           		rules: [
                            { required: true, message: '必填项', trigger: 'blur' ,type:'number'}
                        ]},
		           	 { field: 'embeDefInte', label: '挪用罚息', value:"02", hidden:true},
		           	 { field: 'embeInteUpRatio', label: '挪用罚息浮动比例', type:'num', formatter: yufp.util.toPercent,
			           		rules: [
	                            { required: true, message: '必填项', trigger: 'blur' ,type:'number'}
	                        ]},
                    { field: 'allowAmount', label: '是否允许提额', type: 'radio', dataCode: 'STD_ZX_YES_NO', hidden:true, value:"2"},
            		{ field: 'wheAgr', label: '是否涉农', type: 'radio', dataCode: 'STD_ZX_YES_NO', hidden:true },
                     { field: 'isUpload', label: '是否上传凭证', type: 'radio', dataCode: 'STD_ZX_YES_NO', 
            			rules: [
            				{ required: true, message: '必填项', trigger: 'blur' }
            				]},
    				{ field: 'isAlongLoan', label: '是否随借随还', type: 'radio', dataCode: 'STD_ZX_YES_NO', 
            			rules: [
            				{ required: true, message: '必填项', trigger: 'blur' }
            				]},
		           	 { field: 'enterChannel', label: '进件渠道', value:"01", hidden:true },
		           	 { field: 'prdVersion', label: '版本号', hidden:true}
		           	 ]
            },{
            	columnCount: 1,
                fields: [
//                	{ field: 'rateAdjustType', label: '利率调整方式', type: 'radio', dataCode: 'STD_ZB_IREXE_TYPE', 
//	               		 rules: [
//	                            { required: true, message: '必填项', trigger: 'blur' }
//	                        ]},
		           	 { field: 'repayCycleType', label: '还款周期', type: 'radio', dataCode: 'STD_ZB_REPAY_FREQ', 
	               		 rules: [
	                            { required: true, message: '必填项', trigger: 'blur' }
	                        ]},
                   { field: 'repayCycle', label: '还款周期', hidden:true},
                	{ field: 'guarWay', label: '担保方式', type: 'radio', dataCode: 'STD_ZB_ASSURE_MEANS',
	               		 rules: [
	                            { required: true, message: '必填项', trigger: 'blur' }
	                        ]},
            	 { field: 'loanUseGenere', label: '贷款用途类型', value:"1", hidden:true },
	           	 { field: 'loanUseType', label: '贷款用途种类', type: 'checkbox', dataCode: 'LOAN_USE_TYPE', 
	          		 rules: [
	                       { required: true, message: '必填项', trigger: 'blur' , type: 'array'}
	                   ]}
            	 ]
            }],
            otherFields: [{
            	columnCount: 3,
                fields: [
                	 { field: 'contTemplateId', label: '合同模板', type: 'custom',is:'div-cont-temp-g-selector'
                         ,clickFn: function (value, model, args) {
                         }
                         ,selectFn:function(value, model, args){
//                        	 _self.$refs.otherRef.formModel.contTemplateId = args[1].contGroupId;
                        	 _self.$refs.otherRef.formModel.contTemplateName = args[1].contGroupName;
                         },
                         rules: [
	                            { required: true, message: '必填项', trigger: 'blur' }
	                        ]},
                     { field: 'contTemplateName', label: '合同模板', hidden:true},
                     { field: 'eleNucFormId', label: '电核表单', type: 'custom',is:'div-tel-verif-grp-selector'
                         ,clickFn: function (value, model, args) {
                         }
                         ,selectFn:function(value, model, args){
//                        	 _self.$refs.otherRef.formModel.eleNucFormId = args[1].tplGrpId;
                        	 _self.$refs.otherRef.formModel.eleNucFormName = args[1].tplGrpName;
                         },
                         rules: [
	                            { required: true, message: '必填项', trigger: 'blur' }
	                        ]},
                     { field: 'eleNucFormName', label: '电核表单', hidden:true},
		           	 { field: 'modContFormId', label: '提额合同模板', hidden:true},
		           	 { field: 'creditFormId', label: '授信表单', hidden:true },
		           	 { field: 'rateSchemeId', label: '利率方案', type: 'custom',is:'div-rate-scheme-selector'
                         ,clickFn: function (value, model, args) {
                         }
                         ,selectFn:function(value, model, args){
//                        	 _self.$refs.otherRef.formModel.rateSchemeId = args[1].schemeNo;
                        	 _self.$refs.otherRef.formModel.rateSchemeName = args[1].schemeName;
                         },
                         rules: [
	                            { required: true, message: '必填项', trigger: 'blur' }
	                        ]},
                    { field: 'rateSchemeName', label: '利率方案', hidden:true},
                ]},{
            	columnCount: 3,
                fields: [
               	{ field: 'crdApprFlowId', label: '业务流程', type: 'custom',is:'div-biz-flow-info-selector',
            		 clickFn: function (value, model, args) {
                     }
                     ,selectFn:function(value, model, args){
                    	 _self.$refs.otherRef.formModel.crdApprFlowId = args[1].bizFlowId;
                    	 _self.$refs.otherRef.formModel.crdApprFlowName = args[1].bizFlowName;
                     },
                     rules: [
                         { required: false, message: '必填项', trigger: 'blur' }
                     ]},
                 { field: 'crdApprFlowName', label: '业务流程', hidden:true},
               	 { field: 'amtApprFlowId', label: '提额流程', hidden:true },
   	           	 { field: 'crdMeaMedolId', label: '额度测算模型', type: 'custom',is:'div-rule-coll-selector',params:{ruleCollType: '04', status:'1'},
            		 clickFn: function (value, model, args) {
                     }
                     ,selectFn:function(value, model, args){
                    	 //_self.$refs.otherRef.formModel.crdMeaMedolId = args[1].ruleCollId;
                    	 _self.$refs.otherRef.formModel.crdMeaMedolName = args[1].ruleCollDesc;
                     },
                     rules: [
                         { required: true, message: '必填项', trigger: 'blur' }
                     ]},
                 { field: 'crdMeaMedolName', label: '额度测算模型', hidden:true},
	           	 { field: 'amtMeaMedolId', label: '提额测算模型', hidden:true },
               	 { field: 'aprvStatus', label: '审核状态', type: 'select', dataCode: 'APRV_STATUS', disabled:true},
               	 { field: 'currentAprvUser', label: '当前审核人员', disabled:true, hidden:true},
               	 { field: 'aprvUser', label: '审批人员', disabled:true},
               	 { field: 'aprvDate', label: '审批日期', disabled:true},
               	 { field: 'createTime', label: '创建日期', disabled:true},
               	 { field: 'createUser', label: '创建人', disabled:true},
               	 { field: 'legalOrgCode', label: '机构代码', disabled:true},
               	 { field: 'legalOrgCodeName', label: '机构', disabled:true},
               	 { field: 'lastUpdateUser', label: '最后修改人', disabled:true},
               	 { field: 'lastUpdateTime', label: '最后修改日期', disabled:true},
               	 { field: 'lmtTermUnit', label: '额度期限单位', hidden:true},
               	 { field: 'reqType', label: '请求类型', value: "01", hidden:true},
               	 { field: 'prdFilDir', label: '产品一级目录', value:"02",hidden:true},
               	 { field: 'prdSelDir', label: '产品二级目录', value:"03",hidden:true},
	           	 { field: 'lmtTerm', label: '额度期限值', hidden:true}
                ]
            }],
            height: yufp.frame.size().height - 103,
            dialogVisible: true,
            formDisabled: true,
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
          modifyFn: function () {
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
            	var dataObj = {};
            	var loanUseType = '';//贷款用途
            	var repayDay = '';//还款日
            	var inteDay = '';//结息日
            	var overdueInteUpRat = '';//逾期罚息浮动比例
            	var embeInteUpRatio = '';//挪用罚息浮动比例
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
            		overdueInteUpRat = (parseFloat(obj.overdueInteUpRat,4) * 10000)/100;
            	}
            	if(obj.embeInteUpRatio!=null && obj.embeInteUpRatio!=''){
            		embeInteUpRatio = (parseFloat(obj.embeInteUpRatio,4) * 10000)/100;
            	}
            	yufp.extend(dataObj, obj, { loanUseType: loanUseType},{repayDay: repayDay},{inteDay: inteDay},{overdueInteUpRat: overdueInteUpRat},{embeInteUpRatio: embeInteUpRatio});
    	
            	yufp.util.copyObj(this.$refs.baseRef.formModel, dataObj);
            	yufp.util.copyObj(this.$refs.loanRef.formModel, dataObj);
            	yufp.util.copyObj(this.$refs.otherRef.formModel, dataObj);

//            	yufp.extend(this.$refs.baseRef.formModel, obj);
//            	yufp.extend(this.$refs.loanRef.formModel, obj);
//            	yufp.extend(this.$refs.otherRef.formModel, obj);
            });
          },
          infoFn: function (obj) {
        	  var _self = this;
//            this.switchStatus('DETAIL', false);
            this.$nextTick(function () {
            	_self.$refs.baseRef.switch('bizSerno','hidden',false);
            	_self.$refs.baseRef.switch('prdId','hidden',false);
            	_self.$refs.baseRef.switch('prdCode','hidden',false);
            	var reqType = obj.reqType;
            	if(reqType=='02'){//变更
            		_self.$refs.baseRef.switch('reqDesc','hidden',false);
            		_self.$refs.baseRef.switch('reqDesc','label',"变更原因");
            	}else if(reqType=='03'){//下线
            		_self.$refs.baseRef.switch('reqDesc','hidden',false);
            		_self.$refs.baseRef.switch('reqDesc','label',"产品下线描述");
            	}else if(reqType=='04'){//停用
            		_self.$refs.baseRef.switch('reqDesc','hidden',false);
            		_self.$refs.baseRef.switch('reqDesc','label',"产品停用描述");
            	}
            	_self.$refs.baseRef.rebuildFn();	
            	var dataObj = {};
            	var loanUseType = '';
            	var overdueInteUpRat = '';//逾期罚息浮动比例
            	var embeInteUpRatio = '';//挪用罚息浮动比例
            	if(obj.loanUseType!=null && obj.loanUseType!=''){
            		loanUseType = obj.loanUseType.split(',');//贷款用途转为数组
            	}
            	if(obj.overdueInteUpRat!=null && obj.overdueInteUpRat!=''){
            		overdueInteUpRat = (parseFloat(obj.overdueInteUpRat,4) * 10000)/100;
            	}
            	if(obj.embeInteUpRatio!=null && obj.embeInteUpRatio!=''){
            		embeInteUpRatio = (parseFloat(obj.embeInteUpRatio,4) * 10000)/100;
            	}
            	yufp.extend(dataObj, obj, { loanUseType: loanUseType},{overdueInteUpRat: overdueInteUpRat},{embeInteUpRatio: embeInteUpRatio});
            	
//              yufp.extend(this.$refs.baseRef.formModel, dataObj);
//              yufp.extend(this.$refs.loanRef.formModel, dataObj);
//              yufp.extend(this.$refs.otherRef.formModel, dataObj);
            	yufp.util.copyObj(this.$refs.baseRef.formModel, dataObj);
             	yufp.util.copyObj(this.$refs.loanRef.formModel, dataObj);
             	yufp.util.copyObj(this.$refs.otherRef.formModel, dataObj);
             	
             	_self.$refs.otherRef.switch('crdApprFlowId','rawValue', _self.$refs.otherRef.formModel.crdApprFlowName);
             	
             	yufp.router.to("CONSOLE_PrdApplyRule", {bizSerno: obj.bizSerno, formDisabled: true}, "prdRule");
             	if(reqType=='02'){//变更
             		yufp.router.to("CONSOLE_PrdChangeRecord", {bizSerno: obj.bizSerno, formDisabled: true}, "prdChange");
             	}
            });
          },
          saveForm: function() {
              var _self = this;
              var base = _self.$refs.baseRef, family = _self.$refs.loanRef, other = _self.$refs.otherRef;
              var baseFlag = true;
              var familyFlag = true;
              var otherFlag = true;
              base.validate(function (valid) {
                  baseFlag = valid;
              });
              family.validate(function (valid) {
                  familyFlag = valid;
              });
              other.validate(function (valid) {
                  otherFlag = valid;
              });
              if (baseFlag && familyFlag && otherFlag){
                  var comitData = {};
                  yufp.extend(comitData, base.formModel);
                  yufp.extend(comitData, family.formModel);
                  yufp.extend(comitData, other.formModel);
                  
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
                  var rMethod = '';
	  				if(_self.viewType == "EDIT") {
	  					rMethod = 'PUT';
	  				} else if(_self.viewType == "ADD") {
	  					rMethod = 'POST';
	  				}
	  				
	  				yufp.service.request({
					    method: rMethod,
					    url: backend.consoleService + '/api/prd/info/apply',
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
              }  
          },
          submitForm: function() {
              var _self = this;
              var base = _self.$refs.baseRef, family = _self.$refs.loanRef, other = _self.$refs.otherRef;
              var baseFlag = true;
              var familyFlag = true;
              var otherFlag = true;
              base.validate(function (valid) {
                  baseFlag = valid;
              });
              family.validate(function (valid) {
                  familyFlag = valid;
              });
              other.validate(function (valid) {
                  otherFlag = valid;
              });
              if (baseFlag && familyFlag && otherFlag){
                  var comitData = {};
                  yufp.extend(comitData, base.formModel);
                  yufp.extend(comitData, family.formModel);
                  yufp.extend(comitData, other.formModel);
                  
                  if(comitData.loanUseType) {
                	  comitData.loanUseType = comitData.loanUseType.join(',');
                	  //if(comitData.loanUseType.indexOf(',')==0){
                		//  comitData.loanUseType = comitData.loanUseType.substr(1,comitData.loanUseType.length);
                	  //}
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
                	  
                  var rMethod = '';
//	  				if(_self.viewType == "EDIT") {
//	  					rMethod = 'PUT';
//	  				} else if(_self.viewType == "ADD") {
	  					rMethod = 'POST';
//	  				}
	  				
	  				yufp.service.request({
					    method: rMethod,
					    url: backend.consoleService + '/api/prd/info/submitApply',
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
              }  
          },
          resetForm: function() {
              this.$refs.baseRef.resetFields();
              this.$refs.loanRef.resetFields();
              this.$refs.otherRef.resetFields();
          },
          closeForm: function(){
        	  var _self = this;
        	  _self.dialogVisible = false;
          }
        },
        mounted: function(){
        	var param = data.datas[data.dataKey];
        	var url = backend.consoleService + '/api/prd/info/apply/' + param.bizSerno;
        	data.children = this;
        	this.valiPagePluginData = true;
        	var _self = this;
        	this.$nextTick(function() {
        		yufp.service.request({
				    method: 'POST',
				    url: url,
					callback: function (code, message, response) {
					  if (code == 0) {
						 var responseCode = response.code;
						 if(responseCode == 0){
							 var data = response.data;
							 _self.infoFn(data);
						 }else{
							 _self.$message(response.message);
						 }
					  } else 
					  	_self.$message('操作失败');
					  }
        		});
        		
        	});
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
