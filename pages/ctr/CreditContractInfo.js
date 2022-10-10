/**
 * @create wanglh4
 * @description 授信合同信息
 */
define([
	'./custom/widgets/js/PrdIdInfoSelector.js'
], function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,APPLY_CHANNEL_TYPE,STD_ZB_CERT_TYP,STD_ZB_CONT_STATUS');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    dataUrl: backend.ctrService + '/api/ctr/loan/creditCont',
                    dataUrlLoanInfo: backend.creditService + '/api/nls/credit/infos',
                    baseParams: {},
                    loanParams: {},

                    queryFields: [
                        {placeholder: '授信申请号', field: 'serno', type: 'input'},
                        {placeholder: '授信合同号', field: 'contNo', type: 'input'},
                        {
                            placeholder: '渠道名称 ', field: 'channelCode', type: 'select', dataCode: 'APPLY_CHANNEL_TYPE',
                            change: function (value, model, args) {
                                _self.$refs.form.fm.prdName = ''; //当下拉框值改变时，清空pop框产品值
                            }
                        },
                        {
                            placeholder: '产品名称',
                            field: 'prdName',
                            type: 'custom',
                            is: 'div-prdId-info-selector',
                            params: {prdType: '', type: ''},
                            clickFn: function (value, model, args) {
                                _self.$refs.form.switch('prdName', 'params', {prdType: model.channelCode, type: 'name'});
                                _self.$refs.form.rebuildFn();
                            }
                        },
                        {placeholder: '客户名称', field: 'cusName', type: 'input'},
                        {placeholder: '客户编号', field: 'cusId', type: 'input'},
                        {placeholder: '证件类型', field: 'certType', type: 'select', dataCode: 'STD_ZB_CERT_TYP'},
                        {placeholder: '证件号码', field: 'certCode', type: 'input'},
                        {placeholder: '合同状态', field: 'contState', type: 'select', dataCode: 'STD_ZB_CONT_STATUS'}
                    ],
                    queryButtons: [
                        {
                            label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                                if (valid) {
                                    _self.$refs.reftable.remoteData(model);
                                }
                            }
                        },
                        {
                            label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2'
                        }
                    ],
                    tableColumns: [
                    	{label: '授信合同号', prop: 'contNo', sortable: true, resizable: true},
                    	{label: '授信申请编号', prop: 'serno', sortable: true, resizable: true},
                    	{label: '渠道', prop: 'channelCode', sortable: true, resizable: true, dataCode: 'APPLY_CHANNEL_TYPE'},
                        {label: '产品编号', prop: 'prdCode', sortable: true, resizable: true},
                        {label: '产品名称', prop: 'prdName', sortable: true, resizable: true},
                        {label: '客户编号', prop: 'cusId', sortable: true, resizable: true},
                        {label: '客户名称', prop: 'cusName', sortable: true, resizable: true},
                        {label: '证件类型', prop: 'certType', sortable: true,resizable: true,dataCode: 'STD_ZB_CERT_TYP'},
                        {label: '证件号码', prop: 'certCode', sortable: true, resizable: true},
                        {label: '授信总额度', prop: 'lmtAmt', sortable: true, resizable: true, formatter: function(row, column, cellValue) {
                            return yufp.util.moneyFormatter(cellValue, 2);//lmt_prd_cont
                        } },
                        { label: '冻结额度', prop: 'frzAmt', sortable: true, resizable: true, formatter: function(row, column, cellValue) {
                            return yufp.util.moneyFormatter(cellValue, 2);//lmt_freeze_app
                        } },
                        { label: '可用额度', prop: 'availAmt', sortable: true, resizable: true, formatter: function(row, column, cellValue) {
                            return yufp.util.moneyFormatter(cellValue, 2);//lmt_prd_cont
                        } },
                        { label: '已用额度', prop: 'occAmt', sortable: true, resizable: true, formatter: function(row, column, cellValue) {
                            return yufp.util.moneyFormatter(cellValue, 2);//lmt_prd_cont
                        } },
                        { label: '合同状态', prop: 'contState', sortable: true, resizable: true, dataCode: 'STD_ZB_CONT_STATUS' }
                    ],
                    //授信合同详细信息
                    creditContractInfoFields: [{
                        columnCount: 3,
                        fields: [
                        	{ field: 'contNo', label: '授信合同编号' },
                        	{ field: 'cusId', label: '客户编号' },
                        	{ field: 'cusName', label: '客户名称' },
                        	{ field: 'certType', label: '证件类型',type:'select',dataCode: 'STD_ZB_CERT_TYP' },
                        	{ field: 'certCode', label: '证件号码' },
                        	{ field: 'startDate', label: '授信起始日' },
                        	{ field: 'term', label: '授信期限' },
                        	{ field: 'expireDate', label: '授信到期日' },
                        	{ field: 'cyclicFlg', label: '是否循环' },
                        	{ field: 'lmtAmt', label: '授信总额度' },
                        	{ field: 'assureMeansMain', label: '担保方式', type:'checkbox',dataCode: 'STD_ZB_ASSURE_MEANS'},
                        	{ field: 'frzAmt', label: '冻结额度' },
                        	{ field: 'availAmt', label: '可用额度' },
                        	{ field: 'occAmt', label: '已用额度' },
                        	{ field: '', label: '受理机构' },
                        	{ field: '', label: '出账机构' },
                        	{ field: '', label: '主办信贷员' },
                        	{ field: 'channelCode', label: '渠道名称',type:'select',dataCode: 'APPLY_CHANNEL_TYPE' },
                        	{ field: 'prdName', label: '产品名称' }                        
                        ]
                    }],
                    // 贷款信息
                    loantableColumns: [
                        { prop: 'serno', label: '贷款申请号', sortable: true, resizable: true},
                        { prop: 'applyDate', label: '申请日期', sortable: true, resizable: true },
                        { prop: 'cusName', label: '姓名', sortable: true, resizable: true },
                        { prop: 'prdCode', label: '贷款种类', sortable: true, resizable: true },
                        { prop: 'applyAmt', label: '贷款金额', sortable: true, resizable: true }
                    ],
                    updateButtons: [
                        {
                            label: '关闭', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                _self.dialogVisible = false;
                            }
                        },
                        {
                            label: '保存', type: 'primary', icon: 'check', hidden: false
                        }
                    ],
                    height: yufp.frame.size().height - 103,
                    dialogVisible: false,
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

                infoFn: function () {
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    var _self = this;
                    _self.dialogVisible = true;
                    var obj = this.$refs.reftable.selections[0];
                    this.switchStatus('DETAIL', true);

                    _self.loanParams = {
                    	lmtApplySeq: obj.lmtApplySeq
                    };
                    this.$nextTick(function () {
                        yufp.extend(this.$refs.creditContractInfoRef.formModel, obj);
                        this.$refs.loanreftable.remoteData(_self.loanParams);
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




