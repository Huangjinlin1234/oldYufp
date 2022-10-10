/**
 * @create by fuzm on 2018-05-05
 * @description 系统账务机构表
 */
define([
    './custom/widgets/js/OrgSelector.js'
    ], function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE,ORG_PROP,CHARGE_OFF_RULE_TYPE');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
          	dataUrl: backend.consoleService + '/api/s/accoount/orgs',
            baseParams: {
            },
            queryFields: [
            { placeholder: '机构代码', field: 'orgCode', type: 'input' },
            { placeholder: '机构名称', field: 'orgName', type: 'input' },
            { placeholder: '上级机构代码', field: 'orgParentCode', type: 'input' },
            { placeholder: '法人机构代码', field: 'legalOrgCode', type: 'input' },
            { placeholder: '机构属性', field: 'orgProp', type: 'select', dataCode: 'ORG_PROP' }
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
            { label: '机构代码', prop: 'orgCode', resizable: true },
            { label: '上级机构代码', prop: 'orgParentCode',  resizable: true },
            { label: '法人机构代码', prop: 'legalOrgCode', resizable: true },
            { label: '机构名称', prop: 'orgName', sortable: true, resizable: true, width: 260 },
            { label: '账务机构代码', prop: 'acctOrgCode',  resizable: true },
            { label: '机构属性', prop: 'orgProp', resizable: true, dataCode: 'ORG_PROP' },
            { label: '出账规则类型', prop: 'chargeOffRuleType',  resizable: true, dataCode: 'CHARGE_OFF_RULE_TYPE' }
            ],
            updateFields: [{
              columnCount: 2,
              fields: [
                	 { field: 'orgCode', label: '机构代码', disabled: false,  needDis: true, type: 'custom', is: 'div-org-selector', 
                	   rules: [ { required: true, message: '请选择机构代码', trigger: 'blur' }, { max: 24, message: '最大长度为24'} ],
                	   selectFn: function (val, formModel, arguments){
                	 	 //arguments 是调用了 插件里面  的 , select-fn 返回的参数, arguments[0]是值, arguments[1]是选择的整个列表数据
                	     var org = arguments[1];
                	     formModel.orgParentCode = org.orgParentCode;
                	     formModel.orgName = org.orgName;
                	     formModel.legalOrgCode = org.legalOrgCode;
                	 }},
                	 { field: 'orgParentCode', label: '上级机构代码', rules: [ { max: 24, message: '最大长度为24'} ] },
                	 { field: 'legalOrgCode', label: '法人机构代码', rules: [ { max: 24, message: '最大长度为24'} ] },
                	 { field: 'orgName', label: '机构名称', rules: [ { max: 150, message: '最大长度为150'} ]},
                	 { field: 'acctOrgCode', label: '账务机构代码', rules: [ { max: 24, message: '最大长度为24'} ]},
                	 { field: 'acctOrgName', label: '账务机构名称', rules: [ { max: 150, message: '最大长度为150'} ] },
                	 { field: 'orgProp', label: '机构属性', type: 'select', dataCode: 'ORG_PROP'},
                	 { field: 'chargeOffRuleType', label: '出账规则类型', type: 'select', dataCode: 'DATA_RULE_TYPE'},
                	 { field: 'createUser', label: '创建人', hidden: true, needHid: true},
                	 { field: 'createTime', label: '创建日期', hidden: true, needHid: true},
                	 { field: 'lastUpdateTime', label: '最后修改日期', hidden: true, needHid: true },
                	 { field: 'lastUpdateUser', label: '最后修改人', hidden: true, needHid: true }
              ]
            }],
            updateButtons: [
              
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
                  
                  yufp.service.request({
                    method: rMethod,
                    url: backend.consoleService + '/api/s/accoount/org',
                    data: model,
                    callback: function (code, message, response) {
                      if (code == 0) {
                      	if ( response && response.data < 0) {
                      	 _self.$message( { message: response.message, type: 'warning'});
                      	 return ;
                      	}
                        _self.$refs.reftable.remoteData();
                        _self.$message('操作成功');
                        _self.dialogVisible = false;
                      } else {
                      	_self.$message('操作失败');
                      }
                    }
                  });
                } },
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
            var _self = this;
            _self.viewType = viewType;
            // _self.updateButtons[0].hidden = !editable; calcDisabled
            _self.updateButtons[0].hidden = !editable;
            _self.formDisabled = !editable;
            _self.dialogVisible = true;
            for (var i = 0; i < this.updateFields[0].fields.length; i++ ) {
              if ( this.updateFields[0].fields[i].needDis) {
                this.updateFields[0].fields[i].calcDisabled = viewType != 'ADD'; //如果是EDIT, 则不可修改
                this.updateFields[0].fields[i].disabled = viewType != 'ADD'; //如果是EDIT, 则不可修改
              }
              if ( this.updateFields[0].fields[i].needHid) {
                this.updateFields[0].fields[i].hidden = editable;
              }
            }
          },
           switchParamStatus: function () {
             var val = this.viewType != 'DETAIL';
              this.$refs.reform.switch('createTime', 'hidden', val);
              this.$refs.reform.switch('createUser', 'hidden', val);
              this.$refs.reform.switch('lastUpdateUser', 'hidden', val);
              this.$refs.reform.switch('lastUpdateTime', 'hidden', val);
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
            var len = selections.length, arr = [];
            for (var i = 0; i < len; i++) {
              arr.push(selections[i].orgCode);
            }
            _self.$confirm('是否删除?', '提示')
                    .then(function () {
                    yufp.service.request({
                    method: 'DELETE',
                    url: backend.consoleService + '/api/s/accoount/org',
                    data: {
                      orgCode: arr.join(',')
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
