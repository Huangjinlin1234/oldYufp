/**
 * @create by szbd
 * @description 提额系数配置表的前端js
 * @createDate 2018-09-17 15:10:09
 */
define(function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        //引入字典项
        yufp.lookup.reg('CRUD_TYPE,STD_ZB_REG_TYPE_REVENUE');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
            var _self = this;
            return {
            	dataUrl:backend.consoleService+'/api/prd/coeff/cfgs',
                baseParams: {
                },
                //搜索条件
                queryFields: [
                    {placeholder: '单位注册类型', field: 'typeId', type: 'select',dataCode:'STD_ZB_REG_TYPE_REVENUE'},
//                    {placeholder: '系数', field: 'coefficient', type: 'input'},
//                    {placeholder: '调整次数', field: 'changeNum', type: 'input'},
//                    {placeholder: '机构法人代码', field: 'legalOrgCode', type: 'input'},
//                    {placeholder: '创建日期', field: 'createTime', type: 'input'},
//                    {placeholder: '创建人', field: 'createUser', type: 'input'},
//                    {placeholder: '创建人所属机构', field: 'createOrgCode', type: 'input'},
//                    {placeholder: '最后修改日期', field: 'lastUpdateTime', type: 'input'},
//                    {placeholder: '最后修改人', field: 'lastUpdateUser', type: 'input'}
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
                    {label:'单位注册类型', prop:'typeId', sortable:true, resizable:true,dataCode:'STD_ZB_REG_TYPE_REVENUE'},
                    {label:'系数', prop:'coefficient', sortable:true, resizable:true},
                    {label:'调整次数', prop:'changeNum', sortable:true, resizable:true},
                    {label:'法人机构', prop:'legalOrgCode', sortable:true, resizable:true,hidden:true},
                    {label:'法人机构', prop:'legalOrgCodeName', sortable:true, resizable:true},
//                    {label:'创建日期', prop:'createTime', sortable:true, resizable:true},
//                    {label:'创建人', prop:'createUser', sortable:true, resizable:true},
//                    {label:'创建人所属机构', prop:'createOrgCode', sortable:true, resizable:true},
                    {label:'最后修改日期', prop:'lastUpdateTime', sortable:true, resizable:true}
//                    {label:'最后修改人', prop:'lastUpdateUser', sortable:true, resizable:true}
                ],
                updateFields: [{
                    columnCount: 3,
                    fields: [
                        {field:'typeId', label:'类型代码'},
                        {field:'coefficient', label:'系数'},
                        {field:'changeNum', label:'调整次数'},
                        {field:'legalOrgCode', label:'机构法人代码'},
                        {field:'createUser', label:'创建人'},
                        {field:'createTime', label:'创建日期'},
                        {field:'createOrgCode', label:'创建人所属机构'},
                        {field:'lastUpdateUser', label:'最后修改人'},
                        {field:'lastUpdateTime', label:'最后修改日期'}
                    ]
                }],
                updateButtons: [
                    {label:'返回', type:'primary', icon:'yx-undo2', hidden:false, click:function (model) {
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
                            url: '/api/coeff/cfg',
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
                        url: '/api/coeff/cfg',
                        data: {
                            typeId: selections[0].typeId,
                            legalOrgCode: selections[0].legalOrgCode
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
