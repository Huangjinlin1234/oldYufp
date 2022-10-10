/**
 * @create by ligm on 2018-05-05
 * @description 业务流转信息
 */
define(['./custom/widgets/js/YufpBizPluginPageSelector.js',
    './custom/widgets/js/YufpBizFlowPreTaskSelector.js',
    './custom/widgets/js/BizFlowInfoSelector.js'    
    ], 
    function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE,BIZ_NODE_TYPE,BIZ_FLOW_TYPE,BIZ_PLUGIN_TYPE');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
            queryFields: [
	            { placeholder: '业务流转标识', field: 'bizFlowId', type: 'input'},
	            { placeholder: '业务流转名称', field: 'bizFlowName', type: 'input' },
	            { placeholder: '业务流转类型', field: 'bizFlowType', type: 'select', dataCode: 'BIZ_FLOW_TYPE' }
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
	            { label: '业务流转标识', prop: 'bizFlowId', sortable: true, resizable: true },
	            { label: '业务流转名称', prop: 'bizFlowName', sortable: true, resizable: true },
	            { label: '业务流转类型', prop: 'bizFlowType', dataCode: 'BIZ_FLOW_TYPE', sortable: true, resizable: true },
	            { label: '法人机构代码', prop: 'legalOrgCode', sortable: true, resizable: true }
            ],
            
            updateFields: [{
            	columnCount: 2,
            	fields: [
            		{ field: 'bizFlowId', label: '业务流转标识', hidden: true, disabled: true },
            		{ field: 'bizFlowName', label: '业务流转名称',
            			rules:[
            				{ required: true, message: '必填项', trigger: 'blur'},
            				{ max: 80, message: '长度不能超过80', trigget: 'blur'}
            				]
            		},
            		{ field: 'bizFlowType', label: '业务流转类型', type: 'select', dataCode: 'BIZ_FLOW_TYPE',
            			rules:[
            				{ required: true, message: '必填项', trigger: 'blur'}
            				]
            		}
            		]
            }, {
            	columnCount: 1,
            	fields: [
            		{ field: 'remarks', label: '备注', type: 'textarea'},
            		]
            }, {
            	columnCount: 2,
            	fields: [
            		{ field: 'legalOrgCode', label: '法人机构代码', disabled:true},
            		{ field: 'createTime', label: '创建日期', disabled:true},
            		{ field: 'createUser', label: '创建人', disabled:true},
            		{ field: 'lastUpdateUser', label: '最后修改人', disabled:true},
            		{ field: 'lastUpdateTime', label: '最后修改日期', disabled:true}
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
            			url: backend.flowService + '/api/biz/flow/info',
            			data: model,
            			callback: function (code, message, response) {
            				if (code == 0 && response.code == 0) {
            					_self.$refs.reftable.remoteData();
            					_self.$message('操作成功');
            					_self.dialogVisible = false;
            				} else {
            					_self.$message('操作失败');
            				}
            			}
            		});
            	} }
            ],
            dataUrl: backend.flowService + '/api/biz/flow/infos',
            height: yufp.frame.size().height - 103,
            dialogVisible: false,
            cfgDialogVisible: false,
            formDisabled: false,
            viewType: 'DETAIL',
            cfgTitle: '',
            cfgViewType: 'DETAIL',
            
            //tree
            treeDataUrl: backend.flowService + '/api/biz/flow/cfgTree',
            treeParam: {},
            dataRoot: '000000',
            
            //eventTree
            eventTreeDataUrl: backend.flowService + '/api/biz/flow/eventCfgTree',
            eventTreeParam: {},
            eventDataRoot: '000000',
            
            //tab
            tabName: 'baseCfg',
            
            viewTitle: yufp.lookup.find('CRUD_TYPE', false),

            copyDialogVisible:false,
            copyUpdateFields:[
            	{
            		columnCount: 1,
            		fields: [
            			{ field: 'bizFlowId', label: '业务流转标识',
            				rules:[
            					{ required: true, message: '必填项', trigger: 'blur'},
            					{ max: 24, message: '长度不能超过24', trigget: 'blur'}
            					] },
            					{ field: 'legalOrgCode', label: '法人机构代码',
            						rules:[
            							{ required: true, message: '必填项', trigger: 'blur'},
            							{ max: 24, message: '长度不能超过24', trigget: 'blur'}
            							]
            					},
            					{ field: 'createUser', label: '创建人',
            						rules:[
            							{ required: true, message: '必填项', trigger: 'blur'},
            							{ max: 24, message: '长度不能超过24', trigget: 'blur'}
            							]
            					}
            					]
            	}
              ],
              
              copyUpdateButtons: [{
            	  label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
            		  _self.copyDialogVisible = false;
            	  }
              },
              {
            	  label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
            		  var validate = false;
            		  _self.$refs.copyForm.validate(function (valid) {
            			  validate = valid;
            		  });
            		  if (!validate) {
            			  return;
            		  }

            		  _self.$confirm('复制一条数据?  业务流转标识 : '+ _self.$refs.copyForm.formModel.bizFlowId + '', '提示', {type: 'warning'}).then(function () {
            			  yufp.service.request({
            				  method: 'POST',
            				  url: backend.flowService + '/api/biz/flow/copy',
            				  data: model,
            				  callback: function (code, message, response) {
            					  if (code == 0 && response.code == 0) {
            						  _self.$refs.reftable.remoteData();
            						  _self.$message('操作成功');
            						  _self.copyDialogVisible = false;
            					  } else {
            						  _self.$message('操作失败');
            					  }
            				  }
            			  });
            		  }).catch(function (reason) {  });
            	  }
              }],
              syncDialogVisible: false,
              syncSureBtn: false,
              syncUpdateFields: [
            	  {
            		  columnCount: 1,
            		  fields: [{ 
            			  field: 'srcFlowId', label: '源业务流程', type: 'custom', is:'div-biz-flow-info-selector',
            			  params: null,
            			  rules: [ { required: true, message: '必选项', trigger: 'blur' } ]
            		  },
            		  { 
            			  field: 'targetFlowId', label: '目标业务流程', type: 'custom', is:'div-biz-flow-info-selector',
            			  params: null, disabled: true, rawValue: null,
            			  rules: [ { required: true, message: '必选项', trigger: 'blur' } ]
            		  }]
            	  }
               ]
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
        	},
        	
        	switchFieldStatus: function() {
        		var _self = this;
        		_self.$refs.reform.switch('bizFlowId', 'hidden', (_self.viewType == 'ADD'));
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
        			yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0]);
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
        				arr.push(selections[i].bizFlowId);
        			}

        			yufp.service.request({
        				method: 'DELETE',
        				url: backend.flowService + '/api/biz/flow/info',
        				data: {
        					bizFlowId: arr.join(',')
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

        	configViewFn: function() {
        		var _self = this;
        		var selections = _self.$refs.reftable.selections;
        		if (selections.length != 1) {
        			_self.$message({ message: '请先选择一条记录', type: 'warning' });
        			return;
        		}

        		//设置title
        		_self.cfgTitle = _self.$refs.reftable.selections[0].bizFlowName;
        		_self.cfgViewType = "DETAIL";

        		_self.treeParam.bizFlowId = _self.$refs.reftable.selections[0].bizFlowId;
        		_self.dataRoot = _self.$refs.reftable.selections[0].bizFlowId;
        		_self.eventTreeParam.bizFlowId = _self.$refs.reftable.selections[0].bizFlowId;
        		_self.eventDataRoot = _self.$refs.reftable.selections[0].bizFlowId;
        		_self.cfgDialogVisible = true;
        	},

        	//配置
        	configFn: function () {
        		var _self = this;
        		var selections = _self.$refs.reftable.selections;
        		if (selections.length != 1) {
        			_self.$message({ message: '请先选择一条记录', type: 'warning' });
        			return;
        		}
        		//设置title
        		_self.cfgTitle = _self.$refs.reftable.selections[0].bizFlowName;
        		_self.cfgViewType = "EDIT";

        		_self.treeParam.bizFlowId = _self.$refs.reftable.selections[0].bizFlowId;
        		_self.dataRoot = _self.$refs.reftable.selections[0].bizFlowId;
        		_self.eventTreeParam.bizFlowId = _self.$refs.reftable.selections[0].bizFlowId;
        		_self.eventDataRoot = _self.$refs.reftable.selections[0].bizFlowId;
        		_self.cfgDialogVisible = true;
//        		_self.$nextTick(function () {
//        			_self.$refs.cfgTree.remoteData();
//        		});
        	},

        	nodeClickFn: function(nodeData, node, self) {
        		var _self = this;
        		//解除之前选中的
        		var checkedNodes = _self.$refs.cfgTree.getCheckedNodes();
        		for(var index in checkedNodes) {
        			_self.$refs.cfgTree.setChecked(checkedNodes[index], false);
        		}
        		//设置当前节点选中
        		node.checked = true;

        		if(nodeData.nodeType == 'stage'){
        			var data = {
        					editable: (_self.cfgViewType == 'DETAIL') ? false : true,
        							bizFlowId: nodeData.bizFlowId,
        							bizFlowName: nodeData.bizFlowName,
        							bizStageId: nodeData.data.bizStageId,
        							bizStageName: nodeData.data.bizStageName,
        							refreshTree: function() {
        								_self.$refs.cfgTree.remoteData();
        							}
        			};
        			yufp.router.to("FLOW_BizFlowNodeInfo", data, "cfgInfo");
        		} else if(nodeData.nodeType == 'node') {
        			var data = {
        					editable: (_self.cfgViewType == 'DETAIL') ? false : true,
        							bizNodeId: nodeData.data.bizNodeId,
        							bizNodeName: nodeData.data.bizNodeName
        			};
        			yufp.router.to("FLOW_BizFlowTaskInfo", data, "cfgInfo");
        		}
        	},
        	
        	eventNodeClickFn: function(nodeData, node, self) {
        		var _self = this;
        		//解除之前选中的
        		var checkedNodes = _self.$refs.eventCfgTree.getCheckedNodes();
        		for(var index in checkedNodes) {
        			_self.$refs.eventCfgTree.setChecked(checkedNodes[index], false);
        		}
        		//设置当前节点选中
        		node.checked = true;

        		if(nodeData.nodeType == 'event') {
        			var data = {
        					editable: (_self.cfgViewType == 'DETAIL') ? false : true,
        							bizFlowId: nodeData.bizFlowId,
        							bizFlowName: nodeData.bizFlowName,
        							bizEventId: nodeData.data.bizEventId,
        							bizEventName: nodeData.data.bizEventName,

        			};
        			yufp.router.to("FLOW_BizFlowProcessInfo", data, "eventCfgInfo");
        			//yufp.router.to("FLOW_BizFlowEventChart", data, "eventCfgInfo");
        		}
        	},
        	
        	copyFn: function () {
        		var _self = this;
        		_self.copyDialogVisible = true;
        		_self.$nextTick(function () {
        			_self.$refs.copyForm.resetFn();
        		});
        	},

        	syncFn: function() {
        		var arr = this.$refs.reftable.selections;
        		if (arr.length != 1) {
        			this.$message({ message: '请先选择一条要同步的目标业务流转记录!', type: 'warning' });
        			return;
        		}
        		var _self = this;
        		_self.syncDialogVisible = true;
        		_self.$nextTick(function () {
        			_self.$refs.syncForm.resetFn();
        			var param = {
        					query: 'condition',
        					bizFlowType: arr[0].bizFlowType
        			};
        			_self.$refs.syncForm.switch('srcFlowId', 'params', param);
        			_self.$refs.syncForm.switch('targetFlowId', 'params', param);
        			_self.$refs.syncForm.switch('targetFlowId', 'rawValue', arr[0].bizFlowName);
        			_self.$refs.syncForm.formModel.targetFlowId = arr[0].bizFlowId;

        		});
        	},

        	sureSyncFn: function() {
        		var _self = this;
        		var validate = false;
        		_self.$refs.syncForm.validate(function (valid) {
        			validate = valid;
        		});
        		if (!validate) {
        			return;
        		}
        		var srcFlowId = _self.$refs.syncForm.formModel.srcFlowId;
        		var targetFlowId = _self.$refs.syncForm.formModel.targetFlowId;
        		if ( srcFlowId == targetFlowId ){
        			_self.$message({type: 'warning', message: '源业务流转标识和目标业务流转标识不允许是同一个!'});
        			return ;
        		}

        		_self.$confirm('同步一条数据?源业务流转标识:'+ srcFlowId + '同步到目标业务流转标识:' + targetFlowId, 
        				'提示',  {type: 'warning'}).then(function () {
        					var param = {
        							srcFlowId: srcFlowId,
        							targetFlowId: targetFlowId
        					};
        					_self.syncSureBtn = true;
        					yufp.service.request({
        						method: 'POST',
        						url: backend.flowService + '/api/biz/flow/info/sync',
        						data: param,
        						callback: function (code, message, response) {
        							_self.syncSureBtn = false;
        							if (response && response.data === true) {
        								_self.$message('同步成功!');
        								_self.syncDialogVisible = false;
        							} else {
        								_self.$message('同步失败!');
        							}
        						}
        					});
        				}).catch(function (reason) {  });
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
