/**
 * @create by chenqm1 on 2018-05-14
 * @description 客户移交明细
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
          	  LstDataUrl : backend.cusService+'/api/cus/handover/lsts',
            LstBaseParams: {
            },
            LstQueryFields: [
            { placeholder: '流水号', field: 'serno', type: 'input' },
            { placeholder: '移交类型', field: 'handoverType', type: 'input' },
            { placeholder: '客户号', field: 'cusId', type: 'input' },
            { placeholder: '业务说明', field: 'businessDetail', type: 'input' },
            { placeholder: '标记(备用)', field: 'flag', type: 'input' }
            ],
            LstQueryButtons: [
              { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                  if (valid) {
                    _self.$refs.reftable.remoteData(model);
                  }
                } },
              { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
            ],
  
            LstQableColumns: [
            { label: '流水号', prop: 'serno', sortable: true, resizable: true },
            { label: '移交类型', prop: 'handoverType', sortable: true, resizable: true },
            { label: '客户号', prop: 'cusId', sortable: true, resizable: true },
            { label: '业务说明', prop: 'businessDetail', sortable: true, resizable: true },
            { label: '标记(备用)', prop: 'flag', sortable: true, resizable: true }
            ],
            LstUpdateFields: [{
              columnCount: 3,
              fields: [
                	 { field: 'serno', label: '流水号'},
                	 { field: 'handoverType', label: '移交类型'},
                	 { field: 'cusId', label: '客户号'},
                	 { field: 'businessDetail', label: '业务说明'},
                	 { field: 'flag', label: '标记(备用)'}
              ]
            }],
            LstUpdateButtons: [
              { label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                  _self.LstDialogVisible = false;
                } },
              { label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                  var validate = false;
                  _self.$refs.LstReform.validate(function (valid) {
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
                    url:  backend.cusService+'/api/cus/handover/lst',
                    data: model,
                    callback: function (code, message, response) {
                      if (code == 0) {
                        _self.$refs.LstReftable.remoteData();
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
            LstDialogVisible: false,
            LstFormDisabled: false,
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
          LstStatus: function (viewType, editable) {
            var _self = this;
            _self.viewType = viewType;
            // _self.updateButtons[0].hidden = !editable;
            _self.LstUpdateButtons[1].hidden = !editable;
            _self.LstDormDisabled = !editable;
            _self.LstDialogVisible = true;
          },
          addFn: function () {
            var _self = this;
            _self.LstStatus('ADD', true);
            _self.$nextTick(function () {
              _self.$refs.LstReform.resetFn();
            });
          },
          modifyFn: function () {
            if (this.$refs.LstReftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            this.LstStatus('EDIT', true);
            this.$nextTick(function () {
            var obj = this.$refs.LstReftable.selections[0];
              yufp.extend(this.$refs.LstReform.formModel, obj);
            });
          },
          infoFn: function () {
            if (this.$refs.LstReftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            this.LstStatus('DETAIL', false);
            this.$nextTick(function () {
              yufp.extend(this.$refs.LstReform.formModel, this.$refs.LstReftable.selections[0]);
            });
          },
          deleteFn: function () {
            var _self = this;
            var selections = _self.$refs.LstReftable.selections;
            if (selections.length < 1) {
              _self.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            var len = selections.length, arr = [];
            for (var i = 0; i < len; i++) {
              arr.push(selections[i].serno);
              arr.push(selections[i].cusId);
            }
            
            yufp.service.request({
              method: 'DELETE',
              url:  backend.cusService+'/api/cus/handover/lst',
              data: {
              	serno: arr.join(','),
              	cusId: arr.join(',')
              },
              callback: function (code, message, response) {
                if (code == 0) {
                  _self.$refs.LstReftable.remoteData();
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
              ref: this.$refs.LstReftable,
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
