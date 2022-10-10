/**
 * @create by fuzm on 2018-05-03
 * @description 产品审批信息表
 */
define(['./custom/widgets/js/ContTempGSelector.js',
		'./custom/widgets/js/RateSchemeSelecter.js',
		'./custom/widgets/js/TelVerifGrpSelector.js',
		'./custom/widgets/js/BizFlowInfoSelector.js',
		'./custom/widgets/js/LegalOrgSelector.js',
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
        	dataUrl: backend.consoleService + '/api/prd/info/applys',
        	expandCollapseName: ['base','loan','other'],
            baseParams: {
            },
            queryFields: [
            { placeholder: '申请流水号', field: 'bizSerno', type: 'input' },
            { placeholder: '产品号', field: 'prdCode', type: 'input' },
            { placeholder: '产品名称', field: 'prdName', type: 'input' },
            { placeholder: '产品类型', field: 'prdThlDri', type: 'select' , dataCode:'PRD_THL_DRI' },
            { placeholder: '审核状态', field: 'aprvStatus', type: 'select', dataCode:'APRV_STATUS' },
            { placeholder: '机构', field: 'legalOrgCode', type: 'custom',is:'div-degal-org-selector'}
            ],
            queryButtons: [
              { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                  if (valid) {
                    _self.$refs.reftable.remoteData(model);
//                    var tempUrl = backend.consoleService +'/api/prd/info/applys?1=1';
//                    if (model.bizSerno != null && model.bizSerno.length != 0)
//                        tempUrl += '&bizSerno=' + model.bizSerno;
//                    if (model.prdCode != null && model.prdCode.length != 0)
//                        tempUrl += '&prdCode=' + model.prdCode;
//                    if (model.prdName != null && model.prdName.length != 0)
//                        tempUrl += '&prdName=' + model.prdName;
//                    if (model.prdThlDri != null && model.prdThlDri.length != 0)
//                        tempUrl += '&prdThlDri=' + model.prdThlDri;
//                    if (model.aprvStatus != null && model.aprvStatus.length != 0)
//                        tempUrl += '&aprvStatus=' + model.aprvStatus;
//                    _self.dataUrl = tempUrl;
//                    _self.$refs.reftable.remoteData();
                  }
                } },
              { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
            ],
  
            tableColumns: [
            { label: '申请流水号', prop: 'bizSerno', sortable: true, resizable: true },
            { label: '产品号', prop: 'prdCode', sortable: true, resizable: true },
            { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
            { label: '产品类型', prop: 'prdThlDri', sortable: true, resizable: true , dataCode:'PRD_THL_DRI' },
            { label: '审核状态', prop: 'aprvStatus', sortable: true, resizable: true , dataCode:'APRV_STATUS'},
            { label: '创建人', prop: 'createUser', sortable: true, resizable: true},
          	{ label: '创建日期', prop: 'createTime', sortable: true, resizable: true},
          	{ label: '审批日期', prop: 'aprvDate', sortable: true, resizable: true},
            { label: '机构代码', prop: 'legalOrgCode', sortable: true, resizable: true, hidden:true},
            { label: '机构', prop: 'legalOrgCodeName', sortable: true, resizable: true }
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
	               	 { field: 'currencyOpt', label: '币种', type: 'select', dataCode: 'STD_ZX_CUR_TYPE', disabled: true,
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
                			{ required: true, message: '必填项', trigger: 'blur' },
                            { max: 1000, message: '长度不能超过1000', trigget: 'blur'}
                        ]},
                	{ field: 'reqDesc', label: '产品申请变更描述', hidden:true},
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
                     { field: 'repayDayType', label: '还款日类型', type: 'select', dataCode:'REPAY_DAY_TYPE',disabled:true,
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
		           	 { field: 'overdueInteUpRat', label: '逾期罚息浮动比例', type:'num', formatter: yufp.util.toPercent, disabled:true,
		           		rules: [
                            { required: true, message: '必填项', trigger: 'blur' ,type:'number'},
                            { validator: function(rule, value, callback){
                            	if(value<0){
                      	          callback(new Error("不小于0"));
                      	        }else{
                      	        	callback();
                      	        }
                            }}
                        ]},
		           	 { field: 'embeDefInte', label: '挪用罚息', value:"02", hidden:true},
		           	 { field: 'embeInteUpRatio', label: '挪用罚息浮动比例', type:'num', formatter: yufp.util.toPercent, disabled:true,
			           		rules: [
	                            { required: true, message: '必填项', trigger: 'blur' ,type:'number'}
	                        ]},
                    { field: 'allowAmount', label: '是否允许提额', type: 'radio', dataCode: 'STD_ZX_YES_NO', hidden:true, value:"2"},
            		{ field: 'wheAgr', label: '是否涉农', type: 'radio', dataCode: 'STD_ZX_YES_NO', hidden:true},
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
	           	 { field: 'loanUseType', label: '贷款用途种类', type: 'checkbox', dataCode: 'LOAN_USE_TYPE', 
	          		 rules: [
	                       { required: true, message: '必填项', trigger: 'blur' , type: 'array'}
	                   ]}
            	 ]
            },{
            	columnCount: 3,
            	fields: [
            		{ field: 'loanUseGenere', label: '贷款用途类型', value:"1", hidden:false, disabled: true, type: 'select', dataCode: 'LOAN_USE_GENERE'}
            	]
            }],
            otherFields: [{
            	columnCount: 3,
                fields: [
                	 { field: 'contTemplateId', label: '合同模板', type: 'custom',is:'div-cont-temp-g-selector'
                         ,clickFn: function (value, model, args) {
                         }
                         ,selectFn:function(value, model, args){
                        	 //_self.$refs.otherRef.formModel.contTemplateId = args[1].contGroupId;
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
                        	 //_self.$refs.otherRef.formModel.eleNucFormId = args[1].tplGrpId;
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
                        	 //_self.$refs.otherRef.formModel.rateSchemeId = args[1].schemeNo;
                        	 _self.$refs.otherRef.formModel.rateSchemeName = args[1].schemeName;
                         },
                         rules: [
	                            { required: true, message: '必填项', trigger: 'blur' }
	                        ]},
                    { field: 'rateSchemeName', label: '利率方案', hidden:true}
                ]},{
            	columnCount: 3,
                fields: [
            	 { field: 'crdApprFlowId', label: '业务流程', type: 'custom',is:'div-biz-flow-info-selector',params:{bizFlowType: '02'},
            		 clickFn: function (value, model, args) {
                     }
                     ,selectFn:function(value, model, args){
                    	 _self.$refs.otherRef.formModel.crdApprFlowId = args[1].bizFlowId;
                    	 _self.$refs.otherRef.formModel.crdApprFlowName = args[1].bizFlowName;
                     },
                     rules: [
                         { required: true, message: '必填项', trigger: 'blur' }
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
               	 { field: 'createTime', label: '创建日期', disabled:true},
               	 { field: 'createUser', label: '创建人', disabled:true},
               	 { field: 'legalOrgCode', label: '机构代码', disabled:true},
               	 { field: 'legalOrgCodeName', label: '机构', disabled:true},
               	 { field: 'lastUpdateUser', label: '最后修改人', disabled:true},
               	 { field: 'lastUpdateTime', label: '最后修改日期', disabled:true},
               	 { field: 'aprvUser', label: '审批人员', disabled:true},
               	 { field: 'aprvDate', label: '审批日期', disabled:true},
               	 { field: 'lmtTermUnit', label: '额度期限单位', hidden:true},
               	 { field: 'reqType', label: '请求类型', value: "01", hidden:true},
               	 { field: 'prdFilDir', label: '产品一级目录', value:"02",hidden:true},
               	 { field: 'prdSelDir', label: '产品二级目录', value:"03",hidden:true},
	           	 { field: 'lmtTerm', label: '额度期限值', hidden:true}
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
            viewTitle: yufp.lookup.find('CRUD_TYPE', false),
            
            exportData: {}
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
            
//            if(editable) {
//            	_self.baseFields[0].fields[0].hidden = true;
//            	_self.baseFields[0].fields[1].hidden = true;
//            	_self.baseFields[0].fields[2].hidden = true;
//            } else {
//            	_self.baseFields[0].fields[0].hidden = false;
//            	_self.baseFields[0].fields[1].hidden = false;
//            	_self.baseFields[0].fields[2].hidden = false;
//            }
          },
          addFn: function () {
            var _self = this;
            _self.switchStatus('ADD', true);
            _self.$nextTick(function () {
            	_self.$refs.baseRef.resetFn();
            	_self.$refs.loanRef.resetFn();
            	_self.$refs.otherRef.resetFn();
            	_self.$refs.baseRef.switch('bizSerno','hidden',true);
            	_self.$refs.baseRef.switch('prdId','hidden',true);
            	_self.$refs.baseRef.switch('prdCode','hidden',true);
            	_self.$refs.otherRef.switch('aprvUser','hidden',true);
            	_self.$refs.otherRef.switch('aprvDate','hidden',true);
            	_self.$refs.otherRef.switch('createTime','hidden',true);
            	_self.$refs.otherRef.switch('createUser','hidden',true);
            	_self.$refs.otherRef.switch('legalOrgCode','hidden',true);
            	_self.$refs.otherRef.switch('legalOrgCodeName','hidden',true);
            	_self.$refs.otherRef.switch('lastUpdateUser','hidden',true);
            	_self.$refs.otherRef.switch('lastUpdateTime','hidden',true);
            	var overdueInteUpRat = (parseFloat(0.5,4) * 10000)/100;//逾期罚息浮动比例
            	var embeInteUpRatio = (parseFloat(1.0,4) * 10000)/100;//挪用罚息浮动比例
            	yufp.util.copyObj(_self.$refs.baseRef.formModel,{currencyOpt:'CNY'});
            	yufp.util.copyObj(_self.$refs.loanRef.formModel,{overdueInteUpRat:overdueInteUpRat,embeInteUpRatio:embeInteUpRatio,repayDayType:'01',repayDay:parseInt('21'),inteDay:parseInt('20')});
            	
            	_self.exportData = {};
            	_self.openPrdRule();
            	//清空业务流程
            	this.$refs.otherRef.switch('crdApprFlowId','rawValue', "");
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
            	_self.$refs.otherRef.switch('aprvUser','hidden',true);
            	_self.$refs.otherRef.switch('aprvDate','hidden',true);
            	_self.$refs.otherRef.switch('createTime','hidden',false);
            	_self.$refs.otherRef.switch('createUser','hidden',false);
            	_self.$refs.otherRef.switch('legalOrgCode','hidden',false);
            	_self.$refs.otherRef.switch('legalOrgCodeName','hidden',false);
            	_self.$refs.otherRef.switch('lastUpdateUser','hidden',false);
            	_self.$refs.otherRef.switch('lastUpdateTime','hidden',false);
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
            	
            	_self.$refs.otherRef.switch('crdApprFlowId','rawValue', _self.$refs.otherRef.formModel.crdApprFlowName);

//            	yufp.extend(this.$refs.baseRef.formModel, obj);
//            	yufp.extend(this.$refs.loanRef.formModel, obj);
//            	yufp.extend(this.$refs.otherRef.formModel, obj);
            	
            	_self.exportData.bizSerno = obj.bizSerno;
            	_self.openPrdRule();
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
            	_self.$refs.baseRef.switch('bizSerno','hidden',false);
            	_self.$refs.baseRef.switch('prdId','hidden',false);
            	_self.$refs.baseRef.switch('prdCode','hidden',false);
            	_self.$refs.otherRef.switch('aprvUser','hidden',false);
            	_self.$refs.otherRef.switch('aprvDate','hidden',false);
            	_self.$refs.otherRef.switch('createTime','hidden',false);
            	_self.$refs.otherRef.switch('createUser','hidden',false);
            	_self.$refs.otherRef.switch('legalOrgCode','hidden',false);
            	_self.$refs.otherRef.switch('legalOrgCodeName','hidden',false);
            	_self.$refs.otherRef.switch('lastUpdateUser','hidden',false);
            	_self.$refs.otherRef.switch('lastUpdateTime','hidden',false);
            	var obj = this.$refs.reftable.selections[0];
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
             	
             	_self.exportData.bizSerno = obj.bizSerno;
                _self.openPrdRule();
            });
          },
          deleteFn: function () {
            var _self = this;
            var selections = _self.$refs.reftable.selections;
            if (selections.length < 1) {
              _self.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }else{
            	var aprvStatus = selections[0].aprvStatus;
            	if(aprvStatus!='01'){
	        		_self.$message({ message: '审核状态为[待发起]才能删除', type: 'warning' });
	        		return;
	        	}else{
	        		_self.$confirm('是否删除?','提示',{type:'warning'}).then(function(){
	        			var len = selections.length, arr = [];
	                    for (var i = 0; i < len; i++) {
	                      arr.push(selections[i].bizSerno);
	                    }
	                    
	                    yufp.service.request({
	                      method: 'DELETE',
	                      url: backend.consoleService + '/api/prd/info/apply',
	                      data: {
	                      	bizSerno: arr.join(',')
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
            }
            
          },
          copyFn: function () {
              var _self = this;
              var selections = _self.$refs.reftable.selections;
              if (selections.length < 1) {
                _self.$message({ message: '请先选择一条记录', type: 'warning' });
                return;
              }else{
            	  _self.$confirm('是否复制该产品?','提示',{type:'warning'}).then(function(){
	        			var len = selections.length, arr = [];
	                    for (var i = 0; i < len; i++) {
	                      arr.push(selections[i].bizSerno);
	                    }
	                    
	                    yufp.service.request({
	                      method: 'PUT',
	                      url: backend.consoleService + '/api/prd/info/apply/copy',
	                      data: {
	                      	bizSerno: arr.join(',')
	                      },
	                      callback: function (code, message, response) {
	                        if (code == 0 && response.code == 0) {
	                          _self.$refs.reftable.remoteData();
	                          _self.$message('复制产品成功');
	                        } else {
	                        	_self.$message('操作失败');
	                        }
	                      }
	                    });
            	  }).catch(function(){});
              }
              
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
          openPrdRule: function() {
          	this.exportData.formDisabled = this.formDisabled;
            yufp.router.to("CONSOLE_PrdApplyRule", this.exportData, "prdRule");
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
	  				
	  				//获取规则信息
	  				comitData.ruleData = _self.exportData.getRuleData();
	  				
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
                  
                  //获取规则信息
                  comitData.ruleData = _self.exportData.getRuleData();
                    
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
