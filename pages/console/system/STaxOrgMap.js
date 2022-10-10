/**
 * @Created by   on 2019-4-25 15:14:01.
 * @updated by
 * @description 风控-所属地市映射维护
 */
define([
    './custom/widgets/js/OrgSelector.js'
], function (require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,STD_ZB_CERT_TYP,PUBLISH_STATUS');
        yufp.custom.vue({
            components: {
                FileUpload: window.VueUploadComponent
            },
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    dataUrl: backend.consoleService + '/api/staxmap/infos',
                    uploadUrl: backend.consoleService + '/api/staxmap/infos/upload',
                    baseParams: {},
                    queryFields: [
                        {placeholder: '代扣代缴单位所属地市代码', field: 'taxAreaCode', type: 'input'},
                        {placeholder: '代扣代缴单位所属地市税局', field: 'taxAreaName', type: 'input'},
                        {placeholder: '地区', field: 'orgCode', type: 'custom', is: 'div-org-selector'}
                    ],
                    tableColumns: [
                        {label: '代扣代缴单位所属地市代码', prop: 'taxAreaCode', sortable: true},
                        {label: '代扣代缴单位所属地市税局', prop: 'taxAreaName', sortable: true},
                        {label: '地区代码', prop: 'orgCode', resizable: true, sortable: true, hidden:true},
                        {label: '地区', prop: 'orgName', resizable: true, sortable: true},
                        {label: '准入年收入', prop: 'adIncomeY', sortable: true},
                        {label: '系数', prop: 'coefficient', sortable: true},
                        {label: '创建人', prop: 'createUser', sortable: true, hidden:true},
                        {label: '创建时间', prop: 'createTime', sortable: true, hidden:true},
                        {label: '修改人', prop: 'lastChgUser', sortable: true, hidden:true},
                        {label: '修改时间', prop: 'lastChgTime', sortable: true, hidden:true}
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

                    updateFields: [{
                        columnCount: 2,
                        fields: [
                            {
                                field: 'taxAreaCode', label: '代扣代缴单位所属地市代码', disabled: false,
                                rules: [{required: true, message: '必填项', trigger: 'blur'}],
                            },
                            {
                                field: 'taxAreaName', label: '代扣代缴单位所属地市税局', disabled: false,
                                rules: [{required: true, message: '必填项', trigger: 'blur'}],
                            },
                            {
                                field: 'orgCode',
                                label: '地区代码',
                                type: 'custom',
                                is: 'div-org-selector',
                                disabled: false,
                                params: {},
                                rules: [{required: true, message: '必填项', trigger: 'blur'}],
                                selectFn: function (val, formModel, arguments) {
                                    formModel.orgName = arguments[1].orgName;
                                },
                                hidden:false
                            },
                            {field: 'orgName', label: '地区名称', disabled: true, hidden: false},
                            {
                                field: 'adIncomeY',
                                label: '准入年收入',
                                disabled: false,
                                type: 'num',
                                digit: 2,
                                formatter: yufp.util.moneyFormatter,
                                rules: [{required: true, message: '请输入数字', trigger: 'blur', type: 'number'}]
                            },
                            {
                                field: 'coefficient', label: '系数', disabled: false, type: 'num',
                                rules: [{required: true, message: '请输入大于0且小于100的数！', trigger: 'blur', type: 'number'},
                                    {
                                        validator: function (rule, value, callback) {
                                            if (value <= 0 || value >= 100) {
                                                _self.$message({message: '请输入大于0且小于100的数！', type: 'warning'});
                                                return;
                                            } else {
                                                callback();
                                            }
                                        }
                                    }]
                            },
                            {field: 'createUser', label: '创建人', disabled: true},
                            {field: 'createTime', label: '创建时间', disabled: true, type: 'datetime'},
                            {field: 'lastChgUser', label: '最后修改人', disabled: true},
                            {field: 'lastChgTime', label: '最后修改时间', disabled: true, type: 'datetime'}
                        ]
                    }],

                    updateButtons: [
                        {
                            label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                _self.dialogVisible = false
                            }
                        },
                        {
                            label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                                var validate = false;

                                _self.$refs.reform.validate(function (valid) {
                                    validate = valid;
                                });
                                if (!validate) {
                                    return;
                                }
                                var rMethod = '';
                                if (_self.viewType == "EDIT") {
                                    rMethod = 'PUT';
                                    model.lastChgUser = yufp.session.userName;//最后修改人
                                } else if (_self.viewType == "ADD") {
                                    var tableData = _self.$refs.reftable.data;
                                    for (var i = 0; i < tableData.length; i++) {
                                        if (model.taxAreaCode == tableData[i].taxAreaCode) {
                                            _self.$message({message: '该地市代码已存在！您可查询后進行修改操作！', type: 'warning'});
                                            return;
                                        }

                                    }
                                    rMethod = 'POST';
                                }
                                yufp.service.request({
                                    method: rMethod,
                                    url: backend.consoleService + '/api/staxmap/info',
                                    data: model,
                                    callback: function (code, message, response) {
                                        if (code == 0 && response.code == '0') {
                                            _self.$refs.reftable.remoteData();
                                            _self.$message('操作成功');
                                            _self.dialogVisible = false;
                                        } else {
                                            _self.$message({message: '操作失败', type: 'warning'});
                                        }
                                    }
                                });
                            }
                        }
                    ],
                    height: yufp.frame.size().height - 103,
                    extensions: ['xls', 'xlsx'],
                    fileData: {},
                    headers: {},
                    files: [],
                    errors: [],
                    dialogVisible: false,
                    formDisabled: false,
                    importDialogVisible: false,
                    tipsVisible: false,
                    flag: "",
                    viewType: 'DETAIL',
                    exportFileName: "所属地市映射",
                    loading2: false,
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
                    _self.updateButtons[1].hidden = !editable;
                    _self.dialogVisible = true;
                    _self.formDisabled = !editable;
                },
                switchParamsStatus: function () {
                    if (this.viewType == 'ADD') {
                        this.$refs.reform.switch('taxAreaCode', 'disabled', false);
                        this.$refs.reform.switch('taxAreaName', 'disabled', false);
                        this.$refs.reform.switch('adIncomeY', 'disabled', false);
                        this.$refs.reform.switch('coefficient', 'disabled', false);
                        this.$refs.reform.switch('lastChgUser', 'hidden', true);
                        this.$refs.reform.switch('lastChgTime', 'hidden', true);
                        this.$refs.reform.switch('orgCode', 'hidden', false);
                    } else if (this.viewType == 'EDIT') {
                        this.$refs.reform.switch('taxAreaCode', 'disabled', true);
                        this.$refs.reform.switch('taxAreaName', 'disabled', false);
                        this.$refs.reform.switch('adIncomeY', 'disabled', false);
                        this.$refs.reform.switch('coefficient', 'disabled', false);
                        this.$refs.reform.switch('lastChgUser', 'hidden', false);
                        this.$refs.reform.switch('lastChgTime', 'hidden', false);
                        this.$refs.reform.switch('orgCode', 'hidden', true);
                    }
                    this.$refs.reform.rebuildFn();
                },
                /**
                 * 新增按钮
                 */
                addFn: function () {
                    var _self = this;
                    _self.switchStatus('ADD', true);
                    _self.$nextTick(function () {
                        _self.switchParamsStatus();
                        _self.$refs.reform.resetFn();
                        var createUser = yufp.session.userName;//创建用户
                        var createTime = yufp.util.dateFormat(new Date());
                        yufp.extend(this.$refs.reform.formModel, {createUser: createUser}, {createTime: createTime});
                    });
                },
                /**
                 * 修改
                 */
                modifyFn: function () {
                    var _self = this;
                    if (_self.$refs.reftable.selections.length != 1) {
                        _self.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    _self.switchStatus('EDIT', true);
                    _self.$nextTick(function () {
                        _self.switchParamsStatus();
                        var obj = _self.$refs.reftable.selections[0];
                        yufp.extend(this.$refs.reform.formModel, obj);
                    });
                },
                /**
                 * 详情
                 */
                infoFn: function () {
                    var _self = this;
                    if (_self.$refs.reftable.selections.length != 1) {
                        _self.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    _self.switchStatus('DETAIL', false);
                    _self.$nextTick(function () {
                        _self.$refs.reform.resetFn();
                        this.$refs.reform.switch('createTime', 'hidden', false);
                        this.$refs.reform.switch('createUser', 'hidden', false);
                        this.$refs.reform.switch('lastChgUser', 'hidden', false);
                        this.$refs.reform.switch('lastChgTime', 'hidden', false);
                        yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0]);
                    });
                },
                /**
                 * 删除
                 */
                deleteFn: function () {
                    var _self = this;
                    var selections = _self.$refs.reftable.selections;
                    if (selections.length < 1) {
                        _self.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    var len = selections.length, arr = [];
                    for (var i = 0; i < len; i++) {
                        arr.push(selections[i].taxAreaCode);
                    }
                    _self.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function (action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: 'DELETE',
                                    url: backend.consoleService + '/api/staxmap/info',
                                    data: {
                                        taxAreaCode: arr.join(',')
                                    },
                                    callback: function (code, message, response) {
                                        if (code == 0) {
                                            _self.$refs.reftable.remoteData();
                                            _self.$message('操作成功');
                                        } else {
                                            _self.$message('操作失败');
                                        }
                                    }
                                });
                            }
                        }
                    });
                },
                /**
                 * 导出操作
                 */
                exportFn: function () {
                    var _self = this;
                    var orgCode = this.$refs.form.fm.orgCode;
                    var taxAreaCode = this.$refs.form.fm.taxAreaCode;
                    var taxAreaName = this.$refs.form.fm.taxAreaName;

                    this.$confirm('是否导出数据?', '提示').then(function () {
                        yufp.util.exportExcelByTable({
                            fileName: _self.exportFileName,
                            importType: 'service', // page当前页 selected 选中的数据  service 后端数据
                            ref: _self.$refs.reftable,
                            url: backend.consoleService + '/api/staxmap/info/export',
                            method: 'POST',
                            param: {
                                orgCode: orgCode,
                                taxAreaCode: taxAreaCode,
                                taxAreaName: taxAreaName
                            }
                        });
                    })
                },  // end of exportFn

                //模板下载
                downloadFn: function () {
                    var downLoadUrl = backend.consoleService + '/api/staxmap/info/downLoad';
                    window.location.href = downLoadUrl;
                },

                //导入按钮
                importFn: function () {
                    this.importDialogVisible = true;
                },

                inputFile: function (newFile, oldFile) {
                    if (newFile && oldFile && !newFile.active && oldFile.active) {
                        var mesType = 'warning';
                        // Get response data
                        if (newFile.success === true) {
                            var msgData = newFile.response.message;
                            //flag:用来区分错误类型（excel填写错误/数据库存在历史数据的错误）
                            this.flag = msgData.substring(0, msgData.indexOf(":"))
                            var errorMsg = msgData.substring(msgData.indexOf(":") + 1, msgData.length);
                            //转化为数组，用于遍历展示
                            this.errors = errorMsg.split(',');
                            /*var newDatas = [];
                            const h = this.$createElement;

                            for (var i in temp) {
                                newDatas.push(h('p', null, temp[i]));
                            }*/
                            if (typeof (newFile.response) === 'string')
                                newFile.response = JSON.parse(newFile.response);
                            if (newFile.response && newFile.response.message) {
                                if (newFile.response.success === true) {
                                    mesType = 'success';
                                    this.$message({message: newFile.response.message, type: mesType});
                                } else {
                                    this.tipsVisible = true;
                                }
                                /*this.$msgbox({
                                    title: '错误信息',
                                    message: h('div', null, newDatas),
                                    confirmButtonText: '确认',
                                    showCancelButton: true,
                                    cancelButtonText: '取消',
                                    type: 'warning',
                                    center: true,
                                    callback: function (action) {

                                    }
                                });*/
                            } else {
                                this.$message({message: '上传文件失败!', type: mesType});
                            }
                            this.importDialogVisible = false;
                            this.$refs.reftable.remoteData();
                            this.files = [];
                        } else {
                            var message = '上传文件失败！';
                            if (newFile.error === 'extension') {
                                message = '上传的文件只支持：';
                                for (var i = 0; i < this.extensions.length; i++) {
                                    message += this.extensions[i] + '、';
                                }
                                message += '后缀的文件！';
                            }
                            this.$message({message: message, type: mesType});
                        }
                        this.loading2 = false;
                    }
                },

                inputFilter: function (newFile, oldFile, prevent) {
                    if (this.files.length > 1) {
                        this.$message({message: '一次只能选择一个文件！', type: 'warning'});
                        return prevent();
                    }
                    newFile.data = this.fileData;
                    newFile.blob = '';
                    var URL = window.URL || window.webkitURL;
                    if (URL && URL.createObjectURL && newFile.file) {
                        newFile.blob = URL.createObjectURL(newFile.file)
                    }
                },

                //保存
                commitFileFn: function () {
                    if (this.files.length == 0) {
                        this.$message({message: '请选择一个文件', type: 'warning'});
                        return;
                    }
                    this.loading2 = true;
                    this.$nextTick(function () {
                        this.$refs.upload.active = true;
                    })
                },
                //取消按钮
                cancelFn: function () {
                    this.files = [];
                    this.errors = [];
                    this.importDialogVisible = false;
                    this.tipsVisible = false;
                },
                handleFn: function (item) {
                    var _self = this;
                    _self.tipsVisible = false;
                    yufp.service.request({
                        method: 'GET',
                        url: backend.consoleService + '/api/staxmap/info/coverOrExclude/' + item,
                        data: {},
                        callback: function (code, message, response) {
                            if (code == 0) {
                                _self.$refs.reftable.remoteData();
                                _self.$message('操作成功');
                            } else {
                                _self.$message('操作失败');
                            }
                        }
                    });
                    _self.cancelFn;
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