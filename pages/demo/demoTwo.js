/**
 * @create by xxx on 2018-xx-xx
 * @description xx
 */
define(['./custom/widgets/js/YufpOrgTree.js'], function(require, exports) {

	// page加载完成后调用ready方法
	exports.ready = function(hashCode, data, cite) {
	   yufp.lookup.reg('CRUD_TYPE, GENDER,EDUCATION_TYPE,IDENT_TYPE');
	   var vm = yufp.custom.vue({
			el : cite.el,
			data : function() {
				var _self = this;
				return {
					tabName : 'first',
					dialogVisible : false,
                    formDisabled : false,
                    viewType : 'DETAIL',
                    viewTitle : yufp.lookup.find('CRUD_TYPE', false),

                    expandCollapseName : ['base'],
					baseParams : {
						condition : {
							userId : 'admin'
						},
						nonCondParam1 : '1',
						nonCondParam2 : '2'
					},
					queryFields : [
						{ placeholder : '姓名', field : 'name', type : 'input' }, 
						{ placeholder : '性别', field : 'gender', type : 'select', dataCode: 'GENDER' }],
					queryButtons : [{
								label : '查询',
								op : 'submit',
								type : 'primary',
								icon : 'search',
								click : function(model, valid) {
									if (valid) {
										var param = {
											condition : JSON.stringify(model)
										};
										_self.$refs.reftable.remoteData(param);
									}
								}
							}, {
								label : '重置',
								op : 'reset',
								type : 'primary',
								icon : 'yx-loop2'
							}],

					tableColumns : [
						{ label : '姓名', prop : 'name', template: function() {
							 return '<template scope="scope">\
                                <a href="#" style="text-decoration:underline;" @click="$emit(\'custom-row-click\', scope)">{{ scope.row.name }}</a>\
                            </template>';
						}},
						{ label : '性别', prop : 'gender', dataCode: 'GENDER', sortable : true, resizable : true }, 
						{ label : '学历', prop : 'education', dataCode: 'EDUCATION_TYPE'},
						{ label : '证件类型', prop : 'cardType', dataCode: 'IDENT_TYPE' },
						{ label : '出生日期', prop : 'barthday'},
						{ label : '证件号码', prop : 'cardNo' },
						{ label : '公司', prop : 'company' },
						{ label : '邮箱', prop : 'email' }
					],
					
					// 未分组表单数据格式
					baseFields : [{
								columnCount : 3,
								fields : [
								    { field : 'id', label : 'ID' },
									{ field : 'name', label : '姓名' , maxlength: 10},
				                    { field: 'orgId', label: '所属机构', type:'custom',is:'yufp-org-tree', param:{needDpt:true, needCheckbox:false}},
								    { field : 'gender', label : '性别', type : 'select', dataCode : 'GENDER', 
								        change: function(fields, value){
								        	if(fields == '01') {
								        		//隐藏
                                                _self.$data.baseFields[0].fields[0].hidden = true;
								        	} else {
								        		_self.$data.baseFields[0].fields[0].hidden = false;
								        	}
								    	}
								    }, 
								    { field : 'education', label : '学历', type : 'select', dataCode : 'EDUCATION_TYPE' },
								    { field : 'cardType', label : '证件类型',  type : 'select', dataCode : 'IDENT_TYPE' }, 
								    { field : 'barthday', label : '出生日期', type : 'date', format: 'yyyy-MM-dd', editable: false}, 
								    { field : 'cardNo', label : '证件号码' }, 
								    { field : 'company', label : '公司' },
								    { field : 'email', label : '邮箱' },
								    { field : 'mount', label : '家庭收入', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter}
								    ]
							}],
					familyFields : [{
						columnCount : 3,
						fields : [{
									field : 'peopleNum',
									label : '成员数',
									rules : [{
												required : true,
												message : '必填项',
												trigger : 'blur'
											}, {
												validator : yufp.validator.number
											}]
								}, {
									field : 'home',
									label : '房屋情况'
								}, {
									field : 'address',
									label : '家庭地址'
								}, {
									field : 'postcode',
									label : '邮政编码'
								}]
					}],
					otherFields : [{
						columnCount : 3,
						fields : [
							{ field : 'obligate1', label : '预留字段1', hidden: true}, 
							{ field : 'obligate2', label : '预留字段2' }, 
							{ field : 'obligate3', label : '预留字段3' },
						    { field : 'obligate4', label : '预留字段4' }, 
						    { field : 'obligate5', label : '预留字段5' }, 
						    { field : 'obligate6', label : '预留字段6' },
                            { field : 'obligate7', label : '预留字段7' }, 
                            { field : 'obligate8', label : '预留字段8' }, 
                            { field : 'obligate9', label : '预留字段9' }, 
                            { field : 'obligate10', label : '预留字段10' }, 
                            { field : 'obligate11', label : '预留字段11' }, 
                            { field : 'obligate12', label : '预留字段12' }, 
                            { field : 'obligate13', label : '预留字段13' }, 
                            { field : 'obligate14', label : '预留字段14' }, 
                            { field : 'obligate15', label : '预留字段15' }, 
                            { field : 'obligate16', label : '预留字段16' },
                            { field : 'obligate17', label : '预留字段17' },
                            { field : 'obligate18', label : '预留字段18' }, 
                            { field : 'obligate19', label : '预留字段19' }, 
                            { field : 'obligate20', label : '预留字段20' }
                          ]
                        }, {
							columnCount : 1,
							fields : [
								{ field : 'desc', label : '备注', type : 'textarea' }
							]
						}],
					obligateFields: [{
					   columnCount : 3,
					   fields: [{ field : 'obligate21', label : '预留字段21' },
                       { field : 'obligate22', label : '预留字段22' },
                       { field : 'obligate23', label : '预留字段23' },
                       { field : 'obligate24', label : '预留字段24' },
                       { field : 'obligate25', label : '预留字段25' },
                       { field : 'obligate26', label : '预留字段26' },
                       { field : 'obligate27', label : '预留字段27' },
                       { field : 'obligate28', label : '预留字段28' },
                       { field : 'obligate29', label : '预留字段29' },
                       { field : 'obligate30', label : '预留字段30' },
                       { field : 'obligate31', label : '预留字段31' },
                       { field : 'obligate32', label : '预留字段32' },
                       { field : 'obligate33', label : '预留字段33' },
                       { field : 'obligate34', label : '预留字段34' },
                       { field : 'obligate35', label : '预留字段35' },
                       { field : 'obligate36', label : '预留字段36' },
                       { field : 'obligate37', label : '预留字段37' },
                       { field : 'obligate38', label : '预留字段38' },
                       { field : 'obligate39', label : '预留字段39' },
                       { field : 'obligate40', label : '预留字段40' },
                       { field : 'obligate41', label : '预留字段41' },
                       { field : 'obligate42', label : '预留字段42' },
                       { field : 'obligate43', label : '预留字段43' },
                       { field : 'obligate44', label : '预留字段44' },
                       { field : 'obligate45', label : '预留字段45' },
                       { field : 'obligate46', label : '预留字段46' },
                       { field : 'obligate47', label : '预留字段47' },
                       { field : 'obligate48', label : '预留字段48' },
                       { field : 'obligate49', label : '预留字段49' },
                       { field : 'obligate50', label : '预留字段50' },
                       { field : 'obligate51', label : '预留字段51' },
                       { field : 'obligate52', label : '预留字段52' },
                       { field : 'obligate53', label : '预留字段53' },
                       { field : 'obligate54', label : '预留字段54' },
                       { field : 'obligate55', label : '预留字段55' },
                       { field : 'obligate56', label : '预留字段56' },
                       { field : 'obligate57', label : '预留字段57' },
                       { field : 'obligate58', label : '预留字段58' },
                       { field : 'obligate59', label : '预留字段59' }]
					}],
					baseRules : {
						name : [
							{ required : true, message : '必填项', trigger : 'blur' },
							{ max : 10, message : '长度不能大于10个字符', trigger : 'blur' }
						],
						gender : [
							{ required : true, message : '必填项', trigger : 'change' }
						],
						education : [
						    { required : true, message : '必填项', trigger : 'change'}
						],
						email : [
							{ type : 'email', message : '请输入正确的邮箱地址', trigger : 'blur' }
						],
						barthday : [
							{ type : 'date', required : true, message : '必填项', trigger : 'change' }
						],
						cardType : [
							{ required : true, message : '必填项', trigger : 'change' }
						]
					}
				}
			},
			methods : {
				customRowClick: function (scope) {
					//alert(1);
					this.switchStatus('EDIT', true);
                    this.$nextTick(function() {
                        var obj = scope.row;
                        var dataObj = {};
                        yufp.extend(dataObj, obj, { barthday: new Date(obj.barthday) });
                        
                        yufp.extend(false, this.$refs.baseRef.formModel, dataObj);
                        yufp.extend(false, this.$refs.familyRef.formModel, dataObj);
                        yufp.extend(false, this.$refs.otherRef.formModel, dataObj);
                        yufp.extend(false, this.$refs.obligateRef.formModel, dataObj);
                        
                        console.log(this.$refs.baseRef.formModel);
                        console.log(this.$refs.familyRef.formModel);
                        console.log(this.$refs.otherRef.formModel);
                        console.log(this.$refs.obligateRef.formModel);
                    });
				},
				//操作权限检查
                checkPermission: function (ctrlCode) {
                  return true;
                },
				/**
				 * @param viewType
				 *            表单类型
				 * @param editable
				 *            可编辑,默认false
				 */
				switchStatus : function(viewType, editable) {
					var _self = this;
					_self.viewType = viewType;
					// _self.updateButtons[0].hidden = !editable;
					// _self.updateButtons[1].hidden = !editable;
					_self.formDisabled = !editable;
					_self.dialogVisible = true;
				},
				addFn : function() {	
					var _self = this;
					_self.switchStatus('ADD', true);
					_self.tabName = "first";//新增时，默认切回第一个tab
					_self.$nextTick(function() {
						_self.resetForm();
						this.$data.baseFields[0].fields[0].hidden = false;
					});
				},
				modifyFn : function() {
					if (this.$refs.reftable.selections.length != 1) {
						this.$message({message : '请先选择一条记录',type : 'warning'});
						return;
					}
					this.switchStatus('EDIT', true);
					this.$nextTick(function() {
						var obj = this.$refs.reftable.selections[0];
						var dataObj = {};			
                        yufp.extend(dataObj, obj, { barthday: new Date(obj.barthday) });
                        
                        yufp.util.copyObj(this.$refs.baseRef.formModel, dataObj);
                        yufp.util.copyObj(this.$refs.familyRef.formModel, dataObj);
                        yufp.util.copyObj(this.$refs.otherRef.formModel, dataObj);
                        yufp.util.copyObj(this.$refs.obligateRef.formModel, dataObj);
					});
				},
				//infoFn : getInfo,
				infoFn: function() {
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({message : '请先选择一条记录',type : 'warning'});
                        return;
                    }
                    this.switchStatus('VIEW', true);
                    this.$nextTick(function() {
                        var obj = this.$refs.reftable.selections[0];
                        var dataObj = {};           
                        yufp.extend(dataObj, obj, { barthday: new Date(obj.barthday) });
                        
                        yufp.util.copyObj(this.$refs.baseRef.formModel, dataObj);
                        yufp.util.copyObj(this.$refs.familyRef.formModel, dataObj);
                        yufp.util.copyObj(this.$refs.otherRef.formModel, dataObj);
                        yufp.util.copyObj(this.$refs.obligateRef.formModel, dataObj);
                    });
                },
				deleteFn : deleteFn,
				exportFn : function() {
					yufp.util.exportExcelByTable({
						fileName : '下载文件',
						importType : 'service', // page当前页 selected
						// 选中的数据 service 后端数据
						ref : this.$refs.reftable,
						url : '/trade/example/list',
						param : {}
					});
				},
				submitForm : submitForm,
				resetForm : function() {
					var _self = this;
					_self.$refs.baseRef.resetFields();
					_self.$refs.familyRef.resetFields();
					_self.$refs.otherRef.resetFields();
					_self.$refs.obligateRef.resetFields();
				},
				genderChange: function(val1, val2) {
					console.log(val1);
					console.log(val2);
				}
			}
		});
	};
	// 消息处理
	exports.onmessage = function(type, message) {

	};
	// page销毁时触发destroy方法
	exports.destroy = function(id, cite) {

	}
});

