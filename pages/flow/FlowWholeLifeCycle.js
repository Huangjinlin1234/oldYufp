/**
@created by   2018-06-13 09:26:38
@description 
 */
define(function (require, exports) {

    //page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('BIZ_FLOW_TYPE,FLOW_STATUS,APRV_OPINION,BIZ_NODE_TYPE,PERSONAL_HANDLE_STATUS,NODE_STATUS,BIZ_PLUGIN_TYPE,TASK_STATUS');
        var height = yufp.custom.viewSize().height - 110;
        var vm = yufp.custom.vue({
            _self: this,
            el: cite.el,
            watch: {
                pageAprvInfo: function (val) {
                  if (!val && this.vos && this.vos.length > 0) {
                      for (var i = 0; i < vm.vos.length; i++) {
                          pagePlugin = vm.vos[i];
                          yufp.router.removeRoute(pagePlugin.bizPluginId);
                      }

                  }
               }
            },
            data: function () {
                var me = this;
                return {
                    treeDataUrl: backend.flowService +'/api/stage/events',
                    flowInstanceInfoUrl: backend.flowService +'/api/flow/instance/infos',
                    nodeInstanceInfosUrl: backend.flowService +'/api/event/nodes',
                    taskInstanceInfoUrl: backend.flowService +'/api/event/node/tasks',
                    queryFields: [
                    	  { placeholder: '流转编号', field: 'bizFlowId', type: 'input' },
                        { placeholder: '流转实例编号', field: 'instFlowId', type: 'input' },
                        { placeholder: '流转类型', field: 'bizFlowType', type: 'select', dataCode: 'BIZ_FLOW_TYPE' }
                    ],
                    queryButtons: [
                    	  { label: '查询', op: 'submit', type: 'primary', icon: "search",
                            click: function (model, valid) {
                                if (valid) {
                                    me.$refs.flowInstanceInfos.remoteData(model);
                                }
                            }
                        },
                        { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
                    ],

                    flowInstanceInfoTableColumn: [
                    	  { label: '流转编号', prop: 'bizFlowId', sortable: true, resizable: true },
                    	  { label: '流转名称', prop: 'bizFlowName', sortable: true, resizable: true },
                        { label: '流转实例编号', prop: 'instFlowId', sortable: true, resizable: true },
                        { label: '流转类型', prop: 'bizFlowType', dataCode: 'BIZ_FLOW_TYPE', sortable: true, resizable: true },
                        { label: '流转实例状态', prop: 'instFlowState', dataCode: 'FLOW_STATUS', sortable: true, resizable: true },
                        { label: '流转开始时间', prop: 'startTime', sortable: true, resizable: true },
                        { label: '流转结束时间', prop: 'endTime', sortable: true, resizable: true },
                        { label: '流转所属机构代码', prop: 'create_at', sortable: true, resizable: true, hidden: true }
                    ],

                    height: yufp.custom.viewSize().height - 20,
                    grpFormHeight: (yufp.custom.viewSize().height - 250) + 'px',
                    viewWholeLifeCycle: false,
                    treeParam: {},
                    dataRoot: '000000',
                    nodeInstanceInfoTableColumn: [
                    	  { label: '节点实例编号', prop: 'instNodeId', resizable: true, sortable: true, hidden: true },
                        { label: '流程实例编号', prop: 'instFlowId', resizable: true, sortable: true, hidden: true },
                        { label: '业务流水号', prop: 'bizSerno', resizable: true, sortable: true, hidden: true },
                        { label: '业务节点编号', prop: 'bizNodeId', sortable: true, resizable: true },
                        { label: '业务节点名称', prop: 'bizNodeName', sortable: true, resizable: true },
                        { label: '业务节点类型', prop: 'bizNodeType', sortable: true, resizable: true, dataCode: "BIZ_NODE_TYPE" },
                        { label: '节点状态', prop: 'instNodeState', sortable: true, resizable: true, dataCode: "NODE_STATUS" },
                        { label: '流程处理状态', prop: 'processState', sortable: true, resizable: true, dataCode: "PERSONAL_HANDLE_STATUS" },
                        { label: '流程处理人员编号', prop: 'processUserId', sortable: true, resizable: true, hidden: true },
                        { label: '流程处理人员', prop: 'processUserName', sortable: true, resizable: true },
                        { label: '流程处理机构编号', prop: 'processOrgId', sortable: true, resizable: true, hidden: true },
                        { label: '流程处理机构', prop: 'processOrgName', sortable: true, resizable: true },
                        { label: '节点开始时间', prop: 'startTime', sortable: true, resizable: true },
                        { label: '节点结束时间', prop: 'endTime', sortable: true, resizable: true },
                        { label: '审批结果', prop: 'approveOpinion', sortable: true, resizable: true, dataCode: "APRV_OPINION" },
                        { label: '审批意见', prop: 'approveComment', sortable: true, resizable: true },
                        { label: '审批时间', prop: 'approveTime', sortable: true, resizable: true }
                    ],
                    viewTaskList: false,
                    taskInstanceInfoTableColumn: [
                        { label: '节点实例编号', prop: 'instNodeId', sortable: true, resizable: true, hidden: true },
                        { label: '任务编号', prop: 'taskId', sortable: true, resizable: true },
                        { label: '任务名称', prop: 'taskName', sortable: true, resizable: true },
                        { label: '上一任务编号', prop: 'previousTaskId', sortable: true, resizable: true },
                        { label: '业务节点编号', prop: 'bizNodeId', sortable: true, resizable: true, hidden: true },
                        { label: '业务节点名称', prop: 'bizNodeName', resizable: true },
                        { label: '节点状态', prop: 'taskState', sortable: true, resizable: true, dataCode: "TASK_STATUS" },
                        { label: '业务插件类型', prop: 'bizPluginType', sortable: true, resizable: true, dataCode: "BIZ_PLUGIN_TYPE" },
                        { label: '业务插件编号', prop: 'bizPluginId', sortable: true, resizable: true, hidden: true },
                        { label: '业务插件名称', prop: 'bizPluginName', sortable: true, resizable: true },
                        { label: '错误信息', prop: 'errorMsg', sortable: true, resizable: true }
                    ],
                    pageAprvInfo: false,
                    vos: [],
                    myStyle: {
                        height: height + 'px',
                        overflow: 'auto'
                    },
                    bizNodeName: ''
                }
            },
            methods: {
                infoFn: function () {
                    if (this.$refs.flowInstanceInfos.selections.length != 1) {
                        this.$message({
                            message: '请先选择一条记录',
                            type: 'warning'
                        })
                        return;
                    }
                    this.treeParam.instFlowId = this.$refs.flowInstanceInfos.selections[0].instFlowId;
                    this.viewWholeLifeCycle = true;
                },
                nodeClickFn: function (nodeData, node, self) {
                    this.$refs.nodeInstanceInfos.remoteData({"bizSerno" : nodeData.treeNodeId});
                },
                
                viewAprv: function() {
                	
                	  var selections = this.$refs.nodeInstanceInfos.selections;
                    if (selections.length != 1) {
                        this.$message({
                            message: '请选择一条记录',
                            type: 'warning'
                        });
                        return;
                    }
                    
                    if ("11" != selections[0].bizNodeType) {
                        this.$message({
                            message: '当前节点不是审批节点，不可查看',
                            type: 'warning'
                        });
                        return;
                    }
                    
                    var data = {};
                    data.bizSerno = selections[0].bizSerno;
                    data.instNodeId = selections[0].instNodeId;
          
                	  this.$nextTick(function () {
                        yufp.service.request({
                            method: 'POST',
                            url: backend.flowService + '/api/node/aprv/finish',
                            data: data,
                            callback: function (code, message, response) {
                                if (code == 0) {
                                    var pageData = response.rows;
                                    vm.bizNodeName = pageData.bizNodeName;
                                    vm.vos = pageData.vos;
                                    vm.pageAprvInfo = true;
                                    if (vm.vos.length > 0) {
                                        vm.vos[0].show = true;
                                    }
                                    vm.$nextTick(function () {
                                        var pagePlugin;
                                        for (var i = 0; i < vm.vos.length; i++) {
                                            pagePlugin = vm.vos[i];
                                            pagePlugin.show = (i == 0);
                                            var pageInfo = {};
                                            pageInfo.flowId = data.bizFlowId;
                                            pageInfo.eventId = pageData.eventId;
                                            pageInfo.e_bizSerno = pageData.bizSerno;
                                            pageInfo.g_bizSerno = pageData.g_bizSerno;
                                            pageInfo.taskId = pagePlugin.taskId;
                                            pageInfo.instNodeId = pageData.instNodeId;
                                            pageInfo.datas = pagePlugin.datas;
                                            pageInfo.dataKey = pagePlugin.dataKey;
                                            pageInfo.disabled = true;
                                            pageInfo.taskDone = this.taskDone;
                                            vm.addRoute(pagePlugin.bizPluginId, pagePlugin.bizPageUrl, pageInfo);
                                        }
                                        if (vm.vos.length > 0) {
                                            vm.vos[0].show = true;
                                        }
                                    });
                                } else {
                                    vm.$message('操作失败');
                                }
                            }
                        });
                    });
                },
                
                viewTask: function() {
                    if (this.$refs.nodeInstanceInfos.selections.length != 1) {
                        this.$message({
                            message: '请先选择一条记录',
                            type: 'warning'
                        })
                        return;
                    }
                    this.viewTaskList = true;
                    this.$nextTick(function () {
                        var instNodeId = this.$refs.nodeInstanceInfos.selections[0].instNodeId;
                  	    this.$refs.taskInstanceInfos.remoteData({'instNodeId' : instNodeId});
                    })
                },
                
                closeTask: function() {
                	  this.viewTaskList = false;
                },
                
                close: function() {
                	  this.pageAprvInfo = false;
                },
                
                showPage: function (bizPluginId) {
                    var vos = [];
                    var pagePlugin;
                    for (var i = 0; i < vm.vos.length; i++) {
                      pagePlugin = vm.vos[i];
                      pagePlugin.show = (pagePlugin.bizPluginId == bizPluginId);
                      vos.push(pagePlugin);
                    }
                    vm.vos = vos;
                },
                
                addRoute: function (name, url, data) {

                    //定义deferred
                    var deferred = new yufp.core.Deferred();
                    var target = {
                        id: name,
                        rootId: name,
                        data: data
                    };
                    var cite = {
                        id: target.id,
                        rootId: target.rootId,
                        el: '#' + target.rootId + '>div',
                        startTime: new Date().getTime(),
                        options: target.options
                    };
                    var route = {
                        html: url + '.html',
                        js: url + '.js'
                    };
                    //加入路由
                    yufp.router.addRoute(name, route);
                    //装载
                    yufp.router.mount(target, route, cite, deferred);
                }
            }
        });
    };

});
