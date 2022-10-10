/**
 * @create by chenqm1 on 2018-05-04
 * @description 贷后预警信息表
 */
define(function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
          	dataUrl:backend.pspService+'/api/psp/warn/infos',
            baseParams: {
            },
            queryFields: [
            { placeholder: '任务编号', field: 'bizSerno', type: 'input' },
            { placeholder: '规则编号', field: 'ruleCode', type: 'input' },
            { placeholder: '规则名称', field: 'ruleName', type: 'input' },
            { placeholder: '规则集编号', field: 'ruleSetNo', type: 'input' },
            { placeholder: '规则集类别', field: 'ruleSetType', type: 'input' },
            { placeholder: '是否触发预警', field: 'isWarn', type: 'input' },
            { placeholder: '规则反馈信息', field: 'warnInfo', type: 'input' },
            { placeholder: '创建时间', field: 'createTime', type: 'input' },
            { placeholder: '创建人', field: 'createUser', type: 'input' },
            { placeholder: '风险预警规则', field: 'warnRule', type: 'input' }
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
            { label: '任务编号', prop: 'bizSerno', sortable: true, resizable: true },
            { label: '规则编号', prop: 'ruleCode', sortable: true, resizable: true },
            { label: '规则名称', prop: 'ruleName', sortable: true, resizable: true },
            { label: '规则集编号', prop: 'ruleSetNo', sortable: true, resizable: true },
            { label: '规则集类别', prop: 'ruleSetType', sortable: true, resizable: true },
            { label: '是否触发预警', prop: 'isWarn', sortable: true, resizable: true },
            { label: '规则反馈信息', prop: 'warnInfo', sortable: true, resizable: true },
            { label: '创建时间', prop: 'createTime', sortable: true, resizable: true },
            { label: '创建人', prop: 'createUser', sortable: true, resizable: true },
            { label: '风险预警规则', prop: 'warnRule', sortable: true, resizable: true }
            ],
            updateFields: [{
              columnCount: 3,
              fields: [
                	 { field: 'bizSerno', label: '任务编号'},
                	 { field: 'ruleCode', label: '规则编号'},
                	 { field: 'ruleName', label: '规则名称'},
                	 { field: 'ruleSetNo', label: '规则集编号'},
                	 { field: 'ruleSetType', label: '规则集类别'},
                	 { field: 'isWarn', label: '是否触发预警'},
                	 { field: 'warnInfo', label: '规则反馈信息'},
                	 { field: 'createTime', label: '创建时间'},
                	 { field: 'createUser', label: '创建人'},
                	 { field: 'warnRule', label: '风险预警规则'}
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
                    url: backend.pspService+'/api/psp/warn/info',
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
              _self.$refs.reform.resetFields();
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
            var len = selections.length, arr = [];
            for (var i = 0; i < len; i++) {
              arr.push(selections[i].bizSerno);
              arr.push(selections[i].ruleCode);
            }
            
            yufp.service.request({
              method: 'DELETE',
              url:backend.pspService+ '/api/psp/warn/info',
              data: {
              	bizSerno: arr.join(','),
              	ruleCode: arr.join(',')
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
