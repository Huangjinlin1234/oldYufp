define([
        './custom/widgets/js/PrdIdInfoSelector.js',
        './custom/widgets/js/OrgPartSelector.js'
    ], function (require, exports) {
// page加载完成后调用ready方法
        exports.ready = function (hashCode, data, cite) {
            yufp.lookup.reg('KEEP_ACCT_STA');
            var vm = yufp.custom.vue({
                el: cite.el,
                data: function () {
                    return {
                        totalServiceFee: 0,
                        size: 10,
                        page:1,
                        bizSerno: '',
                        valiPagePluginData: true,
                        expandCollapseName: ['previewRef'],
                        prevUrl: backend.consoleService + '/api/shareProfit/approving',
                        previewData: [],
                        keepAcctSta: 3,
                        previewTableColumns: [
                            {label: '分润年月', prop: 'shareProfitMonth', resizable: true},
                            {label: '机构号', prop: 'orgCode', resizable: true},
                            {label: '机构名称', prop: 'orgName', resizable: true},
                            {label: '技术服务费', prop: 'serviceFee', resizable: true,formatter: (row,column,cellValue) => cellValue.toFixed(2)},
                        ],
                    }
                },
                methods: {
                    returnFn() {

                    },
                    commitFn() {

                    },
                    loaded() {
                        var _self = this
                        yufp.service.request({
                            url: backend.consoleService + '/api/shareProfit/getTotalServiceFee',
                            data: {
                                bizSerno: _self.bizSerno,
                            },
                            method: 'GET',
                            callback(code,message,res) {
                                _self.totalServiceFee = res.rows
                            }
                        })
                    },
                },
                mounted() {
                    data.children = this
                    this.valiPagePluginData = true
                    this.bizSerno = data.e_bizSerno
                    this.$refs.previewRef.remoteData({
                        bizSerno: data.e_bizSerno
                    })
                }
            })
        }
    }
)