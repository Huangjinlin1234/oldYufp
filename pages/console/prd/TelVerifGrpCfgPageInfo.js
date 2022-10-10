/**
 * @create by fuzm on 2018-05-08
 * @description 电话核查问题模板组表
 */
define([], function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,COMMON_STATUS,QUESTION_CLASSIFY');
        var _self = yufp.custom.vue({
                el: cite.el,
                data: function () {
                    var _self = this;
                    return {
                        reftableDataUrl: backend.consoleService + '/api/tel/verif/grp/cfgs',
                        detailIdTemp: 0,
                        baseParams: {},
                        pageable: false,
                        queryFields: [
                            {placeholder: '问题模板组名称', field: 'tplGrpName', type: 'input'},
                            {placeholder: '状态', field: 'status', type: 'select', dataCode: 'COMMON_STATUS'}
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
                            {label: '模板组ID', prop: 'tplGrpId', hidden: true, sortable: true, resizable: true},
                            {label: '问题模板组名称', prop: 'tplGrpName', sortable: true, resizable: true},
                            {label: '法人机构代码', prop: 'legalOrgCode', sortable: true, resizable: true},
                            {label: '创建日期', prop: 'createTime', sortable: true, resizable: true},
                            {label: '创建人', prop: 'createUser', sortable: true, resizable: true},
                            {
                                label: '状态',
                                prop: 'status',
                                sortable: true,
                                resizable: true,
                                width: '60px',
                                type: 'select',
                                dataCode: 'COMMON_STATUS'
                            }
                        ],
                        updateFields: [{
                            columnCount: 3,
                            fields: [
                                {
                                    field: 'tplGrpId', label: '模板组ID', hidden: true, placeholder: '自动生成'
                                },
                                {
                                    field: 'tplGrpName', label: '问题模板组名称', rules: [
                                        {max: 100, required: true, message: '必填项,最大长度为100'}
                                    ]
                                },
                                {field: 'legalOrgCode', label: '法人机构代码'},
                                {field: 'status', label: '状态', type: 'select', dataCode: 'COMMON_STATUS'},
                                {field: 'createTime', label: '创建日期'},
                                {field: 'createUser', label: '创建人'},
                                {field: 'lastUpdateTime', label: '最后修改日期'},
                                {field: 'lastUpdateUser', label: '最后修改人'}
                            ]
                        }],
                        height: yufp.frame.size().height - 103,
                        dialogVisible: false,
                        formDisabled: false,
                        viewType: 'DETAIL',
                        viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                        dtlSaveVisible: false,
                        // 详细组
                        dtlButtonVisible: false,
                        dtlAddButtonVisible: false,
                        dtlDtlButtonVisible: false,
                        dtlFormDisabled: false,
                        addDtlVisible: false,
                        detail: {
                            dtlDataUrl: backend.consoleService + '/api/tel/verif/grp/dtls',
                            dtlParams: {},
                            modifyVisible: true,
                            dtltableColumns: [{
                                label: '问题类型',
                                prop: 'questionClassify',
                                dataCode: 'QUESTION_CLASSIFY',
                                sortable: true,
                                resizable: true

                            },
                                {label: '模板组明细ID', prop: 'dtlId', sortable: true, resizable: true, hidden: true},
                                {label: '选择问题条数', prop: 'choiceQuestNum', sortable: true, resizable: true},
                                {
                                    label: '通过率',
                                    prop: 'passRate',
                                    sortable: true,
                                    resizable: true,
                                    formatter: _self.toPercent
                                }
                            ],
                            updateDtlFields: [{
                                columnCount: 2,
                                fields: [
                                    {
                                        field: 'dtlId', label: '模板组明细ID', hidden: true, placeholder: '自动生成'
                                    },
                                    {
                                        label: '问题类型',
                                        field: 'questionClassify',
                                        sortable: true,
                                        resizable: true,
                                        width: '100px',
                                        type: 'select',
                                        dataCode: 'QUESTION_CLASSIFY',
                                        rules: [
                                            {required: true, message: '必填项', trigger: 'blur'}
                                        ]
                                    },
                                    {
                                        field: 'choiceQuestNum', label: '选择问题条数', type: 'num', rules: [
                                            {required: true, message: '必填项', trigger: 'blur', type: 'number'},
                                            {validator: yufp.validator.pInt, message: '请输入正确的数字', trigger: 'blur'}
                                        ]
                                    },
                                    {
                                        field: 'passRate',
                                        label: '通过率',
                                        type: 'num',
                                        formatter: yufp.util.toPercent,
                                        rules: [
                                            {required: true, message: '必填项', trigger: 'blur', type: 'number'},
                                            {validator: yufp.validator.gZero, message: '请输入正确的数字', trigger: 'blur'},
                                            {
                                                validator: function (rule, value, callback) {
                                                    if (parseInt(value) <= 100 && parseInt(value) >= 0) {
                                                        callback();
                                                    } else {
                                                        callback(new Error('请输入正确的范围'));
                                                    }
                                                }, message: '请输入正确的范围', trigger: 'blur'
                                            }

                                        ]
                                    },
                                    {field: 'tplGrpId', label: '模板组ID', hidden: true}
                                ]
                            }
                            ],
                            updateDtlButtons: [
                                {
                                    label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                                        var validate = false;
                                        _self.$refs.dtlForm.validate(function (valid) {
                                            validate = valid;
                                        });
                                        if (!validate) {
                                            return;
                                        }
                                        if (parseInt(model.choiceQuestNum) == 0) {
                                            _self.$message({message: '数量不能为0', type: 'warning'});
                                            return;
                                        }
                                        /*for (i = 0; i < _self.$refs.dtltable.data.length; i++) {
                                          if (model.questionClassify ===
                                                                        _self.$refs.dtltable.data[i].questionClassify
                                          ) {
                                            _self.$message({ message: '问题类型已存在不能重复', type: 'warning' })
                                            return
                                          }
                                        }*/
                                        var add = false;
                                        for (var i = 0; i < _self.$refs.dtltable.data.length; i++) {
                                            if (model.dtlId ===
                                                _self.$refs.dtltable.data[i].dtlId
                                            ) {
                                                _self.$refs.dtltable.data.splice(i, 1);
                                                var tempAdd = {
                                                    dtlId: model.dtlId,
                                                    questionClassify: model.questionClassify,
                                                    choiceQuestNum: model.choiceQuestNum,
                                                    passRate: model.passRate
                                                };
                                                _self.$refs.dtltable.data.push(tempAdd);
                                                add = true;
                                                break;
                                            }
                                        }
                                        if (!add) {
                                            var temp = {
                                                dtlId: model.dtlId,
                                                questionClassify: model.questionClassify,
                                                choiceQuestNum: model.choiceQuestNum,
                                                passRate: model.passRate
                                            };
                                            _self.$refs.dtltable.data.push(temp);
                                        }
                                        //数据致空
                                        _self.$refs.reftable.selections = [];
                                        _self.$refs.dtltable.selections = [];
                                        _self.addDtlVisible = false;
                                    }
                                }, {
                                    label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                        _self.addDtlVisible = false;
                                    }
                                }]
                        }

                    };
                },
                methods:
                    {
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
                            _self.dialogVisible = true;
                        },

                        switchParamsStatus: function () {
                            _self.$refs.reform.switch('status', 'hidden', (_self.viewType != 'DETAIL'));
                            _self.$refs.reform.switch('createTime', 'hidden', (_self.viewType != 'DETAIL'));
                            _self.$refs.reform.switch('createUser', 'hidden', (_self.viewType != 'DETAIL'));
                            _self.$refs.reform.switch('lastUpdateUser', 'hidden', (_self.viewType != 'DETAIL'));
                            _self.$refs.reform.switch('lastUpdateTime', 'hidden', (_self.viewType != 'DETAIL'));
                            _self.$refs.reform.switch('legalOrgCode', 'hidden', (_self.viewType != 'DETAIL'));
                            _self.$refs.reform.rebuildFn();
                        },

                        addFn: function () {
                            var _self = this;
                            _self.switchStatus('ADD', true);
                            _self.$nextTick(function () {
                                _self.pageable = false;
                                _self.switchParamsStatus();
                                _self.dtlAddButtonVisible = true;
                                _self.dtlButtonVisible = true;
                                _self.dtlDtlButtonVisible = false;
                                _self.dtlSaveVisible = true;
                                _self.$refs.dtltable.data = [];
                                _self.$refs.dtltable.total = 0;
                                _self.$refs.reform.resetFn();
                            });
                        },

                        modifyFn: function () {
                            if (this.$refs.reftable.selections.length != 1) {
                                this.$message({message: '请先选择一条记录', type: 'warning'});
                                return;
                            }
                            var obj = this.$refs.reftable.selections[0];
                            if (obj.status != '0') {
                                this.$message({message: '只能修改待生效信息', type: 'warning'});
                                return;
                            }
                            this.switchStatus('EDIT', true);
                            _self.detail.dtlParams = {tplGrpId: obj.tplGrpId};
                            this.$nextTick(function () {
                                _self.pageable = true;
                                _self.switchParamsStatus();
                                _self.dtlAddButtonVisible = true;
                                _self.dtlButtonVisible = true;
                                _self.dtlDtlButtonVisible = true;
                                _self.dtlSaveVisible = true;
                                _self.$refs.dtltable.remoteData();
                                yufp.extend(this.$refs.reform.formModel, obj);
                            });
                        },

                        infoFn: function () {
                            if (this.$refs.reftable.selections.length != 1) {
                                this.$message({message: '请先选择一条记录', type: 'warning'});
                                return;
                            }
                            this.switchStatus('DETAIL', false);
                            var obj = this.$refs.reftable.selections[0];
                            _self.detail.dtlParams = {tplGrpId: obj.tplGrpId};
                            this.$nextTick(function () {
                                _self.pageable = true;
                                _self.switchParamsStatus();
                                _self.dtlAddButtonVisible = false;
                                _self.dtlButtonVisible = false;
                                _self.dtlDtlButtonVisible = true;
                                _self.dtlSaveVisible = false;
                                _self.$refs.dtltable.remoteData();
                                yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0]);
                            });
                        },

                        deleteFn: function () {
                            var _self = this;
                            var selections = _self.$refs.reftable.selections;
                            if (selections.length < 1) {
                                _self.$message({message: '请先选择一条记录', type: 'warning'});
                                return;
                            }
                            var obj = this.$refs.reftable.selections[0];
                            if (obj.status != '0') {
                                this.$message({message: '只能删除待生效信息', type: 'warning'});
                                return;
                            }
                            var len = selections.length;
                            var arr = [];
                            for (var i = 0; i < len; i++) {
                                arr.push(selections[i].tplGrpId);
                            }
                            _self.$confirm('是否删除电核组问题?', '提示', {type: 'warning'}).then(function () {
                                yufp.service.request({
                                    method: 'DELETE',
                                    url: backend.consoleService + '/api/tel/verif/grp/cfg',
                                    data: {
                                        tplGrpId: arr.join(',')
                                    },
                                    callback: function (code, message, response) {
                                        if (code == 0) {
                                            if (response.success) {
                                                _self.$refs.reftable.remoteData();
                                                _self.$message('操作成功');
                                            } else if (response.data == '-2') {
                                                _self.$message('已关联有效产品不能删除');
                                            }
                                        } else {
                                            _self.$message('操作失败');
                                        }
                                    }
                                });
                            });
                        },

                        setStatusFn: function (status) {
                            var model = _self.$refs.reftable.selections[0];
                            if (model != null) {
                                if (status == '2') {
                                    if (model.status == '1') {
                                        _self.$confirm('是否失效电核问题配置?', '提示', {type: 'warning'}).then(function () {
                                            yufp.service.request({
                                                method: 'PUT',
                                                url: backend.consoleService + '/api/tel/verif/grp/cfg/status',
                                                data: {
                                                    'status': yufp.lookup.lookupMgr.COMMON_STATUS[status].enname,
                                                    'tplGrpId': model.tplGrpId
                                                },
                                                callback: function (code, message, response) {
                                                    if (code == 0) {
                                                        if (response.success) {
                                                            _self.$message('操作成功');
                                                        } else if (response.data == '-2') {
                                                            _self.$message({message: '已关联有效产品不能失效', type: 'error'});
                                                        }
                                                        _self.$refs.reftable.remoteData();
                                                    } else if (response.data == '-2') {
                                                        _self.$message('已关联有效产品不能失效');
                                                    } else {
                                                        _self.$message({message: '操作失败', type: 'error'});
                                                    }
                                                }
                                            });
                                        });
                                    } else {
                                        _self.$message({message: '只有生效的才能失效', type: 'warning'});
                                    }
                                } else {
                                    if (model.status == '0') {
                                        _self.$confirm('是否生效电核组配置?', '提示', {type: 'warning'}).then(function () {
                                            yufp.service.request({
                                                method: 'PUT',
                                                url: backend.consoleService + '/api/tel/verif/grp/cfg/status',
                                                data: {
                                                    'status': yufp.lookup.lookupMgr.COMMON_STATUS[status].enname,
                                                    'tplGrpId': model.tplGrpId
                                                },
                                                callback: function (code, message, response) {
                                                    if (code == 0 && response.code == '0') {
                                                        _self.$refs.reftable.remoteData();
                                                        _self.$message('操作成功');
                                                    } else {
                                                        _self.$message({message: '操作失败', type: 'error'});
                                                    }
                                                }
                                            });
                                        });
                                    } else {
                                        _self.$message({message: '只有待生效的才能生效', type: 'warning'});
                                    }
                                }
                            } else {
                                _self.$message({message: '请选择一条记录', type: 'warning'});
                            }
                        },

                        exportFn: function () {
                            yufp.util.exportExcelByTable({
                                fileName: '下载文件',
                                importType: 'service', // page当前页 selected 选中的数据  service 后端数据
                                ref: this.$refs.reftable,
                                url: '',
                                param: {}
                            });
                        },

                        /**
                         * @param viewType 表单类型
                         * @param editable 可编辑,默认false
                         */
                        switchDtlStatus: function (editable) {
                            var _self = this;
                            _self.detail.updateDtlButtons[0].hidden = !editable;
                            _self.dtlFormDisabled = !editable;
                            _self.addDtlVisible = true;
                        },

                        addDtlFn: function () {
                            _self.switchDtlStatus(true);
                            _self.$nextTick(function () {
                                _self.detailIdTemp++;
                                _self.$refs.dtlForm.resetFn();
                                _self.$refs.dtlForm.formModel.dtlId = _self.detailIdTemp;
                            });
                        },

                        editDtlFn: function () {
                            if (this.$refs.dtltable.selections.length != 1) {
                                this.$message({message: '请先选择一条记录', type: 'warning'});
                                return;
                            }
                            _self.switchDtlStatus(true);
                            _self.$nextTick(function () {
                                yufp.extend(_self.$refs.dtlForm.formModel, _self.$refs.dtltable.selections[0]);
                                _self.$refs.dtlForm.rebuildFn();
                            });
                        },

                        infoDtlFn: function () {
                            if (this.$refs.dtltable.selections.length != 1) {
                                this.$message({message: '请先选择一条记录', type: 'warning'});
                                return;
                            }
                            _self.switchDtlStatus(false);
                            _self.$nextTick(function () {
                                yufp.extend(_self.$refs.dtlForm.formModel, _self.$refs.dtltable.selections[0]);
                                _self.$refs.dtlForm.rebuildFn();
                            });
                        },

                        delDtlFn: function () {
                            var selections = _self.$refs.dtltable.selections;
                            if (selections.length != 1) {
                                _self.$message({message: '请先选择一条记录', type: 'warning'});
                                return;
                            }
                            _self.$confirm('是否删除电核明细?', '提示', {type: 'warning'}).then(function () {
                                if (_self.$refs.dtltable.data.length == '1') {
                                    _self.$confirm('至少需要一条明细，确认删除?', '提示', {type: 'warning'}).then(function () {
                                        _self.$refs.dtltable.data.splice(0, 1);
                                    });
                                } else {
                                    _self.$refs.dtltable.data.splice(_self.$refs.dtltable.data.indexOf(selections[0]), 1);
                                }
                            });
                        },

                        saveFn: function () {
                            var model = _self.$refs.reform.formModel;
                            var validate = false;
                            _self.$refs.reform.validate(function (valid) {
                                validate = valid;
                            });
                            if (!validate) {
                                return;
                            }
                            model.telVerifGrpDtlVOList = _self.$refs.dtltable.data;
                            if (model.telVerifGrpDtlVOList == null || model.telVerifGrpDtlVOList.length === 0) {
                                _self.$message({message: '必须有电核明细', type: 'warning'});
                                return;
                            }
                            var rMethod = '';
                            if (_self.viewType == 'EDIT') {
                                rMethod = 'PUT';
                            } else if (_self.viewType == 'ADD') {
                                rMethod = 'POST';
                            }
                            model.telVerifGrpDtlVOList = _self.$refs.dtltable.data;
                            yufp.service.request({
                                method: rMethod,
                                url: backend.consoleService + '/api/tel/verif/grp/cfg',
                                data: model,
                                callback: function (code, message, response) {
                                    if (code == 0 && response.success) {
                                        _self.$refs.reftable.remoteData();
                                        _self.$message('操作成功');
                                        _self.dialogVisible = false;
                                    } else {
                                        if (response.data == '-2')
                                            _self.$message('问题类型存在重复');
                                        else
                                            _self.$message('操作失败');
                                    }
                                }
                            });
                        },

                        cancelDtlFn: function () {
                            _self.dialogVisible = false;
                        },

                        passRateCheck: function (rule, value, callback) {
                            if (parseInt(value) <= 100 && parseInt(value) >= 0) {
                                callback();
                            } else {
                                callback(new Error('请输入正确的范围'));
                            }
                        },
                        toPercent: function (money, num, cellValue) {
                            /*
                              * 参数说明：
                              * money：要格式化的数字
                              * num：保留几位小数
                              * */
//      num = num > 0 && num <= 20 ? num : 2;
                            if (cellValue != null && cellValue != '')
                                cellValue = parseFloat((cellValue + '')) + '%';
                            else
                                cellValue = '';
                            return cellValue;
                        }
                    }
            }
        );
    };

    // 消息处理
    exports.onmessage = function (type, message) {

    };
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {

    };
});

