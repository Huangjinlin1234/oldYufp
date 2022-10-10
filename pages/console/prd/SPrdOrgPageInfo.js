/**
 * @create by fuzm on 2018-05-03
 * @description 产品表
 */
define([
    './custom/widgets/js/OrgSelector.js',
    './custom/widgets/js/PrdIdInfoSelector.js',
], function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    dataUrl: backend.consoleService + '/api/s/prd/org/query',
                    baseParams: {},
                    queryFields: [
                        {
                            placeholder: '产品信息',
                            field: 'prdCode',
                            type: 'custom',
                            is: 'div-prdId-info-selector',
                            params: {type: ''},
                            clickFn: function (value, model, args) {
                                _self.$refs.form.switch('prdCode', 'params', {prdType: model.channelNo, type: 'code'});
                                _self.$refs.form.rebuildFn();
                            }
                        },
                        {
                            placeholder: '机构信息',
                            field: 'orgCode',
                            type: 'custom',
                            is: 'div-org-selector',
                            params: {showType: 'CNNAME'}
                        }

                    ],
                    queryButtons: [{
                        label: '查询', op: 'submit', type: 'primary', icon: 'search',
                        click: function (model, valid) {
                            if (valid) {
                                _self.$refs.reftable.remoteData(model);
                            }
                        }},
                        {
                            label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2',
                            click: function () {
                                _self.resetQuery = false;
                                _self.$nextTick(function () {
                                    this.resetQuery = true;
                                });
                            }
                        }],

                    tableColumns: [
                        {label: 'PKID', prop: 'pkId', sortable: true, resizable: true, hidden: true},
                        {label: '产品ID', prop: 'prdId', sortable: true, resizable: true, hidden: true},
                        {label: '产品编号', prop: 'prdCode', sortable: true, resizable: true},
                        {label: '产品名称', prop: 'prdName', sortable: true, resizable: true},
                        {label: '机构号', prop: 'orgCode', sortable: true, resizable: true},
                        {label: '机构名称', prop: 'orgName', sortable: true, resizable: true},
                        {label: '创建人', prop: 'createUser', sortable: true, resizable: true, hidden: true},
                        {label: '创建时间', prop: 'createTime', sortable: true, resizable: true, hidden: true},
                        {label: '最后修改人', prop: 'lastUpdateUser', sortable: true, resizable: true},
                        {label: '最后修改时间', prop: 'lastUpdateTime', sortable: true, resizable: true}
                    ],

                    updateFields: [{
                        columnCount: 2,
                        fields: [
                            {field: 'pkId', label: 'PKID', hidden: true},
                            {field: 'prdId', label: '产品ID', hidden: true},
                            { field: 'prdCode', label: '产品编号',
                                type: 'custom', is: 'div-prdId-info-selector' ,params:{type:''},
                                selectFn: function (val, formModel, result) {
                                    var org = result[1];
                                    formModel.prdName = org.prdName;
                                },
                                rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                            },
                            { field: 'prdName', label: '产品名称',disabled:true},
                            { field: 'orgCode', label: '机构号',
                                type: 'custom', is: 'div-org-selector' ,params:{type:''},
                                selectFn: function (val, formModel, result) {
                                    var org = result[1];
                                    formModel.orgName = org.orgName;
                                },
                                rules: [{ required: true, message: '必填项', trigger: 'blur' }]
                            },
                            { field: 'orgName', label: '机构名称',disabled:true},
                            {field: 'createUser', label: '创建人', hidden: true},
                            {field: 'createTime', label: '创建时间', hidden: true},
                            {field: 'lastUpdateUser', label: '最后修改人', hidden: true},
                            {field: 'lastUpdateTime', label: '最后修改时间', hidden: true}
                        ]
                    }],
                    resetQuery: true,
                    height: yufp.frame.size().height - 103,
                    dialogVisible: false,
                    formDisabled: false,
                    viewType: 'DETAIL',
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    prdHisVis: false
                }
            },

            methods: {

                /**
                 * @param ctrlCode
                 *            操作码
                 */
                checkPermission: function (ctrlCode) {
                    return !yufp.session.checkCtrl(ctrlCode, cite.menuId);
                },

                /**
                 * @param viewType
                 *            表单类型
                 * @param editable
                 *            可编辑,默认false
                 */
                switchStatus: function (viewType, editable) {
                    var _self = this;
                    _self.viewType = viewType;
                    _self.formDisabled = !editable;
                    _self.dialogVisible = true;

                },

                switchHiddenStatus: function(){
                    if (this.viewType == 'ADD') {
                        this.$refs.baseRef.switch('createUser', 'hidden', true);
                        this.$refs.baseRef.switch('createTime', 'hidden', true);
                        this.$refs.baseRef.switch('lastUpdateUser', 'hidden', true);
                        this.$refs.baseRef.switch('lastUpdateTime', 'hidden', true);
                    } else if (this.viewType == 'EDIT') {
                        this.$refs.baseRef.switch('createUser', 'hidden', true);
                        this.$refs.baseRef.switch('createTime', 'hidden', true);
                        this.$refs.baseRef.switch('lastUpdateUser', 'hidden', true);
                        this.$refs.baseRef.switch('lastUpdateTime', 'hidden', true);
                    } else {
                        this.$refs.baseRef.switch('createUser', 'hidden', false);
                        this.$refs.baseRef.switch('createTime', 'hidden', false);
                        this.$refs.baseRef.switch('lastUpdateUser', 'hidden', false);
                        this.$refs.baseRef.switch('lastUpdateTime', 'hidden', false);
                    }
                },

                addFn: function () {
                    var _self = this;
                    _self.$nextTick(function () {
                        _self.switchStatus('ADD', true);
                        _self.switchHiddenStatus();
                        _self.$refs.baseRef.resetFields();
                    });

                },
                infoFn: function () {
                    var _self = this;
                    if (_self.$refs.reftable.selections.length != 1) {
                        _self.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    _self.switchStatus('DETAIL', false);
                    var obj = _self.$refs.reftable.selections[0];
                    _self.$nextTick(function () {
                        _self.switchHiddenStatus();
                        yufp.extend(_self.$refs.baseRef.formModel, obj);
                    });
                },
                modifyFn: function () {
                    var _self = this;
                    if (_self.$refs.reftable.selections.length != 1) {
                        _self.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    var obj = _self.$refs.reftable.selections[0];
                    _self.switchStatus('EDIT', true);
                    _self.$nextTick(function () {
                        _self.switchHiddenStatus();
                    });
                    _self.$nextTick(function () {
                        yufp.extend(_self.$refs.baseRef.formModel, obj);
                    });
                },
                deleteFn: function () {
                    var _self = this;
                    var selections = _self.$refs.reftable.selections;
                    if (selections.length != 1) {
                        _self.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    _self.$confirm('是否删除该记录?', '提示', {type: 'warning'}).then(function () {
                        yufp.service.request({
                            method: 'DELETE',
                            url: backend.consoleService + '/api/s/prd/orgs',
                            data: selections[0],
                            callback: function (code, message, response) {
                                if (code == 0) {
                                    _self.$refs.reftable.remoteData();
                                    _self.$message('操作成功，将在次日生效，请知悉！');
                                } else {
                                    _self.$message('操作失败');
                                }
                            }
                        });
                    });
                },

                saveFn: function () {
                    var _self = this;
                    var validate = false;
                    _self.$refs.baseRef.validate(function (valid) {
                        validate = valid
                    });
                    if (!validate) {
                        return
                    }
                    var obj = _self.$refs.baseRef.formModel;
                    var rMethod = 'POST';
                    if (_self.viewType == 'EDIT') {
                        rMethod = 'PUT';
                    }
                    //发出请求
                    yufp.service.request({
                        method: rMethod,
                        url: backend.consoleService + '/api/s/prd/orgs',
                        data: obj,
                        callback: function (code, message, response) {
                            if (response.code == 0) {
                                _self.$refs.reftable.remoteData();
                                _self.$message('操作成功，将在次日生效，请知悉！');
                                _self.dialogVisible = false;
                            }  else {
                                _self.$message(response.message);
                            }
                        }
                    });
                },
                returnFn: function () {
                    var _self = this;
                    _self.dialogVisible = false;
                    _self.$nextTick(function () {
                        _self.$refs.baseRef.resetFields();
                    });
                },

                cancleFn: function () {
                    var _self = this;
                    _self.dialogVisible = false;
                    _self.$nextTick(function () {
                        _self.$refs.baseRef.resetFields();
                    });
                }
            },



        });
    };

    // 消息处理
    exports.onmessage = function (type, message) {

    };

    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {

    };
});
