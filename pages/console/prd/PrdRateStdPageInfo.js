/**
 * @create by fuzm on 2018-05-10
 * @description 利率配置表
 */
define(function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,STD_ZX_CUR_TYPE,STD_ZB_RATE_TYPE,STD_ZB_RATE_BASE,STD_ZX_YES_NO');
        var _self = yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    dataUrl: backend.consoleService + '/api/prd/rate/stds',
                    baseParams: {},
                    queryFields: [
                        {placeholder: '是否启用', field: 'usedInd', type: 'select',dataCode: 'STD_ZX_YES_NO'},
                        {placeholder: '利率类型', field: 'rateTypeName', type: 'select', dataCode: 'STD_ZB_RATE_TYPE'}
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
                        {label: '利率类型代码', prop: 'rateTypeId', sortable: true, resizable: true, hidden: true},
                        {
                            label: '利率类型',
                            prop: 'rateTypeName',
                            sortable: true,
                            resizable: true,
                            dataCode: 'STD_ZB_RATE_TYPE'
                        },
                        {
                            label: '利率基准',
                            prop: 'rateDatum',
                            sortable: true,
                            resizable: true,
                            dataCode: 'STD_ZB_RATE_BASE'
                        },
                        {label: '币种', prop: 'currencyCd', sortable: true, resizable: true, dataCode: 'STD_ZX_CUR_TYPE'},
                        {label: '最小期限(月)', prop: 'termMin', sortable: true, resizable: true},
                        {label: '最大期限(月)', prop: 'termMax', sortable: true, resizable: true},
                        {label: '利率(年)', prop: 'rate', sortable: true, resizable: true,formatter:_self.toPercent },
                        {label: '生效日期', prop: 'validDate', sortable: true, resizable: true},
                        {label: '是否启用', prop: 'usedInd', sortable: true, resizable: true, dataCode: 'STD_ZX_YES_NO'}
                    ],
                    updateFields: [{
                        columnCount: 3,
                        fields: [
                            {
                                field: 'rateTypeId', label: '利率类型代码', width: '120px', type: 'num',
                                rules: [
                                    {validator: yufp.validator.gZero, message: '请输入正确的数', trigger: 'blur'}
                                ]
                            },
                            {
                                field: 'rateTypeName',
                                label: '利率类型',
                                type: 'select',
                                dataCode: 'STD_ZB_RATE_TYPE',
                                rules: [
                                    {required: true, message: '必填项', trigger: 'blur'}
                                ]
                            },
                            {
                                field: 'rateDatum',
                                label: '利率基准',
                                type: 'select',
                                dataCode: 'STD_ZB_RATE_BASE',
                                rules: [
                                    {required: true, message: '必填项', trigger: 'blur'}
                                ]
                            },
                            {
                                field: 'currencyCd', label: '币种', type: 'select', dataCode: 'STD_ZX_CUR_TYPE', rules: [
                                    {required: true, message: '必填项', trigger: 'blur'}
                                ]
                            },
                            {
                                field: 'termMin', label: '最小期限(月)', type: 'num', rules: [
                                    {required: true, message: '必填项', trigger: 'blur', type: 'number'},
                                    {validator: _self.checkZeroPInt, message: '请输入零或正整数', trigger: 'blur'}
                                ]
                            },
                            {
                                field: 'termMax', label: '最大期限(月)', type: 'num', rules: [
                                    {required: true, message: '必填项', trigger: 'blur', type: 'number'},
                                    {validator: _self.checkZeroPInt, message: '请输入零或正整数', trigger: 'blur'}
                                ]
                            },
                            {
                                field: 'rate',
                                label: '利率(年)',
                                type: 'num',
                                rules: [
                                    {required: true, message: '必填项', trigger: 'blur', type: 'number'},
                                    {validator: yufp.validator.gZero, message: '请输入正确的小数', trigger: 'blur'}
                                ],
                                formatter: function (cellValue) {
                                    if (cellValue != null && cellValue != '')
                                        cellValue = parseFloat((cellValue + '')).toFixed(4) + '%';
                                    else
                                        cellValue = '';
                                    return cellValue;
                                }
                            },
                            {
                                field: 'validDate',
                                label: '生效日期',
                                type: 'date'
                            },
                            {
                                field: 'usedInd', label: '是否启用', type: 'select', dataCode: 'STD_ZX_YES_NO', rules: [
                                    {required: true, message: '必填项', trigger: 'blur'}
                                ]
                            },
                            {field: 'createTime', label: '创建日期'},
                            {field: 'createUser', label: '创建人'},
                            {field: 'lastUpdateUser', label: '最后修改人'},
                            {field: 'lastUpdateTime', label: '最后修改日期'}
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
                                if (model.rateTypeId==null || model.rateTypeId== '') {
                                    _self.$message({message: '代码不能为空', type: 'warning'});
                                    return
                                }
                                if (parseFloat(model.rate) == 0) {
                                    _self.$message({message: '利率不能为0', type: 'warning'});
                                    return
                                }
                                model.rate = model.rate/100;
                                if (0 >= parseFloat(model.rate) || 1 <= parseFloat(model.rate)) {
                                    _self.$message({message: '利率范围 0~1', type: 'warning'});
                                    return
                                }
                                if (parseInt(model.termMin) > parseInt(model.termMax)) {
                                    _self.$message({message: '最小值不能大于最大值', type: 'warning'});
                                    return
                                }
                                var rMethod = '';
                                if (_self.viewType == 'EDIT') {
                                    rMethod = 'PUT'
                                } else if (_self.viewType == 'ADD') {
                                    rMethod = 'POST'
                                }

                                yufp.service.request({
                                    method: rMethod,
                                    url: backend.consoleService + '/api/prd/rate/std',
                                    data: model,
                                    callback: function (code, message, response) {
                                        if (code == 0 && response.code == '0') {
                                            _self.$refs.reftable.remoteData();
                                            _self.$message('操作成功');
                                            _self.dialogVisible = false
                                        } else if (response && response.data == -2) {
                                            _self.$message({message: '利率类型代码不能超过4位', type: 'warning'});
                                        } else {
                                            _self.$message('操作失败')
                                        }
                                    }
                                })
                            }
                        },
                        {
                            label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                _self.dialogVisible = false;
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
                    _self.updateButtons[0].hidden = !editable;
                    _self.formDisabled = !editable;
                    _self.dialogVisible = true
                },
                switchParamsStatus: function () {
                    _self.$refs.reform.switch('createTime', 'hidden', (_self.viewType != 'DETAIL'));
                    _self.$refs.reform.switch('createUser', 'hidden', (_self.viewType != 'DETAIL'));
                    _self.$refs.reform.switch('lastUpdateUser', 'hidden', (_self.viewType != 'DETAIL'));
                    _self.$refs.reform.switch('lastUpdateTime', 'hidden', (_self.viewType != 'DETAIL'));
                    _self.$refs.reform.switch('validDate', 'hidden', (_self.viewType != 'DETAIL'));
                    if (_self.viewType != 'ADD')
                        _self.$refs.reform.switch('rateTypeId', 'disabled', true);
                    else
                        _self.$refs.reform.switch('rateTypeId', 'disabled', false);
                    _self.$refs.reform.rebuildFn()
                },
                addFn: function () {
                    var _self = this;
                    _self.switchStatus('ADD', true);
                    _self.$nextTick(function () {
                        _self.switchParamsStatus();
                        _self.$refs.reform.$refs.termMin[0].setCurrentValue('');
                        _self.$refs.reform.$refs.termMax[0].setCurrentValue('');
                        _self.$refs.reform.$refs.rate[0].setCurrentValue('');
                        _self.$refs.reform.$refs.rateTypeId[0].setCurrentValue('');
                        _self.$refs.reform.resetFn();
//              _self.$refs.reform.formModel.usedInd = '1';
                    })
                },
                modifyFn: function () {
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({message: '请先选择一条记录', type: 'warning'});
                        return
                    }
                    /*var obj = this.$refs.reftable.selections[0]
                    if (obj.status != '0') {
                      this.$message({ message: '生效失效信息不能修改', type: 'warning' })
                      return
                    }*/
                    this.switchStatus('EDIT', true);
                    this.$nextTick(function () {
                        _self.switchParamsStatus();
                        var obj = this.$refs.reftable.selections[0];
                        yufp.extend(this.$refs.reform.formModel, obj)
                    })
                },
                infoFn: function () {
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({message: '请先选择一条记录', type: 'warning'});
                        return
                    }
                    this.switchStatus('DETAIL', false);
                    this.$nextTick(function () {
                        _self.switchParamsStatus();
                        yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0])
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
                    if (obj.usedInd != '2') {
                        this.$message({message: '启用的信息不能删除', type: 'warning'});
                        return
                    }
                    var len = selections.length;
                    var arr = [];
                    for (var i = 0; i < len; i++) {
                        arr.push(selections[i].rateTypeId)
                    }
                    _self.$confirm('是否删除利率配置?', '提示', {type: 'warning'}).then(function () {
                        yufp.service.request({
                            method: 'DELETE',
                            url: backend.consoleService + '/api/prd/rate/std',
                            data: {
                                rateTypeId: arr.join(',')
                            },
                            callback: function (code, message, response) {
                                if (code == 0 && response.code == '0') {
                                    _self.$refs.reftable.remoteData();
                                    _self.$message('操作成功')
                                } else {
                                    _self.$message('操作失败')
                                }
                            }
                        })
                    })
                },
                setStatusFn: function (status) {
                    var model = _self.$refs.reftable.selections[0];
                    if (model != null) {
                        if (status == '2') {
                            if (model.usedInd == '1') {
                                _self.$confirm('是否失效利率配置?', '提示', {type: 'warning'}).then(function () {
                                    yufp.service.request({
                                        method: 'PUT',
                                        url: backend.consoleService + '/api/prd/rate/std/status',
                                        data: {
                                            'usedInd': status,
                                            'rateTypeId': model.rateTypeId
                                        },
                                        callback: function (code, message, response) {
                                            if (code == 0) {
                                                if (response.success) {
                                                    _self.$message('操作成功')
                                                } else if (response.data == '-2') {
                                                    _self.$message({message: '失效不能再失效', type: 'error'})
                                                }
                                                _self.$refs.reftable.remoteData()
                                            } else {
                                                _self.$message({message: '操作失败', type: 'error'})
                                            }
                                        }
                                    })
                                })
                            } else {
                                _self.$message({message: '只有生效的才能失效'})
                            }
                        }
                    } else _self.$message({message: '请选择一条记录', type: 'warning'})
                },
                exportFn: function () {
                    yufp.util.exportExcelByTable({
                        fileName: '下载文件',
                        importType: 'service', // page当前页 selected 选中的数据  service 后端数据
                        ref: this.$refs.reftable,
                        url: '',
                        param: {}
                    })
                },
                checkZeroPInt: function (rule, value, callback) {
                    var reg = /^\+?[0-9]*$/;
                    if (value && reg.test(value)) {
                        callback()
                    } else if (value && !reg.test(value)) {
                        callback(new Error(''))
                    } else {
                        callback()
                    }
                },
                toPercent : function (money, num, cellValue) {
                    /*
                      * 参数说明：
                      * money：要格式化的数字
                      * num：保留几位小数
                      * */
//      num = num > 0 && num <= 20 ? num : 2;
                    if (cellValue != null && cellValue != '')
                        cellValue = parseFloat((cellValue + '')).toFixed(4)  + '%';
                    else
                        cellValue = '';
                    return cellValue;
                }
            }
        })
    };
    // 消息处理
    exports.onmessage = function (type, message) {

    };
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {

    }
});
