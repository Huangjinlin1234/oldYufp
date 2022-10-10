/**
 * @create by chenqm1 on 2018-05-28
 * @description 贷款交易明细
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
            { placeholder: '业务流水号', field: 'serno', type: 'input' },
            { placeholder: '核心交易流水号', field: 'sernoCore', type: 'input' },
            { placeholder: '交易柜员号', field: 'tellerNo', type: 'input' },
            { placeholder: '合同编号', field: 'contNo', type: 'input' },
            { placeholder: '借据编号', field: 'billNo', type: 'input' },
            { placeholder: '贷款账号', field: 'loanAccount', type: 'input' },
            { placeholder: '客户编号', field: 'cusId', type: 'input' },
            { placeholder: '客户名称', field: 'cusName', type: 'input' },
            { placeholder: '交易明细类型', field: 'detailType', type: 'input' },
            { placeholder: '回收方式', field: 'returnType', type: 'input' },
            { placeholder: '币种', field: 'curType', type: 'input' },
            { placeholder: '交易金额', field: 'tradeAmount', type: 'input' },
            { placeholder: '交易日期', field: 'tradeDate', type: 'input' },
            { placeholder: '交易类型', field: 'tradeType', type: 'input' },
            { placeholder: '交易摘要', field: 'tradeBrief', type: 'input' },
            { placeholder: '帐号标识', field: 'accflag', type: 'input' },
            { placeholder: '借贷方', field: 'loanaspect', type: 'input' },
            { placeholder: '核心交易吗', field: 'trnCode', type: 'input' },
            { placeholder: 'stat', field: 'stat', type: 'input' },
            { placeholder: 'data_flag', field: 'dataFlag', type: 'input' }
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
            { label: '业务流水号', prop: 'serno', sortable: true, resizable: true },
            { label: '核心交易流水号', prop: 'sernoCore', sortable: true, resizable: true },
            { label: '交易柜员号', prop: 'tellerNo', sortable: true, resizable: true },
            { label: '合同编号', prop: 'contNo', sortable: true, resizable: true },
            { label: '借据编号', prop: 'billNo', sortable: true, resizable: true },
            { label: '贷款账号', prop: 'loanAccount', sortable: true, resizable: true },
            { label: '客户编号', prop: 'cusId', sortable: true, resizable: true },
            { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
            { label: '交易明细类型', prop: 'detailType', sortable: true, resizable: true },
            { label: '回收方式', prop: 'returnType', sortable: true, resizable: true },
            { label: '币种', prop: 'curType', sortable: true, resizable: true },
            { label: '交易金额', prop: 'tradeAmount', sortable: true, resizable: true },
            { label: '交易日期', prop: 'tradeDate', sortable: true, resizable: true },
            { label: '交易类型', prop: 'tradeType', sortable: true, resizable: true },
            { label: '交易摘要', prop: 'tradeBrief', sortable: true, resizable: true },
            { label: '帐号标识', prop: 'accflag', sortable: true, resizable: true },
            { label: '借贷方', prop: 'loanaspect', sortable: true, resizable: true },
            { label: '核心交易吗', prop: 'trnCode', sortable: true, resizable: true },
            { label: 'stat', prop: 'stat', sortable: true, resizable: true },
            { label: 'data_flag', prop: 'dataFlag', sortable: true, resizable: true }
            ],
            updateFields: [{
              columnCount: 3,
              fields: [
                	 { field: 'serno', label: '业务流水号'},
                	 { field: 'sernoCore', label: '核心交易流水号'},
                	 { field: 'tellerNo', label: '交易柜员号'},
                	 { field: 'contNo', label: '合同编号'},
                	 { field: 'billNo', label: '借据编号'},
                	 { field: 'loanAccount', label: '贷款账号'},
                	 { field: 'cusId', label: '客户编号'},
                	 { field: 'cusName', label: '客户名称'},
                	 { field: 'detailType', label: '交易明细类型'},
                	 { field: 'returnType', label: '回收方式'},
                	 { field: 'curType', label: '币种'},
                	 { field: 'tradeAmount', label: '交易金额',type:'num',digit:2,formatter:yufp.util.moneyFormatter},
                	 { field: 'tradeDate', label: '交易日期'},
                	 { field: 'tradeType', label: '交易类型'},
                	 { field: 'tradeBrief', label: '交易摘要'},
                	 { field: 'accflag', label: '帐号标识'},
                	 { field: 'loanaspect', label: '借贷方'},
                	 { field: 'trnCode', label: '核心交易吗'},
                	 { field: 'stat', label: 'stat'},
                	 { field: 'dataFlag', label: 'data_flag'}
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
                    url: '/api/acc/bill/details',
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
              arr.push(selections[i].serno);
            }
            
            yufp.service.request({
              method: 'DELETE',
              url: '/api/acc/bill/details',
              data: {
              	serno: arr.join(',')
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
