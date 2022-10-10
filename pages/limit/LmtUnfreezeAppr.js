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
                    expandCollapseName: ['1', '2'],
                    updateFields: [{
                        columnCount: 3,
                        fields: [
                            { field: 'unfrzSerno', label: '解冻流水号' ,disabled: true  },
                            { field: 'lmtContNo', label: '授信协议编号',disabled: true  },
                            { field: 'cusId', label: '客户编号',disabled: true  },

                            { field: 'cusName', label: '客户名称' ,disabled: true  },
                            { field: 'certType', label: '证件类型',disabled: true  ,type: 'select',dataCode: 'STD_ZB_CERT_TYP'},
                            { field: 'certCode', label: '证件号码',disabled: true   },

                            { field: 'lmtAmt', label: '授信额度',disabled: true } ,
                            { field: 'availAmt', label: '可用额度',disabled: true   },
                            { field: 'cyclicFlg', label: '是否循环',disabled: true ,type: 'select',dataCode: 'CYCLIC_FLG' },

                            { field: 'createUser', label: '申请人' ,disabled: true  },
                            { field: 'unfrzReason', label: '解冻原因', type: 'textarea',disabled: true },
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
                    dataUrlAnnex: backend.riskmService + '/api/mon/relief/ann',
                    baseParamsAnnex:{},
                    tableColumnsAnnex:[
                        { label: '额度解冻申请流水号', prop: 'flowAppNo', sortable: true, resizable: true },
                        { label: '借据号', prop: 'bizSerno', sortable: true, resizable: true ,hidden:true},
                        { label: '附件名称', prop: 'annexName', sortable: true, resizable: true },
                        { label: '附件描述', prop: 'annexDesc', sortable: true, resizable: true },
                        { label: '上传人', prop: 'uploadUser', sortable: true, resizable: true },
                        { label: '上传时间', prop: 'uploadTime', sortable: true, resizable: true },
                        { label: '最后更新人', prop: 'lastUploadUser', sortable: true, resizable: true },
                        { label: '最后更新时间', prop: 'lastUploadTime', sortable: true, resizable: true }
                    ],
                    height: yufp.frame.size().height - 103,
                    dialogVisible: false,
                    formDisabled: false,
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    valiPagePluginData: true,
                }
            },
            methods: {
                infoAnnexFn: function(){
                    this.$nextTick(function(){
                        var _self = this;
                        if (this.$refs.reftableAnnex.selections.length != 1 ) {
                            this.$message({ message: '请选择一条数据！', type: 'warning' });
                            return;
                        }
                        var right = '0100001';
                        var biz = this.$refs.reftableAnnex.selections[0].flowAppNo;
                        var date = this.$refs.reftableAnnex.selections[0].uploadTime.slice(0,10).replace(/\-/g,"");
                        _self.$confirm('将前往影像平台查看影像资料，是否继续？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            center: true,
                            callback: function (action) {
                                if (action === 'confirm') {
                                    yufp.service.request({
                                        method: 'POST',
                                        url: backend.edocService + "/api/doEncode",
                                        data: {
                                            applySeq : biz,
                                            sessionUserId: yufp.session.userId,
                                            sessionUserName: yufp.session.userName,
                                            sessionOrgCode: yufp.session.org.orgCode,
                                            sessionOrgName: yufp.session.org.orgName,
                                            startDate : date,
                                            rightCode : right
                                        },
                                        callback: function (code, message, response) {
                                            var row = response.rows;
                                            if (code == 0 && response.code == 0) {
                                                // row 为加密后的完整url请求
                                                window.open(row,'_blank');
                                            } else {
                                                this.$message("获取影像系统信息失败：" + response.message);
                                            }
                                        }
                                    });

                                }
                            }
                        });
                    });
                },

            },
            mounted: function () {
                data.children = this;
                var obj = data.datas[data.dataKey];
                this.valiPagePluginData = true;
                var _self = this;
                _self.baseParamsAnnex = {
                    flowAppNo : data.e_bizSerno,
                    bizSerno : data.e_bizSerno
                };
                _self.$nextTick(function(){
                    yufp.extend(this.$refs.reform.formModel, obj);
                    _self.$refs.reftableAnnex.remoteData(_self.baseParamsAnnex);
                });

            } // end of mounted
        });
    };
    // 消息处理
    exports.onmessage = function (type, message) {};
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {}
});
