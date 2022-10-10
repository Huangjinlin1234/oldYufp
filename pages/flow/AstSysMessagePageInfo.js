/**
 * @create by fuzm on 2018-06-08
 * @description 系统公告表
 */
define([
    './custom/widgets/js/UserSelecter.js',
    './custom/widgets/js/OrgSelector.js',
    './custom/widgets/js/DutySelecter.js',
    './custom/widgets/js/RoleSelecter.js'
    ], function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE','MES_TYPE');
        var defaultLoad = !data ? true : false;
      yufp.custom.vue({
        el: cite.el,
        data: function () {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        month = month <10 ? ('0'+month) : month;
        day = day <10 ? ('0'+day) : day;
        var dateStr = year+'-'+month+'-'+day;
        var orgCodes = '';
          var _self = this;
          return {
          	dataUrl: backend.consoleService + '/api/ast/sys/messages',
              defaultLoad: defaultLoad,
            baseParams: {
            	orgCodes:_self.vals
            },
            vals: '',
            queryFields: [
            { placeholder: '标题', field: 'title', type: 'input' },       
            { placeholder: '创建日期', field: 'inputdate', type: 'date' },
            //{ placeholder: '发送日期', field: 'senddate', type: 'date' },
            { placeholder: '发送人', field: 'userName', type: 'input' },
            { placeholder: '消息类型', field: 'mesType', type: 'select',dataCode: 'MES_TYPE' }
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
            { label: '公告编号', prop: 'mesId', sortable: true, resizable: true,hidden: true },
            { label: '标题', prop: 'title',  resizable: true ,width:'400px' },
            { label: '公告内容', prop: 'mess', resizable: true,width:'650px' },
            { label: '创建日期', prop: 'inputdate', sortable: true, resizable: true ,width:'120px' },
            { label: '发送日期', prop: 'senddate', sortable: true, resizable: true,hidden: true },
            { label: '发送人', prop: 'userName', resizable: true },
            { label: '接受机构码', prop: 'orgIds', sortable: true, resizable: true,hidden: true },
            { label: '接受角色码', prop: 'roleIds', sortable: true, resizable: true,hidden: true },
            { label: '接受岗位码', prop: 'dutyIds', sortable: true, resizable: true,hidden: true },
            { label: '消息类型', prop: 'mesType',  resizable: true ,width:'150px',dataCode: 'MES_TYPE'}
            ],
            updateLoading: false,
            updateFields: [{
                     columnCount: 1,
               fields: [
                   { field: 'title', label: '标题',width:'110px',type: 'textarea',rows:1,rules: [ { required: true, message: '标题是必填项', trigger: 'blur' }, { max: 80, message: '最大长度为80'}] },
                   { field: 'mess', label: '公告内容',width:'110px', type: 'textarea', rows:10,rules: [ { max: 4000, message: '最大长度为4000'} ] }
                   ]
                  },{
                  	columnCount: 2,
                  	fields: [
                    { field: 'senderId', label: '发送人代码',width:'110px',disabled: true,value: yufp.session.userId },
                    { field: 'mesType', label: '消息类型',type: 'select',width:'110px',dataCode: 'MES_TYPE',rules: [ { required: true, message: '消息类型是必填项', trigger: 'blur' }]}
                    ]
                      },{
                    	columnCount: 1,
                    fields: [
                   { field: 'orgIds', label: '接受机构代码', type: 'custom',
                     is: 'div-org-selector',
                     params: {},
                     width:'110px',
                   },
                   { field: 'roleIds', label: '接受角色代码',disabled: false, type: 'custom',
                     is: 'div-role-selector',
                     params: {},
                     width:'110px'
                   },
                   { field: 'dutyIds', label: '接受岗位代码',disabled: false,  type: 'custom',
                     is: 'div-duty-selector',
                     params: {},
                     width:'110px'
                   }
                   
                   ]
                 },{
                    columnCount: 2,
                    fields: [
                   { field: 'userName', label: '发送人',width:'110px'},
                   { field: 'mesId', label: '公告编号',width:'110px',disabled: true, placeholder: '系统自动生成' },
                   { field: 'inputdate', label: '创建日期', width:'110px' ,disabled: true,value:dateStr,type: 'date' },
                   { field: 'senddate', label: '发送日期', width:'96px',disabled: true,value:dateStr,type: 'date' }
                   ]       
                    }],
            updateButtons: [
              { label: '确定', type: 'primary', icon: 'check', hidden: false, click: function (model) {
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
                  
                  _self.updateLoading = true;
                  yufp.service.request({
                    method: rMethod,
                    url: backend.consoleService + '/api/ast/sys/message',
                    data: model,
                    callback: function (code, message, response) {
                      if (code == 0 && response.rows == 1) {
                        _self.$refs.reftable.remoteData();
                        _self.$message('操作成功');
                        _self.dialogVisible = false;
                      } else {
                        _self.$message('操作失败');
                      }
                    }
                  });
                } },
                { label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
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
            var _self = this;
            _self.viewType = viewType;
            // _self.updateButtons[0].hidden = !editable;
            _self.updateButtons[0].hidden = !editable;
            _self.formDisabled = !editable;
            _self.dialogVisible = true;
          },
           switchParamStatus: function () {
             var val = this.viewType != 'DETAIL';
              this.$refs.reform.switch('userName', 'hidden', val);
              this.$refs.reform.switch('mesId', 'hidden', val);
              this.$refs.reform.rebuildFn();
          },
          addFn: function () {
            var _self = this;
            _self.switchStatus('ADD', true);
            _self.$nextTick(function () {
            	this.switchParamStatus();
              _self.$refs.reform.resetFn();
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
              _self.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            _self.$confirm('是否删除?', '提示')
             .then(function () {
            var len = selections.length, arr = [];
            for (var i = 0; i < len; i++) {
              arr.push(selections[i].mesId);
            }
            
            yufp.service.request({
              method: 'DELETE',
              url: backend.consoleService + '/api/ast/sys/message',
              data: {
                mesId: arr.join(',')
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
          }
        },
          mounted: function() {
            if ( data ) {
                this.$refs.queryform.fm.title = data.title;
                this.$refs.reftable.remoteData(this.$refs.queryform.fm);
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
