/**
 * @create by chenqm1 on 2018-05-05
 * @description 贷后担保信息表
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
          	dataUrl:backend.pspService+'/api/psp/guar/infos',
            baseParams: {
            },
            queryFields: [
            { placeholder: '任务编号', field: 'bizSerno', type: 'input' },
            { placeholder: '担保品编号', field: 'guarantyId', type: 'input' },
            { placeholder: '检查时间', field: 'checkDate', type: 'input' },
            { placeholder: '担保合同编号', field: 'guarContNo', type: 'input' },
            { placeholder: '担保品/保证人名称', field: 'gageName', type: 'input' },
            { placeholder: '担保品类型', field: 'guarantyType', type: 'input' },
            { placeholder: '担保金额', field: 'guaranteeAmt', type: 'input' },
            { placeholder: '折扣率', field: 'depositRate', type: 'input' },
            { placeholder: '评估机构', field: 'evalOrg', type: 'input' },
            { placeholder: '评估日期', field: 'evalDate', type: 'input' },
            { placeholder: '评估方式', field: 'evalType', type: 'input' },
            { placeholder: '实际价值', field: 'actVal', type: 'input' },
            { placeholder: '币种', field: 'curType', type: 'input',dataCode:'STD_ZX_CUR_TYPE' },
            { placeholder: '评估金额', field: 'evalAmt', type: 'input' },
            { placeholder: '担保品状态', field: 'statusCode', type: 'input' },
            { placeholder: '产品名称', field: 'prdName', type: 'input' },
            { placeholder: '产品代码', field: 'prdCode', type: 'input' },
            { placeholder: '异常情况描述', field: 'exceRemark', type: 'input' },
            { placeholder: '创建时间', field: 'createTime', type: 'input' },
            { placeholder: '最后更新人', field: 'lastUpdateUser', type: 'input' },
            { placeholder: '检查类型', field: 'chkType', type: 'input' },
            { placeholder: '借据编号', field: 'billNo', type: 'input' },
            { placeholder: '担保方式', field: 'assureMeansMain', type: 'input' },
            { placeholder: '抵/质押物类型', field: 'gageType', type: 'input' }
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
            { label: '担保品编号', prop: 'guarantyId', sortable: true, resizable: true },
            { label: '检查时间', prop: 'checkDate', sortable: true, resizable: true },
            { label: '担保合同编号', prop: 'guarContNo', sortable: true, resizable: true },
            { label: '担保品/保证人名称', prop: 'gageName', sortable: true, resizable: true },
            { label: '担保品类型', prop: 'guarantyType', sortable: true, resizable: true },
            { label: '担保金额', prop: 'guaranteeAmt', sortable: true, resizable: true },
            { label: '折扣率', prop: 'depositRate', sortable: true, resizable: true },
            { label: '评估机构', prop: 'evalOrg', sortable: true, resizable: true },
            { label: '评估日期', prop: 'evalDate', sortable: true, resizable: true },
            { label: '评估方式', prop: 'evalType', sortable: true, resizable: true },
            { label: '实际价值', prop: 'actVal', sortable: true, resizable: true },
            { label: '币种', prop: 'curType', sortable: true, resizable: true },
            { label: '评估金额', prop: 'evalAmt', sortable: true, resizable: true },
            { label: '担保品状态', prop: 'statusCode', sortable: true, resizable: true },
            { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
            { label: '产品代码', prop: 'prdCode', sortable: true, resizable: true },
            { label: '异常情况描述', prop: 'exceRemark', sortable: true, resizable: true },
            { label: '创建时间', prop: 'createTime', sortable: true, resizable: true },
            { label: '最后更新人', prop: 'lastUpdateUser', sortable: true, resizable: true },
            { label: '检查类型', prop: 'chkType', sortable: true, resizable: true },
            { label: '借据编号', prop: 'billNo', sortable: true, resizable: true },
            { label: '担保方式', prop: 'assureMeansMain', sortable: true, resizable: true },
            { label: '抵/质押物类型', prop: 'gageType', sortable: true, resizable: true }
            ],
            updateFields: [{
              columnCount: 3,
              fields: [
                	 { field: 'bizSerno', label: '任务编号'},
                	 { field: 'guarantyId', label: '担保品编号'},
                	 { field: 'checkDate', label: '检查时间'},
                	 { field: 'guarContNo', label: '担保合同编号'},
                	 { field: 'gageName', label: '担保品/保证人名称'},
                	 { field: 'guarantyType', label: '担保品类型'},
                	 { field: 'guaranteeAmt', label: '担保金额'},
                	 { field: 'depositRate', label: '折扣率'},
                	 { field: 'evalOrg', label: '评估机构'},
                	 { field: 'evalDate', label: '评估日期'},
                	 { field: 'evalType', label: '评估方式'},
                	 { field: 'actVal', label: '实际价值'},
                	 { field: 'curType', label: '币种'},
                	 { field: 'evalAmt', label: '评估金额'},
                	 { field: 'statusCode', label: '担保品状态'},
                	 { field: 'prdName', label: '产品名称'},
                	 { field: 'prdCode', label: '产品代码'},
                	 { field: 'exceRemark', label: '异常情况描述'},
                	 { field: 'createTime', label: '创建时间'},
                	 { field: 'lastUpdateUser', label: '最后更新人'},
                	 { field: 'chkType', label: '检查类型'},
                	 { field: 'billNo', label: '借据编号'},
                	 { field: 'assureMeansMain', label: '担保方式'},
                	 { field: 'gageType', label: '抵/质押物类型'}
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
                    url: backend.pspService+'/api/psp/guar/info',
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
              arr.push(selections[i].guarantyId);
            }
            
            yufp.service.request({
              method: 'DELETE',
              url: backend.pspService+'/api/psp/guar/info',
              data: {
              	bizSerno: arr.join(','),
              	guarantyId: arr.join(',')
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
