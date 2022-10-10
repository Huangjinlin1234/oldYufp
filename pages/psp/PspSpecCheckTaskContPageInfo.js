/**
 * @create by chenqm1 on 2018-05-03
 * @description 专项检查任务登记表
 */
define([
    './custom/widgets/js/YufpContSelector.js'
    ],function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,S_ZB_CHK_TYPE,SPEC_CHECK_STATUS,STD_ZB_ACC_STATUS,' +
        		'STD_ZX_YES_NO,STD_ZB_CERT_TYP,STD_ZB_ASSURE_MEANS,STD_ZB_CHK_STATE');
        yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
          	dataUrl:backend.pspService+'/api/psp/check/task/apps',
          	dataUrl1:backend.pspService+'/api/psp/bill/lists',
          	dataUrl2:backend.pspService+'/api/psp/warn/infos',
          	dataUrl3:backend.pspService+'/api/psp/guar/infos',
            baseParams: {
            	chkType:'01'
            },
            queryFields: [
            { placeholder: '检查任务号', field: 'bizSerno', type: 'input' },
            { placeholder: '检查名称', field: 'chkName', type: 'input' },
            { placeholder: '客户名称', field: 'cusName', type: 'input' },
            { placeholder: '客户号', field: 'cusId', type: 'input' },
            { placeholder: '证件号码', field: 'certCode', type: 'input' },
//            { placeholder: '检查任务类型', field: 'chkType', type: 'select' ,dataCode:'S_ZB_CHK_TYPE',hidden:true},
            { placeholder: '检查任务状态', field: 'chkState',  type: 'select' ,dataCode:'STD_ZB_CHK_STATE' },
            { placeholder: '任务创建人', field: 'createUser', type: 'input' },
            { placeholder: '任务创建时间', field: 'createTime', type: 'date' ,editable:false},
            { placeholder: '任务办理人', field: 'hdlNo', type: 'input' },
            { placeholder: '任务办理时间', field: 'hdlDate', type: 'date',editable:false}  
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
            { label: '检查任务号', prop: 'bizSerno', sortable: true, resizable: true },
            { label: '检查名称', prop: 'chkName', sortable: true, resizable: true },
            { label: '客户名称', prop: 'cusName', sortable: true, resizable: true},
            { label: '客户号', prop: 'cusId', sortable: true, resizable: true },
            { label: '证件号码', prop: 'certCode', sortable: true, resizable: true},
            { label: '检查任务类型', prop: 'chkType', sortable: true, resizable: true,dataCode:'S_ZB_CHK_TYPE' },
            { label: '任务创建人', prop: 'createUser', sortable: true, resizable: true },
            { label: '任务创建时间', prop: 'createTime', sortable: true, resizable: true },
            { label: '任务办理人', prop: 'hdlNo', sortable: true, resizable: true },
            { label: '任务办理日期', prop: 'hdlDate', sortable: true, resizable: true },
            { label: '检查任务状态', prop: 'chkState', sortable: true, resizable: true ,dataCode:'STD_ZB_CHK_STATE'  }
            ],
             tableColumns1: [
            { label: '借据号', prop: 'billNo', sortable: true, resizable: true },
            { label: '贷款帐号', prop: 'loanAccount', sortable: true, resizable: true },
            { label: '贷款产品', prop: 'prdName', sortable: true, resizable: true },
            { label: '担保方式', prop: 'assureMeansMain', sortable: true, resizable: true ,dataCode:'STD_ZB_ASSURE_MEANS' },
            { label: '贷款合同号', prop: 'contNo', sortable: true, resizable: true },
            { label: '贷款发放日', prop: 'loanStartDate', sortable: true, resizable: true },
            { label: '贷款到期日', prop: 'loanEndDate', sortable: true, resizable: true },
            { label: '贷款利率', prop: 'realityIrY', sortable: true, resizable: true, formatter: function(row, column, cellValue) {
                            var num = parseFloat(cellValue);
                            if (typeof(num) == 'undefined'  || num == null || isNaN(num) )
                                num = 0;
                            var rateY = yufp.util.toPercent((parseFloat(num) * 100).toFixed(6));
//                            Number(num * 100).toFixed(4) + '%';
                            return rateY;
                        }},
            { label: '借据状态', prop: 'accountStatus', sortable: true, resizable: true,dataCode:'STD_ZB_ACC_STATUS'},
            { label: '最近一次逾期金额(元)', prop: 'overdueBlnAmt', sortable: true, resizable: true },
            { label: '最近一次逾期时间', prop: 'overdueDate', sortable: true, resizable: true }
            ],
             tableColumns2: [
            { label: '风险预警规则', prop: 'ruleName', sortable: true, resizable: true },
            { label: '是否触发预警', prop: 'isWarn', sortable: true, resizable: true,dataCode:'STD_ZX_YES_NO' },
            { label: '预警反馈信息', prop: 'warnInfo', sortable: true, resizable: true }
            ], 
            tableColumns3: [
            { label: '借据号', prop: 'billNo', sortable: true, resizable: true },
            { label: '贷款产品', prop: 'prdName', sortable: true, resizable: true },
            { label: '担保方式', prop: 'assureMeansMain', sortable: true, resizable: true,dataCode:'STD_ZB_ASSURE_MEANS' },
            { label: '异常情况描述', prop: 'exceRemark', sortable: true, resizable: true }
            ],
             mainGrid: {
                        data: null,
                        //loading: true,
                        multipleSelection: []
                    },
            updateFields: [{
            	columnCount: 3,
              fields: [
                    	 { field: 'bizSerno', label: '检查任务号', needDis: true,disabled:true},
                    	 { field: 'chkType', label: '检查任务类型', type: 'select' ,dataCode:'S_ZB_CHK_TYPE',disabled:true},
                    	 { field: 'chkName', label: '检查名称' ,rules: [
                    	       { required: true, message: '请输入检查名称', trigger: 'blur' },
                             {min: 0,  max: 50, message:'长度不能大于50',  trigger: 'blur'}
                              ]},       	 
                    	 { field: 'createUser', label: '任务创建人',disabled:true,value:yufp.session.userId,hidden:true},
                    	 { field: 'createTime', label: '创建时间',type:'date',disabled:true,value:yufp.session.OPENDAY,hidden:true},
                       { field: 'legalOrgCode', label: '法人机构代码',disabled:true,value:yufp.session.legalOrg.orgCode,hidden:true},
                       { field: 'legalOrgName', label: '法人机构名称',disabled:true,value:yufp.session.legalOrg.orgName,hidden:true},
                       { field: 'orgCode', label: '机构代码',disabled:true,value:yufp.session.legalOrg.orgCode,hidden:true},
                       { field: 'orgName', label: '机构名称',disabled:true,value:yufp.session.legalOrg.orgName,hidden:true},
                       { label: '检查任务状态', field: 'chkState',hidden:true}
                    ]
                   
                    }],
                    updateFields1: [{
                            columnCount: 3,
                            fields: [
                                       { field: 'taskExeId', label: '任务执行人',disabled:false,value:yufp.session.userName,hidden:true},
                                       { field: 'hdlNo', label: '任务办理人',disabled:true,value:yufp.session.userId,hidden:true},
                                       { field: 'hdlDate', label: '任务办理时间',disabled:true,value:yufp.session.OPENDAY,hidden:true}
                                  ]
                    }],
          updateFields2: [{
          	columnCount: 3,
              fields: [
                   { field: 'cusId', label: '客户号',type:'custom',is:'yufp-cont-selector'
                        ,selectFn:function(value, model, args){
                        	var contInfo = args[1];
                        	
                                yufp.service.request({
                                    method: 'POST',
                                    url:backend.pspService+ '/api/psp/bill/list',
                                    data: {
                                        bizSerno:   _self.$refs.form1.formModel.bizSerno,
                                        contNo: contInfo.contNo
                                    },
                                    callback: function (code, message, response) {
                                      if (code == 0) {
                                      	yufp.util.copyObj(_self.$refs.form2.formModel, contInfo);
                                        _self.$refs.billtable.remoteData();
                                        _self.$message('操作成功');
                                      } else {
                                        _self.$message('操作失败');
                                      }
                                    }
                          });
                        },
                        rules: [ { required: true, message: '请选择客户号', trigger: 'blur' } ]
                    },
                   { field: 'cusName', label: '客户名称',disabled:true},
                   { field: 'certType', label: '证件类型',type:'select',dataCode:'STD_ZB_CERT_TYP',disabled:true},
                   { field: 'certCode', label: '证件号码',disabled:true},
                   { field: 'ownCdt', label: '授信总额(元)',disabled:true, type: 'num', digit:2, formatter:yufp.util.moneyFormatter},
                   { field: 'loanTotalBln', label: '贷款总余额(元)',disabled:true, type: 'num', digit:2, formatter:yufp.util.moneyFormatter},
                   { field: 'contNo', label: '合同号',hidden:true},
                   { field: 'contAmt', label: '合同金额(元)',hidden:true},
                   { field: 'loanStartDate', label: '贷款起始日',hidden:true},
                   { field: 'loanEndDate', label: '贷款到期日',hidden:true},
                   { field: 'chkBln', label: '检查任务余额(元)',hidden:true},
                   { field: 'cusType', label: '客户类型',hidden:true},
                   { field: 'chkNum', label: '检查任务笔数',hidden:true}
                    ]
                   
                    }],
          updateFields3: [{
                   columnCount: 1,
              fields: [
                   { field: 'othUnFactor', label: '',type:"textarea",rule:[
                   {min: 0,  max: 1000, message:'长度不能大于1000',  trigger: 'blur'}
                   ]}
                    ]
                    }],
            updateFields4: [{
               columnCount: 1,
          fields: [
               { field: 'expSugg', label: '',type:"textarea",rule:[
                   {min: 0,  max: 1000, message:'长度不能大于1000',  trigger: 'blur'}
                   ]}
                ]
                }],
              warnFields: [{
                   columnCount: 1,
              fields: [
                   { field: 'warnInfo', label: '规则反馈信息',type:"textarea",rule:[
                   {min: 0,  max: 1000, message:'长度不能大于255',  trigger: 'blur'}
                   ]}
                    ]
                    }],
            height: yufp.frame.size().height - 103,
            dialogVisible: false,
            formDisabled: false,
            cusDisabled: false,
            formDisabled1:false,
            warnVisible:false,
            flag:false,
            wflag:false,
            viewType: 'DETAIL',
            viewTitle: yufp.lookup.find('CRUD_TYPE', false)
          }
        },
        methods: {
        	/**//**
        	* @param ctrlCode 操作码
        	*/
        	checkPermission: function(ctrlCode) {
        		return !yufp.session.checkCtrl(ctrlCode, cite.menuId);
        	},
         /* *//**
          * @param viewType 表单类型
          * @param editable 可编辑,默认false
          */
          switchStatus: function (viewType, editable) {
            var _self = this;
            _self.viewType = viewType;
            _self.formDisabled = !editable;
            _self.cusDisabled = !editable;
            _self.dialogVisible = true;
            _self.flag = (viewType != 'DETAIL');
            _self.wflag = (viewType != 'DETAIL');
            /*for (var i =0; i < this.updateFields[0].fields.length; i++){
            	if (this.updateFields[0].fields[i].needDis) {
              	this.updateFields[0].fields[i].disabled = viewType != 'ADD';
                this.updateFields[0].fields[i].calcDisabled = viewType != 'ADD';
            	}
            	if (this.updateFields[0].fields[i].needHid) {
                this.updateFields[0].fields[i].hidden = editable;
              }
            }*/
            
          },
          modifyFn: function () {
            if (this.$refs.reftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
             var obj = this.$refs.reftable.selections[0];
             var chkState=obj.chkState;
             if(chkState !='01' ){
                this.$message({ message: '检查状态为已登记的任务不能再进行修改!', type: 'warning' });
                return;
             }
            this.switchStatus('EDIT', true);
            var chkType=obj.chkType;
               if(chkType!='03' ){
                this.cusDisabled = true;
             }
             if(chkType!='04' ){
                this.wflag = false;
             }
            this.$nextTick(function () {
              var obj = this.$refs.reftable.selections[0];
              this.$refs.form1.resetFn();
              this.$refs.form2.resetFn();
              this.$refs.form3.resetFn();
              this.$refs.form4.resetFn();
              yufp.util.copyObj(this.$refs.form1.formModel, obj);
              yufp.util.copyObj(this.$refs.form2.formModel, obj);
              yufp.util.copyObj(this.$refs.form3.formModel, obj);
              yufp.util.copyObj(this.$refs.form4.formModel, obj);            
              
               var bizSerno = obj.bizSerno;  
               var params = {
                    bizSerno: bizSerno
               }
               this.$refs.billtable.remoteData(params);
               this.$refs.warntable.remoteData(params);
               this.$refs.guartable.remoteData(params);
            });
          },
          infoFn: function () {
            if (this.$refs.reftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            this.switchStatus('DETAIL', false);
            this.$nextTick(function () {
            	this.$refs.form1.resetFn();
              this.$refs.form2.resetFn();
              this.$refs.form3.resetFn();
              this.$refs.form4.resetFn();
            	var obj = this.$refs.reftable.selections[0];
              yufp.util.copyObj(this.$refs.form1.formModel, obj);
              yufp.util.copyObj(this.$refs.form2.formModel, obj);
              yufp.util.copyObj(this.$refs.form3.formModel, obj);
              yufp.util.copyObj(this.$refs.form4.formModel, obj);   
    
              var bizSerno = obj.bizSerno;  
               var params = {
               	    bizSerno: bizSerno
               }
               this.$refs.billtable.remoteData(params);
               this.$refs.warntable.remoteData(params);
               this.$refs.guartable.remoteData(params);
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
          saveFn: function (){
          	var _self = this;
              var validate = false;
                  _self.$refs.form1.validate(function (valid) {
                    validate = valid;
                  });
                  _self.$refs.form2.validate(function (valid) {
                    validate = valid;
                  });
                  if (!validate) {
                    return;
                  }
                  _self.$refs.form2.validate(function (valid) {
                    validate = valid;
                  });
                  if (!validate) {
                    return;
                  }
                  
                  var cmisdata = {};
                  yufp.extend(cmisdata, _self.$refs.form1.formModel);
                  yufp.extend(cmisdata, _self.$refs.form2.formModel);
                  yufp.extend(cmisdata, _self.$refs.form3.formModel);
                  yufp.extend(cmisdata, _self.$refs.form4.formModel);

                   var rMethod = '';
                  if(_self.viewType == "EDIT") {
                    rMethod = 'PUT';
                  } else if(_self.viewType == "ADD") {
                    rMethod = 'POST';
                  }
                  
                  yufp.service.request({
                    method: rMethod,
                    url: backend.pspService+ '/api/psp/check/task/app',
                    data: cmisdata,
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
          },
          cancleFn: function(){
          	var _self = this;
          	_self.dialogVisible = false;
          },
          submitFn: function (){
            var _self = this;
              var validate = false;
                  _self.$refs.form1.validate(function (valid) {
                    validate = valid;
                  });
                  _self.$refs.form2.validate(function (valid) {
                    validate = valid;
                  });
                  if (!validate) {
                    return;
                  }
                  _self.$refs.form2.validate(function (valid) {
                    validate = valid;
                  });
                  if (!validate) {
                    return;
                  }
                  
                  var cmisdata = {};
                   yufp.extend(cmisdata, _self.$refs.form1.formModel);
                  yufp.extend(cmisdata, _self.$refs.form2.formModel);
                  yufp.extend(cmisdata, _self.$refs.form3.formModel);
                  yufp.extend(cmisdata, _self.$refs.form4.formModel);
                   yufp.extend(cmisdata, _self.$refs.reform.formModel);
                  console.log(cmisdata);

                  yufp.service.request({
                   method: 'PUT',
                    url: backend.pspService+ '/api/psp/check/task/app/submit',
                    data: cmisdata,
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
          },
          warnFn: function () {
            if (this.$refs.warntable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            this.switchStatus('EDIT', true);
            this.warnVisible = true;
            this.$nextTick(function () {
            var obj = this.$refs.warntable.selections[0];
              yufp.extend(this.$refs.warnform.formModel, obj);
            });
          },
          warnSave:function(){
          	var _self=this;
                  var validate = false;
                  _self.$refs.warnform.validate(function (valid) {
                    validate = valid;
                  });
                  if (!validate) {
                    return;
                  }
                  var model=_self.$refs.warnform.formModel;
                  yufp.service.request({
                    method: 'PUT',
                    url: backend.pspService+'/api/psp/warn/info',
                    data: model,
                    callback: function (code, message, response) {
                      if (code == 0) {
                        _self.$refs.warntable.remoteData();
                        _self.$message('操作成功');
                        _self.warnVisible = false;
                      } else {
                        _self.$message('操作失败');
                      }
                    }
                  });
                
                     },
            warnReturn: function(){
                this.warnVisible = false;
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
