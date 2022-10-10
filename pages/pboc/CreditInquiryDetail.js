/**
 * @create wanglh4
 * @description
 */
define([
    './custom/widgets/js/PrdIdInfoSelector.js',
    './custom/widgets/js/OrgSelector.js'
], function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,APPLY_CHANNEL_TYPE,STD_ZB_CERT_TYP,STD_ZB_CONT_STATUS');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    dataUrl: backend.creditService + '/api/pboc/query/infos',
                    baseParams: {},
                    queryFields: [
                        {placeholder: '查询流水号', field: 'serno', type: 'input'},
                        {placeholder: '授信申请号/用信申请号/借据编号', field: 'transactionCode', type: 'input'},
                        { placeholder: '产品名称', field: 'prdCode', type: 'custom', is: 'div-prdId-info-selector' ,params:{type:''},
                            clickFn:function(value,model,args){
                                _self.$refs.form.switch('prdCode','params',{prdType:model.channelNo,type:'code'});
                                _self.$refs.form.rebuildFn();
                            }},

                        {placeholder: '客户名称', field: 'cusName', type: 'input'},
                        {placeholder: '证件类型', field: 'certType', type: 'select', dataCode: 'STD_ZB_CERT_TYP'},
                        {placeholder: '证件号码', field: 'certCode', type: 'input'},
                        {placeholder: '日期区间', field: 'time_b2e', type: 'daterange', value: [], editable: false},
                        {
                            placeholder: '开始日期', field: 'strTime_b', type: 'date', hidden: true,

                        },
                        {placeholder: '结束日期', field: 'endTime_e', type: 'date', hidden: true},
                        {placeholder: '归属机构', field: 'inputBrId', type: 'custom', is: 'div-org-selector'},
                    ],
                    queryButtons: [
                        {
                            label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                                if (valid) {
                                    model.strTime_b = model.time_b2e[0];
                                    model.endTime_e = model.time_b2e[1];
                                    _self.$refs.reftable.remoteData(model);
                                }
                            }
                        },
                        {
                            label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2'
                        }
                    ],
                    tableColumns: [
                        {label: '查询流水号', prop: 'serno', sortable: true, resizable: true},
                        {label: '产品名称', prop: 'prdName', sortable: true, resizable: true},
                        {label: '授信申请号/用信申请号/借据编号', prop: 'transactionCode', sortable: true, resizable: true},
                        {label: '报告号', prop: 'reportId', sortable: true, resizable: true},
                        {label: '请求时间', prop: 'requestTime', sortable: true, resizable: true},
                        {label: '报告时间', prop: 'reportTime', sortable: true, resizable: true},
                        {label: '客户名称', prop: 'cusName', sortable: true, resizable: true},
                        {
                            label: '证件类型',
                            prop: 'certType',
                            sortable: true,
                            resizable: true,
                            dataCode: 'STD_ZB_CERT_TYP'
                        },
                        {label: '证件号码', prop: 'certCode', sortable: true, resizable: true},
                        {label: '查询原因', prop: 'queryReason', sortable: true, resizable: true},
                        {label: '查询操作员', prop: 'zxOpId', sortable: true, resizable: true},
                        {label: '归属机构', prop: 'inputBrId', sortable: true, resizable: true}
                    ],
                    height: yufp.frame.size().height - 103,
                    dialogVisible: false,
                    formDisabled: true,
                    exportFileName: '征信查询明细信息',
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
                    _self.updateButtons[1].hidden = !editable;
                    _self.formDisabled = !editable;
                    _self.dialogVisible = true;
                },

                exportFn: function () {
                    var _self = this;
                    var serno = this.$refs.form.fm.serno;
                    var transactionCode = this.$refs.form.fm.transactionCode;
                    var certType = this.$refs.form.fm.certType;
                    var certCode = this.$refs.form.fm.certCode;
                    var prdName = this.$refs.form.fm.prdName;
                    var cusName = this.$refs.form.fm.cusName;
                    var time_b2e = this.$refs.form.fm.time_b2e;
                    var inputBrId = this.$refs.form.fm.inputBrId;

                    this.$confirm('是否导出数据?', '提示').then(function () {
                        yufp.util.exportExcelByTable({
                            fileName: _self.exportFileName,
                            importType: 'service', // page当前页 selected 选中的数据  service 后端数据
                            ref: _self.$refs.reftable,
                            url: backend.creditService + '/api/pboc/query/infos',
                            method: 'POST',
                            param: {
                                serno: serno,
                                transactionCode: transactionCode,
                                certType: certType,
                                certCode: certCode,
                                prdName: prdName,
                                cusName: cusName,
                                time_b2e: time_b2e,
                                inputBrId: inputBrId,
                                exportFlag: 'exp'
                            }
                        });
                    })
                },//end of export
                getCredit: function () {
                    var _self = this;
                    var selections = this.$refs.reftable.selections;
                    if (selections.length != 1) {
                        this.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    var cmisdata = selections[0].reportId;
                    yufp.service.request({
                        method: 'POST',
                        url: backend.creditService + '/api/cus/rpt/show',
                        data: {reportId: cmisdata},
                        callback: function (code, message, response) {
                            if (response.code == 0) {
                                var report = response.rows.content;
                                if (report != "" && report != null) {
                                    w = window.open('about:blank');
                                    w.document.write(report);
                                    w.document.close();
                                } else {
                                    _self.$message('没有查询到征信报告!');
                                }
                            } else {
                                _self.$message('查看征信报告失败!');
                            }
                        }
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




