/**
 * @create by szbd
 * @description 白名单移交明细表的前端js
 * @createDate 2018-08-02 15:06:19
 */
define(function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        //引入字典项
        yufp.lookup.reg('CRUD_TYPE');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
            var _self = this;
            return {
                baseParams: {
                },
                //搜索条件
                queryFields: [
                    {placeholder: '主键', field: 'id', type: 'input'},
                    {placeholder: '移交申请流水号', field: 'serno', type: 'input'},
                    {placeholder: '客户号', field: 'cusId', type: 'input'},
                    {placeholder: '客户名称', field: 'cusName', type: 'input'},
                    {placeholder: '业务说明', field: 'businessDetail', type: 'input'},
                    {placeholder: '创建时间', field: 'createTime', type: 'input'}
                ],
                queryButtons: [
                    {label:'搜索', op: 'submit', type:'primary', icon:'search', click:function (model, valid) {
                        if (valid) {
                            _self.$refs.reftable.remoteData(model);
                        }
                    }},
                    {label:'重置', op:'reset', type:'primary', icon:'yx-loop2'}
                ],
                tableColumns: [
                    {label:'主键', prop:'id', sortable:true, resizable:true},
                    {label:'移交申请流水号', prop:'serno', sortable:true, resizable:true},
                    {label:'客户号', prop:'cusId', sortable:true, resizable:true},
                    {label:'客户名称', prop:'cusName', sortable:true, resizable:true},
                    {label:'业务说明', prop:'businessDetail', sortable:true, resizable:true},
                    {label:'创建时间', prop:'createTime', sortable:true, resizable:true}
                ],
                updateFields: [{
                    columnCount: 3,
                    fields: [
                        {field:'id', label:'主键'},
                        {field:'serno', label:'移交申请流水号'},
                        {field:'cusId', label:'客户号'},
                        {field:'cusName', label:'客户名称'},
                        {field:'businessDetail', label:'业务说明'},
                        {field:'createTime', label:'创建时间'}
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
                            url: '/api/lmt/prelist/handover/lst',
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
                    var len = selections.length, arr = [];
                    for (var i = 0; i < len; i++) {
                        arr.push(selections[i].legalOrgCode);
                    }
                    yufp.service.request({
                        method: 'DELETE',
                        url: '/api/lmt/prelist/handover/lst',
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
                }
            }
        });
    };
    // 消息处理
    exports.onmessage = function (type, message) {};
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {}
});
