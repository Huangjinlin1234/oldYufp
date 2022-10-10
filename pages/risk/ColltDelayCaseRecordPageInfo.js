/**
 * @create by ligm on 2019-08-27
 * @description 委外催收延案记录表
 */
define(['./custom/widgets/js/ColltTaskInfoToOutsSelector.js'
],function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE,TIME_UNIT');
      yufp.custom.vue({
        components: {
          FileUpload: window.VueUploadComponent
        },
        el: cite.el,
        data: function () {
          var _self = this;
          return {
            dataUrl: backend.riskmService + '/api/collt/delay/case/records',
            baseParams: {
            },
            queryFields: [
              { placeholder: '委外机构编号', field: 'outsOrgCode', type: 'input' },
              { placeholder: '委外机构名称', field: 'outsOrgName', type: 'input' },
              { placeholder: '延案申请日期', field: 'createTime', type: 'date', editable: false }
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
              { label: '延案申请流水号', prop: 'delayCaseAppSerno', sortable: true, resizable: true, hidden: true  },
              { label: '催收任务编号', prop: 'colltTaskNo', sortable: true, resizable: true },
              { label: '分配批次号', prop: 'colltBatchNo', sortable: true, resizable: true },
              { label: '委外机构编号', prop: 'outsOrgCode', sortable: true, resizable: true },
              { label: '委外机构名称', prop: 'outsOrgName', sortable: true, resizable: true },
              { label: '客户编号', prop: 'cusId', sortable: true, resizable: true },
              { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
              { label: '借据编号', prop: 'loanNo', sortable: true, resizable: true },
              { label: '延长时间', prop: 'delayTime', sortable: true, resizable: true },
              { label: '延长时间单位', prop: 'delayTimeUnit', sortable: true, resizable: true, dataCode: 'TIME_UNIT'},
              { label: '申请时间', prop: 'createTime', sortable: true, resizable: true, type:'datetime' },
              { label: '操作员', prop: 'opUserName', sortable: true, resizable: true },
              { label: '操作员所属机构', prop: 'opOrgName', sortable: true, resizable: true }
            ],

            updateFields: [{
              columnCount: 3,
              fields: [
                {field: 'colltTaskNo', label: '催收任务编号', type:'custom', is: 'div-colltTaskInfoToOuts-selector', params:{colltWay: ''},
                  clickFn:function(value,model,args){
                    _self.$refs.reform.switch('colltTaskNo','params',{colltWay : '03', colltBatchNo: data.colltBatchNo,
                      outsOrgCode: data.outsOrgCode, outsHdleType: data.outsHdleType});
                    _self.$refs.reform.rebuildFn();
                  },
                  selectFn: function (val, formModel, arguments) {
                    formModel.colltBatchNo = arguments[1].colltBatchNo;
                    formModel.outsOrgCode = arguments[1].outsOrgCode;
                    formModel.outsOrgName = arguments[1].outsOrgName;
                    formModel.cusId = arguments[1].cusId;
                    formModel.cusName = arguments[1].cusName;
                    formModel.loanNo = arguments[1].loanNo;
                    formModel.opUserCode = arguments[1].opUserCode;
                    formModel.opOrgCode = arguments[1].opOrgCode;
                    formModel.taskSts = arguments[1].taskSts;
                  }, rules: [ { required: true, message: '必输项', trigger: 'blur' }]},
                {field: 'colltBatchNo', label: '分配批次号', disabled: true},
                {field: 'outsOrgCode', label: '委外机构编号', disabled: true},
                {field: 'outsOrgName', label: '委外机构名称', disabled: true},
                {field: 'cusId', label: '客户编号', disabled: true},
                {field: 'cusName', label: '客户名称', disabled: true},
                {field: 'loanNo', label: '借据编号', disabled: true},
                {field: 'opUserCode', label: '操作员', disabled: true},
                {field: 'opOrgCode', label: '操作员所属机构', disabled: true},
                {field: 'delayTime', label: '延长时间', rules: [ { required: true, message: '必输项', trigger: 'blur' },
                    {validator: yufp.validator.number, message: '必须填写数字', trigger: 'blur'}], value: '1' },
                {field: 'delayTimeUnit', label: '延长时间单位', type: 'select', dataCode: 'TIME_UNIT',datacodeFilter: function (options) {
                    this.typeOptions = [];
                    for (var i = 0; i < options.length; i++) {
                      if (options[i].key == '001' || options[i].key == '002') {
                        this.typeOptions.push(options[i]);
                      }
                    }
                  },
                  rules: [ { required: true, message: '必输项', trigger: 'blur' }], value: '002'},
                {field: 'taskSts', label: '任务状态', disabled: true, hidden: true}
              ]
            }],

            updateButtons: [
              { label: '提交', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                  var validate = false;
                  _self.$refs.reform.validate(function (valid) {
                    validate = valid;
                  });
                  if (!validate) {
                    return;
                  }
                  // var rMethod = '';
                  // if (_self.viewType == "EDIT") {
                  //   rMethod = 'PUT';
                  // } else if (_self.viewType == "ADD") {
                  //   rMethod = 'POST';
                  // }
                  yufp.service.request({
                    method: 'POST',
                    url: backend.flowService + '/api/collt/delay/case/record',
                    data: model,
                    callback: function (code, message, response) {
                      if (code == 0 && response.code == 0) {
                        _self.$message('延案申请发起成功！');
                        _self.dialogVisible = false;
                      } else {
                        _self.$message('操作失败，'+response.message);
                      }
                      _self.$refs.reftable.remoteData();
                    }
                  });
                } },
                { label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                  _self.dialogVisible = false;
                } },
            ],
            uploadUrl: backend.flowService + "/api/collt/delay/case/upload",
            dialogImportExcelVisible :false,
            loading2: false,
            extensions: ['xls', 'xlsx'],
            fileData: {},
            headers: {},
            files: [],
            fileExcelName: '',
            height: yufp.frame.size().height - 103,
            dialogVisible: false,
            formDisabled: false,
            viewType: 'DETAIL',
            viewTitle: yufp.lookup.find('CRUD_TYPE', false)
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
            // _self.updateButtons[0].hidden = !editable;
            _self.updateButtons[1].hidden = !editable;
            _self.formDisabled = !editable;
            _self.dialogVisible = true;
          },

          addFn: function () {
            var _self = this;
            _self.switchStatus('ADD', true);
            _self.$nextTick(function () {
              _self.$refs.reform.resetFn();
            });
          },

          //模板下载
          downloadFn: function () {
            var downLoadUrl = backend.riskmService + '/api/collt/delay/app/template/downLoad';
            window.location.href = downLoadUrl;
          },

          //按模板导入面板
          importFn: function () {
            this.dialogImportExcelVisible = true;
          },

          inputFile: function (newFile, oldFile) {
            if (newFile && oldFile && !newFile.active && oldFile.active) {
              var mesType = 'warning';
              // Get response data
              if (newFile.success === true) {
                if (typeof (newFile.response) === 'string'){
                  newFile.response = JSON.parse(newFile.response);
                }
                if (newFile.response && newFile.response.message) {
                  if (newFile.response.success === true) {
                    mesType = 'success';
                    this.$message({message: newFile.response.message, type: mesType});
                  } else {
                    this.tipsVisible = true;
                    mesType = 'warning';
                    this.$message({message: '上传文件失败!' + newFile.response.message, type: mesType});
                  }
                } else {
                  this.$message({message: '上传文件失败!' + newFile.response.message, type: mesType});
                }
                this.dialogImportExcelVisible = false;
                this.$refs.reftable.remoteData();
              } else {
                var message = '上传文件失败！';
                if (newFile.error === 'extension') {
                  message = '上传的文件只支持：';
                  for (var i = 0; i < this.extensions.length; i++) {
                    message += this.extensions[i] + '、';0
                  }
                  message += '后缀的文件！';
                }
                this.$message({message: message, type: mesType});
              }
              this.files = [];
              this.fileExcelName = '';
              this.loading2 = false;
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

          //提交
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
            this.fileExcelName = '';
            this.dialogImportExcelVisible = false;
          },

          modifyFn: function () {
            if (this.$refs.reftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            this.switchStatus('EDIT', true);
            this.$nextTick(function () {
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
              yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0]);
            });
          },

          deleteFn: function () {
            var _self = this;
            var selections = _self.$refs.reftable.selections;
            if (selections.length < 1) {
              _self.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            var len = selections.length, arr = [];
            for (var i = 0; i < len; i++) {
            }
            yufp.service.request({
              method: 'DELETE',
              url: '/api/collt/delay/case/record',
              data: {
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
          },

          exportFn: function () {
            yufp.util.exportExcelByTable({
              fileName: '下载文件',
              importType: 'service', // page当前页 selected 选中的数据  service 后端数据
              ref: this.$refs.reftable,
              url: '',
              param: {}
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
