/**
 * @create by chenqm1 on 2018-06-09
 * @description CA加签策略配置表
 */
define(['custom/widgets/js/LegalOrgSelector.js'],function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CA_STRATEGY_TYPE','CRUD_TYPE');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
        
          var _self = this;
          return {
            baseParams: {
            },
        	dataUrl :backend.consoleService + '/api/ca/strategy/cfgs',
            queryFields: [
         
            { placeholder: '机构法人代码', field: 'legalOrgCode', type: 'custom' ,is:'div-degal-org-selector' },
           // { placeholder: '机构代码', field: 'orgCode', type: 'input',hidden: true },
           // { placeholder: '机构名称', field: 'orgName', type: 'input' },
            { placeholder: '策略编码', field: 'caStrategyCode', type: 'input' },
            { placeholder: '策略类型', field: 'strategyType',  type: 'select',dataCode: 'CA_STRATEGY_TYPE'}
//            { placeholder: '创建人', field: 'createUser', type: 'input' },
//            { placeholder: '创建时间', field: 'createTime', type: 'input'  },
//            { placeholder: '最后修改人', field: 'lastUpdateUser', type: 'input'   },
//            { placeholder: '最后修改日期', field: 'lastUpdateTime', type: 'input'  }
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
            { label: '主键', prop: 'id', sortable: true, resizable: true  , hidden: true},
            { label: '机构法人代码', prop: 'legalOrgCode', sortable: true, resizable: true },
       //     { label: '机构代码', prop: 'orgCode', sortable: true, resizable: true },
        //    { label: '机构名称', prop: 'orgName', sortable: true, resizable: true },
            { label: '策略编码', prop: 'caStrategyCode', sortable: true, resizable: true },
            { label: '策略类型', prop: 'strategyType', sortable: true, resizable: true ,dataCode: 'CA_STRATEGY_TYPE'},
            { label: '创建人', prop: 'createUser', sortable: true, resizable: true },
            { label: '创建时间', prop: 'createTime', sortable: true, resizable: true },
            { label: '最后修改人', prop: 'lastUpdateUser', sortable: true, resizable: true },
            { label: '最后修改日期', prop: 'lastUpdateTime', sortable: true, resizable: true }
            ],
            updateFields: [{
              columnCount: 2,
              fields: [
                	 { field: 'id', label: '主键', hidden: true},
                	 { field: 'legalOrgCode', label: '机构法人代码', type: 'custom',is:'div-degal-org-selector',rules: [ { required: true, message: '法人机构代码是必选项', trigger: 'blur' }, { max: 10, message: '最大长度为10'}]},
                	 //{ field: 'orgCode', label: '机构代码'},
                //	 { field: 'orgName', label: '机构名称'},
                	 { field: 'caStrategyCode', label: '策略编码',rules: [ { required: true, message: '必输项', trigger: 'blur' }, { max: 30, message: '最大长度为30'}]},
                	 { field: 'strategyType', label: '策略类型',type: 'select',dataCode: 'CA_STRATEGY_TYPE',rules: [ { required: true, message: '必选项', trigger: 'blur' }]},
                	 { field: 'createUser', label: '创建人', disabled: true },
                	 { field: 'createTime', label: '创建时间', disabled: true },
                	 { field: 'lastUpdateUser', label: '最后修改人', disabled: true },
                	 { field: 'lastUpdateTime', label: '最后修改日期', disabled: true }
              ]
            }],
            updateButtons: [
              
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
                    url: backend.consoleService + '/api/ca/strategy/cfg',
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
                } },{ label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                  _self.dialogVisible = false;
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
            _self.updateButtons[0].hidden = !editable;
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
              arr.push(selections[i].id);
            }
            
            yufp.service.request({
              method: 'DELETE',
              url: backend.consoleService + '/api/ca/strategy/cfg',
              data: {
              	id: arr.join(',')
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
