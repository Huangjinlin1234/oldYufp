﻿/**
 * @create by ligm on 2019-01-03
 * @description 影像业务信息
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
            { placeholder: '申请流水号', field: 'applySeq', type: 'input' },
            { placeholder: '产品ID', field: 'prdId', type: 'input' },
            { placeholder: '产品代码', field: 'prdCode', type: 'input' },
            { placeholder: '产品名称', field: 'prdName', type: 'input' },
            { placeholder: '客户号', field: 'cusId', type: 'input' },
            { placeholder: '客户名称', field: 'cusName', type: 'input' },
            { placeholder: '影像文件接收', field: 'soltImageAccept', type: 'input' },
            { placeholder: '影像文件加签', field: 'soltImageCfca', type: 'input' },
            { placeholder: '传送给影像系统', field: 'soltImageThird1', type: 'input' },
            { placeholder: '传送给业务联合方', field: 'soltImageThird2', type: 'input' },
            { placeholder: '创建时间', field: 'createTime', type: 'input' },
            { placeholder: '创建日期', field: 'createDate', type: 'input' },
            { placeholder: '最近修改时间', field: 'lastModifyTime', type: 'input' }
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
            { label: '申请流水号', prop: 'applySeq', sortable: true, resizable: true },
            { label: '产品ID', prop: 'prdId', sortable: true, resizable: true },
            { label: '产品代码', prop: 'prdCode', sortable: true, resizable: true },
            { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
            { label: '客户号', prop: 'cusId', sortable: true, resizable: true },
            { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
            { label: '影像文件接收', prop: 'soltImageAccept', sortable: true, resizable: true },
            { label: '影像文件加签', prop: 'soltImageCfca', sortable: true, resizable: true },
            { label: '传送给影像系统', prop: 'soltImageThird1', sortable: true, resizable: true },
            { label: '传送给业务联合方', prop: 'soltImageThird2', sortable: true, resizable: true },
            { label: '创建时间', prop: 'createTime', sortable: true, resizable: true },
            { label: '创建日期', prop: 'createDate', sortable: true, resizable: true },
            { label: '最近修改时间', prop: 'lastModifyTime', sortable: true, resizable: true }
            ],
            updateFields: [{
              columnCount: 3,
              fields: [
                	 { field: 'applySeq', label: '申请流水号'},
                	 { field: 'prdId', label: '产品ID'},
                	 { field: 'prdCode', label: '产品代码'},
                	 { field: 'prdName', label: '产品名称'},
                	 { field: 'cusId', label: '客户号'},
                	 { field: 'cusName', label: '客户名称'},
                	 { field: 'soltImageAccept', label: '影像文件接收'},
                	 { field: 'soltImageCfca', label: '影像文件加签'},
                	 { field: 'soltImageThird1', label: '传送给影像系统'},
                	 { field: 'soltImageThird2', label: '传送给业务联合方'},
                	 { field: 'createTime', label: '创建时间'},
                	 { field: 'createDate', label: '创建日期'},
                	 { field: 'lastModifyTime', label: '最近修改时间'}
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
                    url: '/api/image/biz/info',
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
              arr.push(selections[i].applySeq);
            }
            
            yufp.service.request({
              method: 'DELETE',
              url: '/api/image/biz/info',
              data: {
              	applySeq: arr.join(',')
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
