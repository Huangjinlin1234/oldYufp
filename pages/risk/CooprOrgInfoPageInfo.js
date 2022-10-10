/**
 * @create by ligm on 2019-08-10
 * @description 合作机构信息表
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
            { placeholder: '合作机构编号', field: 'cooprOrgNo', type: 'input' },
            { placeholder: '合作机构名称', field: 'cooprOrgName', type: 'input' },
            { placeholder: '公司地址', field: 'compAddr', type: 'input' },
            { placeholder: '联系人姓名', field: 'linkName', type: 'input' },
            { placeholder: '联系人手机号', field: 'linkPhone', type: 'input' },
            { placeholder: '联系电话', field: 'linkTel', type: 'input' },
            { placeholder: '发送邮箱', field: 'sendEmail', type: 'input' },
            { placeholder: '抄送邮箱', field: 'copyEmail', type: 'input' },
            { placeholder: '一手佣金率', field: 'primCommRate', type: 'input' },
            { placeholder: '二手佣金率', field: 'secdCommRate', type: 'input' },
            { placeholder: '三手佣金率', field: 'thdCommRate', type: 'input' },
            { placeholder: '长账龄佣金率', field: 'longAgeCommRate', type: 'input' },
            { placeholder: '开始合作日期', field: 'startCooprDt', type: 'input' },
            { placeholder: '终止合作日期', field: 'terminateCooprDt', type: 'input' },
            { placeholder: '合作状态', field: 'cooprStatus', type: 'input' },
            { placeholder: '合作机构类型', field: 'cooprOrgType', type: 'input' },
            { placeholder: '录入人', field: 'inputUserId', type: 'input' },
            { placeholder: '录入机构', field: 'inputOrg', type: 'input' },
            { placeholder: '录入时间', field: 'inputTime', type: 'input' },
            { placeholder: '最后更新人', field: 'lastUpdateUser', type: 'input' },
            { placeholder: '最后更新机构', field: 'lastUpdateOrg', type: 'input' },
            { placeholder: '最后更新时间', field: 'lastUpdateTime', type: 'input' }
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
            { label: '合作机构编号', prop: 'cooprOrgNo', sortable: true, resizable: true },
            { label: '合作机构名称', prop: 'cooprOrgName', sortable: true, resizable: true },
            { label: '公司地址', prop: 'compAddr', sortable: true, resizable: true },
            { label: '联系人姓名', prop: 'linkName', sortable: true, resizable: true },
            { label: '联系人手机号', prop: 'linkPhone', sortable: true, resizable: true },
            { label: '联系电话', prop: 'linkTel', sortable: true, resizable: true },
            { label: '发送邮箱', prop: 'sendEmail', sortable: true, resizable: true },
            { label: '抄送邮箱', prop: 'copyEmail', sortable: true, resizable: true },
            { label: '一手佣金率', prop: 'primCommRate', sortable: true, resizable: true },
            { label: '二手佣金率', prop: 'secdCommRate', sortable: true, resizable: true },
            { label: '三手佣金率', prop: 'thdCommRate', sortable: true, resizable: true },
            { label: '长账龄佣金率', prop: 'longAgeCommRate', sortable: true, resizable: true },
            { label: '开始合作日期', prop: 'startCooprDt', sortable: true, resizable: true },
            { label: '终止合作日期', prop: 'terminateCooprDt', sortable: true, resizable: true },
            { label: '合作状态', prop: 'cooprStatus', sortable: true, resizable: true },
            { label: '合作机构类型', prop: 'cooprOrgType', sortable: true, resizable: true },
            { label: '录入人', prop: 'inputUserId', sortable: true, resizable: true },
            { label: '录入机构', prop: 'inputOrg', sortable: true, resizable: true },
            { label: '录入时间', prop: 'inputTime', sortable: true, resizable: true },
            { label: '最后更新人', prop: 'lastUpdateUser', sortable: true, resizable: true },
            { label: '最后更新机构', prop: 'lastUpdateOrg', sortable: true, resizable: true },
            { label: '最后更新时间', prop: 'lastUpdateTime', sortable: true, resizable: true }
            ],
            updateFields: [{
              columnCount: 3,
              fields: [
                	 { field: 'cooprOrgNo', label: '合作机构编号'},
                	 { field: 'cooprOrgName', label: '合作机构名称'},
                	 { field: 'compAddr', label: '公司地址'},
                	 { field: 'linkName', label: '联系人姓名'},
                	 { field: 'linkPhone', label: '联系人手机号'},
                	 { field: 'linkTel', label: '联系电话'},
                	 { field: 'sendEmail', label: '发送邮箱'},
                	 { field: 'copyEmail', label: '抄送邮箱'},
                	 { field: 'primCommRate', label: '一手佣金率'},
                	 { field: 'secdCommRate', label: '二手佣金率'},
                	 { field: 'thdCommRate', label: '三手佣金率'},
                	 { field: 'longAgeCommRate', label: '长账龄佣金率'},
                	 { field: 'startCooprDt', label: '开始合作日期'},
                	 { field: 'terminateCooprDt', label: '终止合作日期'},
                	 { field: 'cooprStatus', label: '合作状态'},
                	 { field: 'cooprOrgType', label: '合作机构类型'},
                	 { field: 'inputUserId', label: '录入人'},
                	 { field: 'inputOrg', label: '录入机构'},
                	 { field: 'inputTime', label: '录入时间'},
                	 { field: 'lastUpdateUser', label: '最后更新人'},
                	 { field: 'lastUpdateOrg', label: '最后更新机构'},
                	 { field: 'lastUpdateTime', label: '最后更新时间'}
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
                    url: '/api/coopr/org/info',
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
            }
            
            yufp.service.request({
              method: 'DELETE',
              url: '/api/coopr/org/info',
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
