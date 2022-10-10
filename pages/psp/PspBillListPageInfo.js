/**
 * @create by chenqm1 on 2018-05-05
 * @description 贷后检查借据表
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
          	dataUrl:backend.pspService+'/api/psp/bill/lists',
            baseParams: {
            },
            queryFields: [
            { placeholder: '任务编号', field: 'bizSerno', type: 'input' },
            { placeholder: '合同编号', field: 'contNo', type: 'input' },
            { placeholder: '客户编号', field: 'cusId', type: 'input' },
            { placeholder: '客户名称', field: 'cusName', type: 'input' },
            { placeholder: '产品id', field: 'prdId', type: 'input' },
            { placeholder: '产品号', field: 'prdCode', type: 'input' },
            { placeholder: '产品名称', field: 'prdName', type: 'input' },
            { placeholder: '贷款起始日', field: 'loanStartDate', type: 'input' },
            { placeholder: '贷款终止日', field: 'loanEndDate', type: 'input' },
            { placeholder: '贷款账号', field: 'loanAccount', type: 'input' },
            { placeholder: '主管机构', field: 'mainBrId', type: 'input' },
            { placeholder: '业务品种', field: 'bizType', type: 'input' },
            { placeholder: '业务品种细分', field: 'bizTypeSub', type: 'input' },
            { placeholder: '借据金额', field: 'loanAmount', type: 'input' },
            { placeholder: '借据余额', field: 'loanBalance', type: 'input' },
            { placeholder: '贷款利率', field: 'realityIrY', type: 'input' },
            { placeholder: '欠息累计', field: 'delayIntCumu', type: 'input' },
            { placeholder: '表内欠息', field: 'innerIntCumu', type: 'input' },
            { placeholder: '表外欠息', field: 'offIntCumu', type: 'input' },
            { placeholder: '正常贷款余额(元)', field: 'normalBalance', type: 'input' },
            { placeholder: '逾期贷款余额(元)', field: 'overdueBalance', type: 'input' },
            { placeholder: '呆滞贷款余额(元)', field: 'sluggishBalance', type: 'input' },
            { placeholder: '呆账贷款余额(元)', field: 'doubtfulBalance', type: 'input' },
            { placeholder: '七级分类结果', field: 'sevenResult', type: 'input' },
            { placeholder: '账务机构', field: 'finaBrId', type: 'input' },
            { placeholder: '表内应收', field: 'innerReceInt', type: 'input' },
            { placeholder: '逾期应收', field: 'overdueReceInt', type: 'input' },
            { placeholder: '表外利息', field: 'offInt', type: 'input' },
            { placeholder: '利息复息', field: 'compoundInt', type: 'input' },
            { placeholder: '表内转表外利息', field: 'innerOffInt', type: 'input' },
            { placeholder: '实收利息', field: 'collectionInterest', type: 'input' },
            { placeholder: '是否存在当前逾期', field: 'extOverdue', type: 'input' },
            { placeholder: '最近一次逾期金额', field: 'overdueBlnAmt', type: 'input' },
            { placeholder: '最近一次逾期时间', field: 'overdueDate', type: 'input' },
            { placeholder: '创建人', field: 'createUser', type: 'input' },
            { placeholder: '创建时间', field: 'createTime', type: 'input' },
            { placeholder: '最后更新人', field: 'lastUpdateUser', type: 'input' },
            { placeholder: '最后更新时间', field: 'lastUpdateTime', type: 'input' },
            { placeholder: '法人机构代码', field: 'legalOrgCode', type: 'input' },
            { placeholder: '客户经理', field: 'cusManager', type: 'input' },
            { placeholder: '五级分类', field: 'cla', type: 'input' },
            { placeholder: '五级分类日期', field: 'claDate', type: 'input' },
            { placeholder: '借据编号', field: 'billNo', type: 'input' },
            { placeholder: '担保方式', field: 'assureMeansMain', type: 'input' },
            { placeholder: '四级分类标志', field: 'loanForm4', type: 'input' },
            { placeholder: '违约标志', field: 'defaultFlag', type: 'input' },
            { placeholder: '贷款形式', field: 'loanForm', type: 'input' },
            { placeholder: '产品类型', field: 'prdType', type: 'input' },
            { placeholder: '法人机构名称', field: 'legalOrgName', type: 'input' },
            { placeholder: '账号状态', field: 'accountStatus', type: 'input' },
            { placeholder: '账务机构名称', field: 'finaBrName', type: 'input' }
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
            { label: '合同编号', prop: 'contNo', sortable: true, resizable: true },
            { label: '客户编号', prop: 'cusId', sortable: true, resizable: true },
            { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
            { label: '产品id', prop: 'prdId', sortable: true, resizable: true },
            { label: '产品号', prop: 'prdCode', sortable: true, resizable: true },
            { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
            { label: '贷款起始日', prop: 'loanStartDate', sortable: true, resizable: true },
            { label: '贷款终止日', prop: 'loanEndDate', sortable: true, resizable: true },
            { label: '贷款账号', prop: 'loanAccount', sortable: true, resizable: true },
            { label: '主管机构', prop: 'mainBrId', sortable: true, resizable: true },
            { label: '业务品种', prop: 'bizType', sortable: true, resizable: true },
            { label: '业务品种细分', prop: 'bizTypeSub', sortable: true, resizable: true },
            { label: '借据金额', prop: 'loanAmount', sortable: true, resizable: true },
            { label: '借据余额', prop: 'loanBalance', sortable: true, resizable: true },
            { label: '贷款利率', prop: 'realityIrY', sortable: true, resizable: true },
            { label: '欠息累计', prop: 'delayIntCumu', sortable: true, resizable: true },
            { label: '表内欠息', prop: 'innerIntCumu', sortable: true, resizable: true },
            { label: '表外欠息', prop: 'offIntCumu', sortable: true, resizable: true },
            { label: '正常贷款余额(元)', prop: 'normalBalance', sortable: true, resizable: true },
            { label: '逾期贷款余额(元)', prop: 'overdueBalance', sortable: true, resizable: true },
            { label: '呆滞贷款余额(元)', prop: 'sluggishBalance', sortable: true, resizable: true },
            { label: '呆账贷款余额(元)', prop: 'doubtfulBalance', sortable: true, resizable: true },
            { label: '七级分类结果', prop: 'sevenResult', sortable: true, resizable: true },
            { label: '账务机构', prop: 'finaBrId', sortable: true, resizable: true },
            { label: '表内应收', prop: 'innerReceInt', sortable: true, resizable: true },
            { label: '逾期应收', prop: 'overdueReceInt', sortable: true, resizable: true },
            { label: '表外利息', prop: 'offInt', sortable: true, resizable: true },
            { label: '利息复息', prop: 'compoundInt', sortable: true, resizable: true },
            { label: '表内转表外利息', prop: 'innerOffInt', sortable: true, resizable: true },
            { label: '实收利息', prop: 'collectionInterest', sortable: true, resizable: true },
            { label: '是否存在当前逾期', prop: 'extOverdue', sortable: true, resizable: true },
            { label: '最近一次逾期金额', prop: 'overdueBlnAmt', sortable: true, resizable: true },
            { label: '最近一次逾期时间', prop: 'overdueDate', sortable: true, resizable: true },
            { label: '创建人', prop: 'createUser', sortable: true, resizable: true },
            { label: '创建时间', prop: 'createTime', sortable: true, resizable: true },
            { label: '最后更新人', prop: 'lastUpdateUser', sortable: true, resizable: true },
            { label: '最后更新时间', prop: 'lastUpdateTime', sortable: true, resizable: true },
            { label: '法人机构代码', prop: 'legalOrgCode', sortable: true, resizable: true },
            { label: '客户经理', prop: 'cusManager', sortable: true, resizable: true },
            { label: '五级分类', prop: 'cla', sortable: true, resizable: true },
            { label: '五级分类日期', prop: 'claDate', sortable: true, resizable: true },
            { label: '借据编号', prop: 'billNo', sortable: true, resizable: true },
            { label: '担保方式', prop: 'assureMeansMain', sortable: true, resizable: true },
            { label: '四级分类标志', prop: 'loanForm4', sortable: true, resizable: true },
            { label: '违约标志', prop: 'defaultFlag', sortable: true, resizable: true },
            { label: '贷款形式', prop: 'loanForm', sortable: true, resizable: true },
            { label: '产品类型', prop: 'prdType', sortable: true, resizable: true },
            { label: '法人机构名称', prop: 'legalOrgName', sortable: true, resizable: true },
            { label: '账号状态', prop: 'accountStatus', sortable: true, resizable: true },
            { label: '账务机构名称', prop: 'finaBrName', sortable: true, resizable: true }
            ],
            updateFields: [{
              columnCount: 3,
              fields: [
                	 { field: 'bizSerno', label: '任务编号'},
                	 { field: 'contNo', label: '合同编号'},
                	 { field: 'cusId', label: '客户编号'},
                	 { field: 'cusName', label: '客户名称'},
                	 { field: 'prdId', label: '产品id'},
                	 { field: 'prdCode', label: '产品号'},
                	 { field: 'prdName', label: '产品名称'},
                	 { field: 'loanStartDate', label: '贷款起始日'},
                	 { field: 'loanEndDate', label: '贷款终止日'},
                	 { field: 'loanAccount', label: '贷款账号'},
                	 { field: 'mainBrId', label: '主管机构'},
                	 { field: 'bizType', label: '业务品种'},
                	 { field: 'bizTypeSub', label: '业务品种细分'},
                	 { field: 'loanAmount', label: '借据金额',type:'num',digit:2,formatter:yufp.util.moneyFormatter},
                	 { field: 'loanBalance', label: '借据余额',type:'num',digit:2,formatter:yufp.util.moneyFormatter},
                	 { field: 'realityIrY', label: '贷款利率'},
                	 { field: 'delayIntCumu', label: '欠息累计'},
                	 { field: 'innerIntCumu', label: '表内欠息'},
                	 { field: 'offIntCumu', label: '表外欠息'},
                	 { field: 'normalBalance', label: '正常贷款余额(元)'},
                	 { field: 'overdueBalance', label: '逾期贷款余额(元)'},
                	 { field: 'sluggishBalance', label: '呆滞贷款余额(元)'},
                	 { field: 'doubtfulBalance', label: '呆账贷款余额(元)'},
                	 { field: 'sevenResult', label: '七级分类结果'},
                	 { field: 'finaBrId', label: '账务机构'},
                	 { field: 'innerReceInt', label: '表内应收'},
                	 { field: 'overdueReceInt', label: '逾期应收'},
                	 { field: 'offInt', label: '表外利息'},
                	 { field: 'compoundInt', label: '利息复息'},
                	 { field: 'innerOffInt', label: '表内转表外利息'},
                	 { field: 'collectionInterest', label: '实收利息'},
                	 { field: 'extOverdue', label: '是否存在当前逾期'},
                	 { field: 'overdueBlnAmt', label: '最近一次逾期金额'},
                	 { field: 'overdueDate', label: '最近一次逾期时间'},
                	 { field: 'createUser', label: '创建人'},
                	 { field: 'createTime', label: '创建时间'},
                	 { field: 'lastUpdateUser', label: '最后更新人'},
                	 { field: 'lastUpdateTime', label: '最后更新时间'},
                	 { field: 'legalOrgCode', label: '法人机构代码'},
                	 { field: 'cusManager', label: '客户经理'},
                	 { field: 'cla', label: '五级分类'},
                	 { field: 'claDate', label: '五级分类日期'},
                	 { field: 'billNo', label: '借据编号'},
                	 { field: 'assureMeansMain', label: '担保方式'},
                	 { field: 'loanForm4', label: '四级分类标志'},
                	 { field: 'defaultFlag', label: '违约标志'},
                	 { field: 'loanForm', label: '贷款形式'},
                	 { field: 'prdType', label: '产品类型'},
                	 { field: 'legalOrgName', label: '法人机构名称'},
                	 { field: 'accountStatus', label: '账号状态'},
                	 { field: 'finaBrName', label: '账务机构名称'}
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
                    url:backend.pspService+ '/api/psp/bill/list',
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
              url: backend.pspService+'/api/psp/bill/list',
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
