/**
 * @create by fuzm on 2018-05-08
 * @description 利率方案配置表
 */
define([
    './custom/widgets/js/OrgSelector.js'
], function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,COMMON_STATUS,PRICE_MODEL,STD_ZB_EFR_CHNG_IND,STD_ZB_TERM_TYPE,STD_ZB_IREXE_TYPE');
        var _self = yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    reftableDataUrl: backend.consoleService + '/api/rate/scheme/cfgs',
                    detailIdTemp: 0,
                    baseParams: {},
                    pageable: false,
                    queryFields: [
                        {placeholder: '方案名称', field: 'schemeName', type: 'input'},
                        {placeholder: '创建人', field: 'createUser', type: 'input'},
                        {placeholder: '法人机构代码', field: 'legalOrgCode', type: 'custom', is: 'div-org-selector'},
                        {placeholder: '创建日期区间', field: 'createTimeRange', type: 'daterange'},
                        {
                            placeholder: '定价模式', field: 'priceModel', width: '60px',
                            type: 'select',
                            dataCode: 'PRICE_MODEL'
                        },
                        {
                            placeholder: '利率方案状态', field: 'status', width: '60px',
                            type: 'select',
                            dataCode: 'COMMON_STATUS'
                        }
                    ],
                    queryButtons: [
                        {
                            label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                                if (valid) {
                                    if (model.createTimeRange == '')
                                        model.createTimeRange = [];
                                    _self.$refs.reftable.remoteData(model)
                                }
                            }
                        },
                        {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2'}
                    ],

                    tableColumns: [
                        {label: '方案编号', prop: 'schemeNo', sortable: true, resizable: true},
                        {label: '方案名称', prop: 'schemeName', sortable: true, resizable: true},
                        {label: '法人机构代码', prop: 'legalOrgCode', sortable: true, resizable: true},
                        {
                            label: '定价模式', prop: 'priceModel', sortable: true, resizable: true,
                            dataCode: 'PRICE_MODEL'
                        },
                        {
                            label: '单笔支用期限单位',
                            prop: 'singleTermUnit',
                            sortable: true,
                            resizable: true,
                            dataCode: 'STD_ZB_TERM_TYPE'
                        },
                        {prop: 'createUser', label: '创建人'},
                        {prop: 'createTime', label: '创建日期'},
                        {
                            label: '利率方案状态', prop: 'status', sortable: true, resizable: true,
                            dataCode: 'COMMON_STATUS'
                        }/*,
            { label: '生效日期', prop: 'effictiveDate', sortable: true, resizable: true },
            { label: '失效日期', prop: 'expiryDate', sortable: true, resizable: true }*/
                    ],
                    updateFields: [{
                        columnCount: 3,
                        fields: [
                            {field: 'schemeNo', label: '方案编号', disabled: true, placeholder: '系统自动生成', hidden: true},
                            {
                                field: 'schemeName', label: '方案名称', rules: [
                                    {max: 100, required: true, message: '必填项，长度最大100', trigger: 'blur'}
                                ]
                            },
                            {field: 'legalOrgCode', label: '法人机构代码', disabled: true, placeholder: '登录人法人机构'},
                            {
                                field: 'priceModel', label: '定价模式', type: 'select',
                                dataCode: 'PRICE_MODEL',
                                rules: [
                                    {required: true, message: '必填项', trigger: 'blur'}
                                ]
                            },
                            {
                                field: 'singleTermUnit',
                                label: '单笔支用期限单位',
                                type: 'select',
                                dataCode: 'STD_ZB_TERM_TYPE',
                                rules: [
                                    {required: true, message: '必填项', trigger: 'blur'}
                                ]
                            },
                            {
                                field: 'status', label: '利率方案状态',
                                type: 'select',
                                dataCode: 'COMMON_STATUS', rules: [
                                    {required: true, message: '必填项', trigger: 'blur'}
                                ]
                            },
                            {field: 'effictiveDate', label: '生效日期', type: 'date'},
                            {field: 'expiryDate', label: '失效日期', type: 'date'},
                            {field: 'createTime', label: '创建日期'},
                            {field: 'createUser', label: '创建人'},
                            {field: 'lastUpdateUser', label: '最后更新人'},
                            {field: 'lastUpdateTime', label: '最后更新时间'}
                        ]
                    }],
                    height: yufp.frame.size().height - 103,
                    dialogVisible: false,
                    formDisabled: false,
                    viewType: 'DETAIL',
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    dtlSaveVisible: false,
                    // 详细组
                    dtlAddButtonVisible: false,
                    dtlEditButtonVisible: false,
                    dtlDtlButtonVisible: false,
                    dtlDelButtonVisible: false,
                    dtlFormDisabled: false,
                    addDtlVisible: false,
                    dtlReset: true,
                    detail: {
                        dtlDataUrl: backend.consoleService + '/api/rate/scheme/details',
                        dtlParams: {},
                        modifyVisible: true,
                        dtltableColumns: [
                            {label: '单笔支用期限最小值', prop: 'singleTermUnitMin', sortable: true, resizable: true},
                            {label: '单笔支用期限最大值', prop: 'singleTermUnitMax', sortable: true, resizable: true},
                            {
                                label: '利率类型', prop: 'rateModel', sortable: true, resizable: true,
                                dataCode: 'STD_ZB_EFR_CHNG_IND'
                            },
                            {
                                label: '固定利率值(年)',
                                prop: 'fixedRate',
                                sortable: true,
                                type: 'num',
                                formatter: _self.toPercent

                            },
                            {
                                label: '浮动比例(年)',
                                prop: 'floatRate',
                                sortable: true,
                                type: 'num',
                                formatter: _self.toPercent
                            },
                            {prop: 'rateAdjustType', label: '利率调整方式', dataCode: 'STD_ZB_IREXE_TYPE'}
                        ],
                        updateDtlFields: [{
                            columnCount: 2,
                            fields: [
                                {
                                    field: 'detailId', label: '明细ID', hidden: true
                                },
                                {
                                    label: '单笔支用期限最小值',
                                    field: 'singleTermUnitMin',
                                    type: 'num',
                                    rules: [
                                        {
                                            validator: yufp.validator.pInt,
                                            message: '数值要大于0',
                                            type: 'number',
                                            trigger: 'blur'
                                        },
                                        {required: true, message: '必填项', trigger: 'blur', type: 'number'},
                                        {max: 999999999, message: '不能大于10位数', trigger: 'blur', type: 'number'}]
                                },
                                {
                                    field: 'singleTermUnitMax', label: '单笔支用期限最大值', type: 'num', rules: [
                                        {
                                            validator: yufp.validator.pInt,
                                            message: '数值要大于0',
                                            type: 'number',
                                            trigger: 'blur'
                                        },
                                        {required: true, message: '必填项', trigger: 'blur', type: 'number'},
                                        {max: 999999999, message: '不能大于10位数', trigger: 'blur', type: 'number'}
                                    ]
                                },
                                {
                                    field: 'rateModel', label: '利率类型', type: 'select',
                                    dataCode: 'STD_ZB_EFR_CHNG_IND', change: function (fields, value) {
                                        if (fields == '1') {
                                            _self.rateChange()
                                        } else if (fields == '2') {
                                            _self.rateChange2()
                                        }
                                    },
                                    rules: [
                                        {required: true, message: '必填项', trigger: 'blur'}
                                    ]
                                },
                                {
                                    field: 'fixedRate',
                                    label: '固定利率值(年)',
                                    disable: true,
                                    type: 'num', formatter: function (cellValue) {
                                        if (cellValue != null && cellValue != '')
                                            cellValue = parseFloat((cellValue + '')).toFixed(4) + '%';
                                        else
                                            cellValue = '';
                                        return cellValue;
                                    },
                                    rules: [
                                        {validator: yufp.validator.digit, message: '请输入正确的数字', trigger: 'blur'},

                                    ]
                                },
                                {
                                    label: '浮动比例(年)',
                                    field: 'floatRate',
                                    disable: true, type: 'num', formatter: function (cellValue) {
                                        if (cellValue != null && cellValue != '')
                                            cellValue = parseFloat((cellValue + '')).toFixed(4) + '%';
                                        else
                                            cellValue = '';
                                        return cellValue;
                                    },
                                    rules: [
                                        {validator: yufp.validator.digit, message: '请输入正确的数字', trigger: 'blur'}

                                    ]
                                },
                                {field: 'schemeNo', label: '方案编号', hidden: true},
                                {
                                    field: 'rateAdjustType',
                                    label: '利率调整方式',
                                    type: 'select',
                                    dataCode: 'STD_ZB_IREXE_TYPE',
                                    rules: [
                                        {required: true, message: '必填项', trigger: 'blur'}
                                    ]
                                }
                            ]
                        }],
                        updateDtlButtons: [
                            {
                                label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                                    var i;
                                    var validate = false;
                                    _self.$refs.dtlForm.validate(function (valid) {
                                        validate = valid
                                    });
                                    if (!validate) {
                                        return
                                    }
                                    if (parseInt(model.singleTermUnitMin) == 0) {
                                        _self.$message({message: '最小值不能等于0', type: 'warning'});
                                        return
                                    }
                                    if (parseInt(model.singleTermUnitMax) == 0) {
                                        _self.$message({message: '最大值不能等于0', type: 'warning'});
                                        return
                                    }
                                    if (parseInt(model.singleTermUnitMin) > parseInt(model.singleTermUnitMax)) {
                                        _self.$message({message: '最小值不能大于最大值', type: 'warning'});
                                        return
                                    }
                                    var selections = _self.$refs.dtltable.selections;
                                    var tempData = [];
                                    yufp.extend(tempData, _self.$refs.dtltable.data);
                                    /*if (selections != null && selections.length != 0) {
                                        tempData.splice(selections[0].$index, 1)
                                    }*/
                                    /*for (i = 0; i < tempData.length; i++) {
                                        if ((model.singleTermUnitMin in [tempData[i].singleTermUnitMin,tempData[i].singleTermUnitMax ] ||
                                            model.singleTermUnitMax in [tempData[i].singleTermUnitMin,tempData[i].singleTermUnitMax ])&& model.detailId !=
                                            tempData[i].detailId
                                        ) {
                                            _self.$message({message: '该范围与第'+(i+1)+'条数据存在交集', type: 'warning'});
                                            return
                                        }
                                    }*/
                                    //if (model.singleTermUnitMin != null && model.singleTermUnitMin != '')
                                    /*for (i = 0; i < tempData.length; i++) {
                                        if (model.singleTermUnitMin ==
                                            tempData[i].singleTermUnitMin && model.detailId !=
                                            tempData[i].detailId
                                        ) {
                                            _self.$message({message: '最小值已存在不能重复', type: 'warning'});
                                            return
                                        }
                                    }
                                //if (model.singleTermUnitMax != null && model.singleTermUnitMax != '')
                                    for (i = 0; i < tempData.length; i++) {
                                        if ((model.singleTermUnitMax ==
                                            tempData[i].singleTermUnitMax && model.detailId !=
                                            tempData[i].detailId)
                                        ) {
                                            _self.$message({message: '最大值已存在不能重复', type: 'warning'});
                                            return
                                        }
                                    }*/

                                    if (model.fixedRate != null && model.floatRate != null) {
                                        _self.$message({message: '固定利率和浮动利率不能同时存在', type: 'warning'});
                                        return
                                    }


                                    if (model.rateModel == '1') {
                                        if (model.fixedRate == null || model.fixedRate == '') {
                                            _self.$message({message: '请输入固定利率', type: 'warning'});
                                            return
                                        }
                                        else if (model.rateAdjustType != '6') {
                                            _self.$message({message: '固定利率时，利率调整方式只能为"固定不变"', type: 'warning'});
                                            return
                                        }
                                        if (100 <= parseFloat(model.fixedRate) || parseFloat(model.fixedRate) <= 0) {
                                            _self.$message({message: '固定利率范围 0~100 %', type: 'warning'});
                                            return
                                        }
                                    } else if (model.rateModel == '2') {
                                        if (model.floatRate == null || model.floatRate == '') {
                                            _self.$message({message: '请输入浮动利率', type: 'warning'});
                                            return
                                        }
                                        else if (model.rateAdjustType == '6') {
                                            _self.$message({message: '浮动利率时，利率调整方式不能为"固定不变"', type: 'warning'});
                                            return
                                        }
                                        if (-100 >= parseFloat(model.floatRate) || 0 == parseFloat(model.floatRate) || parseFloat(model.floatRate) >= 100) {
                                            _self.$message({message: '浮动利率范围 -100~100 %', type: 'warning'});
                                            return
                                        }
                                    }

                                    var add = false;
                                    /* 获取修改的数据*/
                                    for (i = 0; i < _self.$refs.dtltable.data.length; i++) {
                                        if (model.detailId ===
                                            _self.$refs.dtltable.data[i].detailId
                                        ) {
                                            _self.$refs.dtltable.data.splice(i, 1);
                                            var tempAdd = {
                                                detailId: model.detailId,
                                                singleTermUnitMin: model.singleTermUnitMin,
                                                choiceQuestNum: model.choiceQuestNum,
                                                fixedRate: model.fixedRate,
                                                singleTermUnitMax: model.singleTermUnitMax,
                                                rateModel: model.rateModel,
                                                floatRate: model.floatRate,
                                                rateAdjustType: model.rateAdjustType
                                            };
                                            _self.$refs.dtltable.data.push(tempAdd);
                                            add = true;
                                            break
                                        }
                                    }
                                    if (!add) {
                                        var temp = {
                                            detailId: model.detailId,
                                            singleTermUnitMin: model.singleTermUnitMin,
                                            choiceQuestNum: model.choiceQuestNum,
                                            fixedRate: model.fixedRate,
                                            singleTermUnitMax: model.singleTermUnitMax,
                                            rateModel: model.rateModel,
                                            floatRate: model.floatRate,
                                            rateAdjustType: model.rateAdjustType
                                        };
                                        _self.$refs.dtltable.data.push(temp);
                                    }
                                    _self.addDtlVisible = false;
                                    _self.$refs.dtltable.selections = [];
                                    _self.$refs.reftable.selections = [];

                                }
                            },
                            {
                                label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                    _self.addDtlVisible = false
                                }
                            },
                        ]
                    }
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
                    _self.formDisabled = !editable;
                    _self.dialogVisible = true
                },
                switchParamsStatus: function () {
                    _self.$refs.reform.switch('status', 'hidden', (_self.viewType != 'DETAIL'));
                    _self.$refs.reform.switch('schemeNo', 'hidden', (_self.viewType != 'DETAIL'));
                    _self.$refs.reform.switch('createTime', 'hidden', (_self.viewType != 'DETAIL'));
                    _self.$refs.reform.switch('createUser', 'hidden', (_self.viewType != 'DETAIL'));
                    _self.$refs.reform.switch('lastUpdateUser', 'hidden', (_self.viewType != 'DETAIL'));
                    _self.$refs.reform.switch('lastUpdateTime', 'hidden', (_self.viewType != 'DETAIL'));
                    _self.$refs.reform.switch('legalOrgCode', 'hidden', (_self.viewType != 'DETAIL'));
                    _self.$refs.reform.switch('effictiveDate', 'hidden', (_self.viewType != 'DETAIL'));
                    _self.$refs.reform.switch('expiryDate', 'hidden', (_self.viewType != 'DETAIL'));
                    _self.$refs.reform.rebuildFn()
                },
                addFn: function () {
                    var _self = this;
                    _self.switchStatus('ADD', true);
                    _self.$nextTick(function () {
                        _self.pageable = false;
                        _self.switchParamsStatus();
                        _self.dtlAddButtonVisible = true;
                        _self.dtlEditButtonVisible = false;
                        _self.dtlDtlButtonVisible = false;
                        _self.dtlDelButtonVisible = true;
                        _self.dtlSaveVisible = true;
                        _self.$refs.dtltable.data = [];
                        _self.$refs.dtltable.total = 0;
                        _self.$refs.reform.resetFn()
                    })
                },
                modifyFn: function () {
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({message: '请先选择一条记录', type: 'warning'});
                        return
                    }
                    var obj = this.$refs.reftable.selections[0];
                    if (obj.status != '0') {
                        this.$message({message: '只能修改待生效信息', type: 'warning'});
                        return
                    }
                    this.switchStatus('EDIT', true);
                    _self.detail.dtlParams = {schemeNo: obj.schemeNo};
                    this.$nextTick(function () {
                        _self.pageable = true;
                        _self.switchParamsStatus();
                        _self.dtlAddButtonVisible = true;
                        _self.dtlEditButtonVisible = true;
                        _self.dtlDtlButtonVisible = true;
                        _self.dtlDelButtonVisible = true;
                        _self.dtlSaveVisible = true;
                        _self.$refs.dtltable.remoteData();
                        yufp.extend(this.$refs.reform.formModel, obj)
                    })
                },
                infoFn: function () {
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({message: '请先选择一条记录', type: 'warning'});
                        return
                    }
                    this.switchStatus('DETAIL', false);
                    var obj = this.$refs.reftable.selections[0];
                    _self.detail.dtlParams = {schemeNo: obj.schemeNo};
                    this.$nextTick(function () {
                        _self.pageable = true;
                        _self.switchParamsStatus();
                        _self.dtlAddButtonVisible = false;
                        _self.dtlEditButtonVisible = false;
                        _self.dtlDtlButtonVisible = true;
                        _self.dtlDelButtonVisible = false;
                        _self.dtlSaveVisible = false;
                        _self.$refs.dtltable.remoteData();
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
                    if (obj.status != '0') {
                        this.$message({message: '只能删除待生效信息', type: 'warning'});
                        return
                    }
                    var len = selections.length;
                    var arr = [];
                    for (var i = 0; i < len; i++) {
                        arr.push(selections[i].schemeNo)
                    }
                    _self.$confirm('是否删除利率方案配置?', '提示', {type: 'warning'}).then(function () {
                        yufp.service.request({
                            method: 'DELETE',
                            url: backend.consoleService + '/api/rate/scheme/cfg',
                            data: {
                                schemeNo: arr.join(',')
                            },
                            callback: function (code, message, response) {
                                if (code == 0) {
                                    if (response.success) {
                                        _self.$refs.reftable.remoteData();
                                        _self.$message('操作成功')
                                    } else if (response.data == '-2') {
                                        _self.$message('已关联有效产品不能删除')
                                    }
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
                            if (model.status == '1') {
                                _self.$confirm('是否失效利率方案配置?', '提示', {type: 'warning'}).then(function () {
                                    yufp.service.request({
                                        method: 'PUT',
                                        url: backend.consoleService + '/api/rate/scheme/cfg/status',
                                        data: {
                                            'status': yufp.lookup.lookupMgr.COMMON_STATUS[status].enname,
                                            'schemeNo': model.schemeNo
                                        },
                                        callback: function (code, message, response) {
                                            if (code == 0) {
                                                if (response.success) {
                                                    _self.$message('操作成功')
                                                } else if (response.data == '-2') {
                                                    _self.$message({message: '已关联有效产品不能失效', type: 'error'})
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
                        } else {
                            if (model.status == '0') {
                                _self.$confirm('是否生效利率方案配置?', '提示', {type: 'warning'}).then(function () {
                                    yufp.service.request({
                                        method: 'PUT',
                                        url: backend.consoleService + '/api/rate/scheme/cfg/status',
                                        data: {
                                            'status': yufp.lookup.lookupMgr.COMMON_STATUS[status].enname,
                                            'schemeNo': model.schemeNo
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
                                });
                            } else {
                                _self.$message({message: '只有待生效的才能生效'})
                            }
                        }
                    } else _self.$message({message: '请选择一条记录', type: 'warning'})
                },
                /**
                 * @param viewType 表单类型
                 * @param editable 可编辑,默认false
                 */
                switchDtlStatus: function (editable) {
                    var _self = this;
                    _self.detail.updateDtlButtons[0].hidden = !editable;
                    _self.dtlFormDisabled = !editable;
                    _self.addDtlVisible = true
                },
                addDtlFn: function () {
                    _self.switchDtlStatus(true);
                    _self.$nextTick(function () {
                        _self.detailIdTemp++;
                        _self.$refs.dtlForm.resetFields();
                        _self.$refs.dtlForm.switch('floatRate', 'disabled', true);
                        _self.$refs.dtlForm.switch('fixedRate', 'disabled', true);
                        _self.detail.updateDtlFields[0].fields[4].disabled = true;
                        _self.detail.updateDtlFields[0].fields[4].calcDisabled = true;
                        _self.detail.updateDtlFields[0].fields[5].disabled = true;
                        _self.detail.updateDtlFields[0].fields[5].calcDisabled = true;
                        _self.$refs.dtlForm.$refs.floatRate[0].setCurrentValue('');
                        _self.$refs.dtlForm.$refs.fixedRate[0].setCurrentValue('');
                        _self.$refs.dtlForm.rebuildFn();
                        _self.$refs.dtlForm.formModel.detailId = _self.detailIdTemp
                    })
                },
                editDtlFn: function () {
                    if (this.$refs.dtltable.selections.length != 1) {
                        this.$message({message: '请先选择一条记录', type: 'warning'});
                        return
                    }
                    _self.switchDtlStatus(true);
                    _self.$nextTick(function () {

                        yufp.extend(_self.$refs.dtlForm.formModel, _self.$refs.dtltable.selections[0]);
                        if (_self.$refs.dtlForm.formModel.rateModel == '1') {
                            _self.$refs.dtlForm.switch('floatRate', 'disabled', true);
                            _self.$refs.dtlForm.switch('fixedRate', 'disabled', false)
                        } else {
                            _self.$refs.dtlForm.switch('floatRate', 'disabled', false);
                            _self.$refs.dtlForm.switch('fixedRate', 'disabled', true)
                        }
                        _self.$refs.dtlForm.rebuildFn();
                    })
                },
                infoDtlFn: function () {
                    if (this.$refs.dtltable.selections.length != 1) {
                        this.$message({message: '请先选择一条记录', type: 'warning'});
                        return
                    }

                    _self.switchDtlStatus(false);
                    _self.$nextTick(function () {
                        yufp.extend(_self.$refs.dtlForm.formModel, _self.$refs.dtltable.selections[0])
                        _self.$refs.dtlForm.rebuildFn();
                    })
                },
                delDtlFn: function () {
                    var selections = _self.$refs.dtltable.selections;
                    if (selections.length != 1 ) {
                        _self.$message({message: '请先选择一条记录', type: 'warning'});
                        return
                    }

                    _self.$confirm('是否删除利率明细?', '提示', {type: 'warning'}).then(function () {
                        if (_self.$refs.dtltable.data.length == '1') {
                            _self.$confirm('至少需要一条明细，确认删除?', '提示', {type: 'warning'}).then(function () {
                                _self.$refs.dtltable.data.splice(0, 1)
                            })
                        } else {
                            var temp = _self.$refs.dtltable.data.indexOf(selections[0]);
                            _self.$refs.dtltable.data.splice( temp, 1)
                        }
                    })
                },
                saveFn: function (status) {
                    var model = _self.$refs.reform.formModel;
                    var validate = false;
                    _self.$refs.reform.validate(function (valid) {
                        validate = valid
                    });
                    if (!validate) {
                        return
                    }
                    /*var startTime = new Date(Date.parse(model.effictiveDate))
                    var endTime = new Date(Date.parse(model.expiryDate))
                    if (startTime > endTime) {
                      _self.$message({ message: '开始时间不能大于结束时间', type: 'warning' })
                      return
                    }*/
                    model.rateSchemeDetailVOLIst = _self.$refs.dtltable.data;
                    if (model.rateSchemeDetailVOLIst == null || model.rateSchemeDetailVOLIst.length === 0) {
                        _self.$message({message: '必须有方案明细', type: 'warning'});
                        return
                    }
                    for (var i = 0; i < model.rateSchemeDetailVOLIst.length; i++) {
                        if (model.rateSchemeDetailVOLIst[i].fixedRate != null && model.rateSchemeDetailVOLIst[i].fixedRate != '') {
                            model.rateSchemeDetailVOLIst[i].fixedRate = model.rateSchemeDetailVOLIst[i].fixedRate / 100
                        }
                        if (model.rateSchemeDetailVOLIst[i].floatRate != null && model.rateSchemeDetailVOLIst[i].floatRate != '') {
                            model.rateSchemeDetailVOLIst[i].floatRate = model.rateSchemeDetailVOLIst[i].floatRate / 100
                        }
                    }
                    if (status) model.status = '1';
                    else model.status = '0';
                    var rMethod = '';
                    if (_self.viewType == 'EDIT') {
                        rMethod = 'PUT'
                    } else if (_self.viewType == 'ADD') {
                        rMethod = 'POST'
                    }

                    yufp.service.request({
                        method: rMethod,
                        url: backend.consoleService + '/api/rate/scheme/cfg',
                        data: model,
                        callback: function (code, message, response) {
                            if (code == 0 && response.success) {
                                _self.$refs.reftable.remoteData();
                                _self.$message('操作成功');
                                _self.dialogVisible = false
                            } else {
                                for (var i = 0; i < model.rateSchemeDetailVOLIst.length; i++) {
                                    if (model.rateSchemeDetailVOLIst[i].fixedRate != null && model.rateSchemeDetailVOLIst[i].fixedRate != '') {
                                        model.rateSchemeDetailVOLIst[i].fixedRate = model.rateSchemeDetailVOLIst[i].fixedRate * 100
                                    }
                                    if (model.rateSchemeDetailVOLIst[i].floatRate != null && model.rateSchemeDetailVOLIst[i].floatRate != '') {
                                        model.rateSchemeDetailVOLIst[i].floatRate = model.rateSchemeDetailVOLIst[i].floatRate * 100
                                    }
                                }
                                if (response.data == -2)
                                    _self.$message('明细列表中有区间存在交叉');
                                else {

                                    _self.$message('操作失败')
                                }
                            }
                        }
                    })
                },
                cancelDtlFn: function () {
                    _self.dialogVisible = false
                },
                passRateCheck: function (rule, value, callback) {
                    if (parseInt(value) <= 100 && parseInt(value) >= 0) {
                        callback()
                    } else {
                        callback(new Error('请输入正确的范围'))
                    }
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
                rateChange: function () {
                    _self.detail.updateDtlFields[0].fields[4].disabled = false;
                    _self.detail.updateDtlFields[0].fields[4].calcDisabled = false;
                    _self.detail.updateDtlFields[0].fields[5].disabled = true;
                    _self.detail.updateDtlFields[0].fields[5].calcDisabled = true;
                    _self.$refs.dtlForm.$refs.floatRate[0].setCurrentValue(null);
                    _self.$refs.dtlForm.$refs.fixedRate[0].setCurrentValue(null);
                    _self.$refs.dtlForm.formModel.floatRate = null;
                    _self.$refs.dtlForm.formModel.rateAdjustType = '6';
                    _self.detail.updateDtlFields[0].fields[7].disabled = true;
                    _self.detail.updateDtlFields[0].fields[7].calcDisabled = true;
                    _self.$refs.dtlForm.rebuildFn();

                },
                rateChange2: function () {
                    _self.detail.updateDtlFields[0].fields[4].disabled = true;
                    _self.detail.updateDtlFields[0].fields[4].calcDisabled = true;
                    _self.detail.updateDtlFields[0].fields[5].disabled = false;
                    _self.detail.updateDtlFields[0].fields[5].calcDisabled = false;
                    _self.$refs.dtlForm.$refs.floatRate[0].setCurrentValue(null);
                    _self.$refs.dtlForm.$refs.fixedRate[0].setCurrentValue(null);
                    _self.$refs.dtlForm.formModel.fixedRate = null;
                    _self.$refs.dtlForm.formModel.rateAdjustType = '0';
                    _self.detail.updateDtlFields[0].fields[7].disabled = false;
                    _self.detail.updateDtlFields[0].fields[7].calcDisabled = false;
                    _self.$refs.dtlForm.rebuildFn();

                },
                toPercent: function (money, num, cellValue) {
                    /*
                      * 参数说明：
                      * money：要格式化的数字
                      * num：保留几位小数
                      * */
//      num = num > 0 && num <= 20 ? num : 2;
                    if (cellValue != null && cellValue != '')
                        cellValue = parseFloat((cellValue + '')).toFixed(4) + '%';
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
