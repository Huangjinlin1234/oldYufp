/**
 * Created by 江成 on 2017/03/05.
 */
define(function (require) {
    //定义路由表
    var routeTable = {

        FLOW_BizEventCfg: {
            html: 'pages/flow/BizEventCfg.html',
            js: 'pages/flow/BizEventCfg.js'
        },
        FLOW_BizFlowNodeInfo: {
            html: 'pages/flow/BizFlowNodePageInfo.html',
            js: 'pages/flow/BizFlowNodePageInfo.js'
        },
        FLOW_BizFlowTaskInfo: {
        	html: 'pages/flow/BizFlowTaskPageInfo.html',
            js: 'pages/flow/BizFlowTaskPageInfo.js'
        },
        FLOW_BizFlowProcessInfo: {
            html: 'pages/flow/BizFlowProcessPageInfo.html',
            js: 'pages/flow/BizFlowProcessPageInfo.js'
        },
        FLOW_BizFlowRouteInfo: {
        	html: 'pages/flow/BizFlowRoutePageInfo.html',
        	js: 'pages/flow/BizFlowRoutePageInfo.js'
        },
        FLOW_BizFlowEventChart: {
        	html: 'pages/flow/BizFlowEventChart.html',
            js: 'pages/flow/BizFlowEventChart.js'
        },
        FLOW_BizFlowInfoDetail: {
        	html: 'pages/flow/BizFlowInfoDetail.html',
            js: 'pages/flow/BizFlowInfoDetail.js'
        }
    };
    //注册路由表
    yufp.router.addRouteTable(routeTable);
});