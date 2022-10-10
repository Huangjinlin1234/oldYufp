/**
 * @create by chenqm1 on 2018-05-03
 * @description 系统用户表
 */
define([
    './custom/widgets/js/OrgSelector.js'
], function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,USER_STATUS,STD_ZX_SEX,ZB_POS_LEVEL,ZB_DEGREE,STD_YES_NO');
        var vm = yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    reftableDataUrl: backend.consoleService + '/api/s/users',
                    baseParams: {},
                    // orgPlaceholder:'选择法人机构',
                    queryFields: [
                        {placeholder: '用户代码', field: 'userCode', type: 'input'},
                        {placeholder: '用户姓名', field: 'userName', type: 'input'},
                        {placeholder: '性别', field: 'sex', type: 'select', dataCode: 'STD_ZX_SEX' },
                        {placeholder: '状态', field: 'status', type: 'select', dataCode: 'USER_STATUS'},
                        {placeholder: '机构代码', field: 'orgCode', type: 'custom', is: 'div-org-selector'}
                    ],
                    
                    queryButtons: [
                        {
                            label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                                if (valid) {
                                    _self.$refs.reftable.remoteData(model)
                                }
                            }
                        },
                        {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2'}
                    ],

                    tableColumns: [
                        {label: '用户代码', prop: 'userCode',width:'120px', sortable: true, resizable: true},
                        {label: '用户姓名', prop: 'userName',width:'140px', sortable: true, resizable: true},
                        {label: '机构名称', prop: 'orgName', sortable: true, resizable: true},
                        {label: '法人机构名称', prop: 'legalOrgName', sortable: true, resizable: true, hidden: true},
                        {label: '联系电话', prop: 'telPhone', sortable: true, resizable: true},
                        {label: '性别', prop: 'sex',width:'100px', sortable: true, resizable: true, dataCode: 'STD_ZX_SEX'},
                        {label: '状态', prop: 'status',width:'100px', sortable: true, resizable: true, dataCode: 'USER_STATUS'},
                        {label: '是否柜员', prop: 'isTeller',width:'100px', sortable: true, resizable: true, dataCode: 'STD_YES_NO'}
                    ],
                    
                    queryUserFields:[
                    	{placeholder: '用户代码', field: 'userCode', type: 'input',
                        rules: [{required: true, message: '必填项', trigger: 'blur'}]}
                    ],
                    queryUserButtons: [
                        {
                            label: '查询', op: 'submit', type: 'primary', icon: 'search',  click: function (model, valid) {
                            	if (valid) {
                                    var isTel = _self.$refs.reform.formModel.isTeller;
                                    yufp.service.request({
                                        method: "POST",
                                        url: backend.consoleService + '/api/s/isTeller', //+ model.userCode,
                                        data: {
                                            userCode:model.userCode,
                                            isTeller:isTel
                                        },
                                        callback: function (code, message, response) {
                                            if (response.success) {
                                                yufp.extend(_self.$refs.reform.formModel, response.rows);
                                                // if(response.rows.isTeller==="Y"){
                                                // 	_self.$message('柜员用户已存在');
                                                // 	_self.dialogVisible = false;
                                                // } else {
                                                // 	_self.$message('非柜员用户已存在');
                                                // }
//                         					_self.dialogVisible = false;
                                            } else {
//                                        	 _self.$refs.refq1.fieldDatas[0].userCode = "";
                                                _self.$message({ message:response.message, type: 'warning' });
                                            }
                                        }
                                    })
                                }
                            }
                        }
                    ],
                   
                    updateFields: [
                    	{
                            columnCount: 1,
                            fields: [
                            	{ field: 'isTeller', label: '是否柜员',type:'radio',dataCode:'STD_YES_NO',value:'Y',rules: [{required: true, message: '必填项', trigger: 'blur'}],
                            		change:function(fields){
    		  		               		if(fields === "Y"){
        		  		               		_self.$refs.reform.switch('nickName','hidden',true);
        		  		               		_self.$refs.reform.switch('birthday','hidden',true);
        		  		               		_self.$refs.reform.switch('age','hidden',true);
        		  		               		_self.$refs.reform.switch('sex','hidden',true);
        		  		               		_self.$refs.reform.switch('telPhone','hidden',true);
        		  		               		_self.$refs.reform.switch('email','hidden',true);
        		  		               		_self.$refs.reform.switch('staffingLevel','hidden',true);
        		  		               		_self.$refs.reform.switch('sex','hidden',true);
        		  		               		_self.$refs.reform.switch('telPhone','hidden',true);
        		  		               		_self.$refs.reform.switch('eduLevel','hidden',true);
        		  		               		_self.$refs.reform.switch('memo','hidden',true);
        		  		               		_self.$refs.reform.switch('ownBranch','hidden',false);
        		  		               		_self.$refs.reform.switch('isUseFingerprint','hidden',false);
        		  		               		_self.$refs.reform.switch('tellerLevel','hidden',false);
        		  		               		_self.$refs.reform.switch('tellerCategory','hidden',false);
        		  		               		_self.$refs.reform.switch('lastUpdateUser','hidden',true);
        		  		               		_self.$refs.reform.switch('lastUpdateTime','hidden',true);
        		  		               		_self.$refs.reform.switch('createTime','hidden',true);
        		  		               		_self.$refs.reform.switch('createUser','hidden',true);
        		  		               		_self.$refs.reform.switch('status','hidden',false);
                                            _self.$refs.reform.switch('userCode','disabled',true);
                                            _self.$refs.reform.switch('userName','disabled',true);
                                            _self.$refs.reform.switch('idCardNo','disabled',true);
                                            _self.$refs.reform.switch('orgCode','disabled',false);
                                            _self.$refs.reform.switch('status','disabled',true);
                                            _self.$refs.reform.switch('isUseFingerprint','disabled',true);
                                            _self.$refs.reform.switch('tellerLevel','disabled',true);
                                            _self.$refs.reform.switch('tellerCategory','disabled',true);
    		  		               		}else{
        		  		               		_self.$refs.reform.switch('userCode','hidden',false);
        		  		               		_self.$refs.reform.switch('userName','hidden',false);
        		  		               		_self.$refs.reform.switch('nickName','hidden',false);
        		  		               		_self.$refs.reform.switch('idCardNo','hidden',false);
        		  		               		_self.$refs.reform.switch('birthday','hidden',false);
        		  		               		_self.$refs.reform.switch('age','hidden',false);
        		  		               		_self.$refs.reform.switch('sex','hidden',false);
        		  		               		_self.$refs.reform.switch('orgCode','hidden',false);
        		  		               		_self.$refs.reform.switch('ownBranch','hidden',true);
        		  		               		_self.$refs.reform.switch('status','hidden',false);
        		  		               		_self.$refs.reform.switch('telPhone','hidden',false);
        		  		               		_self.$refs.reform.switch('email','hidden',false);
        		  		               		_self.$refs.reform.switch('staffingLevel','hidden',false);
        		  		               		_self.$refs.reform.switch('eduLevel','hidden',false);
        		  		               		_self.$refs.reform.switch('memo','hidden',false);
        		  		               		_self.$refs.reform.switch('isUseFingerprint','hidden',true);
        		  		               		_self.$refs.reform.switch('tellerLevel','hidden',true);
        		  		               		_self.$refs.reform.switch('tellerCategory','hidden',true);
        		  		               		_self.$refs.reform.switch('lastUpdateUser','hidden',true);
        		  		               		_self.$refs.reform.switch('lastUpdateTime','hidden',true);
        		  		               		_self.$refs.reform.switch('createTime','hidden',true);
        		  		               		_self.$refs.reform.switch('createUser','hidden',true);
                                            _self.$refs.reform.switch('userCode','disabled',false);
                                            _self.$refs.reform.switch('userName','disabled',false);
                                            _self.$refs.reform.switch('idCardNo','disabled',false);
                                            _self.$refs.reform.switch('orgCode','disabled',false);
                                            _self.$refs.reform.switch('status','disabled',false);
                                            _self.$refs.reform.switch('isUseFingerprint','disabled',false);
                                            _self.$refs.reform.switch('tellerLevel','disabled',false);
                                            _self.$refs.reform.switch('tellerCategory','disabled',false);
    		  		               		}
    	                     	  }
                            	
                            	}
                            ]
                        },
                    	{
                        columnCount: 3,
                        fields: [
                            {
                                field: 'userCode', label: '用户代码', rules: [
                                    {required: true, message: '必填项', trigger: 'blur'},
                                    {required: true, min: 2, max: 24, message: '长度在2~24之间', trigger: 'blur'}
                                ]/* , disabled: true, placeholder: '点击下方按钮获取' */
                            },
                            {field: 'userName', label: '用户姓名', rules: [
                                    {required: true, message: '必填项', trigger: 'blur'},
                                    {required: true, min: 2, max: 40, message: '长度在2~40之间', trigger: 'blur'}]
                            },
                            {field: 'nickName', label: '昵称', rules: [{max: 24, message: '最大长度为24'}]},
                            {field: 'idCardNo', label: '身份证号', rules: [
                                    {validator: yufp.validator.IDCard, message: '请输入正确的身份证号', trigger: 'blur'}, {max: 18, message: '最大长度为18'} ]
                            },
                            {field: 'birthday', label: '生日', type: 'date'},
                            {field: 'age', label: '年龄', rules: [
                                {validator: yufp.validator.age, message: '请输入正确的年龄', trigger: 'blur'}
                             ]},
                            {field: 'sex', label: '性别', type: 'select', dataCode: 'STD_ZX_SEX'},
                            {field: 'orgCode', label: '机构代码', type: 'custom', is: 'div-org-selector',
                                rules: [{required: true, message: '请选择机构代码', trigger: 'blur'}, {max: 24,message: '最大长度为24'}],
                                selectFn: function (val, formModel, result) {
                                    var org = result[1];
                                    // formModel.legalOrgCode =
									// org.legalOrgCode;
                                    formModel.orgCode = org.orgCode;
                                    formModel.ownBranch = org.orgName;
                                },
                                icon: 'search'
                            },
                            {field: 'ownBranch', label: '所属分行', disabled:true},
                            {field: 'status', label: '状态', type: 'select', dataCode: 'USER_STATUS',
                                datacodeFilter: function (options) {
                                    this.typeOptions = [];
                                    for (var i = 0; i < options.length; i++) {
                                        if (options[i].key == '0' || options[i].key == '1') {
                                            this.typeOptions.push(options[i]);
                                        }
                                    }
                                }
                            },
                            {field: 'telPhone', label: '联系电话', rules: [
                                    {validator: yufp.validator.telephone, message: '请输入正确的电话', trigger: 'blur'}, {max: 20, message: '最大长度为20'}]
                            },
                            {field: 'email', label: '邮箱', rules: [
                                    {validator: yufp.validator.email, message: '请输入正确的邮箱', trigger: 'blur'},
                                    {max: 32, message: '最大长度为32'}
                                ]
                            },
                            {field: 'staffingLevel', label: '职级', type: 'select', dataCode: 'ZB_POS_LEVEL'},
                            {field: 'pwdValdaDate', label: '密码失效日期', type: 'date', hidden: true},
                            {field: 'createTime', label: '创建日期', disabled: true},
                            {field: 'createUser', label: '创建人', disabled: true},
                            /*
							 * {field: 'lastLoginTime', label: '最后登录时间',
							 * disabled: true}, { field: 'currPwdWrongNum',
							 * label: '当前密码登录错误次数', rules: [ {validator:
							 * yufp.validator.number, message: '请输入正确的数字',
							 * trigger: 'blur'} ], disabled: true },
							 */
                            {field: 'eduLevel', label: '学历水平', type: 'select', dataCode: 'ZB_DEGREE'},
                            {field: 'lastUpdateUser', label: '最后修改人', disabled: true},
                            {field: 'lastUpdateTime', label: '最后修改日期', disabled: true},
                            {field: 'isUseFingerprint', label: '是否使用指纹', type: 'select', dataCode: 'STD_USFGTG'},
                            {field: 'tellerLevel', label: '柜员级别', type: 'select', dataCode: ''},
                            {field: 'tellerCategory', label: '柜员类别', type: 'select', dataCode: 'STD_USERTP'},
                        ]
                    }, {
                        columnCount: 1,
                        fields: [

                            {
                                field: 'memo', label: '备注', type: 'textarea', rows: 3, rules: [
                                    {max: 100, message: '最大长度为100'}
                                ]
                            }
                        ]
                    }],
                    
                    updateButtons: [
                        {
                            label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                                var validate = false;
                                _self.$refs.reform.validate(function (valid) {
                                    validate = valid
                                });
                                if (!validate) {
                                    return
                                }
                                if (model.userCode == null || model.userCode.length == 0 || model.userCode == false) {
                                    _self.$message({
                                        message: '请先获取用户代码',
                                        type: 'warning'
                                    });
                                    return
                                }
                                var rMethod = '';
                                //var reqUrl = '';
                                if (_self.viewType == 'EDIT') {
                                    rMethod = 'PUT';
                                    var obj = _self.$refs.reftable.selections[0];
                                    if (obj.status == '0' && _self.$refs.reform.formModel.status == '1') {
                                        _self.$message({
                                            message: '不能修改为正常状态',
                                            type: 'warning'
                                        });
                                        return
                                    }
                                    //reqUrl = backend.consoleService + '/api/s/user/inOrUp';
                                } else if (_self.viewType == 'ADD') {
                                    rMethod = 'POST';
                                    model.status = '1';
                                    //reqUrl = backend.consoleService + '/api/s/user';
                                }

                                //校验机构号是否在网贷系统中存在
                                yufp.service.request({
                                    method: 'POST',
                                    url: backend.consoleService + '/api/check/s/org',
                                    data: {
                                        orgCode: model.orgCode
                                    },
                                    callback: function (code, message, response) {
                                        if(response.rows == 0){
                                            _self.$confirm(model.orgCode + ':机构号在网贷系统不存在，请确认是否继续！', '提示').then(function () {
                                                _self.$confirm('保存后立即生效，请确认是否继续！', '提示').then(function () {
                                                    yufp.service.request({
                                                        method: rMethod,
                                                        url: backend.consoleService + '/api/s/user',
                                                        data: model,
                                                        callback: function (code, message, response) {
                                                            if (response.success) {
                                                                _self.$refs.reftable.remoteData();
                                                                _self.$message('操作成功');
                                                                _self.dialogVisible = false
                                                            } else if (response.rows == -1) {
                                                                _self.$message('该用户信息已存在！');
                                                            } else {
                                                                _self.$message('操作失败');
                                                            }
                                                        }
                                                    })
                                                })
                                            }).catch(function () {
                                                return;
                                            });
                                        }else{
                                            _self.$confirm('保存后立即生效，请确认是否继续！', '提示').then(function () {
                                                yufp.service.request({
                                                    method: rMethod,
                                                    url: backend.consoleService + '/api/s/user',
                                                    data: model,
                                                    callback: function (code, message, response) {
                                                        if (response.success) {
                                                            _self.$refs.reftable.remoteData();
                                                            _self.$message('操作成功');
                                                            _self.dialogVisible = false
                                                        } else if (response.rows == -1) {
                                                            _self.$message('该用户信息已存在！');
                                                        } else {
                                                            _self.$message('操作失败');
                                                        }
                                                    }
                                                })
                                            })
                                        }
                                    }
                                })

                            }
                        },
                        {
                            label: '取消', type: 'primary', icon: 'yx-undo2', op: 'reset', hidden: false, click: function (model) {
                                _self.dialogVisible = false
                            }
                        }
//                        {
//                            label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
//                                _self.dialogVisible = false
//                            }
//                        }
                    ],
                    height: yufp.frame.size().height - 93,
                    dialogVisible: false,
                    formDisabled: false,
                    viewType: 'DETAIL',
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    
                    // 修改弹框开始
                    replaceFields:[
                    	{
                    		label: '用户代码',placeholder: '用户代码', field: 'userCode',disabled:true, type: 'input', rules: [
                          {required: true, message: '必填项', trigger: 'blur'},
                          {required: true, min: 2, max: 24, message: '长度在2~24之间', trigger: 'blur'}]
                    	}
                    ],
                   
                    replaceButtons: [
                        {
                            label: '刷新', op: 'submit', type: 'primary',  click: function (model, valid) {
                           	    //if (valid) {
                                  // _self.$refs.reftable.remoteData(model)
                                //}
                            	var isTel = _self.$refs.reform1.formModel.isTeller;
                            	if('Y' === isTel){
                                    yufp.service.request({
                                        method: "POST",
                                        url: backend.consoleService + '/api/s/isTeller', //+ model.userCode,
                                        data: {
                                            userCode:model.userCode,
                                            isTeller:isTel
                                        },
                                        callback: function (code, message, response) {
                                            if (response.success) {
                                                // 重置表单，防止第二次点击查看时，为空数据出现上一次查看的数据
                                                // _self.$refs.reform.resetFn();
                                                yufp.extend(_self.$refs.reform1.formModel, response.rows);
                                                _self.$message("更新用户信息成功！");
                                            } else {
                                                _self.$message(response.message);
                                            }
                                        }
                                    })
                                }else{
                                    yufp.extend(_self.$refs.reform1.formModel, model);
                                }

                            }
                        }
                    ],

                    modifyFields:[
                    	{
                        columnCount: 3,
                        fields: [
//                            {
//                                field: 'userCode', label: '用户代码', rules: [
//                                    {required: true, message: '必填项', trigger: 'blur'},
//                                    {required: true, min: 2, max: 24, message: '长度在2~24之间', trigger: 'blur'}
//                                ]/* , disabled: true, placeholder: '点击下方按钮获取' */
//                            },
                            {field: 'userName', label: '用户姓名', rules: [
                                    {required: true, message: '必填项', trigger: 'blur'},
                                    {required: true, min: 2, max: 40, message: '长度在2~40之间', trigger: 'blur'}]
                            },
                            {field: 'nickName', label: '昵称', rules: [{max: 24, message: '最大长度为24'}]},
                            {field: 'idCardNo', label: '身份证号', rules: [
                                    {validator: yufp.validator.IDCard, message: '请输入正确的身份证号', trigger: 'blur'}, {max: 18, message: '最大长度为18'} ]
                            },
                            {field: 'birthday', label: '生日', type: 'date'},
                            {field: 'age', label: '年龄', rules: [
                                {validator: yufp.validator.age, message: '请输入正确的年龄', trigger: 'blur'}
                             ]},
                            {field: 'sex', label: '性别', type: 'select', dataCode: 'STD_ZX_SEX'},
                            {field: 'orgCode', label: '机构代码', type: 'custom', is: 'div-org-selector',
                                rules: [{required: true, message: '请选择机构代码', trigger: 'blur'}, {max: 24,message: '最大长度为24'}],
                                selectFn: function (val, formModel, result) {
                                    var org = result[1];
                                    // formModel.legalOrgCode =
									// org.legalOrgCode;
                                    formModel.orgCode = org.orgCode;
                                    formModel.ownBranch = org.orgName;
                                },
                                icon: 'search'
                            },
                            {field: 'ownBranch', label: '所属分行', disabled:true},
                            {
                                field: 'status', label: '状态', type: 'select', dataCode: 'USER_STATUS',
                                datacodeFilter: function (options) {
                                    this.typeOptions = [];
                                    for (var i = 0; i < options.length; i++) {
                                        if (options[i].key == '0' || options[i].key == '1') {
                                            this.typeOptions.push(options[i]);
                                        }
                                    }
                                }
                            },
                            {field: 'telPhone', label: '联系电话', rules: [
                                    {validator: yufp.validator.telephone, message: '请输入正确的电话', trigger: 'blur'}, {max: 20, message: '最大长度为20'}]
                            },
                            {field: 'email', label: '邮箱', rules: [
                                    {validator: yufp.validator.email, message: '请输入正确的邮箱', trigger: 'blur'},
                                    {max: 32, message: '最大长度为32'}
                                ]
                            },
                            {field: 'staffingLevel', label: '职级', type: 'select', dataCode: 'ZB_POS_LEVEL'},
                            {field: 'pwdValdaDate', label: '密码失效日期', type: 'date', hidden: true},
                            {field: 'createTime', label: '创建日期', disabled: true},
                            {field: 'createUser', label: '创建人', disabled: true},
                            {field: 'eduLevel', label: '学历水平', type: 'select', dataCode: 'ZB_DEGREE'},
                            {field: 'lastUpdateUser', label: '最后修改人', disabled: true},
                            {field: 'lastUpdateTime', label: '最后修改日期', disabled: true},
                            {field: 'isUseFingerprint', label: '是否使用指纹', type: 'select', dataCode: 'STD_USFGTG'},
                            {field: 'tellerLevel', label: '柜员级别', type: 'select', dataCode: ''},
                            {field: 'tellerCategory', label: '柜员类别', type: 'select', dataCode: 'STD_USERTP'},
                            {field: 'isTeller', label: '是否柜员', type: 'select', dataCode: 'STD_YES_NO',hidden:true},
                        ]
                    }, {
                        columnCount: 1,
                        fields: [
                            {
                                field: 'memo', label: '备注', type: 'textarea', rows: 3, rules: [
                                    {max: 100, message: '最大长度为100'}
                                ]
                            }
                        ]
                    }],
                    
                    modifyButtons: [
                        {
                            label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                                var validate = false;
                                _self.$refs.reform1.validate(function (valid) {
                                    validate = valid
                                });
                                if (!validate) {
                                    return
                                }
                                
                                if (model.userCode == null || model.userCode.length == 0 || model.userCode == false) {
                                    _self.$message({
                                        message: '请先获取用户代码',
                                        type: 'warning'
                                    });
                                    return
                                }
                                
                                var rMethod = '';
                                if (_self.viewType == 'EDIT') {
                                    var obj = _self.$refs.reftable.selections[0];
                                    if (obj.status == '0' && _self.$refs.reform1.formModel.status == '1') {
                                        _self.$message({
                                            message: '不能修改为正常状态',
                                            type: 'warning'
                                        });
                                        return;
                                    }
                                    rMethod = 'PUT';
                                } else if (_self.viewType == 'ADD') {
                                    rMethod = 'POST';
                                    model.status = '1'
                                }

                                //校验机构号是否在网贷系统中存在
                                yufp.service.request({
                                    method: 'POST',
                                    url: backend.consoleService + '/api/check/s/org',
                                    data: {
                                        orgCode: model.orgCode
                                    },
                                    callback: function (code, message, response) {
                                        if (response.rows == 0) {
                                            _self.$confirm(model.orgCode + ':机构号在网贷系统不存在，请确认是否继续！', '提示').then(function () {
                                                _self.$confirm('保存后立即生效，请确认是否继续！', '提示').then(function () {
                                                    yufp.service.request({
                                                        method: rMethod,
                                                        url: backend.consoleService + '/api/s/user',
                                                        data: model,
                                                        callback: function (code, message, response) {
                                                            if (response.success) {
                                                                _self.$refs.reftable.remoteData();
                                                                _self.$message('操作成功');
                                                                _self.modifyDialogVisible = false
                                                            } else {
                                                                _self.$message('操作失败');
                                                            }
                                                        }
                                                    })
                                                })
                                            }).catch(function () {
                                                return;
                                            });
                                        } else{
                                            _self.$confirm('保存后立即生效，请确认是否继续！', '提示').then(function () {
                                                yufp.service.request({
                                                    method: rMethod,
                                                    url: backend.consoleService + '/api/s/user',
                                                    data: model,
                                                    callback: function (code, message, response) {
                                                        if (response.success) {
                                                            _self.$refs.reftable.remoteData();
                                                            _self.$message('操作成功');
                                                            _self.modifyDialogVisible = false
                                                        } else {
                                                            _self.$message('操作失败');
                                                        }
                                                    }
                                                })
                                            })
                                        }
                                    }
                                });

                            }
                        },
                        {
                            label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                _self.modifyDialogVisible = false
                            }
                        }
                    ],
                    modifyDialogVisible: false,
                    // 修改弹框结束
                    
                    // 查看弹框开始
                    
                    infoFields: [
                    	{
                        columnCount: 3,
                        fields: [
                            {
                                field: 'userCode', label: '用户代码', rules: [
                                    {required: true, message: '必填项', trigger: 'blur'},
                                    {required: true, min: 2, max: 24, message: '长度在2~24之间', trigger: 'blur'}
                                ]/* , disabled: true, placeholder: '点击下方按钮获取' */
                            },
                            {field: 'userName', label: '用户姓名', rules: [
                                    {required: true, message: '必填项', trigger: 'blur'},
                                    {required: true, min: 2, max: 40, message: '长度在2~40之间', trigger: 'blur'}]
                            },
                            {field: 'nickName', label: '昵称', rules: [{max: 24, message: '最大长度为24'}]},
                            {field: 'idCardNo', label: '身份证号', rules: [
                                    {validator: yufp.validator.IDCard, message: '请输入正确的身份证号', trigger: 'blur'}, {max: 18, message: '最大长度为18'} ]
                            },
                            {field: 'birthday', label: '生日', type: 'date'},
                            {field: 'age', label: '年龄', rules: [
                                {validator: yufp.validator.age, message: '请输入正确的年龄', trigger: 'blur'}
                             ]},
                            {field: 'sex', label: '性别', type: 'select', dataCode: 'STD_ZX_SEX'},
                            {field: 'orgCode', label: '机构代码', type: 'custom', is: 'div-org-selector',
                                rules: [{required: true, message: '请选择机构代码', trigger: 'blur'}, {max: 24,message: '最大长度为24'}],
                                selectFn: function (val, formModel, result) {
                                    var org = result[1];
                                    // formModel.legalOrgCode =
									// org.legalOrgCode;
                                    formModel.orgCode = org.orgCode;
                                    formModel.ownBranch = org.orgName;
                                },
                                icon: 'search'
                            },
                            {field: 'ownBranch', label: '所属分行', disabled:true},
                            {
                                field: 'status', label: '状态', type: 'select', dataCode: 'USER_STATUS',
                                datacodeFilter: function (options) {
                                    this.typeOptions = [];
                                    for (var i = 0; i < options.length; i++) {
                                        if (options[i].key == '0' || options[i].key == '1') {
                                            this.typeOptions.push(options[i]);
                                        }
                                    }
                                }
                            },
                            {field: 'telPhone', label: '联系电话', rules: [
                                    {validator: yufp.validator.telephone, message: '请输入正确的电话', trigger: 'blur'}, {max: 20, message: '最大长度为20'}]
                            },
                            {field: 'email', label: '邮箱', rules: [
                                    {validator: yufp.validator.email, message: '请输入正确的邮箱', trigger: 'blur'},
                                    {max: 32, message: '最大长度为32'}
                                ]
                            },
                            {field: 'staffingLevel', label: '职级', type: 'select', dataCode: 'ZB_POS_LEVEL'},
                            {field: 'pwdValdaDate', label: '密码失效日期', type: 'date', hidden: true},
                            {field: 'createTime', label: '创建日期', disabled: true},
                            {field: 'createUser', label: '创建人', disabled: true},
                            {field: 'eduLevel', label: '学历水平', type: 'select', dataCode: 'ZB_DEGREE'},
                            {field: 'lastUpdateUser', label: '最后修改人', disabled: true},
                            {field: 'lastUpdateTime', label: '最后修改日期', disabled: true},
                            {field: 'isUseFingerprint', label: '是否使用指纹', type: 'select', dataCode: 'STD_USFGTG'},
                            {field: 'tellerLevel', label: '柜员级别', type: 'select', dataCode: ''},
                            {field: 'tellerCategory', label: '柜员类别', type: 'select', dataCode: 'STD_USERTP'},
                            {field: 'isTeller', label: '是否柜员', type: 'select', dataCode: 'STD_YES_NO',hidden:true},
                        ]
                    }, {
                        columnCount: 1,
                        fields: [
                            {
                                field: 'memo', label: '备注', type: 'textarea', rows: 3, rules: [
                                    {max: 100, message: '最大长度为100'}
                                ]
                            }
                        ]
                    }],
                    
                    infoButtons: [
                        {
                            label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                _self.infoDialogVisible = false
                            }
                        }
                    ],
                    infoDialogVisible: false,
                    // 查看弹框结束
                    
                    /* 机构选择 */
                    orgVisible: false,
                    
                    queryOrgFields: [
                        {placeholder: '机构代码', field: 'orgCode', type: 'input'}
                    ],
                    queryOrgButtons: [
                        {
                            label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                                if (valid) {
                                    var tempUrl = backend.consoleService + '/api/s/org/';
                                    if (model.orgCode != null && model.orgCode.length != 0) {
                                        tempUrl += model.orgCode
                                    }

                                    _self.$refs.refOrgTable.dataUrl = tempUrl;
                                    _self.$refs.refOrgTable.remoteData()
                                }
                            }
                        },
                        {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2'}
                    ],
                    
                    tableOrgColumns: [
                        {label: '机构代码', prop: 'orgCode', sortable: true, resizable: true},
                        {label: '上级机构代码', prop: 'orgParentCode', sortable: true, resizable: true},
                        {label: '法人机构代码', prop: 'legalOrgCode', sortable: true, resizable: true},
                        {label: '机构名称', prop: 'orgName', sortable: true, resizable: true}
                    ],
                    
                    /* 设置岗位 */
                    dutyDialogVisible: false,
                    setDuty: [],
                    dutyData: [],
                    
                    /* 设置角色 */
                    roleDialogVisible: false,
                    setRole: [],
                    roleData: [],

                    /*-------------------移交中心-----------------------------*/
                    tratableDataUrl: backend.consoleService + '/api/s/transfer',
                    traBaseParams: {},
                    traQFields: [
                        {placeholder: '用户代码', field: 'userCode', type: 'input'},
                        {placeholder: '用户姓名', field: 'userName', type: 'input'},
                        {placeholder: '性别', field: 'sex', type: 'select', dataCode: 'STD_ZX_SEX' },
                        {placeholder: '状态', field: 'status', type: 'select', dataCode: 'USER_STATUS'},
                        {placeholder: '机构代码', field: 'orgCode', type: 'custom', is: 'div-org-selector'}
                    ],

                    traQButtons: [
                        {
                            label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                                if (valid) {
                                    _self.$refs.tratable.remoteData(model);
                                }
                            }
                        },
                        {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2'}
                    ],

                    traTableColumns: [
                        {label: '主键', prop: 'id', sortable: true, resizable: true,hidden:true},
                        {label: '用户代码', prop: 'userCode', sortable: true, resizable: true},
                        {label: '业务类型', prop: 'tagetTable', sortable: true, resizable: true},
                        {label: '业务号', prop: 'tagetPri', sortable: true, resizable: true},
                        {label: '移交用户', prop: 'transferUser', sortable: true, resizable: true, hidden: true},
                        {label: '移交状态', prop: 'transferFlag', sortable: true, resizable: true},
                        {label: '创建时间', prop: 'createTime',width:'100px', sortable: true, resizable: true, hidden:true},
                        {label: '创建用户', prop: 'createUser',width:'100px', sortable: true, resizable: true, hidden:true},
                        {label: '最后修改时间', prop: 'lastUpdateTime',width:'100px', sortable: true, hidden:true},
                        {label: '最后修改用户', prop: 'lastUpdateUser',width:'100px', sortable: true, hidden:true}
                    ],

                    traFields:[{
                        columnCount: 3,
                        fields: [
                        {field: 'id', label: '主键', disabled: true, hidden:true},
                        {field: 'userCode', label: '用户代码', disabled: true, hidden:true},
                        {field: 'tagetTable', label: '业务类型', disabled: true,rules: [{required: true, message: '必填项', trigger: 'blur'}]},
                        {field: 'tagetPri', label: '业务号', disabled: true,rules: [{required: true, message: '必填项', trigger: 'blur'}]},
                        {field: 'transferUser', label: '移交用户', disabled: false,rules: [{required: true, message: '必填项', trigger: 'blur'}]},
                        {field: 'transferFlag', label: '移交状态', disabled: true, hidden:true},
                        {field: 'createTime', label: '创建时间', disabled: true, hidden:true},
                        {field: 'createUser', label: '创建人', disabled: true, hidden:true},
                        {field: 'lastUpdateTime', label: '最后修改日期', disabled: true, hidden:true},
                        {field: 'lastUpdateUser', label: '最后修改人', disabled: true, hidden:true},]}
                    ],

                    transferDialogVisible:false,
                    expandCollapseName: ['taskLoan','applyInfo'],
                    /*-------------------移交中心-----------------------------*/
                }
            },
            methods: {
                /**
				 * @param ctrlCode
				 *            操作码
				 */ 
                checkPermission: function (ctrlCode) {
                    return !yufp.session.checkCtrl(ctrlCode, cite.menuId);
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

                    if (viewType == 'ADD'){
                    	_self.formDisabled = !editable;
                        _self.dialogVisible = true;
                        _self.modifyDialogVisible = false;
                        _self.infoDialogVisible=false;
                    }else if(viewType == 'EDIT'){
                    	_self.formDisabled = !editable;
                        _self.dialogVisible = false;
                        _self.modifyDialogVisible = true;
                        _self.infoDialogVisible=false;
                    }else{
                    	_self.formDisabled = !editable;
                        _self.dialogVisible = false;
                        _self.modifyDialogVisible = false;
                        _self.infoDialogVisible=true;
                    }
                    
                },

//                switchParamsStatus: function () {
//                	var _self = this;
//                    if (_self.viewType == 'EDIT' || _self.viewType == 'DETAIL')
//                        _self.$refs.reform.switch('userCode', 'disabled', true);
//                    
//                    else
//                        _self.$refs.reform.switch('userCode', 'disabled', false);
//                    	_self.$refs.reform.rebuildFn()
//                },
                
                addFn: function () {
                    var _self = this;
                	_self.switchStatus('ADD', true);
                    _self.$nextTick(function () {
//                    _self.switchParamsStatus();
                    document.getElementsByClassName("el-input__inner")[6].value="";
                    _self.$refs.reform.resetFn();
                    })
                },
                
                modifyFn: function () {
                	var _self = this;
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({message: '请先选择一条记录', type: 'warning'});
                        return
                    }
                    var obj = _self.$refs.reftable.selections[0];
                    if (obj.status == '1') {
                        _self.$confirm('确定修改已生效用户记录?', '提示', {type: 'warning'}).then(function () {
                            _self.modifyShow(obj);
                        })
                    } else {
                        this.$message({message: '不能修改注销用户', type: 'warning'});
                    }
                },
                
                modifyShow: function (obj) {
                	var _self = this;  
                	var isT=obj.isTeller;
                    _self.switchStatus('EDIT', true);
                    if(isT == 'Y'){
                        _self.$nextTick(function () {
                            _self.$refs.reform1.switch('orgCode','disabled',false);
                            _self.$refs.reform1.switch('userName','disabled',true);
                            _self.$refs.reform1.switch('idCardNo','disabled',true);
                            _self.$refs.reform1.switch('ownBranch','disabled',true);
                            _self.$refs.reform1.switch('status','disabled',false);
                            _self.$refs.reform1.switch('isUseFingerprint','disabled',true);
                            _self.$refs.reform1.switch('tellerCategory','disabled',true);
                            _self.$refs.reform1.switch('isTeller','disabled',true);
                            _self.$refs.reform1.switch('tellerLevel','disabled',true);
                        });
                    }
                   /*
					 * yufp.service.request({ method: 'GET', url:
					 * backend.consoleService + '/api/s/user/org/' +
					 * obj.userCode, callback: function (code, message,
					 * response) { if (response.success) {
					 * _self.$refs.reform.formModel.orgCode =
					 * response.data.orgCode; } else {
					 * _self.$message('获取机构代码失败') } } })
					 */
                    _self.$nextTick(function () {
                    	if(isT == 'Y'){
                    		_self.$refs.reform1.switch('nickName','hidden',true);
  		               		_self.$refs.reform1.switch('birthday','hidden',true);
  		               		_self.$refs.reform1.switch('age','hidden',true);
  		               		_self.$refs.reform1.switch('sex','hidden',true);
  		               		_self.$refs.reform1.switch('telPhone','hidden',true);
  		               		_self.$refs.reform1.switch('email','hidden',true);
  		               		_self.$refs.reform1.switch('staffingLevel','hidden',true);
  		               		_self.$refs.reform1.switch('sex','hidden',true);
  		               		_self.$refs.reform1.switch('telPhone','hidden',true);
  		               		_self.$refs.reform1.switch('eduLevel','hidden',true);
  		               		_self.$refs.reform1.switch('memo','hidden',true);
  		               		_self.$refs.reform1.switch('ownBranch','hidden',false);
  		               		_self.$refs.reform1.switch('isUseFingerprint','hidden',false);
  		               		_self.$refs.reform1.switch('tellerLevel','hidden',false);
  		               		_self.$refs.reform1.switch('tellerCategory','hidden',false);
  		               		_self.$refs.reform1.switch('lastUpdateUser','hidden',true);
  		               		_self.$refs.reform1.switch('lastUpdateTime','hidden',true);
  		               		_self.$refs.reform1.switch('createTime','hidden',true);
  		               		_self.$refs.reform1.switch('createUser','hidden',true);
  		               		_self.$refs.reform1.switch('status','hidden',false);
                        }else{
  		               		_self.$refs.reform1.switch('userCode','hidden',false);
  		               		_self.$refs.reform1.switch('userName','hidden',false);
  		               		_self.$refs.reform1.switch('nickName','hidden',false);
  		               		_self.$refs.reform1.switch('idCardNo','hidden',false);
  		               		_self.$refs.reform1.switch('birthday','hidden',false);
  		               		_self.$refs.reform1.switch('age','hidden',false);
  		               		_self.$refs.reform1.switch('sex','hidden',false);
  		               		_self.$refs.reform1.switch('orgCode','hidden',false);
  		               		_self.$refs.reform1.switch('ownBranch','hidden',true);
  		               		_self.$refs.reform1.switch('status','hidden',false);
  		               		_self.$refs.reform1.switch('telPhone','hidden',false);
  		               		_self.$refs.reform1.switch('email','hidden',false);
  		               		_self.$refs.reform1.switch('staffingLevel','hidden',false);
  		               		_self.$refs.reform1.switch('eduLevel','hidden',false);
  		               		_self.$refs.reform1.switch('memo','hidden',false);
  		               		_self.$refs.reform1.switch('isUseFingerprint','hidden',true);
  		               		_self.$refs.reform1.switch('tellerLevel','hidden',true);
  		               		_self.$refs.reform1.switch('tellerCategory','hidden',true);
  		               		_self.$refs.reform1.switch('lastUpdateUser','hidden',true);
  		               		_self.$refs.reform1.switch('lastUpdateTime','hidden',true);
  		               		_self.$refs.reform1.switch('createTime','hidden',true);
  		               		_self.$refs.reform1.switch('createUser','hidden',true);
		               		}
//                    _self.switchParamsStatus1();
                    _self.$refs.refr.fm.userCode = obj.userCode;
                    yufp.extend(_self.$refs.reform1.formModel, obj);
                  })
                },
               
                infoFn: function () {
                	var _self = this;
                    if (_self.$refs.reftable.selections.length != 1) {
                        this.$message({message: '请先选择一条记录', type: 'warning'});
                        return
                    }
                    var ob = _self.$refs.reftable.selections[0];
                    var teller=ob.isTeller;
                    _self.switchStatus('DETAIL', false);
                    _self.$nextTick(function () {
                    	if(teller == 'Y'){
                    		_self.$refs.reform2.switch('nickName','hidden',true);
  		               		_self.$refs.reform2.switch('birthday','hidden',true);
  		               		_self.$refs.reform2.switch('age','hidden',true);
  		               		_self.$refs.reform2.switch('sex','hidden',true);
  		               		_self.$refs.reform2.switch('telPhone','hidden',true);
  		               		_self.$refs.reform2.switch('email','hidden',true);
  		               		_self.$refs.reform2.switch('staffingLevel','hidden',true);
  		               		_self.$refs.reform2.switch('sex','hidden',true);
  		               		_self.$refs.reform2.switch('telPhone','hidden',true);
  		               		_self.$refs.reform2.switch('eduLevel','hidden',true);
  		               		_self.$refs.reform2.switch('memo','hidden',true);
  		               		_self.$refs.reform2.switch('ownBranch','hidden',false);
  		               		_self.$refs.reform2.switch('isUseFingerprint','hidden',false);
  		               		_self.$refs.reform2.switch('tellerLevel','hidden',false);
  		               		_self.$refs.reform2.switch('tellerCategory','hidden',false);
  		               		_self.$refs.reform2.switch('lastUpdateUser','hidden',true);
  		               		_self.$refs.reform2.switch('lastUpdateTime','hidden',true);
  		               		_self.$refs.reform2.switch('createTime','hidden',true);
  		               		_self.$refs.reform2.switch('createUser','hidden',true);
  		               		_self.$refs.reform2.switch('status','hidden',false);
		               		}else{
  		               		_self.$refs.reform2.switch('userCode','hidden',false);
  		               		_self.$refs.reform2.switch('userName','hidden',false);
  		               		_self.$refs.reform2.switch('nickName','hidden',false);
  		               		_self.$refs.reform2.switch('idCardNo','hidden',false);
  		               		_self.$refs.reform2.switch('birthday','hidden',false);
  		               		_self.$refs.reform2.switch('age','hidden',false);
  		               		_self.$refs.reform2.switch('sex','hidden',false);
  		               		_self.$refs.reform2.switch('orgCode','hidden',false);
  		               		_self.$refs.reform2.switch('ownBranch','hidden',true);
  		               		_self.$refs.reform2.switch('status','hidden',false);
  		               		_self.$refs.reform2.switch('telPhone','hidden',false);
  		               		_self.$refs.reform2.switch('email','hidden',false);
  		               		_self.$refs.reform2.switch('staffingLevel','hidden',false);
  		               		_self.$refs.reform2.switch('eduLevel','hidden',false);
  		               		_self.$refs.reform2.switch('memo','hidden',false);
  		               		_self.$refs.reform2.switch('isUseFingerprint','hidden',true);
  		               		_self.$refs.reform2.switch('tellerLevel','hidden',true);
  		               		_self.$refs.reform2.switch('tellerCategory','hidden',true);
  		               		_self.$refs.reform2.switch('lastUpdateUser','hidden',true);
  		               		_self.$refs.reform2.switch('lastUpdateTime','hidden',true);
  		               		_self.$refs.reform2.switch('createTime','hidden',true);
  		               		_self.$refs.reform2.switch('createUser','hidden',true);
		               		}
//                    	_self.switchParamsStatus2();
//                    	_self.$refs.reform2.switch('userCode', 'disabled', true);
//                    	yufp.extend(this.$refs.reform1.formModel, this.$refs.reftable.selections[0]);
                    	yufp.extend(_self.$refs.reform2.formModel, ob);
                    })
                },
                
                deleteFn: function () {
                	var _self = this;
                	var selections = _self.$refs.reftable.selections;
                	if (selections.length < 1) {
                		_self.$message({message: '请先选择一条记录', type: 'warning'});
                		return
                	}
                	var obj = this.$refs.reftable.selections[0];
                	if (obj.status == '0') {
                		this.$message({message: '已注销用户不能注销', type: 'warning'});
                		return
                	}
                	_self.$confirm('是否注销用户?', '提示', {type: 'warning'}).then(function () {
                		yufp.service.request({
                			method: 'DELETE',
                			url: backend.consoleService + '/api/s/user',
                			data: obj,
                			callback: function (code, message, response) {
                				if (code == 0 && response.code == '0') {
                					_self.$refs.reftable.remoteData();
                					_self.$message('操作成功');
                				} else {
                                    _self.$refs.reftable.remoteData();
                                    _self.$message({message:response.message,type:'warning'});
                                }
                			}
                		})
                	})
                },
                
                // 设置岗位
                setDutyFn: function () {
                    var _self = this;
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({message: '请先选择一条记录', type: 'warning'});
                        return
                    }
                    var obj = this.$refs.reftable.selections[0];
                    if (obj.status == '0') {
                        this.$message({message: '已注销用户不能修改', type: 'warning'});
                        return
                    }
                    _self.dutyData = [];
                    yufp.service.request({
                        method: 'POST',
                        url: backend.consoleService + '/api/s/all/dutys',
                        data: {legalOrgCode:obj.legalOrgCode},
                        callback: function (code, message, response) {
                            if (code == 0 && response.code == '0') {
                                for (var i = 0; i < response.rows.length; i++) {
                                    _self.dutyData.push({
                                        key: response.rows[i].dutyCode,
                                        label: response.rows[i].dutyName
                                    })
                                }
                                // _self.$refs.reftable.remoteData();
                            } else {
                                _self.$message('获取岗位失败');
                            }
                        }
                    });
                    var userId = _self.$refs.reftable.selections[0].userCode;
                    _self.setDuty = [];
                    yufp.service.request({
                        method: 'GET',
                        url: backend.consoleService + '/api/s/user/duty/list/' + userId + '?timestamp='+ new Date().getTime(), /**
																																 * url加时间戳，是为了避免AJAX
																																 * GET请求加载的是缓存数据
																																 */
                        data: {},
                        callback: function (code, message, response) {
                            if (code == 0 && response.code == '0') {
                                // _self.$refs.reftable.remoteData();
                                for (var i = 0; i < response.rows.length; i++) {
                                    _self.setDuty.push(response.rows[i].dutyCode);
                                }
                            } else {
                                _self.$message('获取用户岗位失败');
                            }
                        }
                    });
                    _self.dutyDialogVisible = true;
                },
                // 岗位确认按钮
                sendDutyFn: function () {
                    var _self = this;
                    var obj = this.$refs.reftable.selections[0];
                    if (obj.status == '0') {
                        this.$message({message: '已注销用户不能修改', type: 'warning'});
                        return
                    }
                    yufp.service.request({
                        method: 'POST',
                        url: backend.consoleService + '/api/s/userDuty',
                        data: {
                            userCode: _self.$refs.reftable.selections[0].userCode,
                            dutyCodes: _self.setDuty
                        },
                        callback: function (code, message, response) {
                            if (code == 0 && response.code == '0') {
                                // _self.$refs.reftable.remoteData();
                                _self.$message('操作成功');
                                _self.dutyDialogVisible = false;
                            } else {
                                _self.$message('操作失败');
                            }
                        }
                    })
                },
                
                // 设置角色
                setRoleFn: function () {
                    var _self = this;
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({message: '请先选择一条记录', type: 'warning'});
                        return
                    }
                    var obj = this.$refs.reftable.selections[0];
                    if (obj.status == '0') {
                        this.$message({message: '已注销用户不能修改', type: 'warning'});
                        return
                    }
                    vm.roleData = [];
                    yufp.service.request({
                        method: 'POST',
                        url: backend.consoleService + '/api/s/queryRoleAll',
                        // url: backend.consoleService + '/api/s/queryRolesCtrl', /**【2019D0509】【(问题编号)】 @date 2019/12/05 */
                        data: {},
                        callback: function (code, message, response) {
                            if (code == 0 && response.code == '0') {
                                // _self.$refs.reftable.remoteData();
                                for (var i = 0; i < response.rows.length; i++) {
                                    vm.roleData.push({
                                        key: response.rows[i].roleCode,
                                        label: response.rows[i].roleName
                                    })
                                }
                            } else {
                                _self.$message('操作失败');
                            }
                        }
                    });
                    var userId = _self.$refs.reftable.selections[0].userCode;
                    vm.setRole = [];
                    yufp.service.request({
                        method: 'GET',
                        url: backend.consoleService + '/api/s/user/role/list/' + userId + '?timestamp='+ new Date().getTime(), /**
																																 * url加时间戳，是为了避免AJAX
																																 * GET请求加载的是缓存数据
																																 */
                        data: {userCode: userId},
                        callback: function (code, message, response) {
                            if (code == 0 && response.code == '0') {
                                // _self.$refs.reftable.remoteData();
                                for (var i = 0; i < response.rows.length; i++) {
                                    vm.setRole.push(response.rows[i].roleCode);
                                }
                            } else {
                                _self.$message('获取用户角色失败');
                            }
                        }
                    });
                    _self.roleDialogVisible = true;
                },
                // 设置角色-确定按钮
                sendRoleFn: function () {
                    var _self = this;
                    var obj = this.$refs.reftable.selections[0];
                    if (obj.status == '0') {
                        this.$message({message: '已注销用户不能修改', type: 'warning'});
                        return
                    }
                    yufp.service.request({
                        method: 'POST',
                        url: backend.consoleService + '/api/s/userRole',
                        data: {
                            userCode: _self.$refs.reftable.selections[0].userCode,
                            roleCodes: _self.setRole
                        },
                        callback: function (code, message, response) {
                            if (code == 0 && response.code == '0') {
                                // _self.$refs.reftable.remoteData();
                                _self.$message('操作成功');
                                _self.roleDialogVisible = false;
                            } else {
                                _self.$message('操作失败');
                            }
                        }
                    })
                },
                
                pwdFn: function () {
                	var _self = this;
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({message: '请先选择一条记录', type: 'warning'});
                        return
                    }
                    if (this.$refs.reftable.selections[0].isTeller == 'Y') {
                        this.$message({message: '您好柜员密码不可重置！您可通过系统密码修改功能进行密码修改！', type: 'warning'});
                        return
                    }
                    _self.$confirm('密码重置只对本地用户有效！是否重置密码?', '提示', {type: 'warning'}).then(function () {yufp.service.request({
                        method: 'POST',
                        url: backend.consoleService + '/api/s/user/pwd',
                        data: {
                            userCode: _self.$refs.reftable.selections[0].userCode
                        },
                        callback: function (code, message, response) {
                            if (code == 0 && response.code == '0') {
                                // _self.$refs.reftable.remoteData();
                                _self.$message('操作成功');
                                _self.roleDialogVisible = false;
                            } else {
                                _self.$message('操作失败');
                            }
                        }
                    })});
                },
                transferFn: function () {
                    var _self =this;
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({message: '请先选择一条记录', type: 'warning'});
                        return
                    };
                    var obj = _self.$refs.reftable.selections[0];
                    if (obj.status != '2') {
                        this.$message({message: '只有待停用状态下才可移交业务！', type: 'warning'});
                        return
                    }
                    _self.traBaseParams = {
                        userCode : obj.userCode
                    };
                    _self.formDisabled = false;
                    _self.transferDialogVisible = true;
                    _self.$nextTick(function () {
                        _self.clearFn();
                        _self.$refs.tratable.remoteData(_self.traBaseParams);
                    });

                },
                commitTra: function () {
                    var _self = this;
                    var obj = _self.$refs.traReform.formModel;
                    var validate = false;
                    _self.$refs.traReform.validate(function (valid) {
                        validate = valid
                    });
                    if (!validate) {
                        return
                    }
                    yufp.service.request({
                        method: 'POST',
                        url: backend.consoleService + '/api/s/transfers',
                        data: obj,
                        callback: function (code, message, response) {
                            if (code == 0 && response.code == '0') {
                                _self.$message('操作成功');
                                _self.transferDialogVisible = false;
                            } else {
                                _self.$message('操作失败, '+ response.message);
                            }
                        }
                    })

                },
                rowClickFn: function (row, event, column) {
                    var _self = this;
                    yufp.extend(_self.$refs.traReform.formModel,row);
                    _self.$refs.traReform.formModel.transferUser = "";
                },
                clearFn: function() {
                    var _self = this;
                    _self.$refs.tratable.data = [];
                    _self.$refs.traReform.resetFields();
                }
            }
        })
        // _self.$refs.refq.$refs.legalOrgCode[0].placeholder2 =
		// _self.$data.orgPlaceholder;
    };
    
    // 消息处理
    exports.onmessage = function (type, message) {

    };
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {

    };
    
});
