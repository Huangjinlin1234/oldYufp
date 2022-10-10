/**
 * @create by chenqm1 on 2018-05-03
 * @description 系统角色表
 */
define(['./custom/widgets/js/OrgDistribution.js'
], function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CRUD_TYPE,ROLE_TYPE,STD_ZX_SEX,USER_STATUS');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var _self = this;
        return {
          dataUrl: backend.consoleService + '/api/s/rolesBaseOrgs',
          dataUrlView: backend.consoleService + '/api/s/roles/user',
          baseParams: {},
          baseParamsView: {},

          queryFields: [
            { placeholder: '角色代码', field: 'roleCode', type: 'input' },
            { placeholder: '角色名称', field: 'roleName', type: 'input' },
            { placeholder: '角色类型', field: 'roleType', type: 'select', dataCode: 'ROLE_TYPE', hidden: true }
          ],

          queryButtons: [
            { label: '查询',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  _self.$refs.reftable.remoteData(model);
                }
              } },
            { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
          ],

          tableColumns: [
            { label: '角色代码', prop: 'roleCode' },
            { label: '角色名称', prop: 'roleName', sortable: true, resizable: true },
            { label: '法人机构代码', prop: 'legalOrgCode', width: 200, hidden: true},
            { label: '角色类型', prop: 'roleType', dataCode: 'ROLE_TYPE' },
            { label: '创建人', prop: 'createUser', hidden: true},
            { label: '创建时间', prop: 'createTime', type: 'date', hidden: true}
          ],

          //updateLoading: false,
          updateFields: [{
            columnCount: 2,
            fields: [
              { field: 'roleCode', label: '角色码', disabled: true, placeholder: '系统自动生成' },
              { field: 'roleName', label: '角色名称', rules: [ { required: true, message: '角色名称是必填项', trigger: 'blur' }, { max: 60, message: '最大长度为60'}] },
              { field: 'roleType', label: '角色类型', type: 'select', dataCode: 'ROLE_TYPE', disabled: true, value: '001' , hidden: true},
			  { field: 'orgCode', label: '适用机构', type: 'custom', is: 'div-org-distribution', placeholder: '机构代码', rules: [ { required: true, message: '适用机构是必填项', trigger: 'blur' }]},
				/** rules: [{ required: true, message: '必输项', trigger: 'blur' }]}, @date 2019/12/09 禅道bug6972*/
              { field: 'legalOrgCode', label: '法人机构代码', type: 'custom', is: 'div-org-selector', params: {placeholder: '法人机构代码'}, hidden: true},
              { field: 'orderId', label: '排序字段', rules: [ { validator: yufp.validator.number, message: '排序字段必须为数字值'} ] , hidden: true},
              { field: 'createTime', label: '创建日期', hidden: true },
              { field: 'createUser', label: '创建人', hidden: true },
              { field: 'lastUpdateTime', label: '最后修改时间', hidden: true },
              { field: 'lastUpdateUser', label: '最后修改人', hidden: true }
            ]
          }, {
            columnCount: 1,
            fields: [
              { field: 'roleRmk', label: '备注', type: 'textarea', rules: [ { max: 100, message: '最大长度为100'} ] }
            ]
          }],

          updateButtons: [
        	  { label: '保存',type: 'primary', icon: 'check', hidden: false,
        		  click: function (model) {
        			  var validate = false;
        			  _self.$refs.reform.validate(function (valid) {
        				  validate = valid;
        			  });
        			  if (!validate) {
        				  return;
        			  }

        			  var rMethod = '';
        			  if (_self.viewType == 'EDIT') {
        				  rMethod = 'PUT';
        			  } else if (_self.viewType == 'ADD') {
        				  rMethod = 'POST';
        			  }
        			  var msg = '保存后立即生效，请确认是否继续！';
        			  if(model.orgCode == null || model.orgCode == ''){
        			  	 msg = '【' + model.roleName + '】角色默认为全行适用，保存后可点击“设置适用机构”修改适用机构，' + msg;
					  }else{

						  var messOrgCode = model.orgCode;//机构码过程值
						  var tipsOrgCode = "";//最终提示机构
						  if(messOrgCode.indexOf(",")!=-1){
							  var selList = messOrgCode.split(",");
							  for(var j=0;j<selList.length;j++){

								  if(j == selList.length-1){//最后一个元素  不加 ,
									  tipsOrgCode = tipsOrgCode + selList[j];
								  }else{
									  //按一行9个 9的倍数的元素时添加换行
									  tipsOrgCode = tipsOrgCode + selList[j]+ ",";
									  if(j!=0 && (j+1)%9==0){
										  tipsOrgCode = tipsOrgCode+"\n";
									  }
								  }
							  }
						  }else {
							  tipsOrgCode = messOrgCode;
						  }

						  msg = '角色【' + model.roleName + '】将适用于机构【' + tipsOrgCode + '】及它的上级机构。' + msg;
					  }
					  _self.$confirm(msg, '提示').then(function () {
						  //_self.updateLoading = true;
						  yufp.service.request({
							  method: rMethod,
							  url: backend.consoleService + '/api/s/role',
							  data: model,
							  callback: function (code, message, response) {
								  //_self.updateLoading = false;
								  if (code == 0 && response.rows == 1) {
									  _self.$refs.reftable.remoteData();
									  _self.$message('操作成功');
									  _self.dialogVisible = false;
								  } else if(response.rows == -11){
									  _self.$message('该角色名称信息已存在！');
								  }
								  /**else if (response.rows == -11) {
									  _self.$message('该角色信息已存在，在适用机构【' + model.orgCode + '】或其上下属机构中！');
								  } */
								  else {
									  _self.$message('操作失败');
								  }
							  }
						  });
					  });
        		  } },
        		  { label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false,
        			  click: function (model) {
        				  _self.dialogVisible = false;
        			  }
        		  },
        		  { label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false,
        			  click: function (model) {
        				  _self.dialogVisible = false;
        			  }
        		  }
          ],

          tableColumnsView: [
            { label: '角色代码', prop: 'roleCode' },
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
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
			setOrg:[],
			orgData:[],
			orgDialogVisible:false
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


		  // setOrgFn: function() {
    	  // 	  var _self = this;
    	  // 	  _self.orgDialogVisible = true;
			//   if (_self.$refs.reftable.selections.length != 1) {
			// 	  _self.$message({message: '请先选择一条记录', type: 'warning'});
			// 	  return
			//   }
			//   _self.orgData = [];
			//   yufp.service.request({
			// 	  method: 'POST',
			// 	  url: backend.consoleService + '/api/s/orgs',
			// 	  data: {},
			// 	  callback: function (code, message, response) {
			// 		  if (code == 0 && response.code == '0') {
			// 			  for (var i = 0; i < response.rows.length; i++) {
			// 				  _self.orgData.push({
			// 					  key: response.rows[i].orgCode,
			// 					  label: response.rows[i].orgName
			// 				  })
			// 			  }
			// 		  } else {
			// 			  _self.$message('获取待分配机构失败');
			// 		  }
			// 	  }
			//   });
			//   var roleCode = _self.$refs.reftable.selections[0].roleCode;
			//   _self.setOrg = [];
			//   yufp.service.request({
			// 	  method: 'GET',
			// 	  url: backend.consoleService + '/api/sRole/org/' + roleCode + '?timestamp='+ new Date().getTime(),
			// 	  /**
			// 	   * url加时间戳，是为了避免AJAX
			// 	   * GET请求加载的是缓存数据
			// 	   */
			// 	  data: {},
			// 	  callback: function (code, message, response) {
			// 		  if (code == 0 && response.code == '0') {
			// 			  for (var i = 0; i < response.rows.length; i++) {
			// 				  _self.setOrg.push(response.rows[i].orgCode);
			// 			  }
			// 		  } else {
			// 			  this.$message('获取已分配机构失败');
			// 		  }
			// 	  }
			//   });
		  //
		  // },
		  // sendRoleFn: function(){
			//   var _self = this;
			//   var obj = this.$refs.reftable.selections[0];
			//   yufp.service.request({
			// 	  method: 'POST',
			// 	  url: backend.consoleService + '/api/sRole/orgs',
			// 	  data: {
			// 		  roleCode: obj.roleCode,
			// 		  orgcodeList: _self.setOrg
			// 	  },
			// 	  callback: function (code, message, response) {
			// 		  if (code == 0 && response.code == '0') {
			// 			  _self.$message('操作成功');
			// 			  _self.orgDialogVisible = false;
			// 		  } else {
			// 			  _self.$message('操作失败');
			// 		  }
			// 	  }
			//   })
		  // },
		  // cancleSendRoleFn: function(){
			//   var _self = this;
			//   _self.orgDialogVisible = false;
		  // },

    	  addFn: function () {
    		  var _self = this;
    		  _self.switchStatus('ADD', true);
    		  _self.$nextTick(function () {
    			  // this.$refs.reform.formModel.roleType = '001'; // 2019-01-16 现阶段，角色类型设置为“公共”
    			  this.switchParamStatus();
    			  this.$refs.reform.resetFn();
    		  });
    	  },

    	  modifyFn: function () {
    		  if (this.$refs.reftable.selections.length != 1) {
    			  this.$message({ message: '请先选择一条记录', type: 'warning' });
    			  return;
    		  }
    		  this.switchStatus('EDIT', true);
    		  this.$nextTick(function () {
    			  this.switchParamStatus();
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
            this.switchParamStatus();
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
          _self.baseParamsView = {
						 roleCode: _self.$refs.reftable.selections[0].roleCode
        };

    		  this.$nextTick(function () {
            _self.$refs.viewReftable.remoteData(_self.baseParamsView);// 异步传输
    		  });
    	  },

    	  deleteFn: function () {
    		  var _self = this;
    		  var selections = _self.$refs.reftable.selections;
    		  if (selections.length < 1) {
    			  _self.$message({ message: '请先选择一条记录', type: 'warning' });
    			  return;
    		  }
			  var obj = _self.$refs.reftable.selections[0];
			  _self.$confirm('是否删除角色【' + obj.roleName +'】？', '提示', {type: 'warning'}).then(function () {
    			  // var len = selections.length, arr = [];
    			  // for (var i = 0; i < len; i++) {
    				//   arr.push(selections[i].roleCode);
    			  // }
    			  yufp.service.request({
    				  method: 'POST',
    				  url: backend.consoleService + '/api/s/role/bind/user',
    				  data: {
    					  roleCode: obj.roleCode
    				  },
    				  callback: function (code, message, response) {
    					  if (code == 0 && response) {
    						  if (response.rows > 0) {
								  _self.$message({ message: '角色【' + obj.roleName +'】与用户存在关联关系，无法删除！', type: 'warning' });
    							  /**_self.$confirm('角色【' + obj.roleName +'】与用户存在关联关系，是否解除关联关系？', '提示').then(function () {
									  _self.confirmDelteFn(obj.roleCode);
								  }).catch(function () {
									  _self.$message('角色【' + obj.roleName +'】与用户存在关联关系，无法进行删除操作！');
								  });*/
    						  } else {
    							  _self.confirmDelteFn(obj.roleCode);
    						  }
    					  } else {
    						  _self.$message('操作失败');
    					  }
    				  }
    			  });
    		  });
    	  },

    	  confirmDelteFn: function (roleCode) {
    		  var _self = this;
    		  yufp.service.request({
    			  method: 'DELETE',
    			  url: backend.consoleService + '/api/s/role',
    			  data: {
    				  roleCode: roleCode
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

        returnView: function () {
          this.dialogVisibleView = false;
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
      }, // end of method

      mounted: function () {
    	  this.$nextTick(function () {
    		  this.$refs.queryform.fm.roleCode = data.key;
    		  data.children = this;
    	  });
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
