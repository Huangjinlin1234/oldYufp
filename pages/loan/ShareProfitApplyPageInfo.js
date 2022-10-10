/**
 * @create by ligm on 2019-08-10
 * @description 分润申请表
 */
define([
    './custom/widgets/js/OrgSelector.js'
], function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('KEEP_ACCT_STA,SHARE_PROFIT_APRV_STA');
        var vm = yufp.custom.vue({
            components: {
                FileUpload: window.VueUploadComponent
            },
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    detailCollapseName: ['1', '2', '3'],
                    expandCollapseName: ['previewRef', 'importFileRef'],
                    baseTab: 'baseTab',
                    dataUrl: backend.consoleService + '/api/shareProfit/search',
                    prevUrl: backend.consoleService + '/api/shareProfit/search?approveSta=01',
                    uploadUrl: backend.consoleService + '/api/shareProfit/batch/upload',
                    saveUrl: backend.consoleService + '/api/shareProfit/save',
                    commitUrl: backend.consoleService + '/api/shareProfit/submit',
                    deleteUrl: backend.consoleService + '/api/shareProfit/delete',
                    aprvHisUrl: backend.consoleService + '/api/shareProfit/hisInfo',
                    baseParams: {},
                    aprvHisData: [],
                    showText: '保存',
                    extensions: ['xls', 'xlsx'],
                    fileData: {},
                    headers: {},
                    files: [],
                    showQueryButtons: true,
                    showDetail: false,
                    approving: false,
                    importFileName: '',
                    contBaseParams: {
                        isLmtStatus: "03','02'"
                    },
                    loanBaseParams: {},
                    queryFields: [
                        {placeholder: '开始月份', field: 'startMonth', type: 'month', format: 'yyyyMM'},
                        {placeholder: '结束月份', field: 'endMonth', type: 'month', format: 'yyyyMM'},
                        {
                            placeholder: '机构号',
                            field: 'orgCode',
                            type: 'custom',
                            is: 'div-org-selector',
                            params: {showType: 'CNNAME'}
                        },
                        {placeholder: '记账状态', field: 'keepAcctSta', type: 'select', dataCode: 'KEEP_ACCT_STA'},
                        {placeholder: '任务状态', field: 'approveSta', type: 'select', dataCode: 'SHARE_PROFIT_APRV_STA'}
                    ],
                    baseInfoFields: [{
                        columnCount: 3,
                        fields: [
                            {label: '分润年月', field: 'shareProfitMonth', disabled: true},
                            {label: '机构号', field: 'orgCode', disabled: true},
                            {label: '机构名称', field: 'orgName', disabled: true},
                            {label: '技术服务费', field: 'serviceFee', disabled: true},
                            {
                                label: '任务状态',
                                field: 'approveSta',
                                type: 'select',
                                disabled: true,
                                dataCode: 'SHARE_PROFIT_APRV_STA'
                            },
                            {
                                label: '记账状态',
                                field: 'keepAcctSta',
                                type: 'select',
                                disabled: true,
                                dataCode: 'KEEP_ACCT_STA'
                            },
                            {label: '申请时间', field: 'applyTime', disabled: true},
                            {label: '审批人', field: 'aprvUserId', disabled: true},
                            {label: '审批人姓名', field: 'aprvUsername', disabled: true},
                            {label: '审批日期', field: 'aprvDate', disabled: true},
                            {label: '最后更新时间', field: 'lastUpdateTime', disabled: true},
                            {label: '最后更新人', field: 'lastUpdateUserId', disabled: true},
                            {label: '业务流水号', field: 'bizSerno', disabled: true},
                            {label: '全局流水号', field: 'globalBizSerno', disabled: true},
                            {label: '审批意见', field: 'aprvComment', disabled: true, type: 'textarea', rows: 1},
                            {label: '报错信息', field: 'errMsg', disabled: true, type: 'textarea', rows: 3},
                        ]
                    }],
                    queryButtons: [
                        {
                            label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                                if (model.startMonth) {
                                    model.startMonth = yufp.util.dateFormat(model.startMonth, '{y}-{m}')
                                }
                                if (model.endMonth) {
                                    model.endMonth = yufp.util.dateFormat(model.endMonth, '{y}-{m}')
                                }
                                if (model.startMonth && model.endMonth && model.startMonth > model.endMonth) {
                                    _self.$message.error('开始月份不能大于结束月份')
                                    return false
                                }
                                _self.$refs.reftable.remoteData(model);
                            }
                        },
                        {
                            label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2', click: function () {
                                _self.showQueryButtons = false;
                                _self.$nextTick(function () {
                                    this.showQueryButtons = true;
                                });
                                _self.$refs.reftable.remoteData();
                            }
                        }
                    ],

                    tableColumns: [

                        {label: '分润年月', prop: 'shareProfitMonth', sortable: true, resizable: true},
                        {label: '机构号', prop: 'orgCode', sortable: false, resizable: true},
                        {label: '机构名称', prop: 'orgName', sortable: false, resizable: true},
                        {label: '技术服务费', prop: 'serviceFee', sortable: true, resizable: true,formatter: (row,column,cellValue) => cellValue.toFixed(2)},
                        {
                            label: '任务状态',
                            prop: 'approveSta',
                            sortable: false,
                            resizable: true,
                            dataCode: 'SHARE_PROFIT_APRV_STA'
                        },
                        {
                            label: '记账状态',
                            prop: 'keepAcctSta',
                            sortable: false,
                            resizable: true,
                            dataCode: 'KEEP_ACCT_STA'
                        },
                        {label: '报错信息', prop: 'errMsg', sortable: false, resizable: true},
                        {label: '申请时间', prop: 'applyTime', sortable: true, resizable: true}
                    ],
                    previewTableColumns: [
                        {label: '机构号', prop: 'orgCode', resizable: true},
                        {label: '机构名称', prop: 'orgName', sortable: false, resizable: true},
                        {label: '技术服务费', prop: 'serviceFee', resizable: true,formatter: (row,column,cellValue) => cellValue.toFixed(2)},
                        {label: '分润年月', prop: 'shareProfitMonth', resizable: true},
                    ],
                    aprvHisTableColumns: [
                        {label: '流水号', prop: 'bizSerno', resizable: true},
                        {label: '记账流水号', prop: 'writeBizSerno', resizable: true},
                        {label: '记账返回结果', prop: 'retCode', resizable: true},
                        {label: '记账返回信息', prop: 'retMsg', resizable: true},
                        {label: '审批人', prop: 'aprvUsername', resizable: true},
                        {label: '审批结果', prop: 'aprvSta', resizable: true, dataCode: 'SHARE_PROFIT_APRV_STA'},
                        {label: '审批意见', prop: 'aprvComment', resizable: true},
                        {label: '发生时间', prop: 'createTime', resizable: true},
                    ],
                    addFields: [{
                        columnCount: 3,
                        fields: [
                            {
                                field: 'orgCode',
                                label: '机构号',
                                type: 'custom',
                                is: 'div-org-selector',
                                params: {showType: 'CNNAME'},
                                rules: [
                                    {required: true, message: '机构号不能为空'}
                                ]
                            },
                            {
                                field: 'serviceFee',
                                label: '技术服务费',
                                disabled: false,
                                type: 'num',
                                digit: 2,
                                formatter: yufp.util.moneyFormatter,
                                rules: [
                                    {required: true, message: '技术服务费不能为空'},
                                    {
                                        validator: function (rule, value, callback) {
                                            if (value < 0) {
                                                callback(new Error('技术服务费不能小于 0'))
                                            } else if (value > 1000000000) {
                                                callback(new Error('技术服务费长度过大'))
                                            } else if (typeof value !== 'number') {
                                                callback(new Error('技术服务费类型必须为数值类型'))
                                            }
                                            else {
                                                callback()
                                            }
                                        }, trigger: 'change'
                                    }
                                ]
                            },
                            {
                                field: 'shareProfitMonth',
                                label: '分润年月',
                                disabled: false,
                                type: 'month',
                                format: 'yyyyMM',
                                rules: [
                                    {required: true, message: '分润年月不能为空'}
                                ]
                            },
                        ]
                    }],
                    editFields: [{
                        columnCount: 3,
                        fields: [
                            {
                                field: 'orgCode',
                                label: '机构号',
                                type: 'custom',
                                is: 'div-org-selector',
                                params: {showType: 'CNNAME'},
                                rawValue: '',
                                rules: [
                                    {required: true, message: '机构号不能为空'}
                                ]
                            },
                            {
                                field: 'serviceFee',
                                label: '技术服务费',
                                disabled: false,
                                type: 'num',
                                digit: 2,
                                formatter: yufp.util.moneyFormatter,
                                rules: [
                                    {required: true, message: '技术服务费不能为空'},
                                    {
                                        validator: function (rule, value, callback) {
                                            if (value < 0) {
                                                callback(new Error('技术服务费不能小于 0'))
                                            } else if (value > 1000000000) {
                                                callback(new Error('技术服务费长度过大'))
                                            } else if (typeof value !== 'number') {
                                                callback(new Error('技术服务费类型必须为数值类型'))
                                            }
                                            else {
                                                callback()
                                            }
                                        }, trigger: 'change'
                                    }
                                ]
                            },
                            {
                                field: 'shareProfitMonth',
                                label: '分润年月',
                                disabled: false,
                                type: 'month',
                                format: 'yyyyMM',
                                rules: [
                                    {required: true, message: '分润年月不能为空'}
                                ]
                            },
                        ]
                    }],
                    annexInfoFields: [
                        {
                            columnCount: 2,
                            fields: [
                                {
                                    field: 'annexName', label: '附件名称', type: 'textarea', rows: 1,
                                    rules: [{required: true, message: '必填项', trigger: 'blur'}]
                                }
                            ]
                        },
                        {
                            columnCount: 1,
                            fields: [
                                {field: 'annexDesc', label: '附件描述', type: 'textarea', rows: 3}
                            ]
                        }
                    ],
                    height: yufp.frame.size().height - 103,
                    dialogVisible: false,
                    addOne: false,
                    editOne: false,
                    itemShow: true,
                    importShow: false,
                    previewData: [],
                    viewType: 'DETAIL',
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    dialogVisibleAnnex: false,
                    annexFormDisabled: false,
                    fileExcelName: '',
                    formDisabled: false,
                    flag: '',
                    loading2: false,
                    importDialogVisible: false,
                    showEdtBtn:false,
                    showDelBtn:false
                }
            },
            computed: {},
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
                    this.baseTab = 'baseTab';
                    _self.viewType = viewType;
                    // _self.updateButtons[1].hidden = !editable;
                    _self.formDisabled = !editable;
                    _self.dialogVisible = true;
                    this.$nextTick(function () {
                        if (viewType == 'ADD') {
                            _self.searchShow = editable;
                        }
                        if (viewType == 'EDIT') {
                            _self.searchShow = !editable;
                        }
                        if (viewType == 'DETAIL') {
                            _self.searchShow = !editable;
                        }
                    });
                },
                refreshData() {
                    this.$refs.previewRef.remoteData();
                },
                // 导入
                importFn: function () {
                    var _self = this;
                    this.fileExcelName = '';
                    _self.importDialogVisible = true;
                },
                inputFile: function (newFile, oldFile) {
                    if (newFile && oldFile && !newFile.active && oldFile.active) {
                        var mesType = 'warning';
                        // Get response data
                        if (newFile.success === true) {
                            if (typeof (newFile.response) === 'string') {
                                newFile.response = JSON.parse(newFile.response);
                            }
                            if (newFile.response && newFile.response.message) {
                                if (newFile.response.success === true) {
                                    mesType = 'success';
                                    this.$message({message: newFile.response.message, type: mesType});
                                    this.refreshData()
                                } else {
                                    this.tipsVisible = true;
                                    this.$alert(newFile.response.message, '批量导入失败!')
                                }
                            } else {
                                this.$message({message: '批量导入失败!' + newFile.response.message, type: mesType});
                            }
                        } else {
                            var message = '上传文件失败！';
                            if (newFile.error === 'extension') {
                                message = '上传的文件只支持：';
                                for (var i = 0; i < this.extensions.length; i++) {
                                    message += this.extensions[i] + '、';
                                    0
                                }
                                message += '后缀的文件！';
                            }
                            this.$message({message: message, type: mesType});
                        }
                        this.files = [];
                        this.fileExcelName = '';
                        this.loading2 = false;
                        this.importDialogVisible = false;
                    }
                },
                inputFilter: function (newFile, oldFile, prevent) {
                    if (this.files.length > 1) {
                        this.$message({message: '一次只能选择一个文件！', type: 'warning'});
                        return prevent();
                    }
                    this.fileExcelName = newFile.name;
                    newFile.data = this.fileData;
                    newFile.blob = '';
                    var URL = window.URL || window.webkitURL;
                    if (URL && URL.createObjectURL && newFile.file) {
                        newFile.blob = URL.createObjectURL(newFile.file)
                    }
                },
                // 下载模板
                downloadFn: function () {
                    var downLoadUrl = backend.consoleService + '/api/shareProfit/example/download';
                    window.location.href = downLoadUrl;
                },
                // 上传保存
                commitFileFn: function () {
                    var _self = this;
                    if (this.files.length == 0) {
                        _self.$message({message: '请选择一个文件', type: 'warning'});
                        return;
                    }
                    this.loading2 = true;
                    this.$nextTick(function () {
                        _self.$refs.upload.active = true;
                    });
                },
                // 上传取消
                cancelFn: function () {
                    this.files = [];
                    this.fileExcelName = '';
                    this.importDialogVisible = false;
                },
                uploadAnnexFile: function (item, bizSerno) {
                    var date = yufp.util.dateFormat(new Date().getTime(), '{y}{m}{d}');
                    this.postWindow(bizSerno, date, item);
                },
                uploadAnnexFn: function () {
                    var _self = this;
                    _self.dialogVisibleAnnex = true;
                    _self.annexFormDisabled = false;
                    _self.flag = '';
                    var size = _self.$refs.reftableAnnex.data.length;
                    this.$nextTick(function () {
                        _self.$refs.annexForm.resetFn();
                        if ('EDIT' == _self.viewType) {
                            var obj = _self.$refs.reftable.selections[0];
                            var bizSerno = obj.unfrzSerno;
                            yufp.extend(_self.$refs.annexForm.formModel,
                                {flowAppNo: bizSerno},
                                {bizSerno: bizSerno},
                                {uploadUser: yufp.session.userCode});
                        } else if ('ADD' == _self.viewType && size > 0) {
                            var data = _self.$refs.reftableAnnex.data;
                            var bizSerno = data[0].flowAppNo;
                            yufp.extend(_self.$refs.annexForm.formModel,
                                {flowAppNo: bizSerno},
                                {bizSerno: bizSerno},
                                {uploadUser: yufp.session.userCode});
                        } else {
                            yufp.extend(_self.$refs.annexForm.formModel,
                                {uploadUser: yufp.session.userCode});
                        }
                    });
                },
                cancleAnnesFn: function () {
                    var _self = this;
                    _self.dialogVisibleAnnex = false;
                    _self.$nextTick(function () {
                        _self.$refs.annexForm.resetFn();
                    });
                },
                saveAnnexFn: function () {
                    var _self = this;
                    var validate = false;
                    _self.$refs.annexForm.validate(function (valid) {
                        validate = valid;
                    });
                    if (!validate) {
                        return;
                    }
                    var rMethod = '';
                    var msg = '';
                    var right = '';
                    var cmisdata = {};
                    if (_self.$refs.annexForm.formModel.flowAppNo != '' && _self.$refs.annexForm.formModel.flowAppNo != null) {
                        rMethod = 'PUT';
                    } else {
                        rMethod = 'POST';
                    }
                    yufp.extend(cmisdata, _self.$refs.annexForm.formModel);
                    right = '1111111';
                    msg = "此操作将保存数据,且保存本地记录后将前往影像平台新增影像资料，是否继续？"


                    _self.$confirm(msg, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function (action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: rMethod,
                                    url: backend.riskmService + '/api/s/limit/unfrz/uploadFile/his',
                                    data: cmisdata,
                                    callback: function (code, message, response) {
                                        if (response.code == 0) {
                                            if (rMethod == 'POST') {
                                                var dat = response.rows;
                                                _self.baseParamsAnnex = {flowAppNo: dat, bizSerno: dat};
                                            } else if (rMethod == 'PUT') {
                                                var dae = cmisdata.flowAppNo;
                                                _self.baseParamsAnnex = {flowAppNo: dae, bizSerno: dae};
                                            }
                                            _self.$refs.reftableAnnex.remoteData(_self.baseParamsAnnex);
                                            _self.dialogVisibleAnnex = false;
                                            _self.uploadAnnexFile(right, _self.baseParamsAnnex.bizSerno);
                                        } else {
                                            _self.$message(response.message);
                                        }
                                    }
                                });
                            }
                        }
                    });
                },
                showOneFn() {
                    this.addOne = true
                    this.$nextTick(() => {
                        this.$refs.one.formModel.serviceFee = ''
                        let now = new Date()
                        let lastMonth = new Date(now.getTime())
                        lastMonth.setMonth(lastMonth.getMonth() - 1)
                        this.$refs.one.formModel.shareProfitMonth = lastMonth
                    })
                },
                saveOneFn() {
                    let _self = this
                    let valid = true
                    this.$refs.one.validate(function (validate) {
                        valid = validate
                    })
                    if (!valid) {
                        return
                    }
                    var obj = JSON.parse(JSON.stringify(this.$refs.one.formModel))
                    obj.shareProfitMonth = yufp.util.dateFormat(new Date(obj.shareProfitMonth), '{y}{m}')
                    yufp.service.request({
                        url: this.saveUrl,
                        method: 'POST',
                        data: obj,
                        callback(code, message, respond) {
                            if (respond.code === '0') {
                                _self.refreshData()
                                _self.addOne = false
                                _self.$message.success('保存成功')
                            } else {
                                _self.$message.error(respond.message)
                            }
                        }
                    })
                },
                addFn: function () {
                    var _self = this;
                    _self.itemShow = true;
                    _self.switchStatus('ADD', true);
                    this.$nextTick(function () {
                        this.refreshData()
                    })
                },
                editOneFn() {//修改数据
                    let _self = this
                    let valid = true
                    this.$refs.editOne.validate(function (validate) {
                        valid = validate
                    })
                    if (!valid) {
                        return
                    }
                    _self.approving = true
                    var obj = JSON.parse(JSON.stringify(this.$refs.editOne.formModel))
                    obj.shareProfitMonth = yufp.util.dateFormat(new Date(obj.shareProfitMonth), '{y}{m}')
                    yufp.service.request({
                        url: this.saveUrl,
                        method: 'POST',
                        data: obj,
                        callback(code, message, respond) {
                            if (respond.code === '0') {
                                _self.editOne = false
                                _self.$message.success('保存成功')
                                _self.$refs.reftable.remoteData(_self.$refs.reftable.formModel);
                            } else {
                                _self.$message.error(respond.message)
                            }
                        },
                        complete() {
                            _self.approving = false
                        }
                    })
                },
                modifyFn: function () {
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({
                            message: '请先选择一条记录',
                            type: 'warning'
                        });
                        return;
                    }
                    var obj = JSON.parse(JSON.stringify(this.$refs.reftable.selections[0]));
                    if (obj.approveSta !== '01' && obj.approveSta !== '04') {
                        this.$message({message: '审批状态为“退回”，才可修改。', type: 'warning'});
                        return;
                    }
                    this.editOne = true
                    obj.shareProfitMonth = obj.shareProfitMonth.substr(0, 4) + "-" + obj.shareProfitMonth.substr(4, 6)
                    this.$nextTick(function () {
                        yufp.extend(this.$refs.editOne.formModel, obj)
                        this.$refs.editOne.switch('orgCode','rawValue',obj.orgName)
                    })
                },
                infoFn: function () {
                    var _self = this;
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({
                            message: '请先选择一条记录',
                            type: 'warning'
                        });
                        return;
                    }
                    _self.itemShow = false;
                    var obj = this.$refs.reftable.selections[0];
                    _self.showDetail = true
                    this.$nextTick(function () {
                        yufp.extend(_self.$refs.baseInfoRef.formModel, obj)
                        _self.$refs.aprvHisRef.remoteData({
                            id: obj.id
                        })
                    });
                },
                deleteUnCommitFn() {
                    var _self = this;
                    var selections = _self.$refs.previewRef.selections;
                    if (selections.length < 1) {
                        return false
                    }
                    var info = selections[0]
                    yufp.service.request({
                        method: 'DELETE',
                        url: _self.deleteUrl + '/uncommit/' + info.id,
                        callback: function (code, message, response) {
                            if (response.code === '0') {
                                _self.$message('操作成功');
                                _self.refreshData()
                            }
                        }
                    });
                },
                deleteFn: function () {
                    var _self = this;
                    var selections = _self.$refs.reftable.selections;
                    if (selections.length < 1) {
                        _self.$message({
                            message: '请先选择一条记录',
                            type: 'warning'
                        });
                        return;
                    }
                    if (selections.length > 1) {
                        _self.$message({
                            message: '暂不支持批量删除',
                            type: 'warning'
                        });
                        return;
                    }

                    var info = selections[0]

                    if (info.approveSta !== '04') {
                        _self.$message({
                            message: '请选择状态为“退回”的记录！',
                            type: 'warning'
                        });
                        return;
                    }

                    this.$confirm('是否删除该分润申请？', '提示').then(function () {
                        yufp.service.request({
                            method: 'DELETE',
                            url: _self.deleteUrl + '/repulse/' + info.id,
                            callback: function (code, message, response) {
                                if (response.code === '0') {
                                    _self.$message('操作成功');
                                    _self.$refs.reftable.remoteData(_self.$refs.reftable.formModel);
                                } else {
                                    _self.$message(response.message);
                                }
                            }
                        });
                    });

                },
                exportFn: function () {
                    yufp.util.exportExcelByTable({
                        fileName: '下载文件',
                        importType: 'service', // page当前页 selected 选中的数据  service 后端数据
                        ref: this.$refs.reftable,
                        url: '',
                        param: {}
                    });
                },
                searchFn: function (model, valid) {
                    if (valid) {
                        this.$refs.lmtTable.remoteData(model);
                    }
                },
                rowClickFn: function (row, event, column) {
                    var _self = this;
                    if (row.approveSta === '04') { //任务为退回状态
                        _self.showEdtBtn = true
                        _self.showDelBtn = true
                    } else {
                        _self.showEdtBtn = false
                        _self.showDelBtn = false
                    }
                },
                returnFn: function () { //从新增页面返回主页面
                    var _self = this;
                    _self.dialogVisible = false;
                    _self.$refs.reftable.remoteData(_self.$refs.reftable.formModel);
                },
                commitFn: function () {
                    var _self = this;
                    var selections = _self.$refs.previewRef.selections;
                    if (selections.length < 1) {
                        _self.$message({
                            message: '请先选择一条记录提交复核',
                            type: 'warning'
                        });
                        return;
                    }
                    var info = selections[0]
                    _self.approving = true
                    yufp.service.request({
                        url: _self.commitUrl,
                        method: 'POST',
                        data: info,
                        callback(code, message, res) {
                            if (res.code === '0') {
                                _self.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                _self.dialogVisible = false;
                                _self.$refs.reftable.remoteData(_self.$refs.reftable.formModel);
                            } else {
                                _self.$message({
                                    message: res.message,
                                    type: 'warning'
                                });
                            }
                        },
                        complete() {
                            _self.approving = false
                        }
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
