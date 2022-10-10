/**
 * @create by fuzm on 2018-05-08
 * @description 电话核查问题模板组分类明细表
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
            { placeholder: '模板组明细ID', field: 'dtlId', type: 'input' },
            { placeholder: '模板组ID', field: 'tplGrpId', type: 'input' },
            { placeholder: '问题类型', field: 'questionClassify', type: 'input' },
            { placeholder: '选择问题条数', field: 'choiceQuestNum', type: 'input' },
            { placeholder: '通过率', field: 'passRate', type: 'input' },
            { placeholder: '创建日期', field: 'createTime', type: 'input' },
            { placeholder: '创建人', field: 'createUser', type: 'input' },
            { placeholder: '最后修改人', field: 'lastUpdateUser', type: 'input' },
            { placeholder: '最后修改日期', field: 'lastUpdateTime', type: 'input' }
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
            { label: '模板组明细ID', prop: 'dtlId', sortable: true, resizable: true },
            { label: '模板组ID', prop: 'tplGrpId', sortable: true, resizable: true },
            { label: '问题类型', prop: 'questionClassify', sortable: true, resizable: true },
            { label: '选择问题条数', prop: 'choiceQuestNum', sortable: true, resizable: true },
            { label: '通过率', prop: 'passRate', sortable: true, resizable: true },
            { label: '创建日期', prop: 'createTime', sortable: true, resizable: true },
            { label: '创建人', prop: 'createUser', sortable: true, resizable: true },
            { label: '最后修改人', prop: 'lastUpdateUser', sortable: true, resizable: true },
            { label: '最后修改日期', prop: 'lastUpdateTime', sortable: true, resizable: true }
            ],
            updateFields: [{
              columnCount: 3,
              fields: [
                	 { field: 'dtlId', label: '模板组明细ID'},
                	 { field: 'tplGrpId', label: '模板组ID'},
                	 { field: 'questionClassify', label: '问题类型'},
                	 { field: 'choiceQuestNum', label: '选择问题条数'},
                	 { field: 'passRate', label: '通过率'},
                	 { field: 'createTime', label: '创建日期'},
                	 { field: 'createUser', label: '创建人'},
                	 { field: 'lastUpdateUser', label: '最后修改人'},
                	 { field: 'lastUpdateTime', label: '最后修改日期'}
              ]
            }],
            updateButtons: [
              { label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
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
                    url: '/api/tel/verif/grp/dtl',
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
        		//return !yufp.session.checkCtrl(ctrlCode, cite.menuId);
        		return true;
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
              arr.push(selections[i].dtlId);
            }
            
            yufp.service.request({
              method: 'DELETE',
              url: '/api/tel/verif/grp/dtl',
              data: {
              	dtlId: arr.join(',')
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
