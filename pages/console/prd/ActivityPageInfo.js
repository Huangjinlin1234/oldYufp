/**
 * @create by chenqm1 on 2018-05-04
 * @description 个人客户信息表
 */
define([
    './custom/widgets/js/PrdIdInfoSelector.js'
], function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('ACT_STS,ACT_TYPE,ACT_REPAY_METHED,ACT_NEWCOMERS,PRD_VARIETY,ACT_CHANNEL_TYPE');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    baseTab: 'baseTab',
                    dataUrl: backend.consoleService + '/api/activity/queryBaseAll',
                    dataUrlActivityInfo: backend.consoleService + '/api/activity/queryDetailByActId',
                    baseParams: {},
                    baseParamsActivityInfo: {},
                    expandCollapseName: ['activityInfo'],
                    queryFields: [
                        {
                            placeholder: '产品名称',
                            field: 'prdCode',
                            type: 'custom',
                            is: 'div-prdId-info-selector',
                            params: {type: 'code'}
                        },
                        {placeholder: '渠道', field: 'prdType', type: 'select', dataCode: 'ACT_CHANNEL_TYPE'},
                        {placeholder: '活动状态', field: 'activityStatus', type: 'select', dataCode: 'ACT_STS'}
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
                        {label: '活动Id', prop: 'actId', sortable: true, resizable: true},
                        {label: '产品', prop: 'prdCode', sortable: true, resizable: true, dataCode: 'PRD_VARIETY'},
                        {label: '渠道', prop: 'prdType', sortable: true, resizable: true, dataCode: 'ACT_CHANNEL_TYPE'},
                        {label: '起始日期', prop: 'activityStartTime', sortable: true, resizable: true},
                        {label: '终止日期', prop: 'activityEndTime', sortable: true, resizable: true},
                        {label: '优惠券类型', prop: 'couponType', sortable: true, resizable: true, dataCode: 'ACT_TYPE'},
                        {label: '金额区间下限', prop: 'applyAmtLow', sortable: true, resizable: true},
                        {label: '金额区间上限', prop: 'applyAmtUp', sortable: true, resizable: true},
                        {label: '借款期限(月)', prop: 'loanTerm', sortable: true, resizable: true},
                        {
                            label: '还款方式',
                            prop: 'repayMethod',
                            sortable: true,
                            resizable: true,
                            dataCode: 'ACT_REPAY_METHED'
                        },
                        {
                            label: '是否新人专属',
                            prop: 'newcomersExclusive',
                            sortable: true,
                            resizable: true,
                            dataCode: 'ACT_NEWCOMERS'
                        },
                        {label: '活动状态', prop: 'activityStatus', sortable: true, resizable: true, dataCode: 'ACT_STS'},
                        {label: '创建时间', prop: 'createTime', sortable: true, resizable: true},
                        {label: '创建人', prop: 'createUser', sortable: true, resizable: true},
                    ],

                    activityInfoFields: [{
                        columnCount: 3,
                        fields: [
                            {field: 'prdCode', label: '产品', type: 'select', dataCode: 'PRD_VARIETY'},
                            {field: 'prdType', label: '渠道', type: 'select', dataCode: 'ACT_CHANNEL_TYPE'},
                            {field: 'activityStartTime', label: '起始日期', type: 'date'},
                            {field: 'activityEndTime', label: '终止日期', type: 'date'},
                            {field: 'couponType', label: '优惠券类型', type: 'select', dataCode: 'ACT_TYPE'},
                            {field: 'applyAmtLow', label: '金额区间下限'},
                            {field: 'applyAmtUp', label: '金额区间上限'},
                            {field: 'loanTerm', label: '借款期限(月)', type: 'select'},
                            {field: 'repayMethod', label: '还款方式', type: 'select', dataCode: 'ACT_REPAY_METHED'},
                            {field: 'newcomersExclusive', label: '是否新人专属', type: 'select', dataCode: 'ACT_NEWCOMERS'},
                            {
                                field: 'activityStatus',
                                label: '活动状态',
                                type: 'select',
                                dataCode: 'ACT_STS',
                                rules: [{required: true, message: '必填项', trigger: 'blur'}]
                            }
                        ]
                    }],


                    activityInfoReftableColumns: [
                        {label: '活动Id', prop: 'actId', sortable: true, resizable: true},
                        {label: '折扣活动Id', prop: 'discountRateId', sortable: true, resizable: true},
                        {label: '产品', prop: 'prdCode', sortable: true, resizable: true, dataCode: 'PRD_VARIETY'},
                        {label: '渠道', prop: 'prdType', sortable: true, resizable: true, dataCode: 'ACT_CHANNEL_TYPE'},
                        {label: '起始日期', prop: 'activityStartTime', sortable: true, resizable: true},
                        {label: '终止日期', prop: 'activityEndTime', sortable: true, resizable: true},
                        {label: '优惠券类型', prop: 'couponType', sortable: true, resizable: true, dataCode: 'ACT_TYPE'},
                        {label: '借款利率', prop: 'loanRate', sortable: true, resizable: true},
                        {label: '折扣参数', prop: 'discountRate', sortable: true, resizable: true},
                        {label: '优惠券数量', prop: 'couponCount', sortable: true, resizable: true},
                        {label: '优惠券未占用数量', prop: 'remainderCouponCount', sortable: true, resizable: true},
                        {label: '金额区间下限', prop: 'applyAmtLow', sortable: true, resizable: true},
                        {label: '金额区间上限', prop: 'applyAmtUp', sortable: true, resizable: true},
                        {label: '借款期限(月)', prop: 'loanTerm', sortable: true, resizable: true},
                        {
                            label: '还款方式',
                            prop: 'repayMethod',
                            sortable: true,
                            resizable: true,
                            dataCode: 'ACT_REPAY_METHED'
                        },
                        {
                            label: '是否新人专属',
                            prop: 'newcomersExclusive',
                            sortable: true,
                            resizable: true,
                            dataCode: 'ACT_NEWCOMERS'
                        },
                        {label: '活动状态', prop: 'activityStatus', sortable: true, resizable: true, dataCode: 'ACT_STS'},
                        {label: '创建日期', prop: 'createTime', sortable: true, resizable: true},
                        {label: '创建人', prop: 'createUser', sortable: true, resizable: true},
                        {label: '最后修改人', prop: 'lastUpdateUser', sortable: true, resizable: true},
                        {label: '最后修改时间', prop: 'lastUpdateTime', sortable: true, resizable: true}
                    ],

                    updateButtons: [
                        {
                            label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                _self.dialogVisible = false;
                            }
                        },
                        {
                            label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                                var data = _self.$refs.activityInfo.formModel;
                                _self.$confirm('请确认是否保存？', '提示').then(function (action) {
                                    if (action === 'confirm') {
                                        yufp.service.request({
                                            method: "PUT",
                                            url: backend.consoleService + '/api/activity/info',
                                            data: data,
                                            callback: function (code, message, response) {
                                                if (code == 0){
                                                    if (response.rows == 1) {
                                                        _self.$refs.activityInfo.resetFn();
                                                        _self.$refs.reftable.remoteData();
                                                        _self.$message('操作成功');
                                                        _self.dialogVisible = false;
                                                    }else if (response.rows == -2){
                                                        _self.$message({ message: '运营活动不允许修改为待生效！', type: 'warning' });
                                                    }else if (response.rows == -3){
                                                        _self.$message({ message: '运营活动已终止不允许修改！', type: 'warning' });
                                                    }else if (response.rows == -4){
                                                        _self.$message({ message: '该产品下已存在此渠道正在使用中的运营活动,请核查', type: 'warning' });
                                                    }else {
                                                        _self.$message({ message: '操作失败！', type: 'warning' });
                                                    }
                                                }else {
                                                    _self.$message({ message: '操作失败！', type: 'warning' });
                                                }
                                            }
                                        });
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
                    height: yufp.frame.size().height - 103,
                    dialogVisible: false,
                    formDisabled: false,
                    creditDisabled: true,
                    creditDialogVisible: false,
                    isEditOp: true,
                    // updatedialogVisible:false,
                    // viewType: 'DETAIL',
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
                switchBankRel: function () {
                    var _self = this;
                    var bankRel = _self.$refs.activityInfo.formModel.cusBankRel;
                    this.$nextTick(function () {
                        if (bankRel == '02' || bankRel == '04') {
                            return true;
                        } else {
                            return false;
                        }
                    })
                },

                /**
                 * @param viewType 表单类型
                 * @param editable 可编辑,默认false
                 */
                switchStatus: function (viewType, editable) {
                    var _self = this;
                    _self.viewType = viewType;
                    _self.updateButtons[0].hidden = !editable;
                    _self.updateButtons[1].hidden = !editable;
                    _self.updateButtons[2].hidden = editable;
                    _self.formDisabled = !editable;
                    _self.dialogVisible = true;
                },
                switchParamStatusFalse: function () {
                    var _self = this;
                    var arg = Array.prototype.slice.call(arguments);
                    arg.forEach(function (item) {
                        _self.$refs.activityInfo.switch(item, 'hidden', false);
                    });
                    _self.$refs.activityInfo.rebuildFn();
                },


                modifyFn: function () {
                    var _self = this;
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    this.switchStatus('EDIT', true);
                    _self.isEditOp = false;
                    this.$nextTick(function () {
                        _self.$refs.activityInfo.resetFn();
                        _self.switchParamStatusFalse('activityStatus');
                        this.$refs.activityInfo.switch('prdCode', 'disabled', true);
                        this.$refs.activityInfo.switch('prdType', 'disabled', true);
                        this.$refs.activityInfo.switch('activityStartTime', 'disabled', true);
                        this.$refs.activityInfo.switch('activityEndTime', 'disabled', true);
                        this.$refs.activityInfo.switch('couponType', 'disabled', true);
                        this.$refs.activityInfo.switch('discountRate', 'disabled', true);
                        this.$refs.activityInfo.switch('couponCount', 'disabled', true);
                        this.$refs.activityInfo.switch('applyAmtLow', 'disabled', true);
                        this.$refs.activityInfo.switch('applyAmtUp', 'disabled', true);
                        this.$refs.activityInfo.switch('loanTerm', 'disabled', true);
                        this.$refs.activityInfo.switch('repayMethod', 'disabled', true);
                        this.$refs.activityInfo.switch('newcomersExclusive', 'disabled', true);
                        var obj = this.$refs.reftable.selections[0];
                        yufp.extend(this.$refs.activityInfo.formModel, obj);
                    });
                },


                //查看按钮
                infoFn: function () {

                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }

                    this.switchStatus('DETAIL', false);
                    var _self = this;
                    _self.isEditOp = true;
                    _self.updateButtons[2].hidden = false;
                    var obj = _self.$refs.reftable.selections[0];
                    // _self.baseParams = {
                    //     //cusId: obj.cusId
                    //     actId: obj.actId
                    // };
                    _self.baseParamsActivityInfo = {
                        //cusId: obj.cusId
                        actId: obj.actId
                    };
                    this.$nextTick(function () {
                        _self.$refs.activityInfo.resetFn();
                        _self.$refs.activityInfoReftable.remoteData(_self.baseParamsActivityInfo);
                        yufp.util.copyObj(this.$refs.activityInfo.formModel, obj);
                    });
                },
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
