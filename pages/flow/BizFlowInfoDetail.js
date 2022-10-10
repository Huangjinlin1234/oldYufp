/**
 * @create by ligm on 2018-05-05
 * @description 业务流转信息
 */
define(['./custom/widgets/js/YufpBizPluginPageSelector.js',
    './custom/widgets/js/YufpBizFlowPreTaskSelector.js'], function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE,BIZ_NODE_TYPE,BIZ_FLOW_TYPE,BIZ_PLUGIN_TYPE');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
            height: yufp.frame.size().height - 103,
            formDisabled: false,
            
            //tree
            treeDataUrl: backend.flowService + '/api/biz/flow/cfgTree',
            treeParam: {
                bizFlowId: data.bizFlowId
            },
            dataRoot: data.bizFlowId,
            
            //eventTree
            eventTreeDataUrl: backend.flowService + '/api/biz/flow/eventCfgTree',
            eventTreeParam: {
            	bizFlowId : data.bizFlowId
            },
            eventDataRoot: data.bizFlowId,
            
            //tab
            tabName: 'baseCfg',
            
            viewTitle: yufp.lookup.find('CRUD_TYPE', false)
          }
        },
        methods: {
          nodeClickFn: function(nodeData, node, self) {
          	 var _self = this;
          	 //解除之前选中的
          	 var checkedNodes = _self.$refs.cfgTree.getCheckedNodes();
          	 for(var index in checkedNodes) {
          	 	_self.$refs.cfgTree.setChecked(checkedNodes[index], false);
          	 }
          	 //设置当前节点选中
          	 node.checked = true;
          	 
          	 if(nodeData.nodeType == 'stage'){
          	 	var data = {
          	 		editable: false,
          	 		bizFlowId: nodeData.bizFlowId,
          	 		bizFlowName: nodeData.bizFlowName,
          	 		bizStageId: nodeData.data.bizStageId,
          	 		bizStageName: nodeData.data.bizStageName,
                    refreshTree: function() {
                        _self.$refs.cfgTree.remoteData();
                    }
                };
          	 	yufp.router.to("FLOW_BizFlowNodeInfo", data, "cfgInfo");
          	 } else if(nodeData.nodeType == 'node') {
          	 	var data = {
          	 		editable: false,
          	 		bizNodeId: nodeData.data.bizNodeId,
          	 		bizNodeName: nodeData.data.bizNodeName
          	 	};
          	 	yufp.router.to("FLOW_BizFlowTaskInfo", data, "cfgInfo");
          	 }
        },
        eventNodeClickFn: function(nodeData, node, self) {
             var _self = this;
             //解除之前选中的
             var checkedNodes = _self.$refs.eventCfgTree.getCheckedNodes();
             for(var index in checkedNodes) {
                _self.$refs.eventCfgTree.setChecked(checkedNodes[index], false);
             }
             //设置当前节点选中
             node.checked = true;
             
             if(nodeData.nodeType == 'event') {
                var data = {
                   editable: false,
                   bizFlowId: nodeData.bizFlowId,
                   bizFlowName: nodeData.bizFlowName,
                   bizEventId: nodeData.data.bizEventId,
                   bizEventName: nodeData.data.bizEventName,
            
                };
                yufp.router.to("FLOW_BizFlowProcessInfo", data, "eventCfgInfo");
                //yufp.router.to("FLOW_BizFlowEventChart", data, "eventCfgInfo");
             }
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
