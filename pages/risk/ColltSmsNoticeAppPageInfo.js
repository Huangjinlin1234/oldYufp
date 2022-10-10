/**
 * @create by ligm on 2019-08-27
 * @description 催收短信通知申请表
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
            { placeholder: '短信通知申请流水号', field: 'smsNoticeApp', type: 'input' },
            { placeholder: '催收任务编号', field: 'colltTaskNo', type: 'input' },
            { placeholder: '催收方式', field: 'colltWay', type: 'input' },
            { placeholder: '客户编号', field: 'cusId', type: 'input' },
            { placeholder: '客户名称', field: 'cusName', type: 'input' },
            { placeholder: '手机号码', field: 'phoneNum', type: 'input' },
            { placeholder: '发送内容', field: 'sendMsg', type: 'input' },
            { placeholder: '审批状态', field: 'approveStatus', type: 'input' },
            { placeholder: '审批人编号', field: 'aprvUserCode', type: 'input' },
            { placeholder: '审批人名称', field: 'aprvUserName', type: 'input' },
            { placeholder: '人工处理意见', field: 'aprvComment', type: 'input' },
            { placeholder: '审批时间', field: 'aprvTime', type: 'input' },
            { placeholder: '创建人', field: 'createUser', type: 'input' },
            { placeholder: '创建时间', field: 'createTime', type: 'input' },
            { placeholder: '最后更新人', field: 'lastUpdateUser', type: 'input' },
            { placeholder: '最后更新时间', field: 'lastUpdateTime', type: 'input' }
            ],
            queryButtons: [
              { label: '搜索', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                  if (valid) {
                    _self.$refs.reftable.remoteData(model);
                  }
                } },
              { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
            ],
  
            tableColumns: [
            { label: '短信通知申请流水号', prop: 'smsNoticeApp', sortable: true, resizable: true },
            { label: '催收任务编号', prop: 'colltTaskNo', sortable: true, resizable: true },
            { label: '催收方式', prop: 'colltWay', sortable: true, resizable: true },
            { label: '客户编号', prop: 'cusId', sortable: true, resizable: true },
            { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
            { label: '手机号码', prop: 'phoneNum', sortable: true, resizable: true },
            { label: '发送内容', prop: 'sendMsg', sortable: true, resizable: true },
            { label: '审批状态', prop: 'approveStatus', sortable: true, resizable: true },
            { label: '审批人编号', prop: 'aprvUserCode', sortable: true, resizable: true },
            { label: '审批人名称', prop: 'aprvUserName', sortable: true, resizable: true },
            { label: '人工处理意见', prop: 'aprvComment', sortable: true, resizable: true },
            { label: '审批时间', prop: 'aprvTime', sortable: true, resizable: true },
            { label: '创建人', prop: 'createUser', sortable: true, resizable: true },
            { label: '创建时间', prop: 'createTime', sortable: true, resizable: true },
            { label: '最后更新人', prop: 'lastUpdateUser', sortable: true, resizable: true },
            { label: '最后更新时间', prop: 'lastUpdateTime', sortable: true, resizable: true }
            ],
            updateFields: [{
              columnCount: 3,
              fields: [
                	 { field: 'smsNoticeApp', label: '短信通知申请流水号'},
                	 { field: 'colltTaskNo', label: '催收任务编号'},
                	 { field: 'colltWay', label: '催收方式'},
                	 { field: 'cusId', label: '客户编号'},
                	 { field: 'cusName', label: '客户名称'},
                	 { field: 'phoneNum', label: '手机号码'},
                	 { field: 'sendMsg', label: '发送内容'},
                	 { field: 'approveStatus', label: '审批状态'},
                	 { field: 'aprvUserCode', label: '审批人编号'},
                	 { field: 'aprvUserName', label: '审批人名称'},
                	 { field: 'aprvComment', label: '人工处理意见'},
                	 { field: 'aprvTime', label: '审批时间'},
                	 { field: 'createUser', label: '创建人'},
                	 { field: 'createTime', label: '创建时间'},
                	 { field: 'lastUpdateUser', label: '最后更新人'},
                	 { field: 'lastUpdateTime', label: '最后更新时间'}
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
                    url: '/api/collt/sms/notice/app',
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
            }
            
            yufp.service.request({
              method: 'DELETE',
              url: '/api/collt/sms/notice/app',
              data: {
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
