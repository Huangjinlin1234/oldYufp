/**
 * @create by ligm on 2018-05-05
 * @description 业务流转事件信息
 */
define(['./custom/widgets/js/YufpBizFlowNodeSelector.js',
    './custom/widgets/js/YufpSDutySelector.js'],
    function (require, exports) {

    // page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
      yufp.lookup.reg('CRUD_TYPE,BIZ_FLOW_TYPE,BIZ_NODE_TYPE');
      yufp.custom.vue({
        el: cite.el,
        data: function () {
          var _self = this;
          return {
            baseParams: {
            	bizFlowType: data.bizFlowType,
                bizFlowId: data.bizFlowId,
                bizEventId: data.bizEventId
            },
            tableColumns: [
                { label: '业务事件标识', prop: 'bizEventId', sortable: true, resizable: true },
                { label: '业务事件名称', prop: 'bizEventName', sortable: true, resizable: true },
                { label: '业务流转类型', prop: 'bizFlowType', dataCode: 'BIZ_FLOW_TYPE', sortable: true, resizable: true },
                { label: '业务阶段标识', prop: 'bizStageId', sortable: true, resizable: true },
                { label: '业务阶段名称', prop: 'bizStageName', sortable: true, resizable: true },
            ],
            updateFields: [{
              columnCount: 3,
              fields: [
            	 { field: 'bizEventId', label: '业务事件标识', hidden: true, disabled: true},
            	 { field: 'bizEventName', label: '业务事件名称', disabled: true},
            	 { field: 'bizFlowType', label: '业务流转类型', type: 'select', dataCode: 'BIZ_FLOW_TYPE', disabled: true},
            	 { field: 'bizStageName', label: '业务阶段名称', disabled: true}
              ]
            }, {
                columnCount: 1,
                fields: [
                    { field: 'remarks', label: '备注', type: 'textarea', disabled: true}
                ]
            }],
            height: yufp.frame.size().height - 103,
            dialogVisible: false,
            dataUrl: backend.flowService + "/api/biz/event/infosByFlowType",
            eventCfgRootId: 'eventCfgInfo',
            eventCfgType: 'process',
            viewTitle: {
                'process': '事件节点配置',
                'route': '事件路由配置'
            }
          }
        },
        methods: {
          cfgFn: function(cfgType) {
          	var _self = this;
            if (_self.$refs.reftable.selections.length != 1) {
              _self.$message({ message: '请先选择一条记录', type: 'warning' });
              return;
            }
            
            _self.dialogVisible = true;
            _self.eventCfgType = cfgType;
            _self.$nextTick(function () {
                 var obj = _self.$refs.reftable.selections[0];
                 yufp.extend(_self.$refs.reform.formModel, obj);
                 
                 if(cfgType == 'route') {
                     var paramData = {
                         bizFlowId: data.bizFlowId,
                         bizEventId: obj.bizEventId
                     };
                     yufp.router.to("FLOW_BizFlowRouteInfo", paramData, _self.eventCfgRootId);
                 } else if(cfgType == 'process') {
                 	 var paramData = {
                         bizFlowId: data.bizFlowId,
                         bizEventId: obj.bizEventId
                     };
                     yufp.router.to("FLOW_BizFlowProcessInfo", paramData, _self.eventCfgRootId);
                 }
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
