/**
 * @create by ligm on 2019-01-03
 * @description CFCA加签信息
 */
define([
    './custom/widgets/js/PrdIdInfoSelector.js',
    './custom/widgets/js/OrgSelector.js'
], function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,CFCA_SIGN_STA,STD_ZB_CERT_TYP,APPLY_CHANNEL_TYPE,CONT_TYPE');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    dataURL: backend.edocService + '/api/cfca/sign/allInfos',
                    baseParams: {},
                    queryFields: [
                        {placeholder: '贷款合同编号/授信合同编号', field: 'contNo', type: 'input'},
                        {
                            placeholder: '渠道名称', field: 'channelCode', type: 'select', dataCode: 'APPLY_CHANNEL_TYPE',
                            change: function (value, model, args) {
                                _self.$refs.form.fm.prdCode = ''; //当下拉框值改变时，清空pop框产品值
                            }
                        },
                        {
                            placeholder: '产品名称',
                            field: 'prdCode',
                            type: 'custom',
                            is: 'div-prdId-info-selector',
                            params: {type: ''},
                            clickFn: function (value, model, args) {
                                _self.$refs.form.switch('prdCode', 'params', {prdType: model.channelNo, type: 'code'});
                                _self.$refs.form.rebuildFn();
                            }
                        },
                        {placeholder: '客户编号', field: 'cusId', type: 'input'},
                        {placeholder: '客户名称', field: 'cusName', type: 'input'},
                        {placeholder: '证件类型', field: 'certType', type: 'select', dataCode: 'STD_ZB_CERT_TYP'},
                        {placeholder: '证件号码', field: 'certCode', type: 'input'},
                        {
                            placeholder: '合同类型',
                            field: 'contType',
                            type: 'select',
                            dataCode: 'CONT_TYPE',
                            datacodeFilter: function (options) {
                                this.typeOptions = [];
                                for (var i = 0; i < options.length; i++) {
                                    if (options[i].key != '03') {
                                        this.typeOptions.push(options[i]);
                                    }
                                }
                            }
                        },

                        {placeholder: '安心签合同编号', field: 'cfcaContNo', type: 'input'},
                        {placeholder: '签署状态', field: 'cfcaSignState', type: 'select', dataCode: 'CFCA_SIGN_STA'},
                        {placeholder: '签署日期区间', field: 'cfcaSignTime_b2e', type: 'daterange', value: [], editable: false},
                        {placeholder: '开始日期', field: 'cfcaSignTime_b', type: 'date', hidden: true},
                        {placeholder: '结束日期', field: 'cfcaSignTime_e', type: 'date', hidden: true},
                        {placeholder: '归属机构', field: 'inputBrId', type: 'custom', is: 'div-org-selector'},
                    ],
                    queryButtons: [
                        {
                            label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                                model.cfcaSignTime_b = model.cfcaSignTime_b2e[0];
                                model.cfcaSignTime_e = model.cfcaSignTime_b2e[1];
                                _self.$refs.reftable.remoteData(model);
                            }
                        },
                        {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2'}
                    ],

                    tableColumns: [
                        {label: '贷款合同编号/授信合同编号', prop: 'contNo', sortable: true, resizable: true},
                        {
                            label: '合同类型', prop: 'contType', sortable: true, resizable: true, dataCode: 'CONT_TYPE',
                            datacodeFilter: function (options) {
                                this.typeOptions = [];
                                for (var i = 0; i < options.length; i++) {
                                    if (options[i].key != '03') {
                                        this.typeOptions.push(options[i]);
                                    }
                                }
                            }
                        },
                        {label: '客户名称', prop: 'cusName', sortable: true, resizable: true},
                        {label: '证件类型', prop: 'certType', sortable: true, resizable: true, dataCode: 'STD_ZB_CERT_TYP'},
                        {label: '证件号码', prop: 'certCode', sortable: true, resizable: true},
                        {
                            label: '渠道名称',
                            prop: 'channelCode',
                            sortable: true,
                            resizable: true,
                            dataCode: 'APPLY_CHANNEL_TYPE'
                        },
                        {label: '产品名称', prop: 'prdName', sortable: true, resizable: true},
                        {label: '安心签合同编号', prop: 'cfcaContNo', sortable: true, resizable: true},
                        {
                            label: '签署状态',
                            prop: 'cfcaSignState',
                            sortable: true,
                            resizable: true,
                            dataCode: 'CFCA_SIGN_STA'
                        },
                        {label: '签署时间', prop: 'cfcaSignTime', sortable: true, resizable: true},
                        {label: '归属机构', prop: 'inputBrId', sortable: true, resizable: true}
                    ],
                    updateFields: [{
                        columnCount: 3,
                        fields: [
                            {field: 'applySeq', label: '申请流水号'},
                            {field: 'prdId', label: '产品ID'},
                            {field: 'prdCode', label: '产品代码'},
                            {field: 'prdName', label: '产品名称'},
                            {field: 'contNo', label: '合同号'},
                            {field: 'cfcaContNo', label: '安心签合同号'},
                            {field: 'cusId', label: '客户号'},
                            {field: 'cusName', label: '客户名称'},
                            {field: 'cfcaSignState', label: '签署状态', dataCode: 'CFCA_SIGN_STA'},
                            {field: 'cfcaSignTime', label: '签署时间'}
                        ]
                    }],
                    updateButtons: [
                        {
                            label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
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
                                    url: '/api/cfca/sign/info',
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
                    exportDialogVisible: false,
                    exportFileName: '产品签署情况',
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
                    if (selections.length < 1) {
                        _self.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    var len = selections.length, arr = [];
                    for (var i = 0; i < len; i++) {
                        arr.push(selections[i].applySeq);
                    }

                    yufp.service.request({
                        method: 'DELETE',
                        url: '/api/cfca/sign/info',
                        data: {
                            applySeq: arr.join(',')
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
                    var formValue = this.$refs.form.fm;
                    this.$confirm('是否导出数据?', '提示').then(function () {
                        yufp.util.exportExcelByTable({
                            fileName: _self.exportFileName,
                            importType: 'service', // page当前页 selected 选中的数据  service 后端数据
                            ref: _self.$refs.reftable,
                            url: backend.edocService + '/api/cfca/sign/allInfos',
                            method: 'POST',
                            param: {
                                contNo: formValue.contNo,
                                channelCode: formValue.channelCode,
                                contType: formValue.contType,
                                certType: formValue.certType,
                                certCode: formValue.certCode,
                                prdCode:  formValue.prdCode,
                                //prdName: formValue.prdName,
                                cfcaContNo: formValue.cfcaContNo,
                                cusId: formValue.cusId,
                                cusName: formValue.cusName,
                                cfcaSignState: formValue.cfcaSignState,
                                cfcaSignTime_b: formValue.cfcaSignTime_b,
                                cfcaSignTime_e: formValue.cfcaSignTime_e,
                                inputBrId: formValue.inputBrId,
                                exportFlag: 'exp'
                            }
                        });
                    })
                }  // end of exportFn
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
