/**
 * @create by xxx on 2018-04-23
 * @description 资源信息 管理
 */
define(function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
    	  var height = yufp.custom.viewSize().height - 40;
        var newResc = { rescCode: '', rescDesc: '', rescUrl: '', rescIcon: '', memo: '', rescParentCode: '', rescParentDesc: ''};
        // 创建virtual model
        var vm = yufp.custom.vue({
            el: cite.el,
            data: function () {
                return {
                	actDataUrl: backend.consoleService + '/api/s/resc/rescActs',
                	autoStyle: {
                     height: height + 'px',
                     overflow: 'auto'
                  },
                  expandAll: true,
                	resourcetree: {
                	   async: true,
                	   //传递到后台，额外的参数
                	   param: {  } ,
                	   //选中的 节点信息
                	   node: null,
                	   //选择的nodeData ,完整数据
                	   nodeData: null
                	}, 
                	resc: {
                    loading: true,
                    rescs: [],
                    props: {
                      label: 'rescDesc',
                      id: 'rescCode'
                    },
                    select: null
                  },
                	resourceform: {
                		loading: false,
                	   fields: [
	              	       {
	              	           columnCount: 2, // 每行多少个字段
	              	           fields: [
	              	             { field: 'rescCode', label: '资源代码',  disabled: true, rules: [ { required: true, message: '资源代码是必填项', trigger: 'blur' }, { max: 32, message: '最大长度为32'}  ] },
	              	             { field: 'rescDesc', label: '资源中文描述', rules: [ { required: true, message: '资源中文描述是必填项', trigger: 'blur' }, { max: 80, message: '最大长度为80'}  ]  },
	              	             { field: 'funcId', label: '路由', rules: [ { max: 32, message: '最大长度为32'} ] },
	              	             { field: 'rescIcon', label: '资源图标', rules: [ { max: 60, message: '最大长度为60'} ] },
	              	             { field: 'orderId', label: '序号', rules: [ { validator: yufp.validator.number, message: '序号必须为数字值'} ]}
	              	           ]
	              	       },
	              	       {
	              	          columnCount: 1, // 每行多少个字段
	              	          fields: [
	              	             { field: 'rescUrl', label: '资源URL', rules: [ { max: 254, message: '最大长度为254'} ] },
	              	             { field: 'memo', label: '备注', type: 'textarea' , rules: [ { max: 100, message: '最大长度为100'} ] }
	              	          ]
	              	       }
                	   ],
                	   buttons: [
                          /** 资源定义页面按钮不做权限控制  【原】hidden: yufp.session.checkCtrl('edit', cite.menuId) */
                          { label: '保存', type: 'primary', icon: 'check', hidden: false, click: function ( model ) {
                             var  validate = false;  // 是否通过表单验证
                             // $refs.orgform 对应着， 当前页面下，ref 的组件名称
                             // validate 是组件方法
                             vm.$refs.resourceform.validate( function ( vali ) {
                                validate = vali;
                             } ); // 提交 表单 的验证 状态
                             if ( !validate ) return ;
                             vm.resourceform.loading = true;
                              var url = backend.consoleService +  '/api/s/resource';
                               yufp.service.request({
                                  method: 'PUT',
                                  url: url,
                                  data: model,
                                  callback: function (code, message, response) {
                                      vm.resourceform.loading = false;
                                      if (code == 0) {
                                                                    	
                                      	 //修改成功后，存到nodeData上， 以防止出现不更新
                                        yufp.util.copyObj(vm.resourcetree.nodeData, model);
                                        if (vm.resourcetree.node.data ){
                                          yufp.extend( vm.resourcetree.node.data, model);
                                          var obj = {rescCode: model.rescCode};
                                          vm.$refs.rescActTable.remoteData(obj);
                                        }
//                                        vm.resourcetree.node.data.label = model.rescDesc;
                                        vm.$message('操作成功!');
                                      
                                      } else {
                                        vm.$message('操作失败');
                                      }
                                  }
                              });
                          }  },
                           // 设置 hidden属性之后，可以通过设置这个属性，隐藏该按钮yufp.session.checkCtrl('edit', cite.menuId)
                          { label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function ( model ) {
                               //重置表单的数据，为选择节点的信息
                               if ( !vm.resourceform.buttons[1].disabled )
                                   yufp.extend(vm.$refs.resourceform.formModel, vm.resourcetree.nodeData );
                          } }
                      ]
                	},
                	
                	//新增资源 对话框属性
                	addDialog: {
                	   visible: false
                	},
                	isLoadRoot: true,
                	addObjNum: 0, //已添加的对象
                	addRescform: {
                		   loading: false,
                	     fields: [ 
                	     {
                           columnCount: 2, // 每行多少个字段
                           fields: [
                             { field: 'rescParentCode', label: '上级资源代码',  disabled: true },
                             { field: 'rescParentDesc', label: '上级资源中文描述',  disabled: true },
                             { field: 'rescCode', label: '资源代码',  rules: [ { required: true, message: '资源代码是必填项', trigger: 'blur' }, { max: 32, message: '最大长度为32'}  ] },
                             { field: 'rescDesc', label: '资源中文描述', rules: [ { required: true, message: '资源中文描述是必填项', trigger: 'blur' }, { max: 80, message: '最大长度为80'}  ]  },
                             { field: 'funcId', label: '路由', rules: [ { max: 32, message: '最大长度为32'} ] },
                             { field: 'rescIcon', label: '资源图标', rules: [ { max: 60, message: '最大长度为60'} ] },
                             { field: 'orderId', label: '序号', rules: [ { validator: yufp.validator.number, message: '序号必须为数字值'} ]}
                           ]
                       },
                       {
                          columnCount: 1, // 每行多少个字段
                          fields: [
                             { field: 'rescUrl', label: '资源URL', rules: [ { max: 254, message: '最大长度为254'} ] },
                             { field: 'memo', label: '备注', type: 'textarea', rules: [ { max: 100, message: '最大长度为100'} ] }
                          ]
                       }
                	     ],
                	    
                	     buttons: [
                       
                          { label: '保存', type: 'primary', icon: 'check', hidden: false,  disabled: false ,click: function ( model ) {
                             var  validate = false;  // 是否通过表单验证
                             // $refs.orgform 对应着， 当前页面下，ref 的组件名称
                             // validate 是组件方法
                             vm.$refs.addRescform.validate( function ( vali ) {
                                validate = vali;
                             } ); // 提交 表单 的验证 状态
                             if ( !validate ) return ;
                             vm.addRescform.loading = true;
                             var url = backend.consoleService + '/api/s/resource';
                             yufp.service.request({
                              method: 'POST',
                              url: url,
                              data: model,
                              callback: function (code, message, response) {
                              	vm.addRescform.loading = false;
                                if (code == 0) {
                                	if ( response && response.data < 0) {
                                	  vm.$message({ message: response.message, type: 'warning' });
                                		return ;
                                	}
                                	vm.$message('操作成功!');
                                	vm.addDialog.visible = false; 
                                	var obj  = {};
                                	
                                	obj.id = model.rescCode;
                                	obj.rescCode = model.rescCode; 
                                	obj.rescDesc = model.rescDesc;
                                	obj.expanded = true;
                                	obj.data = model;
                                	obj.childNodes = [];
                                	
                                	vm.resourcetree.node.insertChild( obj);
                            
                                } else {
                                  vm.$message('操作失败');
                                }
                              }
                            });
                          }  },
                             // 设置 hidden 属性 之后， 可以通过设置 这个属性， 隐藏该按钮
                          { label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function ( model ) {
                              vm.addDialog.visible = false;
                          } }
                      ]
                	},
                	
                  //新增资源操作信息 对话框
                  rescActDialog: {
                    title: '', 
                    loading: false,
                    visible: false
                  }, 
                  
                  //新增资源操作 表格字段
                	rescActColumns: [
                    { label: '操作码', prop: 'rescActCode', resizable: true  },
                    { label: '路由', prop: 'funcId', resizable: true  },
                    { label: '操作码中文描述', prop: 'rescActDesc', width: 200, resizable: true  }                  
                  ],
                  
                  //资源操作码 表单
                  rescActForm: {
                    fields: [ 
                       {
                          columnCount: 2, // 每行多少个字段
                          fields: [
                            { field: 'rescCode', label: '资源代码',  disabled: true },
                            { field: 'rescDesc', label: '资源中文描述',  disabled: true },
                            { field: 'funcId', label: '路由', disabled: true,rules: [ { max: 32, message: '最大长度为32'} ] },
                            { field: 'rescActCode', label: '资源操作码', 
                              rules: [ { required: true, message: '资源操作码是必填项', trigger: 'blur' }, { max: 32, message: '最大长度为32'}  ] },
                            { field: 'rescActDesc', label: '资源操作中文描述', 
                              rules: [ { required: true, message: '资源操作中文描述是必填项', trigger: 'blur' }, { max: 80, message: '最大长度为80'}  ]  },
                            { field: 'createUser', label: '创建人',  hidden: true },
                            { field: 'createTime', label: '创建日期',  hidden: true },
                            { field: 'lastUpdateUser', label: '最后修改人',  hidden: true },
                            { field: 'lastUpdateTime', label: '最后修改时间',  hidden: true }
                          ]
                       }
                    ],
                    
                    buttons: [
                      // 设置 hidden 属性 之后， 可以通过设置 这个属性， 隐藏该按钮
                      { label: '取消', type: 'primary', icon: 'yx-undo2', hidden: false, click: function ( model ) {
                          vm.rescActDialog.visible = false;
                      } },
                      { label: '保存', type: 'primary', icon: 'check', hidden: false, click: function ( model ) {
                        var  validate = false;  // 是否通过表单验证
                        // $refs.orgform 对应着， 当前页面下，ref 的组件名称
                        // validate 是组件方法
                        vm.$refs.rescActForm.validate( function ( vali ) {
                          validate = vali;
                        } ); // 提交 表单 的验证 状态
                        if ( !validate ) return ;
                          vm.rescActDialog.loading = true;
                        
                          var rMethod = '';
                          if(vm.rescActForm.op == "EDIT") {
                            rMethod = 'PUT';
                          } else if(vm.rescActForm.op == "ADD") {
                            rMethod = 'POST';
                          }
                         
                          yufp.service.request({
                            method: rMethod,
                            url: backend.consoleService + '/api/s/resc/act',
                            data: model,
                            callback: function (code, message, response) {
                              vm.rescActDialog.loading = false;
                              if (code == 0) {
                              	vm.$refs.rescActTable.remoteData();
                                vm.$message('操作成功');
                                vm.rescActDialog.visible = false; 
                              } else {
                                vm.$message('操作失败');
                              }
                            }
                          });
                      }  }
                    ],
                    op: ''
                  }
                };
            },
            
            computed: {
              rescActLodingText: function() {
                return this.rescActDialog.title + '请求中';
              }
            },
            
            methods: {
            	//展开/收缩所有的节点
            	transExpand: function() {
            	  this.expandAll = !this.expandAll;
            	  var closeFn = function (obj) {
            	  	 var data = obj.childNodes;
            	  	  if ( data && data.length > 0) {
              	     for (var i = 0; i < data.length; i++) {
              	     	  data[i].expanded =  vm.expandAll;
                        closeFn(data[i]);
                     }
            	  	 }
            	  };
            	  var data = this.$refs.rescTree.root.childNodes;
            	  if ( data && data.length > 0) {
            	     for (var i = 0; i < data.length; i++) {
            	       data[i].expanded =  this.expandAll;
            	       closeFn(data[i]);
            	     }
            	  }
            	  
            	},
            	
            	/**
                * @param ctrlCode 操作码
                */
                checkPermission: function(ctrlCode) {
                  return !yufp.session.checkCtrl(ctrlCode, cite.menuId);
                },
                
            	//树节点点击函数
                nodeClickFn: function ( nodeData, node, self ) {
                	var vm = this;
                	vm.resourcetree.node = node;
                	vm.resourcetree.nodeData = nodeData;
                	this.$refs.rescActTable.remoteData(nodeData);
                	yufp.extend( vm.$refs.resourceform.formModel, newResc );

                	var rescCode = nodeData ? nodeData['rescCode'] : node['rescCode'];
                	var url = backend.consoleService + '/api/s/resource/' + rescCode;            	 	   
                	yufp.service.request({
                		method: 'GET',
                		url: url,
                		callback: function (code, message, response) {
                			if (code == 0) {
                				vm.resourcetree.nodeData = response.rows;
                				yufp.extend( vm.$refs.resourceform.formModel, response.rows );
                			} else {
                				vm.$message('查询资源信息失败');
                			}
                		}
                	});
                },
            	
              //新增
            	addFn: function () {
            		vm.resourcetree.node = this.$refs.rescTree.root;
          	    this.addDialog.visible = true;
          	    
          	    //显示对话框
          	    vm.$nextTick( function () {
          	    	this.$refs.addRescform.resetFn();
          	    });
          	  },
          	  
              // 切换 资源操作表单
              swicthRescAct: function(title, isLoading, isOnlyLook) {
                if ( !this.resourcetree.node ) {
                  this.$message({ message: '请先选中一个资源!', type: 'warning' });
                  return ;
                }
                this.rescActDialog.title = title;
                this.rescActDialog.visible = true;
                
                this.rescActForm.disabled = isOnlyLook;
                this.$nextTick( function() {
                	 var val = this.rescActForm.op != 'DETAIL';
                  this.rescActForm.buttons[1].hidden = !val;
                  this.$refs.rescActForm.switch('createTime', 'hidden', val);
                  this.$refs.rescActForm.switch('createUser', 'hidden', val);
                  this.$refs.rescActForm.switch('lastUpdateUser', 'hidden', val);
                  this.$refs.rescActForm.switch('lastUpdateTime', 'hidden', val);
                  this.$refs.rescActForm.switch('rescActCode', 'disabled', this.rescActForm.op == 'EDIT');
                  this.$refs.rescActForm.rebuildFn();
//                  this.$refs.rescActForm.resetFields();
                  var rescAct = {rescActCode: '', rescActDesc: '', createTime: '', createUser: '', lastUpdateTime: '', lastUpdateUser: '' };
                  yufp.extend(this.$refs.rescActForm.formModel, rescAct);
                  this.$refs.rescActForm.formModel.rescCode = this.resourcetree.node.data.rescCode;
                  this.$refs.rescActForm.formModel.rescDesc = this.resourcetree.node.data.rescDesc;
                  this.$refs.rescActForm.formModel.funcId = this.resourcetree.node.data.funcId;
                  
                });
                
                if (isLoading) {
                  var rescAct = this.$refs.rescActTable.selections[0];
                  var node = this.resourcetree.node;
                  var rescCode = node.data.rescCode;
                  vm.$nextTick( function() {
                    yufp.extend(vm.$refs.rescActForm.formModel, rescAct);
                    this.$refs.rescActForm.formModel.rescCode = this.resourcetree.node.data.rescCode;
                    this.$refs.rescActForm.formModel.rescDesc = this.resourcetree.node.data.rescDesc;
                    this.$refs.rescActForm.formModel.funcId = this.resourcetree.node.data.funcId;
                  } );
                  
                }
              },
              
              //添加资源操作
              addActFn: function() {
                this.rescActForm.op = 'ADD';
                this.swicthRescAct('新增资源操作信息', false, false);
              },
              
              //修改资源操作
              modifyActFn: function() {
                if ( 1 != this.$refs.rescActTable.selections.length ) {
                  this.$message({ message: '请先选择一条资源操作记录', type: 'warning' });
                  return null;
                }

                this.rescActForm.op = 'EDIT';
                this.swicthRescAct('修改资源操作信息', true, false);
              },
              
              //删除资源操作
              deleteActFn: function() {
                if ( 1 != this.$refs.rescActTable.selections.length ) {
                  this.$message({ message: '请先选择一条资源操作记录', type: 'warning' });
                  return null;
                }
                
                this.$confirm('是否删除资源操作信息？', '提示')
                  .then(function () {

                    var rescAct = vm.$refs.rescActTable.selections[0];
                    var node = vm.resourcetree.node;
                    var rescCode = node.data.rescCode;
                      var url = backend.consoleService +  '/api/s/resc/act';
                      yufp.service.request({
                          method: 'DELETE',
                          url: url,
                          data: { 
                            rescCode: rescCode,
                            rescActCode: rescAct.rescActCode 
                          } ,
                          callback: function (code, message, response) {
                            
                            if (code == 0) {
                            	 vm.$refs.rescActTable.remoteData();
                            	 vm.$message('操作成功!');
                            } else {
                              vm.$message('操作失败!');
                            }
                          }
                        });
                  
                  });
              },
              
              //查看资源操作
              infoActFn: function() {
                if ( 1 != this.$refs.rescActTable.selections.length ) {
                  this.$message({ message: '请先选择一条资源操作记录', type: 'warning' });
                  return null;
                }
                this.rescActForm.op = 'DETAIL';
                this.swicthRescAct('查看资源操作信息', true, true);
              },
               renderContent: function (createElement, tree) {
                  var createFlag = yufp.session.checkCtrl('create', cite.menuId);
                  var deleteFlag = yufp.session.checkCtrl('delete', cite.menuId);
                  return createElement('span', [
                    createElement('span' ,tree.node.label ||  tree.node.rescDesc),
                    createElement('span', {
                      style: {
                        'float': 'right',
                        'margin-right': '20px'
                      }
                    }, [
                      createElement('el-button', {
                        'class': 'el-button--info el-button--mini',
                        style : {
                          'display': createFlag ? 'none' : 'black'
                        },
                        on: {
                          click: function () { 
                            return vm.append(tree.store, tree.data, tree.node); 
                          }
                        }
                      }, '增加'),
                      createElement('el-button', {
                        'class': 'el-button--warning el-button--mini',
                        style : {
                        	'display': deleteFlag ? 'none' : 'black'
                        },
                        on: {
                          click: function () { 
                            return vm.remove(tree.store, tree.data, tree.node); 
                          }
                        }
                      }, '删除')
                    ])
                  ])
                },
                
              append: function(store, data, node) {
//                  node.insertChild( { id: new Date().getTime(), rescDesc: 'testtest', childNodes: [] }, 0 );
              	this.resourcetree.node = node;
                this.addDialog.visible = true;
                
                //显示对话框
                vm.$nextTick( function () {
                	this.$refs.addRescform.resetFn();
                	vm.$refs.addRescform.formModel.rescParentCode = node.data ? node.data.rescCode : node.rescCode;
                  vm.$refs.addRescform.formModel.rescParentDesc =  node.data ? node.data.rescDesc : node.rescDesc;
                  
                });
              	
              },
              
              remove: function(store, data, node) {
                var childNodes =  node.childNodes;
                if ( childNodes.length > 0 ) {
                  vm.$message({ message: '当前资源拥有子节点不允许删除!', type: 'warning' });
                  return ;
                }
                var rescCode = node.data ?  node.data.rescCode : node.rescCode;
                  
                vm.$confirm('是否删除?', '提示', {
                  type: 'warning'
                }).then( function () {
                         var url = backend.consoleService + '/api/s/resource';
                         yufp.service.request({
                          method: 'DELETE',
                          url: url,
                          data: { rescCode: rescCode } ,
                          callback: function (code, message, response) {
                            
                            if (code == 0) {
                            	 node.parent.removeChild(node);
                            	 //如果删除的当前form 表单的资源
                            	 if ( rescCode == vm.$refs.resourceform.formModel.rescCode) {
                            	     vm.$refs.resourceform.resetFn();
                                   vm.$refs.rescActTable.remoteData();
                            	 }
                               vm.$message('操作成功!');
                            } else {
                              vm.$message('查询资源信息失败');
                            }
                          }
                        });
                });
              }
            },
            
            mounted: function () {
            	var root = new Date().getTime() + ''; //根节点, 将父节点为空的节点， 设置为根节点
            	var options = {id: 'rescCode', pid: 'rescParentCode', 
            			root: root, label: 'rescDesc'};
            	var rescsUrl = backend.consoleService + '/api/s/queryRescAll';
            	yufp.service.request({
            		method: 'POST',
            		url: rescsUrl,
            		callback: function (code, message, res) {
            			if (code == 0) {
            				if (res && res.rows) {
            					//转换的时候 , 需要 有根节点才能转换为树形数据， 所以将 null 或 ''的父类ID 设置为 root
            					for ( var i = 0; i < res.rows.length; i++) {
            						if ( !res.rows[i].rescParentCode || res.rows[i].rescParentCode == '') {
            							res.rows[i].rescParentCode = root;
            						}
            					}
            					var roles = yufp.util.array2tree(res.rows, options);
            					if (roles && roles.children.length > 0) {
            						var arr = roles.children;
            						vm.resc.roles = arr;
            					}

            				}
            				vm.resc.loading = false;
            			} else {
            				vm.$message('查询资源信息列表失败');
            			}
            		}
            	});
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