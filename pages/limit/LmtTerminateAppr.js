/**
 * @create xzw
 * @description 额度终止流程审批查看页面
 * @createDate 2018-08-24
 */
define(function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        // 引入字典项
        yufp.lookup.reg('STD_ZB_CERT_TYP,CYCLIC_FLG,APRV_STATUS,APPLY_CHANNEL_TYPE');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    //  申请信息表
                    updateFields: [{
                        columnCount: 3,
                        fields: [
                            { field: 'terminateSerno', label: '终止流水号' ,disabled: true  },
                            { field: 'lmtContNo', label: '授信协议编号',disabled: true  },
                            { field: 'cusId', label: '客户编号',disabled: true  },

                            { field: 'cusName', label: '客户名称' ,disabled: true  },
                            { field: 'certType', label: '证件类型',disabled: true  ,type: 'select',dataCode: 'STD_ZB_CERT_TYP'},
                            { field: 'certCode', label: '证件号码',disabled: true   },

                            { field: 'lmtAmt', label: '授信额度',disabled: true } ,
                            { field: 'availAmt', label: '可用额度',disabled: true   },
                            { field: 'cyclicFlg', label: '是否循环',disabled: true ,type: 'select',dataCode: 'CYCLIC_FLG' },

                            { field: 'createUser', label: '终止申请人' ,disabled: true  },
                            { field: 'terminateReason', label: '终止原因', type: 'textarea',disabled: true },
                            { field: 'remarks', label: '备注',disabled: true   },

                            { field: 'approveStatus', label: '审批状态',disabled: true ,type: 'select',dataCode: 'APRV_STATUS' },
                            { field: 'channelNo', label: '渠道号',disabled: true ,type: 'select',dataCode: 'APPLY_CHANNEL_TYPE'  },
                            { field: 'applyDate', label: '申请日期' ,disabled: true  },

                            { field: 'prdId', label: '产品id',disabled: true   },
                            { field: 'prdCode', label: '产品编码',disabled: true   },
                            { field: 'prdName', label: '产品名称',disabled: true  },

                            { field: 'orgName', label: '归属机构',disabled: true   },
                            { field: 'cusManagerName', label: '客户经理',disabled: true  },
                            { field: 'aprvComment', label: '人工处理意见' ,disabled: true  },

                            { field: 'createTime', label: '创建时间' ,disabled: true  },
                            { field: 'lastUpdateUserName', label: '最后修改人',disabled: true  },
                            { field: 'lastUpdateTime', label: '最后修改时间',disabled: true   }
                        ]
                    }],
                    height: yufp.frame.size().height - 103,
                    dialogVisible: false,
                    formDisabled: false,
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    valiPagePluginData: true,
                }
            },
            methods: {

            },
            mounted: function () {
                data.children = this;
                var obj = data.datas[data.dataKey];
                this.valiPagePluginData = true;
                var _self = this;
                this.$nextTick(function(){
                    yufp.extend(this.$refs.reform.formModel, obj);
                });
            } // end of mounted
        });
    };
    // 消息处理
    exports.onmessage = function (type, message) {};
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {}
});