/**
 * 提交
 */
function submitForm() {
	var _self = this;
	var base = _self.$refs.baseRef, family = _self.$refs.familyRef, other = _self.$refs.otherRef;
	var baseFlag = true;
	var familyFlag = true;
	var otherFlag = true;
	base.validate(function(valid) {
		baseFlag = valid;
	});
	family.validate(function(valid) {
		familyFlag = valid;
	});
	other.validate(function(valid) {
		otherFlag = valid;
	});
	if (baseFlag && familyFlag && otherFlag) {
		var comitData = {};
		yufp.extend(comitData, base.formModel);
		yufp.extend(comitData, family.formModel);
		yufp.extend(comitData, other.formModel);
		//this.$msgbox.alert(comitData, '提示');
		
		console.log(base.formModel);
		console.log(family.formModel);
		console.log(other.formModel);
		
		var method = '';
		if(_self.viewType == "EDIT") {
			method = 'PUT';
		} else {
			method = 'POST'
		}
		
		yufp.service.request({
          method: 'POST',
          url: '/trade/api/demo/save',
          data: comitData,
          callback: function (code, message, response) {
            if (code == 0) {
              _self.$refs.reftable.remoteData();
              _self.$message('操作成功');
              _self.dialogVisible = false;
            }
          }
        });
	}
};

