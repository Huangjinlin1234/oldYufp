/**
 * @create by chenqm1 on 2018-05-07
 * @description 风险分类台账
 */
define([
    './custom/widgets/js/PrdIdInfoSelector.js'
], function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,APPLY_CHANNEL_TYPE,STD_ZB_CERT_TYP,STD_ZB_ASSURE_MEANS,STD_ZB_ACC_STATUS,S_ZB_GENE_WAY,STD_ZB_FIVE_SORT');
        yufp.custom.vue({
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    dataUrl: backend.riskmService + '/api/rsc/task/loans',
                    hisUrl: backend.riskmService + '/api/rsc/loan/chg/his/billNo',
                    baseParams: {},
                    queryFields: [
                        {placeholder: '借据号', field: 'billNo', type: 'input'},
                        {placeholder: '渠道名称', field: 'channelNo', type: 'select', dataCode: 'APPLY_CHANNEL_TYPE'},
                        {
                            placeholder: '产品名称',
                            field: 'prdName',
                            type: 'custom',
                            is: 'div-prdId-info-selector',
                            params: {type: ''},
                            clickFn: function (value, model, args) {
                                _self.$refs.form.switch('prdName', 'params', {prdType: model.prdName, type: 'name'});
                                _self.$refs.form.rebuildFn();
                            }
                        },
                        {placeholder: '客户编号', field: 'cusId', type: 'input'},
                        {placeholder: '客户名称', field: 'cusName', type: 'input'},
                        {placeholder: '证件类型', field: 'certType', type: 'select', dataCode: 'STD_ZB_CERT_TYP'},
                        {placeholder: '证件号码', field: 'certCode', type: 'input'},
                        {
                            placeholder: '担保方式',
                            field: 'assureMeansMain',
                            type: 'select',
                            dataCode: 'STD_ZB_ASSURE_MEANS'
                        },
                        {placeholder: '借据状态', field: 'accountStatus', type: 'select', dataCode: 'STD_ZB_ACC_STATUS'},
                        {placeholder: '生成方式', field: 'geneWay', type: 'select', dataCode: 'S_ZB_GENE_WAY'},
                        {placeholder: '当前风险分类结果', field: 'currResult', type: 'select', dataCode: 'STD_ZB_FIVE_SORT',
                            datacodeFilter: function(options){
                                this.typeOptions = [];
                                for(var i=0; i<options.length; i++){
                                    if(options[i].key != '00'){
                                        this.typeOptions.push(options[i]);
                                    }
                                }
                            }
                        },
                        {placeholder: '机评分类结果', field: 'fiveResult', type: 'select', dataCode: 'STD_ZB_FIVE_SORT',
                            datacodeFilter: function(options){
                                this.typeOptions = [];
                                for(var i=0; i<options.length; i++){
                                    if(options[i].key != '00'){
                                        this.typeOptions.push(options[i]);
                                    }
                                }
                            }
                        },
                    ],
                    queryButtons: [
                        {
                            label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                                if (valid) {
                                    _self.$refs.reftable.remoteData(model);
                                }
                            }
                        },
                        {label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2'}
                    ],

                    tableColumns: [
                        {label: '借据号', prop: 'billNo', sortable: true, resizable: true},
                        {
                            label: '渠道名称',
                            prop: 'channelNo',
                            sortable: true,
                            resizable: true,
                            dataCode: 'APPLY_CHANNEL_TYPE'
                        },
                        {label: '产品名称', prop: 'prdName', sortable: true, resizable: true},
                        {label: '客户编号', prop: 'cusId', sortable: true, resizable: true},
                        {label: '客户名称', prop: 'cusName', sortable: true, resizable: true},
                        {label: '证件类型', prop: 'certType', sortable: true, resizable: true, dataCode: 'STD_ZB_CERT_TYP'},
                        {label: '证件号码', prop: 'certCode', sortable: true, resizable: true},
                        {
                            label: '担保方式',
                            prop: 'assureMeansMain',
                            sortable: true,
                            resizable: true,
                            dataCode: 'STD_ZB_ASSURE_MEANS'
                        },
                        {
                            label: '借据状态',
                            prop: 'accountStatus',
                            sortable: true,
                            resizable: true,
                            dataCode: 'STD_ZB_ACC_STATUS'
                        },
                        {label: '生成方式', prop: 'geneWay', sortable: true, resizable: true, dataCode: 'S_ZB_GENE_WAY'},
                        {
                            label: '当前风险分类结果',
                            prop: 'currResult',
                            sortable: true,
                            resizable: true,
                            dataCode: 'STD_ZB_FIVE_SORT'
                        },
                        {
                            label: '五级分类机评结果',
                            prop: 'fiveResult',
                            sortable: true,
                            resizable: true,
                            dataCode: 'STD_ZB_FIVE_SORT'
                        },
                    ],
                    hisColumns: [
                        {label: '借据号', prop: 'billNo', sortable: true, resizable: true},
                        {label: '借据金额', prop: 'loanAmount', sortable: true, resizable: true},
                        {label: '借据余额', prop: 'loanBalance', sortablexportFne: true, resizable: true},
                        {label: '借款日期', prop: 'loanStartDate', sortable: true, resizable: true},
                        {label: '到期日期', prop: 'loanEndDate', sortable: true, resizable: true},
                        {label: '客户号', prop: 'cusId', sortable: true, resizable: true},
                        {label: '客户名称', prop: 'cusName', sortable: true, resizable: true},
                        {label: '证件类型', prop: 'certType', sortable: true, resizable: true, dataCode: 'STD_ZB_CERT_TYP'},
                        {label: '证件号码', prop: 'certCode', sortable: true, resizable: true},
                        {
                            label: '渠道名称',
                            prop: 'channelNo',
                            sortable: true,
                            resizable: true,
                            dataCode: 'APPLY_CHANNEL_TYPE'
                        },
                        {label: '产品名称', prop: 'prdName', sortable: true, resizable: true},
                        {label: '逾期天数', prop: 'overdueDate', sortable: true, resizable: true},
                        {
                            label: '担保方式',
                            prop: 'assureMeansMain',
                            sortable: true,
                            resizable: true,
                            dataCode: 'STD_ZB_ASSURE_MEANS'
                        },
                        {label: '主管机构', prop: 'mainBrId', sortable: true, resizable: true},
                        {
                            label: '借据状态',
                            prop: 'accountStatus',
                            sortable: true,
                            resizable: true,
                            dataCode: 'STD_ZB_ACC_STATUS'
                        },
                        {label: '生成方式', prop: 'geneWay', sortable: true, resizable: true, dataCode: 'S_ZB_GENE_WAY'},
                        {
                            label: '当前风险分类结果',
                            prop: 'currResult',
                            sortable: true,
                            resizable: true,
                            dataCode: 'STD_ZB_FIVE_SORT'
                        },
                        {
                            label: '五级分类机评结果',
                            prop: 'fiveResult',
                            sortable: true,
                            resizable: true,
                            dataCode: 'STD_ZB_FIVE_SORT'
                        },
                        {label: '风险分类变更日期', prop: 'rscUpdateDate', sortable: true, resizable: true}
                    ],
                    height: yufp.frame.size().height - 103,
                    dialogVisible: false,
                    exportDialogVisible: false,
                    formDisabled: false,
                    exportFileName: '风险分类台账',
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
                    _self.formDisabled = !editable;
                    _self.dialogVisible = true;
                },
                infoFn: function () {
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    var obj = this.$refs.reftable.selections[0];
                    this.switchStatus('DETAIL', false);
                    this.$nextTick(function () {
                        var billNo = obj.billNo;
                        this.baseParams = {
                            billNo: billNo
                        };
                        this.$refs.histable.remoteData(this.baseParams);
                    });
                },
                buttonReturn: function () {
                    var _self = this;
                    _self.dialogVisible = false;
                },
                exportFn: function () {
                    var _self = this;
                    var billNo = _self .$refs.form.fm.billNo;
                    var channelNo = _self .$refs.form.fm.channelNo;
                    var prdName = _self .$refs.form.fm.prdName;
                    var cusId = _self .$refs.form.fm.cusId;
                    var cusName = _self .$refs.form.fm.cusName;
                    var certType = _self .$refs.form.fm.certType;
                    var certCode = _self .$refs.form.fm.certCode;
                    var assureMeansMain = _self .$refs.form.fm.assureMeansMain;
                    var accountStatus = _self .$refs.form.fm.accountStatus;
                    var geneWay = _self .$refs.form.fm.geneWay;
                    var currResult = _self .$refs.form.fm.currResult;
                    var fiveResult = _self .$refs.form.fm.fiveResult;
                    this.$confirm('是否导出数据?', '提示').then(function () {
                        yufp.util.exportExcelByTable({
                            fileName: _self.exportFileName,
                            importType: 'service', // page当前页 selected 选中的数据  service 后端数据
                            ref: _self.$refs.reftable,
                            url: backend.riskmService + '/api/rsc/task/loans',
                            method: 'POST',
                            param: {
                                billNo: billNo,
                                channelNo: channelNo,
                                prdName: prdName,
                                cusId: cusId,
                                cusName: cusName,
                                certType: certType,
                                certCode: certCode,
                                assureMeansMain: assureMeansMain,
                                accountStatus: accountStatus,
                                geneWay: geneWay,
                                currResult: currResult,
                                fiveResult: fiveResult,
                                exportFlag: 'exp'
                            }
                        });
                    })

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
