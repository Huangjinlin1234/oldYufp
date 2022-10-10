/**
 * @author qiuyf
 * @since 2018-12-24
 * @description 关联人管理页面js
 */
define( function(require, exports) {
    
    exports.ready = function(hashCode, data, cite){
        yufp.lookup.reg('STD_ZB_CERT_TYP');
        var vm = yufp.custom.vue({
        	components: {
                FileUpload: window.VueUploadComponent
            },
        	el: cite.el,
            data: function(){
            	var _self = this;
                return {
                    tabName: 'first',
                    expandCollapseName: 'base',
                    
                    dataUrl: backend.cusService + "/api/cus/relChecks",
                    uploadUrl: backend.cusService + '/api/cus/rel/upload',
                    
                    baseParams: {
                    	relRelation: '02'    // 查询关联人信息
                    },
                    
                    queryFields: [
        	            { placeholder: '姓名', field: 'cusName', type: 'input' },
        	            { placeholder: '证件类型', field: 'certType', type: 'select', dataCode:'STD_ZB_CERT_TYP', datacodeFilter: function(options){
        	            	this.typeOptions = [];
        	            	for(var i=0; i<options.length; i++){
        	            		if(options[i].key === 'CN03' || options[i].key === 'HK01' || options[i].key === 'MO01' || options[i].key === 'TW01' || options[i].key === 'TW02'
        	            			|| options[i].key === '10100' || options[i].key === '10300' || options[i].key === '10900'){
        	            			this.typeOptions.push(options[i]);
        	            		}
        	            	}
        	            }  },
        	            { placeholder: '证件号码', field: 'certCode', type: 'input' }
                    ],
                    
                    tableColumns: [
                        { label: '姓名', prop: 'cusName', resizable: true, sortable: true},
                        { label: '证件类型', prop: 'certType', type:'select', dataCode:'STD_ZB_CERT_TYP', resizable: true, sortable: true},
                        { label: '证件号码', prop: 'certCode', sortable: true},
                        { label: '银监会标准', prop: 'cbrcStandard', width: 500},
                        { label: '生效开始日期', prop: 'vaildDateStart', sortable: true, resizable: true },
                        { label: '生效终止日期', prop: 'vaildDateEnd', sortable: true, resizable: true },

                    ],
                    
                    queryButtons: [
                        { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                            if (valid) {
                              _self.$refs.reftable.remoteData(model);
                            }
                          } },
                        { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
                    ],
                    
                    updateFields: [{
                    	columnCount: 2,
                        fields: [
                        	{ field: 'relSerno', label: '流水号'},
                            { field: 'cusName', label: '姓名' },
                            { field: 'relRelation', label: '关联关系', type:'select', dataCode:'REL_RELATION', hidden:true},
                            { field: 'certType', label: '证件类型', type:'select', dataCode:'STD_ZB_CERT_TYP'},
                            { field: 'certCode', label: '证件证号' },
                            { field: 'cbrcStandard', label: '银监会标准' },
                            { field: 'createTime', label: '录入时间'}// , type:'datetime'
                        ]
                    }],
                    
                    updateButtons: [
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
                    height: yufp.frame.size().height - 103,
                    dialogVisible: false,
                    importDialogVisible: false,
                    formDisabled: false,
                    loading2: false,
                    flag:'',
                    tipsVisible: false,
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false)
                }
            }, // end of data: function()
            
            methods: {
                /**
				 * @param ctrlCode
				 *            操作码
				 */
                checkPermission: function (ctrlCode) {
                    return !yufp.session.checkCtrl(ctrlCode, cite.menuId);
                },
                
                /**
				 * @param viewType
				 *            表单类型
				 * @param editable
				 *            可编辑,默认false
				 */
                switchStatus: function (viewType, editable) {
                	var _self = this;
                	_self.viewType = viewType;
                	_self.updateButtons[0].hidden = editable;
                	_self.formDisabled = !editable;
                	_self.dialogVisible = true
                },
                
                //查看
                infoFn: function () {
                	var _self = this;
                    if (_self.$refs.reftable.selections.length != 1) {
                    	_self.$message({message: '请先选择一条记录', type: 'warning'});
                        return
                    }
                    _self.switchStatus('DETAIL', false);
                    this.$nextTick(function () {
                        yufp.extend(_self.$refs.reform.formModel, _self.$refs.reftable.selections[0]);
                    })
                },
                
                //模板下载
                downloadFn: function () {
                    var downLoadUrl = backend.cusService + '/api/cus/rel/downLoad';
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
                    _self.loading2 = true;
                    _self.$nextTick(function () {
                        _self.$refs.upload.active = true;
                    })
                },

                //取消按钮
                cancelFn: function () {
                    this.files = [];
                    this.importDialogVisible = false;
                },
                deleteFn: function () {
                    var _self = this;
                    var selections = _self.$refs.reftable.selections;
                    if (selections.length == 0) {
                        _self.$message({message: '请先选择要删除的记录', type: 'warning'});
                        return;
                    }
                    var len = selections.length, arr = [];
                    for (var i = 0; i < len; i++) {
                        arr.push(selections[i].relSerno);
                    }
                    this.$confirm('点击确定将永久删除该数据，是否确认？', '提示').then(function () {
                        yufp.service.request({
                            method: 'DELETE',
                            url: backend.cusService + '/api/cus/relChecks/rels',
                            data: {
                                relSerno: arr.join(',')
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
                //取消按钮
                cancelFn: function () {
                    this.files = [];
                    this.errors = [];
                    this.importDialogVisible = false;
                    this.tipsVisible = false;
                }
            } // end of methods
            
        });
    }
    
    // 消息处理
    exports.onmessage = function (type, message) {

    };
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {

    }
});