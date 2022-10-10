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
    yufp.lookup.reg('CRUD_TYPE,NATIONALITY,PUBLISH_STATUS,QUEUE_RESP_MSG,QUEUE_TASK_STATE,SOLT_STATE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _self = this;
        return {
          dataUrl: backend.creditService + '/api/nls/process/bizs',
          baseParams: {
          },

          queryFields: [
            { placeholder: '申请流水号', field: 'applySeq', type: 'input' },
            { placeholder: '客户编号', field: 'cusId', type: 'input' },
            { placeholder: '产品编号', field: 'prdCode', type: 'custom', is:'div-prd-info-selector' },
            { placeholder: '队列任务状态', field: 'queueTaskState', type: 'select', dataCode: 'QUEUE_TASK_STATE' },
            { placeholder: '创建日期', field: 'createDate', type: 'date', value:new Date().getFullYear() + '-'
					+ (new Date().getMonth()+1 < 10 ? '0' + (new Date().getMonth()+1):new Date().getMonth()+1) + '-'
					+ (new Date().getDate()< 10 ? '0'+new Date().getDate():new Date().getDate())
			}//value: 给时间控件赋值默认值（当天）
          ],

			queryButtons: [
				{
					label: '查询', op: 'submit', type: 'primary', icon: 'search',
					click: function (model, valid) {
						if (valid) {
							if (model.createDate === "" || model.createDate === undefined) {
								_self.$message('创建日期不能为空!');
							} else {
								_self.$refs.reftable.remoteData(model);
							}
						}
					}
				},
				{label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2'}
			],

          tableColumns: [
            { label: '申请流水号', prop: 'applySeq', sortable: true, resizable: true },
            { label: '客户编号', prop: 'cusId', sortable: true, resizable: true },
            { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
            { label: '产品ID', prop: 'prdId', sortable: true, resizable: true, hidden: true },
            { label: '产品编号', prop: 'prdCode', sortable: true, resizable: true },
            { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
            { label: '队列任务状态', prop: 'queueTaskState', sortable: true, resizable: true, dataCode: 'QUEUE_TASK_STATE' },
            { label: '创建人', prop: 'createUser', sortable: true, resizable: true, hidden: true },
            { label: '创建日期', prop: 'createDate', sortable: true, resizable: true }
         
          ],

          updateFields: [{
	            columnCount: 2,
	            fields: [
	              { field: 'applySeq', label: '申请流水号'},
	              { field: 'cusId', label: '客户编号'},
	              { field: 'cusName', label: '客户名称'},
	              { field: 'prdId',label: '产品ID',  rules: [{max: 24, message: '最大长度为24个字符串', trigger: 'blur'}], hidden: true},
	              { field: 'prdCode',label: '产品编号', rules: [{ validator: yufp.validator.number, message: '数字', trigger: 'blur'}]},
	              { field: 'prdName',label: '产品名称',
	                rules: [{max: 24, message: '最大长度为24个字符串', trigger: 'blur'}]},
	              { field: 'soltName1', label: '插槽名称1' },
	              { field: 'soltState1', label: '插槽状态1',type:'select',dataCode:'SOLT_STATE' },
	              { field: 'soltTime1', label: '插槽时间1 ' },
	              { field: 'soltName2', label: '插槽名称2' },
	              { field: 'soltState2', label: '插槽状态2',type:'select',dataCode:'SOLT_STATE' },
	              { field: 'soltTime2', label: '插槽时间2' },
	              { field: 'soltName3', label: '插槽名称3' },
	              { field: 'soltState3', label: '插槽状态3',type:'select',dataCode:'SOLT_STATE' },
	              { field: 'soltTime3', label: '插槽时间3' },
	              { field: 'soltName4', label: '插槽名称4' },
	              { field: 'soltState4', label: '插槽状态4',type:'select',dataCode:'SOLT_STATE' },
	              { field: 'soltTime4', label: '插槽时间4 ' },
	              { field: 'soltName5', label: '插槽名称5' },
	              { field: 'soltState5', label: '插槽状态5',type:'select',dataCode:'SOLT_STATE' },
	              { field: 'soltTime5', label: '插槽时间5' },
	              { field: 'soltName6', label: '插槽名称6' },
	              { field: 'soltState6', label: '插槽状态6',type:'select',dataCode:'SOLT_STATE' },
	              { field: 'soltTime6', label: '插槽时间6' },
	              { field: 'soltName7', label: '插槽名称7' },
	              { field: 'soltState7', label: '插槽状态7',type:'select',dataCode:'SOLT_STATE' },
	              { field: 'soltTime7', label: '插槽时间7 ' },
	              { field: 'soltName8', label: '插槽名称8' },
	              { field: 'soltState8', label: '插槽状态8',type:'select',dataCode:'SOLT_STATE' },
	              { field: 'soltTime8', label: '插槽时间8' },
	              { field: 'soltName9', label: '插槽名称9' },
	              { field: 'soltState9', label: '插槽状态9',type:'select',dataCode:'SOLT_STATE' },
	              { field: 'soltTime9', label: '插槽时间9' },
	              { field: 'soltName10', label: '插槽名称10' },
	              { field: 'soltState10', label: '插槽状态10',type:'select',dataCode:'SOLT_STATE' },
	              { field: 'soltTime10', label: '插槽时间10' },
	              { field: 'soltName11', label: '插槽名称11' },
	              { field: 'soltState11', label: '插槽状态11',type:'select',dataCode:'SOLT_STATE' },
	              { field: 'soltTime11', label: '插槽时间11' },
	              { field: 'soltName12', label: '插槽名称12' },
	              { field: 'soltState12', label: '插槽状态12',type:'select',dataCode:'SOLT_STATE' },
	              { field: 'soltTime12', label: '插槽时间12' },
	              { field: 'soltName13', label: '插槽名称13' },
	              { field: 'soltState13', label: '插槽状态13',type:'select',dataCode:'SOLT_STATE' },
	              { field: 'soltTime13', label: '插槽时间13' },
	              { field: 'soltName14', label: '插槽名称14' },
	              { field: 'soltState14', label: '插槽状态14',type:'select',dataCode:'SOLT_STATE' },
	              { field: 'soltTime14', label: '插槽时间14 ' },
	              { field: 'soltName15', label: '插槽名称15' },
	              { field: 'soltState15', label: '插槽状态15',type:'select',dataCode:'SOLT_STATE' },
	              { field: 'soltTime15', label: '插槽时间15' },
	              { field: 'soltName16', label: '插槽名称16' },
	              { field: 'soltState16', label: '插槽状态16',type:'select',dataCode:'SOLT_STATE' },
	              { field: 'soltTime16', label: '插槽时间16' },
	              { field: 'soltName17', label: '插槽名称17' },
	              { field: 'soltState17', label: '插槽状态17',type:'select',dataCode:'SOLT_STATE' },
	              { field: 'soltTime17', label: '插槽时间17 ' },
	              { field: 'soltName18', label: '插槽名称18' },
	              { field: 'soltState18', label: '插槽状态18',type:'select',dataCode:'SOLT_STATE' },
	              { field: 'soltTime18', label: '插槽时间18' },
	              { field: 'soltName19', label: '插槽名称19' },
	              { field: 'soltState19', label: '插槽状态19',type:'select',dataCode:'SOLT_STATE' },
	              { field: 'soltTime19', label: '插槽时间19' },
	              { field: 'soltName20', label: '插槽名称20' },
	              { field: 'soltState20', label: '插槽状态20',type:'select',dataCode:'SOLT_STATE' },
	              { field: 'soltTime20', label: '插槽时间20' },
	              { field: 'soltName21', label: '插槽名称21' },
	              { field: 'soltState21', label: '插槽状态21',type:'select',dataCode:'SOLT_STATE' },
	              { field: 'soltTime21', label: '插槽时间21 ' },
	              { field: 'soltName22', label: '插槽名称22' },
	              { field: 'soltState22', label: '插槽状态22',type:'select',dataCode:'SOLT_STATE' },
	              { field: 'soltTime22', label: '插槽时间22' },
	              { field: 'soltName23', label: '插槽名称23' },
	              { field: 'soltState23', label: '插槽状态23',type:'select',dataCode:'SOLT_STATE' },
	              { field: 'soltTime23', label: '插槽时间23' },
	              { field: 'soltName24', label: '插槽名称24' },
	              { field: 'soltState24', label: '插槽状态24',type:'select',dataCode:'SOLT_STATE' },
	              { field: 'soltTime24', label: '插槽时间24 ' },
	              { field: 'soltName25', label: '插槽名称25' },
	              { field: 'soltState25', label: '插槽状态25',type:'select',dataCode:'SOLT_STATE' },
	              { field: 'soltTime25', label: '插槽时间25' },
	              { field: 'soltName26', label: '插槽名称26' },
	              { field: 'soltState26', label: '插槽状态26',type:'select',dataCode:'SOLT_STATE' },
	              { field: 'soltTime26', label: '插槽时间26' },
	              { field: 'soltName27', label: '插槽名称27' },
	              { field: 'soltState27', label: '插槽状态27',type:'select',dataCode:'SOLT_STATE' },
	              { field: 'soltTime27', label: '插槽时间27 ' },
	              { field: 'soltName28', label: '插槽名称28' },
	              { field: 'soltState28', label: '插槽状态28',type:'select',dataCode:'SOLT_STATE' },
	              { field: 'soltTime28', label: '插槽时间28' },
	              { field: 'soltName29', label: '插槽名称29' },
	              { field: 'soltState29', label: '插槽状态29',type:'select',dataCode:'SOLT_STATE' },
	              { field: 'soltTime29', label: '插槽时间29' },
	              { field: 'soltName30', label: '插槽名称30' },
	              { field: 'soltState30', label: '插槽状态30',type:'select',dataCode:'SOLT_STATE' },
	              { field: 'soltTime30', label: '插槽时间30' },
	              { field: 'hangTimes', label: '挂起次数' },
	              { field: 'queueTaskState', label: '队列任务状态', type: 'select', dataCode: 'QUEUE_TASK_STATE' },
	              { field: 'createTime', label: '创建时间' },
	              { field: 'lastModifyTime', label: '最近修改时间 ' }
	              
	            ]
          	}
          ],

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
        	  { label: '返回',
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
    		  var obj = _self.$refs.reftable.selections[0];
    		  this.switchStatus('DETAIL', false);
    		  this.$nextTick(function () {
    			  _self.$refs.reform.switch('createTime', 'hidden', false);
    			  _self.$refs.reform.switch('createUser', 'hidden', false);
    			  _self.$refs.reform.switch('lastUpdateUser', 'hidden', false);
    			  _self.$refs.reform.switch('lastUpdateTime', 'hidden', false);

    			  _self.changeState(obj.soltName1,obj.soltName2,obj.soltName3,
			    					obj.soltName4,obj.soltName5,obj.soltName6,								
			    					obj.soltName7,obj.soltName8,obj.soltName9,
			    					obj.soltName10,obj.soltName11,obj.soltName12,
			    					obj.soltName13,obj.soltName14,obj.soltName15,
			    					obj.soltName16,obj.soltName17,obj.soltName18,
			    					obj.soltName19,obj.soltName20,obj.soltName21,
			    					obj.soltName22,obj.soltName23,obj.soltName24,
			    					obj.soltName25,obj.soltName26,obj.soltName27,
			    					obj.soltName28,obj.soltName29,obj.soltName30
    			  					);
    			  yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0]);
    		  });
    	  },
    	  
    	  changeState:function () {
    		  var _self = this;
    		  var i = 1;
			  var arg = Array.prototype.slice.call(arguments);
			  arg.forEach(function(item) {
	    		  var soltName = 'soltName' + i;
	    		  var soltTime = 'soltTime' + i;
	    		  var soltState = 'soltState' + i;
				  if( item == null || item == "" ){
					  _self.$refs.reform.switch(soltName, 'hidden', true);
					  _self.$refs.reform.switch(soltTime, 'hidden', true);
					  _self.$refs.reform.switch(soltState, 'hidden', true);
				  } else {
					  _self.$refs.reform.switch(soltName, 'hidden', false);
					  _self.$refs.reform.switch(soltTime, 'hidden', false);
					  _self.$refs.reform.switch(soltState, 'hidden', false);
				  }
				  i += 1;
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
