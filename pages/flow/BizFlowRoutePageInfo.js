/**
 * @create by ligm on 2018-05-05
 * @description 业务流转路由信息
 */
define(['./custom/widgets/js/YufpBizEventNodeSelector.js'], function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
            baseParams: {
            	bizEventId: data.bizEventId,
            	bizFlowId: data.bizFlowId
            },
            queryFields: [
                { placeholder: '业务流转路由名称', field: 'bizRouteName', type: 'input' }
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
                { label: '业务流转路由标识', prop: 'bizRouteId', hidden: true },
                { label: '业务流转路由名称', prop: 'bizRouteName', sortable: true, resizable: true },
                { label: '源业务节点标识', prop: 'bizSourceNodeId', sortable: true, resizable: true },
                { label: '源业务节点名称', prop: 'bizSourceNodeName', sortable: true, resizable: true },
                { label: '目标业务节点标识', prop: 'bizTargetNodeId', sortable: true, resizable: true },
                { label: '目标业务节点名称', prop: 'bizTargetNodeName', sortable: true, resizable: true },
                { label: '业务流转路由规则', prop: 'bizRouteRule', sortable: true, resizable: true, hidden:true }
            ],
            updateFields: [{
                columnCount: 2,
                fields: [
                     { field: 'bizEventId', label: '业务事件标志', value: data.bizEventId, hidden: true},
                     { field: 'bizFlowId', label: '业务流转标识', value: data.bizFlowId, hidden: true},
                     { field: 'bizRouteId', label: '业务流转路由标识', hidden: true},
                     { field: 'bizRouteName', label: '业务流转路由名称', 
                       rules: [
                           {required: true, message: '必填项', trigger: 'blur'},
                           {max: 80, message: '长度不能超过80', trigger: 'blur'}
                       ]
                     }
                ]
            },{
                columnCount: 2,
                fields: [
                	 { field: 'bizSourceNodeId', label: '源业务节点标识', type: 'custom', is: 'yufp-biz-event-node-selector', 
                	   params: {
                	       bizFlowId: data.bizFlowId,
                	       bizEventId: data.bizEventId
                	   },
                	   rules: [
                	       {required: true, message: '必填项', trigger: 'blur'}
                	   ],
                	   selectFn: function(value, formModel, args) {
                	   	   var nodeInfo = args[1];
                	   	   formModel.bizSourceNodeName = nodeInfo.bizNodeName;
                	   }
                	 },
                	 { field: 'bizSourceNodeName', label: '源业务节点名称', disabled: true,
                	   rules: [
                           {required: true, message: '必填项', trigger: 'blur'}
                       ]
                	 },
                	 { field: 'bizTargetNodeId', label: '目标业务节点标识', type: 'custom', is: 'yufp-biz-event-node-selector',
                	    params: {
                           bizFlowId: data.bizFlowId,
                           bizEventId: data.bizEventId
                        },
                	    rules: [
                           {required: true, message: '必填项', trigger: 'blur'}
                       ],
                       selectFn: function(value, formModel, args) {
                           var nodeInfo = args[1];
                           formModel.bizTargetNodeName = nodeInfo.bizNodeName;
                       }
                	 },
                	 { field: 'bizTargetNodeName', label: '目标业务节点名称', disabled: true,
                	    rules: [
                           {required: true, message: '必填项', trigger: 'blur'}
                       ]
                	 }
                ]
            },{
                columnCount: 1,
                fields: [
                	{ field: 'bizRouteRule', label: '业务流转路由规则', type: 'textarea',
                		rules: [
                            { max: 254, message: '长度不能超过254', trigger: 'blur' }
                        ]
                	},
                    { field: 'remarks', label: '备注', type: 'textarea',
                        rules: [
                            { max: 250, message: '长度不能超过250', trigger: 'blur' }
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
					if(_self.viewType == "EDIT") {
						rMethod = 'PUT';
					} else if(_self.viewType == "ADD") {
						rMethod = 'POST';
					}
                  
                  yufp.service.request({
                    method: rMethod,
                    url: backend.flowService + '/api/biz/flow/route',
                    data: model,
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
                } }
            ],
            dataUrl: backend.flowService + '/api/biz/flow/routes',
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
                var obj = this.$refs.reftable.selections[0];
                yufp.extend(this.$refs.reform.formModel, obj);
            });
          },
          infoFn: function () {
            if (this.$refs.reftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            this.switchStatus('DETAIL', false);
            this.$nextTick(function () {
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
            
            _self.$confirm('是否删除?', '提示', {type: 'warning'}).then(function() {
            	var len = selections.length, arr = [];
                for (var i = 0; i < len; i++) {
                  arr.push(selections[i].bizRouteId);
                }
            	
                yufp.service.request({
                  method: 'DELETE',
                  url: backend.flowService + '/api/biz/flow/route',
                  data: {
                  	bizRouteId: arr.join(',')
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

    }

});
