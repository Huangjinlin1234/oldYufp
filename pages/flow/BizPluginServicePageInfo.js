/**
 * @create by ligm on 2018-05-05
 * @description 业务服务插件信息
 */
define(function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE,BIZ_PARAM_TYPE');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
            baseParams: {
            },
            queryFields: [
            { placeholder: '业务插件标识', field: 'bizPluginId', type: 'input' },
            { placeholder: '业务插件名称', field: 'bizPluginName', type: 'input' }
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
            { label: '业务插件标识', prop: 'bizPluginId', sortable: true, resizable: true },
            { label: '业务插件名称', prop: 'bizPluginName', sortable: true, resizable: true },
            { label: '业务服务插件类', prop: 'bizServiceClass', sortable: true, resizable: true },
            { label: '服务插件调用方法', prop: 'bizPluginMethodName', sortable: true, resizable: true }
            ],
            updateFields: [{
              columnCount: 2,
              fields: [
                	 { field: 'bizPluginId', label: '业务插件标识', hidden: true, disabled: true},
                	 { field: 'bizPluginName', label: '业务插件名称',
                	   rules:[
                           { required: true, message: '必填项', trigger: 'blur'},
                           { max: 80, message: '长度不能超过80', trigget: 'blur'}
                       ]
                	 },
                	 { field: 'bizServiceClass', label: '业务服务插件类',
                	   rules:[
                           { required: true, message: '必填项', trigger: 'blur'},
                           { max: 128, message: '长度不能超过128', trigget: 'blur'}
                       ]
                	 },
                	 { field: 'bizPluginMethodName', label: '服务插件调用方法',
                       rules:[
                           { required: true, message: '必填项', trigger: 'blur'},
                           { max: 60, message: '长度不能超过60', trigget: 'blur'}
                       ]
                	 }
              ]
            }, {
              columnCount: 1,
              fields: [
                     { field: 'remarks', label: '备注', type: 'textarea',
                       rules:[
                           { max: 250, message: '长度不能超过250', trigget: 'blur'}
                       ]
                     }
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
            		var url = '';
            		if(_self.viewType == "EDIT") {
            			rMethod = 'PUT';
            			url = backend.flowService + '/api/biz/plugin/service';
            		} else if(_self.viewType == "ADD") {
            			rMethod = 'POST';
            			url = backend.flowService + '/api/biz/plugin/service/back';
            		}

            		yufp.service.request({
            			method: rMethod,
            			url: url,
            			data: model,
            			callback: function (code, message, response) {
            				if (code == 0 && response.code == 0) {
            					_self.$refs.reftable.remoteData();

            					if (_self.viewType == "EDIT") {
            						_self.$message('操作成功');
            						_self.dialogVisible = true;
            						_self.paramTableShow = true;
            					} else {
            						var obj = response.rows;
            						if ( obj && obj.bizPluginId && obj.bizPluginId != ''){
            							_self.$message('操作成功');
            							_self.switchStatus('EDIT', true);
            							_self.paramTableShow = true;
            							_self.$nextTick(function () {
            								yufp.extend(this.$refs.reform.formModel, obj);
            								this.$refs.paramTable.remoteData({'bizPluginId':obj.bizPluginId});
            							});
            						}else {
            							_self.$message('操作失败');
            						}
            					}
            				}else{
            					_self.$message('操作失败');
            				}
            			}
            		});
            	} }
            ],
            
            paramTableColumns: [
                { label: '业务参数代码', prop: 'bizParamCode', sortable: true, resizable: true },
                { label: '业务参数类型', prop: 'bizParamIo', dataCode: 'BIZ_PARAM_TYPE', sortable: true, resizable: true },
                { label: '业务参数名称', prop: 'bizParamName', sortable: true, resizable: true },
                { label: '入参顺序号', prop: 'inParamOrder', sortable: true, resizable: true },
                { label: '入参class类', prop: 'paramClass', sortable: true, resizable: true },
                { label: '业务插件标识', prop: 'bizPluginId', sortable: true, resizable: true, hidden:true }
            ],
            paramUpdateFields: [{
              columnCount: 2,
              fields: [
                     { field: 'bizParamCode', label: '业务参数代码',
                        rules:[
                           { required: true, message: '必填项', trigger: 'blur'},
                           { max: 40, message: '长度不能超过40', trigget: 'blur'}
                       ]
                     },
                     { field: 'bizParamIo', label: '业务参数类型', type: 'select', dataCode: 'BIZ_PARAM_TYPE',
                    	 rules:[
                             { required: true, message: '必填项', trigger: 'blur'}
                         ]
//                    	 change: function () {
//                    		 _self.switchBizParamIo(true);
//                    	 }
                     },
                     { field: 'bizParamName', label: '业务参数名称', 
                        rules:[
                           { required: true, message: '必填项', trigger: 'blur'},
                           { max: 80, message: '长度不能超过80', trigget: 'blur'}
                       ]
                     },
                     { field: 'inParamOrder', label: '参数顺序号', type: 'num', hidden: false,
                         rules:[
                             { required: true, message: '必填项', trigger: 'blur', type: 'number'},
                             { validator: function(rule, value, callback){
                            	 if(value<0 || value>=100){
	                            		callback(new Error("须大于0，小于100"));
                            	 }else{
                            		 callback();
                            	 }
                             }}
                         ]
                     }
              ]
            }, {
                columnCount: 1,
                fields: [
                	{ field: 'paramClass', label: '参数class类', rows: 1, hidden: false,
                        rules:[
                            { required: true, message: '必填项', trigger: 'blur'},
                            { max: 100, message: '长度不能超过80', trigget: 'blur'}
                        ]
                    },
                    { field: 'remarks', label: '备注', type: 'textarea',
                        rules:[
                           { max: 250, message: '长度不能超过250', trigget: 'blur'}
                       ]
                    }
                ]
            }],
            paramUpdateButtons: [
              { label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                  _self.paramDialogVisible = false;
                } },
              { label: '保存' , type: 'primary', icon: 'check', hidden: false, click: function (model) {
                  var validate = false;
                  _self.$refs.paramForm.validate(function (valid) {
                    validate = valid;
                  });
                  if (!validate) {
                    return;
                  }
                  
                  var rMethod = '';
                    if(_self.paramViewType == "EDIT") {
                        rMethod = 'PUT';
                    } else if(_self.paramViewType == "ADD") {
                        rMethod = 'POST';
                    }
                  
                  yufp.service.request({
                    method: rMethod,
                    url: backend.flowService + '/api/biz/plugin/param',
                    data: model,
                    callback: function (code, message, response) {
                      if (code == 0 && response.code == 0) {
                        _self.$refs.paramTable.remoteData();
                        _self.$message('操作成功');
                        _self.paramDialogVisible = false;
                      } else {
                        _self.$message({ message: '操作失败', type: 'error' });
                      }
                    }
                  });
                } }
            ],
            
            dataUrl: backend.flowService + '/api/biz/plugin/services',
            height: yufp.frame.size().height - 103,
            dialogVisible: false,
            formDisabled: false,
            viewType: 'DETAIL',
            
            //插件参数
            paramTableShow: false,
            paramDataUrl: backend.flowService + '/api/biz/plugin/params',
            paramDialogVisible: false,
            paramFormDisabled: false,
            paramViewType: 'DETAIL',
            
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
            
            //是否显示参数table
            _self.paramTableShow = (viewType != 'ADD');
          },
          switchFieldStatus: function() {
          	var _self = this;
          	_self.$refs.reform.switch('bizPluginId', 'hidden', (_self.viewType == 'ADD'));
            _self.$refs.reform.rebuildFn();
          },
          addFn: function () {

            var _self = this;
            _self.switchStatus('ADD', true);
            _self.$nextTick(function () {
            	_self.switchFieldStatus();
                _self.$refs.reform.resetFn();
            });
          },
          modifyFn: function () {
            if (this.$refs.reftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            
            this.switchStatus('EDIT', true);
            this.$nextTick(function () {
            	this.switchFieldStatus();
                var obj = this.$refs.reftable.selections[0];
                yufp.extend(this.$refs.reform.formModel, obj);
                this.$refs.paramTable.remoteData({ bizPluginId: obj.bizPluginId });
            });
          },
          infoFn: function () {
            if (this.$refs.reftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            this.switchStatus('DETAIL', false);
            this.$nextTick(function () {
            	this.switchFieldStatus();
                yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0]);
                this.$refs.paramTable.remoteData({ bizPluginId: this.$refs.reftable.selections[0].bizPluginId });
            });
          },
          deleteFn: function () {
            var _self = this;
            var selections = _self.$refs.reftable.selections;
            if (selections.length < 1) {
              _self.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            
            _self.$confirm('是否删除?', '提示', {type: 'warning'}).then(function() {
            	var len = selections.length, arr = [];
                for (var i = 0; i < len; i++) {
                  arr.push(selections[i].bizPluginId);
                }
            
                yufp.service.request({
                  method: 'DELETE',
                  url: backend.flowService + '/api/biz/plugin/service',
                  data: {
                  	bizPluginId: arr.join(',')
                  },
                  callback: function (code, message, response) {
                    if (code == 0 && response.code == 0) {
                      _self.$refs.reftable.remoteData();
                      _self.$message('操作成功');
                    } else {
                    	_self.$message('操作失败');
                    }
                  }
                });
            }).catch(function(){});
          },
          switchParamStatus: function (viewType, editable) {
            var _self = this;
            _self.paramViewType = viewType;
            // _self.updateButtons[0].hidden = !editable;
            _self.paramUpdateButtons[1].hidden = !editable;
            _self.paramFormDisabled = !editable;
            _self.paramDialogVisible = true;
          },
          switchParamFieldStatus: function() {
             var _self = this;
             _self.$refs.paramForm.switch('bizParamCode', 'disabled', (_self.paramViewType != 'ADD'));
             _self.$refs.paramForm.switch('bizParamIo', 'disabled', (_self.paramViewType != 'ADD'));
             _self.$refs.paramForm.rebuildFn();
          },
          addParamFn: function () {
            var _self = this;
            _self.switchParamStatus('ADD', true);
            _self.$nextTick(function () {
            	_self.switchParamFieldStatus();
                _self.$refs.paramForm.resetFn();
                _self.$refs.paramForm.formModel.bizPluginId = _self.$refs.reform.formModel.bizPluginId;
            });
          },
          modifyParamFn: function () {
            if (this.$refs.paramTable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            this.switchParamStatus('EDIT', true);
            this.$nextTick(function () {
            	this.switchParamFieldStatus();
                yufp.extend(this.$refs.paramForm.formModel, this.$refs.paramTable.selections[0]);
            });
          },
          infoParamFn: function () {
            if (this.$refs.paramTable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            this.switchParamStatus('DETAIL', false);
            this.$nextTick(function () {
            	this.switchParamFieldStatus();
                yufp.extend(this.$refs.paramForm.formModel, this.$refs.paramTable.selections[0]);
            });
          },
          switchBizParamIo: function (isChange) {
        	  var _self = this;
              var bizParamIo = _self.$refs.paramForm.formModel.bizParamIo;
              if(isChange){
            	  //输入
            	  if('I'==bizParamIo){
            		  _self.$refs.paramForm.formModel.inParamOrder = '';
            		  _self.$refs.paramForm.switch('inParamOrder', 'hidden', false);
            		  _self.$refs.paramForm.formModel.paramClass = '';
            		  _self.$refs.paramForm.switch('paramClass', 'hidden', false);
            		  _self.$refs.paramForm.switch('inParamOrder', 'required', true);
            		  _self.$refs.paramForm.switch('paramClass', 'required', true);
            	  }else{
            		  _self.$refs.paramForm.switch('inParamOrder', 'required', false);
            		  _self.$refs.paramForm.switch('paramClass', 'required', false);
            	  }
              }
          },
          deleteParamFn: function () {
            var _self = this;
            var selections = _self.$refs.paramTable.selections;
            if (selections.length != 1) {
              _self.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            
            _self.$confirm('是否删除?', '提示', {type: 'warning'}).then(function() {
                yufp.service.request({
                  method: 'DELETE',
                  url: backend.flowService + '/api/biz/plugin/param',
                  data: {
                    bizParamCode: selections[0].bizParamCode,
                    bizPluginId: selections[0].bizPluginId,
                    bizParamIo: selections[0].bizParamIo
                  },
                  callback: function (code, message, response) {
                    if (code == 0) {
                      _self.$refs.paramTable.remoteData();
                      _self.$message('操作成功');
                    } else {
                        _self.$message('操作失败');
                    }
                  }
                });
            }).catch(function(){});
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
