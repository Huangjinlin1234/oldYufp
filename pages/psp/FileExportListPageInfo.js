/**
 * @create by ligm on 2020-01-08
 * @description 导出文件清单
 */
define(function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE,STD_GENERAL_STATUS');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
            baseParams: {
            },
            dataUrl: backend.edocService + '/api/file/export/lists',

            queryFields: [
              { placeholder: '文件名称', field: 'fileName', type: 'input' },
              { placeholder: '导出状态', field: 'status', type: 'select', dataCode:'STD_GENERAL_STATUS' },
              { placeholder: '导出日期区间', field: 'createDateS2E', type: 'daterange', value: [], editable: false},

              { placeholder: '文件描述', field: 'fileDesc', type: 'input', hidden:true },
              { placeholder: '文件路径', field: 'filePath', type: 'input', hidden:true },
              { placeholder: '导出开始日期', field: 'createDateS', type: 'date', hidden:true },
              { placeholder: '导出结束日期', field: 'createDateE', type: 'date', hidden:true },
              { placeholder: '导出用户', field: 'createUser', type: 'input', hidden:true },
              { placeholder: '导出用户所属机构', field: 'createUserOrg', type: 'input', hidden:true }
            ],

            queryButtons: [
              { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                  if (valid) {
                    model.createDateS = model.createDateS2E[0];
                    model.createDateE = model.createDateS2E[1];
                    _self.$refs.reftable.remoteData(model);
                  }
                } },
              { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
            ],
  
            tableColumns: [
              { label: '操作流水号', prop: 'pkId', sortable: true, resizable: true, hidden: true},
              { label: '文件名称', prop: 'fileName', sortable: true, resizable: true },
              { label: '文件描述', prop: 'fileDesc', sortable: true, resizable: true },
              { label: '文件路径', prop: 'filePath', sortable: true, resizable: true, hidden: true},
              { label: '导出查询参数', prop: 'queryParam', sortable: true, resizable: true, hidden: true },
              { label: '导出状态', prop: 'status', sortable: true, resizable: true, dataCode:'STD_GENERAL_STATUS' },
              { label: '导出状态描述', prop: 'statusDesc', sortable: true, resizable: true, hidden: true },
              { label: '导出时间', prop: 'createTime', sortable: true, resizable: true },

              { label: '导出用户', prop: 'createUser', sortable: true, resizable: true, hidden: true },
              { label: '导出用户', prop: 'createUserName', sortable: true, resizable: true, hidden:true },
              { label: '导出用户所属机构', prop: 'createUserOrg', sortable: true, resizable: true, hidden: true },
              { label: '导出用户所属机构', prop: 'createUserOrgName', sortable: true, resizable: true, hidden:true },
              { label: '下载状态', prop: 'downloadSts', sortable: true, resizable: true, hidden: true, dataCode:'STD_GENERAL_STATUS' },
              { label: '下载状态描述', prop: 'downloadStsDesc', sortable: true, resizable: true, hidden: true },
              { label: '下载时间', prop: 'downloadTime', sortable: true, resizable: true, hidden: true },
              { label: '下载用户', prop: 'downloadUser', sortable: true, resizable: true, hidden: true },
              { label: '下载用户', prop: 'downloadUserName', sortable: true, resizable: true, hidden: true },
              { label: '下载用户所属机构', prop: 'downloadUserOrg', sortable: true, resizable: true, hidden: true},
              { label: '下载用户所属机构', prop: 'downloadUserOrgName', sortable: true, resizable: true, hidden: true}
            ],

            updateFields: [{
              columnCount: 2,
              fields: [
                	 { field: 'pkId', label: '操作流水号'},
                	 { field: 'fileName', label: '文件名称'},
                	 { field: 'fileDesc', label: '文件描述'},
                	 { field: 'filePath', label: '文件路径'},
                	 { field: 'status', label: '导出状态', type: 'select', dataCode:'STD_GENERAL_STATUS'},
                	 { field: 'createTime', label: '导出时间'},
                	 { field: 'createUserName', label: '导出用户', hidden: true},
                	 { field: 'createUserOrgName', label: '导出用户所属机构', hidden: true},
              ]
            },{
              columnCount: 1,
              fields: [
                { field: 'queryParam', label: '导出查询参数', type:'textarea', rows: 1},
                { field: 'statusDesc', label: '导出状态描述', type:'textarea', rows: 2}
              ]},{
              columnCount: 2,
              fields: [
                { field: 'downloadSts', label: '下载状态', type: 'select', dataCode:'STD_GENERAL_STATUS'},
                { field: 'downloadTime', label: '下载时间'},
                { field: 'downloadUserName', label: '下载用户', hidden: true},
                { field: 'downloadUserOrgName', label: '下载用户所属机构', hidden: true}
              ]},{
              columnCount: 1,
              fields: [
                { field: 'downloadStsDesc', label: '下载状态描述', type:'textarea', rows: 2}
              ]}
            ],

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
                  if (_self.viewType == "EDIT") {
                    rMethod = 'PUT';
                  } else if (_self.viewType == "ADD") {
                    rMethod = 'POST';
                  }

                  yufp.service.request({
                    method: rMethod,
                    url: '/api/file/export/list',
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
            tableData: {},
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
          checkPermission: function (ctrlCode) {
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

          downloadFn: function () {
            if (this.$refs.reftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            var _self = this;
            var obj = _self.$refs.reftable.selections[0];
            if('002' == obj.status){
              _self.$message({ message: '文件导出失败，无法下载！', type: 'warning' });
              return;
            }else if('003' == obj.status){
              _self.$message({ message: '文件下载处理中，请稍后再下载!', type: 'info' });
              return;
            }else if('001' == obj.status){
              var downLoadUrl = backend.edocService + '/api/file/export/downLoad?pkId='+obj.pkId + '&filePath='+obj.filePath;
              window.location.href = downLoadUrl;
            }else{
              _self.$message({ message: '非法的导出状态！', type: 'error' });
            }
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
            }
            
            yufp.service.request({
              method: 'DELETE',
              url: '/api/file/export/list',
              data: {
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

        },

        watch:{

          tableData: function () {
            this.$nextTick(function () {
              this.$refs.reftable.setCurrentRow(this.tableData[0]);
            })
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
