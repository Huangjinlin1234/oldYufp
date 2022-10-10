/**
 * @create by fuzm on 2018-05-23
 * @description 信贷产品映射表
 */
define(function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE,PRD_THL_DRI,STD_ZX_YES_NO,STD_PRD_REPAY_MODE');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
    	    dataUrl: backend.consoleService + '/api/prd/info/maps',
            baseParams: {
            },
            queryFields: [
            { placeholder: '产品类型', field: 'prdThlDri', type: 'select', dataCode:'PRD_THL_DRI'  },
            { placeholder: '是否农户', field: 'agriFlg', type: 'select', dataCode:'STD_ZX_YES_NO'},
            { placeholder: '是否自助循环', field: 'repayWay', type: 'select', dataCode: 'STD_ZX_YES_NO' }
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
            { label: '产品主键', prop: 'prdPk', sortable: true, resizable: true },
        	  { label: '流水号', prop: 'serno', sortable: true, resizable: true },
            { label: '产品类型', prop: 'prdThlDri', sortable: true, resizable: true, dataCode:'PRD_THL_DRI' },
            { label: '是否农户', prop: 'agriFlg', sortable: true, resizable: true, dataCode:'STD_ZX_YES_NO' },
            { label: '是否自助循环', prop: 'repayWay', sortable: true, resizable: true, dataCode: 'STD_ZX_YES_NO'},
            { label: '省信贷业务品种', prop: 'bizType', sortable: true, resizable: true },
            { label: '业务品种名称', prop: 'bizTypeName', sortable: true, resizable: true },
            { label: '业务品种细分', prop: 'bizTypeSub', sortable: true, resizable: true },
            { label: '业务品种细分名称', prop: 'bizTypeSubName', sortable: true, resizable: true }
            ],
            updateFields: [{
              columnCount: 2,
              fields: [
                   { field: 'prdPk', label: '产品主键',rules:[
                       {required:true,message:'必填项',trigger:'blur'}
                   ]},
            	  	 { field: 'serno', label: '流水号', hidden:true},
                	 { field: 'prdThlDri', label: '产品类型', type: 'select', dataCode: 'PRD_THL_DRI',  
	                   	 rules: [
	                            { required: true, message: '必填项', trigger: 'blur' }
	                        ]},
                	 { field: 'agriFlg', label: '是否农户', type: 'select', dataCode: 'STD_ZX_YES_NO',  
	                   	 rules: [
	                            { required: true, message: '必填项', trigger: 'blur' }
	                        ]},
                	 { field: 'repayWay', label: '是否自助循环', type: 'select', dataCode: 'STD_ZX_YES_NO',  
	                   	 rules: [
	                            { required: true, message: '必填项', trigger: 'blur' }
	                        ]},
                	 { field: 'bizType', label: '省信贷业务品种',
	               		 rules: [
	                            { required: true, message: '必填项', trigger: 'blur' },
	                            { max: 12, message: '长度不能超过12', trigget: 'blur'}
	                        ]},
                	 { field: 'bizTypeName', label: '业务品种名称',
	               		 rules: [
	                            { required: true, message: '必填项', trigger: 'blur' },
	                            { max: 100, message: '长度不能超过100', trigget: 'blur'}
	                        ]},
                	 { field: 'bizTypeSub', label: '业务品种细分',
	               		 rules: [
	                            { required: true, message: '必填项', trigger: 'blur' },
	                            { max: 12, message: '长度不能超过12', trigget: 'blur'}
	                        ]},
                	 { field: 'bizTypeSubName', label: '业务品种细分名称',
	               		 rules: [
	                            { required: true, message: '必填项', trigger: 'blur' },
	                            { max: 100, message: '长度不能超过100', trigget: 'blur'}
	                        ]}
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
                    url: backend.consoleService + '/api/prd/info/map',
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
            _self.$confirm('是否删除?','提示',{type:'warning'}).then(function(){
    			var len = selections.length, arr = [];
                for (var i = 0; i < len; i++) {
                  arr.push(selections[i].serno);
                }
                yufp.service.request({
                  method: 'DELETE',
                  url: backend.consoleService + '/api/prd/info/map',
                  data: {
                	  serno: arr.join(',')
                  },
                  callback: function (code, message, response) {
                    if (code == 0) {
                      var responseCode = response.code;
    					 if(responseCode == 0){
    						 _self.$refs.reftable.remoteData();
    						 _self.$message('操作成功');
    					 }else{
    						 _self.$message(response.message);
    					 }
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
