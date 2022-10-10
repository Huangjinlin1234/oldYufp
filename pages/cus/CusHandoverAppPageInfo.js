﻿/**
 * @create by chenqm1 on 2018-05-14
 * @description 客户移交申请
 */
define([
    './custom/widgets/js/OrgSelector.js',
     './custom/widgets/js/UserSelecter.js',
     './custom/widgets/js/DicSelecter.js',
     './custom/widgets/js/AddrDicSelecter.js',
     './custom/widgets/js/PageableTable.js'
    ],function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE,STD_ZB_HAND_SCOPE,STD_ZB_HAND_TYPE,STD_ZB_ORG_TYPE,STD_ZB_HAND_STATUS,STD_ZB_OP_TYPE,STD_ZB_HAND_SCOPE23,STD_ZB_HAND_SCOPE20');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
            appDataUrl : backend.cusService+'/api/cus/handover/apps',
            detailDataUrl : backend.cusService+'/api/cus/handover/lsts',
            cusDataUrl :backend.cusService+"/api/cus/indivs/cusManager",
            appCustDataUrl:backend.cusService+"/api/cus/indivs/handover",
            appHistDataUrl: backend.cusService+"/api/cus/handover/lsts/hist",
            applyDetailDataUrl: backend.cusService + '/api/cus/handover/lst/serno',
            baseParams: {},
            cusBaseParams: {},
            histBaseParams:{},
            cusDetailParams: {},
            handoverModeArr: [], //移交方式数组
            loginOrg: null, //当前登录人所在机构信息
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
                    var obj = {};
                    yufp.extend(obj, model);
                    yufp.extend(obj, _self.cusDetailParams);
                    _self.$refs.cusReftable.remoteData(obj);
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
             { label: '客户号', prop: 'cusId', sortable: true, resizable: true},
             { label: '客户姓名', prop: 'cusName', sortable: true, resizable: true}
            ],
            histQueryFields:[
            	 { placeholder: '原移交申请流水号', field: 'serno',type: 'input' }, 
           	     { placeholder: '原移出人代码ID', field: 'handoverId', type: 'input' },
           	     { placeholder: '登记日期', field: 'handoverDate', type: 'date' }
           ],
            histQueryButtons: [
                { label: '查询', op: 'submit', type: 'primary', icon: 'search', click: function (model, valid) {
              	  var reqdata = {};
            		  reqdata.handoverId = _self.$refs.histReform.formModel.handoverId;
                      reqdata.serno =  _self.$refs.histReform.formModel.serno;
                      reqdata.handoverDate = _self.$refs.histReform.formModel.handoverDate;
                      _self.$refs.histReftable.remoteData(reqdata);
                	 /* yufp.service.request({
                          method: 'POST',
                          url: backend.cusService+"/api/cus/handover/lsts/hist",
                          data: reqdata,
                          callback: function (code, message, response) {
                        	  _self.$refs.histReftable.data = response.data;
                          }
                     });*/
                  } },
                { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
              ],
              histQableColumns:[
            	  { label: '原移交申请流水号', prop: 'serno', sortable: true, resizable: true }, 
            	  { label: '原移出人代码ID', prop: 'handoverId', sortable: true, resizable: true },
            	  { label: '客户号', prop: 'cusId', sortable: true, resizable: true },
            	  { label: '客户名称', prop: 'cusName', sortable: true, resizable: true },
            	  { label: '登记日期', prop: 'handoverDate', sortable: true, resizable: true }
              ],
            histUpdateButtons: [
		                { label: '保存', type: 'primary', icon: 'check', hidden: false, click: function (model) {
		        if (_self.$refs.histReftable.selections.length < 1) {
		           _self.$message({ message: '请先选择一条记录', type: 'warning' });
		        return;
		          }
		          var mydata = _self.$refs.histReftable.selections;
		          _self.cusDetail(mydata);
                      _self.histDialogVisible = false;
		     } },
		   { label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
		      _self.$refs.histReftable.remoteData();
		      _self.$refs.histReform.resetFn();
		      _self.histDialogVisible= false;
		     } }
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
            histUpdateFields:[{
            	 columnCount: 3,
                 fields: [
            	 { field: 'serno', label: '原申请流水号'},
            	 { field: 'handoverId', label: '原移出人代码ID'},
                 { field: 'handoverDate', label: '登记日期',type:"date"}
            	 ]
            }],
            detailTotalData: [],
             appUpdateFields: [{
              columnCount: 3,
              fields: [
                  { field: 'serno', label: '申请流水号',hidden: true},
                  { field: 'orgType', label: '接收机构与移出机构关系', type: 'select',dataCode:'STD_ZB_ORG_TYPE',
                     change: function (fields) {
                      var handoverScopeFlag = false;
                      var handoverModeFlag = false;
                      var handoverScopeVal = null;
                      var handoverModeVal = null;
                      
                      var reform = _self.$refs.reform;
                      
                      if (fields == '10') {//机构内移交
                        reform.formModel.receiverId = null; //接收人代码
                        reform.formModel.receiverBrId = yufp.session.org.orgCode;//接收机构为登录人所在机构
                        //机构内移交 : 监交机构为移出机构
                        reform.formModel.superviseBrId = yufp.session.org.orgCode;

                        reform.switch('receiverBrId', 'disabled', true);
                        reform.switch('receiverId', 'disabled', false);
                      } else if (fields == '23') {//同一客户经理跨机构移交
                        //“同一客户经理跨机构转移”，登记机构为3级机构时，监交机构应该为所在机构的上级机构，但实际为当前机构
                        if ( _self.loginOrg.orgLevel > 2 ) {
                          reform.formModel.superviseBrId = _self.loginOrg.orgParentCode; //监交机构
                        }else {
                          reform.formModel.superviseBrId = yufp.session.org.orgCode; //监交机构
                        }
                        reform.formModel.receiverId = yufp.session.userId;//接收人为移交人
                        reform.formModel.receiverBrId = null; //接收机构代码
                        handoverScopeVal = '2'; //移交范围
                        handoverModeVal = '3'; //移交方式
                        handoverScopeFlag = true;
                        handoverModeFlag = true;

                        reform.switch('receiverId', 'rawValue', yufp.session.userId);
                        reform.switch('receiverId', 'disabled', true);
                        reform.switch('receiverBrId', 'disabled', false);
                        
                      }else if(fields=='21'){//同一联社间跨机构移交
                        //“同一联社内跨机构移交”，登记机构为3级机构时，监交机构应该为所在机构的上级机构，但实际为当前机构
                        if ( _self.loginOrg.orgLevel > 2 ) {
                          reform.formModel.superviseBrId = _self.loginOrg.orgParentCode; //监交机构
                        }else {
                          reform.formModel.superviseBrId = yufp.session.org.orgCode; //监交机构
                        }
                        reform.formModel.receiverId = null; //接收人代码
                        reform.formModel.receiverBrId = null; //接收机构代码 
                        
                        reform.switch('receiverId', 'disabled', false);
                        reform.switch('receiverBrId', 'disabled', false);

                      }else if(fields=='22'){//不同联社间跨机构移交
                        //“不同联社间跨机构移交”时，监交机构赋值应该为当前登陆人的法人机构
                        if ( _self.loginOrg.orgLevel > 2 ) {
                          reform.formModel.superviseBrId = _self.loginOrg.legalOrgCode; //监交机构
                        }else {
                          reform.formModel.superviseBrId = yufp.session.org.orgCode; //监交机构
                        }
                        // “不同联社间跨机构移交”时，移交方式只能选择“仅按客户资料移交”
                        handoverModeFlag = true;
                        handoverModeVal = '1';
                        reform.formModel.receiverId = null; //接收人代码
                        reform.formModel.receiverBrId = null; //接收机构代码
                        
                        reform.switch('receiverId', 'disabled', false);
                        reform.switch('receiverBrId', 'disabled', false);
                      }
                      reform.formModel.superviseId = null; //监交人
                      reform.formModel.handoverScope = handoverScopeVal; //移交范围
                      reform.formModel.handoverMode = handoverModeVal; //移交方式
                      reform.switch('handoverScope', 'disabled', handoverScopeFlag); //移交范围
                      reform.switch('handoverMode', 'disabled', handoverModeFlag); //移交方式
                      reform.switch('superviseId', 'disabled', false); // 监交人代码
                      //reform.switch('superviseBrId', 'rawValue', reform.superviseBrId); // 监交人机构代码
                      reform.rebuildFn();
                    },
                   rules: [
                              { required: true, message: '请选择一项作为接收机构与移出机构关系!', trigger: 'blur'}
                          ]},
                          
                   { field: 'handoverScope', label: '移交范围', type: 'select',dataCode:'STD_ZB_HAND_SCOPE',
                        	  change: function (fields) {
//                        	  2、接收机构与移出机构关系不是“同一客户经理跨机构转移”时：
//A、移交范围选择“按客户经理”时，移交方式可以选择“仅客户资料移交”、“客户资料与业务移交”或“一切资料与业务移交”。
//B、移交范围选择“按客户”或“按地区”时，只能选择“仅客户资料移交”或“客户资料与业务移交”，不能选择“一切资料与业务移交”，否则提示“非按客户经理移交不能选择一切资料与业务移交”。
                              var handoverModeArr = [];
                              for (var k = 0; k < _self.handoverModeArr.length; k++) {
                                handoverModeArr.push(_self.handoverModeArr[k]);
                              }
                              
                              var orgType = _self.$refs.reform.formModel.orgType;
                              var removeArr = [];//应去掉的值
                              if ( orgType != '23' &&  fields == '2' ) {
                                removeArr = ['4'];
                              }else if ( orgType != '23' &&  (fields == '1' || fields == '3' ) ) {
                                removeArr = ['3', '4']; 
                              }else if (fields == '4') { //按移交历史时，移交方式不能选择“一切资料与业务移交”
                                removeArr = ['3'];
                              }

                              if ( handoverModeArr != null && handoverModeArr.length > 0 ) {
                                for (var i = 0; i < removeArr.length; i++ ) {
                                  
                                  for (var j = 0; j < handoverModeArr.length; j++) {
                                    if (removeArr[i] == handoverModeArr[j].key ) {
                                      handoverModeArr.splice(j ,1);
                                    }
                                  }
                                }
                              }
                              _self.$refs.reform.switch('handoverMode', 'options', handoverModeArr);
                              if(fields!='2'){//不是按客户经理移交
                        			  _self.$refs.reform.formModel.handoverMode='';
                        		  }
                        		  if(_self.$refs.reform.formModel.orgType=='23'&&fields=='2'){//按客户经理移交
                        			  _self.$refs.reform.formModel.handoverMode='3';//一切资料与业务移交
                                _self.$refs.reform.groupField[0].fields[3].calcDisabled=true;
                                	 
                              } else if(_self.$refs.reform.formModel.orgType=='22'&&fields!=''){//不同联社跨机构仅移交客户资料
                        			  _self.$refs.reform.formModel.handoverMode='1';
                        			  _self.$refs.reform.groupField[0].fields[3].calcDisabled=true;
                        		  }else{
                                _self.$refs.reform.groupField[0].fields[3].calcDisabled=false;
                              }
                              var rules = [];

                              if ( fields == '3' ) 
                                rules = [ { required: true, message: '请选择区域编码!', trigger: 'blur'} ];
                              _self.$refs.reform.switch('areaCode', 'rules', rules);
                              _self.$refs.reform.rebuildFn();
                        	  },
                            rules: [ { required: true, message: '请选择一项作为移交范围!', trigger: 'blur'} ]},
                          
                   { field: 'handoverMode', label: '移交方式',type: 'select', 
                     options: _self.handoverModeArr,
                     change: function (fields) {
                      var handoverScope = _self.$refs.reform.formModel.handoverScope;
                      
                      if(handoverScope != '2'){//不是按客户经理移交
                        if(fields=='3' && handoverScope != ''){//一切资料与业务移交
                          _self.$refs.reform.formModel.handoverScope='';
                            _self.$message({ message: '非按客户经理移交不能选择一切资料与业务移交!', type: 'warning' });
                        }
                      }
                      
                    },
                   rules: [
                              { required: true, message: '请选择一项作为移交方式!', trigger: 'blur'}
                          ]},
                          
                          { field: 'handoverId', label: '移出人代码',disabled:true,type:'custom',is:'div-user-selector',
                   rules: [
                              { required: true, message: '请选择移出人代码', trigger: 'blur'}
                          ]},
                          { field: 'superviseId', label: '监交人代码',type:'custom',is:'div-user-selector', rowValue: '', disabled: true,
                        	  params: {
                        	  	valid: function() {
                        	  		var value = _self.$refs.reform.formModel.superviseId;
                        	  		if(value == _self.$refs.reform.formModel.handoverId ){
                        	  		  _self.$refs.reform.formModel.superviseId = '';
      	                   			  _self.$message({ message: '移出人代码和监交人不能是同一人!', type: 'warning' });
      	                   			  
      	                          return false;
      	                   		  }
                        	  		return true;
                        	  	},
                        	  	dataUrl: backend.consoleService + '/api/s/users/condition',
                        	  	show: 'userCode',
                              baseParams: function() {
                                var obj = {};
                                var orgCode = _self.$refs.reform.formModel.superviseBrId;
                                if ( typeof(orgCode) === 'undefined' || orgCode == null || orgCode == ''){
                                  _self.$message({ message: '请先选择监交机构!', type: 'warning'});
                                  return false;
                                }
                                obj.orgCode = orgCode;
                                //监交人应该 拥有 客户移交审批 下菜单访问和审批按钮的资源权限
                                obj.rescRoleMap = {
                                  'lp-52002': ['visit', 'approve']
                                };
                                return obj;
                              }
                          },
                   rules: [
                              { required: true, message: '请选择监交人!', trigger: 'blur'}
                          ]},
                          { field: 'receiverId', label: '接收人代码',type:'custom',is:'div-user-selector',rawValue: null,
                        	  params: {
                        	  	  condition: true,
                          	  	valid: function() {
                          	  		var value = _self.$refs.reform.formModel.receiverId;
                          	  		if(value == _self.$refs.reform.formModel.handoverId ){
                          	  		  _self.$refs.reform.formModel.receiverId = '';
        	                   		    _self.$message({ message: '接收人和移出人不能是同一人!', type: 'warning' });
        	                          return false;
        	                   		  }
	                          	  	if(value == _self.$refs.reform.formModel.superviseId ){
	                        	  		  _self.$refs.reform.formModel.receiverId = '';
	      	                   			  _self.$message({ message: '接收人和监交人不能是同一人!', type: 'warning' });
	      	                          return false;
	      	                   		  }
                          	  		return true;
                          	  	},
                          	  	dataUrl: backend.consoleService + '/api/s/users/condition',
                          	  	show: 'userCode',
                                baseParams: function() {
                                  var obj = {};
                                  var orgCode = _self.$refs.reform.formModel.receiverBrId;
                                  if ( typeof(orgCode) === 'undefined' || orgCode == null || orgCode == ''){
                                    _self.$message({ message: '请先选中接收机构!', type: 'warning'});
                                    return false;
                                  }
                                  obj.orgCode = orgCode;
                                  //接收人应该 拥有 客户移交接收 下菜单访问和接收按钮的资源权限
                                  obj.rescRoleMap = {
                                    'lp-52003': ['visit', 'receive']
                                  };
                                  return obj;
                                }
                             },
                        	 
                   rules: [
                              { required: true, message: '请选择接收人!', trigger: 'blur'}
                          ]},
                          { field: 'handoverBrId', label: '移出机构代码',disabled:true,type:'custom',is:'div-org-selector',
                        	  
                   rules: [
                              { required: true, message: '请选择移出机构!', trigger: 'blur'}
                          ]},
                            { field: 'superviseBrId', label: '监交机构代码',type:'custom',is:'div-org-selector', disabled: true,
                   rules: [
                              { required: true, message: '请选择监交机构!', trigger: 'blur'}
                          ]},
                          { field: 'receiverBrId', label: '接收机构代码',type:'custom',is:'div-org-selector',rowValue: '',
                        	  params: {
                        	  	valid: function() {
                        	  		var value = _self.$refs.reform.formModel.receiverBrId;
                        	  		if(value == _self.$refs.reform.formModel.handoverBrId ){
                        	  		  _self.$refs.reform.formModel.superviseId = '';
      	                   			  _self.$message({ message: '不是机构内移交\n[移出机构代码]和[接收机构代码]不能 是同一个！', type: 'warning' });
      	                   			  
      	                          return false;
      	                   		  }
                        	  		return true;
                        	  	},
                        	  	dataUrl: backend.consoleService + '/api/s/orgs/condition',
                              baseParams: function() {
                                var param = {};
                                var orgType = _self.$refs.reform.formModel.orgType;
                                if ( typeof(orgType) === 'undefined' || orgType == null || orgType == ''){
                                  _self.$message({ message: '请先选择接收机构与移出机构关系!', type: 'warning'});
                                  return false;
                                }
                                if ( orgType == '21' || orgType == '23' ) //同一联社内跨机构移交 || 同一客户经理跨机构转移
                                  param.legalOrgCode = yufp.session.legalOrg.orgCode;
                                else if (orgType == '22' ) //不同联社间跨机构移交
                                  param.notLegalOrgCode = yufp.session.legalOrg.orgCode;
                                return param;
                              }
                          },
                   rules: [
                              { required: true, message: '请选择接收机构!', trigger: 'blur'}
                          ]},
                          
                   { field: 'areaName', label: '区域名称', disabled: true, hidden: true },
                   { field: 'areaCodeCopy', label: '区域编码', disabled: true },
                   { field: 'areaCode', label: '区域名称', type:"custom", rawValue: null, placeholder: '区域名称',
                     is:'yufp-addr-selector', selectFn: function(value, model, argment) {
                       model.areaCodeCopy = value;
                       model.areaName = argment[1].allName;
                     }, rules: [ { required: false, message: '请选择区域名称!', trigger: 'blur'} ] },
                   { field: 'handoverDetail', label: '移交说明',type:"textarea",autosize:{ minRows: 2, maxRows: 4},
                     rules: [ { max: 250, message: '最大长度为250' } ]},
                   { field: 'inputDate', label: '登记日期', hidden: true}
              ]
            }],
            appDetailUpdateFields: [{
              columnCount: 3,
              fields: [
                   { field: 'serno', label: '申请流水号',disabled:true},
                   { field: 'orgType', label: '接收机构与移出机构关系', type: 'select',dataCode:'STD_ZB_ORG_TYPE',
                     rules: [ { required: true, message: '请选择一项作为接收机构与移出机构关系!', trigger: 'blur'} ]},
                   { field: 'handoverScope', label: '移交范围', type: 'select',dataCode:'STD_ZB_HAND_SCOPE',
                     rules: [ { required: true, message: '请选择一项作为移交范围!', trigger: 'blur'} ]},
                   { field: 'handoverMode', label: '移交方式', type: 'select',dataCode:'STD_ZB_HAND_TYPE',
                     rules: [ { required: true, message: '请选择一项作为移交方式!', trigger: 'blur'} ]},
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
            
            updateButtons: [
              { label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function (model) {
              	   _self.$refs.reform.resetFn();
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
                  
                  var rMethod = '';
                  if(_self.viewType == "EDIT") {
                    rMethod = 'PUT';
                  } else if(_self.viewType == "ADD") {
                    rMethod = 'POST';
                  }
                  
                  yufp.service.request({
                    method: rMethod,
                    url: backend.cusService+'/api/cus/handover/app',
                    data: model,
                    callback: function (code, message, response) {
                      if (code == 0) {
                        _self.$refs.reftable.remoteData();
                        
                        _self.dialogVisible = false;
                      } else {
                        _self.$message('操作失败');
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
            histDialogVisible: false,
            viewType: 'DETAIL',
            viewTitle: yufp.lookup.find('CRUD_TYPE', false),
            saveApplyLoading: false
          };
        },
        methods: {
        	cusDetail: function(mydata){
            var _self = this;
            var formModel =  _self.$refs.reform.formModel;
            var handoverModeCN;
            if(formModel.handoverMode=='1'){
              handoverModeCN = '客户资料';
            }else if(formModel.handoverMode=='2'){
              handoverModeCN = '客户资料与业务';
            }else if(formModel.handoverMode=='3'){
              handoverModeCN =  '客户资料与业务';
            }else if(formModel.handoverMode=='4'){
              handoverModeCN = '共享业务';
            }
            var allCuss = [];
            var olds = this.detailTotalData || [];
            var exists;
            for (var  i = 0; i < mydata.length; i++) {
              exists = false;
              //如果客户ID 已存在移交明细中， 则不再相加
              for (var j = 0; j < olds.length; j++ ) {
                if (mydata[i].cusId == olds[j].cusId ){
                  exists = true;
                  break;
                }
              }
              if (exists === true)
                continue;
              
              var cus = {};
              cus.serno = formModel.serno;
              cus.cusId = mydata[i].cusId;
              cus.cusName = mydata[i].cusName;
              cus.handoverType = formModel.handoverMode;
              
              cus.businessDetail = '客户：'+mydata[i].cusName+'的'+ handoverModeCN +
                  '由' + formModel.handoverBrId+ "的" +formModel. handoverId  + "移交给" + formModel.receiverBrId + "的" +formModel. receiverId;
              allCuss.push(cus);
            }
            return allCuss;
          },
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

          deleteAppFn: function () {
            var _self = this;
            var selections =_self.$refs.appReftable.selections;

            if (selections.length < 1) {
              _self.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            this.$confirm('是否删除移交明细?', '提示').then(function() {
              var mydata = _self.detailTotalData;

              for (var i = 0; i < selections.length; i++) {
                for (var j = 0; j < mydata.length; j++) {
                  if ( selections[i] == mydata[j] ){
                    mydata.splice(j, 1);
                    break;
                  } 
                }
              }
              _self.detailTotalData = mydata;
            });
            
          },

          infoFn: function () {
            if (this.$refs.reftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            this.logSwitchStatus('DETAIL', false);
            this.$nextTick(function () {
              var _self =  this;
              var apply = _self.$refs.reftable.selections[0];
              yufp.extend(_self.$refs.appDetailReform.formModel, apply);
              var obj = {
                serno: apply.serno
              };
              this.$refs.appReftableinfo.remoteData(obj);
            });
          },
          
          addDedailFn: function () {
            var _self = this;
            var validate = false;
            var handoverScope = _self.$refs.reform.formModel.handoverScope;
            
            _self.$refs.reform.validate(function (valid) {
              validate = valid;
            });
             
            if (!validate) {
              this.$message({ message: '请填写必选内容', type: 'warning' });
              return;
            }

            if( handoverScope=='1' ){//按客户
              this.lstSwitchStatus('ADD', true);
              this.$nextTick(function () {
                var obj = {
                  cusManager: yufp.session.userId
                };

                var addCusInfos = this.detailTotalData || [];
                var nonCusIds = [];
                for (var i = 0; i < addCusInfos.length; i++ ) {
                  nonCusIds.push(addCusInfos[i].cusId);
                }
                obj.nonCusIds = nonCusIds;
                this.cusDetailParams = obj;
                this.$refs.cusReftable.remoteData(this.cusDetailParams);
              });  
            }else {//按客户经理
	            // if(length>0){
	            //   this.$message({ message: '有[移交范围]为按客户经理的移交未结束，请撤销或者完成后再进行申请', type: 'warning' });   
			        //   return;
              // }
              var arr = this.detailTotalData || [];
              if( arr.length > 0 ){
                this.$message({message: '已添加移交客户，为避免添加移交范围外的移交客户，请删除移交明细，重新添加客户', type: 'warning'});
                return ;
              }
              var obj = {
                cusManager: yufp.session.userId
              };
              var handoverDetail;
              var url;
              if ( handoverScope == '2' ){ //按客户经理
                url = backend.cusService + '/api/cus/indivs/cus/manager';
                handoverDetail = '按客户经理';
              }else if ( handoverScope == '3' ){ //按地区
                url = backend.cusService + '/api/cus/indivs/handover/areacode';
                obj.areaCode = this.$refs.reform.formModel.areaCode;
                handoverDetail = '按地区';
              }else if ( handoverScope == '4' ) { //按移交历史
                url = backend.cusService + '/api/cus/indivs/handover/history';
                handoverDetail = '按移交历史';
              }

              this.$confirm('是否确认移交?', '提示').then(function () {

                yufp.service.request({
                  method: 'POST',
                  url: url,
                  data: obj,
                  callback: function (code, message, response) {
                    if ( response && response.success === true ) {
                      var mydata = response.data;
                      var cusDetailData = _self.cusDetail(mydata);
                      _self.detailTotalData = cusDetailData;
                      _self.$message({message: "已添加" + mydata.length + "个客户进申请列表!", type: 'success'});
                    } else {
                      _self.$message({message: response.message, type: 'warning'});
                    }
                  }
                });

              });
                 	
            }
             //	_self.$refs.reform.disabled = true;//添加客户移交明细后，表单不可编辑
          },

          addFn: function () {
            var _self = this;
            _self.switchStatus('ADD', true);
            _self.$nextTick(function () {
              _self.$refs.reform.resetFn();
              
              _self.$refs.reform.formModel.handoverId = yufp.session.userId; //移出人代码
              _self.$refs.reform.formModel.handoverBrId = yufp.session.org.orgCode; //移出机构代码
              _self.$refs.reform.formModel.superviseBrId = yufp.session.org.orgCode; //监交机构代码
              _self.$refs.reform.switch('handoverMode', 'options', _self.handoverModeArr);

              this.detailTotalData = [];
              this.saveApplyLoading = false;
            });
          },

          commitFn: function () {
            if (this.$refs.reftable.selections.length != 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }

            this.$nextTick(function () {
               var serno =  this.$refs.reftable.selections[0];
               var _self = this;
               var loginUserId =  this.$refs.reftable.selections[0].loginUserId;
               var handoverId =  this.$refs.reftable.selections[0].handoverId;
               if(loginUserId!=handoverId){
               	 this.$message({ message: '非申请移交的客户不能提交该交易', type: 'warning' });
                   return;
               }
               if( serno.status != '00' && serno.status != '22' ){
                 this.$message({ message: '只有[待发起]或[复核退回]状态的申请才能提交', type: 'warning' });
                 return;
               }
               this.$confirm('是否提交客户移交申请？', '提示').then(function (){

                 yufp.service.request({
                  method: "PUT",
                  url: backend.cusService+'/api/cus/handover/app/start',
                  data: serno,
                  callback: function (code, message, response) {
                    if (response && response.success === true) {
                      _self.$refs.reftable.remoteData();
                      _self.$message({message: '提交客户申请成功!', type: 'success'});
                      _self.dialogVisible = false;
                    } else {
                      _self.$message({message: response.message, type: 'success'});
                    }
                  }
                });

               });
            });
          },
         
          deleteFn: function () {
            var _self = this;
            var selections = _self.$refs.reftable.selections;
            
            if (selections.length != 1) {
              _self.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            var mydata =  this.$refs.reftable.selections[0];
            _self.$confirm('是否删除?', '提示')
              .then(function () {
                var len = selections.length, arr = [];
                for (var i = 0; i < len; i++) {
                  arr.push(selections[i].serno);
                }
                var loginUserId = yufp.session.user.userId;
                var handoverId = _self.$refs.reftable.selections[0].handoverId;
                //&& loginUserId != handoverId 
                if( mydata.status != '00' && mydata.status != '22'  ){
                  _self.$message({ message: '只有[登记]或[复核退回]状态的客户移交申请记录才可以删除记录!', type: 'warning' });
                  return;
                }
                if ( loginUserId != handoverId ) {
                  _self.$message({ message: '只有发起申请的本人才能删除!', type: 'warning' });
                  return;
                }
                yufp.service.request({
                  method: 'DELETE',
                  url:  backend.cusService + '/api/cus/handover/app',
                  data: {
                    serno: arr.join(',')
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

          addCusOrAreaCus: function() {
            var mydata = this.$refs.cusReftable.selections;
            
            if (mydata.length < 1) {
              this.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            var cusDetails = this.cusDetail(mydata);
            var detailTotalData = this.detailTotalData || [];
            this.detailTotalData = cusDetails.concat(detailTotalData);
            this.cusDialogVisible = false;
          },

          saveCusHandoverApply: function() {
            var _self = this;
            var cusHandoverLstVO = this.detailTotalData || [];
            if ( cusHandoverLstVO && cusHandoverLstVO.length == 0  ) {
              _self.$message({message: '添加移交明细后，才能保存!', type: 'warning'});
              return ;
            }
            var mydata ={ cusHandoverAppVO: _self.$refs.reform.formModel, cusHandoverLstVO: cusHandoverLstVO };
            this.saveApplyLoading = true;
            yufp.service.request({
              method: 'POST',
              url: backend.cusService + '/api/cus/handover/app',
              data: mydata,
              callback: function (code, message, response) {
                _self.saveApplyLoading = false;
                if (response && response.data > 0 ) {
                  _self.$refs.reftable.remoteData();
                  _self.$message({message: '保存客户移交申请成功!', type: 'success'});
                  _self.dialogVisible = false;
                } else {
                  _self.$message({message: '保存客户移交申请失败!', type: 'warning'});
                }
              }
            });
          },

          emptyAppFn: function() {
            var _self = this;
            this.$confirm('是否清空移交明细?', '提示').then(function() {
              _self.detailTotalData = [];
            });
          }
          
        },
        mounted: function() {
          //绑定字典数据到某个指定对象上：移交方式的数组
          var me = this; 
          yufp.lookup.bind("STD_ZB_HAND_TYPE", function (lookup) { 
            me.handoverModeArr = lookup; 
          });
        
          var orgCode = yufp.session.org.orgCode;
          //获取当前登录人所在机构信息 loginOrg
          var url = backend.consoleService + '/api/s/org/' + orgCode;
          yufp.service.request({
            method: 'GET',
            url: url,
            callback: function (code, message, response) {
              if (response && response.data ) {
                me.loginOrg = response.data;
              } else {
                me.$message({message: '查询当前登录人所在机构信息失败!', type: 'warning'});
              }
            }
          });

        },
        watch: {
          detailTotalData: function(val) {
            //当移交明细表里面不为 空时, 接收机构与移出机构关系、移交范围、移交方式 不可修改
            val = val || [];
            var flag = val.length > 0;
            this.$refs.reform.switch('orgType', 'disabled', flag);
            this.$refs.reform.switch('handoverScope', 'disabled', flag);
            this.$refs.reform.switch('handoverMode', 'disabled', flag);
            this.$refs.reform.rebuildFn();
            return flag;
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
