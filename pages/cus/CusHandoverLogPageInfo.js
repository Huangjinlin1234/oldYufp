/**
 * @create by chenqm1 on 2018-05-14
 * @description 客户移交申请
 */
define(function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE,STD_ZB_HAND_SCOPE,STD_ZB_HAND_TYPE,STD_ZB_ORG_TYPE,STD_ZB_HAND_STATUS');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
           
          var _self = this;
          return {
            dataUrl : backend.cusService+'/api/cus/handover/logs',
            applyDetailDataUrl: backend.cusService + '/api/cus/handover/lst/serno',
            baseParams: {
            },
            cusBaseParams:{},
            queryFields: [
            { placeholder: '申请流水号', field: 'serno', type: 'input' },
            { placeholder: '移出人代码', field: 'handoverId', type: 'input' },
            { placeholder: '移出机构代码', field: 'handoverBrId', type: 'input' },
            { placeholder: '接收人代码', field: 'receiverId', type: 'input' },
            { placeholder: '接收机构代码', field: 'receiverBrId', type: 'input' },
            { placeholder: '登记日期区间', field: 'inputDates', type: 'daterange',value:[]}
            ],
            queryButtons: [
              { label: '查看', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                  if (valid) {
                    _self.$refs.reftable.remoteData(model);
                  }
                } },
              { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
            ],
     appTableColumns: [
            //{ label: '申请流水号', prop: 'serno', sortable: true, resizable: true },
            { label: '业务类型', prop: 'handoverType', sortable: true, resizable: true ,dataCode:'STD_ZB_HAND_TYPE'},
            { label: '客户号', prop: 'cusId', sortable: true, resizable: true },
            { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
            { label: '移交业务说明', prop: 'businessDetail', sortable: true, resizable: true }
            //{ label: '标记(备用)', prop: 'flag', sortable: true, resizable: true }
            ],
            tableColumns: [
              { label: '申请流水号', prop: 'serno', sortable: true, resizable: true },
              { label: '移交范围', prop: 'handoverScope', dataCode: 'STD_ZB_HAND_SCOPE', sortable: true, resizable: true },
              { label: '移出人代码', prop: 'handoverId', sortable: true, resizable: true },
              { label: '移出机构代码', prop: 'handoverBrId', sortable: true, resizable: true },
              { label: '监交人代码', prop: 'superviseId', sortable: true, resizable: true },
              { label: '监交机构代码', prop: 'superviseBrId', sortable: true, resizable: true },
              { label: '接收人代码', prop: 'receiverId', sortable: true, resizable: true },
              { label: '接收机构代码', prop: 'receiverBrId', sortable: true, resizable: true },
              { label: '状态', prop: 'status', dataCode: 'STD_ZB_HAND_STATUS' },
              { label: '登记日期', prop: 'handoverDate', sortable: true, resizable: true }
            ],
            updateFields: [{
              columnCount: 3,
              fields: [
                   { field: 'serno', label: '申请流水号'},
                   { field: 'orgType', label: '接收机构与移出机构关系', type: 'select',dataCode:'STD_ZB_ORG_TYPE' },
                   { field: 'handoverScope', label: '移交范围', type: 'select',dataCode:'STD_ZB_HAND_SCOPE' },
                   { field: 'handoverMode', label: '移交方式', type: 'select',dataCode:'STD_ZB_HAND_TYPE' },
                   { field: 'handoverId', label: '移出人代码'},
                   { field: 'handoverBrId', label: '移出机构代码'},
                   { field: 'superviseId', label: '监交人代码'},
                   { field: 'superviseBrId', label: '监交机构代码'},
                   { field: 'receiverId', label: '接收人代码'},
                   { field: 'receiverBrId', label: '接收机构代码'},
                   { field: 'areaCode', label: '区域编码' },
                   { field: 'areaName', label: '区域名称' },
                   { field: 'handoverDetail', label: '移交说明',type:"textarea",autosize:{ minRows: 2, maxRows: 4}},
                   { field: 'status', label: '状态', type: 'select',dataCode:'STD_ZB_HAND_STATUS' },
                   { field: 'handoverDate', label: '登记日期'}
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
                    url: '/api/cus/handover/log',
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
          };
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
          	var _self = this;
            if (this.$refs.reftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            this.switchStatus('DETAIL', false);
            
            this.$nextTick(function () {
              var apply = this.$refs.reftable.selections[0];
              yufp.extend(this.$refs.reform.formModel, apply);
              var obj = {
                serno: apply.serno
              };
                      
              this.$refs.appReftable.remoteData(obj);
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
              url: '/api/cus/handover/log',
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

    };

});
