/**
 * @create by ligm on 2018-05-05
 * @description 业务流转节点信息
 */
define(function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE,BIZ_NODE_TYPE');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
            nodeBaseParams: {
            	bizFlowId: data.bizFlowId,
                bizStageId: data.bizStageId
            },
            nodeQueryFields: [
                { placeholder: '业务节点名称', field: 'bizNodeName', type: 'input' },
                { placeholder: '业务流转节点类型', field: 'bizNodeType', type: 'select', dataCode: 'BIZ_NODE_TYPE' }
            ],
            nodeQueryButtons: [
              { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                  if (valid) {
                    _self.$refs.nodeTable.remoteData(model);
                  }
                } },
              { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
            ],
            nodeTableColumns: [
                { label: '业务节点标识', prop: 'bizNodeId', sortable: true, resizable: true },
                { label: '业务节点名称', prop: 'bizNodeName', sortable: true, resizable: true },
                { label: '业务阶段名称', prop: 'bizStageName', sortable: true, resizable: true },
                { label: '业务流转节点类型', prop: 'bizNodeType', dataCode: 'BIZ_NODE_TYPE', sortable: true, resizable: true }
            ],
            nodeUpdateFields: [{
              columnCount: 2,
              fields: [
                 { field: 'bizNodeId', label: '业务节点标识', hidden: true, disabled: true },
                 { field: 'bizNodeName', label: '业务节点名称', 
                    rules:[
                       { required: true, message: '必填项', trigger: 'blur'},
                       { max: 80, message: '长度不能超过80', trigget: 'blur'}
                   ]
                 },
                 { field: 'bizNodeType', label: '业务流转节点类型', type: 'select', dataCode: 'BIZ_NODE_TYPE',
                    rules:[
                       { required: true, message: '必填项', trigger: 'blur'}
                   ]
                 },
                 { field: 'bizFlowId', label: '业务流转标识', hidden: true},
                 { field: 'bizFlowName', label: '业务流转名称', hidden: true},
                 { field: 'bizStageId', label: '业务阶段标识', hidden: true},
                 { field: 'bizStageName', label: '业务阶段名称', hidden: true}
              ]
            }, {
                columnCount: 1,
                fields: [
                    { field: 'remark', label: '备注', type: 'textarea',
                        rules:[
                           { max: 250, message: '长度不能超过250', trigget: 'blur'}
                       ]
                    }
                ]
            }],
            nodeUpdateButtons: [
              { label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                  _self.nodeDialogVisible = false;
                } },
              { label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                  var validate = false;
                  _self.$refs.nodeForm.validate(function (valid) {
                     validate = valid;
                  });
                  if (!validate) {
                     return;
                  }
                  
                  var rMethod = '';
                    if(_self.nodeViewType == "EDIT") {
                        rMethod = 'PUT';
                    } else if(_self.nodeViewType == "ADD") {
                        rMethod = 'POST';
                    }
                  
                  yufp.service.request({
                    method: rMethod,
                    url: backend.flowService + '/api/biz/flow/node',
                    data: model,
                    callback: function (code, message, response) {
                      if (code == 0 && response.code == 0) {
                        _self.$refs.nodeTable.remoteData();
                        data.refreshTree();
                        _self.$message('操作成功');
                        _self.nodeDialogVisible = false;
                      } else {
                        _self.$message('操作失败');
                      }
                    }
                  });
                } }
            ],
            nodeDataUrl: backend.flowService + '/api/biz/flow/nodes',
            nodeDialogVisible: false,
            nodeFormDisabled: false,
            nodeViewType: 'DETAIL',
            
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
          switchNodeStatus: function (viewType, editable) {
            var _self = this;
            _self.nodeViewType = viewType;
            // _self.updateButtons[0].hidden = !editable;
            _self.nodeUpdateButtons[1].hidden = !editable;
            _self.nodeFormDisabled = !editable;
            _self.nodeDialogVisible = true;
            _self.showTaskTable = (viewType != 'ADD');
          },
          addNodeFn: function () {
            var _self = this;
            if(!data.bizFlowId || !data.bizStageId) {
               this.$message({ message: '请在左侧选择一条信息', type: 'warning' });
               return;
            }
            
            _self.switchNodeStatus('ADD', true);
            _self.$nextTick(function () {
                _self.$refs.nodeForm.resetFn();
                
                _self.$refs.nodeForm.formModel.bizFlowId = data.bizFlowId;
                _self.$refs.nodeForm.formModel.bizFlowName = data.bizFlowName;
                _self.$refs.nodeForm.formModel.bizStageId = data.bizStageId;
                _self.$refs.nodeForm.formModel.bizStageName = data.bizStageName;
            });
          },
          modifyNodeFn: function () {
            if (this.$refs.nodeTable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            this.switchNodeStatus('EDIT', true);
            this.$nextTick(function () {
            var obj = this.$refs.nodeTable.selections[0];
                yufp.extend(this.$refs.nodeForm.formModel, obj);
            });
          },
          infoNodeFn: function () {
            if (this.$refs.nodeTable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            this.switchNodeStatus('DETAIL', false);
            this.$nextTick(function () {
                yufp.extend(this.$refs.nodeForm.formModel, this.$refs.nodeTable.selections[0]);
            });
          },
          deleteNodeFn: function () {
            var _self = this;
            var selections = _self.$refs.nodeTable.selections;
            if (selections.length < 1) {
              _self.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            var len = selections.length, arr = [];
            for (var i = 0; i < len; i++) {
              arr.push(selections[i].bizNodeId);
            }
            
            _self.$confirm('是否删除?', '提示', {type: 'warning'}).then(function() {
                yufp.service.request({
                  method: 'DELETE',
                  url: backend.flowService + '/api/biz/flow/node',
                  data: {
                    bizNodeId: arr.join(',')
                  },
                  callback: function (code, message, response) {
                    if (code == 0) {
                      _self.$refs.nodeTable.remoteData();
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
