/**
 * @create by fuzm on 2018-05-03
 * @description 系统角色对应数据资源权限表
 */
define([
     './custom/widgets/js/SRoleDataRulePageInfoSelector.js',
    './libs/js-xlsx/xlsx.full.min.js'
],
function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      var height = yufp.custom.viewSize().height - 40;
      yufp.lookup.reg('CRUD_TYPE,NATIONALITY,PUBLISH_STATUS,COMMON_STATUS,DATA_RULE_TYPE');
      var vm = yufp.custom.vue({
        el: cite.el,
        watch: {
              roleName: function(val){
                this.$refs.roleTree.filter(val);
              }
        },
        
        data: function () {
          var _self = this;
          return {
            dataUrl: backend.consoleService + "/api/s/role/data/rules",
            autoStyle: {
            	height: height + 'px',
            	overflow: 'auto'
            },
            roleName: '',
            role: {
            	roles: [],
            	props: {
            		label: 'roleName',
            		id: 'roleCode'
            	},
            	select: null
            },
            selectRoel: null,
            baseParams: {
            },
            queryFields: [
	            { placeholder: '菜单url', field: 'dataPersId', type: 'input' },
	            { placeholder: '菜单描述', field: 'rescDesc', type: 'input' }
            ],
            
            queryButtons: [
            	{ label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
            		if (valid) {
            			var roleCode = _self.selectRoel.roleCode;
            			model.roleCode = roleCode;
            			_self.$refs.reftable.remoteData(model);
            		}
            	} },
            	{ label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
            ],
  
            tableColumns: [
	            { label: '角色代码', prop: 'roleCode',width:'100px', sortable: true, resizable: true },
	            { label: '菜单url', prop: 'dataPersId',width:'240px', sortable: true, resizable: true },
	            { label: '记录级权限类型', prop: 'permisType', width:'200px',dataCode:'DATA_RULE_TYPE',sortable: true, resizable: true},
	            { label: '菜单描述', prop: 'rescDesc', sortable: true, resizable: true },
	            { label: '创建日期', prop: 'createTime', sortable: true, resizable: true },
	            { label: '创建人', prop: 'createUser', sortable: true, resizable: true },
				// { label: '最后修改人', prop: 'lastUpdateUser', sortable: true, resizable: true },
//				 { label: '最后修改日期', prop: 'lastUpdateTime', width:"120px",sortable: true,resizable: true }
            ],
            
            updateFields: [{
              columnCount: 2,
              fields: [
            	  { field: 'roleCode', label: '角色代码',rules: [{ required: true, message: '必填项', trigger: 'blur' },
            		  {max:24,message:'最大长度为24',trigger:'blur'} ]},
            	  { field: 'dataPersId', label: '菜单url',type: 'custom', is: 'srole-data-rule-selector',rules: [{ required: true, message: '必填项', trigger: 'blur' },
            			  {max:60,message:'最大长度为60',trigger:'blur'}],     
            	          selectFn: function (val, formModel, arguments){
            				  var org = arguments[1];
            				  formModel.rescDesc= org.dataPersDesc;
            	   }},
    			  { field: 'permisType', label: '记录级权限类型',type:'select',dataCode:'DATA_RULE_TYPE',rules:[{required:true,message:'必填项',trigger:'blur'}], 
            		   change:function(fields){
            			if(fields === '04'){
            				_self.$refs.reform.switch('prdCode', 'hidden', false);
            				_self.$refs.reform.rebuildFn();
            			}else{
            				_self.$refs.reform.switch('prdCode', 'hidden', true);
            				_self.$refs.reform.rebuildFn();
            			}
    			       } },
				  { field: 'rescDesc', label: '菜单描述',rules: [ { max: 24, message: '最大长度为100'} ]},
				  { field: 'prdCode', label: '产品种类', type:'checkbox', dataCode:'PRD_VARIETY',rules:[{ required: true, message:'必填项',trigger: 'blur',type:'array'}],hidden:true}, 
				  { field: 'createTime', label: '创建日期', hidden:true, rules: [ { max: 24, message: '最大长度为24'} ]},
				  { field: 'createUser', label: '创建人', hidden:true, rules: [ { max: 24, message: '最大长度为24'} ]},
				  { field: 'lastUpdateUser', label: '最后修改人', hidden:true, rules: [ { max: 24, message: '最大长度为24'} ]},
				  { field: 'lastUpdateTime', label: '最后修改日期', hidden:true, rules: [ { max: 24, message: '最大长度为24'} ]}
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
            	  if(_self.viewType == "EDIT") {
            		  rMethod = 'PUT';
            	  } else if(_self.viewType == "ADD") {
            		  rMethod = 'POST';
            	  }

            	  yufp.service.request({
            		  method: rMethod,
            		  url: backend.consoleService+'/api/s/role/data/rule',
            		  data: model,
            		  callback: function (code, message, response) {
            			  if (code == 0) {
            				  if(response && response.rows ==-2){
            					  _self.dialogVisible = true;
            					  _self.$message({message:response.message,type:'warning'});
            				  }else{
            					  _self.$refs.reftable.remoteData();
            					  _self.$message('操作成功');
            					  _self.dialogVisible = false;
            				  }
            			  } else {
            				  _self.$message('操作失败');
            			  }
            		  }
            	  });
                } },
                { label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                    _self.dialogVisible = false;
                  } },
                { label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                  _self.dialogVisible = false;
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
        	 * @param ctrlCode
        	 *            操作码
        	 */
        	checkPermission: function(ctrlCode) {
        		return !yufp.session.checkCtrl(ctrlCode, cite.menuId);
        	},

        	filterRoleNode: function (value, data) {
        		if (!value) return true;
        		return data.roleName.indexOf(value) !== -1;
        	},
        	
        	nodeClickFn: function (nodeData, node, self) {
        		this.selectRoel = nodeData;
        		vm.$refs.reftable.remoteData(nodeData);
        	},
        	
        	/**
        	 * @param viewType
        	 *            表单类型
        	 * @param editable
        	 *            可编辑,默认false
        	 */
        	switchStatus: function (viewType, editable) {
        		var _self = this;
        		_self.viewType = viewType;
        		_self.updateButtons[0].hidden = !editable;
        		_self.updateButtons[1].hidden = !editable;
        		_self.updateButtons[2].hidden =  editable;

        		// 点击修改按钮时主键不能修改
        		this.updateFields[0].fields[0].calcDisabled = viewType != 'ADD';
        		this.updateFields[0].fields[0].disabled = viewType != 'ADD';
        		this.updateFields[0].fields[1].calcDisabled = viewType != 'ADD';
        		this.updateFields[0].fields[1].disabled = viewType != 'ADD';
        		// 设置增加不显示，查看详情时查看的字段
        		for ( var i = 5; i < 8; i++ ){
        			this.updateFields[0].fields[i]['hidden'] = editable;
        		}  
        		_self.formDisabled = !editable;
        		_self.dialogVisible = true;
        	},
        	
        	chgPrdCodeArr: function(prdCodeStr) {
        		if(null!=prdCodeStr && ""!=prdCodeStr){
    				return prdCodeStr.split(",");
    			}
        		return [];
			},
        	
        	addFn: function () {
        		var _self = this;
        		if ( !this.selectRoel ) {
        			_self.$message({ message: '请先选择一个角色', type: 'warning' });
        			return;
        		}
        		_self.switchStatus('ADD', true);
        		_self.$nextTick(function () {
        			_self.$refs.reform.resetFn();
        			_self.$refs.reform.switch('roleCode','calcDisabled',true);
        			_self.$refs.reform.switch('rescDesc','calcDisabled',true);
        			_self.$refs.reform.formModel.roleCode = _self.selectRoel.roleCode;

        		});
        	},
        	
        	modifyFn: function () {
        		if (this.$refs.reftable.selections.length != 1) {
        			this.$message({ message: '请先选择一条记录', type: 'warning' });
        			return;
        		}
        		this.switchStatus('EDIT', true);
        		this.$nextTick(function () {
        			this.$refs.reform.rebuildFn();
        			var obj = this.$refs.reftable.selections[0];
        			this.$refs.reform.switch('rescDesc','calcDisabled',true);
        			this.$refs.reform.switch('dataPersId','calcDisabled',true);
        			yufp.extend(this.$refs.reform.formModel, obj);
        			this.$refs.reform.formModel.prdCode = this.chgPrdCodeArr(obj.prdCodeStr);
        		});
        	},
        	
        	infoFn: function () {
        		if (this.$refs.reftable.selections.length != 1) {
        			this.$message({ message: '请先选择一条记录', type: 'warning' });
        			return;
        		}
        		this.switchStatus('DETAIL', false);
        		this.$nextTick(function () {
        			var obj = this.$refs.reftable.selections[0];
        			yufp.extend(this.$refs.reform.formModel, obj);
        			this.$refs.reform.formModel.prdCode = this.chgPrdCodeArr(obj.prdCodeStr);
        		});
        	},
        	
        	deleteFn: function () {
        		var _self = this;
        		var selections = _self.$refs.reftable.selections;
        		if (selections.length != 1) {
        			_self.$message({ message: '请先选择一条记录', type: 'warning' });
        			return;
        		}
        		var len = selections.length, arr = [];
        		for (var i = 0; i < len; i++) {
        			arr.push(selections[i].roleCode);
        			arr.push(selections[i].dataPersId);
        		}

        		this.$confirm('点击确定将永久删除该数据，是否确认？','提示',{type:'warning'})
        		.then(function(){
        			yufp.service.request({
        				method: 'DELETE',
        				url: backend.consoleService+'/api/s/role/data/rule',
        				data: {
        					roleCode: selections[0].roleCode,
        					dataPersId: selections[0].dataPersId
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
        	} // end of deleteFn
        },
        mounted: function () {
        	var rolesUrl = backend.consoleService + '/api/s/queryRoleAll';
        	//var rolesUrl = backend.consoleService + '/api/s/queryRolesCtrl';   /** 【2019D0509】【(问题编号)】 @date 2019/12/05 */
        	yufp.service.request({
        		method: 'POST',
        		url: rolesUrl,
        		callback: function (code, message, res) {
        			if (code == 0) {
        				vm.role.roles = res.rows;
        			} else {
        				vm.$message('查询角色信息失败');
        			}
        		}
        	});
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
