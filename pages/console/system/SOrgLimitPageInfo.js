﻿/**
 * @create by chenqm1 on 2018-05-25
 * @description 机构限额表
 */
define([
	'./custom/widgets/js/OrgSelector.js',
	'custom/widgets/js/LegalOrgSelector.js'],function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('COMMON_STATUS,STD_ZB_APPR_STATUS');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
            baseParams: {
            },
        	dataUrl: backend.consoleService + '/api/s/org/limits',
            queryFields: [
            
            { placeholder: '机构代码', field: 'legalOrgCode',   type: 'custom',is:'div-degal-org-selector', 
            	params:{ onlyLegal: true} ,selectFn: function (val, formModel, arguments){
                formModel.legalOrgName = arguments[1].orgName;
            }},
            { placeholder: '机构名称', field: 'legalOrgName', type: 'input' },
            { placeholder: '限额期限', field: 'orgLimitDate',type: 'daterange', value: [] },
            { placeholder: '限额状态', field: 'orgLimitSts',  type: 'select', dataCode: 'COMMON_STATUS'},
            { placeholder: '创建人',field: 'createUser', type: 'input'},
            { placeholder: '创建日期',field: 'createTime', type: 'date'},
            { placeholder: '最后修改人',field: 'lastUpdateUser', type: 'input'},
            { placeholder: '最后修改日期',field: 'lastUpdateTime', type: 'date' },
            { placeholder: '审批状态', field: 'approveStatus',  type: 'select', dataCode: 'STD_ZB_APPR_STATUS'}
             
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
            { label: 'id', prop: 'id',hidden: true },
            { label: '机构代码', prop: 'legalOrgCode', sortable: true, resizable: true },
            { label: '机构名称', prop: 'legalOrgName', sortable: true, resizable: true },    
            { label: '限额开始日期', prop: 'orgLimitStartDate', sortable: true, resizable: true },
            { label: '限额结束日期', prop: 'orgLimitEndDate', sortable: true, resizable: true },
            { label: '限额状态', prop: 'orgLimitSts', sortable: true, resizable: true,dataCode: 'COMMON_STATUS' },
            { label: '贷款限额', prop: 'orgLimitAmt', sortable: true, resizable: true },
            { label: '创建人',prop: 'createUser', sortable: true, resizable: true },
            { label: '创建日期',prop: 'createTime', sortable: true, resizable: true },
            { label: '最后修改人',prop: 'lastUpdateUser', sortable: true, resizable: true },
            { label: '最后修改日期',prop: 'lastUpdateTime', sortable: true, resizable: true },
            { label: '审批状态', prop: 'approveStatus', sortable: true, resizable: true,dataCode: 'STD_ZB_APPR_STATUS'}
            
            ],
            updateFields: [{
              columnCount: 2,
              fields: [
            	  	 { field: 'id', label: 'id', hidden: true},
                	 { field: 'legalOrgCode', label: '机构代码',type: 'custom' ,is:'div-degal-org-selector', params:{ onlyLegal: true},selectFn: function (val, formModel, arguments){
                         formModel.legalOrgName = arguments[1].orgName;
                     },rules: [ { required: true, message: '机构代码是必选项', trigger: 'blur' }, { max: 10, message: '最大长度为10'}]},
                	 { field: 'legalOrgName', label: '机构名称',disabled: true,rules: [ { required: true, message: '机构名称是必选项', trigger: 'blur' }, { max: 30, message: '最大长度为30'}]
                     ,change:function(){
                		 
                	 }},
                	 { field: 'orgLimitStartDate', label: '限额开始日期',format:'yyyy-MM-dd',editable:false,type: 'date',
                		 rules: [
             				{ required: true, message: '请选择限额开始日期', trigger: 'blur', type:'date' },
             				{ validator: function(rule, value, callback){
              					var startDate = _self.$refs.reform.formModel.orgLimitEndDate;
              					var startDateTo = yufp.util.dateFormat(startDate,'{y}-{m}-{d}');
              					var valueTo = yufp.util.dateFormat(value,'{y}-{m}-{d}');
              					var openday = new Date(yufp.session.OPENDAY);
              					if(startDate!='' && valueTo > startDateTo){
              						callback(new Error("限额开始日期须早于限额结束日期"));
              						_self.$refs.reform.formModel.orgLimitStartDate = '';
              					}else if(value <= openday){
              						callback(new Error("限额开始日期须晚于营业日期"));
              						_self.$refs.reform.formModel.orgLimitStartDate = '';
              					}else{
              						callback();
              					}
              				}}
         				]},
                	 { field: 'orgLimitEndDate', label: '限额结束日期',format:'yyyy-MM-dd',editable:false,type: 'date',
         					 rules: [
                 				{ required: true, message: '限额结束日期', trigger: 'blur' , type:'date'},
                 				{ validator: function(rule, value, callback){
                  					var endDate = _self.$refs.reform.formModel.orgLimitStartDate;
                  					var valueTo = yufp.util.dateFormat(value,'{y}-{m}-{d}');
                  					var endDateTo = yufp.util.dateFormat(endDate,'{y}-{m}-{d}');
                  						if(endDate!= '' && valueTo < endDateTo){
                  							callback(new Error("机构限额结束日期必须等于或大于开始日期"));
                  							_self.$refs.reform.formModel.orgLimitEndDate = '';
                  						}else {
                  							callback();
                  						}
                  					
                  					
                  				}}
             				]},
                	 { field: 'orgLimitAmt', label: '贷款限额', formatter:yufp.util.moneyFormatter, type:'num',rules:[{ required: true,type:'number', trigger:'blur',message:'必填项'}]},
                	 { field: 'orgLimitSts', label: '限额状态',type: 'select',value:'0' , dataCode: 'COMMON_STATUS' ,disabled: true},
                	 { field: 'createUser', label: '创建人', disabled: true},
                	 { field: 'createTime', label: '创建日期', disabled: true},
                	 { field: 'lastUpdateUser', label: '最后修改人', disabled: true},
                	 { field: 'createOrgCode', label: '创建机构', disabled: true,value:yufp.session.org.orgCode},
                	 { field: 'approveStatus', label: '审批状态'/*, hidden: true*/,type: 'select',dataCode: 'STD_ZB_APPR_STATUS'},
                	 { field: 'aprvUserCode', label: '审批人'/*, hidden: true*/},
                	 { field: 'aprvComment', label: '审批意见'/*, disabled: false,hidden: true*/,type:"textarea",autosize:{ minRows: 2, maxRows: 4}},
                	 { field: 'aprvDate', label: '审批日期'/*, hidden: true*/}
              ]
            }],
            updateButtons: [
             
              { label: '保存', type: 'primary',  icon: 'yx-floppy-disk', hidden: false, click: function (model) {
             
                  var validate = false;
                  _self.$refs.reform.validate(function (valid) {
                    validate = valid;
                  });
//                  var obj = this.$refs.reftable.selections[0];
//					 this.switchInvalidDateToNull('updateFields' , obj);
//                  if(model.orgLimitStartDate>model.orgLimitEndDate)
//                  {
//                		_self.$message({message:'结束时间不能小于开始时间',type: 'warning' });
//                		  validate = false;
//                 		 return;
//                  }
                  if (!validate) {
                      return;
                    }
                  var rMethod = '';
									if(_self.viewType == "EDIT") {
										rMethod = 'PUT';
									} else if(_self.viewType == "ADD") {
										rMethod = 'POST';
									}
                 
					model.orgLimitSts = '0'	; //保存都是待生效状态的
					if('00001' == yufp.session.org.orgCode){
//						var apprSts = model.approveStatus;
						model.approveStatus='';//省联社不需要审批	
//						if(model.createOrgCode!='00001'){
//							model.approveStatus = apprSts;//省联社修改下级机构，审批状态不变
//						}
					}else{
						model.approveStatus = '000';//审批状态为待发起
					}
                  yufp.service.request({
                    method: rMethod,
                    url: backend.consoleService+'/api/s/org/limit',
                    data: model,
                    callback: function (code, message, response) {
                      if (response.code == '0') {
                        _self.$refs.reftable.remoteData();
                        _self.$message('操作成功');
                        _self.dialogVisible = false;
                      } else {
                      	_self.$message({message:response.message,type: 'warning' });
                      }
                    }
                  });
                } },
                { label: '同意', type: 'primary',  icon: 'yx-floppy-disk', hidden: false, click: function (model) {
                	var openday = new Date(yufp.session.OPENDAY);
					if(model.orgLimitStartDate <=openday){
					    model.orgLimitSts='1';//当开始时间小于营业时间时，设置为已生效状态
					}else{
						model.orgLimitSts='0';
					}
                    yufp.service.request({
                      method: 'PUT',
                      url: backend.consoleService+'/api/s/org/limit/agree',
                      data: model,
                      callback: function (code, message, response) {
                        if (response.code == '0') {
                          _self.$refs.reftable.remoteData();
                          _self.$message('机构限额审批已通过');
                          _self.dialogVisible = false;
                        } else {
                        	_self.$message({message:response.message,type: 'warning' });
                        }
                      }
                    });
                  } },
                  { label: '拒接', type: 'primary',  icon: 'close', hidden: false, click: function (model) {
                      yufp.service.request({
                        method: 'PUT',
                        url: backend.consoleService+'/api/s/org/limit/vote',
                        data: model,
                        callback: function (code, message, response) {
                          if (response.code == '0') {
                            _self.$refs.reftable.remoteData();
                            _self.$message('机构限额审批已打回');
                            _self.dialogVisible = false;
                          } else {
                          	_self.$message({message:response.message,type: 'warning' });
                          }
                        }
                      });
                    } },
                { label: '提交', type: 'primary', icon: 'yx-checkmark', hidden: false, click: function (model) {
                	var validate = false;
                  _self.$refs.reform.validate(function (valid) {
                    validate = valid;
                  });
                  if(model.orgLimitStartDate>model.orgLimitEndDate)
                  {
                		_self.$message({message:'结束时间不能小于开始时间',type: 'warning' });
                		  validate = false;
                		 return;
                  }
                  if (!validate) {
                      return;
                    }
                  var rMethod = '';
									if(_self.viewType == "EDIT") {
										rMethod = 'PUT';
									} else if(_self.viewType == "ADD") {
										rMethod = 'POST';
									}
					var openday = new Date(yufp.session.OPENDAY);
					
					if('00001' == yufp.session.org.orgCode){
						var apprSts = model.approveStatus;
						model.approveStatus='';//省联社不需要审批	
						
//						if(model.createOrgCode!='00001'){
//							model.approveStatus = '111';//省联社修改下级机构，提交都是审批中的
//						}
						if(model.orgLimitStartDate <=openday){
						    model.orgLimitSts = '1';//当开始时间小于营业时间时，设置为已生效状态
						}else{
							model.orgLimitSts = '0'	;
						}
					}else{
						model.orgLimitSts = '0'	; //走审批流程都是待生效状态的
						model.approveStatus = '111';//审批状态为审批中
					}
                  yufp.service.request({
                    method: rMethod,
                    url: backend.consoleService+'/api/s/org/limit',
                    data: model,
                    callback: function (code, message, response) {
                    	 if (response.code == '0') {
                             _self.$refs.reftable.remoteData();
                             _self.$message('操作成功');
                             _self.dialogVisible = false;
                           } else {
                           	_self.$message({message:response.message,type: 'warning' });
                           }
                    }
                  });
                }},
                  { label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                      _self.dialogVisible = false;
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
            _self.updateButtons[0].hidden = !editable;
            _self.updateButtons[1].hidden = editable;
            _self.updateButtons[2].hidden = editable;
            _self.updateButtons[3].hidden = !editable;
            _self.formDisabled = !editable;
            _self.dialogVisible = true;
          },
          addFn: function () {
            var _self = this;
           
            _self.switchStatus('ADD', true);
            _self.$nextTick(function () {
              _self.$refs.reform.resetFn();
              this.isAppr(true);
             // this.isModifyBy00001(false);
            });
          },
          modifyFn: function () {
            if (this.$refs.reftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            var selections = this.$refs.reftable.selections;
            if (selections[0].orgLimitSts != 0) {
                this.$message({ message: '只能修改待生效的记录', type: 'warning' });
                return;
            }
            if(selections[0].approveStatus=="997" || selections[0].approveStatus=="998"){
            	this.$message({ message: '已审批的记录不能修改', type: 'warning' });
                return;
            }
            if(yufp.session.org.orgCode=='00001' && selections[0].createOrgCode!='00001'){//省联社修改下级机构，只允许修改规模
          	  this.$message({ message: '省联社只能查看下级机构限额，不能修改限额', type: 'warning' });
                return;
            }
            if(yufp.session.org.orgCode!='00001' && selections[0].createOrgCode=='00001'){//省联社修改下级机构，只允许修改规模
            	  this.$message({ message: '下级机构无法修改省联社限额！', type: 'warning' });
                  return;
              }
            this.switchStatus('EDIT', true);
            this.$nextTick(function () {
            	this.$refs.reform.resetFn();
              var obj = this.$refs.reftable.selections[0];
              
             // yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0]);
              //obj.orgLimitStartDate= new Date(obj.orgLimitStartDate);
              //obj.orgLimitEndDate= new Date(obj.orgLimitEndDate);
              yufp.extend(this.$refs.reform.formModel, obj, {
                    orgLimitStartDate: new Date(obj.orgLimitStartDate),
                    orgLimitEndDate: new Date(obj.orgLimitEndDate)
               });
              this.isAppr(true);
             

            });
          },
          infoFn: function () {
            if (this.$refs.reftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            this.switchStatus('DETAIL', false);
            this.updateButtons[1].hidden = true;
            this.updateButtons[2].hidden = true;
            this.$nextTick(function () {
            	  this.$refs.reform.resetFields();
	              yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0]);
	              this.isAppr(false);
            });
          },
          doOnFn: function () {
              if (this.$refs.reftable.selections.length != 1) {
                this.$message({ message: '请先选择一条待生效的记录', type: 'warning' });
                return;
              }
              var _self = this;
              var selections = _self.$refs.reftable.selections;
              if (selections[0].orgLimitSts != 0) {
                       this.$message({ message: '请先选择一条待生效的记录', type: 'warning' });
                       return;
               }
              yufp.service.request({
                method: 'PUT',
                url: backend.consoleService+'/api/s/org/updateState',
                data: {
                	id: selections[0].id,
                  	orgLimitSts:'1'
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
            doOffFn: function () {
                if (this.$refs.reftable.selections.length != 1) {
                  this.$message({ message: '请先选择一条状态为生效的记录', type: 'warning' });
                  return;
                }
                var _self = this;
                var selections = _self.$refs.reftable.selections;
                if (selections[0].orgLimitSts != 1) {
                         this.$message({ message: '请先选择一条状态为生效的记录', type: 'warning' });
                         return;
                  }
                yufp.service.request({
                  method: 'PUT',
                  url: backend.consoleService+'/api/s/org/updateState',
                  data: {
                  	id: selections[0].id,
                  	orgLimitSts:'2'
                  },
                  callback: function (code, message, response) {
                    if (code == 0) {
                      _self.$refs.reftable.remoteData();
                      _self.$message('操作成功');
                    } else {
                    	_self.$message('操作失败');
                    }
                  }
                }) ;
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
            	 if (selections[i].orgLimitSts == 1) {
                     this.$message({ message: '生效的记录不能进行删除', type: 'warning' });
                     return;
              }
              arr.push(selections[i].id);
            }
            
            _self.$confirm('是否删除?', '提示').then(function () {
            yufp.service.request({
              method: 'DELETE',
              url: backend.consoleService+'/api/s/org/limit',
              data: {
                  	id: selections[0].id,
                  	createOrgCode:selections[0].createOrgCode
                  },
              callback: function (code, message, response) {
                if (code == 0 && response.data=='1') {
                  _self.$refs.reftable.remoteData();
                  _self.$message('操作成功');
                } else {
                	_self.$message(response.message);
                }
              }
            })});
          },
          
          apprFn: function () {
              if (this.$refs.reftable.selections.length != 1) {
                this.$message({ message: '请先选择一条记录', type: 'warning' });
                return;
              }
              if(this.$refs.reftable.selections[0].approveStatus!='111'){
    			  this.$message({ message: '非审批中状态，无需审批', type: 'warning' });
    			  return;
    		  }
              this.switchStatus('DETAIL', false);
              this.$nextTick(function () {
            	//  this.$refs.reform.resetFn();
               yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0]);
                this.isAppr(false);
                this.$refs.reform.switch('aprvDate','calcDisabled',true);
                this.$refs.reform.switch('aprvComment','calcDisabled',false);
                this.$refs.reform.switch('aprvUserCode','calcDisabled',true);
                this.$refs.reform.switch('approveStatus','calcDisabled',true);
              });
            },
            isAppr: function(isHidden){
            	this.$refs.reform.switch('aprvDate','disabled',isHidden);
                this.$refs.reform.switch('aprvComment','disabled',isHidden);
                this.$refs.reform.switch('aprvUserCode','disabled',isHidden);
                this.$refs.reform.switch('approveStatus','disabled',isHidden);
                this.$refs.reform.rebuildFn();
            },
//            isModifyBy00001:function(isDisabled){
//            	this.$refs.reform.switch('legalOrgCode','disabled',isDisabled);
//              	this.$refs.reform.switch('orgLimitStartDate','disabled',isDisabled);
//              	this.$refs.reform.switch('orgLimitEndDate','disabled',isDisabled);
//              	this.$refs.reform.rebuildFn();  
//            },
//            switchInvalidDateToNull: function(fidldName, obj) {
//          	  if (typeof(fidldName) == 'undefined' || fidldName == null)
//          		  return ;
//          	  if (typeof(obj) == 'undefined' || obj == null)
//          		  return ;
//          	  if ( yufp.isArray(this[fidldName]) ){
//          		  for (var i = 0; i < this[fidldName].length; i++) {
//          			  var temp = this[fidldName][i];
//          			  if ( yufp.isArray(temp.fields ) ) {
//          				  for (var j = 0; j < temp.fields.length; j++ ){
//          					  var f = temp.fields[j];
//          					  if (f.type == 'date' && new Date(obj[f.field]) == 'Invalid Date' ){
//          						  obj[f.field] = null;
//          					  }
//          				  } 
//          			  }
//          		  }
//          	  }
//          	  
//            },
          exportFn: function () {
            yufp.util.exportExcelByTable({
              fileName: '下载文件',
              importType: 'service', // page当前页 selected 选中的数据  service 后端数据
              ref: this.$refs.reftable,
              url: '',
              param: {}
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
