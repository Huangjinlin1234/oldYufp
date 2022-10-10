/**
 * @create by szbd
 * @description 额度调整申请表的前端js
 * @createDate 2018-10-07 11:10:16
 */
define(function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        //引入字典项
        yufp.lookup.reg('CRUD_TYPE,STD_ZB_APPR_STATUS,STD_ZB_ADJ_STATUS,STD_ZB_CERT_TYP,STD_ZB_ADJ_TYPE,STD_ZB_ADJ_BASE,STD_ZB_LMT_REJECT_RSN');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
            var _self = this;
            return {
            	
            	dataUrl:backend.creditService + '/api/lmt/adjust/apps',
                baseParams: {
                },
                //搜索条件
                queryFields: [
//                    {placeholder: '调整申请流水号', field: 'adjSerno', type: 'input'},
//                    {placeholder: '授信协议编号', field: 'lmtContNo', type: 'input'},
//                    {placeholder: '合同编号', field: 'contNo', type: 'input'},
                    {placeholder: '客户号', field: 'cusId', type: 'input'},
                    {placeholder: '客户名称', field: 'cusName', type: 'input'},
//                    {placeholder: '证件类型', field: 'certType', type: 'input'},
                    {placeholder: '证件号码', field: 'certCode', type: 'input'},
//                    {placeholder: '授信申请流水号', field: 'lmtSerno', type: 'input'},
//                    {placeholder: '调整类型', field: 'adjType', type: 'input'},
//                    {placeholder: '产品ID', field: 'prdId', type: 'input'},
//                    {placeholder: '产品代码', field: 'prdCode', type: 'input'},
//                    {placeholder: '产品名称', field: 'prdName', type: 'input'},
//                    {placeholder: '申请日期', field: 'inputDate', type: 'daterange',value:[]},
//                    {placeholder: '调整基础额度', field: 'adjBasicLmt', type: 'input'},
//                    {placeholder: '测算额度', field: 'calcLmt', type: 'input'},
//                    {placeholder: '调整结果额度', field: 'adjResultLmt', type: 'input'},
//                    {placeholder: '调整依据', field: 'adjBase', type: 'input'},
                    {placeholder: '授权流水号', field: 'outerAuthSerno', type: 'input'},
                    {placeholder: '调整状态', field: 'adjStatus', type: 'select',dataCode:'STD_ZB_ADJ_STATUS'},
//                    {placeholder: '调整说明', field: 'adjComment', type: 'input'},
//                    {placeholder: '审批状态', field: 'approveStatus', type: 'select',dataCode:'STD_ZB_APPR_STATUS'},
//                    {placeholder: '最终审批日期', field: 'finalApprvDate', type: 'input'},
//                    {placeholder: '激活截止日期', field: 'actDeadline', type: 'input'},
//                    {placeholder: '拒绝调整原因', field: 'rejectReason', type: 'input',type:'select',dataCode:'STD_ZB_LMT_REJECT_RSN'},
//                    {placeholder: '客户经理', field: 'cusManager', type: 'input'},
//                    {placeholder: '主管机构', field: 'mainBrId', type: 'input'},
//                    {placeholder: '法人机构', field: 'legalOrgCode', type: 'input'}
//                    {placeholder: '创建人', field: 'createUser', type: 'input'},
//                    {placeholder: '创建时间', field: 'createTime', type: 'input'},
//                    {placeholder: '最后修改人', field: 'lastUpdateUser', type: 'input'},
//                    {placeholder: '最后修改时间', field: 'lastUpdateTime', type: 'input'}
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
                    {label:'申请流水号', prop:'adjSerno', sortable:true, resizable:true},
                    {label:'授信申请流水号', prop:'lmtSerno', sortable:true, resizable:true},
//                    {label:'授信协议编号', prop:'lmtContNo', sortable:true, resizable:true},
//                    {label:'合同编号', prop:'contNo', sortable:true, resizable:true},
                    {label:'客户号', prop:'cusId', sortable:true, resizable:true},
                    {label:'客户名称', prop:'cusName', sortable:true, resizable:true},
                    {label:'证件类型', prop:'certType', sortable:true, resizable:true,type:'select',dataCode:'STD_ZB_CERT_TYP'},
                    {label:'证件号码', prop:'certCode', sortable:true, resizable:true},
//                    {label:'调整类型', prop:'adjType', sortable:true, resizable:true},
//                    {label:'产品ID', prop:'prdId', sortable:true, resizable:true},
//                    {label:'产品代码', prop:'prdCode', sortable:true, resizable:true},
//                    {label:'产品名称', prop:'prdName', sortable:true, resizable:true},
                    {label:'申请日期', prop:'applyDate', sortable:true, resizable:true},
                    {label:'调整基础额度', prop:'adjBasicLmt', sortable:true, resizable:true},
                    {label:'测算额度', prop:'calcLmt', sortable:true, resizable:true},
                    {label:'调整结果额度', prop:'adjResultLmt', sortable:true, resizable:true},
                    {label:'调整依据', prop:'adjBase', sortable:true, resizable:true,dataCode:'STD_ZB_ADJ_BASE'},
                    {label:'授权流水号', prop:'outerAuthSerno', sortable:true, resizable:true},
                    {label:'调整状态', prop:'adjStatus', sortable:true, resizable:true,dataCode:'STD_ZB_ADJ_STATUS'},
//                    {label:'调整说明', prop:'adjComment', sortable:true, resizable:true},
                    {label:'审批状态', prop:'approveStatus', sortable:true, resizable:true,dataCode:'STD_ZB_APPR_STATUS'},
//                    {label:'最终审批日期', prop:'finalApprvDate', sortable:true, resizable:true},
//                    {label:'激活截止日期', prop:'actDeadline', sortable:true, resizable:true},
//                    {label:'拒绝调整原因', prop:'rejectReason', sortable:true, resizable:true,type:'select',dataCode:'STD_ZB_LMT_REJECT_RSN'},
                    {label:'客户经理', prop:'cusManager', sortable:true, resizable:true},
                    {label:'主管机构', prop:'mainBrId', sortable:true, resizable:true},
                    {label:'法人机构', prop:'legalOrgCode', sortable:true, resizable:true},
//                    {label:'创建人', prop:'createUser', sortable:true, resizable:true},
//                    {label:'创建时间', prop:'createTime', sortable:true, resizable:true}
//                    {label:'最后修改人', prop:'lastUpdateUser', sortable:true, resizable:true},
//                    {label:'最后修改时间', prop:'lastUpdateTime', sortable:true, resizable:true}
                ],
                updateFields: [{
                    columnCount: 3,
                    fields: [
                        {field:'adjSerno', label:'申请流水号'},
                        {field:'lmtSerno', label:'授信申请流水号'},
                        {field:'lmtContNo', label:'授信协议编号'},
                        {field:'contNo', label:'合同编号'},
                        {field:'cusId', label:'客户号'},
                        {field:'cusName', label:'客户名称'},
                        {field:'certType', label:'证件类型',type:'select',dataCode:'STD_ZB_CERT_TYP'},
                        {field:'certCode', label:'证件号码'},
//                        {field:'adjType', label:'调整类型',type:'select',dataCode:'STD_ZB_ADJ_TYPE'},
//                        {field:'prdId', label:'产品ID'},
//                        {field:'prdCode', label:'产品代码'},
//                        {field:'prdName', label:'产品名称'},
                        {field:'applyDate', label:'申请日期'},
                        {field:'adjBasicLmt', label:'调整基础额度'},
                        {field:'calcLmt', label:'测算额度'},
                        {field:'adjResultLmt', label:'调整结果额度'},
                        {field:'adjBase', label:'调整依据',type:'select',dataCode:'STD_ZB_ADJ_BASE'},
                        {field:'outerAuthSerno', label:'授权流水号'},
                        {field:'adjStatus', label:'调整状态',type:'select',dataCode:'STD_ZB_ADJ_STATUS'},
//                        {field:'adjComment', label:'调整说明'},
                        {field:'approveStatus', label:'审批状态',type:'select',dataCode:'STD_ZB_APPR_STATUS'},
                        {field:'finalApprvDate', label:'最终审批日期'},
//                        {field:'actDeadline', label:'激活截止日期'},
                        {field:'rejectReason', label:'拒绝调整原因',type:'select',dataCode:'STD_ZB_LMT_REJECT_RSN'},
                        {field:'cusManager', label:'客户经理'},
                        {field:'mainBrId', label:'主管机构'},
                        {field:'legalOrgCode', label:'法人机构'},
                        {field:'createUser', label:'创建人'},
                        {field:'createTime', label:'创建时间'},
                        {field:'lastUpdateUser', label:'最后修改人'},
                        {field:'lastUpdateTime', label:'最后修改时间'}
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
                            url: '/api/lmt/adjust/app',
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
                        url: '/api/lmt/adjust/app',
                        data: {
                            adjSerno: selections[0].adjSerno
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
                }
            }
        });
    };
    // 消息处理
    exports.onmessage = function (type, message) {};
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {}
});
