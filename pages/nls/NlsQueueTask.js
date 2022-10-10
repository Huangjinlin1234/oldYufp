/**
 * Created by yumeng on 2017/11/26.
 */
define([
  './custom/widgets/js/YufpDemoSelector.js',
  './libs/js-xlsx/xlsx.full.min.js',
  './custom/widgets/js/PrdInfoSelector.js'
], function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CRUD_TYPE,QUEUE_TASK_STATE，QUEUE_RESP_MSG');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _self = this;
        return {
          dataUrl: backend.creditService + '/api/nls/queue/tasks',

          baseParams: {
          },

          queryFields: [
            { placeholder: '申请流水号', field: 'applySeq', type: 'input' },
            { placeholder: '客户编号', field: 'cusId', type: 'input' },
            { placeholder: '客户名称', field: 'cusName', type: 'input'},
            { placeholder: '产品编号', field: 'prdCode', type: 'custom', is:'div-prd-info-selector' },
            { placeholder: '产品名称', field: 'prdName', type: 'input'},
            { placeholder: '队列任务状态', field: 'queueTaskState', type: 'select', dataCode: 'QUEUE_TASK_STATE'}
          ],

          queryButtons: [
            { label: '查询',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                // var param = { condition: JSON.stringify(model) };
                  _self.$refs.reftable.remoteData(model);
                }
              } },
            { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
          ],

          tableColumns: [
            { label: '申请流水号', prop: 'applySeq', sortable: true, resizable: true },
            { label: '客户编号', prop: 'cusId', sortable: true, resizable: true },
            { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
            { label: '产品ID', prop: 'prdId', sortable: true, resizable: true, hidden: true },
            { label: '产品编号', prop: 'prdCode', sortable: true, resizable: true },
            { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
            { label: '队列任务状态', prop: 'queueTaskState', sortable: true, resizable: true, type: 'select', dataCode: 'QUEUE_TASK_STATE'},
            { label: '响应码', prop: 'rspCode', sortable: true, resizable: true, hidden: true },
            { label: '相应信息', prop: 'rspMsg', sortable: true, resizable: true, hidden: true },
            { label: '创建人', prop: 'createUser', sortable: true, resizable: true, hidden: true },
            { label: '创建时间', prop: 'createTime', sortable: true, resizable: true }

          ],

          updateFields: [{
	            columnCount: 2,
	            fields: [
	              { field: 'applySeq',label: '申请流水号',
	                rules: [{required: true, message: '必填项', trigger: 'blur'}]},
	              { field: 'cusId', label: '客户编号'},
	              { field: 'cusName', label: '客户名称' },
	              { field: 'prdId',label: '产品ID',
	                rules: [{max: 24, message: '最大长度为24个字符串', trigger: 'blur'}], hidden: true},
	              { field: 'prdCode', label: '产品编号',
	                rules: [{ validator: yufp.validator.number, message: '数字', trigger: 'blur'}]},
	              { field: 'prdName', label: '产品名称',
	                rules: [ {max: 24, message: '最大长度为24个字符串', trigger: 'blur'} ]},
	              { field: 'queueTaskState', label: '队列任务状态', type: 'select', dataCode: 'QUEUE_TASK_STATE' },
	              { field: 'rspCode', label: '响应代码'},
	              { field: 'rspMsg', label: '响应信息', type: 'select', dataCode: 'QUEUE_RESP_MSG'},
	              { field: 'consumerId', label: '消费标识' },
	              { field: 'createUser', label: '创建人' },
	              { field: 'createTime', label: '创建时间' },
	              { field: 'lastModifyTime', label: '最近修改时间 ' }
	            ]
          	}],

          updateButtons: [
            { label: '保存',
              type: 'primary',
              icon: 'check',
              hidden: false,
              click: function (model) {
                var validate = false;
                _self.$refs.reform.validate(function (valid) {
                  validate = valid;
                }
                );
                if (!validate) {
                  return;
                }

                var rMethod = '';
                if (_self.viewType == 'EDIT') {
                  rMethod = 'PUT';
                } else if (_self.viewType == 'ADD') {
                  rMethod = 'POST';
                }
                yufp.service.request({
                  method: rMethod,
                  url: backend.consoleService + '/api/s/duty',
                  data: model,
                  callback: function (code, message, response) {
                    if (code == 0) {
                      _self.$refs.reftable.remoteData();
                      _self.$message('操作成功');
                      _self.dialogVisible = false;
                    }
                  }
                });
              } },
            { label: '取消',
              type: 'primary',
              icon: 'yx-undo2',
              hidden: false,
              click: function (model) {
                _self.dialogVisible = false;
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
    		  _self.updateButtons[0].hidden = !editable;
    		  this.updateFields[0].fields[0].calcDisabled = viewType != 'ADD';
    		  this.updateFields[0].fields[0].disabled = viewType != 'ADD';


    		  _self.formDisabled = !editable;
    		  _self.dialogVisible = true;
    	  },

    	  addFn: function () {
    		  var _self = this;
    		  _self.op = 'add';
    		  _self.switchStatus('ADD', true);
    		  _self.$nextTick(function () {
    			  _self.$refs.reform.switch('createTime', 'hidden', true);
    			  _self.$refs.reform.switch('createUser', 'hidden', true);
    			  _self.$refs.reform.switch('lastUpdateUser', 'hidden', true);
    			  _self.$refs.reform.switch('lastUpdateTime', 'hidden', true);
    			  _self.$refs.reform.resetFn();
    		  });
    	  },

    	  modifyFn: function () {
    		  var _self = this;
    		  this.op = 'modify';
    		  if (this.$refs.reftable.selections.length != 1) {
    			  this.$message({ message: '请先选择一条记录', type: 'warning' });
    			  return;
    		  }
    		  this.switchStatus('EDIT', true);
    		  this.$nextTick(function () {
    			  _self.$refs.reform.switch('dutyName', 'calcDisabled', false);
    			  _self.$refs.reform.switch('createTime', 'hidden', true);
    			  _self.$refs.reform.switch('createUser', 'hidden', true);
    			  _self.$refs.reform.switch('lastUpdateUser', 'hidden', true);
    			  _self.$refs.reform.switch('lastUpdateTime', 'hidden', true);
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
    			  _self.$refs.reform.switch('createTime', 'hidden', false);
    			  _self.$refs.reform.switch('createUser', 'hidden', false);
    			  _self.$refs.reform.switch('lastUpdateUser', 'hidden', false);
    			  _self.$refs.reform.switch('lastUpdateTime', 'hidden', false);
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
    			  arr.push(selections[i].dutyCode);
    		  }

    		  this.$confirm('是否删除岗位？', '提示', {type: 'warning'}).
    		  then(function () {
    			  var dutyCode = _self.$refs.reftable.selections[0].dutyCode;
    			  yufp.service.request({
    				  method: 'GET',
    				  url: backend.consoleService + '/api/s/user/duty/listbyduty/' + dutyCode,
    				  data: {
    					  dutyCode: arr.join(',')
    				  },
    				  callback: function (code, message, response) {
    					  if (code == 0 && response) {
    						  var len = response.data.length;
    						  if (len > 0) {
    							  _self.$confirm('岗位与用户存在关联，不能删除！', '提示', {type: 'warning'}).
    							  then(function () {
    								  return;
    								  /*
                      //方法
                     	  yufp.service.request({
                          method: 'DELETE',
                          url:backend.consoleService+ '/api/s/duty',
                          data: {
                            dutyCode: arr.join(',')
                          },
                          callback: function (code, message, response) {
                            if (code == 0) {
                              _self.$refs.reftable.remoteData();
                              _self.$message('操作成功');
                            }
                          }
                        });
    								   */ });
    						  } else {
    							  // 直接删除
    							  yufp.service.request({

    								  method: 'DELETE',
    								  url: backend.consoleService + '/api/s/duty',
    								  data: {
    									  dutyCode: arr.join(',')
    								  },
    								  callback: function (code, message, response) {
    									  if (code == 0) {
    										  _self.$refs.reftable.remoteData();
    										  _self.$message('操作成功');
    									  }
    								  }
    							  });
    						  }
    					  }
    				  }
    			  });
    		  });
    	  } // end of deleteFn

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