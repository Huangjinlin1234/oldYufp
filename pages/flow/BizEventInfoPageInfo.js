/**
 * @create by ligm on 2018-05-05
 * @description 业务流转事件信息
 */
define(['./custom/widgets/js/YufpBizStageSelector.js'], function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE,BIZ_FLOW_TYPE');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
        	stageSeletorParam: {
        		bizFlowType: null
        	},
          	dataUrl: backend.flowService + "/api/biz/event/infos",
            baseParams: {
            },
            queryFields: [
                { placeholder: '业务事件名称', field: 'bizEventName', type: 'input' },
                { placeholder: '业务流转类型', field: 'bizFlowType', type: 'select', dataCode: 'BIZ_FLOW_TYPE'}
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
                { label: '业务事件标识', prop: 'bizEventId', sortable: true, resizable: true },
                { label: '业务事件名称', prop: 'bizEventName', sortable: true, resizable: true },
                { label: '业务流转类型', prop: 'bizFlowType', dataCode: 'BIZ_FLOW_TYPE', sortable: true, resizable: true },
                { label: '业务阶段标识', prop: 'bizStageId', sortable: true, resizable: true },
                { label: '业务阶段名称', prop: 'bizStageName', sortable: true, resizable: true },
            ],
            updateFields: [{
              columnCount: 2,
              fields: [
                	 { field: 'bizEventId', label: '业务事件标识', hidden: false, disabled: false, 
                		 rules: [
                             { required: true, message: '必填项', trigger: 'blur'},
                             { max: 32, message: '长度不能超过32', trigger: 'blur'}
                           ]},
                	 { field: 'bizEventName', label: '业务事件名称',
                	   rules: [
                         { required: true, message: '必填项', trigger: 'blur'},
                         { max: 80, message: '长度不能超过80', trigger: 'blur'}
                       ]
                	 },
                	 { field: 'bizFlowType', label: '业务流转类型', type: 'select', dataCode: 'BIZ_FLOW_TYPE',
                	   rules: [
                         { required: true, message: '必填项', trigger: 'blur'}
                       ],
                       change: function(value, formModel, args) {
                    	   _self.$refs.reform.switch('bizStageId', 'params', {bizFlowType: value});
                       }
                	 },
                	 { field: 'bizStageId', label: '业务阶段标识', type: 'custom', is: 'yufp-biz-stage-selector', params: {bizFlowType: null},
                	   selectFn: function(value, formModel, args){
                	   	   var stageInfo = args[1];
                	   	   formModel.bizStageName = stageInfo.bizStageName;
                	   },
                	   rules: [
                	       { required: true, message: '必填项', trigger: 'blur' }
                	   ]
                	 },
                	 { field: 'bizStageName', label: '业务阶段名称', disabled: true, 
                	   rules: [
                           { required: true, message: '必填项', trigger: 'blur' }
                       ]
                	 }
              ]
            }, {
                columnCount: 1,
                fields: [
                    { field: 'remarks', label: '备注', type: 'textarea',
                        rules: [
                            { max: 250, message: '长度不能超过250', trigger: 'blur'}
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
                    url: backend.flowService + '/api/biz/event/info',
                    data: model,
                    callback: function (code, message, response) {
                      if (code == 0 && response.code == 0) {
                        _self.$refs.reftable.remoteData();
                        _self.$message('操作成功');
                        _self.dialogVisible = false;
                      } else {
                    	  if(response.message){
                    		  _self.$message(response.message);
                    	  }else{
                    		  _self.$message({message: '操作失败', type: 'error'});
                    	  }
                      }
                    }
                  });
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
            _self.updateButtons[1].hidden = !editable;
            _self.formDisabled = !editable;
            _self.dialogVisible = true;
          },
          switchFieldStatus: function() {
              var _self = this;
              _self.$refs.reform.switch('bizEventId', 'disabled', (_self.viewType != 'ADD'));
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
        	  var _self = this;
            if (this.$refs.reftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            this.switchStatus('EDIT', true);
            this.$nextTick(function () {
            	_self.switchFieldStatus();
            	var obj = this.$refs.reftable.selections[0];
            	_self.$refs.reform.switch('bizStageId', 'params', {bizFlowType: obj.bizFlowType});
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
            	_self.switchFieldStatus();
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
            var len = selections.length, arr = [];
            for (var i = 0; i < len; i++) {
              arr.push(selections[i].bizEventId);
            }
            _self.$confirm('是否删除?', '提示', {type: 'warning'}).then(function() {
                yufp.service.request({
                  method: 'DELETE',
                  url: backend.flowService + '/api/biz/event/info',
                  data: {
                  	bizEventId: arr.join(',')
                  },
                  callback: function (code, message, response) {
                    if (code == 0 && response.code == 0) {
                      _self.$refs.reftable.remoteData();
                      _self.$message('操作成功');
                    } else {
                    	_self.$message({message: '操作失败', type: 'error'});
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
