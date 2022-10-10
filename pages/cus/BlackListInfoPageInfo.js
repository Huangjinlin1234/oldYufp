/**
 * @create by ligm on 2019-08-10
 * @description 黑名单信息表
 */
define(function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('CRUD_TYPE,STD_ZB_CERT_TYP，BU_BLACK_LIST');
        yufp.custom.vue({
            components: {
                FileUpload: window.VueUploadComponent
            },
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    dataUrl : backend.cusService + "/api/black/list/infos",
                    uploadUrl: backend.cusService + "/api/black/list/upload",
                    baseParams: {},
                    queryFields: [
                        { placeholder: '姓名', field: 'name', type: 'input' },
                        { placeholder: '证件类型', field: 'certType', type: 'select',dataCode:'STD_ZB_CERT_TYP', datacodeFilter: function(options){
                                this.typeOptions = [];
                                for(var i=0; i<options.length; i++){
                                    if(options[i].key != 'CN03' && options[i].key != 'HK01' && options[i].key != 'MO01' && options[i].key != 'TW01' && options[i].key != 'TW02'){
                                        this.typeOptions.push(options[i]);
                                    }
                                }
                            }},
                        { placeholder: '证件号码', field: 'certCode', type: 'input' },
                        { placeholder: '类别', field: 'blackListType', type: 'select' ,dataCode:'BU_BLACK_LIST'},
                        /*{ placeholder: '创建人', field: 'createUser', type: 'input' },
                        { placeholder: '创建时间', field: 'createTime', type: 'input' },
                        { placeholder: '最新修改人', field: 'lastChgUsr', type: 'input' },
                        { placeholder: '最后修改时间', field: 'lastChgTime', type: 'input' }*/

                    ],
                    queryButtons: [
                        { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                                if (valid) {
                                    _self.$refs.reftable.remoteData(model);
                                }
                            } },
                        { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
                    ],

                    tableColumns: [
                        { label: '姓名', prop: 'name', sortable: true, resizable: true },
                        { label: '证件类型', prop: 'certType',dataCode:'STD_ZB_CERT_TYP', sortable: true, resizable: true },
                        { label: '证件号码', prop: 'certCode', sortable: true, resizable: true },
                        { label: '类别', prop: 'blackListType',dataCode:'BU_BLACK_LIST', sortable: true, resizable: true },
                        { label: '创建人', prop: 'createUser', sortable: true, resizable: true },
                        { label: '创建时间', prop: 'createTime', sortable: true, resizable: true },
                        { label: '最新修改人', prop: 'lastChgUsr', sortable: true, resizable: true },
                        { label: '最后修改时间', prop: 'lastChgTime', sortable: true, resizable: true,
                                formatter: function (row, column, cellValue) {
                                if (cellValue != null && cellValue != '')
                                    return cellValue.slice(0, 19);
                            }
                        },
                        { label: '生效开始日期', prop: 'vaildDateStart', sortable: true, resizable: true },
                        { label: '生效终止日期', prop: 'vaildDateEnd', sortable: true, resizable: true },
                    ],
                    updateFields: [{
                        columnCount: 3,
                        fields: [
                            { field: 'name', label: '姓名' ,rules: [{required: true, message: '必填项', trigger: 'blur'}]},
                            { field: 'certType', label: '证件类型' ,rules: [{required: true, message: '必填项', trigger: 'blur'}],type: 'select',dataCode:'STD_ZB_CERT_TYP',
                                datacodeFilter: function(options){
                                    this.typeOptions = [];
                                    for(var i=0; i<options.length; i++){
                                        if(options[i].key != 'CN03' && options[i].key != 'HK01' && options[i].key != 'MO01' && options[i].key != 'TW01' && options[i].key != 'TW02'){
                                            this.typeOptions.push(options[i]);
                                        }
                                    }
                                },
                                change: function (value, model, args) {
                                    if(value != null && value != '' && value == '10100'){
                                        _self.$refs.reform.switch('certCode', 'rules', [{validator: yufp.validator.IDCard, message: '请输入正确的身份证号', trigger: 'blur'}]);
                                    } else if (value != '10100'){
                                        _self.$refs.reform.switch('certCode', 'rules', [{validator: true, message: '', trigger: 'blur'}]);
                                    }
                                }
                                },
                            { field: 'certCode', label: '证件号码' ,rules: [{required: true, message: '必填项', trigger: 'blur'}]},
                            { field: 'blackListType', label: '类别' , type: 'select' ,dataCode:'BU_BLACK_LIST',rules: [{required: true, message: '必填项', trigger: 'blur'}]},
                            { field: 'createUser', label: '创建人' ,disabled:true},
                            { field: 'createTime', label: '创建时间' ,disabled:true},
                            { field: 'lastChgUsr', label: '最新修改人' ,disabled:true},
                            { field: 'lastChgTime', label: '最后修改时间' ,disabled:true}
                        ]
                    }],
                    updateButtons: [
                        { label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                _self.dialogVisible = false;
                            } },
                        { label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                                var validate = false;
                                _self.$refs.reform.validate(function (valid) {
                                    validate = valid;
                                });
                                if (!validate) {
                                    return;
                                }
                                _self.dialogVisible = false;
                                _self.$confirm('保存后立即生效，请确认是否继续？', '提示').then(function (action) {
                                    if (action === 'confirm') {
                                        yufp.service.request({
                                            method: rMethod,
                                            url: backend.cusService + '/api/black/list/info',
                                            data: model,
                                            callback: function (code, message, response) {
                                                if (response.code == 0) {
                                                    _self.$refs.reftable.remoteData();
                                                    _self.$message('操作成功');

                                                } else {
                                                    _self.$message(response.message);
                                                }
                                            }
                                        });
                                    }
                                });
                                var rMethod = '';
                                if(_self.viewType == "EDIT") {
                                    rMethod = 'PUT';
                                } else if(_self.viewType == "ADD") {
                                    rMethod = 'POST';
                                }


                            } },
                        {
                            label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                _self.dialogVisible = false
                            }
                        }
                    ],

                    extensions: ['xls', 'xlsx'],
                    fileData: {},
                    headers: {},
                    files: [],
                    errors: [],
                    importDialogVisible: false,
                    exportDialogVisible:false,
                    exportFileName: '黑名单客户信息模板',
                    loading2: false,
                    height: yufp.frame.size().height - 103,
                    dialogVisible: false,
                    formDisabled: false,
                    tipsVisible: false,
                    flag:'',
                    viewType: 'DETAIL',
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                }
            },
            methods: {
                /**
                 * @param ctrlCode 操作码
                 */
                checkPermission: function(ctrlCode) {
                    return !yufp.session.checkCtrl(ctrlCode, cite.menuId);
                },
                /**
                 * @param viewType 表单类型
                 * @param editable 可编辑,默认false
                 */
                switchStatus: function (viewType, editable) {
                    var _self = this;
                    _self.viewType = viewType;
                    _self.updateButtons[0].hidden = !editable;
                    _self.updateButtons[1].hidden = !editable;
                    _self.updateButtons[2].hidden = false;
                    _self.formDisabled = !editable;
                    _self.dialogVisible = true;
                },

                switchParamStatus: function () {
                    var val = this.viewType == 'ADD';
                    // this.$refs.reform.switch('createTime', 'hidden', val);
                    // this.$refs.reform.switch('createUser', 'hidden', val);
                    this.$refs.reform.switch('lastChgUsr', 'hidden', val);
                    this.$refs.reform.switch('lastChgTime', 'hidden', val);
                    this.$refs.reform.rebuildFn();
                },

                addFn: function () {
                    var _self = this;
                    _self.switchStatus('ADD', true);
                    _self.$nextTick(function () {
                        _self.switchParamStatus();
                        _self.updateButtons[2].hidden = true;
                        _self.$refs.reform.resetFields();
                    });
                },
                modifyFn: function () {
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    this.switchStatus('EDIT', true);
                    this.$nextTick(function () {
                        this.switchParamStatus();
                        this.updateButtons[2].hidden = true;
                        var obj = this.$refs.reftable.selections[0];
                        yufp.extend(this.$refs.reform.formModel, obj);
                    });
                },
                infoFn: function () {
                    if (this.$refs.reftable.selections.length != 1) {
                        this.$message({ message: '请先选择一条记录', type: 'warning' });
                        return;
                    }
                    this.switchStatus('DETAIL', false);
                    this.$nextTick(function () {
                        this.switchParamStatus();
                        yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0]);
                    });
                },

                deleteFn: function () {
                    var _self = this;
                    var selections = _self.$refs.reftable.selections;
                    if (selections.length < 1) {
                        _self.$message({message: '请先选择一条记录', type: 'warning'});
                        return;
                    }
                    var len = selections.length, arr = [];
                    for (var i = 0; i < len; i++) {
                        arr.push(selections[i].certCode);
                    }
                    _self.batchDelete(arr,backend.cusService + "/api/black/list/info/batch");
                },
                //批量删除操作
                batchDelete: function (item,url) {
                    var _self = this;
                    _self.$confirm('点击确定将永久删除该数据，是否确认？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function (action) {
                            if (action === 'confirm') {
                                yufp.service.request({
                                    method: 'DELETE',
                                    url: url,
                                    data: {
                                        certCode: item.join(',')
                                    },
                                    callback: function (code, message, response) {
                                        if (code == 0) {
                                            if (_self.$refs.collRsTable != 'undifined') _self.$refs.reftable.remoteData();
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

                //黑名单模板下载
                exportFn: function () {
                    var downLoadUrl = backend.cusService + '/api/black/list/downLoad';
                    window.location.href = downLoadUrl;
                },

                <!--导入按钮-->
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
                            if (typeof (newFile.response) === 'string')
                                newFile.response = JSON.parse(newFile.response);
                            if (newFile.response && newFile.response.message) {
                                if (newFile.response.success === true) {
                                    mesType = 'success';
                                    this.$message({message: newFile.response.message, type: mesType});
                                } else {
                                    this.tipsVisible = true;
                                }
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
                    if(this.files.length > 1 ) {
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
                    tipsVisible: false;
                    this.tipsVisible = false;
                }
            }// end of methods
        });
    };
    // 消息处理
    exports.onmessage = function (type, message) {

    };
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {

    }

});
