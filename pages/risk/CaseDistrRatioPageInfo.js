/**
 * @create by ligm on 2019-08-10
 * @description 案件分配比例表
 */
define([
    './custom/widgets/js/CooprOrgSelector.js'
], function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE', 'COOPR_ORG_TYPE', 'VERSION_STATUS', 'APRV_STATUS');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    reftableDataUrl: backend.riskmService + '/api/case/distr/ratios',
                    baseParams: {},
                    queryFields: [
                        {placeholder: '合作机构类型', field: 'cooprOrgType', type: 'select', dataCode: 'COOPR_ORG_TYPE'},
                        {placeholder: '版本号', field: 'versionNo', type: 'input'},
                        {placeholder: '版本状态', field: 'versionSts', type: 'select', dataCode: 'VERSION_STATUS'},
                        {placeholder: '审批状态', field: 'apprvSts', type: 'select', dataCode: 'APRV_STATUS'},
                        {placeholder: '提交日期范围', field: 'commitDate_b2e', type: 'daterange', value: [], editable: false},
                    ],
                    baseTab: 'first',
                    queryButtons: [
                        {
                            label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                                if (valid) {
                                    model.subTimeStart = model.commitDate_b2e[0];
                                    model.subTimeEnd = model.commitDate_b2e[1];
                                    _self.$refs.reftable.remoteData(model);
                                }
                            }
                        },
                        {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2'}
                    ],

                    tableColumns: [
                        {label: '版本号', prop: 'versionNo', sortable: true, resizable: true},
                        {label: '合作机构编号', prop: 'cooprOrgNo', sortable: true, resizable: true},
                        {label: '合作机构名称', prop: 'cooprOrgName', sortable: true, resizable: true},
                        {label: '合作状态', prop: 'cooprStatus', type: 'select', dataCode: 'COOPR_STS'},
                        {label: '案件占比', prop: 'caseRatio', sortable: true, resizable: true, hidden:true},
                        {label: '一手案件占比', prop: 'primCaseRatio', sortable: true, resizable: true, hidden:true},
                        {label: '二手案件占比', prop: 'secdCaseRatio', sortable: true, resizable: true, hidden:true},
                        {label: '三手案件占比', prop: 'thdCaseRatio', sortable: true, resizable: true, hidden:true},
                        {label: '长账龄案件占比', prop: 'longAgeCaseRatio', sortable: true, resizable: true, hidden:true},
                        {label: '合作机构类型', prop: 'cooprOrgType', type: 'select', dataCode: 'COOPR_ORG_TYPE'},
                        {label: '版本状态', prop: 'versionSts', type: 'select', dataCode: 'VERSION_STATUS', sortable: true, resizable: true},
                        {label: '审批状态', prop: 'apprvSts', type: 'select', dataCode: 'APRV_STATUS', sortable: true, resizable: true},
                        {label: '提交人', prop: 'submUserCode', sortable: true, resizable: true},
                        {label: '提交时间', prop: 'subTime', sortable: true, resizable: true},
                        {label: '审批完成时间', prop: 'apprvFnshTime', sortable: true, resizable: true,
                            formatter: function (row, column, cellValue) {
                                if (row.apprStatus== "04" || row.apprStatus== "03") {
                                    return row.apprDate;
                                } else {
                                    return "";
                                }
                            }},
                        {label: '最后更新人', prop: 'lastUpdateUser', sortable: true, resizable: true, hidden: true},
                        {label: '最后更新时间', prop: 'lastUpdateTime', sortable: true, resizable: true, hidden: true}
                    ],

                    updateFields: [{
                        columnCount: 3,
                        fields: [
                            {
                                field: 'cooprOrgType', label: '合作机构类型', type: 'select', dataCode: 'COOPR_ORG_TYPE',
                                rules: [{required: true, message: '必填项', trigger: 'blur'}],
                                change: function (fields) {
                                    _self.changeFiledStatus(fields);
                                }
                            },
                            {field: 'versionNo', label: '版本号', hidden: true},
                            {
                                field: 'cooprOrgNo',
                                label: '合作机构编号',
                                hidden: true,
                                type: 'custom',
                                is: 'div-coopr-org-selector',
                                params: {},
                                clickFn: function (value, model, args) {
                                    _self.$refs.reform.switch('cooprOrgNo', 'params', {cooprOrgType: model.cooprOrgType,type: 'code'});
                                    _self.$refs.reform.rebuildFn();
                                },
                                rules: [{required: true, message: '请选择合作机构编号', trigger: 'blur'}, {
                                    max: 24,
                                    message: '最大长度为24'
                                }],
                                selectFn: function (val, formModel, result) {
                                    var org = result[1];
                                    formModel.cooprOrgNo = org.cooprOrgNo;
                                    formModel.cooprOrgName = org.cooprOrgName;
                                    formModel.cooprOrgType = org.cooprOrgType;

                                },
                                icon: 'search'
                            },
                            {field: 'cooprOrgName', label: '合作机构名称', disabled: true, hidden: true},
                            {field: 'cooprStatus', label: '合作状态', type: 'select', dataCode: 'COOPR_STS', value: '01', hidden: true,
                                datacodeFilter: function (options) {
                                    this.typeOptions = [];
                                    for (var i = 0; i < options.length; i++) {
                                        if (options[i].key == '01') {
                                            this.typeOptions.push(options[i]);
                                        }
                                    }
                                },
                            },
                            {field: 'caseRatio', label: '案件占比', type: 'num', formatter: yufp.util.toPercent, hidden: true,
                                rules: [{required: true, message: '必填项，请输入0到100之间的数！'},
                                    {
                                        validator: function (rule, value, callback) {
                                            if (typeof (value) == 'undefined' || value == null || isNaN(value) || value == '') {
                                                if (String(value).indexOf('%') != -1) {
                                                    _self.$refs.reform.formModel.caseRatio = parseFloat(String(value).replace('%',''));
                                                }
                                                callback();
                                            } else if (value < 0 || value > 100) {
                                                _self.$message({message: '请输入不小于0且不大于100的数！', type: 'warning'});
                                                return;
                                            } else {
                                                callback();
                                            }
                                        }
                                    }]
                            },
                            {field: 'primCaseRatio', label: '一手案件占比', type: 'num', formatter: yufp.util.toPercent, hidden: true,
                                rules: [{required: true, message: '必填项，请输入0到100之间的数！'},
                                    {
                                        validator: function (rule, value, callback) {
                                            if (typeof (value) == 'undefined' || value == null || isNaN(value) || value == '') {
                                                if (String(value).indexOf('%') != -1) {
                                                    _self.$refs.reform.formModel.primCaseRatio = parseFloat(String(value).replace('%',''));
                                                }
                                                callback();
                                            } else if (value < 0 || value > 100) {
                                                _self.$message({message: '请输入不小于0且不大于100的数！', type: 'warning'});
                                                return;
                                            } else {
                                                callback();
                                            }
                                        }
                                    }]
                            },
                            {field: 'secdCaseRatio', label: '二手案件占比', type: 'num', formatter: yufp.util.toPercent, hidden: true,
                                rules: [
                                    {
                                        validator: function (rule, value, callback) {
                                            if (typeof (value) == 'undefined' || value == null || isNaN(value) || value == '') {
                                                if (String(value).indexOf('%') != -1) {
                                                    _self.$refs.reform.formModel.secdCaseRatio = parseFloat(String(value).replace('%',''));
                                                } else if (value == '') {
                                                    _self.$refs.reform.formModel.secdCaseRatio = 0;
                                                }
                                                callback();
                                            } else if (value < 0 || value > 100) {
                                                _self.$message({message: '请输入不小于0且不大于100的数！', type: 'warning'});
                                                return;
                                            } else {
                                                callback();
                                            }
                                        }
                                    }]
                            },
                            {field: 'thdCaseRatio', label: '三手案件占比', type: 'num', formatter: yufp.util.toPercent, hidden: true,
                                rules: [
                                    {
                                        validator: function (rule, value, callback) {
                                            if (typeof (value) == 'undefined' || value == null || isNaN(value) || value == '') {
                                                if (String(value).indexOf('%') != -1) {
                                                    _self.$refs.reform.formModel.thdCaseRatio = parseFloat(String(value).replace('%',''));
                                                } else if (value == '') {
                                                    _self.$refs.reform.formModel.thdCaseRatio = 0;
                                                }
                                                callback();
                                            } else if (value < 0 || value > 100) {
                                                _self.$message({message: '请输入不小于0且不大于100的数！', type: 'warning'});
                                                return;
                                            } else {
                                                callback();
                                            }
                                        }
                                    }]
                            },
                            {field: 'longAgeCaseRatio', label: '长账龄案件占比', type: 'num', formatter: yufp.util.toPercent, hidden: true,
                                rules: [
                                    {
                                        validator: function (rule, value, callback) {
                                            if (typeof (value) == 'undefined' || value == null || isNaN(value) || value == '') {
                                                if (String(value).indexOf('%') != -1) {
                                                    _self.$refs.reform.formModel.longAgeCaseRatio = parseFloat(String(value).replace('%',''));
                                                } else if (value == '') {
                                                    _self.$refs.reform.formModel.longAgeCaseRatio = 0;
                                                }
                                                callback();
                                            } else if (value < 0 || value > 100) {
                                                _self.$message({message: '请输入不小于0且不大于100的数！', type: 'warning'});
                                                return;
                                            } else {
                                                callback();
                                            }
                                        }
                                    }]
                            },
                            {field: 'versionSts', label: '版本状态', type: 'select', dataCode: 'VERSION_STATUS', value: '01', hidden: true},
                            {field: 'apprvSts', label: '审批状态', type: 'select', dataCode: 'APRV_STATUS', value: '01', hidden: true},
                            {field: 'caseDistrAppNo', label: '案件分配比申请流水号', hidden: true},
                            {field: 'apprvUserCode', label: '审批人', hidden: true},
                            {field: 'apprvFnshTime', label: '审批完成时间', hidden: true},
                            {field: 'submUserCode', label: '提交人', hidden: true},
                            {field: 'subTime', label: '提交时间', hidden: true},
                            {field: 'lastUpdateUser', label: '最后更新人', hidden: true,disabled: true},
                            {field: 'lastUpdateTime', label: '最后更新时间', hidden: true, disabled: true}]
                    },
                            {
                                columnCount: 1,
                                fields:[{field: 'apprvComment', label: '审批意见', hidden: true, disabled: true, type: 'textarea',maxlength:100,rows:3}]
                            }

                    ],
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
                                if (_self.viewType == "EDIT") {
                                    rMethod = 'PUT';
                                    if (String(model.caseRatio).indexOf('%') != -1) model.caseRatio = parseFloat(String(model.caseRatio).replace('%',''));
                                    if (String(model.primCaseRatio).indexOf('%') != -1) model.primCaseRatio = parseFloat(String(model.primCaseRatio).replace('%',''));
                                    if (String(model.secdCaseRatio).indexOf('%') != -1) model.secdCaseRatio = parseFloat(String(model.secdCaseRatio).replace('%',''));
                                    if (String(model.thdCaseRatio).indexOf('%') != -1) model.thdCaseRatio = parseFloat(String(model.thdCaseRatio).replace('%',''));
                                    if (String(model.longAgeCaseRatio).indexOf('%') != -1) model.longAgeCaseRatio = parseFloat(String(model.longAgeCaseRatio).replace('%',''));
                                } else if (_self.viewType == "ADD") {
                                    rMethod = 'POST';
                                }
                                model.caseRatio = parseFloat(String(model.caseRatio).replace('%','')) / 100;
                                model.primCaseRatio = parseFloat(String(model.primCaseRatio).replace('%','')) / 100;
                                model.secdCaseRatio = parseFloat(String(model.secdCaseRatio).replace('%','')) / 100;
                                model.thdCaseRatio = parseFloat(String(model.thdCaseRatio).replace('%','')) / 100;
                                model.longAgeCaseRatio = parseFloat(String(model.longAgeCaseRatio).replace('%','')) / 100;

                                yufp.service.request({
                                    method: rMethod,
                                    url: backend.riskmService + '/api/case/distr/ratio',
                                    data: model,
                                    callback: function (code, message, response) {
                                        model.caseRatio = (parseFloat(String(model.caseRatio).replace('%','')) * 100).toFixed(4);
                                        model.primCaseRatio = (parseFloat(String(model.primCaseRatio).replace('%','')) * 100).toFixed(4);
                                        model.secdCaseRatio = (parseFloat(String(model.secdCaseRatio).replace('%','')) * 100).toFixed(4);
                                        model.thdCaseRatio = (parseFloat(String(model.thdCaseRatio).replace('%','')) * 100).toFixed(4);
                                        model.longAgeCaseRatio = (parseFloat(String(model.longAgeCaseRatio).replace('%','')) * 100).toFixed(4);
                                        if (code == 0 && response.rows == 1) {
                                            _self.dialogVisible = false;
                                            _self.$refs.reftable.remoteData();
                                            _self.$message('操作成功');
                                        } else if (code == 0 && response.rows == -2) {
                                            _self.$message('该机构还存在未处理完成的数据，请先处理！');
                                        } else {
                                            _self.$message('操作失败');
                                        }
                                    }
                                });
                            }
                        },

                        {
                            label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                _self.$refs.reform.resetFn();
                                _self.dialogVisible = false;
                            }
                        }
                    ],
                    height: yufp.frame.size().height - 103,
                    dialogVisible: false,
                    recDialogVisible: false,
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
                    if(viewType != 'ADD'){
                        _self.$refs.reform.switch('cooprStatus', 'disabled', editable);
                        _self.$refs.reform.switch('caseRatio', 'disabled', editable);
                        _self.$refs.reform.switch('primCaseRatio', 'disabled', editable);
                        _self.$refs.reform.switch('secdCaseRatio', 'disabled', editable);
                        _self.$refs.reform.switch('thdCaseRatio', 'disabled', editable);
                        _self.$refs.reform.switch('longAgeCaseRatio', 'disabled', editable);
                    }
                },

                changeFiledStatus: function (item) {
                    var _self = this;
                    if (item == '001') {
                        _self.$refs.reform.switch('cooprOrgNo','label','委外机构编号')
                        _self.$refs.reform.switch('cooprOrgName','label','委外机构名称')
                        _self.setHiddenFalse('cooprOrgNo', 'cooprOrgName', 'cooprStatus', 'primCaseRatio', 'secdCaseRatio', 'thdCaseRatio', 'longAgeCaseRatio');
                        _self.setHiddenTrue('caseRatio');
                    } else if (item == '002') {
                        _self.$refs.reform.switch('cooprOrgNo','label','律师事务所编号')
                        _self.$refs.reform.switch('cooprOrgName','label','律师事务所名称')
                        _self.setHiddenFalse('cooprOrgNo', 'cooprOrgName', 'cooprStatus', 'caseRatio');
                        _self.setHiddenTrue('primCaseRatio', 'secdCaseRatio', 'thdCaseRatio', 'longAgeCaseRatio');
                    } else if (item == '003') {
                        _self.$refs.reform.switch('cooprOrgNo','label','风险代理机构编')
                        _self.$refs.reform.switch('cooprOrgName','label','风险代理机名称')
                        _self.setHiddenFalse('cooprOrgNo', 'cooprOrgName', 'cooprStatus', 'caseRatio');
                        _self.setHiddenTrue('primCaseRatio', 'secdCaseRatio', 'thdCaseRatio', 'longAgeCaseRatio');
                    } else {
                        _self.setHiddenTrue('cooprOrgNo', 'cooprOrgName', 'cooprStatus', 'primCaseRatio', 'secdCaseRatio', 'thdCaseRatio', 'longAgeCaseRatio', 'caseRatio');
                        _self.$refs.reform.switch('cooprStatus', 'disabled', false);
                        _self.$refs.reform.switch('caseRatio', 'disabled', false);
                        _self.$refs.reform.switch('primCaseRatio', 'disabled', false);
                        _self.$refs.reform.switch('secdCaseRatio', 'disabled', false);
                        _self.$refs.reform.switch('thdCaseRatio', 'disabled', false);
                        _self.$refs.reform.switch('longAgeCaseRatio', 'disabled', false);
                    }
                },
                setHiddenTrue: function () {
                    var _self = this;
                    var arg = Array.prototype.slice.call(arguments);
                    arg.forEach(function (item) {
                        _self.$refs.reform.switch(item, 'hidden', true);
                    });
                },
                setHiddenFalse: function () {
                    var _self = this;
                    var arg = Array.prototype.slice.call(arguments);
                    arg.forEach(function (item) {
                        _self.$refs.reform.switch(item, 'hidden', false);
                    });
                },
                dataFormatter: function () {
                    var _self = this;
                    var arg = Array.prototype.slice.call(arguments);
                    arg.forEach(function (item) {
                        if (String(item).indexOf('%') != -1)
                            item = parseFloat(String(item).replace('%',''));
                    })
                },
                addFn: function () {
                    var _self = this;
                    this.switchStatus('ADD', false);
                    // _self.showDialogStatus();
                    var versionSts = '01';
                    this.$nextTick(function () {
                        _self.$refs.reform.resetFn();
                    });
                    _self.dialogVisible = true;
                    _self.$nextTick(function () {
                        yufp.extend(this.$refs.reform.formModel, {versionSts: versionSts});
                        _self.$refs.reform.switch('cooprOrgType', 'disabled', false);
                        _self.$refs.reform.switch('cooprOrgNo', 'disabled', false);
                        _self.$refs.reform.switch('lastUpdateUser', 'hidden', true);
                        _self.$refs.reform.switch('lastUpdateTime', 'hidden', true);
                        _self.$refs.reform.switch('apprvComment', 'hidden', true);
                        _self.$refs.reform.resetFn();
                    });
                },
                modifyFn: function () {
                    var _self = this;
                    var obj = _self.$refs.reftable.selections[0];
                    if (_self.$refs.reftable.selections.length != 1) {
                        _self.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    } else if (obj.versionSts != '01') {
                        _self.$message({message: '只能修改版本状态为新增的数据!',type: 'warning'});
                        return;
                    } else if (obj.apprvSts == '02') {
                        _self.$message({
                            message: '不能修改审批状态为“审批中”的数据!',
                            type: 'warning'
                        });
                        return;
                    }
                    _self.dialogVisible = true;

                    this.$nextTick(function () {
                        this.switchStatus('EDIT', false);
                        _self.changeFiledStatus(obj.cooprOrgType);
                        _self.$refs.reform.switch('cooprOrgType', 'disabled', true);
                        _self.$refs.reform.switch('cooprOrgNo', 'disabled', true);
                        _self.$refs.reform.switch('lastUpdateUser', 'hidden', false);
                        _self.$refs.reform.switch('lastUpdateTime', 'hidden', false);
                        _self.$refs.reform.switch('apprvComment', 'hidden', false);
                        _self.$refs.reform.resetFn();
                        _self.changefloatToInt(obj.cooprOrgType,obj);
                    });
                },
                deleteFn: function () {
                    var _self = this;
                    var arr = [];
                    var selections = _self.$refs.reftable.selections;
                    if (selections.length < 1) {
                        _self.$message({message: '请先选择要删除的记录', type: 'warning'});
                        return;
                    }
                    for (var i = 0; i < selections.length; i++) {
                        var versionSts = selections[i].versionSts;
                        var apprvSts = selections[i].apprvSts;
                        if (versionSts != '01') {
                            _self.$message({
                                message: '只能删除版本状态为“新增”的数据!',
                                type: 'warning'
                            });
                            return;
                        } else if (apprvSts == '02') {
                            _self.$message({
                                message: '不能删除审批状态为“审批中”的数据!',
                                type: 'warning'
                            });
                            return;
                        } else {
                            arr.push(selections[i].cooprOrgNo);
                        }
                    }
                    _self.$confirm('确认删除？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function (action) {
                            if (action === 'confirm') {
                                _self.$nextTick(function () {
                                    yufp.service.request({
                                        method: 'DELETE',
                                        url: backend.riskmService + '/api/case/distr/ratio/del',
                                        data: {
                                            cooprOrgNo: arr.join(',')
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
                                });
                            }
                        }
                    });
                },
                commit: function (model) {
                    var _self = this;
                    var caseRatioSum = 0;
                    var primCaseRatioSum = 0;
                    var secdCaseRatioSum = 0;
                    var thdCaseRatioSum = 0;
                    var longAgeCaseRatioSum = 0;
                    var selections = this.$refs.reftable.selections;
                    if (selections.length == 0) {
                        _self.$message({message: '请先选择提交记录', type: 'warning'});
                        return;
                    }

                    var cooprOrgType = selections[0].cooprOrgType;
                    for (var i = 0; i < selections.length; i++) {
                        if (cooprOrgType != selections[i].cooprOrgType) {
                            _self.$message({message: '一次只能提交一种合作机构类型的数据！', type: 'warning'});
                            return;
                        }
                        if (selections[i].apprvSts != '01' && selections[i].apprvSts != '05') {
                            _self.$message({message: '只有审批状态为“待发起”或“退回”的数据才能发起流程！', type: 'warning'});
                            return;
                        }
                    }
                    if (selections.length>1){
                        for (var i = 0; i < selections.length-1; i++) {
                            if (selections[i].versionNo != selections[i+1].versionNo){
                                _self.$message({message: '一次只能提交一个版本号的数据', type: 'warning'});
                                return;
                            }
                        }
                    }
                    if (cooprOrgType == '001') {
                        for (var i = 0; i < selections.length; i++) {
                            primCaseRatioSum += selections[i].primCaseRatio;
                            secdCaseRatioSum += selections[i].secdCaseRatio;
                            thdCaseRatioSum += selections[i].thdCaseRatio;
                            longAgeCaseRatioSum += selections[i].longAgeCaseRatio;
                        }
                        if ((primCaseRatioSum == 1 || primCaseRatioSum == 0) &&
                                (secdCaseRatioSum == 1 || secdCaseRatioSum == 0) &&
                                     (thdCaseRatioSum == 1 || thdCaseRatioSum == 0) &&
                                            (longAgeCaseRatioSum == 1 || longAgeCaseRatioSum == 0)) {
                            _self.initiProcess(selections);
                        } else {
                            _self.$message({message: '委外机构各手别、长账龄分配比例之和只能为1或0！', type: 'warning'});
                        }
                    } else {
                        for (var i = 0; i < selections.length; i++) {
                            caseRatioSum += selections[i].caseRatio;
                        }
                        if (caseRatioSum != 1) {
                            _self.$message({message: '分配比例之和应等于1！', type: 'warning'});
                        } else {
                            _self.initiProcess(selections);
                        }
                    }

                },
                initiProcess: function (item) {
                    var _self = this;
                    _self.$confirm('确认提交并发起流程？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function (action) {
                            if (action === 'confirm') {
                                _self.$nextTick(function () {
                                    yufp.service.request({
                                        method: 'POST',
                                        url: backend.flowService + '/api/case/distr/ratio/commit',
                                        data: JSON.stringify(item),
                                        callback: function (code, message, response) {
                                            if (code == 0 && response.rows >= 0) {
                                                _self.$message({message: '提交成功'});
                                                _self.$refs.reftable.remoteData();
                                            } else {
                                                _self.$message({message: '提交失败', type: 'warning'});
                                            }

                                        }
                                    });
                                });
                            }
                        }
                    });
                },
                viewAppRecords: function () {
                    var _self = this;
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    _self.recDialogVisible = true;
                    var obj = _self.$refs.reftable.selections[0];
                    this.$nextTick(function () {
                        _self.$refs.viewAppRecordsTable.remoteData(obj);
                    });
                },
                detailFn: function () {
                    var _self = this;
                    var obj = _self.$refs.reftable.selections[0];
                    if (_self.$refs.reftable.selections.length != 1) {
                        _self.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    this.$nextTick(function () {
                        _self.$refs.reform.resetFn();
                    });
                    _self.dialogVisible = true;
                    this.$nextTick(function () {
                        this.switchStatus('DETAIL', true);
                        _self.changeFiledStatus(obj.cooprOrgType);
                        _self.$refs.reform.switch('cooprOrgType', 'disabled', true);
                        _self.$refs.reform.switch('cooprOrgNo', 'disabled', true);
                        _self.$refs.reform.switch('lastUpdateUser', 'hidden', false);
                        _self.$refs.reform.switch('lastUpdateTime', 'hidden', false);
                        _self.$refs.reform.switch('apprvComment', 'hidden', false);
                        _self.changefloatToInt(obj.cooprOrgType,obj);
                    });
                },
                changefloatToInt: function (item,obj) {
                    var _self = this;
                    if (item == '001') {
                        yufp.extend(this.$refs.reform.formModel, obj,
                            {primCaseRatio: (parseFloat(String(obj.primCaseRatio).replace('%','')) * 100).toFixed(2)},
                            {secdCaseRatio: (parseFloat(String(obj.secdCaseRatio).replace('%','')) * 100).toFixed(2)},
                            {thdCaseRatio: (parseFloat(String(obj.thdCaseRatio).replace('%','')) * 100).toFixed(2)},
                            {longAgeCaseRatio: (parseFloat(String(obj.longAgeCaseRatio).replace('%','')) * 100).toFixed(2)},
                            {lastUpdateUser: yufp.session.userCode});
                    }else {
                        yufp.extend(this.$refs.reform.formModel, obj,
                            {caseRatio: (parseFloat(String(obj.caseRatio).replace('%','')) * 100).toFixed(2)},
                            {lastUpdateUser: yufp.session.userCode});
                    }
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
