/**
 * @create by ligm on 2019-04-19
 * @description 客户白名单
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
            { placeholder: '准入单位名称', field: 'companyName', type: 'input' },
            { placeholder: '客户名称', field: 'cusName', type: 'input' },
            { placeholder: '证件类型', field: 'certType', type: 'input' },
            { placeholder: '证件号码', field: 'certCode', type: 'input' },
            { placeholder: '机构代码', field: 'orgCode', type: 'input' },
            { placeholder: '区域', field: 'area', type: 'input' },
            { placeholder: '利率浮动比', field: 'intRateRatio', type: 'input' },
            { placeholder: '创建人', field: 'createUser', type: 'input' },
            { placeholder: '创建时间', field: 'createTime', type: 'input' },
            { placeholder: '最新变更用户', field: 'lastChgUsr', type: 'input' },
            { placeholder: '最后修改时间', field: 'lastChgTime', type: 'input' }
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
            { label: '准入单位名称', prop: 'companyName', sortable: true, resizable: true },
            { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
            { label: '证件类型', prop: 'certType', sortable: true, resizable: true },
            { label: '证件号码', prop: 'certCode', sortable: true, resizable: true },
            { label: '机构代码', prop: 'orgCode', sortable: true, resizable: true },
            { label: '区域', prop: 'area', sortable: true, resizable: true },
            { label: '利率浮动比', prop: 'intRateRatio', sortable: true, resizable: true },
            { label: '创建人', prop: 'createUser', sortable: true, resizable: true },
            { label: '创建时间', prop: 'createTime', sortable: true, resizable: true },
            { label: '最新变更用户', prop: 'lastChgUsr', sortable: true, resizable: true },
            { label: '最后修改时间', prop: 'lastChgTime', sortable: true, resizable: true }
            ],
            updateFields: [{
              columnCount: 3,
              fields: [
                	 { field: 'companyName', label: '准入单位名称'},
                	 { field: 'cusName', label: '客户名称'},
                	 { field: 'certType', label: '证件类型'},
                	 { field: 'certCode', label: '证件号码'},
                	 { field: 'orgCode', label: '机构代码'},
                	 { field: 'area', label: '区域'},
                	 { field: 'intRateRatio', label: '利率浮动比'},
                	 { field: 'createUser', label: '创建人'},
                	 { field: 'createTime', label: '创建时间'},
                	 { field: 'lastChgUsr', label: '最新变更用户'},
                	 { field: 'lastChgTime', label: '最后修改时间'}
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
                    url: '/api/cus/white/list/e',
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
              arr.push(selections[i].certType);
              arr.push(selections[i].certCode);
            }
            
            yufp.service.request({
              method: 'DELETE',
              url: '/api/cus/white/list/e',
              data: {
              	certType: arr.join(','),
              	certCode: arr.join(',')
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
