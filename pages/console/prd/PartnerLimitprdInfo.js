/**
 * @create by wanglh4 on 2019-08-21
 * @description 合作方限额
 */
define([
  './custom/widgets/js/PrdIdInfoLmtSpecialSelector.js'
], function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CRUD_TYPE,QUOTA_LIMIT_STATUS,QUOTA_LIMIT_CUS_TYPE,QUOTA_LIMIT_TYPE,APPLY_CHANNEL_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _self = this;
        return {
          dataUrl: backend.consoleService + '/api/quoat/limit/prd/infos',
          baseParams: {
            quotaType: '02'
          },

          queryFields: [
            {label: '限额编号', field: 'serno', ctype: 'input', name: 'serno'},
            {label: '限额', field: 'serno', ctype: 'input', name: 'serno'},
            {label: '产品编号', field: 'serno', ctype: 'input', name: 'serno'}
          ],
          tableColumns: [
            { label: '限额编号', prop: 'serno', resizable: true },
            { label: '限额',
              prop: 'quotaLimitAmt',
              resizable: true,
              formatter: function (row, column, cellValue) {
                return yufp.util.moneyFormatter(cellValue, 2);
              }
            },
            { label: '限额开始日期', prop: 'strDt', resizable: true, editable: false },
            { label: '限额结束日期', prop: 'endDt', resizable: true, editable: false},
            { label: '限额状态', prop: 'sts', resizable: true, dataCode: 'QUOTA_LIMIT_STATUS' },
            { label: '产品编号', prop: 'prdCode', resizable: true, hidden: true},
            { label: '产品名称', prop: 'prdName', resizable: true},
            { label: '创建人', prop: 'createUser', resizable: true },
            { label: '创建时间', prop: 'createTime', resizable: true }
          ],
          tableData: [],
          updateFields: [{
            columnCount: 3,
            fields: [
              { field: 'serno',
                label: '限额编号',
                disabled: true,
                rules: [{ required: true, message: '必填项', trigger: 'blur' }]
              },
              { field: 'quotaLimitAmt',
                label: '限额',
                type: 'num',
                digit: 2,
                formatter: yufp.util.moneyFormatter,
                rules: [{ required: true, message: '必填项,请填入数字', trigger: 'blur', type: 'number' }]
              },
              { field: 'sts',
                label: '限额状态',
                type: 'select',
                dataCode: 'QUOTA_LIMIT_STATUS',
                disabled: true,
                rules: [{ required: true, message: '必填项', trigger: 'blur' }]
              },
              { field: 'strDt',
                label: '限额开始日期',
                type: 'date',
                disabled: true,
                formatter: yufp.util.dateFormatter,
                editable: false,
                rules: [{ required: true, message: '必填项', trigger: 'blur', type: 'date' },
                  { validator: function (rule, value, callback) {
                    var endDt = _self.$refs.reform.formModel.endDt;
                    if (endDt != '' && value >= endDt) {
                      callback(new Error('开始日期须早于结束日期'));
                      _self.$refs.reform.formModel.strDt = '';
                    } else {
                      callback();
                    }
                  }
                  }
                ]
              },
              { field: 'endDt',
                label: '限额结束日期',
                type: 'date',
                editable: false,
                rules: [{ required: true, message: '必填项', trigger: 'blur', type: 'date'},
                  { validator: function (rule, value, callback) {
                    var strDt = _self.$refs.reform.formModel.strDt;
                    if (strDt != '' && value <= strDt) {
                      callback(new Error('结束日期须晚于开始日期'));
                      _self.$refs.reform.formModel.endDt = '';
                    } else {
                      callback();
                    }
                  }
                  }
                ]
              },
              { field: 'prdCode',
                label: '产品编号',
                type: 'custom',
                is: 'div-prdId-special-selector',
                params: {type: ''},
                selectFn: function (val, formModel, result) {
                  var org = result[1];
                  formModel.prdName = org.prdName;
                },
                rules: [{ required: true, message: '必填项', trigger: 'blur' }]
              },
              { field: 'prdName', label: '产品名称', disabled: true},
              { field: 'createUser', label: '创建人', hidden: true, disabled: true},
              { field: 'createTime', label: '创建时间', hidden: true, disabled: true},
              { field: 'lastChgUsr', label: '最后修改用户', hidden: true, disabled: true},
              { field: 'lastChgTime', label: '最后修改时间', hidden: true, disabled: true}
            ]
          }],
          updateButtons: [
            {
              label: '取消',
              type: 'primary',
              icon: 'yx-undo2',
              hidden: false,
              click: function (model) {
                _self.dialogVisible = false;
              }
            },
            {
              label: '保存',
              type: 'primary',
              icon: 'check',
              hidden: false,
              click: function (model) {
                var validate = false;
                var tableData = _self.$refs.reftable.data;
                _self.$refs.reform.validate(function (valid) {
                  validate = valid;
                });
                if (!validate) {
                  return;
                }
                var rMethod = '';
                if (_self.viewType == 'EDIT') {
                  rMethod = 'PUT';
                  model.lastChgUsr = yufp.session.userName;// 最后修改人
                } else if (_self.viewType == 'ADD') {
                  rMethod = 'POST';
                  model.quotaType = '02';
                  model.createUser = yufp.session.userName;// 创建人
                }
                yufp.service.request({
                  method: rMethod,
                  url: backend.consoleService + '/api/quoat/limit/prd/info',
                  data: model,
                  callback: function (code, message, response) {
                    if (code == 0 && response.code == '0') {
                      _self.$refs.reftable.remoteData();
                      _self.$message('操作成功');
                      _self.dialogVisible = false;
                    } else if (response.rows == '-2') {
                      _self.$message({ message: '单一客户的限额只能存在一条有效记录!', type: 'warning' });
                    } else {
                      _self.$message({message: '操作失败', type: 'warning'});
                    }
                  }
                });
              }
            }
          ],
          height: yufp.frame.size().height - 103,
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false)
        };
      },
      methods: {
        getTableData: function () {
          var _this = this;
          yufp.service.request({
            method: 'POST',
            url: _this.dataUrl,
            callback: function (code, message, res) {
              console.log(code, message, res, 'res,code,message');
              _this.$refs.reftable.data = res.rows;
              console.log(_this.tableData, '_this.tableData');
            }
          });
        },
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
        switchParamStatus: function () {
          if (this.viewType == 'ADD') {
            this.$refs.reform.switch('serno', 'hidden', true);
            this.$refs.reform.switch('strDt', 'disabled', false);
            this.$refs.reform.switch('sts', 'disabled', false);
            this.$refs.reform.switch('prdCode', 'disabled', false);
            this.$refs.reform.switch('quotaType', 'disabled', false);
            this.$refs.reform.switch('createUser', 'hidden', true);
            this.$refs.reform.switch('createTime', 'hidden', true);
            this.$refs.reform.switch('lastChgUsr', 'hidden', true);
            this.$refs.reform.switch('lastChgTime', 'hidden', true);
          } else if (this.viewType == 'EDIT') {
            this.$refs.reform.switch('serno', 'hidden', false);
            this.$refs.reform.switch('serno', 'disabled', true);
            this.$refs.reform.switch('strDt', 'disabled', true);
            this.$refs.reform.switch('sts', 'disabled', true);
            this.$refs.reform.switch('prdCode', 'disabled', true);
            this.$refs.reform.switch('quotaType', 'disabled', true);
            this.$refs.reform.switch('createUser', 'hidden', false);
            this.$refs.reform.switch('createTime', 'hidden', false);
            this.$refs.reform.switch('lastChgUsr', 'hidden', false);
            this.$refs.reform.switch('lastChgTime', 'hidden', false);
          }
          this.$refs.reform.rebuildFn();
        },
        addFn: function () {
          var _self = this;
          _self.switchStatus('ADD', true);
          _self.$nextTick(function () {
            _self.switchParamStatus();
            _self.$refs.reform.resetFn();
          });
        },
        modifyFn: function () {
          if (this.$refs.reftable.selections.length != 1) {
            this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          // var obj = this.$refs.reftable.selections[0];
          // if (obj.sts != '00') {
          //     this.$message({message: '只能修改失效信息', type: 'warning'});
          //     return;
          // }
          this.switchStatus('EDIT', true);
          this.$nextTick(function () {
            this.switchParamStatus();
            var obj = this.$refs.reftable.selections[0];
            yufp.extend(this.$refs.reform.formModel, obj, {strDt: new Date(obj.strDt), endDt: new Date(obj.endDt)});
          });
        },
        /*         infoFn: function () {
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
                         }

                         yufp.service.request({
                           method: 'DELETE',
                           url: '/api/bd/money/draw/temp',
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
                       }*/
        setStatusFn: function (status) {
          var _self = this;
          var model = _self.$refs.reftable.selections[0];
          var tableData = _self.$refs.reftable.data;
          if (model != null) {
            if (status == '00') {
              if (model.sts == '01') {
                _self.$confirm('是否置该限额状态为无效?', '提示', {type: 'warning'}).then(function () {
                  yufp.service.request({
                    method: 'PUT',
                    url: backend.consoleService + '/api/quoat/limit/prd/infos/status',
                    data: {
                      'sts': status,
                      'serno': model.serno
                    },
                    callback: function (code, message, response) {
                      if (code == 0) {
                        if (response.success) {
                          _self.$message('操作成功');
                        }
                        _self.$refs.reftable.remoteData();
                      } else {
                        _self.$message({message: '操作失败', type: 'error'});
                      }
                    }
                  });
                });
              } else {
                _self.$message({message: '只有有效状态的才能置为无效!'});
              }
            } else {
              if (model.sts == '00') {
                /*   for(var i = 0 ; i < tableData.length ; i++) {
                                    if(tableData[i].sts == '01'){
                                        this.$message({ message: '单一客户的限额只存在一条有效记录!', type: 'warning' });
                                        return;
                                    }
                                }*/

                var curDt = yufp.util.dateFormat(new Date(), '{y}-{m}-{d}');
                var endDt = yufp.util.dateFormat(new Date(model.endDt), '{y}-{m}-{d}');
                if (endDt < curDt) {
                  this.$message({ message: '该笔限额结束日期小于当天，不可生效！', type: 'warning' });
                  return;
                }

                _self.$confirm('是否置该限额状态为有效?', '提示', {type: 'warning'}).then(function () {
                  yufp.service.request({
                    method: 'PUT',
                    url: backend.consoleService + '/api/quoat/limit/prd/infos/status',
                    data: {
                      'sts': status,
                      'serno': model.serno,
                      'prdId': model.prdId,
                      'prdCode': model.prdCode,
                      'prdName': model.prdName,
                      'quotaType': '02'
                    },
                    callback: function (code, message, response) {
                      if (code == 0 && response.code == '0') {
                        _self.$refs.reftable.remoteData();
                        _self.$message('操作成功');
                      } else if (response.rows == '-2') {
                        _self.$message({ message: '同一产品的限额只能存在一条有效记录!', type: 'warning' });
                      } else {
                        _self.$message({message: '操作失败', type: 'error'});
                      }
                    }
                  });
                });
              } else {
                _self.$message({message: '只有无效状态的才能置为有效！'});
              }
            }
          } else {
            _self.$message({message: '请选择一条记录', type: 'warning'});
          }
        }
      },
      created: function () {
        this.getTableData();
      },
      mounted: function () {
        console.log(this.$refs.reftable, 'ref');
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
