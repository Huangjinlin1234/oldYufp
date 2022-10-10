/**
 * @create by chenqm1 on 2018-05-03
 * @description 额度冻结审批查看
 */
define([
    './custom/widgets/js/YufpFrozenSelector.js'
], function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,STD_ZB_CONT_STATUS,STD_ZB_CERT_TYP,STD_ZX_YES_NO,FREEZE_REASON_TYPE,STD_ZB_APPR_STATUS');
        var vm = yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    expandCollapseName: ['1', '2'],
                    baseParams: {},
                    contUrl: backend.ctrService + "/api/ctr/loan/contSerno",
                    contListColumns: [{
                            label: '合同号',
                            prop: 'contNo',
                            sortable: true,
                            resizable: true
                        },
                        {
                            label: '客户名称',
                            prop: 'cusName',
                            sortable: true,
                            resizable: true
                        },
                        {
                            label: '合同金额(元)',
                            prop: 'contAmt',
                            sortable: true,
                            resizable: true
                        },
                        {
                            label: '合同状态',
                            prop: 'contState',
                            dataCode: 'STD_ZB_CONT_STATUS',
                            sortable: true,
                            resizable: true
                        }
                    ],
                    updateFields: [{
                        columnCount: 3,
                        fields: [{
                                field: 'lmtContNo',
                                label: '授信协议号'
                            },
                            {
                                field: 'balance',
                                label: '产品剩余可用额度(元)',
                                disabled: true,
                                hidden:true,
                                formatter: yufp.util.moneyFormatter
                        
                            },
                            {
                                field: 'lmtAmt',
                                label: '额度(元)',
                                disabled: true,
                                formatter: yufp.util.moneyFormatter
                            },
                            {
                                field: 'cusId',
                                label: '客户号',
                                disabled: true
                            },
                            {
                                field: 'cusName',
                                label: '客户名称',
                                disabled: true
                            },
                            {
                                field: 'certType',
                                label: '证件类型',
                                disabled: true,
                                type: 'select',
                                dataCode: 'STD_ZB_CERT_TYP'
                            },
                            {
                                field: 'certCode',
                                label: '证件号码',
                                disabled: true
                            },
                            {
                                field: 'cyclicFlg',
                                label: '是否循环',
                                disabled: true,
                                type: 'select',
                                hidden:true,
                                dataCode: 'STD_ZX_YES_NO'
                            }
                        ]
                    }, {
                        columnCount: 2,
                        fields: [{
                            field: 'remarks',
                            label: '终止原因',
                            type: 'textarea'
                        }]
                    }],

                    height: yufp.frame.size().height - 103,
                    dialogVisible: false,
                    formDisabled: false,
                    viewType: 'DETAIL',
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    lmtTerminateApp: null
                };
            },
            methods: {
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
                                vm.$refs.baseRef.formModel.balance = price;
                            } else
                                _self.$message({
                                    message: '查询产品剩余可用额度出错',
                                    type: 'warning'
                                });

                        }
                    });
                },
                priceFormat: function (value) {
                    var price = value;
                    return yufp.util.moneyFormatter(price, 2);
                },
                //验证是否可以提交
                valiPagePluginData: function( valiAsynFn ) {
                    var _self = this;
                    var apprInfo = data.getApprInfo(); //获取审批信息
                    if( apprInfo == null || apprInfo.aprvOpinion == '' ){
                        this.$message({type: 'warning', message: '请先选择审批信息!'});
                        valiAsynFn(false);
                        return ;
                    }
                    var obj = {
                        bizSerno: data.e_bizSerno,
                        aprvOpinion: apprInfo.aprvOpinion,
                        aprvComment: apprInfo.aprvComment
                    };
                    yufp.service.request({
                        method: 'POST',
                        url: backend.creditService + '/api/lmt/deal/lmt/terminate',
                        data: obj,
                        callback: function (code, message, response) {
                            var data = response.data;
                            if (data > 0) {
                                valiAsynFn(true);
                            }else {
                                _self.$message({type: 'warning', message: response.message});
                                valiAsynFn(false);
                            }
                        }
                    });

                }
            },
            mounted: function () {
                data.children = this;
                var param = data.datas[data.dataKey];
                this.lmtTerminateApp = param;
                var serno = {
                    lmtContNo: this.lmtTerminateApp.lmtContNo
                };
                this.$nextTick(function(){
                    this.$refs.mytable.remoteData(serno);
                    yufp.extend(this.$refs.baseRef.formModel, this.lmtTerminateApp);
                    //this.queryBalance(serno);
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