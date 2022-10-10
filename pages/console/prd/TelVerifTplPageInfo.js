/**
 * @create by fuzm on 2018-05-08
 * @description 电话核查问题模板表
 */
define(['./custom/widgets/js/DicSelecter.js', './custom/widgets/js/LegalOrgSelector.js'],
    function (require, exports) {
        // page加载完成后调用ready方法
        exports.ready = function (hashCode, data, cite) {
            /*
                        yufp.lookup.reg('CRUD_TYPE,QUESTION_CLASSIFY,QUESTION_TYPE,COMMON_STATUS,QUESTION_OPT,QT_ANSWER_CORT')
            */
            yufp.lookup.reg('CRUD_TYPE,QUESTION_CLASSIFY,QUESTION_TYPE,COMMON_STATUS,QUESTION_OPT,STD_ZX_YES_NO');
            var _self = yufp.custom.vue({
                el: cite.el,
                data: function () {
                    var _self = this;
                    return {
                        reftableDataUrl: backend.consoleService + '/api/tel/verif/tpls',
                        baseParams: {},
                        answerCort: [],
                        queryFields: [
                            {
                                placeholder: '问题分类', field: 'questionClassify', type: 'select',
                                dataCode: 'QUESTION_CLASSIFY'
                            },
                            {
                                placeholder: '状态', field: 'status', type: 'select',
                                dataCode: 'COMMON_STATUS'
                            },
                            {
                                placeholder: '问题内容', field: 'questionInfo', type: 'input'
                            },
                            {
                                placeholder: '机构', field: 'legalOrgCode', type: 'custom', is: 'div-degal-org-selector'
                            }
                        ],
                        queryButtons: [
                            {
                                label: '查询',
                                op: 'submit',
                                type: 'primary',
                                icon: 'search',
                                click: function (model, valid) {
                                    if (valid) {
                                        _self.$refs.reftable.remoteData(model);
                                    }
                                }
                            },
                            {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2'}
                        ],

                        tableColumns: [
                            {label: '模板ID', prop: 'questionCode', sortable: true, resizable: true, hidden: true},
                            {label: '法人机构代码', prop: 'legalOrgCode', sortable: true, resizable: true},
                            {
                                label: '问题分类',
                                prop: 'questionClassify',
                                sortable: true,
                                resizable: true,
                                dataCode: 'QUESTION_CLASSIFY'
                            },
                            {
                                label: '问题类型',
                                prop: 'questionType',
                                sortable: true,
                                resizable: true,
                                width: '100px',
                                dataCode: 'QUESTION_TYPE'

                            },
                            {
                                label: '问题选项',
                                prop: 'questionOpt',
                                sortable: true,
                                resizable: true,
                                dataCode: 'QUESTION_OPT'
                            },
                            {label: '问题答案获取类', prop: 'qtAnswerCls', sortable: true, resizable: true, hidden: true},
                            {label: '正确答案类型判断', prop: 'telVerifyAnswerType', sortable: true, resizable: true},
                            {
                                label: '问题正确答案',
                                prop: 'qtAnswerCort',
                                sortable: true,
                                resizable: true,
                                dataCode: 'STD_ZX_YES_NO'
                            },
                            {label: '问题内容', prop: 'questionInfo', sortable: true, resizable: true},
                            {label: '状态', prop: 'status', sortable: true, resizable: true, dataCode: 'COMMON_STATUS'}
                        ],
                        updateFields: [{
                            columnCount: 2,
                            fields: [
                                {
                                    field: 'legalOrgCode', label: '法人机构代码'
                                },
                                {
                                    field: 'questionClassify',
                                    label: '问题分类',
                                    type: 'select',
                                    dataCode: 'QUESTION_CLASSIFY',
                                    rules: [{required: true, message: '必选项', trigger: 'blur'}]
                                },
                                {
                                    field: 'questionType',
                                    label: '问题类型',
                                    type: 'select',
                                    dataCode: 'QUESTION_TYPE',
                                    disabled: true,
                                    rules: [{required: true, message: '必选项', trigger: 'blur'}]
                                }]
                        },
                            {
                                columnCount: 1,
                                fields: [
                                    {
                                        field: 'questionInfo',
                                        label: '问题内容',
                                        type: 'textarea',
                                        rules: [{required: true, max: 300, message: '必填项，最大长度为300', trigger: 'blur'}]
                                    },
                                    {
                                        field: 'questionDesc',
                                        label: '问题描述',
                                        type: 'textarea',
                                        rules: [{max: 300, message: '最大长度为300', trigger: 'blur'},
                                            {required: true, message: '必选项', trigger: 'blur'}]
                                    }]
                            },
                            {
                                columnCount: 2,
                                fields: [
                                    {
                                        field: 'questionOpt',
                                        label: '问题选项',
                                        type: 'input',
                                        disabled: true,
                                        //一期默认选择
                                        rules: [{required: true, message: '必选项', trigger: 'blur'}]
                                    },
                                    {
                                        field: 'qtAnswerCort',
                                        label: '问题正确答案',
                                        type: 'select',
                                        /*dataCode: 'QT_ANSWER_CORT',*/
                                        dataCode: 'STD_ZX_YES_NO',
                                        rules: [{required: true, message: '必选项', trigger: 'blur'}]
                                    }
                                    ,
                                    {
                                        field: 'telVerifyAnswerType',
                                        label: '获取正确答案类型',
                                        type: 'input',
                                        hidden: true,
                                        rules: [
                                            {required: true, max: 120, message: '必填项，最大长度为120', trigger: 'blur'}
                                        ]
                                    },
                                    {field: 'status', label: '状态', type: 'select', dataCode: 'COMMON_STATUS'},
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
                                        validate = valid;
                                    });
                                    if (!validate) {
                                        return;
                                    }

                                    var rMethod = '';
                                    if (_self.viewType == 'EDIT') {
                                        rMethod = 'PUT';
                                    } else if (_self.viewType == 'ADD') {
                                        rMethod = 'POST';
                                    }
                                    /* if (model.questionOpt != null && '' != model.questionOpt)
                                                          model.questionOpt = model.questionOpt.join(',');*/
                                    yufp.service.request({
                                        method: rMethod,
                                        url: backend.consoleService + '/api/tel/verif/tpl',
                                        data: model,
                                        callback: function (code, message, response) {
                                            if (code == 0 && response.success) {
                                                _self.$refs.reftable.remoteData();
                                                _self.$message('操作成功');
                                                _self.dialogVisible = false;
                                            } else {
                                                _self.$message('操作失败');
                                            }
                                        }
                                    });
                                }
                            },
                            {
                                label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                    _self.dialogVisible = false;
                                }
                            }
                        ],
                        height: yufp.frame.size().height - 73,
                        dialogVisible: false,
                        formDisabled: false,
                        viewType: 'DETAIL',
                        viewTitle: yufp.lookup.find('CRUD_TYPE', false)
                    };
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
                        _self.dialogVisible = true;
                    },
                    switchParamsStatus: function () {
                        _self.$refs.reform.switch('status', 'hidden', (_self.viewType != 'DETAIL'));
                        _self.$refs.reform.switch('createTime', 'hidden', (_self.viewType != 'DETAIL'));
                        _self.$refs.reform.switch('createUser', 'hidden', (_self.viewType != 'DETAIL'));
                        _self.$refs.reform.switch('lastUpdateUser', 'hidden', (_self.viewType != 'DETAIL'));
                        _self.$refs.reform.switch('lastUpdateTime', 'hidden', (_self.viewType != 'DETAIL'));
                        _self.$refs.reform.switch('legalOrgCode', 'hidden', (_self.viewType != 'DETAIL'));
                        _self.$refs.reform.switch('qtAnswerCls', 'hidden', (_self.viewType != 'DETAIL'));
                        _self.$refs.reform.rebuildFn();
                    },
                    addFn: function () {
                        var _self = this;

                        _self.switchStatus('ADD', true);
                        _self.$nextTick(function () {
                            _self.switchParamsStatus();
                            _self.$refs.reform.resetFn();
                            _self.$refs.reform.formModel.questionType = '1';
                            _self.$refs.reform.formModel.questionOpt = 'STD_ZX_YES_NO';
                        });
                    },
                    modifyFn: function () {
                        if (this.$refs.reftable.selections.length != 1) {
                            this.$message({message: '请先选择一条记录', type: 'warning'});
                            return;
                        }
                        var obj = this.$refs.reftable.selections[0];
                        if (obj.status != '0') {
                            this.$message({message: '生效失效信息不能修改', type: 'warning'});
                            return;
                        }
                        this.switchStatus('EDIT', true);
                        this.$nextTick(function () {
                            _self.switchParamsStatus();

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
                            _self.switchParamsStatus();
                            yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0]);
                        });
                    }, /*testFn: function () {
                            yufp.service.request({
                                method: 'GET',
                                url: backend.consoleService + '/api/tel/verif/tpl/grpid',
                                data: {
                                    grpid: '100003'
                                },
                                callback: function (code, message, response) {
                                    if (code == 0 && response.success) {
                                        _self.$refs.reftable.remoteData()
                                        _self.$message('操作成功')
                                    } else {
                                        _self.$message('操作失败')
                                    }
                                }
                            })
                    },*/
                    deleteFn: function () {
                        var _self = this;
                        var selections = _self.$refs.reftable.selections;
                        if (selections.length < 1) {
                            _self.$message({message: '请先选择一条记录', type: 'warning'});
                            return;
                        }
                        if (selections[0].status != '0') {
                            this.$message({message: '只能删除待生效记录', type: 'warning'});
                            return;
                        }
                        _self.$confirm('是否删除电核问题?', '提示', {type: 'warning'}).then(function () {
                            var len = selections.length;
                            var arr = [];
                            for (var i = 0; i < len; i++) {
                                arr.push(selections[i].questionCode);
                            }

                            yufp.service.request({
                                method: 'DELETE',
                                url: backend.consoleService + '/api/tel/verif/tpl',
                                data: {
                                    questionCode: arr.join(',')
                                },
                                callback: function (code, message, response) {
                                    if (code == 0 && response.success) {
                                        _self.$refs.reftable.remoteData();
                                        _self.$message('操作成功');
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
                                            url: backend.consoleService + '/api/tel/verif/tpl/status',
                                            data: {
                                                'status': yufp.lookup.lookupMgr.COMMON_STATUS[status].enname,
                                                'questionCode': model.questionCode
                                            },
                                            callback: function (code, message, response) {
                                                if (code == 0 && response.code == '0') {
                                                    _self.$refs.reftable.remoteData();
                                                    _self.$message('操作成功');
                                                } else {
                                                    _self.$message('操作失败');
                                                }
                                            }
                                        });
                                    });
                                } else {
                                    _self.$message({message: '只有生效的才能失效', type: 'warning'});
                                }
                            } else {
                                if (model.status == '0') {
                                    _self.$confirm('是否生效电核问题配置?', '提示', {type: 'warning'}).then(function () {
                                        yufp.service.request({
                                            method: 'PUT',
                                            url: backend.consoleService + '/api/tel/verif/tpl/status',
                                            data: {
                                                'status': yufp.lookup.lookupMgr.COMMON_STATUS[status].enname,
                                                'questionCode': model.questionCode
                                            },
                                            callback: function (code, message, response) {
                                                if (code == 0 && response.code == '0') {
                                                    _self.$refs.reftable.remoteData();
                                                    _self.$message('操作成功');
                                                } else {
                                                    _self.$message('操作失败');
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
                    }
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
