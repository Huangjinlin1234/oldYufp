/**
 * @create by fuzm on 2018-05-12
 * @description 业务任务参数
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
            baseParams: {
            },
            queryFields: [
            { placeholder: '任务编号', field: 'taskId', type: 'input' },
            { placeholder: '业务参数代码', field: 'bizParamCode', type: 'input' },
            { placeholder: '业务参数名称', field: 'bizParamName', type: 'input' },
            { placeholder: '业务目标参数代码', field: 'bizTargetParamCode', type: 'input' },
            { placeholder: '业务插件标识', field: 'bizPluginId', type: 'input' },
            { placeholder: '业务参数类型', field: 'bizParamIo', type: 'input' },
            { placeholder: '入参顺序号', field: 'inParamOrder', type: 'input' },
            { placeholder: '入参class类', field: 'paramClass', type: 'input' }
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
            { label: '任务编号', prop: 'taskId', sortable: true, resizable: true },
            { label: '业务参数代码', prop: 'bizParamCode', sortable: true, resizable: true },
            { label: '业务参数名称', prop: 'bizParamName', sortable: true, resizable: true },
            { label: '业务目标参数代码', prop: 'bizTargetParamCode', sortable: true, resizable: true },
            { label: '业务插件标识', prop: 'bizPluginId', sortable: true, resizable: true },
            { label: '业务参数类型', prop: 'bizParamIo', sortable: true, resizable: true },
            { label: '入参顺序号', prop: 'inParamOrder', sortable: true, resizable: true },
            { label: '入参class类', prop: 'paramClass', sortable: true, resizable: true }
            ],
            updateFields: [{
              columnCount: 3,
              fields: [
                	 { field: 'taskId', label: '任务编号'},
                	 { field: 'bizParamCode', label: '业务参数代码'},
                	 { field: 'bizParamName', label: '业务参数名称'},
                	 { field: 'bizTargetParamCode', label: '业务目标参数代码'},
                	 { field: 'bizPluginId', label: '业务插件标识'},
                	 { field: 'bizParamIo', label: '业务参数类型'},
                	 { field: 'inParamOrder', label: '入参顺序号'},
                	 { field: 'paramClass', label: '入参class类'}
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
                    url: '/api/biz/flow/task/param',
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
              arr.push(selections[i].taskId);
              arr.push(selections[i].bizParamCode);
              arr.push(selections[i].bizPluginId);
              arr.push(selections[i].bizParamIo);
            }
            
            yufp.service.request({
              method: 'DELETE',
              url: '/api/biz/flow/task/param',
              data: {
              	taskId: arr.join(','),
              	bizParamCode: arr.join(','),
              	bizPluginId: arr.join(','),
              	bizParamIo: arr.join(','),
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
