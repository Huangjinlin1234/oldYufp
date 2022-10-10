/**
 * @create by fuzm on 2018-05-07
 * @description 合同模板组信息表
 */
define([
  './custom/widgets/js/GrantAuthInfoDutySelector.js',
  './custom/widgets/js/GrantAuthInfoUserSelector.js'
],function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE,COMMON_STATUS,GRANT_TYPE');
     var vm = yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          var checkValue = function(valueA,valueB){
            	var  valueA = parseInt(valueA);
            	var  valueB = parseInt(valueB);
              if(valueA >= valueB){
              	  return true;
              	}else{
                  return false;
                }
              };
              	
          var checkEmpty = function(valueA,valueB){
          	   if(valueA=='' || valueA=="0" || valueB=="0" || valueB==''){
          	   	   return false;
          	   }else{
          	   	return true;
          	   }
          }
          
          return {
          	dataUrl: backend.consoleService + '/api/grant/auth/infos',
          	linkedDataUrl: backend.consoleService + '/api/grant/auth/duty/details',	
          	childLinkedDataUrl: backend.consoleService + '/api/grant/auth/user/details',
            sizeViw: 'small',
            baseParams: {
            },
            queryFields: [
//              { placeholder: '法人机构代码', field: 'legalOrgCode', type: 'input' },
              { placeholder: '授权表描述', field: 'grantDesc', type: 'input' },
              { placeholder: '配置状态', field: 'status', type:'select',dataCode:'COMMON_STATUS'}
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
            { label: '授权编码', prop: 'grantNo', sortable: true, resizable: true },
            { label: '授权表描述', prop: 'grantDesc', sortable: true, resizable: true},
            { label: '法人机构代码', prop: 'legalOrgCode',width:'120px', sortable: true, resizable: true },
            { label: '生效日期', prop: 'effectiveDate', sortable: true, resizable: true },
            { label: '失效日期', prop: 'expiryDate', sortable: true, resizable: true },
            { label: '配置状态', prop: 'status', type:'select',dataCode:'COMMON_STATUS',sortable: true, resizable: true },
            { label: '创建日期', prop: 'createTime', sortable: true, resizable: true },
            { label: '创建人', prop: 'createUser', sortable: true, resizable: true }
            ],
            updateLoading: false,
            updateFields: [{
              columnCount: 2,
              fields: [
                   { field: 'grantDesc', label: '授权表描述',rules:[
                   {required:true,message:'必填项',trigger:'blur'},
                   {max:300,message:'最大长度为300个字符',trigger:'blur'}
                   ]
                   },
                   { field: 'legalOrgCode', label: '法人机构代码',hidden:true,rules:[
                   {max:24,message:'最大长度为24',trigger:'blur'}
                   ]},
                   { field: 'effectiveDate', label: '生效日期',hidden:true},
                   { field: 'expiryDate', label: '失效日期',hidden:true},
                   { field: 'status', label: '配置状态',type:'select',dataCode:'COMMON_STATUS',hidden:true},
                   { field: 'createTime', label: '创建日期',hidden:true},
                   { field: 'createUser', label: '创建人',hidden:true}
                        
              ]
            }],
            
          
            updateButtons: [
              { label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                  var validate = false;
                  _self.$refs.reform.validate(function (valid) {
                    validate = valid;
                  });
                  if (!validate) {
                    return;
                  }
                  
                  var rMethod = '';
									if(_self.viewType == "EDIT") {
										rMethod = 'PUT';
									} else if(_self.viewType == "ADD") {
										rMethod = 'POST';
									}
                  vm.updateLoading = true;
                  yufp.service.request({
                    method: rMethod,
                    url: backend.consoleService + '/api/grant/auth/info',
                    data: model,
                    callback: function (code, message, response) {
                    	vm.updateLoading = false;
                      if (code == 0) {
                      _self.$refs.reftable.remoteData();
                      if ( _self.viewType == 'ADD' ) {
                      if ( response && response.data ) {
                             _self.$message('操作成功');
                              yufp.extend(_self.$refs.reform.formModel, response.data);
                             _self.$refs.linkedtable.remoteData(response.data);
                             _self.$refs.childLinkedtable.remoteData(response.data);
                             _self.viewType = 'EDIT';
                             _self.linkedVisible=true;
                             _self.updateButtons[2].hidden = false;
                             _self.grantVisible=true;
                             _self.sizeViw='full';
                         }else {
                              _self.$message('操作失败');
                         }
                         
                  }else {
                      _self.$message('操作成功');
                      _self.dialogVisible = false;
                  }
                 
                } else {
                      	_self.$message('操作失败');
                      }
                    }
                  });
                } },
                
                 { label: '提交', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                  var validate = false;
                  _self.$refs.reform.validate(function (valid) {
                    validate = valid;
                  });
                  if (!validate) {
                    return;
                  }

                  vm.updateLoading = true;
                  yufp.service.request({
                    url: backend.consoleService + '/api/grant/auth/commit/info',
                    method:'PUT',
                    data: model,
                    callback: function (code, message, response) {
                      vm.updateLoading = false;
                      if (code == 0) {
                        _self.$refs.reftable.remoteData();
                        _self.$message('操作成功');
                        _self.dialogVisible = false;
                      } else {
                        _self.$message('操作失败');
                      }
                    }
                  });
                } },
               { label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                  _self.dialogVisible = false;
                } }
            ],
            height: yufp.frame.size().height - 103,
            dialogVisible: false,
            formDisabled: false,
            viewType: 'DETAIL',
            linkViewType: 'DETAIL',
            viewTitle: yufp.lookup.find('CRUD_TYPE', false),
            expandCollapseName: ['base'],
            contTempInfo: {
               tableColumns: [
        /*    { label: '明细ID', prop: 'detailId', sortable: true, resizable: true },
            { label: '授权编码', prop: 'grantNo', sortable: true, resizable: true },
            { label: '授权类型', prop: 'grantType',type:'select',dataCode:'GRANT_TYPE', sortable: true, resizable: true },*/
            { label: '岗位代码', prop: 'grantObjVal', sortable: true, resizable: true },
            { label: '岗位名称', prop: 'grantObjName', sortable: true, resizable: true },
            { label: '最小金额', prop: 'crdMinAmt',width:'150px',type:'num',formatter: function(row, column, cellValue){
              return _self.toFixedNum(cellValue);
            }, sortable: true, resizable: true },
            { label: '最大金额', prop: 'crdMaxAmt',width:'150px', type:'num',formatter: function(row, column, cellValue){
              return _self.toFixedNum(cellValue);
            },sortable: true, resizable: true },
            { label: '创建日期', prop: 'createTime', sortable: true, resizable: true },
            { label: '创建人', prop: 'createUser', sortable: true, resizable: true }
            ],
               updateLoading: false,
               updateFields: [{
                  columnCount: 2,
                  fields: [
                /*  { field: 'grantNo', label: '授权编码',rules: [
                    { max:32,message: '最大长度为32为字符', trigger: 'blur' }
                  ]},*/
                   { field: 'grantType', label: '授权类型'},
                   { field: 'grantObjVal', label: '岗位代码',type: 'custom', is: 'grant-auth-duty-selector',rules: [
                     {required:true,message:'必填项',trigger:'blur'},
                    { max:80,message: '最大长度为80为字符', trigger: 'blur' }
                  ],selectFn: function (val, formModel, arguments){
                     /*arguments 是调用了 插件里面 的 , select-fn 返回的参数,
                     arguments[0]是值, arguments[1]是选择的整个列表数据*/
                       var org = arguments[1];
                       formModel.grantObjName= org.dutyName;
                  }},
                   { field: 'grantObjName', label: '岗位名称',rules: [
                    /*{ validator: yufp.validator.number, message: '数字', trigger: 'blur'}*/
                  ]},
                   { field: 'crdMinAmt', label: '最小金额',rules:[
                    /* {required: true, message: '必填项', trigger: 'blur'},*/
                     { validator: yufp.validator.gZero, message: '数字', trigger: 'blur'}
                   ]},
                   { field: 'crdMaxAmt', label: '最大金额',rules:[
                    /* {required: true, message: '必填项', trigger: 'blur'},*/
                     { validator: yufp.validator.gZero, message: '数字', trigger: 'blur'}
                   ]}
              ]
                }],
                 updateButtons: [
                  { label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                        var validate = false;
                        _self.$refs.linkedForm.validate(function (valid) {
                          validate = valid;
                        });
                        if (!validate) {  
                          return;
                        }
                        
                      var code = checkEmpty(_self.$refs.linkedForm.formModel.crdMaxAmt,_self.$refs.linkedForm.formModel.crdMinAmt);
                        if(!code){
                          _self.$message({ message: '最小金额要或者最大金额不能为空与0！', type: 'warning' });
                          return ;
                          }
                        var code = checkValue(_self.$refs.linkedForm.formModel.crdMaxAmt,_self.$refs.linkedForm.formModel.crdMinAmt);
                        if(!code){
                        	_self.$message({ message: '最小金额要小于或者等于最大金额！', type: 'warning' });
                          return ;
                          }
                          
                        var rMethod = '';
                      
                        if(_self.linkViewType == "EDIT") {
                          rMethod = 'PUT';
                        } else if(_self.linkViewType == "ADD") {
                          rMethod = 'POST';
                        }
                        //保留两位小数
                        _self.$refs.linkedForm.formModel.crdMaxAmt = _self.toFixedNum(model.crdMaxAmt);
                        _self.$refs.linkedForm.formModel.crdMinAmt  = _self.toFixedNum(model.crdMinAmt);
                        vm.updateLoading = true;
                        yufp.service.request({
                          method: rMethod,
                          url: backend.consoleService + '/api/grant/auth/detail',
                          data: model,
                          callback: function (code, message, response) {
                            vm.updateLoading = false;
                            if (code == 0) {
                            	 if (response && response.data == -2) {
                            	       vm.$message({ message: response.message, type: 'warning' });
                            	       _self.$refs.linkedtable.remoteData();
                            	 }else if(response && response.data == -3){
                            	 	     vm.$message({ message: response.message, type: 'warning' });
                            	 	     _self.$refs.linkedtable.remoteData();
                            	 }
                            	 else {
                            
                            	     _self.$refs.linkedtable.remoteData();
                                   _self.addLinkVisible = false;
                                   _self.$message('操作成功');
                            	 }
                            } else {
                              _self.$message('操作失败');
                            }
                          }
                        });
                    } },
                    { label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                      _self.addLinkVisible = false;
                    } }
                ]
            },
            
          grantInfo:{  
            tableColumns: [
      /*      { label: '明细ID', prop: 'detailId', sortable: true, resizable: true },
            { label: '授权编码', prop: 'grantNo', sortable: true, resizable: true },
            { label: '授权类型', prop: 'grantType',type:'select',dataCode:'GRANT_TYPE', sortable: true, resizable: true },*/
            { label: '用户代码', prop: 'grantObjVal', sortable: true, resizable: true },
            { label: '用户名称', prop: 'grantObjName', sortable: true, resizable: true },
            { label: '最小金额', prop: 'crdMinAmt',width:'150px', formatter: function(row, column, cellValue){
              return _self.toFixedNum(cellValue);
            },sortable: true, resizable: true },
            { label: '最大金额', prop: 'crdMaxAmt',width:'150px', formatter: function(row, column, cellValue){
              return _self.toFixedNum(cellValue);
            },sortable: true, resizable: true },
            { label: '创建日期', prop: 'createTime', sortable: true, resizable: true },
            { label: '创建人', prop: 'createUser', sortable: true, resizable: true }
            ],
               updateLoading: false,
               updateFields: [{
                  columnCount: 2,
                  fields: [
                   { field: 'grantType', label: '授权类型'},
                   { field: 'grantObjVal', label: '用户代码',type:'custom',is:'grant-auth-user-selector',rules: [
                      {required:true,message:'必填项',trigger:'blur'},
                      { max:80,message: '最大长度为80为字符', trigger: 'blur' }
                    ], selectFn: function (val, formModel, arguments){
                     /*arguments 是调用了 插件里面 的 , select-fn 返回的参数,
                     arguments[0]是值, arguments[1]是选择的整个列表数据*/
                       var org = arguments[1];
                       formModel.grantObjName= org.userName;
                    }},
                     { field: 'grantObjName', label: '用户名称',rules: [
                     /*{ validator: yufp.validator.number, message: '数字', trigger: 'blur'}*/
                   ]},
                   { field: 'crdMinAmt', label: '最小金额',rules:[
                     /*{required: true, message: '必填项', trigger: 'blur'},*/
                     { validator: yufp.validator.digit, message: '数字', trigger: 'blur'}
                   ]},
                   { field: 'crdMaxAmt', label: '最大金额',rules:[
                     /*{required: true, message: '必填项', trigger: 'blur'},*/
                     { validator: yufp.validator.digit, message: '数字', trigger: 'blur'}
                   ]},
                   { field: 'createTime', label: '创建日期',hidden:true,rules: [
                    { max:24,message: '最大长度为24为字符', trigger: 'blur' }
                  ]},
                   { field: 'createUser', label: '创建人',hidden:true,rules: [
                    {max:24,message: '最大长度为24为字符', trigger: 'blur' }
                  ]},
                   { field: 'lastUpdateUser', label: '最后修改人',hidden:true,rules: [
                      {max:24,message: '最大长度为24为字符', trigger: 'blur' }
                   ]},
                   { field: 'lastUpdateTime', label: '最后修改日期',hidden:true,rules: [
                    { max:24,message: '最大长度为24为字符', trigger: 'blur' }
                  ]}
                ]
                }],
                 updateButtons: [
                  { label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                        var validate = false;
                        _self.$refs.childLinkedForm.validate(function (valid) {
                          validate = valid;
                          
                        });
                        if (!validate) {
                          return;
                        }
                        
                     var code = checkEmpty(_self.$refs.childLinkedForm.formModel.crdMaxAmt,_self.$refs.childLinkedForm.formModel.crdMinAmt);
                        if(!code){
                          _self.$message({ message: '最小金额或者最大金额不能为空与0！', type: 'warning' });
                          return ;
                          }  
                        var code = checkValue(_self.$refs.childLinkedForm.formModel.crdMaxAmt,_self.$refs.childLinkedForm.formModel.crdMinAmt);
                        if(!code){
                          _self.$message({ message: '最小金额要小于或者等于最大金额！', type: 'warning' });
                          return ;
                          }
                        
                       var rMethod = '';
                      
                        if(_self.linkViewType == "EDIT") {
                          rMethod = 'PUT';
                        } else if(_self.linkViewType == "ADD") {
                          rMethod = 'POST';
                        }
      
                        vm.updateLoading = true;
                        //保留两位小数
                        model.crdMaxAmt = _self.toFixedNum(model.crdMaxAmt);
                        model.crdMinAmt  = _self.toFixedNum(model.crdMinAmt);
                        
                        yufp.service.request({
                          method: rMethod,
                          url: backend.consoleService + '/api/grant/auth/detail',
                          data: model,
                          callback: function (code, message, response) {
                            vm.updateLoading = false;
                            if (code == 0) {
                               if (response &&  response.data == -2) {
                                     vm.$message({ message: response.message, type: 'warning' });
                                     _self.$refs.childLinkedtable.remoteData(obj);
                               }else if(response && response.data == -3){
                               	    vm.$message({ message: response.message, type: 'warning' });
                                    _self.$refs.childLinkedtable.remoteData(obj);
                               }
                               else {
                                   _self.$refs.childLinkedtable.remoteData();
                                   _self.childAddLinkVisible = false;
                                   _self.$message('操作成功');
                               }
                            } else {
                              _self.$message('操作失败');
                            }
                          }
                        });
                    } },
                    { label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                      _self.childAddLinkVisible = false;
                    } }
                ]
          }, 
            
           
            linkedVisible: false,
            addLinkVisible: false,
            childLinkedVisible: false,
            childAddLinkVisible: false,
            grantVisible: true
          }
        },
        methods: {
        	/**
        	* @param ctrlCode 操作码
        	*/
        	checkPermission: function(ctrlCode) {
        		return !yufp.session.checkCtrl(ctrlCode, cite.menuId);
//        		return true;
        	},
          /**
          * @param viewType 表单类型
          * @param editable 可编辑,默认false
          */
          switchStatus: function (viewType, editable) {
          	this.updateLoading = false;
          	this.linkedVisible = viewType != 'ADD';
            var _self = this;
            _self.viewType = viewType;
            _self.updateButtons[0].hidden = !editable;
            _self.formDisabled = !editable;
            for (var i = 0; i < this.updateFields[0].fields.length; i++ ) {
              if ( this.updateFields[0].fields[i].needDis) {
                this.updateFields[0].fields[i].calcDisabled = viewType != 'ADD'; //如果是EDIT, 则不可修改
                this.updateFields[0].fields[i].disabled = viewType != 'ADD'; //如果是EDIT, 则不可修改
              }
              if ( this.updateFields[0].fields[i].needHid) {
                this.updateFields[0].fields[i].hidden = editable; 
              }
            }
            _self.dialogVisible = true;
          },
          
          switchParamStatus:function(){
          	var val = this.viewType != 'DETAIL'; 
          	this.$refs.reform.switch('legalOrgCode','hidden',val);
            this.$refs.reform.switch('status','hidden',val);
            this.$refs.reform.switch('legalOrgCode','calcDisabled',val);
            this.$refs.reform.switch('status','calcDisabled',val);
            this.$refs.reform.switch('effectiveDate','hidden',val);
            this.$refs.reform.switch('expiryDate','hidden',val);
            this.$refs.reform.switch('createUser','hidden',val);
            this.$refs.reform.switch('createTime','hidden',val);
          },
          addFn: function () {
            var _self = this;
            this.sizeViw='small';
            _self.switchStatus('ADD', true);
            _self.updateButtons[1].hidden = true;
            _self.updateButtons[0].hidden = false;
            _self.$nextTick(function () {
              	vm.switchParamStatus();
                _self.$refs.reform.resetFn();
            });
          },
          modifyFn: function () {
          	var _self = this;
          	var selections = _self.$refs.reftable.selections;
          	this.sizeViw='full';
          	_self.updateButtons[2].hidden = false;
          	_self.updateButtons[1].hidden = false;
          	_self.updateButtons[0].hidden = false;
            if (this.$refs.reftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            
             var obj = selections[0];
             if (obj.status !='0') {
              _self.$message({ message: '生效与失效授权设置不能修改', type: 'warning' });
              return;
            }
            
            this.switchStatus('EDIT', true);
            this.$nextTick(function () {
            	   vm.switchParamStatus();
            	   var _self = this;
            	  this.$refs.reform.resetFn();
            	  this.grantVisible = true;
                var obj = this.$refs.reftable.selections[0];
                 yufp.extend(this.$refs.reform.formModel, obj);
                 this.$refs.linkedtable.remoteData(obj);
                 this.$refs.childLinkedtable.remoteData(obj);
            });
          },
          
          infoFn: function () {
            if (this.$refs.reftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            this.switchStatus('DETAIL', false);
            this.sizeViw='full';
            this.$nextTick(function () {
            	vm.switchParamStatus();
            	this.grantVisible = false;
              this.updateButtons[1].hidden = true;
              this.updateButtons[0].hidden = true;
              this.$refs.reform.rebuildFn();
            	var obj =  this.$refs.reftable.selections[0]
              yufp.extend(this.$refs.reform.formModel, obj);
              this.$refs.linkedtable.remoteData(obj);
              this.$refs.childLinkedtable.remoteData(obj);
             
            });
          },
          deleteFn: function () {
            var _self = this;
            var selections = _self.$refs.reftable.selections;
            if (selections.length < 1) {
              _self.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            var obj = selections[0];
             if (obj.status !='0') {
              _self.$message({ message: '生效与失效授权设置不能删除', type: 'warning' });
              return;
            }
            
            var obj = selections[0];

            this.$confirm('是否删除授权配置？', '提示',{type:'warning'})
                  .then(function () {
                      yufp.service.request({
                        method: 'DELETE',
                        url: backend.consoleService + '/api/grant/auth/info',
                        data: {
                          grantNo: obj.grantNo
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
            
                  });
            
          },
     
//          失效合同模版组
          disableFn: function () {
              var selections = vm.$refs.reftable.selections;
              if (selections.length != 1) {
                vm.$message({ message: '请先选择一条记录', type: 'warning' });
                return;
              }
              
              var obj = vm.$refs.reftable.selections[0];
              if (obj.status =='0' || obj.status =='2') {
                  this.$message({ message: '待生效与失效授权设置不能失效', type: 'warning' });
                  return;
              }
              this.$confirm('是否失效授权配置？', '提示',{type:'warning'})
                  .then(function () {
                  
                  yufp.service.request({
                      method: 'PUT',
                      url: backend.consoleService +  '/api/grant/auth/status/info',
                      data: {
                        grantNo: obj.grantNo
                      },
                      callback: function (code, message, response) {
                        if (code == 0) {
                          if ( response.data < 0) {
                             vm.$message({ message: response.message, type: 'warning' });
                          }else {
                              vm.$refs.reftable.remoteData();
                              vm.$message('操作成功');
                          }
                        }else{
                          vm.$message('操作失败');
                        }
                      }
                    });
              });
              
          },
          
          //添加岗位授信明细关联
          addLinkFn: function () {
          	 this.addLinkVisible = true;
              this.linkViewType="ADD";
             this.$nextTick( function () {
             	var grantNo = this.$refs.reform.formModel.grantNo;
                this.$refs.linkedForm.resetFields();
                this.$refs.linkedForm.switch('grantNo','calcDisabled',true);
                this.$refs.linkedForm.switch('grantType','calcDisabled',true);
                this.$refs.linkedForm.switch('grantObjName','calcDisabled',true);
                this.$refs.linkedForm.formModel.grantType='01';
                this.$refs.linkedForm.formModel.grantNo = grantNo;
             });
          },
          
              //删除岗位授权明细关系
          deleteLinkFn: function () {
              var obj;
              var selections = vm.$refs.linkedtable.selections;
              if (selections.length != 1) {
                vm.$message({ message: '请先选择一条记录', type: 'warning' });
                return;
              }
              obj = vm.$refs.linkedtable.selections[0];
                this.$confirm('是否删除关联授信明细？', '提示',{type:'warning'})
                  .then(function () {
                     var grantNo = vm.$refs.linkedtable.selections[0].grantNo;
                      var detailId = vm.$refs.linkedtable.selections[0].detailId;
                      yufp.service.request({
                        method: 'DELETE',
                        url: backend.consoleService + '/api/grant/auth/detail',
                        data: {
                          detailId: obj.detailId,
                          grantNo: grantNo
                        },
                        callback: function (code, message, response) {
                          if (code == 0) {
                            var obj = vm.$refs.linkedtable.formModel;
                            vm.$refs.linkedtable.remoteData(obj);
                            vm.$message('操作成功');
                          } else {
                            vm.$message('操作失败');
                          }
                        }
                      });
            
                  });
          },
          
              //修改关联岗位授权明细关系
          modifyLinkFn: function () {
            var _self = this;
//            _self.updateButtons[2].hidden = false;
            if (this.$refs.linkedtable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            this.linkViewType="EDIT";
            this.addLinkVisible = true;
            this.$nextTick(function () {
                this.$refs.linkedForm.switch('grantNo','calcDisabled',true);
                this.$refs.linkedForm.switch('grantType','calcDisabled',true);
                this.$refs.linkedForm.switch('grantObjName','calcDisabled',true);
                var obj = this.$refs.linkedtable.selections[0];
                yufp.extend(this.$refs.linkedForm.formModel, obj);
                 this.$refs.linkedtable.remoteData(obj);
//                 this.$refs.childLinkedtable.remoteData(obj);
            });
          },
          
          //新增用户授权明细关联
          childAddLinkFn:function(){
             this.childAddLinkVisible = true;
             this.linkViewType="ADD";
             var grantNo = this.$refs.reform.formModel.grantNo;
             this.$nextTick( function () {
                this.$refs.childLinkedForm.resetFields();
                this.$refs.childLinkedForm.switch('grantNo','calcDisabled',true);
                this.$refs.childLinkedForm.switch('grantType','calcDisabled',true);
                this.$refs.childLinkedForm.switch('grantObjName','calcDisabled',true);
                this.$refs.childLinkedForm.formModel.grantType='02';
                this.$refs.childLinkedForm.formModel.grantNo = grantNo;
             });
          },
          
              //删除关联合同模版关系
          childDeleteLinkFn: function () {
              var obj;
              var selections = vm.$refs.childLinkedtable.selections;
              if (selections.length != 1) {
                vm.$message({ message: '请先选择一条记录', type: 'warning' });
                return;
              }
              obj = vm.$refs.childLinkedtable.selections[0];
                this.$confirm('是否删除关联授信明细？', '提示',{type:'warning'})
                  .then(function () {
                  	var grantNo = vm.$refs.childLinkedtable.selections[0].grantNo;
                      var detailId = vm.$refs.childLinkedtable.selections[0].detailId;
                      yufp.service.request({
                        method: 'DELETE',
                        url: backend.consoleService + '/api/grant/auth/detail',
                        data: {
                          detailId: obj.detailId,
                          grantNo: grantNo
                        },
                        callback: function (code, message, response) {
                          if (code == 0) {
                          	var obj = vm.$refs.childLinkedtable.formModel;
                            vm.$refs.childLinkedtable.remoteData(obj);
                            vm.$message('操作成功');
                          } else {
                            vm.$message('操作失败');
                          }
                        }
                      });
            
                  });
          },
            //修改关联用户授权明细关系
          childModifyLinkFn: function () {
            var _self = this;
            if (this.$refs.childLinkedtable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            this.linkViewType="EDIT";
            this.childAddLinkVisible = true;
            this.$nextTick(function () {
                this.$refs.childLinkedForm.switch('grantNo','calcDisabled',true);
                this.$refs.childLinkedForm.switch('grantType','calcDisabled',true);
                this.$refs.childLinkedForm.switch('grantObjName','calcDisabled',true);
                var obj = this.$refs.childLinkedtable.selections[0];
                yufp.extend(this.$refs.childLinkedForm.formModel, obj);
                 this.$refs.childLinkedtable.remoteData(obj);
            });
          },
          
           //保留两位小数
            toFixedNum : function (cellValue) {
                if (cellValue != null && cellValue != '')
                    cellValue = parseFloat((cellValue + '')).toFixed(2);
                else
                    cellValue = '';
                return cellValue;
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
