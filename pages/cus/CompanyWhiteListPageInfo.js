/**
 * @create by ligm on 2020-07-31
 * @description 企业白名单
 */
define([
    './custom/widgets/js/OrgSelector.js'
],function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('COMPANY_CLASSIFY,COMPANY_TYPE,COMPANY_STATUS,WHITE_LIST_TYPE');
        yufp.custom.vue({
            components: {
                FileUpload: window.VueUploadComponent
            },
            el: cite.el,
            data: function () {
                var _self = this;
                return {
                    baseParams: {
                    },
                    dataUrl: backend.cusService + '/api/company/white/lists',
                    uploadUrl: backend.cusService + '/api/company/white/list/upload',
                    uploadDelUrl:backend.cusService + '/api/company/white/import/delete',
                    queryFields: [
                        { placeholder: '企业名称', field: 'companyName', type: 'input' },
                        { placeholder: '企业类别', field: 'companyType', type: 'select', dataCode:'COMPANY_TYPE' },
                        { placeholder: '企业分类', field: 'companyClass', type: 'select', dataCode:'COMPANY_CLASSIFY' },
                        { placeholder: '导入人员工号', field: 'importEmpNo', type: 'input' },
                        { placeholder: '上报机构', field: 'appearOrg', type: 'input'},
                        { placeholder: '导入日期', field: 'importDates', type: 'daterange', value: [], editable: false},

                        { placeholder: '最后更新日期', field: 'updateDates', type: 'daterange', value: [], editable: false},

                        { placeholder: '最后更新人员', field: 'updateName', type: 'input' },
                    ],
                    queryButtons: [
                        { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                                if (valid) {
                                    model.importStrDt = model.importDates[0];
                                    model.importEndDt = model.importDates[1];

                                    model.updateStrDt = model.updateDates[0];
                                    model.updateEndDt = model.updateDates[1];

                                    model.isQuery = true;
                                    _self.$refs.reftable.remoteData(model);
                                }
                            } },
                        { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
                    ],

                    tableColumns: [
                        { label: 'ID', prop: 'id', sortable: true, resizable: true,  hidden: true},
                        { label: '企业id', prop: 'companyId', sortable: true, resizable: true,  hidden: true},
                        { label: '企业名称', prop: 'companyName', sortable: true, resizable: true },
                        { label: '注册日期', prop: 'registerTime', sortable: true, resizable: true },
                        { label: '企业类别', prop: 'companyType', sortable: true, resizable: true, type:'select', dataCode:'COMPANY_TYPE' },
                        { label: '企业经营状态', prop: 'status', sortable: true, resizable: true, type:'select', dataCode:'COMPANY_STATUS' },
                        { label: '企业分类', prop: 'companyClass', sortable: true, resizable: true, type:'select', dataCode:'COMPANY_CLASSIFY'  },
                        { label: '上报机构', prop: 'appearOrg', sortable: true, resizable: true },
                        { label: '导入日期', prop: 'importDate', sortable: true, resizable: true },
                        { label: '导入时间', prop: 'importTime', sortable: true, resizable: true },
                        { label: '导入员工号', prop: 'importEmpNo', sortable: true, resizable: true },
                        { label: '导入人员', prop: 'importEmpName', sortable: true, resizable: true },
                        { label: '最后更新日期', prop: 'updateDate', sortable: true, resizable: true },
                        { label: '最后更新时间', prop: 'updateTime', sortable: true, resizable: true },
                        { label: '最后更新人员工号', prop: 'updateNo', sortable: true, resizable: true },
                        { label: '最后更新人员', prop: 'updateName', sortable: true, resizable: true },
                        { label: '白名单类别', prop: 'whiteListType', sortable: true, resizable: true , type:'select', dataCode:'WHITE_LIST_TYPE'},

                    ],

                    updateFields: [{
                        columnCount: 1,
                        fields: [
                            { field: 'id', label: 'ID', hidden:true},
                            { field: 'updateDate', label: '最后更新日期', hidden:true},
                            { field: 'effectiveDate', label: '企业白名单有效期（天）',type: 'num',
                                rules: [{required: true, message: '请输入大于或等于0的数字！', trigger: 'change',type:'number'},
                                    {
                                        validator: function (rule, value, callback) {
                                            if (typeof (value) == 'undefined' || value == null || isNaN(value) || value == '') {
                                                if (value < 0 ) {
                                                    _self.$message({message: '请输入大于或等于0的数字！', type: 'warning'});
                                                    return;
                                                }
                                                callback();
                                            } else if (value < 0 ) {
                                                _self.$message({message: '请输入大于或等于0的数字！', type: 'warning'});
                                                return;
                                            } else {
                                                callback();
                                            }
                                        }
                                    }]
                            }
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

                                var rMethod = 'PUT';
                                _self.$confirm('保存后立即生效，请确认是否继续？', '提示').then(function (action) {
                                    if (action === 'confirm') {
                                        _self.upFn(model,rMethod);
                                    }
                                });
                            } },
                        { label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                                _self.dialogVisible = false;
                            } }
                    ],
                    height: yufp.frame.size().height - 103,
                    extensions: ['xls', 'xlsx'], fileData: {},
                    headers: {},
                    files: [],
                    errors: [],
                    importDialogVisible: false,
                    importDialogVisible1:false,
                    dialogVisible: false,
                    formDisabled: false,
                    loadingUp: false,
                    loadingDel: false,
                    flag:'',
                    tipsVisible: false,
                    viewType: 'DETAIL'
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
                    _self.updateButtons[2].hidden = editable;
                    _self.formDisabled = !editable;
                    _self.dialogVisible = true;
                },
                switchParamStatusFalse: function () {
                    var _self = this;
                    var arg = Array.prototype.slice.call(arguments);
                    arg.forEach(function (item) {
                        _self.$refs.reform.switch(item, 'hidden', false);
                    });
                    _self.$refs.reform.rebuildFn();
                },
                switchParamStatusTrue: function () {
                    var _self = this;
                    var arg = Array.prototype.slice.call(arguments);
                    arg.forEach(function (item) {
                        _self.$refs.reform.switch(item, 'hidden', true);
                    });
                    _self.$refs.reform.rebuildFn();
                },

                /**
                 * 有效日期设置
                 */
                upFn:function (item,rMethod) {
                    var _self = this;
                    yufp.service.request({
                        method: rMethod,
                        url: backend.cusService + '/api/company/white/setDt',
                        data: item,
                        callback: function (code, message, response) {
                            if (response.code == 0) {
                                _self.$refs.reftable.remoteData();
                                _self.$message('操作成功');
                                _self.dialogVisible = false;
                            } else {
                                _self.$message(response.message);
                            }
                        }
                    });
                },

                /**
                 * 批量删除
                 */
                deleteFn: function () {
                    var _self = this;
                    var selections = _self.$refs.reftable.selections;
                    if (selections.length < 1) {
                        _self.$message({ message: '请先选择要删除的记录', type: 'warning' });
                        return;
                    }
                    var len = selections.length;
                    var arr = [];
                    for (var i = 0; i < len; i++) {
                        arr.push(selections[i].companyId);
                    }
                    _self.$confirm('点击确定将永久删除选择的数据，是否确认？','提示',{type:'warning'}).then(function(){
                        yufp.service.request({
                            method: 'DELETE',
                            url: backend.cusService + '/api/company/white/list/delete',
                            data: {
                                companyId:arr.join(',')
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
                    });
                },

                /*导入更新开始*/
                inputFile: function (newFile, oldFile) {
                    var _self = this;
                    if (newFile && oldFile && !newFile.active && oldFile.active) {
                        var mesType = 'warning';
                        // Get response data
                        if (newFile.success === true) {
                            var msgData = newFile.response.message;
                            //flag:用来区分错误类型（excel填写错误/数据库存在历史数据的错误）
                            _self.flag = msgData.substring(0, msgData.indexOf(":"))
                            var errorMsg = msgData.substring(msgData.indexOf(":") + 1, msgData.length);
                            //转化为数组，用于遍历展示
                            this.errors = errorMsg.split(',');
                            if (typeof (newFile.response) === 'string')
                                newFile.response = JSON.parse(newFile.response);
                            if (newFile.response && newFile.response.message) {
                                if (newFile.response.success === true) {
                                    mesType = 'success';
                                    _self.$message({message: newFile.response.message, type: mesType});
                                } else {
                                    _self.tipsVisible = true;
                                    _self.loadingUp = false;
                                    _self.loadingDel = false;
                                }
                            } else {
                                this.$message({message: '上传文件失败!', type: mesType});
                            }
                            _self.importDialogVisible = false;
                            _self.$refs.reftable.remoteData();
                            _self.files = [];
                        } else {
                            var message = '上传文件失败！';
                            if (newFile.error === 'extension') {
                                message = '上传的文件只支持：';
                                for (var i = 0; i < _self.extensions.length; i++) {
                                    message += _self.extensions[i] + '、';
                                }
                                message += '后缀的文件！';
                            }
                            _self.$message({message: message, type: mesType});
                        }
                        _self.loadingUp = false;
                    }
                },

                inputFilter: function (newFile, oldFile, prevent) {
                    var _self = this;
                    if (_self.files.length > 1) {
                        _self.$message({message: '一次只能选择一个文件！', type: 'warning'});
                        return prevent();
                    }
                    newFile.data = _self.fileData;
                    newFile.blob = '';
                    var URL = window.URL || window.webkitURL;
                    if (URL && URL.createObjectURL && newFile.file) {
                        newFile.blob = URL.createObjectURL(newFile.file)
                    }
                },

                //保存
                commitFileFn: function () {
                    var _self = this;
                    if (_self.files.length == 0) {
                        _self.$message({message: '请选择一个文件', type: 'warning'});
                        return;
                    }
                    _self.$confirm('保存后立即生效，请确认是否继续？', '提示').then(function (action) {
                        if (action === 'confirm') {
                            _self.aFn();
                        }
                    });
                },

                aFn:function(){
                    var _self = this;
                    _self.loadingUp = true;
                    _self.$nextTick(function () {
                        _self.$refs.upload.active = true;
                    })
                },

                //取消按钮
                cancelFn: function () {
                    var _self = this;
                    _self.files = [];
                    _self.importDialogVisible = false;
                },
                /*导入更新结束*/

                /*导入删除开始*/
                commitFileDelFn: function () {
                    var _self = this;
                    if (_self.files.length == 0) {
                        _self.$message({message: '请选择一个文件', type: 'warning'});
                        return;
                    }
                    _self.$confirm('保存后立即生效，请确认是否继续？', '提示').then(function (action) {
                        if (action === 'confirm') {
                            _self.dFn();
                        }
                    });
                },
                dFn:function(){
                    var _self = this;
                    _self.loadingDel = true;
                    _self.$nextTick(function () {
                        _self.$refs.delete.active = true;
                    })
                },

                inputFilterDel: function (newFile, oldFile, prevent) {
                    var _self = this;
                    if (_self.files.length > 1) {
                        _self.$message({message: '一次只能选择一个文件！', type: 'warning'});
                        return prevent();
                    }
                    newFile.data = _self.fileData;
                    newFile.blob = '';
                    var URL = window.URL || window.webkitURL;
                    if (URL && URL.createObjectURL && newFile.file) {
                        newFile.blob = URL.createObjectURL(newFile.file)
                    }
                },

                inputFileDel: function (newFile, oldFile) {
                    var _self = this;
                    if (newFile && oldFile && !newFile.active && oldFile.active) {
                        var mesType = 'warning';
                        // Get response data
                        if (newFile.success === true) {
                            _self.$refs.reftable.remoteData();
                            _self.files = [];
                            var msgData = newFile.response.message;

                            //flag:用来区分错误类型（excel填写错误/数据库存在历史数据的错误）
                            _self.flag = msgData.substring(0, msgData.indexOf(":"))
                            var errorMsg = msgData.substring(msgData.indexOf(":") + 1, msgData.length);
                            //转化为数组，用于遍历展示
                            _self.errors = errorMsg.split(',');
                            if (typeof (newFile.response) === 'string')
                                newFile.response = JSON.parse(newFile.response);
                            if (newFile.response && newFile.response.message) {
                                if (newFile.response.success === true) {
                                    mesType = 'success';
                                    _self.$message({message: newFile.response.message, type: mesType});
                                } else {
                                    _self.tipsVisible = true;
                                    _self.loadingUp = false;
                                    _self.loadingDel = false;
                                }
                            } else {
                                _self.$message({message: '上传文件失败!', type: mesType});
                            }
                            _self.$refs.reftable.remoteData();
                            _self.files = [];



                        } else {
                            var message = '上传文件失败！';
                            if (newFile.error === 'extension') {
                                message = '上传的文件只支持：';
                                for (var i = 0; i < this.extensions.length; i++) {
                                    message += this.extensions[i] + '、';
                                }
                                message += '后缀的文件！';
                            }
                            _self.$message({message: message, type: mesType});
                        }
                        _self.loadingDel = false;
                        _self.importDialogVisible1 = false;
                    }
                },
                //取消按钮
                cancelDelFn: function () {
                    var _self = this;
                    _self.files = [];
                    _self.importDialogVisible1 = false;
                },
                /*导入删除结束*/


                //下载导入模板
                downUpFn: function () {
                    var downLoadUrl = backend.cusService + '/api/company/white/up/downLoad';
                    window.location.href = downLoadUrl;
                },

                //下载删除模板
                downlDelFn: function () {
                    var downLoadUrl = backend.cusService + '/api/company/white/delete/downLoad';
                    window.location.href = downLoadUrl;
                },

                //导入更新按钮
                impAndUpdateFn: function () {
                    var _self = this;
                    _self.importDialogVisible = true;
                },

                //导入删除
                impAndDeleteFn : function () {
                    var _self = this;
                    _self.importDialogVisible1 = true;
                },

                //错误信息取消按钮
                cancelErrFn: function () {
                    var _self = this;
                    _self.files = [];
                    _self.tipsVisible = false;
                    _self.importDialogVisible = false;
                    _self.importDialogVisible1 = false;
                    _self.loadingDel = false;
                    _self.loadingUp = false;
                },

                //设置有效日期
                setDtFn : function () {
                    var _self = this;
                    _self.switchStatus('EDIT', true);
                    yufp.service.request({
                        method: 'POST',
                        url: backend.cusService + '/api/query/company/effectiveDate',
                        data: {},
                        callback: function (code, message, response) {
                            if (response.rows >= 0) {
                                _self.$nextTick(function () {
                                    var effectiveDate = response.rows;
                                    _self.$refs.reform.formModel.effectiveDate = effectiveDate;
                                })
                            } else {
                                _self.$nextTick(function () {
                                    _self.$refs.reform.formModel.effectiveDate = null;
                                })
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
