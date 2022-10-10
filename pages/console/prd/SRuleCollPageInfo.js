/**
 * @create by chenqm1 on 2018-05-03
 * @description 系统规则集表
 */
define([ './custom/widgets/js/RuleCollSelector.js' ], function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
    	
        yufp.lookup.reg('RULE_TYPE,COMMON_STATUS,RULE_PARAM_VAL_STATUS,STD_ZX_YES_NO');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                	ruleCollsUrl: backend.consoleService+ "/api/s/rule/colls",
                	ruleCollDtlsUrl: backend.consoleService+ "/api/s/rule/coll/dtls-collid/",
                	ruleSrcsUrl: backend.consoleService+ "/api/s/rule/srcs/nonpers",
                    sRuleCollParams: {},
                    sRuleCollDtlParams: {isViewStatus: false, isViewParamStatus:false},
                    sRuleSrcParams: {ruleCollId:"", ruleType:"", ruleCfgId: ""},
                    sRuleDtlParams: {},
                    sRuleCollQueryFields: [
                        { placeholder: '规则集编号', field: 'ruleCollId', type: 'input' },
                        { placeholder: '规则类型', field: 'ruleCollType', type: 'select', dataCode:'RULE_TYPE' },
                        { placeholder: '规则集名称', field: 'ruleCollDesc', type: 'input' },
                        { placeholder: '规则集状态', field: 'status', type: 'select', dataCode:'COMMON_STATUS' },
                        { placeholder: '是否省级配置', field: 'isProvince', type: 'select', dataCode:'STD_ZX_YES_NO' },
                        { placeholder: '创建人', field: 'createUser', type: 'input' }
                    ],
            
                    sRuleSrcQueryFields: [
                        { placeholder: '规则ID', field: 'ruleId', type: 'input' },
                        { placeholder: '规则名称', field: 'ruleName', type: 'input' },
                        { placeholder: '规则描述', field: 'ruleDesc', type: 'input' }
                    ],
            
                    sRuleCollQueryButtons: [
                        { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                            if (valid) {
                                _self.$refs.sRuleCollTable.remoteData(model);
                            }
                        } },
                        { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
                    ],
            
                    sRuleSrcQueryButtons: [
                        { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                            if (valid) {
                                _self.$refs.sRuleSrcTable.remoteData(model);
                            }
                        } },
                        { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
                    ],
  
                    sRuleCollColumns: [
                        { label: '规则集编号', prop: 'ruleCollId', sortable: true, resizable: true, hidden: false },
                        { label: '规则集名称', prop: 'ruleCollDesc', sortable: true, resizable: true },
                        { label: '规则类型', prop: 'ruleCollType', sortable: true, resizable: true, dataCode:'RULE_TYPE' },
                        { label: '是否省级配置', prop: 'isProvince', sortable: true, resizable: true, dataCode:'STD_ZX_YES_NO' },
                        { label: '规则集状态', prop: 'status', sortable: true, resizable: true, dataCode:'COMMON_STATUS' },
                        { label: '创建人', prop: 'createUser', sortable: true, resizable: true, hidden: false },
                        { label: '最后更新人', prop: 'lastUpdateUser', sortable: true, resizable: true, hidden: false },
                        { label: '最后更新时间 ', prop: 'lastUpdateTime', sortable: true, resizable: true, hidden: false }
                    ],
            
                    sRuleCollDtlColumns: [
                        { label: '规则配置明细ID', prop: 'dtlId', sortable: true, resizable: true },
                        { label: '规则集编号', prop: 'ruleCollId', sortable: true, resizable: true },
                        { label: '规则ID', prop: 'ruleId', sortable: true, resizable: true },
                        { label: '规则名称', prop: 'ruleName', sortable: true, resizable: true },
                        { label: '规则配置描述', prop: 'ruleCfgDesc', sortable: true, resizable: true},
                        { label: '状态', prop: 'status', sortable: true, resizable: true, dataCode:'COMMON_STATUS' },
                        { label: '规则对应参数配置状态', prop: 'paramValStatus', sortable: true, resizable: true, dataCode:'RULE_PARAM_VAL_STATUS' }
                    ],
            
                    sRuleSrcColumns: [
                        { label: '规则ID', prop: 'ruleId', sortable: true, resizable: true },
                        { label: '规则名称', prop: 'ruleName', sortable: true, resizable: true },
                        { label: '规则描述', prop: 'ruleDesc', sortable: true, resizable: true},
                        { label: '规则类型', prop: 'ruleType', sortable: true, resizable: true, dataCode:'RULE_TYPE'},
                        { label: '状态', prop: 'status', sortable: true, resizable: true, dataCode:'COMMON_STATUS' }
                    ],
                    
                    sRuleSrcParamColumns: [
                        { label: '参数ID', prop: 'paramId', sortable: true, resizable: true },
                        { label: '参数名称', prop: 'ruleName', sortable: true, resizable: true },
                        { label: '参数值', prop: 'paramVal', sortable: true, resizable: true}
                    ],
                    
                    mainGrid: {
                        data: null,
                        //loading: true,
                        multipleSelection: []
                    },
            
                    sRuleCollField: [{
                        columnCount: 2,
                        fields: [
                            { field: 'ruleCollId', label: '规则集编号', editable:'false', hidden: true, disabled: false},
                            { field: 'ruleCollDesc', label: '规则集合描述'},
                            { field: 'ruleCollType', label: '规则类型', dataCode:'RULE_TYPE', type: 'select', disabled: false},
                            { field: 'status', label: '状态', dataCode:'COMMON_STATUS', type: 'select', hidden: true},
                            { field: 'createTime', label: '创建日期', hidden: true, disabled: false}
                        ]
                    }],
                    
                    sRuleCollDtlField: [{
                        columnCount: 2,
                        fields: [
                            { field: 'ruleId', label: '规则ID'},
                            { field: 'ruleName', label: '规则名称'}
                        ]
                    },{
                        columnCount: 1,
                        fields: [
                            { field: 'ruleCfgDesc', label: '规则描述'}
                        ]
                    } ],
                    
                    sRuleCollUpdateButtons: [
                        {  label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                            var validate = false;
                            _self.$refs.sRuleCollForm.validate(function (valid) {
                                validate = valid;
                            });
                            if (!validate) {
                                return;
                            }
                  
                            var rMethod = '';
                            var url = '';
                            if(_self.viewType == "EDIT") {
                                rMethod = 'PUT';
                                url = backend.consoleService + '/api/s/rule/coll';
                            } else if(_self.viewType == "ADD") {
                                rMethod = 'POST';
                                url = backend.consoleService + '/api/s/rule/coll/back';
                            }
                  
                            yufp.service.request({
                                method: rMethod,
                                url: url,
                                data: model,
                                callback: function (code, message, response) {
                                    
                                        
                                        
                                        if (_self.viewType == "EDIT" && response.code == '0') {
                                            _self.$refs.sRuleCollTable.remoteData();
                                            _self.$message('操作成功');
                                            //_self.dialogVisible = true;
                                            _self.dialogVisible = false;
                                            _self.dtlVisible = true;
                                        } else {
                                            _self.$refs.sRuleCollTable.remoteData();
                                            var obj = response.data;
                                            if (response.code == '0' && obj && obj.total > 0){
                                                _self.$message('操作成功');
                                                _self.switchStatus('EDIT', true);
                                                _self.dtlVisible = true;
                                                _self.$nextTick(function () {
                                                    this.swtichParamStatus();
                                                    
                                                    yufp.extend(this.$refs.sRuleCollForm.formModel, obj);
                                                    this.$refs.sRuleCollDtlTable.remoteData({'ruleCollId':obj.ruleCollId, 'ruleType': obj.ruleCollType});
                                                    this.sRuleSrcParams.ruleCollId = obj.ruleCollId;
                                                    this.sRuleSrcParams.ruleType = obj.ruleCollType;
                                                });
                                            }else {
                                                _self.$message({message: response.message, type: 'warning'});
                                            }
                                            
                                        }
                                    
                                }
                            });
                        }  },
                        { label: '提交', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                            var validate = false;
                            _self.$refs.sRuleCollForm.validate(function (valid) {
                                validate = valid;
                            });
                            if (!validate) {
                                return;
                            }
                  
                            var rMethod = '';
                            var url = '';
                            if(_self.viewType == "EDIT") {
                                rMethod = 'PUT';
                                url = backend.consoleService + '/api/s/rule/coll/submit';
                            }
                  
                            yufp.service.request({
                                method: rMethod,
                                url: url,
                                data: model,
                                callback: function (code, message, response) {
                                    if (response.code == 0 && response.data > 0) {
                                        _self.$refs.sRuleCollTable.remoteData();
                                        
                                        if (_self.viewType == "EDIT") {
                                            _self.$message('操作成功');
                                            _self.dialogVisible = false;
                                        }
                                    } else {
                                        _self.$message({message: response.message, type: 'warning'});
                                    }
                                }
                            });
                        } },
                          { label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                            _self.dialogVisible = false;
                        } }
                    ],
                    
                    height: yufp.frame.size().height - 103,
                    dialogVisible: false,
                    srcDialogVisible: false,
                    formDisabled: false,
                    sRuleCollDtlFormDisabled: false,
                    paramDialogVisible: false,
                    dtlVisible: true,
                    viewType: 'DETAIL',
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    copyDiaVis: false,
                    copyLoading: false,

                    copyRuleCollField: [{
                        columnCount: 1,
                        fields: [
                            { field: 'ruleCollId', label: '规则集', disabled: true, type: 'custom',
                                is:'div-rule-coll-selector', params:{ status:'1'},
                                rules: [ { required: true, message: '请选择规则集!', trigger: 'blur'} ] },
                            { field: 'ruleCollDesc', label: '规则集合描述', 
                                rules: [ { required: true, message: '请填写规则集合描述!', trigger: 'blur'} ] }
                        ]
                    }]
                };
            },
            
            methods: {
        	
                checkPermission: function(ctrlCode) {
                    return !yufp.session.checkCtrl(ctrlCode, cite.menuId);
                },
                
                rowClickFn: function(row) {
                    if (this.mainGrid.currentRow && this.mainGrid.currentRow !== row) {
                        this.mainGrid.currentRow.edit = false;
                    }
                    row.edit = true;
                    this.mainGrid.currentRow = row;
                },
                
                isDisplay: function() {
                	  return !this.sRuleCollDtlParams.isViewStatus;
                },
                
                isParamDisplay : function() {
                	return !this.sRuleCollDtlParams.isViewParamStatus;
                },
                
                switchStatus: function (viewType, editable) {
                    var _self = this;
                    _self.viewType = viewType;
                    _self.sRuleCollUpdateButtons[0].hidden = !editable;
                    _self.sRuleCollUpdateButtons[1].hidden = viewType != 'EDIT';
                    _self.formDisabled = !editable;
                    _self.dialogVisible = true;
                },
                
                swtichParamStatus: function () {
                	var hid = this.viewType == 'ADD';
                    this.$refs.sRuleCollForm.switch('ruleCollId', 'hidden',  hid);
                    this.$refs.sRuleCollForm.switch('createTime', 'hidden',  hid);
                    this.$refs.sRuleCollForm.switch('status', 'hidden',  hid);
                    this.$refs.sRuleCollForm.switch('ruleCollId', 'disabled',  true);
                    this.$refs.sRuleCollForm.switch('createTime', 'disabled',  true);
                    this.$refs.sRuleCollForm.switch('status', 'disabled',  true);
                    this.$refs.sRuleCollForm.switch('ruleCollType', 'disabled',  !hid);
                    this.$refs.sRuleCollForm.rebuildFn();
                },
                
                addFn: function () {
                    var _self = this;
                    _self.switchStatus('ADD', true);
                    _self.$nextTick(function () {
                    	this.swtichParamStatus();
                        _self.$refs.sRuleCollForm.resetFn();
                    });
                    _self.dtlVisible = false;
                },
                
                addRules: function() {
                  	var _this = this;
                  	_this.formDisabled = false;
                  	_this.srcDialogVisible = true;
                  	if (this.sRuleSrcParams.ruleCollId == '') {
          		          this.$message({ message: '请先新增规则集信息', type: 'warning' });
                        return;
                    }
                    this.$nextTick(function () {
                        this.$refs.sRuleSrcTable.remoteData(); 
                    });
                },
          
                selectRtn:function() {
                    if (this.$refs.sRuleSrcTable.selections.length < 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var _self = this;
                    var selections = _self.$refs.sRuleSrcTable.selections;
                    var len = selections.length, arr = [];
                    for (var i = 0; i < len; i++) {
                        arr.push(selections[i].ruleId);
                    }
                
                    yufp.service.request({
                        method: 'POST',
                        url: backend.consoleService+'/api/s/rule/coll/dtls/src',
                        data: {
                            ruleId: arr.join(','),
                            ruleCollId : this.sRuleSrcParams.ruleCollId
                        },
                        callback: function (code, message, response) {
                            if (response.code == 0) {
                                _self.$refs.sRuleCollDtlTable.remoteData();
                                _self.$message('操作成功');
                                _self.srcDialogVisible = false;  
                            } else {
                                _self.$message('操作失败');
                            }
                        }
                    });
                    this.switchStatus('EDIT', true);
                },
          
                rtn: function() {
                    this.srcDialogVisible = false;
                },
          
                modifyFn: function () {
                    if (this.$refs.sRuleCollTable.selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var obj = this.$refs.sRuleCollTable.selections[0];
                    if (obj.status != '0') {
                        this.$message({ message: '只能修改待生效的数据!', type: 'warning' });
                        return ;
                    }
                    if ( '1' == obj.isProvince && '00001' != yufp.session.org.orgCode) {
                      this.$message({ message: '不能修改省级配置规则!', type: 'warning' });
                      return ;
                    }
                    if ( obj.createUser != yufp.session.user.userId) {
                        this.$message({ message: '不是本人创建的不能修改!', type: 'warning' });
                        return ;
                    }
                    this.dtlVisible = true;
                    this.sRuleCollDtlParams.isViewStatus = false;
                    this.switchStatus('EDIT', true);
                    this.$nextTick(function () {
                    	this.swtichParamStatus();
                        
                        yufp.extend(this.$refs.sRuleCollForm.formModel, obj);
                        this.$refs.sRuleCollDtlTable.remoteData({'ruleCollId':obj.ruleCollId, 'ruleType': obj.ruleCollType});
                        this.sRuleSrcParams.ruleCollId = obj.ruleCollId;
                        this.sRuleSrcParams.ruleType = obj.ruleCollType;
                    });
                },
                
                modifyRuleParams: function() {
                	
                    if (this.$refs.sRuleCollDtlTable.selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var obj = this.$refs.sRuleCollDtlTable.selections[0];
                    if (obj.paramValStatus == 01) {
                    	  this.$message({ message: '当前规则不存在需要配置参数', type: 'warning' });
                        return;
                    }
                	
                    var _this = this;
                    _this.sRuleCollDtlFormDisabled = true;
                    _this.paramDialogVisible = true;
                    this.sRuleCollDtlParams.isViewParamStatus = false;
                    this.$nextTick(function () {
                        yufp.extend(this.$refs.sRuleCollDtlParamForm.formModel, obj);
                        //this.$refs.sRuleCollDtlParamTable.remoteData({'dtlId':obj.dtlId});
                        this.sRuleSrcParams.ruleCfgId = obj.dtlId;
                    });
                    yufp.service.request({
                        method: 'POST',
                        url: backend.consoleService+"/api/s/rule/coll/dtl/param/dtl",
                        data: {'dtlId':obj.dtlId},
                        callback: function (code, message, response) {
                            
                        	  //var me = this;
                            _this.mainGrid.data = response.data;
                            //_this.mainGrid.loading = false;
                            // 行对象添加响应式属性
                            _this.mainGrid.data = _this.mainGrid.data.map(function(v){
                                _this.$set(v, 'edit', false);
                                return v;
                            });
                        }
                    });
          	
                },
                
                saveParam: function() {
                    var dataVal = this.mainGrid.data	;
                    if (dataVal.length < 1) return;
                    var _this = this;
                    yufp.service.request({
                        method: 'PUT',
                        url: backend.consoleService+"/api/s/rule/coll/dtl/params/dtl",
                        data: {"dtlId" : _this.sRuleSrcParams.ruleCfgId, "data" : dataVal},
                        callback: function (code, message, response) {
                            var data = response.data;
                            if (data >= 0) {
                                _this.paramDialogVisible = false;
                                _this.$message('保存成功');
                                _this.$refs.sRuleCollDtlTable.remoteData({'ruleCollId':_this.sRuleSrcParams.ruleCollId, 'ruleType': _this.sRuleSrcParams.ruleType});
                            } else {
                                _this.$message(response.message);
                            }
                        }
                    });
                },
                
                rtnParam: function() {
                    this.paramDialogVisible = false;
                },
                
                infoFn: function () {
                    if (this.$refs.sRuleCollTable.selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    this.sRuleCollDtlParams.isViewStatus = true;
                    this.dtlVisible = true;
                    this.switchStatus('DETAIL', false);
                    this.$nextTick(function () {
                    	 this.swtichParamStatus();
                      	var obj = this.$refs.sRuleCollTable.selections[0];
                        yufp.extend(this.$refs.sRuleCollForm.formModel, obj);
                        this.$refs.sRuleCollDtlTable.remoteData({'ruleCollId':obj.ruleCollId});
                        this.sRuleSrcParams.ruleCollId = obj.ruleCollId;
                    });
                },
                
                viewDetail:function() {
          	        if (this.$refs.sRuleCollDtlTable.selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                  
                    var obj = this.$refs.sRuleCollDtlTable.selections[0];
                    if (obj.paramValStatus == 01) {
                        this.$message({ message: '当前规则不存在需要配置参数', type: 'warning' });
                        return;
                    }
                    var _this = this;
                    _this.sRuleCollDtlFormDisabled = true;
                    _this.paramDialogVisible = true;
                    this.sRuleCollDtlParams.isViewParamStatus = true;
                    this.$nextTick(function () {
                        yufp.extend(this.$refs.sRuleCollDtlParamForm.formModel, obj);
                        //this.$refs.sRuleCollDtlParamTable.remoteData({'dtlId':obj.dtlId});
                        this.sRuleSrcParams.ruleCfgId = obj.dtlId;
                    });
                    
                   
                    yufp.service.request({
                        method: 'POST',
                        url: backend.consoleService+"/api/s/rule/coll/dtl/param/dtl",
                        data: {'dtlId':obj.dtlId},
                        callback: function (code, message, response) {
                            //var me = this;
                            _this.mainGrid.data = response.data;
                            //_this.mainGrid.loading = false;
                            // 行对象添加响应式属性
                            /*_this.mainGrid.data = _this.mainGrid.data.map(function(v){
                                _this.$set(v, 'edit', false)
                                return v
                            })*/
                        }
                    });
                },
                
                deleteFn: function () {
                    var _self = this;
                    var selections = _self.$refs.sRuleCollTable.selections;
                    if (selections.length < 1) {
                          _self.$message({ message: '请先选择一条记录', type: 'warning' });
                          return;
                    }
                    var obj = this.$refs.sRuleCollTable.selections[0];
                    if (obj.status != '0') {
                        this.$message({ message: '只能删除待生效的数据!', type: 'warning' });
                        return ;
                    }
                    if ( '1' == obj.isProvince && '00001' != yufp.session.org.orgCode) {
                      this.$message({ message: '不能删除省级配置规则!', type: 'warning' });
                      return ;
                    }
                    if ( obj.createUser != yufp.session.user.userId) {
                        this.$message({ message: '不是本人创建的不能删除!', type: 'warning' });
                        return ;
                    }
                    if (confirm("删除该条规则集将删除该规则集下所有配置的规则及规则对应的参数信息,是否继续?")) {
                        var len = selections.length, arr = [];
                        for (var i = 0; i < len; i++) {
                            arr.push(selections[i].ruleCollId);
                        }
                
                        yufp.service.request({
                            method: 'DELETE',
                            url: backend.consoleService+'/api/s/rule/coll',
                            data: {
                                ruleCollId: arr.join(',')
                            },
                            callback: function (code, message, response) {
                                if (response.code == 0) {
                                    _self.$refs.sRuleCollTable.remoteData();
                                    _self.$message('操作成功');
                                } else {
                                    _self.$message('操作失败');
                                }
                            }
                        });
                    }
            
                },
                
                disableFn: function(){
                    var _self = this;
                    var selections = _self.$refs.sRuleCollTable.selections;
                    if (selections.length < 1) {
                          _self.$message({ message: '请先选择一条记录', type: 'warning' });
                          return;
                    }
                    var obj = selections[0];
                    if (obj.status != '1') {
                        this.$message({ message: '只能失效已生效的数据!', type: 'warning' });
                        return ;
                    }
                    if ( '1' == obj.isProvince && '00001' != yufp.session.org.orgCode) {
                        this.$message({ message: '不能失效省级配置规则!', type: 'warning' });
                        return ;
                      }
                    if ( obj.createUser != yufp.session.user.userId) {
                        this.$message({ message: '不是本人创建的不能失效!', type: 'warning' });
                        return ;
                    }
                    this.$confirm('是否失效该规则集?', '提示')
                        .then(function () {
                            yufp.service.request({
                                method: 'PUT',
                                url: backend.consoleService + '/api/s/rule/coll/disable',
                                data: {
                                    ruleCollId: obj.ruleCollId
                                },
                                callback: function (code, message, response) {
                                    if (response && response.data >= 0) {
                                        _self.$refs.sRuleCollTable.remoteData();
                                        _self.$message('失效成功!');
                                    }else if (response && response.data < 0) {
                                        _self.$notify({
                                            title: '提示',
                                            message: response.message,
                                            duration: 0,
                                            type: 'warning'
                                          });
                                    } else {
                                        _self.$message('失效出现异常!');
                                    }
                                }
                            });
                        });
                        
                },
                
                deleteRuleCfg: function () {
          	
                    var _self = this;
                    var selections = _self.$refs.sRuleCollDtlTable.selections;
                    if (selections.length < 1) {
                        _self.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
            
                    if (confirm("删除该条规则配置将删除该规则下所有配置的参数信息,是否继续?")) {
                        var len = selections.length, arr = [];
                        for (var i = 0; i < len; i++) {
                            arr.push(selections[i].dtlId);
                        }
                
                        yufp.service.request({
                            method: 'DELETE',
                            url: backend.consoleService+'/api/s/rule/coll/dtl',
                            data: {
                                dtlId: arr.join(','),
                                ruleCollId: this.sRuleSrcParams.ruleCollId
                            },
                            callback: function (code, message, response) {
                                if (response.code == 0) {
                                    _self.$refs.sRuleCollDtlTable.remoteData();
                                    _self.$message('操作成功');
                                } else {
                                    _self.$message('操作失败');
                                }
                            }
                        });
                    }
                },

                copyFn: function () {
                    var _self = this;
                    var selections = _self.$refs.sRuleCollTable.selections;
                    if (selections.length != 1) {
                        _self.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    this.copyDiaVis = true;
                    this.copyLoading = false;
                    this.$nextTick(function() {
                        this.$refs.copyRuleCollForm.formModel.ruleCollId = selections[0].ruleCollId;
                        this.$refs.copyRuleCollForm.formModel.ruleCollDesc = null;
                        this.$refs.copyRuleCollForm.switch('ruleCollId', 'rawValue', selections[0].ruleCollDesc);
                    });
                },

                saveCopyRuleColl: function() {
                    var _self = this;
                    var validate = false;
                    this.$refs.copyRuleCollForm.validate(function (valid) {
                        validate = valid;
                    });
                    if (!validate) 
                        return;
                    var model = this.$refs.copyRuleCollForm.formModel;
                    this.copyLoading = true;
                    yufp.service.request({
                        method: 'POST',
                        url: backend.consoleService + '/api/s/rule/coll/copy',
                        data: model,
                        callback: function (code, message, response) {
                            _self.copyLoading = false;
                            if (response && response.data > 0) {
                                _self.copyDiaVis = false;
                                _self.$refs.sRuleCollTable.remoteData();
                                _self.$message({ message: '复制规则成功!', type: 'warning'});
                            } else {
                                _self.$message({ message: '复制规则失败!', type: 'warning'});
                            }
                        }
                    });
                }
            },
            
            mounted: function () {
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
