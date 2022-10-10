/**
 * @create by fuzm on 2018-08-06
 * @description 产品变更记录表
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
        	  dataUrl: backend.consoleService + '/api/prd/change/recordsBySerno',
            baseParams: {
            	bizSerno: data != null ? data.bizSerno : null
            },
            tableColumns: [
            { label: '业务流水号', prop: 'bizSerno', sortable: true, resizable: true, hidden: true },
            { label: '产品ID', prop: 'prdId', sortable: true, resizable: true, hidden: true },
            { label: '变更要素ID', prop: 'columnId', sortable: true, resizable: true, hidden: true },
            { label: '变更要素', prop: 'columnName', sortable: true, resizable: true },
            { label: '变更前数值', prop: 'oldValue', sortable: true, resizable: true },
            { label: '变更后数值', prop: 'newValue', sortable: true, resizable: true },
            { label: '创建人', prop: 'createUser', sortable: true, resizable: true, hidden: true },
            { label: '创建时间', prop: 'createTime', sortable: true, resizable: true, hidden: true }
            ],
            updateFields: [{
              columnCount: 3,
              fields: [
                	 { field: 'bizSerno', label: '业务流水号'},
                	 { field: 'prdId', label: '产品ID'},
                	 { field: 'columnId', label: '变更要素ID'},
                	 { field: 'columnName', label: '变更要素'},
                	 { field: 'oldValue', label: '变更前数值'},
                	 { field: 'newValue', label: '变更后数值'},
                	 { field: 'createTime', label: '创建时间'},
                	 { field: 'createUser', label: '创建人'}
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
                    url: backend.consoleService + '/api/prd/change/record',
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
