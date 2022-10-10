/**
 * @create by fuzm on 2018-05-07
 * @description 合同模板组信息表
 */
define([
  './custom/widgets/js/ContTempInfoSelector.js'
], function (require, exports) {

  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CRUD_TYPE,CONT_TEMP_TYPE,CONT_TYPE,COMMON_STATUS,STD_ZX_YES_NO');
    var vm = yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _self = this;
        return {
          dataUrl: backend.consoleService + '/api/cont/temp/gs',
          linkedDataUrl: backend.consoleService + '/api/cont/temp/info/contGLinked',
          baseParams: {},
          queryFields: [
            /*{ placeholder: '合同组ID', field: 'contGroupId', type: 'input' },*/
            {
              placeholder: '模版组名称',
              field: 'contGroupName',
              type: 'input'
            },
            {
              placeholder: '机构法人码',
              field: 'legalOrgCode',
              type: 'input'
            },
            {
              placeholder: '创建时间范围',
              field: 'createTimeBetween',
              type: 'daterange',
              value: []
            },
            {
              placeholder: '状态',
              field: 'status',
              type: 'select',
              dataCode: 'COMMON_STATUS'
            }
          ],
          queryButtons: [{
              label: '查询',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  _self.$refs.reftable.remoteData(model);
                }
              }
            },
            {
              label: '重置',
              op: 'reset',
              type: 'primary',
              icon: 'yx-loop2'
            }
          ],
          tableColumns: [
            /*{ label: '合同组ID', prop: 'contGroupId', resizable: true },*/
            {
              label: '模版组名称',
              prop: 'contGroupName',
              sortable: true,
              resizable: true
            },
            {
              label: '状态',
              prop: 'status',
              resizable: true, 
              dataCode: 'COMMON_STATUS'
            },
            {
              label: '机构法人代码',
              prop: 'legalOrgCode',
              resizable: true
            },
            {
              label: '创建人',
              prop: 'createUser',
              resizable: true
            },
            {
              label: '创建日期',
              prop: 'createTime',
              resizable: true
            }
          ],
          updateLoading: false,
          updateFields: [{
            columnCount: 1,
            fields: [{
              field: 'contGroupName',
              label: '模版组名称',
              rules: [{
                required: true,
                message: '模版组名称是必填项'
              }, {
                max: 300,
                message: '最大长度为300'
              }]
            }]
          }, {
            columnCount: 2,
            fields: [{
                field: 'contGroupId',
                label: '合同组ID',
                placeholder: '系统自动生成',
                disabled: true,
                hidden: true
              },
              {
                field: 'status',
                label: '状态',
                type: 'select',
                dataCode: 'COMMON_STATUS',
                hidden: true,
                rules: [ { required: true, message: '必填项'}]
              },
              {
                field: 'legalOrgCode',
                label: '法人机构码',
                hidden: true
              },
              {
                field: 'createUser',
                label: '创建人',
                hidden: true
              },
              {
                field: 'createTime',
                label: '创建日期',
                hidden: true
              },
              {
                field: 'lastUpdateUser',
                label: '最后更新人',
                hidden: true
              },
              {
                field: 'lastUpdateTime',
                label: '最后更新时间',
                hidden: true
              }
            ]
          }],
          height: yufp.frame.size().height - 103,
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          expandCollapseName: ['base'],
          contTempInfo: {
            dataUrl: backend.consoleService + '/api/cont/temp/info/notlink/enable',
            queryFields: [
              /*{ placeholder: '合同模板ID', field: 'contTempId', type: 'input' },*/
              {
                placeholder: '合同模板名称',
                field: 'contTempName',
                type: 'input'
              },
              {
                placeholder: '模板种类',
                field: 'contTempType',
                type: 'select',
                dataCode: 'CONT_TEMP_TYPE'
              },
              {
                placeholder: '合同类型',
                field: 'contType',
                type: 'select',
                dataCode: 'CONT_TYPE'
              }
            ],
            queryButtons: [{
                label: '查询',
                op: 'submit',
                type: 'primary',
                icon: 'search',
                click: function (model, valid) {
                  if (valid) {
                    model.contGroupId = _self.$refs.reform.formModel.contGroupId;
                    _self.$refs.linktable.remoteData(model);
                  }
                }
              },
              {
                label: '重置',
                op: 'reset',
                type: 'primary',
                icon: 'yx-loop2'
              }
            ],
            tableColumns: [
              /*{ label: '合同模板ID', prop: 'contTempId',  resizable: true },*/
              {
                label: '合同模板名称',
                prop: 'contTempName',
                sortable: true,
                resizable: true
              },
              {
                label: '模板种类',
                prop: 'contTempType',
                resizable: true,
                dataCode: 'CONT_TEMP_TYPE'
              },
              {
                label: '模板文件名',
                prop: 'contTempPath',
                resizable: true
              },
              {
                label: '合同类型',
                prop: 'contType',
                resizable: true,
                dataCode: 'CONT_TYPE'
              },
              {
                label: '是否最高额合同',
                prop: 'maxLmtContFlag',
                resizable: true,
                dataCode: 'STD_ZX_YES_NO'
              },
              {
                label: '状态',
                prop: 'status',
                resizable: true,
                dataCode: 'COMMON_STATUS'
              }
            ],
            updateLoading: false
          },
          linkedVisible: false,
          addLinkVisible: false,
          contTempGBtnsVisible: true
        };
      },
      methods: {
        /**
         * @param ctrlCode 操作码
         */
        checkPermission: function (ctrlCode) {
          return !yufp.session.checkCtrl(ctrlCode, cite.menuId);
        },
        cancelFn: function () {
          this.dialogVisible = false;
        },
        submitClassfyCfgFn: function () {
          var _self = this;
          var model = _self.$refs.reform.formModel;
          var validate = false;
          _self.$refs.reform.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }

          vm.updateLoading = true;
          yufp.service.request({
            method: 'PUT',
            url: backend.consoleService + '/api/cont/temp/g/submit',
            data: model,
            callback: function (code, message, response) {
              vm.updateLoading = false;
              var data = response.data;
              if (code == 0 && data >= 0) {
                _self.$refs.reftable.remoteData();
                _self.$message('操作成功');
                _self.dialogVisible = false;
              } else {
                _self.$message({
                  message: response.message,
                  type: 'warning'
                });
              }
            }
          });
        },
        saveClassfyCfgFn: function () {
          var _self = this;
          var model = _self.$refs.reform.formModel;
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
          vm.updateLoading = true;
          yufp.service.request({
            method: rMethod,
            url: backend.consoleService + '/api/cont/temp/g',
            data: model,
            callback: function (code, message, response) {
              vm.updateLoading = false;
              if (code == 0) {
                _self.$refs.reftable.remoteData();
                if (_self.viewType == 'ADD') {
                  if (response && response.data) {
                    _self.$message('操作成功');
                    yufp.extend(_self.$refs.reform.formModel, response.data);
                    _self.$refs.linkedtable.remoteData(response.data);
                    _self.viewType = 'EDIT';
                  } else {
                    _self.$message('操作失败');
                  }

                } else {
                  _self.$message('操作成功');
                  _self.dialogVisible = false;
                }

              } else {
                _self.$message('操作失败');
              }
            }
          });

        },
        /**
         * @param viewType 表单类型
         * @param editable 可编辑,默认false
         */
        switchStatus: function (viewType, editable) {
          this.updateLoading = false;
          this.linkedVisible = viewType != 'ADD';
          var _self = this;
          _self.viewType = viewType;
          _self.formDisabled = !editable;
          _self.dialogVisible = true;
        },
        switchParamStatus: function () {
          var val = this.viewType != 'DETAIL';
          this.$refs.reform.switch('status', 'hidden', val);
          this.$refs.reform.switch('legalOrgCode', 'hidden', val);
          this.$refs.reform.switch('createTime', 'hidden', val);
          this.$refs.reform.switch('createUser', 'hidden', val);
          this.$refs.reform.switch('lastUpdateUser', 'hidden', val);
          this.$refs.reform.switch('lastUpdateTime', 'hidden', val);
          this.$refs.reform.rebuildFn();
        },
        addFn: function () {
          var _self = this;
          _self.switchStatus('ADD', true);
          _self.$nextTick(function () {
            this.switchParamStatus();
            this.$refs.reform.resetFn();
          });
        },
        modifyFn: function () {
          if (this.$refs.reftable.selections.length != 1) {
            this.$message({
              message: '请先选择一条记录',
              type: 'warning'
            });
            return;
          }
          var obj = this.$refs.reftable.selections[0];
          if (obj.status != '0') {
            this.$message({
              message: '只能修改待生效的合同模版',
              type: 'warning'
            });
            return;
          }
          this.switchStatus('EDIT', true);
          this.$nextTick(function () {
            this.switchParamStatus();
            this.contTempGBtnsVisible = true;
            yufp.extend(this.$refs.reform.formModel, obj);
            vm.$refs.linkedtable.remoteData(obj);
          });
        },
        infoFn: function () {
          if (this.$refs.reftable.selections.length != 1) {
            this.$message({
              message: '请先选择一条记录',
              type: 'warning'
            });
            return;
          }
          this.switchStatus('DETAIL', false);
          this.$nextTick(function () {
            this.switchParamStatus();
            this.contTempGBtnsVisible = false;
            var obj = this.$refs.reftable.selections[0];
            yufp.extend(this.$refs.reform.formModel, obj);
            vm.$refs.linkedtable.remoteData(obj);
          });
        },
        deleteFn: function () {
          var _self = this;
          var selections = _self.$refs.reftable.selections;
          if (selections.length < 1) {
            _self.$message({
              message: '请先选择一条记录',
              type: 'warning'
            });
            return;
          }
          var obj = selections[0];
          if (obj.status != '0') {
            _self.$message({
              message: '只能删除待生效的合同模版!',
              type: 'warning'
            });
            return;
          }
          this.$confirm('是否删除合同模版组？', '提示')
            .then(function () {
              yufp.service.request({
                method: 'DELETE',
                url: backend.consoleService + '/api/cont/temp/g',
                data: {
                  contGroupId: obj.contGroupId
                },
                callback: function (code, message, response) {
                  if (code == 0) {
                    if (response && response.data == -2) {
                      _self.$message({
                        message: response.message,
                        type: 'warning'
                      });
                    } else {
                      _self.$refs.reftable.remoteData();
                      _self.$message('操作成功');
                    }
                  } else {
                    _self.$message('操作失败');
                  }
                }
              });

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
        },
        //失效合同模版组
        disableFn: function () {
          var selections = vm.$refs.reftable.selections;
          if (selections.length != 1) {
            vm.$message({
              message: '请先选择一条记录',
              type: 'warning'
            });
            return;
          }
          var obj = vm.$refs.reftable.selections[0];
          if (obj.status != '1') {
            vm.$message({
              message: '只有生效状态才能失效',
              type: 'warning'
            });
            return;
          }
          this.$confirm('是否失效合同模版组？', '提示')
            .then(function () {

              yufp.service.request({
                method: 'POST',
                url: backend.consoleService + '/api/cont/temp/g/disable',
                data: {
                  contGroupId: obj.contGroupId
                },
                callback: function (code, message, response) {
                  if (code == 0) {
                    if (response.data < 0) {
                      vm.$message({
                        message: response.message,
                        type: 'warning'
                      });
                    } else {
                      vm.$refs.reftable.remoteData();
                      vm.$message('操作成功');
                    }
                  } else {
                    vm.$message('操作失败');
                  }
                }
              });
            });

        },
        //添加 合同模版关联
        addLinkFn: function () {
          this.addLinkVisible = true;
          var contGroupId = this.$refs.reform.formModel.contGroupId;
          this.$nextTick(function () {
            var obj = {};
            obj.contGroupId = contGroupId;
            this.$refs.linktable.remoteData(obj);
            this.$refs.linkquetab.$children[0].resetFields();
          });
        },
        //删除关联合同模版关系
        deleteLinkFn: function () {
          var obj;
          var selections = vm.$refs.linkedtable.selections;
          if (selections.length != 1) {
            vm.$message({
              message: '请先选择一条记录',
              type: 'warning'
            });
            return;
          }
          obj = vm.$refs.linkedtable.selections[0];
          this.$confirm('是否删除关联合同模版？', '提示')
            .then(function () {
              var contGroupId = vm.$refs.reform.formModel.contGroupId;
              yufp.service.request({
                method: 'DELETE',
                url: backend.consoleService + '/api/cont/temp/rel/g',
                data: {
                  contTempId: obj.contTempId,
                  contGroupId: contGroupId
                },
                callback: function (code, message, response) {
                  if (code == 0) {
                    vm.$refs.linkedtable.remoteData();
                    vm.$message('操作成功');
                  } else {
                    vm.$message('操作失败');
                  }
                }
              });

            });
        },
        //选择合同模版
        selectFn: function () {
          var contGroupId = this.$refs.reform.formModel.contGroupId;
          var selections = this.$refs.linktable.selections;
          if (selections.length == 0) {
            this.$message({
              message: '请选择至少一个合同模版',
              type: 'warning'
            });
            return;
          }
          var temp;
          var seTemp;
          for (var i = 0; i < selections.length; i++) {
            temp = selections[i];
            for (var j = 0; j < selections.length; j++) {
              seTemp = selections[j];
              if (temp.contTempId != seTemp.contTempId) {
                if (temp.contTempType == seTemp.contTempType && 
                  temp.contType == seTemp.contType && temp.maxLmtContFlag == seTemp.maxLmtContFlag) {
                  this.$message({
                    message: '不能选择模版种类, 合同类型, 是否最高额合同三种纬度相同的合同模板!',
                    type: 'warning'
                  });
                  return;
                }
              }
            }
          }

          var rMethod = 'POST';
          var contTempIdArr = [];
          for (var k = 0; k < selections.length; k++) {
            contTempIdArr.push(selections[k].contTempId);
          }
          var model = {
            contGroupId: contGroupId,
            contTempIdArr: contTempIdArr.join(',')
          };
          vm.contTempInfo.updateLoading = true;
          yufp.service.request({
            method: rMethod,
            url: backend.consoleService + '/api/cont/temp/rel/g',
            data: model,
            callback: function (code, message, response) {
              vm.contTempInfo.updateLoading = false;
              if (code == 0) {
                if (response.data < 0) {
                  vm.$message({
                    message: response.message,
                    type: 'warning'
                  });
                } else {
                  var obj = {};
                  obj = vm.$refs.reform.formModel;
                  vm.$refs.linkedtable.remoteData(obj);
                  vm.$message('操作成功');
                  vm.addLinkVisible = false;
                }
              } else {
                _self.$message('操作失败');
              }
            }
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