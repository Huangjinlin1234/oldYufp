/**
 * @create by szbd
 * @description 征信查询记录的前端js
 * @createDate 2018-09-22 11:26:33
 */
define(function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        //引入字典项
        yufp.lookup.reg('CRUD_TYPE,STD_ZX_QUERY_CASE,STD_ZX_QUERY_RESULT,STD_ZB_CERT_TYP');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
            var _self = this;
            return {
            	
            	dataUrl:backend.cusService+'/api/cus/rpt/records',
                baseParams: {
                },
                //搜索条件
                queryFields: [
//                    {placeholder: '流水号', field: 'serno', type: 'input'},
//                    {placeholder: '报告编号', field: 'reportno', type: 'input'},
                    {placeholder: '客户名称', field: 'cusName', type: 'input'},
//                    {placeholder: '证件类型', field: 'certType', type: 'select',dataCode:'STD_ZB_CERT_TYP'},
                    {placeholder: '证件号码', field: 'certCode', type: 'input'},
                    {placeholder: '查询时间段', field: 'inputDate', type: 'daterange',value:[]},
//                    {placeholder: '查询人id', field: 'queryUserid', type: 'input'},
                    {placeholder: '查询用户名', field: 'queryUser', type: 'input'},
//                    {placeholder: '查询人机构', field: 'queryOrg', type: 'input'},
//                    {placeholder: '查询人法人机构', field: 'queryMOrg', type: 'input'},
//                    {placeholder: '查询原因', field: 'queryCase', type: 'select',dataCode:'STD_ZX_QUERY_CASE'},
//                    {placeholder: '查询结果', field: 'queryResult', type: 'select',dataCode:'STD_ZX_QUERY_RESULT'},
//                    {placeholder: '错误代码', field: 'errorno', type: 'input'},
//                    {placeholder: '错误信息', field: 'errormsg', type: 'input'},
//                    {placeholder: 'html文件路径', field: 'htmlFilePath', type: 'input'},
//                    {placeholder: 'html文件名称', field: 'htmlFileName', type: 'input'},
//                    {placeholder: '业务流水号', field: 'bizSerno', type: 'input'},
//                    {placeholder: '预警专用', field: 'warning', type: 'input'},
//                    {placeholder: '留用', field: 'remark', type: 'input'}
                ],
                queryButtons: [
                    {label:'查询', op: 'submit', type:'primary', icon:'search', click:function (model, valid) {
                        if (valid) {
                            _self.$refs.reftable.remoteData(model);
                        }
                    }},
                    {label:'重置', op:'reset', type:'primary', icon:'yx-loop2'}
                ],
                tableColumns: [
                    {label:'客户名称', prop:'cusName', sortable:true, resizable:true},
                    {label:'证件号码', prop:'certCode', sortable:true, resizable:true},
                    {label:'征信查询时间', prop:'queryTime', sortable:true, resizable:true},
                    {label:'查询原因', prop:'queryCase', sortable:true, resizable:true,dataCode:'STD_ZX_QUERY_CASE'},
                    {label:'查询用户名', prop:'queryUser', sortable:true, resizable:true}
//                    {label:'流水号', prop:'serno', sortable:true, resizable:true},
//                    {label:'报告编号', prop:'reportno', sortable:true, resizable:true},
//                    {label:'证件类型', prop:'certType', sortable:true, resizable:true,type:'select',dataCode:'STD_ZB_CERT_TYP'},
//                    {label:'查询用户名', prop:'queryUserid', sortable:true, resizable:true},
//                    {label:'查询用户机构', prop:'queryOrg', sortable:true, resizable:true},
//                    {label:'查询用户法人机构', prop:'queryMOrg', sortable:true, resizable:true},
//                    {label:'查询结果', prop:'queryResult', sortable:true, resizable:true},
//                    {label:'错误代码', prop:'errorno', sortable:true, resizable:true},
//                    {label:'错误信息', prop:'errormsg', sortable:true, resizable:true},
//                    {label:'征信文件路径', prop:'htmlFilePath', sortable:true, resizable:true},
//                    {label:'征信文件名称', prop:'htmlFileName', sortable:true, resizable:true},
//                    {label:'业务流水号', prop:'bizSerno', sortable:true, resizable:true},
//                    {label:'预警专用', prop:'warning', sortable:true, resizable:true},
//                    {label:'留用', prop:'remark', sortable:true, resizable:true}
                ],
                updateFields: [{
                    columnCount: 3,
                    fields: [
                        {field:'serno', label:'流水号'},
                        {field:'reportno', label:'报告编号'},
                        {field:'queryTime', label:'查询时间'},
                        {field:'cusName', label:'客户名称'},
                        {field:'certType', label:'证件类型',type:'select',dataCode:'STD_ZB_CERT_TYP'},
                        {field:'certCode', label:'证件号码'},
//                        {field:'queryUserid', label:'查询用户编号'},
                        {field:'queryUser', label:'查询用户名'},
                        {field:'queryOrg', label:'查询用户机构'},
                        {field:'queryMOrg', label:'查询用户法人机构'},
                        {field:'queryCase', label:'查询原因',type:'select',dataCode:'STD_ZX_QUERY_CASE'},
                        {field:'queryResult', label:'查询结果',type:'select',dataCode:'STD_ZX_QUERY_RESULT'},
                        {field:'errorno', label:'错误代码'},
                        {field:'errormsg', label:'错误信息'},
                        {field:'htmlFilePath', label:'征信文件路径'},
                        {field:'htmlFileName', label:'征信文件名称'},
                        {field:'bizSerno', label:'业务流水号'},
//                        {field:'warning', label:'预警专用'},
//                        {field:'remark', label:'留用'}
                    ]
                }],
                updateButtons: [
                    {label:'取消', type:'primary', icon:'yx-undo2', hidden:false, click:function (model) {
                        _self.dialogVisible = false;
                    }},
                    {label:'保存', type:'primary', icon:'check', hidden:false, click:function (model) {
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
                            url: '/api/cus/rpt/record',
                            data: model,
                            callback: function (code, message, response) {
                                if (code == 0) {
                                    _self.$refs.reftable.remoteData();
                                    _self.$message('操作成功');
                                    _self.dialogVisible = false;
                                } else {
                                    _self.$message('操作失败');
                                }
                            }
                        });
                    }}
                ],
                height: yufp.frame.size().height - 103,
                dialogVisible: false,
                formDisabled: false,
                exportFileName:'征信查询记录',
                exportDialogVisible:false,
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
                    // _self.updateButtons[0].hidden = !editable;
                    _self.updateButtons[1].hidden = !editable;
                    _self.formDisabled = !editable;
                     _self.dialogVisible = true;
                },
                addFn: function () {
                    var _self = this;
                    _self.switchStatus('ADD', true);
                    _self.$nextTick(function () {
                        _self.$refs.reform.resetFn();
                    });
                },
                modifyFn: function () {
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    this.switchStatus('EDIT', true);
                    this.$nextTick(function () {
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
                    
                    yufp.service.request({
                        method: 'DELETE',
                        url: '/api/cus/rpt/record',
                        data: {
                            serno: selections[0].serno
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
                	
                	var _self = this;
                	var cmisdata = {};
                	var tableData = _self.$refs.reftable;
                	if(tableData.total == 0){
                		_self.$message({ message: '列表数据为空！', type: 'warning' });
                		return;
                	}
                		//导出数据查询标识
                		var flag = "export";
                		var formValue = _self.$refs.reform.fm;
                		yufp.extend(cmisdata,formValue);
                		
                		cmisdata.downloadifyCallBack = function(callback) {
                			
                			_self.exportDialogVisible = true;
                			_self.$nextTick(function () {
                				var span = document.getElementById("exportSpan");
                				callback(span);
                			});
                		};
                		
                		yufp.util.exportExcelByTable({
                			fileName: _self.exportFileName,
                			importType: 'service', // page当前页 selected 选中的数据  service 后端数据
                			ref: this.$refs.reftable,
                			url: backend.cusService+'/api/cus/rpt/records',
                			method:'POST',
                			param:{
                				cusName:formValue.cusName,
                				certCode:formValue.certCode,
                				inputDate:formValue.inputDate,
                				queryUser:formValue.queryUser,
                				flag:flag
                				}
                		});
                }
            }
        });
    };
    // 消息处理
    exports.onmessage = function (type, message) {};
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {}
});
