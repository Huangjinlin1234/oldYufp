/**
 * @create by ligm on 2018-05-05
 * @description 业务流转过程配置
 */
define(['./custom/widgets/js/YufpBizFlowNodeSelector.js',
    './custom/widgets/js/YufpSDutySelector.js'],
    function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
            baseParams: {
                bizFlowId: data.bizFlowId,
                bizEventId: data.bizEventId
            },
            tableColumns: [
                { label: '业务流转标识', prop: 'bizFlowId', hidden: true},
                { label: '业务阶段标识', prop: 'bizStageId', hidden: true},
                { label: '业务阶段名称', prop: 'bizStageName', hidden: true},
                { label: '业务事件标识', prop: 'bizEventId', hidden: true },
                { label: '业务节点标识', prop: 'bizNodeId', sortable: true, resizable: true },
                { label: '业务节点名称', prop: 'bizNodeName', sortable: true, resizable: true },
                { label: '业务流转节点类型', prop: 'bizNodeType', dataCode: 'BIZ_NODE_TYPE', sortable: true, resizable: true },
                { label: '业务节点处理岗位编号', prop: 'bizNodeDutyNo', sortable: true, resizable: true },
                { label: '业务节点处理岗位名称', prop: 'bizNodeDutyName', sortable: true, resizable: true },
                { label: '人员任务处理上限', prop: 'maxAprvNum', sortable: true, resizable: true }
            ],
            updateFields: [{
              columnCount: 2,
              fields: [
                     { field: 'bizNodeId', label: '业务节点标识', type: 'custom', is: 'yufp-biz-flow-node-selector', params: {bizFlowId: data.bizFlowId},
                        rules: [
                            {required: true, message: '必填项', trigger: 'blur'}
                        ],
                        selectFn: function(value, formModel, args) {
                            var nodeInfo = args[1];
                            formModel.bizNodeName = nodeInfo.bizNodeName;
                            formModel.bizStageId = nodeInfo.bizStageId;
                            formModel.bizStageName = nodeInfo.bizStageName;
                            formModel.bizNodeType = nodeInfo.bizNodeType;
                        }
                     },
                     { field: 'bizNodeName', label: '业务节点名称', disabled: true,
                        rules: [
                            {required: true, message: '必填项', trigger: 'blur'}
                        ]
                     },
                     { field: 'bizStageId', label: '业务阶段标识', hidden: true},
                     { field: 'bizStageName', label: '业务阶段名称', disabled: true, 
                        rules: [
                            {required: true, message: '必填项', trigger: 'blur'}
                        ]
                     },
                     { field: 'bizNodeType', label: '业务流转节点类型', type:'select', dataCode: 'BIZ_NODE_TYPE', disabled: true,
                        rules: [
                            {required: true, message: '必填项', trigger: 'blur'}
                        ]
                     },
                     { field: 'bizNodeDutyNo', label: '业务节点处理岗位编号', type: 'custom', is: 'yufp-s-duty-selector', 
                        selectFn: function(value, formModel, args) {
                            var dutyInfo = args[1];
                            formModel.bizNodeDutyName = dutyInfo.dutyName;
                        }
                     },
                     { field: 'bizNodeDutyName', label: '业务节点处理岗位名称', disable: true},
                     { field: 'maxAprvNum', label: '人员任务处理上限', type: 'num' },
                     { field: 'bizFlowId', label: '业务流转标识', hidden: true},
                     { field: 'bizEventId', label: '业务事件标识', hidden: true},
                     { field: 'bizProcessOrder', label: '业务流转处理顺序', hidden: true }
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
                    if(_self.viewType == "EDIT") {
                        rMethod = 'PUT';
                    } else if(_self.viewType == "ADD") {
                        rMethod = 'POST';
                    }
                  
                  yufp.service.request({
                    method: rMethod,
                    url: backend.flowService + '/api/biz/flow/process',
                    data: model,
                    callback: function (code, message, response) {
                      if (code == 0 && response.code == 0) {
                        _self.$refs.reftable.remoteData();
                        _self.$message({message: '操作成功', type: 'success'});
                        _self.dialogVisible = false;
                      } else {
                         _self.$message({message: '操作失败', type:'error'});
                      }
                    }
                  });
                } }
            ],
            dataUrl: backend.flowService + '/api/biz/flow/processs',
            dialogVisible: false,
            eventCfgRootId: 'flowProcess',
            flowProcessdialogVisible: false,
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
        		return data.editable;
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
            	_self.$refs.reform.switch('bizNodeId', 'disabled', (_self.viewType != 'ADD'));
            	_self.$refs.reform.rebuildFn();
                _self.$refs.reform.resetFn();
                
                _self.$refs.reform.formModel.bizFlowId = data.bizFlowId;
                _self.$refs.reform.formModel.bizEventId = data.bizEventId;
            });
          },
          modifyFn: function () {
        	  var _self = this;
            if (this.$refs.reftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            this.switchStatus('EDIT', true);
            this.$nextTick(function () {
            	_self.$refs.reform.switch('bizNodeId', 'disabled', (_self.viewType != 'ADD'));
            	_self.$refs.reform.rebuildFn();
                var obj = this.$refs.reftable.selections[0];
                yufp.extend(this.$refs.reform.formModel, obj);
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
            	_self.$refs.reform.switch('bizNodeId', 'disabled', (_self.viewType != 'ADD'));
                yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0]);
            });
          },
          deleteFn: function () {
            var _self = this;
            var selections = _self.$refs.reftable.selections;
            if (selections.length != 1) {
                _self.$message({ message: '请先选择一条记录', type: 'warning' });
                return;
            }
            
            _self.$confirm('是否删除?', '提示', {type: 'warning'}).then(function() {
                yufp.service.request({
                  method: 'DELETE',
                  url: backend.flowService + '/api/biz/flow/process',
                  data: {
                    bizFlowId: selections[0].bizFlowId,
                    bizNodeId: selections[0].bizNodeId,
                    bizEventId: selections[0].bizEventId
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
          cfgFn: function(cfgType) {
        	  var _self = this;
              _self.flowProcessdialogVisible = true;
              _self.eventCfgType = cfgType;
              _self.$nextTick(function () {
                   if(cfgType == 'route') {
                       var paramData = {
                       	   editable: data.editable,
                           bizFlowId: data.bizFlowId,
                           bizEventId: data.bizEventId
                       };
                       yufp.router.to("FLOW_BizFlowRouteInfo", paramData, _self.eventCfgRootId);
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
