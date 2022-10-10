/**
 * @create by ligm on 2018-05-05
 * @description 业务流转任务信息
 */
define(['./custom/widgets/js/YufpBizPluginPageSelector.js',
    './custom/widgets/js/YufpBizFlowPreTaskSelector.js'], function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE,BIZ_PARAM_TYPE,BIZ_PLUGIN_TYPE');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
          	init: true,
            taskBaseParams: {
            	bizNodeId: data.bizNodeId
            },
            selectorParams: {
                selectType: 'page'
            },
            taskQueryFields: [
                { placeholder: '任务名称', field: 'taskName', type: 'input' },
                { placeholder: '业务插件类型', field: 'bizPluginType', type: 'select', dataCode: 'BIZ_PLUGIN_TYPE' }
            ],
            taskQueryButtons: [
              { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                  if (valid) {
                    _self.$refs.taskTable.remoteData(model);
                  }
                } },
              { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
            ],
  
            taskTableColumns: [
                { label: '任务编号', prop: 'taskId', sortable: true, resizable: true },
                { label: '任务名称', prop: 'taskName', sortable: true, resizable: true },
                { label: '前置任务编号', prop: 'previousTaskId', sortable: true, resizable: true },
                { label: '业务插件类型', prop: 'bizPluginType', dataCode: 'BIZ_PLUGIN_TYPE', sortable: true, resizable: true },
                { label: '业务插件名称', prop: 'bizPluginName', sortable: true, resizable: true },
                { label: '业务服务插件类', prop: 'bizServiceClass', sortable: true, resizable: true },
                { label: '业务服务插件方法', prop: 'bizPluginMethodName', sortable: true, resizable: true },
                { label: '页面插件地址', prop: 'bizPageUrl', sortable: true, resizable: true }
            ],
            taskUpdateFields: [{
                columnCount: 2,
                fields: [
                     { field: 'taskId', label: '任务编号', hidden: true, disabled: true},
                     { field: 'taskName', label: '任务名称', 
                        rules: [
                            { required: true, message: '必填项·', trigget: 'blur'},
                            { max: 64, message: '长度不能超过64', trigget: 'blur'}
                        ]
                     },
                     { field: 'previousTaskId', label: '前置任务编号', type: 'custom', is: 'yufp-biz-flow-pre-task-selector', params: {bizNodeId: data.bizNodeId}},
                     { field: 'bizPluginType', label: '业务插件类型', type: 'select', dataCode: 'BIZ_PLUGIN_TYPE', 
                        rules:[
                           { required: true, message: '必填项·', trigget: 'blur'}
                       ],
                       change: function() {
                       	    if(!_self.init) {
                               _self.switchPluginType(true);
                       	    } else {
                               _self.init = false;
                       	    }
                       }
                     },
                     { field: 'bizPluginId', label: '业务服务插件', hidden: true, type: 'custom', is: 'yufp-biz-plugin-page-selector', params: {selectType: ''}, 
                        selectFn: function(value, formModel, args) {
                           var pluginInfo = args[1];
                           
                           if(formModel.bizPluginType == _self.typeService) {
                               formModel.bizPluginName = pluginInfo.bizPluginName;
                               formModel.bizServiceClass = pluginInfo.bizServiceClass;
                               formModel.bizPluginMethodName = pluginInfo.bizPluginMethodName;
                           } else {
                               formModel.bizPluginName = pluginInfo.bizPluginName;
                               formModel.bizPageUrl = pluginInfo.bizPageUrl;
                           }
                           //查询插件参数
                           _self.queryPluginFn(formModel.bizPluginId);
                        },
                        clickFn: function() {
                            if(_self.$refs.taskForm.formModel.bizPluginType == _self.typeService) {
                                _self.$refs.taskForm.switch('bizPluginId', 'params', {selectType: 'service'});
                            } else {
                                _self.$refs.taskForm.switch('bizPluginId', 'params', {selectType: 'page'});
                            }
                        }
                     },
                     { field: 'bizPluginName', label: '业务插件名称', hidden: true},
                     { field: 'bizNodeId', label: '业务节点标识', hidden:  true},
                     { field: 'bizNodeName', label: '业务节点名称', hidden: true}
                ]
              },{
                 columnCount: 2,
                 fields: [
                     { field: 'bizServiceClass', label: '业务服务插件类', hidden: true, disabled: true},
                     { field: 'bizPluginMethodName', label: '业务服务插件方法', hidden: true, disabled: true}
                 ]
              },{
                 columnCount: 1,
                 fields: [
                    { field: 'bizPageUrl', label: '页面插件地址', hidden: true, disabled: true}
                ]
              },{
                 columnCount: 1,
                 fields: [
                    { field: 'remark', label: '备注', type: 'textarea',
                        rules:[
                           { max: 250, message: '长度不能超过250', trigget: 'blur'}
                       ]
                    }
                 ]
            }],
            taskUpdateButtons: [
              { label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                  _self.taskDialogVisible = false;
                } },
              { label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                  var validate = false;
                  _self.$refs.taskForm.validate(function (valid) {
                     validate = valid;
                  });
                  if (!validate) {
                     return;
                  }
                  
                  var rMethod = '';
                    if(_self.taskViewType == "EDIT") {
                        rMethod = 'PUT';
                    } else if(_self.taskViewType == "ADD") {
                        rMethod = 'POST';
                    }
                    
                  model.paramData = _self.mainGrid.data;
                  if(model.paramData && _self.mainGrid.deleteData) {
                  	 model.paramData = model.paramData.concat(_self.mainGrid.deleteData);
                  }
                  
                  yufp.service.request({
                    method: rMethod,
                    url: backend.flowService + '/api/biz/flow/task',
                    data: model,
                    callback: function (code, message, response) {
                      if (code == 0 && response.code == 0) {
                        _self.$refs.taskTable.remoteData();
                        _self.$message('操作成功');
                        _self.taskDialogVisible = false;
                      } else {
                        _self.$message('操作失败');
                      }
                    }
                  });
                } }
            ],
            taskDataUrl: backend.flowService + '/api/biz/flow/tasks',
            taskDialogVisible: false,
            taskFormDisabled: false,
            taskViewType: 'DETAIL',
            typeAddPage: 'A', //页面新增插件
            typeUpdatePage: 'U', //页面修改插件
            typeViewPage: 'V', //页面查看插件
            typeService: 'S',
            
            mainGrid: {
                data: null,
                deleteData: null,
                loading: false
            },
            
            paramType: yufp.lookup.find('BIZ_PARAM_TYPE', false),
            viewTitle: yufp.lookup.find('CRUD_TYPE', false)
          }
        },
        methods: {
        	/**
        	* @param ctrlCode 操作码
        	*/
        	checkPermission: function(ctrlCode) {
        		return data.editable;
        	},
          /**
          * @param viewType 表单类型
          * @param editable 可编辑,默认false
          */
          switchTaskStatus: function (viewType, editable) {
            var _self = this;
            _self.taskViewType = viewType;
            // _self.updateButtons[0].hidden = !editable;
            _self.taskUpdateButtons[1].hidden = !editable;
            _self.taskFormDisabled = !editable;
            _self.taskDialogVisible = true;
          },
          switchPluginType: function(isChange) {
             var _self = this;
             var pluginType = _self.$refs.taskForm.formModel.bizPluginType;
             
             //值是否改变
             if(isChange) {
                _self.$refs.taskForm.formModel.bizPluginId = '';
                _self.$refs.taskForm.switch('bizPluginId', 'rawValue', '');
                _self.$refs.taskForm.formModel.bizPluginName = '';
                _self.deleteTaskParam();
             } 
             
             if((pluginType == _self.typeAddPage) || (pluginType == _self.typeUpdatePage) || (pluginType == _self.typeViewPage)) { //页面插件
                _self.$refs.taskForm.switch('bizPluginId', 'hidden', false);
                //_self.$refs.taskForm.switch('bizPluginName', 'hidden', false);
                _self.$refs.taskForm.switch('bizServiceClass', 'hidden', true);
                _self.$refs.taskForm.switch('bizPluginMethodName', 'hidden', true);
                _self.$refs.taskForm.switch('bizPageUrl', 'hidden', false);
                
                if(isChange) {
                    _self.$refs.taskForm.formModel.bizPageUrl = '';
                }
             } else if(pluginType == _self.typeService) { //服务插件
                _self.$refs.taskForm.switch('bizPluginId', 'hidden', false);
                //_self.$refs.taskForm.switch('bizPluginName', 'hidden', false);
                _self.$refs.taskForm.switch('bizServiceClass', 'hidden', false);
                _self.$refs.taskForm.switch('bizPluginMethodName', 'hidden', false);
                _self.$refs.taskForm.switch('bizPageUrl', 'hidden', true);
                
                //值是否改变，清除数据
                if(isChange) {
                    _self.$refs.taskForm.formModel.bizServiceClass = '';
                    _self.$refs.taskForm.formModel.bizPluginMethodName = '';
                }
             } else {
                _self.$refs.taskForm.switch('bizPluginId', 'hidden', true);
                //_self.$refs.taskForm.switch('bizPluginName', 'hidden', true);
                _self.$refs.taskForm.switch('bizServiceClass', 'hidden', true);
                _self.$refs.taskForm.switch('bizPluginMethodName', 'hidden', true);
                _self.$refs.taskForm.switch('bizPageUrl', 'hidden', true);
                
                //值是否改变，清除数据
                if(isChange) {
                    _self.$refs.taskForm.formModel.bizServiceClass = '';
                    _self.$refs.taskForm.formModel.bizPluginMethodName = '';
                    _self.$refs.taskForm.formModel.bizPageUrl = '';
                }
             }
             _self.$refs.taskForm.rebuildFn();
          },
          swithSelector: function() {
            var _self = this;
            if(_self.$refs.taskForm.formModel.bizPluginType == _self.typeService) {
                _self.$refs.taskForm.switch('bizPluginId', 'params', {selectType: 'service'});
            } else {
                _self.$refs.taskForm.switch('bizPluginId', 'params', {selectType: 'page'});
            }
          },
          addTaskFn: function () {
            var _self = this;
            if(!data.bizNodeId) {
               this.$message({ message: '请在左侧选择节点信息', type: 'warning' });
               return;
            }
            
            _self.switchTaskStatus('ADD', true);
            _self.$nextTick(function () {
            	this.init = false;
                _self.$refs.taskForm.resetFn();
                _self.switchPluginType();
                _self.mainGrid.data = null;
                _self.mainGrid.deleteData = null;
                
                _self.$refs.taskForm.formModel.bizNodeId = data.bizNodeId;
                _self.$refs.taskForm.formModel.bizNodeName = data.bizNodeName;
            });
          },
          modifyTaskFn: function () {
            if (this.$refs.taskTable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            
            this.switchTaskStatus('EDIT', true);
            this.$nextTick(function () {
                //this.$refs.taskForm.resetFn();
                
                var obj = this.$refs.taskTable.selections[0];
                if(!this.$refs.taskForm.formModel.bizPluginType || this.$refs.taskForm.formModel.bizPluginType != obj.bizPluginType) {
                    this.init = true;
                } else {
                    this.init = false;
                }
                yufp.extend(this.$refs.taskForm.formModel, obj);
                
                //初始化选择器显示值
                this.$refs.taskForm.switch('bizPluginId', 'rawValue', this.$refs.taskForm.formModel.bizPluginName);
                this.switchPluginType();
                this.swithSelector();
                this.queryMainGridFn();
                
                this.paramType = yufp.lookup.find('BIZ_PARAM_TYPE', false);
            });
          },
          infoTaskFn: function () {
            if (this.$refs.taskTable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            this.switchTaskStatus('DETAIL', false);
            this.$nextTick(function () {
            	this.init = true;
            	this.$refs.taskForm.resetFn();
                yufp.extend(this.$refs.taskForm.formModel, this.$refs.taskTable.selections[0]);
                
                //初始化选择器显示值
                this.$refs.taskForm.switch('bizPluginId', 'rawValue', this.$refs.taskForm.formModel.bizPluginName);
                this.switchPluginType();
                this.swithSelector();
                this.queryMainGridFn();
                
                this.paramType = yufp.lookup.find('BIZ_PARAM_TYPE', false);
            });
          },
          deleteTaskFn: function () {
            var _self = this;
            var selections = _self.$refs.taskTable.selections;
            if (selections.length < 1) {
              _self.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            
            _self.$confirm('是否删除?', '提示', {type: 'warning'}).then(function() {
                var len = selections.length, arr = [];
                for (var i = 0; i < len; i++) {
                  arr.push(selections[i].taskId);
                }
                
                yufp.service.request({
                  method: 'DELETE',
                  url: backend.flowService + '/api/biz/flow/task',
                  data: {
                    taskId: arr.join(',')
                  },
                  callback: function (code, message, response) {
                    if (code == 0 && response.code == 0) {
                      _self.$refs.taskTable.remoteData();
                      _self.$message('操作成功');
                    } else {
                        _self.$message('操作失败');
                    }
                  }
                });
            }).catch(function(){});
          },
          rowClickFn: function(row) {
//            if (this.mainGrid.currentRow && this.mainGrid.currentRow !== row) {
//                this.mainGrid.currentRow.edit = false;
//            }
//            row.edit = true
//            this.mainGrid.currentRow = row;
          },
          deleteTaskParam: function() {
          	var _self = this;
          	//检查数据框存在时，先记录下删除标志
            if(_self.mainGrid.data) {
                _self.mainGrid.deleteData = [];
                _self.mainGrid.data.map(function(v) {
                    if(v.opFlag == 'update') {
                        _self.$set(v, 'opFlag', 'delete');
                        _self.mainGrid.deleteData.push(v);
                    }
                });
                _self.mainGrid.data = [];
            }
          },
          //查询业务参数
          queryPluginFn: function(pluginId) {
          	 var _self = this;
          	 //发起请求
             yufp.service.request({
                method: 'GET',
                url: backend.flowService + '/api/biz/plugin/paramsByPlugin',
                data: {bizPluginId: pluginId},
                callback: function (code, message, response) {
                	_self.deleteTaskParam();
                    _self.mainGrid.data = response.rows;
                    _self.mainGrid.loading = false;
                    //行对象添加sss响应式属性
                    _self.mainGrid.data = _self.mainGrid.data.map(function(v){
                        //_self.$set(v, 'edit', true);
                    	_self.$set(v, 'bizTargetParamCode', v.bizParamCode);
                        _self.$set(v, 'opFlag', 'add');
                        return v;
                    });
                }
             });
          },
          queryMainGridFn: function() {
            var _self = this;
            _self.mainGrid.loading = true;
            var param = {
            	taskId: _self.$refs.taskForm.formModel.taskId
            }
            //发起请求
            yufp.service.request({
                method: 'GET',
                url: backend.flowService + '/api/biz/flow/task/paramsByTask',
                data: param,
                callback: function (code, message, response) {
                    _self.mainGrid.data = response.rows;
                    _self.mainGrid.loading = false;
                    // 行对象添加响应式属性
                    _self.mainGrid.data = _self.mainGrid.data.map(function(v){
                        //_self.$set(v, 'edit', true);
                        _self.$set(v, 'opFlag', 'update');
                        return v;
                    });
                }
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
