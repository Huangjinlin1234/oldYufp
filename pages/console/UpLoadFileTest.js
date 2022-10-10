/**
 * @create by ligm on 2019-03-04
 * @description 额度恢复记录表
 */
define(function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE,IMAGE_TYPE');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
        	dataUrl: backend.edocService +'/api/query/up/load/fileLists',
            baseParams: {
            },
            queryFields: [
	            { placeholder: '流水号', field: 'applySeq', type: 'input' },
	            { placeholder: '批次号', field: 'batch', type: 'input' },
	            { placeholder: '上传状态', field: 'state', type: 'input' }
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
            	{ label: '流水号', prop: 'applySeq', sortable: true, resizable: true },
  	     	  	{ label: '影像类型', prop: 'imageType', sortable: true, resizable: true, dataCode: 'IMAGE_TYPE' },
  	     	  	{ label: '影像批次号', prop: 'batch', sortable: true, resizable: true, width: '480'},
  	     		{ label: '上传状态', prop: 'state', sortable: true, resizable: true },
  	     		{ label: '进件日期', prop: 'startDate', sortable: true, resizable: true },
  	     		{ label: '上传时间', prop: 'createTime', sortable: true, resizable: true}
            ],
            
            updateFields: [{
              columnCount: 2,
              fields: [
                	 { field: 'applySeq', label: '流水号'},
                	 { field: 'filePath', label: '上传文件绝对路径'},
                	 { field: 'imageType', label: '影像类型', type:'select', dataCode: 'IMAGE_TYPE', hidden: true },
                	 { field: 'batch', label: '影像批次号', hidden: true },
                	 { field: 'state', label: '上传状态 ', hidden: true },
                	 { field: 'startDate', label: '进件日期', type:'date'},
                	 { field: 'certCode', label: '证件号码'},
                	 { field: 'cusName', label: '客户姓名'},
                	 { field: 'prdName', label: '产品名称'},
                	 { field: 'createTime', label: '上传时间', hidden: true }
              ]
            }],
            
            updateButtons: [
              { label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                  _self.dialogVisible = false;
                } },
              { label: '上传文件测试', type: 'primary', icon: 'check', hidden: false, click: function (model) {
            	  var validate = false;
            	  _self.$refs.reform.validate(function (valid) {
            		  validate = valid;
            	  });
            	  if (!validate) {
            		  return;
            	  }
            	  var dataUrl = '';
            	  var rMethod = '';
            	  if(_self.viewType == "EDIT") {
            		  rMethod = 'PUT';
            		  dataUrl = backend.edocService +'/api/update/batch/file';  //测试追加文件
            	  } else if(_self.viewType == "ADD") {
            		  dataUrl = backend.edocService +'/api/up/load/file';   //测试文件上传
            		  rMethod = 'POST';
            	  }

            	  yufp.service.request({
            		  method: rMethod,
            		  url: dataUrl,
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
        		var _self = this;
        		/*this.switchStatus('DETAIL', false);
        		this.$nextTick(function () {
        			yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0]);
        		});*/
        		var obj = _self.$refs.reftable.selections[0];
        		yufp.service.request({
        			method: 'POST',
        			url: backend.edocService +'/api/query/batch/file',  //批次信息查询测试
        			data: obj,
        			callback: function (code, message, response) {
        				if (code == 0) {
        					_self.$refs.reftable.remoteData();
        					_self.$message(response.message + message);
        				} else {
        					_self.$message('查询不到批次信息！');
        				}
        			}
        		});
        	},
        	
        	//文件下载测试
        	downloadFn: function() {
        		if (this.$refs.reftable.selections.length != 1) {
        			this.$message({ message: '请先选择一条记录', type: 'warning' });
        			return;
        		}
        		var _self = this;
        		var obj = _self.$refs.reftable.selections[0];
        		yufp.service.request({
        			method: 'POST',
        			url: backend.edocService +'/api/query/and/download',
        			data: obj,
        			callback: function (code, message, response) {
        				if (code == 0) {
        					_self.$refs.reftable.remoteData();
        					_self.$message(response.message + message);
        				} else {
        					_self.$message('查询不到批次信息！');
        				}
        			}
        		});
        	},
        	
        	//删除批次
        	deleteFn: function () {
        		var _self = this;
        		var selections = _self.$refs.reftable.selections;
        		if (selections.length < 1) {
        			_self.$message({ message: '请先选择一条记录', type: 'warning' });
        			return;
        		}
        		var len = selections.length, arr = [];
        		for (var i = 0; i < len; i++) {
        		}
        		var obj = _self.$refs.reftable.selections[0];
        		yufp.service.request({
        			method: 'DELETE',
        			url: backend.edocService + '/api/delete/batch/file',
        			data: obj,
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
