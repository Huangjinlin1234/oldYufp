/**
 * @create by ligm on 2020-01-02
 * @description 息费减免明细信息
 */
define(function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE,STD_ZB_CERT_TYP');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
            baseParams: {
            },
            dataUrl: backend.riskmService + '/api/mon/relief/detail',
            queryFields: [
              { placeholder: '借据编号', field: 'billNo', type: 'input' },
              { placeholder: '客户编号', field: 'cusId', type: 'input' },
              { placeholder: '客户名称', field: 'cusName', type: 'input' },
              { placeholder: '证件类型', field: 'certType', type: 'input', hidden: true},
              { placeholder: '证件号码', field: 'certCode', type: 'input', hidden: true }
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
              { label: '借据编号', prop: 'billNo', sortable: true, resizable: true },
              { label: '客户编号', prop: 'cusId', sortable: true, resizable: true },
              { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
              { label: '证件类型', prop: 'certType', sortable: true, resizable: true, dataCode: 'STD_ZB_CERT_TYP' },
              { label: '证件号码', prop: 'certCode', sortable: true, resizable: true },
              // { label: '合同编号', prop: 'contNo', sortable: true, resizable: true, hidden: true},
              // { label: '产品编号', prop: 'prdCode', sortable: true, resizable: true, hidden: true },
              { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
              { label: '累计减免笔数', prop: 'totalReliefNum', sortable: true, resizable: true },
              { label: '累计减免金额', prop: 'totalReliefLmt', sortable: true, resizable: true, formatter: function (row, column, cellValue) {
                      return yufp.util.moneyFormatter(cellValue, 2);
                  } }
            ],

            exportFileName: '息费减免明细信息',
            height: yufp.frame.size().height - 103,
            dialogVisible: false,
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
              _self.dialogVisible = true;

              _self.updateButtons[0].hidden = !editable;
              _self.updateButtons[1].hidden = !editable;
              _self.updateButtons[2].hidden = editable;
          },

          infoFn: function () {
            if (this.$refs.reftable.selections.length != 1) {
                this.$message({message: '请先选择一条记录', type: 'warning'});
                return;
            }
            var _self = this;
            _self.switchStatus('DETAIL', false);
            _self.formDisabled = true;

            var obj = _self.$refs.reftable.selections[0];
          },

          exportFn: function () {
              var _self = this;
              var formValue = this.$refs.queryForm.fm;
              this.$confirm('是否导出数据?', '提示').then(function () {
                  yufp.util.exportExcelByTable({
                      fileName: _self.exportFileName,
                      importType: 'service', // page当前页 selected 选中的数据  service 后端数据
                      ref: _self.$refs.reftable,
                      url: backend.riskmService + '/api/mon/relief/detail',
                      method: 'POST',
                      param: {
                          billNo: formValue.billNo,
                          cusId: formValue.cusId,
                          cusName: formValue.cusName,
                          exportFlag: 'exp'
                      }
                  });
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