/**
 * 删除
 */
function deleteFn() {
	var _self = this;
	var selections = _self.$refs.reftable.selections;
	if (selections.length < 1) {
		_self.$message({ message : '请先选择一条记录', type : 'warning' });
		return;
	}
	var len = selections.length, arr = [];
	for (var i = 0; i < len; i++) {
		arr.push(selections[i].id);
	}
	yufp.service.request({
		method : 'DELETE',
		url : '/trade/api/demo/delete',
		data : {
			ids : arr.join(',')
		},
		callback : function(code, message, response) {
			console.log(code);
			if (code == 0) {
				_self.$refs.reftable.remoteData();
				_self.$message('操作成功');
			}
		}
	});
};

/**
 * 获取信息
 */
function getInfo() {
	var _self = this;
	if (this.$refs.reftable.selections.length != 1) {
        this.$message({message : '请先选择一条记录',type : 'warning'});
        return;
    }
    
    _self.resetForm();
    
    this.switchStatus('DETAIL', true);
    this.$nextTick(function() {
        var id = this.$refs.reftable.selections[0].id;
        yufp.service.request({
            method : 'GET',
            url : '/trade/api/demo/info',
            data : {
                id : id
            },
            callback : function(code, message, response) {
                if (code == 0) {
                    response.barthday = new Date(response.barthday);
                    
                    yufp.extend(_self.$refs.baseRef.formModel, response);
                    yufp.extend(_self.$refs.familyRef.formModel, response);
                    yufp.extend(_self.$refs.otherRef.formModel, response);
                    yufp.extend(_self.$refs.obligateRef.formModel, response);     
                }
            }
        });
    });	
}