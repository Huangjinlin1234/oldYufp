/**
 * @create by chenqm1 on 2018-05-08
 * @description 客户联系人信息表
 */
define(function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    dataUrl: backend.cusService + "/api/cus/indiv/rels",
                    baseParams: {},
                    queryFields: [
                        {placeholder: '主键', field: 'relSerno', type: 'input'},
                        {placeholder: '客户编号', field: 'cusId', type: 'input'},
                        {placeholder: '联系人名称', field: 'relName', type: 'input'},
                        {placeholder: '证件类型', field: 'certType', type: 'input'},
                        {placeholder: '证件号码', field: 'certCode', type: 'input'},
                        {placeholder: '国别', field: 'relCountry', type: 'input'},
                        {placeholder: '名族', field: 'relNtn', type: 'input'},
                        {placeholder: '出生日期', field: 'relBirthday', type: 'input'},
                        {placeholder: '户籍地址', field: 'houhRegAddrDtl', type: 'input'},
                        {placeholder: '户籍地址', field: 'houhRegAddrDtl', type: 'input'},
                        {placeholder: '邮政编码', field: 'postCode', type: 'input'},
                        {placeholder: '答复人性别', field: 'relSex', type: 'input'},
                        {placeholder: '年龄', field: 'relAge', type: 'input'},
                        {placeholder: '有效到期日期', field: 'certExpireDate', type: 'input'},
                        {placeholder: '答复人关系', field: 'relation', type: 'input'},
                        {placeholder: '手机', field: 'mobile', type: 'input'},
                        {placeholder: '通讯地址', field: 'postAddr', type: 'input'},
                        {placeholder: '工作单位', field: 'company', type: 'input'},
                        {placeholder: '办公电话', field: 'officePhone', type: 'input'},
                        {placeholder: '创建人', field: 'createUser', type: 'input'},
                        {placeholder: '创建时间', field: 'createTime', type: 'date'},
                        {placeholder: '最后更新人', field: 'lastUpdateUser', type: 'input'},
                        {placeholder: '最后修改时间', field: 'lastUpdateTime', type: 'date'},
                        {placeholder: '发证日期', field: 'issueCertDate', type: 'date'}
                    ],
                    queryButtons: [
                        {
                            label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                                if (valid) {
                                    _self.$refs.reftable.remoteData(model);
                                }
                            }
                        },
                        {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2'}
                    ],

                    tableColumns: [
                        {label: '主键', prop: 'relSerno', sortable: true, resizable: true},
                        {label: '客户编号', prop: 'cusId', sortable: true, resizable: true},
                        {label: '联系人名称', prop: 'relName', sortable: true, resizable: true},
                        {label: '证件类型', prop: 'certType', sortable: true, resizable: true},
                        {label: '证件号码', prop: 'certCode', sortable: true, resizable: true},
                        {label: '国别', prop: 'relCountry', sortable: true, resizable: true},
                        {label: '名族', prop: 'relNtn', sortable: true, resizable: true},
                        {label: '出生日期', prop: 'relBirthday', sortable: true, resizable: true},
                        {label: '户籍地址', prop: 'houhRegAddrDtl', sortable: true, resizable: true},
                        {label: '户籍地址', prop: 'houhRegAddrDtl', sortable: true, resizable: true},
                        {label: '邮政编码', prop: 'postCode', sortable: true, resizable: true},
                        {label: '答复人性别', prop: 'relSex', sortable: true, resizable: true},
                        {label: '年龄', prop: 'relAge', sortable: true, resizable: true},
                        {label: '有效到期日期', prop: 'certExpireDate', sortable: true, resizable: true},
                        {label: '答复人关系', prop: 'relation', sortable: true, resizable: true},
                        {label: '手机', prop: 'mobile', sortable: true, resizable: true},
                        {label: '通讯地址', prop: 'postAddr', sortable: true, resizable: true},
                        {label: '工作单位', prop: 'company', sortable: true, resizable: true},
                        {label: '办公电话', prop: 'officePhone', sortable: true, resizable: true},
                        {label: '创建人', prop: 'createUser', sortable: true, resizable: true},
                        {label: '创建时间', prop: 'createTime', sortable: true, resizable: true},
                        {label: '最后更新人', prop: 'lastUpdateUser', sortable: true, resizable: true},
                        {label: '最后修改时间', prop: 'lastUpdateTime', sortable: true, resizable: true},
                        {label: '发证日期', prop: 'issueCertDate', sortable: true, resizable: true}
                    ],
                    updateFields: [{
                        columnCount: 3,
                        fields: [
                            {field: 'relSerno', label: '主键'},
                            {field: 'cusId', label: '客户编号'},
                            {field: 'relName', label: '联系人名称'},
                            {field: 'certType', label: '证件类型'},
                            {field: 'certCode', label: '证件号码'},
                            {field: 'relCountry', label: '国别'},
                            {field: 'relNtn', label: '名族'},
                            {field: 'relBirthday', label: '出生日期'},
                            {field: 'houhRegAddrDtl', label: '户籍地址'},
                            {field: 'houhRegAddrDtl', label: '户籍地址'},
                            {field: 'postCode', label: '邮政编码'},
                            {field: 'relSex', label: '答复人性别'},
                            {field: 'relAge', label: '年龄'},
                            {field: 'certExpireDate', label: '有效到期日期'},
                            {field: 'relation', label: '答复人关系'},
                            {field: 'mobile', label: '手机'},
                            {field: 'postAddr', label: '通讯地址'},
                            {field: 'company', label: '工作单位'},
                            {field: 'officePhone', label: '办公电话'},
                            {field: 'createUser', label: '创建人'},
                            {field: 'createTime', label: '创建时间'},
                            {field: 'lastUpdateUser', label: '最后更新人'},
                            {field: 'lastUpdateTime', label: '最后修改时间'},
                            {field: 'issueCertDate', label: '发证日期'}
                        ]
                    }],
                    updateButtons: [
                        {
                            label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                _self.dialogVisible = false;
                            }
                        },
                        {
                            label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                                var validate = false;
                                _self.$refs.reform.validate(function (valid) {
                                    validate = valid;
                                });
                                if (!validate) {
                                    return;
                                }

                                var rMethod = '';
                                if (_self.viewType == "EDIT") {
                                    rMethod = 'PUT';
                                } else if (_self.viewType == "ADD") {
                                    rMethod = 'POST';
                                }

                                yufp.service.request({
                                    method: rMethod,
                                    url: backend.cusService + '/api/cus/indiv/rel',
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
                            }
                        }
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
                checkPermission: function (ctrlCode) {
                    return yufp.session.checkCtrl(ctrlCode, cite.menuId);
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
                        this.$message({message: '请先选择一条记录', type: 'warning'});
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
                        this.$message({message: '请先选择一条记录', type: 'warning'});
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
                    if (selections.length == 0) {
                        _self.$message({message: '请先选择要删除的记录', type: 'warning'});
                        return;
                    }
                    var len = selections.length, arr = [];
                    for (var i = 0; i < len; i++) {
                        arr.push(selections[i].relSerno);
                    }

                    yufp.service.request({
                        method: 'DELETE',
                        url: backend.cusService + '/api/cus/indiv/rels',
                        data: {
                            relSerno: arr.join(',')
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
    exports.onmessage = function (type, message) {

    };
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {

    }

});
