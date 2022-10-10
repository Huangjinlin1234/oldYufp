/**
 * @create by chenqm1 on 2018-05-03
 * @description 预授信名单表
 */
define([
    './custom/widgets/js/YufpFrozenSelector.js'
], function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,STD_ZB_CERT_TYP,STD_ZX_YES_NO,FREEZE_REASON_TYPE,STD_ZB_APPR_STATUS');
        var vm = yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    valiPagePluginData: true,
                    loanDetailUrl: backend.creditService + '/api/lmt/cont/no/acc/loans',
                    passUrl: backend.riskService + '/api/rsc/warn/loans/lmt/cont/no',
                    baseInfoFields: [{
                        columnCount: 2,
                        fields: [{
                                field: 'lmtContNo',
                                label: '额度号',
                                rules: [{
                                    required: true,
                                    message: '必填项',
                                    trigger: 'blur'
                                }],
                                is: "yufp-frozen-selector",
                                params: {
                                    status: 'FREEZE'
                                },
                                type: "custom",
                                selectFn: function (value, model, args) {
                                    var serno = {
                                        serno: args[1].lmtSerno
                                    };
                                    _self.$refs.loanDetailTable.remoteData(serno);
                                    model.mainBrId = yufp.session.org.orgCode;
                                    model.createUser = yufp.session.userId;
                                    model.aprvDate = yufp.util.dateFormat(new Date().getTime(), '{y}-{m}-{d}');
                                    _self.queryBalance(args[1]);
                                },
                            },
                            {
                                field: 'mainBrId',
                                label: '受理机构',
                                disabled: true
                            },
                            {
                                field: 'unfrzSerno',
                                label: '解冻流水号',
                                hidden: true
                            },
                            {
                                field: 'createUser',
                                label: '申请人',
                                disabled: true
                            },
                            {
                                field: 'aprvDate',
                                label: '申请时间',
                                disabled: true
                            }
                        ]
                    }],
                    loanDetailColumns: [{
                            label: '借据号',
                            prop: 'billNo',
                            resizable: true
                        },
                        {
                            label: '客户名称',
                            prop: 'cusName',
                            resizable: true
                        },
                        {
                            label: '贷款本金余额(元)',
                            prop: 'loanBalance',
                            resizable: true
                        },
                        {
                            label: '未结利息',
                            prop: 'delayIntCumu',
                            resizable: true
                        },
                        {
                            label: '罚息',
                            prop: 'unpdArrsIntBal',
                            resizable: true
                        },
                        {
                            label: '贷款利率',
                            prop: 'realityIrY',
                            resizable: true,
                            formatter: function(row, column, cellValue) {
                                var num = parseFloat(cellValue);
                                if (typeof(num) == 'undefined'  || num == null || isNaN(num) )
                                    num = 0;
                                var rateY = Number(num * 100).toFixed(4) + '%';
                                return rateY;
                            }
                        },
                        {
                            label: '借据期限(天)',
                            prop: 'loanDay',
                            resizable: true
                        },
                        {
                            label: '七级分类',
                            prop: 'sevenResult',
                            resizable: true,
                            dataCode: 'STD_ZB_SEVEN_SORT'
                        }
                    ],
                    amtAndReasonFields: [{
                        columnCount: 2,
                        fields: [{
                            field: 'lmtAmt',
                            label: '解冻金额(元)',
                            disabled: true
                        }]
                    }, {
                        columnCount: 2,
                        fields: [{
                            field: 'remarks',
                            label: '解冻原因',
                            type: 'textarea',
                            rows: 6,
                            rules: [{
                                required: true,
                                message: '必填项',
                                trigger: 'blur'
                            }]
                        }]
                    }],
                    passColumns: [{
                            label: '规则ID',
                            prop: 'ruleCode',
                            sortable: true,
                            resizable: true
                        },
                        {
                            label: '规则名称',
                            prop: 'ruleName',
                            sortable: true,
                            resizable: true
                        },
                        {
                            label: '预警时间',
                            prop: 'riskDate',
                            sortable: true,
                            resizable: true
                        }
                    ],
                    height: yufp.frame.size().height - 103,
                    dialogVisible: false,
                    formDisabled: false,
                    viewType: 'DETAIL',
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    expandCollapseName: ['baseInfo', 'loanDetail', 'amtAndReason'],
                    tabName: 'first'
                };
            },
            methods: {
                /**
                 * @param ctrlCode 操作码
                 */
                checkPermission: function (ctrlCode) {
                    return true; //yufp.session.checkCtrl(ctrlCode, cite.menuId);
                },
                /** 查询余额 */
                queryBalance: function (obj) {
                    var _self = this;
                    yufp.service.request({
                        method: 'POST',
                        url: backend.creditService + '/api/lmt/prd/getContResult',
                        data: obj,
                        callback: function (code, message, response) {
                            if (code == 0) {
                                var price = _self.priceFormat(response.data.balance);
                                vm.$refs.amtAndReasonForm.formModel.balance = price;
                            } else
                                _self.$message({
                                    message: '查询产品额度余额出错',
                                    type: 'warning'
                                });

                        }
                    });
                },
                priceFormat: function (value) {
                    var price = value;
                    return yufp.util.moneyFormatter(price, 2);
                },
                tabClick: function() {

                }
            },
            mounted: function () {
                data.children = this;
                var param = data.datas[data.dataKey];
                var obj = param;
                var serno = {
                    lmtContNo: obj.lmtContNo
                };
                this.$nextTick(function () {
                    yufp.util.copyObj(this.$refs.baseInfoform.formModel , obj);
                    yufp.util.copyObj(this.$refs.amtAndReasonForm.formModel , obj);
                    this.$refs.loanDetailTable.remoteData(serno);
                    this.$refs.amtAndReasonForm.formModel.lmtAmt = row.lmtAmt;
                    //this.queryBalance(obj);
                    if ( this.$refs.passTable ) {
                        this.$refs.passTable.remoteData(serno);
                    }
                });
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