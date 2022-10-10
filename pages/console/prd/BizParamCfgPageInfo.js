/**
 * @create by fuzm on 2018-05-10
 * @description 业务参数配置表
 */
define([
   './custom/widgets/js/BizParamCfgPageInfoSelector.js',
    './libs/js-xlsx/xlsx.full.min.js'
  ],
  function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE,RPOVINCE_FLAG,STD_ZX_YES_NO,COMMON_STATUS,Date');
       var vm = yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          
           var checkValue = function(valueA,valueB){
             	if(valueA=='' || valueB==''){
             		return true;
             	}
                var  valueA = parseInt(valueA);
                var  valueB = parseInt(valueB);
                if( valueA >= valueB){
                  return  true;
                }else{
                  return false;
                }
              };
             
              var forbidIndusArr = function(value){
                  if(value == null || value == ''){
                  	value = [];
                  	return value;
                  }else{
                  	return value;
                  }
              };
          
          return {
          	dataUrl:backend.consoleService+'/api/biz/param/cfgs',
          	childDataUrl:backend.consoleService+'/api/s/dic/biz/bid',
            baseParams: {
            },
            queryFields: [
               { placeholder: '配置ID', field: 'cfgId', type: 'input' },
               { placeholder: '法人机构代码', field: 'legalOrgCode', type: 'input' },
               { placeholder: '配置状态', field: 'status',type:'select',dataCode:'COMMON_STATUS'},
               { placeholder: '生效日期', field: 'effictiveDate',type:'date'},
               { placeholder: '创建人', field: 'createUser', type: 'input' }
               /*{ placeholder: '创建时间', field: 'createTime',type:'date',dataCode:'Date'}*/
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
            { label: '配置ID', prop: 'cfgId', sortable: true, resizable: true },
            { label: '法人机构代码', prop: 'legalOrgCode', sortable: true, resizable: true },
            { label: '省级定义标志', prop: 'rpovinceFlag',type:'select',dataCode:'STD_ZX_YES_NO', sortable: true, resizable: true },
            { label: '禁入行业', prop: 'forbidIndus',width:'120px',sortable: true, resizable: true ,
            template: function () {
                                return '<template scope="scope">\
                                    <a href="javascript:void(0);" style="text-decoration:underline;" @click="_$event(\'custom-row-click\', scope)">{{ "查看禁入行业详情" }}</a>\
                                </template>';
                            }},
            { label: '征信查询有效期（天）', prop: 'crdExpiryDt', sortable: true, resizable: true },//scope.row.forbidId
            { label: '贷后征信查询期限（天）', prop: 'loanAfterTrem', sortable: true, resizable: true },
            { label: '是否签订额度协议', prop: 'signLmtCont',sortable: true, resizable: true ,type:'select',dataCode:'STD_ZX_YES_NO'},
            { label: '批复有效期（天）', prop: 'apprExpiryDt', sortable: true, resizable: true },
            { label: '检查报告生成周期（月）', prop: 'chkRptCrtPeriod', sortable: true, resizable: true },
            { label: '定期检查任务生成周期（月）', prop: 'regChkCrtPeriod', sortable: true, resizable: true },
            { label: '授信机构数量上限（家）', prop: 'crdOrgUpperLmt', sortable: true, resizable: true },
            { label: '授信总限额（万）', prop: 'crdLmtAmt', /*type:'num',
                                formatter : _self.toPercent,*/ sortable: true, resizable: true },
            { label: '单个法人机构授信限额（万）', prop: 'orgLmtAmt', sortable: true, resizable: true },
            { label: '支用有效期（天）', prop: 'tphChkExpiryDt', sortable: true, resizable: true },//暂时把电核有效期改为支用有效期
            { label: '电核限额（元）', prop: 'tphChkLmtAmt', sortable: true, resizable: true },
            { label: '配置状态', prop: 'status',type:'select',dataCode:'COMMON_STATUS', sortable: true, resizable: true },
            { label: '提额间隔天数/提额批复有效期（天）', prop: 'amtIntervalCount',sortable: true, resizable: true },
            { label: '提额系数', prop: 'amtCoefficient',sortable: true, resizable: true },
            { label: '提额额度最小值（元）', prop: 'amtLmtMin',sortable: true, resizable: true }

            ],
           bizPparams: { forbidIndus: '' }, 
            updateFields: [{
              columnCount: 2,
              fields: [
                	{ field: 'forbidIndusArr', label: '禁入行业',hidden:false,type: 'custom', params: _self,
                	  value: [], is: 'biz-param-cfg-selector'
                  },
                	 { field: 'crdExpiryDt', label: '征信查询有效期（天）',rules:[
                	   {required: true, message: '必填项', trigger: 'blur'},
                	   { validator: yufp.validator.number,type:'number',  message: '数字', trigger: 'blur'}
                	 ]},
                	 { field: 'loanAfterTrem', label: '贷后征信查询期限（天）',rules:[
                     {required: true, message: '必填项', trigger: 'blur'},
                     { validator: yufp.validator.number,type:'number',  message: '数字', trigger: 'blur'}
                   ]},
                	 { field: 'signLmtCont', label: '是否签订额度协议',hidden:true,type:'select',dataCode:'STD_ZX_YES_NO',rules:[
                     {required: true, message: '必填项', trigger: 'blur'}
                   ]},
                	 { field: 'apprExpiryDt', label: '批复有效期（天）',rules:[
                	   {required: true, message: '必填项', trigger: 'blur'},
                     { validator: yufp.validator.number, message: '数字', trigger: 'blur'}
                   ]},
                	   { field: 'chkRptCrtPeriod', label: '检查报告生成周期（月）',rules:[
                	    {required: true, message: '必填项', trigger: 'blur'}, 
                      { validator: yufp.validator.number, message: '数字', trigger: 'blur'}
                   ]},
                	 { field: 'regChkCrtPeriod', label: '定期检查任务生成周期（月）',rules:[
                	   {required: true, message: '必填项', trigger: 'blur'},
                     { validator: yufp.validator.number, message: '数字', trigger: 'blur'}
                   ]},
                	 { field: 'crdOrgUpperLmt', label: '授信机构数量上限（家）',rules:[
                	   {required: true, message: '必填项', trigger: 'blur'},
                     { validator: yufp.validator.number,type:'number',  message: '数字', trigger: 'blur'}
                   ]},
                	 { field: 'crdLmtAmt', label: '授信总限额（万）',rules:[
                	  {required: true, message: '必填项', trigger: 'blur'},
                    { validator: yufp.validator.gZero, type:'number', message: '数字', trigger: 'blur'}
                   ]},
                	 { field: 'orgLmtAmt', label: '单个法人机构授信限额（万）',rules:[
                	   {required: true, message: '必填项', trigger: 'blur'},
                     { validator: yufp.validator.gZero, message: '数字', trigger: 'blur'}
                   ]},
                	 { field: 'tphChkExpiryDt', label: '支用有效期（天）',rules:[
                	  {required: true, message: '必填项', trigger: 'blur'},
                    { validator: yufp.validator.number, message: '数字', trigger: 'blur'}
                   ]},
                   
                   { field: 'amtIntervalCount', label: '提额间隔天数/提额批复有效期（天）',rules:[
                     {required: true, message: '必填项', trigger: 'blur'},
                     {validator: yufp.validator.number, type:'number',message: '数字', trigger: 'blur'}
                     ]},
                     
                	 { field: 'tphChkLmtAmt', label: '电核限额（元）',rules:[
                	   {required: true, message: '必填项', trigger: 'blur'},
                    { validator: yufp.validator.gZero, message: '数字', trigger: 'blur'}
                   ]},
                   { field: 'amtCoefficient', label: '提额系数',rules:[
                    {required: true, message: '必填项', trigger: 'blur'},
                     {validator: yufp.validator.gZero,message: '数字', trigger: 'blur'}
                     ]},
                     { field: 'amtLmtMin', label: '提额额度最小值（元）',rules:[
                    {required: true, message: '必填项', trigger: 'blur'},
                    {validator: yufp.validator.gZero, message: '数字', trigger: 'blur'}
                      ]},
                 	 { field: 'status', label: '配置状态',type:'select',dataCode:'COMMON_STATUS'},
                 	 { field: 'effictiveDate', label: '生效日期'},
                 	 { field: 'expiryDate', label: '失效日期'},
                   { field: 'createUser', label: '创建人',hidden:true},
                   { field: 'createTime', label: '创建时间',type:'select',dataCode:'Date',hidden:true},
                   { field: 'lastUpdateUser', label: '最后修改人',hidden:true},
                   { field: 'lastUpdateTime', label: '最后修改日期',type:'select',dataCode:'Date',hidden:true}
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
                  
                  var code = checkValue(_self.$refs.reform.formModel.crdLmtAmt,_self.$refs.reform.formModel.orgLmtAmt);
                   if(!code){
                       _self.$message({ message: '单个法人机构授信限额要小于或者等于授信总限额！', type: 'warning' });
                       return ;
                   }
                  
                 _self.$refs.reform.formModel.forbidIndusArr = forbidIndusArr(_self.$refs.reform.formModel.forbidIndusArr);
      
                  var rMethod = '';
									if(_self.viewType == "EDIT") {
										rMethod = 'PUT';
									} else if(_self.viewType == "ADD") {
										rMethod = 'POST';
									}
									//保留两位小数
                 _self.$refs.reform.formModel.crdLmtAmt = _self.toPercent(model.crdLmtAmt),
                 _self.$refs.reform.formModel.orgLmtAmt =_self.toPercent(model.orgLmtAmt),
                 _self.$refs.reform.formModel.tphChkLmtAmt =_self.toPercent(model.tphChkLmtAmt),
                 _self.$refs.reform.formModel.amtLmtMin =_self.toPercent(model.amtLmtMin),
                 
                  yufp.service.request({
                    method: rMethod,
                    url:backend.consoleService+ '/api/biz/param/cfg',
                    data: model,
                    callback: function (code, message, response) {
                      if (code == 0) {
                          if(response && response.data==-2){
                          	_self.$refs.reftable.remoteData();
                            _self.$message({message:response.message,type:'warning'})
                        }else if(response && response.data==-3){
                        	
                        	 _self.$refs.reftable.remoteData();
                        	 _self.$message({message:response.message,type:'warning'})
                        	
                        }else if(response && response.data==-4){
                           
                           _self.$refs.reftable.remoteData();
                           _self.$message({message:response.message,type:'warning'})
                          
                        }else if(response && response.data==-5){
                          
                           _self.$refs.reftable.remoteData();
                           _self.$message({message:response.message,type:'warning'})
                          
                        }else if(response && response.data==-6){
                           
                           _self.$refs.reftable.remoteData();
                           _self.$message({message:response.message,type:'warning'})
                          
                        }else if(response && response.data==-7){
                           
                           _self.$refs.reftable.remoteData();
                           _self.$message({message:response.message,type:'warning'})
                          
                        }else if(response && response.data==-8){
                          
                           _self.$refs.reftable.remoteData();
                           _self.$message({message:response.message,type:'warning'})
                          
                        }else if(response && response.data==-9){
                          
                           _self.$refs.reftable.remoteData();
                           _self.$message({message:response.message,type:'warning'})
                          
                        }else if(response && response.data==-10){
                           
                           _self.$refs.reftable.remoteData();
                           _self.$message({message:response.message,type:'warning'})
                          
                        }else if(response && response.data==-11){
                           
                           _self.$refs.reftable.remoteData();
                           _self.$message({message:response.message,type:'warning'})
                          
                        }else if(response && response.data==-12){
                           
                           _self.$refs.reftable.remoteData();
                           _self.$message({message:response.message,type:'warning'})
                          
                        }else if(response && response.data==-13){
                        	 
                        	 _self.$refs.reftable.remoteData();
                        	 _self.$message({message:response.message,type:'warning'})
                        }else if(response && response.data==-14){
                       	 
                       	 _self.$refs.reftable.remoteData();
                       	 _self.$message({message:response.message,type:'warning'})
                       }else if(response && response.data==-15){
                      	 
                      	 _self.$refs.reftable.remoteData();
                      	 _self.$message({message:response.message,type:'warning'})
                      }else if(response && response.data == -16){
                     	 
                     	 _self.$refs.reftable.remoteData();
                     	 _self.$message({message:response.message,type:'warning'})
                     }
                       else if(response && response.data==-1){
                        	 _self.$refs.reftable.remoteData();
                           _self.$message({message:response.message,type:'warning'})
                        }
                        else{
                          _self.$message('操作成功');
                          _self.dialogVisible = false;
                          _self.$refs.reftable.remoteData();
                        }
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
            childDialogVisible:false,
            formDisabled: false,
            viewType: 'DETAIL',
            viewTitle: yufp.lookup.find('CRUD_TYPE', false),
             
            forbidValueQueryFields: [
               { placeholder: '禁入行业名称', field: 'cnname', type: 'input' },
               { placeholder: '禁入行业编码', field: 'enname',type:'input'}
            ],
            forbidValueQueryButtons: [
              { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
                  if (valid) {
                    _self.$refs.forbidValueRetable.remoteData(model);
                  }
                } },
              { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
            ],
             forbidValue:{
                tableColumns: [
    //            { label: '禁入行业ID', prop: 'valueId', sortable: true, resizable: true },
                { label: '禁入行业编码', prop: 'enname', width:'250px',sortable: true, resizable: true },
                { label: '禁入行业名称', prop: 'cnname',sortable: true, resizable: true }
                ]
            },
            forbidArr: []
          }
        },
        methods: {
        	customRowClick: function (scope) {
        		       var _self = this;
                     this.childDialogVisible=true;
                     this.$nextTick(function (){
                        _self.$refs.forbidValueRetable.remoteData({
                            valueId: scope.row.forbidIndus
                          });
                     });
                },

        	/**
        	* @param ctrlCode 操作码
        	*/
        	checkPermission: function(ctrlCode) {
        		return !yufp.session.checkCtrl(ctrlCode, cite.menuId);
//        		return true;
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
          
          switchParamStatus:function(){
          	var _self = this;
          	var val = this.viewType != 'DETAIL';
          	_self.$refs.reform.switch('createUser','hidden',val);
          	_self.$refs.reform.switch('createTime','hidden',val);
          	_self.$refs.reform.switch('lastUpdateUser','hidden',val);
          	_self.$refs.reform.switch('lastUpdateTime','hidden',val);
          	_self.$refs.reform.switch('status','hidden',val);
          	_self.$refs.reform.switch('effictiveDate','hidden',val);
          	_self.$refs.reform.switch('expiryDate','hidden',val);
          },
          addFn: function () {
            var _self = this;
            this.bizPparams.forbidIndus = '';
            _self.switchStatus('ADD', true);
            _self.$nextTick(function () {
            	  vm.switchParamStatus();
                _self.$refs.reform.switch("forbidIndusArr", "hidden", false);
                _self.$refs.reform.switch("signLmtCont", "hidden", true);
                _self.$refs.reform.resetFn();
                _self.$refs.reform.formModel.tphChkExpiryDt = '1095';
               });
          },
          
          modifyFn: function () {
            var _self = this;
            if (this.$refs.reftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            var obj = this.$refs.reftable.selections[0];
            var  legalOrg= yufp.session.legalOrg.orgCode;
            if(obj.legalOrgCode != legalOrg ){
            	this.$message({ message: '不是本法人机构配置，不能修改！', type: 'warning' });
            	return;
            }
            
             if(obj.status == '2' ){
              this.$message({ message: '已失效配置，不能修改！', type: 'warning' });
              return;
            }
             _self.switchStatus('EDIT', true);
              var obj = this.$refs.reftable.selections[0];
            _self.$nextTick(function () {
            	 vm.switchParamStatus();
                _self.$refs.reform.switch("forbidIndusArr", "hidden", false);
                _self.$refs.reform.switch("signLmtCont", "hidden", true);
                _self.$refs.reform.resetFn();
                yufp.extend(this.$refs.reform.formModel, obj);
                this.bizPparams.forbidIndus = obj.forbidIndus ; 
               });
          },
          infoFn: function () {
            if (this.$refs.reftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
             var obj = this.$refs.reftable.selections[0];
             var  legalOrg= yufp.session.legalOrg.orgCode;
            /* if(obj.legalOrgCode != legalOrg ){
              this.$message({ message: '不是本法人机构配置，不能查看详情！', type: 'warning' });
              return;
            }*/
            this.switchStatus('DETAIL', false);
            this.$nextTick(function () {
            	vm.switchParamStatus();
            	this.$refs.reform.switch("forbidIndusArr", "hidden", true);
            	 this.$refs.reform.switch("signLmtCont", "hidden", false);
            	 this.$refs.reform.resetFn();
              yufp.extend(this.$refs.reform.formModel, obj);
            });
          },
          
          //设置失效状态
          disableFn: function () {
            var _self = this;
            var selections = _self.$refs.reftable.selections;
            if (selections.length < 1) {
              _self.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
             var obj = this.$refs.reftable.selections[0];
             var  legalOrg= yufp.session.legalOrg.orgCode;
             if(obj.legalOrgCode != legalOrg ){
              this.$message({ message: '不是本法人机构配置，不能失效！', type: 'warning' });
              return;
            }
            var len = selections.length, arr = [];
            for (var i = 0; i < len; i++) {
              arr.push(selections[i].cfgId);
            }
            
            if(obj.status == '0' || obj.status=='2'){
            	this.$message({message:'只有生效才能设置失效！',type:'warning'});
            	return;
            }
            this.$confirm('是否失效配置？', '提示',{type:'warning'})
             .then(function () {
             var cfgId = _self.$refs.reftable.selections[0].cfgId;
             obj.status = '2';
             yufp.service.request({
                method: 'PUT',
                url: backend.consoleService+'/api/biz/param/cfg/status',
                data:obj,
                callback: function (code, message, response) {
                  if (code == 0) {
                  	if(response && response.data==-2){
                  		 _self.$message({message:response.message,type:'warning'});
                  	}else{
                    _self.$refs.reftable.remoteData(response.data);
                    _self.$message('操作成功');
                  	}
                  } else {
                  	_self.$message('操作失败');
                  }
                }
             });
             });
          },
          //保留两位小数
            toPercent : function (cellValue) {
                if (cellValue != null && cellValue != '')
                    cellValue = parseFloat((cellValue + '')).toFixed(2);
                else
                    cellValue = '';
                return cellValue;
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
