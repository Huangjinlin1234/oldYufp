/**
 * Created by yumeng on 2017/11/26.
 */
define([
  './custom/widgets/js/YufpDemoSelector.js',
  './libs/js-xlsx/xlsx.full.min.js',
  './custom/widgets/js/OrgSelector.js'
], function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CRUD_TYPE,NATIONALITY,PUBLISH_STATUS,COMMON_STATUS,STD_ZX_SEX,USER_STATUS');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _self = this;
        return {
          dataUrl: backend.consoleService + '/api/s/dutys',
          dataUrlView: backend.consoleService + '/api/s/dutys/user',
          baseParams: {
            condition: {
              userId: 'admin'
            },
            nonCondParam1: '1',
            nonCondParam2: '2'
          },

          queryFields: [
            { placeholder: '岗位代码', field: 'dutyCode', type: 'input' },
            { placeholder: '岗位名称', field: 'dutyName', type: 'input' },
            { placeholder: '状态', field: 'status', type: 'select', dataCode: 'COMMON_STATUS' }
          ],

          queryButtons: [
            { label: '查询', op: 'submit', type: 'primary', icon: 'search',
              click: function (model, valid) {
                if (valid) {
                // var param = { condition: JSON.stringify(model) };
                  _self.$refs.reftable.remoteData(model);
                }
              } },
            { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
          ],

          tableColumns: [
        	  { label: '岗位代码', prop: 'dutyCode', sortable: true, resizable: true },
        	  { label: '岗位名称', prop: 'dutyName', sortable: true, resizable: true },
        	  { label: '上级岗位代码', prop: 'dutyParentCode', sortable: true, resizable: true, hidden: true },
        	  { label: '法人机构代码', prop: 'legalOrgCode', sortable: true, resizable: true, hidden: true },
        	  { label: '岗位类型', prop: 'dutyType', sortable: true, resizable: true, hidden: true },
        	  { label: '状态', prop: 'status', type: 'select', dataCode: 'COMMON_STATUS', sortable: true, resizable: true }
          ],

          updateFields: [{
            columnCount: 2,
            fields: [
              { field: 'dutyCode', label: '岗位代码', disabled: true, placeholder: '系统自动生成' },
              { field: 'dutyName',label: '岗位名称',
                rules: [{required: true, message: '必填项', trigger: 'blur'}, {max: 880, message: '最大长度为880个字符串', trigger: 'blur'}]},
              { field: 'orgCode', label: '适用机构', type: 'custom', is: 'div-org-selector', rules: [{ required: true, message: '必输项', trigger: 'blur' }]},
              { field: 'orderId',label: '排序字段',rules: [
                  { validator: yufp.validator.number, message: '排序字段必须为数字值', trigger: 'blur'},{max: 8, message: '最大长度为8个字符串', trigger: 'blur'}], hidden: true },

              /*  { field: 'dutyType', label: '类型',rules:[
               {max:150,message:'最大长度为150字符串',trigger:'blur'}
                ]},
               { field: 'orgId', label: '组织号',rules:[
                  {max:12,message:'最大长度为12个字符串',trigger:'blur'}
              ]},
              { field: 'dutyLevel', label: '岗位层级' ,rules:[
                  {max:1,message:'长度为1个字符串',trigger:'blur'}
              ]},
              { field: 'dutyParentCode', label: '上级岗位号',rules:[
                  {max:24,message:'最大长度为24字符串',trigger:'blur'}
              ]},*/
              { field: 'status', label: '状态', type: 'select', dataCode: 'COMMON_STATUS', value: '1'},
              { field: 'createUser',label: '创建人' },
              { field: 'createTime',label: '创建时间'},
              { field: 'lastUpdateUser',label: '最后修改人'},
              { field: 'lastUpdateTime',label: '最后修改时间' }
            ]
          }, {
            columnCount: 1,
            fields: [
              {
                field: 'memo',label: '备注',type: 'textarea',rows: 3,rules: [{max: 80, message: '最大长度为80'} ]
              }
            ]
          }
          ],

          updateButtons: [
        	  { label: '保存', type: 'primary', icon: 'check', hidden: false,
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
	        		  var msg = '岗位【' + model.dutyName + '】将适用于机构【' + model.orgCode + '】及它的上级机构。保存后立即生效，请确认是否继续！';
					  _self.$confirm(msg, '提示').then(function () {
					  	yufp.service.request({
							  method: rMethod,
							  url: backend.consoleService + '/api/s/duty',
							  data: model,
							  callback: function (code, message, response) {
								  if (code == 0 && response.rows == 1) {
									  _self.$refs.reftable.remoteData();
									  _self.$message('操作成功！');
									  _self.dialogVisible = false;
								  } else if(response.rows == -11){
									  _self.$message('该岗位信息已存在，在适用机构【' + model.orgCode + '】或其上下属机构中！');
								  } else {
									  _self.$message('操作失败！');
								  }
							  }
						  });
					  })
        	  } },
        	  { label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false,
                  click: function (model) {
            		  _self.dialogVisible = false;
            	  } },
        	  { label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false,
              click: function (model) {
        		  _self.dialogVisible = false;
        	  } }
          ],
          
          tableColumnsView: [
            {label: '岗位代码', prop: 'dutyCode', sortable: true, resizable: true },
            {label: '用户代码', prop: 'userCode', sortable: true, resizable: true},
            {label: '用户姓名', prop: 'userName', sortable: true, resizable: true},
            {label: '机构名称', prop: 'orgName', sortable: true, resizable: true},
            {label: '联系电话', prop: 'telPhone', sortable: true, resizable: true},
            {label: '性别', prop: 'sex', sortable: true, resizable: true, dataCode: 'STD_ZX_SEX'},
            {label: '状态', prop: 'status', sortable: true, resizable: true, dataCode: 'USER_STATUS'}
          ],
          height: yufp.frame.size().height - 103,
          dialogVisible: false,
          formDisabled: false,
          dialogVisibleView: false,
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
    		  _self.updateButtons[0].hidden = !editable;
    		  _self.updateButtons[1].hidden = !editable;
    		  _self.updateButtons[2].hidden =  editable;
    		  
    		  this.updateFields[0].fields[0].calcDisabled = viewType != 'ADD';
    		  // this.updateFields[0].fields[0].disabled = viewType != 'ADD';

    		  _self.formDisabled = !editable;
    		  _self.dialogVisible = true;
    	  },

		  switchParamStatus: function () {
    		  var val = this.viewType != 'DETAIL';
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
    			  _self.switchParamStatus();
    			  _self.$refs.reform.resetFn();
    		  });
    	  },

    	  modifyFn: function () {
    		  var _self = this;
    		  if (this.$refs.reftable.selections.length != 1) {
    			  this.$message({ message: '请先选择一条记录', type: 'warning' });
    			  return;
    		  }
    		  this.switchStatus('EDIT', true);
    		  this.$nextTick(function () {
    			  _self.$refs.reform.switch('dutyCode', 'calcDisabled', false);
    			  _self.switchParamStatus();
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
    			  _self.switchParamStatus();
    			  _self.$refs.reform.resetFn();
    			  yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0]);
    		  });
    	  },

    	  viewSuerFn: function () {
    		  var _self = this;
    		  if (this.$refs.reftable.selections.length != 1) {
    			  this.$message({ message: '请先选择一条记录', type: 'warning' });
    			  return;
    		  }
    		  this.dialogVisibleView = true;
    		  this.dialogVisible = false;
    		  var dutyCode = this.$refs.reftable.selections[0].dutyCode;
    		  var params = {
    				  dutyCode: dutyCode
    		  };
    		  this.$nextTick(function () {
    			  _self.$refs.viewReftable.remoteData(params);// 异步传输
    		  });
    	  },
        
          returnView: function () {
 			  this.dialogVisibleView = false;
          },

    	  deleteFn: function () {
    		  var _self = this;
    		  var selections = _self.$refs.reftable.selections;
    		  if (selections.length < 1) {
    			  _self.$message({ message: '请先选择一条记录', type: 'warning' });
    			  return;
    		  }
    		  // var len = selections.length, arr = [];
    		  // for (var i = 0; i < len; i++) {
    			//   arr.push(selections[i].dutyCode);
    		  // }
			  var obj = _self.$refs.reftable.selections[0];
			  _self.$confirm('是否删除岗位【' + obj.dutyName +'】？', '提示', {type: 'warning'}).then(function () {
    			  var dutyCode = obj.dutyCode;
    			  yufp.service.request({
    				  method: 'GET',
    				  url: backend.consoleService + '/api/s/user/duty/listbyduty/' + dutyCode,
    				  data: {
    					  //dutyCode: arr.join(',')
    				  },
    				  callback: function (code, message, response) {
    					  if (code == 0 && response) {
    						  var len = response.rows.length;
    						  if (len > 0) {
								  _self.$message({ message: '岗位【' + obj.dutyName +'】与用户存在关联关系，不允许删除！', type: 'warning' });
    							  /**_self.$confirm('岗位【' + obj.dutyName +'】与用户存在关联关系，是否解除关联关系？', '提示', {type: 'warning'}).then(function () {
    							  	//return;
									yufp.service.request({
			                          method: 'DELETE',
			                          url:backend.consoleService+ '/api/s/duty',
			                          data: {
			                            dutyCode: dutyCode
			                          },
			                          callback: function (code, message, response) {
			                            if (code == 0) {
			                              _self.$refs.reftable.remoteData();
			                              _self.$message('操作成功');
			                            }
			                          }
			                        });
    						    }).catch(function () {
    						    	_self.$message('岗位【' + obj.dutyName +'】与用户存在关联关系，不允许删除！');
    						    });*/
    						  } else {
    							  // 直接删除
    							  yufp.service.request({
    								  method: 'DELETE',
    								  url: backend.consoleService + '/api/s/duty',
    								  data: {
    									  dutyCode: dutyCode
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
    				  } // end of callback
    			  });
    		  });
    	  }
      }
    });
  };
});