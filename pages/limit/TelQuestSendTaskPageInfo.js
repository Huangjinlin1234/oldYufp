/**
 * @create by szbd
 * @description 发送呼叫中心电核任务的前端js
 * @createDate 2018-08-06 10:05:01
 */
define(function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        // 引入字典项
        yufp.lookup.reg('CRUD_TYPE,STD_ZB_CALL_RESULT,QUESTION_CLASSIFY,STD_ZX_YES_NO,TEL_ANSWER_SELECT,STD_ZB_TEL_RESULT,'+
        		'STD_ZB_TEL_STATUS');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
            var _self = this;
            return {
            	dataUrl: backend.creditService + '/api/tel/quest/send/tasks',
            	dataUrlDH: '',
                baseParams: {
                },
                //搜索条件
                queryFields: [
                    {placeholder: '客户号', field: 'cusId', type: 'input'},
                    {placeholder: '客户姓名', field: 'cusName', type: 'input'},
                    {placeholder: '证件号码', field: 'certCode', type: 'input'},
                    {placeholder: '处理结果', field: 'telResult', type: 'select', dataCode: 'STD_ZB_CALL_RESULT', editable:false },
                    {placeholder: '日期', field: 'createDateRange', type: 'daterange', value: [], editable:false }
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
                    {label:'业务流水号', prop:'bizSerno', sortable:true, resizable:true, hidden:true},
                    {label:'产品ID', prop:'prdId', sortable:true, resizable:true, hidden:true},
                    {label:'客户号', prop:'cusId', sortable:true, resizable:true},
                    {label:'客户姓名', prop:'cusName', sortable:true, resizable:true},
                   /* {label:'证件类型', prop:'certType', sortable:true, resizable:true},*/
                    {label:'证件号码', prop:'certCode', sortable:true, resizable:true},
                    {label:'申请额度', prop:'applyAmt', sortable:true, resizable:true},
                    {label:'处理结果', prop:'telResult', sortable:true, resizable:true, dataCode: 'STD_ZB_CALL_RESULT'},
                    {label:'电核状态', prop:'telSts', sortable:true, resizable:true, dataCode: 'STD_ZB_TEL_STATUS'},
                   /* {label:'发送状态', prop:'sendSts', sortable:true, resizable:true},
                    {label:'尝试发送次数', prop:'tryTimes', sortable:true, resizable:true},*/
                    {label:'未接听次数', prop:'noReplyTimes', sortable:true, resizable:true},
                    {label:'日期', prop:'createDate', sortable:true, resizable:true},
                    /*{label:'上次呼叫时间', prop:'lastCallTime', sortable:true, resizable:true},
                    {label:'下次发送时间', prop:'nextSendTime', sortable:true, resizable:true},*/
                    /*{label:'法人机构号', prop:'legalOrgCode', sortable:true, resizable:true},*/
                    {label:'创建时间', prop:'createTime', sortable:true, resizable:true, hidden:true}
                ],
               /* updateFields: [{
                    columnCount: 3,
                    fields: [
                        {field:'bizSerno', label:'业务流水号'},
                        {field:'prdId', label:'产品ID'},
                        {field:'cusId', label:'客户号'},
                        {field:'cusName', label:'客户名称'},
                        {field:'certType', label:'证件类型'},
                        {field:'certCode', label:'证件号码'},
                        {field:'applyAmt', label:'申请额度'},
                        {field:'telResult', label:'处理结果'},
                        {field:'telSts', label:'电核状态'},
                        {field:'sendSts', label:'发送状态'},
                        {field:'tryTimes', label:'尝试发送次数'},
                        {field:'noReplyTimes', label:'未接听次数'},
                        {field:'lastCallTime', label:'上次呼叫时间'},
                        {field:'nextSendTime', label:'下次发送时间'},
                        {field:'legalOrgCode', label:'法人机构号'},
                        {field:'createDate', label:'创建日期'},
                        {field:'createTime', label:'创建时间'},
                        {field:'lastUpdateTime', label:'最后修改时间'}
                    ]
                }],*/
                // 查看显示字段
                tableColumnDH: [
                    { label: '业务流水号', prop: 'bizSerno', sortable: true, resizable: true },
                    { label: '问题类型', prop: 'questionClassify', sortable: true, resizable: true ,dataCode: 'QUESTION_CLASSIFY'},
                    { label: '问题正确答案', prop: 'qtAnswerCort', sortable: true, resizable: true ,dataCode: 'STD_ZX_YES_NO'},
                    { label: '问题描述', prop: 'questionDesc', sortable: true, resizable: true ,dataCode: 'TEL_ANSWER_SELECT'},
                    { label: '处理结果', prop: 'passInd', sortable: true, resizable: true ,dataCode: 'STD_ZB_TEL_RESULT'}
                ],
                
                /*updateButtons: [
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
                            url: backend.creditService + '/api/tel/quest/send/task',
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
                ],*/
                height: yufp.frame.size().height - 103,
                dialogVisible: false,
                // formDisabled: false,
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
                    //_self.formDisabled = !editable;
                    _self.dialogVisible = true;
                },
               /* addFn: function () {
                    var _self = this;
                    _self.switchStatus('ADD', true);
                    _self.$nextTick(function () {
                        _self.$refs.reform.resetFn();
                    });
                },*/
               /* modifyFn: function () {
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    this.switchStatus('EDIT', true);
                    this.$nextTick(function () {
                        var obj = this.$refs.reftable.selections[0];
                        yufp.extend(this.$refs.reform.formModel, obj);
                    });
                },*/
                
                //  查看按钮
                infoFn: function () {
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var obj = this.$refs.reftable.selections[0];
                    this.dataUrlDH = backend.creditService + '/api/lmt/indiv/app/xfs/' + obj.bizSerno;
                    this.dialogVisible = true;
                    
                    // this.switchStatus('DETAIL', false);
                    
                    this.$nextTick(function () {
                        yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0]);
                    });
                },
                // 发送电核
                sendTaskFn: function () {
                	if (this.$refs.reftable.selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                	var obj = this.$refs.reftable.selections[0];
                	var _self = this;
                	if (obj.noReplyTimes == "3") {
                		this.$message({ message: '电核次数已到达3次上限，不允许发送电核！', type: 'error' });
                        return;
                	}
                	if (obj.telSts ===  "3" || obj.telSts === "0" || obj.telSts === "1") {
                		this.$message({ message: '电核状态为“未接听”客户，才允许重新发起电核！', type: 'warning' });
                        return;
                	} else if (obj.telSts === "2") {
                		this.$confirm('是否需要重新发起电核？', '提示').then(function () {
                			
                			yufp.service.request({
                                method: 'PUT',
                                url: backend.creditService + '/api/tel/quest/send/task/sendTel',
                                data: {
                                	prdId: obj.prdId,
                                	bizSerno: obj.bizSerno
                                },
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
                   	    });
                	}
                },  // end of sendTaskFn function()
                
               /* deleteFn: function () {
                    var _self = this;
                    var selections = _self.$refs.reftable.selections;
                    if (selections.length < 1) {
                        _self.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    var len = selections.length, arr = [];
                    for (var i = 0; i < len; i++) {
                        arr.push(selections[i].legalOrgCode);
                    }
                    yufp.service.request({
                        method: 'DELETE',
                        url: backend.creditService + '/api/tel/quest/send/task',
                        data: {
                            legalOrgCode: arr.join(',')
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
                    yufp.util.exportExcelByTable({
                        fileName: '下载文件',
                        importType: 'service', // page当前页 selected 选中的数据  service 后端数据
                        ref: this.$refs.reftable,
                        url: '',
                        param: {}
                    });
                }*/
            }
        });
    };
    // 消息处理
    exports.onmessage = function (type, message) {};
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {}
});
