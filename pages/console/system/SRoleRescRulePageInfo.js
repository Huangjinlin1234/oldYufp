/**
 * @create by fuzm on 2018-05-04
 * @description 角色对应资源操作信息
 */
define(function (require, exports) {
    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        var height = yufp.custom.viewSize().height - 40;
        // 创建virtual model
        var vm = yufp.custom.vue({
            el: cite.el,
            watch: {
              roleName: function(val){
                this.$refs.roleTree.filter(val);
              },
              rescDesc: function(val) {
                this.$refs.rescTree.filter(val);
              }
            },
            data: function () {
              
              return {
              	autoStyle: {
              		 height: height + 'px',
              		 overflow: 'auto'
              	},
                roleName: '',
                rescDesc: '',
                role: {
                  loading: true,
                  roles: [],
                  props: {
                    label: 'roleName',
                    id: 'roleCode'
                  },
                  select: null
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
                roleRescRules: [], //已勾选的角色对应资源操作信息
                rescActs: [] //资源操作信息
              };
            },
            
            methods: {
            	/**
                * @param ctrlCode 操作码
                */
              checkPermission: function(ctrlCode) {
                return !yufp.session.checkCtrl(ctrlCode, cite.menuId);
              },
              
              filterRoleNode: function (value, data) {
                if (!value) return true;
                return data.roleName.indexOf(value) !== -1;
              },
              
              filterRescNode: function (value, data) {
                if (!value) return true;
                return data.rescDesc.indexOf(value) !== -1;
              },
              
              saveRoleRescRule: function() {
                var resc = this.resc.select;
                var role = this.role.select;
                if (!resc) {
                  vm.$message({ message: '请选择一个资源!', type: 'warning' });
                  return ;
                }
                if (!role) {
                  vm.$message({ message: '请选择一个角色!', type: 'warning' });
                  return ;
                }
                //如果没有资源操作信息
                if ( !this.rescActs || this.rescActs.length == 0) {
                  return ;
                }
                var roleRescRuleStrs = '';
                if (this.roleRescRules)
                  roleRescRuleStrs = this.roleRescRules.join(",");
                var url = backend.consoleService + '/api/s/role/resc/saveRule';
                  yufp.service.request({
                    method: 'POST',
                    url: url,
                    data: { 
                      rescCode: resc.rescCode,
                      roleCode: role.roleCode,
                      roleRescRuleStrs: roleRescRuleStrs
                    },
                    callback: function (code, message, res) {
                    	 if (code == 0 ) {
                    	   vm.$message({ message: '操作成功!', type: 'success' });
                    	 }
                    }
                  });
              },
              
              rescNodeClick: function( nodeData, node, self ) {
                this.resc.select = nodeData;
                var url = backend.consoleService + '/api/s/resc/rescActs';
                yufp.service.request({
                  method: 'POST',
                  url: url,
                   data: { rescCode: nodeData.rescCode},
                  callback: function (code, message, res) {
                       vm.rescActs = res.rows || [];
                       vm.queryRoleRescRule();
                  }
                });
              },
              
              roleNodeClick: function ( nodeData, node, self ) {
                this.role.select = nodeData;
                this.queryRoleRescRule();
              },
              
              queryRoleRescRule: function () {
              	this.roleRescRules = [];
                var resc = this.resc.select;
                var role = this.role.select;
                  if ( resc && role ) {
                    var url = backend.consoleService + '/api/s/role/resc/roleRescRules';
                     yufp.service.request({
                      method: 'POST',
                      url: url,
                      data: { 
                          rescCode: resc.rescCode,
                          roleCode: role.roleCode
                        },
                      callback: function (code, message, res) {
                          vm.roleRescRules = res.rows || [];
                      }
                    });
                  }
              }
            },
            
            mounted: function () {
            	//var rolesUrl = backend.consoleService + '/api/s/queryRolesCtrl'; /**【2019D0509】【(问题编号)】 @date 2019/12/05 */
            	var rolesUrl = backend.consoleService + '/api/s/queryRoleAll';
            	yufp.service.request({
            		method: 'POST',
            		url: rolesUrl,
            		callback: function (code, message, res) {
            			vm.role.loading = false;
            			if (code == 0) {
            				vm.role.roles = res.rows;
            			} else {
            				vm.$message('查询角色信息失败');
            			}
            		}
            	});

            	var root = new Date().getTime() + ''; //根节点, 将父节点为空的节点， 设置为根节点
            	var options = {id: 'rescCode', pid: 'rescParentCode', 
            			root: root, label: 'rescDesc'};
            	var rescsUrl = backend.consoleService + '/api/s/user/resc/data';
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
