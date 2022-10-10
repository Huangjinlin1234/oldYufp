/**
 * @create by xzw
 * @description 风险分类调整解除审批查看页面
 * @createDate 2019-09-10
 */
define(function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        // 引入字典项
        yufp.lookup.reg('STD_ZB_FIVE_SORT,S_ZB_GENE_WAY,APPLY_CHANNEL_TYPE,STD_ZB_ACC_STATUS,STD_ZB_ASSURE_MEANS,STD_ZB_CERT_TYP,APRV_STATUS,S_ZB_TASK_TYPE');
        var vm = yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    updateFields: [{
                        columnCount: 3,
                        fields: [
                            { field: 'rscRmNo', label: '分类解除流水号',disabled: true},
                            { field: 'rscAdjNo', label: '分类调整流水号',disabled: true},
                            { field: 'adjustBasic', label: '机评分类结果',type: 'select',dataCode:'STD_ZB_FIVE_SORT',disabled: true },
                            { field: 'adjustResult', label: '调整后分类结果',type: 'select',dataCode:'STD_ZB_FIVE_SORT',disabled: true},
                            { field: 'geneWay', label: '生成方式',type: 'select',dataCode:'S_ZB_GENE_WAY',disabled: true},
                            { field: 'createUser', label: '申请人',disabled: true },
                            { field: 'inputBrId', label: '申请人所属机构',disabled: true },
                            { field: 'appDate', label: '申请日期',disabled: true},
                            { field: 'taskAdjustDesc', label: '解除理由',type:'textarea',disabled: true},

                            { field: 'channelNo', label: '渠道编号',disabled: true,type: 'select',dataCode:'APPLY_CHANNEL_TYPE'},
                            { field: 'prdName', label: '产品名称',disabled: true},
                            { field: 'billNo', label: '借据编号',disabled: true },
                            { field: 'loanAmount', label: '借据金额',disabled: true},
                            { field: 'loanBalance', label: '借据余额',disabled: true},
                            { field: 'accountStatus', label: '借据状态',disabled: true,type: 'select',dataCode:'STD_ZB_ACC_STATUS'  },
                            { field: 'overdueDate', label: '逾期天数',disabled: true},
                            { field: 'loanStartDate', label: '贷款起始日期',disabled: true},
                            { field: 'loanEndDate', label: '贷款终止日期',disabled: true},
                            { field: 'assureMeansMain', label: '担保方式',disabled: true,type: 'select',dataCode:'STD_ZB_ASSURE_MEANS'},

                            { field: 'cusName', label: '客户名称',disabled: true },
                            { field: 'cusId', label: '客户编号',disabled: true},
                            { field: 'certType', label: '证件类型',disabled: true,type: 'select',dataCode: 'STD_ZB_CERT_TYP'},
                            { field: 'certCode', label: '证件号码',disabled: true},

                            { field: 'apprStatus', label: '审批状态',disabled: true,type: 'select',dataCode:'APRV_STATUS'},
                            { field: 'apprDate', label: '审批日期',disabled: true},
                            { field: 'aprvUserCode', label: '审批人编号',disabled: true},
                            { field: 'aprvComment', label: '人工处理意见',disabled: true},
                            { field: 'taskType', label: '分类类型',disabled: true,type: 'select', dataCode: 'S_ZB_TASK_TYPE'},
                            { field: 'mainBrId', label: '主管机构',disabled: true},
                            { field: 'cusManager', label: '客户经理',disabled: true},
                            { field: 'createTime', label: '创建时间',disabled: true},
                            { field: 'lastUpdateUser', label: '最后更新人',disabled: true},
                            { field: 'lastUpdateTime', label: '最后更新时间',disabled: true},

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
