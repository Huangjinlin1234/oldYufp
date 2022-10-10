/**
 * @create by ligm on 2019-08-27
 * @description 催收任务分配
 */
define(['./custom/widgets/js/ColltTaskInfoSelector.js'
],function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,COOPR_ORG_TYPE');
        yufp.custom.vue({
            components: {
                FileUpload: window.VueUploadComponent
            },
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    /**主页面列表 start*/
                    dataUrl: backend.riskmService + "/api/collt/task/comm",
                    baseParams: {
                        colltWay:'05'
                    },
                    queryFields: [
                        {placeholder: '机构编号', field: 'outsOrgCode', type: 'input'},
                        {placeholder: '机构名称', field: 'outsOrgName', type: 'input'},
                        {placeholder: '分配时间', field: 'aprvTime', type: 'date'}
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

                    tableColumns: [//collt_task_distr
                        {label: '分配批次', prop: 'colltBatchNo', sortable: true, resizable: true},
                        {label: '机构编号', prop: 'outsOrgCode', sortable: true, resizable: true},
                        {label: '机构名称', prop: 'outsOrgName', sortable: true, resizable: true},
                        {label: '合作机构类型', prop: 'cooprOrgType', sortable: true, resizable: true,dataCode:'COOPR_ORG_TYPE'},
                        {label: '佣金率', prop: 'commRate', sortable: true, resizable: true, hidden:true,
                            formatter: function (row, column, cellValue) {
                                if (!row.commRate) {
                                    return row.commRate;
                                } else {
                                    return yufp.util.toPercent(row.commRate, 2);
                                }
                            }
                        },
                        {label: '一手佣金率', prop: 'primCommRate', sortable: true, resizable: true, hidden:true,
                            formatter: function (row, column, cellValue) {
                                if (!row.primCommRate) {
                                    return row.primCommRate;
                                } else {
                                    return yufp.util.toPercent(row.primCommRate, 2);
                                }
                            }
                        },
                        {label: '二手佣金率', prop: 'secdCommRate', sortable: true, resizable: true, hidden:true,
                            formatter: function (row, column, cellValue) {
                                if (!row.secdCommRate) {
                                    return row.secdCommRate;
                                } else {
                                    return yufp.util.toPercent(row.secdCommRate, 2);
                                }
                            }
                        },
                        {label: '三手佣金率', prop: 'thdCommRate', sortable: true, resizable: true, hidden:true,
                            formatter: function (row, column, cellValue) {
                                if (!row.thdCommRate) {
                                    return row.thdCommRate;
                                } else {
                                    return yufp.util.toPercent(row.thdCommRate, 2);
                                }
                            }
                        },
                        {label: '长账龄佣金率', prop: 'longAgeCommRate', sortable: true, resizable: true, hidden:true,
                            formatter: function (row, column, cellValue) {
                                if (!row.longAgeCommRate) {
                                    return row.longAgeCommRate;
                                } else {
                                    return yufp.util.toPercent(row.longAgeCommRate, 2);
                                }
                            }
                        },
                        {label: '分配时间', prop: 'aprvTime', sortable: true, resizable: true},
                        {label: '操作员', prop: 'aprvUserName', sortable: true, resizable: true},
                        {label: '操作员所属机构', prop: 'aprvUserOrgName', sortable: true, resizable: true}
                    ],

                    refInfoFields: [{
                        columnCount: 2,
                        fields: [
                            { field: 'colltBatchNo', label: '分配批次'},
                            { field: 'outsOrgCode', label: '机构编号'},
                            { field: 'outsOrgName', label: '机构名称'},
                            { field: 'cooprOrgType', label: '合作机构类型', type:'select',dataCode:'COOPR_ORG_TYPE'},
                            { field: 'distrLmt', label: '分配总金额'},
                            { field: 'commRate', label: '佣金率',type: 'num',digit: 2,formatter: yufp.util.decimalToPercent},
                            { field: 'commLmtTotal', label: '回收金额', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                            { field: 'commLmt', label: '佣金金额'},
                            { field: 'primCommOverLmtTotal', label: '一手分配总金额', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                            { field: 'primCommRate', label: '一手佣金率',type: 'num',digit: 2,formatter: yufp.util.decimalToPercent},
                            { field: 'primCommLmtTotal', label: '一手回收金额', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                            { field: 'primCommLmt', label: '一手佣金金额'},
                            { field: 'secdCommOverLmtTotal', label: '二手分配总金额', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                            { field: 'secdCommRate', label: '二手佣金率',type: 'num',digit: 2,formatter: yufp.util.decimalToPercent},
                            { field: 'secdCommLmtTotal', label: '二手回收金额', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                            { field: 'secdCommLmt', label: '二手佣金金额'},
                            { field: 'thdCommOverLmtTotal', label: '三手分配总金额', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                            { field: 'thdCommRate', label: '三手佣金率',type: 'num',digit: 2,formatter: yufp.util.decimalToPercent},
                            { field: 'thdCommLmtTotal', label: '三手回收金额', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                            { field: 'thdCommLmt', label: '三手佣金金额'},
                            { field: 'longAgeCommOverLmtTotal', label: '长账龄分配总金额', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                            { field: 'longAgeCommRate', label: '长账龄佣金率',type: 'num',formatter: yufp.util.decimalToPercent},
                            { field: 'longAgeCommLmtTotal', label: '长账龄回收金额', type: 'num', digit: 2, formatter: yufp.util.moneyFormatter},
                            { field: 'longAgeCommLmt', label: '长账龄佣金金额'},
                            { field: 'aprvTime', label: '分配时间'},
                            { field: 'aprvUserName', label: '操作员'},
                            { field: 'aprvUserOrgName', label: '操作员所属机构'}
                        ]
                    }],
                    refInfoButtons:[
                        {
                            label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                _self.$refs.refInfo.resetFn();
                                _self.dialogVisible = false;
                            }
                        }
                    ],
                    height: yufp.frame.size().height - 103,
                    dialogVisible:false,
                    formDisabled: true,
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
                    // _self.updateButtons[1].hidden = !editable;
                    // _self.formDisabled = !editable;
                    // _self.dialogVisible = true;
                },
                switchParamsStatus: function () {
                    var _self = this;
                    var arg = Array.prototype.slice.call(arguments);
                    if (arg[0] != '001') {
                        _self.$refs.refInfo.switch(arg[1], 'hidden', false);
                        _self.$refs.refInfo.switch(arg[2], 'hidden', false);
                        _self.$refs.refInfo.switch(arg[3], 'hidden', false);
                        _self.$refs.refInfo.switch(arg[4], 'hidden', false);
                        for (var i = 5; i < arg.length; i++) {
                            _self.$refs.refInfo.switch(arg[i], 'hidden', true);
                        }
                    } else {
                        _self.$refs.refInfo.switch(arg[1], 'hidden', true);
                        _self.$refs.refInfo.switch(arg[2], 'hidden', true);
                        _self.$refs.refInfo.switch(arg[3], 'hidden', true);
                        _self.$refs.refInfo.switch(arg[4], 'hidden', true);
                        for (var i = 5; i < arg.length; i++) {
                            _self.$refs.refInfo.switch(arg[i], 'hidden', false);
                        }
                    }
                },
                calculateFn:function () {
                    var _self = this;
                    var obj = _self.$refs.reftable.selections[0];
                    if (_self.$refs.reftable.selections.length != 1) {
                        _self.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    _self.dialogVisible = true;

                    _self.$nextTick(function () {
                        _self.$refs.refInfo.resetFn();
                        _self.switchParamsStatus(obj.cooprOrgType,'distrLmt', 'commLmt', 'commRate', 'commLmtTotal',
                            'primCommLmt', 'secdCommLmt', 'thdCommLmt', 'longAgeCommLmt',
                            'primCommRate', 'secdCommRate', 'thdCommRate', 'longAgeCommRate',
                            'primCommLmtTotal', 'secdCommLmtTotal', 'thdCommLmtTotal','longAgeCommLmtTotal',
                            'primCommOverLmtTotal','secdCommOverLmtTotal','thdCommOverLmtTotal','longAgeCommOverLmtTotal');
                    });

                    var conditions = {
                        colltBatchNo: obj.colltBatchNo,
                        outsOrgCode: obj.outsOrgCode,
                        cooprOrgType: obj.cooprOrgType,
                        aprvTime: obj.aprvTime
                    };

                    yufp.service.request({
                        method: "POST",
                        url: backend.riskmService + '/api/collt/task/comm/calcul',
                        data: conditions,
                        callback: function (code, message, response) {
                            if (response.success && null != response.rows) {
                                //处理佣金金额
                                var commLmt = yufp.util.moneyFormatter(response.rows.commRate * response.rows.commLmtTotal,2);
                                var primCommLmt  = yufp.util.moneyFormatter(response.rows.primCommRate * response.rows.primCommLmtTotal,2);
                                var secdCommLmt  = yufp.util.moneyFormatter(response.rows.secdCommRate * response.rows.secdCommLmtTotal,2);
                                var thdCommLmt = yufp.util.moneyFormatter(response.rows.thdCommRate * response.rows.thdCommLmtTotal,2);
                                var longAgeCommLmt = yufp.util.moneyFormatter(response.rows.longAgeCommRate * response.rows.longAgeCommLmtTotal,2);
                                _self.$nextTick(function () {
                                    // _self.$refs.refInfo.resetFn();
                                    // _self.switchParamsStatus(obj.cooprOrgType,'distrLmt', 'commLmt', 'commRate', 'commLmtTotal',
                                    //     'primCommLmt', 'secdCommLmt', 'thdCommLmt', 'longAgeCommLmt',
                                    //     'primCommRate', 'secdCommRate', 'thdCommRate', 'longAgeCommRate',
                                    //     'primCommLmtTotal', 'secdCommLmtTotal', 'thdCommLmtTotal','longAgeCommLmtTotal',
                                    //     'primCommOverLmtTotal','secdCommOverLmtTotal','thdCommOverLmtTotal','longAgeCommOverLmtTotal');
                                    yufp.extend(_self.$refs.refInfo.formModel,obj,
                                        {commLmt:commLmt},
                                        {primCommLmt:primCommLmt},
                                        {secdCommLmt:secdCommLmt},
                                        {thdCommLmt:thdCommLmt},
                                        {longAgeCommLmt:longAgeCommLmt},
                                        {commRate:response.rows.commRate},
                                        {primCommRate:response.rows.primCommRate},
                                        {secdCommRate:response.rows.secdCommRate},
                                        {thdCommRate:response.rows.thdCommRate},
                                        {longAgeCommRate:response.rows.longAgeCommRate},
                                        {commLmtTotal:response.rows.commLmtTotal},
                                        {primCommLmtTotal:response.rows.primCommLmtTotal},
                                        {secdCommLmtTotal:response.rows.secdCommLmtTotal},
                                        {thdCommLmtTotal:response.rows.thdCommLmtTotal},
                                        {longAgeCommLmtTotal:response.rows.longAgeCommLmtTotal},
                                        {commOverLmtTotal:response.rows.commOverLmtTotal},
                                        {primCommOverLmtTotal:response.rows.primCommOverLmtTotal},
                                        {secdCommOverLmtTotal:response.rows.secdCommOverLmtTotal},
                                        {thdCommOverLmtTotal:response.rows.thdCommOverLmtTotal},
                                        {longAgeCommOverLmtTotal:response.rows.longAgeCommOverLmtTotal})
                                        // {cooprOrgType:response.rows.cooprOrgType})
                                })
                            } else {
                                _self.dialogVisible = false;
                                _self.$message({ message: '操作失败. ' + response.message , type: "warning" });
                            }
                        }
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
