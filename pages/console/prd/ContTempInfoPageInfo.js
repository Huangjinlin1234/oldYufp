/**
 * @create by fuzm on 2018-05-07
 * @description 合同模板信息表
 */
define(function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE,CONT_TEMP_TYPE,CONT_TYPE,STD_ZX_YES_NO');
      var vm = yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
            dataUrl: backend.consoleService + '/api/cont/temp/infos',
            downloadUrl: backend.consoleService + '/api/cont/temp/info/download',
            baseParams: {
            },
            queryFields: [
                /*{ placeholder: '合同模板ID', field: 'contTempId', type: 'input' },*/
                { placeholder: '合同模板名称', field: 'contTempName', type: 'input' },
                { placeholder: '模板种类', field: 'contTempType', type: 'select', dataCode: 'CONT_TEMP_TYPE' },
                { placeholder: '合同类型', field: 'contType', type: 'select', dataCode: 'CONT_TYPE' },
                { placeholder: '法人机构码', field: 'legalOrgCode', type: 'input' },
                { placeholder: '状态', field: 'status', type: 'select', dataCode: 'COMMON_STATUS' }
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
           /* { label: '合同模板ID', prop: 'contTempId',  resizable: true },*/
            { label: '合同模板名称', prop: 'contTempName', sortable: true, resizable: true },
            { label: '模板种类', prop: 'contTempType', resizable: true, dataCode: 'CONT_TEMP_TYPE'  },
            { label: '合同类型', prop: 'contType', resizable: true, dataCode: 'CONT_TYPE' },
            { label: '模板文件名', prop: 'contTempPath', resizable: true },
            { label: '是否最高额合同', prop: 'maxLmtContFlag', resizable: true, dataCode: 'STD_ZX_YES_NO' },
            { label: '法人机构码', prop: 'legalOrgCode' },
            { label: '状态', prop: 'status', resizable: true, dataCode: 'COMMON_STATUS' }
            ],
            updateLoading: false,
            updateFields: [{
              columnCount: 2,
              fields: [
                	 { field: 'contTempId', label: '合同模板ID',  placeholder: '系统自动生成', disabled: true, hidden: true },
                	 { field: 'contTempName', label: '合同模板名称', rules: [ { required: true, message: '请输入合同模版名称'}, { max: 300, message: '最大长度为300'} ] },
                	 { field: 'contTempType', label: '模板种类',rules: [ { required: true, message: '必填项'}], type: 'select', dataCode: 'CONT_TEMP_TYPE' },
                	 { field: 'contType', label: '合同类型', rules: [ { required: true, message: '必填项'}],type: 'select', dataCode: 'CONT_TYPE' },
                	 { field: 'maxLmtContFlag', label: '是否最高额合同', rules: [ { required: true, message: '必填项'}],type: 'select', dataCode: 'STD_ZX_YES_NO' },
                   { field: 'contTempPath', label: '模板文件名',rules: [ { required: true, message: '必填项'}], type: 'input' },
                	 { field: 'status', label: '状态', rules: [ { required: true, message: '必填项'}],type: 'select', dataCode: 'COMMON_STATUS', hidden: true, needHid: true }
              ]
            }, {
                columnCount:2,
                fields: [ 
                  { field: 'legalOrgCode', label: '法人机构码', hidden: true },
                  { field: 'createUser', label: '创建人', hidden: true },
                	{ field: 'createTime', label: '创建日期', hidden: true }
                ]
            }],
            updateButtons: [
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
                  vm.updateLoading = true;
                  yufp.service.request({
                    method: rMethod,
                    url: backend.consoleService + '/api/cont/temp/info',
                    data: model,
                    callback: function (code, message, response) {
                    	vm.updateLoading = false;
                      if (code == 0) {
                          if ( response && response.data == -2) {
                              _self.$message({ message: response.message, type: 'warning' });
                          }else {
                            _self.$refs.reftable.remoteData();
                            _self.$message('操作成功');
                            _self.dialogVisible = false;
                          }
                      } else {
                      	_self.$message('操作失败');
                      }
                    }
                  });
                } },
                 { label: '提交', type: 'primary', icon: 'check', hidden: false, click: function (model) {
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
                  vm.updateLoading = true;
                  yufp.service.request({
                    method: rMethod,
                    url: backend.consoleService + '/api/cont/temp/info/submit',
                    data: model,
                    callback: function (code, message, response) {
                      vm.updateLoading = false;
                      if (code == 0) {
                        if ( response && response.data == -2) {
                            _self.$message({ message: response.message, type: 'warning' });
                        }else {
                           _self.dialogVisible = false;
                           _self.$refs.reftable.remoteData();
                          _self.$message('操作成功');
                        }
                      } else {
                        _self.$message('操作失败');
                      }
                    }
                  });
                } },
                { label: '下载', type: 'info', icon: 'yx-cloud-download', hidden: this.viewType != 'ADD', click: function (model) {
                  var fileName = _self.$refs.reform.formModel.contTempPath;
                  window.location.href = _self.downloadUrl + '?fileName=' + fileName;
                } },
                { label: '返回', type: 'info', icon: 'yx-undo2', hidden: false, click: function (model) {
                  _self.dialogVisible = false;
                } }
            ],
            height: yufp.frame.size().height - 103,
            dialogVisible: false,
            formDisabled: false,
            viewType: 'DETAIL',
            viewTitle: yufp.lookup.find('CRUD_TYPE', false)
          };
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
            vm.updateLoading = false;
            var _self = this;
            _self.viewType = viewType;
            _self.updateButtons[0].hidden = !editable;
            _self.updateButtons[2].hidden = !editable;
            _self.formDisabled = !editable;
            _self.dialogVisible = true;
          },
          switchParamStatus: function () {
             var val = this.viewType != 'DETAIL';
              this.$refs.reform.switch('legalOrgCode', 'hidden', val);
              this.$refs.reform.switch('createTime', 'hidden', val);
              this.$refs.reform.switch('createUser', 'hidden', val);
//              this.$refs.reform.switch('lastUpdateUser', 'hidden', val);
//              this.$refs.reform.switch('lastUpdateTime', 'hidden', val);
              this.$refs.reform.rebuildFn();
          },
          addFn: function () {
            var _self = this;
            _self.switchStatus('ADD', true);
            _self.$nextTick(function () {
            	  this.updateButtons[1].hidden=false;
                this.switchParamStatus();
                this.$refs.reform.resetFn();    
            });
          },
          modifyFn: function () {
            if (this.$refs.reftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            var obj = this.$refs.reftable.selections[0];
            if ( obj.status != '0' ) {
              this.$message({ message: '只能修改待生效的合同模版', type: 'warning' });
            	return ;
            }
            this.switchStatus('EDIT', true);
            this.$nextTick(function () {
            	this.updateButtons[1].hidden=false;
              this.switchParamStatus();
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
            	 this.$refs.reform.resetFields();
//            	 this.updateButtons[0].hidden=true;
            	 this.updateButtons[1].hidden=true;
            	 this.updateButtons[2].hidden=false;
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
            var obj = selections[0];
            if ( obj.status != '0'  ) {
            	_self.$message({ message: '只能删除待生效的合同模版!', type: 'warning' });
            	 return ;
            }
            
            this.$confirm('是否删除合同模版？', '提示')
                  .then(function () {
                  	
                    yufp.service.request({
                      method: 'DELETE',
                      url: backend.consoleService +  '/api/cont/temp/info',
                      data: {
                        contTempId: obj.contTempId
                      },
                      callback: function (code, message, response) {
                        if (code == 0) {
                         
                          if ( response && response.data == -2) {
                              _self.$message({ message: response.message, type: 'warning' });
                          }else {
                             _self.$refs.reftable.remoteData();
                            _self.$message('操作成功');
                          }
                        } else {
                          _self.$message('操作失败');
                        }
                      }
                    });
                 
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
          },
          disableFn: function () {
              var selections = vm.$refs.reftable.selections;
              if (selections.length != 1) {
                vm.$message({ message: '请先选择一条记录', type: 'warning' });
                return;
              }
              var obj = vm.$refs.reftable.selections[0];
              if ( obj.status != '1' ) {
                vm.$message({ message: '只有生效状态才能失效', type: 'warning' });
              	return ;
              }
              this.$confirm('是否失效合同模版？', '提示')
                  .then(function () {
                  
                  yufp.service.request({
                      method: 'POST',
                      url: backend.consoleService +  '/api/cont/temp/info/disable',
                      data: {
                        contTempId: obj.contTempId
                      },
                      callback: function (code, message, response) {
                        if (code == 0) {
                        	if ( response.data < 0) {
                        		 vm.$message({ message: response.message, type: 'warning' });
                        	}else {
                        	    vm.$refs.reftable.remoteData();
                              vm.$message('操作成功');
                        	}
                        }else{
                          vm.$message('操作失败');
                        }
                      }
                    });
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
