/**
 * @create by wanglh4 on 2019-01-17
 * @description 贷款进件审批清单
 */
define([
    './custom/widgets/js/PrdIdInfoSelector.js'
], function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('APPLY_CHANNEL_TYPE, PRD_FIL_DIR,STD_LOAN_USE,STD_PRD_REPAY_MODE,NLS_APPLY_STATE,LOAN_STATUS,APPLY_DATE_TYPE');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    dataUrl: backend.creditService + '/api/nls/appr/infos',
                    baseParams: {
                    },
                    baseExParams:{},
//          resetQuery: true,

                    queryFields: [
                        {placeholder: '证件类型', field: 'certType', type: 'select', dataCode: 'STD_ZB_CERT_TYP'},
                        {placeholder: '证件号码', field: 'certCode', type: 'input'},
                        {
                            placeholder: '日期类型',
                            field: 'applyDateType',
                            type: 'select',
                            dataCode: 'APPLY_DATE_TYPE',
                            value: '01',
                            rules: [{required: true, message: '日期类型不能为空', trigger: 'blur'}],
                            change: function (value, model, args) {
                                if (value == '04') {
                                    _self.$refs.form.switch('applyDate1', 'hidden', false);
                                    var time = new Date().getTime() - 60 * 60 * 24 * 1000;
                                    var date = new Date(time);
                                    var Y = date.getFullYear() + '-';
                                    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                                    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
                                    _self.$refs.form.fm.applyDate1 = Y + M + D;
                                } else {
                                    _self.$refs.form.fm.applyDate1 = '';
                                    _self.$refs.form.switch('applyDate1', 'hidden', true);
                                }
                            }
                        },
                        { placeholder: '进件日期', id:'applyDate1',field: 'applyDate1', type: 'date' , editable:false, hidden: true },
                        { placeholder: '申请渠道 ', field: 'channelNo', type: 'select', dataCode: 'APPLY_CHANNEL_TYPE' ,
                            change:function(value,model,args){
                                _self.$refs.form.fm.prdName=''; //当下拉框值改变时，清空pop框产品值
                            }},
                        { placeholder: '产品', field: 'prdId', type: 'custom', is: 'div-prdId-info-selector' ,params:{prdType:'',type:''},
                            clickFn:function(value,model,args){
                                _self.$refs.form.switch('prdId','params',{channelNo:model.channelNo,type:'code'});
                                _self.$refs.form.rebuildFn();
                            }},
                        { placeholder: '申请流水号', field: 'applySeq', type: 'input'}
                    ],

                    queryButtons: [
                        { label: '查询',
                            op: 'submit',
                            type: 'primary',
                            icon: 'search',
                            click: function (model, valid) {
                                if (valid) {
                                    if(model.applyDateType === '04' &&( model.applyDate1 === "" || model.applyDate1 === undefined)){
                                        _self.$message('申请日期不能为空!');
                                    }else {
                                        _self.$refs.reftable.remoteData(model);
                                    }
                                }
                            } },
                        { label: '重置',
                            op: 'reset',
                            type: 'primary',
                            icon: 'yx-loop2',
//              click: function () {
//                _self.resetQuery = false;
//                _self.$nextTick(function () {
//                  this.resetQuery = true;
//                });
//              }
                        }
                    ],

                    tableColumns: [
                        { label: '进件日期', prop: 'applyDate1', sortable: true, resizable: true },
                        { label: '申请流水号', prop: 'applySeq', sortable: true, resizable: true },
                        { label: '合同号', prop: 'contNo', sortable: true, resizable: true },
                        { label: '借据号', prop: 'billNo', sortable: true, resizable: true },
                        { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
                        { label: '身份证号', prop: 'certCode', sortable: true, resizable: true },
                        { label: '手机号', prop: 'mobile', sortable: true, resizable: true },
                        { label: '审批金额', prop: 'applyAmt1', sortable: true, resizable: true },
                        { label: '放款金额', prop: 'applyAmt2', sortable: true, resizable: true },
                        { label: '年利率', prop: 'realityIrY', sortable: true, resizable: true,
                            formatter: function(row, column, cellValue) {
                                var num = parseFloat(cellValue);
                                if (typeof(num) == 'undefined'  || num == null || isNaN(num) )
                                    return "";
                                var rateY = Number(num * 100).toFixed(2) + '%';
                                return rateY;
                            }  },
                        { label: '贷款期限', prop: 'loanTerm', sortable: true, resizable: true },
                        { label: '申请渠道', prop: 'channelNo', sortable: true, resizable: true, dataCode: 'APPLY_CHANNEL_TYPE' },
                        { label: '贷款用途', prop: 'loanPurpose', sortable: true, resizable: true , dataCode: 'STD_LOAN_USE'},
                        { label: '还款方式', prop: 'repaymentMode', sortable: true, resizable: true , dataCode: 'STD_PRD_REPAY_MODE'},
                        { label: '还款账号', prop: 'recvAcctNo', sortable: true, resizable: true },
                        { label: '放款日期', prop: 'applyDate2', sortable: true, resizable: true },
                        { label: '审批状态', prop: 'nlsApplyState', sortable: true, resizable: true , dataCode: 'NLS_APPLY_STATE'},
                        { label: '放款状态', prop: 'dnSts', sortable: true, resizable: true , dataCode: 'LOAN_STATUS'},
                        { label: '失败原因', prop: 'refuseCause', sortable: true, resizable: true },
                        //{ label: '合同影像编号', prop: 'nlsOperUserid', sortable: true, resizable: true, hidden: true },
                        //{ label: '还款周期', prop: 'nlsOperOrgid', sortable: true, resizable: true, hidden: true },
                        { label: '推荐柜员号', prop: 'lastModifyTime', sortable: true, resizable: true }
                    ],

                    tableExColumns: [
                        { label: '进件日期', prop: 'applyDate1', sortable: true, resizable: true },
                        { label: '申请流水号', prop: 'applySeq', sortable: true, resizable: true },
                        { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
                        { label: '身份证号', prop: 'certCode', sortable: true, resizable: true },
                        { label: '手机号', prop: 'mobile', sortable: true, resizable: true },
                        { label: '审批金额', prop: 'applyAmt1', sortable: true, resizable: true },
                        { label: '放款金额', prop: 'applyAmt2', sortable: true, resizable: true },
                        { label: '贷款期限', prop: 'loanTerm', sortable: true, resizable: true },
                        { label: '申请渠道', prop: 'channelNo', sortable: true, resizable: true, dataCode: 'APPLY_CHANNEL_TYPE' },
                        { label: '贷款用途', prop: 'loanPurpose', sortable: true, resizable: true , dataCode: 'STD_LOAN_USE'},
                        { label: '还款账号', prop: 'recvAcctNo', sortable: true, resizable: true },
                        { label: '放款日期', prop: 'applyDate2', sortable: true, resizable: true },
                        { label: '审批状态', prop: 'nlsApplyState', sortable: true, resizable: true , dataCode: 'NLS_APPLY_STATE'},
                        { label: '放款状态', prop: 'dnSts', sortable: true, resizable: true , dataCode: 'LOAN_STATUS'},
                        { label: '失败原因', prop: 'refuseCause', sortable: true, resizable: true },
                        { label: '推荐柜员号', prop: 'lastModifyTime', sortable: true, resizable: true }
                    ],

                    updateFields: [{
                        columnCount: 2,
                        fields: [
                            { field: 'applyDate1', label: '进件日期', disabled: true },
                            { field: 'applySeq', label: '申请号', disabled: true},
                            { field: 'contNo', label: '合同号', disabled: true},
                            { field: 'billNo', label: '借据号', disabled: true},
                            { field: 'cusName', label: '客户名称', disabled: true},
                            { field: 'certCode', label: '身份证号', disabled: true},
                            { field: 'mobile', label: '手机号', disabled: true},
                            { field: 'applyAmt1', label: '审批金额', disabled: true},
                            { field: 'applyAmt2', label: '放款金额', disabled: true},
                            { field: 'realityIrY', label: '年利率', disabled: true},
                            { field: 'loanTerm', label: '贷款期限', disabled: true},
                            { field: 'prdType', label: '贷款种类', disabled: true},
                            { field: 'loanPurpose', label: '贷款用途', disabled: true},
                            { field: 'repaymentMode', label: '还款方式', disabled: true},
                            { field: 'recvAcctNo', label: '还款账号', disabled: true},
                            { field: 'applyDate2', label: '放款日期', disabled: true},
                            { field: 'nlsApplyState', label: '审批状态', disabled: true},
                            { field: 'dnSts', label: '放款状态', disabled: true},
                            { field: 'refuseCause', label: '失败原因', disabled: true},
                            //{ field: 'nlsOperOrgid', label: '合同影像编号', hidden: true, disabled: true},
                            //{ field: 'nlsOperOrgid', label: '还款周期', hidden: true, disabled: true},
                            { field: 'nlsOperOrgid', label: '推荐柜员号', disabled: true}
                        ]
                    }],

                    updateButtons: [
                        { label: '关闭',
                            type: 'primary',
                            icon: 'yx-undo2',
                            hidden: false,
                            click: function (model) {
                                _self.dialogVisible = false;
                            }
                        }
                    ],
                    height: yufp.frame.size().height - 103,
                    dialogVisible: false,
                    exportDialogVisible:false,
                    formDisabled: false,
                    exportFileName: '贷款进件审批清单',
                    fullscreenLoading:false,
                    viewType: 'DETAIL',
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false)
                };
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
                    _self.formDisabled = !editable;
                    _self.dialogVisible = true;
//          _self.exportDialogVisible = true;
//          _self.billVisible = true;
                },

                infoFn: function () {
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    this.switchStatus('DETAIL', false);
                    this.$nextTick(function () {
                        var obj = this.$refs.reftable.selections[0];
                        yufp.extend(this.$refs.reform.formModel, obj);
                    });
                },

                exportFn: function () {
                    var _self = this;
                    _self.$confirm('是否导出数据?', '提示').then(function () {
                        yufp.util.exportExcelByTable({
                            fileName: _self.exportFileName,
                            importType: 'service', // page当前页 selected 选中的数据  service 后端数据
                            ref: _self.$refs.refExtable,
                            url: backend.creditService+'/api/nls/appr/infos',
                            method:'POST',
                            param:{
                                certType: _self.$refs.form.fm.certType,
                                certCode: _self.$refs.form.fm.certCode,
                                applyDateType: _self.$refs.form.fm.applyDateType,
                                applyDate1: _self.$refs.form.fm.applyDate1,
                                channelNo: _self.$refs.form.fm.channelNo,
                                prdId: _self.$refs.form.fm.prdId,
                                applySeq: _self.$refs.form.fm.applySeq,
                                exportFlag: 'exp'
                            }
                        });
                    })
                }  // end of exportFn
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