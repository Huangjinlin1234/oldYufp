/**
@created by   2018-06-13 09:26:38
@description 
 */
define(function (require, exports) {

    //page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('BIZ_FLOW_TYPE,FLOW_STATUS,APRV_OPINION,BIZ_NODE_TYPE,PERSONAL_HANDLE_STATUS,NODE_STATUS,BIZ_PLUGIN_TYPE,TASK_STATUS,EVENT_STATUS');
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
                    eventData: [],
                    // 查询流转实例 展示的是 终止和异常03,06
                    flowInstanceInfoUrl: backend.flowService +'/api/flow/event/info/terminateOrPause',
                    nodeInstanceInfosUrl: backend.flowService +'/api/event/nodes',
                    taskInstanceInfoUrl: backend.flowService +'/api/event/node/tasks',
                    queryFields: [
                        { placeholder: '业务流水号', field: 'bizSerno', type: 'input' }
                    ],
                    queryButtons: [
                    	  { label: '搜索', op: 'submit', type: 'primary', icon: "search",
                            click: function (model, valid) {
                                if (valid) {
                                    me.$refs.flowInstanceInfos.remoteData(model);
                                }
                            }
                        },
                        { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
                    ],

                    flowInstanceInfoTableColumn: [
                    	{ label: '业务流水号', prop: 'bizSerno', sortable: true, resizable: true },
                    	{ label: '业务事件名称', prop: 'bizEventName', sortable: true, resizable: true },
                        { label: '业务流转实例标识', prop: 'instFlowId', sortable: true, resizable: true },
                        { label: '业务流转事件状态', prop: 'bizEventState', dataCode: 'EVENT_STATUS', sortable: true, resizable: true },
                        { label: '事件开始时间', prop: 'startTime', sortable: true, resizable: true },
                        { label: '事件结束时间', prop: 'endTime', sortable: true, resizable: true },
                        { label: '流转所属机构代码', prop: 'bizLegalOrgCode', sortable: true, resizable: true, hidden: true }
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
                    var eventObj = this.$refs.flowInstanceInfos.selections[0];

                    this.eventData = [];
                    var stage = {
                        treeNodeId: eventObj.bizStageId,
                        treeNodeName: eventObj.bizStageName,
                        treeParentId: '000000'
                    };
                    var event = {
                        treeNodeId: eventObj.bizSerno,
                        treeNodeName: eventObj.bizEventName,
                        treeParentId: eventObj.bizStageId
                    };
                    this.eventData.push(stage);
                    this.eventData.push(event);
                    this.viewWholeLifeCycle = true;
                },
                nodeClickFn: function (nodeData, node, self) {
                    this.$refs.nodeInstanceInfos.remoteData({"bizSerno" : nodeData.treeNodeId});
                },
                
                viewTask: function() {
                    if (this.$refs.nodeInstanceInfos.selections.length != 1) {
                        this.$message({
                            message: '请先选择一条记录',
                            type: 'warning'
                        });
                        return;
                    }
                    this.viewTaskList = true;
                    this.$nextTick(function () {
                        var instNodeId = this.$refs.nodeInstanceInfos.selections[0].instNodeId;
                  	    this.$refs.taskInstanceInfos.remoteData({'instNodeId' : instNodeId});
                    });
                },
                
                continueRun: function() {
                    if (this.$refs.flowInstanceInfos.selections.length != 1) {
                        this.$message({
                            message: '请先选择一条记录',
                            type: 'warning'
                        });
                        return;
                    }
                    var bizSerno = this.$refs.flowInstanceInfos.selections[0].instFlowId;
                    var _this = this;
                    this.$confirm('是否续跑？', '提示')
                        .then(function () {

                            yufp.service.request({
                                method: 'POST',
                                url: backend.flowService + '/api/event/continue/page/sync',
                                data: {bizSerno: bizSerno},
                                callback: function (code, message, response) {
                                    if (response && response.data > 0) {
                                        _this.$message({
                                            message: '续跑成功!',
                                            type: 'success'
                                        });
                                    }else if (response && response.data < 0) {
                                        _this.$message({
                                            message: response.message,
                                            type: 'warning'
                                        });
                                    }else {
                                        _this.$message({
                                            message: '操作失败!',
                                            type: 'warning'
                                        });
                                    }
                                }
                            });
                            
                        });
                    
                },
                
                closeTask: function() {
                	  this.viewTaskList = false;
                },
                
                close: function() {
                	  this.pageAprvInfo = false;
                }
                
            }
        });
    };

});