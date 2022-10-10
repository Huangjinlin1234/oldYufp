/**
 * @create by xzw
 * @description 专项催收人工流转审批查看页面
 * @createDate 2019-09-10
 */
define(function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        // 引入字典项
    	 yufp.lookup.reg('COOPR_ORG_TYPE,VERSION_STATUS,COOPR_STS');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    expandCollapseName: ['tableOuts', 'tableLaw', 'tableRisk'],
                    baseParamsOuts:{},
                    dataUrlOuts: backend.flowService + '/api/case/distr/appr',
                    //  委外机构基本申请信息表
                    tableColumnsOuts:[
                        { label: '版本号', prop: 'versionNo', sortable: true, resizable: true },
                        { label: '案件分配比申请流水号', prop: 'caseDistrAppNo', sortable: true, resizable: true },
                        { label: '合作机构类型', prop: 'cooprOrgType', sortable: true, resizable: true,type:'select',dataCode:'COOPR_ORG_TYPE'},
                        { label: '合作机构编号', prop: 'cooprOrgNo', sortable: true, resizable: true },
                        { label: '合作机构名称', prop: 'cooprOrgName', sortable: true, resizable: true },
                        { label: '合作状态', prop: 'cooprStatus', sortable: true, resizable: true ,type:'select',dataCode:'COOPR_STS'},
                        { label: '版本状态', prop: 'versionSts', sortable: true, resizable: true ,type:'select',dataCode:'VERSION_STATUS'},
                        { label: '长账龄案件占比', prop: 'longAgeCaseRatio', sortable: true, resizable: true ,
                            formatter: function (row, column, cellValue) {
                                return (parseFloat(String(row.longAgeCaseRatio).replace('%','')) * 100).toFixed(2)+'%';
                            }
                        },
                        { label: '案件占比', prop: 'caseRatio', sortable: true, resizable: true, hidden: true},
                        { label: '一手案件占比', prop: 'primCaseRatio', sortable: true, resizable: true ,
                            formatter: function (row, column, cellValue) {
                                return (parseFloat(String(row.primCaseRatio).replace('%','')) * 100).toFixed(2)+'%';
                            }
                        },
                        { label: '二手案件占比', prop: 'secdCaseRatio', sortable: true, resizable: true ,
                            formatter: function (row, column, cellValue) {
                                return (parseFloat(String(row.secdCaseRatio).replace('%','')) * 100).toFixed(2)+'%';
                            }
                        },
                        { label: '三手案件占比', prop: 'thdCaseRatio', sortable: true, resizable: true ,
                            formatter: function (row, column, cellValue) {
                                return (parseFloat(String(row.thdCaseRatio).replace('%','')) * 100).toFixed(2)+'%';
                            }
                        },
                        { label: '提交人', prop: 'submUserCode', sortable: true, resizable: true },
                        { label: '提交时间', prop: 'subTime', sortable: true, resizable: true },
                        { label: '最后更新人', prop: 'lastUpdateUser', sortable: true, resizable: true },
                        { label: '最后更新时间', prop: 'lastUpdateTime', sortable: true, resizable: true }
                    ],
					
                    //  律师事务所机构基本申请信息表
                    baseParamsLaw:{
                    },
                    dataUrlLaw: backend.flowService + '/api/case/distr/appr',
                    tableColumnsLaw:[
                        { label: '版本号', prop: 'versionNo', sortable: true, resizable: true },
                        { label: '案件分配比申请流水号', prop: 'caseDistrAppNo', sortable: true, resizable: true },
                        { label: '合作机构类型', prop: 'cooprOrgType', sortable: true, resizable: true,type:'select',dataCode:'COOPR_ORG_TYPE'},
                        { label: '合作机构编号', prop: 'cooprOrgNo', sortable: true, resizable: true },
                        { label: '合作机构名称', prop: 'cooprOrgName', sortable: true, resizable: true },
                        { label: '合作状态', prop: 'cooprStatus', sortable: true, resizable: true ,type:'select',dataCode:'COOPR_STS'},
                        { label: '版本状态', prop: 'versionSts', sortable: true, resizable: true ,type:'select',dataCode:'VERSION_STATUS'},
                        { label: '长账龄案件占比', prop: 'longAgeCaseRatio', sortable: true, resizable: true, resizable: true, hidden: true },
                        { label: '案件占比', prop: 'caseRatio', sortable: true, resizable: true,
                            formatter: function (row, column, cellValue) {
                                return (parseFloat(String(row.caseRatio).replace('%','')) * 100).toFixed(2)+'%';
                            }
                        },
                        { label: '一手案件占比', prop: 'primCaseRatio', sortable: true, resizable: true, resizable: true, hidden: true },
                        { label: '二手案件占比', prop: 'secdCaseRatio', sortable: true, resizable: true, resizable: true, hidden: true },
                        { label: '三手案件占比', prop: 'thdCaseRatio', sortable: true, resizable: true, resizable: true, hidden: true },
                        { label: '提交人', prop: 'submUserCode', sortable: true, resizable: true },
                        { label: '提交时间', prop: 'subTime', sortable: true, resizable: true },
                        { label: '最后更新人', prop: 'lastUpdateUser', sortable: true, resizable: true },
                        { label: '最后更新时间', prop: 'lastUpdateTime', sortable: true, resizable: true }
                    ],
                    //  风险机构基本申请信息表
                    baseParamsRisk: {
                    },
                    dataUrlRisk: backend.flowService + '/api/case/distr/appr',
                    tableColumnsRisk:[
                        { label: '版本号', prop: 'versionNo', sortable: true, resizable: true },
                        { label: '案件分配比申请流水号', prop: 'caseDistrAppNo', sortable: true, resizable: true },
                        { label: '合作机构类型', prop: 'cooprOrgType', sortable: true, resizable: true,type:'select',dataCode:'COOPR_ORG_TYPE'},
                        { label: '合作机构编号', prop: 'cooprOrgNo', sortable: true, resizable: true },
                        { label: '合作机构名称', prop: 'cooprOrgName', sortable: true, resizable: true },
                        { label: '合作状态', prop: 'cooprStatus', sortable: true, resizable: true ,type:'select',dataCode:'COOPR_STS'},
                        { label: '版本状态', prop: 'versionSts', sortable: true, resizable: true ,type:'select',dataCode:'VERSION_STATUS'},
                        { label: '长账龄案件占比', prop: 'longAgeCaseRatio', sortable: true, resizable: true, resizable: true, hidden: true },
                        { label: '案件占比', prop: 'caseRatio', sortable: true, resizable: true,
                            formatter: function (row, column, cellValue) {
                                return (parseFloat(String(row.caseRatio).replace('%','')) * 100).toFixed(2)+'%';
                            }
                        },
                        { label: '一手案件占比', prop: 'primCaseRatio', sortable: true, resizable: true, resizable: true, hidden: true },
                        { label: '二手案件占比', prop: 'secdCaseRatio', sortable: true, resizable: true, resizable: true, hidden: true },
                        { label: '三手案件占比', prop: 'thdCaseRatio', sortable: true, resizable: true, resizable: true, hidden: true },
                        { label: '提交人', prop: 'submUserCode', sortable: true, resizable: true },
                        { label: '提交时间', prop: 'subTime', sortable: true, resizable: true },
                        { label: '最后更新人', prop: 'lastUpdateUser', sortable: true, resizable: true },
                        { label: '最后更新时间', prop: 'lastUpdateTime', sortable: true, resizable: true }
                    ],
                    height: yufp.frame.size().height - 103,
                    dialogVisible: false,
                    formDisabled: false,
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    valiPagePluginData: true,
                }
            },
            methods: {
                switchParamsStatus: function (obj) {
                    var _self = this;
                    if('001' === obj.cooprOrgType){
                        _self.baseParamsOuts = {
                            versionNo:data.e_bizSerno,
                            cooprOrgType:'001'
                        };
                        _self.$refs.basecollapse.$children[0].$el.hidden = false;
                        _self.$refs.basecollapse.$children[1].$el.hidden = true;
                        _self.$refs.basecollapse.$children[2].$el.hidden = true;
                    } else if('002' === obj.cooprOrgType){
                        _self.baseParamsLaw = {
                            versionNo:data.e_bizSerno,
                            cooprOrgType:'002'
                        };
                        _self.$refs.basecollapse.$children[0].$el.hidden = true;
                        _self.$refs.basecollapse.$children[1].$el.hidden = false;
                        _self.$refs.basecollapse.$children[2].$el.hidden = true;
                    } else {
                        _self.baseParamsRisk = {
                            versionNo:data.e_bizSerno,
                            cooprOrgType:'003'
                        };
                        _self.$refs.basecollapse.$children[0].$el.hidden = true;
                        _self.$refs.basecollapse.$children[1].$el.hidden = true;
                        _self.$refs.basecollapse.$children[2].$el.hidden = false;
                    }
                }
            },

            mounted: function () {
                data.children = this;
                var obj = data.datas[data.dataKey];
                this.valiPagePluginData = true;
                this.switchParamsStatus(obj[0]);
                var _self = this;
                // _self.baseParam = {
                //     versionNo:data.e_bizSerno
                // }
                this.$nextTick(function(){
                    // _self.$refs.reftable.remoteData(_self.baseParam);
                    // _self.$refs.reftable.data = obj;
                    if('001' === obj[0].cooprOrgType){
                        _self.$refs.reftableOuts.remoteData(_self.baseParamsOuts);
                    } else if('002' === obj[0].cooprOrgType){
                        _self.$refs.reftableLaw.remoteData(_self.baseParamsLaw);
                    } else {
                        _self.$refs.reftableRisk.remoteData(_self.baseParamsRisk);
                    }
                });
            } // end of mounted
        });
    };
    // 消息处理
    exports.onmessage = function (type, message) {};
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {}
});
