/**
 * @create by chenqm1 on 2018-05-08
 * @description 客户(月均)现金流收入
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
          	dataUrl:backend.cusService+"/api/cus/indiv/cash/incomes",
            baseParams: {
            },
            queryFields: [
            { placeholder: '主键', field: 'incSerno', type: 'input' },
            { placeholder: '关联客户号', field: 'cusId', type: 'input' },
            { placeholder: '代发工资', field: 'salary', type: 'input' },
            { placeholder: '最近修改时间', field: 'lastUpdateTime', type: 'input' },
            { placeholder: '最后更新人', field: 'lastUpdateUser', type: 'input' },
            { placeholder: '创建时间', field: 'createTime', type: 'input' },
            { placeholder: '合计', field: 'totalIncome', type: 'input' },
            { placeholder: '其他收入', field: 'othsIncome', type: 'input' },
            { placeholder: '分红', field: 'dividend', type: 'input' },
            { placeholder: '租金', field: 'rentalIncome', type: 'input' },
            { placeholder: '社保', field: 'socialSecFund', type: 'input' },
            { placeholder: '缴存月份数', field: 'accumFundMonths', type: 'input' },
            { placeholder: '缴存金额', field: 'companyAccumFund', type: 'input' },
            { placeholder: '公积金工资基数', field: 'personAccumFund', type: 'input' },
            { placeholder: '本机构流水日均', field: 'selfOrgIncome', type: 'input' },
            { placeholder: '公积金收入', field: 'accumFund', type: 'input' }
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
            { label: '主键', prop: 'incSerno', sortable: true, resizable: true },
            { label: '关联客户号', prop: 'cusId', sortable: true, resizable: true },
            { label: '代发工资', prop: 'salary', sortable: true, resizable: true },
            { label: '最近修改时间', prop: 'lastUpdateTime', sortable: true, resizable: true },
            { label: '最后更新人', prop: 'lastUpdateUser', sortable: true, resizable: true },
            { label: '创建时间', prop: 'createTime', sortable: true, resizable: true },
            { label: '合计', prop: 'totalIncome', sortable: true, resizable: true },
            { label: '其他收入', prop: 'othsIncome', sortable: true, resizable: true },
            { label: '分红', prop: 'dividend', sortable: true, resizable: true },
            { label: '租金', prop: 'rentalIncome', sortable: true, resizable: true },
            { label: '社保', prop: 'socialSecFund', sortable: true, resizable: true },
            { label: '缴存月份数', prop: 'accumFundMonths', sortable: true, resizable: true },
            { label: '缴存金额', prop: 'companyAccumFund', sortable: true, resizable: true },
            { label: '公积金工资基数', prop: 'personAccumFund', sortable: true, resizable: true },
            { label: '本机构流水日均', prop: 'selfOrgIncome', sortable: true, resizable: true },
            { label: '公积金收入', prop: 'accumFund', sortable: true, resizable: true }
            ],
            updateFields: [{
              columnCount: 3,
              fields: [
                	 { field: 'incSerno', label: '主键'},
                	 { field: 'cusId', label: '关联客户号'},
                	 { field: 'salary', label: '代发工资'},
                	 { field: 'lastUpdateTime', label: '最近修改时间'},
                	 { field: 'lastUpdateUser', label: '最后更新人'},
                	 { field: 'createTime', label: '创建时间'},
                	 { field: 'totalIncome', label: '合计'},
                	 { field: 'othsIncome', label: '其他收入'},
                	 { field: 'dividend', label: '分红'},
                	 { field: 'rentalIncome', label: '租金'},
                	 { field: 'socialSecFund', label: '社保'},
                	 { field: 'accumFundMonths', label: '缴存月份数'},
                	 { field: 'companyAccumFund', label: '缴存金额'},
                	 { field: 'personAccumFund', label: '公积金工资基数'},
                	 { field: 'selfOrgIncome', label: '本机构流水日均'},
                	 { field: 'accumFund', label: '公积金收入'}
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
                    url:backend.cusService+ '/api/cus/indiv/cash/income',
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
        		return yufp.session.checkCtrl(ctrlCode, cite.menuId);
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
              arr.push(selections[i].incSerno );
            }
            
            yufp.service.request({
              method: 'DELETE',
              url:backend.cusService+ '/api/cus/indiv/cash/income',
              data: {
              	incSerno : arr.join(',')
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
