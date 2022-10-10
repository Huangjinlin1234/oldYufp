/**
 * @create by chenqm1 on 2018-05-14
 * @description 客户移交审批
 */
define([
    './custom/widgets/js/OrgSelector.js',
     './custom/widgets/js/UserSelecter.js',
     './custom/widgets/js/DicSelecter.js',
     './custom/widgets/js/AddrDicSelecter.js'
    ],function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE,STD_ZB_HAND_SCOPE,STD_ZB_HAND_TYPE,STD_ZB_ORG_TYPE,STD_ZB_HAND_STATUS');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
            appDataUrl : backend.cusService+'/api/cus/handover/apps/appr',
            applyDetailDataUrl: backend.cusService + '/api/cus/handover/lst/serno',
            detailDataUrl : backend.cusService+'/api/cus/handover/lsts',
            cusDataUrl :backend.cusService+"/api/cus/indivs",
            appCustDataUrl:backend.cusService+"/api/cus/indivs",
            baseParams: {
            },
            appBaseParams: {
            },
            cusBaseParams: {
            },
            cusQueryFields: [
            { placeholder: '客户号', field: 'cusId', type: 'input' },
            { placeholder: '客户姓名', field: 'cusName', type: 'input' }
            ],
            queryFields: [
            { placeholder: '申请流水号', field: 'serno', type: 'input' },
            { placeholder: '移出人代码', field: 'handoverId', type: 'input' },
            { placeholder: '移出机构代码', field: 'handoverBrId', type: 'input' },
            { placeholder: '接收人代码', field: 'receiverId', type: 'input' },
            { placeholder: '接收机构代码', field: 'receiverBrId', type: 'input' },
            { placeholder: '登记日期区间', field: 'inputDates', type: 'daterange',value:[] }
            ],
             logQueryFields: [
            { placeholder: '申请流水号', field: 'serno', type: 'input' },
            { placeholder: '接收机构与移出机构关系', field: 'orgType', type: 'select',dataCode:'STD_ZB_ORG_TYPE' },
            { placeholder: '移交范围', field: 'handoverScope', type: 'select',dataCode:'STD_ZB_HAND_SCOPE' },
            { placeholder: '移交方式', field: 'handoverMode', type: 'select',dataCode:'STD_ZB_HAND_TYPE' },
            { placeholder: '区域编码', field: 'areaCode', type: 'input' },
            { placeholder: '区域名称', field: 'areaName', type: 'input' },
            { placeholder: '移出人代码', field: 'handoverId', type: 'input' },
            { placeholder: '移出机构代码', field: 'handoverBrId', type: 'input' },
            { placeholder: '监交人代码', field: 'superviseId', type: 'input' },
            { placeholder: '监交机构代码', field: 'superviseBrId', type: 'input' },
            { placeholder: '接收人代码', field: 'receiverId', type: 'input' },
            { placeholder: '接收机构代码', field: 'receiverBrId', type: 'input' },
            { placeholder: '移交说明', field: 'handoverDetail', type: 'input' },
            { placeholder: '登记日期', field: 'inputDate', type: 'date' }
            ],
            cusQueryButtons: [
              { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
               
                  if (valid) {
                 
                    _self.$refs.cusReftable.remoteData(model);
                  }
                } },
              { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
            ],
            queryButtons: [
              { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
               
                  if (valid) {
                    _self.$refs.reftable.remoteData(model);
                  }
                } },
              { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
            ],
            
             cusQableColumns: [
             { label: '客户号', prop: 'cusId', sortable: true, resizable: true },
             { label: '客户姓名', prop: 'cusName', sortable: true, resizable: true }
            ],
          
            tableColumns: [
            { label: '申请流水号', prop: 'serno', sortable: true, resizable: true },
            { label: '移出人代码', prop: 'handoverId', sortable: true, resizable: true },
            { label: '移出机构代码', prop: 'handoverBrId', sortable: true, resizable: true },
            { label: '监交人代码', prop: 'superviseId', sortable: true, resizable: true },
            { label: '监交机构代码', prop: 'superviseBrId', sortable: true, resizable: true },
            { label: '接收人代码', prop: 'receiverId', sortable: true, resizable: true },
            { label: '接收机构代码', prop: 'receiverBrId', sortable: true, resizable: true },
            { label: '状态', prop: 'status', sortable: true, resizable: true,dataCode:'STD_ZB_HAND_STATUS' },
            { label: '登记日期', prop: 'inputDate', sortable: true, resizable: true }
            ],
             appUpdateFields: [{
              columnCount: 3,
              fields: [
                  { field: 'serno', label: '申请流水号',hidden: true},
                  { field: 'orgType', label: '接收机构与移出机构关系', type: 'select',dataCode:'STD_ZB_ORG_TYPE',
                    rules: [
                              { required: true, message: '请选择一项作为接收机构与移出机构关系!', trigger: 'blur'}
                          ]},
                          
                   { field: 'handoverScope', label: '移交范围', type: 'select',dataCode:'STD_ZB_HAND_SCOPE',
                     rules: [
                              { required: true, message: '请选择一项作为移交范围!', trigger: 'blur'}
                          ]},
                          
                   { field: 'handoverMode', label: '移交方式',type: 'select',dataCode:'STD_ZB_HAND_TYPE',
                     rules: [
                              { required: true, message: '请选择一项作为移交方式!', trigger: 'blur'}
                          ]},
                          
                          { field: 'handoverId', label: '移出人代码',disabled:true,type:'custom',is:'div-user-selector',
                   rules: [
                              { required: true, message: '请选择移出人', trigger: 'blur'}
                          ]},
                          { field: 'superviseId', label: '监交人代码',type:'custom',is:'div-user-selector',
                   rules: [
                              { required: true, message: '请选择监交人!', trigger: 'blur'}
                          ]},
                          { field: 'receiverId', label: '接收人代码',type:'custom',is:'div-user-selector',
                   rules: [
                              { required: true, message: '请选择接收人!', trigger: 'blur'}
                          ]},
                          { field: 'handoverBrId', label: '移出机构代码',disabled:true,type:'custom',is:'div-org-selector',
                   rules: [
                              { required: true, message: '请选择移出机构!', trigger: 'blur'}
                          ]},
                            { field: 'superviseBrId', label: '监交机构代码',type:'custom',is:'div-org-selector',
                   rules: [
                              { required: true, message: '请选择监交机构!', trigger: 'blur'}
                          ]},
                          { field: 'receiverBrId', label: '接收机构代码',type:'custom',is:'div-org-selector',
                   rules: [
                              { required: true, message: '请选择接收机构!', trigger: 'blur'}
                          ]},
                          
                 /*  { field: 'areaCode', label: '区域编码',disabled:true},
                   { field: 'areaName', label: '区域名称',disabled:true,type:"custom",is:'div-addr-selector'},*/
                   { field: 'handoverDetail', label: '移交说明',type:"textarea",autosize:{ minRows: 2, maxRows: 4}},
                   { field: 'inputDate', label: '登记日期', hidden: true}
              ]
            }],
            appDetailUpdateFields: [{
              columnCount: 3,
              fields: [
                   { field: 'serno', label: '申请流水号',disabled:true},
                   { field: 'orgType', label: '接收机构与移出机构关系', type: 'select', dataCode: 'STD_ZB_ORG_TYPE',
                     rules: [
                              { required: true, message: '请选择一项作为接收机构与移出机构关系!', trigger: 'blur'}
                          ]},
                   { field: 'handoverScope', label: '移交范围', type: 'select', dataCode: 'STD_ZB_HAND_SCOPE',
                     rules: [
                              { required: true, message: '请选择一项作为移交范围!', trigger: 'blur'}
                          ]},
                   { field: 'handoverMode', label: '移交方式', type: 'select', dataCode:'STD_ZB_HAND_TYPE',
                   rules: [
                              { required: true, message: '请选择一项作为移交方式!', trigger: 'blur'}
                          ]},
                   { field: 'handoverId', label: '移出人代码'},
                   { field: 'superviseId', label: '监交人代码'},
                   { field: 'receiverId', label: '接收人代码'},
                   { field: 'handoverBrId', label: '移出机构代码'},
                   { field: 'superviseBrId', label: '监交机构代码'},
                   { field: 'receiverBrId', label: '接收机构代码'},
                   { field: 'areaCode', label: '区域编码' },
                   { field: 'areaName', label: '区域名称' },
                   { field: 'handoverDetail', label: '移交说明',type:"textarea",autosize:{ minRows: 2, maxRows: 4}},
                   { field: 'inputDate', label: '登记日期',type:"date"}
              ]
            }],
           appTableColumns: [
            //{ label: '申请流水号', prop: 'serno', sortable: true, resizable: true },
            { label: '业务类型', prop: 'handoverType', sortable: true, resizable: true ,dataCode:'STD_ZB_HAND_TYPE'},
            { label: '客户号', prop: 'cusId', sortable: true, resizable: true },
             { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
            { label: '移交业务说明', prop: 'businessDetail', sortable: true, resizable: true }
            //{ label: '标记(备用)', prop: 'flag', sortable: true, resizable: true }
            ],
            
             appDetailUpdateButtons: [
              { label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                  _self.appDetaildialogVisible = false;
                } },
                { label: '同意', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                //  var serno = _self.$refs.appDetailReform.formModel;
//                  var selections = _self.$refs.appReftable.selections;
//                  var mydata ={cusHandoverAppVO:serno ,cusHandoverLstVO:selections};
                    yufp.service.request({
                    method: "PUT",
                    url: backend.cusService + '/api/cus/handover/app/appr',
                    data: _self.$refs.reftable.selections[0],
                    callback: function (code, message, response) {
                      if (code == 0) {
                        _self.$refs.reftable.remoteData();
                        _self.$message('操作成功，客户移交审批已同意');
                        _self.dialogVisible = false;
                      } else {
                        _self.$message('操作失败');
                      }
                    }
                  });
                  _self.appDetaildialogVisible = false;
                } },
                
                
                { label: '否决', type: 'primary', icon: 'close', hidden: false, click: function (model) {
                      
          //  this.logSwitchStatus('APPROVE', true);
         //   this.$nextTick(function () {
               yufp.service.request({
                    method: "PUT",
                    url: backend.cusService+'/api/cus/handover/app/veto',
                    data: _self.$refs.reftable.selections[0],
                    callback: function (code, message, response) {
                      if (code == 0) {
//                        _self.$refs.reftable.remoteData();
                      	  _self.$refs.reform.resetFn();
                          _self.$message({message: '否决成功!', type: 'success'});
                      //  _self.dialogVisible = false;
                      } else {
                        _self.$message({message: response.message, type: 'warning'});
                      }
                    }
                  });
                   _self.appDetaildialogVisible = false;
       //     });
                } }
                ],
             
            height: yufp.frame.size().height - 103,
            dialogVisible: false,
            logDialogVisible:false,
            formDisabled: false,
            lstFormDisabled: false,
            cusDialogVisible: false,
            appDetaildialogVisible : false,
            viewType: 'DETAIL',
            viewTitle: yufp.lookup.find('CRUD_TYPE', false)
          };
        },
        methods: {
          /**_self.appDetailUpdateButtons[1].hidden = !editable
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
             
            _self.dialogVisible = true;
          },
          logSwitchStatus: function (viewType, editable) {
            var _self = this;
            _self.viewType = viewType;
           _self.lstFormDisabled = !editable;
            _self.appDetaildialogVisible = true;
            
          },
          lstSwitchStatus: function (viewType, editable) {
            var _self = this;
            _self.viewType = viewType;
            _self.cusDialogVisible = true;
          },
       
           infoFn: function () {
            if (this.$refs.reftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            this.logSwitchStatus('DETAIL', false);
            this.$nextTick(function () {
              var _self =  this;
              _self.appDetailUpdateButtons[0].hidden =false;
              _self.appDetailUpdateButtons[1].hidden = true;
              _self.appDetailUpdateButtons[2].hidden = true;
              var apply = _self.$refs.reftable.selections[0];
              yufp.extend(_self.$refs.appDetailReform.formModel, apply);
              var obj = {
                serno: apply.serno
              };
              this.$refs.appReftable.remoteData(obj);
            });
          },
            approveFn: function () {
              if (this.$refs.reftable.selections.length != 1) {
                this.$message({ message: '请先选择一条记录', type: 'warning' });
                return;
              }
              var selectData =  this.$refs.reftable.selections[0];
              var _self = this;
              if(selectData.status !='10'){
                 this.$message({ message: '只有复核中状态的申请才能审批', type: 'warning' });
                   return;
              }
              var loginUserId =  this.$refs.reftable.selections[0].loginUserId;
              var superviseId =  this.$refs.reftable.selections[0].superviseId;
              if(loginUserId!=superviseId){
                 this.$message({ message: '不是审批人，不可操作该申请', type: 'warning' });
                   return;
               }
             this.logSwitchStatus('DETAIL', false);
             this.$nextTick(function () {
              var _self =  this;
              _self.appDetailUpdateButtons[0].hidden =false;
              _self.appDetailUpdateButtons[1].hidden = false;
              _self.appDetailUpdateButtons[2].hidden = false;
              var apply = _self.$refs.reftable.selections[0];
              yufp.extend(_self.$refs.appDetailReform.formModel, apply);
              var obj = {
                serno: apply.serno
              };
              this.$refs.appReftable.remoteData(obj);
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

    };

});
