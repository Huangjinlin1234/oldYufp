/**
 * @create by chenqm1 on 2018-05-14
 * @description 贷后凭证上传表
 */
define(function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE,STD_ZB_APPR_STATUS,STD_PSP_APRO1_STATUS,STD_PSP_APRO_STATUS');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
            dataUrl:backend.pspService+'/api/psp/data/uploads',
            baseParams: {
            },
            queryFields: [
            { placeholder: '借据号', field: 'billNo', type: 'input' },
            { placeholder: '证件号码', field: 'certCode', type: 'input' },
            { placeholder: '客户号', field: 'cusId', type: 'input' },
            { placeholder: '客户名称', field: 'cusName', type: 'input' },
            { placeholder: '客户经理号', field: 'cusManager', type: 'input' },
            { placeholder: '机构代码', field: 'orgCode', type: 'input' },
            { placeholder: '审核状态', field: 'appStatus', type: 'select',dataCode:'STD_PSP_APRO1_STATUS' },
            { placeholder: '上传人', field: 'uploadId', type: 'input' },
            { placeholder: '上传时间', field: 'uploadDate', type: 'date' }
            
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
            { label: '借据号', prop: 'billNo', sortable: true, resizable: true },
            { label: '证件号码', prop: 'certCode', sortable: true, resizable: true },
            { label: '客户号', prop: 'cusId', sortable: true, resizable: true },
            { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
            { label: '客户经理号', prop: 'cusManager', sortable: true, resizable: true },
            { label: '机构代码', prop: 'orgCode', sortable: true, resizable: true },
            { label: '上传人', prop: 'uploadId', sortable: true, resizable: true },
            { label: '上传时间', prop: 'uploadDate', sortable: true, resizable: true },
            { label: '审核状态', prop: 'appStatus', sortable: true, resizable: true, dataCode: 'STD_PSP_APRO1_STATUS'}
            
            ],
            updateFields: [{
              columnCount: 3,
              fields: [
                    { field: 'cusManager', label: '客户经理号'},
                	 { field: 'orgCode', label: '机构代码'},
                	 { field: 'cusId', label: '客户号'},
                	 { field: 'cusName', label: '客户名称'},
                	 { field: 'uploadId', label: '上传人'},
                	 { field: 'uploadDate', label: '上传时间'},
                	 { field: 'billNo', label: '借据号'},
                	 { field: 'billAmt', label: '借据金额（元）'},
                	 { field: 'loanUse', label: '贷款用途'}
              ]
            }],
            
            billFields: [{
              columnCount: 1,
              fields: [
                   { field: 'appState', label: '审批', type: 'radio', dataCode: 'STD_PSP_APRO_STATUS', 
                         rules: [
                              { required: true, message: '必填项', trigger: 'blur' }
                          ]},
                   { field: 'appOpinion', label: '审批意见', type:"textarea",autosize:{ minRows: 2, maxRows: 4},
                         rules: [  {max: 1000, message: '最大长度为1000'} ]
                   }
              ]
            }],
            height: yufp.frame.size().height - 103,
            dialogVisible: false,
            billdialog:false,
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
            //_self.updateButtons[1].hidden = !editable;
            _self.formDisabled = false;
            _self.dialogVisible =  !editable;
            _self.billdialog =  editable;
            
          },
          infoFn: function () {
            if (this.$refs.reftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            this.switchStatus('DETAIL', false);
            this.$nextTick(function () {
                yufp.extend(this.$refs.reform.formModel, this.$refs.reftable.selections[0]);
            	  var  _self = this;
            	  var selections = this.$refs.reftable.selections;
            	  var cmisdata=selections[0];
            	  yufp.service.request({
                        method: "POST",
                        url: backend.pspService + '/api/psp/data/ecmupload',
                        data: cmisdata,
                        callback: function (code, message, response) {
                              if (response.code == 0) {
                              	_self.$refs.reftable.remoteData();
                                //_self.$message('操作成功');
                              } else {
                                _self.$message({message : response.message,type : 'warning'});
                              }
                     }
                })
            });
          },
          cancleFn: function(){
            var _self = this;
            _self.dialogVisible = false;
          },
          cancleFn1: function(){
            var _self = this;
            _self.billdialog = false;
          },
          
          submitFn: function () {
            this.$nextTick(function () {
                _self = this;
                var cmisdata = {};
                yufp.extend(cmisdata, _self.$refs.reformbill.formModel);
                yufp.extend(cmisdata, _self.$refs.reformsubmit.formModel);
                var appStatus = cmisdata.appStatus;
                var appState = cmisdata.appState;
                if(appState==""){
                      _self.$message({ message: '请选择审批结果!', type: 'warning' });
                       return;
                }   
                cmisdata.appStatus = appState;
                  yufp.service.request({
                    method: 'POST',
                    url:backend.pspService+ '/api/psp/data/approve',
                    data: cmisdata,
                    callback: function (code, message, response) {
                      if (response.code == 0) {
                        _self.$refs.reftable.remoteData();
                        _self.$message('操作成功');
                        _self.billdialog = false;
                      } else {
                        _self.$message(response.message);
                      }
                    }
                  });
              
            });
          },
          
          showFn: function () {
            this.$nextTick(function () {
            	_self = this;
            	var cmisdata = {};
                yufp.extend(cmisdata, _self.$refs.reform.formModel);
                      yufp.service.request({
                              method: "POST",
                              url: backend.pspService + '/api/psp/data/viewECM',
                              data: cmisdata,
                              callback: function (code, message, response) {
                              if (response.code == 0) {
                                   var emcUrl= response.data.emcUrl;
                                   window.open(emcUrl);
                              }else{
                                   _self.$message({message : response.message,type : 'warning'});
                              }
                          }
                        });
                });
          },
          
          showFn1: function () {
            this.$nextTick(function () {
              _self = this;
              var cmisdata = {};
                yufp.extend(cmisdata, _self.$refs.reformbill.formModel);
                      yufp.service.request({
                              method: "POST",
                              url: backend.pspService + '/api/psp/data/magECM',
                              data: cmisdata,
                              callback: function (code, message, response) {
                              if (response.code == 0) {
                                   var emcUrl= response.data.emcUrl;
                                   window.open(emcUrl);
                              }else{
                                   _self.$message({message : response.message,type : 'warning'});
                              }
                          }
                        });
                });
          },
          
          checkFn: function () {
            if (this.$refs.reftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            var  _self = this;
            var selections = this.$refs.reftable.selections;
            var cmisdata=selections[0];
            var appStatus = cmisdata.appStatus;
            if(appStatus!='000'){
                      _self.$message({ message: '已审批的任务，不能再提交审核!', type: 'warning' });
                       return;
                }  
            this.switchStatus('EDIT', true);
            this.$nextTick(function () {
                yufp.extend(this.$refs.reformbill.formModel, this.$refs.reftable.selections[0]);
                yufp.service.request({
                        method: "POST",
                        url: backend.pspService + '/api/psp/data/ecmupload',
                        data: cmisdata,
                        callback: function (code, message, response) {
                              if (code == 0) {
                              	_self.$refs.reftable.remoteData();
                                //上传至内容管理平台，是否成功不作提示
                                //_self.$message('操作成功');
                              } else {
                                _self.$message('操作失败');
                              }
                     }
                })
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
