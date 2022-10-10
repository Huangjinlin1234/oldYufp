/**
 * @create by chenqm1 on 2018-05-04
 * @description 预授信名单信息临时表
 */
define(function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,STD_ZB_APPR_STATUS,STD_ZB_IR_FLOAT_TYPE,STD_ZB_CHOOSE_RESULT,STD_ZB_PRELMT_TMPSTS,STD_ZB_CREDIT_GRADE,STD_ZB_CUS_LEVEL,STD_ZB_EFR_CHNG_IND');
        yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
            temdataUrl: backend.creditService + '/api/lmt/prelist/tmps',
            baseParams: {
            },
            queryReset: true,
            tableFilters: {
                ratePctFilter: function (value) {
                    if (!value){
                        return '';
                    } else{
                        return yufp.util.toPercent((parseFloat(value,4) * 100).toFixed(7));
                    }
                }
              },
            queryFields: [
              { placeholder: '批次号', field: 'batchSerno', type: 'input' },
              { placeholder: '客户号', field: 'cusId', type: 'input' },
              { placeholder: '客户名称', field: 'cusName', type: 'input' },
              { placeholder: '证件号码', field: 'certCode', type: 'input' },
              { placeholder: '筛选结果', field: 'chooseResult', type: 'select', dataCode: 'STD_ZB_CHOOSE_RESULT' },
              { placeholder: '状态', field: 'status' , dataCode: 'STD_ZB_PRELMT_TMPSTS', type: 'select'},
              { placeholder: '产品名称', field: 'prdName', type: 'input' },
              { placeholder: '导入日期', field: 'importDateRange', type: 'daterange' ,value:[]}
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
                { label: '预授信流水号', prop: 'preSerno', sortable: false, resizable: true, width: '240px', hidden: true  },
                { label: '批次号', prop: 'batchSerno', sortable: false, resizable: true, width: '160px' },
                { label: '客户号', prop: 'cusId', sortable: false, resizable: true, width: '160px' },
                { label: '客户名称', prop: 'cusName', sortable: false, resizable: true },
                { label: '证件类型', prop: 'certType', sortable: false, resizable: true, dataCode: 'STD_ZB_CERT_TYP', hidden: true  },
                { label: '证件号码', prop: 'certCode', sortable: false, resizable: true, width: '240px'},
                { label: '手机号码', prop: 'mobile', sortable: false, resizable: true, width: '120px'},
                { label: '产品代码', prop: 'prdCode', sortable: false, resizable: true, hidden: true},
                { label: '产品名称', prop: 'prdName', sortable: false, resizable: true },
                // { label: '额度类型', prop: 'lmtType', sortable: false, resizable: true, dataCode: 'STD_ZB_PRELMT_TYPE', hidden: true },
                { label: '短信营销额度(元)', prop: 'msgMarketingLmt', sortable: false, resizable: true, width: '120px', formatter: function(row, column, cellValue) {
                        return yufp.util.moneyFormatter(cellValue, 2);
                    } },
                { label: '授信额度(元)', prop: 'lmtAmt', sortable: false, resizable: true , width: '120px',formatter: function(row, column, cellValue) {
                        return yufp.util.moneyFormatter(cellValue, 2);
                    } },
                { label: '最高授信额度(元)', prop: 'maxCreditLimit', sortable: false, resizable: true , hidden: true,formatter: function(row, column, cellValue) {
                        return yufp.util.moneyFormatter(cellValue, 2);
                    } },
                { label: '期限(月)', prop: 'term', sortable: false, resizable: true },
                { label: '利率模式', prop: 'irMode', sortable: false, resizable: true, dataCode: 'STD_ZB_EFR_CHNG_IND' , hidden: false },
                { label: '固定利率(年)', prop: 'fixedRate', sortable: false, resizable: true , template: function () {
                        return '<template scope="scope"> {{ scope.row.fixedRate | ratePctFilter }} </template>';
                    }},
                { label: '利率浮动方式', prop: 'irFloatType', sortable: false, resizable: true, dataCode: 'STD_ZB_IR_FLOAT_TYPE' },
                { label: '利率浮动比例', prop: 'irFloatPct', sortable: false, resizable: true, template: function () {
                        return '<template scope="scope"> {{ scope.row.irFloatPct | ratePctFilter }} </template>';
                    } },
                { label: '利率调整方式', prop: 'irAdjustMode', sortable: false, resizable: true, dataCode: 'STD_ZB_IREXE_TYPE', hidden: true  },
                { label: '客户风险系数', prop: 'cusRpn', sortable: false, resizable: true, hidden: true },
                { label: '信用等级', prop: 'creditLevel', sortable: false, resizable: true, hidden: true, dataCode: 'STD_ZB_CREDIT_GRADE' },
                { label: '客户级别', prop: 'cusLevel', sortable: false, resizable: true, hidden: true, dataCode: 'STD_ZB_CUS_LEVEL' },
                { label: '激活有效期（天）', prop: 'actValidDays', sortable: false, resizable: true },
                { label: '是否农户', prop: 'agriFlg', sortable: false, resizable: true, dataCode: 'STD_ZX_YES_NO', hidden: true  },
                { label: '是否有工作单位', prop: 'hasWorkPlace', sortable: false, resizable: true, type: 'select',dataCode: 'STD_ZX_YES_NO', hidden: true  },
                { label: '工作单位名称', prop: 'workPlace', sortable: false, resizable: true, width: '240px', hidden: true},
                { label: '状态', prop: 'status', sortable: false, resizable: true, dataCode: 'STD_ZB_PRELMT_TMPSTS'},
                { label: '客户经理号', prop: 'cusManager', sortable: false, resizable: true },
                { label: '导入日期', prop: 'importDate', sortable: false, resizable: true , width: '120px',},
                { label: '推荐人手机号码', prop: 'referrerMobile', sortable: false, resizable: true , hidden: true},
                { label: '回访电话号码', prop: 'callBackTelnum', sortable: false, resizable: true , hidden: true},
                { label: '主管机构代码', prop: 'mainBrId', sortable: false, resizable: true , hidden: true},
                { label: '出账机构代码', prop: 'chargeoffBrId', sortable: false, resizable: true , hidden: true},
                { label: '法人机构代码', prop: 'legalOrgCode', sortable: false, resizable: true , hidden: true},
                { label: '法人机构名称', prop: 'legalOrgName', sortable: false, resizable: true , hidden: true},
                { label: '法人机构简称', prop: 'legalOrgSimpleName', sortable: false, resizable: true , hidden: true},
                { label: '筛选结果', prop: 'chooseResult', sortable: false, resizable: true, dataCode: 'STD_ZB_CHOOSE_RESULT'},
                { label: '备注', prop: 'remarks', sortable: false, resizable: true , hidden: true},
                { label: '创建时间', prop: 'createTime', sortable: false, resizable: true, hidden: true },
                { label: '最后更新人', prop: 'lastUpdateUser', sortable: false, resizable: true, hidden: true },
                { label: '最后修改时间', prop: 'lastUpdateTime', sortable: false, resizable: true, hidden: true }
            ],
            updateFields: [{
                columnCount: 4,
                fields: [
                    { label: '预授信流水号', field: 'preSerno' },
                    { label: '批次号', field: 'batchSerno'},
                    { label: '客户号', field: 'cusId' },
                    { label: '客户名称', field: 'cusName' },
                    { label: '证件类型', field: 'certType', dataCode: 'STD_ZB_CERT_TYP', type: 'select'  },
                    { label: '证件号码', field: 'certCode'},
                    { label: '证件到期日', field: 'certExpireDate'},
                    { label: '手机号码', field: 'mobile'},
                    { label: '产品代码', field: 'prdCode'},
                    { label: '产品名称', field: 'prdName' },
                    // { label: '额度类型', field: 'lmtType', dataCode: 'STD_ZB_PRELMT_TYPE', type: 'select' },
                    { label: '短信营销额度(元)', field: 'msgMarketingLmt' , type:'num',formatter: function(cellValue) {
                            if (typeof(cellValue) == 'undefined'  || cellValue == null || isNaN(cellValue) )
                                return;
                            return yufp.util.moneyFormatter(cellValue, 2);
                        } },
                    { label: '授信额度(元)', field: 'lmtAmt' , type:'num',formatter: function(cellValue) {
                            if (typeof(cellValue) == 'undefined'  || cellValue == null || isNaN(cellValue) )
                                return;
                            return yufp.util.moneyFormatter(cellValue, 2);
                        } },
                    { label: '最高授信额度(元)', field: 'maxCreditLimit' , type:'num',formatter: function(cellValue) {
                            if (typeof(cellValue) == 'undefined'  || cellValue == null || isNaN(cellValue) )
                                return;
                            return yufp.util.moneyFormatter(cellValue, 2);
                        } },
                    { label: '期限(月)', field: 'term' },
                    { label: '利率模式', field: 'irMode', dataCode: 'STD_ZB_EFR_CHNG_IND' , type: 'select' },
                    { label: '固定利率(年)', field: 'fixedRate', type:'num',formatter: function(cellValue) {
                            var num = parseFloat(cellValue);
                            if (typeof(num) == 'undefined'  || num == null || isNaN(num) )
                                num = 0;
                            var rateY = Number(num * 100).toFixed(4) + '%';
                            return rateY;
                        } },
                    { label: '利率浮动方式', field: 'irFloatType', dataCode: 'STD_ZB_IR_FLOAT_TYPE', type: 'select' },
                    { label: '利率浮动比例', field: 'irFloatPct' , type:'num',formatter: function(cellValue) {
                            var num = parseFloat(cellValue);
                            if (typeof(num) == 'undefined'  || num == null || isNaN(num) )
                                num = 0;
                            var rateY = Number(num * 100).toFixed(4) + '%';
                            return rateY;
                        }  },
                    { label: '利率调整方式', field: 'irAdjustMode', dataCode: 'STD_ZB_IREXE_TYPE', type: 'select'  },
                    { label: '客户风险系数', field: 'cusRpn' },
                    { label: '信用等级', field: 'creditLevel',dataCode: 'STD_ZB_CREDIT_GRADE', type: 'select' },
                    { label: '客户级别', field: 'cusLevel',dataCode: 'STD_ZB_CUS_LEVEL', type: 'select' },
                    { label: '激活有效期（天）', field: 'actValidDays' },
                    { label: '是否农户', field: 'agriFlg', dataCode: 'STD_ZX_YES_NO' , type: 'select' },
                    { label: '是否有工作单位', field: 'hasWorkPlace', type: 'select',dataCode: 'STD_ZX_YES_NO', type: 'select'  },
                    { label: '工作单位名称', field: 'workPlace'},
                    { label: '状态', field: 'status', dataCode: 'STD_ZB_PRELMT_TMPSTS', type: 'select'},
                    { label: '客户经理号', field: 'cusManager' },
                    { label: '推荐人手机号码', field: 'referrerMobile'},
                    { label: '回访电话号码', field: 'callBackTelnum'},
                    { label: '主管机构代码', field: 'mainBrId' },
                    { label: '出账机构代码', field: 'chargeoffBrId' },
                    { label: '法人机构代码', field: 'legalOrgCode' },
                    { label: '法人机构名称', field: 'legalOrgName' },
                    { label: '法人机构简称', field: 'legalOrgSimpleName' },
                    { label: '筛选结果', field: 'chooseResult', dataCode: 'STD_ZB_CHOOSE_RESULT', type: 'select'},
                    { label: '备注', field: 'remarks' },
                    { label: '创建时间', field: 'createTime' },
                    { label: '最后更新人', field: 'lastUpdateUser' },
                    { label: '最后修改时间', field: 'lastUpdateTime' }
                ]
            }],
            updateButtons: [
              { label: '关闭', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
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
                    url: '/api/lmt/prelist/tmp',
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
              arr.push(selections[i].preSerno);
            }
            
            yufp.service.request({
              method: 'DELETE',
              url: '/api/lmt/prelist/tmp',
              data: {
              	preSerno: arr.join(',')
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
          },
            invalidFn: function () {
                var _self = this;
                var selections = _self.$refs.reftable.selections;
                if (selections.length < 1) {
                    _self.$message({ message: '请先选择一条记录', type: 'warning' });
                    return;
                }
                var len = selections.length, arr = [];
                var hasNotValid = false;
                for (var i = 0; i < len; i++) {
                    if (selections[i].status != '1')
                        hasNotValid = true;
                    arr.push(selections[i]);
                }
                if (hasNotValid == true){
                    _self.$message('有数据状态不符合失效要求');
                    return;
                }
                _self.$confirm('是否失效?', '提示', {type: 'warning'}).then(function () {
                    yufp.service.request({
                    method: 'POST',
                    url: backend.creditService + '/api/lmt/prelist/tmp/invalid',
                    data: JSON.stringify(selections),
                    callback: function (code, message, response) {
                        if (code == 0) {
                            var result = response.data;
                            if (result == null)
                                _self.$message('操作失败');
                            else {
                                if (result.length == 0) {
                                    _self.$message('操作成功');
                                    _self.$refs.reftable.remoteData();
                                }
                                else {
                                    var str = '';
                                    for (var i = 0; i < result.length; i++) {
                                        str += result[i].batchSerno+'    '
                                    }
                                    _self.$message({message:str + '的状态不符合失效要求', type: 'warning'});
                                }
                            }
                        }
                        else
                            _self.$message('操作失败');
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
