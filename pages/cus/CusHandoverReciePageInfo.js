/**
 * @create by chenqm1 on 2018-05-14
 * @description 客户移交申请
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
            appDataUrl : backend.cusService+'/api/cus/handover/apps/recv',
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
            appDetailUpdateFields: [{
              columnCount: 3,
              fields: [
                   { field: 'serno', label: '申请流水号',disabled:true},
                   { field: 'orgType', label: '接收机构与移出机构关系', type: 'select',dataCode:'STD_ZB_ORG_TYPE',
                     rules: [
                              { required: true, message: '请选择一项作为接收机构与移出机构关系!', trigger: 'blur'}
                          ]},
                   { field: 'handoverScope', label: '移交范围', type: 'select',dataCode:'STD_ZB_HAND_SCOPE',
                     rules: [
                              { required: true, message: '请选择一项作为移交范围!', trigger: 'blur'}
                          ]},
                   { field: 'handoverMode', label: '移交方式', type: 'select',dataCode:'STD_ZB_HAND_TYPE',
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
                
                { label: '接收', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                  var data = _self.$refs.appDetailReform.formModel;
                  
                  yufp.service.request({
                    method: "PUT",
                    url: backend.cusService + '/api/cus/handover/app/recive',
                    data: data,
                    callback: function (code, message, response) {
                      if ( response.success == true ) {
                        _self.appDetaildialogVisible = false;
                        _self.$refs.reftable.remoteData();
                        _self.$message('已成功接收该交易的客户!');
                      } else {
                        _self.$message({message: response.message, type: 'warning'});
                      }
                    }
                  });
                   
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
          checkPermission: function(ctrlCode) {
            return !yufp.session.checkCtrl(ctrlCode, cite.menuId);
          },
          switchStatus: function (viewType, editable) {
            var _self = this;
            _self.viewType = viewType;
            _self.updateButtons[1].hidden = !editable;  
             
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
            _self.updateButtons[1].hidden = !editable;
            _self.cusDialogVisible = true;
          },
           infoFn: function () {
            if (this.$refs.reftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            this.logSwitchStatus('DETAIL', false);
            this.$nextTick(function () {
              this.appDetailUpdateButtons[0].hidden =false;
              this.appDetailUpdateButtons[1].hidden = true;
              var apply = this.$refs.reftable.selections[0];
              yufp.extend(this.$refs.appDetailReform.formModel, apply);
              var obj = {
                serno: apply.serno
              };
                      
              this.$refs.appReftable.remoteData(obj);
            });
          },
          receiveFn: function () {
            if (this.$refs.reftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
              
              var dataserno =  this.$refs.reftable.selections[0];
           //    var _self = this;
               if(dataserno.status !='20'){
                 this.$message({ message: '只有复核通过状态的申请才能接收', type: 'warning' });
                   return;
               }
                 var loginUserId =  this.$refs.reftable.selections[0].loginUserId;
               var receiverId =  this.$refs.reftable.selections[0].receiverId;
              if(loginUserId!=receiverId){
                  this.$message({ message: '只有登录人和接收人一致，才能接收!', type: 'warning' });
                    return;
                }
                             this.appDetaildialogVisible = true;
               this.$nextTick(function () {
                this.appDetailUpdateButtons[0].hidden =false;
            this.appDetailUpdateButtons[1].hidden = false;

            var _self =  this;
              yufp.util.copyObj(_self.$refs.appDetailReform.formModel, dataserno);
               yufp.service.request({
                    method: 'GET',
                    url: backend.cusService+'/api/cus/handover/lst/'+_self.$refs.appDetailReform.formModel.serno+'/',
                    data: '',
                    callback: function (code, message, response) {
                      if (code == 0) {
                        var mydata = response.data;
                        var len = mydata.length;
                        _self.$refs.appReftable.data = mydata;
//                        _self.$message('操作成功');
                        _self.dialogVisible = false;
                      } else {
                        _self.$message('操作失败');
                      }
                    }
                     });
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

    };

});
