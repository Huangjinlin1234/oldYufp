/**
 * @create by fuzm on 2018-05-04
 * @description 系统机构表
 */
define([
	'./custom/widgets/js/OrgCtrlSelector.js'
], function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CRUD_TYPE,ORG_LEVEL,STD_ORG_STATUS,STD_YES_NO');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _self = this;
        return {
          	dataUrl: backend.consoleService + '/api/s/orgs',
          baseParams: {
          },
          queryFields: [
            { placeholder: '机构代码', field: 'orgCode', type: 'input' },
            { placeholder: '机构名称', field: 'orgName', type: 'input' }
          ],
          queryButtons: [
            { label: '查询',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  _self.$refs.reftable.remoteData(model);
                }
              } },
            { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
          ],

          tableColumns: [
            { label: '机构代码', prop: 'orgCode',width: 120 },
            { label: '机构名称', prop: 'orgName', sortable: true, resizable: true, width: 300 },
            { label: '机构层级', prop: 'orgLevel', sortable: true, resizable: true, dataCode: 'ORG_LEVEL',width: 100 },
            { label: '上级机构代码', prop: 'orgParentCode', resizable: true, hidden: false},
            { label: '机构英文名', prop: 'orgEname', resizable: true, hidden: true },
            { label: '机构联系电话', prop: 'orgTel', resizable: true },
            { label: '机构地址', prop: 'orgAddress', sortable: true, resizable: true, width: 500},
            { label: '机构邮编', prop: 'orgZipcode' },
            { label: '机构状态', prop: 'status', sortable: true, resizable: true, dataCode:'STD_ORG_STATUS'},
            { label: '位置属性', prop: 'location', sortable: true, resizable: true, hidden: true },
            { label: '是否虚拟机构', prop: 'isVirtOrg',width:200, sortable: true, resizable: true, dataCode: 'STD_YES_NO'}
          ],
            queryOrgFields:[
                {placeholder: '机构代码', field: 'orgCode', type: 'input',
                    rules: [{required: true, message: '必填项', trigger: 'blur'}]}
            ],
            queryOrgButtons: [
                {
                    label: '查询', op: 'submit', type: 'primary', icon: 'search',  click: function (model, valid) {
                        if (valid) {
                            var isVir = _self.$refs.reformIsVirtOrg.formModel.isVirtOrg;
                            yufp.service.request({
                                method: "POST",
                                url: backend.consoleService + '/api/s/orgs/queryInfo',
                                data: {
                                    orgCode:model.orgCode,
                                    isVirtOrg:isVir,
                                },
                                callback: function (code, message, response) {
                                    // 重置表单，防止第二次点击查看时，为空数据出现上一次查看的数据
                                    _self.$refs.reform.resetFn();
                                    if (response.success && response.code == '0') {
                                        yufp.extend(_self.$refs.reform.formModel, response.rows);
                                    } else{
                                        _self.$message({ message:response.message, type: 'warning' });
                                    }
                                }
                            })
                        }
                    }
                }
            ],
            isVirtOrgFields:[
                {
                    columnCount: 1,
                    fields: [
                        { field: 'isVirtOrg', label: '是否虚拟机构',type:'radio',dataCode:'STD_YES_NO',value:'N',rules: [{required: true, message: '必填项', trigger: 'blur'}],
                            change:function(fields){
                                if(fields === "Y"){
                                    _self.$refs.reform.switch('orgCode','disabled',true);
                                    _self.$refs.reform.switch('orgName','disabled',false);
                                    _self.$refs.reform.switch('orgSimpleName','disabled',false);
                                    _self.$refs.reform.switch('orgEname','disabled',false);
                                    _self.$refs.reform.switch('orgTel','disabled',false);
                                    _self.$refs.reform.switch('launchDate','disabled',false);
                                    _self.$refs.reform.switch('orgZipcode','disabled',false);
                                    _self.$refs.reform.switch('orgAddress','disabled',false);
                                    _self.$refs.reform.switch('distno','disabled',false);
                                    _self.$refs.reform.switch('orgFax','disabled',false);
                                }else{
                                    _self.$refs.reform.switch('orgCode','disabled',true);
                                    _self.$refs.reform.switch('orgName','disabled',true);
                                    _self.$refs.reform.switch('orgSimpleName','disabled',true);
                                    _self.$refs.reform.switch('orgEname','disabled',true);
                                    _self.$refs.reform.switch('orgTel','disabled',true);
                                    _self.$refs.reform.switch('launchDate','disabled',true);
                                    _self.$refs.reform.switch('orgZipcode','disabled',true);
                                    _self.$refs.reform.switch('orgAddress','disabled',true);
                                    _self.$refs.reform.switch('distno','disabled',true);
                                    _self.$refs.reform.switch('orgFax','disabled',true);
                                }
                                _self.$refs.refq1.fm.orgCode='';
                                _self.$refs.reform.resetFn();
                            }

                        }
                    ]
                }
            ],
            updateFields: [
                {
                    columnCount: 3,
                    fields: [
                        { field: 'orgCode', label: '机构代码', disabled: true, needDis: true,rules: [{ required: true, message: '必填!', trigger: 'blur'}]},
                        { field: 'orgName', label: '机构名称',rules: [{ required: true, message: '必填!', trigger: 'blur'}],disabled: true},
                        { field: 'orgLevel', label:'机构层级',rules: [{ required: true, message: '必填!', trigger: 'blur'}], type: 'select', dataCode: 'ORG_LEVEL',
                            change:function(fields){
                                // 每次change都将上级机构代码擦除
                                _self.$nextTick(function () {
                                    _self.$refs.reform.formModel.orgParentCode = '';
                                });

                                if(fields == null || fields == "" || fields == ''){
                                    _self.$refs.reform.switch('orgParentCode', 'hidden', true);
                                }else{
                                    if("1" === fields ){
                                        _self.$message({message: '一级机构只能由系统管理员初始化！', type: 'warning'});
                                    }
                                    _self.$refs.reform.switch('orgParentCode', 'hidden', false);
                                }
                        }},
                        { field: 'orgParentCode', label: '上级机构代码',rules: [{ required: true, message: '必填!', trigger: 'blur'}], type: 'custom',
                            is: 'div-org-ctrl-selector', params:{orgLevel : ''},
                            clickFn:function(value,model,args){
                                _self.$refs.reform.switch('orgParentCode','params',{orgLevel : model.orgLevel});
                                _self.$refs.reform.rebuildFn();
                            }, hidden: true },
                        { field: 'orgSimpleName', label: '机构简称',disabled:true},
                        { field: 'orgEname', label: '机构英文名',disabled:true},
                        { field: 'orderId', label: '排序字段', hidden: true },
                        { field: 'orgManagerId', label: '机构负责人'},
                        { field: 'orgTel', label: '机构联系电话',disabled:true},
                        { field: 'launchDate', label: '开办日期', type: 'date',disabled:true},
                        { field: 'orgZipcode', label: '机构邮编',disabled:true},
                        { field: 'orgAddress', label: '机构地址',disabled:true},
                        { field: 'distno', label: '地区编号',disabled:true},
                        { field: 'orgFax', label: '机构传真',disabled:true},
                        { field: 'distname', label: '地区名称'},
                        { field: 'status', label: '状态', type: 'select', dataCode: 'STD_ORG_STATUS', hidden: true},
                        { field: 'location', label: '位置属性', hidden: true},
                        { field: 'finaCode', label: '金融代码', hidden: true},
                        { field: 'creditUnionCode', label: '机构信用联社', hidden: true},
                        { field: 'areaCode', label: '机构录入字头', hidden: true},
                        { field: 'areaName', label: '珠三角地区标识', hidden: true},
                        { field: 'createTime', label: '创建时间'},
                        { field: 'createUser', label: '创建人'},
                        { field: 'lastUpdateUser', label: '最后修改人'},
                        { field: 'lastUpdateTime', label: '最后修改时间'}
                        ]
          }],
          updateButtons: [
        	  { label: '保存',type: 'primary',icon: 'check',hidden: false,
        		  click: function (model) {
        			  var validate = false;
        			  _self.$refs.reform.validate(function (valid) {
        				  validate = valid;
        			  });
        			  if (!validate) {
        				  return;
        			  }
        			  var rMethod = '';
        			  if (_self.viewType == 'EDIT') {
        				  rMethod = 'PUT';
        			  } else if (_self.viewType == 'ADD') {
        			  	  //新增默认机构状态为“"正常"
        			  	  model.status = '1';
                          model.isVirtOrg = _self.$refs.reformIsVirtOrg.formModel.isVirtOrg;
        				  rMethod = 'POST';
        				  //新增的时候需要校验机构是否已存在
						  yufp.service.request({
							  method: rMethod,
							  url: backend.consoleService + '/api/check/s/org',
							  data: model,
							  callback: function (code, message, response) {
								  if (response.rows == -1) {
									  _self.$message('该机构信息已存在！');
								  }else {
									  _self.$confirm('保存后立即生效，请确认是否继续！', '提示').then(function () {
										  yufp.service.request({
											  method: rMethod,
											  url: backend.consoleService + '/api/s/org',
											  data: model,
											  callback: function (code, message, response) {
												  if (response && response.rows >= 0) {
													  _self.$refs.reftable.remoteData();
													  _self.$message('操作成功！');
													  _self.dialogVisible = false;
												  }else {
													  _self.$message('操作失败！');
												  }
											  }
										  });
									  })
								  }
							  }
						  });
        			  }
        		  } },
        		  { label: '取消',type: 'primary',icon: 'yx-undo2',hidden: false,
        			  click: function (model) {
        				  _self.dialogVisible = false;
        			  } 
        		  },
        		  { label: '返回',type: 'primary',icon: 'yx-undo2',hidden: false,
        			  click: function (model) {
        				  _self.dialogVisible = false;
        			  } 
        		  }
        	],
            queryOrgFieldsEdit:[
                {placeholder: '机构代码', field: 'orgCode', type: 'input',disabled: true,
                    rules: [{required: true, message: '必填项', trigger: 'blur'}]}
            ],
            queryOrgButtonsEdit: [
                {
                    label: '查询', op: 'submit', type: 'primary', icon: 'search',  click: function (model, valid) {
                        if (valid) {
                            yufp.service.request({
                                method: "POST",
                                url: backend.consoleService + '/api/s/orgs/queryInfo',
                                data: {
                                    orgCode:model.orgCode,
                                    isVirtOrg:model.isVirtOrg,
                                },
                                callback: function (code, message, response) {
                                    // 重置表单，防止第二次点击查看时，为空数据出现上一次查看的数据
                                    _self.$refs.simpleForm.resetFn();
                                    if (response.success && response.code == '0') {
                                        yufp.extend(_self.$refs.simpleForm.formModel, response.rows);
                                    } else{
                                        _self.$message({ message:response.message, type: 'warning' });
                                    }
                                }
                            })
                        }
                    }
                }
            ],
          updateSimpleFields: [{
            columnCount: 3,
            fields: [
                { field: 'orgCode', label: '机构代码', disabled: true, needDis: true,rules: [{ required: true, message: '必填!', trigger: 'blur'}]},
                { field: 'orgName', label: '机构名称',rules: [{ required: true, message: '必填!', trigger: 'blur'}],disabled: true},
                { field: 'orgLevel', label:'机构层级',rules: [{ required: true, message: '必填!', trigger: 'blur'}], type: 'select', dataCode: 'ORG_LEVEL',
                    change:function(fields){
                        // 每次change都将上级机构代码擦除
                        _self.$nextTick(function () {
                            _self.$refs.simpleForm.formModel.orgParentCode = '';
                        });

                        if(fields == null || fields == "" || fields == ''){
                            _self.$refs.simpleForm.switch('orgParentCode', 'hidden', true);
                        }else{
                            if("1" === fields ){
                                _self.$message({message: '一级机构只能由系统管理员初始化！', type: 'warning'});
                            }
                            _self.$refs.simpleForm.switch('orgParentCode', 'hidden', false);
                        }
                    }},
                { field: 'orgParentCode', label: '上级机构代码',rules: [{ required: true, message: '必填!', trigger: 'blur'}], type: 'custom',
                    is: 'div-org-ctrl-selector', params:{orgLevel : ''},
                    clickFn:function(value,model,args){
                        _self.$refs.simpleForm.switch('orgParentCode','params',{orgLevel : model.orgLevel});
                        _self.$refs.simpleForm.rebuildFn();
                    }, hidden: true },
                { field: 'orgSimpleName', label: '机构简称',disabled:true},
                { field: 'orgEname', label: '机构英文名',disabled:true},
                { field: 'orderId', label: '排序字段', hidden: true },
                { field: 'orgManagerId', label: '机构负责人'},
                { field: 'orgTel', label: '机构联系电话',disabled:true},
                { field: 'launchDate', label: '开办日期', type: 'date',disabled:true},
                { field: 'orgZipcode', label: '机构邮编',disabled:true},
                { field: 'orgAddress', label: '机构地址',disabled:true},
                { field: 'distno', label: '地区编号',disabled:true},
                { field: 'orgFax', label: '机构传真',disabled:true},
                { field: 'distname', label: '地区名称'},
                { field: 'status', label: '状态', type: 'select', dataCode: 'STD_ORG_STATUS', hidden: true},
                { field: 'location', label: '位置属性', hidden: true},
                { field: 'finaCode', label: '金融代码', hidden: true},
                { field: 'creditUnionCode', label: '机构信用联社', hidden: true},
                { field: 'areaCode', label: '机构录入字头', hidden: true},
                { field: 'areaName', label: '珠三角地区标识', hidden: true},
                { field: 'isVirtOrg', label: '是否虚拟机构', hidden: true}
            ]
          }],
          
          updateSimpleButtons: [
            { label: '保存',type: 'primary',icon: 'check',hidden: false,
            	click: function (model) {
            		var validate = false;
            		_self.$refs.simpleForm.validate(function (valid) {
            			validate = valid;
            		});
            		if (!validate) {
            			return;
            		}
					_self.$confirm('保存后立即生效，请确认是否继续！', '提示').then(function () {
						yufp.service.request({
							method: 'POST',
							url: backend.consoleService + '/api/s/org/simple/name',
							data: model,
							callback: function (code, message, response) {
								if (response && response.rows >= 0) {
									_self.$refs.reftable.remoteData();
									_self.$message({message: '操作成功', type: 'success'});
									_self.simpleDiaVis = false;
								} else {
									_self.$message('操作失败');
								}
							}
						});
					})
            	} },
            { label: '取消',type: 'primary',icon: 'yx-undo2',hidden: false,
        		click: function (model) {
        			_self.simpleDiaVis = false;
        		} }
          ],
          simpleDiaVis: false,
          height: yufp.frame.size().height - 103,
          dialogVisible: false,
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
    		  _self.updateButtons[0].hidden = !editable;
    		  _self.updateButtons[1].hidden = !editable;
    		  _self.updateButtons[2].hidden =  editable;
    		  _self.formDisabled = !editable;
    		  _self.dialogVisible = true;
    	  },
    	  
    	  switchParamStatus: function (){
            	var _self = this;
            	var val = _self.viewType != 'DETAIL';
            	
            	_self.$refs.reform.switch('createTime',     'hidden', val);
            	_self.$refs.reform.switch('createUser', 	'hidden', val);
            	_self.$refs.reform.switch('lastUpdateUser', 'hidden', val);
            	_self.$refs.reform.switch('lastUpdateTime', 'hidden', val);
          },
    	  
    	  addFn: function () {
    		  var _self = this;
    		  _self.switchStatus('ADD', true);
    		  _self.$nextTick(function () {
    			  _self.switchParamStatus();
    			  _self.$refs.refq1.fm.orgCode='';
    			  _self.$refs.reform.resetFn();
    			  _self.$refs.reform.resetFields();
    		  });
    	  },
    	  
    	  modifyFn: function () {
    		  if (this.$refs.reftable.selections.length != 1) {
    			  this.$message({ message: '请先选择一条记录', type: 'warning' });
    			  return;
    		  }
			  var _self = this;
			  var obj = _self.$refs.reftable.selections[0];
    		  if('1' != obj.status){
				  _self.$message({ message: '只能修改机构状态为正常的机构信息！', type: 'warning' });
				  return;
			  }
			  _self.switchStatus('EDIT', true);
			  _self.$nextTick(function () {
				  _self.switchParamStatus();
				  _self.$refs.reform.resetFn();
    			  yufp.extend(_self.$refs.reform.formModel, obj);
    		  });
    	  },
    	  
    	  modifySimFn: function () {
    		  if (this.$refs.reftable.selections.length != 1) {
    			  this.$message({ message: '请先选择一条记录', type: 'warning' });
    			  return;
    		  }
    		  this.simpleDiaVis = true;
    		  this.$nextTick(function () {
    			  var obj = this.$refs.reftable.selections[0];
                  var _self = this;
                  var isV=obj.isVirtOrg;
    			  if("Y" == isV){
                      _self.$refs.simpleForm.switch('orgCode','disabled',true);
                      _self.$refs.simpleForm.switch('orgName','disabled',false);
                      _self.$refs.simpleForm.switch('orgSimpleName','disabled',false);
                      _self.$refs.simpleForm.switch('orgEname','disabled',false);
                      _self.$refs.simpleForm.switch('orgTel','disabled',false);
                      _self.$refs.simpleForm.switch('launchDate','disabled',false);
                      _self.$refs.simpleForm.switch('orgZipcode','disabled',false);
                      _self.$refs.simpleForm.switch('orgAddress','disabled',false);
                      _self.$refs.simpleForm.switch('distno','disabled',false);
                      _self.$refs.simpleForm.switch('orgFax','disabled',false);
                  }else{
                      _self.$refs.simpleForm.switch('orgCode','disabled',true);
                      _self.$refs.simpleForm.switch('orgName','disabled',true);
                      _self.$refs.simpleForm.switch('orgSimpleName','disabled',true);
                      _self.$refs.simpleForm.switch('orgEname','disabled',true);
                      _self.$refs.simpleForm.switch('orgTel','disabled',true);
                      _self.$refs.simpleForm.switch('launchDate','disabled',true);
                      _self.$refs.simpleForm.switch('orgZipcode','disabled',true);
                      _self.$refs.simpleForm.switch('orgAddress','disabled',true);
                      _self.$refs.simpleForm.switch('distno','disabled',true);
                      _self.$refs.simpleForm.switch('orgFax','disabled',true);
                  }
                  this.$refs.refqe.fm.orgCode = obj.orgCode;
                  this.$refs.refqe.fm.isVirtOrg = obj.isVirtOrg;
    			  yufp.extend(this.$refs.simpleForm.formModel, obj);
    		  });
    	  },
    	  
    	  infoFn: function () {
    		  if (this.$refs.reftable.selections.length != 1) {
    			  this.$message({ message: '请先选择一条记录', type: 'warning' });
    			  return;
    		  }
    		  this.switchStatus('DETAIL', false);
    		  this.$nextTick(function () {
    			  this.switchParamStatus();
    			  this.$refs.reform.resetFn();
    			  yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0]);
    		  });
    	  },
    	  
    	  deleteFn: function () {
    		  var _self = this;
    		  var selections = _self.$refs.reftable.selections;
    		  if (selections.length < 1) {
    			  _self.$message({ message: '请先选择一条记录', type: 'warning' });
    			  return;
    		  }
    		  // var len = selections.length, arr = [];
    		  // for (var i = 0; i < len; i++) {
    			//   arr.push(selections[i].orgCode);
    		  // }
			  var obj = _self.$refs.reftable.selections[0];
    		  _self.$confirm('是否注销机构【' + obj.orgName + '】?', '提示').
    		  then(function () {
    			  yufp.service.request({
    				  method: 'DELETE',
    				  url: backend.consoleService + '/api/s/org',
    				  data: {
    					  orgCode: obj.orgCode,
						  status: '0'
    				  },
    				  callback: function (code, message, response) {
    					  if (response.code == 0) {
    						  _self.$refs.reftable.remoteData();
    						  _self.$message('操作成功');
    					  } else {
    						  _self.$message(response.message);
    					  }
    				  }
    			  });
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
    	  }
    	  
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
