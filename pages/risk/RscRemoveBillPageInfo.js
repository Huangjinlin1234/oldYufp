/**
 * @create by chenqm1 on 2018-05-07
 * @description 风险分类解除借据表
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
            { placeholder: '分类编号', field: 'taskNo', type: 'input' },
            { placeholder: '合同编号', field: 'contNo', type: 'input' },
            { placeholder: '客户名称', field: 'cusName', type: 'input' },
            { placeholder: '借据金额', field: 'loanAmount', type: 'input' },
            { placeholder: '借据余额', field: 'loanBalance', type: 'input' },
            { placeholder: '产品号', field: 'prdCode', type: 'input' },
            { placeholder: '产品名称', field: 'prdName', type: 'input' },
            { placeholder: '贷款起始日', field: 'loanStartDate', type: 'input' },
            { placeholder: '贷款终止日', field: 'loanEndDate', type: 'input' },
            { placeholder: '解除前风险分类', field: 'preReleResult', type: 'input' },
            { placeholder: '解除后风险分类', field: 'releResult', type: 'input' },
            { placeholder: '分类日期', field: 'claDate', type: 'input' },
            { placeholder: '分类理由', field: 'taskReason', type: 'input' },
            { placeholder: '机评分类结果', field: 'autoClaResult', type: 'input' },
            { placeholder: '分类解除发起原因', field: 'taskAdjustDesc', type: 'input' },
            { placeholder: '借据编号', field: 'billNo', type: 'input' },
            { placeholder: '合同金额', field: 'contAmt', type: 'input' },
            { placeholder: '担保方式', field: 'assureMeansMain', type: 'input' },
            { placeholder: '客户编号', field: 'cusId', type: 'input' },
            { placeholder: '客户经理', field: 'cusManager', type: 'input' },
            { placeholder: '主管机构', field: 'mainBrId', type: 'input' },
            { placeholder: '创建人', field: 'createUser', type: 'input' },
            { placeholder: '创建日期', field: 'createTime', type: 'input' }
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
            { label: '分类编号', prop: 'taskNo', sortable: true, resizable: true },
            { label: '合同编号', prop: 'contNo', sortable: true, resizable: true },
            { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
            { label: '借据金额', prop: 'loanAmount', sortable: true, resizable: true },
            { label: '借据余额', prop: 'loanBalance', sortable: true, resizable: true },
            { label: '产品号', prop: 'prdCode', sortable: true, resizable: true },
            { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
            { label: '贷款起始日', prop: 'loanStartDate', sortable: true, resizable: true },
            { label: '贷款终止日', prop: 'loanEndDate', sortable: true, resizable: true },
            { label: '解除前风险分类', prop: 'preReleResult', sortable: true, resizable: true },
            { label: '解除后风险分类', prop: 'releResult', sortable: true, resizable: true },
            { label: '分类日期', prop: 'claDate', sortable: true, resizable: true },
            { label: '分类理由', prop: 'taskReason', sortable: true, resizable: true },
            { label: '机评分类结果', prop: 'autoClaResult', sortable: true, resizable: true },
            { label: '分类解除发起原因', prop: 'taskAdjustDesc', sortable: true, resizable: true },
            { label: '借据编号', prop: 'billNo', sortable: true, resizable: true },
            { label: '合同金额', prop: 'contAmt', sortable: true, resizable: true },
            { label: '担保方式', prop: 'assureMeansMain', sortable: true, resizable: true },
            { label: '客户编号', prop: 'cusId', sortable: true, resizable: true },
            { label: '客户经理', prop: 'cusManager', sortable: true, resizable: true },
            { label: '主管机构', prop: 'mainBrId', sortable: true, resizable: true },
            { label: '创建人', prop: 'createUser', sortable: true, resizable: true },
            { label: '创建日期', prop: 'createTime', sortable: true, resizable: true }
            ],
            updateFields: [{
              columnCount: 3,
              fields: [
                	 { field: 'taskNo', label: '分类编号'},
                	 { field: 'contNo', label: '合同编号'},
                	 { field: 'cusName', label: '客户名称'},
                	 { field: 'loanAmount', label: '借据金额'},
                	 { field: 'loanBalance', label: '借据余额'},
                	 { field: 'prdCode', label: '产品号'},
                	 { field: 'prdName', label: '产品名称'},
                	 { field: 'loanStartDate', label: '贷款起始日'},
                	 { field: 'loanEndDate', label: '贷款终止日'},
                	 { field: 'preReleResult', label: '解除前风险分类'},
                	 { field: 'releResult', label: '解除后风险分类'},
                	 { field: 'claDate', label: '分类日期'},
                	 { field: 'taskReason', label: '分类理由'},
                	 { field: 'autoClaResult', label: '机评分类结果'},
                	 { field: 'taskAdjustDesc', label: '分类解除发起原因'},
                	 { field: 'billNo', label: '借据编号'},
                	 { field: 'contAmt', label: '合同金额'},
                	 { field: 'assureMeansMain', label: '担保方式'},
                	 { field: 'cusId', label: '客户编号'},
                	 { field: 'cusManager', label: '客户经理'},
                	 { field: 'mainBrId', label: '主管机构'},
                	 { field: 'createUser', label: '创建人'},
                	 { field: 'createTime', label: '创建日期'}
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
                    url: '/api/rsc/remove/bill',
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
              arr.push(selections[i].taskNo);
            }
            
            yufp.service.request({
              method: 'DELETE',
              url: '/api/rsc/remove/bill',
              data: {
              	taskNo: arr.join(',')
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
