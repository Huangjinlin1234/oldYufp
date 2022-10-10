﻿/**
 * @create by fuzm on 2018-05-30
 * @description 部门管理表
 */
define([
    './custom/widgets/js/OrgSelector.js','./custom/widgets/js/UserSelecter.js','./custom/widgets/js/DeptSelecter.js'
    ], function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE,COMMON_STATUS');
      var vm= yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
            dataUrl: backend.consoleService + '/api/s/depts',
            baseParams: {
            },         
            queryFields: [
            { placeholder: '部门代码', field: 'depno', type: 'input' },    
            { placeholder: '部门名称', field: 'depname', type: 'input' },
            { placeholder: '状态', field: 'state',  type: 'select', dataCode: 'COMMON_STATUS'}
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
            { label: '部门代码', prop: 'depno', sortable: true, resizable: true },
            { label: '部门名称', prop: 'depname',  resizable: true }, 
            { label: '部门负责人', prop: 'depchief', resizable: true },
            { label: '上级部门码', prop: 'supdepno', sortable: true, resizable: true },
            { label: '机构码', prop: 'organno', sortable: true, resizable: true },
            { label: '部门简称', prop: 'depshortform', sortable: true, resizable: true,hidden: true },
            { label: '英文名', prop: 'enname', resizable: true },
            { label: '顺序号', prop: 'orderno', sortable: true, resizable: true,hidden: true },
            { label: '地区编码', prop: 'distno', sortable: true, resizable: true,width:'130px' },
            { label: '推行日期', prop: 'launchdate', sortable: true, resizable: true },
            { label: '部门级别', prop: 'deplevel', sortable: true, resizable: true,hidden: true },         
            { label: '联系电话', prop: 'telnum',  resizable: true,width:'130px' },
            { label: '详细地址', prop: 'address', sortable: true, resizable: true,hidden: true },
            { label: '邮编', prop: 'postcode', sortable: true, resizable: true,hidden: true },
            { label: '备注', prop: 'momo', resizable: true },
            { label: '状态', prop: 'state', sortable: true, resizable: true,dataCode: 'COMMON_STATUS' },
            { label: '机构ID', prop: 'orgid', sortable: true, resizable: true,hidden: true }
            ],
            updateLoading: false,
            updateFields: [{
              columnCount: 3,
              fields: [
                   { field: 'depno', label: '部门代码' ,width:'96px', rules: [ { required: true, message: '部门代码是必填项', trigger: 'blur' }, { max: 16, message: '最大长度为16'}] },
                   { field: 'depname', label: '部门名称',width:'96px',rules: [ { required: true, message: '部门名称是必填项', trigger: 'blur' }, { max: 40, message: '最大长度为40'}] }, 
                   { field: 'depchief', label: '部门负责人', width:'96px',disabled: false,  needDis: true, type: 'custom', is: 'div-user-selector', 
                    rules: [ { required: true, message: '请选择部门负责人', trigger: 'blur' }, { max: 16, message: '最大长度为32'} ],
                     selectFn: function (val, formModel, arguments){

                    }},  
                   { field: 'supdepno', label: '上级部门码',width:'96px',disabled: false,  needDis: true, type: 'custom', is: 'div-dept-selector', 
                     rules: [ { max: 16, message: '最大长度为16'} ],
                    selectFn: function (val, formModel, arguments){
                    
                   }},
                   {field: 'organno', label: '机构码', width:'96px',disabled: false,  needDis: true, type: 'custom', is: 'div-org-selector', 
                     rules: [ { required: true, message: '请选择机构码', trigger: 'blur' }, { max: 16, message: '最大长度为16'} ],
                     selectFn: function (val, formModel, arguments){
                     //arguments 是调用了 插件里面  的 , select-fn 返回的参数, arguments[0]是值, arguments[1]是选择的整个列表数据
//                       var org = arguments[1];
//                       formModel.orgParentCode = org.orgParentCode;
//                       formModel.orgName = org.orgName;
//                       formModel.legalOrgCode = org.legalOrgCode;
                   }},
                   { field: 'enname', label: '英文名',width:'96px'},
                   { field: 'orderno', label: '顺序号',hidden:true},
                   { field: 'distno', label: '地区编码',width:'96px'},
                   { field: 'launchdate', label: '推行日期',width:'96px',type:'date'},
                   { field: 'telnum', label: '联系电话',width:'96px'},
                   { field: 'momo', label: '备注',width:'96px'},
                   { field: 'state', label: '状态', width:'96px',type: 'select', dataCode: 'COMMON_STATUS',hidden: true, needHid: true },
                   { field: 'orgid', label: '机构ID',width:'96px',hidden:true, needHid: true },
                   { field: 'address', label: '详细地址' ,width:'96px'}
                 

              ]
            }],
            updateButtons: [
             { label: '提交', type: 'primary', icon: 'yx-checkbox-checked', hidden: false, click: function (model) {
                  var validate = false;
                  _self.$refs.reform.validate(function (valid) {
                    validate = valid;
                  });
                  if (!validate) {
                    return;
                  }
                  
                  var rMethod = '';
                  if(_self.viewType == "EDIT") {
                    rMethod = 'PUT';
                  } else if(_self.viewType == "ADD") {
                    rMethod = 'POST';
                  }
                  vm.updateLoading = true;
                  yufp.service.request({
                    method: rMethod,
                    url: backend.consoleService + '/api/s/dept/submit',
                    data: model,
                    callback: function (code, message, response) {
                      vm.updateLoading = false;
                      if (code == 0) {
                        if ( response && response.data == -2) {
                            _self.$message({ message: response.message, type: 'warning' });
                        }else {
                           _self.dialogVisible = false;
                           _self.$refs.reftable.remoteData();
                          _self.$message('操作成功');
                        }
                      } else {
                        _self.$message('操作失败');
                      }
                    }
                  });
                } },
                { label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
                  var validate = false;
                  _self.$refs.reform.validate(function (valid) {
                    validate = valid;
                  });
                  if (!validate) {
                    return;
                  }
                  
                  var rMethod = '';
                  if(_self.viewType == "EDIT") {
                    rMethod = 'PUT';
                  } else if(_self.viewType == "ADD") {
                    rMethod = 'POST';
                  }
                  vm.updateLoading = true;
                  yufp.service.request({
                    method: rMethod,
                    url: backend.consoleService + '/api/s/dept',
                    data: model,
                    callback: function (code, message, response) {
                      vm.updateLoading = false;
                      if (code == 0) {
                          if ( response && response.data == -2) {
                              _self.$message({ message: response.message, type: 'warning' });
                          }else {
                            _self.$refs.reftable.remoteData();
                            _self.$message('操作成功');
                            _self.dialogVisible = false;
                          }
                      } else {
                        _self.$message('操作失败');
                      }
                    }
                  });
                } } ,
              { label: '返回', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
                  _self.dialogVisible = false;
                } }
            ],
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
             vm.updateLoading = false;
            var _self = this;
            _self.viewType = viewType;
            _self.updateButtons[1].hidden = !editable;
            _self.updateButtons[0].hidden = !editable;
            _self.formDisabled = !editable;
            _self.dialogVisible = true;
          },
           switchParamStatus: function () {
             var val = this.viewType != 'DETAIL';
             this.$refs.reform.switch('state', 'hidden', val);    
//             this.$refs.reform.switch('orgid', 'hidden', val);
//              this.$refs.reform.switch('createTime', 'hidden', val);
//              this.$refs.reform.switch('createUser', 'hidden', val);
//              this.$refs.reform.switch('lastUpdateUser', 'hidden', val);
//              this.$refs.reform.switch('lastUpdateTime', 'hidden', val);
              this.$refs.reform.rebuildFn();
          },
          addFn: function () {
            var _self = this;
            _self.switchStatus('ADD', true);
            _self.$nextTick(function () {
               this.switchParamStatus();
              this.$refs.reform.resetFn();  
            });
          },
          modifyFn: function () {
            if (this.$refs.reftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            var obj = this.$refs.reftable.selections[0];
            if ( obj.state != '0' ) {
              this.$message({ message: '只能修改待生效的部门', type: 'warning' });
              return ;
            }
            this.switchStatus('EDIT', true);
            this.$nextTick(function () {
              this.switchParamStatus();          
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
              this.$refs.reform.resetFields();
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
             var obj = selections[0];
            if ( obj.state != '0'  ) {
              _self.$message({ message: '只能删除待生效的部门!', type: 'warning' });
               return ;
            }
             _self.$confirm('是否删除?', '提示')
                    .then(function () {
            var len = selections.length, arr = [];
            for (var i = 0; i < len; i++) {
              arr.push(selections[i].depno);
            }
            
            yufp.service.request({
              method: 'DELETE',
              url:  backend.consoleService + '/api/s/dept',
              data: {
                depno: arr.join(',')
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
          
          exportFn: function () {
            yufp.util.exportExcelByTable({
              fileName: '下载文件',
              importType: 'service', // page当前页 selected 选中的数据  service 后端数据
              ref: this.$refs.reftable,
              url: '',
              param: {}
            });
          },
            disableFn: function () {
              var selections = vm.$refs.reftable.selections;
              if (selections.length != 1) {
                vm.$message({ message: '请先选择一条记录', type: 'warning' });
                return;
              }
              var obj = vm.$refs.reftable.selections[0];
              if ( obj.state != '1' ) {
                vm.$message({ message: '只有生效状态才能失效', type: 'warning' });
                return ;
              }
              this.$confirm('是否失效部门？', '提示')
                  .then(function () {
                  
                  yufp.service.request({
                      method: 'POST',
                      url: backend.consoleService +  '/api/s/dept/disable',
                      data: {
                        depno: obj.depno
                      },
                      callback: function (code, message, response) {
                        if (code == 0) {
                          if ( response.data < 0) {
                             vm.$message({ message: response.message, type: 'warning' });
                          }else {
                              vm.$refs.reftable.remoteData();
                              vm.$message('操作成功');
                          }
                        }else{
                          vm.$message('操作失败');
                        }
                      }
                    });
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