/**
 * @create by ligm on 2018-12-26
 * @description 产品规则插槽参数
 */
define([
	'./custom/widgets/js/PrdInfoSelector.js'
],function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE,STD_YES_NO');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
        	dataUrl: backend.consoleService + '/api/prd/solt/rules',
            baseParams: {
            },
            
            queryFields: [
	            { placeholder: '产品编号', field: 'prdId', type: 'custom', is: 'div-prd-info-selector' },
	            { placeholder: '插槽代码', field: 'soltCode', type: 'input' },
	            { placeholder: '规则编号', field: 'ruleCode', type: 'input' },
	            { placeholder: '规则名称', field: 'ruleName', type: 'input' },
	            { placeholder: '启用状态', field: 'enableStatus', type: 'select', dataCode: 'STD_YES_NO'}
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
	            { label: '产品编号', prop: 'prdId', sortable: true, resizable: true },
	            { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
	            { label: '插槽代码', prop: 'soltCode', sortable: true, resizable: true },
	            { label: '规则编号', prop: 'ruleCode', sortable: true, resizable: true },
	            { label: '规则名称', prop: 'ruleName', sortable: true, resizable: true },
	            { label: '启用状态', prop: 'enableStatus', sortable: true, resizable: true, dataCode: 'STD_YES_NO' },
	            { label: '最近修改时间', prop: 'lastModifyTime', sortable: true, resizable: true, hidden: true },
	            { label: '最近修改用户', prop: 'lastModifyUser', sortable: true, resizable: true, hidden: true  }
            ],
            
            updateFields: [{
              columnCount: 2,
              fields: [
                	 { field: 'recordKeyid', label: '记录唯一编号'},
                	 { field: 'prdId', label: '产品编号'},
                	 { field: 'soltCode', label: '插槽代码'},
                	 { field: 'ruleCode', label: '规则编号'},
                	 { field: 'ruleName', label: '规则名称' }, 
                	 { field: 'enableStatus', label: '启用状态', type: 'select', dataCode: 'STD_YES_NO'},
            	 	 { field: 'lastModifyTime', label: '最近修改时间'},
            	 	 { field: 'lastModifyUser', label: '最近修改用户'}
              ]
            }],
            
            updateButtons: [
            	{ label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
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
            			url: backend.consoleService + '/api/prd/solt/rule',
            			data: model,
            			callback: function (code, message, response) {
            				if (code == 0) {
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
        	
        	switchParamStatus: function (){
              	var _self = this;
              	var val = this.viewType != 'DETAIL';
              	_self.$refs.reform.switch('recordKeyid',    'hidden', val);
              	_self.$refs.reform.switch('lastModifyTime', 'hidden', val);
              	_self.$refs.reform.switch('lastModifyUser', 'hidden', val);
            },
        	
        	addFn: function () {
        		var _self = this;
        		_self.switchStatus('ADD', true);
        		_self.$nextTick(function () {
        			_self.switchParamStatus();
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
        			this.switchParamStatus();
        			this.$refs.reform.resetFn();
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
        		var len = selections.length, arr = [];
        		for (var i = 0; i < len; i++) {
        			arr.push(selections[i].recordKeyid);
        		}

        		yufp.service.request({
        			method: 'DELETE',
        			url: backend.consoleService + '/api/prd/solt/rule',
        			data: {
        				recordKeyid: arr.join(',')
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
        	
        	/*exportFn: function () {
        		yufp.util.exportExcelByTable({
        			fileName: '下载文件',
        			importType: 'service', // page当前页 selected 选中的数据  service 后端数据
        			ref: this.$refs.reftable,
        			url: '',
        			param: {}
        		});
        	}*/
        	
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
