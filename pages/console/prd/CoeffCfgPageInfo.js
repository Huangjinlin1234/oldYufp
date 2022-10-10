/**
 * @create by szbd
 * @description 提额系数配置表的前端js
 * @createDate 2018-09-17 15:10:09
 */
define(function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        //引入字典项
        yufp.lookup.reg('CRUD_TYPE,STD_ZB_REG_TYPE_REVENUE,APRV_STATUS');
        yufp.custom.vue({
            el: cite.el,
            
            data: function() {
            	var _self = this;
            	return {
            		dataUrl:backend.consoleService + '/api/coeff/cfg/apps',
            		 baseParams: {
                     },
                     //搜索条件
                     queryFields: [
//                         {placeholder: '申请流水号', field: 'bizSerno', type: 'input'},
                         {placeholder: '单位注册类型', field: 'typeId', type: 'select',dataCode:'STD_ZB_REG_TYPE_REVENUE'},
//                         {placeholder: '调整前系数', field: 'oldCoefficient', type: 'input'},
//                         {placeholder: '系数', field: 'coefficient', type: 'input'},
//                         {placeholder: '机构法人代码', field: 'legalOrgCode', type: 'input'},
                         {placeholder: '审批状态', field: 'aprvStatus', type: 'select',dataCode:'APRV_STATUS'}
//                         {placeholder: '创建日期', field: 'createTime', type: 'input'},
//                         {placeholder: '创建人', field: 'createUser', type: 'input'},
//                         {placeholder: '创建人所属机构', field: 'createOrgCode', type: 'input'},
//                         {placeholder: '最后修改日期', field: 'lastUpdateTime', type: 'input'},
//                         {placeholder: '最后修改人', field: 'lastUpdateUser', type: 'input'}
                     ],
                     queryButtons: [
                         {label:'查询', op: 'submit', type:'primary', icon:'search', click:function (model, valid) {
                             if (valid) {
                                 _self.$refs.reftable.remoteData(model);
                             }
                         }},
                         {label:'重置', op:'reset', type:'primary', icon:'yx-loop2'}
                     ],
                     tableColumns: [
                         {label:'申请流水号', prop:'bizSerno', sortable:true, resizable:true},
                         {label:'单位注册类型', prop:'typeId', sortable:true, resizable:true,dataCode:'STD_ZB_REG_TYPE_REVENUE'},
                         {label:'当前/调整前系数', prop:'coefficient', sortable:true, resizable:true},
                         {label:'调整后系数', prop:'newCoefficient', sortable:true, resizable:true},
                         {label:'审批状态', prop:'aprvStatus', sortable:true, resizable:true,dataCode:'APRV_STATUS'},
                         {label:'法人机构代码', prop:'legalOrgCode', sortable:true, resizable:true},
                         {label:'创建人', prop:'createUser', sortable:true, resizable:true},
                         {label:'创建日期', prop:'createTime', sortable:true, resizable:true},
//                         {label:'创建人所属机构', prop:'createOrgCode', sortable:true, resizable:true},
                         {label:'最后修改人', prop:'lastUpdateUser', sortable:true, resizable:true},
                         {label:'最后修改日期', prop:'lastUpdateTime', sortable:true, resizable:true}
                     ],
            		
                     
            	height: yufp.custom.viewSize().height - 120,
            	mainGrid:{
            		data:null,
            		loading:false
            	},
            	
            	paramType: null,
            	dialogVisible:false,
            	
            	}
            },
            
            
            methods: {
            	
            	 checkPermission: function(ctrlCode) {
                     return !yufp.session.checkCtrl(ctrlCode, cite.menuId);
                 },
            	
            	modifyFn:function(){
            		var _self = this;
            		_self.dialogVisible=true;
                	var flag = "disPlay";
                	var url = backend.consoleService+'/api/prd/coeff/cfgs';
                	_self.mainGrid.loading = true;
                	
                	//绑定字典数据到某个指定对象上：调整类型的数组
                    yufp.lookup.bind("STD_ZB_REG_TYPE_REVENUE", function (lookup) { 
                    	_self.paramType = yufp.lookup.find("STD_ZB_REG_TYPE_REVENUE", false)
                    	
                    });
                	this.$nextTick(function(){
                		yufp.service.request({
                			method:'POST',
                			url:url,
                			data:{
                				flag:flag
                			},
                			callback:function(code,message,response){
                				_self.mainGrid.loading = false;
                				if(code == 0){
                					var responseData = response.data;
                					_self.mainGrid.data = responseData;
                					_self.coeffLoading = false;
                					
                				}else{
                					_self.$message(response.message);
                				}
                			}
                		});
                	});
                	
            	},
                
            	commitFn:function(){
            		var _self = this;
            		var data = {list:_self.mainGrid.data};
            		var url = backend.consoleService +'/api/coeff/cfg/app/commit';
            		if(data == null){
            			_self.$message('操作失败！');
            			return;
            		};
            		yufp.service.request({
            			method:'POST',
            			url:url,
            			data:data,
            			callback:function(code,message,response){
            				if(code == 0){
            					var responeCode = response.code;
            					if(response && responeCode==-3){
                                  	_self.$refs.reftable.remoteData();
                                    _self.$message({message:response.message,type:'warning'})
                                
            					}else if(responeCode == "-1"){
            						_self.$message(response.message);
            					}else if(responeCode == "-2"){
            						_self.$message(response.message);
            					}else if(responeCode == "-4"){
            						_self.$message(response.message);
            						_self.dialogVisible = false;
            					}else{
//            						_self.$message({message:'保存成功!',type:'success'});
            						_self.$message({message:'提交成功!',type:'success'});
            						_self.dialogVisible = false;
            					}
            				}else{
            					_self.$message({message:'提交失败!',type:'warning'});
            					
            				}
            			}
            		});
            	},
            	
            	
        	},
            
        	//进入页面即运行方法
//            mounted:function(){
//
//            },
            
        });
    };
    // 消息处理
    exports.onmessage = function (type, message) {};
    // page销毁时触发destroy方法
    exports.destroy = function (id, cite) {}
});
