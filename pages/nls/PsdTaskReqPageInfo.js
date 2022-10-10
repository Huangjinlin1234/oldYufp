/**
 * @create by ligm on 2019-08-10
 * @description 任务申请信息表
 */
define(function (require, exports) {

  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CRUD_TYPE,STD_ZB_CERT_TYP，BU_BLACK_LIST,PSD_USER_TYPE');
    yufp.custom.vue({
      components: {
        FileUpload: window.VueUploadComponent
      },
      el: cite.el,
      data: function () {

        var _self = this;
        return {
          dataUrl : backend.creditService + "/api/psd/task/req/infos",
          baseParams: {},
          queryFields: [
            { placeholder: '工单ID', field: 'orderId', type: 'input' },
            { placeholder: '客户名称', field: 'cusName', type: 'input' },
            { placeholder: '证件类型', field: 'idType', type: 'select',dataCode:'STD_ZB_CERT_TYP', datacodeFilter: function(options){
                this.typeOptions = [];
                for(var i=0; i<options.length; i++){
                  if(options[i].key != 'CN03' && options[i].key != 'HK01' && options[i].key != 'MO01' && options[i].key != 'TW01' && options[i].key != 'TW02'){
                    this.typeOptions.push(options[i]);
                  }
                }
              }},
            { placeholder: '证件号码', field: 'idNum', type: 'input' }
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
            { label: '工单ID', prop: 'orderId', sortable: true, resizable: true },
            { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
            { label: '证件类型', prop: 'idType',dataCode:'STD_ZB_CERT_TYP', sortable: true, resizable: true },
            { label: '证件号码', prop: 'idNum', sortable: true, resizable: true },
            { label: '手机号码', prop: 'celPhone', sortable: true, resizable: true },
            { label: '企业名称', prop: 'corpName', sortable: true, resizable: true },
            { label: '客户类型', prop: 'userType', sortable: true, resizable: true ,type: 'select',dataCode:'PSD_USER_TYPE'},
            { label: '处理结果', prop: 'createMsg', sortable: true, resizable: true },
            { label: '创建人', prop: 'createUser', sortable: true, resizable: true },
            { label: '创建日期', prop: 'createDate', sortable: true, resizable: true },
            { label: '创建时间', prop: 'createTime', sortable: true, resizable: true },
            { label: '最新修改人', prop: 'lastUpdateUser', sortable: true, resizable: true },
            { label: '最后修改时间', prop: 'lastTimeShow', sortable: true, resizable: true }
          ],
          updateFields: [{
            columnCount: 3,
            fields: [
              { field: 'orderId', label: '工单ID' ,rules: [{required: true, message: '必填项', trigger: 'blur'}]},
              { field: 'cusName', label: '客户名称' ,rules: [{required: true, message: '必填项', trigger: 'blur'}]},
              { field: 'idType', label: '证件类型' ,rules: [{required: true, message: '必填项', trigger: 'blur'}],type: 'select',dataCode:'STD_ZB_CERT_TYP',
                datacodeFilter: function(options){
                  this.typeOptions = [];
                  for(var i=0; i<options.length; i++){
                    if(options[i].key != 'CN03' && options[i].key != 'HK01' && options[i].key != 'MO01' && options[i].key != 'TW01' && options[i].key != 'TW02'){
                      this.typeOptions.push(options[i]);
                    }
                  }
                }},
              { field: 'idNum', label: '证件号码' ,rules: [{required: true, message: '必填项', trigger: 'blur'}]},
              { field: 'celPhone', label: '手机号码' ,rules: [{required: true, message: '必填项', trigger: 'blur'}]},
              { field: 'corpName', label: '企业名称' ,rules: [{required: true, message: '必填项', trigger: 'blur'}]},
              { field: 'userType', label: '客户类型' ,type: 'select',dataCode:'PSD_USER_TYPE',rules: [{required: true, message: '必填项', trigger: 'blur'}]},
              { field: 'handleResult', label: '处理结果' ,rules: [{required: true, message: '必填项', trigger: 'blur'}]},
              { field: 'createUser', label: '创建人' ,disabled:true},
              { field: 'createDate', label: '创建日期' ,disabled:true},
              { field: 'createTime', label: '创建时间' ,disabled:true},
              { field: 'lastUpdateUser', label: '最新修改人' ,disabled:true},
              { field: 'lastTimeShow', label: '最后修改时间' ,disabled:true}
            ]
          }],
          updateButtons: [
            // { label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
            //         _self.dialogVisible = false;
            //     } },
            // { label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
            //         var validate = false;
            //         _self.$refs.reform.validate(function (valid) {
            //             validate = valid;
            //         });
            //         if (!validate) {
            //             return;
            //         }
            //
            //         var rMethod = '';
            //         if(_self.viewType == "EDIT") {
            //             rMethod = 'PUT';
            //         } else if(_self.viewType == "ADD") {
            //             rMethod = 'POST';
            //         }
            //
            //         yufp.service.request({
            //             method: rMethod,
            //             url: backend.creditService + '/api/psd/task/req/info',
            //             data: model,
            //             callback: function (code, message, response) {
            //                 if (code == 0) {
            //                     _self.$refs.reftable.remoteData();
            //                     _self.$message('操作成功');
            //                     _self.dialogVisible = false;
            //                 } else {
            //                     _self.$message('操作失败');
            //                 }
            //             }
            //         });
            //     } },
            {
              label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                _self.dialogVisible = false
              }
            }
          ],

          importDialogVisible: false,
          exportDialogVisible:false,
          loading2: false,
          height: yufp.frame.size().height - 103,
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
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
          _self.updateButtons[0].hidden = !editable;
          // _self.updateButtons[1].hidden = !editable;
          // _self.updateButtons[2].hidden = false;
          _self.formDisabled = !editable;
          _self.dialogVisible = true;
        },

        switchParamStatus: function () {
          var val = this.viewType != 'DETAIL';
          this.$refs.reform.switch('createTime', 'hidden', val);
          this.$refs.reform.switch('createUser', 'hidden', val);
          this.$refs.reform.switch('lastChgUsr', 'hidden', val);
          this.$refs.reform.switch('lastChgTime', 'hidden', val);
          this.$refs.reform.rebuildFn();
        },

        addFn: function () {
          var _self = this;
          _self.switchStatus('ADD', true);
          _self.$nextTick(function () {
            _self.switchParamStatus();
            // _self.updateButtons[2].hidden = true;
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
            this.switchParamStatus();
            // this.updateButtons[2].hidden = true;
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
            this.switchParamStatus();
            yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0]);
          });
        },
        // deleteFn: function () {
        //     var _self = this;
        //     var selections = _self.$refs.reftable.selections;
        //     if (selections.length < 1) {
        //         _self.$message({ message: '请先选择一条记录', type: 'warning' });
        //         return;
        //     }
        //     /* var len = selections.length, arr = [];
        //      for (var i = 0; i < len; i++) {
        //      }*/
        //
        //     _self.$confirm('是否删除?','提示',{type:'warning'}).then(function() {
        //         yufp.service.request({
        //             method: 'DELETE',
        //             url: backend.creditService + '/api/black/list/info',
        //             /* data: {},*/
        //             data: _self.$refs.reftable.selections[0],
        //             callback: function (code, message, response) {
        //                 if (code == 0) {
        //                     _self.$refs.reftable.remoteData();
        //                     _self.$message('操作成功');
        //                 } else {
        //                     _self.$message('操作失败');
        //                 }
        //             }
        //         });
        //     }).catch(function () {})
        // },

      }// end of methods
    });
  };
  // 消息处理
  exports.onmessage = function (type, message) {

  };
  // page销毁时触发destroy方法
  exports.destroy = function (id, cite) {

  }

});
