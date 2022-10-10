/**
 * @create by chenqm1 on 2018-05-03
 * @description 检查任务历史表
 */
define(function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE,S_ZB_CHK_TYPE,STD_ZB_CERT_TYP');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
          	dataUrl:backend.pspService+'/api/psp/check/task/hiss',
            baseParams: {
            },
            queryFields: [
            { placeholder: '任务编号', field: 'bizSerno', type: 'input' },
            { placeholder: '客户名称', field: 'cusName', type: 'input' },
            { placeholder: '检查类型', field: 'chkType', type: 'select',dataCode:'S_ZB_CHK_TYPE' },
            { placeholder: '检查任务状态', field: 'chkState', type: 'input' },
            { placeholder: '检查贷款余额', field: 'chkBln', type: 'input' },
            { placeholder: '检查贷款笔数', field: 'chkNum', type: 'input' },
            { placeholder: '授信总额', field: 'ownCdt', type: 'input' },
            { placeholder: '贷款总余额', field: 'loanTotalBln', type: 'input' },
            { placeholder: '其他不利因素', field: 'othUnFactor', type: 'input' },
            { placeholder: '情况说明及建议', field: 'expSugg', type: 'input' },
            { placeholder: '实际完成日期', field: 'realFinDate', type: 'input' },
            { placeholder: '任务分配人', field: 'taskProId', type: 'input' },
            { placeholder: '任务分配机构', field: 'taskProBrId', type: 'input' },
            { placeholder: '任务执行人', field: 'taskExeId', type: 'input' },
            { placeholder: '任务办理人', field: 'hdlNo', type: 'input' },
            { placeholder: '任务办理日期', field: 'hdlDate', type: 'input' },
            { placeholder: '创建人', field: 'createUser', type: 'input' },
            { placeholder: '创建时间', field: 'createTime', type: 'input' },
            { placeholder: '最后更新人', field: 'lastUpdateUser', type: 'input' },
            { placeholder: '最后更新时间', field: 'lastUpdateTime', type: 'input' },
            { placeholder: '法人机构代码', field: 'legalOrgCode', type: 'input' },
            { placeholder: '机构码', field: 'orgCode', type: 'input' },
            { placeholder: '机构名称', field: 'orgName', type: 'input' },
            { placeholder: '客户类型', field: 'cusType', type: 'input' },
            { placeholder: '客户编号', field: 'cusId', type: 'input' },
            { placeholder: '证件类型', field: 'certType', type: 'select',dataCode:'STD_ZB_CERT_TYP'},
            { placeholder: '证件号码', field: 'certCode', type: 'input' },
            { placeholder: '客户经理', field: 'cusManager', type: 'input' },
            { placeholder: '主管机构', field: 'mainBrId', type: 'input' },
            { placeholder: '法人机构名称', field: 'legalOrgName', type: 'input' },
            { placeholder: '合同编号', field: 'contNo', type: 'input' },
            { placeholder: '合同金额', field: 'contAmt', type: 'input' },
            { placeholder: '合同起始日', field: 'loanStartDate', type: 'input' },
            { placeholder: '合同到期日', field: 'loanEndDate', type: 'input' },
            { placeholder: '检查名称', field: 'chkName', type: 'input' },
            { placeholder: '登记机构', field: 'inputBrId', type: 'input' }
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
            { label: '任务编号', prop: 'bizSerno', sortable: true, resizable: true },
            { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
            { label: '检查类型', prop: 'chkType', sortable: true, resizable: true },
            { label: '检查任务状态', prop: 'chkState', sortable: true, resizable: true },
            { label: '检查贷款余额', prop: 'chkBln', sortable: true, resizable: true },
            { label: '检查贷款笔数', prop: 'chkNum', sortable: true, resizable: true },
            { label: '授信总额', prop: 'ownCdt', sortable: true, resizable: true },
            { label: '贷款总余额', prop: 'loanTotalBln', sortable: true, resizable: true },
            { label: '其他不利因素', prop: 'othUnFactor', sortable: true, resizable: true },
            { label: '情况说明及建议', prop: 'expSugg', sortable: true, resizable: true },
            { label: '实际完成日期', prop: 'realFinDate', sortable: true, resizable: true },
            { label: '任务分配人', prop: 'taskProId', sortable: true, resizable: true },
            { label: '任务分配机构', prop: 'taskProBrId', sortable: true, resizable: true },
            { label: '任务执行人', prop: 'taskExeId', sortable: true, resizable: true },
            { label: '任务办理人', prop: 'hdlNo', sortable: true, resizable: true },
            { label: '任务办理日期', prop: 'hdlDate', sortable: true, resizable: true },
            { label: '创建人', prop: 'createUser', sortable: true, resizable: true },
            { label: '创建时间', prop: 'createTime', sortable: true, resizable: true },
            { label: '最后更新人', prop: 'lastUpdateUser', sortable: true, resizable: true },
            { label: '最后更新时间', prop: 'lastUpdateTime', sortable: true, resizable: true },
            { label: '法人机构代码', prop: 'legalOrgCode', sortable: true, resizable: true },
            { label: '机构码', prop: 'orgCode', sortable: true, resizable: true },
            { label: '机构名称', prop: 'orgName', sortable: true, resizable: true },
            { label: '客户类型', prop: 'cusType', sortable: true, resizable: true },
            { label: '客户编号', prop: 'cusId', sortable: true, resizable: true },
            { label: '证件类型', prop: 'certType', sortable: true, resizable: true },
            { label: '证件号码', prop: 'certCode', sortable: true, resizable: true },
            { label: '客户经理', prop: 'cusManager', sortable: true, resizable: true },
            { label: '主管机构', prop: 'mainBrId', sortable: true, resizable: true },
            { label: '法人机构名称', prop: 'legalOrgName', sortable: true, resizable: true },
            { label: '合同编号', prop: 'contNo', sortable: true, resizable: true },
            { label: '合同金额', prop: 'contAmt', sortable: true, resizable: true },
            { label: '合同起始日', prop: 'loanStartDate', sortable: true, resizable: true },
            { label: '合同到期日', prop: 'loanEndDate', sortable: true, resizable: true },
            { label: '检查名称', prop: 'chkName', sortable: true, resizable: true },
            { label: '登记机构', prop: 'inputBrId', sortable: true, resizable: true }
            ],
            updateFields: [{
              columnCount: 3,
              fields: [
                	 { field: 'bizSerno', label: '任务编号'},
                	 { field: 'cusName', label: '客户名称'},
                	 { field: 'chkType', label: '检查类型'},
                	 { field: 'chkState', label: '检查任务状态'},
                	 { field: 'chkBln', label: '检查贷款余额'},
                	 { field: 'chkNum', label: '检查贷款笔数'},
                	 { field: 'ownCdt', label: '授信总额'},
                	 { field: 'loanTotalBln', label: '贷款总余额'},
                	 { field: 'othUnFactor', label: '其他不利因素'},
                	 { field: 'expSugg', label: '情况说明及建议'},
                	 { field: 'realFinDate', label: '实际完成日期'},
                	 { field: 'taskProId', label: '任务分配人'},
                	 { field: 'taskProBrId', label: '任务分配机构'},
                	 { field: 'taskExeId', label: '任务执行人'},
                	 { field: 'hdlNo', label: '任务办理人'},
                	 { field: 'hdlDate', label: '任务办理日期'},
                	 { field: 'createUser', label: '创建人'},
                	 { field: 'createTime', label: '创建时间'},
                	 { field: 'lastUpdateUser', label: '最后更新人'},
                	 { field: 'lastUpdateTime', label: '最后更新时间'},
                	 { field: 'legalOrgCode', label: '法人机构代码'},
                	 { field: 'orgCode', label: '机构码'},
                	 { field: 'orgName', label: '机构名称'},
                	 { field: 'cusType', label: '客户类型'},
                	 { field: 'cusId', label: '客户编号'},
                	 { field: 'certType', label: '证件类型'},
                	 { field: 'certCode', label: '证件号码'},
                	 { field: 'cusManager', label: '客户经理'},
                	 { field: 'mainBrId', label: '主管机构'},
                	 { field: 'legalOrgName', label: '法人机构名称'},
                	 { field: 'contNo', label: '合同编号'},
                	 { field: 'contAmt', label: '合同金额'},
                	 { field: 'loanStartDate', label: '合同起始日'},
                	 { field: 'loanEndDate', label: '合同到期日'},
                	 { field: 'chkName', label: '检查名称'},
                	 { field: 'inputBrId', label: '登记机构'}
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
                    url: backend.pspService+'/api/psp/check/task/his',
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
              _self.$refs.reform.resetFields();
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
              arr.push(selections[i].bizSerno);
            }
            
            yufp.service.request({
              method: 'DELETE',
              url:backend.pspService+ '/api/psp/check/task/his',
              data: {
              	bizSerno: arr.join(',')
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
