/**
 * @create by chenqm1 on 2018-05-23
 * @description 消费贷核心产品对照表
 */
define(function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE,STD_ZB_DEADLINE,STD_ZB_EFR_CHNG_IND,STD_ZX_CUR_TYPE,STD_ZX_YES_NO');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
            dataUrl:backend.consoleService + '/api/prd/piccs/bance/maps',
            baseParams: {
            },
            queryFields: [
            { placeholder: '核心产品号', field: 'prdId', type: 'input' },
            { placeholder: '核心主产品名称', field: 'mprdName', type: 'input' },
            { placeholder: '核心产品名称', field: 'corePrdName', type: 'input' }
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
            { label: '序列号', prop: 'serno', sortable: true, resizable: true },
            { label: '核心产品号', prop: 'prdId', sortable: true, resizable: true },
            { label: '核心主产品名称', prop: 'mprdName', sortable: true, resizable: true },
            { label: '核心产品名称', prop: 'corePrdName', sortable: true, resizable: true },
            { label: '利率类型', prop: 'irAdjustMode', sortable: true, resizable: true,dataCode:'STD_ZB_EFR_CHNG_IND' },
            { label: '申请期限', prop: 'deadline', sortable: true, resizable: true ,dataCode:'STD_ZB_DEADLINE'},
            { prop: 'repaymentMode', label: '还款方式',sortable: true, resizable: true ,dataCode:'STD_PRD_REPAY_MODE'},
            { label: '是否农户', prop: 'agriFlg', sortable: true, resizable: true,dataCode:'STD_ZX_YES_NO' },
            { label: '是否循环', prop: 'iscircle', sortable: true, resizable: true,dataCode:'STD_ZX_YES_NO' },
            { label: '币种', prop: 'curType', sortable: true, resizable: true,hidden:true }
            ],
            updateFields: [{
              columnCount: 3,
              fields: [
                	 { field: 'serno', label: '序列号',width:'110px'},
                	 { field: 'prdCode', label: '产品号',hidden:false,width:'96px'},
                	 { field: 'prdName', label: '产品名称',hidden:false,width:'96px'},
                	 { field: 'deadline', label: '申请期限',type:'select',dataCode:'STD_ZB_DEADLINE',width:'110px'},
                	 { field: 'irAdjustMode', label: '利率类型',type:'select',dataCode:'STD_ZB_EFR_CHNG_IND',width:'96px'},
                	 { field: 'prdId', label: '核心产品号',width:'96px'},
                	 { field: 'mprdName', label: '核心主产品名称',width:'110px'},
                	 { field: 'corePrdName', label: '核心产品名称',width:'96px'},
                	 { field: 'repaymentMode', label: '还款方式',type:'select',dataCode:'STD_PRD_REPAY_MODE',width:'96px'},
                	 { label: '是否农户', field: 'agriFlg', type:'select',dataCode:'STD_ZX_YES_NO' ,width:'110px'},
                	  { label: '是否循环', field: 'iscircle', type:'select',dataCode:'STD_ZX_YES_NO' ,width:'110px'},
                	 { field: 'curType', label: '可选币种',type:'select',dataCode:'STD_ZX_CUR_TYPE',width:'96px'}
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
                    url: backend.consoleService +'/api/prd/piccs/bance/map',
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
              url: backend.consoleService + '/api/prd/piccs/bance/map',
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
