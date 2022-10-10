/**
 * @create by fuzm on 2018-05-08
 * @description 风险分类配置表
 */
define(function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE,COMMON_STATUS,STD_ZX_YES_NO,STD_ZB_ASSURE_MEANS,CUST_LEVEL,STD_ZB_SEVEN_SORT');
     var vm =  yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          var effictiveVali = function ( rule, value, callback ) {
          	 var date = vm.$refs.reform.formModel.expiryDate;
          };
          var expiryVali = function ( ) {
             var date = vm.$refs.reform.formModel.effictiveDate;
          };
          var tenDateVali = function ( rule, value, callback ) {
                 var reg = /^\d{4}\-\d{2}\-\d{2}$/;
                if (value && reg.test(value)) {
                    callback();
                } else if (value && !reg.test(value)) {
                    callback(new Error('请输入YYYY-MM-DD日期格式'));
                } else {
                    callback();
                }
          }; 
          var overdueMinDayValiFn =  function ( rule, value, callback ) {
          	  var temp = _self.$refs.listReform.formModel.overdueMaxDay;
          	  if ( temp == '') {
          	     temp = 0;
          	  }
          	  var overdueMaxDay = new Number(temp);
          	  var overdueMinDay = new Number(value);
              if ( value == '') {
                callback();
              }	else if ( overdueMinDay > overdueMaxDay){
                 callback(new Error(rule.message));
              }else {
                callback();
              }
          }
          var overdueMaxDayValiFn =  function ( rule, value, callback ) {
              var temp = _self.$refs.listReform.formModel.overdueMinDay;
              if ( temp == '') {
                 temp = 0;
              }
              var overdueMinDay = new Number(temp);
              var overdueMaxDay = new Number(value);
               if ( value == '') {
                  callback();
                } else if ( overdueMaxDay < overdueMinDay){
                   callback(new Error(rule.message));
                }else {
                  callback();
                }
          }
          return {
          	dataUrl: backend.consoleService + '/api/risk/classfy/cfgs',
          	listDataUrl: backend.consoleService + '/api/risk/classfy/lists',
            baseParams: {
            },
            queryFields: [
              { placeholder: '风险分类配置编号', field: 'riskCfgNo', type: 'input' },
              { placeholder: '风险分类配置名称', field: 'riskCfgName', type: 'input' },
              { placeholder: '状态', field: 'status', type: 'select', dataCode: 'COMMON_STATUS' },
              { placeholder: '创建人', field: 'createUser', type: 'input' },
              { placeholder: '最后更新人', field: 'lastUpdateUser', type: 'input' },
              { placeholder: '创建时间范围', field: 'createTimeBetween', type: 'daterange' },
              { placeholder: '最后更新时间范围', field: 'lastUpdateTimeBetween', type: 'daterange' },
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
              { label: '风险分类配置编号', prop: 'riskCfgNo', resizable: true },
              { label: '风险分类配置名称', prop: 'riskCfgName', width: '180px', sortable: true, resizable: true },
              { label: '创建人', prop: 'createUser', resizable: true },
              { label: '创建时间', prop: 'createTime', resizable: true },
              { label: '最后更新人', prop: 'lastUpdateUser', resizable: true },
              { label: '最后更新时间', prop: 'lastUpdateTime', resizable: true },
              { label: '风险分类配置描述', prop: 'riskCfgDesc', width: '180px', resizable: true },
              { label: '状态', prop: 'status', resizable: true, dataCode: 'COMMON_STATUS' },
              { label: '生效日期', prop: 'effictiveDate', resizable: true },
              { label: '失效日期', prop: 'expiryDate', resizable: true }
            ],
            updateLoading: false,
            updateFields: [{
              columnCount: 2,
              fields: [
                	 { field: 'riskCfgNo', label: '风险分类配置编号', placeholder: '系统自动生成', disabled: true },
                	 { field: 'riskCfgName', label: '风险分类配置名称', rules: [ {required: true, message: '风险分类配置名称是必须项'}, {max: 60, message: '最大长度为60'} ]},
                	 { field: 'status', label: '状态', type: 'select', dataCode: 'COMMON_STATUS', hidden: true },
                	 { field: 'effictiveDate', label: '生效日期', type: 'date', hidden: true },
                	 { field: 'expiryDate', label: '失效日期', type: 'date', hidden: true  }
              ]
            }, {
              columnCount: 1,
              fields: [
                { field: 'riskCfgDesc', label: '风险分类配置描述', type: 'textarea', rules: [  {max: 500, message: '最大长度为500'} ]}
              ]
            }, {
              columnCount: 2,
              fields: [
                { field: 'createUser', label: '创建人', hidden: true },
                { field: 'createTime', label: '创建日期', hidden: true },
                { field: 'lastUpdateUser', label: '最后更新人', hidden: true },
                { field: 'lastUpdateTime', label: '最后更新时间', hidden: true }
              ]
            }],
            height: yufp.frame.size().height - 103,
            dialogVisible: false,
            formDisabled: false,
            viewType: 'DETAIL',
            viewTitle: yufp.lookup.find('CRUD_TYPE', false),
            expandCollapseName: ['base'],
            listBtnsVisible: true,
            listVisible: false,
            list: {
               tableColumns: [
                  /*{ label: '风险分类配置明细编号', prop: 'riskListNo', resizable: true },*/
                  { label: '逾期最小天数', prop: 'overdueMinDay', resizable: true },
                  { label: '逾期最大天数', prop: 'overdueMaxDay', resizable: true },
                  { label: '是否涉农', prop: 'wheAgr', resizable: true, dataCode: 'STD_ZX_YES_NO' },
                  { label: '担保方式', prop: 'guarWay', resizable: true, dataCode: 'STD_ZB_ASSURE_MEANS' },
                  { label: '客户评级', prop: 'custLevel', resizable: true, dataCode: 'CUST_LEVEL' },
                  { label: '风险分类', prop: 'riskClassfy', resizable: true, dataCode: 'STD_ZB_SEVEN_SORT' }
               ],
               queryFields: [
                /*{ placeholder: '风险分类配置明细编号', field: 'riskListNo', type: 'input' },*/
                { placeholder: '是否涉农', field: 'wheAgr', type: 'select', dataCode: 'STD_ZX_YES_NO'  },
                { placeholder: '担保方式', field: 'guarWay', type: 'select', dataCode: 'STD_ZB_ASSURE_MEANS' },
                { placeholder: '客户评级', field: 'custLevel', type: 'select', dataCode: 'CUST_LEVEL' },
                { placeholder: '风险分类', field: 'riskClassfy', type: 'select', dataCode: 'STD_ZB_SEVEN_SORT' }
                ],
                queryButtons: [
                  { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                      if (valid) {
                      	model.riskCfgNo = _self.$refs.reform.formModel.riskCfgNo;
                        _self.$refs.listTable.remoteData(model);
                      }
                    } },
                  { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
                ],
               dialogVisible: false,
               formDisabled: false,
               updateFields: [{
                  columnCount: 2,
                  fields: [
                       { field: 'riskListNo', label: '风险分类配置明细编号',  placeholder: '系统自动生成', disabled: true, hidden: true },
                       { field: 'riskCfgNo', label: '风险分类配置编号', disabled: true, hidden: true },
                       { field: 'overdueMinDay', label: '逾期最小天数', value: 0, rules: [ {required: true, message: '逾期最小天数是必填项'},
                       	  { validator: yufp.validator.number, message: '逾期最小天数必须为数字值'} ] },
                       { field: 'overdueMaxDay', label: '逾期最大天数', value: 0, rules: [ {required: true, message: '逾期最大天数是必填项'},
                       	  { validator: yufp.validator.number, message: '逾期最大天数必须为数字值'},
                          { validator: overdueMaxDayValiFn, message: '逾期最大天数不能小于逾期最小天数' } ] },
                       { field: 'wheAgr', label: '是否涉农', type: 'select', dataCode: 'STD_ZX_YES_NO', 
                          rules: [ {required: true, message: '是否涉农是必选项'} ] },
                       { field: 'guarWay', label: '担保方式', type: 'select', dataCode: 'STD_ZB_ASSURE_MEANS', 
                          rules: [ {required: true, message: '担保方式是必选项'} ] },
                       { field: 'custLevel', label: '客户评级', type: 'select', dataCode: 'CUST_LEVEL', 
                          rules: [ {required: true, message: '客户评级是必选项'} ] },
                       { field: 'riskClassfy', label: '风险分类', type: 'select', dataCode: 'STD_ZB_SEVEN_SORT',
                          rules: [ {required: true, message: '风险分类是必选项'} ] },
                       { field: 'createTime', label: '创建日期', hidden: true },
                       { field: 'createUser', label: '创建人', hidden: true },
                       { field: 'lastUpdateUser', label: '最后更新人', hidden: true },
                       { field: 'lastUpdateTime', label: '最后更新时间', hidden: true }
                  ]
                }],
                updateButtons: [
                  
                  { label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                      var validate = false;
                      _self.$refs.listReform.validate(function (valid) {
                        validate = valid;
                      });
                      if (!validate) {
                        return;
                      }
                      
                      var rMethod = '';
                      if(_self.list.viewType == "EDIT") {
                        rMethod = 'PUT';
                      } else if(_self.list.viewType == "ADD") {
                        rMethod = 'POST';
                      }
                      
                      yufp.service.request({
                        method: rMethod,
                        url: backend.consoleService + '/api/risk/classfy/list',
                        data: model,
                        callback: function (code, message, response) {
                          if (code == 0) {
                          	if ( response && response.data < 0 ) {
                          	  _self.$message({message: response.message, type: 'warning'});
                          		return ;
                            }
                            if ( _self.list.viewType == "ADD" && 
                              response && response.data && 
                              response.data.total < 0 ) {
                          	  _self.$message({message: response.message, type: 'warning'});
                          		return ;
                          	}
                          	 var  obj = {};
                          	 obj.riskCfgNo = model.riskCfgNo;
                            _self.$refs.listTable.remoteData(obj);
                            _self.$message('操作成功');
                            _self.list.dialogVisible = false;
                          } else {
                            _self.$message('操作失败');
                          }
                        }
                      });
                    } },
                   { label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                      _self.list.dialogVisible = false;
                    } }
                ],
                viewType: 'DETAIL',
                viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                updateLoading: false
            }
          }
        },
        methods: {
        	/**
        	* @param ctrlCode 操作码
        	*/
        	checkPermission: function(ctrlCode) {
        		return !yufp.session.checkCtrl(ctrlCode, cite.menuId);
        	},
        	cancelFn: function() {
        	   this.dialogVisible = false;
        	},
        	submitClassfyCfgFn: function () {
                var _self = this;
                var validate = false;
                _self.$refs.reform.validate(function (valid) {
                  validate = valid;
                });
                if (!validate) {
                  return;
                }
                var model = _self.$refs.reform.formModel;     
                vm.updateLoading = true;
                yufp.service.request({
                  method: 'PUT',
                  url: backend.consoleService + '/api/risk/classfy/cfg/submit',
                  data: model,
                  callback: function (code, message, response) {
                    vm.updateLoading = false;
                    var data = response.data;
                    if (code == 0 && data >= 0) {
                      _self.$refs.reftable.remoteData();
                      _self.$message('操作成功');
                      _self.dialogVisible = false;
                    } else {
                      _self.$message({message: response.message, type: 'warning'});
                    }
                  }
                });
        	},
        	saveClassfyCfgFn: function (){
        		var _self = this;
            var validate = false;
            _self.$refs.reform.validate(function (valid) {
              validate = valid;
            });
            if (!validate) {
              return;
            }
            var model = _self.$refs.reform.formModel;     
            var rMethod = '';
            if(_self.viewType == "EDIT") {
              rMethod = 'PUT';
            } else if(_self.viewType == "ADD") {
              rMethod = 'POST';
            }
            vm.updateLoading = true;
            yufp.service.request({
              method: rMethod,
              url: backend.consoleService + '/api/risk/classfy/cfg',
              data: model,
              callback: function (code, message, response) {
                vm.updateLoading = false;
                if (code == 0) {
                  _self.$refs.reftable.remoteData();
                  
                  //新增成功之后,展示风险分类清单
                  if ( _self.viewType == "ADD" ){
                    var data = response.data;
                    if ( data && data.total < 0 ) {
                      _self.$message({message: response.message, type: 'warning'});
                      return ;
                    }

                    _self.$message('新增成功!');
                    _self.viewType = "EDIT";
                    yufp.extend(_self.$refs.reform.formModel, data);
                    _self.$refs.reform.rebuildFn();
                    _self.$refs.listTable.remoteData(data);
                    _self.listVisible = true;
                  }else {
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
            var _self = this;
            _self.viewType = viewType;
            _self.formDisabled = !editable;
            _self.listVisible = viewType != 'ADD';
            _self.listBtnsVisible = editable;
            _self.dialogVisible = true;
          },
          switchParamStatus: function () {
          	  var val = this.viewType != 'DETAIL'; 
              this.$refs.reform.switch('status', 'hidden', val);
          	  this.$refs.reform.switch('effictiveDate', 'hidden', val);
          	  this.$refs.reform.switch('expiryDate', 'hidden', val);
              this.$refs.reform.switch('createTime', 'hidden', val);
              this.$refs.reform.switch('createUser', 'hidden', val);
              this.$refs.reform.switch('lastUpdateUser', 'hidden', val);
              this.$refs.reform.switch('lastUpdateTime', 'hidden', val);
              this.$refs.reform.rebuildFn();
          },
          addFn: function () {
            var _self = this;
            _self.switchStatus('ADD', true);
            this.$nextTick( function () {
                vm.switchParamStatus();
                this.$refs.reform.resetFn();            
            });
          },
          modifyFn: function () {
            if (this.$refs.reftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            var obj = this.$refs.reftable.selections[0];
            if ( obj.status != '0'  ){
              this.$message({ message: '只能修改待生效状态的信息!', type: 'warning' });
            	return ;
            }
            this.switchStatus('EDIT', true);
            this.$nextTick(function () {
              vm.switchParamStatus();
              var obj = this.$refs.reftable.selections[0];
              yufp.extend(this.$refs.reform.formModel, obj);
              this.$refs.listTable.remoteData(obj);
            });
          },
          infoFn: function () {
            if (this.$refs.reftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            this.switchStatus('DETAIL', false);
            this.$nextTick(function () {
              vm.switchParamStatus();
              var obj = this.$refs.reftable.selections[0];
              yufp.extend(this.$refs.reform.formModel, obj);
              this.$refs.listTable.remoteData(obj);
            });
          },
          deleteFn: function () {
            var _self = this;
            var selections = _self.$refs.reftable.selections;
            if (selections.length < 1) {
              _self.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            var obj = this.$refs.reftable.selections[0];
            if ( obj.status != '0'  ){
              this.$message({ message: '只能删除待生效状态的信息!', type: 'warning' });
              return ;
            }
            var len = selections.length, arr = [];
            for (var i = 0; i < len; i++) {
              arr.push(selections[i].riskCfgNo);
            }
            this.$confirm('是否删除风险分类配置？', '提示')
                  .then(function () {
                  yufp.service.request({
                    method: 'DELETE',
                    url: backend.consoleService + '/api/risk/classfy/cfg',
                    data: {
                      riskCfgNo: arr.join(',')
                    },
                    callback: function (code, message, response) {
                      if (code == 0) {
                      	if ( response && response.data == -2) {
                      		  _self.$message({ message: response.message, type: 'warning' });
                      	}else {
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
          disabledFn: function () {
          	   var _self = this;
               var selections = _self.$refs.reftable.selections;
                if (selections.length < 1) {
                  _self.$message({ message: '请先选择一条记录', type: 'warning' });
                  return;
                }
                var obj = selections[0];
              if ( obj.status != '1') {
                _self.$message({ message: '只有生效状态的才能失效!', type: 'warning' });
              	return ;
              }
              this.$confirm('是否失效风险分类配置？', '提示')
                  .then(function () {
                  yufp.service.request({
                    method: 'PUT',
                    url: backend.consoleService + '/api/risk/classfy/cfg/disabled',
                    data: {
                      riskCfgNo: obj.riskCfgNo
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
              });
          },
          exportFn: function () {
            var data = this.$refs.listTable.data;
            if ( data.length == 0) {
              this.$message({message: '无数据导出!', type: 'warning'});
              return;
            }
            var riskCfgNo = this.$refs.reform.formModel.riskCfgNo;
            document.location.href = backend.consoleService + 
              '/api/risk/classfy/list/download?riskCfgNo=' + riskCfgNo + '&fileName=风险分类配置清单表';
            /*yufp.util.exportExcelByTable({
              fileName: '风险分类配置清单',
              importType: 'service', // page当前页 selected 选中的数据  service 后端数据
              ref: this.$refs.reftable,
              url: backend.consoleService + '/api/risk/classfy/list/download',
              param: {riskCfgNo: riskCfgNo}
            });*/

          },
           /**
          * @param viewType 表单类型
          * @param editable 可编辑,默认false
          */
          listSwitchStatus: function (viewType, editable) {
            var _self = this;
            _self.list.viewType = viewType;
            _self.list.updateButtons[0].hidden = !editable;
            _self.list.formDisabled = !editable;
            _self.list.dialogVisible = true;
          },
           listSwitchParamStatus: function () {
             var val = this.list.viewType != 'DETAIL';
              this.$refs.listReform.switch('createTime', 'hidden', val);
              this.$refs.listReform.switch('createUser', 'hidden', val);
              this.$refs.listReform.switch('lastUpdateUser', 'hidden', val);
              this.$refs.listReform.switch('lastUpdateTime', 'hidden', val);
              this.$refs.listReform.rebuildFn();
          },
          listAddFn: function () {
            var _self = this;
            _self.listSwitchStatus('ADD', true);
            _self.$nextTick(function () {
            	 this.listSwitchParamStatus();
              _self.$refs.listReform.resetFn();
              _self.$refs.listReform.formModel.riskCfgNo = _self.$refs.reform.formModel.riskCfgNo;
            });
          },
          listModifyFn: function () {
            if (this.$refs.listTable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            this.listSwitchStatus('EDIT', true);
            this.$nextTick(function () {
            	this.listSwitchParamStatus();
              var obj = this.$refs.listTable.selections[0];
              yufp.extend(this.$refs.listReform.formModel, obj);
            });
          },
          listInfoFn: function () {
            if (this.$refs.listTable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            this.listSwitchStatus('DETAIL', false);
            this.$nextTick(function () {
            	this.listSwitchParamStatus();
              yufp.extend(this.$refs.listReform.formModel, this.$refs.listTable.selections[0]);
            });
          },
          listDeleteFn: function () {
            var _self = this;
            var selections = _self.$refs.listTable.selections;
            if (selections.length < 1) {
              _self.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            var len = selections.length, arr = [];
            for (var i = 0; i < len; i++) {
              arr.push(selections[i].riskListNo);
            }
             this.$confirm('是否删除风险分类配置清单？', '提示')
                  .then(function () {
                  	yufp.service.request({
                      method: 'DELETE',
                      url: backend.consoleService + '/api/risk/classfy/list',
                      data: {
                        riskListNo: arr.join(',')
                      },
                      callback: function (code, message, response) {
                        if (code == 0) {
                          _self.$refs.listTable.remoteData();
                          _self.$message('操作成功');
                        } else {
                          _self.$message('操作失败');
                        }
                      }
                    });
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
