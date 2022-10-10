/**
 * @create by ligm on 2019-08-10
 * @description 委外机构信息表
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
        	reftableDataUrl: backend.riskmService + '/api/outs/coopr/org/infos',
            baseParams: {
            	cooprOrgType: '001'
            },
            queryFields: [
                { placeholder: '委外机构编号', field: 'cooprOrgNo', type: 'input' },
                { placeholder: '委外机构名称', field: 'cooprOrgName', type: 'input' },
                { placeholder: '合作状态', field: 'cooprStatus', type: 'select', dataCode:'COOPR_STS' }
            ],

            queryButtons: [
              { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                  if (valid) {
                    _self.$refs.reftable.remoteData(model);
                  }
                } },
              { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2'}
                
            ],
  
            tableColumns: [
                { label: '委外机构编号', prop: 'cooprOrgNo', sortable: true, resizable: true},
                { label: '委外机构名称', prop: 'cooprOrgName', sortable: true, resizable: true},
                { label: '公司地址', prop: 'compAddr', sortable: true, resizable: true },
                { label: '联系人姓名', prop: 'linkName', sortable: true, resizable: true },
                { label: '联系人手机号', prop: 'linkPhone', sortable: true, resizable: true },
                { label: '开始合作日期', prop: 'startCooprDt', sortable: true, resizable: true },
                { label: '终止合作日期', prop: 'terminateCooprDt', sortable: true, resizable: true },
                { label: '合作状态', prop: 'cooprStatus', sortable: true, resizable: true, dataCode:'COOPR_STS'},
                { label: '最后更新人', prop: 'lastUpdateUser', sortable: true, resizable: true },
                { label: '最后更新时间', prop: 'lastUpdateTime', sortable: true, resizable: true,
                    formatter: function (row, column, cellValue) {
                        if(cellValue != null && cellValue != '')
                            return cellValue.slice(0, 19);
                    } }
            ],

            updateFields: [{
              columnCount: 2,
              fields: [
                	 { field: 'cooprOrgNo', label: '委外机构编号',disabled:true, placeholder: '系统自动生成', rules: [{ required: true, message: '必输项', trigger: 'blur' }]},
                	 { field: 'cooprOrgName', label: '委外机构名称', rules: [{required: true, message: '必填项', trigger: 'blur'}]},
              ]},{
                columnCount: 1,
                fields: [
                    { field: 'compAddr', label: '公司地址', type:'textarea', rows: 2, rules: [{ required: true, message: '必输项', trigger: 'blur' }]},
                ]
            },{
                columnCount: 2,
                fields: [
                     { field: 'cooprStatus', label: '合作状态', type: 'select', dataCode:'COOPR_STS', rules: [{ required: true, message: '必输项', trigger: 'blur' }]},
                     { field: 'linkName', label: '联系人姓名', rules: [{ required: true, message: '必输项', trigger: 'blur' }]},
                	 { field: 'linkPhone', label: '联系人手机号', rules: [{ validator: yufp.validator.mobile, trigger: 'blur'}]},
                	 { field: 'linkTel', label: '联系电话', rules: [{ required: true, message: '必输项', trigger: 'blur' },{max:20,message:'最大长度20'}]},
                	 { field: 'sendEmail', label: '发送邮箱', rules: [{ validator: yufp.validator.email, trigger: 'blur'}]},
                	 { field: 'copyEmail', label: '抄送邮箱', rules: [{ validator: yufp.validator.email, trigger: 'blur'}]},
                     { field: 'primCommRate',label: '一手佣金率(%)',type: 'num',formatter: yufp.util.decimalToPercent,
                         rules: [{required: true, message: '必填项，请输入0到1之间的数！', trigger: 'change', type:'number'},
                             {
                                 validator: function (rule, value, callback) {
                                     if (typeof (value) == 'undefined' || value == null || isNaN(value) || value == '') {
                                         if (String(value).indexOf('%') != -1) {
                                             _self.$refs.reform.formModel.primCommRate = parseFloat(String(value).replace('%','')) / 100;
                                         }
                                         callback();
                                     } else if (value < 0 || value > 1) {
                                         _self.$message({message: '请输入不小于0且不大于1的数！', type: 'warning'});
                                         return;
                                     } else {
                                         callback();
                                     }
                                 }
                             }]
                     },
                	 { field: 'secdCommRate', label: '二手佣金率(%)',type: 'num',formatter: yufp.util.decimalToPercent,
                         rules: [
                             {
                                 validator: function (rule, value, callback) {
                                     if (typeof (value) == 'undefined' || value == null || isNaN(value) || value == '') {
                                         if (String(value).indexOf('%') != -1) {
                                             _self.$refs.reform.formModel.secdCommRate = parseFloat(String(value).replace('%','')) / 100;
                                         } else if (value == '') {
                                             _self.$refs.reform.formModel.secdCommRate = 0;
                                         }
                                         callback();
                                     } else if (value < 0 || value > 1) {
                                         _self.$message({message: '请输入不小于0且不大于1的数！', type: 'warning'});
                                         return;
                                     } else {
                                         callback();
                                     }
                                 }
                             }]
                     },
                	 { field: 'thdCommRate', label: '三手佣金率(%)',type: 'num',formatter: yufp.util.decimalToPercent,
                         rules: [
                             {
                                 validator: function (rule, value, callback) {
                                     if (typeof (value) == 'undefined' || value == null || isNaN(value) || value == '') {
                                         if (String(value).indexOf('%') != -1) {
                                             _self.$refs.reform.formModel.thdCommRate = parseFloat(String(value).replace('%','')) / 100;
                                         } else if (value == '') {
                                             _self.$refs.reform.formModel.thdCommRate = 0;
                                         }
                                         callback();
                                     } else if (value < 0 || value > 1) {
                                         _self.$message({message: '请输入不小于0且不大于1的数！', type: 'warning'});
                                         return;
                                     } else {
                                         callback();
                                     }
                                 }
                             }]
                     },
                	 { field: 'longAgeCommRate', label: '长账龄佣金率(%)',type: 'num',formatter: yufp.util.decimalToPercent,
                         rules: [
                             {
                                 validator: function (rule, value, callback) {
                                     if (typeof (value) == 'undefined' || value == null || isNaN(value) || value == '') {
                                         if (String(value).indexOf('%') != -1) {
                                             _self.$refs.reform.formModel.longAgeCommRate = parseFloat(String(value).replace('%','')) / 100;
                                         } else if (value == '') {
                                             _self.$refs.reform.formModel.longAgeCommRate = 0;
                                         }
                                         callback();
                                     } else if (value < 0 || value > 1) {
                                         _self.$message({message: '请输入不小于0且不大于1的数！', type: 'warning'});
                                         return;
                                     } else {
                                         callback();
                                     }
                                 }
                             }]
                     },
                	 { field: 'startCooprDt', label: '开始合作日期',type:'date', formatter: yufp.util.dateFormatter,editable:false,
                         rules: [{ required: true, message: '必填项', trigger: 'blur',type:'date' },
                             { validator: function(rule, value, callback){
                                     var terminateCooprDt = _self.$refs.reform.formModel.terminateCooprDt;
                                     if(terminateCooprDt!='' && value >= terminateCooprDt){
                                         callback(new Error("开始日期须早于结束日期"));
                                         _self.$refs.reform.formModel.startCooprDt = '';
                                     }else{
                                         callback();
                                     }
                                 }
                             }
                         ]},
                	 { field: 'terminateCooprDt', label: '终止合作日期',type:'date',editable:false,
                         rules: [{ required: true, message: '必填项', trigger: 'blur' ,type:'date'},
                             { validator: function(rule, value, callback){
                                     var startCooprDt = _self.$refs.reform.formModel.startCooprDt;
                                     if (startCooprDt != '' && value <= startCooprDt) {
                                         callback(new Error("结束日期须晚于开始日期"));
                                         _self.$refs.reform.formModel.terminateCooprDt = '';
                                     } else {
                                         callback();
                                     }
                                 }
                             }
                         ]},
                	 { field: 'cooprOrgType', label: '合作机构类型', type: 'select',dataCode:'COOPR_ORG_TYPE',value:'001', hidden:true},
                	 { field: 'inputUserId', label: '录入人',disabled:true, placeholder: '系统默认当前登录人'},
                	 { field: 'inputOrg', label: '录入机构',disabled:true, placeholder: '系统默认当前登录人所属机构'},
                	 { field: 'inputTime', label: '录入时间',disabled:true, placeholder: '系统时间'},

                	 { field: 'lastUpdateUser', label: '最后更新人', hidden:true},
                	 { field: 'lastUpdateOrg', label: '最后更新机构', hidden:true},
                	 { field: 'lastUpdateTime', label: '最后更新时间', hidden:true }
              ]
            }],

            updateButtons: [
              { label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                  var validate = false;
                  _self.$refs.reform.validate(function (valid) {
                      validate = valid;
                  });
                  if (!validate) {
                      return;
                  }

                  var rMethod = '';
                  var opUrl = '';
                  if (_self.viewType == "EDIT") {
                      rMethod = 'PUT';
                      if (String(model.primCommRate).indexOf('%') != -1) model.primCommRate = parseFloat(String(model.primCommRate).replace('%','')) / 100;
                      if (String(model.secdCommRate).indexOf('%') != -1) model.secdCommRate = parseFloat(String(model.secdCommRate).replace('%','')) / 100;
                      if (String(model.thdCommRate).indexOf('%') != -1) model.thdCommRate = parseFloat(String(model.thdCommRate).replace('%','')) / 100;
                      if (String(model.longAgeCommRate).indexOf('%') != -1) model.longAgeCommRate = parseFloat(String(model.longAgeCommRate).replace('%','')) / 100;
                      opUrl = backend.riskmService + '/api/coopr/org/info';
                  } else if (_self.viewType == "ADD") {
                      rMethod = 'POST';
                      opUrl = backend.riskmService + '/api/risk/org/info';
                      model.inputUserId = yufp.session.userId;
                      model.inputOrg = yufp.session.org.orgCode;
                      model.inputTime = yufp.util.dateFormat(new Date().getTime(), '{y}-{m}-{d} {h}:{i}:{s}');
                  }

                  yufp.service.request({
                      method: rMethod,
                      url: opUrl, //backend.riskmService + '/api/coopr/org/info',
                      data: model,
                      callback: function (code, message, response) {
                          if (response.code == 0) {
                              _self.$refs.reftable.remoteData();
                              _self.$message('操作成功');
                              _self.dialogVisible = false;
                          } else if (response.code == -1) {
                              _self.$message({ message: '该机构下存在处理中的案件，不允许修改为终止或者暂停状态！', type: 'warning' });
                          } else if (response.code == -2) {
                              _self.$message({ message: '该机构下存在有效的分按比例，不允许修改为终止或者暂停状态！', type: 'warning' });
                          }  else {
                              _self.$message({ message: '处理失败！', type: 'warning' });
                          }
                      }
                  });
                }
                },
               { label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                   _self.dialogVisible = false;
                 } },
                {
                  label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                      _self.dialogVisible = false
                  }
              }
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
            _self.updateButtons[0].hidden = !editable;
            _self.updateButtons[1].hidden = !editable;
            _self.updateButtons[2].hidden = editable;
            _self.formDisabled = !editable;
            _self.dialogVisible = true;
          },

          addFn: function () {
            var _self = this;
            _self.switchStatus('ADD', true);
            _self.$nextTick(function () {
                // _self.switchParamsStatus();
          	    _self.$refs.reform.resetFn();
                _self.getOutsOrgNo();
            });
          },

          getOutsOrgNo: function() {
                var _self = this;
                yufp.service.request({
                    method: 'GET',
                    url: backend.riskmService + '/api/outs/org/no',
                    data: {
                    },
                    callback: function (code, message, response) {
                        if (response.code == 0) {
                            _self.$refs.reform.formModel.cooprOrgNo = response.rows;
                        } else {
                            _self.$message('获取委外机构编号失败！');
                        }
                    }
                });
            },

          modifyFn: function () {
            if (this.$refs.reftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            this.switchStatus('EDIT', true);
            this.$nextTick(function () {
            	// this.switchParamsStatus();
            	this.$refs.reform.resetFn();
                var obj = this.$refs.reftable.selections[0];
                yufp.extend(this.$refs.reform.formModel, obj,
                    {startCooprDt:new Date(obj.startCooprDt)},
                    {terminateCooprDt:new Date(obj.terminateCooprDt)}
                    );
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
